#!/usr/bin/env python3
"""
PeerMusic Audio Duration Guard & Controlled Trimming Engine
===========================================================
Measures actual final audio durations, enforces the 3-minute (180.0s) hard limit,
detects trailing silence, and applies controlled musical fade-outs
to guarantee that no final exported song ever exceeds 180 seconds.
"""

import os
import sys
import subprocess
import re
import json
import argparse
from typing import Tuple, Optional, Dict, Any, List

# Ensure scripts directory is in path
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.duration_policy import (
    TARGET_DURATION_MIN,
    TARGET_DURATION_MAX,
    TARGET_DURATION_PREFERRED,
    MAX_DURATION_SECONDS,
    MAX_TRAILING_SILENCE_SECONDS,
    FADE_OUT_DURATION_SECONDS,
    ENGLISH_WORD_BUDGET,
    HINDI_WORD_BUDGET,
    is_duration_compliant,
    is_duration_in_target_window,
    format_duration_str,
)


def measure_audio_duration(audio_path: str) -> float:
    """
    Measures the exact physical duration of an audio file in seconds via ffprobe.
    Raises FileNotFoundError if file is missing, or RuntimeError on probing failure.
    """
    if not os.path.exists(audio_path):
        raise FileNotFoundError(f"Audio file not found: {audio_path}")

    cmd = [
        "ffprobe",
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        audio_path
    ]
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        val = result.stdout.strip()
        if not val:
            raise ValueError(f"Empty duration output for {audio_path}")
        return float(val)
    except Exception as e:
        raise RuntimeError(f"Failed measuring audio duration for '{audio_path}': {e}")


def validate_audio_duration(audio_path: str) -> Tuple[bool, str, float]:
    """
    Validates whether an audio file strictly conforms to the PeerMusic duration policy.
    Returns: (is_compliant, status_message, measured_duration)
    """
    duration = measure_audio_duration(audio_path)
    dur_str = format_duration_str(duration)

    if duration <= 0:
        return False, f"Invalid audio duration ({duration:.2f}s). File may be corrupted.", duration

    if duration > MAX_DURATION_SECONDS:
        excess = duration - MAX_DURATION_SECONDS
        return (
            False,
            f"OVERLENGTH: Audio duration {dur_str} ({duration:.2f}s) exceeds the hard limit of "
            f"3:00 (180.0s) by {excess:.2f}s. Controlled shortening is mandatory.",
            duration
        )

    if is_duration_in_target_window(duration):
        return (
            True,
            f"OPTIMAL: Audio duration {dur_str} ({duration:.2f}s) is within the preferred 2:50–2:58 window.",
            duration
        )

    return (
        True,
        f"COMPLIANT: Audio duration {dur_str} ({duration:.2f}s) satisfies the <= 3:00 (180.0s) ceiling.",
        duration
    )


def detect_trailing_silence(audio_path: str, silence_threshold_db: float = -45.0) -> Tuple[float, float]:
    """
    Detects if there is trailing silence at the end of an audio file.
    Returns: (silence_start_time, silence_duration)
    """
    duration = measure_audio_duration(audio_path)
    cmd = [
        "ffmpeg",
        "-v", "info",
        "-i", audio_path,
        "-af", f"silencedetect=noise={silence_threshold_db}dB:d=0.5",
        "-f", "null",
        "-"
    ]
    try:
        proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        output = proc.stderr

        # Look for silence_start
        matches = list(re.finditer(r"silence_start:\s*([0-9.]+)", output))
        if not matches:
            return duration, 0.0

        last_start = float(matches[-1].group(1))
        # Check if silence extends to end
        silence_dur = duration - last_start
        return last_start, max(0.0, silence_dur)
    except Exception:
        return duration, 0.0


def detect_musical_cutoff_point(
    audio_path: str,
    search_start: float = 165.0,
    search_end: float = 177.5
) -> float:
    """
    Detects a musically sensible endpoint in the window [search_start, search_end].
    Searches for silence / low energy near the end of a vocal phrase.
    Defaults to 176.0s if no silence is detected so a 2.5s fade finishes at 178.0s <= 180.0s.
    """
    duration = measure_audio_duration(audio_path)
    if duration <= search_end:
        return duration

    cmd = [
        "ffmpeg",
        "-v", "info",
        "-ss", str(search_start),
        "-to", str(search_end + 1.0),
        "-i", audio_path,
        "-af", "silencedetect=noise=-35dB:d=0.3",
        "-f", "null",
        "-"
    ]
    try:
        proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        output = proc.stderr
        starts = [float(m.group(1)) + search_start for m in re.finditer(r"silence_start:\s*([0-9.]+)", output)]

        # Find a silence start that falls comfortably in the window
        for s in reversed(starts):
            if search_start <= s <= search_end:
                return round(s, 2)
    except Exception:
        pass

    # Safe fallback endpoint: 176.5 seconds (leaves room for 2.0s fade ending at 178.5s <= 180s)
    return min(176.5, search_end)


