#!/usr/bin/env python3
"""
PeerMusic Song Session & Direction Preference Engine
====================================================
Manages user musical direction preferences (English vs Bollywood/Hindi),
intelligent intent detection from natural language briefs, session state persistence,
and lifecycle guards ensuring no lyrics generation or rendering begins without explicit confirmation.
"""

import os
import sys
import json
import re
from enum import Enum
from typing import Dict, Any, Optional, Tuple, NamedTuple
from datetime import datetime, timezone

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AGENTS_DIR = os.path.join(ROOT_DIR, ".agents")
SESSION_FILE = os.path.join(AGENTS_DIR, "session.json")


class MusicalDirection(str, Enum):
    ENGLISH = "english"
    BOLLYWOOD = "bollywood"
    UNSPECIFIED = "unspecified"


class SessionState(str, Enum):
    IDLE = "IDLE"
    AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION"
    CONFIRMED = "CONFIRMED"
    GENERATING = "GENERATING"
    COMPLETED = "COMPLETED"


class DetectionResult(NamedTuple):
    direction: MusicalDirection
    confidence: float
    matched_terms: list[str]
    is_ambiguous: bool
    explanation: str


CONFIRMATION_QUESTION = "🎵 What kind of song would you like to create?"
CONFIRMATION_OPTIONS = [
    {
        "id": "english",
        "label": "🇬🇧 English Song",
        "description": "An English-language song with a suitable musical style, mood, and production direction."
    },
    {
        "id": "bollywood",
        "label": "🇮🇳 Bollywood Song",
        "description": "A Bollywood-style Hindi song with an appropriate Indian cinematic musical arrangement, emotional expression, and vocal direction."
    }
]

# Regex patterns for explicit direction detection
BOLLYWOOD_PATTERNS = [
    r"\bbollywood\b",
    r"\bhindi\b",
    r"\bhinglish\b",
    r"\bplayback\b",
    r"\bsufi\b",
    r"\bqawwali\b",
    r"\bhindustani\b",
    r"\bindian\s+cinematic\b",
    r"\bindian\s+indie\b",
    r"\bdesi\b",
    r"\bghazal\b"
]

ENGLISH_PATTERNS = [
    r"\benglish\b",
    r"\bwestern\s+pop\b",
    r"\bwestern\s+cinematic\b",
    r"\bamerican\s+pop\b",
    r"\bbritish\s+pop\b",
    r"\bindie\s+pop\s+in\s+english\b",
    r"\benglish\s+lyrics\b",
    r"\benglish\s+song\b",
    r"\benglish\s+ballad\b"
]

# Pure mood, subject, and style terms that MUST NOT trigger an implicit language choice
NEUTRAL_MOOD_TERMS = [
    "romantic", "romance", "love", "first love", "heartbreak", "sad", "sadness",
    "nostalgia", "nostalgic", "school memories", "school", "college", "friends",
    "friendship", "farewell", "acoustic", "piano", "lofi", "upbeat", "energetic",
    "anthem", "dance", "party", "chill", "relaxing", "deep", "soulful", "peaceful",
    "hopeful", "cinematic", "reels", "summer", "monsoon", "winter", "motivational",
    "dreamy", "folk", "ballad", "pop", "rock", "indie", "student life", "classroom"
]


