#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Teri Yaadon Ki Baarish' (तेरी यादों की बारिश)
Audio: public/audio/teri_yaadon_ki_baarish.mp3 (279.13 seconds = 16,748 frames @ 60 FPS)
Radio: public/audio/teri_yaadon_ki_baarish_radio.mp3 (176.50 seconds = 10,590 frames @ 60 FPS)
Theme: SongCoverArtwork (Late-Night Soulful Bollywood Indie Ballad / Lofi Acoustic Rain Nostalgia)
Cover: public/covers/teri_yaadon_ki_baarish_clean_16x9.png
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
TOTAL_DURATION_SEC = 279.13
TOTAL_FRAMES = int(round(TOTAL_DURATION_SEC * FPS))  # 16748

RADIO_DURATION_SEC = 176.50
RADIO_FRAMES = int(round(RADIO_DURATION_SEC * FPS))  # 10590

OUTPUT_DIR = os.path.join(ROOT_DIR, "src", "songs", "teri-yaadon-ki-baarish")
os.makedirs(OUTPUT_DIR, exist_ok=True)

OUTPUT_TIMELINE = os.path.join(OUTPUT_DIR, "timeline.json")
OUTPUT_RADIO_TIMELINE = os.path.join(OUTPUT_DIR, "timeline_radio.json")

def f(sec):
    return int(round(sec * FPS))

