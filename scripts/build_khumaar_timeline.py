#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Khumaar'
Audio: public/audio/khumaar.mp3 (252.74 seconds = 15164 frames @ 60 FPS)
Theme: Botanical Scrapbook (Midnight Reverie & Intoxicating Acoustic Romance)
Aligned with 100% precision to the vocal speech audio.
"""

import os
import json

fps = 60
total_duration_sec = 252.74
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_data = [
    {
        "id": "scene_01_intro",
        "name": "Acoustic Prelude & 2 AM Whispers",
        "sectionTag": "01 // INTRO  •  MIDNIGHT REVERIE",
        "startSec": 0.0,
        "endSec": 19.80,
        "subtitle": "Dim lamp casting warm amber shadows • Two cups resting on the wooden desk",
        "lines": []
    },
    {
        "id": "scene_02_mukhda",
        "name": "Aadhi Si Raat & Tera Asar",
        "sectionTag": "02 // MUKHDA  •  MIDNIGHT CONFESSION",
        "startSec": 19.80,
        "endSec": 40.96,
        "subtitle": "Sitting in the quiet hours past 2 AM • Only your presence fills the room",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Aadhi si raat hai, khamosh yeh shehar hai,",
                "startSec": 19.80,
                "endSec": 25.06
            },
            {
                "id": "line_02_02",
                "text": "Tu saamne hai baithi, bas tera hi asar hai.",
                "startSec": 25.06,
                "endSec": 30.24
            },
            {
                "id": "line_02_03",
                "text": "Nazrein chura ke tu jo halke se hasi hai,",
                "startSec": 30.24,
                "endSec": 36.02
            },
            {
                "id": "line_02_04",
                "text": "Seene mein mere ik ajeeb si khalish hai.",
                "startSec": 36.02,
                "endSec": 40.96
            }
        ]
    },
    {
        "id": "scene_03_hook",
        "name": "Yeh Kaisa Khumaar Hai",
        "sectionTag": "03 // HOOK  •  THE INTOXICATION",
        "startSec": 40.96,
        "endSec": 72.74,
        "subtitle": "Shedding every defense • What kind of sweet intoxication is this?",
        "lines": [
            {
                "id": "line_03_01",
                "text": "Yeh kaisa khumaar hai, kaisa yeh suroor hai,",
                "startSec": 40.96,
                "endSec": 45.82
            },
            {
                "id": "line_03_02",
                "text": "Paas hoke bhi tu kyun lagti thodi door hai?",
                "startSec": 45.82,
                "endSec": 51.14
            },
            {
                "id": "line_03_03",
                "text": "Tu hans ke bahaana koi bana degi kya?",
                "startSec": 51.14,
                "endSec": 55.88
            },
            {
                "id": "line_03_04",
                "text": "Main sach bol doon agar, toh muskura degi kya?",
                "startSec": 55.88,
                "endSec": 61.34
            },
            {
                "id": "line_03_05",
                "text": "Jo lafz dabe hain kabse seene mein mere,",
                "startSec": 61.34,
                "endSec": 66.68
            },
            {
                "id": "line_03_06",
                "text": "Unhein aaj tu sun kar, gale se laga degi kya?",
                "startSec": 66.68,
                "endSec": 72.74
            }
        ]
    },
    {
        "id": "scene_04_interlude_1",
        "name": "Acoustic Solo & Amber Shadows",
        "sectionTag": "04 // INTERLUDE  •  SWEET RESONANCE",
        "startSec": 72.74,
        "endSec": 81.38,
        "subtitle": "Fingerstyle strings vibrating in the quiet room • Melting ice in the glass",
        "lines": []
    },
    {
        "id": "scene_05_antara_1",
        "name": "Melting Ice & Stolen Glances",
        "sectionTag": "05 // ANTARA 1  •  UNGUARDED TRUTHS",
        "startSec": 81.38,
        "endSec": 104.00,
        "subtitle": "Watching you tuck your hair behind your ear • Asking for a gentle truth or sweet lie",
        "lines": [
            {
                "id": "line_05_01",
                "text": "Kanch ke gilaas mein baraf pighalti hai,",
                "startSec": 81.38,
                "endSec": 86.08
            },
            {
                "id": "line_05_02",
                "text": "Tujhse nazar milti hai, saans sambhalti hai.",
                "startSec": 86.08,
                "endSec": 90.76
            },
            {
                "id": "line_05_03",
                "text": "Duniya ki baaton ka ab darr nahi koi,",
                "startSec": 90.76,
                "endSec": 94.68
            },
            {
                "id": "line_05_04",
                "text": "Tere siwa dil ka ab ghar nahi koi.",
                "startSec": 94.68,
                "endSec": 97.22
            },
            {
                "id": "line_05_05",
                "text": "Zulfon ko kaan ke peeche jo tu karti hai,",
                "startSec": 97.22,
                "endSec": 99.76
            },
            {
                "id": "line_05_06",
                "text": "Sach kehna, tu bhi kya mujhpe hi marti hai?",
                "startSec": 99.76,
                "endSec": 104.00
            }
        ]
    },
    {
        "id": "scene_06_interlude_2",
        "name": "Guitar Solo & Heartbeat",
        "sectionTag": "06 // INTERLUDE  •  MIDNIGHT REFLECTION",
        "startSec": 104.00,
        "endSec": 142.70,
        "subtitle": "Strings drifting through the 3 AM stillness • Unspoken feelings lingering in the air",
        "lines": []
    },
    {
        "id": "scene_07_antara_2",
        "name": "2 AM Chai & The Wanderer's Confession",
        "sectionTag": "07 // ANTARA 2  •  THE WANDERER",
        "startSec": 142.70,
        "endSec": 171.18,
        "subtitle": "2 AM tea and endless thoughts • A lost wanderer in your city asking to stay",
        "lines": [
            {
                "id": "line_07_01",
                "text": "Do baje ki chai ho ya chaar baje ki baat,",
                "startSec": 142.70,
                "endSec": 149.00
            },
            {
                "id": "line_07_02",
                "text": "Kash koi thehra de yeh haseen raat.",
                "startSec": 149.00,
                "endSec": 156.80
            },
            {
                "id": "line_07_03",
                "text": "Log kehte hain ke main thoda sa deewaana hoon,",
                "startSec": 156.80,
                "endSec": 161.40
            },
            {
                "id": "line_07_04",
                "text": "Tere shehar mein bhatka ek be-ghar puraana hoon.",
                "startSec": 161.40,
                "endSec": 163.40
            },
            {
                "id": "line_07_05",
                "text": "Agar haath badha ke main rokk loon tujhe,",
                "startSec": 163.40,
                "endSec": 166.14
            },
            {
                "id": "line_07_06",
                "text": "Bata na, yeh dil be-qasoor hai na?",
                "startSec": 166.14,
                "endSec": 171.18
            }
        ]
    },
    {
        "id": "scene_08_bridge",
        "name": "Will You Forget by Morning?",
        "sectionTag": "08 // BRIDGE  •  THE TURNING POINT",
        "startSec": 171.18,
        "endSec": 197.42,
        "subtitle": "Looking into your eyes for a single heartbeat • What happens when daylight comes?",
        "lines": [
            {
                "id": "line_08_01",
                "text": "Aankhon mein dekha hai maine ek pal ke liye,",
                "startSec": 171.18,
                "endSec": 176.12
            },
            {
                "id": "line_08_02",
                "text": "Tu bhi toh ruki hai bas ek hal ke liye.",
                "startSec": 176.12,
                "endSec": 181.56
            },
            {
                "id": "line_08_03",
                "text": "Kal subah jab roshni khidki se aayegi,",
                "startSec": 181.56,
                "endSec": 186.86
            },
            {
                "id": "line_08_04",
                "text": "Tu kya yeh saari baatein bhool jaayegi?",
                "startSec": 186.86,
                "endSec": 191.34
            },
            {
                "id": "line_08_05",
                "text": "Bol na... kya sach mein bhool jaayegi?",
                "startSec": 191.34,
                "endSec": 197.42
            }
        ]
    },
    {
        "id": "scene_09_climax",
        "name": "Gale Se Laga Degi Kya (The Climax)",
        "sectionTag": "09 // CHORUS  •  FULL VULNERABILITY",
        "startSec": 197.42,
        "endSec": 230.36,
        "subtitle": "All feelings laid bare • Will you pull me close tonight?",
        "lines": [
            {
                "id": "line_09_01",
                "text": "Yeh kaisa khumaar hai, kaisa yeh suroor hai!",
                "startSec": 197.42,
                "endSec": 203.42
            },
            {
                "id": "line_09_02",
                "text": "Paas hoke bhi tu kyun lagti thodi door hai!",
                "startSec": 203.42,
                "endSec": 208.00
            },
            {
                "id": "line_09_03",
                "text": "Tu hans ke bahaana koi bana degi kya?",
                "startSec": 208.00,
                "endSec": 212.88
            },
            {
                "id": "line_09_04",
                "text": "Main sach bol doon agar, toh muskura degi kya?",
                "startSec": 212.88,
                "endSec": 218.40
            },
            {
                "id": "line_09_05",
                "text": "Jo lafz dabe hain kabse seene mein mere,",
                "startSec": 218.40,
                "endSec": 223.04
            },
            {
                "id": "line_09_06",
                "text": "Unhein aaj tu sun kar, gale se laga degi kya?",
                "startSec": 223.04,
                "endSec": 230.36
            }
        ]
    },
    {
        "id": "scene_10_outro",
        "name": "Aur Tera Khumaar Hai",
        "sectionTag": "10 // OUTRO  •  THE LINGERING HIGH",
        "startSec": 230.36,
        "endSec": 252.74,
        "subtitle": "Acoustic strings dissolving into the dawn • Only your memory remains",
        "lines": [
            {
                "id": "line_10_01",
                "text": "Haan gale se laga degi kya...",
                "startSec": 230.36,
                "endSec": 234.40
            },
            {
                "id": "line_10_02",
                "text": "Yeh kaisa khumaar hai...",
                "startSec": 234.40,
                "endSec": 239.82
            },
            {
                "id": "line_10_03",
                "text": "Bas tu hi tu hai...",
                "startSec": 239.82,
                "endSec": 242.92
            },
            {
                "id": "line_10_04",
                "text": "Aur tera khumaar hai...",
                "startSec": 242.92,
                "endSec": 252.74
            }
        ]
    }
]

timeline = {
    "fps": fps,
    "durationInFrames": total_frames,
    "theme": "SongCoverArtwork",
    "songTitle": "Khumaar",
    "artist": "PeerMusic",
    "scenes": []
}

word_counter = 1

for sc_idx, sc in enumerate(scenes_data):
    s_start_f = f(sc["startSec"])
    s_end_f = f(sc["endSec"])

    scene_obj = {
        "id": sc["id"],
        "name": sc["name"],
        "sectionTag": sc["sectionTag"],
        "startFrame": s_start_f,
        "endFrame": s_end_f,
        "subtitle": sc.get("subtitle", ""),
        "lines": []
    }

    for l_idx, line in enumerate(sc["lines"]):
        l_start_f = f(line["startSec"])
        l_end_f = f(line["endSec"])

        words_raw = line["text"].split()
        num_words = len(words_raw)
        line_duration_f = max(num_words * 4, l_end_f - l_start_f)
        word_dur = line_duration_f / num_words

        line_obj = {
            "id": line["id"],
            "text": line["text"],
            "words": []
        }

        for w_idx, w_text in enumerate(words_raw):
            w_sf = l_start_f + int(round(w_idx * word_dur))
            w_ef = l_start_f + int(round((w_idx + 1) * word_dur))
            if w_idx == num_words - 1:
                w_ef = l_end_f

            is_accent = len(w_text) >= 5 or w_text.endswith("...") or w_text.endswith("!")

            line_obj["words"].append({
                "id": f"w_{sc_idx+1:02d}_{word_counter:04d}",
                "text": w_text,
                "startFrame": w_sf,
                "endFrame": max(w_sf + 4, w_ef),
                "accent": is_accent
            })
            word_counter += 1

        scene_obj["lines"].append(line_obj)

    timeline["scenes"].append(scene_obj)

timeline["scenes"][-1]["endFrame"] = total_frames

out_dir = "src/songs/khumaar"
os.makedirs(out_dir, exist_ok=True)
output_path = os.path.join(out_dir, "timeline.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print("[✓] Generated 60 FPS timeline for Khumaar!")
print(f"[✓] Total scenes: {len(timeline['scenes'])}, total words: {word_counter-1}")
print(f"[✓] Total duration: {total_duration_sec:.2f}s ({total_frames} frames)")
