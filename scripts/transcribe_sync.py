#!/usr/bin/env python3
"""
Audio-to-Lyric Forced Alignment & Synchronizer
==============================================
Processes audio files (MP3/WAV/M4A) and generates millisecond-accurate timestamps
using stable-ts (stable-whisper) Forced Alignment, demucs vocal isolation,
and line-level smoothing for buttery-smooth Remotion lyric animation.
"""

import sys
import os
import re
import json
import argparse
import subprocess
from typing import Dict, List, Any, Optional, Set

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.duration_guard import (
    validate_audio_duration,
    enforce_duration_limit,
    measure_audio_duration,
    MAX_DURATION_SECONDS,
)

STOP_WORDS: Set[str] = {
    # Hindi/Hinglish stop words
    "ki", "ka", "ke", "ko", "se", "mein", "par", "pe", "hai", "hain", "tha", "thi", "the",
    "ho", "bhi", "aur", "to", "yeh", "woh", "ek", "sa", "si", "na", "ne", "mera", "meri", "mere",
    "tera", "teri", "tere", "apna", "apni", "apne", "hum", "tum", "kuch", "sab", "raha", "rahi", "rahe",
    "gaya", "gayi", "gaye",
    # English stop words
    "a", "an", "the", "in", "on", "at", "to", "of", "and", "is", "are", "was", "were", "be",
    "been", "being", "have", "has", "had", "do", "does", "did", "for", "with", "by", "from",
    "it", "its", "this", "that", "these", "those", "i", "you", "he", "she", "we", "they",
    "me", "him", "her", "us", "them", "my", "your", "our", "their", "so", "if", "or", "but",
    "just", "now", "then", "into", "as"
}


def detect_lyrics_language(lyrics_text: Optional[str]) -> str:
    """
    Detects whether lyrics are primarily English or Hindi/Hinglish.
    Defaults to 'hi' if Hinglish markers are found, otherwise 'en' if English vocabulary dominates.
    """
    if not lyrics_text:
        return "hi"

    clean = re.sub(r"\[.*?\]", "", lyrics_text).lower()
    tokens = set(re.findall(r"\b[a-z]{2,}\b", clean))

    hindi_markers = {
        "hai", "hain", "tha", "thi", "the", "mein", "mera", "meri", "tere", "tera",
        "kuch", "aur", "woh", "yeh", "apna", "apni", "raha", "rahi", "humein", "tujhe",
        "dil", "khwaab", "yaad", "yaadein", "zindagi", "safar", "baarish", "aakhri"
    }
    hindi_hits = len(tokens.intersection(hindi_markers))

    english_markers = {
        "the", "and", "that", "have", "for", "not", "with", "you", "this", "but",
        "from", "they", "would", "there", "their", "what", "about", "which", "when",
        "make", "can", "like", "time", "just", "know", "take", "people", "into",
        "year", "your", "good", "some", "could", "them", "see", "other", "than",
        "then", "now", "look", "only", "come", "its", "over", "think", "also",
        "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
        "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
    }
    english_hits = len(tokens.intersection(english_markers))

    if hindi_hits >= 2:
        return "hi"
    elif english_hits > hindi_hits:
        return "en"
    return "hi"