def apply_controlled_trim_and_fade(
    input_path: str,
    output_path: str,
    end_time: float,
    fade_duration: float = FADE_OUT_DURATION_SECONDS
) -> float:
    """
    Trims audio to end_time and applies an exponential/linear fade-out of fade_duration.
    Guarantees the resulting audio file is <= end_time.
    """
    fade_start = max(0.0, end_time - fade_duration)
    parent_dir = os.path.dirname(os.path.abspath(output_path))
    if parent_dir and not os.path.exists(parent_dir):
        os.makedirs(parent_dir, exist_ok=True)

    cmd = [
        "ffmpeg", "-y",
        "-i", input_path,
        "-to", str(end_time),
        "-af", f"afade=t=out:st={fade_start:.2f}:d={fade_duration:.2f}",
        "-c:a", "libmp3lame",
        "-b:a", "320k",
        output_path
    ]
    subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)

    final_dur = measure_audio_duration(output_path)
    return final_dur


def enforce_duration_limit(
    audio_path: str,
    output_path: Optional[str] = None,
    allow_trim: bool = True
) -> Tuple[str, float, bool]:
    """
    Enforces the duration limit on an audio file:
    1. If duration <= 180.0s:
       - Checks for excessive trailing silence (> 2.5s). Trims trailing silence if present.
       - Returns (audio_path, duration, was_trimmed=False/True).
    2. If duration > 180.0s:
       - Raises ValueError if allow_trim is False.
       - Otherwise, finds natural musical cutoff in [168.0, 177.5]s and applies clean fade.
       - Strictly verifies that final duration <= 180.0s.
       - Returns (dest_path, final_duration, was_trimmed=True).
    """
    duration = measure_audio_duration(audio_path)

    # Destination path
    if not output_path:
        base, ext = os.path.splitext(audio_path)
        output_path = f"{base}_compliant{ext}"

    # Scenario 1: Audio is already under or at the hard limit
    if duration <= MAX_DURATION_SECONDS:
        # Check trailing silence
        silence_start, silence_dur = detect_trailing_silence(audio_path)
        if silence_dur > MAX_TRAILING_SILENCE_SECONDS and duration - silence_dur >= TARGET_DURATION_MIN:
            # Clean up trailing silence
            clean_end = silence_start + 1.0  # leave 1s tail
            apply_controlled_trim_and_fade(audio_path, output_path, clean_end, fade_duration=1.5)
            final_d = measure_audio_duration(output_path)
            return output_path, final_d, True
        return audio_path, duration, False

    # Scenario 2: Audio is overlength (> 180.0s)
    if not allow_trim:
        raise ValueError(
            f"Audio duration {duration:.2f}s exceeds the 180s hard limit and allow_trim is disabled."
        )

    # Find musical cutoff point
    cutoff = detect_musical_cutoff_point(audio_path, search_start=168.0, search_end=177.5)
    fade_dur = min(2.5, cutoff - 165.0)

    # Perform trimming
    final_dur = apply_controlled_trim_and_fade(
        audio_path,
        output_path,
        end_time=cutoff,
        fade_duration=fade_dur
    )

    # Verify final result strictly complies with hard ceiling
    if final_dur > MAX_DURATION_SECONDS:
        raise RuntimeError(
            f"Duration enforcement failed: Shortened file '{output_path}' still has duration "
            f"{final_dur:.2f}s > {MAX_DURATION_SECONDS}s."
        )

    return output_path, final_dur, True


def sync_timeline_to_audio_duration(timeline_data: Dict[str, Any], audio_duration_sec: float) -> Dict[str, Any]:
    """
    Synchronizes a timeline structure to a specified audio duration:
    - Removes scenes starting after the audio ends.
    - Clamps the final scene endFrame to round(audio_duration_sec * fps).
    - Prunes words starting after the cutoff.
    - Ensures zero trailing lyrics or black frames.
    """
    fps = timeline_data.get("fps", 60)
    max_frame = int(round(audio_duration_sec * fps))

    scenes = timeline_data.get("scenes", [])
    valid_scenes = []

    for scene in scenes:
        if scene["startFrame"] >= max_frame:
            # Scene begins after audio cutoff
            continue

        scene_copy = dict(scene)
        # Clamp scene end
        if scene_copy["endFrame"] > max_frame:
            scene_copy["endFrame"] = max_frame

        # Filter and clamp lines
        valid_lines = []
        for line in scene_copy.get("lines", []):
            valid_words = []
            for word in line.get("words", []):
                if word["startFrame"] < max_frame:
                    w_copy = dict(word)
                    if w_copy["endFrame"] > max_frame:
                        w_copy["endFrame"] = max_frame
                    valid_words.append(w_copy)

            if valid_words:
                line_copy = dict(line)
                line_copy["words"] = valid_words
                valid_lines.append(line_copy)

        scene_copy["lines"] = valid_lines
        valid_scenes.append(scene_copy)

    # Ensure last scene reaches max_frame exactly if scenes exist
    if valid_scenes:
        valid_scenes[-1]["endFrame"] = max_frame

    timeline_data["scenes"] = valid_scenes
    timeline_data["totalDurationSec"] = round(audio_duration_sec, 3)
    timeline_data["totalFrames"] = max_frame
    return timeline_data