# Defined structured scenes mapping the song
SCENES_SPEC = [
    {
        "id": "scene_01_intro",
        "name": "Intro — Soft Humming & Rain On Window",
        "sectionTag": "01 // INTRO  •  KHIDKI PE BAARISH",
        "startSec": 0.0,
        "endSec": 26.5,
        "hierarchy": "ATMOSPHERE_DOMINANT",
        "symbolKey": "rainy_window",
        "subtitle": "Midnight rain tapping against the glass pane • Soft humming echoing through quiet room",
        "lines": [
            {"text": "हम्म... हम्म... ओ... ओ... ओ...", "startSec": 8.44, "endSec": 13.50, "accent": "हम्म"},
            {"text": "खिड़की पे बारिश, रात भी नम है,", "startSec": 13.84, "endSec": 19.94, "accent": "बारिश"},
            {"text": "तेरी ही बातें, दिल में अब भी हैं...", "startSec": 21.32, "endSec": 25.90, "accent": "बातें"}
        ]
    },
    {
        "id": "scene_02_verse_1",
        "name": "Verse 1 — Is Shahar Ki Soi Galiyon Mein",
        "sectionTag": "02 // VERSE 1  •  SOI GALIYAN",
        "startSec": 26.5,
        "endSec": 53.0,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "glowing_streetlamp",
        "subtitle": "Searching for your face in the sleeping alleys of this town • Talking to the silent moon",
        "lines": [
            {"text": "इस शहर की सोई गलियों में,", "startSec": 27.22, "endSec": 31.28, "accent": "गलियों"},
            {"text": "तेरा ही चेहरा ढूँढता हूँ।", "startSec": 31.28, "endSec": 34.02, "accent": "चेहरा"},
            {"text": "चाँद से तेरी बातें करके,", "startSec": 34.02, "endSec": 37.06, "accent": "चाँद"},
            {"text": "ख़ुद से ही मैं रूठता हूँ।", "startSec": 37.06, "endSec": 40.20, "accent": "रूठता"},
            {"text": "तेरी हँसी की वो हल्की ख़ुशबू,", "startSec": 40.82, "endSec": 43.82, "accent": "ख़ुशबू"},
            {"text": "अब भी हवाओं में मिलती है।", "startSec": 43.82, "endSec": 46.72, "accent": "हवाओं"},
            {"text": "आँखें बंद करूँ तो जाने क्यों,", "startSec": 46.72, "endSec": 49.80, "accent": "आँखें"},
            {"text": "तू मेरे पास ही लगती है।", "startSec": 49.80, "endSec": 53.08, "accent": "पास"}
        ]
    },
    {
        "id": "scene_03_prechorus_1",
        "name": "Pre-Chorus — Waqt Guzarta Raha",
        "sectionTag": "03 // PRE-CHORUS  •  DIL WAHIN THEHRA",
        "startSec": 53.0,
        "endSec": 65.7,
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "rainy_window",
        "subtitle": "Time keeps passing slowly by • My heart remains right where you left it",
        "lines": [
            {"text": "वक़्त गुज़रता रहा धीरे-धीरे,", "startSec": 53.08, "endSec": 55.48, "accent": "गुज़रता"},
            {"text": "दिल वहीं ठहरा है आज भी।", "startSec": 55.48, "endSec": 59.34, "accent": "ठहरा"},
            {"text": "तू तो शायद भूल गई होगी,", "startSec": 59.34, "endSec": 63.36, "accent": "भूल"},
            {"text": "मैं तुझे सोचूँ हर रात ही...", "startSec": 63.36, "endSec": 65.76, "accent": "रात"}
        ]
    },
    {
        "id": "scene_04_chorus_1",
        "name": "Chorus 1 — Teri Yaadon Ki Baarish",
        "sectionTag": "04 // CHORUS  •  TERI YAADON KI BAARISH",
        "startSec": 65.7,
        "endSec": 105.7,
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "crescent_moon",
        "subtitle": "Drenched in the gentle rain of your memories • Even when you're not here, you feel so close",
        "lines": [
            {"text": "तेरी यादों की बारिश में,", "startSec": 65.76, "endSec": 68.90, "accent": "यादों"},
            {"text": "भीगता है ये दिल मेरा।", "startSec": 68.90, "endSec": 71.80, "accent": "भीगता"},
            {"text": "तू नहीं है फिर भी जाने क्यों,", "startSec": 72.08, "endSec": 75.44, "accent": "जाने"},
            {"text": "लगता है तू है पास मेरा।", "startSec": 75.44, "endSec": 78.50, "accent": "पास"},
            {"text": "चाँद भी पूछे रातों में,", "startSec": 78.50, "endSec": 81.68, "accent": "चाँद"},
            {"text": "किसका करता है इंतज़ार?", "startSec": 81.68, "endSec": 84.50, "accent": "इंतज़ार"},
            {"text": "मैं मुस्कुरा के कह देता हूँ,", "startSec": 84.84, "endSec": 88.00, "accent": "मुस्कुरा"},
            {"text": "कोई था... जो था मेरा यार।", "startSec": 88.84, "endSec": 94.00, "accent": "यार"},
            {"text": "ओ... कोई था... जो था मेरा यार...", "startSec": 94.82, "endSec": 101.50, "accent": "यार"},
            {"text": "हम्म... जो था मेरा यार...", "startSec": 102.50, "endSec": 105.70, "accent": "यार"}
        ]
    },
    {
        "id": "scene_05_verse_2",
        "name": "Verse 2 — Coffee Ki Pyaali & Puraani Diary",
        "sectionTag": "05 // VERSE 2  •  PURAANI DIARY",
        "startSec": 105.7,
        "endSec": 142.6,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "steaming_chai",
        "subtitle": "A cold cup of coffee, an open photograph • In the quiet pages of an old diary, your love still lives",
        "lines": [
            {"text": "कॉफ़ी की प्याली, ठंडी पड़ी है,", "startSec": 105.78, "endSec": 108.54, "accent": "कॉफ़ी"},
            {"text": "तेरी वो तस्वीर खुली पड़ी है।", "startSec": 108.54, "endSec": 111.80, "accent": "तस्वीर"},
            {"text": "लिखने को तुझको ख़त तो बहुत हैं,", "startSec": 111.80, "endSec": 114.94, "accent": "ख़त"},
            {"text": "पर हर कहानी अधूरी खड़ी है।", "startSec": 114.94, "endSec": 118.12, "accent": "अधूरी"},
            {"text": "वो छत पे बैठकर तारे गिनना,", "startSec": 118.12, "endSec": 121.44, "accent": "तारे"},
            {"text": "बिन बात के तेरा हँस देना।", "startSec": 121.44, "endSec": 124.64, "accent": "हँस"},
            {"text": "मेरी हर छोटी-सी ख़ुशी में,", "startSec": 124.64, "endSec": 127.50, "accent": "ख़ुशी"},
            {"text": "तेरा ही शामिल हो जाना।", "startSec": 127.50, "endSec": 130.24, "accent": "शामिल"},
            {"text": "अब उन लम्हों की धीमी आहट,", "startSec": 130.24, "endSec": 133.00, "accent": "आहट"},
            {"text": "कमरे में गूँजा करती है।", "startSec": 133.00, "endSec": 136.22, "accent": "गूँजा"},
            {"text": "दिल की पुरानी एक डायरी में,", "startSec": 136.22, "endSec": 139.36, "accent": "डायरी"},
            {"text": "तेरी मोहब्बत ज़िंदा है...", "startSec": 139.36, "endSec": 142.66, "accent": "ज़िंदा"}
        ]
    },
    {
        "id": "scene_06_prechorus_2",
        "name": "Pre-Chorus 2 — Shaayad Hum Phir Milein",
        "sectionTag": "06 // PRE-CHORUS  •  KISI MOD PAR",
        "startSec": 142.6,
        "endSec": 156.2,
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "glowing_streetlamp",
        "subtitle": "Perhaps we will cross paths again someday • At some crossroad, on some quiet evening",
        "lines": [
            {"text": "शायद हम फिर मिलें किसी दिन,", "startSec": 142.66, "endSec": 146.00, "accent": "शायद"},
            {"text": "किसी मोड़ पर, किसी शाम को।", "startSec": 146.00, "endSec": 149.60, "accent": "शाम"},
            {"text": "मैं पहचानूँ तेरी आँखें,", "startSec": 149.60, "endSec": 152.72, "accent": "पहचानूँ"},
            {"text": "तू पहचान ले मेरे नाम को...", "startSec": 152.72, "endSec": 156.28, "accent": "नाम"}
        ]
    },
    {
        "id": "scene_07_chorus_2",
        "name": "Chorus 2 — Fuller Emotional Arrangement",
        "sectionTag": "07 // CHORUS  •  MERA QARAAR",
        "startSec": 156.2,
        "endSec": 196.8,
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "crescent_moon",
        "subtitle": "You are my entire world, my deep peace • The moon asks again in the midnight silence",
        "lines": [
            {"text": "तेरी यादों की बारिश में,", "startSec": 156.28, "endSec": 160.08, "accent": "यादों"},
            {"text": "भीगता है ये दिल मेरा।", "startSec": 160.08, "endSec": 162.74, "accent": "भीगता"},
            {"text": "तू नहीं है फिर भी जाने क्यों,", "startSec": 162.74, "endSec": 166.20, "accent": "जाने"},
            {"text": "लगता है तू है पास मेरा।", "startSec": 166.20, "endSec": 169.50, "accent": "पास"},
            {"text": "चाँद भी पूछे रातों में,", "startSec": 169.50, "endSec": 172.86, "accent": "चाँद"},
            {"text": "किसका करता है इंतज़ार?", "startSec": 172.86, "endSec": 175.28, "accent": "इंतज़ार"},
            {"text": "मैं मुस्कुरा के कह देता हूँ,", "startSec": 175.28, "endSec": 179.00, "accent": "मुस्कुरा"},
            {"text": "कोई था... जो था मेरा यार।", "startSec": 180.00, "endSec": 184.36, "accent": "यार"},
            {"text": "ओ... कोई था... जो था मेरा यार...", "startSec": 188.00, "endSec": 191.00, "accent": "यार"},
            {"text": "जो मेरी दुनिया, मेरा क़रार...", "startSec": 193.00, "endSec": 196.42, "accent": "क़रार"}
        ]
    },
    {
        "id": "scene_08_bridge",
        "name": "Bridge — Aasmaan Ko Dekh Lena",
        "sectionTag": "08 // BRIDGE  •  EK TAARA",
        "startSec": 196.8,
        "endSec": 221.8,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "window_candle",
        "subtitle": "If ever you think of me, look up at the starry sky • Some incomplete loves are truly beautiful",
        "lines": [
            {"text": "अगर कभी तुझे मेरी याद आए,", "startSec": 196.90, "endSec": 199.76, "accent": "याद"},
            {"text": "तो आसमाँ को देख लेना।", "startSec": 199.76, "endSec": 202.94, "accent": "आसमाँ"},
            {"text": "एक तारा थोड़ा देर चमके,", "startSec": 202.94, "endSec": 206.06, "accent": "तारा"},
            {"text": "तो मेरा नाम समझ लेना।", "startSec": 206.06, "endSec": 209.06, "accent": "नाम"},
            {"text": "मैं माँगूँगा नहीं तुझे वापस,", "startSec": 209.06, "endSec": 212.00, "accent": "वापस"},
            {"text": "कुछ प्यार अधूरे अच्छे हैं।", "startSec": 212.00, "endSec": 215.00, "accent": "अधूरे"},
            {"text": "जो दिल में रहकर दिल को छू लें,", "startSec": 215.00, "endSec": 218.00, "accent": "दिल"},
            {"text": "वो रिश्ते भी तो सच्चे हैं...", "startSec": 218.00, "endSec": 221.84, "accent": "सच्चे"}
        ]
    },
    {
        "id": "scene_09_chorus_final",
        "name": "Final Chorus — Whispery Emotional Climax",
        "sectionTag": "09 // FINAL CHORUS  •  BAS ITNA SACH",
        "startSec": 221.8,
        "endSec": 249.5,
        "hierarchy": "TYPOGRAPHY_DOMINANT",
        "symbolKey": "crescent_moon",
        "subtitle": "Even if the moon fades and the stars are lost • You were mine once, that remains the only truth",
        "lines": [
            {"text": "तेरी यादों की बारिश में,", "startSec": 221.84, "endSec": 225.50, "accent": "यादों"},
            {"text": "आज भी भीगता हूँ मैं।", "startSec": 225.76, "endSec": 228.48, "accent": "भीगता"},
            {"text": "तू किसी और की सुबह सही,", "startSec": 228.86, "endSec": 231.42, "accent": "सुबह"},
            {"text": "तेरी रातों में रहता हूँ मैं...", "startSec": 231.42, "endSec": 234.92, "accent": "रातों"},
            {"text": "चाँद भी ढल जाए तो क्या है,", "startSec": 234.92, "endSec": 238.24, "accent": "चाँद"},
            {"text": "तारे खो जाएँ तो क्या?", "startSec": 238.24, "endSec": 241.22, "accent": "तारे"},
            {"text": "तू मेरी थी, बस इतना सच है,", "startSec": 241.22, "endSec": 244.64, "accent": "सच"},
            {"text": "बाक़ी सब एक ख़्वाब-सा...", "startSec": 244.64, "endSec": 249.00, "accent": "ख़्वाब"}
        ]
    },
    {
        "id": "scene_10_outro",
        "name": "Outro — Lo-fi Rain Fadeout & Reflection",
        "sectionTag": "10 // OUTRO  •  WAHIN KHADA HOON",
        "startSec": 249.5,
        "endSec": 279.13,
        "hierarchy": "ATMOSPHERE_DOMINANT",
        "symbolKey": "rainy_window",
        "subtitle": "Rain on the glass, damp silence • In the rain of your memories, I am still standing right here",
        "lines": [
            {"text": "खिड़की पे बारिश...", "startSec": 249.74, "endSec": 252.50, "accent": "बारिश"},
            {"text": "रात भी नम है...", "startSec": 253.10, "endSec": 255.50, "accent": "नम"},
            {"text": "तू कहीं खुश है...", "startSec": 256.14, "endSec": 258.38, "accent": "खुश"},
            {"text": "बस इतना कम है?", "startSec": 258.38, "endSec": 262.38, "accent": "कम"},
            {"text": "हम्म... हम्म...", "startSec": 263.00, "endSec": 267.00, "accent": "हम्म"},
            {"text": "तेरी यादों की बारिश में...", "startSec": 267.30, "endSec": 270.86, "accent": "बारिश"},
            {"text": "मैं आज भी...", "startSec": 270.86, "endSec": 273.50, "accent": "आज"},
            {"text": "वहीं खड़ा हूँ...", "startSec": 273.50, "endSec": 277.00, "accent": "खड़ा"}
        ]
    }
]

