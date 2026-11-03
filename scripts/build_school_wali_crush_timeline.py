#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'School Wali Crush' (स्कूल वाली क्रश)
Audio: public/audio/school_wali_crush.mp3 (297.93 seconds = 17,876 frames @ 60 FPS)
Theme: SongCoverArtwork (Romantic School Nostalgia)
Aligned with 100% precision from stable-whisper forced alignment.
"""

import os
import json
import re

fps = 60
total_duration_sec = 297.93
total_frames = int(round(total_duration_sec * fps))  # 17876

def f(sec):
    return int(round(sec * fps))

# Load stable-whisper alignment
whisper_file = "src/songs/school-wali-crush/aligned_whisper.json"
with open(whisper_file, "r", encoding="utf-8") as wf:
    whisper_data = json.load(wf)

all_words = []
for s in whisper_data["segments"]:
    for w in s.get("words", []):
        all_words.append({
            "word": w["word"].strip(),
            "start": w["start"],
            "end": w["end"]
        })

print(f"Loaded {len(all_words)} aligned words from Whisper.")

# Defined 12 Scenes mapping the song structure
scenes_config = [
    {
        "id": "scene_01_intro",
        "name": "Classroom Morning Sun & Quiet Glance",
        "sectionTag": "01 // INTRO  •  CLASSROOM NOSTALGIA",
        "startSec": 0.0,
        "endSec": 25.5,
        "subtitle": "Soft nostalgic piano prelude • Morning sunlight streaming through dusty school windowpanes",
        "lines": []
    },
    {
        "id": "scene_02_intro_vocals",
        "name": "Pehli Nazar & Kitaabon Mein Chhupkar",
        "sectionTag": "02 // PRELUDE  •  PEHLI NAZAR",
        "startSec": 25.5,
        "endSec": 52.0,
        "subtitle": "That first glance across the classroom • Hiding behind textbooks just to see you",
        "lines": [
            {"text": "वो पहली नज़र, वो पहला एहसास,", "accent": "एहसास"},
            {"text": "तेरी मुस्कुराहट, मेरा दिल तेरे पास।", "accent": "मुस्कुराहट"},
            {"text": "किताबों में छुपकर, तुझे देखना,", "accent": "किताबों"},
            {"text": "बिन कुछ कहे ही, तुझसे प्यार करना...", "accent": "प्यार"}
        ]
    },
    {
        "id": "scene_03_verse_1",
        "name": "Class Mein Aana & Dhadkan Badh Jaana",
        "sectionTag": "03 // VERSE 1  •  DHADKAN MERI",
        "startSec": 52.0,
        "endSec": 80.5,
        "subtitle": "Every time you walked in, my heart raced • Writing your name beside mine",
        "lines": [
            {"text": "जब तू क्लास में आती थी,", "accent": "क्लास"},
            {"text": "धड़कन मेरी बढ़ जाती थी।", "accent": "धड़कन"},
            {"text": "तू नज़रें उठाकर देखे अगर,", "accent": "नज़रें"},
            {"text": "मेरी दुनिया रुक जाती थी।", "accent": "दुनिया"},
            {"text": "तेरे नाम के साथ अपना नाम,", "accent": "नाम"},
            {"text": "लिखता था मैं बार-बार।", "accent": "बार-बार"},
            {"text": "एक मुस्कान तेरी मिल जाए,", "accent": "मुस्कान"},
            {"text": "बस इतना था मेरा प्यार।", "accent": "प्यार"}
        ]
    },
    {
        "id": "scene_04_prechorus_1",
        "name": "Na Tu Samjhi & Dil Ne Chaha",
        "sectionTag": "04 // PRE-CHORUS  •  UNSAID WORDS",
        "startSec": 80.5,
        "endSec": 87.5,
        "subtitle": "Neither could you understand, nor could I speak • Yet my heart only longed for you",
        "lines": [
            {"text": "ना तू समझी, ना मैं कह पाया,", "accent": "समझी"},
            {"text": "दिल ने फिर भी तुझे ही चाहा...", "accent": "चाहा"}
        ]
    },
    {
        "id": "scene_05_chorus_1",
        "name": "O Meri School Wali Crush",
        "sectionTag": "05 // CHORUS  •  SCHOOL WALI CRUSH",
        "startSec": 87.5,
        "endSec": 115.5,
        "subtitle": "O my school-time crush • Lunch break smiles and memories that never fade",
        "lines": [
            {"text": "ओ मेरी स्कूल वाली क्रश,", "accent": "क्रश"},
            {"text": "दिल को तेरा ही था नशा।", "accent": "नशा"},
            {"text": "तेरी हँसी, तेरी बातें,", "accent": "हँसी"},
            {"text": "याद हैं मुझको दिन-रातें।", "accent": "दिन-रातें"},
            {"text": "वो लंच ब्रेक, वो मुलाक़ात,", "accent": "लंच"},
            {"text": "तेरे साथ गुज़री हर बात।", "accent": "बात"},
            {"text": "वक़्त भले ही बीत गया,", "accent": "वक़्त"},
            {"text": "दिल वहीं पर रह गया।", "accent": "दिल"}
        ]
    },
    {
        "id": "scene_06_interlude",
        "name": "Corridor Chimes & Melodic Interlude",
        "sectionTag": "06 // INTERLUDE  •  GOLDEN CORRIDORS",
        "startSec": 115.5,
        "endSec": 141.5,
        "subtitle": "Acoustic guitar and gentle flute interlude • Dusty sunbeams falling on empty wooden benches",
        "lines": []
    },
    {
        "id": "scene_07_verse_2",
        "name": "Pen Ka Bahaana & Teri Copy",
        "sectionTag": "07 // VERSE 2  •  SECRET NOTES",
        "startSec": 141.5,
        "endSec": 167.5,
        "subtitle": "Borrowing pens just to be near you • A thousand unsaid letters hidden in notebooks",
        "lines": [
            {"text": "तेरी पेन के बहाने,", "accent": "पेन"},
            {"text": "तेरे पास आना था।", "accent": "पास"},
            {"text": "तेरे साथ दो पल मिल जाएँ,", "accent": "ख़ज़ाना"},
            {"text": "बस इतना ख़ज़ाना था।", "accent": "ख़ज़ाना"},
            {"text": "तेरी कॉपी, मेरा नाम,", "accent": "कॉपी"},
            {"text": "दिल में छुपे हज़ार पैग़ाम।", "accent": "पैग़ाम"},
            {"text": "तू तो हँसकर चल देती थी,", "accent": "हँसकर"},
            {"text": "मैं जी लेता था वो शाम।", "accent": "शाम"}
        ]
    },
    {
        "id": "scene_08_prechorus_2",
        "name": "Baatein Adhoori & Khushi Thodi",
        "sectionTag": "08 // PRE-CHORUS  •  BITTERSWEET",
        "startSec": 167.5,
        "endSec": 178.5,
        "subtitle": "So many conversations left unfinished • Every joy felt incomplete without you",
        "lines": [
            {"text": "कितनी बातें रह गईं अधूरी,", "accent": "अधूरी"},
            {"text": "तेरे बिना हर ख़ुशी थी थोड़ी...", "accent": "ख़ुशी"}
        ]
    },
    {
        "id": "scene_09_chorus_2",
        "name": "O Meri School Wali Crush (Fuller Vocals)",
        "sectionTag": "09 // CHORUS  •  MEMORY LANE",
        "startSec": 178.5,
        "endSec": 206.5,
        "subtitle": "The warmth of your laughter • Time moved forward, but my heart remained behind",
        "lines": [
            {"text": "ओ मेरी स्कूल वाली क्रश,", "accent": "क्रश"},
            {"text": "दिल को तेरा ही था नशा।", "accent": "नशा"},
            {"text": "तेरी हँसी, तेरी बातें,", "accent": "हँसी"},
            {"text": "याद हैं मुझको दिन-रातें।", "accent": "दिन-रातें"},
            {"text": "वो लंच ब्रेक, वो मुलाक़ात,", "accent": "लंच"},
            {"text": "तेरे साथ गुज़री हर बात।", "accent": "बात"},
            {"text": "वक़्त भले ही बीत गया,", "accent": "वक़्त"},
            {"text": "दिल वहीं पर रह गया।", "accent": "दिल"}
        ]
    },
    {
        "id": "scene_10_bridge",
        "name": "Aakhiri Din & School Ka Gate",
        "sectionTag": "10 // BRIDGE  •  FAREWELL AT THE GATE",
        "startSec": 206.5,
        "endSec": 233.5,
        "subtitle": "The final day by the school gate • Waving goodbye while holding back the words of first love",
        "lines": [
            {"text": "आख़िरी दिन, वो स्कूल का गेट,", "accent": "गेट"},
            {"text": "दिल में थे सवाल हज़ार।", "accent": "सवाल"},
            {"text": "तूने हँसकर हाथ हिलाया,", "accent": "हिलाया"},
            {"text": "मैं कह ना पाया—पहला प्यार।", "accent": "प्यार"},
            {"text": "शायद तुझको याद न हो,", "accent": "याद"},
            {"text": "पर तू मेरा पहला ख़्वाब थी।", "accent": "ख़्वाब"},
            {"text": "मेरी छोटी-सी दुनिया में,", "accent": "दुनिया"},
            {"text": "तू सबसे ख़ास थी...", "accent": "ख़ास"}
        ]
    },
    {
        "id": "scene_11_final_chorus",
        "name": "O Meri School Wali Crush (Emotional Climax)",
        "sectionTag": "11 // CLIMAX  •  FOREVER IN MY HEART",
        "startSec": 233.5,
        "endSec": 265.0,
        "subtitle": "Even today, your name lives in my heart • First love might stay unfulfilled, but cherished forever",
        "lines": [
            {"text": "ओ मेरी स्कूल वाली क्रश,", "accent": "क्रश"},
            {"text": "आज भी दिल में तेरा नाम।", "accent": "नाम"},
            {"text": "वो अधूरी-सी मोहब्बत,", "accent": "मोहब्बत"},
            {"text": "वो बचपन के प्यारे अरमान।", "accent": "अरमान"},
            {"text": "वो लंच ब्रेक, वो मुलाक़ात,", "accent": "लंच"},
            {"text": "वो आँखों-आँखों वाली बात।", "accent": "आँखों"},
            {"text": "पहला प्यार अधूरा सही,", "accent": "प्यार"},
            {"text": "याद रहेगा उम्र भर साथ...", "accent": "साथ"}
        ]
    },
    {
        "id": "scene_12_outro",
        "name": "Woh School Gaya & Soft Fade",
        "sectionTag": "12 // OUTRO  •  DREAMY FAREWELL",
        "startSec": 265.0,
        "endSec": 297.93,
        "subtitle": "School days and that era passed away, but you never left my soul • Soft piano echoes into quiet reverie",
        "lines": [
            {"text": "वो स्कूल गया, वो दौर गया,", "accent": "दौर"},
            {"text": "पर दिल से तू ना जा सकी...", "accent": "दिल"},
            {"text": "मेरी पहली मोहब्बत थी तू,", "accent": "मोहब्बत"},
            {"text": "जो कभी मेरी हो ना सकी...", "accent": "मेरी"}
        ]
    }
]

timeline = {
    "songTitle": "School Wali Crush (स्कूल वाली क्रश)",
    "audioFile": "audio/school_wali_crush.mp3",
    "theme": "SongCoverArtwork",
    "fps": fps,
    "totalFrames": total_frames,
    "coverImage": "covers/school_wali_crush_clean_16x9.png",
    "scenes": []
}

word_cursor = 0
word_id_counter = 1

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
        "symbolKey": "classroom_desk",
        "subtitle": sc["subtitle"],
        "lines": []
    }

    sc_lines = sc["lines"]
    line_count = len(sc_lines)

    for l_idx, line_def in enumerate(sc_lines):
        clean_text = line_def["text"]
        accent_target = line_def["accent"]
        tokens = clean_text.split()
        num_tokens = len(tokens)

        assigned_words = all_words[word_cursor : word_cursor + num_tokens]
        word_cursor += num_tokens

        # Start time of the line is the start of first word
        first_w_start_sec = assigned_words[0]["start"] if assigned_words else sc["startSec"]
        last_w_end_sec = assigned_words[-1]["end"] if assigned_words else sc["endSec"]

        l_start_f = max(sc_start_f, f(first_w_start_sec))
        # End frame is held until next line starts or end of scene
        l_end_f = max(l_start_f + num_tokens * 6, f(last_w_end_sec))

        line_id = f"line_{sc_idx+1:02d}_{l_idx+1:02d}"
        line_obj = {
            "id": line_id,
            "text": clean_text,
            "startTime": round(first_w_start_sec, 3),
            "endTime": round(last_w_end_sec, 3),
            "startFrame": l_start_f,
            "endFrame": l_end_f,
            "words": []
        }

        current_f = l_start_f
        for w_idx, token in enumerate(tokens):
            if w_idx < len(assigned_words):
                w_align = assigned_words[w_idx]
                w_start_f = max(current_f, f(w_align["start"]))
                w_end_f = max(w_start_f + 4, f(w_align["end"]))
            else:
                w_start_f = current_f
                w_end_f = current_f + 10

            clean_token_nopunct = re.sub(r"[^\w\u0900-\u097F]", "", token)
            is_accent = (accent_target in clean_token_nopunct or clean_token_nopunct in accent_target)

            w_start_f = max(sc_start_f, min(w_start_f, sc_end_f - 4))
            w_end_f = min(sc_end_f, max(w_start_f + 4, w_end_f))

            word_id = f"w_{sc_idx+1:02d}_{word_id_counter:04d}"
            line_obj["words"].append({
                "id": word_id,
                "text": token,
                "startFrame": w_start_f,
                "endFrame": w_end_f,
                "accent": is_accent
            })
            current_f = w_end_f
            word_id_counter += 1

        scene_obj["lines"].append(line_obj)

    # Smooth adjacent line bounds inside the scene so couplets transition smoothly
    for i in range(len(scene_obj["lines"]) - 1):
        c_l = scene_obj["lines"][i]
        n_l = scene_obj["lines"][i+1]
        if c_l["endFrame"] > n_l["startFrame"]:
            c_l["endFrame"] = n_l["startFrame"]
        # Allow holding the line for visual continuity if gap is small
        elif n_l["startFrame"] - c_l["endFrame"] < 45: # < 0.75s
            c_l["endFrame"] = n_l["startFrame"]

    timeline["scenes"].append(scene_obj)

# Ensure contiguous scene boundaries and exact total frames
for i in range(len(timeline["scenes"]) - 1):
    curr_s = timeline["scenes"][i]
    next_s = timeline["scenes"][i + 1]
    if curr_s["endFrame"] != next_s["startFrame"]:
        curr_s["endFrame"] = next_s["startFrame"]

timeline["scenes"][-1]["endFrame"] = total_frames

out_dir = "src/songs/school-wali-crush"
os.makedirs(out_dir, exist_ok=True)
output_path = os.path.join(out_dir, "timeline.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 'School Wali Crush' 60 FPS timeline successfully!")
print(f"[✓] Total scenes: {len(timeline['scenes'])}, total unique words: {word_id_counter-1}")
print(f"[✓] Total duration: {total_duration_sec:.2f}s ({total_frames} frames)")
