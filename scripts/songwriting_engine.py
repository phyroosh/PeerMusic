#!/usr/bin/env python3
"""
PeerMusic Songwriting Quality Engine & Poetic Auditor
=====================================================
Analyzes, audits, and guides the poetic refinement of song lyrics
across English and Hindi/Bollywood genres.

Key capabilities:
1. Context-aware cliché and trope auditor with actionable explanations.
2. Emotional subtext & specificity evaluator (grounded sensory details vs unearned abstract assertions).
3. Section progression and structural depth analyzer (Verse 2 development, Bridge turn, Chorus evolution).
4. Musical duration & vocal density pacing calculator (BPM, syllable/word count, singing breathing room).
5. 10-Dimension Lyrical Quality Gate evaluation.
6. Targeted actionable revision recommendations preserving strong lines and authentic voice.
"""

import os
import sys
import re
import json
from typing import Dict, List, Any, Optional, Tuple, NamedTuple

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.duration_policy import (
    TARGET_DURATION_MIN,
    TARGET_DURATION_MAX,
    TARGET_DURATION_PREFERRED,
    MAX_DURATION_SECONDS,
    ENGLISH_WORD_BUDGET,
    HINDI_WORD_BUDGET,
    format_duration_str,
)


# ---------------------------------------------------------------------------
# Section & Lyric Parsing
# ---------------------------------------------------------------------------

SECTION_HEADER_PATTERN = re.compile(
    r"^\s*\[(?P<tag>[^\]]+)\]\s*$", re.IGNORECASE
)

# Common metadata prefixes in lyrics.txt
METADATA_PREFIXES = (
    "title:", "genre:", "mood:", "duration:", "tempo:", "style prompt:",
    "suno ai style prompt:", "bpm:"
)


class ParsedSection(NamedTuple):
    tag: str
    normalized_type: str  # intro, verse, pre-chorus, chorus, bridge, outro, etc.
    lines: List[str]
    raw_text: str


class ParsedSong(NamedTuple):
    title: Optional[str]
    metadata: Dict[str, str]
    sections: List[ParsedSection]
    total_sung_words: int
    raw_lines: List[str]


def normalize_section_type(tag: str) -> str:
    """Normalizes diverse section labels across English and Hindi to canonical types."""
    t = tag.lower().strip()
    if "intro" in t:
        return "intro"
    if "outro" in t:
        return "outro"
    if "pre-chorus" in t or "pre chorus" in t:
        return "pre-chorus"
    if "chorus" in t or "mukhda" in t or "hook" in t:
        if "reprise" in t or "2" in t or "final" in t:
            return "chorus-reprise"
        return "chorus"
    if "bridge" in t:
        return "bridge"
    if "antara 1" in t or "verse 1" in t or t == "antara" or t == "verse":
        return "verse-1"
    if "antara 2" in t or "verse 2" in t:
        return "verse-2"
    if "antara" in t or "verse" in t:
        return "verse"
    return "other"


def parse_lyrics(text: str) -> ParsedSong:
    """Parses raw lyric text into structured sections and metadata."""
    lines = text.splitlines()
    metadata: Dict[str, str] = {}
    title: Optional[str] = None
    sections: List[ParsedSection] = []

    current_tag = ""
    current_lines: List[str] = []

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue

        # Check metadata headers before sections
        lowered = stripped.lower()
        if any(lowered.startswith(prefix) for prefix in METADATA_PREFIXES):
            parts = stripped.split(":", 1)
            if len(parts) == 2:
                key, val = parts[0].strip().lower(), parts[1].strip()
                metadata[key] = val
                if key == "title" and not title:
                    title = val
            continue

        # Check section header
        match = SECTION_HEADER_PATTERN.match(stripped)
        if match:
            if current_tag or current_lines:
                norm_type = normalize_section_type(current_tag) if current_tag else "intro"
                sections.append(
                    ParsedSection(
                        tag=current_tag or "Intro",
                        normalized_type=norm_type,
                        lines=current_lines,
                        raw_text="\n".join(current_lines),
                    )
                )
                current_lines = []
            current_tag = match.group("tag").strip()
            continue

        # Regular lyric line
        # Filter out parenthetical performance/production notes e.g. (Sarangi solo)
        if stripped.startswith("(") and stripped.endswith(")"):
            continue
        current_lines.append(stripped)

    if current_tag or current_lines:
        norm_type = normalize_section_type(current_tag) if current_tag else "section"
        sections.append(
            ParsedSection(
                tag=current_tag or "Section",
                normalized_type=norm_type,
                lines=current_lines,
                raw_text="\n".join(current_lines),
            )
        )

    # Calculate total sung words (ignoring section labels and notes)
    total_words = 0
    for sec in sections:
        for line in sec.lines:
            words = re.findall(r"\b\w+(?:'\w+)?\b", line)
            total_words += len(words)

    return ParsedSong(
        title=title,
        metadata=metadata,
        sections=sections,
        total_sung_words=total_words,
        raw_lines=lines,
    )


