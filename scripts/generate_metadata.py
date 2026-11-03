#!/usr/bin/env python3
"""
PeerMusic / Student's Studio - Automated YouTube Metadata Generator
===================================================================
Generates high-converting, soulful YouTube release packages (Titles,
Rich Lyrics & Chapters Descriptions, 400-480 char SEO Tags, Relatable
Community Pinned Comments, Category 10: Music) tailored for the Indian
student/aspirant Hindi indie music aesthetic.

Syncs directly with studio/metadata.json.
"""

import os
import sys
import json
import re
from typing import Dict, Any, List, Optional, Tuple

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STUDIO_DIR = os.path.join(ROOT_DIR, "studio")
METADATA_FILE = os.path.join(STUDIO_DIR, "metadata.json")
OUT_DIR = os.path.join(ROOT_DIR, "out")
SONGS_DIR = os.path.join(ROOT_DIR, "src", "songs")

# Suffixes to strip from filenames
SUFFIX_PATTERN = re.compile(
    r"(_(master|landscape|vertical|short|shorts|fast|slowed|final|render|v\d+|preview|test))+$",
    re.IGNORECASE,
)

# Known song configuration and thematic hooks
SONG_THEMES = {
    "dil-reh-gaya-classroom-mein": {
        "title": "Dil Reh Gaya Classroom Mein",
        "landscapeHook": "Nostalgic School & Student Life Indie",
        "verticalHook": "Nostalgic School Memories #Shorts 🎒🎧",
        "synopsis": (
            "Kuchh lamhe school ki unhi benchon pe reh jaate hain, aur dil wahin thehar jaata hai...\n"
            "An ode to morning bells, shared tiffins, innocent corridor glances, and the bittersweet realization that we grew up too fast."
        ),
        "pinnedComment": (
            "☕ From morning assembly prayers to the last bell rush—which memory from \"Dil Reh Gaya Classroom Mein\" hit closest to home for you? Drop your story below! ❤️🎒"
        ),
        "extraTags": [
            "dil reh gaya song",
            "dil reh gaya classroom mein lyrics",
            "classroom nostalgia song",
            "school days nostalgia",
            "backbench memories",
            "morning assembly song",
            "school love song hindi",
        ],
    },
    "kal-tak-jo-roz-ka-tha": {
        "title": "Kal Tak Jo Roz Ka Tha",
        "landscapeHook": "School Memories & Farewell Song",
        "verticalHook": "School Nostalgia & Farewell #Shorts 🎓🏫",
        "synopsis": (
            "Kal tak jo roz ka tha, aaj woh yaad ban gaya... Ek bench pe beeta lamha, poora jahaan ban gaya.\n"
            "A bittersweet tribute to shared tiffins, stolen laughs during attendance, exam paper panic, and the unforgettable farewell day."
        ),
        "pinnedComment": (
            "🎓 Tag that school or college bench-mate who made those ordinary days unforgettable! Which memory from \"Kal Tak Jo Roz Ka Tha\" made you smile? ❤️🏫"
        ),
        "extraTags": [
            "kal tak jo roz ka tha",
            "school farewell song",
            "school farewell song hindi",
            "dosti yaari song",
            "school memories hindi song",
            "class 12 farewell song",
            "batch farewell anthem",
        ],
    },
    "kacchi-neendein": {
        "title": "Kacchi Neendein, Pakke Khwaab",
        "landscapeHook": "Late Night Dreamers Ballad ☕🎧",
        "verticalHook": "Late Night Dreams & Aspirant Hustle #Shorts ☕🌙",
        "synopsis": (
            "Chhoti si jeb mein bada sa hisaab, raat do baje ki cutting chai, aur dil mein umeedon ka sailab...\n"
            "An intimate, soulful acoustic ballad celebrating late-night hustle, steaming cups of chai, and unrelenting youthful ambition."
        ),
        "pinnedComment": (
            "☕ For everyone chasing big dreams with small pockets and late-night cutting chai... Which line from \"Kacchi Neendein, Pakke Khwaab\" hit closest to home for you? ✨"
        ),
        "extraTags": [
            "kacchi neendein pakke khwaab",
            "kacchi neendein",
            "late night study song",
            "chai and dreams",
            "aspirant struggle song",
            "jee neet motivation song",
            "hostel late night chai",
        ],
    },
    "pencil-ke-nishaan": {
        "title": "Pencil Ke Nishaan",
        "landscapeHook": "School Crush & Classroom Memories ✏️🎧",
        "verticalHook": "School Crush Nostalgia #Shorts ✏️🌸",
        "synopsis": (
            "Desk ke kone pe likhe the jo naam, waqt ke saath mit gaye... Par woh yaadein aaj bhi taaza hain.\n"
            "A tender school romance ballad about unsaid feelings, stolen glances during assembly, and initials etched on wooden desks."
        ),
        "pinnedComment": (
            "📖 Every rough copy and wooden desk has a story written on its last page. Which memory did this song bring back for you? Let me know below ❤️🎧"
        ),
        "extraTags": [
            "pencil ke nishaan",
            "pencil ke nishan",
            "school crush song hindi",
            "first love school song",
            "classroom romance hindi",
            "innocent school crush",
            "wooden desk carving song",
        ],
    },
    "rough-copy": {
        "title": "Rough Copy",
        "landscapeHook": "Nostalgic Backbench School Ballad 🎧",
        "verticalHook": "Romantic School Crush Ballad 🎧 #Shorts",
        "synopsis": (
            "Rough copy ke aakhri panne pe, tera hi naam likha maine... Formula saare bhula ke bhi, bas tujhko yaad rakha maine.\n"
            "A nostalgic tribute to innocent school crushes, stolen glances across school corridors, and names scribbled in secret notebook margins."
        ),
        "pinnedComment": (
            "📖 Rough copy ke aakhri panne pe kiska naam likhte the? Share your fondest backbench memory below! 🎧❤️"
        ),
        "extraTags": [
            "rough copy song",
            "rough copy ke aakhri panne pe",
            "school crush song",
            "backbench love song",
            "notebook margins hindi song",
            "school crush ballad",
        ],
    },
    "students-life": {
        "title": "Class Ke Baad",
        "landscapeHook": "Student Life Friendship Anthem 🎒🎧",
        "verticalHook": "Student Life & Friendship Memories #Shorts 🎒✨",
        "synopsis": (
            "Kitabein khuli reh gayi, par asli seekh toh corridor ki baaton aur canteen ki chai mein mili...\n"
            "A high-energy nostalgic ballad about proxy attendance, shared canteen debts, exam night panic, and the friends who became lifelong brothers."
        ),
        "pinnedComment": (
            "🎒 Class ke baad jo zindagi thi, wahi asli dosti thi. Tag your college or school squad who shared every canteen bill with you! ❤️☕"
        ),
        "extraTags": [
            "class ke baad",
            "students life song",
            "college life hindi song",
            "hostel life anthem",
            "canteen chai dosti",
            "student anthem hindi",
            "proxy attendance song",
        ],
    },
    "window-seat": {
        "title": "Window Seat",
        "landscapeHook": "Nostalgic Train Journey Indie Ballad 🎧🚆",
        "verticalHook": "Train Journey Solitude & Memories #Shorts 🚆🌧️",
        "synopsis": (
            "Window seat pe baith ke maine, shehar ko chhoot-te dekha hai... Kanch pe behti boondon jaisa, waqt ko fisalte dekha hai.\n"
            "An intimate journey of gentle healing, watching telephone wires rise and fall against the dusk sky, carrying a silent companion in your heart."
        ),
        "pinnedComment": (
            "🚆 Train ki window seat, ek purana gaana aur behti hui hawa... Where does your mind wander when looking out the window? Share below 🌧️❤️"
        ),
        "extraTags": [
            "window seat song",
            "train journey hindi song",
            "safar hindi indie",
            "window seat train memories",
            "railway journey acoustic",
            "moving on song hindi",
            "train window raindrops",
        ],
    },
    "aakhri-bench": {
        "title": "Aakhri Bench",
        "landscapeHook": "Backbenchers & Brotherhood Anthem 🎒🎧",
        "verticalHook": "Backbenchers Brotherhood Anthem #Shorts 🎒✨",
        "synopsis": (
            "Aakhri bench pe baith ke humne, aasmaan ko naapa hai... Jahan 75% attendance ki chinta kam, aur doston ke sapne bade the.\n"
            "A heartfelt anthem for the backbenchers—the dreamers, the schemers, and the quiet observers who found a brotherhood that lasts forever."
        ),
        "pinnedComment": (
            "🎒 Backbenchers assemble! Kaun si aakhri bench ki mischief aaj bhi yaad aati hai? Share your story below! 🎧❤️"
        ),
        "extraTags": [
            "aakhri bench song",
            "last benchers hindi song",
            "backbencher anthem",
            "classroom backbench yaari",
            "school dosti brotherhood",
            "backbench brotherhood",
        ],
    },
    "paani-peene-ka-bahaana": {
        "title": "Paani Peene Ka Bahaana",
        "landscapeHook": "School Crush & Classroom Window Ballad 💧🎧",
        "verticalHook": "School Crush & Classroom Memories #Shorts 💧✨",
        "synopsis": (
            "Paani peene ka bahaana karke, teri class ke aage se guzarna...\n"
            "An intimate acoustic indie ballad about innocent school crushes, stolen glances across the corridor, and heartbeats racing by the classroom door."
        ),
        "pinnedComment": (
            "💧 Paani peene ka bahaana karke kiske classroom ke aage se guzar te the? Share your fondest school crush memory below! ❤️🎧"
        ),
        "extraTags": [
            "paani peene ka bahaana",
            "paani peene ka bahana",
            "school crush song hindi",
            "classroom crush ballad",
            "first love school song",
            "corridor glances song",
            "hindi indie school crush",
            "nostalgic school romance",
        ],
    },
    "golden-hour-letters": {
        "title": "Golden Hour Letters",
        "landscapeHook": "Dreamy Indie Pop Ballad 🎧✉️",
        "verticalHook": "Unsent Letters & Golden Hour Memories #Shorts ✉️🌅",
        "synopsis": (
            "Found your letter folded in my winter coat, every word you typed, every line you wrote...\n"
            "An intimate, atmospheric dream-pop ballad about unmailed letters, fading golden light, and growing apart from someone who once knew everything about you."
        ),
        "pinnedComment": (
            "✉️ Have you ever kept a letter you never sent? Which line from \"Golden Hour Letters\" made you think of someone? Share your thoughts below... 🌅❤️"
        ),
        "extraTags": [
            "golden hour letters",
            "golden hour letters song",
            "dreamy indie pop",
            "english indie ballad",
            "nostalgic acoustic pop",
            "unsent letters song",
            "indie pop lyrics",
            "aesthetic lyric video",
            "dream pop english",
            "autumn nostalgia song",
        ],
    },
    "school-wali-crush": {
        "title": "School Wali Crush (स्कूल वाली क्रश)",
        "landscapeHook": "Romantic Hindi Indie Ballad 🎧🎒",
        "verticalHook": "First School Crush Memories #Shorts 🎒🌸",
        "synopsis": (
            "Woh pehli nazar, woh pehla ehsaas... Kitaabon mein chhupkar tujhe dekhna, bin kuchh kahe hi tujhse pyaar karna.\n"
            "An intimate, heartwarming acoustic Bollywood ballad capturing the innocence of high school crushes, shared glances across wooden desks, and memories that linger forever."
        ),
        "pinnedComment": (
            "🎒 School wali crush ki kaun si baat aaj bhi sabse zyada yaad aati hai? Share your sweetest memory below! ❤️🎧"
        ),
        "extraTags": [
            "school wali crush",
            "school wali crush song",
            "school crush hindi song",
            "pehli nazar song",
            "nostalgic school romance",
            "first love hindi song",
            "school memories song hindi",
            "hindi indie romance",
            "acoustic bollywood romance",
            "student's studio",
        ],
    },
}