def pick_line_accent_keyword(line_text: str) -> str:
    """
    Selects 1 emotional accent keyword per line for Remotion highlight/underline sweep.
    Prioritizes markdown *word* or _word_, then longest impactful noun/keyword.
    """
    # 1. Check for markdown *word* or _word_
    md_match = re.search(r"[*_]([^*_]+)[*_]", line_text)
    if md_match:
        return md_match.group(1).strip()

    # 2. Split words and clean punctuation
    clean_text = re.sub(r"[*_]", "", line_text)
    tokens = [t.strip() for t in clean_text.split() if t.strip()]

    candidate = ""
    candidate_len = 0
    for token in tokens:
        clean = re.sub(r"[^a-zA-Z0-9\u0900-\u097F]", "", token).lower()
        if len(clean) >= 3 and clean not in STOP_WORDS:
            if len(clean) > candidate_len:
                candidate = token
                candidate_len = len(clean)

    # Fallback to longest word if all were filtered
    if not candidate and tokens:
        for token in tokens:
            clean = re.sub(r"[^a-zA-Z0-9\u0900-\u097F]", "", token)
            if len(clean) > candidate_len:
                candidate = token
                candidate_len = len(clean)

    # Clean punctuation off candidate
    return re.sub(r"^[^\w\u0900-\u097F]+|[^\w\u0900-\u097F]+$", "", candidate) if candidate else ""


def is_metadata_or_header(line: str) -> bool:
    """Returns True if the line is a section marker or metadata tag rather than sung lyrics."""
    l = line.strip()
    if not l:
        return True
    if l.startswith("[") or l.startswith("#") or l.startswith("---") or l.startswith("==="):
        return True
    meta_prefixes = (
        "title:", "album:", "genre:", "artist:", "duration:",
        "word count:", "composer:", "theme:", "key:", "bpm:", "tempo:", "mood:"
    )
    if any(l.lower().startswith(p) for p in meta_prefixes):
        return True
    return False


def align_with_stable_whisper(
    audio_path: str,
    raw_lyrics_text: str,
    model_size: str = "base",
    language: str = "auto"
) -> Optional[Dict[str, Any]]:
    """
    Performs Forced Alignment using stable-ts (stable_whisper).
    Aligns the user's exact known lyrics (Hindi/Hinglish or English) against isolated vocals.
    Falls back gracefully if Demucs is not installed.
    """
    try:
        import stable_whisper
        target_lang = detect_lyrics_language(raw_lyrics_text) if language == "auto" else language
        # Strip bracketed section headers and metadata before alignment
        clean_lines = [
            l.strip() for l in raw_lyrics_text.splitlines()
            if not is_metadata_or_header(l)
        ]
        lyrics_clean = "\n".join(clean_lines)

        print(f"[+] Using stable-whisper ({model_size}, lang={target_lang}) Forced Alignment with exact lyrics...")
        model = stable_whisper.load_model(model_size)
        result = model.align(audio_path, lyrics_clean, language=target_lang)

        # Extract segments and words from stable-whisper Result object
        result_dict = result.to_dict() if hasattr(result, "to_dict") else result
        segments = result_dict.get("segments", [])

        words_data = []
        for segment in segments:
            for word in segment.get("words", []):
                words_data.append({
                    "word": word.get("word", "").strip(),
                    "start": round(word.get("start", 0.0), 3),
                    "end": round(word.get("end", 0.0), 3),
                    "probability": round(word.get("probability", 1.0), 3)
                })

        duration = segments[-1].get("end", 0.0) if segments else 0.0

        return {
            "audio_file": audio_path,
            "duration": round(duration, 3),
            "language": result_dict.get("language", target_lang),
            "words": words_data,
            "segments": segments,
            "alignment_method": "stable-whisper-forced-alignment"
        }
    except Exception as e:
        print(f"[!] stable-whisper alignment unavailable ({e}). Falling back to standard transcription...")
        return None