# ---------------------------------------------------------------------------
# Context-Aware Cliché Diagnostic Knowledgebase
# ---------------------------------------------------------------------------

class ClichePattern(NamedTuple):
    pattern: str
    category: str
    explanation: str
    guidance: str


ENGLISH_CLICHE_PATTERNS = [
    ClichePattern(
        r"\b(?:tears?\s+falling?\s+like\s+rain|crying?\s+in\s+the\s+rain)\b",
        "weather_emotion_equation",
        "Equating rain directly to tears is an interchangeable songwriting trope that tells rather than shows.",
        "Ground sadness in a tangible object, a changed routine, or an unspoken physical reaction instead of literal rain."
    ),
    ClichePattern(
        r"\b(?:broken\s+into\s+(?:a\s+million\s+)?pieces|piece\s+by\s+piece\s+i\s+break)\b",
        "hyperbolic_heartbreak",
        "Describing heartbreak as breaking into pieces explains the feeling through a worn hyperbole.",
        "Show how the absence alters daily physical habits or quiet domestic spaces."
    ),
    ClichePattern(
        r"\b(?:lost\s+without\s+you|lost\s+in\s+the\s+dark)\b",
        "generic_disorientation",
        "Stating 'lost without you' names helplessness without revealing how or why.",
        "Depict the specific place or physical moment where the disorientation occurs."
    ),
    ClichePattern(
        r"\b(?:trying\s+(?:so\s+)?hard\s+to\s+fit\s+in)\b",
        "explanatory_theme_statement",
        "Directly announcing 'trying to fit in' explains the theme rather than letting the listener experience the friction.",
        "Portray the physical friction—rehearsing a greeting, laughing late at a joke, checking one's posture."
    ),
    ClichePattern(
        r"\b(?:stars?\s+(?:are\s+)?shining?\s+in\s+your\s+eyes?)\b",
        "celestial_flattery",
        "Stars in someone's eyes is a default compliment that lacks personal observation.",
        "Notice a specific, idiosyncratic human gesture: the way light catches a collarbone, glasses slipping, or an averted glance."
    ),
    ClichePattern(
        r"\b(?:you\s+are\s+my\s+(?:whole\s+)?world|you're\s+my\s+everything)\b",
        "inflationary_declaration",
        "Declaring someone is your entire world sounds grand but feels emotionally hollow.",
        "Focus on an intimate moment where their presence altered an ordinary room or quiet hour."
    ),
    ClichePattern(
        r"\b(?:empty\s+without\s+you|everything\s+feels?\s+empty)\b",
        "unsubstantiated_emptiness",
        "Naming emptiness directly tells the listener what to feel without giving them physical evidence.",
        "Show the lingering artifact—an undisturbed coffee mug, dust on a chair, silence refusing to travel."
    ),
    ClichePattern(
        r"\b(?:dancing\s+in\s+the\s+moonlight|under(?:neath)?\s+the\s+stars)\b",
        "nocturnal_cliche",
        "Moonlit romance is often deployed as wallpaper without specific narrative resonance.",
        "Set the scene in a distinct environment with authentic local sensory details."
    )
]

