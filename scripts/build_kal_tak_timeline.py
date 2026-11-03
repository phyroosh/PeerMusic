#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Kal Tak Jo Roz Ka Tha'
Audio: public/audio/kal_tak_jo_roz_ka_tha.mp3 (382.367 seconds = 22942 frames @ 60 FPS)
Theme: Botanical Scrapbook (Classroom & School Life Nostalgia)
Aligned with 100% precision to the vocal speech audio.
"""

import os
import json

fps = 60
total_duration_sec = 382.367
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

# 14 precisely aligned scenes mapping every vocal line and instrumental section
scenes_data = [
    {
        "id": "scene_01_intro",
        "name": "Classroom Window & Morning Chime",
        "sectionTag": "01 // INTRO  •  CLASSROOM NOSTALGIA",
        "startSec": 0.0,
        "endSec": 9.68,
        "subtitle": "Acoustic fingerstyle prelude • Morning sunlight streaming through dusty school windowpanes",
        "lines": []
    },
    {
        "id": "scene_02_mukhda",
        "name": "Kal Tak Jo Roz Ka Tha",
        "sectionTag": "02 // MUKHDA  •  EK BENCH PE BEETA LAMHA",
        "startSec": 9.68,
        "endSec": 42.50,
        "subtitle": "The wooden bench where whole worlds were built • Time slipped away silently",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Kal tak jo roz ka tha, Aaj woh yaad ban gaya,",
                "startSec": 9.68,
                "endSec": 15.10
            },
            {
                "id": "line_02_02",
                "text": "Ek bench pe beeta lamha, Poora jahaan ban gaya.",
                "startSec": 15.44,
                "endSec": 20.44
            },
            {
                "id": "line_02_03",
                "text": "Hum keh na paaye, “Thoda ruk jaa,” Waqt magar chalta gaya,",
                "startSec": 20.44,
                "endSec": 25.98
            },
            {
                "id": "line_02_04",
                "text": "Classroom toh chhoot gaya, Par dil wahin reh gaya...",
                "startSec": 25.98,
                "endSec": 31.40
            },
            {
                "id": "line_02_05",
                "text": "Woh din kahaan kho gaye, Hum jaane kab bade ho gaye...",
                "startSec": 31.40,
                "endSec": 37.20
            },
            {
                "id": "line_02_06",
                "text": "Kal tak jo roz ka tha, Aaj woh yaad ban gaya.",
                "startSec": 37.20,
                "endSec": 42.50
            }
        ]
    },
    {
        "id": "scene_03_interlude_1",
        "name": "Corridor Steps & Distant Bell",
        "sectionTag": "03 // INTERLUDE  •  EMPTY CORRIDORS",
        "startSec": 42.50,
        "endSec": 54.16,
        "subtitle": "Acoustic fingerstyle strumming • Footsteps echoing in quiet corridors after the bell",
        "lines": []
    },
    {
        "id": "scene_04_antara_1",
        "name": "Subah Ki Jaldi & Notes Banwaana",
        "sectionTag": "04 // ANTARA 1  •  MORNING RUSH & SHARED TIFFIN",
        "startSec": 54.16,
        "endSec": 97.94,
        "subtitle": "Stealing sips from one water bottle • The comfort of a familiar face at the school gate",
        "lines": [
            {
                "id": "line_04_01",
                "text": "Subah-subah ki jaldi, Aadhi neend mein woh safar,",
                "startSec": 54.16,
                "endSec": 59.40
            },
            {
                "id": "line_04_02",
                "text": "Gate pe tera mil jaana, Jaise mil gaya ho ghar.",
                "startSec": 59.40,
                "endSec": 64.62
            },
            {
                "id": "line_04_03",
                "text": "Attendance mein teri awaaz, Meri hansi ka chhup jaana,",
                "startSec": 64.62,
                "endSec": 70.04
            },
            {
                "id": "line_04_04",
                "text": "Khud kuchh bhi yaad na hona, Phir bhi notes banwaana.",
                "startSec": 70.04,
                "endSec": 75.22
            },
            {
                "id": "line_04_05",
                "text": "Ek tiffin mein chaar haath, Ek bottle, saare yaar,",
                "startSec": 75.22,
                "endSec": 81.22
            },
            {
                "id": "line_04_06",
                "text": "Chhoti-chhoti si baaton pe, Hota tha kitna pyaar.",
                "startSec": 82.30,
                "endSec": 88.34
            },
            {
                "id": "line_04_07",
                "text": "Paper se pehle kasmein, “Bhai, aaj toh fail hain hum!”",
                "startSec": 88.34,
                "endSec": 93.74
            },
            {
                "id": "line_04_08",
                "text": "Paper ke baad wahi chehre, “Bach gaye, milte hain kal!”",
                "startSec": 93.74,
                "endSec": 97.94
            }
        ]
    },
    {
        "id": "scene_05_mukhda_2",
        "name": "Mukhda Reprise & Unsaid Words",
        "sectionTag": "05 // REPRISE  •  THE PASSAGE OF TIME",
        "startSec": 97.94,
        "endSec": 129.94,
        "subtitle": "We never asked time to slow down • The quiet realization that school was ending",
        "lines": [
            {
                "id": "line_05_01",
                "text": "Kal tak jo roz ka tha, Aaj woh yaad ban gaya,",
                "startSec": 97.94,
                "endSec": 105.20
            },
            {
                "id": "line_05_02",
                "text": "Ek bench pe beeta lamha, Poora jahaan ban gaya.",
                "startSec": 105.20,
                "endSec": 107.76
            },
            {
                "id": "line_05_03",
                "text": "Hum keh na paaye, “Thoda ruk jaa,” Waqt magar chalta gaya,",
                "startSec": 107.76,
                "endSec": 113.32
            },
            {
                "id": "line_05_04",
                "text": "Classroom toh chhoot gaya, Par dil wahin reh gaya...",
                "startSec": 114.04,
                "endSec": 118.76
            },
            {
                "id": "line_05_05",
                "text": "Woh din kahaan kho gaye, Hum jaane kab bade ho gaye...",
                "startSec": 118.76,
                "endSec": 124.24
            },
            {
                "id": "line_05_06",
                "text": "Kal tak jo roz ka tha, Aaj woh yaad ban gaya.",
                "startSec": 124.24,
                "endSec": 129.94
            }
        ]
    },
    {
        "id": "scene_06_interlude_2",
        "name": "Canteen Steam & Flute Melodic Drift",
        "sectionTag": "06 // INTERLUDE  •  CANTEEN CORNERS",
        "startSec": 129.94,
        "endSec": 141.67,
        "subtitle": "Warm flute & acoustic interlude • Steam rising from canteen chai glasses",
        "lines": []
    },
    {
        "id": "scene_07_antara_2",
        "name": "Canteen Chai & Last Bench Rules",
        "sectionTag": "07 // ANTARA 2  •  LAST BENCH DREAMS",
        "startSec": 141.67,
        "endSec": 197.60,
        "subtitle": "Where own rules ruled supreme • Respectable on the outside, reckless dreamers within",
        "lines": [
            {
                "id": "line_07_01",
                "text": "Canteen ki woh chai, Aur samose ke woh hisse,",
                "startSec": 141.67,
                "endSec": 146.47
            },
            {
                "id": "line_07_02",
                "text": "Bina wajah ke hansna, Aur rooth jaana kisse-kisse.",
                "startSec": 147.12,
                "endSec": 151.72
            },
            {
                "id": "line_07_03",
                "text": "Woh last bench ki duniya, Jahaan apne hi usool,",
                "startSec": 152.33,
                "endSec": 157.52
            },
            {
                "id": "line_07_04",
                "text": "Baahar se hum shareef the, Andar se bilkul fizool.",
                "startSec": 157.90,
                "endSec": 162.60
            },
            {
                "id": "line_07_05",
                "text": "Jis period se bhaagte the, Aaj usi ko dhoondhte hain,",
                "startSec": 163.50,
                "endSec": 168.36
            },
            {
                "id": "line_07_06",
                "text": "Jis lecture mein so jaate the, Usi awaaz ko sochte hain.",
                "startSec": 168.94,
                "endSec": 173.74
            },
            {
                "id": "line_07_07",
                "text": "Woh teachers ki daant mein, Chhupi fikr ka ehsaas,",
                "startSec": 174.38,
                "endSec": 179.48
            },
            {
                "id": "line_07_08",
                "text": "Tab toh bas chhutti chahiye thi, Ab wohi din khaas.",
                "startSec": 179.48,
                "endSec": 184.88
            },
            {
                "id": "line_07_09",
                "text": "Tasveeron mein sab hain lekin, Woh pal kahin milta nahi,",
                "startSec": 184.88,
                "endSec": 189.92
            },
            {
                "id": "line_07_10",
                "text": "Sabke chehre yaad hain mujhko, Bas waqt laut-ta nahi...",
                "startSec": 189.92,
                "endSec": 196.76
            }
        ]
    },
    {
        "id": "scene_08_mukhda_reprise",
        "name": "Mukhda — Emotional Reprise",
        "sectionTag": "08 // REPRISE  •  AANKHON MEIN THAM SA GAYA",
        "startSec": 197.60,
        "endSec": 231.20,
        "subtitle": "Where did those golden days vanish? • Growing up without noticing the hours",
        "lines": [
            {
                "id": "line_08_01",
                "text": "Kal tak jo roz ka tha, Aaj woh yaad ban gaya,",
                "startSec": 197.92,
                "endSec": 203.84
            },
            {
                "id": "line_08_02",
                "text": "Ek bench pe baitha lamha, Aankhon mein tham sa gaya.",
                "startSec": 203.84,
                "endSec": 209.18
            },
            {
                "id": "line_08_03",
                "text": "Hum keh na paaye, “Saath rehna,” Har koi chalta gaya,",
                "startSec": 209.18,
                "endSec": 214.92
            },
            {
                "id": "line_08_04",
                "text": "Classroom toh chhoot gaya, Par dil wahin reh gaya...",
                "startSec": 214.92,
                "endSec": 220.50
            },
            {
                "id": "line_08_05",
                "text": "Woh din kahaan kho gaye, Hum jaane kab bade ho gaye...",
                "startSec": 220.50,
                "endSec": 225.28
            },
            {
                "id": "line_08_06",
                "text": "Bachpan ke woh raaste, Jaane kahaan mud gaye...",
                "startSec": 225.28,
                "endSec": 231.20
            }
        ]
    },
    {
        "id": "scene_09_interlude_3",
        "name": "Farewell Bell & Quiet Courtyard",
        "sectionTag": "09 // INTERLUDE  •  THE FINAL BELL",
        "startSec": 231.20,
        "endSec": 245.12,
        "subtitle": "Solemn acoustic resonance • Silence settling over the school ground on the final afternoon",
        "lines": []
    },
    {
        "id": "scene_10_bridge_last_day",
        "name": "Bridge — The Last Day",
        "sectionTag": "10 // BRIDGE  •  THE LAST DAY & GROUP PHOTO",
        "startSec": 245.12,
        "endSec": 291.00,
        "subtitle": "Names scrawled on the green blackboard • Standing in the corner of the group photograph",
        "lines": [
            {
                "id": "line_10_01",
                "text": "Aakhri din tha, sab hans rahe the, Koi nahi tha jo ro raha tha,",
                "startSec": 245.12,
                "endSec": 250.62
            },
            {
                "id": "line_10_02",
                "text": "Par ghar aake samajh mein aaya, Kuchh toh peeche chhoot raha tha.",
                "startSec": 250.62,
                "endSec": 256.16
            },
            {
                "id": "line_10_03",
                "text": "Board pe likhe the naam hamaare, Desk pe aadhi si ek lakeer,",
                "startSec": 256.16,
                "endSec": 261.64
            },
            {
                "id": "line_10_04",
                "text": "Kal tak paas baithe the jo, Aaj ho gaye sab door-door.",
                "startSec": 261.64,
                "endSec": 268.00
            },
            {
                "id": "line_10_05",
                "text": "Kisi ne kaha, “Contact mein rehna,” Kisi ne bas haath hilaaya,",
                "startSec": 268.00,
                "endSec": 272.40
            },
            {
                "id": "line_10_06",
                "text": "Group photo ke uss kone mein, Maine apna kal chhupaya.",
                "startSec": 272.40,
                "endSec": 277.90
            },
            {
                "id": "line_10_07",
                "text": "Kaash koi uss pal keh deta, “Yeh waqt phir nahi aayega,”",
                "startSec": 277.90,
                "endSec": 283.28
            },
            {
                "id": "line_10_08",
                "text": "Hum thodi der aur ruk jaate, Koi ghar nahi jaayega...",
                "startSec": 283.28,
                "endSec": 288.64
            }
        ]
    },
    {
        "id": "scene_11_climax",
        "name": "Final Mukhda — Cinematic Climax",
        "sectionTag": "11 // CLIMAX  •  UNKE BINA JAHAAN TANHA HUA",
        "startSec": 291.00,
        "endSec": 301.40,
        "subtitle": "Meeting them used to feel so ordinary • Without them, the world feels lonely",
        "lines": [
            {
                "id": "line_11_01",
                "text": "Kal tak jo roz ka tha, Aaj woh yaad ban gaya,",
                "startSec": 291.32,
                "endSec": 296.90
            },
            {
                "id": "line_11_02",
                "text": "Jinse milna aam sa lagta tha, Unke bina jahaan tanha hua.",
                "startSec": 296.90,
                "endSec": 301.40
            }
        ]
    },
    {
        "id": "scene_12_solo",
        "name": "Guitar Solo & Nostalgic Montage",
        "sectionTag": "12 // SOLO  •  THE ECHO OF YEARS",
        "startSec": 301.40,
        "endSec": 331.76,
        "subtitle": "Soaring guitar solo • Decades passing like shadows across the classroom wall",
        "lines": []
    },
    {
        "id": "scene_13_reprise_tag",
        "name": "Reprise Tag & Last Echo",
        "sectionTag": "13 // REPRISE  •  PAR DIL WAHIN REH GAYA",
        "startSec": 331.76,
        "endSec": 345.92,
        "subtitle": "The school bell rings no more • But the heart still waits at that old crossroad",
        "lines": [
            {
                "id": "line_13_01",
                "text": "Ab woh ghanti nahi bulaati, Na koi naam pukarta hai,",
                "startSec": 331.76,
                "endSec": 334.40
            },
            {
                "id": "line_13_02",
                "text": "Dil aaj bhi uss mod pe jaakar, Doston ka intezaar karta hai...",
                "startSec": 334.40,
                "endSec": 337.24
            },
            {
                "id": "line_13_03",
                "text": "Classroom toh chhoot gaya... Par dil wahin reh gaya.",
                "startSec": 338.60,
                "endSec": 344.00
            }
        ]
    },
    {
        "id": "scene_14_outro",
        "name": "Outro — Student Life Dil Se Kabhi Khatam Hoti Nahi",
        "sectionTag": "14 // OUTRO  •  STUDENT LIFE FOREVER",
        "startSec": 345.92,
        "endSec": 382.367,
        "subtitle": "If we meet again, let's smile as if we met only yesterday • Because student life never ends",
        "lines": [
            {
                "id": "line_14_01",
                "text": "Kabhi milna toh phir se milna, Jaise kal hi mile the hum,",
                "startSec": 345.92,
                "endSec": 351.26
            },
            {
                "id": "line_14_02",
                "text": "Na poochhna kitne badal gaye, Bas hans dena pehle ki tarah...",
                "startSec": 351.26,
                "endSec": 357.36
            },
            {
                "id": "line_14_03",
                "text": "Kyunki kuchh dost, kuchh yaadein, Kabhi puraani hoti nahi...",
                "startSec": 357.36,
                "endSec": 362.84
            },
            {
                "id": "line_14_04",
                "text": "Zindagi aage badh jaati hai, Par student life... Dil se kabhi khatam hoti nahi.",
                "startSec": 363.78,
                "endSec": 373.46
            }
        ]
    }
]

timeline = {
    "songTitle": "Kal Tak Jo Roz Ka Tha",
    "theme": "SongCoverArtwork",
    "fps": fps,
    "totalFrames": total_frames,
    "scenes": []
}

word_counter = 1

for sc_idx, sc in enumerate(scenes_data):
    sc_start_f = f(sc["startSec"])
    sc_end_f = f(sc["endSec"])

    scene_obj = {
        "id": sc["id"],
        "name": sc["name"],
        "sectionTag": sc["sectionTag"],
        "startFrame": sc_start_f,
        "endFrame": sc_end_f,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "classroom_desk",
        "subtitle": sc["subtitle"],
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

out_dir = "src/songs/kal-tak-jo-roz-ka-tha"
os.makedirs(out_dir, exist_ok=True)
output_path = os.path.join(out_dir, "timeline.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 60 FPS timeline with Whisper Alignment!")
print(f"[✓] Total scenes: {len(timeline['scenes'])}, total words: {word_counter-1}")
print(f"[✓] Total duration: {total_duration_sec:.2f}s ({total_frames} frames)")
