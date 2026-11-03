#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Suno Mere Dil Ki' (सुनो मेरे दिल की)
Audio: public/audio/suno_mere_dil_ki.mp3 (177.50 seconds = 10,650 frames @ 60 FPS)

This script ingests word-level timestamps produced by scripts/transcribe_sync.py
(stable-whisper forced alignment) and assembles a frame-accurate timeline.json.

Run in two steps:
  1. python3 scripts/transcribe_sync.py public/audio/suno_mere_dil_ki.mp3 \
         --lyrics src/songs/suno-mere-dil-ki/lyrics.txt \
         --output suno_lyrics_sync.json
  2. python3 scripts/build_suno_mere_dil_ki_timeline.py

Or just run step 2 – it auto-runs step 1 if suno_lyrics_sync.json is missing.
"""

import os
import sys
import json
import re
import subprocess

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.transcribe_sync import pick_line_accent_keyword, is_metadata_or_header

FPS = 60
TOTAL_DURATION_SEC = 177.50
TOTAL_FRAMES = int(round(TOTAL_DURATION_SEC * FPS))  # 10650

SYNC_JSON = os.path.join(ROOT_DIR, "suno_lyrics_sync.json")
AUDIO_PATH = os.path.join(ROOT_DIR, "public", "audio", "suno_mere_dil_ki.mp3")
LYRICS_PATH = os.path.join(ROOT_DIR, "src", "songs", "suno-mere-dil-ki", "lyrics.txt")
OUTPUT_PATH = os.path.join(ROOT_DIR, "src", "songs", "suno-mere-dil-ki", "timeline.json")


def f(sec):
    return int(round(sec * FPS))


def ensure_sync_data():
    """Auto-run transcribe_sync.py if sync JSON is missing."""
    if not os.path.exists(SYNC_JSON):
        print(f"[!] {SYNC_JSON} not found. Running stable-whisper forced alignment now...")
        subprocess.run(
            [
                sys.executable,
                os.path.join(ROOT_DIR, "scripts", "transcribe_sync.py"),
                AUDIO_PATH,
                "--lyrics", LYRICS_PATH,
                "--output", SYNC_JSON,
            ],
            check=True,
        )
    with open(SYNC_JSON, encoding="utf-8") as fp:
        return json.load(fp)


# ─── Scene-to-line mapping ────────────────────────────────────────────────────
# Each entry maps one scene to a slice of the 47 aligned lyric lines (0-indexed).
SCENE_DEFS = [
    {
        "id": "scene_01_prelude",
        "name": "Prelude – Ek Dastan",
        "line_slice": (0, 2),
        "startSec": 0.0,
        "endSec": None,
    },
    {
        "id": "scene_02_verse_1",
        "name": "Subah Ki Dhoop – Verse 1",
        "line_slice": (2, 9),
        "startSec": None,
        "endSec": None,
    },
    {
        "id": "scene_03_chorus_1",
        "name": "Suno Mere Dil Ki – Sargam 1",
        "line_slice": (9, 17),
        "startSec": None,
        "endSec": None,
    },
    {
        "id": "scene_04_interlude",
        "name": "Ghanti Bajti Hai – Interlude",
        # Line 18 (Tu hi hai meri kismat…) and Line 19 (Ghanti bajti hai…)
        # Vocal end for line 18 is capped at 'chamakta' (59.8s) not the 77.8s artefact
        "line_slice": (17, 19),
        "startSec": None,
        "endSec": None,
    },
    {
        "id": "scene_05_verse_2",
        "name": "Raahon Mein – Verse 2",
        "line_slice": (19, 24),
        "startSec": None,
        "endSec": None,
    },
    {
        "id": "scene_06_prechorus_2",
        "name": "Subah Ki Dhoop – Reprise",
        "line_slice": (24, 26),
        "startSec": None,
        "endSec": None,
    },
    {
        "id": "scene_07_chorus_2",
        "name": "Suno Mere Dil Ki – Sargam 2",
        "line_slice": (26, 34),
        "startSec": None,
        "endSec": None,
    },
    {
        "id": "scene_08_bridge",
        "name": "Khamoshiyon Mein – Bridge",
        "line_slice": (34, 38),
        "startSec": None,
        "endSec": None,
    },
    {
        "id": "scene_09_climax_chorus",
        "name": "Suno Mere Dil Ki – Grand Climax",
        "line_slice": (38, 46),
        "startSec": None,
        "endSec": None,
    },
    {
        "id": "scene_10_outro",
        "name": "Dastan Sunaati Hai – Outro",
        "line_slice": (46, 47),
        "startSec": None,
        "endSec": TOTAL_DURATION_SEC,
    },
]


def get_line_vocal_end(line_obj):
    """
    Return the physical vocal end from word-level data.
    Detects alignment artefacts: if the last word starts >3s after the
    second-to-last word ends, it's isolated in an instrumental gap —
    use the max non-artefact word end instead.
    """
    words = line_obj.get("words", [])
    if not words:
        return line_obj["endTime"]

    if len(words) >= 2:
        prev_end = max(w["endFrame"] / FPS for w in words[:-1])
        last_start = words[-1]["startFrame"] / FPS
        if last_start - prev_end > 3.0:
            return prev_end

    return max(w["endFrame"] / FPS for w in words)


def build_timeline(sync_data):
    aligned_lines = sync_data.get("lines", [])
    if len(aligned_lines) < 47:
        print(f"[!] Warning: expected >= 47 aligned lines, got {len(aligned_lines)}")

    scenes = []

    for s_idx, sd in enumerate(SCENE_DEFS):
        sl_start, sl_end = sd["line_slice"]
        scene_lines_raw = aligned_lines[sl_start:sl_end]

        if sd["startSec"] is None:
            scene_start_sec = scene_lines_raw[0]["startTime"] if scene_lines_raw else 0.0
        else:
            scene_start_sec = sd["startSec"]

        vocal_ends = [get_line_vocal_end(l) for l in scene_lines_raw]
        scene_vocal_end = max(vocal_ends) if vocal_ends else scene_start_sec

        scene_end_sec = sd["endSec"] if sd["endSec"] is not None else scene_vocal_end

        scene_start_f = f(scene_start_sec)
        scene_end_f = f(scene_end_sec)

        built_lines = []
        prev_end_f = scene_start_f

        for l_idx, raw_line in enumerate(scene_lines_raw):
            words = raw_line.get("words", [])

            l_start_f = raw_line["startFrame"]
            l_end_f = f(get_line_vocal_end(raw_line))

            # Never start before previous line ended
            if l_start_f < prev_end_f:
                l_start_f = prev_end_f
            if l_end_f <= l_start_f:
                l_end_f = l_start_f + max(12, len(words) * 6)

            built_words = []
            for w_idx, w in enumerate(words):
                w_start_f = max(l_start_f, w.get("startFrame", l_start_f))
                w_end_f = w.get("endFrame", w_start_f + 4)

                # Cap artefact word isolated in instrumental gap
                if w_start_f > l_end_f:
                    w_start_f = l_end_f
                w_end_f = max(w_start_f + 1, min(w_end_f, l_end_f))
                if w_end_f <= w_start_f:
                    w_end_f = w_start_f + 4

                accent_kw = pick_line_accent_keyword(raw_line["text"])
                clean_tok = re.sub(r"[^\w\u0900-\u097F]", "", w.get("text", ""))
                is_accent = bool(
                    accent_kw and (
                        accent_kw.lower() in clean_tok.lower()
                        or clean_tok.lower() in accent_kw.lower()
                    )
                )

                built_words.append({
                    "id": f"w_{s_idx+1:02d}_{l_idx+1:02d}_{w_idx+1:02d}",
                    "text": w.get("text", ""),
                    "startFrame": w_start_f,
                    "endFrame": w_end_f,
                    "accent": is_accent,
                })

            accent_kw = pick_line_accent_keyword(raw_line["text"])
            line_obj = {
                "id": f"line_{s_idx+1:02d}_{l_idx+1:02d}",
                "text": raw_line["text"],
                "startTime": round(l_start_f / FPS, 3),
                "endTime": round(l_end_f / FPS, 3),
                "startFrame": l_start_f,
                "endFrame": l_end_f,
                "accentWords": [accent_kw] if accent_kw else [],
                "words": built_words,
            }
            built_lines.append(line_obj)
            prev_end_f = l_end_f

        scenes.append({
            "id": sd["id"],
            "name": sd["name"],
            "startFrame": scene_start_f,
            "endFrame": scene_end_f,
            "lines": built_lines,
        })

    # Stitch: each scene's endFrame = next scene's startFrame
    for i in range(len(scenes) - 1):
        scenes[i]["endFrame"] = scenes[i + 1]["startFrame"]

    scenes[-1]["endFrame"] = TOTAL_FRAMES

    return {
        "songTitle": "Suno Mere Dil Ki",
        "artist": "PeerMusic",
        "audioFile": "audio/suno_mere_dil_ki.mp3",
        "coverImage": "covers/suno_mere_dil_ki_clean_16x9.png",
        "totalDurationSec": TOTAL_DURATION_SEC,
        "totalFrames": TOTAL_FRAMES,
        "fps": FPS,
        "scenes": scenes,
        "overrides": {},
    }


if __name__ == "__main__":
    sync_data = ensure_sync_data()
    timeline = build_timeline(sync_data)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as fp:
        json.dump(timeline, fp, indent=2, ensure_ascii=False)

    total_scenes = len(timeline["scenes"])
    total_lines = sum(len(s["lines"]) for s in timeline["scenes"])
    total_words = sum(len(l["words"]) for s in timeline["scenes"] for l in s["lines"])

    print(f"[✓] timeline.json written to {OUTPUT_PATH}")
    print(f"    Scenes: {total_scenes}  Lines: {total_lines}  Words: {total_words}")
    print(f"    Total duration: {TOTAL_DURATION_SEC:.2f}s ({TOTAL_FRAMES} frames @ {FPS} FPS)")