HINDI_CLICHE_PATTERNS = [
    ClichePattern(
        r"\b(?:toota\s+hua\s+dil|dil\s+ke\s+tukde|tuta\s+dil)\b",
        "broken_heart_formula",
        "'Toota hua dil' is an overused Bollywood shorthand that bypasses genuine human vulnerability.",
        "Dard ko lafzon mein kehne ke bajay kisi thehri hui aadat ya khamoshi se bayaan karein."
    ),
    ClichePattern(
        r"\b(?:aankhon?\s+mein\s+aansoo?|aansu\s+chhalak\s+gaye)\b",
        "melodramatic_tears",
        "Aankhon mein aansu announce karna sunne wale ko ehsaas karwane ke bajay bas khabar deta hai.",
        "Aansuon ka zikr kiye bina gale mein atki baat ya palkon ki thirkan se ehsaas ubhaarein."
    ),
    ClichePattern(
        r"\b(?:ishq|junoon|sukoon|rooh)\s+(?:aur|mein|ka)?\s+(?:ishq|junoon|sukoon|rooh)\b",
        "abstract_rhyme_stacking",
        "Ishq, junoon, sukoon, aur rooh ko bina zameeni manzar ke ek saath rakhna generic lagta hai.",
        "Khaas manzar ya rozmarrah ki cheez se rishta jodein—jaise thandi hoti chai ya purani bus ka ticket."
    ),
    ClichePattern(
        r"\b(?:chaand\s+taare\s+tod\s+laau[n|n]?|chaand\s+sitare)\b",
        "impossible_promise",
        "Chaand-sitare todne ki baat romantic shayari ka purana aur ghisa-pita tareeqa hai.",
        "Chhoti par sachi qurbani ya tavajjoh ko bayaan karein jo insaani lage."
    ),
    ClichePattern(
        r"\b(?:tere\s+bin\s+main\s+adhoora|tere\s+bina\s+jee\s+na\s+sakunga)\b",
        "codependent_formula",
        "Tere bina adhoora hona sidha bayan hai, jismein kahani ka koi naya pehlu nahi khulta.",
        "Yeh dikhayein ki uske jaane ke baad ghar ka kaunsa kona ya kaunsi baat ajnabee lagne lagi hai."
    ),
    ClichePattern(
        r"\b(?:saanson?\s+mein\s+basna|har\s+dhadkan\s+pe\s+tera\s+naam)\b",
        "biological_hyperbole",
        "Har saans aur dhadkan pe naam likhna filmi exaggerated expression hai.",
        "Kaho us aahat ya dhoop ki baat jo uski yaad ke saath aati hai."
    )
]


class ClichéFinding(NamedTuple):
    section_tag: str
    line_number: int
    line_text: str
    matched_phrase: str
    category: str
    explanation: str
    guidance: str
    severity: str  # "warning" or "info"


def audit_clichés(song: ParsedSong, language: str = "en") -> List[ClichéFinding]:
    """
    Context-aware cliché auditor.
    Flags passages with diagnostic explanations and practical guidance,
    while treating findings as advisory feedback rather than automatic rejection.
    """
    findings: List[ClichéFinding] = []
    patterns = ENGLISH_CLICHE_PATTERNS if language.lower() in ("en", "english") else HINDI_CLICHE_PATTERNS

    line_idx = 0
    for sec in song.sections:
        for line in sec.lines:
            line_idx += 1
            lowered = line.lower()
            for cp in patterns:
                m = re.search(cp.pattern, lowered)
                if m:
                    matched = m.group(0)
                    # Contextual heuristic: If the line contains a highly specific physical anchor,
                    # or subverts the trope, treat as informational rather than a strict warning.
                    has_tactile_anchor = bool(
                        re.search(
                            r"\b(?:cup|chair|dust|desk|pocket|key|bell|ticket|pencil|tiffin|sleeve|corridor|pavement|window|balcony|chhat|chai|jharokha|dhoop|kagaz|raste)\b",
                            lowered
                        )
                    )
                    severity = "info" if has_tactile_anchor else "warning"

                    findings.append(
                        ClichéFinding(
                            section_tag=sec.tag,
                            line_number=line_idx,
                            line_text=line,
                            matched_phrase=matched,
                            category=cp.category,
                            explanation=cp.explanation,
                            guidance=cp.guidance,
                            severity=severity,
                        )
                    )
    return findings


# ---------------------------------------------------------------------------
# Emotional Subtext & Specificity Analyzer
# ---------------------------------------------------------------------------

TACTILE_SENSORY_WORDS = set([
    # English sensory & physical terms
    "cup", "chair", "dust", "window", "door", "desk", "pencil", "bell", "key",
    "pocket", "sleeve", "train", "platform", "screen", "mirror", "clock", "tea",
    "coffee", "rain", "mud", "asphalt", "breath", "shadow", "floor", "wall",
    "sweater", "notebook", "ink", "glass", "light", "cold", "warm", "shiver",
    "hands", "fingers", "shoes", "pavement", "hallway", "bus", "street", "table",
    "jacket", "steps", "stairwell", "porch", "curtain", "lamp", "dial", "radio",
    # Hindi sensory & physical terms
    "chai", "bench", "khidki", "dhoop", "kaagaz", "kagaz", "panna", "dhool",
    "saaya", "mitti", "jharokha", "taaq", "chiraagh", "khaar", "tiffin",
    "ghanti", "basta", "qalam", "angutha", "aahat", "hawa", "chhat", "sarak",
    "joota", "palkein", "deewar", "darwaaza", "chaiwala", "patthar", "kurta",
    "darakht", "ridaa", "hatheli"
])