def main():
    parser = argparse.ArgumentParser(description="PeerMusic Audio Duration Guard CLI")
    subparsers = parser.add_subparsers(dest="command", help="Guard commands")

    # check
    p_check = subparsers.add_parser("check", help="Check audio duration compliance")
    p_check.add_argument("audio", type=str, help="Path to audio file")

    # enforce
    p_enforce = subparsers.add_parser("enforce", help="Enforce 180s hard limit with trimming fallback")
    p_enforce.add_argument("audio", type=str, help="Path to input audio file")
    p_enforce.add_argument("--output", "-o", type=str, default=None, help="Path for shortened output audio")

    # radio-edit
    p_radio = subparsers.add_parser("radio-edit", help="Generate 180s-compliant Radio Edit audio and timeline")
    p_radio.add_argument("audio", type=str, help="Path to input audio file")
    p_radio.add_argument("--timeline", "-t", type=str, default=None, help="Path to input timeline.json")
    p_radio.add_argument("--output-audio", type=str, default=None, help="Path for output radio audio")
    p_radio.add_argument("--output-timeline", type=str, default=None, help="Path for output radio timeline.json")

    # policy
    subparsers.add_parser("policy", help="Display central duration policy")

    args = parser.parse_args()

    if args.command == "check":
        ok, msg, dur = validate_audio_duration(args.audio)
        icon = "✅" if ok else "❌"
        print(f"{icon} {msg}")
        sys.exit(0 if ok else 1)

    elif args.command == "enforce":
        out_path, final_dur, trimmed = enforce_duration_limit(args.audio, args.output)
        dur_str = format_duration_str(final_dur)
        if trimmed:
            print(f"[✓] Overlength audio successfully shortened to {dur_str} ({final_dur:.2f}s). Saved to: {out_path}")
        else:
            print(f"[✓] Audio already compliant ({dur_str}, {final_dur:.2f}s). File: {out_path}")
        sys.exit(0)

    elif args.command == "radio-edit":
        # 1. Produce radio edit audio
        base, ext = os.path.splitext(args.audio)
        radio_audio_path = args.output_audio or f"{base}_radio{ext}"
        out_path, final_dur, trimmed = enforce_duration_limit(args.audio, radio_audio_path)
        dur_str = format_duration_str(final_dur)

        # 2. Synchronize timeline if provided
        if args.timeline and os.path.exists(args.timeline):
            with open(args.timeline, "r", encoding="utf-8") as tf:
                raw_tl = json.load(tf)

            synced_tl = sync_timeline_to_audio_duration(raw_tl, final_dur)
            # Update audioFile pointer in timeline
            audio_basename = os.path.basename(out_path)
            synced_tl["audioFile"] = f"audio/{audio_basename}"

            tl_dir = os.path.dirname(args.timeline)
            out_tl_path = args.output_timeline or os.path.join(tl_dir, "timeline_radio.json")
            with open(out_tl_path, "w", encoding="utf-8") as out_tf:
                json.dump(synced_tl, out_tf, indent=2, ensure_ascii=False)
            print(f"[✓] Radio Edit timeline synchronized to {dur_str} ({final_dur:.2f}s). Saved to: {out_tl_path}")

        print(f"[✓] Radio Edit audio created at {dur_str} ({final_dur:.2f}s). Saved to: {out_path}")
        sys.exit(0)

    elif args.command == "policy":
        print("=" * 60)
        print("  PEERMUSIC DURATION POLICY (SINGLE SOURCE OF TRUTH)")
        print("=" * 60)
        print(f"  • Preferred Target: {TARGET_DURATION_MIN:.1f}s – {TARGET_DURATION_MAX:.1f}s (~2:50 – 2:58)")
        print(f"  • Nominal Target:   {TARGET_DURATION_PREFERRED:.1f}s (~2:54)")
        print(f"  • Absolute Maximum: {MAX_DURATION_SECONDS:.1f}s (3:00 hard ceiling)")
        print(f"  • English Budget:   {PolicyWords('English', HINDI_WORD_BUDGET, ENGLISH_WORD_BUDGET)}")
        print("=" * 60)

    else:
        parser.print_help()


def PolicyWords(label, hindi_b, eng_b):
    return f"{eng_b[0]}–{eng_b[1]} words | Hindi: {hindi_b[0]}–{hindi_b[1]} words"


if __name__ == "__main__":
    main()