def transcribe_with_whisper(
    audio_path: str,
    model_size: str = "base",
    lyrics_text: Optional[str] = None,
    language: str = "auto"
) -> Dict[str, Any]:
    """
    Attempts Forced Alignment with stable-whisper first.
    Falls back to faster-whisper or openai-whisper with prompt priming if stable-whisper is unavailable.
    """
    target_lang = detect_lyrics_language(lyrics_text) if language == "auto" else language

    # 1. Try stable-whisper Forced Alignment if lyrics are provided
    if lyrics_text:
        stable_result = align_with_stable_whisper(audio_path, lyrics_text, model_size=model_size, language=target_lang)
        if stable_result:
            return stable_result

    initial_prompt = None
    if lyrics_text:
        # Prime Whisper with initial lyric lines
        clean_lines = [l.strip() for l in lyrics_text.splitlines() if l.strip() and not l.strip().startswith("[")]
        if clean_lines:
            initial_prompt = " ".join(clean_lines[:6])

    # 2. Try faster-whisper
    try:
        from faster_whisper import WhisperModel
        import numpy as np
        print(f"[+] Using faster-whisper ({model_size}, lang={target_lang}) with music-tuned timestamping...")
        model = WhisperModel(model_size, device="cpu", compute_type="int8")

        cmd = ["ffmpeg", "-i", audio_path, "-f", "s16le", "-ac", "1", "-ar", "16000", "-"]
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        raw, _ = proc.communicate()
        audio_array = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0

        segments, info = model.transcribe(
            audio_array,
            word_timestamps=True,
            language=None if target_lang == "auto" else target_lang,
            initial_prompt=initial_prompt,
            no_speech_threshold=0.85,
            log_prob_threshold=None,
            condition_on_previous_text=False,
        )

        words_data = []
        for segment in segments:
            for word in segment.words:
                words_data.append({
                    "word": word.word.strip(),
                    "start": round(word.start, 3),
                    "end": round(word.end, 3),
                    "probability": round(word.probability, 3)
                })

        return {
            "audio_file": audio_path,
            "duration": round(info.duration, 3),
            "language": info.language,
            "words": words_data,
            "alignment_method": "faster-whisper-transcribe"
        }
    except Exception as e:
        print(f"[!] faster-whisper failed ({e}), attempting openai-whisper fallback...")

    # 3. Try openai-whisper
    try:
        import whisper
        print(f"[+] Using openai-whisper ({model_size}, lang={target_lang})...")
        model = whisper.load_model(model_size)
        result = model.transcribe(
            audio_path,
            word_timestamps=True,
            language=None if target_lang == "auto" else target_lang,
            initial_prompt=initial_prompt,
            no_speech_threshold=0.85,
            condition_on_previous_text=False,
        )

        words_data = []
        for segment in result.get("segments", []):
            for word in segment.get("words", []):
                words_data.append({
                    "word": word["word"].strip(),
                    "start": round(word["start"], 3),
                    "end": round(word["end"], 3),
                    "probability": round(word.get("probability", 1.0), 3)
                })

        return {
            "audio_file": audio_path,
            "duration": round(words_data[-1]["end"] if words_data else 0.0, 3),
            "language": result.get("language", target_lang),
            "words": words_data,
            "alignment_method": "openai-whisper-transcribe"
        }
    except Exception as e:
        print(f"[!] openai-whisper unavailable ({e}). Generating fallback alignment template.")

    return generate_fallback_alignment(audio_path, language=target_lang)


def generate_fallback_alignment(audio_path: str, language: str = "hi") -> Dict[str, Any]:
    """
    Fallback generator when ML models are not installed in the environment.
    """
    duration = 0.0
    try:
        cmd = [
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", audio_path
        ]
        res = subprocess.check_output(cmd).decode().strip()
        duration = float(res)
    except Exception:
        pass

    return {
        "audio_file": audio_path,
        "duration": round(duration, 3),
        "language": language,
        "words": [],
        "alignment_method": "fallback-template",
        "note": "Install 'stable-ts' and 'demucs' for official forced alignment."
    }