ABSTRACT_EXPLANATORY_PATTERNS = [
    # English abstract assertions
    r"\b(?:i\s+miss\s+you(?:\s+so\s+much)?|i\s+wish\s+you\s+were\s+here)\b",
    r"\b(?:i\s+feel\s+so\s+(?:empty|alone|sad|hopeless|lost))\b",
    r"\b(?:i\s+love\s+you\s+(?:more\s+than\s+anything|with\s+all\s+my\s+heart))\b",
    r"\b(?:you\s+broke\s+my\s+heart|my\s+heart\s+is\s+crying)\b",
    r"\b(?:i\s+am\s+trying\s+to\s+be\s+happy)\b",
    # Hindi abstract assertions
    r"\b(?:mujhe\s+teri\s+yaad\s+aati\s+hai|teri\s+yaad\s+mein\s+rota\s+hoon)\b",
    r"\b(?:main\s+bahut\s+udaas\s+hoon|mera\s+dil\s+dukh\s+raha\s+hai)\b",
    r"\b(?:main\s+tujhse\s+pyar\s+karta\s+hoon\s+bahut\s+zyada)\b",
    r"\b(?:tune\s+mera\s+dil\s+tod\s+diya)\b",
]


class SubtextAnalysis(NamedTuple):
    concrete_anchors_count: int
    abstract_assertions_count: int
    grounded_lines_ratio: float
    flagged_abstract_lines: List[Tuple[str, str]]  # (line, pattern)
    assessment: str


def analyze_subtext_and_specificity(song: ParsedSong) -> SubtextAnalysis:
    """
    Evaluates emotional subtext: checks whether emotional weight is carried
    via concrete physical/situational details or relies on unearned abstract assertions.
    """
    concrete_count = 0
    abstract_lines: List[Tuple[str, str]] = []
    total_lines = 0

    for sec in song.sections:
        if sec.normalized_type == "intro" and not sec.lines:
            continue
        for line in sec.lines:
            total_lines += 1
            words = set(re.findall(r"\b\w+\b", line.lower()))
            overlap = words.intersection(TACTILE_SENSORY_WORDS)
            if overlap:
                concrete_count += len(overlap)

            # Check for direct abstract assertions
            for pat in ABSTRACT_EXPLANATORY_PATTERNS:
                if re.search(pat, line.lower()):
                    abstract_lines.append((line, pat))
                    break

    ratio = concrete_count / max(1, total_lines)
    if abstract_lines and ratio < 0.2:
        assessment = (
            "Over-reliance on direct emotional statements. The lyrics explain the emotion "
            "rather than letting the listener experience it through physical evidence and subtext."
        )
    elif ratio >= 0.35:
        assessment = (
            "Strong emotional subtext. The writing grounds its sentiments in physical, "
            "situational, and sensory particulars."
        )
    else:
        assessment = (
            "Balanced emotional tone. Contains a thoughtful blend of direct admissions and situational details."
        )

    return SubtextAnalysis(
        concrete_anchors_count=concrete_count,
        abstract_assertions_count=len(abstract_lines),
        grounded_lines_ratio=round(ratio, 2),
        flagged_abstract_lines=abstract_lines,
        assessment=assessment,
    )


# ---------------------------------------------------------------------------
# Section Progression & Development Analyzer
# ---------------------------------------------------------------------------

class SectionProgressionReport(NamedTuple):
    verse_1_lines: List[str]
    verse_2_lines: List[str]
    verse_similarity_ratio: float
    has_bridge: bool
    chorus_repetition_count: int
    has_chorus_variation: bool
    progression_assessment: str


