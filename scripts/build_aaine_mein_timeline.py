#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Aaine Mein' (Cinematic Narrative Lyric Film)
Audio: public/audio/aaine_mein.mp3 (180.90s = 10,854 frames @ 60 FPS)
Theme: Cinematic Narrative Lyric Film (Official PeerMusic Option 3)
"""

import os
import sys
import json

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.duration_guard import measure_audio_duration

fps = 60
audio_path = os.path.join(ROOT_DIR, "public", "audio", "aaine_mein.mp3")
raw_sync_path = os.path.join(ROOT_DIR, "src", "songs", "aaine-mein", "raw_sync.json")
output_path = os.path.join(ROOT_DIR, "src", "songs", "aaine-mein", "timeline.json")

total_duration_sec = measure_audio_duration(audio_path)
total_frames = int(round(total_duration_sec * fps))

with open(raw_sync_path, "r", encoding="utf-8") as f:
    raw_sync = json.load(f)

lines = raw_sync.get("lines", [])

# Group lines into the 7 official narrative scenes
scene_specs = [
    {
        "id": "scene_01_intro",
        "name": "The Bazaar & Weary Footsteps",
        "sectionTag": "01 // INTRO • DUST & MEMORY",
        "startSec": 0.0,
        "endSec": 12.36,
        "line_indices": [0],
        "symbolKey": "antique_lantern",
        "subtitle": "Weary wandering through old alleys • A cry for meaning"
    },
    {
        "id": "scene_02_verse_1",
        "name": "The Antique Mirror Shop & The Shard Epiphany",
        "sectionTag": "02 // VERSE 1 • PURANAY SHEESHE",
        "startSec": 12.36,
        "endSec": 34.88,
        "line_indices": list(range(1, 9)),
        "symbolKey": "mirror_shard",
        "subtitle": "Antique glassmaker stall • First glimpse in the broken shard"
    },
    {
        "id": "scene_03_pre_chorus_and_chorus_1",
        "name": "Frozen Time & The Rainbow Prism Bloom",
        "sectionTag": "03 // CHORUS 1 • DHANAK SE RANG",
        "startSec": 34.88,
        "endSec": 72.08,
        "line_indices": list(range(9, 17)),
        "symbolKey": "rainbow_prism",
        "subtitle": "Time slows to zero • Prismatic awakening of first love"
    },
    {
        "id": "scene_04_verse_2",
        "name": "The Swaying Earring & Turning Around",
        "sectionTag": "04 // VERSE 2 • KAAN KI BAALI",
        "startSec": 72.08,
        "endSec": 95.08,
        "line_indices": list(range(17, 25)),
        "symbolKey": "filigree_earring",
        "subtitle": "The heartbeat pendulum • Wind through her hair and silent understanding"
    },
    {
        "id": "scene_05_pre_chorus_and_chorus_2",
        "name": "The Meeting of Paths & Chorus Escalation",
        "sectionTag": "05 // CHORUS 2 • IS MOD PAR",
        "startSec": 95.08,
        "endSec": 130.88,
        "line_indices": list(range(25, 32)),
        "symbolKey": "crossroads_lantern",
        "subtitle": "Two paths merging into one • Boundless celebration of fate"
    },
    {
        "id": "scene_06_bridge",
        "name": "The Chosen Road & Sitar Vibrations",
        "sectionTag": "06 // BRIDGE • SITAR KI TAAR",
        "startSec": 130.88,
        "endSec": 152.50,
        "line_indices": list(range(32, 37)),
        "symbolKey": "sitar_strings",
        "subtitle": "All distractions dissolve • Sitar strings vibrating with breath"
    },
    {
        "id": "scene_07_climax_and_outro",
        "name": "The Dual Reflection & Twilight Sanctuary",
        "sectionTag": "07 // OUTRO • PEHLI NAZAR MEIN",
        "startSec": 152.50,
        "endSec": total_duration_sec,
        "line_indices": list(range(37, 45)),
        "symbolKey": "dual_reflection",
        "subtitle": "Final emotional crescendo • Two souls reflected in peace"
    }
]

scenes = []
global_word_count = 0

for sc_idx, spec in enumerate(scene_specs):
    scene_start_frame = int(round(spec["startSec"] * fps))
    scene_end_frame = int(round(spec["endSec"] * fps))
    
    scene_lines = []
    for l_idx in spec["line_indices"]:
        if l_idx < len(lines):
            l_data = lines[l_idx]
            
            l_start_frame = int(round(l_data["startTime"] * fps))
            l_end_frame = int(round(l_data["endTime"] * fps))
            
            # Words array with guaranteed positive duration and unique IDs
            raw_words = l_data.get("words", [])
            scene_words = []
            
            # First pass: parse frames
            word_frames = []
            for w in raw_words:
                wsf = w.get("startFrame", int(round(w.get("startTime", 0) * fps)))
                wef = w.get("endFrame", int(round(w.get("endTime", 0) * fps)))
                word_frames.append((w["text"], wsf, wef))
            
            # Second pass: enforce strict monotonicity and min-duration (>= 8 frames)
            cur_time = max(l_start_frame, scene_start_frame)
            for w_idx, (wtext, wsf, wef) in enumerate(word_frames):
                global_word_count += 1
                start_f = max(wsf, cur_time)
                # Minimum duration of 8 frames (~133ms)
                end_f = max(wef, start_f + 8)
                cur_time = end_f
                
                is_accent = wtext.strip(".,!?\"'()").lower() in [
                    "rabba", "galiyon", "sheeshe", "chamki", "aks", "pyar", "dhanak", "mod",
                    "baali", "dhadkan", "jhulfein", "ankhein", "rasta", "sitar", "saanson", "pehli"
                ]
                
                scene_words.append({
                    "id": f"w_{sc_idx+1}_{l_idx+1}_{w_idx+1}",
                    "text": wtext,
                    "startFrame": start_f,
                    "endFrame": end_f,
                    "accent": is_accent
                })
            
            if scene_words:
                l_start_frame = scene_words[0]["startFrame"]
                l_end_frame = scene_words[-1]["endFrame"]
            
            scene_lines.append({
                "id": f"line_{l_idx+1}",
                "text": l_data["text"],
                "startTime": round(l_start_frame / fps, 3),
                "endTime": round(l_end_frame / fps, 3),
                "startFrame": l_start_frame,
                "endFrame": l_end_frame,
                "words": scene_words
            })
            
    # Clamp scene start/end frames to contain all lines
    if scene_lines:
        scene_start_frame = min(scene_start_frame, scene_lines[0]["startFrame"])
        scene_end_frame = max(scene_end_frame, scene_lines[-1]["endFrame"])
    
    # Ensure final scene extends to total audio frames
    if sc_idx == len(scene_specs) - 1:
        scene_end_frame = total_frames
        
    scenes.append({
        "id": spec["id"],
        "name": spec["name"],
        "sectionTag": spec["sectionTag"],
        "startSec": round(scene_start_frame / fps, 3),
        "endSec": round(scene_end_frame / fps, 3),
        "startFrame": scene_start_frame,
        "endFrame": scene_end_frame,
        "symbolKey": spec["symbolKey"],
        "subtitle": spec["subtitle"],
        "lines": scene_lines
    })

timeline_data = {
    "title": "Aaine Mein",
    "artist": "PeerMusic Originals",
    "theme": "Cinematic Narrative Lyric Film",
    "uncut": True,
    "fps": fps,
    "duration": round(total_duration_sec, 3),
    "durationInFrames": total_frames,
    "audioFile": "audio/aaine_mein.mp3",
    "totalWords": sum(len(l["words"]) for s in scenes for l in s["lines"]),
    "totalLines": sum(len(s["lines"]) for s in scenes),
    "scenes": scenes
}

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline_data, f, indent=2, ensure_ascii=False)

print(f"[✓] Successfully generated timeline at {output_path}")
print(f"    - Total duration: {total_duration_sec:.2f}s ({total_frames} frames @ {fps} FPS)")
print(f"    - Scenes: {len(scenes)}")
print(f"    - Total Lines: {timeline_data['totalLines']}")
print(f"    - Total Words: {timeline_data['totalWords']}")