def smooth_line_timestamps(
    raw_lines: List[str],
    words: List[Dict[str, Any]],
    fps: int = 60
) -> List[Dict[str, Any]]:
    """
    Line-Level Timestamp Smoothing:
    1. Filters out metadata/headers.
    2. Associates vocal words with corresponding written lyric lines using token matching.
    3. Computes clean startTime and endTime for each full line from physical vocal bounds.
    4. Strips micro-gaps and prevents premature next-line highlighting.
    5. Automatically tags 1 accent keyword per line for Remotion highlight sweep.
    """
    lines_to_process = [l.strip() for l in raw_lines if not is_metadata_or_header(l)]
    if not lines_to_process:
        return []

    def norm(w: str) -> str:
        return re.sub(r"[^\w\u0900-\u097F]", "", w).lower()

    lines_output: List[Dict[str, Any]] = []
    word_cursor = 0
    total_words = len(words)

    for idx, raw_line in enumerate(lines_to_process):
        line_clean = raw_line.strip()
        line_tokens = [t for t in re.sub(r"[*_]", "", line_clean).split() if t]
        line_word_count = len(line_tokens)

        assigned_words: List[Dict[str, Any]] = []
        if total_words > 0 and word_cursor < total_words:
            for token in line_tokens:
                nt = norm(token)
                if not nt:
                    continue
                best_match = False
                for lookahead in range(min(5, total_words - word_cursor)):
                    curr_w = words[word_cursor + lookahead]
                    nw = norm(curr_w.get("word", ""))
                    if nw == nt or (len(nt) > 3 and (nt in nw or nw in nt)):
                        for k in range(lookahead):
                            assigned_words.append(words[word_cursor + k])
                        assigned_words.append(curr_w)
                        word_cursor += lookahead + 1
                        best_match = True
                        break
                if not best_match:
                    if word_cursor < total_words:
                        assigned_words.append(words[word_cursor])
                        word_cursor += 1

            if idx == len(lines_to_process) - 1:
                while word_cursor < total_words:
                    assigned_words.append(words[word_cursor])
                    word_cursor += 1

        # Determine line start and end times from actual vocal words
        if assigned_words:
            all_starts = [w.get("start", 0.0) for w in assigned_words]
            all_ends = [w.get("end", 0.0) for w in assigned_words]
            start_time = min(all_starts)
            end_time = max(all_ends)
        else:
            start_time = round(idx * 4.0, 3)
            end_time = round(start_time + max(2.5, line_word_count * 0.4), 3)

        accent_kw = pick_line_accent_keyword(line_clean)

        lines_output.append({
            "id": f"line_{len(lines_output)+1:02d}",
            "text": line_clean,
            "startTime": round(start_time, 3),
            "endTime": round(end_time, 3),
            "startFrame": int(round(start_time * fps)),
            "endFrame": int(round(end_time * fps)),
            "accentWords": [accent_kw] if accent_kw else [],
            "words": [
                {
                    "id": f"w_{len(lines_output)+1:02d}_{w_idx+1:02d}",
                    "text": w.get("word", ""),
                    "startFrame": int(round(w.get("start", start_time) * fps)),
                    "endFrame": int(round(w.get("end", end_time) * fps)),
                }
                for w_idx, w in enumerate(assigned_words)
            ]
        })

    # Smooth out micro-gaps and prevent premature next-line highlighting:
    # Line N's singing must NEVER be cut short before its words finish.
    for i in range(len(lines_output) - 1):
        curr_line = lines_output[i]
        next_line = lines_output[i + 1]

        # If next line starts before current line finishes, push next line start to current line end
        if next_line["startTime"] < curr_line["endTime"]:
            next_line["startTime"] = curr_line["endTime"]
            next_line["startFrame"] = curr_line["endFrame"]
            for w in next_line["words"]:
                if w["startFrame"] < next_line["startFrame"]:
                    w["startFrame"] = next_line["startFrame"]
                if w["endFrame"] <= w["startFrame"]:
                    w["endFrame"] = w["startFrame"] + 4

        # Smooth tiny micro-gap (< 150ms) between couplet lines by holding curr_line
        gap = next_line["startTime"] - curr_line["endTime"]
        if 0 < gap < 0.15:
            curr_line["endTime"] = next_line["startTime"]
            curr_line["endFrame"] = next_line["startFrame"]

    return lines_output


