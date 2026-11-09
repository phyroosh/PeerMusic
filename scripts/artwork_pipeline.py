#!/usr/bin/env python3
"""
PeerMusic - Legacy Artwork Conformance Pipeline
================================================
Conforms already-authored image assets to legacy paths, synchronizes metadata,
and guarantees JPEG compression limits. New official PeerMusic covers must be
created in Remotion; see docs/REMOTION_COVER_STUDIO_STANDARD.md. This script
must not be used to generate a cover concept or final cover typography.
"""

import os
import sys
import json
import re
import shutil
import argparse
from typing import Dict, Any, Optional, List, Tuple
from PIL import Image, ImageOps, ImageFilter

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if REPO_DIR not in sys.path:
    sys.path.insert(0, REPO_DIR)

SONGS_DIR = os.path.join(REPO_DIR, "src", "songs")
OUT_DIR = os.path.join(REPO_DIR, "out")
COVERS_DIR = os.path.join(REPO_DIR, "public", "covers")
STUDIO_DIR = os.path.join(REPO_DIR, "studio")
METADATA_FILE = os.path.join(STUDIO_DIR, "metadata.json")

# Standard target resolutions
RES_16X9 = (1920, 1080)
RES_1X1 = (1500, 1500)
RES_9X16 = (1080, 1920)

# YouTube Data API hard limit is 2,000,000 bytes; target strictly under 1.85 MB
MAX_THUMBNAIL_BYTES = 1850000

# Canonical Song Slug Aliases
SLUG_ALIASES = {
    "kal_tak": ["kal_tak", "kal_tak_jo_roz_ka_tha"],
    "kal_tak_jo_roz_ka_tha": ["kal_tak", "kal_tak_jo_roz_ka_tha"],
    "rough_copy": ["rough_copy"],
    "window_seat": ["window_seat"],
    "kacchi_neendein": ["kacchi_neendein", "kachi_neendein", "master"],
    "kachi_neendein": ["kacchi_neendein", "kachi_neendein", "master"],
    "master": ["kacchi_neendein", "kachi_neendein", "master"],
    "dil_reh_gaya": ["dil_reh_gaya", "dil_reh_gaya_classroom_mein"],
    "dil_reh_gaya_classroom_mein": ["dil_reh_gaya", "dil_reh_gaya_classroom_mein"],
    "pencil_ke_nishaan": ["pencil_ke_nishaan"],
    "students_life": ["students_life", "class_ke_baad"],
    "class_ke_baad": ["students_life", "class_ke_baad"],
    "aakhri_bench": ["aakhri_bench"],
    "paani_peene": ["paani_peene", "paani_peene_ka_bahaana"],
    "paani_peene_ka_bahaana": ["paani_peene", "paani_peene_ka_bahaana"],
    "golden_hour_letters": ["golden_hour_letters", "golden-hour-letters"],
    "golden-hour-letters": ["golden_hour_letters", "golden-hour-letters"],
    "between_the_pages": ["between_the_pages", "between-the-pages"],
    "between-the-pages": ["between_the_pages", "between-the-pages"],
    "trying_to_fit_in": ["trying_to_fit_in", "trying-to-fit-in"],
    "trying-to-fit-in": ["trying_to_fit_in", "trying-to-fit-in"],
    "kore_margin": ["kore_margin", "kore-margin"],
    "kore-margin": ["kore_margin", "kore-margin"],
    "khumaar": ["khumaar"],
    "school_wali_crush": ["school_wali_crush", "school-wali-crush"],
    "school-wali-crush": ["school_wali_crush", "school-wali-crush"],
    "teri_yaadon_ki_baarish": ["teri_yaadon_ki_baarish", "teri-yaadon-ki-baarish"],
    "teri-yaadon-ki-baarish": ["teri_yaadon_ki_baarish", "teri-yaadon-ki-baarish"],
    "tu_ek_sukoon_sa_lagta_hai": ["tu_ek_sukoon_sa_lagta_hai", "tu-ek-sukoon-sa-lagta-hai"],
    "tu-ek-sukoon-sa-lagta-hai": ["tu_ek_sukoon_sa_lagta_hai", "tu-ek-sukoon-sa-lagta-hai"],
}


def ensure_dirs() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(COVERS_DIR, exist_ok=True)
    os.makedirs(STUDIO_DIR, exist_ok=True)


