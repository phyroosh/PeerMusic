#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Class Ke Baad (Student Life Anthem)'
Audio: public/audio/students_life.mp3 (188.367 seconds = 11302 frames @ 60 FPS)
"""

import os
import json

fps = 60
total_duration_sec = 188.367
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_raw = [
    {
        "id": "scene_01_intro",
        "name": "Acoustic Guitars & Campus Bell",
        "sectionTag": "01 // INTRO  •  CAMPUS HALLWAYS",
        "startSec": 0.0,
        "endSec": 9.46,
        "subtitle": "Borrowed notes & morning sunlight • The corridor chatter begins",
        "lines": []
    },
    {
        "id": "scene_02_mukhda_opening",
        "name": "Life Beyond the Lecture Hall",
        "sectionTag": "02 // MUKHDA  •  CAMPUS MEMORIES",
        "startSec": 9.46,
        "endSec": 19.40,
        "subtitle": "What was lived outside the classroom walls • The real education of youth",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Class ke baad jo zindagi thi, woh class mein kahan milti thi,",
                "words": [
                    {"text": "Class", "start": 9.46, "end": 10.18, "accent": True},
                    {"text": "ke", "start": 10.18, "end": 10.52, "accent": False},
                    {"text": "baad", "start": 10.52, "end": 11.02, "accent": True},
                    {"text": "jo", "start": 11.02, "end": 11.14, "accent": False},
                    {"text": "zindagi", "start": 11.14, "end": 11.70, "accent": True},
                    {"text": "thi,", "start": 11.70, "end": 12.06, "accent": False},
                    {"text": "woh", "start": 12.12, "end": 12.20, "accent": False},
                    {"text": "class", "start": 12.20, "end": 12.64, "accent": True},
                    {"text": "mein", "start": 12.64, "end": 13.10, "accent": False},
                    {"text": "kahan", "start": 13.10, "end": 13.58, "accent": True},
                    {"text": "milti", "start": 13.58, "end": 14.00, "accent": True},
                    {"text": "thi,", "start": 14.00, "end": 14.36, "accent": False}
                ]
            },
            {
                "id": "line_02_02",
                "text": "Ek bench pe chhoti duniya thi, har baat nayi si lagti thi.",
                "words": [
                    {"text": "Ek", "start": 14.56, "end": 14.72, "accent": False},
                    {"text": "bench", "start": 14.72, "end": 15.16, "accent": True},
                    {"text": "pe", "start": 15.16, "end": 15.44, "accent": False},
                    {"text": "chhoti", "start": 15.44, "end": 15.70, "accent": True},
                    {"text": "duniya", "start": 15.70, "end": 16.46, "accent": True},
                    {"text": "thi,", "start": 16.46, "end": 16.84, "accent": False},
                    {"text": "har", "start": 17.06, "end": 17.18, "accent": False},
                    {"text": "baat", "start": 17.18, "end": 17.64, "accent": True},
                    {"text": "nayi", "start": 17.64, "end": 18.22, "accent": True},
                    {"text": "si", "start": 18.22, "end": 18.30, "accent": False},
                    {"text": "lagti", "start": 18.30, "end": 18.90, "accent": True},
                    {"text": "thi.", "start": 18.90, "end": 19.26, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_02b_mukhda_dreams",
        "name": "Unwritten Notes & Golden Dreams",
        "sectionTag": "02 // MUKHDA  •  MEMORIES & DREAMS",
        "startSec": 19.40,
        "endSec": 29.04,
        "subtitle": "Notes left incomplete, dreams running deep • What matters is today",
        "lines": [
            {
                "id": "line_02_03",
                "text": "Notes adhoore, sapne poore, aankhon mein shehar basaaya tha,",
                "words": [
                    {"text": "Notes", "start": 19.76, "end": 19.98, "accent": True},
                    {"text": "adhoore,", "start": 19.98, "end": 20.78, "accent": True},
                    {"text": "sapne", "start": 21.16, "end": 21.48, "accent": True},
                    {"text": "poore,", "start": 21.48, "end": 21.96, "accent": True},
                    {"text": "aankhon", "start": 22.26, "end": 22.68, "accent": True},
                    {"text": "mein", "start": 22.68, "end": 22.98, "accent": False},
                    {"text": "shehar", "start": 22.98, "end": 23.46, "accent": True},
                    {"text": "basaaya", "start": 23.46, "end": 24.14, "accent": True},
                    {"text": "tha,", "start": 24.14, "end": 24.44, "accent": False}
                ]
            },
            {
                "id": "line_02_04",
                "text": "Kal ka kya hai, aaj doston ne, hans ke humein sikhaaya tha.",
                "words": [
                    {"text": "Kal", "start": 24.60, "end": 24.80, "accent": True},
                    {"text": "ka", "start": 24.80, "end": 25.04, "accent": False},
                    {"text": "kya", "start": 25.04, "end": 25.38, "accent": False},
                    {"text": "hai,", "start": 25.38, "end": 25.70, "accent": False},
                    {"text": "aaj", "start": 25.84, "end": 26.08, "accent": True},
                    {"text": "doston", "start": 26.08, "end": 26.46, "accent": True},
                    {"text": "ne,", "start": 26.46, "end": 26.98, "accent": False},
                    {"text": "hans", "start": 27.16, "end": 27.32, "accent": True},
                    {"text": "ke", "start": 27.32, "end": 27.50, "accent": False},
                    {"text": "humein", "start": 27.50, "end": 28.02, "accent": False},
                    {"text": "sikhaaya", "start": 28.02, "end": 28.76, "accent": True},
                    {"text": "tha.", "start": 28.76, "end": 29.04, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_02c_mukhda_reprise",
        "name": "The Timeless Chorus",
        "sectionTag": "02 // MUKHDA REPRISE  •  THE CHORUS",
        "startSec": 29.04,
        "endSec": 38.00,
        "subtitle": "Class ke baad jo zindagi thi • An echo that never fades",
        "lines": [
            {
                "id": "line_02_05",
                "text": "Class ke baad jo zindagi thi, woh class mein kahan milti thi,",
                "words": [
                    {"text": "Class", "start": 29.04, "end": 29.70, "accent": True},
                    {"text": "ke", "start": 29.70, "end": 30.14, "accent": False},
                    {"text": "baad", "start": 30.14, "end": 30.60, "accent": True},
                    {"text": "jo", "start": 30.60, "end": 30.76, "accent": False},
                    {"text": "zindagi", "start": 30.76, "end": 31.32, "accent": True},
                    {"text": "thi,", "start": 31.32, "end": 31.64, "accent": False},
                    {"text": "woh", "start": 31.72, "end": 31.84, "accent": False},
                    {"text": "class", "start": 31.84, "end": 32.26, "accent": True},
                    {"text": "mein", "start": 32.26, "end": 32.70, "accent": False},
                    {"text": "kahan", "start": 32.70, "end": 33.14, "accent": True},
                    {"text": "milti", "start": 33.14, "end": 33.66, "accent": True},
                    {"text": "thi,", "start": 33.66, "end": 34.10, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_03_antara1_morning",
        "name": "Morning Bus & Half-Opened Bags",
        "sectionTag": "03 // ANTARA 1  •  MORNING COMMUTE & GATES",
        "startSec": 38.0,
        "endSec": 48.5,
        "subtitle": "Fighting sleep on the morning ride • At the campus gate the day was ours",
        "lines": [
            {
                "id": "line_03_01",
                "text": "Subah ki bus mein neend sambhaale, bag bhi aadha khula tha,",
                "words": [
                    {"text": "Subah", "start": 38.26, "end": 39.18, "accent": True},
                    {"text": "ki", "start": 39.18, "end": 39.32, "accent": False},
                    {"text": "bus", "start": 39.32, "end": 39.56, "accent": True},
                    {"text": "mein", "start": 39.56, "end": 39.82, "accent": False},
                    {"text": "neend", "start": 39.82, "end": 40.32, "accent": True},
                    {"text": "sambhaale,", "start": 40.32, "end": 41.10, "accent": False},
                    {"text": "bag", "start": 41.10, "end": 41.62, "accent": True},
                    {"text": "bhi", "start": 41.62, "end": 41.84, "accent": False},
                    {"text": "aadha", "start": 41.84, "end": 42.44, "accent": False},
                    {"text": "khula", "start": 42.44, "end": 42.80, "accent": True},
                    {"text": "tha,", "start": 42.80, "end": 43.50, "accent": False}
                ]
            },
            {
                "id": "line_03_02",
                "text": "Gate pe milte hi lagta tha, din apna hi likha tha.",
                "words": [
                    {"text": "Gate", "start": 43.50, "end": 44.24, "accent": True},
                    {"text": "pe", "start": 44.24, "end": 44.50, "accent": False},
                    {"text": "milte", "start": 44.50, "end": 45.06, "accent": False},
                    {"text": "hi", "start": 45.06, "end": 45.50, "accent": False},
                    {"text": "lagta", "start": 45.50, "end": 46.28, "accent": True},
                    {"text": "tha,", "start": 46.28, "end": 46.66, "accent": False},
                    {"text": "din", "start": 46.66, "end": 47.10, "accent": True},
                    {"text": "apna", "start": 47.10, "end": 47.58, "accent": True},
                    {"text": "hi", "start": 47.58, "end": 48.14, "accent": False},
                    {"text": "likha", "start": 48.14, "end": 48.45, "accent": True},
                    {"text": "tha.", "start": 48.45, "end": 48.58, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_04_antara1_proxy",
        "name": "Roll Call Proxies & Shared Tiffin Feast",
        "sectionTag": "04 // ANTARA 1  •  PROXY ATTENDANCE & TIFFIN",
        "startSec": 48.5,
        "endSec": 58.3,
        "subtitle": "Answering attendance for missing friends • One lunchbox split four ways",
        "lines": [
            {
                "id": "line_04_01",
                "text": "Roll call mein naam pukara, kisi ne 'present' keh diya,",
                "words": [
                    {"text": "Roll", "start": 48.58, "end": 49.04, "accent": True},
                    {"text": "call", "start": 49.04, "end": 49.48, "accent": True},
                    {"text": "mein", "start": 49.48, "end": 49.72, "accent": False},
                    {"text": "naam", "start": 49.72, "end": 50.18, "accent": False},
                    {"text": "pukara,", "start": 50.18, "end": 50.90, "accent": True},
                    {"text": "kisi", "start": 50.90, "end": 51.40, "accent": False},
                    {"text": "ne", "start": 51.40, "end": 51.52, "accent": False},
                    {"text": "'present'", "start": 51.52, "end": 52.12, "accent": True},
                    {"text": "keh", "start": 52.12, "end": 52.50, "accent": False},
                    {"text": "diya,", "start": 52.50, "end": 52.88, "accent": False}
                ]
            },
            {
                "id": "line_04_02",
                "text": "Ek tiffin ke chaar hisse the, bhookh ka bhi fest kar diya.",
                "words": [
                    {"text": "Ek", "start": 52.88, "end": 53.96, "accent": False},
                    {"text": "tiffin", "start": 53.96, "end": 54.36, "accent": True},
                    {"text": "ke", "start": 54.36, "end": 54.60, "accent": False},
                    {"text": "chaar", "start": 54.60, "end": 54.96, "accent": True},
                    {"text": "hisse", "start": 54.96, "end": 55.60, "accent": False},
                    {"text": "the,", "start": 55.60, "end": 56.10, "accent": False},
                    {"text": "bhookh", "start": 56.10, "end": 56.64, "accent": True},
                    {"text": "ka", "start": 56.64, "end": 56.96, "accent": False},
                    {"text": "bhi", "start": 56.96, "end": 57.30, "accent": False},
                    {"text": "fest", "start": 57.30, "end": 57.78, "accent": True},
                    {"text": "kar", "start": 57.78, "end": 58.00, "accent": False},
                    {"text": "diya.", "start": 58.00, "end": 58.34, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_05_antara1_chai",
        "name": "Canteen Udhaar & Cherished Bonds",
        "sectionTag": "05 // ANTARA 1  •  CANTEEN CHAI & DEADLINES",
        "startSec": 58.3,
        "endSec": 68.6,
        "subtitle": "Chai on credit ledger • Friendships that mattered more than any deadline",
        "lines": [
            {
                "id": "line_05_01",
                "text": "Canteen ki udhaar wali chai, kitni mehengi aur kitni bani,",
                "words": [
                    {"text": "Canteen", "start": 58.34, "end": 59.16, "accent": True},
                    {"text": "ki", "start": 59.16, "end": 59.36, "accent": False},
                    {"text": "udhaar", "start": 59.36, "end": 59.80, "accent": True},
                    {"text": "wali", "start": 59.80, "end": 60.12, "accent": False},
                    {"text": "chai,", "start": 60.12, "end": 60.60, "accent": True},
                    {"text": "kitni", "start": 60.60, "end": 61.26, "accent": False},
                    {"text": "mehengi", "start": 61.26, "end": 61.86, "accent": True},
                    {"text": "aur", "start": 61.86, "end": 62.20, "accent": False},
                    {"text": "kitni", "start": 62.20, "end": 62.50, "accent": False},
                    {"text": "bani,", "start": 62.50, "end": 62.80, "accent": False}
                ]
            },
            {
                "id": "line_05_02",
                "text": "Assignment ki deadline se zyada, dosti humko khaas lagi.",
                "words": [
                    {"text": "Assignment", "start": 62.80, "end": 63.82, "accent": True},
                    {"text": "ki", "start": 63.82, "end": 63.96, "accent": False},
                    {"text": "deadline", "start": 63.96, "end": 64.66, "accent": True},
                    {"text": "se", "start": 64.66, "end": 64.90, "accent": False},
                    {"text": "zyada,", "start": 64.90, "end": 65.56, "accent": False},
                    {"text": "dosti", "start": 65.56, "end": 66.18, "accent": True},
                    {"text": "humko", "start": 66.18, "end": 66.76, "accent": False},
                    {"text": "khaas", "start": 66.76, "end": 67.28, "accent": True},
                    {"text": "lagi.", "start": 67.28, "end": 68.20, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_06_mukhda_reprise",
        "name": "One Bench, Incomplete Notes & Whole Dreams",
        "sectionTag": "06 // MUKHDA REPRISE  •  BENCH WORLD & SAPNE",
        "startSec": 68.6,
        "endSec": 89.2,
        "subtitle": "Building entire cities in our eyes • Laughter that taught us to live today",
        "lines": [
            {
                "id": "line_06_01",
                "text": "Class ke baad jo zindagi thi, woh class mein kahan milti thi,",
                "words": [
                    {"text": "Class", "start": 68.62, "end": 69.18, "accent": True},
                    {"text": "ke", "start": 69.18, "end": 69.30, "accent": False},
                    {"text": "baad", "start": 69.30, "end": 69.80, "accent": True},
                    {"text": "jo", "start": 69.80, "end": 70.42, "accent": False},
                    {"text": "zindagi", "start": 70.42, "end": 70.84, "accent": True},
                    {"text": "thi,", "start": 70.84, "end": 71.02, "accent": False},
                    {"text": "woh", "start": 71.02, "end": 71.70, "accent": False},
                    {"text": "class", "start": 71.70, "end": 71.92, "accent": True},
                    {"text": "mein", "start": 71.92, "end": 72.46, "accent": False},
                    {"text": "kahan", "start": 72.46, "end": 72.86, "accent": True},
                    {"text": "milti", "start": 72.86, "end": 73.10, "accent": True},
                    {"text": "thi,", "start": 73.10, "end": 73.26, "accent": False}
                ]
            },
            {
                "id": "line_06_02",
                "text": "Ek bench pe chhoti duniya thi, har baat nayi si lagti thi.",
                "words": [
                    {"text": "Ek", "start": 73.26, "end": 73.54, "accent": False},
                    {"text": "bench", "start": 73.54, "end": 74.02, "accent": True},
                    {"text": "pe", "start": 74.02, "end": 74.30, "accent": False},
                    {"text": "chhoti", "start": 74.30, "end": 74.76, "accent": True},
                    {"text": "duniya", "start": 74.76, "end": 75.20, "accent": True},
                    {"text": "thi,", "start": 75.20, "end": 75.64, "accent": False},
                    {"text": "har", "start": 75.64, "end": 75.98, "accent": False},
                    {"text": "baat", "start": 75.98, "end": 76.56, "accent": True},
                    {"text": "nayi", "start": 76.56, "end": 77.18, "accent": True},
                    {"text": "si", "start": 77.18, "end": 77.50, "accent": False},
                    {"text": "lagti", "start": 77.50, "end": 77.90, "accent": False},
                    {"text": "thi.", "start": 77.90, "end": 78.20, "accent": False}
                ]
            },
            {
                "id": "line_06_03",
                "text": "Notes adhoore, sapne poore, aankhon mein shehar basaaya tha,",
                "words": [
                    {"text": "Notes", "start": 78.20, "end": 78.86, "accent": True},
                    {"text": "adhoore,", "start": 78.86, "end": 79.64, "accent": False},
                    {"text": "sapne", "start": 79.64, "end": 80.36, "accent": True},
                    {"text": "poore,", "start": 80.36, "end": 80.86, "accent": True},
                    {"text": "aankhon", "start": 80.86, "end": 81.54, "accent": True},
                    {"text": "mein", "start": 81.54, "end": 81.76, "accent": False},
                    {"text": "shehar", "start": 81.76, "end": 82.26, "accent": True},
                    {"text": "basaaya", "start": 82.26, "end": 82.94, "accent": False},
                    {"text": "tha,", "start": 82.94, "end": 83.32, "accent": False}
                ]
            },
            {
                "id": "line_06_04",
                "text": "Kal ka kya hai, aaj doston ne, hans ke humein sikhaaya tha.",
                "words": [
                    {"text": "Kal", "start": 83.32, "end": 83.56, "accent": False},
                    {"text": "ka", "start": 83.56, "end": 83.84, "accent": False},
                    {"text": "kya", "start": 83.84, "end": 84.28, "accent": False},
                    {"text": "hai,", "start": 84.28, "end": 84.46, "accent": False},
                    {"text": "aaj", "start": 84.46, "end": 84.86, "accent": True},
                    {"text": "doston", "start": 84.86, "end": 85.48, "accent": True},
                    {"text": "ne,", "start": 85.48, "end": 85.78, "accent": False},
                    {"text": "hans", "start": 85.78, "end": 86.20, "accent": True},
                    {"text": "ke", "start": 86.20, "end": 86.40, "accent": False},
                    {"text": "humein", "start": 86.40, "end": 86.82, "accent": False},
                    {"text": "sikhaaya", "start": 86.82, "end": 87.56, "accent": True},
                    {"text": "tha.", "start": 87.56, "end": 88.50, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_07_interlude",
        "name": "Acoustic Solo & Hallway Breeze",
        "sectionTag": "07 // INTERLUDE  •  CAMPUS BREEZE",
        "startSec": 89.2,
        "endSec": 97.8,
        "subtitle": "Sunlight drifting across vacant benches • Memories in the making",
        "lines": []
    },
    {
        "id": "scene_08_antara2_hostel",
        "name": "Hostel Rooftops & Midnight Ambitions",
        "sectionTag": "08 // ANTARA 2  •  3 AM HOSTEL DEBATES",
        "startSec": 97.8,
        "endSec": 107.4,
        "subtitle": "Startups, music, or going back home • Talking under 3 AM stars",
        "lines": [
            {
                "id": "line_08_01",
                "text": "Hostel ki chhat pe teen baje, future par behas chali,",
                "words": [
                    {"text": "Hostel", "start": 97.82, "end": 98.66, "accent": True},
                    {"text": "ki", "start": 98.66, "end": 98.86, "accent": False},
                    {"text": "chhat", "start": 98.86, "end": 99.40, "accent": True},
                    {"text": "pe", "start": 99.40, "end": 99.74, "accent": False},
                    {"text": "teen", "start": 99.74, "end": 100.18, "accent": True},
                    {"text": "baje,", "start": 100.18, "end": 100.60, "accent": False},
                    {"text": "future", "start": 100.60, "end": 101.06, "accent": True},
                    {"text": "par", "start": 101.06, "end": 101.38, "accent": False},
                    {"text": "behas", "start": 101.38, "end": 101.96, "accent": True},
                    {"text": "chali,", "start": 101.96, "end": 102.46, "accent": False}
                ]
            },
            {
                "id": "line_08_02",
                "text": "Koi startup, koi music, koi ghar lautne ki baat chali.",
                "words": [
                    {"text": "Koi", "start": 102.46, "end": 102.88, "accent": False},
                    {"text": "startup,", "start": 102.88, "end": 103.60, "accent": True},
                    {"text": "koi", "start": 103.60, "end": 104.16, "accent": False},
                    {"text": "music,", "start": 104.16, "end": 104.70, "accent": True},
                    {"text": "koi", "start": 104.70, "end": 105.08, "accent": False},
                    {"text": "ghar", "start": 105.08, "end": 105.38, "accent": True},
                    {"text": "lautne", "start": 105.38, "end": 106.22, "accent": False},
                    {"text": "ki", "start": 106.22, "end": 106.50, "accent": False},
                    {"text": "baat", "start": 106.50, "end": 106.90, "accent": True},
                    {"text": "chali.", "start": 106.90, "end": 107.40, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_09_antara2_fails",
        "name": "Laughing at Marks & Celebrating Together",
        "sectionTag": "09 // ANTARA 2  •  SHARED FAILS & TRIUMPH",
        "startSec": 107.4,
        "endSec": 117.1,
        "subtitle": "Failing together meant no one cried • One person's win was everyone's festival",
        "lines": [
            {
                "id": "line_09_01",
                "text": "Fail hue toh saath baithkar, marks ko humne hasa diya,",
                "words": [
                    {"text": "Fail", "start": 107.48, "end": 108.32, "accent": True},
                    {"text": "hue", "start": 108.32, "end": 108.78, "accent": False},
                    {"text": "toh", "start": 108.78, "end": 108.96, "accent": False},
                    {"text": "saath", "start": 108.96, "end": 109.50, "accent": True},
                    {"text": "baithkar,", "start": 109.50, "end": 109.94, "accent": False},
                    {"text": "marks", "start": 109.94, "end": 110.64, "accent": True},
                    {"text": "ko", "start": 110.64, "end": 110.82, "accent": False},
                    {"text": "humne", "start": 110.82, "end": 111.32, "accent": False},
                    {"text": "hasa", "start": 111.32, "end": 111.80, "accent": True},
                    {"text": "diya,", "start": 111.80, "end": 112.22, "accent": False}
                ]
            },
            {
                "id": "line_09_02",
                "text": "Jeet kisi ek ki hoti thi, par poore group ne mana diya.",
                "words": [
                    {"text": "Jeet", "start": 112.22, "end": 113.10, "accent": True},
                    {"text": "kisi", "start": 113.10, "end": 113.62, "accent": False},
                    {"text": "ek", "start": 113.62, "end": 113.90, "accent": False},
                    {"text": "ki", "start": 113.90, "end": 114.20, "accent": False},
                    {"text": "hoti", "start": 114.20, "end": 114.60, "accent": False},
                    {"text": "thi,", "start": 114.60, "end": 114.90, "accent": False},
                    {"text": "par", "start": 114.90, "end": 115.30, "accent": False},
                    {"text": "poore", "start": 115.30, "end": 115.80, "accent": True},
                    {"text": "group", "start": 115.80, "end": 116.18, "accent": True},
                    {"text": "ne", "start": 116.18, "end": 116.45, "accent": False},
                    {"text": "mana", "start": 116.45, "end": 116.85, "accent": True},
                    {"text": "diya.", "start": 116.85, "end": 117.14, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_10_antara2_degree",
        "name": "Learning Selfhood Before Degrees",
        "sectionTag": "10 // ANTARA 2  •  LESSONS OF LIFE",
        "startSec": 117.1,
        "endSec": 127.2,
        "subtitle": "Falling and rising up together • Hands reaching out without asking",
        "lines": [
            {
                "id": "line_10_01",
                "text": "Degree ke pannon se pehle, hum khud ko padhna seekh gaye,",
                "words": [
                    {"text": "Degree", "start": 117.14, "end": 117.82, "accent": True},
                    {"text": "ke", "start": 117.82, "end": 118.14, "accent": False},
                    {"text": "pannon", "start": 118.14, "end": 118.76, "accent": False},
                    {"text": "se", "start": 118.76, "end": 118.90, "accent": False},
                    {"text": "pehle,", "start": 118.90, "end": 119.42, "accent": True},
                    {"text": "hum", "start": 119.42, "end": 120.06, "accent": False},
                    {"text": "khud", "start": 120.06, "end": 120.36, "accent": True},
                    {"text": "ko", "start": 120.36, "end": 120.60, "accent": False},
                    {"text": "padhna", "start": 120.60, "end": 121.18, "accent": True},
                    {"text": "seekh", "start": 121.18, "end": 121.82, "accent": True},
                    {"text": "gaye,", "start": 121.82, "end": 122.18, "accent": False}
                ]
            },
            {
                "id": "line_10_02",
                "text": "Gir kar uthna, haath badhana, ek duje se seekh gaye.",
                "words": [
                    {"text": "Gir", "start": 122.18, "end": 122.54, "accent": False},
                    {"text": "kar", "start": 122.54, "end": 122.80, "accent": False},
                    {"text": "uthna,", "start": 122.80, "end": 123.40, "accent": True},
                    {"text": "haath", "start": 123.40, "end": 124.10, "accent": True},
                    {"text": "badhana,", "start": 124.10, "end": 124.76, "accent": True},
                    {"text": "ek", "start": 124.76, "end": 125.00, "accent": False},
                    {"text": "duje", "start": 125.00, "end": 125.50, "accent": True},
                    {"text": "se", "start": 125.50, "end": 126.08, "accent": False},
                    {"text": "seekh", "start": 126.08, "end": 126.70, "accent": True},
                    {"text": "gaye.", "start": 126.70, "end": 127.22, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_11_bridge_farewell",
        "name": "Empty Timetables & Echoes in the Frame",
        "sectionTag": "11 // THE BRIDGE  •  EMPTY CORRIDORS & ECHOES",
        "startSec": 127.2,
        "endSec": 146.9,
        "subtitle": "Different cities tomorrow • But the campus forever walks with us",
        "lines": [
            {
                "id": "line_11_01",
                "text": "Ek din yeh corridor khaali, aur yeh timetable puraana hoga,",
                "words": [
                    {"text": "Ek", "start": 127.22, "end": 127.76, "accent": False},
                    {"text": "din", "start": 127.76, "end": 128.18, "accent": True},
                    {"text": "yeh", "start": 128.18, "end": 128.58, "accent": False},
                    {"text": "corridor", "start": 128.58, "end": 129.26, "accent": True},
                    {"text": "khaali,", "start": 129.26, "end": 129.70, "accent": False},
                    {"text": "aur", "start": 129.70, "end": 130.00, "accent": False},
                    {"text": "yeh", "start": 130.00, "end": 130.46, "accent": False},
                    {"text": "timetable", "start": 130.46, "end": 131.20, "accent": True},
                    {"text": "puraana", "start": 131.20, "end": 131.80, "accent": False},
                    {"text": "hoga,", "start": 131.80, "end": 132.10, "accent": False}
                ]
            },
            {
                "id": "line_11_02",
                "text": "Jo roz milte the bina bulaaye, unse milna bahaana hoga.",
                "words": [
                    {"text": "Jo", "start": 132.10, "end": 132.50, "accent": False},
                    {"text": "roz", "start": 132.50, "end": 132.90, "accent": True},
                    {"text": "milte", "start": 132.90, "end": 133.35, "accent": False},
                    {"text": "the", "start": 133.35, "end": 133.60, "accent": False},
                    {"text": "bina", "start": 133.60, "end": 134.00, "accent": False},
                    {"text": "bulaaye,", "start": 134.00, "end": 134.64, "accent": True},
                    {"text": "unse", "start": 134.64, "end": 135.00, "accent": False},
                    {"text": "milna", "start": 135.00, "end": 135.60, "accent": True},
                    {"text": "bahaana", "start": 135.60, "end": 136.48, "accent": True},
                    {"text": "hoga.", "start": 136.48, "end": 137.00, "accent": False}
                ]
            },
            {
                "id": "line_11_03",
                "text": "Par photo mein jo shor bacha hai, woh kabhi kam nahi hoga,",
                "words": [
                    {"text": "Par", "start": 137.00, "end": 137.40, "accent": False},
                    {"text": "photo", "start": 137.40, "end": 138.00, "accent": True},
                    {"text": "mein", "start": 138.00, "end": 138.30, "accent": False},
                    {"text": "jo", "start": 138.30, "end": 138.60, "accent": False},
                    {"text": "shor", "start": 138.60, "end": 139.10, "accent": True},
                    {"text": "bacha", "start": 139.10, "end": 139.45, "accent": False},
                    {"text": "hai,", "start": 139.45, "end": 139.60, "accent": False},
                    {"text": "woh", "start": 139.60, "end": 139.90, "accent": False},
                    {"text": "kabhi", "start": 139.90, "end": 140.30, "accent": True},
                    {"text": "kam", "start": 140.30, "end": 140.60, "accent": False},
                    {"text": "nahi", "start": 140.60, "end": 141.00, "accent": True},
                    {"text": "hoga,", "start": 141.00, "end": 141.94, "accent": False}
                ]
            },
            {
                "id": "line_11_04",
                "text": "Hum alag shehron mein honge, par apna campus saath hoga.",
                "words": [
                    {"text": "Hum", "start": 141.94, "end": 142.40, "accent": False},
                    {"text": "alag", "start": 142.40, "end": 142.90, "accent": True},
                    {"text": "shehron", "start": 142.90, "end": 143.40, "accent": True},
                    {"text": "mein", "start": 143.40, "end": 143.65, "accent": False},
                    {"text": "honge,", "start": 143.65, "end": 144.20, "accent": False},
                    {"text": "par", "start": 144.20, "end": 144.60, "accent": False},
                    {"text": "apna", "start": 144.60, "end": 145.00, "accent": True},
                    {"text": "campus", "start": 145.00, "end": 145.80, "accent": True},
                    {"text": "saath", "start": 145.80, "end": 146.54, "accent": True},
                    {"text": "hoga.", "start": 146.54, "end": 146.98, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_12_climax_reprise",
        "name": "Echoes of Friends & Meeting in Memories",
        "sectionTag": "12 // CLIMAX  •  ONE HEARTBEAT",
        "startSec": 146.9,
        "endSec": 166.5,
        "subtitle": "Even if the final bell rings out • We will meet again inside our memories",
        "lines": [
            {
                "id": "line_12_01",
                "text": "Class ke baad jo zindagi thi, woh class mein kahan milti thi,",
                "words": [
                    {"text": "Class", "start": 146.98, "end": 147.62, "accent": True},
                    {"text": "ke", "start": 147.62, "end": 147.82, "accent": False},
                    {"text": "baad", "start": 147.82, "end": 148.40, "accent": True},
                    {"text": "jo", "start": 148.40, "end": 148.90, "accent": False},
                    {"text": "zindagi", "start": 148.90, "end": 149.38, "accent": True},
                    {"text": "thi,", "start": 149.38, "end": 149.56, "accent": False},
                    {"text": "woh", "start": 149.56, "end": 150.22, "accent": False},
                    {"text": "class", "start": 150.22, "end": 150.46, "accent": True},
                    {"text": "mein", "start": 150.46, "end": 151.12, "accent": False},
                    {"text": "kahan", "start": 151.12, "end": 151.42, "accent": True},
                    {"text": "milti", "start": 151.42, "end": 151.65, "accent": True},
                    {"text": "thi,", "start": 151.65, "end": 151.76, "accent": False}
                ]
            },
            {
                "id": "line_12_02",
                "text": "Har dost ki ek aawaaz mein, apni hi dhadkan chalti thi.",
                "words": [
                    {"text": "Har", "start": 151.76, "end": 152.20, "accent": False},
                    {"text": "dost", "start": 152.20, "end": 152.60, "accent": True},
                    {"text": "ki", "start": 152.60, "end": 152.85, "accent": False},
                    {"text": "ek", "start": 152.85, "end": 153.20, "accent": False},
                    {"text": "aawaaz", "start": 153.20, "end": 153.95, "accent": True},
                    {"text": "mein,", "start": 153.95, "end": 154.30, "accent": False},
                    {"text": "apni", "start": 154.30, "end": 154.90, "accent": True},
                    {"text": "hi", "start": 154.90, "end": 155.20, "accent": False},
                    {"text": "dhadkan", "start": 155.20, "end": 156.00, "accent": True},
                    {"text": "chalti", "start": 156.00, "end": 156.40, "accent": False},
                    {"text": "thi.", "start": 156.40, "end": 156.70, "accent": False}
                ]
            },
            {
                "id": "line_12_03",
                "text": "Notes adhoore, sapne poore, raaste naye banayenge,",
                "words": [
                    {"text": "Notes", "start": 156.70, "end": 157.40, "accent": True},
                    {"text": "adhoore,", "start": 157.40, "end": 158.18, "accent": False},
                    {"text": "sapne", "start": 158.18, "end": 158.88, "accent": True},
                    {"text": "poore,", "start": 158.88, "end": 159.46, "accent": True},
                    {"text": "raaste", "start": 159.46, "end": 160.18, "accent": True},
                    {"text": "naye", "start": 160.18, "end": 160.80, "accent": False},
                    {"text": "banayenge,", "start": 160.80, "end": 161.62, "accent": True}
                ]
            },
            {
                "id": "line_12_04",
                "text": "Ghanti baj kar keh bhi de toh, yaadon mein phir mil jayenge.",
                "words": [
                    {"text": "Ghanti", "start": 161.62, "end": 162.50, "accent": True},
                    {"text": "baj", "start": 162.50, "end": 162.82, "accent": False},
                    {"text": "kar", "start": 162.82, "end": 163.06, "accent": False},
                    {"text": "keh", "start": 163.06, "end": 163.40, "accent": False},
                    {"text": "bhi", "start": 163.40, "end": 163.70, "accent": False},
                    {"text": "de", "start": 163.70, "end": 163.95, "accent": False},
                    {"text": "toh,", "start": 163.95, "end": 164.20, "accent": False},
                    {"text": "yaadon", "start": 164.20, "end": 164.84, "accent": True},
                    {"text": "mein", "start": 164.84, "end": 165.10, "accent": False},
                    {"text": "phir", "start": 165.10, "end": 165.40, "accent": False},
                    {"text": "mil", "start": 165.40, "end": 165.80, "accent": True},
                    {"text": "jayenge.", "start": 165.80, "end": 166.58, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_13_outro_whisper",
        "name": "Class Ke Baad Jo Zindagi Thi",
        "sectionTag": "13 // OUTRO  •  THE FINAL WHISPER",
        "startSec": 166.5,
        "endSec": total_duration_sec,
        "subtitle": "The campus bell fades into silence • The friendship remains forever alive",
        "lines": [
            {
                "id": "line_13_01",
                "text": "Class ke baad jo zindagi thi...",
                "words": [
                    {"text": "Class", "start": 166.58, "end": 167.34, "accent": True},
                    {"text": "ke", "start": 167.34, "end": 167.48, "accent": False},
                    {"text": "baad", "start": 167.48, "end": 168.00, "accent": True},
                    {"text": "jo", "start": 168.00, "end": 168.50, "accent": False},
                    {"text": "zindagi", "start": 168.50, "end": 169.00, "accent": True},
                    {"text": "thi...", "start": 169.00, "end": 170.50, "accent": False}
                ]
            },
            {
                "id": "line_13_02",
                "text": "Woh class mein kahan milti thi...",
                "words": [
                    {"text": "Woh", "start": 171.78, "end": 172.30, "accent": False},
                    {"text": "class", "start": 172.30, "end": 172.80, "accent": True},
                    {"text": "mein", "start": 172.80, "end": 173.20, "accent": False},
                    {"text": "kahan", "start": 173.20, "end": 173.72, "accent": True},
                    {"text": "milti", "start": 173.72, "end": 174.20, "accent": True},
                    {"text": "thi...", "start": 174.20, "end": 175.50, "accent": False}
                ]
            },
            {
                "id": "line_13_03",
                "text": "Woh class mein kahan milti thi...",
                "words": [
                    {"text": "Woh", "start": 177.76, "end": 178.80, "accent": False},
                    {"text": "class", "start": 178.80, "end": 179.40, "accent": True},
                    {"text": "mein", "start": 179.40, "end": 179.80, "accent": False},
                    {"text": "kahan", "start": 179.80, "end": 180.40, "accent": True},
                    {"text": "milti", "start": 180.40, "end": 181.20, "accent": True},
                    {"text": "thi...", "start": 181.20, "end": 183.50, "accent": False}
                ]
            }
        ]
    }
]

timeline = {
    "title": "Class Ke Baad (Student Life)",
    "artist": "PeerMusic & Suno AI",
    "bpm": 96,
    "fps": fps,
    "audioFile": "public/audio/students_life.mp3",
    "theme": "botanical_scrapbook",
    "scenes": [],
    "overrides": {}
}

word_counter = 1

for sc_idx, sc in enumerate(scenes_raw):
    sc_start_f = f(sc["startSec"])
    sc_end_f = f(sc["endSec"])

    if timeline["scenes"]:
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
        "symbolKey": "classroom_hallway",
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

os.makedirs("src/songs/students-life", exist_ok=True)
output_path = "src/songs/students-life/timeline.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 60 FPS timeline: {len(timeline['scenes'])} scenes, {word_counter-1} words.")
print(f"[✓] Total frames: {total_frames} ({total_duration_sec:.2f}s). Saved to {output_path}")
