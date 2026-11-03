#!/usr/bin/env python3
"""
Unit and Integration Tests for PeerMusic Duration Guard & Policy Enforcement
=============================================================================
Validates:
1. Single source of truth constants (180s hard max, 170-178s preferred target).
2. Scenarios A through F (170s, 178s, 180s, 181s, 240s, 300s).
3. Trailing silence trimming.
4. Real-world audio validation (between_the_pages.mp3 compliant, kacchi_neendein.mp3 shortened).
5. Downstream timeline synchronization (clamping scenes, words, and totalFrames).
6. CLI interface commands (policy, check).
"""

import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from scripts.duration_policy import (
    MAX_DURATION_SECONDS,
    TARGET_DURATION_MIN,
    TARGET_DURATION_MAX,
    TARGET_DURATION_PREFERRED,
    MAX_TRAILING_SILENCE_SECONDS,
    FADE_OUT_DURATION_SECONDS,
    ENGLISH_WORD_BUDGET,
    HINDI_WORD_BUDGET,
    is_duration_compliant,
    is_duration_in_target_window,
    format_duration_str,
)
from scripts.duration_guard import (
    measure_audio_duration,
    validate_audio_duration,
    detect_trailing_silence,
    enforce_duration_limit,
    sync_timeline_to_audio_duration,
)


def generate_synthetic_audio(output_path: str, duration_seconds: float, trailing_silence_seconds: float = 0.0):
    """Generates synthetic audio using ffmpeg lavfi tone generator."""
    if trailing_silence_seconds > 0.0:
        tone_dur = max(0.1, duration_seconds - trailing_silence_seconds)
        filter_str = (
            f"sine=frequency=440:duration={tone_dur:.2f} [tone]; "
            f"anullsrc=r=44100:cl=mono:d={trailing_silence_seconds:.2f} [silence]; "
            f"[tone][silence] concat=n=2:v=0:a=1 [out]"
        )
        cmd = [
            "ffmpeg", "-y", "-v", "error",
            "-filter_complex", filter_str,
            "-map", "[out]",
            "-c:a", "libmp3lame",
            output_path,
        ]
    else:
        cmd = [
            "ffmpeg", "-y", "-v", "error",
            "-f", "lavfi",
            "-i", f"sine=frequency=440:duration={duration_seconds:.2f}",
            "-c:a", "libmp3lame",
            output_path,
        ]
    subprocess.run(cmd, check=True)


