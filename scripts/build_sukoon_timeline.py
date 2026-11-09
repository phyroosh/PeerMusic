#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Sukoon' (Urdu Poetic Song)
Audio: public/audio/sukoon_poetic_urdu.mp3 (176.95s = 10,617 frames @ 60 FPS)
Theme: Liquid Crimson Silk (PeerMusicStyle03_LiquidSilk)
Script: Hinglish (Roman Urdu / Hindi)
"""

import os
import sys
import json

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.duration_guard import measure_audio_duration

fps = 60
audio_path = os.path.join(ROOT_DIR, "public", "audio", "sukoon_poetic_urdu.mp3")
total_duration_sec = measure_audio_duration(audio_path)
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_raw = [
    {
        "id": "scene_01_intro",
        "name": "Deep Breathing & Midnight Silence",
        "sectionTag": "01 // INTRO  •  SOULFUL REFLECTION",
        "startSec": 0.0,
        "endSec": 13.46,
        "symbolKey": "midnight_candle",
        "subtitle": "Acoustic fingerpicking & contemplative ambient stillness • A heavy soul preparing to let go",
        "lines": [
            {
                "text": "(aah)",
                "startSec": 3.50,
                "endSec": 7.50,
                "words": [
                    {"text": "(aah)", "startSec": 3.50, "endSec": 7.50, "accent": True}
                ]
            },
            {
                "text": "(mmm)",
                "startSec": 8.00,
                "endSec": 12.50,
                "words": [
                    {"text": "(mmm)", "startSec": 8.00, "endSec": 12.50, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_02_verse_1",
        "name": "The Heavy Burden & Solitary Steps",
        "sectionTag": "02 // VERSE 1  •  BAAR-E-GIRAAN",
        "startSec": 13.46,
        "endSec": 44.30,
        "symbolKey": "heavy_stone",
        "subtitle": "Carrying an invisible stone for years • Muddaton se jhuke the shane is baar-e-giraan se",
        "lines": [
            {
                "text": "Muddaton se jhuke the shane is baar-e-giraan se",
                "startSec": 13.46,
                "endSec": 20.48,
                "words": [
                    {"text": "Muddaton", "startSec": 13.46, "endSec": 15.46, "accent": True},
                    {"text": "se", "startSec": 15.46, "endSec": 15.68, "accent": False},
                    {"text": "jhuke", "startSec": 15.68, "endSec": 16.48, "accent": False},
                    {"text": "the", "startSec": 16.48, "endSec": 17.20, "accent": False},
                    {"text": "shane", "startSec": 17.20, "endSec": 17.68, "accent": False},
                    {"text": "is", "startSec": 17.68, "endSec": 18.20, "accent": False},
                    {"text": "baar-e-giraan", "startSec": 18.20, "endSec": 19.88, "accent": True},
                    {"text": "se", "startSec": 19.88, "endSec": 20.48, "accent": False}
                ]
            },
            {
                "text": "Band mutthiyon mein qaid the silsile gumaan ke",
                "startSec": 20.48,
                "endSec": 27.56,
                "words": [
                    {"text": "Band", "startSec": 20.48, "endSec": 22.38, "accent": False},
                    {"text": "mutthiyon", "startSec": 22.38, "endSec": 23.36, "accent": True},
                    {"text": "mein", "startSec": 23.36, "endSec": 23.80, "accent": False},
                    {"text": "qaid", "startSec": 23.80, "endSec": 24.66, "accent": True},
                    {"text": "the", "startSec": 24.66, "endSec": 25.10, "accent": False},
                    {"text": "silsile", "startSec": 25.10, "endSec": 26.32, "accent": False},
                    {"text": "gumaan", "startSec": 26.32, "endSec": 27.10, "accent": True},
                    {"text": "ke", "startSec": 27.10, "endSec": 27.56, "accent": False}
                ]
            },
            {
                "text": "Main chalta raha bina saans liye",
                "startSec": 30.02,
                "endSec": 33.24,
                "words": [
                    {"text": "Main", "startSec": 30.02, "endSec": 30.14, "accent": False},
                    {"text": "chalta", "startSec": 30.14, "endSec": 30.98, "accent": False},
                    {"text": "raha", "startSec": 30.98, "endSec": 31.48, "accent": False},
                    {"text": "bina", "startSec": 31.48, "endSec": 31.92, "accent": False},
                    {"text": "saans", "startSec": 31.92, "endSec": 32.66, "accent": True},
                    {"text": "liye", "startSec": 32.66, "endSec": 33.24, "accent": False}
                ]
            },
            {
                "text": "Main pakde raha apna hi gunah",
                "startSec": 33.24,
                "endSec": 36.78,
                "words": [
                    {"text": "Main", "startSec": 33.24, "endSec": 33.84, "accent": False},
                    {"text": "pakde", "startSec": 33.84, "endSec": 34.66, "accent": False},
                    {"text": "raha", "startSec": 34.66, "endSec": 35.22, "accent": False},
                    {"text": "apna", "startSec": 35.22, "endSec": 35.92, "accent": False},
                    {"text": "hi", "startSec": 35.92, "endSec": 36.40, "accent": False},
                    {"text": "gunah", "startSec": 36.40, "endSec": 36.78, "accent": True}
                ]
            },
            {
                "text": "Ek pathar jo maine hi chuna",
                "startSec": 37.04,
                "endSec": 39.64,
                "words": [
                    {"text": "Ek", "startSec": 37.04, "endSec": 37.40, "accent": False},
                    {"text": "pathar", "startSec": 37.40, "endSec": 38.08, "accent": True},
                    {"text": "jo", "startSec": 38.08, "endSec": 38.42, "accent": False},
                    {"text": "maine", "startSec": 38.42, "endSec": 38.86, "accent": False},
                    {"text": "hi", "startSec": 38.86, "endSec": 39.12, "accent": False},
                    {"text": "chuna", "startSec": 39.12, "endSec": 39.64, "accent": True}
                ]
            },
            {
                "text": "Ek bojh jo mera hi banaya",
                "startSec": 39.64,
                "endSec": 43.62,
                "words": [
                    {"text": "Ek", "startSec": 39.64, "endSec": 41.02, "accent": False},
                    {"text": "bojh", "startSec": 41.02, "endSec": 41.42, "accent": True},
                    {"text": "jo", "startSec": 41.42, "endSec": 41.84, "accent": False},
                    {"text": "mera", "startSec": 41.84, "endSec": 42.28, "accent": False},
                    {"text": "hi", "startSec": 42.28, "endSec": 42.72, "accent": False},
                    {"text": "banaya", "startSec": 42.72, "endSec": 43.62, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_03_chorus_1",
        "name": "Letting Go & Finding Peace",
        "sectionTag": "03 // CHORUS 1  •  SUKOON",
        "startSec": 44.30,
        "endSec": 74.38,
        "symbolKey": "open_hands",
        "subtitle": "Opening clenched hands • Forgiving oneself and releasing the burden into the earth",
        "lines": [
            {
                "text": "Aaj haath khol diye hain",
                "startSec": 44.30,
                "endSec": 47.06,
                "words": [
                    {"text": "Aaj", "startSec": 44.30, "endSec": 45.14, "accent": True},
                    {"text": "haath", "startSec": 45.14, "endSec": 45.48, "accent": False},
                    {"text": "khol", "startSec": 45.48, "endSec": 45.96, "accent": True},
                    {"text": "diye", "startSec": 45.96, "endSec": 46.76, "accent": False},
                    {"text": "hain", "startSec": 46.76, "endSec": 47.06, "accent": False}
                ]
            },
            {
                "text": "Aaj haath khol diye hain",
                "startSec": 47.06,
                "endSec": 50.80,
                "words": [
                    {"text": "Aaj", "startSec": 47.06, "endSec": 48.54, "accent": True},
                    {"text": "haath", "startSec": 48.54, "endSec": 49.02, "accent": False},
                    {"text": "khol", "startSec": 49.02, "endSec": 49.56, "accent": True},
                    {"text": "diye", "startSec": 49.56, "endSec": 50.38, "accent": False},
                    {"text": "hain", "startSec": 50.38, "endSec": 50.80, "accent": False}
                ]
            },
            {
                "text": "Sukoon... bas sukoon hai",
                "startSec": 50.80,
                "endSec": 57.16,
                "words": [
                    {"text": "Sukoon...", "startSec": 50.80, "endSec": 55.20, "accent": True},
                    {"text": "bas", "startSec": 55.20, "endSec": 56.26, "accent": False},
                    {"text": "sukoon", "startSec": 56.26, "endSec": 56.80, "accent": True},
                    {"text": "hai", "startSec": 56.80, "endSec": 57.16, "accent": False}
                ]
            },
            {
                "text": "Mitti mein mila diya bojh",
                "startSec": 57.16,
                "endSec": 62.08,
                "words": [
                    {"text": "Mitti", "startSec": 57.16, "endSec": 60.04, "accent": True},
                    {"text": "mein", "startSec": 60.04, "endSec": 60.30, "accent": False},
                    {"text": "mila", "startSec": 60.30, "endSec": 60.80, "accent": False},
                    {"text": "diya", "startSec": 60.80, "endSec": 61.28, "accent": False},
                    {"text": "bojh", "startSec": 61.28, "endSec": 62.08, "accent": True}
                ]
            },
            {
                "text": "Maine khud ko maaf kar diya",
                "startSec": 62.08,
                "endSec": 65.38,
                "words": [
                    {"text": "Maine", "startSec": 62.08, "endSec": 62.50, "accent": False},
                    {"text": "khud", "startSec": 62.50, "endSec": 62.86, "accent": True},
                    {"text": "ko", "startSec": 62.86, "endSec": 63.24, "accent": False},
                    {"text": "maaf", "startSec": 63.24, "endSec": 64.24, "accent": True},
                    {"text": "kar", "startSec": 64.24, "endSec": 64.54, "accent": False},
                    {"text": "diya", "startSec": 64.54, "endSec": 65.38, "accent": False}
                ]
            },
            {
                "text": "Maine khud ko maaf kar diya",
                "startSec": 65.82,
                "endSec": 72.00,
                "words": [
                    {"text": "Maine", "startSec": 65.82, "endSec": 66.80, "accent": False},
                    {"text": "khud", "startSec": 66.80, "endSec": 67.50, "accent": True},
                    {"text": "ko", "startSec": 67.50, "endSec": 68.20, "accent": False},
                    {"text": "maaf", "startSec": 68.20, "endSec": 69.80, "accent": True},
                    {"text": "kar", "startSec": 69.80, "endSec": 70.40, "accent": False},
                    {"text": "diya", "startSec": 70.40, "endSec": 72.00, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_04_verse_2",
        "name": "The End of The War & Silent Waters",
        "sectionTag": "04 // VERSE 2  •  BEHNE LAGA PAANI",
        "startSec": 74.38,
        "endSec": 103.16,
        "symbolKey": "calm_water",
        "subtitle": "The frantic race halts • Clear mountain water flowing softly past tired feet",
        "lines": [
            {
                "text": "Ruk gayi yeh daud achanak",
                "startSec": 74.38,
                "endSec": 77.84,
                "words": [
                    {"text": "Ruk", "startSec": 74.38, "endSec": 74.68, "accent": True},
                    {"text": "gayi", "startSec": 74.68, "endSec": 75.78, "accent": False},
                    {"text": "yeh", "startSec": 75.78, "endSec": 76.20, "accent": False},
                    {"text": "daud", "startSec": 76.20, "endSec": 76.80, "accent": True},
                    {"text": "achanak", "startSec": 76.80, "endSec": 77.84, "accent": False}
                ]
            },
            {
                "text": "Behne laga paani paas mein",
                "startSec": 77.84,
                "endSec": 81.00,
                "words": [
                    {"text": "Behne", "startSec": 77.84, "endSec": 78.50, "accent": False},
                    {"text": "laga", "startSec": 78.50, "endSec": 79.06, "accent": False},
                    {"text": "paani", "startSec": 79.06, "endSec": 79.86, "accent": True},
                    {"text": "paas", "startSec": 79.86, "endSec": 80.48, "accent": False},
                    {"text": "mein", "startSec": 80.48, "endSec": 81.00, "accent": False}
                ]
            },
            {
                "text": "Koi sawal ab nahi bacha",
                "startSec": 81.00,
                "endSec": 85.36,
                "words": [
                    {"text": "Koi", "startSec": 81.00, "endSec": 82.20, "accent": False},
                    {"text": "sawal", "startSec": 82.20, "endSec": 83.02, "accent": True},
                    {"text": "ab", "startSec": 83.02, "endSec": 83.84, "accent": False},
                    {"text": "nahi", "startSec": 83.84, "endSec": 84.40, "accent": False},
                    {"text": "bacha", "startSec": 84.40, "endSec": 85.36, "accent": True}
                ]
            },
            {
                "text": "Koi jawab ab nahi chahiye",
                "startSec": 87.88,
                "endSec": 92.08,
                "words": [
                    {"text": "Koi", "startSec": 87.88, "endSec": 89.48, "accent": False},
                    {"text": "jawab", "startSec": 89.48, "endSec": 90.26, "accent": True},
                    {"text": "ab", "startSec": 90.26, "endSec": 90.40, "accent": False},
                    {"text": "nahi", "startSec": 90.40, "endSec": 90.92, "accent": False},
                    {"text": "chahiye", "startSec": 90.92, "endSec": 92.08, "accent": True}
                ]
            },
            {
                "text": "Bohot saal lag gaye samajhne mein",
                "startSec": 92.08,
                "endSec": 95.54,
                "words": [
                    {"text": "Bohot", "startSec": 92.08, "endSec": 92.94, "accent": True},
                    {"text": "saal", "startSec": 92.94, "endSec": 93.40, "accent": False},
                    {"text": "lag", "startSec": 93.40, "endSec": 93.72, "accent": False},
                    {"text": "gaye", "startSec": 93.72, "endSec": 94.36, "accent": False},
                    {"text": "samajhne", "startSec": 94.36, "endSec": 95.16, "accent": True},
                    {"text": "mein", "startSec": 95.16, "endSec": 95.54, "accent": False}
                ]
            },
            {
                "text": "Ki saza dene wala main hi tha",
                "startSec": 95.54,
                "endSec": 100.24,
                "words": [
                    {"text": "Ki", "startSec": 95.54, "endSec": 96.62, "accent": False},
                    {"text": "saza", "startSec": 96.62, "endSec": 97.40, "accent": True},
                    {"text": "dene", "startSec": 97.40, "endSec": 97.98, "accent": False},
                    {"text": "wala", "startSec": 97.98, "endSec": 98.72, "accent": False},
                    {"text": "main", "startSec": 98.72, "endSec": 99.18, "accent": True},
                    {"text": "hi", "startSec": 99.18, "endSec": 99.82, "accent": False},
                    {"text": "tha", "startSec": 99.82, "endSec": 100.24, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_05_chorus_2",
        "name": "Deep Resolution & Unburdened Spirit",
        "sectionTag": "05 // CHORUS 2  •  MITTI MEIN MILA DIYA",
        "startSec": 103.16,
        "endSec": 132.98,
        "symbolKey": "open_wings",
        "subtitle": "The true awakening • Sukoon... bas sukoon hai • The burden dissolved forever",
        "lines": [
            {
                "text": "Aaj haath khol diye hain",
                "startSec": 103.16,
                "endSec": 105.84,
                "words": [
                    {"text": "Aaj", "startSec": 103.16, "endSec": 103.84, "accent": True},
                    {"text": "haath", "startSec": 103.84, "endSec": 104.20, "accent": False},
                    {"text": "khol", "startSec": 104.20, "endSec": 104.66, "accent": True},
                    {"text": "diye", "startSec": 104.66, "endSec": 105.48, "accent": False},
                    {"text": "hain", "startSec": 105.48, "endSec": 105.84, "accent": False}
                ]
            },
            {
                "text": "Aaj haath khol diye hain",
                "startSec": 105.84,
                "endSec": 109.84,
                "words": [
                    {"text": "Aaj", "startSec": 105.84, "endSec": 107.22, "accent": True},
                    {"text": "haath", "startSec": 107.22, "endSec": 107.72, "accent": False},
                    {"text": "khol", "startSec": 107.72, "endSec": 108.26, "accent": True},
                    {"text": "diye", "startSec": 108.26, "endSec": 109.08, "accent": False},
                    {"text": "hain", "startSec": 109.08, "endSec": 109.84, "accent": False}
                ]
            },
            {
                "text": "Sukoon... bas sukoon hai",
                "startSec": 109.84,
                "endSec": 115.56,
                "words": [
                    {"text": "Sukoon...", "startSec": 109.84, "endSec": 112.08, "accent": True},
                    {"text": "bas", "startSec": 112.08, "endSec": 113.50, "accent": False},
                    {"text": "sukoon", "startSec": 113.50, "endSec": 115.12, "accent": True},
                    {"text": "hai", "startSec": 115.12, "endSec": 115.56, "accent": False}
                ]
            },
            {
                "text": "Mitti mein mila diya bojh",
                "startSec": 117.70,
                "endSec": 120.76,
                "words": [
                    {"text": "Mitti", "startSec": 117.70, "endSec": 118.72, "accent": True},
                    {"text": "mein", "startSec": 118.72, "endSec": 119.00, "accent": False},
                    {"text": "mila", "startSec": 119.00, "endSec": 119.40, "accent": False},
                    {"text": "diya", "startSec": 119.40, "endSec": 119.84, "accent": False},
                    {"text": "bojh", "startSec": 119.84, "endSec": 120.76, "accent": True}
                ]
            },
            {
                "text": "Maine khud ko maaf kar diya",
                "startSec": 120.76,
                "endSec": 123.82,
                "words": [
                    {"text": "Maine", "startSec": 120.76, "endSec": 121.18, "accent": False},
                    {"text": "khud", "startSec": 121.18, "endSec": 121.52, "accent": True},
                    {"text": "ko", "startSec": 121.52, "endSec": 121.88, "accent": False},
                    {"text": "maaf", "startSec": 121.88, "endSec": 122.84, "accent": True},
                    {"text": "kar", "startSec": 122.84, "endSec": 123.14, "accent": False},
                    {"text": "diya", "startSec": 123.14, "endSec": 123.82, "accent": False}
                ]
            },
            {
                "text": "Maine khud ko maaf kar diya",
                "startSec": 124.00,
                "endSec": 130.00,
                "words": [
                    {"text": "Maine", "startSec": 124.00, "endSec": 125.00, "accent": False},
                    {"text": "khud", "startSec": 125.00, "endSec": 125.80, "accent": True},
                    {"text": "ko", "startSec": 125.80, "endSec": 126.50, "accent": False},
                    {"text": "maaf", "startSec": 126.50, "endSec": 128.20, "accent": True},
                    {"text": "kar", "startSec": 128.20, "endSec": 128.80, "accent": False},
                    {"text": "diya", "startSec": 128.80, "endSec": 130.00, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_06_bridge",
        "name": "Silence of The Internal Battle",
        "sectionTag": "06 // BRIDGE  •  BAS YEH HAWA HAI",
        "startSec": 132.98,
        "endSec": 157.00,
        "symbolKey": "gentle_breeze",
        "subtitle": "Exhausted from fighting oneself • No screaming, no weight, only the pure breath of life",
        "lines": [
            {
                "text": "Thak gaya tha ladte ladte",
                "startSec": 132.98,
                "endSec": 136.24,
                "words": [
                    {"text": "Thak", "startSec": 132.98, "endSec": 133.24, "accent": False},
                    {"text": "gaya", "startSec": 133.24, "endSec": 133.82, "accent": False},
                    {"text": "tha", "startSec": 133.82, "endSec": 134.42, "accent": False},
                    {"text": "ladte", "startSec": 134.42, "endSec": 135.32, "accent": True},
                    {"text": "ladte", "startSec": 135.32, "endSec": 136.24, "accent": True}
                ]
            },
            {
                "text": "Thak gaya tha khud se hi",
                "startSec": 136.24,
                "endSec": 140.30,
                "words": [
                    {"text": "Thak", "startSec": 136.24, "endSec": 136.98, "accent": False},
                    {"text": "gaya", "startSec": 136.98, "endSec": 137.52, "accent": False},
                    {"text": "tha", "startSec": 137.52, "endSec": 138.18, "accent": False},
                    {"text": "khud", "startSec": 138.18, "endSec": 138.58, "accent": True},
                    {"text": "se", "startSec": 138.58, "endSec": 139.02, "accent": False},
                    {"text": "hi", "startSec": 139.02, "endSec": 140.30, "accent": False}
                ]
            },
            {
                "text": "Ab koi bhaar nahi hai",
                "startSec": 140.46,
                "endSec": 142.64,
                "words": [
                    {"text": "Ab", "startSec": 140.46, "endSec": 140.92, "accent": False},
                    {"text": "koi", "startSec": 140.92, "endSec": 141.48, "accent": False},
                    {"text": "bhaar", "startSec": 141.48, "endSec": 141.96, "accent": True},
                    {"text": "nahi", "startSec": 141.96, "endSec": 142.30, "accent": False},
                    {"text": "hai", "startSec": 142.30, "endSec": 142.64, "accent": False}
                ]
            },
            {
                "text": "Ab koi cheekh nahi hai",
                "startSec": 142.64,
                "endSec": 145.52,
                "words": [
                    {"text": "Ab", "startSec": 142.64, "endSec": 143.26, "accent": False},
                    {"text": "koi", "startSec": 143.26, "endSec": 143.68, "accent": False},
                    {"text": "cheekh", "startSec": 143.68, "endSec": 144.18, "accent": True},
                    {"text": "nahi", "startSec": 144.18, "endSec": 144.66, "accent": False},
                    {"text": "hai", "startSec": 144.66, "endSec": 145.52, "accent": False}
                ]
            },
            {
                "text": "Bas yeh hawa hai",
                "startSec": 145.52,
                "endSec": 148.20,
                "words": [
                    {"text": "Bas", "startSec": 145.52, "endSec": 146.32, "accent": False},
                    {"text": "yeh", "startSec": 146.32, "endSec": 146.74, "accent": False},
                    {"text": "hawa", "startSec": 146.74, "endSec": 147.58, "accent": True},
                    {"text": "hai", "startSec": 147.58, "endSec": 148.20, "accent": False}
                ]
            },
            {
                "text": "Bas yeh saans hai",
                "startSec": 148.50,
                "endSec": 153.00,
                "words": [
                    {"text": "Bas", "startSec": 148.50, "endSec": 149.50, "accent": False},
                    {"text": "yeh", "startSec": 149.50, "endSec": 150.20, "accent": False},
                    {"text": "saans", "startSec": 150.20, "endSec": 152.00, "accent": True},
                    {"text": "hai", "startSec": 152.00, "endSec": 153.00, "accent": False}
                ]
            },
            {
                "text": "(bas yeh saans hai)",
                "startSec": 153.44,
                "endSec": 157.00,
                "words": [
                    {"text": "(bas", "startSec": 153.44, "endSec": 153.98, "accent": False},
                    {"text": "yeh", "startSec": 153.98, "endSec": 154.50, "accent": False},
                    {"text": "saans", "startSec": 154.50, "endSec": 155.80, "accent": True},
                    {"text": "hai)", "startSec": 155.80, "endSec": 157.00, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_07_outro",
        "name": "Complete Surrender & Peace",
        "sectionTag": "07 // OUTRO  •  MAAF KAR DIYA",
        "startSec": 157.00,
        "endSec": 176.95,
        "symbolKey": "calm_horizon",
        "subtitle": "Sukoon... Maine khud ko maaf kar diya • Pure stillness and infinite peace",
        "lines": [
            {
                "text": "Sukoon...",
                "startSec": 157.20,
                "endSec": 162.32,
                "words": [
                    {"text": "Sukoon...", "startSec": 157.20, "endSec": 162.32, "accent": True}
                ]
            },
            {
                "text": "Maine khud ko...",
                "startSec": 162.32,
                "endSec": 165.60,
                "words": [
                    {"text": "Maine", "startSec": 162.32, "endSec": 164.36, "accent": False},
                    {"text": "khud", "startSec": 164.36, "endSec": 164.94, "accent": True},
                    {"text": "ko...", "startSec": 164.94, "endSec": 165.60, "accent": False}
                ]
            },
            {
                "text": "Maaf kar diya",
                "startSec": 165.60,
                "endSec": 169.42,
                "words": [
                    {"text": "Maaf", "startSec": 165.60, "endSec": 168.42, "accent": True},
                    {"text": "kar", "startSec": 168.42, "endSec": 168.68, "accent": False},
                    {"text": "diya", "startSec": 168.68, "endSec": 169.42, "accent": True}
                ]
            },
            {
                "text": "(sukoon)",
                "startSec": 169.42,
                "endSec": 172.50,
                "words": [
                    {"text": "(sukoon)", "startSec": 169.42, "endSec": 172.50, "accent": True}
                ]
            },
            {
                "text": "(mmm)",
                "startSec": 172.50,
                "endSec": 176.95,
                "words": [
                    {"text": "(mmm)", "startSec": 172.50, "endSec": 176.95, "accent": False}
                ]
            }
        ]
    }
]

# Build JSON structure with monotonic frame conversion
scenes_final = []
word_counter = 0

for sc_idx, sc in enumerate(scenes_raw):
    sc_start_f = f(sc["startSec"])
    sc_end_f = f(sc["endSec"])
    if sc_idx == len(scenes_raw) - 1:
        sc_end_f = total_frames

    lines_final = []
    for l_idx, l in enumerate(sc["lines"]):
        l_start_f = f(l["startSec"])
        l_end_f = f(l["endSec"])
        
        words_final = []
        for w in l["words"]:
            word_counter += 1
            w_start_f = f(w["startSec"])
            w_end_f = f(w["endSec"])
            
            # Ensure strictly within line and scene bounds
            w_start_f = max(sc_start_f, w_start_f)
            w_end_f = min(sc_end_f, max(w_start_f + 6, w_end_f))
            
            words_final.append({
                "id": f"w_{sc_idx+1:02d}_{word_counter:04d}",
                "text": w["text"],
                "startFrame": w_start_f,
                "endFrame": w_end_f,
                "accent": w.get("accent", False)
            })
            
        # Ensure words are monotonically strictly ordered
        for i in range(1, len(words_final)):
            if words_final[i]["startFrame"] < words_final[i-1]["startFrame"]:
                words_final[i]["startFrame"] = words_final[i-1]["startFrame"] + 1
            if words_final[i]["endFrame"] <= words_final[i]["startFrame"]:
                words_final[i]["endFrame"] = words_final[i]["startFrame"] + 4

        line_min_f = min([w["startFrame"] for w in words_final])
        line_max_f = max([w["endFrame"] for w in words_final])

        lines_final.append({
            "id": f"line_{sc_idx+1:02d}_{l_idx+1:02d}",
            "text": l["text"],
            "startFrame": line_min_f,
            "endFrame": line_max_f,
            "words": words_final
        })

    scenes_final.append({
        "id": sc["id"],
        "name": sc["name"],
        "sectionTag": sc["sectionTag"],
        "startFrame": sc_start_f,
        "endFrame": sc_end_f,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": sc["symbolKey"],
        "subtitle": sc["subtitle"],
        "lines": lines_final
    })

# Ensure contiguous scenes
for i in range(len(scenes_final) - 1):
    scenes_final[i]["endFrame"] = scenes_final[i+1]["startFrame"]

scenes_final[-1]["endFrame"] = total_frames

timeline_data = {
    "songTitle": "Sukoon",
    "theme": "PeerMusicStyle03_LiquidSilk",
    "audioFile": "audio/sukoon_poetic_urdu.mp3",
    "coverImage": "covers/sukoon_clean_16x9.png",
    "fps": fps,
    "totalFrames": total_frames,
    "durationSeconds": round(total_duration_sec, 2),
    "scenes": scenes_final
}

out_dir = os.path.join(ROOT_DIR, "src", "songs", "sukoon-poetic-urdu")
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, "timeline.json")

with open(out_file, "w", encoding="utf-8") as f:
    json.dump(timeline_data, f, indent=2, ensure_ascii=False)

print(f"[✓] Successfully generated timeline at {out_file}")
print(f"    Total Frames: {total_frames} ({total_duration_sec:.2f}s)")
print(f"    Scenes: {len(scenes_final)}")
print(f"    Words: {word_counter}")
