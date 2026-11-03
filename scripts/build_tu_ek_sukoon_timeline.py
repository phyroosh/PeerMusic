#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Tu Ek Sukoon Sa Lagta Hai' (तू एक सुकून सा लगता है)
Audio: public/audio/tu_ek_sukoon_sa_lagta_hai.mp3 (227.167 seconds = 13,630 frames @ 60 FPS)
Radio: public/audio/tu_ek_sukoon_sa_lagta_hai_radio.mp3 (172.67 seconds = 10,360 frames @ 60 FPS)
Theme: SongCoverArtwork (Late-Night Cozy Monsoon Hindi Ballad)
"""

import os
import sys
import json
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.transcribe_sync import pick_line_accent_keyword

FPS = 60
TOTAL_DURATION_SEC = 227.167
TOTAL_FRAMES = int(round(TOTAL_DURATION_SEC * FPS))  # 13630

RADIO_DURATION_SEC = 172.67
RADIO_FRAMES = int(round(RADIO_DURATION_SEC * FPS))  # 10360

SONG_SLUG = "tu-ek-sukoon-sa-lagta-hai"
ALIGNMENTS_FILE = os.path.join(ROOT_DIR, "src", "songs", SONG_SLUG, "section_alignments.json")
OUTPUT_TIMELINE = os.path.join(ROOT_DIR, "src", "songs", SONG_SLUG, "timeline.json")
OUTPUT_RADIO_TIMELINE = os.path.join(ROOT_DIR, "src", "songs", SONG_SLUG, "timeline_radio.json")

def f(sec):
    return int(round(sec * FPS))

with open(ALIGNMENTS_FILE, "r", encoding="utf-8") as af:
    scenes_data = json.load(af)

SCENE_METADATA = {
    "scene_01_intro": {
        "sectionTag": "01 // INTRO  •  SOFT PIANO & RAIN",
        "hierarchy": "ATMOSPHERE_DOMINANT",
        "symbolKey": "steaming_coffee_mug",
        "subtitle": "Midnight rain against the window glass • Warm piano chords and distant humming",
    },
    "scene_02_verse_1": {
        "sectionTag": "02 // VERSE 1  •  CHAAND BHI AAJ DHEEMA LAGE",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "rainy_window",
        "subtitle": "The moon slows its pace • Cool breeze carrying your name",
    },
    "scene_03_chorus_1": {
        "sectionTag": "03 // CHORUS 1  •  TU EK SUKOON SA LAGTA HAI",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "steaming_coffee_mug",
        "subtitle": "Like a dream pausing in time • In this rushing world, my heart stays with you",
    },
    "scene_04_verse_2": {
        "sectionTag": "04 // VERSE 2  •  COFFEE KI KHUSHBOO, DHEEMI SI DHUN",
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "steaming_coffee_mug",
        "subtitle": "The aroma of warm coffee • Deserted streets asleep under amber glow",
    },
    "scene_05_chorus_2": {
        "sectionTag": "05 // CHORUS 2  •  IN LAMHON KO YAHIN REHNE DE",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "crescent_moon",
        "subtitle": "Let these moments linger • Let the night remain the night",
    },
    "scene_06_bridge": {
        "sectionTag": "06 // BRIDGE  •  AGAR KABHI THAK JAAYE DIL",
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "rainy_window",
        "subtitle": "Close your eyes if weary • I will meet you inside those quiet dreams",
    },
    "scene_07_outro": {
        "sectionTag": "07 // OUTRO  •  FADING PIANO & RAIN",
        "hierarchy": "ATMOSPHERE_DOMINANT",
        "symbolKey": "steaming_coffee_mug",
        "subtitle": "Night slowly descends • Blossoms of dreams awakening in silence",
    },
}

master_scenes = []
word_id_counter = 1

for sc_idx, s in enumerate(scenes_data):
    sid = s["id"]
    meta = SCENE_METADATA.get(sid, {
        "sectionTag": f"{sc_idx+1:02d} // {sid.upper()}",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "steaming_coffee_mug",
        "subtitle": s["name"]
    })

    sc_start_f = f(s["startSec"])
    sc_end_f = f(s["endSec"])

    scene_obj = {
        "id": sid,
        "name": s["name"],
        "sectionTag": meta["sectionTag"],
        "startFrame": sc_start_f,
        "endFrame": sc_end_f,
        "hierarchy": meta["hierarchy"],
        "symbolKey": meta["symbolKey"],
        "subtitle": meta["subtitle"],
        "lines": []
    }

    raw_lines = [l.strip() for l in s["text"].splitlines() if l.strip()]
    words_pool = list(s.get("words", []))
    w_ptr = 0

    for l_idx, raw_line in enumerate(raw_lines):
        line_tokens = [t.strip() for t in raw_line.split() if t.strip()]
        if not line_tokens:
            continue

        clean_text = raw_line.strip()
        accent_target = pick_line_accent_keyword(clean_text)

        # Assign words from words_pool matching token count
        n_tok = len(line_tokens)
        assigned_words = []
        if w_ptr < len(words_pool):
            assigned_words = words_pool[w_ptr : w_ptr + n_tok]
            w_ptr += n_tok

        if assigned_words:
            line_start_sec = assigned_words[0]["start"]
            line_end_sec = assigned_words[-1]["end"]
        else:
            portion = len(raw_lines)
            line_start_sec = s["startSec"] + (l_idx / portion) * (s["endSec"] - s["startSec"])
            line_end_sec = line_start_sec + 3.0

        line_start_f = f(line_start_sec)
        line_end_f = f(line_end_sec)

        # Minimum hold of 1.2s per line
        if line_end_f - line_start_f < 72:
            line_end_f = line_start_f + 72

        line_obj = {
            "id": f"l_{sc_idx+1:02d}_{l_idx+1:02d}",
            "text": clean_text,
            "startFrame": line_start_f,
            "endFrame": line_end_f,
            "accentWords": [accent_target] if accent_target else [],
            "words": []
        }

        for w_idx, w_data in enumerate(assigned_words):
            w_text = w_data.get("word", "")
            w_start_f = f(w_data.get("start", line_start_sec))
            w_end_f = f(w_data.get("end", line_end_sec))

            if w_end_f <= w_start_f:
                w_end_f = w_start_f + 8

            line_obj["words"].append({
                "id": f"w_{word_id_counter:04d}",
                "text": w_text,
                "startFrame": w_start_f,
                "endFrame": w_end_f
            })
            word_id_counter += 1

        scene_obj["lines"].append(line_obj)

    # Smooth adjacent line bounds inside the scene so couplets transition seamlessly
    for i in range(len(scene_obj["lines"]) - 1):
        cl = scene_obj["lines"][i]
        nl = scene_obj["lines"][i+1]
        if cl["endFrame"] > nl["startFrame"]:
            cl["endFrame"] = nl["startFrame"]
        elif nl["startFrame"] - cl["endFrame"] < 45: # < 0.75s hold
            cl["endFrame"] = nl["startFrame"]

    master_scenes.append(scene_obj)

# Ensure strictly contiguous scene boundaries and clamp bounds
for i in range(len(master_scenes) - 1):
    master_scenes[i]["endFrame"] = master_scenes[i+1]["startFrame"]
master_scenes[-1]["endFrame"] = TOTAL_FRAMES

# Clamp word and line end frames to their respective scene's endFrame
for s in master_scenes:
    sc_end = s["endFrame"]
    for l in s.get("lines", []):
        if l["endFrame"] > sc_end:
            l["endFrame"] = sc_end
        for w in l.get("words", []):
            if w["endFrame"] > sc_end:
                w["endFrame"] = sc_end
            if w["startFrame"] >= sc_end:
                w["startFrame"] = sc_end - 4

# Master Timeline
master_timeline = {
    "songTitle": "Tu Ek Sukoon Sa Lagta Hai (तू एक सुकून सा लगता है)",
    "audioFile": "audio/tu_ek_sukoon_sa_lagta_hai.mp3",
    "theme": "SongCoverArtwork",
    "fps": FPS,
    "totalFrames": TOTAL_FRAMES,
    "durationSeconds": TOTAL_DURATION_SEC,
    "coverImage": "covers/tu_ek_sukoon_sa_lagta_hai_clean_16x9.png",
    "scenes": master_scenes
}

with open(OUTPUT_TIMELINE, "w", encoding="utf-8") as f:
    json.dump(master_timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Saved master timeline.json with {len(master_scenes)} scenes and {TOTAL_FRAMES} frames ({TOTAL_DURATION_SEC:.2f}s)!")

# Radio Timeline (Compliant cut <= 172.67s / 10360 frames)
radio_scenes = []
for s in master_scenes:
    if s["startFrame"] >= RADIO_FRAMES:
        continue
    sc = dict(s)
    if sc["endFrame"] > RADIO_FRAMES:
        sc["endFrame"] = RADIO_FRAMES
        sc["lines"] = [dict(l) for l in sc.get("lines", []) if l["startFrame"] < RADIO_FRAMES]
        for l in sc["lines"]:
            if l["endFrame"] > RADIO_FRAMES:
                l["endFrame"] = RADIO_FRAMES
                l["words"] = [dict(w) for w in l.get("words", []) if w["startFrame"] < RADIO_FRAMES]
                for w in l["words"]:
                    if w["endFrame"] > RADIO_FRAMES:
                        w["endFrame"] = RADIO_FRAMES
    radio_scenes.append(sc)

radio_scenes[-1]["endFrame"] = RADIO_FRAMES

# Ensure radio scene words are strictly clamped
for s in radio_scenes:
    sc_end = s["endFrame"]
    for l in s.get("lines", []):
        if l["endFrame"] > sc_end:
            l["endFrame"] = sc_end
        for w in l.get("words", []):
            if w["endFrame"] > sc_end:
                w["endFrame"] = sc_end

radio_timeline = {
    "songTitle": "Tu Ek Sukoon Sa Lagta Hai (Radio Edit - तू एक सुकून सा लगता है)",
    "audioFile": "audio/tu_ek_sukoon_sa_lagta_hai_radio.mp3",
    "theme": "SongCoverArtwork",
    "fps": FPS,
    "totalFrames": RADIO_FRAMES,
    "durationSeconds": RADIO_DURATION_SEC,
    "coverImage": "covers/tu_ek_sukoon_sa_lagta_hai_clean_16x9.png",
    "scenes": radio_scenes
}

with open(OUTPUT_RADIO_TIMELINE, "w", encoding="utf-8") as f:
    json.dump(radio_timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Saved compliant radio timeline_radio.json with {len(radio_scenes)} scenes and {RADIO_FRAMES} frames ({RADIO_DURATION_SEC:.2f}s)!")