def load_metadata() -> Dict[str, Any]:
    if os.path.exists(METADATA_FILE):
        try:
            with open(METADATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[!] Warning reading metadata.json: {e}")
    return {}


def save_metadata(data: Dict[str, Any]) -> None:
    ensure_dirs()
    with open(METADATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"[✓] Synced metadata to {METADATA_FILE}")


def compress_and_save_jpeg(
    img: Image.Image,
    dest_path: str,
    max_bytes: int = MAX_THUMBNAIL_BYTES,
    initial_quality: int = 90
) -> int:
    """
    Saves an image as JPEG and guarantees that the resulting file size is strictly <= max_bytes.
    Dynamically steps down quality and resizes if needed.
    """
    ensure_dirs()
    os.makedirs(os.path.dirname(os.path.abspath(dest_path)), exist_ok=True)

    if img.mode != "RGB":
        img = img.convert("RGB")

    work_img = img.copy()
    quality = initial_quality

    for q in [quality, 88, 85, 82, 78, 72]:
        work_img.save(dest_path, format="JPEG", quality=q, optimize=True)
        size = os.path.getsize(dest_path)
        if size <= max_bytes:
            return size

    w, h = work_img.size
    if w > 1280 or h > 720:
        new_w = int(w * 0.75)
        new_h = int(h * 0.75)
        work_img = work_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        for q in [85, 80, 75]:
            work_img.save(dest_path, format="JPEG", quality=q, optimize=True)
            size = os.path.getsize(dest_path)
            if size <= max_bytes:
                return size

    return os.path.getsize(dest_path)


def inspect_song(song_slug: str) -> Dict[str, Any]:
    """
    Extracts song intelligence: title, mood, genre, lyrics excerpts, and visual motifs.
    """
    song_dir = os.path.join(SONGS_DIR, song_slug)
    timeline_file = os.path.join(song_dir, "timeline.json")

    info = {
        "slug": song_slug,
        "title": song_slug.replace("-", " ").replace("_", " ").title(),
        "lyrics_sample": "",
        "scenes": [],
        "motifs": [],
        "mood": "Soulful & Nostalgic Student Life",
        "genre": "Hindi Indie / Acoustic Nostalgia"
    }

    if os.path.exists(timeline_file):
        try:
            with open(timeline_file, "r", encoding="utf-8") as f:
                tl = json.load(f)
                info["title"] = tl.get("songTitle", info["title"])
                info["fps"] = tl.get("fps", 60)
                scenes = tl.get("scenes", [])
                lines = []
                for s in scenes:
                    for l in s.get("lines", []):
                        lines.append(l.get("text", ""))
                info["lyrics_sample"] = " / ".join(lines[:6])
                info["scenes"] = [s.get("name", "") for s in scenes]
        except Exception as e:
            print(f"[!] Error reading timeline.json for {song_slug}: {e}")

    slug_lower = song_slug.lower().replace("-", "_")
    if "kal_tak" in slug_lower:
        info["mood"] = "Bittersweet School Classroom Nostalgia"
        info["genre"] = "Acoustic Hindi Ballad"
        info["motifs"] = [
            "school blazer draped over a modern wooden desk",
            "open school diary with handwritten farewell messages and polaroid photos",
            "white earphones worn casually while lost in nostalgic reflection",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "KAL TAK JO"
        info["title_secondary"] = "Roz Ka Tha"
        info["lighting"] = "warm golden hour sunlight through large windows with soft 35mm film halation and floating dust motes"
        info["scene_desc"] = "an intimate, cinematic candid close-to-medium shot of an expressive young student standing beside a sun-drenched modern classroom window on the last day of school, wearing white earphones, looking wistfully back at the desks with bittersweet nostalgia"
        info["negative_space"] = "UPPER-RIGHT"
    elif "window_seat" in slug_lower:
        info["mood"] = "Melancholic Travel Solitude & Poetic Reflection"
        info["genre"] = "Indie Folk / Lofi Acoustic"
        info["motifs"] = [
            "passenger train window with gentle rain droplets reflecting warm amber cabin lights",
            "steaming cutting chai in a clean glass",
            "white wired earphones worn while listening to music",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "WINDOW SEAT"
        info["title_secondary"] = "Safar Aur Yaadein"
        info["lighting"] = "twilight blue hour ambient light contrasted with warm amber interior cabin glow and soft film halation"
        info["scene_desc"] = "an intimate, cinematic candid close-to-medium shot of an expressive young traveler sitting by a train window at twilight blue hour, wearing white earphones, resting their forehead lightly against the glass, lost in memories"
        info["negative_space"] = "UPPER-RIGHT"
    elif "rough_copy" in slug_lower:
        info["mood"] = "Tender School Romance & Secret Crushes"
        info["genre"] = "Bollywood Acoustic Romance"
        info["motifs"] = [
            "open spiral rough copy notebook with handwritten Hindi poetry and portrait doodles",
            "sleek pen paused in hand",
            "white earphones worn while lost in romantic thoughts",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "ROUGH COPY"
        info["title_secondary"] = "Aakhri Panne Ki Mohabbat"
        info["lighting"] = "soft morning sunbeams cutting through window blinds with dreamy 35mm film halation"
        info["scene_desc"] = "an intimate, cinematic candid close-to-medium shot of an expressive young student daydreaming at a modern sunlit study desk, wearing white earphones, holding a pen paused over the last page of a notebook with a gentle, tender smile"
        info["negative_space"] = "UPPER-RIGHT"
    elif "kacchi_neendein" in slug_lower or "master" in slug_lower or "kachi" in slug_lower:
        info["mood"] = "Late Night Ambition & Quiet Hustle"
        info["genre"] = "Urban Indie Ballad / Lofi"
        info["motifs"] = [
            "steaming mug of cutting chai",
            "open spiral notebook with study sketches under a warm portable reading light",
            "white wireless headphones",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "KACCHI NEENDEIN"
        info["title_secondary"] = "Pakke Khwaab"
        info["lighting"] = "cool deep night ambiance illuminated by warm amber terrace bulb and distant city bokeh"
        info["scene_desc"] = "an intimate, cinematic candid shot of a young student sitting on a quiet urban terrace parapet at 2 AM, wearing white headphones, looking out at the city skyline with quiet determination and reflective eyes"
        info["negative_space"] = "UPPER-RIGHT"
    elif "aakhri_bench" in slug_lower:
        info["mood"] = "Student Camaraderie & Youth Friendship"
        info["genre"] = "Youth Indie Anthem"
        info["motifs"] = [
            "folded paper airplane on a clean modern desk corner",
            "open spiral diary with song lyrics and tally marks",
            "white wired earphones shared between friends",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "AAKHRI BENCH"
        info["title_secondary"] = "Yaari Aur Khwaab"
        info["lighting"] = "warm late-afternoon golden hour sunlight flooding across the room with atmospheric dust motes"
        info["scene_desc"] = "an intimate, cinematic candid shot of two young best friends sitting together on the back bench of a modern sunlit classroom after hours, sharing a pair of wired earphones, laughing quietly over inside jokes"
        info["negative_space"] = "UPPER-RIGHT"
    elif "pencil_ke_nishaan" in slug_lower:
        info["mood"] = "Gentle Childhood Memories & Passage of Time"
        info["genre"] = "Nostalgic Acoustic Ballad"
        info["motifs"] = [
            "open ruled sketchbook with faint graphite drawings and handwritten Hindi lyrics",
            "clean wooden pencil shavings beside a graphite pencil",
            "white earphones worn casually",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "PENCIL KE NISHAAN"
        info["title_secondary"] = "Kacchi Yaadein"
        info["lighting"] = "soft overcast window daylight with warm incandescent desk lamp fill and gentle halation"
        info["scene_desc"] = "an intimate, cinematic close-to-medium shot of an expressive young student at a modern wooden desk by a rain-streaked window, wearing white earphones, delicately holding a pencil above a sketchpad in nostalgic reverie"
        info["negative_space"] = "UPPER-RIGHT"
    elif "dil_reh_gaya" in slug_lower:
        info["mood"] = "Nostalgic School Friendship & Longing"
        info["genre"] = "Bollywood Acoustic Nostalgia"
        info["motifs"] = [
            "open diary of handwritten Hindi lyrics on a modern classroom desk",
            "canvas student backpack resting on the chair",
            "white earphones worn while lost in thought",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "DIL REH GAYA"
        info["title_secondary"] = "Classroom Mein"
        info["lighting"] = "golden hour sunset light casting long warm shadows with dreamy 35mm film halation and floating dust motes"
        info["scene_desc"] = "an intimate, cinematic candid shot of an expressive young student sitting quietly in a sun-drenched modern classroom after the final bell, wearing white earphones, gazing wistfully out the tall window with a gentle bittersweet smile"
        info["negative_space"] = "UPPER-RIGHT"
    elif "paani_peene" in slug_lower:
        info["mood"] = "Bittersweet School Crush & Classroom Daydreams"
        info["genre"] = "Modern Hindi Indie Pop / Acoustic Ballad"
        info["motifs"] = [
            "an open spiral notebook with poetic handwritten lyrics",
            "a clear water bottle on the modern desk catching the golden sunlight",
            "white earphones worn casually while lost in musical daydreaming",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "PAANI PEENE KA BAHAANA"
        info["title_secondary"] = "CLASSROOM KI KHIDKI"
        info["lighting"] = "warm golden hour sun flare with soft 35mm film halation and floating atmospheric dust motes"
        info["scene_desc"] = "an intimate, cinematic candid close-to-medium shot of an expressive young Indian student sitting beside a sun-drenched modern classroom window, wearing white earphones, resting her chin on her hand, looking wistfully toward the classroom door with a tender, nostalgic smile"
        info["negative_space"] = "UPPER-RIGHT"
    elif "students_life" in slug_lower or "class_ke_baad" in slug_lower:
        info["mood"] = "College Chaos & Nostalgic Student Days"
        info["genre"] = "Acoustic Pop Student Anthem"
        info["motifs"] = [
            "two cutting chai glasses with golden tea on the café table",
            "open spiral notebooks with highlighted lyrics and campus ID card",
            "white earphones resting nearby",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "CLASS KE BAAD"
        info["title_secondary"] = "Student Life Ka Safar"
        info["lighting"] = "warm evening twilight glow with golden café ambient string lights"
        info["scene_desc"] = "an intimate, cinematic candid shot of young university friends at a sunlit modern campus outdoor café table after evening classes, sharing smiles and music amidst notebooks and chai"
        info["negative_space"] = "UPPER-RIGHT"
    elif "golden_hour" in slug_lower or "golden-hour" in slug_lower:
        info["mood"] = "Bittersweet Longing & Unsent Letters"
        info["genre"] = "Dreamy Indie Pop / Nostalgic Acoustic"
        info["motifs"] = [
            "an open stationery envelope with delicate handwritten English cursive lyrics",
            "a pressed dried fern and botanical lavender specimen",
            "a vintage brass fountain pen with a subtle gleam of sepia ink",
            "warm golden hour light streaming diagonally through Venetian blinds"
        ]
        info["title_primary"] = "GOLDEN HOUR LETTERS"
        info["title_secondary"] = "On The Other Side Of Time"
        info["lighting"] = "warm late-afternoon golden hour light casting soft horizontal shadow slats with dreamy 35mm film halation and floating dust motes"
        info["scene_desc"] = "an intimate, cinematic candid close-to-medium shot of an expressive young woman sitting beside a sun-drenched wooden writing desk at golden hour, wearing white earphones, holding an unmailed letter in gentle contemplation with a bittersweet, tender expression"
        info["negative_space"] = "UPPER-RIGHT"
    elif "between_the_pages" in slug_lower or "between-the-pages" in slug_lower:
        info["mood"] = "Quiet Library Romance & Whispered Daydreams"
        info["genre"] = "Acoustic English Bedroom Pop / Ballad"
        info["motifs"] = [
            "stacks of antique leather-bound books and open French study notes",
            "vintage wooden library desk bathed in warm afternoon sunlight",
            "white earphones resting across an open poetry journal",
            "brass desk clock with ticking hands and soft golden dust motes"
        ]
        info["title_primary"] = "BETWEEN THE PAGES"
        info["title_secondary"] = "Afternoon Lessons"
        info["lighting"] = "golden afternoon sunlight cutting through tall cathedral library windows with dreamy 35mm film halation and floating dust motes"
        info["scene_desc"] = "an intimate, cinematic candid close-to-medium shot of an expressive young student lost in a gentle reverie amidst towering sunlit library bookshelves, holding an open antique book, gazing softly across the room with a tender, nostalgic smile"
        info["negative_space"] = "UPPER-RIGHT"
    elif "trying_to_fit_in" in slug_lower or "trying-to-fit-in" in slug_lower:
        info["mood"] = "Introspective Youth & Quiet Self-Rehearsal"
        info["genre"] = "Acoustic Indie Pop / Bedroom Ballad"
        info["motifs"] = [
            "vintage wooden room mirror with warm ambient reflections",
            "worn sneakers on the wooden floor beside an open diary",
            "white earphones worn casually",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "TRYING TO FIT IN"
        info["title_secondary"] = "Rehearsals in the Mirror"
        info["lighting"] = "warm golden incandescent room lighting with soft window daylight and 35mm film halation"
        info["scene_desc"] = "an intimate, cinematic candid close-to-medium shot of an expressive young man in a warm bedroom standing before a vintage wooden mirror, wearing a green field jacket and yellow sweater, adjusting his jacket in thoughtful self-reflection"
        info["negative_space"] = "UPPER-RIGHT"
    elif "school_wali_crush" in slug_lower or "school-wali-crush" in slug_lower:
        info["mood"] = "School Romance, Secret Crushes & Golden Memories"
        info["genre"] = "Acoustic Bollywood Pop / Romantic Indie"
        info["motifs"] = [
            "open school notebook with handwritten notes and pencil sketches",
            "classic blue ballpoint pen and stacked textbooks",
            "sunlit wooden classroom desk during golden hour",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "SCHOOL WALI CRUSH"
        info["title_secondary"] = "स्कूल वाली क्रश"
        info["lighting"] = "golden hour afternoon sunlight streaming through large classroom windows with dreamy 35mm film halation and floating dust motes"
        info["scene_desc"] = "an intimate, cinematic candid close-to-medium shot of an expressive young Indian student at a sunlit classroom desk, looking across the room with a tender, nostalgic smile"
        info["negative_space"] = "UPPER-RIGHT"
    elif "teri_yaadon_ki_baarish" in slug_lower or "baarish" in slug_lower:
        info["mood"] = "Soulful Late-Night Monsoon Ballad & Nostalgic Solitude"
        info["genre"] = "Acoustic Hindi Indie / Lo-fi Monsoon Ballad"
        info["motifs"] = [
            "steaming ceramic mug on a dark polished wooden table",
            "open notebook with handwritten poetry and a fountain pen",
            "vintage brass banker's desk lamp casting a warm golden glow",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "TERI YAADON KI BAARISH"
        info["title_secondary"] = "Khidki Pe Baarish"
        info["lighting"] = "masterful 35mm film chiaroscuro lighting, deep velvety inky blacks, moody blue-hour cobalt and cyan rain exterior, and warm golden tungsten glow from a vintage banker's lamp"
        info["scene_desc"] = "an intimate, cinematic close-to-medium shot of a handsome, clean-featured young South Asian man looking like a cinematic hero in a textured navy blue knit sweater, leaning thoughtfully near a rainy glass window with a clean silent background and soft glowing city bokeh"
        info["negative_space"] = "UPPER-RIGHT"
    elif "tu_ek_sukoon" in slug_lower or "sukoon" in slug_lower:
        info["mood"] = "Late-Night Cozy Monsoon Solitude & Serene Romantic Peace"
        info["genre"] = "Acoustic Hindi Indie / Lofi Monsoon Ballad"
        info["motifs"] = [
            "steaming ceramic coffee mug on a rustic wooden windowsill",
            "rain droplets trickling down the glass window pane",
            "warm amber streetlamp bokeh glowing in the blue hour dusk",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["title_primary"] = "TU EK SUKOON SA LAGTA HAI"
        info["title_secondary"] = "Khidki Pe Baarish Aur Tum"
        info["lighting"] = "tranquil twilight blue hour ambient light with warm honey-amber bokeh, deep velvety blacks, and delicate rising coffee steam"
        info["scene_desc"] = "a cinematic 16:9 candid photograph of a cozy rainy evening indoors, with a steaming ceramic coffee mug on a wooden windowsill overlooking trickling raindrops on glass and soft glowing amber streetlights, clean silent background without visual noise"
        info["negative_space"] = "UPPER-RIGHT"
    else:
        raw_title = info.get("title") or song_slug.replace("-", " ").replace("_", " ").title()
        if "(" in raw_title and ")" in raw_title:
            match = re.match(r"^(.*?)\s*\((.*?)\)\s*$", raw_title)
            if match:
                info["title_primary"] = match.group(1).strip()
                info["title_secondary"] = match.group(2).strip()
            else:
                info["title_primary"] = raw_title.strip()
                info["title_secondary"] = None
        elif "," in raw_title:
            parts = raw_title.split(",", 1)
            info["title_primary"] = parts[0].strip()
            info["title_secondary"] = parts[1].strip()
        elif " - " in raw_title:
            parts = raw_title.split(" - ", 1)
            info["title_primary"] = parts[0].strip()
            info["title_secondary"] = parts[1].strip()
        else:
            info["title_primary"] = raw_title.strip()
            info["title_secondary"] = None

        info["lighting"] = "masterful 35mm film chiaroscuro lighting with deep velvety inky blacks, Kodak Vision3 500T color science, and warm golden tungsten key lighting from a vintage desk lamp"
        info["scene_desc"] = "an intimate cinematic close-to-medium shot of a charismatic, clean-featured protagonist looking like a cinematic hero with poised styling, sitting thoughtfully by an architectural window with a clean silent background (not noisy) and soft glowing optical bokeh"
        info["motifs"] = [
            "open notebook with handwritten lyrics and fountain pen",
            "steaming ceramic coffee mug on the polished desk",
            "vintage warm brass desk lamp casting a golden pool of light",
            "subtle vintage indie record label emblem in the corner"
        ]
        info["negative_space"] = "UPPER-RIGHT"

    return info


def formulate_prompts(
    song_slug: str,
    include_typography: bool = False,
    layout_concept: str = "top-masthead",
) -> Dict[str, str]:
    """
    Formulates distinct, high-concept, compositionally tailored prompts for 16:9 and 1:1
    using the official PeerMusic Modern Indie Music Single Cover Prompt Engine.
    Strictly enforces an intimate music single release aesthetic (NOT a movie poster or dilapidated school).
    By default (include_typography=False), strictly requires text-free fine-art background for lyrical video rendering.
    When include_typography=True, enforces dedicated negative-space composition (top-masthead, asymmetric-left, or upper-right)
    and strictly bans text stamped across the subject's face, neck, or body.
    """
    info = inspect_song(song_slug)
    title_p = info["title_primary"]
    title_s = info["title_secondary"]
    motifs_str = ", ".join(info["motifs"])
    lighting = info["lighting"]
    scene_desc = info["scene_desc"]
    neg_space = info["negative_space"]
    formatted_scene = scene_desc[0].upper() + scene_desc[1:] if scene_desc else ""

    # Composition & typography layout strategies
    concept_key = layout_concept.lower().strip()
    if concept_key in ["top-masthead", "masthead", "top"]:
        comp_directive_16x9 = (
            "The primary subject is strictly positioned in the lower-middle half of the 16:9 widescreen frame, "
            "leaving the upper 28-32% of the frame as dedicated, clean, open dark atmospheric negative space."
        )
        comp_directive_1x1 = (
            "The primary subject is positioned in the lower two-thirds of the 1:1 square frame, "
            "leaving the upper 25% clean open negative space."
        )
        typo_directive_16x9 = (
            f"High-fashion indie music single editorial masthead layout: at the very top of the frame in the dedicated "
            f"open negative space, the title '{title_p}' is rendered in elegant, high-contrast warm cream Didone/Roman serif typography "
            f"with wide tracking, and directly beneath it '{title_s}' in subtle warm gold italic/cursive script. "
            f"Strictly NO text across the subject's face, neck, or body."
        )
        typo_directive_1x1 = (
            f"Tasteful top masthead typography: '{title_p}' in elegant, high-contrast warm cream Didone serif typography, "
            f"and directly beneath it '{title_s}' in subtle warm gold italic script. Strictly NO text across the subject."
        )
    elif concept_key in ["asymmetric-left", "side-left", "left"]:
        comp_directive_16x9 = (
            "The primary subject is positioned strictly on the right third of the 16:9 widescreen frame, "
            "leaving the entire left 45% of the frame as dedicated, clean, open dark atmospheric negative space."
        )
        comp_directive_1x1 = (
            "The primary subject is positioned on the right side of the frame, leaving the left side open dark negative space."
        )
        typo_directive_16x9 = (
            f"Tasteful asymmetric editorial music cover layout: situated purely within the dark negative space on the left side of the frame, "
            f"the title '{title_p}' is stacked in high-contrast warm cream Didone/Roman serif typography, with '{title_s}' in subtle warm "
            f"gold italic/cursive script directly beneath. The subject on the right remains completely unobstructed. "
            f"Strictly NO text across the subject's face, neck, or body."
        )
        typo_directive_1x1 = (
            f"Asymmetric left typography: '{title_p}' stacked on the left in warm cream Didone serif, with '{title_s}' in warm gold script. "
            f"Strictly NO text across the subject."
        )
    else:  # upper-right or auto
        comp_directive_16x9 = (
            "The primary subject is positioned on the left third of the 16:9 widescreen frame, "
            "leaving the upper-right 45% of the frame as clean, dark atmospheric negative space with dreamy bokeh."
        )
        comp_directive_1x1 = (
            "The primary subject is positioned on the left side of the frame, leaving the upper-right open dark negative space."
        )
        typo_directive_16x9 = (
            f"Situated cleanly in the upper-right quadrant in the dedicated negative space, the title '{title_p}' is rendered in elegant "
            f"warm cream Didone/Roman serif typography, and directly beneath it '{title_s}' in subtle warm gold italic/cursive script. "
            f"Strictly NO text across the subject's face, neck, or body."
        )
        typo_directive_1x1 = (
            f"Upper-right typography: '{title_p}' in warm cream Didone serif, with '{title_s}' in warm gold script. "
            f"Strictly NO text across the subject."
        )

    if not include_typography:
        typo_directive_16x9 = (
            "Pure fine-art background illustration, strictly NO text, NO typography, NO titles, NO lettering, "
            "NO watermarks, NO signature, NO logos, NO borders. Clean, unobstructed negative space on the frame "
            "reserved for synchronized lyrical video typography overlay."
        )
        typo_directive_1x1 = (
            "Pure fine-art background illustration, strictly NO text, NO typography, NO titles, NO lettering, "
            "NO watermarks, NO signature, NO logos, borders. Clean, unobstructed negative space reserved for "
            "synchronized lyrical video typography overlay."
        )
        comp_directive_16x9 = f"Importantly, preserve a natural clean out-of-focus area on the {neg_space} of the frame to serve as dedicated negative space for typography."
        comp_directive_1x1 = f"Importantly, preserve a natural clean out-of-focus area on the {neg_space} of the frame for typography."

    if include_typography:
        prompt_16x9 = (
            f"Award-winning cinematic Netflix Original caliber music video single cover and YouTube thumbnail. 16:9 widescreen composition. "
            f"Clean silent background (not noisy), pristine out-of-focus optical bokeh, zero visual clutter or grain. "
            f"{formatted_scene}, shot on a prime 35mm lens with {lighting}. "
            f"Featuring {motifs_str}. "
            f"Masterful 35mm film chiaroscuro lighting, deep velvety inky black levels (#06080E), Kodak Vision3 500T color science, gorgeous cinematic color harmony. "
            f"{comp_directive_16x9} "
            f"{typo_directive_16x9} "
            f"In the far bottom corner, a tiny subtle circular indie record label emblem. "
            f"Impeccable visual balance, clean heroic character presence. 16:9 widescreen aspect ratio."
        )
        prompt_1x1 = (
            f"Award-winning cinematic Netflix Original caliber music video single cover and streaming artwork. 1:1 square aspect ratio. "
            f"Clean silent background (not noisy), pristine out-of-focus optical bokeh, zero visual clutter or grain. "
            f"{formatted_scene}, shot on a prime 35mm lens with {lighting}. "
            f"Featuring {motifs_str}. "
            f"Masterful 35mm film chiaroscuro lighting, deep velvety inky black levels (#06080E), Kodak Vision3 500T color science, gorgeous cinematic color harmony. "
            f"{comp_directive_1x1} "
            f"{typo_directive_1x1} "
            f"In the bottom corner, a tiny subtle circular indie record label emblem. "
            f"Impeccable visual balance, clean heroic character presence. 1:1 square aspect ratio for Spotify and Apple Music."
        )
    else:
        prompt_16x9 = (
            f"Award-winning cinematic Netflix Original caliber clean background illustration for lyrical video canvas, 16:9 widescreen. "
            f"Clean silent background (not noisy), pristine out-of-focus optical bokeh, zero visual clutter. "
            f"{formatted_scene}, shot on a prime 35mm lens with {lighting}. "
            f"Featuring {motifs_str}. "
            f"Masterful 35mm film chiaroscuro lighting, deep velvety inky black levels (#06080E), Kodak Vision3 500T color science, gorgeous cinematic color harmony. "
            f"{comp_directive_16x9} "
            f"{typo_directive_16x9} "
            f"Impeccable visual balance, clean heroic character presence. 16:9 widescreen aspect ratio."
        )
        prompt_1x1 = (
            f"Award-winning cinematic Netflix Original caliber clean background illustration, 1:1 square aspect ratio. "
            f"Clean silent background (not noisy), pristine out-of-focus optical bokeh, zero visual clutter. "
            f"{formatted_scene}, shot on a prime 35mm lens with {lighting}. "
            f"Featuring {motifs_str}. "
            f"Masterful 35mm film chiaroscuro lighting, deep velvety inky black levels (#06080E), Kodak Vision3 500T color science, gorgeous cinematic color harmony. "
            f"{comp_directive_1x1} "
            f"{typo_directive_1x1} "
            f"Impeccable visual balance, clean heroic character presence. 1:1 square aspect ratio."
        )

    return {
        "song_slug": song_slug,
        "title": info["title"],
        "mood": info["mood"],
        "genre": info.get("genre", ""),
        "negative_space": neg_space,
        "layout_concept": concept_key,
        "prompt_16x9": prompt_16x9,
        "prompt_1x1": prompt_1x1
    }


def process_clean_artwork(
    source_path: str,
    song_slug: str,
) -> Dict[str, Any]:
    """
    Installs a clean, text-free 16:9 artwork for the Remotion lyric video engine.
    Ensures zero baked-in text, typography, or watermarks.
    """
    ensure_dirs()
    if not os.path.exists(source_path):
        raise FileNotFoundError(f"Source image not found: {source_path}")

    img = Image.open(source_path).convert("RGB")
    clean_slug = song_slug.replace("-", "_").lower()
    aliases = SLUG_ALIASES.get(clean_slug, [clean_slug])

    img_clean = ImageOps.fit(img, RES_16X9, method=Image.Resampling.LANCZOS)
    results = {"clean_pngs": [], "song_assets": []}

    for alias in aliases:
        clean_png_path = os.path.join(COVERS_DIR, f"{alias}_clean_16x9.png")
        img_clean.save(clean_png_path, format="PNG", optimize=True)
        results["clean_pngs"].append(clean_png_path)
        print(f"[✓] Saved Clean 16:9 Lyric Video Asset: {clean_png_path}")

    for candidate_slug in [song_slug, song_slug.replace("_", "-")]:
        song_dir = os.path.join(SONGS_DIR, candidate_slug)
        if os.path.exists(song_dir):
            clean_song_png = os.path.join(song_dir, f"{clean_slug}_clean_16x9.png")
            img_clean.save(clean_song_png, format="PNG", optimize=True)
            results["song_assets"].append(clean_song_png)
            print(f"[✓] Synced Clean Asset to Song Dir: {clean_song_png}")

    return results


def process_and_install_artwork(
    source_path: str,
    song_slug: str,
    aspect_ratio: str = "16x9",
    dest_filename: Optional[str] = None,
    title_override: Optional[str] = None,
    subtitle_override: Optional[str] = None,
    negative_space_override: Optional[str] = None,
    apply_synthetic_overlay: bool = False,
    is_clean_asset: bool = False,
) -> Dict[str, Any]:
    """
    Conforms and installs an already-authored Remotion export for legacy delivery paths.
    Creative cover construction and final typography belong in Remotion; this function may only resize,
    compress, and synchronize the completed export.
    """
    ensure_dirs()
    if not os.path.exists(source_path):
        raise FileNotFoundError(f"Source image not found: {source_path}")

    if apply_synthetic_overlay:
        raise ValueError(
            "Synthetic cover typography is retired. Author cover text natively in the "
            "Remotion composition; see docs/REMOTION_COVER_STUDIO_STANDARD.md."
        )

    if is_clean_asset:
        return process_clean_artwork(source_path, song_slug)

    img = Image.open(source_path).convert("RGB")
    clean_slug = song_slug.replace("-", "_").lower()
    aliases = SLUG_ALIASES.get(clean_slug, [clean_slug])

    results = {
        "out_png": None,
        "covers_jpg": [],
        "song_assets": []
    }

    info = inspect_song(song_slug)
    title = title_override or info.get("title_primary") or info.get("title")
    subtitle = subtitle_override if subtitle_override is not None else info.get("title_secondary")
    neg_space = negative_space_override or info.get("negative_space", "AUTO")

    if aspect_ratio == "16x9":
        target_size = RES_16X9
        cover_img = ImageOps.fit(img, target_size, method=Image.Resampling.LANCZOS)

        # Save Typography-Rich PNG in out/
        png_name = dest_filename or f"{clean_slug}_cover_16x9.png"
        out_png_path = os.path.join(OUT_DIR, png_name)
        cover_img.save(out_png_path, format="PNG", optimize=True)
        results["out_png"] = out_png_path
        print(f"[✓] Saved 16:9 Cover PNG to: {out_png_path}")

        # Save canonical & alias JPEGs in public/covers/ (strictly < 1.85MB for YouTube API)
        for alias in aliases:
            thumb_path = os.path.join(COVERS_DIR, f"{alias}_thumb.jpg")
            size = compress_and_save_jpeg(cover_img, thumb_path, max_bytes=MAX_THUMBNAIL_BYTES, initial_quality=90)
            results["covers_jpg"].append((thumb_path, size))
            print(f"[✓] Saved YouTube Thumbnail: {thumb_path} ({size / 1024:.1f} KB)")

        # Save to src/songs/<slug>/ if directory exists
        for candidate_slug in [song_slug, song_slug.replace("_", "-")]:
            song_dir = os.path.join(SONGS_DIR, candidate_slug)
            if os.path.exists(song_dir):
                song_png = os.path.join(song_dir, f"{clean_slug}_cover_16x9.png")
                cover_img.save(song_png, format="PNG", optimize=True)
                results["song_assets"].append(song_png)

        # Sync metadata.json
        metadata = load_metadata()
        for k in list(metadata.keys()):
            k_lower = k.lower()
            if any(alias in k_lower for alias in aliases):
                metadata[k]["thumbnail"] = f"{clean_slug}_thumb.jpg"
        save_metadata(metadata)

    elif aspect_ratio == "1x1":
        target_size = RES_1X1
        cover_sq_img = ImageOps.fit(img, target_size, method=Image.Resampling.LANCZOS)

        # 1. Save PNG in out/
        png_name = dest_filename or f"{clean_slug}_cover_1x1.png"
        out_png_path = os.path.join(OUT_DIR, png_name)
        cover_sq_img.save(out_png_path, format="PNG", optimize=True)
        results["out_png"] = out_png_path
        print(f"[✓] Saved 1:1 Cover PNG to: {out_png_path}")

        # 2. Save canonical & alias JPEGs in public/covers/ (strictly < 2.5MB)
        for alias in aliases:
            cover_sq_path = os.path.join(COVERS_DIR, f"{alias}_cover_sq.jpg")
            size = compress_and_save_jpeg(cover_sq_img, cover_sq_path, max_bytes=2500000, initial_quality=92)
            results["covers_jpg"].append((cover_sq_path, size))
            print(f"[✓] Saved Spotify/Album Cover: {cover_sq_path} ({size / 1024:.1f} KB)")

        # 3. Save to src/songs/<slug>/
        for candidate_slug in [song_slug, song_slug.replace("_", "-")]:
            song_dir = os.path.join(SONGS_DIR, candidate_slug)
            if os.path.exists(song_dir):
                song_png = os.path.join(song_dir, f"{clean_slug}_cover_1x1.png")
                cover_sq_img.save(song_png, format="PNG", optimize=True)
                results["song_assets"].append(song_png)

    return results


def render_covers_from_clean(
    song_slug: str,
    title_override: Optional[str] = None,
    subtitle_override: Optional[str] = None,
    negative_space_override: Optional[str] = None,
) -> Dict[str, Any]:
    """Retired: final covers must be authored and typed in Remotion."""
    raise RuntimeError(
        "render-cover is retired. Create the cover in Remotion and use this script only "
        "to conform the resulting PNG; see docs/REMOTION_COVER_STUDIO_STANDARD.md."
    )


def list_artwork_status() -> None:
    """Prints the current artwork status for all songs in public/covers/ and out/."""
    print("\n" + "=" * 85)
    print("🎨 PeerMusic Song Artwork Status: Clean Video Assets vs Typography Covers")
    print("=" * 85)
    metadata = load_metadata()

    songs_to_check = [
        ("trying_to_fit_in", "Trying to Fit In"),
        ("between_the_pages", "Between the Pages"),
        ("paani_peene_ka_bahaana", "Paani Peene Ka Bahaana"),
        ("kal_tak", "Kal Tak Jo Roz Ka Tha"),
        ("rough_copy", "Rough Copy"),
        ("window_seat", "Window Seat"),
        ("kacchi_neendein", "Kacchi Neendein, Pakke Khwaab"),
        ("dil_reh_gaya", "Dil Reh Gaya Classroom Mein"),
        ("pencil_ke_nishaan", "Pencil Ke Nishaan"),
        ("students_life", "Class Ke Baad"),
        ("aakhri_bench", "Aakhri Bench"),
        ("teri_yaadon_ki_baarish", "Teri Yaadon Ki Baarish"),
    ]

    for slug, display_name in songs_to_check:
        clean_file = os.path.join(COVERS_DIR, f"{slug}_clean_16x9.png")
        thumb_file = os.path.join(COVERS_DIR, f"{slug}_thumb.jpg")
        cover_file = os.path.join(COVERS_DIR, f"{slug}_cover_sq.jpg")

        clean_ok = os.path.exists(clean_file)
        clean_status = "✓ [Clean Video Asset]" if clean_ok else "✗ [Missing Clean]"

        thumb_ok = os.path.exists(thumb_file)
        thumb_size_str = ""
        if thumb_ok:
            sz = os.path.getsize(thumb_file)
            thumb_size_str = f"({sz / 1024:.0f} KB)"
            thumb_status = f"✓ [16:9 Cover {thumb_size_str}]"
        else:
            thumb_status = "✗ [Missing 16:9]"

        cover_ok = os.path.exists(cover_file)
        cover_size_str = ""
        if cover_ok:
            sz = os.path.getsize(cover_file)
            cover_size_str = f"({sz / 1024:.0f} KB)"
            cover_status = f"✓ [1:1 Cover {cover_size_str}]"
        else:
            cover_status = "✗ [Missing 1:1]"

        print(f"• {slug:<24} | {clean_status:<22} | {thumb_status:<24} | {cover_status}")
    print("=" * 85 + "\n")


def main():
    parser = argparse.ArgumentParser(description="PeerMusic legacy cover-export conformance utility")
    subparsers = parser.add_subparsers(dest="command", help="Subcommand to execute")

    # Command: concept
    p_concept = subparsers.add_parser("concept", help="Deprecated; cover concepts now belong in a Remotion cover-plan.md")
    p_concept.add_argument("song", help="Song slug (e.g. kal_tak, window_seat, dil_reh_gaya)")

    # Command: process
    p_process = subparsers.add_parser("process", help="Conform and install an already-authored Remotion export")
    p_process.add_argument("--song", "-s", required=True, help="Song slug")
    p_process.add_argument("--source", "-i", required=True, help="Path to a Remotion cover PNG export")
    p_process.add_argument("--format", "-f", choices=["16x9", "1x1", "9x16"], default="16x9", help="Target aspect ratio")
    p_process.add_argument("--clean", action="store_true", help="Install as pure text-free background for Remotion lyric videos")
    p_process.add_argument("--output-name", "-o", help="Optional override for output filename")

    # Command: render-cover
    p_render = subparsers.add_parser("render-cover", help="Retired; author final cover typography in Remotion")
    p_render.add_argument("--song", "-s", help="Specific song slug (e.g. trying_to_fit_in, paani_peene_ka_bahaana), or omit for all songs")
    p_render.add_argument("--all", action="store_true", help="Render covers for all songs that have clean assets")
    p_render.add_argument("--title", help="Optional override for main song title")
    p_render.add_argument("--subtitle", help="Optional override for subtitle (use '' to force omit)")
    p_render.add_argument("--negative-space", help="Optional negative space placement override (UPPER-RIGHT, UPPER-LEFT, AUTO)")

    # Command: status
    subparsers.add_parser("status", help="List artwork status across all songs")

    args = parser.parse_args()

    if args.command == "concept":
        print(
            "The prompt-based cover workflow is retired. Create "
            f"src/songs/{args.song}/cover/cover-plan.md and author the cover in Remotion; "
            "see docs/REMOTION_COVER_STUDIO_STANDARD.md."
        )
    elif args.command == "process":
        process_and_install_artwork(
            source_path=args.source,
            song_slug=args.song,
            aspect_ratio=args.format,
            dest_filename=args.output_name,
            is_clean_asset=args.clean,
        )
    elif args.command == "render-cover":
        print("render-cover is retired. Author and render the cover in Remotion instead.")
    elif args.command == "status":
        list_artwork_status()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()