def detect_direction(text: str) -> DetectionResult:
    """
    Intelligently inspects a user brief to determine if an explicit musical direction /
    language has been specified, or if it is ambiguous and requires mandatory confirmation.
    """
    if not text or not text.strip():
        return DetectionResult(
            direction=MusicalDirection.UNSPECIFIED,
            confidence=0.0,
            matched_terms=[],
            is_ambiguous=True,
            explanation="Empty prompt. Requires clarification."
        )

    lowered = text.lower()

    bollywood_matches = []
    for pattern in BOLLYWOOD_PATTERNS:
        match = re.search(pattern, lowered)
        if match:
            bollywood_matches.append(match.group(0))

    english_matches = []
    for pattern in ENGLISH_PATTERNS:
        match = re.search(pattern, lowered)
        if match:
            english_matches.append(match.group(0))

    # Both mentioned -> Ambiguous conflict
    if bollywood_matches and english_matches:
        return DetectionResult(
            direction=MusicalDirection.UNSPECIFIED,
            confidence=0.5,
            matched_terms=bollywood_matches + english_matches,
            is_ambiguous=True,
            explanation=f"Conflicting directions detected: Bollywood ({bollywood_matches}) and English ({english_matches}). Needs confirmation."
        )

    # Explicit Bollywood / Hindi
    if bollywood_matches:
        return DetectionResult(
            direction=MusicalDirection.BOLLYWOOD,
            confidence=1.0,
            matched_terms=bollywood_matches,
            is_ambiguous=False,
            explanation=f"Explicit Bollywood/Hindi preference detected: {', '.join(bollywood_matches)}."
        )

    # Explicit English
    if english_matches:
        return DetectionResult(
            direction=MusicalDirection.ENGLISH,
            confidence=1.0,
            matched_terms=english_matches,
            is_ambiguous=False,
            explanation=f"Explicit English preference detected: {', '.join(english_matches)}."
        )

    # No explicit direction given (even if rich mood / genre is provided)
    detected_moods = [m for m in NEUTRAL_MOOD_TERMS if m in lowered]
    mood_str = f" Mood/topic detected: {', '.join(detected_moods)}." if detected_moods else ""
    return DetectionResult(
        direction=MusicalDirection.UNSPECIFIED,
        confidence=0.0,
        matched_terms=[],
        is_ambiguous=True,
        explanation=f"No explicit language or musical direction specified.{mood_str} Confirmation is mandatory."
    )


