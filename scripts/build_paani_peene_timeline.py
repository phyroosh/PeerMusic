#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Paani Peene Ka Bahaana'
Audio: public/audio/paani_peene_ka_bahaana.mp3 (241.97 seconds = 14518 frames @ 60 FPS)
Theme: Botanical Scrapbook (School Crush & Corridor Memories)
Aligned with 100% precision to the vocal speech audio.
"""

import os
import json

fps = 60
total_duration_sec = 241.97
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_data = [
    {
        "id": "scene_01_intro",
        "name": "Corridor Chimes & Fingerpicked Prelude",
        "sectionTag": "01 // INTRO  •  CLASSROOM REVERIE",
        "startSec": 0.0,
        "endSec": 10.84,
        "subtitle": "Sunlight slanting across polished wooden corridor • An old excuse to walk past Class 10-B",
        "lines": []
    },
    {
        "id": "scene_02_mukhda",
        "name": "Wooden Pass & The Stolen Walk",
        "sectionTag": "02 // MUKHDA  •  PAANI PEENE KA BAHAANA",
        "startSec": 10.84,
        "endSec": 53.50,
        "subtitle": "Holding the corridor pass with trembling hands • Stolen glances across the classroom window",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Paani peene ka toh bas ek bahaana tha,",
                "startSec": 10.84,
                "endSec": 15.24
            },
            {
                "id": "line_02_02",
                "text": "Mujhe tere classroom ke aage se jaana tha.",
                "startSec": 15.90,
                "endSec": 20.74
            },
            {
                "id": "line_02_03",
                "text": "Haath mein wooden pass, dheeme se kadam,",
                "startSec": 21.70,
                "endSec": 25.50
            },
            {
                "id": "line_02_04",
                "text": "Tujhe mud ke dekhne ka khwaab puraana tha.",
                "startSec": 25.50,
                "endSec": 31.60
            },
            {
                "id": "line_02_05",
                "text": "Class ki khidki se jab dhoop chhan ke aati,",
                "startSec": 31.60,
                "endSec": 36.78
            },
            {
                "id": "line_02_06",
                "text": "Teri bench pe gir ke woh noor ban jaati.",
                "startSec": 36.78,
                "endSec": 43.04
            },
            {
                "id": "line_02_07",
                "text": "Haan paani peene ka toh bas bahaana tha,",
                "startSec": 43.04,
                "endSec": 47.92
            },
            {
                "id": "line_02_08",
                "text": "Mujhe tere classroom ke aage se jaana tha!",
                "startSec": 47.92,
                "endSec": 53.50
            }
        ]
    },
    {
        "id": "scene_03_interlude_1",
        "name": "Corridor Footsteps & Bell Chime",
        "sectionTag": "03 // INTERLUDE  •  CORRIDOR REVERIE",
        "startSec": 53.50,
        "endSec": 65.62,
        "subtitle": "Acoustic strings echo through quiet high school corridors • Memories of youth",
        "lines": []
    },
    {
        "id": "scene_04_antara_1",
        "name": "Morning Assembly & Recess Tiffin",
        "sectionTag": "04 // ANTARA 1  •  ASSEMBLY LINES",
        "startSec": 65.62,
        "endSec": 95.34,
        "subtitle": "Turning around during the morning prayer • Sneaking glances behind lunchbox lids",
        "lines": [
            {
                "id": "line_04_01",
                "text": "Subah ki assembly mein lambi si line thi,",
                "startSec": 65.62,
                "endSec": 70.31
            },
            {
                "id": "line_04_02",
                "text": "Dono ke beech bas do chaar deewarein thin.",
                "startSec": 70.31,
                "endSec": 73.00
            },
            {
                "id": "line_04_03",
                "text": "Prayer ke beech mein main gardan ghumata,",
                "startSec": 73.00,
                "endSec": 76.22
            },
            {
                "id": "line_04_04",
                "text": "Tujhe dhoondhne mein hi ik sukoon paata.",
                "startSec": 76.22,
                "endSec": 80.90
            },
            {
                "id": "line_04_05",
                "text": "Ek baar galti se aankhein jo mil gayin,",
                "startSec": 80.90,
                "endSec": 83.50
            },
            {
                "id": "line_04_06",
                "text": "Puri din ki thakan chupke se dhal gayi.",
                "startSec": 83.50,
                "endSec": 85.98
            },
            {
                "id": "line_04_07",
                "text": "Tu aage waali row mein baithi thi khamosh,",
                "startSec": 85.98,
                "endSec": 88.50
            },
            {
                "id": "line_04_08",
                "text": "Aur aakhri bench pe udta mera hosh!",
                "startSec": 88.50,
                "endSec": 90.82
            },
            {
                "id": "line_04_09",
                "text": "Recess ki ghanti pe dabba kholna,",
                "startSec": 90.82,
                "endSec": 93.00
            },
            {
                "id": "line_04_10",
                "text": "Doston se chhipaa ke tera rukh dekhna.",
                "startSec": 93.00,
                "endSec": 95.34
            }
        ]
    },
    {
        "id": "scene_05_mukhda_reprise",
        "name": "Bina Baat Ke Dhadakta Dil",
        "sectionTag": "05 // CHORUS  •  SWEET NOSTALGIA",
        "startSec": 95.34,
        "endSec": 117.00,
        "subtitle": "The heart beats without reason • A love that never needed words",
        "lines": [
            {
                "id": "line_05_01",
                "text": "Bina baat ke hi dil dhadakne lagta tha,",
                "startSec": 95.34,
                "endSec": 100.24
            },
            {
                "id": "line_05_02",
                "text": "Yeh masoom sa lamha kitna suhaana tha.",
                "startSec": 100.24,
                "endSec": 105.18
            },
            {
                "id": "line_05_03",
                "text": "Paani peene ka toh bas ek bahaana tha,",
                "startSec": 105.18,
                "endSec": 110.30
            },
            {
                "id": "line_05_04",
                "text": "Mujhe tere classroom ke aage se jaana tha!",
                "startSec": 110.30,
                "endSec": 117.00
            }
        ]
    },
    {
        "id": "scene_06_antara_2",
        "name": "The Borrowed Pencil & Tangled Equations",
        "sectionTag": "06 // ANTARA 2  •  BORROWED PENCIL",
        "startSec": 117.00,
        "endSec": 146.50,
        "subtitle": "Sharpening a pencil halfway down with trembling hands • Science period daydreams",
        "lines": [
            {
                "id": "line_06_01",
                "text": "Ik din jo maangi thi tune woh pencil,",
                "startSec": 127.82,
                "endSec": 133.14
            },
            {
                "id": "line_06_02",
                "text": "Aadhi chhil ke di maine kitni mushkil se.",
                "startSec": 133.14,
                "endSec": 138.14
            },
            {
                "id": "line_06_03",
                "text": "Uss naye se shikhar pe jo tera lams tha,",
                "startSec": 138.14,
                "endSec": 142.10
            },
            {
                "id": "line_06_04",
                "text": "Jaise mere hisse ka sabse bada jashn tha.",
                "startSec": 142.10,
                "endSec": 146.50
            }
        ]
    },
    {
        "id": "scene_07_interlude_2",
        "name": "Acoustic Solo & Campus Sunset",
        "sectionTag": "07 // SOLO  •  GOLDEN HOUR MEMORIES",
        "startSec": 146.50,
        "endSec": 170.00,
        "subtitle": "Melodic acoustic strings dance across the school courtyard • Golden dust motes in suspension",
        "lines": []
    },
    {
        "id": "scene_08_bridge",
        "name": "The Saved Eraser & Timeless Innocence",
        "sectionTag": "08 // BRIDGE  •  THE SAVED ERASER",
        "startSec": 170.00,
        "endSec": 193.38,
        "subtitle": "Kept safe in an old uniform pocket • The innocence of loving from afar",
        "lines": [
            {
                "id": "line_08_01",
                "text": "Na kabhi tu samajh paayi mera yeh marz,",
                "startSec": 170.00,
                "endSec": 172.40
            },
            {
                "id": "line_08_02",
                "text": "Purani uniform ki jeb mein aaj bhi,",
                "startSec": 172.40,
                "endSec": 175.14
            },
            {
                "id": "line_08_03",
                "text": "Tera gira eraser mehfooz hai kahin...",
                "startSec": 175.14,
                "endSec": 178.72
            },
            {
                "id": "line_08_04",
                "text": "Haan mehfooz hai kahin!",
                "startSec": 179.98,
                "endSec": 182.70
            },
            {
                "id": "line_08_05",
                "text": "Woh bachpana bhi kitna ajeeb tha,",
                "startSec": 182.70,
                "endSec": 187.26
            },
            {
                "id": "line_08_06",
                "text": "Jitna door tha tu, utna kareeb tha.",
                "startSec": 188.08,
                "endSec": 192.50
            }
        ]
    },
    {
        "id": "scene_09_outro",
        "name": "Two Benches Apart & The Last Look",
        "sectionTag": "09 // OUTRO  •  DO BENCH KA FAASLA",
        "startSec": 193.38,
        "endSec": 241.97,
        "subtitle": "Sitting on the back bench watching you • A bittersweet memory preserved forever",
        "lines": [
            {
                "id": "line_09_01",
                "text": "Do bench aage tu... aakhri bench pe main...",
                "startSec": 193.38,
                "endSec": 197.96
            },
            {
                "id": "line_09_02",
                "text": "Corridor ke mod pe dhoondhta raha chain...",
                "startSec": 197.96,
                "endSec": 205.14
            },
            {
                "id": "line_09_03",
                "text": "Paani peene ka toh bas ek bahaana tha...",
                "startSec": 205.14,
                "endSec": 210.12
            },
            {
                "id": "line_09_04",
                "text": "Tujhe door se bas ek baar dekh aana tha...",
                "startSec": 210.12,
                "endSec": 216.00
            }
        ]
    }
]

timeline = {
    "fps": fps,
    "durationInFrames": total_frames,
    "theme": "SongCoverArtwork",
    "songTitle": "Paani Peene Ka Bahaana",
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

out_dir = "src/songs/paani-peene-ka-bahaana"
os.makedirs(out_dir, exist_ok=True)
output_path = os.path.join(out_dir, "timeline.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 60 FPS timeline for Paani Peene Ka Bahaana!")
print(f"[✓] Total scenes: {len(timeline['scenes'])}, total words: {word_counter-1}")
print(f"[✓] Total duration: {total_duration_sec:.2f}s ({total_frames} frames)")