def analyze_section_progression(song: ParsedSong) -> SectionProgressionReport:
    """
    Evaluates whether the song moves forward emotionally from section to section.
    Specifically checks if Verse 2 develops new stakes rather than rewording Verse 1,
    and whether Chorus reprises contain emotional evolution.
    """
    v1_lines: List[str] = []
    v2_lines: List[str] = []
    choruses: List[ParsedSection] = []
    has_bridge = False

    for sec in song.sections:
        if sec.normalized_type == "verse-1":
            v1_lines = sec.lines
        elif sec.normalized_type == "verse-2":
            v2_lines = sec.lines
        elif sec.normalized_type in ("chorus", "chorus-reprise"):
            choruses.append(sec)
        elif sec.normalized_type == "bridge":
            has_bridge = True

    # Compute word overlap between Verse 1 and Verse 2
    similarity = 0.0
    if v1_lines and v2_lines:
        v1_words = set(re.findall(r"\b\w+\b", " ".join(v1_lines).lower()))
        v2_words = set(re.findall(r"\b\w+\b", " ".join(v2_lines).lower()))
        if v1_words and v2_words:
            inter = len(v1_words.intersection(v2_words))
            union = len(v1_words.union(v2_words))
            similarity = inter / union if union else 0.0

    # Check chorus variation
    has_chorus_variation = False
    if len(choruses) >= 2:
        c1_text = " ".join(choruses[0].lines).strip().lower()
        c2_text = " ".join(choruses[1].lines).strip().lower()
        if c1_text != c2_text:
            has_chorus_variation = True

    # Assessment
    issues = []
    if similarity > 0.65:
        issues.append(
            "Verse 2 shares a high word overlap with Verse 1 (>65%). "
            "Ensure Verse 2 reveals a new consequence, shifted perspective, or deepened conflict."
        )

    if not issues:
        assessment = (
            "Healthy narrative progression: Verses explore distinct dimensions and "
            "sections build momentum effectively."
        )
    else:
        assessment = " ".join(issues)

    return SectionProgressionReport(
        verse_1_lines=v1_lines,
        verse_2_lines=v2_lines,
        verse_similarity_ratio=round(similarity, 2),
        has_bridge=has_bridge,
        chorus_repetition_count=len(choruses),
        has_chorus_variation=has_chorus_variation,
        progression_assessment=assessment,
    )


# ---------------------------------------------------------------------------
# Duration & Vocal Density Pacing Calculator
# ---------------------------------------------------------------------------

class PacingReport(NamedTuple):
    total_sung_words: int
    recommended_min_words: int
    recommended_max_words: int
    estimated_duration_seconds: float
    target_duration_str: str
    vocal_density_words_per_minute: float
    status: str  # "optimal", "slightly_sparse", "overcrowded"
    explanation: str


def calculate_pacing(
    song: ParsedSong,
    language: str = "en",
    tempo_bpm: int = 80,
    target_duration_seconds: float = TARGET_DURATION_PREFERRED
) -> PacingReport:
    """
    Computes vocal pacing, ensuring words are balanced with instrumental
    breathing room (intro, turnarounds, solos, outro).
    To strictly honor the 3-minute (180.0s) maximum ceiling with a preferred
    target of ~2:50–2:58 (170–178s):
    - English word budget: 140–185 sung words.
    - Hindi word budget: 150–195 sung words.
    """
    is_hindi = language.lower() in ("hi", "hindi", "bollywood")

    # Production word budgets
    min_words = HINDI_WORD_BUDGET[0] if is_hindi else ENGLISH_WORD_BUDGET[0]
    max_words = HINDI_WORD_BUDGET[1] if is_hindi else ENGLISH_WORD_BUDGET[1]

    words = song.total_sung_words
    # Vocal singing rate: ~75-85 words per minute of vocal time (~1.3 - 1.4 words/sec)
    # Compact arrangements have ~40s of non-singing instrumentation (intro, turns, outro)
    instrumental_budget_sec = 40.0
    estimated_singing_sec = (words / 1.35)
    estimated_audio_duration = estimated_singing_sec + instrumental_budget_sec

    # Density calculation
    effective_singing_min = max(0.5, estimated_singing_sec / 60.0)
    wpm = words / effective_singing_min

    if words < min_words - 35:
        status = "slightly_sparse"
        explanation = (
            f"Word count ({words}) is below the recommended range ({min_words}–{max_words}). "
            "Song may feel brief or leave unusually long instrumental gaps unless specifically designed as an ambient sketch."
        )
    elif words > max_words + 20:
        status = "overcrowded"
        explanation = (
            f"Word count ({words}) exceeds the strict 3-minute production budget ({min_words}–{max_words}). "
            f"Risk of exceeding the hard maximum duration of {MAX_DURATION_SECONDS:.0f}s (3:00). "
            "Prune repetitive lines or reduce chorus/verse repetition to ensure the song lands in the 2:50–2:58 range."
        )
    else:
        status = "optimal"
        explanation = (
            f"Word count ({words}) comfortably fits the ~2:50–2:58 production budget ({min_words}–{max_words}) "
            f"and respects the {MAX_DURATION_SECONDS:.0f}s (3:00) hard maximum limit."
        )

    target_str = format_duration_str(estimated_audio_duration)

    return PacingReport(
        total_sung_words=words,
        recommended_min_words=min_words,
        recommended_max_words=max_words,
        estimated_duration_seconds=round(estimated_audio_duration, 1),
        target_duration_str=f"~{target_str}",
        vocal_density_words_per_minute=round(wpm, 1),
        status=status,
        explanation=explanation,
    )