class SongSessionManager:
    """
    Session state manager that guarantees no song generation occurs
    prior to explicit confirmation of musical direction.
    """

    def __init__(self, session_path: str = SESSION_FILE):
        self.session_path = session_path
        self._ensure_dir()
        self.state: SessionState = SessionState.IDLE
        self.direction: MusicalDirection = MusicalDirection.UNSPECIFIED
        self.current_prompt: Optional[str] = None
        self.song_title: Optional[str] = None
        self.created_at: Optional[str] = None
        self.updated_at: Optional[str] = None
        self.load()

    def _ensure_dir(self) -> None:
        parent = os.path.dirname(self.session_path)
        if parent and not os.path.exists(parent):
            os.makedirs(parent, exist_ok=True)

    def load(self) -> None:
        if os.path.exists(self.session_path):
            try:
                with open(self.session_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.state = SessionState(data.get("state", SessionState.IDLE.value))
                    self.direction = MusicalDirection(data.get("direction", MusicalDirection.UNSPECIFIED.value))
                    self.current_prompt = data.get("current_prompt")
                    self.song_title = data.get("song_title")
                    self.created_at = data.get("created_at")
                    self.updated_at = data.get("updated_at")
            except Exception:
                self.reset()
        else:
            self.reset()

    def save(self) -> None:
        self.updated_at = datetime.now(timezone.utc).isoformat()
        if not self.created_at:
            self.created_at = self.updated_at
        data = {
            "state": self.state.value,
            "direction": self.direction.value,
            "current_prompt": self.current_prompt,
            "song_title": self.song_title,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
        with open(self.session_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def reset(self) -> None:
        """Resets the session state for a fresh song request."""
        self.state = SessionState.IDLE
        self.direction = MusicalDirection.UNSPECIFIED
        self.current_prompt = None
        self.song_title = None
        self.created_at = datetime.now(timezone.utc).isoformat()
        self.updated_at = self.created_at
        if os.path.exists(self.session_path):
            try:
                with open(self.session_path, "w", encoding="utf-8") as f:
                    json.dump({
                        "state": self.state.value,
                        "direction": self.direction.value,
                        "current_prompt": None,
                        "song_title": None,
                        "created_at": self.created_at,
                        "updated_at": self.updated_at
                    }, f, indent=2)
            except Exception:
                pass

    def handle_request(self, prompt: str) -> Dict[str, Any]:
        """
        Processes a song creation request:
        - If language/direction is explicitly specified, transitions to CONFIRMED.
        - If unspecified or ambiguous, transitions to AWAITING_CONFIRMATION and returns the mandatory question.
        """
        # Reset session for a new song request to avoid silent reuse of past preferences
        self.reset()
        self.current_prompt = prompt

        detection = detect_direction(prompt)

        if detection.is_ambiguous or detection.direction == MusicalDirection.UNSPECIFIED:
            self.state = SessionState.AWAITING_CONFIRMATION
            self.direction = MusicalDirection.UNSPECIFIED
            self.save()
            return {
                "requires_confirmation": True,
                "state": self.state.value,
                "question": CONFIRMATION_QUESTION,
                "options": CONFIRMATION_OPTIONS,
                "detection": detection._asdict(),
                "can_proceed_to_generation": False,
                "message": (
                    f"{CONFIRMATION_QUESTION}\n\n"
                    f"Please choose your preferred musical direction:\n"
                    f"- **{CONFIRMATION_OPTIONS[0]['label']}** — {CONFIRMATION_OPTIONS[0]['description']}\n"
                    f"- **{CONFIRMATION_OPTIONS[1]['label']}** — {CONFIRMATION_OPTIONS[1]['description']}\n"
                )
            }
        else:
            self.state = SessionState.CONFIRMED
            self.direction = detection.direction
            self.save()
            return {
                "requires_confirmation": False,
                "state": self.state.value,
                "direction": self.direction.value,
                "detection": detection._asdict(),
                "can_proceed_to_generation": True,
                "message": f"Proceeding with {self.direction.value.capitalize()} musical direction ({detection.explanation})."
            }

    def confirm_direction(self, selection_text: str) -> Dict[str, Any]:
        """
        Confirms direction from user's response to the confirmation question.
        Accepts keywords like 'english', 'bollywood', 'hindi', '1', '2', etc.
        """
        if self.state == SessionState.GENERATING:
            return {
                "success": False,
                "state": self.state.value,
                "direction": self.direction.value,
                "error": "Generation is already in progress. Cannot change confirmation while generating."
            }

        lowered = selection_text.lower().strip()
        selected: Optional[MusicalDirection] = None

        if any(kw in lowered for kw in ["english", "uk", "1", "option 1", "first"]):
            selected = MusicalDirection.ENGLISH
        elif any(kw in lowered for kw in ["bollywood", "hindi", "hinglish", "indian", "2", "option 2", "second"]):
            selected = MusicalDirection.BOLLYWOOD

        if not selected:
            # Fall back to detect_direction
            det = detect_direction(selection_text)
            if not det.is_ambiguous and det.direction != MusicalDirection.UNSPECIFIED:
                selected = det.direction

        if not selected:
            return {
                "success": False,
                "state": self.state.value,
                "error": f"Could not determine direction from '{selection_text}'. Please reply with 'English' or 'Bollywood'."
            }

        self.direction = selected
        self.state = SessionState.CONFIRMED
        self.save()

        return {
            "success": True,
            "state": self.state.value,
            "direction": self.direction.value,
            "can_proceed_to_generation": True,
            "message": f"Confirmed {self.direction.value.capitalize()} direction. Songwriting pipeline ready to begin."
        }

    def change_direction(self, new_direction_text: str) -> Dict[str, Any]:
        """
        Handles follow-up changes before generation begins.
        e.g., User says 'Actually, make it English' after choosing Bollywood.
        """
        if self.state == SessionState.GENERATING:
            return {
                "success": False,
                "state": self.state.value,
                "error": "Music generation has already begun for this track. Active generation cannot be silently restarted."
            }

        lowered = new_direction_text.lower().strip()
        new_dir: Optional[MusicalDirection] = None

        if "english" in lowered:
            new_dir = MusicalDirection.ENGLISH
        elif any(kw in lowered for kw in ["bollywood", "hindi", "hinglish"]):
            new_dir = MusicalDirection.BOLLYWOOD
        else:
            det = detect_direction(new_direction_text)
            if not det.is_ambiguous and det.direction != MusicalDirection.UNSPECIFIED:
                new_dir = det.direction

        if not new_dir:
            return {
                "success": False,
                "state": self.state.value,
                "direction": self.direction.value,
                "error": f"Unrecognized direction in '{new_direction_text}'. Please specify English or Bollywood."
            }

        old_dir = self.direction
        self.direction = new_dir
        self.state = SessionState.CONFIRMED
        self.save()

        return {
            "success": True,
            "state": self.state.value,
            "old_direction": old_dir.value if old_dir else None,
            "direction": self.direction.value,
            "can_proceed_to_generation": True,
            "message": f"Updated direction to {self.direction.value.capitalize()} (was {old_dir.value if old_dir else 'unspecified'})."
        }

    def start_generation(self) -> Dict[str, Any]:
        """
        Guards transition to GENERATING state. Fails if not yet confirmed.
        """
        if self.state not in (SessionState.CONFIRMED, SessionState.COMPLETED):
            return {
                "allowed": False,
                "state": self.state.value,
                "error": f"Cannot start generation in state '{self.state.value}'. Musical direction must be confirmed first."
            }

        self.state = SessionState.GENERATING
        self.save()
        return {
            "allowed": True,
            "state": self.state.value,
            "direction": self.direction.value,
            "message": f"Generation started for {self.direction.value} song."
        }

    def complete_generation(self, song_title: Optional[str] = None) -> Dict[str, Any]:
        """Marks generation as completed."""
        self.state = SessionState.COMPLETED
        if song_title:
            self.song_title = song_title
        self.save()
        return {
            "state": self.state.value,
            "direction": self.direction.value,
            "song_title": self.song_title,
            "message": "Generation cycle completed."
        }


# CLI Interface for scripts, testing, and debugging
def main():
    import argparse
    parser = argparse.ArgumentParser(description="PeerMusic Song Session & Preference CLI")
    subparsers = parser.add_subparsers(dest="command", help="Session commands")

    # detect
    p_detect = subparsers.add_parser("detect", help="Analyze prompt for musical direction")
    p_detect.add_argument("text", type=str, help="Prompt text to analyze")

    # request
    p_request = subparsers.add_parser("request", help="Submit song request to session manager")
    p_request.add_argument("text", type=str, help="Song request prompt")

    # confirm
    p_confirm = subparsers.add_parser("confirm", help="Confirm musical direction")
    p_confirm.add_argument("choice", type=str, help="Direction choice ('english' or 'bollywood')")

    # change
    p_change = subparsers.add_parser("change", help="Change musical direction before generation")
    p_change.add_argument("choice", type=str, help="New direction choice")

    # start-generation
    subparsers.add_parser("start-generation", help="Transition to GENERATING state (guarded)")

    # complete-generation
    p_comp = subparsers.add_parser("complete-generation", help="Mark generation as completed")
    p_comp.add_argument("--title", type=str, default=None, help="Optional song title")

    # status
    subparsers.add_parser("status", help="Inspect current session state")

    # reset
    subparsers.add_parser("reset", help="Reset session")

    args = parser.parse_args()
    manager = SongSessionManager()

    if args.command == "detect":
        res = detect_direction(args.text)
        print(json.dumps(res._asdict(), indent=2))

    elif args.command == "request":
        res = manager.handle_request(args.text)
        print(json.dumps(res, indent=2))

    elif args.command == "confirm":
        res = manager.confirm_direction(args.choice)
        print(json.dumps(res, indent=2))

    elif args.command == "change":
        res = manager.change_direction(args.choice)
        print(json.dumps(res, indent=2))

    elif args.command == "start-generation":
        res = manager.start_generation()
        print(json.dumps(res, indent=2))

    elif args.command == "complete-generation":
        res = manager.complete_generation(args.title)
        print(json.dumps(res, indent=2))

    elif args.command == "status":
        print(json.dumps({
            "state": manager.state.value,
            "direction": manager.direction.value,
            "current_prompt": manager.current_prompt,
            "song_title": manager.song_title,
            "created_at": manager.created_at,
            "updated_at": manager.updated_at
        }, indent=2))

    elif args.command == "reset":
        manager.reset()
        print(json.dumps({"message": "Session reset to IDLE."}, indent=2))

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
