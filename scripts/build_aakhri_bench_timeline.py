#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Aakhri Bench (Yaari Aur Khwaab)'
Audio: public/audio/aakhri_bench.mp3 (246.767 seconds = 14806 frames @ 60 FPS)
"""

import os
import json

fps = 60
total_duration_sec = 246.767
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_raw = [
    {
        "id": "scene_01_intro",
        "name": "Acoustic Strumming & Distant Bell",
        "sectionTag": "01 // INTRO  •  LAST BENCH WHISPERS",
        "startSec": 0.0,
        "endSec": 16.5,
        "subtitle": "Carved wooden desks & morning sunlight • The corridor chatter fades",
        "lines": []
    },
    {
        "id": "scene_02_mukhda_p1",
        "name": "Measuring the Sky & 75% Attendance",
        "sectionTag": "02 // MUKHDA  •  AASTHA AUR SAPNE",
        "startSec": 16.5,
        "endSec": 31.0,
        "subtitle": "Beyond the blackboard • Carving our path upon quiet pages",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Aakhri bench pe baith ke humne, aasmaan ko naapa hai,",
                "words": [
                    {"text": "Aakhri", "start": 16.74, "end": 17.40, "accent": True},
                    {"text": "bench", "start": 17.40, "end": 17.90, "accent": True},
                    {"text": "pe", "start": 17.90, "end": 18.20, "accent": False},
                    {"text": "baith", "start": 18.20, "end": 18.60, "accent": False},
                    {"text": "ke", "start": 18.60, "end": 18.90, "accent": False},
                    {"text": "humne,", "start": 18.90, "end": 19.50, "accent": False},
                    {"text": "aasmaan", "start": 19.50, "end": 20.30, "accent": True},
                    {"text": "ko", "start": 20.30, "end": 20.60, "accent": False},
                    {"text": "naapa", "start": 20.60, "end": 21.15, "accent": True},
                    {"text": "hai,", "start": 21.15, "end": 21.50, "accent": False}
                ]
            },
            {
                "id": "line_02_02",
                "text": "Attendance ki thodi chinta thi, par yaari poori pakki thi,",
                "words": [
                    {"text": "Attendance", "start": 21.58, "end": 22.70, "accent": True},
                    {"text": "ki", "start": 22.70, "end": 23.00, "accent": False},
                    {"text": "thodi", "start": 23.00, "end": 23.60, "accent": False},
                    {"text": "chinta", "start": 23.60, "end": 24.38, "accent": True},
                    {"text": "thi,", "start": 24.38, "end": 24.80, "accent": False},
                    {"text": "par", "start": 24.80, "end": 25.10, "accent": False},
                    {"text": "yaari", "start": 25.10, "end": 25.82, "accent": True},
                    {"text": "poori", "start": 25.82, "end": 26.40, "accent": True},
                    {"text": "pakki", "start": 26.40, "end": 27.04, "accent": True},
                    {"text": "thi,", "start": 27.04, "end": 27.25, "accent": False}
                ]
            },
            {
                "id": "line_02_03",
                "text": "Bina baat ke hasne ki woh, aadat kitni achhi thi!",
                "words": [
                    {"text": "Bina", "start": 27.36, "end": 27.80, "accent": False},
                    {"text": "baat", "start": 27.80, "end": 28.12, "accent": True},
                    {"text": "ke", "start": 28.12, "end": 28.40, "accent": False},
                    {"text": "hasne", "start": 28.40, "end": 28.92, "accent": True},
                    {"text": "ki", "start": 28.92, "end": 29.26, "accent": False},
                    {"text": "woh,", "start": 29.26, "end": 29.54, "accent": False},
                    {"text": "aadat", "start": 29.54, "end": 30.26, "accent": True},
                    {"text": "kitni", "start": 30.26, "end": 30.70, "accent": False},
                    {"text": "achhi", "start": 30.70, "end": 31.00, "accent": True},
                    {"text": "thi!", "start": 31.00, "end": 31.10, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_03_mukhda_hook",
        "name": "One Chai Cup & Stolen Sips",
        "sectionTag": "03 // MUKHDA  •  CUTTING CHAI YAARI",
        "startSec": 31.0,
        "endSec": 43.0,
        "subtitle": "Four friends, one cup of tea • Unfiltered laughter at the canteen",
        "lines": [
            {
                "id": "line_03_01",
                "text": "Haan ek hi cup se chaar doston ko, ghoont churaate dekha hai,",
                "words": [
                    {"text": "Haan", "start": 31.20, "end": 31.80, "accent": False},
                    {"text": "ek", "start": 31.80, "end": 32.20, "accent": True},
                    {"text": "hi", "start": 32.20, "end": 32.50, "accent": False},
                    {"text": "cup", "start": 32.50, "end": 33.10, "accent": True},
                    {"text": "se", "start": 33.10, "end": 33.50, "accent": False},
                    {"text": "chaar", "start": 33.50, "end": 34.08, "accent": True},
                    {"text": "doston", "start": 34.08, "end": 34.80, "accent": True},
                    {"text": "ko,", "start": 34.80, "end": 35.10, "accent": False},
                    {"text": "ghoont", "start": 35.10, "end": 35.80, "accent": True},
                    {"text": "churaate", "start": 35.80, "end": 36.50, "accent": True},
                    {"text": "dekha", "start": 36.50, "end": 37.00, "accent": False},
                    {"text": "hai,", "start": 37.00, "end": 37.30, "accent": False}
                ]
            },
            {
                "id": "line_03_02",
                "text": "Aakhri bench pe baith ke humne, aasmaan ko naapa hai.",
                "words": [
                    {"text": "Aakhri", "start": 37.50, "end": 38.30, "accent": True},
                    {"text": "bench", "start": 38.30, "end": 38.90, "accent": True},
                    {"text": "pe", "start": 38.90, "end": 39.20, "accent": False},
                    {"text": "baith", "start": 39.20, "end": 39.60, "accent": False},
                    {"text": "ke", "start": 39.60, "end": 39.90, "accent": False},
                    {"text": "humne,", "start": 39.90, "end": 40.54, "accent": False},
                    {"text": "aasmaan", "start": 40.54, "end": 41.30, "accent": True},
                    {"text": "ko", "start": 41.30, "end": 41.60, "accent": False},
                    {"text": "naapa", "start": 41.60, "end": 42.20, "accent": True},
                    {"text": "hai.", "start": 42.20, "end": 42.70, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_04_interlude_1",
        "name": "Chalk Dust & Morning Sunbeam",
        "sectionTag": "04 // INTERLUDE  •  CLASSROOM SUNLIGHT",
        "startSec": 43.0,
        "endSec": 46.5,
        "subtitle": "Golden dust motes dancing across green chalkboards • The bell chimes",
        "lines": []
    },
    {
        "id": "scene_05_antara_1_p1",
        "name": "Front Bench Toppers & Secret Tiffin",
        "sectionTag": "05 // ANTARA 1  •  DESK MISCHIEF",
        "startSec": 46.5,
        "endSec": 65.0,
        "subtitle": "Formulas on the board • Secretly sharing lunch under the desk",
        "lines": [
            {
                "id": "line_05_01",
                "text": "Front bench pe baith ke topper saare, answer yaad kiya karte,",
                "words": [
                    {"text": "Front", "start": 46.50, "end": 47.10, "accent": True},
                    {"text": "bench", "start": 47.10, "end": 47.60, "accent": False},
                    {"text": "pe", "start": 47.60, "end": 47.90, "accent": False},
                    {"text": "baith", "start": 47.90, "end": 48.30, "accent": False},
                    {"text": "ke", "start": 48.30, "end": 48.60, "accent": False},
                    {"text": "topper", "start": 48.60, "end": 49.30, "accent": True},
                    {"text": "saare,", "start": 49.30, "end": 49.80, "accent": False},
                    {"text": "answer", "start": 49.80, "end": 50.40, "accent": True},
                    {"text": "yaad", "start": 50.40, "end": 50.90, "accent": False},
                    {"text": "kiya", "start": 50.90, "end": 51.30, "accent": False},
                    {"text": "karte,", "start": 51.30, "end": 51.60, "accent": False}
                ]
            },
            {
                "id": "line_05_02",
                "text": "Hum aakhri bench ke baaghi the, bas khwaab tarasha karte the.",
                "words": [
                    {"text": "Hum", "start": 51.70, "end": 52.10, "accent": False},
                    {"text": "aakhri", "start": 52.10, "end": 52.80, "accent": True},
                    {"text": "bench", "start": 52.80, "end": 53.30, "accent": True},
                    {"text": "ke", "start": 53.30, "end": 53.60, "accent": False},
                    {"text": "baaghi", "start": 53.60, "end": 54.30, "accent": True},
                    {"text": "the,", "start": 54.30, "end": 54.60, "accent": False},
                    {"text": "bas", "start": 54.60, "end": 54.90, "accent": False},
                    {"text": "khwaab", "start": 54.90, "end": 55.60, "accent": True},
                    {"text": "tarasha", "start": 55.60, "end": 56.30, "accent": True},
                    {"text": "karte", "start": 56.30, "end": 56.70, "accent": False},
                    {"text": "the.", "start": 56.70, "end": 57.00, "accent": False}
                ]
            },
            {
                "id": "line_05_03",
                "text": "Blackboard ki lambi equations se, man thoda ghabraata tha,",
                "words": [
                    {"text": "Blackboard", "start": 57.10, "end": 58.00, "accent": True},
                    {"text": "ki", "start": 58.00, "end": 58.30, "accent": False},
                    {"text": "lambi", "start": 58.30, "end": 58.90, "accent": False},
                    {"text": "equations", "start": 58.90, "end": 59.80, "accent": True},
                    {"text": "se,", "start": 59.80, "end": 60.10, "accent": False},
                    {"text": "man", "start": 60.10, "end": 60.50, "accent": False},
                    {"text": "thoda", "start": 60.50, "end": 61.00, "accent": False},
                    {"text": "ghabraata", "start": 61.00, "end": 61.80, "accent": True},
                    {"text": "tha,", "start": 61.80, "end": 62.10, "accent": False}
                ]
            },
            {
                "id": "line_05_04",
                "text": "Par desk ke neeche chupke se, ik tiffin khul jaata tha!",
                "words": [
                    {"text": "Par", "start": 62.10, "end": 62.40, "accent": False},
                    {"text": "desk", "start": 62.40, "end": 62.90, "accent": True},
                    {"text": "ke", "start": 62.90, "end": 63.20, "accent": False},
                    {"text": "neeche", "start": 63.20, "end": 63.70, "accent": False},
                    {"text": "chupke", "start": 63.70, "end": 64.20, "accent": True},
                    {"text": "se,", "start": 64.20, "end": 64.40, "accent": False},
                    {"text": "ik", "start": 64.40, "end": 64.60, "accent": False},
                    {"text": "tiffin", "start": 64.60, "end": 65.20, "accent": True},
                    {"text": "khul", "start": 65.20, "end": 65.60, "accent": True},
                    {"text": "jaata", "start": 65.60, "end": 66.00, "accent": False},
                    {"text": "tha!", "start": 66.00, "end": 66.30, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_06_antara_1_p2",
        "name": "Xerox Copies & The Proxy Call",
        "sectionTag": "06 // ANTARA 1  •  PROXY ROLL CALL",
        "startSec": 66.3,
        "endSec": 87.0,
        "subtitle": "\"Kal padhenge\" nightouts • The thrill of shouting proxy for a late friend",
        "lines": [
            {
                "id": "line_06_01",
                "text": "\"Kal padhenge\" keh kar humne, saari raatein baanti hain,",
                "words": [
                    {"text": "\"Kal", "start": 66.50, "end": 67.00, "accent": True},
                    {"text": "padhenge\"", "start": 67.00, "end": 67.80, "accent": True},
                    {"text": "keh", "start": 67.80, "end": 68.20, "accent": False},
                    {"text": "kar", "start": 68.20, "end": 68.50, "accent": False},
                    {"text": "humne,", "start": 68.50, "end": 69.10, "accent": False},
                    {"text": "saari", "start": 69.10, "end": 69.70, "accent": False},
                    {"text": "raatein", "start": 69.70, "end": 70.40, "accent": True},
                    {"text": "baanti", "start": 70.40, "end": 71.00, "accent": False},
                    {"text": "hain,", "start": 71.00, "end": 71.30, "accent": False}
                ]
            },
            {
                "id": "line_06_02",
                "text": "Subah-subah phir exam se pehle, xerox copy maangi hain.",
                "words": [
                    {"text": "Subah-subah", "start": 71.40, "end": 72.30, "accent": True},
                    {"text": "phir", "start": 72.30, "end": 72.70, "accent": False},
                    {"text": "exam", "start": 72.70, "end": 73.36, "accent": True},
                    {"text": "se", "start": 73.36, "end": 73.70, "accent": False},
                    {"text": "pehle,", "start": 73.70, "end": 74.26, "accent": False},
                    {"text": "xerox", "start": 74.26, "end": 74.90, "accent": True},
                    {"text": "copy", "start": 74.90, "end": 75.50, "accent": True},
                    {"text": "maangi", "start": 75.50, "end": 76.10, "accent": False},
                    {"text": "hain.", "start": 76.10, "end": 76.40, "accent": False}
                ]
            },
            {
                "id": "line_06_03",
                "text": "Woh roll number par doosre ki, aawaaz lagana yaad raha,",
                "words": [
                    {"text": "Woh", "start": 76.50, "end": 76.90, "accent": False},
                    {"text": "roll", "start": 76.90, "end": 77.40, "accent": True},
                    {"text": "number", "start": 77.40, "end": 78.10, "accent": True},
                    {"text": "par", "start": 78.10, "end": 78.40, "accent": False},
                    {"text": "doosre", "start": 78.40, "end": 79.10, "accent": False},
                    {"text": "ki,", "start": 79.10, "end": 79.40, "accent": False},
                    {"text": "aawaaz", "start": 79.40, "end": 80.16, "accent": True},
                    {"text": "lagana", "start": 80.16, "end": 80.80, "accent": False},
                    {"text": "yaad", "start": 80.80, "end": 81.30, "accent": True},
                    {"text": "raha,", "start": 81.30, "end": 81.60, "accent": False}
                ]
            },
            {
                "id": "line_06_04",
                "text": "Kaghaz ki kashti jaisa tha man, leharon pe behna yaad raha!",
                "words": [
                    {"text": "Kaghaz", "start": 81.70, "end": 82.40, "accent": True},
                    {"text": "ki", "start": 82.40, "end": 82.70, "accent": False},
                    {"text": "kashti", "start": 82.70, "end": 83.40, "accent": True},
                    {"text": "jaisa", "start": 83.40, "end": 83.90, "accent": False},
                    {"text": "tha", "start": 83.90, "end": 84.20, "accent": False},
                    {"text": "man,", "start": 84.20, "end": 84.70, "accent": True},
                    {"text": "leharon", "start": 84.70, "end": 85.40, "accent": True},
                    {"text": "pe", "start": 85.40, "end": 85.70, "accent": False},
                    {"text": "behna", "start": 85.70, "end": 86.30, "accent": True},
                    {"text": "yaad", "start": 86.30, "end": 86.80, "accent": False},
                    {"text": "raha!", "start": 86.80, "end": 87.20, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_07_mukhda_reprise",
        "name": "Carved Desks & The Infinite Sky",
        "sectionTag": "07 // MUKHDA  •  REPRISE & IDENTITY",
        "startSec": 87.2,
        "endSec": 110.0,
        "subtitle": "Carving our names with compass needles • Standing tall together",
        "lines": [
            {
                "id": "line_07_01",
                "text": "Aakhri bench pe baith ke humne, aasmaan ko naapa hai,",
                "words": [
                    {"text": "Aakhri", "start": 88.04, "end": 89.04, "accent": True},
                    {"text": "bench", "start": 89.04, "end": 89.60, "accent": True},
                    {"text": "pe", "start": 89.60, "end": 89.90, "accent": False},
                    {"text": "baith", "start": 89.90, "end": 90.40, "accent": False},
                    {"text": "ke", "start": 90.40, "end": 90.70, "accent": False},
                    {"text": "humne,", "start": 90.70, "end": 91.30, "accent": False},
                    {"text": "aasmaan", "start": 91.30, "end": 92.20, "accent": True},
                    {"text": "ko", "start": 92.20, "end": 92.60, "accent": False},
                    {"text": "naapa", "start": 92.60, "end": 93.30, "accent": True},
                    {"text": "hai,", "start": 93.30, "end": 93.70, "accent": False}
                ]
            },
            {
                "id": "line_07_02",
                "text": "Kitabon ke soye panno par, apna safar tarasha hai.",
                "words": [
                    {"text": "Kitabon", "start": 93.80, "end": 94.78, "accent": True},
                    {"text": "ke", "start": 94.78, "end": 95.10, "accent": False},
                    {"text": "soye", "start": 95.10, "end": 95.70, "accent": False},
                    {"text": "panno", "start": 95.70, "end": 96.40, "accent": True},
                    {"text": "par,", "start": 96.40, "end": 96.80, "accent": False},
                    {"text": "apna", "start": 96.80, "end": 97.40, "accent": False},
                    {"text": "safar", "start": 97.40, "end": 98.20, "accent": True},
                    {"text": "tarasha", "start": 98.20, "end": 98.90, "accent": True},
                    {"text": "hai.", "start": 98.90, "end": 99.30, "accent": False}
                ]
            },
            {
                "id": "line_07_03",
                "text": "Haan ek hi cup se chaar doston ko, ghoont churaate dekha hai,",
                "words": [
                    {"text": "Haan", "start": 99.38, "end": 100.00, "accent": False},
                    {"text": "ek", "start": 100.00, "end": 100.50, "accent": True},
                    {"text": "hi", "start": 100.50, "end": 100.80, "accent": False},
                    {"text": "cup", "start": 100.80, "end": 101.40, "accent": True},
                    {"text": "se", "start": 101.40, "end": 101.80, "accent": False},
                    {"text": "chaar", "start": 101.80, "end": 102.40, "accent": True},
                    {"text": "doston", "start": 102.40, "end": 103.10, "accent": True},
                    {"text": "ko,", "start": 103.10, "end": 103.40, "accent": False},
                    {"text": "ghoont", "start": 103.40, "end": 104.10, "accent": True},
                    {"text": "churaate", "start": 104.10, "end": 104.80, "accent": True},
                    {"text": "dekha", "start": 104.80, "end": 105.30, "accent": False},
                    {"text": "hai,", "start": 105.30, "end": 105.60, "accent": False}
                ]
            },
            {
                "id": "line_07_04",
                "text": "Aakhri bench pe baith ke humne, aasmaan ko naapa hai.",
                "words": [
                    {"text": "Aakhri", "start": 105.70, "end": 106.40, "accent": True},
                    {"text": "bench", "start": 106.40, "end": 107.00, "accent": True},
                    {"text": "pe", "start": 107.00, "end": 107.30, "accent": False},
                    {"text": "baith", "start": 107.30, "end": 107.70, "accent": False},
                    {"text": "ke", "start": 107.70, "end": 108.00, "accent": False},
                    {"text": "humne,", "start": 108.00, "end": 108.60, "accent": False},
                    {"text": "aasmaan", "start": 108.60, "end": 109.30, "accent": True},
                    {"text": "ko", "start": 109.30, "end": 109.60, "accent": False},
                    {"text": "naapa", "start": 109.60, "end": 110.10, "accent": True},
                    {"text": "hai.", "start": 110.10, "end": 110.50, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_08_interlude_2",
        "name": "Canteen Ledger & Tapri Resonance",
        "sectionTag": "08 // INTERLUDE  •  CANTEEN RESIDUALS",
        "startSec": 110.5,
        "endSec": 120.5,
        "subtitle": "Crumbled samosas on paper plates • The world measured in shared laughter",
        "lines": []
    },
    {
        "id": "scene_09_antara_2_p1",
        "name": "Canteen Diary & Calls to Maa",
        "sectionTag": "09 // ANTARA 2  •  THE REAL STRUGGLE",
        "startSec": 120.5,
        "endSec": 141.0,
        "subtitle": "Lying on the phone that we ate • Silent tears wiped in hostel corners",
        "lines": [
            {
                "id": "line_09_01",
                "text": "Canteen ki udhaar diary mein, apna bhi ek panna tha,",
                "words": [
                    {"text": "Canteen", "start": 120.90, "end": 121.80, "accent": True},
                    {"text": "ki", "start": 121.80, "end": 122.10, "accent": False},
                    {"text": "udhaar", "start": 122.10, "end": 122.90, "accent": True},
                    {"text": "diary", "start": 122.90, "end": 123.60, "accent": True},
                    {"text": "mein,", "start": 123.60, "end": 123.98, "accent": False},
                    {"text": "apna", "start": 123.98, "end": 124.60, "accent": False},
                    {"text": "bhi", "start": 124.60, "end": 124.90, "accent": False},
                    {"text": "ek", "start": 124.90, "end": 125.30, "accent": False},
                    {"text": "panna", "start": 125.30, "end": 126.00, "accent": True},
                    {"text": "tha,", "start": 126.00, "end": 126.30, "accent": False}
                ]
            },
            {
                "id": "line_09_02",
                "text": "Par dil ke andar sach poocho toh, kuch bada banne ka sapna tha.",
                "words": [
                    {"text": "Par", "start": 126.40, "end": 126.80, "accent": False},
                    {"text": "dil", "start": 126.80, "end": 127.30, "accent": True},
                    {"text": "ke", "start": 127.30, "end": 127.60, "accent": False},
                    {"text": "andar", "start": 127.60, "end": 128.20, "accent": False},
                    {"text": "sach", "start": 128.20, "end": 128.72, "accent": True},
                    {"text": "poocho", "start": 128.72, "end": 129.30, "accent": False},
                    {"text": "toh,", "start": 129.30, "end": 129.60, "accent": False},
                    {"text": "kuch", "start": 129.60, "end": 130.00, "accent": False},
                    {"text": "bada", "start": 130.00, "end": 130.70, "accent": True},
                    {"text": "banne", "start": 130.70, "end": 131.30, "accent": True},
                    {"text": "ka", "start": 131.30, "end": 131.60, "accent": False},
                    {"text": "sapna", "start": 131.60, "end": 132.30, "accent": True},
                    {"text": "tha.", "start": 132.30, "end": 132.60, "accent": False}
                ]
            },
            {
                "id": "line_09_03",
                "text": "Maa ke phone pe jhooth kaha tha, \"Haan maine khaana khaya hai,\"",
                "words": [
                    {"text": "Maa", "start": 132.70, "end": 133.30, "accent": True},
                    {"text": "ke", "start": 133.30, "end": 133.66, "accent": False},
                    {"text": "phone", "start": 133.66, "end": 134.48, "accent": True},
                    {"text": "pe", "start": 134.48, "end": 134.80, "accent": False},
                    {"text": "jhooth", "start": 134.80, "end": 135.50, "accent": True},
                    {"text": "kaha", "start": 135.50, "end": 136.00, "accent": False},
                    {"text": "tha,", "start": 136.00, "end": 136.30, "accent": False},
                    {"text": "\"Haan", "start": 136.30, "end": 136.80, "accent": False},
                    {"text": "maine", "start": 136.80, "end": 137.30, "accent": False},
                    {"text": "khaana", "start": 137.30, "end": 138.00, "accent": True},
                    {"text": "khaya", "start": 138.00, "end": 138.60, "accent": False},
                    {"text": "hai,\"", "start": 138.60, "end": 138.90, "accent": False}
                ]
            },
            {
                "id": "line_09_04",
                "text": "Aankh bacha ke room ke kone mein, aansu chupke bahaya hai.",
                "words": [
                    {"text": "Aankh", "start": 139.00, "end": 139.52, "accent": True},
                    {"text": "bacha", "start": 139.52, "end": 140.10, "accent": False},
                    {"text": "ke", "start": 140.10, "end": 140.40, "accent": False},
                    {"text": "room", "start": 140.40, "end": 141.00, "accent": True},
                    {"text": "ke", "start": 141.00, "end": 141.30, "accent": False},
                    {"text": "kone", "start": 141.30, "end": 141.90, "accent": False},
                    {"text": "mein,", "start": 141.90, "end": 142.20, "accent": False},
                    {"text": "aansu", "start": 142.20, "end": 142.90, "accent": True},
                    {"text": "chupke", "start": 142.90, "end": 143.60, "accent": True},
                    {"text": "bahaya", "start": 143.60, "end": 144.20, "accent": False},
                    {"text": "hai.", "start": 144.20, "end": 144.60, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_10_antara_2_p2",
        "name": "3 AM Rooftops & The Unbowed Flame",
        "sectionTag": "10 // ANTARA 2  •  UNBOWED FLAME",
        "startSec": 144.6,
        "endSec": 163.5,
        "subtitle": "Terrace chords at 3 AM • Marksheets will never constrain our fate",
        "lines": [
            {
                "id": "line_10_01",
                "text": "Koi naukri ki fikar mein gum tha, koi shayar banna chahta tha,",
                "words": [
                    {"text": "Koi", "start": 145.00, "end": 145.44, "accent": False},
                    {"text": "naukri", "start": 145.44, "end": 146.20, "accent": True},
                    {"text": "ki", "start": 146.20, "end": 146.50, "accent": False},
                    {"text": "fikar", "start": 146.50, "end": 147.20, "accent": True},
                    {"text": "mein", "start": 147.20, "end": 147.50, "accent": False},
                    {"text": "gum", "start": 147.50, "end": 148.00, "accent": False},
                    {"text": "tha,", "start": 148.00, "end": 148.30, "accent": False},
                    {"text": "koi", "start": 148.30, "end": 148.70, "accent": False},
                    {"text": "shayar", "start": 148.70, "end": 149.50, "accent": True},
                    {"text": "banna", "start": 149.50, "end": 150.14, "accent": True},
                    {"text": "chahta", "start": 150.14, "end": 150.70, "accent": False},
                    {"text": "tha,", "start": 150.70, "end": 151.00, "accent": False}
                ]
            },
            {
                "id": "line_10_02",
                "text": "Par raat ke teen baje chhat par, sab ek hi dhoon gungunata tha!",
                "words": [
                    {"text": "Par", "start": 151.10, "end": 151.50, "accent": False},
                    {"text": "raat", "start": 151.50, "end": 152.00, "accent": True},
                    {"text": "ke", "start": 152.00, "end": 152.30, "accent": False},
                    {"text": "teen", "start": 152.30, "end": 152.90, "accent": True},
                    {"text": "baje", "start": 152.90, "end": 153.50, "accent": True},
                    {"text": "chhat", "start": 153.50, "end": 154.20, "accent": True},
                    {"text": "par,", "start": 154.20, "end": 154.50, "accent": False},
                    {"text": "sab", "start": 154.50, "end": 154.90, "accent": False},
                    {"text": "ek", "start": 154.90, "end": 155.30, "accent": True},
                    {"text": "hi", "start": 155.30, "end": 155.60, "accent": False},
                    {"text": "dhoon", "start": 155.60, "end": 156.30, "accent": True},
                    {"text": "gungunata", "start": 156.30, "end": 157.10, "accent": True},
                    {"text": "tha!", "start": 157.10, "end": 157.40, "accent": False}
                ]
            },
            {
                "id": "line_10_03",
                "text": "Marksheet ke un chote tukdon par, taqdeer nahi ruk sakti hai,",
                "words": [
                    {"text": "Marksheet", "start": 157.50, "end": 158.50, "accent": True},
                    {"text": "ke", "start": 158.50, "end": 158.80, "accent": False},
                    {"text": "un", "start": 158.80, "end": 159.10, "accent": False},
                    {"text": "chote", "start": 159.10, "end": 159.70, "accent": False},
                    {"text": "tukdon", "start": 159.70, "end": 160.50, "accent": True},
                    {"text": "par,", "start": 160.50, "end": 160.86, "accent": False},
                    {"text": "taqdeer", "start": 160.86, "end": 161.70, "accent": True},
                    {"text": "nahi", "start": 161.70, "end": 162.20, "accent": False},
                    {"text": "ruk", "start": 162.20, "end": 162.70, "accent": True},
                    {"text": "sakti", "start": 162.70, "end": 163.20, "accent": False},
                    {"text": "hai,", "start": 163.20, "end": 163.50, "accent": False}
                ]
            },
            {
                "id": "line_10_04",
                "text": "Yeh aakhri bench ki aag kabhi, toofaan se nahi jhuk sakti hai!",
                "words": [
                    {"text": "Yeh", "start": 163.50, "end": 163.80, "accent": False},
                    {"text": "aakhri", "start": 163.80, "end": 164.50, "accent": True},
                    {"text": "bench", "start": 164.50, "end": 165.10, "accent": True},
                    {"text": "ki", "start": 165.10, "end": 165.40, "accent": False},
                    {"text": "aag", "start": 165.40, "end": 166.10, "accent": True},
                    {"text": "kabhi,", "start": 166.10, "end": 166.60, "accent": False},
                    {"text": "toofaan", "start": 166.60, "end": 167.40, "accent": True},
                    {"text": "se", "start": 167.40, "end": 167.70, "accent": False},
                    {"text": "nahi", "start": 167.70, "end": 168.20, "accent": False},
                    {"text": "jhuk", "start": 168.20, "end": 168.80, "accent": True},
                    {"text": "sakti", "start": 168.80, "end": 169.30, "accent": False},
                    {"text": "hai!", "start": 169.30, "end": 169.60, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_11_bridge_farewell",
        "name": "Final Semester & Paper Airplanes",
        "sectionTag": "11 // BRIDGE  •  THE FINAL SEMESTER",
        "startSec": 169.6,
        "endSec": 185.5,
        "subtitle": "Carving names with penknives • Launching paper airplanes toward the clouds",
        "lines": [
            {
                "id": "line_11_01",
                "text": "Yeh aakhri semester aate hi, ab dil thoda sa darta hai,",
                "words": [
                    {"text": "Yeh", "start": 169.70, "end": 170.10, "accent": False},
                    {"text": "aakhri", "start": 170.10, "end": 170.80, "accent": True},
                    {"text": "semester", "start": 170.80, "end": 171.70, "accent": True},
                    {"text": "aate", "start": 171.70, "end": 172.20, "accent": False},
                    {"text": "hi,", "start": 172.20, "end": 172.50, "accent": False},
                    {"text": "ab", "start": 172.50, "end": 172.80, "accent": False},
                    {"text": "dil", "start": 172.80, "end": 173.30, "accent": True},
                    {"text": "thoda", "start": 173.30, "end": 173.80, "accent": False},
                    {"text": "sa", "start": 173.80, "end": 174.10, "accent": False},
                    {"text": "darta", "start": 174.10, "end": 174.70, "accent": True},
                    {"text": "hai,", "start": 174.70, "end": 175.00, "accent": False}
                ]
            },
            {
                "id": "line_11_02",
                "text": "Kal tak jo class thi bore lagti, ab chhootne se man marta hai.",
                "words": [
                    {"text": "Kal", "start": 175.10, "end": 175.50, "accent": False},
                    {"text": "tak", "start": 175.50, "end": 175.80, "accent": False},
                    {"text": "jo", "start": 175.80, "end": 176.10, "accent": False},
                    {"text": "class", "start": 176.10, "end": 176.70, "accent": True},
                    {"text": "thi", "start": 176.70, "end": 177.00, "accent": False},
                    {"text": "bore", "start": 177.00, "end": 177.60, "accent": True},
                    {"text": "lagti,", "start": 177.60, "end": 178.10, "accent": False},
                    {"text": "ab", "start": 178.10, "end": 178.40, "accent": False},
                    {"text": "chhootne", "start": 178.40, "end": 179.10, "accent": True},
                    {"text": "se", "start": 179.10, "end": 179.40, "accent": False},
                    {"text": "man", "start": 179.40, "end": 179.80, "accent": False},
                    {"text": "marta", "start": 179.80, "end": 180.40, "accent": True},
                    {"text": "hai.", "start": 180.40, "end": 180.70, "accent": False}
                ]
            },
            {
                "id": "line_11_03",
                "text": "Woh bench jis par humne chaku se, sabke naam tarashe the,",
                "words": [
                    {"text": "Woh", "start": 180.80, "end": 181.20, "accent": False},
                    {"text": "bench", "start": 181.20, "end": 181.80, "accent": True},
                    {"text": "jis", "start": 181.80, "end": 182.10, "accent": False},
                    {"text": "par", "start": 182.10, "end": 182.40, "accent": False},
                    {"text": "humne", "start": 182.40, "end": 183.00, "accent": False},
                    {"text": "chaku", "start": 183.00, "end": 183.70, "accent": True},
                    {"text": "se,", "start": 183.70, "end": 184.00, "accent": False},
                    {"text": "sabke", "start": 184.00, "end": 184.60, "accent": False},
                    {"text": "naam", "start": 184.60, "end": 185.30, "accent": True},
                    {"text": "tarashe", "start": 185.30, "end": 186.00, "accent": True},
                    {"text": "the,", "start": 186.00, "end": 186.30, "accent": False}
                ]
            },
            {
                "id": "line_11_04",
                "text": "Woh panno ke airplane bana kar, hawa mein jo tarashe the!",
                "words": [
                    {"text": "Woh", "start": 186.30, "end": 186.70, "accent": False},
                    {"text": "panno", "start": 186.70, "end": 187.40, "accent": True},
                    {"text": "ke", "start": 187.40, "end": 187.70, "accent": False},
                    {"text": "airplane", "start": 187.70, "end": 188.60, "accent": True},
                    {"text": "bana", "start": 188.60, "end": 189.20, "accent": False},
                    {"text": "kar,", "start": 189.20, "end": 189.50, "accent": False},
                    {"text": "hawa", "start": 189.50, "end": 190.20, "accent": True},
                    {"text": "mein", "start": 190.20, "end": 190.50, "accent": False},
                    {"text": "jo", "start": 190.50, "end": 190.80, "accent": False},
                    {"text": "tarashe", "start": 190.80, "end": 191.50, "accent": True},
                    {"text": "the!", "start": 191.50, "end": 191.80, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_12_crescendo_anthem",
        "name": "Memories Echoing Across Centuries",
        "sectionTag": "12 // CLIMAX  •  ETERNAL ECHOES",
        "startSec": 191.8,
        "endSec": 222.0,
        "subtitle": "The world moves on • But backbench laughter echoes through time",
        "lines": [
            {
                "id": "line_12_01",
                "text": "Duniya toh kahegi aage badho, par yaadein yahin pe thehrengi,",
                "words": [
                    {"text": "Duniya", "start": 192.50, "end": 193.30, "accent": True},
                    {"text": "toh", "start": 193.30, "end": 193.60, "accent": False},
                    {"text": "kahegi", "start": 193.60, "end": 194.20, "accent": False},
                    {"text": "aage", "start": 194.20, "end": 194.80, "accent": True},
                    {"text": "badho,", "start": 194.80, "end": 195.40, "accent": False},
                    {"text": "par", "start": 195.40, "end": 195.70, "accent": False},
                    {"text": "yaadein", "start": 195.70, "end": 196.50, "accent": True},
                    {"text": "yahin", "start": 196.50, "end": 197.10, "accent": False},
                    {"text": "pe", "start": 197.10, "end": 197.40, "accent": False},
                    {"text": "thehrengi,", "start": 197.40, "end": 198.20, "accent": True}
                ]
            },
            {
                "id": "line_12_02",
                "text": "Har aakhri bench ke yaaron ki, baatein sadiyon tak goonjengi...",
                "words": [
                    {"text": "Har", "start": 198.50, "end": 199.00, "accent": False},
                    {"text": "aakhri", "start": 199.00, "end": 199.70, "accent": True},
                    {"text": "bench", "start": 199.70, "end": 200.30, "accent": True},
                    {"text": "ke", "start": 200.30, "end": 200.60, "accent": False},
                    {"text": "yaaron", "start": 200.60, "end": 201.30, "accent": True},
                    {"text": "ki,", "start": 201.30, "end": 201.60, "accent": False},
                    {"text": "baatein", "start": 201.60, "end": 202.30, "accent": True},
                    {"text": "sadiyon", "start": 202.30, "end": 203.10, "accent": True},
                    {"text": "tak", "start": 203.10, "end": 203.40, "accent": False},
                    {"text": "goonjengi...", "start": 203.40, "end": 204.30, "accent": True}
                ]
            },
            {
                "id": "line_12_03",
                "text": "Haan sadiyon tak goonjengi!",
                "words": [
                    {"text": "Haan", "start": 204.50, "end": 205.20, "accent": True},
                    {"text": "sadiyon", "start": 205.20, "end": 206.10, "accent": True},
                    {"text": "tak", "start": 206.10, "end": 206.50, "accent": False},
                    {"text": "goonjengi!", "start": 206.50, "end": 207.50, "accent": True}
                ]
            },
            {
                "id": "line_12_04",
                "text": "Aakhri bench pe baith ke humne, aasmaan ko naapa tha!",
                "words": [
                    {"text": "Aakhri", "start": 215.00, "end": 215.80, "accent": True},
                    {"text": "bench", "start": 215.80, "end": 216.40, "accent": True},
                    {"text": "pe", "start": 216.40, "end": 216.70, "accent": False},
                    {"text": "baith", "start": 216.70, "end": 217.10, "accent": False},
                    {"text": "ke", "start": 217.10, "end": 217.40, "accent": False},
                    {"text": "humne,", "start": 217.40, "end": 218.00, "accent": False},
                    {"text": "aasmaan", "start": 218.00, "end": 219.00, "accent": True},
                    {"text": "ko", "start": 219.00, "end": 219.40, "accent": False},
                    {"text": "naapa", "start": 219.40, "end": 220.20, "accent": True},
                    {"text": "tha!", "start": 220.20, "end": 220.80, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_13_outro_empty_corridor",
        "name": "The Final Bell & The Infinite Journey",
        "sectionTag": "13 // OUTRO  •  THE FINAL BELL",
        "startSec": 222.0,
        "endSec": 246.767,
        "subtitle": "The quiet hallway echoes • But the journey is just beginning",
        "lines": [
            {
                "id": "line_13_01",
                "text": "Woh ghanti aakhri baj chali hai, par safar abhi toh baaqi hai...",
                "words": [
                    {"text": "Woh", "start": 226.02, "end": 226.62, "accent": False},
                    {"text": "ghanti", "start": 226.62, "end": 227.36, "accent": True},
                    {"text": "aakhri", "start": 227.36, "end": 228.28, "accent": True},
                    {"text": "baj", "start": 228.28, "end": 228.62, "accent": False},
                    {"text": "chali", "start": 228.62, "end": 229.30, "accent": False},
                    {"text": "hai,", "start": 229.30, "end": 229.70, "accent": False},
                    {"text": "par", "start": 231.16, "end": 231.76, "accent": False},
                    {"text": "safar", "start": 231.76, "end": 232.50, "accent": True},
                    {"text": "abhi", "start": 232.50, "end": 232.90, "accent": False},
                    {"text": "toh", "start": 232.90, "end": 233.26, "accent": False},
                    {"text": "baaqi", "start": 233.26, "end": 233.92, "accent": True},
                    {"text": "hai...", "start": 233.92, "end": 234.26, "accent": False}
                ]
            },
            {
                "id": "line_13_02",
                "text": "Aakhri bench pe baith ke humne... aasmaan ko naapa tha...",
                "words": [
                    {"text": "Aakhri", "start": 240.00, "end": 241.00, "accent": True},
                    {"text": "bench", "start": 241.00, "end": 241.60, "accent": True},
                    {"text": "pe", "start": 241.60, "end": 242.00, "accent": False},
                    {"text": "baith", "start": 242.00, "end": 242.50, "accent": False},
                    {"text": "ke", "start": 242.50, "end": 242.80, "accent": False},
                    {"text": "humne...", "start": 242.80, "end": 243.50, "accent": False},
                    {"text": "aasmaan", "start": 243.50, "end": 244.50, "accent": True},
                    {"text": "ko", "start": 244.50, "end": 244.90, "accent": False},
                    {"text": "naapa", "start": 244.90, "end": 245.70, "accent": True},
                    {"text": "tha...", "start": 245.70, "end": 246.50, "accent": False}
                ]
            }
        ]
    }
]

timeline = {
    "fps": fps,
    "totalDurationSec": total_duration_sec,
    "totalFrames": total_frames,
    "scenes": [],
    "overrides": {}
}

word_counter = 1

for sc_idx, sc in enumerate(scenes_raw):
    sc_start_f = f(sc["startSec"])
    sc_end_f = f(sc["endSec"])

    # Ensure sc_end_f contains all word timestamps
    max_w_end = sc_end_f
    for line in sc["lines"]:
        for w in line["words"]:
            max_w_end = max(max_w_end, f(w["end"]) + 4)
    sc_end_f = max_w_end

    if timeline["scenes"]:
        # Previous scene ends at this scene start, or at its own last word end (whichever is later)
        prev_scene = timeline["scenes"][-1]
        prev_scene["endFrame"] = max(prev_scene["endFrame"], sc_start_f)
        sc_start_f = max(sc_start_f, prev_scene["endFrame"])


    scene_obj = {
        "id": sc["id"],
        "name": sc["name"],
        "sectionTag": sc["sectionTag"],
        "startFrame": sc_start_f,
        "endFrame": sc_end_f,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "classroom_backbench",
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

os.makedirs("src/songs/aakhri-bench", exist_ok=True)
output_path = "src/songs/aakhri-bench/timeline.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 60 FPS timeline: {len(timeline['scenes'])} scenes, {word_counter-1} words.")
print(f"[✓] Total frames: {total_frames} ({total_duration_sec:.2f}s). Saved to {output_path}")
