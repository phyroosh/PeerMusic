import json
import os

fps = 60
total_duration_sec = 262.687
total_frames = int(round(total_duration_sec * fps))

def f(sec):
    return int(round(sec * fps))

scenes_raw = [
    {
        "id": "scene_01_intro",
        "name": "3 AM Midnight Reverie",
        "sectionTag": "01 // INTRO  •  3 AM MIDNIGHT",
        "startSec": 0.0,
        "endSec": 30.0,
        "subtitle": "Late night study session • 3 AM hostel room reflections",
        "lines": []
    },
    {
        "id": "scene_02_mukhda_part1",
        "name": "Unfinished Formulas in the Margin",
        "sectionTag": "02 // MUKHDA  •  KORE MARGIN",
        "startSec": 30.0,
        "endSec": 41.86,
        "subtitle": "Calculations incomplete in the margins • Tired ink on fingertips",
        "lines": [
            {
                "id": "line_02_01",
                "text": "Kitaabon ke kore margin pe, kitne hisaab adhoore hain,",
                "words": [
                    {"text": "Kitaabon", "start": 30.00, "end": 30.80, "accent": True},
                    {"text": "ke", "start": 30.80, "end": 31.10, "accent": False},
                    {"text": "kore", "start": 31.10, "end": 31.70, "accent": False},
                    {"text": "margin", "start": 31.70, "end": 32.30, "accent": True},
                    {"text": "pe,", "start": 32.30, "end": 32.60, "accent": False},
                    {"text": "kitne", "start": 32.60, "end": 33.30, "accent": False},
                    {"text": "hisaab", "start": 33.30, "end": 34.20, "accent": True},
                    {"text": "adhoore", "start": 34.20, "end": 35.10, "accent": False},
                    {"text": "hain,", "start": 35.10, "end": 35.80, "accent": False}
                ]
            },
            {
                "id": "line_02_02",
                "text": "Ungli pe ink ke daagh liye, khwaab abhi kya poore hain?",
                "words": [
                    {"text": "Ungli", "start": 35.80, "end": 36.60, "accent": False},
                    {"text": "pe", "start": 36.60, "end": 36.90, "accent": False},
                    {"text": "ink", "start": 36.90, "end": 37.50, "accent": True},
                    {"text": "ke", "start": 37.50, "end": 37.80, "accent": False},
                    {"text": "daagh", "start": 37.80, "end": 38.40, "accent": False},
                    {"text": "liye,", "start": 38.40, "end": 38.76, "accent": False},
                    {"text": "khwaab", "start": 38.76, "end": 39.60, "accent": True},
                    {"text": "abhi", "start": 39.60, "end": 40.20, "accent": False},
                    {"text": "kya", "start": 40.20, "end": 40.60, "accent": False},
                    {"text": "poore", "start": 40.60, "end": 41.20, "accent": False},
                    {"text": "hain?", "start": 41.20, "end": 41.86, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_03_mukhda_part2",
        "name": "The Silence at 3 AM",
        "sectionTag": "03 // MUKHDA  •  HAAR KE NAHI JAANA",
        "startSec": 41.86,
        "endSec": 66.56,
        "subtitle": "Staring at the wall at 3 AM • Writing resolve in the margin",
        "lines": [
            {
                "id": "line_03_01",
                "text": "Chashme ke peechhe thaki nazar, deewaron ko takti rehti hai,",
                "words": [
                    {"text": "Chashme", "start": 41.86, "end": 42.60, "accent": True},
                    {"text": "ke", "start": 42.60, "end": 42.90, "accent": False},
                    {"text": "peechhe", "start": 42.90, "end": 43.60, "accent": False},
                    {"text": "thaki", "start": 43.60, "end": 44.20, "accent": False},
                    {"text": "nazar,", "start": 44.20, "end": 44.90, "accent": False},
                    {"text": "deewaron", "start": 44.90, "end": 45.80, "accent": True},
                    {"text": "ko", "start": 45.80, "end": 46.10, "accent": False},
                    {"text": "takti", "start": 46.10, "end": 46.90, "accent": False},
                    {"text": "rehti", "start": 46.90, "end": 47.40, "accent": False},
                    {"text": "hai,", "start": 47.40, "end": 47.90, "accent": False}
                ]
            },
            {
                "id": "line_03_02",
                "text": "Raat ke teen baje yeh khamoshi, sau sawaal mujhse kehti hai.",
                "words": [
                    {"text": "Raat", "start": 47.90, "end": 48.50, "accent": False},
                    {"text": "ke", "start": 48.50, "end": 48.80, "accent": False},
                    {"text": "teen", "start": 48.80, "end": 49.40, "accent": False},
                    {"text": "baje", "start": 49.40, "end": 50.00, "accent": False},
                    {"text": "yeh", "start": 50.00, "end": 50.40, "accent": False},
                    {"text": "khamoshi,", "start": 50.40, "end": 51.40, "accent": True},
                    {"text": "sau", "start": 51.40, "end": 52.00, "accent": False},
                    {"text": "sawaal", "start": 52.00, "end": 52.90, "accent": True},
                    {"text": "mujhse", "start": 52.90, "end": 53.60, "accent": False},
                    {"text": "kehti", "start": 53.60, "end": 54.00, "accent": False},
                    {"text": "hai.", "start": 54.00, "end": 54.36, "accent": False}
                ]
            },
            {
                "id": "line_03_03",
                "text": "Haan panno ke is jungle mein, gum hai mera thikaana,",
                "words": [
                    {"text": "Haan", "start": 54.36, "end": 55.20, "accent": False},
                    {"text": "panno", "start": 55.20, "end": 56.00, "accent": True},
                    {"text": "ke", "start": 56.00, "end": 56.30, "accent": False},
                    {"text": "is", "start": 56.30, "end": 56.70, "accent": False},
                    {"text": "jungle", "start": 56.70, "end": 57.50, "accent": True},
                    {"text": "mein,", "start": 57.50, "end": 58.00, "accent": False},
                    {"text": "gum", "start": 58.00, "end": 58.60, "accent": False},
                    {"text": "hai", "start": 58.60, "end": 59.00, "accent": False},
                    {"text": "mera", "start": 59.00, "end": 59.50, "accent": False},
                    {"text": "thikaana,", "start": 59.50, "end": 60.02, "accent": False}
                ]
            },
            {
                "id": "line_03_04",
                "text": "Kore margin pe likh ke rakha: haar ke nahi hai jaana.",
                "words": [
                    {"text": "Kore", "start": 60.02, "end": 60.80, "accent": True},
                    {"text": "margin", "start": 60.80, "end": 61.60, "accent": True},
                    {"text": "pe", "start": 61.60, "end": 62.00, "accent": False},
                    {"text": "likh", "start": 62.00, "end": 62.60, "accent": False},
                    {"text": "ke", "start": 62.60, "end": 63.00, "accent": False},
                    {"text": "rakha:", "start": 63.00, "end": 63.80, "accent": False},
                    {"text": "haar", "start": 63.80, "end": 64.60, "accent": True},
                    {"text": "ke", "start": 64.60, "end": 65.00, "accent": False},
                    {"text": "nahi", "start": 65.00, "end": 65.50, "accent": False},
                    {"text": "hai", "start": 65.50, "end": 65.90, "accent": False},
                    {"text": "jaana.", "start": 65.90, "end": 66.56, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_04_interlude",
        "name": "Homesick Silence & Cello Swell",
        "sectionTag": "04 // INTERLUDE  •  HOMESICK SILENCE",
        "startSec": 66.56,
        "endSec": 78.30,
        "subtitle": "Acoustic interlude • Remembering Mom's care package",
        "lines": []
    },
    {
        "id": "scene_05_antara_1",
        "name": "Mom's Call & Lukewarm Chai",
        "sectionTag": "05 // ANTARA 1  •  MAA KA PHONE",
        "startSec": 78.30,
        "endSec": 115.48,
        "subtitle": "Mom's voice on the receiver • Lukewarm chai and unyielding expectations",
        "lines": [
            {
                "id": "line_05_01",
                "text": "Maa ne kaha tha phone pe kal, \"Beta tu thoda aaraam bhi kar,\"",
                "words": [
                    {"text": "Maa", "start": 78.30, "end": 79.10, "accent": True},
                    {"text": "ne", "start": 79.10, "end": 79.40, "accent": False},
                    {"text": "kaha", "start": 79.40, "end": 79.90, "accent": False},
                    {"text": "tha", "start": 79.90, "end": 80.20, "accent": False},
                    {"text": "phone", "start": 80.20, "end": 80.80, "accent": False},
                    {"text": "pe", "start": 80.80, "end": 81.10, "accent": False},
                    {"text": "kal,", "start": 81.10, "end": 81.50, "accent": False},
                    {"text": "\"Beta", "start": 81.50, "end": 82.20, "accent": False},
                    {"text": "tu", "start": 82.20, "end": 82.50, "accent": False},
                    {"text": "thoda", "start": 82.50, "end": 83.10, "accent": False},
                    {"text": "aaraam", "start": 83.10, "end": 83.90, "accent": True},
                    {"text": "bhi", "start": 83.90, "end": 84.20, "accent": False},
                    {"text": "kar,\"", "start": 84.20, "end": 84.54, "accent": False}
                ]
            },
            {
                "id": "line_05_02",
                "text": "Kaise bataun usse yahan, har lamha lagta hai ek safar.",
                "words": [
                    {"text": "Kaise", "start": 84.54, "end": 85.40, "accent": False},
                    {"text": "bataun", "start": 85.40, "end": 86.20, "accent": False},
                    {"text": "usse", "start": 86.20, "end": 86.70, "accent": False},
                    {"text": "yahan,", "start": 86.70, "end": 87.30, "accent": False},
                    {"text": "har", "start": 87.30, "end": 87.80, "accent": False},
                    {"text": "lamha", "start": 87.80, "end": 88.60, "accent": True},
                    {"text": "lagta", "start": 88.60, "end": 89.40, "accent": False},
                    {"text": "hai", "start": 89.40, "end": 89.80, "accent": False},
                    {"text": "ek", "start": 89.80, "end": 90.20, "accent": False},
                    {"text": "safar.", "start": 90.20, "end": 90.82, "accent": True}
                ]
            },
            {
                "id": "line_05_03",
                "text": "Steel ke dabbe ka aakhri laddoo, ghar ki mitti yaad dilaaye,",
                "words": [
                    {"text": "Steel", "start": 90.82, "end": 91.60, "accent": True},
                    {"text": "ke", "start": 91.60, "end": 91.90, "accent": False},
                    {"text": "dabbe", "start": 91.90, "end": 92.50, "accent": False},
                    {"text": "ka", "start": 92.50, "end": 92.80, "accent": False},
                    {"text": "aakhri", "start": 92.80, "end": 93.50, "accent": False},
                    {"text": "laddoo,", "start": 93.50, "end": 94.24, "accent": False},
                    {"text": "ghar", "start": 94.24, "end": 94.90, "accent": True},
                    {"text": "ki", "start": 94.90, "end": 95.20, "accent": False},
                    {"text": "mitti", "start": 95.20, "end": 96.00, "accent": False},
                    {"text": "yaad", "start": 96.00, "end": 96.70, "accent": True},
                    {"text": "dilaaye,", "start": 96.70, "end": 97.50, "accent": False}
                ]
            },
            {
                "id": "line_05_04",
                "text": "Pita ki mehnat ka socha toh, neendein aana bhool hi jaayein.",
                "words": [
                    {"text": "Pita", "start": 97.50, "end": 98.30, "accent": True},
                    {"text": "ki", "start": 98.30, "end": 98.60, "accent": False},
                    {"text": "mehnat", "start": 98.60, "end": 99.40, "accent": True},
                    {"text": "ka", "start": 99.40, "end": 99.70, "accent": False},
                    {"text": "socha", "start": 99.70, "end": 100.54, "accent": False},
                    {"text": "toh,", "start": 100.54, "end": 101.00, "accent": False},
                    {"text": "neendein", "start": 101.00, "end": 101.80, "accent": True},
                    {"text": "aana", "start": 101.80, "end": 102.40, "accent": False},
                    {"text": "bhool", "start": 102.40, "end": 102.90, "accent": False},
                    {"text": "hi", "start": 102.90, "end": 103.10, "accent": False},
                    {"text": "jaayein.", "start": 103.10, "end": 103.40, "accent": False}
                ]
            },
            {
                "id": "line_05_05",
                "text": "Table pe thandi hoti chai, panno pe pehra deti hai,",
                "words": [
                    {"text": "Table", "start": 103.40, "end": 104.20, "accent": False},
                    {"text": "pe", "start": 104.20, "end": 104.50, "accent": False},
                    {"text": "thandi", "start": 104.50, "end": 105.20, "accent": True},
                    {"text": "hoti", "start": 105.20, "end": 105.80, "accent": False},
                    {"text": "chai,", "start": 105.80, "end": 106.32, "accent": True},
                    {"text": "panno", "start": 106.32, "end": 107.10, "accent": False},
                    {"text": "pe", "start": 107.10, "end": 107.40, "accent": False},
                    {"text": "pehra", "start": 107.40, "end": 108.20, "accent": True},
                    {"text": "deti", "start": 108.20, "end": 108.60, "accent": False},
                    {"text": "hai,", "start": 108.60, "end": 108.86, "accent": False}
                ]
            },
            {
                "id": "line_05_06",
                "text": "Har galat calculation pe, umeed chupke se roti hai.",
                "words": [
                    {"text": "Har", "start": 108.86, "end": 109.54, "accent": False},
                    {"text": "galat", "start": 109.54, "end": 110.40, "accent": True},
                    {"text": "calculation", "start": 110.40, "end": 111.54, "accent": True},
                    {"text": "pe,", "start": 111.54, "end": 112.14, "accent": False},
                    {"text": "umeed", "start": 112.14, "end": 113.20, "accent": True},
                    {"text": "chupke", "start": 113.20, "end": 114.10, "accent": False},
                    {"text": "se", "start": 114.10, "end": 114.60, "accent": False},
                    {"text": "roti", "start": 114.60, "end": 115.10, "accent": False},
                    {"text": "hai.", "start": 115.10, "end": 115.48, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_06_reprise",
        "name": "Mukhda Reprise",
        "sectionTag": "06 // REPRISE  •  KORE MARGIN",
        "startSec": 115.48,
        "endSec": 135.0,
        "subtitle": "Re-anchoring the heart • Refusing to yield",
        "lines": [
            {
                "id": "line_06_01",
                "text": "Kitaabon ke kore margin pe, kitne hisaab adhoore hain,",
                "words": [
                    {"text": "Kitaabon", "start": 115.48, "end": 116.50, "accent": True},
                    {"text": "ke", "start": 116.50, "end": 116.80, "accent": False},
                    {"text": "kore", "start": 116.80, "end": 117.40, "accent": False},
                    {"text": "margin", "start": 117.40, "end": 118.20, "accent": True},
                    {"text": "pe,", "start": 118.20, "end": 118.56, "accent": False},
                    {"text": "kitne", "start": 118.56, "end": 119.30, "accent": False},
                    {"text": "hisaab", "start": 119.30, "end": 120.20, "accent": True},
                    {"text": "adhoore", "start": 120.20, "end": 121.00, "accent": False},
                    {"text": "hain,", "start": 121.00, "end": 121.48, "accent": False}
                ]
            },
            {
                "id": "line_06_02",
                "text": "Kore margin pe likh ke rakha: haar ke nahi hai jaana.",
                "words": [
                    {"text": "Kore", "start": 121.48, "end": 122.50, "accent": True},
                    {"text": "margin", "start": 122.50, "end": 123.40, "accent": True},
                    {"text": "pe", "start": 123.40, "end": 123.80, "accent": False},
                    {"text": "likh", "start": 123.80, "end": 124.50, "accent": False},
                    {"text": "ke", "start": 124.50, "end": 125.00, "accent": False},
                    {"text": "rakha:", "start": 125.00, "end": 125.60, "accent": False},
                    {"text": "haar", "start": 125.60, "end": 126.40, "accent": True},
                    {"text": "ke", "start": 126.40, "end": 126.90, "accent": False},
                    {"text": "nahi", "start": 126.90, "end": 127.40, "accent": False},
                    {"text": "hai", "start": 127.40, "end": 127.70, "accent": False},
                    {"text": "jaana.", "start": 127.70, "end": 127.98, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_07_antara_2",
        "name": "The Notice Board & Rising from Zero",
        "sectionTag": "07 // ANTARA 2  •  SIFAR SE AAGE",
        "startSec": 135.0,
        "endSec": 177.52,
        "subtitle": "Beyond percentiles and ranks • Rising stubbornly from zero",
        "lines": [
            {
                "id": "line_07_01",
                "text": "Notice board ke us kaghaz par, roll number ek bheed sa hai,",
                "words": [
                    {"text": "Notice", "start": 141.24, "end": 142.10, "accent": True},
                    {"text": "board", "start": 142.10, "end": 142.70, "accent": False},
                    {"text": "ke", "start": 142.70, "end": 143.00, "accent": False},
                    {"text": "us", "start": 143.00, "end": 143.40, "accent": False},
                    {"text": "kaghaz", "start": 143.40, "end": 144.24, "accent": True},
                    {"text": "par,", "start": 144.24, "end": 144.60, "accent": False},
                    {"text": "roll", "start": 144.60, "end": 145.20, "accent": False},
                    {"text": "number", "start": 145.20, "end": 145.90, "accent": True},
                    {"text": "ek", "start": 145.90, "end": 146.20, "accent": False},
                    {"text": "bheed", "start": 146.20, "end": 146.50, "accent": False},
                    {"text": "sa", "start": 146.50, "end": 146.60, "accent": False},
                    {"text": "hai,", "start": 146.60, "end": 146.66, "accent": False}
                ]
            },
            {
                "id": "line_07_02",
                "text": "Koi na jaane uske peechhe, zakhm koi ummeed sa hai.",
                "words": [
                    {"text": "Koi", "start": 146.66, "end": 147.40, "accent": False},
                    {"text": "na", "start": 147.40, "end": 147.80, "accent": False},
                    {"text": "jaane", "start": 147.80, "end": 148.50, "accent": False},
                    {"text": "uske", "start": 148.50, "end": 149.00, "accent": False},
                    {"text": "peechhe,", "start": 149.00, "end": 149.52, "accent": False},
                    {"text": "zakhm", "start": 149.52, "end": 150.50, "accent": True},
                    {"text": "koi", "start": 150.50, "end": 151.20, "accent": False},
                    {"text": "ummeed", "start": 151.20, "end": 152.20, "accent": True},
                    {"text": "sa", "start": 152.20, "end": 152.50, "accent": False},
                    {"text": "hai.", "start": 152.50, "end": 152.70, "accent": False}
                ]
            },
            {
                "id": "line_07_03",
                "text": "Yeh test, yeh marks, yeh rank-list, meri hadd tay nahi karegi,",
                "words": [
                    {"text": "Yeh", "start": 152.70, "end": 153.30, "accent": False},
                    {"text": "test,", "start": 153.30, "end": 154.00, "accent": True},
                    {"text": "yeh", "start": 154.00, "end": 154.40, "accent": False},
                    {"text": "marks,", "start": 154.40, "end": 155.14, "accent": True},
                    {"text": "yeh", "start": 155.14, "end": 155.60, "accent": False},
                    {"text": "rank-list,", "start": 155.60, "end": 156.60, "accent": True},
                    {"text": "meri", "start": 156.60, "end": 157.20, "accent": False},
                    {"text": "hadd", "start": 157.20, "end": 157.90, "accent": True},
                    {"text": "tay", "start": 157.90, "end": 158.30, "accent": False},
                    {"text": "nahi", "start": 158.30, "end": 158.60, "accent": False},
                    {"text": "karegi,", "start": 158.60, "end": 158.76, "accent": False}
                ]
            },
            {
                "id": "line_07_04",
                "text": "Meri koshishon ki aag kabhi, is darr ke aage na daregi.",
                "words": [
                    {"text": "Meri", "start": 158.76, "end": 159.40, "accent": False},
                    {"text": "koshishon", "start": 159.40, "end": 160.30, "accent": True},
                    {"text": "ki", "start": 160.30, "end": 160.60, "accent": False},
                    {"text": "aag", "start": 160.60, "end": 161.40, "accent": True},
                    {"text": "kabhi,", "start": 161.40, "end": 161.80, "accent": False},
                    {"text": "is", "start": 161.80, "end": 162.30, "accent": False},
                    {"text": "darr", "start": 162.30, "end": 163.20, "accent": True},
                    {"text": "ke", "start": 163.20, "end": 163.70, "accent": False},
                    {"text": "aage", "start": 163.70, "end": 164.30, "accent": False},
                    {"text": "na", "start": 164.30, "end": 164.70, "accent": False},
                    {"text": "daregi.", "start": 164.70, "end": 165.12, "accent": False}
                ]
            },
            {
                "id": "line_07_05",
                "text": "Main sifar se uth kar aaya hoon, aasmaan tak jaana hai,",
                "words": [
                    {"text": "Main", "start": 165.12, "end": 165.80, "accent": False},
                    {"text": "sifar", "start": 165.80, "end": 166.70, "accent": True},
                    {"text": "se", "start": 166.70, "end": 167.10, "accent": False},
                    {"text": "uth", "start": 167.10, "end": 167.70, "accent": False},
                    {"text": "kar", "start": 167.70, "end": 168.20, "accent": False},
                    {"text": "aaya", "start": 168.20, "end": 168.90, "accent": False},
                    {"text": "hoon,", "start": 168.90, "end": 169.30, "accent": False},
                    {"text": "aasmaan", "start": 169.30, "end": 170.20, "accent": True},
                    {"text": "tak", "start": 170.20, "end": 170.50, "accent": False},
                    {"text": "jaana", "start": 170.50, "end": 170.70, "accent": False},
                    {"text": "hai,", "start": 170.70, "end": 170.76, "accent": False}
                ]
            },
            {
                "id": "line_07_06",
                "text": "Gir kar sambhalna seekha hai, khud ko yeh samjhaana hai.",
                "words": [
                    {"text": "Gir", "start": 170.76, "end": 171.60, "accent": False},
                    {"text": "kar", "start": 171.60, "end": 172.10, "accent": False},
                    {"text": "sambhalna", "start": 172.10, "end": 173.10, "accent": True},
                    {"text": "seekha", "start": 173.10, "end": 173.80, "accent": False},
                    {"text": "hai,", "start": 173.80, "end": 174.10, "accent": False},
                    {"text": "khud", "start": 174.10, "end": 174.90, "accent": False},
                    {"text": "ko", "start": 174.90, "end": 175.40, "accent": False},
                    {"text": "yeh", "start": 175.40, "end": 176.00, "accent": False},
                    {"text": "samjhaana", "start": 176.00, "end": 177.10, "accent": True},
                    {"text": "hai.", "start": 177.10, "end": 177.52, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_08_bridge",
        "name": "The Dawn Breaks & Perspective Reversal",
        "sectionTag": "08 // BRIDGE  •  PEHLI CHAHAK",
        "startSec": 177.52,
        "endSec": 201.6,
        "subtitle": "The dark hour lifts • It's just an exam, not life itself",
        "lines": [
            {
                "id": "line_08_01",
                "text": "Khidki ke baahar dheere dheere, andhera ab chhat-ne laga,",
                "words": [
                    {"text": "Khidki", "start": 177.52, "end": 178.40, "accent": True},
                    {"text": "ke", "start": 178.40, "end": 178.70, "accent": False},
                    {"text": "baahar", "start": 178.70, "end": 179.40, "accent": False},
                    {"text": "dheere", "start": 179.40, "end": 180.10, "accent": False},
                    {"text": "dheere,", "start": 180.10, "end": 180.70, "accent": False},
                    {"text": "andhera", "start": 180.70, "end": 181.60, "accent": True},
                    {"text": "ab", "start": 181.60, "end": 182.10, "accent": False},
                    {"text": "chhat-ne", "start": 182.10, "end": 182.60, "accent": False},
                    {"text": "laga,", "start": 182.60, "end": 182.82, "accent": False}
                ]
            },
            {
                "id": "line_08_02",
                "text": "Chidiya ki pehli chahak se, man ka darr kat-ne laga.",
                "words": [
                    {"text": "Chidiya", "start": 182.82, "end": 183.90, "accent": True},
                    {"text": "ki", "start": 183.90, "end": 184.30, "accent": False},
                    {"text": "pehli", "start": 184.30, "end": 185.10, "accent": False},
                    {"text": "chahak", "start": 185.10, "end": 186.10, "accent": True},
                    {"text": "se,", "start": 186.10, "end": 186.70, "accent": False},
                    {"text": "man", "start": 186.70, "end": 187.30, "accent": False},
                    {"text": "ka", "start": 187.30, "end": 187.70, "accent": False},
                    {"text": "darr", "start": 187.70, "end": 188.40, "accent": True},
                    {"text": "kat-ne", "start": 188.40, "end": 188.90, "accent": False},
                    {"text": "laga.", "start": 188.90, "end": 189.06, "accent": False}
                ]
            },
            {
                "id": "line_08_03",
                "text": "Ek imtehaan hi toh hai yeh, zindagi toh nahi hai na...",
                "words": [
                    {"text": "Ek", "start": 189.06, "end": 189.70, "accent": False},
                    {"text": "imtehaan", "start": 189.70, "end": 190.80, "accent": True},
                    {"text": "hi", "start": 190.80, "end": 191.20, "accent": False},
                    {"text": "toh", "start": 191.20, "end": 191.60, "accent": False},
                    {"text": "hai", "start": 191.60, "end": 192.00, "accent": False},
                    {"text": "yeh,", "start": 192.00, "end": 192.50, "accent": False},
                    {"text": "zindagi", "start": 192.50, "end": 193.70, "accent": True},
                    {"text": "toh", "start": 193.70, "end": 194.30, "accent": False},
                    {"text": "nahi", "start": 194.30, "end": 194.90, "accent": False},
                    {"text": "hai", "start": 194.90, "end": 195.10, "accent": False},
                    {"text": "na...", "start": 195.10, "end": 195.28, "accent": False}
                ]
            },
            {
                "id": "line_08_04",
                "text": "Abhi toh poori subah baaqi hai, hausla chhodna nahi hai na!",
                "words": [
                    {"text": "Abhi", "start": 195.28, "end": 196.20, "accent": False},
                    {"text": "toh", "start": 196.20, "end": 196.70, "accent": False},
                    {"text": "poori", "start": 196.70, "end": 197.60, "accent": False},
                    {"text": "subah", "start": 197.60, "end": 198.50, "accent": True},
                    {"text": "baaqi", "start": 198.50, "end": 199.20, "accent": False},
                    {"text": "hai,", "start": 199.20, "end": 199.60, "accent": False},
                    {"text": "hausla", "start": 199.60, "end": 200.60, "accent": True},
                    {"text": "chhodna", "start": 200.60, "end": 201.20, "accent": False},
                    {"text": "nahi", "start": 201.20, "end": 201.50, "accent": False},
                    {"text": "hai", "start": 201.50, "end": 201.55, "accent": False},
                    {"text": "na!", "start": 201.55, "end": 201.60, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_09_climax",
        "name": "Fierce Hope & Full Release",
        "sectionTag": "09 // CLIMAX  •  UMEED LIKHI HAI",
        "startSec": 201.6,
        "endSec": 228.0,
        "subtitle": "Peak dynamic release • Writing fierce hope upon the page",
        "lines": [
            {
                "id": "line_09_01",
                "text": "Kitaabon ke kore margin pe, ab darr nahi umeed likhi hai,",
                "words": [
                    {"text": "Kitaabon", "start": 201.60, "end": 202.80, "accent": True},
                    {"text": "ke", "start": 202.80, "end": 203.20, "accent": False},
                    {"text": "kore", "start": 203.20, "end": 203.82, "accent": False},
                    {"text": "margin", "start": 203.82, "end": 204.62, "accent": True},
                    {"text": "pe,", "start": 204.62, "end": 205.00, "accent": False},
                    {"text": "ab", "start": 205.00, "end": 205.50, "accent": False},
                    {"text": "darr", "start": 205.50, "end": 206.20, "accent": False},
                    {"text": "nahi", "start": 206.20, "end": 206.80, "accent": False},
                    {"text": "umeed", "start": 206.80, "end": 207.50, "accent": True},
                    {"text": "likhi", "start": 207.50, "end": 207.78, "accent": False},
                    {"text": "hai,", "start": 207.78, "end": 208.00, "accent": False}
                ]
            },
            {
                "id": "line_09_02",
                "text": "Ungli pe ink ke daagh sahi, par manzil ki daleel likhi hai.",
                "words": [
                    {"text": "Ungli", "start": 208.00, "end": 208.90, "accent": False},
                    {"text": "pe", "start": 208.90, "end": 209.30, "accent": False},
                    {"text": "ink", "start": 209.30, "end": 210.00, "accent": True},
                    {"text": "ke", "start": 210.00, "end": 210.40, "accent": False},
                    {"text": "daagh", "start": 210.40, "end": 210.80, "accent": False},
                    {"text": "sahi,", "start": 210.80, "end": 211.42, "accent": False},
                    {"text": "par", "start": 211.42, "end": 212.00, "accent": False},
                    {"text": "manzil", "start": 212.00, "end": 212.82, "accent": True},
                    {"text": "ki", "start": 212.82, "end": 213.30, "accent": False},
                    {"text": "daleel", "start": 213.30, "end": 214.20, "accent": True},
                    {"text": "likhi", "start": 214.20, "end": 214.38, "accent": False},
                    {"text": "hai.", "start": 214.38, "end": 214.50, "accent": False}
                ]
            },
            {
                "id": "line_09_03",
                "text": "Haan panno ke is jungle se, raasta naya banana hai,",
                "words": [
                    {"text": "Haan", "start": 214.50, "end": 215.30, "accent": False},
                    {"text": "panno", "start": 215.30, "end": 216.20, "accent": True},
                    {"text": "ke", "start": 216.20, "end": 216.60, "accent": False},
                    {"text": "is", "start": 216.60, "end": 217.00, "accent": False},
                    {"text": "jungle", "start": 217.00, "end": 217.80, "accent": False},
                    {"text": "se,", "start": 217.80, "end": 218.30, "accent": False},
                    {"text": "raasta", "start": 218.30, "end": 219.20, "accent": True},
                    {"text": "naya", "start": 219.20, "end": 219.80, "accent": False},
                    {"text": "banana", "start": 219.80, "end": 220.26, "accent": False},
                    {"text": "hai,", "start": 220.26, "end": 220.50, "accent": False}
                ]
            },
            {
                "id": "line_09_04",
                "text": "Kore margin pe likh ke rakha: haar ke nahi hai jaana!",
                "words": [
                    {"text": "Kore", "start": 220.50, "end": 221.80, "accent": True},
                    {"text": "margin", "start": 221.80, "end": 222.54, "accent": True},
                    {"text": "pe", "start": 222.54, "end": 223.00, "accent": False},
                    {"text": "likh", "start": 223.00, "end": 223.80, "accent": False},
                    {"text": "ke", "start": 223.80, "end": 224.40, "accent": False},
                    {"text": "rakha:", "start": 224.40, "end": 225.20, "accent": False},
                    {"text": "haar", "start": 225.20, "end": 225.80, "accent": True},
                    {"text": "ke", "start": 225.80, "end": 226.20, "accent": False},
                    {"text": "nahi", "start": 226.20, "end": 226.50, "accent": False},
                    {"text": "hai", "start": 226.50, "end": 226.60, "accent": False},
                    {"text": "jaana!", "start": 226.60, "end": 227.50, "accent": False}
                ]
            }
        ]
    },
    {
        "id": "scene_10_outro",
        "name": "Sunrise Awakening & Lingering Hope",
        "sectionTag": "10 // OUTRO  •  SURAJ KO AANA HOGA",
        "startSec": 228.0,
        "endSec": total_duration_sec,
        "subtitle": "Morning sun illuminates the desk • The journey continues",
        "lines": [
            {
                "id": "line_10_01",
                "text": "Haan haar ke nahi jaana...",
                "words": [
                    {"text": "Haan", "start": 231.88, "end": 232.80, "accent": False},
                    {"text": "haar", "start": 232.80, "end": 233.60, "accent": True},
                    {"text": "ke", "start": 233.60, "end": 234.00, "accent": False},
                    {"text": "nahi", "start": 234.00, "end": 234.38, "accent": False},
                    {"text": "jaana...", "start": 234.38, "end": 235.50, "accent": False}
                ]
            },
            {
                "id": "line_10_02",
                "text": "Kore margin pe...",
                "words": [
                    {"text": "Kore", "start": 238.22, "end": 239.30, "accent": True},
                    {"text": "margin", "start": 239.30, "end": 240.38, "accent": True},
                    {"text": "pe...", "start": 240.38, "end": 241.50, "accent": False}
                ]
            },
            {
                "id": "line_10_03",
                "text": "Suraj ko aana hoga...",
                "words": [
                    {"text": "Suraj", "start": 243.90, "end": 245.00, "accent": True},
                    {"text": "ko", "start": 245.00, "end": 245.50, "accent": False},
                    {"text": "aana", "start": 245.50, "end": 246.30, "accent": False},
                    {"text": "hoga...", "start": 246.30, "end": 247.50, "accent": False}
                ]
            }
        ]
    }
]

# Process and convert seconds to exact 60fps frame numbers with strictly unique word IDs
scenes = []
global_word_counter = 0

for sc_idx, s in enumerate(scenes_raw):
    scene_start_f = f(s["startSec"])
    scene_end_f = f(s["endSec"])

    lines = []
    for l_idx, l in enumerate(s.get("lines", [])):
        words = []
        for w in l.get("words", []):
            global_word_counter += 1
            words.append({
                "id": f"w_{global_word_counter:04d}",
                "text": w["text"],
                "startFrame": f(w["start"]),
                "endFrame": f(w["end"]),
                "accent": w.get("accent", False)
            })

        line_start = words[0]["startFrame"] if words else scene_start_f
        line_end = words[-1]["endFrame"] if words else scene_end_f

        lines.append({
            "id": l["id"],
            "text": l["text"],
            "startFrame": line_start,
            "endFrame": line_end,
            "words": words
        })

    scenes.append({
        "id": s["id"],
        "name": s["name"],
        "sectionTag": s["sectionTag"],
        "startFrame": scene_start_f,
        "endFrame": scene_end_f,
        "hierarchy": "SYMBOLIC_DOMINANT",
        "symbolKey": "kore_margin_notebook",
        "subtitle": s["subtitle"],
        "lines": lines
    })

timeline_data = {
    "songTitle": "Kore Margin",
    "theme": "SongCoverArtwork",
    "audioFile": "audio/kore_margin.mp3",
    "fps": fps,
    "totalFrames": total_frames,
    "durationSeconds": total_duration_sec,
    "scenes": scenes
}

output_path = "src/songs/kore-margin/timeline.json"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(timeline_data, f, indent=2, ensure_ascii=False)

print(f"[✓] Rebuilt timeline with {len(scenes)} scenes, {global_word_counter} unique words, and {total_frames} frames ({total_duration_sec}s)!")
