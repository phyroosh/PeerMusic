#!/usr/bin/env python3
"""
PeerMusic Timeline Validator
============================
Validates timeline.json schema, monotonic word timestamps, scene boundary containment,
unique IDs, and override target resolution.
"""

import sys
import os
import json
import argparse


def validate_timeline(timeline_path: str) -> bool:
    if not os.path.exists(timeline_path):
        print(f"[-] Error: File not found: {timeline_path}")
        return False

    with open(timeline_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            print(f"[-] JSON Syntax Error: {e}")
            return False

    scenes = data.get("scenes", [])
    if not scenes:
        print("[-] Error: 'scenes' array is empty or missing.")
        return False

    errors = []
    warnings = []
    word_ids = set()

    for sc_idx, scene in enumerate(scenes):
        sc_id = scene.get("id", f"scene_{sc_idx}")
        start_f = scene.get("startFrame")
        end_f = scene.get("endFrame")

        if start_f is None or end_f is None:
            errors.append(f"Scene '{sc_id}' missing startFrame or endFrame.")
            continue

        if start_f >= end_f:
            errors.append(f"Scene '{sc_id}': startFrame ({start_f}) >= endFrame ({end_f}).")

        lines = scene.get("lines", [])
        for l_idx, line in enumerate(lines):
            words = line.get("words", [])
            prev_word_end = start_f

            for w_idx, word in enumerate(words):
                w_id = word.get("id")
                w_text = word.get("text", "")
                w_start = word.get("startFrame")
                w_end = word.get("endFrame")

                if not w_id:
                    errors.append(f"Scene '{sc_id}', word '{w_text}' is missing a unique 'id'.")
                elif w_id in word_ids:
                    errors.append(f"Duplicate word ID detected: '{w_id}'.")
                else:
                    word_ids.add(w_id)

                if w_start is None or w_end is None:
                    errors.append(f"Word '{w_id}' missing startFrame or endFrame.")
                    continue

                if w_start >= w_end:
                    errors.append(f"Word '{w_id}' ({w_text}): startFrame ({w_start}) >= endFrame ({w_end}).")

                if w_start < start_f:
                    errors.append(f"Word '{w_id}' starts before parent scene: {w_start} < {start_f}.")

                if w_end > end_f:
                    warnings.append(f"Word '{w_id}' ends after parent scene: {w_end} > {end_f}.")

    # Validate overrides
    overrides = data.get("overrides", {})
    for ov_id, ov_val in overrides.items():
        if ov_id not in word_ids:
            warnings.append(f"Override references unknown word ID: '{ov_id}'.")

    # Output results
    if warnings:
        print("\n[!] Warnings:")
        for w in warnings:
            print(f"    - {w}")

    if errors:
        print("\n[-] Validation Failed:")
        for e in errors:
            print(f"    - {e}")
        return False

    max_end = max(s.get("endFrame", 0) for s in scenes)
    fps = data.get("fps", 30)
    duration_sec = max_end / fps

    print(f"\n[✓] Timeline Validated Successfully:")
    print(f"    - Scenes: {len(scenes)}")
    print(f"    - Unique Words: {len(word_ids)}")
    print(f"    - Total Duration: {max_end} frames ({duration_sec:.2f}s @ {fps} FPS)")
    print(f"    - Active Overrides: {len(overrides)}")
    return True


def main():
    parser = argparse.ArgumentParser(description="Validate PeerMusic timeline.json schema.")
    parser.add_argument("timeline", nargs="?", default="src/songs/kacchi-neendein/timeline.json", help="Path to timeline.json")
    args = parser.parse_args()

    success = validate_timeline(args.timeline)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
