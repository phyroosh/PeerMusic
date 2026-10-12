import json
import os

# Build accurate 60 FPS timeline for "Rough Copy (School Crush Song)"
# Audio: public/audio/rough_copy.mp3 (198.367 seconds = 11902 frames @ 60 FPS)

fps = 60

# We map each scene, line, and word with exact timestamps
# Using whisper alignments as base and refining for smooth lyrical karaoke timing

def f(sec):
    return int(round(sec * fps))

scenes_raw = [
    {
        "id": "scene_01_intro",
        "name": "Classroom Bell & Morning Whistle",
        "sectionTag": "01 // INTRO  •  CLASS 10-B",
        "startSec": 0.0,
        "endSec": 18.5,
        "subtitle": "Last bench window breeze • Doodling on the back page",
        "lines": [
            {
                "id": "line_01_intro",
                "text": "Rough copy ke aakhri panne pe...",
                "words": [
                    {"text": "Rough", "start": 8.0, "end": 10.5, "accent": False},
                    {"text": "Copy", "start": 10.5, "end": 13.0, "accent": True},
                    {"text": "Classroom", "start": 13.0, "end": 15.5, "accent": False},
                    {"text": "Romance", "start": 15.5, "end": 18.0, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_02_mukhda",
        "name": "Rough Copy & Forgotten Formulas",
        "sectionTag": "02 // MUKHDA  •  SECRET NOTES",
        "startSec": 18.5,
        "endSec": 29.5,
        "subtitle": "Algebra forgotten • Only her smile in the margins",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Rough copy ke aakhri panne pe, tera hi naam likha maine,",
                "words": [
                    {"text": "Rough", "start": 18.74, "end": 19.86, "accent": False},
                    {"text": "copy", "start": 19.86, "end": 20.38, "accent": False},
                    {"text": "ke", "start": 20.38, "end": 20.62, "accent": False},
                    {"text": "aakhri", "start": 20.62, "end": 21.18, "accent": False},
                    {"text": "panne", "start": 21.18, "end": 21.72, "accent": False},
                    {"text": "pe,", "start": 21.72, "end": 22.20, "accent": False},
                    {"text": "tera", "start": 22.20, "end": 22.98, "accent": True},
                    {"text": "hi", "start": 22.98, "end": 23.40, "accent": False},
                    {"text": "naam", "start": 23.40, "end": 23.98, "accent": True},
                    {"text": "likha", "start": 23.98, "end": 24.30, "accent": False},
                    {"text": "maine,", "start": 24.30, "end": 24.54, "accent": False}
                ]
            },
            {
                "id": "line_02_02",
                "text": "Formula saare bhula ke bhi, bas tujhko yaad rakha maine.",
                "words": [
                    {"text": "Formula", "start": 24.54, "end": 25.48, "accent": False},
                    {"text": "saare", "start": 25.48, "end": 26.14, "accent": False},
                    {"text": "bhula", "start": 26.14, "end": 26.38, "accent": False},
                    {"text": "ke", "start": 26.38, "end": 26.74, "accent": False},
                    {"text": "bhi,", "start": 26.74, "end": 27.10, "accent": False},
                    {"text": "bas", "start": 27.10, "end": 27.40, "accent": False},
                    {"text": "tujhko", "start": 27.40, "end": 28.00, "accent": True},
                    {"text": "yaad", "start": 28.00, "end": 28.60, "accent": True},
                    {"text": "rakha", "start": 28.60, "end": 29.00, "accent": False},
                    {"text": "maine.", "start": 29.00, "end": 29.50, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_03_classroom",
        "name": "Classroom Noise & Cycle Rush",
        "sectionTag": "03 // MUKHDA  •  CHHUTTI KI GHANTI",
        "startSec": 29.5,
        "endSec": 50.0,
        "subtitle": "Unspoken heartbeats • Racing cycles when the bell rings",
        "lines": [
            {
                "id": "line_03_01",
                "text": "Class mein dhyan lagata hoon, par nazrein tujh pe rehti hain,",
                "words": [
                    {"text": "Class", "start": 29.60, "end": 30.50, "accent": False},
                    {"text": "mein", "start": 30.50, "end": 30.80, "accent": False},
                    {"text": "dhyan", "start": 30.80, "end": 31.40, "accent": False},
                    {"text": "lagata", "start": 31.40, "end": 31.90, "accent": False},
                    {"text": "hoon,", "start": 31.90, "end": 32.20, "accent": False},
                    {"text": "par", "start": 32.20, "end": 32.60, "accent": False},
                    {"text": "nazrein", "start": 32.60, "end": 33.20, "accent": True},
                    {"text": "tujh", "start": 33.20, "end": 33.60, "accent": False},
                    {"text": "pe", "start": 33.60, "end": 33.90, "accent": False},
                    {"text": "rehti", "start": 33.90, "end": 34.30, "accent": False},
                    {"text": "hain,", "start": 34.30, "end": 34.60, "accent": False}
                ]
            },
            {
                "id": "line_03_02",
                "text": "Dhadkanein meri bina kahe, kitna kuch tujhse kehti hain!",
                "words": [
                    {"text": "Dhadkanein", "start": 34.60, "end": 35.60, "accent": True},
                    {"text": "meri", "start": 35.60, "end": 36.10, "accent": False},
                    {"text": "bina", "start": 36.10, "end": 36.60, "accent": False},
                    {"text": "kahe,", "start": 36.60, "end": 37.00, "accent": False},
                    {"text": "kitna", "start": 37.00, "end": 37.70, "accent": False},
                    {"text": "kuch", "start": 37.70, "end": 38.10, "accent": False},
                    {"text": "tujhse", "start": 38.10, "end": 38.70, "accent": True},
                    {"text": "kehti", "start": 38.70, "end": 39.20, "accent": False},
                    {"text": "hain!", "start": 39.20, "end": 39.60, "accent": False}
                ]
            },
            {
                "id": "line_03_03",
                "text": "Haan chhutti ki ghanti bajte hi, dil cycle tez chalata hai,",
                "words": [
                    {"text": "Haan", "start": 39.70, "end": 40.20, "accent": False},
                    {"text": "chhutti", "start": 40.20, "end": 40.60, "accent": False},
                    {"text": "ki", "start": 40.60, "end": 40.80, "accent": False},
                    {"text": "ghanti", "start": 40.80, "end": 41.20, "accent": True},
                    {"text": "bajte", "start": 41.20, "end": 41.80, "accent": False},
                    {"text": "hi,", "start": 41.80, "end": 42.10, "accent": False},
                    {"text": "dil", "start": 42.10, "end": 42.60, "accent": False},
                    {"text": "cycle", "start": 42.60, "end": 43.10, "accent": True},
                    {"text": "tez", "start": 43.10, "end": 43.70, "accent": True},
                    {"text": "chalata", "start": 43.70, "end": 44.20, "accent": False},
                    {"text": "hai,", "start": 44.20, "end": 44.60, "accent": False}
                ]
            },
            {
                "id": "line_03_04",
                "text": "Rough copy ke aakhri panne pe, tera hi naam likha maine.",
                "words": [
                    {"text": "Rough", "start": 44.70, "end": 45.20, "accent": False},
                    {"text": "copy", "start": 45.20, "end": 45.60, "accent": False},
                    {"text": "ke", "start": 45.60, "end": 45.80, "accent": False},
                    {"text": "aakhri", "start": 45.80, "end": 46.40, "accent": False},
                    {"text": "panne", "start": 46.40, "end": 47.00, "accent": False},
                    {"text": "pe,", "start": 47.00, "end": 47.50, "accent": False},
                    {"text": "tera", "start": 47.50, "end": 48.20, "accent": True},
                    {"text": "hi", "start": 48.20, "end": 48.60, "accent": False},
                    {"text": "naam", "start": 48.60, "end": 49.10, "accent": True},
                    {"text": "likha", "start": 49.10, "end": 49.50, "accent": False},
                    {"text": "maine.", "start": 49.50, "end": 50.00, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_04_interlude_one",
        "name": "Interlude 1 - Corridor Reverie",
        "sectionTag": "04 // INTERLUDE  •  SUNLIT CORRIDOR",
        "startSec": 50.0,
        "endSec": 60.1,
        "subtitle": "Chalk dust floating in afternoon sunbeams • Acoustic warmth",
        "lines": [
            {
                "id": "line_04_interlude",
                "text": "Woh recess ki thodi jaldi mein...",
                "words": [
                    {"text": "Afternoon", "start": 51.0, "end": 53.0, "accent": False},
                    {"text": "Bell", "start": 53.0, "end": 55.0, "accent": True},
                    {"text": "Corridor", "start": 55.0, "end": 57.5, "accent": False},
                    {"text": "Echoes", "start": 57.5, "end": 59.8, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_05_antara1",
        "name": "Recess Collision & Borrowed Blue Pen",
        "sectionTag": "05 // ANTARA 1  •  BLUE INK PEN",
        "startSec": 60.1,
        "endSec": 80.5,
        "subtitle": "A hurried sorry • A pen never returned • Attendance roll call",
        "lines": [
            {
                "id": "line_05_01",
                "text": "Woh recess ki thodi jaldi mein, corridor mein takraana tera,",
                "words": [
                    {"text": "Woh", "start": 60.10, "end": 60.70, "accent": False},
                    {"text": "recess", "start": 60.70, "end": 61.20, "accent": True},
                    {"text": "ki", "start": 61.20, "end": 61.40, "accent": False},
                    {"text": "thodi", "start": 61.40, "end": 61.80, "accent": False},
                    {"text": "jaldi", "start": 61.80, "end": 62.30, "accent": False},
                    {"text": "mein,", "start": 62.30, "end": 62.60, "accent": False},
                    {"text": "corridor", "start": 62.60, "end": 63.30, "accent": False},
                    {"text": "mein", "start": 63.30, "end": 63.50, "accent": False},
                    {"text": "takraana", "start": 63.50, "end": 64.20, "accent": True},
                    {"text": "tera,", "start": 64.20, "end": 64.60, "accent": False}
                ]
            },
            {
                "id": "line_05_02",
                "text": "Sorry keh kar halke se, nazrein jhuka ke muskuraana tera.",
                "words": [
                    {"text": "Sorry", "start": 64.80, "end": 66.00, "accent": True},
                    {"text": "keh", "start": 66.00, "end": 66.30, "accent": False},
                    {"text": "kar", "start": 66.30, "end": 66.60, "accent": False},
                    {"text": "halke", "start": 66.60, "end": 67.00, "accent": False},
                    {"text": "se,", "start": 67.00, "end": 67.20, "accent": False},
                    {"text": "nazrein", "start": 67.20, "end": 67.80, "accent": True},
                    {"text": "jhuka", "start": 67.80, "end": 68.30, "accent": False},
                    {"text": "ke", "start": 68.30, "end": 68.60, "accent": False},
                    {"text": "muskuraana", "start": 68.60, "end": 69.40, "accent": True},
                    {"text": "tera.", "start": 69.40, "end": 69.80, "accent": False}
                ]
            },
            {
                "id": "line_05_03",
                "text": "Ik blue ink pen jo maangi thi, maine aaj talak lautayi nahi,",
                "words": [
                    {"text": "Ik", "start": 70.00, "end": 70.80, "accent": False},
                    {"text": "blue", "start": 70.80, "end": 71.20, "accent": True},
                    {"text": "ink", "start": 71.20, "end": 71.60, "accent": True},
                    {"text": "pen", "start": 71.60, "end": 72.00, "accent": True},
                    {"text": "jo", "start": 72.00, "end": 72.30, "accent": False},
                    {"text": "maangi", "start": 72.30, "end": 72.80, "accent": False},
                    {"text": "thi,", "start": 72.80, "end": 73.10, "accent": False},
                    {"text": "maine", "start": 73.10, "end": 73.50, "accent": False},
                    {"text": "aaj", "start": 73.50, "end": 73.90, "accent": False},
                    {"text": "talak", "start": 73.90, "end": 74.50, "accent": False},
                    {"text": "lautayi", "start": 74.50, "end": 75.10, "accent": False},
                    {"text": "nahi,", "start": 75.10, "end": 75.50, "accent": False}
                ]
            },
            {
                "id": "line_05_04",
                "text": "Us din se dosti dhoondhi thi, par aage baat badhayi nahi.",
                "words": [
                    {"text": "Us", "start": 75.70, "end": 76.10, "accent": False},
                    {"text": "din", "start": 76.10, "end": 76.40, "accent": False},
                    {"text": "se", "start": 76.40, "end": 76.60, "accent": False},
                    {"text": "dosti", "start": 76.60, "end": 77.20, "accent": True},
                    {"text": "dhoondhi", "start": 77.20, "end": 77.80, "accent": False},
                    {"text": "thi,", "start": 77.80, "end": 78.10, "accent": False},
                    {"text": "par", "start": 78.10, "end": 78.50, "accent": False},
                    {"text": "aage", "start": 78.50, "end": 79.10, "accent": False},
                    {"text": "baat", "start": 79.10, "end": 79.50, "accent": False},
                    {"text": "badhayi", "start": 79.50, "end": 80.10, "accent": False},
                    {"text": "nahi.", "start": 80.10, "end": 80.50, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_06_rollcall",
        "name": "Roll Call Attendance & Front Bench Sunshine",
        "sectionTag": "06 // ANTARA 1  •  PRESENT MISS",
        "startSec": 80.5,
        "endSec": 92.0,
        "subtitle": "Her voice answering the register • Golden afternoon light",
        "lines": [
            {
                "id": "line_06_01",
                "text": "Jab roll call pe tu Present kahe, mera dil be-wajah hi jhoome hai,",
                "words": [
                    {"text": "Jab", "start": 80.70, "end": 81.00, "accent": False},
                    {"text": "roll", "start": 81.00, "end": 81.40, "accent": False},
                    {"text": "call", "start": 81.40, "end": 81.80, "accent": False},
                    {"text": "pe", "start": 81.80, "end": 82.00, "accent": False},
                    {"text": "tu", "start": 82.00, "end": 82.30, "accent": False},
                    {"text": "Present", "start": 82.30, "end": 82.90, "accent": True},
                    {"text": "kahe,", "start": 82.90, "end": 83.20, "accent": False},
                    {"text": "mera", "start": 83.20, "end": 83.60, "accent": False},
                    {"text": "dil", "start": 83.60, "end": 84.00, "accent": False},
                    {"text": "be-wajah", "start": 84.00, "end": 84.80, "accent": False},
                    {"text": "hi", "start": 84.80, "end": 85.00, "accent": False},
                    {"text": "jhoome", "start": 85.00, "end": 85.50, "accent": True},
                    {"text": "hai,", "start": 85.50, "end": 85.80, "accent": False}
                ]
            },
            {
                "id": "line_06_02",
                "text": "Tu aage ki bench pe baithi rahe, aur dhoop tere rukh choome hai.",
                "words": [
                    {"text": "Tu", "start": 85.80, "end": 86.20, "accent": False},
                    {"text": "aage", "start": 86.20, "end": 86.60, "accent": False},
                    {"text": "ki", "start": 86.60, "end": 86.80, "accent": False},
                    {"text": "bench", "start": 86.80, "end": 87.30, "accent": True},
                    {"text": "pe", "start": 87.30, "end": 87.50, "accent": False},
                    {"text": "baithi", "start": 87.50, "end": 88.00, "accent": False},
                    {"text": "rahe,", "start": 88.00, "end": 88.30, "accent": False},
                    {"text": "aur", "start": 88.30, "end": 88.70, "accent": False},
                    {"text": "dhoop", "start": 88.70, "end": 89.40, "accent": True},
                    {"text": "tere", "start": 89.40, "end": 89.80, "accent": False},
                    {"text": "rukh", "start": 89.80, "end": 90.30, "accent": False},
                    {"text": "choome", "start": 90.30, "end": 91.00, "accent": True},
                    {"text": "hai.", "start": 91.00, "end": 91.50, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_07_mukhda_reprise",
        "name": "Mukhda Reprise & Nostalgia Chorus",
        "sectionTag": "07 // CHORUS  •  REPRISE",
        "startSec": 92.0,
        "endSec": 114.0,
        "subtitle": "Rough copy notes • The unforgettable classroom anthem",
        "lines": [
            {
                "id": "line_07_01",
                "text": "Rough copy ke aakhri panne pe, tera hi naam likha maine,",
                "words": [
                    {"text": "Rough", "start": 92.20, "end": 93.10, "accent": False},
                    {"text": "copy", "start": 93.10, "end": 93.60, "accent": False},
                    {"text": "ke", "start": 93.60, "end": 93.80, "accent": False},
                    {"text": "aakhri", "start": 93.80, "end": 94.40, "accent": False},
                    {"text": "panne", "start": 94.40, "end": 94.90, "accent": False},
                    {"text": "pe,", "start": 94.90, "end": 95.50, "accent": False},
                    {"text": "tera", "start": 95.50, "end": 96.20, "accent": True},
                    {"text": "hi", "start": 96.20, "end": 96.60, "accent": False},
                    {"text": "naam", "start": 96.60, "end": 97.20, "accent": True},
                    {"text": "likha", "start": 97.20, "end": 97.60, "accent": False},
                    {"text": "maine,", "start": 97.60, "end": 97.90, "accent": False}
                ]
            },
            {
                "id": "line_07_02",
                "text": "Formula saare bhula ke bhi, bas tujhko yaad rakha maine.",
                "words": [
                    {"text": "Formula", "start": 97.90, "end": 98.70, "accent": False},
                    {"text": "saare", "start": 98.70, "end": 99.30, "accent": False},
                    {"text": "bhula", "start": 99.30, "end": 99.60, "accent": False},
                    {"text": "ke", "start": 99.60, "end": 99.90, "accent": False},
                    {"text": "bhi,", "start": 99.90, "end": 100.30, "accent": False},
                    {"text": "bas", "start": 100.30, "end": 100.60, "accent": False},
                    {"text": "tujhko", "start": 100.60, "end": 101.20, "accent": True},
                    {"text": "yaad", "start": 101.20, "end": 101.80, "accent": True},
                    {"text": "rakha", "start": 101.80, "end": 102.30, "accent": False},
                    {"text": "maine.", "start": 102.30, "end": 102.70, "accent": False}
                ]
            },
            {
                "id": "line_07_03",
                "text": "Haan chhutti ki ghanti bajte hi, dil cycle tez chalata hai,",
                "words": [
                    {"text": "Haan", "start": 102.80, "end": 103.30, "accent": False},
                    {"text": "chhutti", "start": 103.30, "end": 103.70, "accent": False},
                    {"text": "ki", "start": 103.70, "end": 103.90, "accent": False},
                    {"text": "ghanti", "start": 103.90, "end": 104.40, "accent": True},
                    {"text": "bajte", "start": 104.40, "end": 105.00, "accent": False},
                    {"text": "hi,", "start": 105.00, "end": 105.30, "accent": False},
                    {"text": "dil", "start": 105.30, "end": 105.80, "accent": False},
                    {"text": "cycle", "start": 105.80, "end": 106.30, "accent": True},
                    {"text": "tez", "start": 106.30, "end": 106.90, "accent": True},
                    {"text": "chalata", "start": 106.90, "end": 107.40, "accent": False},
                    {"text": "hai,", "start": 107.40, "end": 107.80, "accent": False}
                ]
            },
            {
                "id": "line_07_04",
                "text": "Rough copy ke aakhri panne pe, tera hi naam likha maine.",
                "words": [
                    {"text": "Rough", "start": 107.90, "end": 108.30, "accent": False},
                    {"text": "copy", "start": 108.30, "end": 108.70, "accent": False},
                    {"text": "ke", "start": 108.70, "end": 108.90, "accent": False},
                    {"text": "aakhri", "start": 108.90, "end": 109.50, "accent": False},
                    {"text": "panne", "start": 109.50, "end": 110.10, "accent": False},
                    {"text": "pe,", "start": 110.10, "end": 110.70, "accent": False},
                    {"text": "tera", "start": 110.70, "end": 111.30, "accent": True},
                    {"text": "hi", "start": 111.30, "end": 111.70, "accent": False},
                    {"text": "naam", "start": 111.70, "end": 112.30, "accent": True},
                    {"text": "likha", "start": 112.30, "end": 113.00, "accent": False},
                    {"text": "maine.", "start": 113.00, "end": 113.80, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_08_interlude_two",
        "name": "Interlude 2 - Cycle Stand Sunset",
        "sectionTag": "08 // INTERLUDE  •  CYCLE STAND",
        "startSec": 114.0,
        "endSec": 123.3,
        "subtitle": "Waiting by the pedals • Shadows lengthening across the playground",
        "lines": [
            {
                "id": "line_08_interlude",
                "text": "Cycle stand pe rukta hoon...",
                "words": [
                    {"text": "School", "start": 115.0, "end": 117.0, "accent": False},
                    {"text": "Gate", "start": 117.0, "end": 119.0, "accent": False},
                    {"text": "Evening", "start": 119.0, "end": 121.0, "accent": True},
                    {"text": "Glow", "start": 121.0, "end": 123.0, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_09_antara2",
        "name": "Cycle Stand & Mirror Rehearsal",
        "sectionTag": "09 // ANTARA 2  •  MIRROR HI",
        "startSec": 123.3,
        "endSec": 153.8,
        "subtitle": "Watching her bus depart • Rehearsing 'Hi' in the bedroom mirror",
        "lines": [
            {
                "id": "line_09_01",
                "text": "Cycle stand pe rukta hoon, jab tak tu bag uthati nahi,",
                "words": [
                    {"text": "Cycle", "start": 123.30, "end": 124.50, "accent": True},
                    {"text": "stand", "start": 124.50, "end": 125.00, "accent": False},
                    {"text": "pe", "start": 125.00, "end": 125.40, "accent": False},
                    {"text": "rukta", "start": 125.40, "end": 125.80, "accent": False},
                    {"text": "hoon,", "start": 125.80, "end": 126.20, "accent": False},
                    {"text": "jab", "start": 126.20, "end": 126.50, "accent": False},
                    {"text": "tak", "start": 126.50, "end": 127.00, "accent": False},
                    {"text": "tu", "start": 127.00, "end": 127.40, "accent": False},
                    {"text": "bag", "start": 127.40, "end": 127.90, "accent": True},
                    {"text": "uthati", "start": 127.90, "end": 128.30, "accent": False},
                    {"text": "nahi,", "start": 128.30, "end": 128.60, "accent": False}
                ]
            },
            {
                "id": "line_09_02",
                "text": "Teri bus jab tak mud na jaaye, chain se shaam aati nahi.",
                "words": [
                    {"text": "Teri", "start": 128.70, "end": 129.20, "accent": False},
                    {"text": "bus", "start": 129.20, "end": 129.70, "accent": True},
                    {"text": "jab", "start": 129.70, "end": 130.00, "accent": False},
                    {"text": "tak", "start": 130.00, "end": 130.30, "accent": False},
                    {"text": "mud", "start": 130.30, "end": 130.80, "accent": False},
                    {"text": "na", "start": 130.80, "end": 131.20, "accent": False},
                    {"text": "jaaye,", "start": 131.20, "end": 131.60, "accent": False},
                    {"text": "chain", "start": 131.60, "end": 132.00, "accent": False},
                    {"text": "se", "start": 132.00, "end": 132.30, "accent": False},
                    {"text": "shaam", "start": 132.30, "end": 132.90, "accent": True},
                    {"text": "aati", "start": 132.90, "end": 133.20, "accent": False},
                    {"text": "nahi.", "start": 133.20, "end": 133.50, "accent": False}
                ]
            },
            {
                "id": "line_09_03",
                "text": "Ghar aake kitaabein kholta hoon, homework toh bas bahaana hai,",
                "words": [
                    {"text": "Ghar", "start": 133.50, "end": 134.10, "accent": False},
                    {"text": "aake", "start": 134.10, "end": 134.50, "accent": False},
                    {"text": "kitaabein", "start": 134.50, "end": 135.30, "accent": False},
                    {"text": "kholta", "start": 135.30, "end": 135.90, "accent": False},
                    {"text": "hoon,", "start": 135.90, "end": 136.30, "accent": False},
                    {"text": "homework", "start": 136.30, "end": 137.00, "accent": True},
                    {"text": "toh", "start": 137.00, "end": 137.30, "accent": False},
                    {"text": "bas", "start": 137.30, "end": 137.60, "accent": False},
                    {"text": "bahaana", "start": 137.60, "end": 138.20, "accent": False},
                    {"text": "hai,", "start": 138.20, "end": 138.60, "accent": False}
                ]
            },
            {
                "id": "line_09_04",
                "text": "History ke soye panno mein, bas tera zikr sajaana hai.",
                "words": [
                    {"text": "History", "start": 138.80, "end": 139.70, "accent": True},
                    {"text": "ke", "start": 139.70, "end": 139.90, "accent": False},
                    {"text": "soye", "start": 139.90, "end": 140.30, "accent": False},
                    {"text": "panno", "start": 140.30, "end": 140.90, "accent": False},
                    {"text": "mein,", "start": 140.90, "end": 141.20, "accent": False},
                    {"text": "bas", "start": 141.20, "end": 141.60, "accent": False},
                    {"text": "tera", "start": 141.60, "end": 142.20, "accent": True},
                    {"text": "zikr", "start": 142.20, "end": 142.80, "accent": False},
                    {"text": "sajaana", "start": 142.80, "end": 143.40, "accent": False},
                    {"text": "hai.", "start": 143.40, "end": 143.70, "accent": False}
                ]
            },
            {
                "id": "line_09_05",
                "text": "Doston ne chheda kitni dafa, main jhoothi kasmein khata hoon,",
                "words": [
                    {"text": "Doston", "start": 143.80, "end": 144.70, "accent": True},
                    {"text": "ne", "start": 144.70, "end": 144.90, "accent": False},
                    {"text": "chheda", "start": 144.90, "end": 145.40, "accent": False},
                    {"text": "kitni", "start": 145.40, "end": 145.90, "accent": False},
                    {"text": "dafa,", "start": 145.90, "end": 146.30, "accent": False},
                    {"text": "main", "start": 146.30, "end": 146.60, "accent": False},
                    {"text": "jhoothi", "start": 146.60, "end": 147.20, "accent": False},
                    {"text": "kasmein", "start": 147.20, "end": 147.80, "accent": False},
                    {"text": "khata", "start": 147.80, "end": 148.20, "accent": False},
                    {"text": "hoon,", "start": 148.20, "end": 148.50, "accent": False}
                ]
            },
            {
                "id": "line_09_06",
                "text": "Par aaine ke aage khade, tujhe Hi kehne sharmata hoon!",
                "words": [
                    {"text": "Par", "start": 148.50, "end": 149.20, "accent": False},
                    {"text": "aaine", "start": 149.20, "end": 149.70, "accent": True},
                    {"text": "ke", "start": 149.70, "end": 149.90, "accent": False},
                    {"text": "aage", "start": 149.90, "end": 150.30, "accent": False},
                    {"text": "khade,", "start": 150.30, "end": 150.70, "accent": False},
                    {"text": "tujhe", "start": 150.70, "end": 151.40, "accent": False},
                    {"text": "Hi", "start": 151.40, "end": 152.00, "accent": True},
                    {"text": "kehne", "start": 152.00, "end": 152.50, "accent": False},
                    {"text": "sharmata", "start": 152.50, "end": 153.30, "accent": True},
                    {"text": "hoon!", "start": 153.30, "end": 153.80, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_10_bridge",
        "name": "Bridge - Courage Beyond The Last Bench",
        "sectionTag": "10 // BRIDGE  •  EK DAFA DEKHNA",
        "startSec": 153.8,
        "endSec": 175.7,
        "subtitle": "One day I'll step forward • Just one glance is enough",
        "lines": [
            {
                "id": "line_10_01",
                "text": "Kabhi toh aakhri bench se aage, main himmat karke aaunga,",
                "words": [
                    {"text": "Kabhi", "start": 153.80, "end": 154.20, "accent": False},
                    {"text": "toh", "start": 154.20, "end": 154.40, "accent": False},
                    {"text": "aakhri", "start": 154.40, "end": 154.90, "accent": False},
                    {"text": "bench", "start": 154.90, "end": 155.40, "accent": True},
                    {"text": "se", "start": 155.40, "end": 155.60, "accent": False},
                    {"text": "aage,", "start": 155.60, "end": 156.10, "accent": False},
                    {"text": "main", "start": 156.10, "end": 156.60, "accent": False},
                    {"text": "himmat", "start": 156.60, "end": 157.30, "accent": True},
                    {"text": "karke", "start": 157.30, "end": 157.70, "accent": False},
                    {"text": "aaunga,", "start": 157.70, "end": 158.20, "accent": False}
                ]
            },
            {
                "id": "line_10_02",
                "text": "Tujhe rough copy ka har panna, chupke se dikhlaunga.",
                "words": [
                    {"text": "Tujhe", "start": 158.30, "end": 159.30, "accent": False},
                    {"text": "rough", "start": 159.30, "end": 159.70, "accent": True},
                    {"text": "copy", "start": 159.70, "end": 160.10, "accent": True},
                    {"text": "ka", "start": 160.10, "end": 160.30, "accent": False},
                    {"text": "har", "start": 160.30, "end": 160.60, "accent": False},
                    {"text": "panna,", "start": 160.60, "end": 161.40, "accent": False},
                    {"text": "chupke", "start": 161.40, "end": 162.00, "accent": False},
                    {"text": "se", "start": 162.00, "end": 162.40, "accent": False},
                    {"text": "dikhlaunga.", "start": 162.40, "end": 163.20, "accent": True}
                ]
            },
            {
                "id": "line_10_03",
                "text": "Yeh darr bhi hai ke tu hans na de, par umeed bhi thodi baaqi hai,",
                "words": [
                    {"text": "Yeh", "start": 163.40, "end": 164.00, "accent": False},
                    {"text": "darr", "start": 164.00, "end": 164.60, "accent": True},
                    {"text": "bhi", "start": 164.60, "end": 164.90, "accent": False},
                    {"text": "hai", "start": 164.90, "end": 165.10, "accent": False},
                    {"text": "ke", "start": 165.10, "end": 165.30, "accent": False},
                    {"text": "tu", "start": 165.30, "end": 165.60, "accent": False},
                    {"text": "hans", "start": 165.60, "end": 166.10, "accent": False},
                    {"text": "na", "start": 166.10, "end": 166.40, "accent": False},
                    {"text": "de,", "start": 166.40, "end": 166.70, "accent": False},
                    {"text": "par", "start": 166.70, "end": 167.00, "accent": False},
                    {"text": "umeed", "start": 167.00, "end": 167.50, "accent": True},
                    {"text": "bhi", "start": 167.50, "end": 167.80, "accent": False},
                    {"text": "thodi", "start": 167.80, "end": 168.20, "accent": False},
                    {"text": "baaqi", "start": 168.20, "end": 168.60, "accent": False},
                    {"text": "hai,", "start": 168.60, "end": 168.90, "accent": False}
                ]
            },
            {
                "id": "line_10_04",
                "text": "Tera mud ke ek dafa dekhna, bas itna hi kaafi hai...",
                "words": [
                    {"text": "Tera", "start": 168.90, "end": 169.30, "accent": False},
                    {"text": "mud", "start": 169.30, "end": 169.60, "accent": False},
                    {"text": "ke", "start": 169.60, "end": 169.80, "accent": False},
                    {"text": "ek", "start": 169.80, "end": 170.20, "accent": False},
                    {"text": "dafa", "start": 170.20, "end": 170.60, "accent": False},
                    {"text": "dekhna,", "start": 170.60, "end": 171.30, "accent": True},
                    {"text": "bas", "start": 171.30, "end": 171.80, "accent": False},
                    {"text": "itna", "start": 171.80, "end": 172.40, "accent": False},
                    {"text": "hi", "start": 172.40, "end": 172.70, "accent": False},
                    {"text": "kaafi", "start": 172.70, "end": 173.20, "accent": True},
                    {"text": "hai...", "start": 173.20, "end": 173.40, "accent": False}
                ]
            },
            {
                "id": "line_10_05",
                "text": "Haan itna hi kaafi hai!",
                "words": [
                    {"text": "Haan", "start": 173.40, "end": 174.00, "accent": False},
                    {"text": "itna", "start": 174.00, "end": 174.60, "accent": True},
                    {"text": "hi", "start": 174.60, "end": 175.00, "accent": False},
                    {"text": "kaafi", "start": 175.00, "end": 175.50, "accent": True},
                    {"text": "hai!", "start": 175.50, "end": 175.70, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_11_outro",
        "name": "Outro - Final Period Bell & Notebook Close",
        "sectionTag": "11 // OUTRO  •  LAST BELL",
        "startSec": 175.7,
        "endSec": 198.37,
        "subtitle": "Rough copy gently closed in bag • A sweet innocent memory preserved",
        "lines": [
            {
                "id": "line_11_01",
                "text": "Rough copy ke aakhri panne pe... tera hi naam likha maine...",
                "words": [
                    {"text": "Rough", "start": 175.90, "end": 176.40, "accent": False},
                    {"text": "copy", "start": 176.40, "end": 176.80, "accent": False},
                    {"text": "ke", "start": 176.80, "end": 177.00, "accent": False},
                    {"text": "aakhri", "start": 177.00, "end": 177.60, "accent": False},
                    {"text": "panne", "start": 177.60, "end": 178.20, "accent": False},
                    {"text": "pe...", "start": 178.20, "end": 178.60, "accent": False},
                    {"text": "tera", "start": 178.60, "end": 179.20, "accent": True},
                    {"text": "hi", "start": 179.20, "end": 179.50, "accent": False},
                    {"text": "naam", "start": 179.50, "end": 180.00, "accent": True},
                    {"text": "likha", "start": 180.00, "end": 180.30, "accent": False},
                    {"text": "maine...", "start": 180.30, "end": 180.60, "accent": False}
                ]
            },
            {
                "id": "line_11_02",
                "text": "Bas maths ke aakhri period mein, tujhko hi yaad rakha maine...",
                "words": [
                    {"text": "Bas", "start": 180.60, "end": 181.20, "accent": False},
                    {"text": "maths", "start": 181.20, "end": 181.70, "accent": True},
                    {"text": "ke", "start": 181.70, "end": 181.90, "accent": False},
                    {"text": "aakhri", "start": 181.90, "end": 182.50, "accent": False},
                    {"text": "period", "start": 182.50, "end": 183.10, "accent": True},
                    {"text": "mein,", "start": 183.10, "end": 183.40, "accent": False},
                    {"text": "tujhko", "start": 183.40, "end": 184.10, "accent": True},
                    {"text": "hi", "start": 184.10, "end": 184.40, "accent": False},
                    {"text": "yaad", "start": 184.40, "end": 184.90, "accent": True},
                    {"text": "rakha", "start": 184.90, "end": 185.30, "accent": False},
                    {"text": "maine...", "start": 185.30, "end": 186.00, "accent": False}
                ]
            }
        ]
    }
]

# Convert all seconds to integer frames at 60 FPS
# Validate monotonicity and strictly non-overlapping boundaries

timeline = {
    "songTitle": "Rough Copy (School Crush Song)",
    "fps": 60,
    "bpm": 96,
    "audioFile": "audio/rough_copy.mp3",
    "scenes": []
}

word_counter = 1

for sc_idx, sc in enumerate(scenes_raw):
    sc_start_f = f(sc["startSec"])
    sc_end_f = f(sc["endSec"])

    # Ensure previous scene ends before or at this start
    if timeline["scenes"]:
        timeline["scenes"][-1]["endFrame"] = sc_start_f

    scene_obj = {
        "id": sc["id"],
        "name": sc["name"],
        "sectionTag": sc["sectionTag"],
        "startFrame": sc_start_f,
        "endFrame": sc_end_f,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "herbarium_notebook",
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
            
            # Boundary containment check
            if w_end_f > sc_end_f:
                w_end_f = sc_end_f

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

# Ensure the last scene extends to full audio duration (198.367s = 11902 frames)
total_frames = int(round(198.367 * 60))
timeline["scenes"][-1]["endFrame"] = total_frames

os.makedirs("src/songs/rough-copy", exist_ok=True)
output_path = "src/songs/rough-copy/timeline.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Successfully generated 60 FPS timeline with {len(timeline['scenes'])} scenes and {word_counter-1} words.")
print(f"[✓] Saved to {output_path}")