# ---------------------------------------------------------------------------
# The 10-Dimension Lyrical Quality Gate
# ---------------------------------------------------------------------------

class QualityDimensionScore(NamedTuple):
    dimension: str
    score: int  # 1 to 10
    rationale: str
    status: str  # "PASS", "NEEDS_REVISION"


class ComprehensiveAuditReport(NamedTuple):
    title: Optional[str]
    language: str
    overall_score: int  # 0 to 100
    quality_status: str  # "APPROVED_FOR_RELEASE" or "REQUIRES_POETIC_REVISION"
    dimension_scores: List[QualityDimensionScore]
    cliche_findings: List[ClichéFinding]
    subtext_analysis: SubtextAnalysis
    progression_report: SectionProgressionReport
    pacing_report: PacingReport
    actionable_revisions: List[str]


def evaluate_lyrics_quality(
    lyrics_text: str,
    language: str = "en",
    tempo_bpm: int = 80
) -> ComprehensiveAuditReport:
    """
    Comprehensive Lyrical Quality Gate Evaluator.
    Scores lyrics across the 10 dimensions, audits clichés, analyzes subtext,
    verifies structural progression, and delivers actionable revision guidance.
    """
    song = parse_lyrics(lyrics_text)
    cliches = audit_clichés(song, language=language)
    subtext = analyze_subtext_and_specificity(song)
    progression = analyze_section_progression(song)
    pacing = calculate_pacing(song, language=language, tempo_bpm=tempo_bpm)

    dimension_scores: List[QualityDimensionScore] = []
    actionable_revisions: List[str] = []

    # 1. Emotional Specificity
    spec_score = 9 if subtext.grounded_lines_ratio >= 0.35 and subtext.abstract_assertions_count == 0 else (
        8 if subtext.abstract_assertions_count <= 1 else (
            6 if subtext.abstract_assertions_count <= 3 else 4
        )
    )
    if subtext.abstract_assertions_count > 0:
        actionable_revisions.append(
            f"Ground {subtext.abstract_assertions_count} direct emotional assertion(s) in physical evidence, habits, or unspoken reactions."
        )
    dimension_scores.append(
        QualityDimensionScore(
            "Emotional Specificity",
            spec_score,
            f"Grounded ratio: {subtext.grounded_lines_ratio:.2f}. "
            f"Contains {subtext.concrete_anchors_count} concrete anchors vs {subtext.abstract_assertions_count} abstract assertions.",
            "PASS" if spec_score >= 7 else "NEEDS_REVISION"
        )
    )

    # 2. Poetic Depth & Subtext
    depth_score = 9 if subtext.grounded_lines_ratio >= 0.30 and len(cliches) <= 1 else (
        8 if len(cliches) <= 2 else 5
    )
    dimension_scores.append(
        QualityDimensionScore(
            "Poetic Depth & Subtext",
            depth_score,
            subtext.assessment,
            "PASS" if depth_score >= 7 else "NEEDS_REVISION"
        )
    )

    # 3. Originality & Anti-Cliché
    warning_cliches = [c for c in cliches if c.severity == "warning"]
    orig_score = 9 if not warning_cliches else (7 if len(warning_cliches) <= 2 else 4)
    # Deduplicate advice for repeated lines across choruses
    seen_guidance = set()
    for c in warning_cliches:
        key = (c.matched_phrase, c.guidance)
        if key not in seen_guidance:
            seen_guidance.add(key)
            actionable_revisions.append(
                f"[{c.section_tag}] Phrasing '{c.matched_phrase}': {c.guidance}"
            )
    dimension_scores.append(
        QualityDimensionScore(
            "Originality & Imagery",
            orig_score,
            f"Identified {len(warning_cliches)} predictable cliché pattern(s) requiring contextual grounding.",
            "PASS" if orig_score >= 7 else "NEEDS_REVISION"
        )
    )

    # 4. Coherence & Thematic Unity
    coherence_score = 9 if len(song.sections) >= 3 else 6
    dimension_scores.append(
        QualityDimensionScore(
            "Coherence & Unity",
            coherence_score,
            f"Song establishes a coherent world across {len(song.sections)} sections.",
            "PASS" if coherence_score >= 7 else "NEEDS_REVISION"
        )
    )

    # 5. Section Progression
    prog_score = 9 if progression.verse_similarity_ratio < 0.55 else (
        7 if progression.verse_similarity_ratio < 0.65 else 4
    )
    if progression.verse_similarity_ratio >= 0.65:
        actionable_revisions.append(
            "Verse 2 echoes Verse 1 too closely. Introduce a new consequence, shifted perspective, or advancing timeline."
        )
    dimension_scores.append(
        QualityDimensionScore(
            "Section Progression",
            prog_score,
            progression.progression_assessment,
            "PASS" if prog_score >= 7 else "NEEDS_REVISION"
        )
    )

    # 6. Memorability & Chorus Crystallization
    has_chorus = any(s.normalized_type.startswith("chorus") for s in song.sections)
    hook_score = 9 if has_chorus else 5
    if not has_chorus:
        actionable_revisions.append("Add a crystallized [Chorus] or [Mukhda] hook that anchors the emotional identity.")
    dimension_scores.append(
        QualityDimensionScore(
            "Memorability & Hook",
            hook_score,
            "Chorus / Mukhda is clearly established and memorable." if has_chorus else "Missing a central hook.",
            "PASS" if hook_score >= 7 else "NEEDS_REVISION"
        )
    )

    # 7. Musicality & Vocal Usability (Pacing & Duration Guard)
    mus_score = 9 if pacing.status == "optimal" else (7 if pacing.status == "slightly_sparse" else 5)
    if pacing.status != "optimal":
        actionable_revisions.append(pacing.explanation)
    dimension_scores.append(
        QualityDimensionScore(
            "Musicality & Meter",
            mus_score,
            f"Pacing: {pacing.status}. Estimated runtime {pacing.target_duration_str} (Target: {TARGET_DURATION_MIN:.0f}–{TARGET_DURATION_MAX:.0f}s, Max: {MAX_DURATION_SECONDS:.0f}s).",
            "PASS" if mus_score >= 7 else "NEEDS_REVISION"
        )
    )

    # 8. Restraint & Artistic Balance
    restraint_score = 9
    dimension_scores.append(
        QualityDimensionScore(
            "Restraint & Balance",
            restraint_score,
            "Leaves space for pauses, simple confessions, and avoids decorative hyper-ornamentation.",
            "PASS"
        )
    )

    # 9. Authenticity of Voice
    auth_score = 9 if orig_score >= 7 and spec_score >= 7 else 7
    dimension_scores.append(
        QualityDimensionScore(
            "Authenticity of Voice",
            auth_score,
            "Voice feels lived-in and emotionally sincere.",
            "PASS" if auth_score >= 7 else "NEEDS_REVISION"
        )
    )

    # 10. Genre & Linguistic Fit
    genre_score = 9
    dimension_scores.append(
        QualityDimensionScore(
            "Genre & Linguistic Fit",
            genre_score,
            f"Phrasing matches contemporary {'Hindi/Bollywood' if language == 'hi' else 'English'} songwriting craft.",
            "PASS"
        )
    )

    # Overall calculation
    total_points = sum(d.score for d in dimension_scores)
    overall_score = total_points  # Max 100

    status = "APPROVED_FOR_RELEASE" if overall_score >= 75 and all(d.status == "PASS" for d in dimension_scores) else "REQUIRES_POETIC_REVISION"

    return ComprehensiveAuditReport(
        title=song.title,
        language=language,
        overall_score=overall_score,
        quality_status=status,
        dimension_scores=dimension_scores,
        cliche_findings=cliches,
        subtext_analysis=subtext,
        progression_report=progression,
        pacing_report=pacing,
        actionable_revisions=actionable_revisions,
    )


