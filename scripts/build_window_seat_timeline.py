#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Window Seat (Safar Aur Yaadein)'
Audio: public/audio/window_seat.mp3 (259.727 seconds = 15584 frames @ 60 FPS)
"""

import os
import json

fps = 60
total_duration_sec = 259.727
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_raw = [
    {
        "id": "scene_01_intro",
        "name": "Train Whistle & Departure Chime",
        "sectionTag": "01 // INTRO  •  EXP-12952",
        "startSec": 0.0,
        "endSec": 16.8,
        "subtitle": "Platform noise fading • Watching the city slip away from the window",
        "lines": []
    },
    {
        "id": "scene_02_mukhda_p1",
        "name": "Window Seat & Drifting Rain",
        "sectionTag": "02 // MUKHDA  •  WINDOW SEAT",
        "startSec": 16.8,
        "endSec": 28.8,
        "subtitle": "Rain streaks on glass • Unfinished memories on the platform",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Window seat pe baith ke maine, shehar ko chhoot-te dekha hai,",
                "words": [
                    {"text": "Window", "start": 16.90, "end": 17.50, "accent": True},
                    {"text": "seat", "start": 17.50, "end": 17.95, "accent": True},
                    {"text": "pe", "start": 17.95, "end": 18.25, "accent": False},
                    {"text": "baith", "start": 18.25, "end": 18.65, "accent": False},
                    {"text": "ke", "start": 18.65, "end": 18.85, "accent": False},
                    {"text": "maine,", "start": 18.85, "end": 19.50, "accent": False},
                    {"text": "shehar", "start": 19.50, "end": 20.30, "accent": True},
                    {"text": "ko", "start": 20.30, "end": 20.55, "accent": False},
                    {"text": "chhoot-te", "start": 20.55, "end": 21.30, "accent": True},
                    {"text": "dekha", "start": 21.30, "end": 21.80, "accent": False},
                    {"text": "hai,", "start": 21.80, "end": 22.25, "accent": False}
                ]
            },
            {
                "id": "line_02_02",
                "text": "Kanch pe behti boondon jaisa, waqt ko fisalte dekha hai.",
                "words": [
                    {"text": "Kanch", "start": 22.90, "end": 23.50, "accent": True},
                    {"text": "pe", "start": 23.50, "end": 23.80, "accent": False},
                    {"text": "behti", "start": 23.80, "end": 24.30, "accent": False},
                    {"text": "boondon", "start": 24.30, "end": 25.10, "accent": True},
                    {"text": "jaisa,", "start": 25.10, "end": 25.70, "accent": False},
                    {"text": "waqt", "start": 25.70, "end": 26.40, "accent": True},
                    {"text": "ko", "start": 26.40, "end": 26.70, "accent": False},
                    {"text": "fisalte", "start": 26.70, "end": 27.50, "accent": True},
                    {"text": "dekha", "start": 27.50, "end": 28.10, "accent": False},
                    {"text": "hai.", "start": 28.10, "end": 28.60, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_03_mukhda_p2",
        "name": "One Earphone & Retracing Paths",
        "sectionTag": "03 // MUKHDA  •  OLD SONGS",
        "startSec": 28.8,
        "endSec": 40.0,
        "subtitle": "Humming a forgotten tune • Tracks rushing forward, heart pulling back",
        "lines": [
            {
                "id": "line_03_01",
                "text": "Ek earphone kaan mein dale, gungunata hoon puraana gaana,",
                "words": [
                    {"text": "Ek", "start": 29.00, "end": 29.40, "accent": False},
                    {"text": "earphone", "start": 29.40, "end": 30.20, "accent": True},
                    {"text": "kaan", "start": 30.20, "end": 30.70, "accent": False},
                    {"text": "mein", "start": 30.70, "end": 31.00, "accent": False},
                    {"text": "dale,", "start": 31.00, "end": 31.50, "accent": False},
                    {"text": "gungunata", "start": 31.50, "end": 32.40, "accent": True},
                    {"text": "hoon", "start": 32.40, "end": 32.75, "accent": False},
                    {"text": "puraana", "start": 32.75, "end": 33.60, "accent": True},
                    {"text": "gaana,", "start": 33.60, "end": 34.20, "accent": False}
                ]
            },
            {
                "id": "line_03_02",
                "text": "Raste saare aage bhaagein, par dil ko peechhe jaana hai.",
                "words": [
                    {"text": "Raste", "start": 34.80, "end": 35.40, "accent": False},
                    {"text": "saare", "start": 35.40, "end": 36.00, "accent": False},
                    {"text": "aage", "start": 36.00, "end": 36.60, "accent": True},
                    {"text": "bhaagein,", "start": 36.60, "end": 37.30, "accent": False},
                    {"text": "par", "start": 37.30, "end": 37.80, "accent": False},
                    {"text": "dil", "start": 37.80, "end": 38.30, "accent": True},
                    {"text": "ko", "start": 38.30, "end": 38.60, "accent": False},
                    {"text": "peechhe", "start": 38.60, "end": 39.30, "accent": True},
                    {"text": "jaana", "start": 39.30, "end": 39.75, "accent": False},
                    {"text": "hai.", "start": 39.75, "end": 40.00, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_04_mukhda_hook",
        "name": "Left Behind Station & City Fade",
        "sectionTag": "04 // MUKHDA  •  PLATFORM GOODBYE",
        "startSec": 40.0,
        "endSec": 52.5,
        "subtitle": "Where you once smiled • That station has slipped away into the dusk",
        "lines": [
            {
                "id": "line_04_01",
                "text": "Haan chhoot gaya woh station peeche, jahan kabhi tu mila tha mujhe,",
                "words": [
                    {"text": "Haan", "start": 40.10, "end": 40.60, "accent": False},
                    {"text": "chhoot", "start": 40.60, "end": 41.20, "accent": True},
                    {"text": "gaya", "start": 41.20, "end": 41.60, "accent": False},
                    {"text": "woh", "start": 41.60, "end": 41.90, "accent": False},
                    {"text": "station", "start": 41.90, "end": 42.60, "accent": True},
                    {"text": "peeche,", "start": 42.60, "end": 43.10, "accent": False},
                    {"text": "jahan", "start": 43.10, "end": 43.60, "accent": False},
                    {"text": "kabhi", "start": 43.60, "end": 44.10, "accent": False},
                    {"text": "tu", "start": 44.10, "end": 44.40, "accent": True},
                    {"text": "mila", "start": 44.40, "end": 45.00, "accent": True},
                    {"text": "tha", "start": 45.00, "end": 45.25, "accent": False},
                    {"text": "mujhe,", "start": 45.25, "end": 45.60, "accent": False}
                ]
            },
            {
                "id": "line_04_02",
                "text": "Window seat pe baith ke maine, shehar ko chhoot-te dekha hai.",
                "words": [
                    {"text": "Window", "start": 45.90, "end": 46.70, "accent": True},
                    {"text": "seat", "start": 46.70, "end": 47.30, "accent": True},
                    {"text": "pe", "start": 47.30, "end": 47.60, "accent": False},
                    {"text": "baith", "start": 47.60, "end": 48.10, "accent": False},
                    {"text": "ke", "start": 48.10, "end": 48.40, "accent": False},
                    {"text": "maine,", "start": 48.40, "end": 49.00, "accent": False},
                    {"text": "shehar", "start": 49.00, "end": 49.70, "accent": True},
                    {"text": "ko", "start": 49.70, "end": 50.00, "accent": False},
                    {"text": "chhoot-te", "start": 50.00, "end": 50.70, "accent": True},
                    {"text": "dekha", "start": 50.70, "end": 51.30, "accent": False},
                    {"text": "hai.", "start": 51.30, "end": 52.00, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_05_interlude_1",
        "name": "Railway Tracks & Acoustic Journey",
        "sectionTag": "05 // INTERLUDE  •  ACOUSTIC FLUIDITY",
        "startSec": 52.5,
        "endSec": 78.0,
        "subtitle": "Rhythmic steel clatter • Telegraph lines rising and falling against the dusk",
        "lines": []
    },
    {
        "id": "scene_06_antara_1_p1",
        "name": "Telegraph Wires & Platform Chai",
        "sectionTag": "06 // ANTARA 1  •  DUSK FALLING",
        "startSec": 78.0,
        "endSec": 87.0,
        "subtitle": "Steam from clay cups • Sunset fading along copper wires",
        "lines": [
            {
                "id": "line_06_01",
                "text": "Khambhe taaron ke silsile mein, dhoop dhalte dekhi hai,",
                "words": [
                    {"text": "Khambhe", "start": 78.20, "end": 78.80, "accent": True},
                    {"text": "taaron", "start": 78.80, "end": 79.40, "accent": False},
                    {"text": "ke", "start": 79.40, "end": 79.70, "accent": False},
                    {"text": "silsile", "start": 79.70, "end": 80.40, "accent": False},
                    {"text": "mein,", "start": 80.40, "end": 80.70, "accent": False},
                    {"text": "dhoop", "start": 80.70, "end": 81.30, "accent": True},
                    {"text": "dhalte", "start": 81.30, "end": 81.90, "accent": False},
                    {"text": "dekhi", "start": 81.90, "end": 82.30, "accent": False},
                    {"text": "hai,", "start": 82.30, "end": 82.60, "accent": False}
                ]
            },
            {
                "id": "line_06_02",
                "text": "Chai-wale ki aawazon mein, shaam dhalte dekhi hai.",
                "words": [
                    {"text": "Chai-wale", "start": 82.65, "end": 83.40, "accent": True},
                    {"text": "ki", "start": 83.40, "end": 83.70, "accent": False},
                    {"text": "aawazon", "start": 83.70, "end": 84.40, "accent": True},
                    {"text": "mein,", "start": 84.40, "end": 84.70, "accent": False},
                    {"text": "shaam", "start": 84.70, "end": 85.30, "accent": True},
                    {"text": "dhalte", "start": 85.30, "end": 85.90, "accent": False},
                    {"text": "dekhi", "start": 85.90, "end": 86.30, "accent": False},
                    {"text": "hai.", "start": 86.30, "end": 86.70, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_07_antara_1_p2",
        "name": "Crowded Platforms & Unspoken Words",
        "sectionTag": "07 // ANTARA 1  •  PLATFORM SILENCE",
        "startSec": 87.0,
        "endSec": 98.0,
        "subtitle": "Looking for one face in the crowd • Words that remained in the throat",
        "lines": [
            {
                "id": "line_07_01",
                "text": "Platform ki bheed mein maine, tera chehra dhoondha tha,",
                "words": [
                    {"text": "Platform", "start": 87.30, "end": 88.00, "accent": True},
                    {"text": "ki", "start": 88.00, "end": 88.30, "accent": False},
                    {"text": "bheed", "start": 88.30, "end": 88.90, "accent": False},
                    {"text": "mein", "start": 88.90, "end": 89.20, "accent": False},
                    {"text": "maine,", "start": 89.20, "end": 89.70, "accent": False},
                    {"text": "tera", "start": 89.70, "end": 90.30, "accent": True},
                    {"text": "chehra", "start": 90.30, "end": 91.10, "accent": True},
                    {"text": "dhoondha", "start": 91.10, "end": 91.80, "accent": False},
                    {"text": "tha,", "start": 91.80, "end": 92.20, "accent": False}
                ]
            },
            {
                "id": "line_07_02",
                "text": "Jo lafz gale mein atke the, unhein chupke se kehna tha.",
                "words": [
                    {"text": "Jo", "start": 92.50, "end": 92.90, "accent": False},
                    {"text": "lafz", "start": 92.90, "end": 93.60, "accent": True},
                    {"text": "gale", "start": 93.60, "end": 94.20, "accent": False},
                    {"text": "mein", "start": 94.20, "end": 94.50, "accent": False},
                    {"text": "atke", "start": 94.50, "end": 95.10, "accent": True},
                    {"text": "the,", "start": 95.10, "end": 95.40, "accent": False},
                    {"text": "unhein", "start": 95.40, "end": 96.00, "accent": False},
                    {"text": "chupke", "start": 96.00, "end": 96.70, "accent": True},
                    {"text": "se", "start": 96.70, "end": 97.00, "accent": False},
                    {"text": "kehna", "start": 97.00, "end": 97.50, "accent": False},
                    {"text": "tha.", "start": 97.50, "end": 97.90, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_08_antara_1_climax",
        "name": "The Goodbye Wave & Hidden Tears",
        "sectionTag": "08 // ANTARA 1  •  TEARS BEHIND GLASSES",
        "startSec": 98.0,
        "endSec": 110.5,
        "subtitle": "Smiling while turning away • Hidden tears drenching the whole city",
        "lines": [
            {
                "id": "line_08_01",
                "text": "Haath hilaya tha tu ne jab, main hans ke mud gaya tha magar,",
                "words": [
                    {"text": "Haath", "start": 98.20, "end": 98.80, "accent": True},
                    {"text": "hilaya", "start": 98.80, "end": 99.40, "accent": False},
                    {"text": "tha", "start": 99.40, "end": 99.70, "accent": False},
                    {"text": "tu", "start": 99.70, "end": 100.00, "accent": False},
                    {"text": "ne", "start": 100.00, "end": 100.25, "accent": False},
                    {"text": "jab,", "start": 100.25, "end": 100.60, "accent": False},
                    {"text": "main", "start": 100.60, "end": 101.00, "accent": False},
                    {"text": "hans", "start": 101.00, "end": 101.60, "accent": True},
                    {"text": "ke", "start": 101.60, "end": 101.90, "accent": False},
                    {"text": "mud", "start": 101.90, "end": 102.30, "accent": False},
                    {"text": "gaya", "start": 102.30, "end": 102.70, "accent": False},
                    {"text": "tha", "start": 102.70, "end": 103.00, "accent": False},
                    {"text": "magar,", "start": 103.00, "end": 103.40, "accent": False}
                ]
            },
            {
                "id": "line_08_02",
                "text": "Aansuon ne chashme ke peechhe, poora shehar bhigoya tha!",
                "words": [
                    {"text": "Aansuon", "start": 103.60, "end": 104.50, "accent": True},
                    {"text": "ne", "start": 104.50, "end": 104.80, "accent": False},
                    {"text": "chashme", "start": 104.80, "end": 105.60, "accent": True},
                    {"text": "ke", "start": 105.60, "end": 105.90, "accent": False},
                    {"text": "peechhe,", "start": 105.90, "end": 106.60, "accent": False},
                    {"text": "poora", "start": 106.60, "end": 107.40, "accent": True},
                    {"text": "shehar", "start": 107.40, "end": 108.30, "accent": True},
                    {"text": "bhigoya", "start": 108.30, "end": 109.40, "accent": True},
                    {"text": "tha!", "start": 109.40, "end": 110.20, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_09_mukhda_reprise_p1",
        "name": "Returning to the Window Glass",
        "sectionTag": "09 // CHORUS REPRISE  •  SLIPPING TIME",
        "startSec": 110.5,
        "endSec": 121.0,
        "subtitle": "Rain drops on the glass • A lifetime passing in a moment",
        "lines": [
            {
                "id": "line_09_01",
                "text": "Window seat pe baith ke maine, shehar ko chhoot-te dekha hai,",
                "words": [
                    {"text": "Window", "start": 110.80, "end": 111.50, "accent": True},
                    {"text": "seat", "start": 111.50, "end": 112.00, "accent": True},
                    {"text": "pe", "start": 112.00, "end": 112.30, "accent": False},
                    {"text": "baith", "start": 112.30, "end": 112.70, "accent": False},
                    {"text": "ke", "start": 112.70, "end": 112.95, "accent": False},
                    {"text": "maine,", "start": 112.95, "end": 113.60, "accent": False},
                    {"text": "shehar", "start": 113.60, "end": 114.20, "accent": True},
                    {"text": "ko", "start": 114.20, "end": 114.45, "accent": False},
                    {"text": "chhoot-te", "start": 114.45, "end": 115.10, "accent": True},
                    {"text": "dekha", "start": 115.10, "end": 115.60, "accent": False},
                    {"text": "hai,", "start": 115.60, "end": 116.00, "accent": False}
                ]
            },
            {
                "id": "line_09_02",
                "text": "Kanch pe behti boondon jaisa, waqt ko fisalte dekha hai.",
                "words": [
                    {"text": "Kanch", "start": 116.20, "end": 116.80, "accent": True},
                    {"text": "pe", "start": 116.80, "end": 117.10, "accent": False},
                    {"text": "behti", "start": 117.10, "end": 117.60, "accent": False},
                    {"text": "boondon", "start": 117.60, "end": 118.30, "accent": True},
                    {"text": "jaisa,", "start": 118.30, "end": 118.80, "accent": False},
                    {"text": "waqt", "start": 118.80, "end": 119.30, "accent": True},
                    {"text": "ko", "start": 119.30, "end": 119.55, "accent": False},
                    {"text": "fisalte", "start": 119.55, "end": 120.10, "accent": True},
                    {"text": "dekha", "start": 120.10, "end": 120.50, "accent": False},
                    {"text": "hai.", "start": 120.50, "end": 120.90, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_10_mukhda_reprise_p2",
        "name": "Roads Running Forward, Heart Looking Back",
        "sectionTag": "10 // CHORUS REPRISE  •  THE JOURNEY ONWARD",
        "startSec": 121.0,
        "endSec": 132.0,

        "subtitle": "Speeding rails • Anchored memory",
        "lines": [
            {
                "id": "line_10_01",
                "text": "Raste saare aage bhaagein, par dil ko peechhe jaana hai,",
                "words": [
                    {"text": "Raste", "start": 121.00, "end": 121.70, "accent": False},
                    {"text": "saare", "start": 121.70, "end": 122.30, "accent": False},
                    {"text": "aage", "start": 122.30, "end": 123.00, "accent": True},
                    {"text": "bhaagein,", "start": 123.00, "end": 123.60, "accent": False},
                    {"text": "par", "start": 123.60, "end": 124.00, "accent": False},
                    {"text": "dil", "start": 124.00, "end": 124.50, "accent": True},
                    {"text": "ko", "start": 124.50, "end": 124.80, "accent": False},
                    {"text": "peechhe", "start": 124.80, "end": 125.40, "accent": True},
                    {"text": "jaana", "start": 125.40, "end": 125.90, "accent": False},
                    {"text": "hai,", "start": 125.90, "end": 126.20, "accent": False}
                ]
            },
            {
                "id": "line_10_02",
                "text": "Window seat pe baith ke maine, shehar ko chhoot-te dekha hai.",
                "words": [
                    {"text": "Window", "start": 126.30, "end": 127.10, "accent": True},
                    {"text": "seat", "start": 127.10, "end": 127.60, "accent": True},
                    {"text": "pe", "start": 127.60, "end": 127.90, "accent": False},
                    {"text": "baith", "start": 127.90, "end": 128.30, "accent": False},
                    {"text": "ke", "start": 128.30, "end": 128.55, "accent": False},
                    {"text": "maine,", "start": 128.55, "end": 129.20, "accent": False},
                    {"text": "shehar", "start": 129.20, "end": 129.90, "accent": True},
                    {"text": "ko", "start": 129.90, "end": 130.20, "accent": False},
                    {"text": "chhoot-te", "start": 130.20, "end": 130.90, "accent": True},
                    {"text": "dekha", "start": 130.90, "end": 131.50, "accent": False},
                    {"text": "hai.", "start": 131.50, "end": 132.00, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_11_interlude_2",
        "name": "Midnight Tunnel & Nightfall",
        "sectionTag": "11 // INTERLUDE  •  TUNNEL REVERIE",
        "startSec": 132.0,
        "endSec": 153.5,
        "subtitle": "Dark tunnel reflections • Rhythm of the sleeper coach wheels",
        "lines": []
    },
    {
        "id": "scene_12_antara_2_p1",
        "name": "Dark Tunnel Reflection & Unfinished Stories",
        "sectionTag": "12 // ANTARA 2  •  MIRROR IN THE GLASS",
        "startSec": 153.5,
        "endSec": 167.5,
        "subtitle": "When the tunnel comes, own face appears on the glass • Every passenger's quiet tale",
        "lines": [
            {
                "id": "line_12_01",
                "text": "Tunnel aati hai toh kanch pe, apna hi aks dikhta hai,",
                "words": [
                    {"text": "Tunnel", "start": 154.00, "end": 155.00, "accent": True},
                    {"text": "aati", "start": 155.00, "end": 155.60, "accent": False},
                    {"text": "hai", "start": 155.60, "end": 156.00, "accent": False},
                    {"text": "toh", "start": 156.00, "end": 156.40, "accent": False},
                    {"text": "kanch", "start": 156.40, "end": 157.20, "accent": True},
                    {"text": "pe,", "start": 157.20, "end": 157.60, "accent": False},
                    {"text": "apna", "start": 157.60, "end": 158.40, "accent": False},
                    {"text": "hi", "start": 158.40, "end": 158.70, "accent": False},
                    {"text": "aks", "start": 158.70, "end": 159.50, "accent": True},
                    {"text": "dikhta", "start": 159.50, "end": 160.20, "accent": False},
                    {"text": "hai,", "start": 160.20, "end": 160.70, "accent": False}
                ]
            },
            {
                "id": "line_12_02",
                "text": "Har musafir ki aankhon mein, ek adhura qissa dikhta hai.",
                "words": [
                    {"text": "Har", "start": 161.50, "end": 162.00, "accent": False},
                    {"text": "musafir", "start": 162.00, "end": 162.80, "accent": True},
                    {"text": "ki", "start": 162.80, "end": 163.10, "accent": False},
                    {"text": "aankhon", "start": 163.10, "end": 163.80, "accent": True},
                    {"text": "mein,", "start": 163.80, "end": 164.20, "accent": False},
                    {"text": "ek", "start": 164.20, "end": 164.60, "accent": False},
                    {"text": "adhura", "start": 164.60, "end": 165.40, "accent": True},
                    {"text": "qissa", "start": 165.40, "end": 166.10, "accent": True},
                    {"text": "dikhta", "start": 166.10, "end": 166.70, "accent": False},
                    {"text": "hai.", "start": 166.70, "end": 167.20, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_13_antara_2_p2",
        "name": "Folded Ticket in Pocket",
        "sectionTag": "13 // ANTARA 2  •  DESTINATIONS & HOMES",
        "startSec": 167.5,
        "endSec": 182.0,
        "subtitle": "Someone's destination nears, someone just left home • Name scribbled on the ticket",
        "lines": [
            {
                "id": "line_13_01",
                "text": "Kisi ki manzil aane ko hai, kisi ka ghar chhoota hai abhi,",
                "words": [
                    {"text": "Kisi", "start": 167.50, "end": 168.00, "accent": False},
                    {"text": "ki", "start": 168.00, "end": 168.30, "accent": False},
                    {"text": "manzil", "start": 168.30, "end": 169.00, "accent": True},
                    {"text": "aane", "start": 169.00, "end": 169.50, "accent": False},
                    {"text": "ko", "start": 169.50, "end": 169.80, "accent": False},
                    {"text": "hai,", "start": 169.80, "end": 170.10, "accent": False},
                    {"text": "kisi", "start": 170.10, "end": 170.60, "accent": False},
                    {"text": "ka", "start": 170.60, "end": 170.90, "accent": False},
                    {"text": "ghar", "start": 170.90, "end": 171.60, "accent": True},
                    {"text": "chhoota", "start": 171.60, "end": 172.30, "accent": False},
                    {"text": "hai", "start": 172.30, "end": 172.55, "accent": False},
                    {"text": "abhi,", "start": 172.55, "end": 172.90, "accent": False}
                ]
            },
            {
                "id": "line_13_02",
                "text": "Meri jeb mein rakhi ticket pe, tera hi naam likha hai abhi!",
                "words": [
                    {"text": "Meri", "start": 173.20, "end": 173.80, "accent": False},
                    {"text": "jeb", "start": 173.80, "end": 174.40, "accent": True},
                    {"text": "mein", "start": 174.40, "end": 174.70, "accent": False},
                    {"text": "rakhi", "start": 174.70, "end": 175.20, "accent": False},
                    {"text": "ticket", "start": 175.20, "end": 175.90, "accent": True},
                    {"text": "pe,", "start": 175.90, "end": 176.20, "accent": False},
                    {"text": "tera", "start": 176.20, "end": 177.00, "accent": True},
                    {"text": "hi", "start": 177.00, "end": 177.30, "accent": False},
                    {"text": "naam", "start": 177.30, "end": 178.10, "accent": True},
                    {"text": "likha", "start": 178.10, "end": 178.70, "accent": False},
                    {"text": "hai", "start": 178.70, "end": 179.00, "accent": False},
                    {"text": "abhi!", "start": 179.00, "end": 179.50, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_14_antara_2_climax",
        "name": "Ticket Checker & Accompanying Silence",
        "sectionTag": "14 // ANTARA 2  •  EMPTY BERTH",
        "startSec": 182.0,
        "endSec": 192.5,
        "subtitle": "How to tell the conductor • Right beside me, your silence still travels along",
        "lines": [
            {
                "id": "line_14_01",
                "text": "Ticket checker ko kya samjhayein, yeh seat toh khali lagti hai,",
                "words": [
                    {"text": "Ticket", "start": 180.00, "end": 180.60, "accent": True},
                    {"text": "checker", "start": 180.60, "end": 181.20, "accent": False},
                    {"text": "ko", "start": 181.20, "end": 181.50, "accent": False},
                    {"text": "kya", "start": 181.50, "end": 181.80, "accent": False},
                    {"text": "samjhayein,", "start": 181.80, "end": 182.60, "accent": False},
                    {"text": "yeh", "start": 182.60, "end": 183.00, "accent": False},
                    {"text": "seat", "start": 183.00, "end": 183.60, "accent": True},
                    {"text": "toh", "start": 183.60, "end": 183.90, "accent": False},
                    {"text": "khali", "start": 183.90, "end": 184.60, "accent": True},
                    {"text": "lagti", "start": 184.60, "end": 185.10, "accent": False},
                    {"text": "hai,", "start": 185.10, "end": 185.50, "accent": False}
                ]
            },
            {
                "id": "line_14_02",
                "text": "Par mere barabar mein ab bhi, teri khamoshi chalti hai.",
                "words": [
                    {"text": "Par", "start": 185.80, "end": 186.20, "accent": False},
                    {"text": "mere", "start": 186.20, "end": 186.80, "accent": False},
                    {"text": "barabar", "start": 186.80, "end": 187.60, "accent": True},
                    {"text": "mein", "start": 187.60, "end": 187.90, "accent": False},
                    {"text": "ab", "start": 187.90, "end": 188.20, "accent": False},
                    {"text": "bhi,", "start": 188.20, "end": 188.55, "accent": False},
                    {"text": "teri", "start": 188.55, "end": 189.30, "accent": True},
                    {"text": "khamoshi", "start": 189.30, "end": 190.50, "accent": True},
                    {"text": "chalti", "start": 190.50, "end": 191.40, "accent": False},
                    {"text": "hai.", "start": 191.40, "end": 192.20, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_15_bridge_p1",
        "name": "Approaching Station & Washing Dust",
        "sectionTag": "15 // THE BRIDGE  •  NIGHT BREEZE",
        "startSec": 192.5,
        "endSec": 204.5,
        "subtitle": "The air grows cool • The dust of the journey washes from the eyelids",
        "lines": [
            {
                "id": "line_15_01",
                "text": "Agla station aane wala hai, hawa thandi ho chali hai,",
                "words": [
                    {"text": "Agla", "start": 193.00, "end": 193.70, "accent": True},
                    {"text": "station", "start": 193.70, "end": 194.50, "accent": True},
                    {"text": "aane", "start": 194.50, "end": 195.10, "accent": False},
                    {"text": "wala", "start": 195.10, "end": 195.60, "accent": False},
                    {"text": "hai,", "start": 195.60, "end": 195.95, "accent": False},
                    {"text": "hawa", "start": 195.95, "end": 196.70, "accent": True},
                    {"text": "thandi", "start": 196.70, "end": 197.40, "accent": True},
                    {"text": "ho", "start": 197.40, "end": 197.80, "accent": False},
                    {"text": "chali", "start": 197.80, "end": 198.30, "accent": False},
                    {"text": "hai,", "start": 198.30, "end": 198.70, "accent": False}
                ]
            },
            {
                "id": "line_15_02",
                "text": "Uss safar ki dhool ab dheere dheere, palkon se dhul chali hai.",
                "words": [
                    {"text": "Uss", "start": 198.90, "end": 199.30, "accent": False},
                    {"text": "safar", "start": 199.30, "end": 200.00, "accent": True},
                    {"text": "ki", "start": 200.00, "end": 200.30, "accent": False},
                    {"text": "dhool", "start": 200.30, "end": 200.90, "accent": True},
                    {"text": "ab", "start": 200.90, "end": 201.20, "accent": False},
                    {"text": "dheere", "start": 201.20, "end": 201.70, "accent": False},
                    {"text": "dheere,", "start": 201.70, "end": 202.20, "accent": False},
                    {"text": "palkon", "start": 202.20, "end": 202.80, "accent": True},
                    {"text": "se", "start": 202.80, "end": 203.05, "accent": False},
                    {"text": "dhul", "start": 203.05, "end": 203.50, "accent": False},
                    {"text": "chali", "start": 203.50, "end": 203.90, "accent": False},
                    {"text": "hai.", "start": 203.90, "end": 204.30, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_16_bridge_p2",
        "name": "Wishing Well & Train Moving Ahead",
        "sectionTag": "16 // THE BRIDGE  •  HEALING & MOVING FORWARD",
        "startSec": 204.5,
        "endSec": 216.0,
        "subtitle": "Wherever you are, stay blessed • The story turns its page into the night",
        "lines": [
            {
                "id": "line_16_01",
                "text": "Tu jahan bhi ho khush rehna, yeh train aage badh rahi hai,",
                "words": [
                    {"text": "Tu", "start": 204.50, "end": 204.90, "accent": False},
                    {"text": "jahan", "start": 204.90, "end": 205.50, "accent": False},
                    {"text": "bhi", "start": 205.50, "end": 205.80, "accent": False},
                    {"text": "ho", "start": 205.80, "end": 206.10, "accent": False},
                    {"text": "khush", "start": 206.10, "end": 206.70, "accent": True},
                    {"text": "rehna,", "start": 206.70, "end": 207.30, "accent": True},
                    {"text": "yeh", "start": 207.30, "end": 207.70, "accent": False},
                    {"text": "train", "start": 207.70, "end": 208.30, "accent": True},
                    {"text": "aage", "start": 208.30, "end": 208.90, "accent": True},
                    {"text": "badh", "start": 208.90, "end": 209.40, "accent": False},
                    {"text": "rahi", "start": 209.40, "end": 209.80, "accent": False},
                    {"text": "hai,", "start": 209.80, "end": 210.10, "accent": False}
                ]
            },
            {
                "id": "line_16_02",
                "text": "Peechhe chhoote har lamhe ki, dastaan aage padh rahi hai...",
                "words": [
                    {"text": "Peechhe", "start": 210.30, "end": 210.90, "accent": False},
                    {"text": "chhoote", "start": 210.90, "end": 211.50, "accent": False},
                    {"text": "har", "start": 211.50, "end": 211.90, "accent": False},
                    {"text": "lamhe", "start": 211.90, "end": 212.60, "accent": True},
                    {"text": "ki,", "start": 212.60, "end": 212.90, "accent": False},
                    {"text": "dastaan", "start": 212.90, "end": 213.70, "accent": True},
                    {"text": "aage", "start": 213.70, "end": 214.30, "accent": True},
                    {"text": "padh", "start": 214.30, "end": 214.80, "accent": False},
                    {"text": "rahi", "start": 214.80, "end": 215.15, "accent": False},
                    {"text": "hai...", "start": 215.15, "end": 215.50, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_17_bridge_climax",
        "name": "Haan Safar Aage Badh Raha Hai",
        "sectionTag": "17 // CLIMAX  •  THE JOURNEY CONTINUES",
        "startSec": 216.0,
        "endSec": 222.5,
        "subtitle": "Forward into the horizon • The train rushes toward dawn",
        "lines": [
            {
                "id": "line_17_01",
                "text": "Haan safar aage badh raha hai!",
                "words": [
                    {"text": "Haan", "start": 216.00, "end": 217.00, "accent": True},
                    {"text": "safar", "start": 217.00, "end": 218.40, "accent": True},
                    {"text": "aage", "start": 218.40, "end": 219.60, "accent": True},
                    {"text": "badh", "start": 219.60, "end": 220.60, "accent": True},
                    {"text": "raha", "start": 220.60, "end": 221.40, "accent": False},
                    {"text": "hai!", "start": 221.40, "end": 222.20, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_18_outro",
        "name": "Window Breeze & Final Memory",
        "sectionTag": "18 // OUTRO  •  DISTANT WHISTLE",
        "startSec": 222.5,
        "endSec": total_duration_sec,
        "subtitle": "Sitting by the window • The cool wind whispers your name into the quiet dark",
        "lines": [
            {
                "id": "line_18_01",
                "text": "Window seat pe baith ke, shehar ko chhoot-te dekha hai...",
                "words": [
                    {"text": "Window", "start": 223.00, "end": 224.00, "accent": True},
                    {"text": "seat", "start": 224.00, "end": 224.70, "accent": True},
                    {"text": "pe", "start": 224.70, "end": 225.10, "accent": False},
                    {"text": "baith", "start": 225.10, "end": 225.60, "accent": False},
                    {"text": "ke,", "start": 225.60, "end": 226.00, "accent": False},
                    {"text": "shehar", "start": 226.00, "end": 226.80, "accent": True},
                    {"text": "ko", "start": 226.80, "end": 227.10, "accent": False},
                    {"text": "chhoot-te", "start": 227.10, "end": 227.80, "accent": True},
                    {"text": "dekha", "start": 227.80, "end": 228.30, "accent": False},
                    {"text": "hai...", "start": 228.30, "end": 228.80, "accent": False}
                ]
            },
            {
                "id": "line_18_02",
                "text": "Khidki se aati hawa ne, tera naam pukara hai...",
                "words": [
                    {"text": "Khidki", "start": 229.20, "end": 230.10, "accent": True},
                    {"text": "se", "start": 230.10, "end": 230.40, "accent": False},
                    {"text": "aati", "start": 230.40, "end": 231.00, "accent": False},
                    {"text": "hawa", "start": 231.00, "end": 232.00, "accent": True},
                    {"text": "ne,", "start": 232.00, "end": 232.40, "accent": False},
                    {"text": "tera", "start": 232.40, "end": 233.20, "accent": True},
                    {"text": "naam", "start": 233.20, "end": 234.20, "accent": True},
                    {"text": "pukara", "start": 234.20, "end": 235.30, "accent": True},
                    {"text": "hai...", "start": 235.30, "end": 236.20, "accent": False}
                ]
            }
        ]
    }
]

timeline = {
    "fps": fps,
    "totalFrames": total_frames,
    "durationSec": total_duration_sec,
    "audioFile": "public/audio/window_seat.mp3",
    "theme": "botanical_scrapbook",
    "scenes": []
}

word_counter = 1

for sc_idx, sc in enumerate(scenes_raw):
    sc_start_f = f(sc["startSec"])
    sc_end_f = f(sc["endSec"])

    # Ensure sc_end_f contains all word timestamps
    for line in sc["lines"]:
        for w in line["words"]:
            sc_end_f = max(sc_end_f, f(w["end"]) + 4)

    if timeline["scenes"]:
        timeline["scenes"][-1]["endFrame"] = sc_start_f

    scene_obj = {
        "id": sc["id"],
        "name": sc["name"],
        "sectionTag": sc["sectionTag"],
        "startFrame": sc_start_f,
        "endFrame": sc_end_f,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "herbarium_window_seat",
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

os.makedirs("src/songs/window-seat", exist_ok=True)
output_path = "src/songs/window-seat/timeline.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 60 FPS timeline: {len(timeline['scenes'])} scenes, {word_counter-1} words.")
print(f"[✓] Total frames: {total_frames} ({total_duration_sec:.2f}s). Saved to {output_path}")