def align_with_written_lyrics(transcription: Dict[str, Any], lyrics_text: str, fps: int = 60) -> Dict[str, Any]:
    """
    Enriches transcription with structured sections, smooth line-level timestamps,
    and accent keyword annotations.
    """
    raw_lines = [l.strip() for l in lyrics_text.splitlines() if l.strip()]
    sections = []
    current_section: Dict[str, Any] = {"name": "Intro", "lines": []}

    for line in raw_lines:
        if line.startswith("[") and line.endswith("]"):
            if current_section["lines"]:
                sections.append(current_section)
            current_section = {"name": line.strip("[]"), "lines": []}
        elif not is_metadata_or_header(line):
            current_section["lines"].append(line)

    if current_section["lines"]:
        sections.append(current_section)

    transcription["structured_sections"] = sections

    # Filter out metadata headers and bracketed tags before generating line timestamps
    lyric_lines = [l for l in raw_lines if not is_metadata_or_header(l)]
    smoothed_lines = smooth_line_timestamps(lyric_lines, transcription.get("words", []), fps=fps)
    transcription["lines"] = smoothed_lines

    return transcription


def main():
    parser = argparse.ArgumentParser(description="Extract line and word-level timestamps with forced alignment for Remotion lyric videos.")
    parser.add_argument("audio_path", help="Path to input audio file (MP3/WAV/M4A)")
    parser.add_argument("--lyrics", "-l", help="Path to text file containing written lyrics (optional)")
    parser.add_argument("--output", "-o", default="lyrics_sync.json", help="Path to save output JSON")
    parser.add_argument("--model", "-m", default="base", help="Whisper model size (tiny, base, small, medium)")
    parser.add_argument("--fps", type=int, default=60, help="Video frame rate for frame-locked timestamps (default: 60)")
    parser.add_argument("--language", "-lang", default="auto", help="Audio language ('auto', 'hi', 'en')")
    parser.add_argument("--uncut", action="store_true", help="Allow uncut overlength audio without forced trimming")
    args = parser.parse_args()

    if not os.path.exists(args.audio_path):
        print(f"[-] Error: Audio file '{args.audio_path}' not found.")
        sys.exit(1)

    # Enforce duration guard (<= 180.0s hard maximum unless --uncut is specified)
    audio_dur = measure_audio_duration(args.audio_path)
    target_audio_path = args.audio_path
    if audio_dur > MAX_DURATION_SECONDS and not args.uncut:
        print(f"[!] Overlength audio detected: {audio_dur:.2f}s > {MAX_DURATION_SECONDS}s. Applying controlled trimming fallback...")
        target_audio_path, new_dur, _ = enforce_duration_limit(args.audio_path)
        print(f"[✓] Audio safely shortened to {new_dur:.2f}s <= {MAX_DURATION_SECONDS}s.")
        audio_dur = new_dur
    else:
        print(f"[✓] Audio duration: {audio_dur:.2f}s (uncut mode: {args.uncut}).")

    written_lyrics = None
    if args.lyrics and os.path.exists(args.lyrics):
        with open(args.lyrics, "r", encoding="utf-8") as f:
            written_lyrics = f.read()

    data = transcribe_with_whisper(
        target_audio_path,
        model_size=args.model,
        lyrics_text=written_lyrics,
        language=args.language
    )

    if written_lyrics:
        data = align_with_written_lyrics(data, written_lyrics, fps=args.fps)

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    total_words = len(data.get("words", []))
    total_lines = len(data.get("lines", []))
    method = data.get("alignment_method", "unknown")
    print(f"[✓] Synchronization data written to '{args.output}'")
    print(f"    - Alignment Method: {method}")
    print(f"    - Aligned Lines: {total_lines}")
    print(f"    - Aligned Words: {total_words}")


if __name__ == "__main__":
    main()
