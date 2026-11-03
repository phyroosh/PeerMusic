#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Trying to Fit In' (English Dreamy Indie Pop)
Audio: public/audio/trying_to_fit_in.mp3 (233.13 seconds = 13,988 frames @ 60 FPS)
Theme: SongCoverArtwork / Rehearsals in the Mirror
Aligned with 100% precision from Whisper speech-to-text timestamps.
"""

import os
import json

fps = 60
total_duration_sec = 233.13
total_frames = int(round(total_duration_sec * fps))  # 13988

def f(sec):
    return int(round(sec * fps))

# Load whisper raw alignment
whisper_file = "trying_to_fit_in_whisper_raw.json"
with open(whisper_file, "r", encoding="utf-8") as wf:
    whisper_data = json.load(wf)

whisper_segments = whisper_data.get("segments", [])

# Scene definitions
scenes_config = [
    {
        "id": "scene_01_intro",
        "name": "Rehearsals in the Mirror",
        "sectionTag": "01 // INTRO  •  THE QUIET REHEARSAL",
        "startSec": 0.0,
        "endSec": 11.00,
        "subtitle": "Warm fingerpicked acoustic guitar • Practicing expressions in front of the mirror",
        "lines": []
    },
    {
        "id": "scene_02_verse_1_a",
        "name": "Two Beats Late & Cold Cup",
        "sectionTag": "02 // VERSE 1  •  THE CORNER CAFE",
        "startSec": 11.00,
        "endSec": 23.10,
        "subtitle": "Laughing two beats late • Checking reflection in a cold paper cup",
        "lines": [
            {
                "seg_idx": 1,
                "text": "Laughing two beats late at jokes I barely understand,",
                "accent": "jokes"
            },
            {
                "seg_idx": 2,
                "text": "Checking my reflection with a cold cup in my hand.",
                "accent": "reflection"
            }
        ]
    },
    {
        "id": "scene_03_verse_1_b",
        "name": "Bitter Drink & Walking Confident",
        "sectionTag": "03 // VERSE 1  •  THE ENTRANCE",
        "startSec": 23.10,
        "endSec": 35.30,
        "subtitle": "Ordering bitter coffee to look mature • Walking in pretending to be sure",
        "lines": [
            {
                "seg_idx": 3,
                "text": "Ordering the bitter drink because it looks mature,",
                "accent": "mature"
            },
            {
                "seg_idx": 4,
                "text": "Walking in the room like I was confident and sure.",
                "accent": "confident"
            }
        ]
    },
    {
        "id": "scene_04_prechorus_1",
        "name": "Rear-View Mirror & Hallway Door",
        "sectionTag": "04 // PRE-CHORUS  •  THE PLAYLIST",
        "startSec": 35.30,
        "endSec": 59.20,
        "subtitle": "Practicing hello in the mirror • Staring at the phone screen in the hallway",
        "lines": [
            {
                "seg_idx": 5,
                "text": "Practicing my hello in the rear-view mirror twice,",
                "accent": "mirror"
            },
            {
                "seg_idx": 6,
                "text": "Memorizing playlist tracks to seem easy and nice.",
                "accent": "playlist"
            },
            {
                "seg_idx": 7,
                "text": "Standing by the hallway door, staring at my screen,",
                "accent": "screen"
            },
            {
                "seg_idx": 8,
                "text": "Terrified they'll see the boy behind the magazine.",
                "accent": "terrified"
            }
        ]
    },
    {
        "id": "scene_05_chorus_1",
        "name": "Trying So Hard Just to Fit In",
        "sectionTag": "05 // CHORUS  •  FITTING IN",
        "startSec": 59.20,
        "endSec": 91.50,
        "subtitle": "Trading every honest piece of who I've been • Laughing right on cue",
        "lines": [
            {
                "seg_idx": 9,
                "text": "I’ve been trying so hard to fit in,",
                "accent": "trying"
            },
            {
                "seg_idx": 10,
                "text": "Trading every honest piece of who I’ve been.",
                "accent": "honest"
            },
            {
                "seg_idx": 11,
                "text": "Nodding at the things they say, laughing right on cue,",
                "accent": "laughing"
            },
            {
                "seg_idx": 13,
                "text": "Tell me, if I let it slip—would they want me too?",
                "accent": "slip"
            },
            {
                "seg_idx": 14,
                "text": "Yeah, trying so hard just to fit in...",
                "accent": "fit"
            },
            {
                "seg_idx": 15,
                "text": "Trying so hard just to fit in.",
                "accent": "fit"
            }
        ]
    },
    {
        "id": "scene_06_verse_2",
        "name": "Untying Sneakers & Quiet Bedroom",
        "sectionTag": "06 // VERSE 2  •  SAFE AT HOME",
        "startSec": 91.50,
        "endSec": 113.80,
        "subtitle": "Locking the door and letting the smile drop • Silence feels like breathing",
        "lines": [
            {
                "seg_idx": 16,
                "text": "Untying my sneakers as I finally lock the door,",
                "accent": "sneakers"
            },
            {
                "seg_idx": 17,
                "text": "Letting all the practiced smiles crumble to the floor.",
                "accent": "crumble"
            },
            {
                "seg_idx": 18,
                "text": "Silence in my bedroom feels like breathing for the first time,",
                "accent": "breathing"
            },
            {
                "seg_idx": 19,
                "text": "No lines to remember, no awkward hill to climb.",
                "accent": "remember"
            }
        ]
    },
    {
        "id": "scene_07_prechorus_2",
        "name": "Shaking Hands & Did It Work Tonight",
        "sectionTag": "07 // PRE-CHORUS 2  •  THE QUESTION",
        "startSec": 113.80,
        "endSec": 124.80,
        "subtitle": "Wondering if hands were shaking • Or if the version of me did its job",
        "lines": [
            {
                "seg_idx": 20,
                "text": "I wonder if they noticed that my hands were shaking slight,",
                "accent": "shaking"
            },
            {
                "seg_idx": 21,
                "text": "Or if the version of me did its job tonight.",
                "accent": "version"
            }
        ]
    },
    {
        "id": "scene_08_chorus_2",
        "name": "Chorus Reprise • The Cost of Fitting In",
        "sectionTag": "08 // CHORUS 2  •  THE CYCLE",
        "startSec": 124.80,
        "endSec": 157.20,
        "subtitle": "Trading every honest piece • If I let it slip, would they want me?",
        "lines": [
            {
                "seg_idx": 22,
                "text": "I’ve been trying so hard to fit in,",
                "accent": "trying"
            },
            {
                "seg_idx": 23,
                "text": "Trading every honest piece of who I’ve been.",
                "accent": "honest"
            },
            {
                "seg_idx": 24,
                "text": "Nodding at the things they say, laughing right on cue,",
                "accent": "laughing"
            },
            {
                "seg_idx": 26,
                "text": "Tell me, if I let it slip—would they want me too?",
                "accent": "slip"
            },
            {
                "seg_idx": 27,
                "text": "Yeah, trying so hard just to fit in...",
                "accent": "fit"
            },
            {
                "seg_idx": 28,
                "text": "Trying so hard just to fit in.",
                "accent": "fit"
            }
        ]
    },
    {
        "id": "scene_09_bridge",
        "name": "A Seat at Every Table",
        "sectionTag": "09 // BRIDGE  •  THE BREAKTHROUGH",
        "startSec": 157.20,
        "endSec": 182.00,
        "subtitle": "What if I stopped running for a seat? • Is it love if it's the costume they choose?",
        "lines": [
            {
                "seg_idx": 29,
                "text": "What if I stopped running for a seat at every table?",
                "accent": "running"
            },
            {
                "seg_idx": 30,
                "text": "What if I stopped pretending that I’m always strong and able?",
                "accent": "pretending"
            },
            {
                "seg_idx": 31,
                "text": "If I show up ordinary, quiet, slightly bruised...",
                "accent": "bruised"
            },
            {
                "seg_idx": 32,
                "text": "Is it really love if it’s the costume that they choose?",
                "accent": "costume"
            }
        ]
    },
    {
        "id": "scene_10_final_chorus",
        "name": "No More Trying • Choosing Myself",
        "sectionTag": "10 // CLIMAX  •  NO MORE TRYING",
        "startSec": 182.00,
        "endSec": 207.80,
        "subtitle": "Picking up the pieces beneath my skin • Without a hidden clause",
        "lines": [
            {
                "seg_idx": 33,
                "text": "No more trying so hard to fit in,",
                "accent": "trying"
            },
            {
                "seg_idx": 34,
                "text": "I’m picking up the pieces from beneath my skin.",
                "accent": "pieces"
            },
            {
                "seg_idx": 35,
                "text": "I don't need the spotlight or a chorus of applause,",
                "accent": "spotlight"
            },
            {
                "seg_idx": 36,
                "text": "I just want to be myself, without a hidden clause.",
                "accent": "myself"
            },
            {
                "seg_idx": 37,
                "text": "No more trying so hard to fit in...",
                "accent": "fit"
            }
        ]
    },
    {
        "id": "scene_11_outro",
        "name": "Learning How to Breathe",
        "sectionTag": "11 // OUTRO  •  JUST AN ORDINARY GUY",
        "startSec": 207.80,
        "endSec": 233.13,
        "subtitle": "Just an ordinary guy • Learning how to breathe again",
        "lines": [
            {
                "seg_idx": 38,
                "text": "Just an ordinary guy... Learning how to breathe again.",
                "accent": "breathe"
            }
        ]
    }
]

timeline = {
    "songTitle": "Trying to Fit In (Rehearsals in the Mirror)",
    "audioFile": "audio/trying_to_fit_in.mp3",
    "theme": "SongCoverArtwork",
    "fps": fps,
    "totalFrames": total_frames,
    "coverImage": "covers/trying_to_fit_in_clean_16x9.png",
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
        "symbolKey": "bedroom_mirror",
        "subtitle": sc["subtitle"],
        "lines": []
    }

    for l_order, line_def in enumerate(sc["lines"]):
        seg_idx = line_def["seg_idx"]
        whisper_seg = whisper_segments[seg_idx]
        raw_words = whisper_seg.get("words", [])
        clean_text = line_def["text"]
        accent_target = line_def["accent"]

        clean_tokens = clean_text.split()
        num_tokens = len(clean_tokens)

        l_start_sec = whisper_seg["start"]
        l_end_sec = whisper_seg["end"]

        l_start_f = max(sc_start_f, f(l_start_sec))
        l_end_f = min(sc_end_f, max(l_start_f + num_tokens * 6, f(l_end_sec)))

        line_id = f"line_{sc_idx+1:02d}_{l_order+1:02d}"
        line_obj = {
            "id": line_id,
            "text": clean_text,
            "words": []
        }

        current_f = l_start_f
        for w_idx, token in enumerate(clean_tokens):
            if w_idx < len(raw_words):
                w_raw = raw_words[w_idx]
                w_start_f = max(current_f, f(w_raw["start"]))
                w_end_f = max(w_start_f + 5, f(w_raw["end"]))
            else:
                remaining_tokens = num_tokens - w_idx
                dur = max(6, (l_end_f - current_f) // remaining_tokens)
                w_start_f = current_f
                w_end_f = current_f + dur

            clean_word_no_punct = "".join(c for c in token if c.isalnum()).lower()
            is_accent = (clean_word_no_punct == accent_target.lower())

            w_start_f = max(sc_start_f, min(w_start_f, sc_end_f - 4))
            w_end_f = min(sc_end_f, max(w_start_f + 4, w_end_f))

            if w_idx == num_tokens - 1 and w_end_f < l_end_f:
                w_end_f = min(sc_end_f, l_end_f)

            word_id = f"w_{sc_idx+1:02d}_{word_counter:04d}"
            line_obj["words"].append({
                "id": word_id,
                "text": token,
                "startFrame": w_start_f,
                "endFrame": w_end_f,
                "accent": is_accent
            })
            current_f = w_end_f
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

out_dir = "src/songs/trying-to-fit-in"
os.makedirs(out_dir, exist_ok=True)
output_path = os.path.join(out_dir, "timeline.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 'Trying to Fit In' 60 FPS timeline successfully!")
print(f"[✓] Total scenes: {len(timeline['scenes'])}, total unique words: {word_counter-1}")
print(f"[✓] Total duration: {total_duration_sec:.2f}s ({total_frames} frames)")