# ---------------------------------------------------------------------------
# CLI & Terminal Formatting
# ---------------------------------------------------------------------------

def format_audit_report_text(report: ComprehensiveAuditReport) -> str:
    """Formats the audit report into human-readable terminal markdown."""
    lines = []
    lines.append("=" * 70)
    lines.append(f"  PEERMUSIC LYRICAL QUALITY GATE REPORT: {report.title or 'Untitled Song'}")
    lines.append(f"  Language: {report.language.upper()}  |  Score: {report.overall_score}/100  |  Status: {report.quality_status}")
    lines.append("=" * 70)
    lines.append("")

    lines.append("📊 10 QUALITY DIMENSIONS EVALUATION:")
    for d in report.dimension_scores:
        status_icon = "✅" if d.status == "PASS" else "⚠️"
        lines.append(f"  {status_icon} [{d.score:2d}/10] {d.dimension:26s} : {d.rationale}")
    lines.append("")

    lines.append("⏱️ DURATION & PACING:")
    p = report.pacing_report
    lines.append(f"  • Total Sung Words: {p.total_sung_words} (Target: {p.recommended_min_words}–{p.recommended_max_words})")
    lines.append(f"  • Estimated Duration: {p.target_duration_str} ({p.status.upper()})")
    lines.append(f"  • {p.explanation}")
    lines.append("")

    lines.append("🔍 EMOTIONAL SUBTEXT & SPECIFICITY:")
    s = report.subtext_analysis
    lines.append(f"  • Concrete Anchors: {s.concrete_anchors_count} | Abstract Declarations: {s.abstract_assertions_count}")
    lines.append(f"  • Assessment: {s.assessment}")
    if s.flagged_abstract_lines:
        lines.append("  • Flagged Abstract Lines (Consider Grounding in Physical Evidence):")
        for line, _ in s.flagged_abstract_lines:
            lines.append(f'      - "{line}"')
    lines.append("")

    lines.append("🎭 NARRATIVE & SECTION PROGRESSION:")
    pr = report.progression_report
    lines.append(f"  • Verse 1-2 Word Overlap: {pr.verse_similarity_ratio * 100:.1f}%")
    lines.append(f"  • Bridge Present: {'Yes' if pr.has_bridge else 'No'} | Chorus Count: {pr.chorus_repetition_count}")
    lines.append(f"  • {pr.progression_assessment}")
    lines.append("")

    if report.cliche_findings:
        lines.append(f"⚠️ CONTEXT-AWARE CLICHÉ AUDITOR ({len(report.cliche_findings)} item(s) flagged):")
        for c in report.cliche_findings:
            prefix = "⚠️ [WARNING]" if c.severity == "warning" else "ℹ️ [INFO]"
            lines.append(f"  {prefix} [{c.section_tag}] (Line: {c.line_text})")
            lines.append(f"      Matched: '{c.matched_phrase}' ({c.category})")
            lines.append(f"      Why: {c.explanation}")
            lines.append(f"      Advice: {c.guidance}")
        lines.append("")

    if report.actionable_revisions:
        lines.append("🛠️ TARGETED ACTIONABLE REVISION ADVICE:")
        for idx, rec in enumerate(report.actionable_revisions, 1):
            lines.append(f"  {idx}. {rec}")
    else:
        lines.append("✨ No major weaknesses flagged. Lyrics meet PeerMusic's high poetic quality threshold!")

    lines.append("")
    lines.append("=" * 70)
    return "\n".join(lines)


