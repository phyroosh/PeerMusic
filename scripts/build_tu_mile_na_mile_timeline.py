#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Tu Mile Na Mile' (तू मिले ना मिले)
Audio: public/audio/tu_mile_na_mile.mp3 (233.11 seconds = 13,987 frames @ 60 FPS)
Radio: public/audio/tu_mile_na_mile_radio.mp3 (176.50 seconds = 10,590 frames @ 60 FPS)
Theme: SongCoverArtwork (Late-Night Soulful Bollywood Indie Ballad)
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
TOTAL_DURATION_SEC = 233.112
TOTAL_FRAMES = int(round(TOTAL_DURATION_SEC * FPS))  # 13987

RADIO_DURATION_SEC = 176.50
RADIO_FRAMES = int(round(RADIO_DURATION_SEC * FPS))  # 10590

ALIGNMENTS_FILE = os.path.join(ROOT_DIR, "src", "songs", "tu-mile-na-mile", "section_alignments.json")
OUTPUT_TIMELINE = os.path.join(ROOT_DIR, "src", "songs", "tu-mile-na-mile", "timeline.json")
OUTPUT_RADIO_TIMELINE = os.path.join(ROOT_DIR, "src", "songs", "tu-mile-na-mile", "timeline_radio.json")

def f(sec):
    return int(round(sec * FPS))

with open(ALIGNMENTS_FILE, "r", encoding="utf-8") as af:
    scenes_data = json.load(af)

SCENE_METADATA = {
    "scene_01_intro": {
        "sectionTag": "01 // INTRO  •  SOFT HUMMING & VINYL CRACKLE",
        "hierarchy": "ATMOSPHERE_DOMINANT",
        "symbolKey": "rainy_window",
        "subtitle": "Midnight raindrops on the glass pane • Vinyl crackle and distant soft humming",
    },
    "scene_02_verse_1": {
        "sectionTag": "02 // VERSE 1  •  KHIDKI PE CHAAND",
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "steaming_chai",
        "subtitle": "A cold cup of chai on the windowsill • Unsent letters under moonlight",
    },
    "scene_03_prechorus_1": {
        "sectionTag": "03 // PRE-CHORUS  •  YEH RAAT POOCHTI HAI",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "glowing_streetlamp",
        "subtitle": "The night asks for your address • A quiet smile acknowledging the distance",
    },
    "scene_04_chorus_1": {
        "sectionTag": "04 // CHORUS  •  TU MILE NA MILE",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "crescent_moon",
        "subtitle": "Whether you are found or not, you feel right here • In this quiet midnight silence",
    },
    "scene_05_interlude": {
        "sectionTag": "05 // INTERLUDE  •  LO-FI ELECTRIC PIANO",
        "hierarchy": "ATMOSPHERE_DOMINANT",
        "symbolKey": "rainy_window",
        "subtitle": "Mellow electric piano chords drift with the rainfall • Your name echoes until morning",
    },
    "scene_06_verse_2": {
        "sectionTag": "06 // VERSE 2  •  SADKEIN BHI SO GAYIN",
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "yellow_streetlamp",
        "subtitle": "Deserted streets asleep in the rain • Memories glowing beneath amber sodium lamps",
    },
    "scene_07_prechorus_2": {
        "sectionTag": "07 // PRE-CHORUS  •  WAQT NE KEH DIYA",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "steaming_chai",
        "subtitle": "Time told me to forget • How do I explain this heart?",
    },
    "scene_08_chorus_2": {
        "sectionTag": "08 // CHORUS  •  FULLER ARRANGEMENT",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "crescent_moon",
        "subtitle": "In every heartbeat, you feel like home • The moon sinks as I stay awake",
    },
    "scene_09_bridge": {
        "sectionTag": "09 // BRIDGE  •  WHISPERED REVERIE",
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "window_candle",
        "subtitle": "If ever your paths turn this way • No promises, no grievances, only prayers for your safety",
    },
    "scene_10_chorus_final": {
        "sectionTag": "10 // FINAL CHORUS  •  BUJHTE HUE DIL MEIN",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "crescent_moon",
        "subtitle": "Like a small earthen lamp in a weary heart • Your presence lingers in every silence",
    },
    "scene_11_outro": {
        "sectionTag": "11 // OUTRO  •  FADING PIANO & RAIN",
        "hierarchy": "ATMOSPHERE_DOMINANT",
        "symbolKey": "rainy_window",
        "subtitle": "The city falls asleep, the moon is lost • The heart whispers your name until dawn",
    },
}

master_scenes = []
word_id_counter = 1

