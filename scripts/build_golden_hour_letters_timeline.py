#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Golden Hour Letters' (English Indie Pop / Acoustic Ballad)
Audio: public/audio/golden_hour_letters.mp3 (180.00 seconds = 10800 frames @ 60 FPS)
Theme: Botanical Scrapbook / Vintage Letter Desk (Dusk Amber Reverie)
"""

import os
import json

fps = 60
total_duration_sec = 180.0
total_frames = int(round(total_duration_sec * fps))


def f(sec):
    return int(round(sec * fps))


scenes_raw = [
    {
        "id": "scene_01_intro",
        "name": "Amber Light & Paper Shadows",
        "sectionTag": "01 // INTRO  •  GOLDEN HOUR LETTERS",
        "startSec": 0.0,
        "endSec": 15.0,
        "subtitle": "Warm fingerpicked acoustic guitar • Amber dusk light slanting across an old writing desk",
        "lines": []
    },
    {
        "id": "scene_02_verse1_coat",
        "name": "Winter Coat & Folded Letter",
        "sectionTag": "02 // VERSE 1  •  WINTER COAT",
        "startSec": 15.0,
        "endSec": 32.0,
        "subtitle": "Unfolding paper from an old pocket • Dust motes floating in the afternoon warmth",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Found your letter folded in my winter coat,",
                "words": [
                    {"text": "Found", "start": 15.4, "end": 16.2, "accent": True},
                    {"text": "your", "start": 16.2, "end": 16.8, "accent": False},
                    {"text": "letter", "start": 16.8, "end": 18.0, "accent": True},
                    {"text": "folded", "start": 18.0, "end": 19.1, "accent": False},
                    {"text": "in", "start": 19.1, "end": 19.5, "accent": False},
                    {"text": "my", "start": 19.5, "end": 20.0, "accent": False},
                    {"text": "winter", "start": 20.0, "end": 21.0, "accent": True},
                    {"text": "coat,", "start": 21.0, "end": 22.0, "accent": False}
                ]
            },
            {
                "id": "line_02_02",
                "text": "Every word you typed, every line you wrote.",
                "words": [
                    {"text": "Every", "start": 22.6, "end": 23.4, "accent": False},
                    {"text": "word", "start": 23.4, "end": 24.2, "accent": True},
                    {"text": "you", "start": 24.2, "end": 24.7, "accent": False},
                    {"text": "typed,", "start": 24.7, "end": 25.8, "accent": False},
                    {"text": "every", "start": 26.2, "end": 27.0, "accent": False},
                    {"text": "line", "start": 27.0, "end": 27.8, "accent": True},
                    {"text": "you", "start": 27.8, "end": 28.3, "accent": False},
                    {"text": "wrote.", "start": 28.3, "end": 30.5, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_03_verse1_season",
        "name": "Dust Motes & Leaving Seasons",
        "sectionTag": "03 // VERSE 1  •  OCTOBER AIR",
        "startSec": 32.0,
        "endSec": 48.0,
        "subtitle": "Quiet afternoon reverie • How quickly autumn slips away",
        "lines": [
            {
                "id": "line_03_01",
                "text": "Dust motes dancing in the amber afternoon,",
                "words": [
                    {"text": "Dust", "start": 32.4, "end": 33.1, "accent": True},
                    {"text": "motes", "start": 33.1, "end": 33.8, "accent": False},
                    {"text": "dancing", "start": 33.8, "end": 35.0, "accent": True},
                    {"text": "in", "start": 35.0, "end": 35.4, "accent": False},
                    {"text": "the", "start": 35.4, "end": 35.8, "accent": False},
                    {"text": "amber", "start": 35.8, "end": 37.0, "accent": True},
                    {"text": "afternoon,", "start": 37.0, "end": 38.6, "accent": False}
                ]
            },
            {
                "id": "line_03_02",
                "text": "Funny how a season always leaves too soon.",
                "words": [
                    {"text": "Funny", "start": 39.2, "end": 40.0, "accent": True},
                    {"text": "how", "start": 40.0, "end": 40.5, "accent": False},
                    {"text": "a", "start": 40.5, "end": 40.9, "accent": False},
                    {"text": "season", "start": 40.9, "end": 42.0, "accent": True},
                    {"text": "always", "start": 42.0, "end": 43.1, "accent": False},
                    {"text": "leaves", "start": 43.1, "end": 44.2, "accent": True},
                    {"text": "too", "start": 44.2, "end": 44.8, "accent": False},
                    {"text": "soon.", "start": 44.8, "end": 46.5, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_04_prechorus",
        "name": "Promises & Passing Years",
        "sectionTag": "04 // PRE-CHORUS  •  TWO HEARTBEATS",
        "startSec": 48.0,
        "endSec": 63.0,
        "subtitle": "Building emotional momentum • Two distant lives moving through the night",
        "lines": [
            {
                "id": "line_04_01",
                "text": "We swore that time would never pull us apart,",
                "words": [
                    {"text": "We", "start": 48.4, "end": 48.9, "accent": False},
                    {"text": "swore", "start": 48.9, "end": 49.8, "accent": True},
                    {"text": "that", "start": 49.8, "end": 50.3, "accent": False},
                    {"text": "time", "start": 50.3, "end": 51.4, "accent": True},
                    {"text": "would", "start": 51.4, "end": 52.0, "accent": False},
                    {"text": "never", "start": 52.0, "end": 52.9, "accent": True},
                    {"text": "pull", "start": 52.9, "end": 53.6, "accent": False},
                    {"text": "us", "start": 53.6, "end": 54.1, "accent": False},
                    {"text": "apart,", "start": 54.1, "end": 55.4, "accent": False}
                ]
            },
            {
                "id": "line_04_02",
                "text": "Now we're just two heartbeats beating in the dark.",
                "words": [
                    {"text": "Now", "start": 56.0, "end": 56.6, "accent": False},
                    {"text": "we're", "start": 56.6, "end": 57.2, "accent": False},
                    {"text": "just", "start": 57.2, "end": 57.8, "accent": False},
                    {"text": "two", "start": 57.8, "end": 58.4, "accent": False},
                    {"text": "heartbeats", "start": 58.4, "end": 59.8, "accent": True},
                    {"text": "beating", "start": 59.8, "end": 60.7, "accent": False},
                    {"text": "in", "start": 60.7, "end": 61.1, "accent": False},
                    {"text": "the", "start": 61.1, "end": 61.5, "accent": False},
                    {"text": "dark.", "start": 61.5, "end": 62.8, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_05_chorus",
        "name": "The Golden Hour Climax",
        "sectionTag": "05 // CHORUS  •  GOLDEN HOUR",
        "startSec": 63.0,
        "endSec": 83.0,
        "subtitle": "Soaring melodic hook • Quiet shadows and memories that never tarnish",
        "lines": [
            {
                "id": "line_05_01",
                "text": "And the golden hour fades along the kitchen floor,",
                "words": [
                    {"text": "And", "start": 63.4, "end": 63.8, "accent": False},
                    {"text": "the", "start": 63.8, "end": 64.2, "accent": False},
                    {"text": "golden", "start": 64.2, "end": 65.4, "accent": True},
                    {"text": "hour", "start": 65.4, "end": 66.2, "accent": False},
                    {"text": "fades", "start": 66.2, "end": 67.2, "accent": True},
                    {"text": "along", "start": 67.2, "end": 68.0, "accent": False},
                    {"text": "the", "start": 68.0, "end": 68.4, "accent": False},
                    {"text": "kitchen", "start": 68.4, "end": 69.4, "accent": False},
                    {"text": "floor,", "start": 69.4, "end": 70.8, "accent": False}
                ]
            },
            {
                "id": "line_05_02",
                "text": "Leaving quiet shadows where you stood before.",
                "words": [
                    {"text": "Leaving", "start": 71.4, "end": 72.3, "accent": False},
                    {"text": "quiet", "start": 72.3, "end": 73.2, "accent": True},
                    {"text": "shadows", "start": 73.2, "end": 74.4, "accent": True},
                    {"text": "where", "start": 74.4, "end": 75.0, "accent": False},
                    {"text": "you", "start": 75.0, "end": 75.5, "accent": False},
                    {"text": "stood", "start": 75.5, "end": 76.4, "accent": True},
                    {"text": "before.", "start": 76.4, "end": 78.0, "accent": False}
                ]
            },
            {
                "id": "line_05_03",
                "text": "I don't call your number, but I know the rhyme,",
                "words": [
                    {"text": "I", "start": 78.4, "end": 78.8, "accent": False},
                    {"text": "don't", "start": 78.8, "end": 79.4, "accent": False},
                    {"text": "call", "start": 79.4, "end": 80.2, "accent": True},
                    {"text": "your", "start": 80.2, "end": 80.6, "accent": False},
                    {"text": "number,", "start": 80.6, "end": 81.6, "accent": False},
                    {"text": "but", "start": 81.6, "end": 82.0, "accent": False},
                    {"text": "I", "start": 82.0, "end": 82.3, "accent": False},
                    {"text": "know", "start": 82.3, "end": 82.9, "accent": True},
                    {"text": "the", "start": 82.9, "end": 83.2, "accent": False},
                    {"text": "rhyme,", "start": 83.2, "end": 84.4, "accent": False}
                ]
            },
            {
                "id": "line_05_04",
                "text": "Some things stay golden on the other side of time.",
                "words": [
                    {"text": "Some", "start": 85.0, "end": 85.5, "accent": False},
                    {"text": "things", "start": 85.5, "end": 86.2, "accent": False},
                    {"text": "stay", "start": 86.2, "end": 87.0, "accent": True},
                    {"text": "golden", "start": 87.0, "end": 88.4, "accent": True},
                    {"text": "on", "start": 88.4, "end": 88.8, "accent": False},
                    {"text": "the", "start": 88.8, "end": 89.2, "accent": False},
                    {"text": "other", "start": 89.2, "end": 89.8, "accent": False},
                    {"text": "side", "start": 89.8, "end": 90.5, "accent": True},
                    {"text": "of", "start": 90.5, "end": 90.9, "accent": False},
                    {"text": "time.", "start": 90.9, "end": 92.5, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_06_verse2",
        "name": "Old Cafe & Wet Pavements",
        "sectionTag": "06 // VERSE 2  •  EMPTY CHAIRS",
        "startSec": 93.0,
        "endSec": 110.0,
        "subtitle": "Passing familiar streets • Streetlights awakening in the blue hour drizzle",
        "lines": [
            {
                "id": "line_06_01",
                "text": "Passed the old cafe where we would talk till three,",
                "words": [
                    {"text": "Passed", "start": 93.4, "end": 94.2, "accent": True},
                    {"text": "the", "start": 94.2, "end": 94.6, "accent": False},
                    {"text": "old", "start": 94.6, "end": 95.2, "accent": False},
                    {"text": "cafe", "start": 95.2, "end": 96.2, "accent": True},
                    {"text": "where", "start": 96.2, "end": 96.8, "accent": False},
                    {"text": "we", "start": 96.8, "end": 97.2, "accent": False},
                    {"text": "would", "start": 97.2, "end": 97.7, "accent": False},
                    {"text": "talk", "start": 97.7, "end": 98.6, "accent": True},
                    {"text": "till", "start": 98.6, "end": 99.1, "accent": False},
                    {"text": "three,", "start": 99.1, "end": 100.5, "accent": False}
                ]
            },
            {
                "id": "line_06_02",
                "text": "Saw a shadow sitting where we used to be.",
                "words": [
                    {"text": "Saw", "start": 101.0, "end": 101.7, "accent": False},
                    {"text": "a", "start": 101.7, "end": 102.0, "accent": False},
                    {"text": "shadow", "start": 102.0, "end": 103.0, "accent": True},
                    {"text": "sitting", "start": 103.0, "end": 104.0, "accent": False},
                    {"text": "where", "start": 104.0, "end": 104.6, "accent": False},
                    {"text": "we", "start": 104.6, "end": 105.1, "accent": False},
                    {"text": "used", "start": 105.1, "end": 106.0, "accent": True},
                    {"text": "to", "start": 106.0, "end": 106.4, "accent": False},
                    {"text": "be.", "start": 106.4, "end": 108.0, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_07_bridge",
        "name": "Porch Light & Emotional Release",
        "sectionTag": "07 // BRIDGE  •  THE PORCH LIGHT",
        "startSec": 110.0,
        "endSec": 130.0,
        "subtitle": "No bitterness, only gentle gratitude • Sunshine even through the rain",
        "lines": [
            {
                "id": "line_07_01",
                "text": "I don't want the anger, I don't keep the score,",
                "words": [
                    {"text": "I", "start": 110.4, "end": 110.8, "accent": False},
                    {"text": "don't", "start": 110.8, "end": 111.4, "accent": False},
                    {"text": "want", "start": 111.4, "end": 112.2, "accent": True},
                    {"text": "the", "start": 112.2, "end": 112.6, "accent": False},
                    {"text": "anger,", "start": 112.6, "end": 113.8, "accent": False},
                    {"text": "I", "start": 114.2, "end": 114.6, "accent": False},
                    {"text": "don't", "start": 114.6, "end": 115.1, "accent": False},
                    {"text": "keep", "start": 115.1, "end": 115.9, "accent": True},
                    {"text": "the", "start": 115.9, "end": 116.3, "accent": False},
                    {"text": "score,", "start": 116.3, "end": 117.8, "accent": False}
                ]
            },
            {
                "id": "line_07_02",
                "text": "I just leave the porch light burning by the door.",
                "words": [
                    {"text": "I", "start": 118.2, "end": 118.6, "accent": False},
                    {"text": "just", "start": 118.6, "end": 119.2, "accent": False},
                    {"text": "leave", "start": 119.2, "end": 120.0, "accent": True},
                    {"text": "the", "start": 120.0, "end": 120.4, "accent": False},
                    {"text": "porch", "start": 120.4, "end": 121.2, "accent": True},
                    {"text": "light", "start": 121.2, "end": 122.0, "accent": True},
                    {"text": "burning", "start": 122.0, "end": 123.2, "accent": False},
                    {"text": "by", "start": 123.2, "end": 123.6, "accent": False},
                    {"text": "the", "start": 123.6, "end": 124.0, "accent": False},
                    {"text": "door.", "start": 124.0, "end": 125.8, "accent": True}
                ]
            },
            {
                "id": "line_07_03",
                "text": "If the wind should carry back an old refrain,",
                "words": [
                    {"text": "If", "start": 126.2, "end": 126.6, "accent": False},
                    {"text": "the", "start": 126.6, "end": 127.0, "accent": False},
                    {"text": "wind", "start": 127.0, "end": 127.8, "accent": True},
                    {"text": "should", "start": 127.8, "end": 128.3, "accent": False},
                    {"text": "carry", "start": 128.3, "end": 129.2, "accent": False},
                    {"text": "back", "start": 129.2, "end": 129.8, "accent": True},
                    {"text": "an", "start": 129.8, "end": 130.2, "accent": False},
                    {"text": "old", "start": 130.2, "end": 130.8, "accent": False},
                    {"text": "refrain,", "start": 130.8, "end": 132.0, "accent": True}
                ]
            },
            {
                "id": "line_07_04",
                "text": "I will call it sunshine even in the rain.",
                "words": [
                    {"text": "I", "start": 132.4, "end": 132.8, "accent": False},
                    {"text": "will", "start": 132.8, "end": 133.2, "accent": False},
                    {"text": "call", "start": 133.2, "end": 134.0, "accent": True},
                    {"text": "it", "start": 134.0, "end": 134.3, "accent": False},
                    {"text": "sunshine", "start": 134.3, "end": 135.5, "accent": True},
                    {"text": "even", "start": 135.5, "end": 136.2, "accent": False},
                    {"text": "in", "start": 136.2, "end": 136.6, "accent": False},
                    {"text": "the", "start": 136.6, "end": 137.0, "accent": False},
                    {"text": "rain.", "start": 137.0, "end": 139.0, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_08_final_chorus",
        "name": "Final Golden Hour Release",
        "sectionTag": "08 // CHORUS  •  ETERNAL AMBER",
        "startSec": 139.0,
        "endSec": 160.0,
        "subtitle": "Full instrumental bloom • Some things stay golden on the other side of time",
        "lines": [
            {
                "id": "line_08_01",
                "text": "And the golden hour fades along the kitchen floor,",
                "words": [
                    {"text": "And", "start": 139.4, "end": 139.8, "accent": False},
                    {"text": "the", "start": 139.8, "end": 140.2, "accent": False},
                    {"text": "golden", "start": 140.2, "end": 141.4, "accent": True},
                    {"text": "hour", "start": 141.4, "end": 142.2, "accent": False},
                    {"text": "fades", "start": 142.2, "end": 143.2, "accent": True},
                    {"text": "along", "start": 143.2, "end": 144.0, "accent": False},
                    {"text": "the", "start": 144.0, "end": 144.4, "accent": False},
                    {"text": "kitchen", "start": 144.4, "end": 145.4, "accent": False},
                    {"text": "floor,", "start": 145.4, "end": 146.8, "accent": False}
                ]
            },
            {
                "id": "line_08_02",
                "text": "Some things stay golden on the other side of time.",
                "words": [
                    {"text": "Some", "start": 147.2, "end": 147.7, "accent": False},
                    {"text": "things", "start": 147.7, "end": 148.4, "accent": False},
                    {"text": "stay", "start": 148.4, "end": 149.2, "accent": True},
                    {"text": "golden", "start": 149.2, "end": 150.6, "accent": True},
                    {"text": "on", "start": 150.6, "end": 151.0, "accent": False},
                    {"text": "the", "start": 151.0, "end": 151.4, "accent": False},
                    {"text": "other", "start": 151.4, "end": 152.0, "accent": False},
                    {"text": "side", "start": 152.0, "end": 152.8, "accent": True},
                    {"text": "of", "start": 152.8, "end": 153.2, "accent": False},
                    {"text": "time.", "start": 153.2, "end": 155.5, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_09_outro",
        "name": "Dusk Fade & Lingering Chords",
        "sectionTag": "09 // OUTRO  •  STILL GOLDEN",
        "startSec": 160.0,
        "endSec": 180.0,
        "subtitle": "Delicate fingerpicking decays into twilight • Pressed flower in the envelope",
        "lines": [
            {
                "id": "line_09_01",
                "text": "On the other side of time... Some things stay golden.",
                "words": [
                    {"text": "On", "start": 161.0, "end": 161.6, "accent": False},
                    {"text": "the", "start": 161.6, "end": 162.0, "accent": False},
                    {"text": "other", "start": 162.0, "end": 162.8, "accent": False},
                    {"text": "side", "start": 162.8, "end": 163.6, "accent": True},
                    {"text": "of", "start": 163.6, "end": 164.0, "accent": False},
                    {"text": "time...", "start": 164.0, "end": 166.0, "accent": True},
                    {"text": "Some", "start": 167.0, "end": 167.8, "accent": False},
                    {"text": "things", "start": 167.8, "end": 168.6, "accent": False},
                    {"text": "stay", "start": 168.6, "end": 169.6, "accent": True},
                    {"text": "golden.", "start": 169.6, "end": 173.0, "accent": True}
                ]
            }
        ]
    }
]

timeline = {
    "songTitle": "Golden Hour Letters",
    "audioFile": "audio/golden_hour_letters.mp3",
    "fps": fps,
    "bpm": 76,
    "scenes": [],
    "overrides": {}
}

word_counter = 1

for sc_idx, sc in enumerate(scenes_raw):
    sc_start_f = f(sc["startSec"])
    sc_end_f = f(sc["endSec"])

    scene_obj = {
        "id": sc["id"],
        "name": sc["name"],
        "sectionTag": sc["sectionTag"],
        "startFrame": sc_start_f,
        "endFrame": sc_end_f,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "letter_desk",
        "subtitle": sc["subtitle"],
        "lines": []
    }

    for l_idx, line in enumerate(sc["lines"]):
        line_obj = {
            "id": line["id"],
            "text": line["text"],
            "words": []
        }

        prev_w_end = sc_start_f
        for w in line["words"]:
            w_start_f = max(prev_w_end, f(w["start"]))
            w_end_f = max(w_start_f + 4, f(w["end"]))

            if w_end_f > sc_end_f:
                sc_end_f = w_end_f
                scene_obj["endFrame"] = sc_end_f

            w_id = f"w_{sc_idx+1:02d}_{word_counter:03d}"
            word_counter += 1

            line_obj["words"].append({
                "id": w_id,
                "text": w["text"],
                "startFrame": w_start_f,
                "endFrame": w_end_f,
                "accent": w.get("accent", False)
            })
            prev_w_end = w_end_f

        scene_obj["lines"].append(line_obj)

    timeline["scenes"].append(scene_obj)

timeline["scenes"][-1]["endFrame"] = total_frames

os.makedirs("src/songs/golden-hour-letters", exist_ok=True)
output_path = "src/songs/golden-hour-letters/timeline.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 60 FPS timeline: {len(timeline['scenes'])} scenes, {word_counter-1} words.")
print(f"[✓] Total frames: {total_frames} ({total_duration_sec:.2f}s). Saved to {output_path}")
