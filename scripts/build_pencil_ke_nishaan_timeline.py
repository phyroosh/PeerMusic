#!/usr/bin/env python3
"""
Frame-Accurate 60 FPS Timeline Generator for 'Pencil Ke Nishaan (School Crush Ballad)'
Audio: public/audio/pencil_ke_nishaan.mp3 (246.927 seconds = 14816 frames @ 60 FPS)
Theme: Botanical Scrapbook (Classroom 10-B Nostalgia)
"""

import os
import json

fps = 60
total_duration_sec = 246.927
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_raw = [
    {
        "id": "scene_01_intro",
        "name": "Classroom Window & Assembly Bell",
        "sectionTag": "01 // INTRO  •  CLASS 10-B",
        "startSec": 0.0,
        "endSec": 18.0,
        "subtitle": "Nostalgic acoustic fingerstyle • Morning assembly bells echo across the campus",
        "lines": []
    },
    {
        "id": "scene_02_mukhda_assembly",
        "name": "Assembly Prayer & Stolen Glances",
        "sectionTag": "02 // MUKHDA  •  MORNING ASSEMBLY",
        "startSec": 18.0,
        "endSec": 33.8,
        "subtitle": "Folded hands in prayer • Eyes searching across the courtyard queue",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Subah ki assembly mein haath jab judte the,",
                "words": [
                    {"text": "Subah", "start": 18.2, "end": 19.8, "accent": True},
                    {"text": "ki", "start": 19.8, "end": 20.6, "accent": False},
                    {"text": "assembly", "start": 20.6, "end": 22.4, "accent": True},
                    {"text": "mein", "start": 22.4, "end": 23.6, "accent": False},
                    {"text": "haath", "start": 24.8, "end": 26.1, "accent": False},
                    {"text": "jab", "start": 26.1, "end": 26.4, "accent": False},
                    {"text": "judte", "start": 26.4, "end": 27.2, "accent": False},
                    {"text": "the,", "start": 27.2, "end": 27.8, "accent": False}
                ]
            },
            {
                "id": "line_02_02",
                "text": "Duaon ke beech nazrein bas tujhpe rukti thi.",
                "words": [
                    {"text": "Duaon", "start": 28.5, "end": 29.3, "accent": True},
                    {"text": "ke", "start": 29.3, "end": 29.6, "accent": False},
                    {"text": "beech", "start": 29.6, "end": 30.3, "accent": False},
                    {"text": "nazrein", "start": 30.3, "end": 31.0, "accent": True},
                    {"text": "bas", "start": 31.0, "end": 31.4, "accent": False},
                    {"text": "tujhpe", "start": 31.4, "end": 32.1, "accent": True},
                    {"text": "rukti", "start": 32.1, "end": 32.7, "accent": False},
                    {"text": "thi.", "start": 32.7, "end": 33.5, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_03_mukhda_sunlight",
        "name": "Third Period Slanted Sunlight",
        "sectionTag": "03 // MUKHDA  •  THIRD PERIOD",
        "startSec": 33.8,
        "endSec": 46.8,
        "subtitle": "Warm light across wooden desks • Attention slipping from open pages",
        "lines": [
            {
                "id": "line_03_01",
                "text": "Third period ki dhoop jab bench pe aati thi,",
                "words": [
                    {"text": "Third", "start": 34.2, "end": 34.9, "accent": True},
                    {"text": "period", "start": 34.9, "end": 35.3, "accent": False},
                    {"text": "ki", "start": 35.3, "end": 35.7, "accent": False},
                    {"text": "dhoop", "start": 35.7, "end": 36.4, "accent": True},
                    {"text": "jab", "start": 36.4, "end": 37.1, "accent": False},
                    {"text": "bench", "start": 37.1, "end": 37.7, "accent": False},
                    {"text": "pe", "start": 37.7, "end": 38.1, "accent": False},
                    {"text": "aati", "start": 38.1, "end": 38.7, "accent": False},
                    {"text": "thi,", "start": 38.7, "end": 39.8, "accent": False}
                ]
            },
            {
                "id": "line_03_02",
                "text": "Mera dhyan kitaabon se chura le jaati thi.",
                "words": [
                    {"text": "Mera", "start": 40.8, "end": 41.5, "accent": False},
                    {"text": "dhyan", "start": 41.5, "end": 41.9, "accent": True},
                    {"text": "kitaabon", "start": 41.9, "end": 42.8, "accent": False},
                    {"text": "se", "start": 42.8, "end": 43.1, "accent": False},
                    {"text": "chura", "start": 43.1, "end": 43.8, "accent": True},
                    {"text": "le", "start": 43.8, "end": 44.1, "accent": False},
                    {"text": "jaati", "start": 44.1, "end": 44.7, "accent": False},
                    {"text": "thi.", "start": 44.7, "end": 46.2, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_04_mukhda_hook",
        "name": "Pencil Marks & Erased Initials",
        "sectionTag": "04 // MUKHDA  •  THE CENTRAL HOOK",
        "startSec": 46.8,
        "endSec": 72.0,
        "subtitle": "Written in graphite, erased in fear • The deep impression that never leaves",
        "lines": [
            {
                "id": "line_04_01",
                "text": "Pencil se likha tha tera naam desk par,",
                "words": [
                    {"text": "Pencil", "start": 47.4, "end": 48.3, "accent": True},
                    {"text": "se", "start": 48.3, "end": 48.7, "accent": False},
                    {"text": "likha", "start": 48.7, "end": 49.3, "accent": False},
                    {"text": "tha", "start": 49.3, "end": 49.8, "accent": False},
                    {"text": "tera", "start": 49.8, "end": 50.7, "accent": True},
                    {"text": "naam", "start": 50.7, "end": 51.4, "accent": True},
                    {"text": "desk", "start": 51.4, "end": 51.8, "accent": False},
                    {"text": "par,", "start": 51.8, "end": 52.3, "accent": False}
                ]
            },
            {
                "id": "line_04_02",
                "text": "Darr ke maare haathon se mita diya maine,",
                "words": [
                    {"text": "Darr", "start": 52.3, "end": 53.9, "accent": True},
                    {"text": "ke", "start": 53.9, "end": 54.2, "accent": False},
                    {"text": "maare", "start": 54.2, "end": 55.0, "accent": False},
                    {"text": "haathon", "start": 55.0, "end": 56.0, "accent": False},
                    {"text": "se", "start": 56.0, "end": 56.5, "accent": False},
                    {"text": "mita", "start": 56.5, "end": 57.2, "accent": True},
                    {"text": "diya", "start": 57.2, "end": 57.8, "accent": False},
                    {"text": "maine,", "start": 57.8, "end": 58.5, "accent": False}
                ]
            },
            {
                "id": "line_04_03",
                "text": "Par panno pe chhoote woh gehre nishaan,",
                "words": [
                    {"text": "Par", "start": 58.8, "end": 59.4, "accent": False},
                    {"text": "panno", "start": 59.4, "end": 60.2, "accent": True},
                    {"text": "pe", "start": 60.2, "end": 60.8, "accent": False},
                    {"text": "chhoote", "start": 60.8, "end": 61.6, "accent": False},
                    {"text": "woh", "start": 61.6, "end": 62.2, "accent": False},
                    {"text": "gehre", "start": 62.2, "end": 63.2, "accent": True},
                    {"text": "nishaan,", "start": 63.2, "end": 64.5, "accent": True}
                ]
            },
            {
                "id": "line_04_04",
                "text": "Aaj bhi kehte hain tujhko hi chaha maine.",
                "words": [
                    {"text": "Aaj", "start": 65.0, "end": 65.6, "accent": True},
                    {"text": "bhi", "start": 65.6, "end": 66.0, "accent": False},
                    {"text": "kehte", "start": 66.0, "end": 66.8, "accent": False},
                    {"text": "hain", "start": 66.8, "end": 67.1, "accent": False},
                    {"text": "tujhko", "start": 67.1, "end": 67.7, "accent": True},
                    {"text": "hi", "start": 67.7, "end": 68.0, "accent": False},
                    {"text": "chaha", "start": 68.0, "end": 68.4, "accent": True},
                    {"text": "maine.", "start": 68.4, "end": 69.5, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_05_interlude_1",
        "name": "Nostalgic Acoustic Interlude",
        "sectionTag": "05 // INTERLUDE  •  WOODEN DESK",
        "startSec": 72.0,
        "endSec": 87.5,
        "subtitle": "Warm nylon strings & cello • Dust floating in classroom light beams",
        "lines": []
    },
    {
        "id": "scene_06_antara_1_blackboard",
        "name": "Blackboard Notes & Stolen Glimpse",
        "sectionTag": "06 // ANTARA 1  •  BLACKBOARD NOTES",
        "startSec": 87.5,
        "endSec": 96.8,
        "subtitle": "Copying homework questions • Turning around on silly pretexts",
        "lines": [
            {
                "id": "line_06_01",
                "text": "Woh blackboard se homework utaarna,",
                "words": [
                    {"text": "Woh", "start": 88.0, "end": 88.6, "accent": False},
                    {"text": "blackboard", "start": 88.6, "end": 90.0, "accent": True},
                    {"text": "se", "start": 90.0, "end": 90.4, "accent": False},
                    {"text": "homework", "start": 90.4, "end": 91.4, "accent": False},
                    {"text": "utaarna,", "start": 91.4, "end": 92.3, "accent": False}
                ]
            },
            {
                "id": "line_06_02",
                "text": "Bahaane se mud ke tujhe ek nazar taakna.",
                "words": [
                    {"text": "Bahaane", "start": 92.4, "end": 93.4, "accent": True},
                    {"text": "se", "start": 93.4, "end": 93.8, "accent": False},
                    {"text": "mud", "start": 93.8, "end": 94.4, "accent": False},
                    {"text": "ke", "start": 94.4, "end": 94.8, "accent": False},
                    {"text": "tujhe", "start": 94.8, "end": 95.3, "accent": False},
                    {"text": "ek", "start": 95.3, "end": 95.7, "accent": False},
                    {"text": "nazar", "start": 95.7, "end": 96.3, "accent": True},
                    {"text": "taakna.", "start": 96.3, "end": 96.8, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_07_antara_1_rollcall",
        "name": "Roll Number Attendance",
        "sectionTag": "07 // ANTARA 1  •  PRESENT MA'AM",
        "startSec": 96.8,
        "endSec": 108.5,
        "subtitle": "A suspended breath when your number is called • The quiet voice that made the day",
        "lines": [
            {
                "id": "line_07_01",
                "text": "Jab roll number tera bolti thi teacher,",
                "words": [
                    {"text": "Jab", "start": 97.0, "end": 97.6, "accent": False},
                    {"text": "roll", "start": 97.6, "end": 98.2, "accent": True},
                    {"text": "number", "start": 98.2, "end": 99.0, "accent": False},
                    {"text": "tera", "start": 99.0, "end": 99.6, "accent": True},
                    {"text": "bolti", "start": 99.6, "end": 100.2, "accent": False},
                    {"text": "thi", "start": 100.2, "end": 100.5, "accent": False},
                    {"text": "teacher,", "start": 100.5, "end": 100.8, "accent": False}
                ]
            },
            {
                "id": "line_07_02",
                "text": "Saansein meri rukti thi ek pal ke liye,",
                "words": [
                    {"text": "Saansein", "start": 100.8, "end": 101.8, "accent": True},
                    {"text": "meri", "start": 101.8, "end": 102.3, "accent": False},
                    {"text": "rukti", "start": 102.3, "end": 103.0, "accent": False},
                    {"text": "thi", "start": 103.0, "end": 103.4, "accent": False},
                    {"text": "ek", "start": 103.4, "end": 103.8, "accent": False},
                    {"text": "pal", "start": 103.8, "end": 104.2, "accent": True},
                    {"text": "ke", "start": 104.2, "end": 104.4, "accent": False},
                    {"text": "liye,", "start": 104.4, "end": 104.7, "accent": False}
                ]
            },
            {
                "id": "line_07_03",
                "text": "Tera woh dheeme se kehna \"Present, Ma'am\",",
                "words": [
                    {"text": "Tera", "start": 104.8, "end": 105.4, "accent": True},
                    {"text": "woh", "start": 105.4, "end": 105.8, "accent": False},
                    {"text": "dheeme", "start": 105.8, "end": 106.6, "accent": False},
                    {"text": "se", "start": 106.6, "end": 107.0, "accent": False},
                    {"text": "kehna", "start": 107.0, "end": 107.6, "accent": False},
                    {"text": "\"Present,", "start": 107.6, "end": 108.2, "accent": True},
                    {"text": "Ma'am\",", "start": 108.2, "end": 108.5, "accent": True}
                ]
            }
        ]
    },
    {
        "id": "scene_08_antara_1_tiffin",
        "name": "Tiffin Break & Silent Hesitation",
        "sectionTag": "08 // ANTARA 1  •  TIFFIN BREAK",
        "startSec": 108.5,
        "endSec": 125.0,
        "subtitle": "Laughter across the corridor • Never finding the courage to take a single step closer",
        "lines": [
            {
                "id": "line_08_01",
                "text": "Kafi tha mere saare din ke jiye.",
                "words": [
                    {"text": "Kafi", "start": 108.6, "end": 109.4, "accent": True},
                    {"text": "tha", "start": 109.4, "end": 109.8, "accent": False},
                    {"text": "mere", "start": 109.8, "end": 110.4, "accent": False},
                    {"text": "saare", "start": 110.4, "end": 111.0, "accent": False},
                    {"text": "din", "start": 111.0, "end": 111.4, "accent": True},
                    {"text": "ke", "start": 111.4, "end": 111.8, "accent": False},
                    {"text": "jiye.", "start": 111.8, "end": 112.3, "accent": False}
                ]
            },
            {
                "id": "line_08_02",
                "text": "Tiffin ke break mein tu hansti thi dosto sang,",
                "words": [
                    {"text": "Tiffin", "start": 112.4, "end": 113.1, "accent": True},
                    {"text": "ke", "start": 113.1, "end": 113.4, "accent": False},
                    {"text": "break", "start": 113.4, "end": 114.0, "accent": False},
                    {"text": "mein", "start": 114.0, "end": 114.3, "accent": False},
                    {"text": "tu", "start": 114.3, "end": 114.7, "accent": False},
                    {"text": "hansti", "start": 114.7, "end": 115.4, "accent": True},
                    {"text": "thi", "start": 115.4, "end": 115.7, "accent": False},
                    {"text": "dosto", "start": 115.7, "end": 116.1, "accent": False},
                    {"text": "sang,", "start": 116.1, "end": 116.5, "accent": False}
                ]
            },
            {
                "id": "line_08_03",
                "text": "Door khade chadh jaata tha ek anokha rang.",
                "words": [
                    {"text": "Door", "start": 116.5, "end": 117.1, "accent": False},
                    {"text": "khade", "start": 117.1, "end": 117.6, "accent": False},
                    {"text": "chadh", "start": 117.6, "end": 118.2, "accent": False},
                    {"text": "jaata", "start": 118.2, "end": 118.8, "accent": False},
                    {"text": "tha", "start": 118.8, "end": 119.1, "accent": False},
                    {"text": "ek", "start": 119.1, "end": 119.4, "accent": False},
                    {"text": "anokha", "start": 119.4, "end": 119.8, "accent": True},
                    {"text": "rang.", "start": 119.8, "end": 120.3, "accent": False}
                ]
            },
            {
                "id": "line_08_04",
                "text": "Kabhi himmat na hui ke paas tere jaa saku,",
                "words": [
                    {"text": "Kabhi", "start": 120.4, "end": 120.9, "accent": False},
                    {"text": "himmat", "start": 120.9, "end": 121.5, "accent": True},
                    {"text": "na", "start": 121.5, "end": 121.8, "accent": False},
                    {"text": "hui", "start": 121.8, "end": 122.2, "accent": False},
                    {"text": "ke", "start": 122.2, "end": 122.5, "accent": False},
                    {"text": "paas", "start": 122.5, "end": 123.0, "accent": False},
                    {"text": "tere", "start": 123.0, "end": 123.4, "accent": False},
                    {"text": "jaa", "start": 123.4, "end": 123.8, "accent": False},
                    {"text": "saku,", "start": 123.8, "end": 124.1, "accent": False}
                ]
            },
            {
                "id": "line_08_05",
                "text": "Ek lafz bhi zubaan se keh ke jata saku.",
                "words": [
                    {"text": "Ek", "start": 124.1, "end": 124.3, "accent": False},
                    {"text": "lafz", "start": 124.3, "end": 124.6, "accent": True},
                    {"text": "bhi", "start": 124.6, "end": 124.8, "accent": False},
                    {"text": "zubaan", "start": 124.8, "end": 125.1, "accent": False},
                    {"text": "se", "start": 125.1, "end": 125.3, "accent": False},
                    {"text": "keh", "start": 125.3, "end": 125.5, "accent": False},
                    {"text": "ke", "start": 125.5, "end": 125.7, "accent": False},
                    {"text": "jata", "start": 125.7, "end": 126.0, "accent": True},
                    {"text": "saku.", "start": 126.0, "end": 126.3, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_09_mukhda_reprise",
        "name": "Pencil Marks Reprise",
        "sectionTag": "09 // MUKHDA  •  SECRET MARGINS",
        "startSec": 125.0,
        "endSec": 149.0,
        "subtitle": "Rubbing away the lead with warm fingers • The paper still remembers",
        "lines": [
            {
                "id": "line_09_01",
                "text": "Pencil se likha tha tera naam desk par,",
                "words": [
                    {"text": "Pencil", "start": 126.4, "end": 127.4, "accent": True},
                    {"text": "se", "start": 127.4, "end": 127.8, "accent": False},
                    {"text": "likha", "start": 127.8, "end": 128.8, "accent": False},
                    {"text": "tha", "start": 128.8, "end": 129.2, "accent": False},
                    {"text": "tera", "start": 129.2, "end": 130.2, "accent": True},
                    {"text": "naam", "start": 130.2, "end": 131.2, "accent": True},
                    {"text": "desk", "start": 131.2, "end": 132.0, "accent": False},
                    {"text": "par,", "start": 132.0, "end": 132.6, "accent": False}
                ]
            },
            {
                "id": "line_09_02",
                "text": "Darr ke maare haathon se mita diya maine,",
                "words": [
                    {"text": "Darr", "start": 132.6, "end": 133.5, "accent": True},
                    {"text": "ke", "start": 133.5, "end": 133.9, "accent": False},
                    {"text": "maare", "start": 133.9, "end": 134.9, "accent": False},
                    {"text": "haathon", "start": 134.9, "end": 136.0, "accent": False},
                    {"text": "se", "start": 136.0, "end": 136.5, "accent": False},
                    {"text": "mita", "start": 136.5, "end": 137.5, "accent": True},
                    {"text": "diya", "start": 137.5, "end": 138.4, "accent": False},
                    {"text": "maine,", "start": 138.4, "end": 139.2, "accent": False}
                ]
            },
            {
                "id": "line_09_03",
                "text": "Par panno pe chhoote woh gehre nishaan,",
                "words": [
                    {"text": "Par", "start": 139.2, "end": 140.0, "accent": False},
                    {"text": "panno", "start": 140.0, "end": 141.2, "accent": True},
                    {"text": "pe", "start": 141.2, "end": 141.8, "accent": False},
                    {"text": "chhoote", "start": 141.8, "end": 142.8, "accent": False},
                    {"text": "woh", "start": 142.8, "end": 143.6, "accent": False},
                    {"text": "gehre", "start": 143.6, "end": 144.8, "accent": True},
                    {"text": "nishaan,", "start": 144.8, "end": 145.8, "accent": True}
                ]
            },
            {
                "id": "line_09_04",
                "text": "Aaj bhi kehte hain tujhko hi chaha maine.",
                "words": [
                    {"text": "Aaj", "start": 145.8, "end": 146.4, "accent": True},
                    {"text": "bhi", "start": 146.4, "end": 146.8, "accent": False},
                    {"text": "kehte", "start": 146.8, "end": 147.2, "accent": False},
                    {"text": "hain", "start": 147.2, "end": 147.4, "accent": False},
                    {"text": "tujhko", "start": 147.4, "end": 147.8, "accent": True},
                    {"text": "hi", "start": 147.8, "end": 148.0, "accent": False},
                    {"text": "chaha", "start": 148.0, "end": 148.4, "accent": True},
                    {"text": "maine.", "start": 148.4, "end": 148.8, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_10_interlude_2",
        "name": "Rain & Piano Melancholy",
        "sectionTag": "10 // INTERLUDE  •  MONSOON SHOWER",
        "startSec": 149.0,
        "endSec": 164.0,
        "subtitle": "Rain drops on cycle seats • Early school dismissal bell",
        "lines": []
    },
    {
        "id": "scene_11_antara_2_rain_bus",
        "name": "Cycle Stand & Yellow School Bus",
        "sectionTag": "11 // ANTARA 2  •  CYCLE STAND",
        "startSec": 164.0,
        "endSec": 179.5,
        "subtitle": "Pedaling slow in the rain • Waiting for her bus to pass behind",
        "lines": [
            {
                "id": "line_11_01",
                "text": "Barsaat ke din jab chhutti hoti thi,",
                "words": [
                    {"text": "Barsaat", "start": 164.4, "end": 165.4, "accent": True},
                    {"text": "ke", "start": 165.4, "end": 165.8, "accent": False},
                    {"text": "din", "start": 165.8, "end": 166.4, "accent": False},
                    {"text": "jab", "start": 166.4, "end": 166.9, "accent": False},
                    {"text": "chhutti", "start": 166.9, "end": 167.6, "accent": True},
                    {"text": "hoti", "start": 167.6, "end": 168.0, "accent": False},
                    {"text": "thi,", "start": 168.0, "end": 168.4, "accent": False}
                ]
            },
            {
                "id": "line_11_02",
                "text": "Cycle stand par bheed lagti thi bhaari.",
                "words": [
                    {"text": "Cycle", "start": 168.4, "end": 169.2, "accent": True},
                    {"text": "stand", "start": 169.2, "end": 169.8, "accent": False},
                    {"text": "par", "start": 169.8, "end": 170.2, "accent": False},
                    {"text": "bheed", "start": 170.2, "end": 170.8, "accent": False},
                    {"text": "lagti", "start": 170.8, "end": 171.3, "accent": False},
                    {"text": "thi", "start": 171.3, "end": 171.6, "accent": False},
                    {"text": "bhaari.", "start": 171.6, "end": 172.2, "accent": False}
                ]
            },
            {
                "id": "line_11_03",
                "text": "Main jaan-boojh kar pedal dheere maarta,",
                "words": [
                    {"text": "Main", "start": 172.2, "end": 172.8, "accent": False},
                    {"text": "jaan-boojh", "start": 172.8, "end": 173.8, "accent": True},
                    {"text": "kar", "start": 173.8, "end": 174.2, "accent": False},
                    {"text": "pedal", "start": 174.2, "end": 174.9, "accent": False},
                    {"text": "dheere", "start": 174.9, "end": 175.6, "accent": True},
                    {"text": "maarta,", "start": 175.6, "end": 176.2, "accent": False}
                ]
            },
            {
                "id": "line_11_04",
                "text": "Peeche se guzarti thi jab bus tumhaari.",
                "words": [
                    {"text": "Peeche", "start": 176.2, "end": 177.0, "accent": False},
                    {"text": "se", "start": 177.0, "end": 177.4, "accent": False},
                    {"text": "guzarti", "start": 177.4, "end": 178.1, "accent": True},
                    {"text": "thi", "start": 178.1, "end": 178.5, "accent": False},
                    {"text": "jab", "start": 178.5, "end": 178.9, "accent": False},
                    {"text": "bus", "start": 178.9, "end": 179.3, "accent": True},
                    {"text": "tumhaari.", "start": 179.3, "end": 179.8, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_12_antara_2_autographs",
        "name": "Yellow Bus Window & Uniform Autographs",
        "sectionTag": "12 // ANTARA 2  •  FINAL EXAM DAY",
        "startSec": 179.5,
        "endSec": 194.5,
        "subtitle": "Hair blowing in the bus window • Shirts signed with memories on the last day",
        "lines": [
            {
                "id": "line_12_01",
                "text": "Woh yellow bus ki khidki, hawa mein udte baal,",
                "words": [
                    {"text": "Woh", "start": 179.8, "end": 180.3, "accent": False},
                    {"text": "yellow", "start": 180.3, "end": 181.0, "accent": True},
                    {"text": "bus", "start": 181.0, "end": 181.5, "accent": False},
                    {"text": "ki", "start": 181.5, "end": 181.8, "accent": False},
                    {"text": "khidki,", "start": 181.8, "end": 182.5, "accent": False},
                    {"text": "hawa", "start": 182.5, "end": 183.0, "accent": False},
                    {"text": "mein", "start": 183.0, "end": 183.3, "accent": False},
                    {"text": "udte", "start": 183.3, "end": 183.8, "accent": True},
                    {"text": "baal,", "start": 183.8, "end": 184.2, "accent": False}
                ]
            },
            {
                "id": "line_12_02",
                "text": "Tujhe dekh ke mera kaisa hota tha haal.",
                "words": [
                    {"text": "Tujhe", "start": 184.2, "end": 184.8, "accent": False},
                    {"text": "dekh", "start": 184.8, "end": 185.3, "accent": True},
                    {"text": "ke", "start": 185.3, "end": 185.6, "accent": False},
                    {"text": "mera", "start": 185.6, "end": 186.1, "accent": False},
                    {"text": "kaisa", "start": 186.1, "end": 186.7, "accent": False},
                    {"text": "hota", "start": 186.7, "end": 187.2, "accent": False},
                    {"text": "tha", "start": 187.2, "end": 187.5, "accent": False},
                    {"text": "haal.", "start": 187.5, "end": 187.9, "accent": True}
                ]
            },
            {
                "id": "line_12_03",
                "text": "Exam ke aakhri din sab autograph le rahe the,",
                "words": [
                    {"text": "Exam", "start": 187.9, "end": 188.6, "accent": True},
                    {"text": "ke", "start": 188.6, "end": 188.9, "accent": False},
                    {"text": "aakhri", "start": 188.9, "end": 189.5, "accent": False},
                    {"text": "din", "start": 189.5, "end": 190.0, "accent": False},
                    {"text": "sab", "start": 190.0, "end": 190.4, "accent": False},
                    {"text": "autograph", "start": 190.4, "end": 191.3, "accent": True},
                    {"text": "le", "start": 191.3, "end": 191.6, "accent": False},
                    {"text": "rahe", "start": 191.6, "end": 192.0, "accent": False},
                    {"text": "the,", "start": 192.0, "end": 192.3, "accent": False}
                ]
            },
            {
                "id": "line_12_04",
                "text": "Safed shirt pe doston ke naam beh rahe the.",
                "words": [
                    {"text": "Safed", "start": 192.3, "end": 192.9, "accent": True},
                    {"text": "shirt", "start": 192.9, "end": 193.5, "accent": False},
                    {"text": "pe", "start": 193.5, "end": 193.8, "accent": False},
                    {"text": "doston", "start": 193.8, "end": 194.3, "accent": False},
                    {"text": "ke", "start": 194.3, "end": 194.6, "accent": False},
                    {"text": "naam", "start": 194.6, "end": 195.0, "accent": True},
                    {"text": "beh", "start": 195.0, "end": 195.3, "accent": False},
                    {"text": "rahe", "start": 195.3, "end": 195.6, "accent": False},
                    {"text": "the.", "start": 195.6, "end": 195.9, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_13_antara_2_alvida",
        "name": "The Unsaid Farewell",
        "sectionTag": "13 // ANTARA 2  •  UNSAID GOODBYE",
        "startSec": 194.5,
        "endSec": 201.5,
        "subtitle": "Pen in trembling hands • Never uttering that last goodbye",
        "lines": [
            {
                "id": "line_13_01",
                "text": "Kalam haath mein thi par main aage na badha,",
                "words": [
                    {"text": "Kalam", "start": 195.0, "end": 195.8, "accent": True},
                    {"text": "haath", "start": 195.8, "end": 196.2, "accent": False},
                    {"text": "mein", "start": 196.2, "end": 196.5, "accent": False},
                    {"text": "thi", "start": 196.5, "end": 196.9, "accent": False},
                    {"text": "par", "start": 196.9, "end": 197.2, "accent": False},
                    {"text": "main", "start": 197.2, "end": 197.6, "accent": False},
                    {"text": "aage", "start": 197.6, "end": 198.1, "accent": False},
                    {"text": "na", "start": 198.1, "end": 198.4, "accent": False},
                    {"text": "badha,", "start": 198.4, "end": 198.8, "accent": True}
                ]
            },
            {
                "id": "line_13_02",
                "text": "Tujhse ek aakhri alvida bhi na keh saka.",
                "words": [
                    {"text": "Tujhse", "start": 198.8, "end": 199.5, "accent": False},
                    {"text": "ek", "start": 199.5, "end": 199.8, "accent": False},
                    {"text": "aakhri", "start": 199.8, "end": 200.4, "accent": True},
                    {"text": "alvida", "start": 200.4, "end": 201.2, "accent": True},
                    {"text": "bhi", "start": 201.2, "end": 201.5, "accent": False},
                    {"text": "na", "start": 201.5, "end": 201.7, "accent": False},
                    {"text": "keh", "start": 201.7, "end": 202.0, "accent": False},
                    {"text": "saka.", "start": 202.0, "end": 202.4, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_14_bridge",
        "name": "The Old Bench & Sweetest Youth",
        "sectionTag": "14 // BRIDGE  •  YEARS PASSED",
        "startSec": 201.5,
        "endSec": 218.0,
        "subtitle": "Years have slipped away • The wooden corner where innocent love lived",
        "lines": [
            {
                "id": "line_14_01",
                "text": "Barson guzar gaye, school chhoot gaya,",
                "words": [
                    {"text": "Barson", "start": 202.5, "end": 203.2, "accent": True},
                    {"text": "guzar", "start": 203.2, "end": 203.8, "accent": False},
                    {"text": "gaye,", "start": 203.8, "end": 204.3, "accent": False},
                    {"text": "school", "start": 204.3, "end": 205.0, "accent": True},
                    {"text": "chhoot", "start": 205.0, "end": 205.6, "accent": False},
                    {"text": "gaya,", "start": 205.6, "end": 206.0, "accent": False}
                ]
            },
            {
                "id": "line_14_02",
                "text": "Par purani bench ka kona nahi bhoola.",
                "words": [
                    {"text": "Par", "start": 206.0, "end": 206.5, "accent": False},
                    {"text": "purani", "start": 206.5, "end": 207.2, "accent": False},
                    {"text": "bench", "start": 207.2, "end": 207.8, "accent": True},
                    {"text": "ka", "start": 207.8, "end": 208.1, "accent": False},
                    {"text": "kona", "start": 208.1, "end": 208.7, "accent": True},
                    {"text": "nahi", "start": 208.7, "end": 209.2, "accent": False},
                    {"text": "bhoola.", "start": 209.2, "end": 209.6, "accent": False}
                ]
            },
            {
                "id": "line_14_03",
                "text": "Shayad tu bhool gayi hogi woh saari baatein,",
                "words": [
                    {"text": "Shayad", "start": 209.6, "end": 210.3, "accent": True},
                    {"text": "tu", "start": 210.3, "end": 210.7, "accent": False},
                    {"text": "bhool", "start": 210.7, "end": 211.2, "accent": False},
                    {"text": "gayi", "start": 211.2, "end": 211.7, "accent": False},
                    {"text": "hogi", "start": 211.7, "end": 212.1, "accent": False},
                    {"text": "woh", "start": 212.1, "end": 212.5, "accent": False},
                    {"text": "saari", "start": 212.5, "end": 213.1, "accent": False},
                    {"text": "baatein,", "start": 213.1, "end": 213.6, "accent": False}
                ]
            },
            {
                "id": "line_14_04",
                "text": "Par mere bachpan ka sabse pyara hissa tu thi,",
                "words": [
                    {"text": "Par", "start": 213.6, "end": 214.1, "accent": False},
                    {"text": "mere", "start": 214.1, "end": 214.7, "accent": False},
                    {"text": "bachpan", "start": 214.7, "end": 215.5, "accent": True},
                    {"text": "ka", "start": 215.5, "end": 215.8, "accent": False},
                    {"text": "sabse", "start": 215.8, "end": 216.4, "accent": False},
                    {"text": "pyara", "start": 216.4, "end": 217.1, "accent": True},
                    {"text": "hissa", "start": 217.1, "end": 217.7, "accent": False},
                    {"text": "tu", "start": 217.7, "end": 218.1, "accent": False},
                    {"text": "thi,", "start": 218.1, "end": 218.4, "accent": False}
                ]
            },
            {
                "id": "line_14_05",
                "text": "Jise chaha bohot... par keh na saka.",
                "words": [
                    {"text": "Jise", "start": 218.4, "end": 218.9, "accent": False},
                    {"text": "chaha", "start": 218.9, "end": 219.5, "accent": True},
                    {"text": "bohot...", "start": 219.5, "end": 220.2, "accent": True},
                    {"text": "par", "start": 220.2, "end": 220.6, "accent": False},
                    {"text": "keh", "start": 220.6, "end": 221.0, "accent": False},
                    {"text": "na", "start": 221.0, "end": 221.3, "accent": False},
                    {"text": "saka.", "start": 221.3, "end": 221.8, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_15_outro",
        "name": "The Final Glance That Stayed Forever",
        "sectionTag": "15 // OUTRO  •  FROZEN IN TIME",
        "startSec": 218.0,
        "endSec": 236.0,
        "subtitle": "So close in front, yet unaware • Just that single turn of your head",
        "lines": [
            {
                "id": "line_15_01",
                "text": "Subah ki assembly...",
                "words": [
                    {"text": "Subah", "start": 219.6, "end": 220.5, "accent": True},
                    {"text": "ki", "start": 220.5, "end": 220.9, "accent": False},
                    {"text": "assembly...", "start": 220.9, "end": 222.0, "accent": True}
                ]
            },
            {
                "id": "line_15_02",
                "text": "Pencil ke nishaan...",
                "words": [
                    {"text": "Pencil", "start": 222.0, "end": 222.9, "accent": True},
                    {"text": "ke", "start": 222.9, "end": 223.3, "accent": False},
                    {"text": "nishaan...", "start": 223.3, "end": 224.5, "accent": True}
                ]
            },
            {
                "id": "line_15_03",
                "text": "Tu samne thi kitni,",
                "words": [
                    {"text": "Tu", "start": 224.6, "end": 225.1, "accent": False},
                    {"text": "samne", "start": 225.1, "end": 225.9, "accent": True},
                    {"text": "thi", "start": 225.9, "end": 226.3, "accent": False},
                    {"text": "kitni,", "start": 226.3, "end": 227.0, "accent": False}
                ]
            },
            {
                "id": "line_15_04",
                "text": "Par anjaan thi meri jaan...",
                "words": [
                    {"text": "Par", "start": 227.0, "end": 227.6, "accent": False},
                    {"text": "anjaan", "start": 227.6, "end": 228.6, "accent": True},
                    {"text": "thi", "start": 228.6, "end": 229.0, "accent": False},
                    {"text": "meri", "start": 229.0, "end": 229.6, "accent": False},
                    {"text": "jaan...", "start": 229.6, "end": 230.5, "accent": True}
                ]
            },
            {
                "id": "line_15_05",
                "text": "Bas ek mud ke dekhna tera,",
                "words": [
                    {"text": "Bas", "start": 230.6, "end": 231.1, "accent": False},
                    {"text": "ek", "start": 231.1, "end": 231.5, "accent": False},
                    {"text": "mud", "start": 231.5, "end": 232.0, "accent": False},
                    {"text": "ke", "start": 232.0, "end": 232.4, "accent": False},
                    {"text": "dekhna", "start": 232.4, "end": 233.2, "accent": True},
                    {"text": "tera,", "start": 233.2, "end": 233.8, "accent": False}
                ]
            },
            {
                "id": "line_15_06",
                "text": "Hamesha ke liye theher gaya...",
                "words": [
                    {"text": "Hamesha", "start": 233.8, "end": 234.6, "accent": True},
                    {"text": "ke", "start": 234.6, "end": 235.0, "accent": False},
                    {"text": "liye", "start": 235.0, "end": 235.4, "accent": False},
                    {"text": "theher", "start": 235.4, "end": 236.2, "accent": True},
                    {"text": "gaya...", "start": 236.2, "end": 237.0, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_16_outro_fade",
        "name": "Bicycle Bell & Blackboard Chalk Silence",
        "sectionTag": "16 // OUTRO  •  EMPTY CORRIDORS",
        "startSec": 236.0,
        "endSec": total_duration_sec,
        "subtitle": "Guitar chords decaying in the afternoon air • An innocent love that never grew old",
        "lines": []
    }
]

timeline = {
    "songTitle": "Pencil Ke Nishaan (School Crush Ballad)",
    "artist": "PeerMusic",
    "theme": "SongCoverArtwork",
    "fps": fps,
    "totalFrames": total_frames,
    "scenes": []
}

word_counter = 1

for sc_idx, sc in enumerate(scenes_raw):
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

os.makedirs("src/songs/pencil-ke-nishaan", exist_ok=True)
output_path = "src/songs/pencil-ke-nishaan/timeline.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, indent=2, ensure_ascii=False)

print(f"[✓] Generated 60 FPS timeline: {len(timeline['scenes'])} scenes, {word_counter-1} words.")
print(f"[✓] Total frames: {total_frames} ({total_duration_sec:.2f}s). Saved to {output_path}")
