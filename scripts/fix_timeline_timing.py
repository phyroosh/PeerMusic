#!/usr/bin/env python3
"""
PeerMusic Timeline Timing & Overlap Fixer
=========================================
1. Scans all timeline.json files in src/songs/*
2. Clamps any overlapping lines so Line N.endFrame <= Line N+1.startFrame
3. Ensures strict half-open non-overlapping boundaries for 0-delay switching
4. Validates and ensures parent scenes cleanly contain all their lines
"""

import os
import glob
import json
import argparse


def fix_timeline(file_path: str, dry_run: bool = False) -> int:
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    scenes = data.get("scenes", [])
    if not scenes:
        return 0

    fps = data.get("fps", 60)
    fixed_overlaps = 0

    # Collect all lines with references to parent scene and line index
    all_lines = []
    for sc_idx, scene in enumerate(scenes):
        for l_idx, line in enumerate(scene.get("lines", [])):
            words = line.get("words", [])
            if words:
                start_f = min(w["startFrame"] for w in words)
                end_f = max(w["endFrame"] for w in words)
                all_lines.append({
                    "sc_idx": sc_idx,
                    "l_idx": l_idx,
                    "scene": scene,
                    "line": line,
                    "words": words,
                    "start": start_f,
                    "end": end_f,
                })

    # Sort all lines by start frame
    all_lines.sort(key=lambda x: x["start"])

    # Check for overlaps between consecutive lines
    for i in range(len(all_lines) - 1):
        curr = all_lines[i]
        next_l = all_lines[i + 1]

        if curr["end"] > next_l["start"]:
            overlap = curr["end"] - next_l["start"]
            fixed_overlaps += 1
            print(f"  [FIX OVERLAP] {file_path}")
            print(f"    Line '{curr['line'].get('text', '')[:35]}' endFrame ({curr['end']}) > Next start ({next_l['start']}) [overlap: {overlap} frames = {overlap/fps:.2f}s]")

            # Clamp the end of the last word in curr to next_l["start"]
            new_end = next_l["start"]
            curr["end"] = new_end
            
            # Adjust words in curr if they exceed new_end
            for w in curr["words"]:
                if w["startFrame"] >= new_end:
                    w["startFrame"] = max(0, new_end - 1)
                if w["endFrame"] > new_end:
                    w["endFrame"] = new_end

    # Ensure parent scene boundaries cleanly encompass their lines
    for sc in scenes:
        lines = sc.get("lines", [])
        if lines:
            line_starts = []
            line_ends = []
            for l in lines:
                for w in l.get("words", []):
                    line_starts.append(w["startFrame"])
                    line_ends.append(w["endFrame"])
            if line_starts and line_ends:
                min_s = min(line_starts)
                max_e = max(line_ends)
                if sc["startFrame"] > min_s:
                    sc["startFrame"] = min_s
                if sc["endFrame"] < max_e:
                    sc["endFrame"] = max_e

    # Ensure scenes themselves don't have startFrame >= endFrame
    for sc in scenes:
        if sc["startFrame"] >= sc["endFrame"]:
            sc["endFrame"] = sc["startFrame"] + 60

    if fixed_overlaps > 0 and not dry_run:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"  [✓] Saved {file_path} with {fixed_overlaps} overlap(s) resolved.")
    elif fixed_overlaps == 0:
        print(f"  [✓] {file_path}: 0 overlaps detected. Perfectly aligned.")

    return fixed_overlaps


def main():
    parser = argparse.ArgumentParser(description="Fix timeline overlaps and timing desyncs.")
    parser.add_argument("--check", action="store_true", help="Dry run check only without modifying files")
    args = parser.parse_args()

    pattern = "src/songs/*/timeline.json"
    files = sorted(glob.glob(pattern))

    total_fixed = 0
    print(f"Checking {len(files)} song timeline(s)...")
    for f in files:
        total_fixed += fix_timeline(f, dry_run=args.check)

    print(f"\nDone! Total overlap issues resolved: {total_fixed}")


if __name__ == "__main__":
    main()