for sc_idx, s in enumerate(scenes_data):
    sid = s["id"]
    meta = SCENE_METADATA.get(sid, {
        "sectionTag": f"{sc_idx+1:02d} // {sid.upper()}",
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "rainy_window",
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
            l_start_sec = assigned_words[0]["start"]
            l_end_sec = assigned_words[-1]["end"]
        else:
            # Fallback to evenly interpolated fraction inside scene
            frac_st = l_idx / len(raw_lines)
            frac_en = (l_idx + 1) / len(raw_lines)
            l_start_sec = s["startSec"] + frac_st * (s["endSec"] - s["startSec"])
            l_end_sec = s["startSec"] + frac_en * (s["endSec"] - s["startSec"])

        l_start_f = max(sc_start_f, f(l_start_sec))
        l_end_f = min(sc_end_f, max(l_start_f + 30, f(l_end_sec)))

        line_id = f"line_{sc_idx+1:02d}_{l_idx+1:02d}"
        line_obj = {
            "id": line_id,
            "text": clean_text,
            "startTime": round(l_start_sec, 3),
            "endTime": round(l_end_sec, 3),
            "startFrame": l_start_f,
            "endFrame": l_end_f,
            "words": []
        }

        curr_w_f = l_start_f
        for w_i, token in enumerate(line_tokens):
            if w_i < len(assigned_words):
                w_info = assigned_words[w_i]
                w_st_f = max(curr_w_f, f(w_info["start"]))
                w_en_f = max(w_st_f + 4, f(w_info["end"]))
            else:
                w_st_f = curr_w_f
                w_en_f = curr_w_f + 8

            clean_token = re.sub(r"[^\w\u0900-\u097F]", "", token)
            is_accent = bool(accent_target and (accent_target in clean_token or clean_token in accent_target))

            w_st_f = max(sc_start_f, min(w_st_f, sc_end_f - 4))
            w_en_f = min(sc_end_f, max(w_st_f + 4, w_en_f))

            line_obj["words"].append({
                "id": f"w_{sc_idx+1:02d}_{word_id_counter:04d}",
                "text": token,
                "startFrame": w_st_f,
                "endFrame": w_en_f,
                "accent": is_accent
            })
            curr_w_f = w_en_f
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

# Ensure strictly contiguous scene boundaries
for i in range(len(master_scenes) - 1):
    master_scenes[i]["endFrame"] = master_scenes[i+1]["startFrame"]
master_scenes[-1]["endFrame"] = TOTAL_FRAMES

# Master Timeline
master_timeline = {
    "songTitle": "Tu Mile Na Mile (तू मिले ना मिले)",
    "audioFile": "audio/tu_mile_na_mile.mp3",
    "theme": "SongCoverArtwork",
    "fps": FPS,
    "totalFrames": TOTAL_FRAMES,
    "durationSeconds": TOTAL_DURATION_SEC,
    "coverImage": "covers/tu_mile_na_mile_clean_16x9.png",
    "scenes": master_scenes
}

with open(OUTPUT_TIMELINE, "w", encoding="utf-8") as f:
    json.dump(master_timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Saved master timeline.json with {len(master_scenes)} scenes and {TOTAL_FRAMES} frames ({TOTAL_DURATION_SEC:.2f}s)!")

# Radio Timeline (Compliant cut <= 176.50s / 10590 frames)
radio_scenes = []
for s in master_scenes:
    if s["startFrame"] >= RADIO_FRAMES:
        continue
    sc = dict(s)
    if sc["endFrame"] > RADIO_FRAMES:
        sc["endFrame"] = RADIO_FRAMES
        sc["lines"] = [l for l in sc.get("lines", []) if l["startFrame"] < RADIO_FRAMES]
        for l in sc["lines"]:
            if l["endFrame"] > RADIO_FRAMES:
                l["endFrame"] = RADIO_FRAMES
                l["words"] = [w for w in l.get("words", []) if w["startFrame"] < RADIO_FRAMES]
                for w in l["words"]:
                    if w["endFrame"] > RADIO_FRAMES:
                        w["endFrame"] = RADIO_FRAMES
    radio_scenes.append(sc)

radio_scenes[-1]["endFrame"] = RADIO_FRAMES

radio_timeline = {
    "songTitle": "Tu Mile Na Mile (Radio Edit - तू मिले ना मिले)",
    "audioFile": "audio/tu_mile_na_mile_radio.mp3",
    "theme": "SongCoverArtwork",
    "fps": FPS,
    "totalFrames": RADIO_FRAMES,
    "durationSeconds": RADIO_DURATION_SEC,
    "coverImage": "covers/tu_mile_na_mile_clean_16x9.png",
    "scenes": radio_scenes
}

with open(OUTPUT_RADIO_TIMELINE, "w", encoding="utf-8") as f:
    json.dump(radio_timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Saved compliant radio timeline_radio.json with {len(radio_scenes)} scenes and {RADIO_FRAMES} frames ({RADIO_DURATION_SEC:.2f}s)!")