# Build Master Scenes
master_scenes = []
word_counter = 1

for sc_idx, sc_def in enumerate(SCENES_SPEC):
    sc_start_f = f(sc_def["startSec"])
    sc_end_f = f(sc_def["endSec"])

    scene_obj = {
        "id": sc_def["id"],
        "name": sc_def["name"],
        "sectionTag": sc_def["sectionTag"],
        "startFrame": sc_start_f,
        "endFrame": sc_end_f,
        "hierarchy": sc_def["hierarchy"],
        "symbolKey": sc_def["symbolKey"],
        "subtitle": sc_def["subtitle"],
        "lines": []
    }

    raw_lines = sc_def.get("lines", [])
    for l_idx, l_data in enumerate(raw_lines):
        clean_text = l_data["text"].strip()
        tokens = [t.strip() for t in clean_text.split() if t.strip()]
        if not tokens:
            continue

        l_st_f = max(sc_start_f, f(l_data["startSec"]))
        l_en_f = min(sc_end_f, max(l_st_f + 25, f(l_data["endSec"])))

        line_id = f"line_{sc_idx+1:02d}_{l_idx+1:02d}"
        accent_kw = l_data.get("accent") or pick_line_accent_keyword(clean_text)

        line_obj = {
            "id": line_id,
            "text": clean_text,
            "startTime": round(l_data["startSec"], 3),
            "endTime": round(l_data["endSec"], 3),
            "startFrame": l_st_f,
            "endFrame": l_en_f,
            "words": []
        }

        # Divide line duration proportionally among tokens
        total_line_dur_f = max(l_en_f - l_st_f, len(tokens) * 6)
        tok_step_f = total_line_dur_f / len(tokens)

        for w_i, token in enumerate(tokens):
            w_st_f = int(round(l_st_f + w_i * tok_step_f))
            w_en_f = int(round(l_st_f + (w_i + 1) * tok_step_f))
            w_en_f = max(w_st_f + 4, min(l_en_f, w_en_f))

            clean_tok = re.sub(r"[^\w\u0900-\u097F]", "", token)
            is_accent = bool(accent_kw and (accent_kw in clean_tok or clean_tok in accent_kw))

            line_obj["words"].append({
                "id": f"w_{sc_idx+1:02d}_{word_counter:04d}",
                "text": token,
                "startFrame": w_st_f,
                "endFrame": w_en_f,
                "accent": is_accent
            })
            word_counter += 1

        scene_obj["lines"].append(line_obj)

    # Smooth adjacent lines inside scene
    for i in range(len(scene_obj["lines"]) - 1):
        cl = scene_obj["lines"][i]
        nl = scene_obj["lines"][i+1]
        if cl["endFrame"] > nl["startFrame"]:
            cl["endFrame"] = nl["startFrame"]
        elif nl["startFrame"] - cl["endFrame"] < 30:  # < 0.5s hold
            cl["endFrame"] = nl["startFrame"]

    master_scenes.append(scene_obj)

