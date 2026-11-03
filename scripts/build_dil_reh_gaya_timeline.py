#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Dil Reh Gaya Classroom Mein'
Audio: public/audio/dil_reh_gaya_classroom_mein.mp3 (353.967 seconds = 21238 frames @ 60 FPS)
Theme: Botanical Scrapbook (Classroom & School Life Nostalgia)
Aligned with 100% precision to the vocal speech audio.
"""

import os
import json

fps = 60
total_duration_sec = 353.967
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_data = [
    {
        "id": "scene_01_intro",
        "name": "Classroom Window & Morning Chime",
        "sectionTag": "01 // INTRO  •  CLASSROOM NOSTALGIA",
        "startSec": 0.0,
        "endSec": 12.62,
        "subtitle": "Soft nostalgic piano prelude • Morning sunlight streaming through dusty school windowpanes",
        "lines": []
    },
    {
        "id": "scene_02_morning_rush",
        "name": "Subah Ki Jaldi & Homework Ke Bahaane",
        "sectionTag": "02 // PRELUDE  •  SUBAH KA SAFAR",
        "startSec": 12.62,
        "endSec": 38.50,
        "subtitle": "Running to school in half-fastened uniform • An entire universe inside one small classroom",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Woh subah ki jaldi, woh bhaag ke jaana,",
                "startSec": 12.62,
                "endSec": 16.50
            },
            {
                "id": "line_02_02",
                "text": "Woh aadha sa homework, bahana banana...",
                "startSec": 16.50,
                "endSec": 19.74
            },
            {
                "id": "line_02_03",
                "text": "Woh khidki se aati dhoop ka safar,",
                "startSec": 19.74,
                "endSec": 22.80
            },
            {
                "id": "line_02_04",
                "text": "Woh ghar se bhi pyaara lagta tha ghar...",
                "startSec": 22.80,
                "endSec": 26.50
            },
            {
                "id": "line_02_05",
                "text": "Haan, ek chhoti si duniya thi,",
                "startSec": 26.50,
                "endSec": 30.50
            },
            {
                "id": "line_02_06",
                "text": "Jismein saara jahaan tha...",
                "startSec": 32.50,
                "endSec": 36.50
            }
        ]
    },
    {
        "id": "scene_03_antara_1_part_1",
        "name": "Bag Mein Kitaabein & Tiffin Ki Daawat",
        "sectionTag": "03 // ANTARA 1  •  SECRET TIFFIN & MARBLES",
        "startSec": 38.50,
        "endSec": 68.86,
        "subtitle": "Marbles in pockets, big dreams in heart • Stolen laughter behind the teacher's back",
        "lines": [
            {
                "id": "line_03_01",
                "text": "Bag mein kitaabein, jeb mein kanche,",
                "startSec": 42.28,
                "endSec": 45.96
            },
            {
                "id": "line_03_02",
                "text": "Dil mein the kitne iraade,",
                "startSec": 45.96,
                "endSec": 48.80
            },
            {
                "id": "line_03_03",
                "text": "Teacher ke aate hi chup ho jaana,",
                "startSec": 49.50,
                "endSec": 52.36
            },
            {
                "id": "line_03_04",
                "text": "Phir peeche se hansna, chhupke se baatein...",
                "startSec": 52.36,
                "endSec": 55.90
            },
            {
                "id": "line_03_05",
                "text": "Tiffin khula toh sab saath baithe,",
                "startSec": 55.90,
                "endSec": 59.00
            },
            {
                "id": "line_03_06",
                "text": "Apna bhi aadha, tera bhi aadha,",
                "startSec": 59.00,
                "endSec": 62.18
            },
            {
                "id": "line_03_07",
                "text": "Jis din jo laaya, sabka hi hota,",
                "startSec": 62.18,
                "endSec": 65.42
            },
            {
                "id": "line_03_08",
                "text": "Chhota sa lunch bhi lagta tha daawat...",
                "startSec": 65.42,
                "endSec": 68.86
            }
        ]
    },
    {
        "id": "scene_04_antara_1_part_2",
        "name": "Befikr Hansi & Pure Dosti",
        "sectionTag": "04 // PRE-CHORUS  •  NO FEAR OF TOMORROW",
        "startSec": 68.86,
        "endSec": 78.78,
        "subtitle": "No fear of tomorrow, laughing wholeheartedly at the smallest jokes",
        "lines": [
            {
                "id": "line_04_01",
                "text": "Na kal ki fikrein, na aaj ka darr,",
                "startSec": 68.86,
                "endSec": 72.06
            },
            {
                "id": "line_04_02",
                "text": "Woh chhoti si baaton pe hansna jee bhar...",
                "startSec": 72.06,
                "endSec": 76.50
            }
        ]
    },
    {
        "id": "scene_05_mukhda_1",
        "name": "Ek Ghanti Thi, Sau Kahaaniyan",
        "sectionTag": "05 // MUKHDA  •  DIL REH GAYA CLASSROOM MEIN",
        "startSec": 78.78,
        "endSec": 110.44,
        "subtitle": "We walked all the way back home • But our hearts remained in that classroom",
        "lines": [
            {
                "id": "line_05_01",
                "text": "Ek ghanti thi, sau kahaaniyan,",
                "startSec": 78.78,
                "endSec": 82.10
            },
            {
                "id": "line_05_02",
                "text": "Ek bench thi, poora jahaan,",
                "startSec": 82.10,
                "endSec": 84.62
            },
            {
                "id": "line_05_03",
                "text": "Hum toh ghar tak aa gaye,",
                "startSec": 84.62,
                "endSec": 86.88
            },
            {
                "id": "line_05_04",
                "text": "Dil reh gaya classroom mein wahaan...",
                "startSec": 86.88,
                "endSec": 90.70
            },
            {
                "id": "line_05_05",
                "text": "Woh pencil ke tukde, woh kaagaz ke jahaan,",
                "startSec": 91.10,
                "endSec": 94.34
            },
            {
                "id": "line_05_06",
                "text": "Woh doston ke chehre, woh beete imtihaan,",
                "startSec": 94.34,
                "endSec": 97.78
            },
            {
                "id": "line_05_07",
                "text": "Aaj bhi aankhein band karun toh dikhe,",
                "startSec": 97.78,
                "endSec": 101.02
            },
            {
                "id": "line_05_08",
                "text": "Mera school, mere log, mera bachpan wahaan...",
                "startSec": 101.02,
                "endSec": 104.44
            },
            {
                "id": "line_05_09",
                "text": "Ek ghanti thi, sau kahaaniyan,",
                "startSec": 104.44,
                "endSec": 107.50
            },
            {
                "id": "line_05_10",
                "text": "Dil reh gaya classroom mein wahaan...",
                "startSec": 107.50,
                "endSec": 110.44
            }
        ]
    },
    {
        "id": "scene_06_interlude_1",
        "name": "Acoustic Interlude & Empty Corridors",
        "sectionTag": "06 // INTERLUDE  •  SUNLIT CORRIDOR",
        "startSec": 110.44,
        "endSec": 130.88,
        "subtitle": "Gentle acoustic guitar swells • Empty school corridors bathed in afternoon golden hour",
        "lines": []
    },
    {
        "id": "scene_07_antara_2_part_1",
        "name": "Baarish Mein Bheegna & Muddy Shoes",
        "sectionTag": "07 // ANTARA 2  •  RAIN & WRITTEN DESKS",
        "startSec": 130.88,
        "endSec": 156.56,
        "subtitle": "Drenched in monsoon downpours after school • Names carved on the last bench",
        "lines": [
            {
                "id": "line_07_01",
                "text": "Yaad hai woh din jab baarish mein humne,",
                "startSec": 130.88,
                "endSec": 133.88
            },
            {
                "id": "line_07_02",
                "text": "Chhutti ke baad bhi bheegna tha chaha,",
                "startSec": 133.88,
                "endSec": 136.72
            },
            {
                "id": "line_07_03",
                "text": "Geeli si shirt aur mitti ke jooton mein,",
                "startSec": 136.72,
                "endSec": 140.44
            },
            {
                "id": "line_07_04",
                "text": "Ghar jaake daant bhi hanske tha khaana...",
                "startSec": 140.44,
                "endSec": 143.52
            },
            {
                "id": "line_07_05",
                "text": "Woh last wali bench pe naam likhna,",
                "startSec": 143.52,
                "endSec": 146.38
            },
            {
                "id": "line_07_06",
                "text": "Woh ek hi joke pe sau baar hansna,",
                "startSec": 146.38,
                "endSec": 149.60
            },
            {
                "id": "line_07_07",
                "text": "Woh dost jo bolta, “Kal milte hain phir,”",
                "startSec": 149.60,
                "endSec": 152.90
            },
            {
                "id": "line_07_08",
                "text": "Kisko pata tha badal jaayega sab kuchh...",
                "startSec": 152.90,
                "endSec": 156.56
            }
        ]
    },
    {
        "id": "scene_08_antara_2_part_2",
        "name": "Tasveeron Ke Chehre & Unfading Days",
        "sectionTag": "08 // PRE-CHORUS  •  PICTURES & PASSING YEARS",
        "startSec": 156.56,
        "endSec": 169.68,
        "subtitle": "Faces now framed in old photographs • Years pass, but those memories never fade",
        "lines": [
            {
                "id": "line_08_01",
                "text": "Kuchh bade sapne, kuchh kacchi si baatein,",
                "startSec": 156.56,
                "endSec": 159.80
            },
            {
                "id": "line_08_02",
                "text": "Kuchh chehre jo ab tasveeron mein aate,",
                "startSec": 159.80,
                "endSec": 163.02
            },
            {
                "id": "line_08_03",
                "text": "Kitne hi saal yun guzarte gaye,",
                "startSec": 163.02,
                "endSec": 166.00
            },
            {
                "id": "line_08_04",
                "text": "Par woh din kahin dil se guzarte nahin...",
                "startSec": 166.00,
                "endSec": 169.68
            }
        ]
    },
    {
        "id": "scene_09_mukhda_2",
        "name": "Ek Ghanti Thi (Reprise)",
        "sectionTag": "09 // REPRISE  •  THE GOLDEN ECHO",
        "startSec": 169.68,
        "endSec": 204.00,
        "subtitle": "Pencil fragments and paper airplanes • Childhood echoes in the stillness of the heart",
        "lines": [
            {
                "id": "line_09_01",
                "text": "Ek ghanti thi, sau kahaaniyan,",
                "startSec": 169.68,
                "endSec": 172.90
            },
            {
                "id": "line_09_02",
                "text": "Ek bench thi, poora jahaan,",
                "startSec": 172.90,
                "endSec": 175.40
            },
            {
                "id": "line_09_03",
                "text": "Hum toh ghar tak aa gaye,",
                "startSec": 175.40,
                "endSec": 177.68
            },
            {
                "id": "line_09_04",
                "text": "Dil reh gaya classroom mein wahaan...",
                "startSec": 177.68,
                "endSec": 180.86
            },
            {
                "id": "line_09_05",
                "text": "Woh pencil ke tukde, woh kaagaz ke jahaan,",
                "startSec": 180.86,
                "endSec": 185.44
            },
            {
                "id": "line_09_06",
                "text": "Woh doston ke chehre, woh beete imtihaan,",
                "startSec": 185.44,
                "endSec": 188.82
            },
            {
                "id": "line_09_07",
                "text": "Aaj bhi aankhein band karun toh dikhe,",
                "startSec": 188.82,
                "endSec": 191.80
            },
            {
                "id": "line_09_08",
                "text": "Mera school, mere log,脉 mera bachpan wahaan...",
                "startSec": 191.80,
                "endSec": 195.40
            },
            {
                "id": "line_09_09",
                "text": "Ek ghanti thi, sau kahaaniyan,",
                "startSec": 195.86,
                "endSec": 198.90
            },
            {
                "id": "line_09_10",
                "text": "Dil reh gaya classroom mein wahaan...",
                "startSec": 198.90,
                "endSec": 202.50
            }
        ]
    },
    {
        "id": "scene_10_bridge",
        "name": "Aakhri Din & Present Ma'am",
        "sectionTag": "10 // BRIDGE  •  THE FINAL DAY & ROLL CALL",
        "startSec": 204.00,
        "endSec": 248.68,
        "subtitle": "Signatures on school bags • If only someone called my name in roll call once again",
        "lines": [
            {
                "id": "line_10_01",
                "text": "Us aakhri din bhi hum hanse the bahut,",
                "startSec": 207.80,
                "endSec": 211.28
            },
            {
                "id": "line_10_02",
                "text": "Kisi ne na socha, yeh aakhri milan hai,",
                "startSec": 211.28,
                "endSec": 214.94
            },
            {
                "id": "line_10_03",
                "text": "Woh bags pe likhe hue waade puraane,",
                "startSec": 215.02,
                "endSec": 218.12
            },
            {
                "id": "line_10_04",
                "text": "Woh “contact mein rehna” ke saare fasaane...",
                "startSec": 218.36,
                "endSec": 221.78
            },
            {
                "id": "line_10_05",
                "text": "Tasveer mein sabke chehre toh hain,",
                "startSec": 221.92,
                "endSec": 225.20
            },
            {
                "id": "line_10_06",
                "text": "Par woh roz milne ke din ab kahaan hain?",
                "startSec": 225.46,
                "endSec": 228.34
            },
            {
                "id": "line_10_07",
                "text": "Kaash koi darwaaza khul jaaye phir se,",
                "startSec": 228.56,
                "endSec": 231.38
            },
            {
                "id": "line_10_08",
                "text": "Wahi uniform ho, wahi dost hon paas,",
                "startSec": 231.38,
                "endSec": 235.06
            },
            {
                "id": "line_10_09",
                "text": "Attendance mein jab mera naam koi le,",
                "startSec": 235.06,
                "endSec": 239.10
            },
            {
                "id": "line_10_10",
                "text": "Main “Present, ma'am!” bol doon ek baar...",
                "startSec": 239.10,
                "endSec": 243.96
            },
            {
                "id": "line_10_11",
                "text": "Aur phir se woh ghanti baje...",
                "startSec": 243.96,
                "endSec": 246.30
            },
            {
                "id": "line_10_12",
                "text": "Aur kuchh bhi na badla ho khaas...",
                "startSec": 246.30,
                "endSec": 248.68
            }
        ]
    },
    {
        "id": "scene_11_instrumental_climax",
        "name": "Cinematic Strings & Instrumental Swell",
        "sectionTag": "11 // INSTRUMENTAL  •  CLIMAX SWELL",
        "startSec": 248.68,
        "endSec": 268.74,
        "subtitle": "Cinematic strings & grand piano swell • Soaring emotions across the passage of time",
        "lines": []
    },
    {
        "id": "scene_12_final_chorus",
        "name": "Waqt Humein Aage Le Aaya",
        "sectionTag": "12 // FINAL CHORUS  •  FULL CINEMATIC ANTHEM",
        "startSec": 268.74,
        "endSec": 306.10,
        "subtitle": "Life gave everything else back • But never that world of our old school",
        "lines": [
            {
                "id": "line_12_01",
                "text": "Ek ghanti thi, sau kahaaniyan,",
                "startSec": 268.74,
                "endSec": 271.30
            },
            {
                "id": "line_12_02",
                "text": "Ek bench thi, poora jahaan,",
                "startSec": 271.30,
                "endSec": 274.26
            },
            {
                "id": "line_12_03",
                "text": "Waqt humein aage le aaya,",
                "startSec": 274.26,
                "endSec": 277.60
            },
            {
                "id": "line_12_04",
                "text": "Dil reh gaya classroom mein wahaan...",
                "startSec": 277.60,
                "endSec": 281.48
            },
            {
                "id": "line_12_05",
                "text": "Woh chhote se sapne, woh befikr samaa,",
                "startSec": 281.48,
                "endSec": 284.84
            },
            {
                "id": "line_12_06",
                "text": "Woh roothna, manana, woh apna gumaaan,",
                "startSec": 284.84,
                "endSec": 288.16
            },
            {
                "id": "line_12_07",
                "text": "Zindagi mein sab kuchh dobara mila,",
                "startSec": 288.16,
                "endSec": 291.28
            },
            {
                "id": "line_12_08",
                "text": "Par na mila woh school wala jahaan...",
                "startSec": 291.28,
                "endSec": 297.90
            },
            {
                "id": "line_12_09",
                "text": "Ek ghanti thi, sau kahaaniyan, Kuchh dost the, poora jahaan,",
                "startSec": 297.90,
                "endSec": 301.50
            },
            {
                "id": "line_12_10",
                "text": "Hum bade ho gaye, zamaana badal gaya,",
                "startSec": 301.50,
                "endSec": 303.24
            },
            {
                "id": "line_12_11",
                "text": "Dil reh gaya classroom mein wahaan...",
                "startSec": 303.24,
                "endSec": 306.10
            }
        ]
    },
    {
        "id": "scene_13_outro_piano",
        "name": "Piano Drift & Puraane Doston",
        "sectionTag": "13 // OUTRO  •  WHISPERED MEMORIES",
        "startSec": 306.10,
        "endSec": 335.64,
        "subtitle": "Meet me there someday, old friends • Some conversations are still waiting to finish",
        "lines": [
            {
                "id": "line_13_01",
                "text": "Kabhi milna wahin, puraane doston...",
                "startSec": 318.26,
                "endSec": 321.44
            },
            {
                "id": "line_13_02",
                "text": "Kuchh baatein abhi bhi adhoori hain...",
                "startSec": 321.44,
                "endSec": 325.40
            },
            {
                "id": "line_13_03",
                "text": "Woh bench ab bhi hogi, woh kamra bhi hoga,",
                "startSec": 325.40,
                "endSec": 330.50
            },
            {
                "id": "line_13_04",
                "text": "Shaayad kisi aur ka bachpan wahaan hoga...",
                "startSec": 330.50,
                "endSec": 335.64
            }
        ]
    },
    {
        "id": "scene_14_final_farewell",
        "name": "Aur Hum Toh Ghar Tak Aa Gaye",
        "sectionTag": "14 // FINALE  •  THE FINAL BELL",
        "startSec": 335.64,
        "endSec": total_duration_sec,
        "subtitle": "We walked all the way back home • But our hearts remained forever in that classroom",
        "lines": [
            {
                "id": "line_14_01",
                "text": "Aur hum...",
                "startSec": 336.08,
                "endSec": 337.00
            },
            {
                "id": "line_14_02",
                "text": "Hum toh ghar tak aa gaye...",
                "startSec": 337.00,
                "endSec": 340.50
            },
            {
                "id": "line_14_03",
                "text": "Dil reh gaya classroom mein wahaan...",
                "startSec": 342.06,
                "endSec": 346.50
            }
        ]
    }
]

timeline = {
    "fps": fps,
    "durationInFrames": total_frames,
    "theme": "SongCoverArtwork",
    "songTitle": "Dil Reh Gaya Classroom Mein",
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

out_dir = "src/songs/dil-reh-gaya-classroom-mein"
os.makedirs(out_dir, exist_ok=True)
output_path = os.path.join(out_dir, "timeline.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 60 FPS timeline with Whisper Alignment!")
print(f"[✓] Total scenes: {len(timeline['scenes'])}, total words: {word_counter-1}")
print(f"[✓] Total duration: {total_duration_sec:.2f}s ({total_frames} frames)")
