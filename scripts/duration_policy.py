#!/usr/bin/env python3
"""
PeerMusic Central Song Duration Policy & Single Source of Truth
==============================================================
Defines the authoritative duration constraints, targets, safety margins,
and lyric word-count budgets across English and Hindi songwriting pipelines.

Policy constraints:
- Target Duration: ~170.0s – 178.0s (~2:50 – 2:58)
- Nominal Target: 174.0s (~2:54)
- Absolute Maximum Duration: 180.0s (3:00 hard ceiling)
- Lyric word budget (including repeated choruses):
    - English: 140 – 185 sung words
    - Hindi: 150 – 195 sung words
"""

from typing import Tuple, NamedTuple


class DurationPolicy(NamedTuple):
    target_min_seconds: float = 170.0  # 2:50
    target_max_seconds: float = 178.0  # 2:58
    target_preferred_seconds: float = 174.0  # 2:54
    hard_max_seconds: float = 180.0  # 3:00 hard limit
    max_trailing_silence_seconds: float = 2.5
    fade_out_duration_seconds: float = 2.5
    english_sung_words_budget: Tuple[int, int] = (140, 185)
    hindi_sung_words_budget: Tuple[int, int] = (150, 195)


# Global singleton instance
POLICY = DurationPolicy()

# Constants for direct import
TARGET_DURATION_MIN = POLICY.target_min_seconds
TARGET_DURATION_MAX = POLICY.target_max_seconds
TARGET_DURATION_PREFERRED = POLICY.target_preferred_seconds
MAX_DURATION_SECONDS = POLICY.hard_max_seconds
MAX_TRAILING_SILENCE_SECONDS = POLICY.max_trailing_silence_seconds
FADE_OUT_DURATION_SECONDS = POLICY.fade_out_duration_seconds

ENGLISH_WORD_BUDGET = POLICY.english_sung_words_budget
HINDI_WORD_BUDGET = POLICY.hindi_sung_words_budget


def is_duration_compliant(duration_seconds: float) -> bool:
    """Returns True if the duration strictly obeys the hard maximum limit (<= 180.0s)."""
    return 0.0 < duration_seconds <= MAX_DURATION_SECONDS


def is_duration_in_target_window(duration_seconds: float) -> bool:
    """Returns True if the duration is within the preferred 2:50-2:58 target range."""
    return TARGET_DURATION_MIN <= duration_seconds <= TARGET_DURATION_MAX


def format_duration_str(seconds: float) -> str:
    """Formats seconds into mm:ss display string."""
    m = int(seconds // 60)
    s = int(round(seconds % 60))
    if s >= 60:
        m += 1
        s = 0
    return f"{m}:{s:02d}"
