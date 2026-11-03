#!/usr/bin/env python3
"""
Unit and Integration Tests for PeerMusic Song Session & Preference Workflow
===========================================================================
Validates the 9 mandatory behavioral guarantees from USER_REQUEST:
1. Generic song request triggers confirmation question.
2. Selecting English starts the correct English workflow.
3. Selecting Bollywood starts the correct Bollywood workflow.
4. Explicit English request proceeds without redundant confirmation.
5. Explicit Bollywood/Hindi request proceeds without redundant confirmation.
6. Ambiguous requests do not silently default to English.
7. No generation begins before required confirmation.
8. Follow-up changes before generation update selection; changes after generation are guarded.
9. Resetting on new request prevents silent preference reuse.
"""

import os
import sys
import unittest
import tempfile
import json

# Add project root and scripts/ to sys.path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from scripts.song_session import (
    SongSessionManager,
    SessionState,
    MusicalDirection,
    detect_direction,
    CONFIRMATION_QUESTION,
    CONFIRMATION_OPTIONS,
)


class TestPeerMusicSongSession(unittest.TestCase):

    def setUp(self):
        # Use a temporary file for isolated session testing
        self.temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".json")
        self.temp_file.close()
        self.manager = SongSessionManager(session_path=self.temp_file.name)

    def tearDown(self):
        if os.path.exists(self.temp_file.name):
            os.remove(self.temp_file.name)

    def test_01_generic_song_request_triggers_confirmation(self):
        """Case 1: A generic song request triggers the confirmation question."""
        prompt = "Create a beautiful song about school memories."
        res = self.manager.handle_request(prompt)

        self.assertTrue(res["requires_confirmation"])
        self.assertFalse(res["can_proceed_to_generation"])
        self.assertEqual(self.manager.state, SessionState.AWAITING_CONFIRMATION)
        self.assertEqual(self.manager.direction, MusicalDirection.UNSPECIFIED)
        self.assertEqual(res["question"], CONFIRMATION_QUESTION)
        self.assertIn("English Song", res["message"])
        self.assertIn("Bollywood Song", res["message"])

    def test_02_selecting_english_starts_english_workflow(self):
        """Case 2: Selecting English starts the correct English-language workflow."""
        self.manager.handle_request("Create a song about school memories.")
        self.assertEqual(self.manager.state, SessionState.AWAITING_CONFIRMATION)

        conf_res = self.manager.confirm_direction("English")
        self.assertTrue(conf_res["success"])
        self.assertTrue(conf_res["can_proceed_to_generation"])
        self.assertEqual(self.manager.state, SessionState.CONFIRMED)
        self.assertEqual(self.manager.direction, MusicalDirection.ENGLISH)

        gen_res = self.manager.start_generation()
        self.assertTrue(gen_res["allowed"])
        self.assertEqual(gen_res["direction"], MusicalDirection.ENGLISH.value)

    def test_03_selecting_bollywood_starts_bollywood_workflow(self):
        """Case 3: Selecting Bollywood starts the correct Bollywood-style Hindi workflow."""
        self.manager.handle_request("Create a song about school memories.")
        self.assertEqual(self.manager.state, SessionState.AWAITING_CONFIRMATION)

        conf_res = self.manager.confirm_direction("Bollywood")
        self.assertTrue(conf_res["success"])
        self.assertTrue(conf_res["can_proceed_to_generation"])
        self.assertEqual(self.manager.state, SessionState.CONFIRMED)
        self.assertEqual(self.manager.direction, MusicalDirection.BOLLYWOOD)

        gen_res = self.manager.start_generation()
        self.assertTrue(gen_res["allowed"])
        self.assertEqual(gen_res["direction"], MusicalDirection.BOLLYWOOD.value)

    def test_04_explicit_english_skips_redundant_confirmation(self):
        """Case 4: A request that explicitly specifies English does not trigger redundant confirmation."""
        prompts = [
            "Create a beautiful English song about school memories.",
            "Write an English indie pop track about late night drives.",
            "Make an acoustic song in English with a melancholic mood."
        ]
        for prompt in prompts:
            res = self.manager.handle_request(prompt)
            self.assertFalse(res["requires_confirmation"], f"Failed on prompt: {prompt}")
            self.assertTrue(res["can_proceed_to_generation"])
            self.assertEqual(self.manager.state, SessionState.CONFIRMED)
            self.assertEqual(self.manager.direction, MusicalDirection.ENGLISH)

    def test_05_explicit_bollywood_or_hindi_skips_redundant_confirmation(self):
        """Case 5: A request that explicitly specifies Bollywood or Hindi does not trigger redundant confirmation."""
        prompts = [
            "Create an emotional Bollywood song about first love.",
            "Make a Hindi song with a Bollywood cinematic feel.",
            "Write a soulful Sufi playback track in Hindustani.",
            "Compose a Hinglish indie song about hostel life."
        ]
        for prompt in prompts:
            res = self.manager.handle_request(prompt)
            self.assertFalse(res["requires_confirmation"], f"Failed on prompt: {prompt}")
            self.assertTrue(res["can_proceed_to_generation"])
            self.assertEqual(self.manager.state, SessionState.CONFIRMED)
            self.assertEqual(self.manager.direction, MusicalDirection.BOLLYWOOD)

    def test_06_ambiguous_requests_do_not_silently_default_to_english(self):
        """Case 6: Ambiguous requests do not silently default to English."""
        ambiguous_prompts = [
            "Create a romantic song.",
            "Make a nostalgic song about classroom days.",
            "Write a sad heartbreak ballad.",
            "Compose a lofi song with chill beats.",
            "Write a song about rainy days and chai.",
            "Create an upbeat anthem for graduation."
        ]
        for prompt in ambiguous_prompts:
            det = detect_direction(prompt)
            self.assertTrue(det.is_ambiguous, f"Prompt should be ambiguous: {prompt}")
            self.assertEqual(det.direction, MusicalDirection.UNSPECIFIED)

            res = self.manager.handle_request(prompt)
            self.assertTrue(res["requires_confirmation"], f"Failed on prompt: {prompt}")
            self.assertFalse(res["can_proceed_to_generation"])
            self.assertNotEqual(self.manager.direction, MusicalDirection.ENGLISH, "Must NOT default to English!")
            self.assertNotEqual(self.manager.direction, MusicalDirection.BOLLYWOOD, "Must NOT default to Bollywood!")
            self.assertEqual(self.manager.direction, MusicalDirection.UNSPECIFIED)

    def test_07_no_generation_before_confirmation(self):
        """Case 7: No generation API call or downstream rendering begins before required confirmation."""
        # Generic request leaves session in AWAITING_CONFIRMATION
        self.manager.handle_request("Create a song about school memories.")
        self.assertEqual(self.manager.state, SessionState.AWAITING_CONFIRMATION)

        # Attempting to start generation while unconfirmed MUST fail
        attempt = self.manager.start_generation()
        self.assertFalse(attempt["allowed"])
        self.assertIn("Musical direction must be confirmed first", attempt["error"])
        self.assertEqual(self.manager.state, SessionState.AWAITING_CONFIRMATION)

    def test_08_follow_up_changes_respected_and_guarded(self):
        """Case 8: Follow-up messages preserve selection and allow changes before generation, guarded once started."""
        # Step 1: User asks for a song
        self.manager.handle_request("Create a song about school memories.")

        # Step 2: User responds "Bollywood"
        self.manager.confirm_direction("Bollywood")
        self.assertEqual(self.manager.direction, MusicalDirection.BOLLYWOOD)

        # Step 3: Before generation, user changes mind: "Actually, make it English"
        change_res = self.manager.change_direction("Actually, make it English")
        self.assertTrue(change_res["success"])
        self.assertEqual(self.manager.direction, MusicalDirection.ENGLISH)
        self.assertEqual(self.manager.state, SessionState.CONFIRMED)

        # Step 4: Generation begins
        gen_res = self.manager.start_generation()
        self.assertTrue(gen_res["allowed"])
        self.assertEqual(self.manager.state, SessionState.GENERATING)

        # Step 5: After generation has started, changing direction is blocked
        late_change = self.manager.change_direction("Bollywood")
        self.assertFalse(late_change["success"])
        self.assertIn("already begun", late_change["error"])
        self.assertEqual(self.manager.direction, MusicalDirection.ENGLISH)

    def test_09_new_request_resets_and_does_not_silently_reuse_old_preference(self):
        """Case 9: A new generic request does not silently inherit the prior session's preference."""
        # First session: User chose Bollywood
        self.manager.handle_request("Create an emotional Bollywood song about first love.")
        self.assertEqual(self.manager.direction, MusicalDirection.BOLLYWOOD)
        self.manager.start_generation()
        self.manager.complete_generation(song_title="Pehla Pyar")

        # Second request is generic
        res = self.manager.handle_request("Create a song about travel and mountains.")
        self.assertTrue(res["requires_confirmation"], "New generic request must prompt, NOT reuse old Bollywood preference!")
        self.assertEqual(self.manager.direction, MusicalDirection.UNSPECIFIED)
        self.assertEqual(self.manager.state, SessionState.AWAITING_CONFIRMATION)


if __name__ == "__main__":
    unittest.main()