# Ensure strictly contiguous scene boundaries
for i in range(len(master_scenes) - 1):
    master_scenes[i]["endFrame"] = master_scenes[i+1]["startFrame"]
master_scenes[-1]["endFrame"] = TOTAL_FRAMES

# Master Timeline Object
master_timeline = {
    "songTitle": "Teri Yaadon Ki Baarish (तेरी यादों की बारिश)",
    "audioFile": "audio/teri_yaadon_ki_baarish.mp3",
    "theme": "SongCoverArtwork",
    "fps": FPS,
    "totalFrames": TOTAL_FRAMES,
    "durationSeconds": TOTAL_DURATION_SEC,
    "coverImage": "covers/teri_yaadon_ki_baarish_clean_16x9.png",
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
    "songTitle": "Teri Yaadon Ki Baarish (Radio Edit - तेरी यादों की बारिश)",
    "audioFile": "audio/teri_yaadon_ki_baarish_radio.mp3",
    "theme": "SongCoverArtwork",
    "fps": FPS,
    "totalFrames": RADIO_FRAMES,
    "durationSeconds": RADIO_DURATION_SEC,
    "coverImage": "covers/teri_yaadon_ki_baarish_clean_16x9.png",
    "scenes": radio_scenes
}

with open(OUTPUT_RADIO_TIMELINE, "w", encoding="utf-8") as f:
    json.dump(radio_timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Saved compliant radio timeline_radio.json with {len(radio_scenes)} scenes and {RADIO_FRAMES} frames ({RADIO_DURATION_SEC:.2f}s)!")
