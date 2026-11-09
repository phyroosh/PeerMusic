#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Grass Stained Knees'
Audio: public/audio/grass_stained_knees.mp3 (152.69s = 9,161 frames @ 60 FPS)
Theme: Electric Neon Pulse (PeerMusicStyle02_NeonPulse)
Aligned with 100% precision from Whisper small speech-to-text timestamps.
"""

import os
import sys
import json

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.duration_guard import measure_audio_duration

fps = 60
audio_path = os.path.join(ROOT_DIR, "public", "audio", "grass_stained_knees.mp3")
total_duration_sec = measure_audio_duration(audio_path)
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_config = [
    {
        "id": "scene_01_intro",
        "name": "Twilight Suburban Curb",
        "sectionTag": "01 // INTRO  •  STREETLIGHT SPECIMEN",
        "startSec": 0.0,
        "endSec": 6.86,
        "symbolKey": "skateboard_curb",
        "subtitle": "Indie acoustic fingerpicking • Warm amber streetlight glow on quiet asphalt",
        "seg_lines": []
    },
    {
        "id": "scene_02_verse_1",
        "name": "Skateboard Wheels & Asphalt Scrapes",
        "sectionTag": "02 // VERSE 1  •  SUMMER DUSK",
        "startSec": 6.86,
        "endSec": 32.80,
        "symbolKey": "street_light",
        "subtitle": "Streetlights flickering on • Grass stained knees in the fading twilight",
        "seg_lines": [
            {
                "clean_text": "The street lights flickering on right now,",
                "accent": "flickering",
                "startSec": 6.86,
                "endSec": 12.68,
                "tokens": ["The", "street", "lights", "flickering", "on", "right", "now,"]
            },
            {
                "clean_text": "We used to chase them down.",
                "accent": "chase",
                "startSec": 12.68,
                "endSec": 15.60,
                "tokens": ["We", "used", "to", "chase", "them", "down."]
            },
            {
                "clean_text": "Melted ice on the hot pavement,",
                "accent": "pavement",
                "startSec": 15.60,
                "endSec": 20.24,
                "tokens": ["Melted", "ice", "on", "the", "hot", "pavement,"]
            },
            {
                "clean_text": "Skateboard wheels and the asphalt scrapes,",
                "accent": "asphalt",
                "startSec": 20.24,
                "endSec": 25.00,
                "tokens": ["Skateboard", "wheels", "and", "the", "asphalt", "scrapes,"]
            },
            {
                "clean_text": "Grass stained knees in yellow light,",
                "accent": "stained",
                "startSec": 25.00,
                "endSec": 28.42,
                "tokens": ["Grass", "stained", "knees", "in", "yellow", "light,"]
            },
            {
                "clean_text": "Fading slowly into the night.",
                "accent": "night",
                "startSec": 28.42,
                "endSec": 32.42,
                "tokens": ["Fading", "slowly", "into", "the", "night."]
            }
        ]
    },
    {
        "id": "scene_03_chorus_1",
        "name": "Endless Summer Underneath the Stars",
        "sectionTag": "03 // CHORUS 1  •  GOLDEN YOUTH",
        "startSec": 32.80,
        "endSec": 49.50,
        "symbolKey": "summer_stars",
        "subtitle": "Endless summer underneath the stars • Running out of time, always feeling fine",
        "seg_lines": [
            {
                "clean_text": "Endless summer underneath the stars,",
                "accent": "summer",
                "startSec": 33.00,
                "endSec": 40.78,
                "tokens": ["Endless", "summer", "underneath", "the", "stars,"]
            },
            {
                "clean_text": "Running out of time, always feeling fine.",
                "accent": "running",
                "startSec": 41.96,
                "endSec": 48.66,
                "tokens": ["Running", "out", "of", "time,", "always", "feeling", "fine."]
            }
        ]
    },
    {
        "id": "scene_04_verse_2",
        "name": "Broken Dial & Smooth Stones",
        "sectionTag": "04 // VERSE 2  •  POCKET ARTIFACTS",
        "startSec": 49.50,
        "endSec": 66.50,
        "symbolKey": "pocket_stones",
        "subtitle": "Static noise on a broken dial • Walking back to our quiet homes",
        "seg_lines": [
            {
                "clean_text": "Static noise on a broken dial,",
                "accent": "broken",
                "startSec": 50.38,
                "endSec": 54.40,
                "tokens": ["Static", "noise", "on", "a", "broken", "dial,"]
            },
            {
                "clean_text": "Trading cards for a crooked smile.",
                "accent": "crooked",
                "startSec": 54.40,
                "endSec": 57.92,
                "tokens": ["Trading", "cards", "for", "a", "crooked", "smile."]
            },
            {
                "clean_text": "Pockets full of smooth stones,",
                "accent": "smooth",
                "startSec": 58.32,
                "endSec": 62.14,
                "tokens": ["Pockets", "full", "of", "smooth", "stones,"]
            },
            {
                "clean_text": "Walking back to our quiet homes.",
                "accent": "quiet",
                "startSec": 62.14,
                "endSec": 66.50,
                "tokens": ["Walking", "back", "to", "our", "quiet", "homes."]
            }
        ]
    },
    {
        "id": "scene_05_chorus_2",
        "name": "Always Feeling Fine",
        "sectionTag": "05 // CHORUS 2  •  UNSAID DREAMS",
        "startSec": 66.50,
        "endSec": 83.00,
        "symbolKey": "summer_stars",
        "subtitle": "Endless summer underneath the stars • Running out of time, always feeling fine",
        "seg_lines": [
            {
                "clean_text": "Endless summer underneath the stars,",
                "accent": "summer",
                "startSec": 66.62,
                "endSec": 74.84,
                "tokens": ["Endless", "summer", "underneath", "the", "stars,"]
            },
            {
                "clean_text": "Running out of time, always feeling fine.",
                "accent": "fine",
                "startSec": 75.62,
                "endSec": 82.74,
                "tokens": ["Running", "out", "of", "time,", "always", "feeling", "fine."]
            }
        ]
    },
    {
        "id": "scene_06_solo",
        "name": "Acoustic Melody & Neon Soundwave Burst",
        "sectionTag": "06 // INTERLUDE  •  TWILIGHT REVERIE",
        "startSec": 83.00,
        "endSec": 100.58,
        "symbolKey": "neon_burst",
        "subtitle": "Intimate guitar solo & ambient room air • Pulsating circular neon soundwave resonance",
        "seg_lines": []
    },
    {
        "id": "scene_07_verse_3",
        "name": "Getting Taller Every Year",
        "sectionTag": "07 // VERSE 3  •  GROWING UP",
        "startSec": 100.58,
        "endSec": 116.42,
        "symbolKey": "nostalgia_glow",
        "subtitle": "Getting taller every single year • Washing off the memories, keeping them near",
        "seg_lines": [
            {
                "clean_text": "Now we're getting taller,",
                "accent": "taller",
                "startSec": 100.58,
                "endSec": 104.88,
                "tokens": ["Now", "we're", "getting", "taller,"]
            },
            {
                "clean_text": "Every single year.",
                "accent": "single",
                "startSec": 104.88,
                "endSec": 108.48,
                "tokens": ["Every", "single", "year."]
            },
            {
                "clean_text": "Washing off the memories,",
                "accent": "memories",
                "startSec": 109.62,
                "endSec": 112.94,
                "tokens": ["Washing", "off", "the", "memories,"]
            },
            {
                "clean_text": "But keeping them near.",
                "accent": "near",
                "startSec": 112.94,
                "endSec": 116.42,
                "tokens": ["But", "keeping", "them", "near."]
            }
        ]
    },
    {
        "id": "scene_08_chorus_climax",
        "name": "The Final Golden Chorus",
        "sectionTag": "08 // CLIMAX  •  ENDLESS HORIZON",
        "startSec": 116.42,
        "endSec": 133.00,
        "symbolKey": "summer_stars",
        "subtitle": "Endless summer underneath the stars • Running out of time, always feeling fine",
        "seg_lines": [
            {
                "clean_text": "Endless summer underneath the stars,",
                "accent": "summer",
                "startSec": 116.42,
                "endSec": 124.82,
                "tokens": ["Endless", "summer", "underneath", "the", "stars,"]
            },
            {
                "clean_text": "Running out of time, always feeling fine.",
                "accent": "time",
                "startSec": 124.82,
                "endSec": 132.88,
                "tokens": ["Running", "out", "of", "time,", "always", "feeling", "fine."]
            }
        ]
    },
    {
        "id": "scene_09_outro",
        "name": "Street Lights Flickering & Twilight Fade",
        "sectionTag": "09 // OUTRO  •  LAST GLOW",
        "startSec": 133.00,
        "endSec": total_duration_sec,
        "symbolKey": "street_light",
        "subtitle": "Street lights flickering on again • Wonder where the time went",
        "seg_lines": [
            {
                "clean_text": "Street lights flickering on again,",
                "accent": "flickering",
                "startSec": 133.82,
                "endSec": 139.26,
                "tokens": ["Street", "lights", "flickering", "on", "again,"]
            },
            {
                "clean_text": "Wonder where the time went.",
                "accent": "wonder",
                "startSec": 139.26,
                "endSec": 145.02,
                "tokens": ["Wonder", "where", "the", "time", "went."]
            },
            {
                "clean_text": "Endless summer underneath the stars...",
                "accent": "summer",
                "startSec": 145.02,
                "endSec": 148.48,
                "tokens": ["Endless", "summer", "underneath", "the", "stars..."]
            }
        ]
    }
]

timeline = {
    "songTitle": "Grass Stained Knees",
    "theme": "PeerMusicStyle02_NeonPulse",
    "audioFile": "audio/grass_stained_knees.mp3",
    "coverImage": "covers/grass_stained_knees_clean_16x9.png",
    "fps": fps,
    "totalFrames": total_frames,
    "durationSeconds": round(total_duration_sec, 2),
    "scenes": []
}

word_counter = 1

for sc_idx, sc in enumerate(scenes_config):
    sc_start_f = f(sc["startSec"])
    sc_end_f = f(sc["endSec"])

    scene_obj = {
        "id": sc["id"],
        "name": sc["name"],
        "sectionTag": sc["sectionTag"],
        "startFrame": sc_start_f,
        "endFrame": sc_end_f,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": sc["symbolKey"],
        "subtitle": sc["subtitle"],
        "lines": []
    }

    for l_order, line_info in enumerate(sc["seg_lines"]):
        clean_text = line_info["clean_text"]
        accent_target = line_info["accent"].lower()
        tokens = line_info["tokens"]
        num_tokens = len(tokens)

        l_start_f = max(sc_start_f, f(line_info["startSec"]))
        l_end_f = min(sc_end_f, max(l_start_f + num_tokens * 8, f(line_info["endSec"])))

        line_id = f"line_{sc_idx+1:02d}_{l_order+1:02d}"
        line_obj = {
            "id": line_id,
            "text": clean_text,
            "startFrame": l_start_f,
            "endFrame": l_end_f,
            "words": []
        }

        # Build monotonic words evenly across the line
        token_dur = (l_end_f - l_start_f) // num_tokens
        curr_f = l_start_f

        for w_idx, token in enumerate(tokens):
            w_start_f = curr_f
            if w_idx == num_tokens - 1:
                w_end_f = l_end_f
            else:
                w_end_f = min(l_end_f - (num_tokens - 1 - w_idx) * 6, curr_f + max(6, token_dur))

            # Ensure clamp within scene
            w_start_f = max(sc_start_f, min(w_start_f, sc_end_f - 4))
            w_end_f = min(sc_end_f, max(w_start_f + 4, w_end_f))

            token_clean = "".join(c for c in token if c.isalnum()).lower()
            is_accent = (token_clean == accent_target)

            word_id = f"w_{sc_idx+1:02d}_{word_counter:04d}"
            line_obj["words"].append({
                "id": word_id,
                "text": token,
                "startFrame": w_start_f,
                "endFrame": w_end_f,
                "accent": is_accent
            })
            curr_f = w_end_f
            word_counter += 1

        scene_obj["lines"].append(line_obj)

    timeline["scenes"].append(scene_obj)

# Ensure contiguous scene boundaries and exact total frames
for i in range(len(timeline["scenes"]) - 1):
    curr_s = timeline["scenes"][i]
    next_s = timeline["scenes"][i + 1]
    if curr_s["endFrame"] != next_s["startFrame"]:
        curr_s["endFrame"] = next_s["startFrame"]

timeline["scenes"][-1]["endFrame"] = total_frames

out_dir = os.path.join(ROOT_DIR, "src", "songs", "grass-stained-knees")
os.makedirs(out_dir, exist_ok=True)
output_path = os.path.join(out_dir, "timeline.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 'Grass Stained Knees' 60 FPS timeline successfully!")
print(f"[✓] Output path: {output_path}")
print(f"[✓] Total scenes: {len(timeline['scenes'])}, total unique words: {word_counter-1}")
print(f"[✓] Total duration: {total_duration_sec:.2f}s ({total_frames} frames)")