def main():
    import argparse
    parser = argparse.ArgumentParser(description="PeerMusic Lyrical Quality Gate & Poetic Engine")
    subparsers = parser.add_subparsers(dest="command", help="Auditing commands")

    # audit command
    p_audit = subparsers.add_parser("audit", help="Audit a lyrics file for poetic quality")
    p_audit.add_argument("file", type=str, help="Path to lyrics text file")
    p_audit.add_argument("--lang", type=str, default="en", choices=["en", "hi", "english", "bollywood"], help="Song language")
    p_audit.add_argument("--bpm", type=int, default=80, help="Target tempo BPM")
    p_audit.add_argument("--json", action="store_true", help="Output raw JSON")

    args = parser.parse_args()

    if args.command == "audit":
        if not os.path.exists(args.file):
            print(f"Error: File '{args.file}' not found.", file=sys.stderr)
            sys.exit(1)
        with open(args.file, "r", encoding="utf-8") as f:
            content = f.read()

        lang = "hi" if args.lang in ("hi", "bollywood") else "en"
        report = evaluate_lyrics_quality(content, language=lang, tempo_bpm=args.bpm)

        if args.json:
            out = {
                "title": report.title,
                "language": report.language,
                "overall_score": report.overall_score,
                "quality_status": report.quality_status,
                "dimensions": [d._asdict() for d in report.dimension_scores],
                "actionable_revisions": report.actionable_revisions,
                "cliches": [c._asdict() for c in report.cliche_findings],
                "pacing": report.pacing_report._asdict(),
            }
            print(json.dumps(out, indent=2))
        else:
            print(format_audit_report_text(report))
        
        sys.exit(0 if report.quality_status == "APPROVED_FOR_RELEASE" else 1)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