class TestDurationGuard(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp_dir = tempfile.mkdtemp(prefix="peermusic_duration_test_")

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(cls.temp_dir, ignore_errors=True)

    def test_01_single_source_of_truth_constants(self):
        """Verifies policy limits match requirements exactly."""
        self.assertEqual(MAX_DURATION_SECONDS, 180.0)
        self.assertEqual(TARGET_DURATION_MIN, 170.0)
        self.assertEqual(TARGET_DURATION_MAX, 178.0)
        self.assertEqual(TARGET_DURATION_PREFERRED, 174.0)
        self.assertEqual(MAX_TRAILING_SILENCE_SECONDS, 2.5)
        self.assertEqual(FADE_OUT_DURATION_SECONDS, 2.5)
        self.assertEqual(ENGLISH_WORD_BUDGET, (140, 185))
        self.assertEqual(HINDI_WORD_BUDGET, (150, 195))

        # Check compliance helper
        self.assertTrue(is_duration_compliant(170.0))
        self.assertTrue(is_duration_compliant(178.0))
        self.assertTrue(is_duration_compliant(180.0))
        self.assertFalse(is_duration_compliant(180.1))
        self.assertFalse(is_duration_compliant(240.0))

    def test_02_scenario_a_170_seconds_compliant(self):
        """Scenario A: 170.0s audio passes check and is unchanged."""
        test_file = os.path.join(self.temp_dir, "scenario_a_170s.mp3")
        generate_synthetic_audio(test_file, 170.0)

        is_compliant, msg, dur = validate_audio_duration(test_file)
        self.assertTrue(is_compliant)
        self.assertAlmostEqual(dur, 170.0, delta=0.5)

        final_path, final_dur, trimmed = enforce_duration_limit(test_file)
        self.assertFalse(trimmed)
        self.assertEqual(final_path, test_file)

    def test_03_scenario_b_178_seconds_compliant(self):
        """Scenario B: 178.0s audio passes check and is unchanged."""
        test_file = os.path.join(self.temp_dir, "scenario_b_178s.mp3")
        generate_synthetic_audio(test_file, 178.0)

        is_compliant, msg, dur = validate_audio_duration(test_file)
        self.assertTrue(is_compliant)
        self.assertAlmostEqual(dur, 178.0, delta=0.5)

        final_path, final_dur, trimmed = enforce_duration_limit(test_file)
        self.assertFalse(trimmed)
        self.assertEqual(final_path, test_file)

    def test_04_scenario_c_180_seconds_compliant(self):
        """Scenario C: 180.0s audio passes check at the exact maximum ceiling."""
        test_file = os.path.join(self.temp_dir, "scenario_c_180s.mp3")
        generate_synthetic_audio(test_file, 180.0)

        is_compliant, msg, dur = validate_audio_duration(test_file)
        self.assertTrue(is_compliant)
        self.assertAlmostEqual(dur, 180.0, delta=0.5)

    def test_05_scenario_d_181_seconds_shortened(self):
        """Scenario D: 181.0s audio fails check, gets shortened to <= 178.0s."""
        test_file = os.path.join(self.temp_dir, "scenario_d_181s.mp3")
        generate_synthetic_audio(test_file, 181.0)

        is_compliant, msg, dur = validate_audio_duration(test_file)
        self.assertFalse(is_compliant)

        out_file = os.path.join(self.temp_dir, "scenario_d_shortened.mp3")
        final_path, final_dur, trimmed = enforce_duration_limit(test_file, output_path=out_file)
        self.assertTrue(trimmed)
        self.assertEqual(final_path, out_file)
        self.assertLessEqual(final_dur, 180.0)
        self.assertLessEqual(final_dur, TARGET_DURATION_MAX + 0.5)

    def test_06_scenario_e_240_seconds_shortened(self):
        """Scenario E: 240.0s (4:00) audio fails check, gets shortened to <= 178.0s."""
        test_file = os.path.join(self.temp_dir, "scenario_e_240s.mp3")
        generate_synthetic_audio(test_file, 240.0)

        is_compliant, msg, dur = validate_audio_duration(test_file)
        self.assertFalse(is_compliant)

        out_file = os.path.join(self.temp_dir, "scenario_e_shortened.mp3")
        final_path, final_dur, trimmed = enforce_duration_limit(test_file, output_path=out_file)
        self.assertTrue(trimmed)
        self.assertLessEqual(final_dur, 180.0)
        self.assertLessEqual(final_dur, TARGET_DURATION_MAX + 0.5)

    def test_07_scenario_f_300_seconds_shortened(self):
        """Scenario F: 300.0s (5:00) audio fails check, gets shortened to <= 178.0s."""
        test_file = os.path.join(self.temp_dir, "scenario_f_300s.mp3")
        generate_synthetic_audio(test_file, 300.0)

        is_compliant, msg, dur = validate_audio_duration(test_file)
        self.assertFalse(is_compliant)

        out_file = os.path.join(self.temp_dir, "scenario_f_shortened.mp3")
        final_path, final_dur, trimmed = enforce_duration_limit(test_file, output_path=out_file)
        self.assertTrue(trimmed)
        self.assertLessEqual(final_dur, 180.0)
        self.assertLessEqual(final_dur, TARGET_DURATION_MAX + 0.5)

    def test_08_trailing_silence_detection_and_stripping(self):
        """Verifies that audio with trailing silence is detected and trimmed."""
        # 174s sound + 8s silence = 182s total duration
        test_file = os.path.join(self.temp_dir, "silence_test.mp3")
        generate_synthetic_audio(test_file, 182.0, trailing_silence_seconds=8.0)

        silence_start, silence_dur = detect_trailing_silence(test_file)
        self.assertGreaterEqual(silence_dur, 6.0)

        out_file = os.path.join(self.temp_dir, "silence_test_trimmed.mp3")
        final_path, final_dur, trimmed = enforce_duration_limit(test_file, output_path=out_file)
        self.assertTrue(trimmed)
        self.assertLessEqual(final_dur, 180.0)

    def test_09_real_audio_in_repo(self):
        """Validates real audio files in repository."""
        btp_path = os.path.join(PROJECT_ROOT, "public", "audio", "between_the_pages.mp3")
        if os.path.exists(btp_path):
            is_compliant, msg, dur = validate_audio_duration(btp_path)
            self.assertTrue(is_compliant, f"between_the_pages should be compliant: {dur}s")
            self.assertLessEqual(dur, 180.0)

        kn_path = os.path.join(PROJECT_ROOT, "public", "audio", "kacchi_neendein.mp3")
        if os.path.exists(kn_path):
            is_compliant, msg, dur = validate_audio_duration(kn_path)
            self.assertFalse(is_compliant, f"kacchi_neendein should be overlength: {dur}s")
            out_kn = os.path.join(self.temp_dir, "kacchi_neendein_shortened.mp3")
            final_path, final_dur, trimmed = enforce_duration_limit(kn_path, output_path=out_kn)
            self.assertTrue(trimmed)
            self.assertLessEqual(final_dur, 180.0)
            self.assertLessEqual(final_dur, TARGET_DURATION_MAX + 0.5)

    def test_10_downstream_timeline_synchronization(self):
        """Validates that timeline JSON is clamped and synchronized to audio duration."""
        mock_timeline = {
            "fps": 30,
            "totalFrames": 7200,  # 240 seconds
            "scenes": [
                {
                    "id": "scene_1",
                    "startFrame": 0,
                    "endFrame": 2700,  # 0 to 90s
                    "lines": [
                        {
                            "text": "Intro line",
                            "words": [{"word": "Intro", "startFrame": 0, "endFrame": 60}],
                        }
                    ],
                },
                {
                    "id": "scene_2",
                    "startFrame": 2700,
                    "endFrame": 5400,  # 90 to 180s
                    "lines": [
                        {
                            "text": "Middle line",
                            "words": [
                                {"word": "Middle", "startFrame": 2730, "endFrame": 2790},
                                {"word": "Bridge", "startFrame": 5100, "endFrame": 5220},
                            ],
                        }
                    ],
                },
                {
                    "id": "scene_3",
                    "startFrame": 5400,
                    "endFrame": 7200,  # 180 to 240s (must be removed/pruned)
                    "lines": [
                        {
                            "text": "Outro line",
                            "words": [{"word": "Outro", "startFrame": 5700, "endFrame": 6300}],
                        }
                    ],
                },
            ],
        }

        # Synchronize to 175.5s
        target_audio_dur = 175.5
        synced = sync_timeline_to_audio_duration(mock_timeline, target_audio_dur)

        expected_max_frames = round(target_audio_dur * 30)  # 5265
        self.assertEqual(synced["totalFrames"], expected_max_frames)
        self.assertEqual(synced["totalDurationSec"], 175.5)

        # Verify all scenes are within 5265 frames
        for sc in synced["scenes"]:
            self.assertLessEqual(sc["endFrame"], expected_max_frames)
            self.assertLess(sc["startFrame"], sc["endFrame"])
            for line in sc.get("lines", []):
                for w in line.get("words", []):
                    self.assertLessEqual(w["endFrame"], expected_max_frames)

        # Scene 3 started at 5400 > 5265, so it should have been pruned
        scene_ids = [sc["id"] for sc in synced["scenes"]]
        self.assertNotIn("scene_3", scene_ids)

    def test_11_cli_interface(self):
        """Verifies CLI execution of policy and check subcommands."""
        # Test policy command
        res_policy = subprocess.run(
            [sys.executable, os.path.join(PROJECT_ROOT, "scripts", "duration_guard.py"), "policy"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        self.assertEqual(res_policy.returncode, 0)
        self.assertIn("180.0s", res_policy.stdout)

        # Test check command on compliant song
        btp_path = os.path.join(PROJECT_ROOT, "public", "audio", "between_the_pages.mp3")
        if os.path.exists(btp_path):
            res_check = subprocess.run(
                [sys.executable, os.path.join(PROJECT_ROOT, "scripts", "duration_guard.py"), "check", btp_path],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            self.assertEqual(res_check.returncode, 0)


if __name__ == "__main__":
    unittest.main()