# Filename to song slug mapping
FILENAME_MAPPING = {
    "master": "kacchi-neendein",
    "kacchi": "kacchi-neendein",
    "kacchi_neendein": "kacchi-neendein",
    "dil_reh_gaya": "dil-reh-gaya-classroom-mein",
    "kal_tak": "kal-tak-jo-roz-ka-tha",
    "pencil_ke_nishaan": "pencil-ke-nishaan",
    "rough_copy": "rough-copy",
    "students_life": "students-life",
    "class_ke_baad": "students-life",
    "window_seat": "window-seat",
    "aakhri_bench": "aakhri-bench",
    "paani_peene": "paani-peene-ka-bahaana",
    "paani_peene_ka_bahaana": "paani-peene-ka-bahaana",
    "golden_hour": "golden-hour-letters",
    "golden_hour_letters": "golden-hour-letters",
    "golden-hour-letters": "golden-hour-letters",
    "school_crush": "school-wali-crush",
    "school_wali_crush": "school-wali-crush",
    "school-wali-crush": "school-wali-crush",
}


def load_metadata() -> Dict[str, Any]:
    """Loads existing metadata.json if present."""
    if os.path.exists(METADATA_FILE):
        try:
            with open(METADATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[!] Warning reading existing metadata.json: {e}")
    return {}


def save_metadata(data: Dict[str, Any]) -> None:
    """Saves updated metadata dictionary to studio/metadata.json."""
    os.makedirs(STUDIO_DIR, exist_ok=True)
    with open(METADATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"[✓] Metadata saved successfully to {METADATA_FILE}")


def sanitize_text(text: str) -> str:
    """Strictly cleans robotic phrases, tech jargon, and obsolete branding."""
    if not text:
        return ""
    # Strip any occurrences of 60 FPS Cinematic Motion Engine
    text = re.sub(
        r"(?:Visual\s+Motion\s+Design\s+)?powered\s+by\s+60\s+FPS\s+Cinematic\s+Motion\s+Engine\.?",
        "",
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r"•\s*(?:Visual\s*Metaphor\s*&\s*Motion\s*Graphics|Visual\s*Architecture|Motion\s*Design\s*&\s*Visual\s*Direction):\s*60\s*FPS\s*Cinematic\s*Motion\s*Design",
        "• Visuals & Direction: Student's Studio Archive",
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r"•\s*Animation\s*Caliber:[^\n]+",
        "",
        text,
        flags=re.IGNORECASE,
    )

    # Legacy credits sanitization
    text = re.sub(
        r"•\s*Vocals\s*&\s*(?:Musical\s*)?Composition:\s*Suno\s*AI(?:\s*\([^)]*\))?",
        "• Vocals & Musical Composition: Original Hindi Playback Ballad",
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r"•\s*Vocals\s*&\s*Composition:\s*Suno\s*AI(?:\s*\([^)]*\))?",
        "• Vocals & Musical Composition: Original Hindi Playback Ballad",
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r"•\s*Lyrics(?:\s*&\s*(?:Creative\s*Direction|Story))?:\s*PeerMusic\s*Lyricist",
        "• Lyrics & Creative Direction: Original Lyricist",
        text,
        flags=re.IGNORECASE,
    )

    # Obsolete brand references
    text = re.sub(r"Connect with PeerMusic", "Connect with us", text, flags=re.IGNORECASE)
    text = re.sub(r"\bby PeerMusic\b", "— Official Release", text, flags=re.IGNORECASE)
    text = re.sub(r"#PeerMusic\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"#Suno(?:AI|Music)?\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"\bPeerMusic\b", "Student's Studio", text, flags=re.IGNORECASE)
    text = re.sub(r"\bSuno(?:\s*AI)?\b", "", text, flags=re.IGNORECASE)

    # Clean up empty lines and whitespace
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def resolve_song_slug(filename: str) -> Optional[str]:
    """Resolves an mp4 filename to a matching song slug in src/songs/."""
    raw_base = filename.replace(".mp4", "")
    stripped = SUFFIX_PATTERN.sub("", raw_base).lower()

    if stripped in FILENAME_MAPPING:
        return FILENAME_MAPPING[stripped]

    # Fuzzy match with song directories
    norm = stripped.replace("_", "-")
    if os.path.exists(SONGS_DIR):
        for slug in os.listdir(SONGS_DIR):
            if norm == slug or norm in slug or slug in norm:
                return slug

    return None


def load_song_timeline(slug: str) -> Optional[Dict[str, Any]]:
    """Loads timeline.json from the song's directory in src/songs/<slug>/."""
    timeline_path = os.path.join(SONGS_DIR, slug, "timeline.json")
    if os.path.exists(timeline_path):
        try:
            with open(timeline_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[!] Error loading timeline for {slug}: {e}")
    return None


def get_clean_song_title(slug: str, timeline: Optional[Dict[str, Any]]) -> str:
    """Returns the pure, clean song title free of parentheses or file artifacts."""
    if slug in SONG_THEMES:
        return SONG_THEMES[slug]["title"]

    if timeline:
        title = timeline.get("songTitle") or timeline.get("title")
        if title:
            # Strip suffixes like (School Crush Ballad) or (Student Life)
            clean = re.sub(r"\s*\([^)]*\)", "", title).strip()
            if clean:
                return clean

    # Fallback to slug title-casing
    return slug.replace("-", " ").replace("_", " ").title()


def generate_chapters(timeline: Optional[Dict[str, Any]], fps: int = 60) -> List[str]:
    """Generates structured YouTube chapter timestamps starting with 00:00 Intro / Campus Archive."""
    chapters = ["00:00 Intro / Campus Archive"]
    if not timeline or "scenes" not in timeline:
        return chapters

    fps = timeline.get("fps", fps)
    scenes = timeline.get("scenes", [])
    seen_seconds = {0}

    for s in scenes:
        start_frame = s.get("startFrame", 0)
        start_sec = int(round(start_frame / fps))

        # YouTube chapters require at least 5-10s intervals
        if start_sec <= 3 or start_sec in seen_seconds:
            continue

        seen_seconds.add(start_sec)
        m = start_sec // 60
        sec = start_sec % 60
        ts = f"{m:02d}:{sec:02d}"

        # Determine clean name
        raw_name = s.get("name", "").strip()
        raw_tag = s.get("sectionTag", "").strip()

        # Clean section tag: e.g. "02 // MUKHDA • EK BENCH PE BEETA LAMHA" -> "Mukhda"
        clean_tag = ""
        if raw_tag:
            tag_match = re.search(r"//\s*([A-Za-z0-9\s]+?)(?:\s*•|\s*$)", raw_tag)
            if tag_match:
                clean_tag = tag_match.group(1).strip().title()

        if raw_name:
            # Strip any leading numbers/symbols
            clean_name = re.sub(r"^\d+\s*//\s*", "", raw_name).strip()
            # If name is overly long, keep it concise for YouTube chapters UI
            if len(clean_name) > 42:
                clean_name = clean_name[:40].strip() + "..."
            chapters.append(f"{ts} {clean_name}")
        elif clean_tag:
            chapters.append(f"{ts} {clean_tag}")

    return chapters


def generate_formatted_lyrics(timeline: Optional[Dict[str, Any]], clean_title: str) -> str:
    """Extracts and formats clean lyrics grouped by section from timeline.json."""
    if not timeline or "scenes" not in timeline:
        return f"[Mukhda]\n(Instrumental & Acoustic Lyrical Melody — {clean_title})"

    sections: List[Tuple[str, List[str]]] = []
    scenes = timeline.get("scenes", [])

    for s in scenes:
        lines = s.get("lines", [])
        if not lines:
            continue

        raw_name = s.get("name", "").strip()
        raw_tag = s.get("sectionTag", "").strip()

        # Identify section heading
        heading = "[Verse]"
        combined = (raw_tag + " " + raw_name).upper()
        if "INTRO" in combined:
            heading = "[Intro]"
        elif "MUKHDA" in combined:
            if "REPRISE" in combined or "EMOTIONAL" in combined:
                heading = "[Mukhda Reprise]"
            else:
                heading = "[Mukhda]"
        elif "ANTARA 1" in combined or "ANTARA I" in combined:
            heading = "[Antara 1]"
        elif "ANTARA 2" in combined or "ANTARA II" in combined:
            heading = "[Antara 2]"
        elif "BRIDGE" in combined:
            heading = "[Bridge]"
        elif "CLIMAX" in combined:
            heading = "[Climax]"
        elif "OUTRO" in combined:
            heading = "[Outro]"
        elif raw_name:
            heading = f"[{raw_name}]"

        clean_lines = []
        for l in lines:
            text = l.get("text", "").strip()
            # Strip markdown formatting (*, _, ~)
            text = re.sub(r"[*_~]", "", text).strip()
            if text:
                clean_lines.append(text)

        if clean_lines:
            # Check if this heading can merge with previous section
            if sections and sections[-1][0] == heading:
                sections[-1][1].extend(clean_lines)
            else:
                sections.append((heading, clean_lines))

    if not sections:
        return f"[Mukhda]\n(Acoustic Lyrical Journey — {clean_title})"

    output_blocks = []
    for heading, lines in sections:
        output_blocks.append(f"{heading}\n" + "\n".join(lines))

    return "\n\n".join(output_blocks)


def generate_tags(clean_title: str, slug: str) -> List[str]:
    """Generates a high-intent search tags list filling ~400–480 characters."""
    is_english = "golden" in slug.lower() or "english" in slug.lower()
    if is_english:
        base_tags = [
            clean_title,
            f"{clean_title} lyrics",
            f"{clean_title} song",
            "indie pop",
            "dreamy indie pop",
            "acoustic pop",
            "indie ballad",
            "lyric video",
            "official lyrical video",
            "aesthetic music",
            "nostalgic indie song",
            "dream pop english",
            "indie folk",
            "acoustic guitar ballad",
            "chill acoustic music",
            "autumn songs",
            "unplugged indie",
            "intimate acoustic",
            "melancholic indie",
        ]
    else:
        base_tags = [
            clean_title,
            f"{clean_title} lyrics",
            f"{clean_title} song",
            "student's studio",
            "hindi indie song",
            "nostalgic school life song",
            "student life song hindi",
            "aspirant motivation song",
            "jee neet aspirant song",
            "hostel life song hindi",
            "classroom memories song",
            "late night study songs hindi",
            "indian indie music",
            "acoustic hindi song",
            "anuv jain vibe song",
            "college farewell song hindi",
            "hindi lyrical video",
            "indian indie acoustic",
            "nostalgic hindi ballad",
            "school romance song hindi",
            "peaceful study songs hindi",
            "cutting chai memories",
            "backbench dosti song",
        ]

    extra_tags = SONG_THEMES.get(slug, {}).get("extraTags", [])

    all_candidate_tags = [clean_title, f"{clean_title} lyrics"] + extra_tags + base_tags
    # Deduplicate while preserving order
    seen = set()
    deduped = []
    for t in all_candidate_tags:
        clean_t = t.strip()
        lower_t = clean_t.lower()
        if lower_t not in seen and len(clean_t) > 1:
            seen.add(lower_t)
            deduped.append(clean_t)

    # Accumulate tags until 400–480 chars total
    selected = []
    total_len = 0
    for t in deduped:
        add_len = len(t) + (2 if selected else 0)
        if total_len + add_len <= 480:
            selected.append(t)
            total_len += add_len
        else:
            break

    return selected


def build_song_metadata_package(
    filename: str,
    slug: str,
    is_vertical: bool = False,
) -> Dict[str, Any]:
    """Assembles the complete, high-converting YouTube release metadata package."""
    timeline = load_song_timeline(slug)
    clean_title = get_clean_song_title(slug, timeline)
    theme_info = SONG_THEMES.get(slug, {})

    # 1. Clean Title Formatting (< 100 chars)
    if is_vertical:
        hook = theme_info.get("verticalHook", "Nostalgic Student Life #Shorts 🎒🎧")
        title = f"{clean_title} | {hook}"
    else:
        hook = theme_info.get("landscapeHook", "Nostalgic Student Life Hindi Indie")
        title = f"{clean_title} (Official Lyrical Video) | {hook}"

    # Ensure strictly <= 100 characters
    if len(title) > 100:
        title = title[:97].rstrip() + "..."

    # 2. Poetic Synopsis
    synopsis = theme_info.get(
        "synopsis",
        "A warm, nostalgic tribute to classroom benches, rough copy pages, late-night study sessions, and the friends who became family.\n"
        "Carrying big dreams with small pockets and cutting chai."
    )

    # 3. Chapters
    chapters = generate_chapters(timeline, fps=timeline.get("fps", 60) if timeline else 60)
    chapters_text = "⏳ CHAPTERS / TIMESTAMPS:\n" + "\n".join(chapters)

    # 4. Full Lyrics
    lyrics_text = generate_formatted_lyrics(timeline, clean_title)

    # 5. Credits & Community Footer
    is_english = "golden" in slug.lower() or "english" in slug.lower()
    if is_english:
        credits_footer = (
            "────────────────────────────────────────\n"
            "🎙️ Credits & Archive Notes\n"
            "• Project: Student's Studio (@studentstudioseries)\n"
            "• Genre: Dreamy Indie Pop / Nostalgic Acoustic Ballad\n"
            "• Visuals & Direction: Student's Studio Archive\n\n"
            "✉️ For everyone holding onto unmailed letters and quiet memories. "
            "If this song resonated with you, drop a comment below and subscribe to join the journey.\n"
            "────────────────────────────────────────"
        )
        clean_hashtag = re.sub(r"[^A-Za-z0-9]", "", clean_title)
        hashtags = (
            f"#{clean_hashtag} #IndiePop #DreamPop #AcousticBallad #LyricalVideo "
            "#OriginalSong #AestheticMusic #NewIndieMusic #IndieFolk #StudentsStudio"
        )
    else:
        credits_footer = (
            "────────────────────────────────────────\n"
            "🎙️ Credits & Archive Notes\n"
            "• Project: Student's Studio (@studentstudioseries)\n"
            "• Genre: Hindi Indie / Acoustic Nostalgia / Student Life\n"
            "• Visuals & Direction: Student's Studio Archive\n\n"
            "☕ For everyone chasing big dreams with small pockets, late-night cutting chai, and rough copy memories. "
            "If this song brought back a memory, drop a comment below and subscribe to join the journey.\n"
            "────────────────────────────────────────"
        )
        clean_hashtag = re.sub(r"[^A-Za-z0-9]", "", clean_title)
        hashtags = (
            f"#{clean_hashtag} #HindiIndie #StudentLife #AspirantLife #SchoolMemories "
            "#IndianIndieMusic #NostalgicHindiSong #HindiOriginal #StudentsStudio #StudyMusic #CollegeLife"
        )

    # 7. Structured Description Assembly (1,500 - 3,500 chars)
    description_parts = [
        f"🎵 {clean_title} — Official Lyrical Video | Student's Studio (@studentstudioseries)",
        "",
        synopsis,
        "",
        chapters_text,
        "",
        "📜 FULL LYRICS:",
        "",
        lyrics_text,
        "",
        credits_footer,
        "",
        hashtags,
    ]
    description = "\n".join(description_parts)

    # 8. High-Intent Search Tags (400 - 480 chars)
    tags = generate_tags(clean_title, slug)

    # 9. Soulful Community Pinned Comment
    pinned_comment = theme_info.get(
        "pinnedComment",
        f"☕ For everyone chasing big dreams with small pockets and late-night cutting chai... Which line from \"{clean_title}\" hit closest to home for you? ✨"
    )

    entry = {
        "topic": slug,
        "title": title,
        "description": sanitize_text(description),
        "tags": tags,
        "categoryId": "10",  # YouTube Music category
        "privacyStatus": "public",
        "pinnedComment": sanitize_text(pinned_comment),
    }

    return entry


def seed_and_refresh_library():
    """Scans all rendered mp4 videos in out/, matches them to songs, and generates rich metadata."""
    metadata = load_metadata()

    if not os.path.exists(OUT_DIR):
        print(f"[!] out directory does not exist at {OUT_DIR}")
        return

    # List and filter mp4 files in out/
    out_files = sorted(os.listdir(OUT_DIR))
    for filename in out_files:
        f_lower = filename.lower()
        if not f_lower.endswith(".mp4"):
            continue

        # Ignore benchmark, temporary, or preview files
        if (
            f_lower.startswith("test_")
            or f_lower.startswith("verify_")
            or f_lower.startswith("benchmark_")
            or f_lower.startswith("temp_")
            or "preview" in f_lower
            or "_test" in f_lower
            or f_lower == "landscape_full.mp4"
        ):
            continue

        slug = resolve_song_slug(filename)
        if not slug:
            print(f"[?] Could not map filename to song slug: {filename}")
            slug = SUFFIX_PATTERN.sub("", filename.replace(".mp4", "")).lower()

        is_vert = "vert" in f_lower or "short" in f_lower
        print(f"[*] Processing {filename} -> slug: {slug} (vertical: {is_vert})")

        pkg = build_song_metadata_package(filename, slug, is_vertical=is_vert)

        # Attach thumbnail if available
        raw_base = filename.replace(".mp4", "")
        clean_base = raw_base.replace("_landscape", "").replace("_vertical", "").replace("_master", "").replace("_fast", "")
        
        # Candidate thumbnail names
        thumb_candidates = [
            f"{clean_base}_cover_9x16.png" if is_vert else f"{clean_base}_cover_16x9.png",
            f"{clean_base}_still_vertical.png" if is_vert else f"{clean_base}_still_landscape.png",
            f"{clean_base}_still.png",
            f"{clean_base}_cover_1x1.png",
        ]
        
        # Specific overrides
        if "dil_reh_gaya" in f_lower:
            thumb_candidates.insert(0, "dil_reh_gaya_still_vertical.png" if is_vert else "dil_reh_gaya_still_landscape.png")
        elif "kal_tak" in f_lower:
            thumb_candidates.insert(0, "kal_tak_jo_roz_ka_tha_cover_16x9.png")
        elif "kacchi" in f_lower or "master" in f_lower:
            thumb_candidates.insert(0, "kacchi_neendein_cover_16x9.png")

        for cand in thumb_candidates:
            if os.path.exists(os.path.join(OUT_DIR, cand)):
                pkg["thumbnail"] = cand
                break

        metadata[filename] = pkg

    # Comprehensive sanitization pass over all entries to guarantee zero tech jargon or 'Master' filename artifacts
    sanitized_metadata = {}
    for filename, entry in metadata.items():
        f_lower = filename.lower()
        if (
            f_lower.startswith("test_")
            or f_lower.startswith("verify_")
            or f_lower.startswith("benchmark_")
            or f_lower.startswith("temp_")
            or "preview" in f_lower
            or "_test" in f_lower
            or f_lower == "landscape_full.mp4"
        ):
            continue

        entry["title"] = sanitize_text(entry.get("title", ""))
        entry["description"] = sanitize_text(entry.get("description", ""))
        entry["pinnedComment"] = sanitize_text(entry.get("pinnedComment", ""))

        # Ensure no "Master" remained in titles or pinned comments
        entry["title"] = re.sub(r"\bMaster\b", "", entry["title"]).replace("  ", " ").strip()
        entry["pinnedComment"] = re.sub(r"\bMaster\b", "", entry["pinnedComment"]).replace("  ", " ").strip()

        sanitized_metadata[filename] = entry

    save_metadata(sanitized_metadata)


def main():
    print("[*] Generating & Syncing Student's Studio YouTube Metadata...")
    seed_and_refresh_library()
    print("[✓] Complete! Check studio/metadata.json.")


if __name__ == "__main__":
    main()
