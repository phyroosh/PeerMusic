#!/usr/bin/env python3
"""
Unit and Integration Tests for PeerMusic Songwriting Engine & Quality Auditor
=============================================================================
Validates:
1. Lyric parsing and section identification across English & Hindi formats.
2. Context-aware cliché detection (advisory explanations, distinction between
   unearned clichés and grounded contextual motifs).
3. Emotional subtext & specificity analysis (abstract vs concrete ratio).
4. Section progression analysis (identifying repetitive verses vs developed arcs).
5. Duration and vocal density pacing calculations for English and Hindi.
6. 10-Dimension Lyrical Quality Gate scoring and actionable revision generation.
"""

import os
import sys
import unittest

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from scripts.songwriting_engine import (
    parse_lyrics,
    audit_clichés,
    analyze_subtext_and_specificity,
    analyze_section_progression,
    calculate_pacing,
    evaluate_lyrics_quality,
)


class TestSongwritingEngine(unittest.TestCase):

    def test_01_parse_lyrics_sections_and_words(self):
        sample = """
Title: Test Ballad
Genre: Indie Pop

[Verse 1]
The kettle cools upon the stove.
I count the quiet steps you chose.

[Chorus]
An empty cup, a silent door,
I never ask for anymore.
"""
        song = parse_lyrics(sample)
        self.assertEqual(song.title, "Test Ballad")
        self.assertEqual(len(song.sections), 2)
        self.assertEqual(song.sections[0].normalized_type, "verse-1")
        self.assertEqual(song.sections[1].normalized_type, "chorus")
        self.assertGreater(song.total_sung_words, 20)

    def test_02_context_aware_cliche_auditor(self):
        # Superficial cliché example
        cliche_lyric = """
[Verse 1]
Tears falling like rain upon my cheek.
I am lost without you, feeling weak.
"""
        song = parse_lyrics(cliche_lyric)
        findings = audit_clichés(song, language="en")
        self.assertTrue(len(findings) >= 2)
        categories = [f.category for f in findings]
        self.assertIn("weather_emotion_equation", categories)
        self.assertIn("generic_disorientation", categories)
        # Check that explanatory guidance is provided
        self.assertTrue(all(f.guidance and f.explanation for f in findings))

    def test_03_hindi_cliche_auditor(self):
        hindi_cliche = """
[Mukhda]
Toota hua dil leke kahan jaaun,
Tere bin main adhoora, har pal pachtaun.
"""
        song = parse_lyrics(hindi_cliche)
        findings = audit_clichés(song, language="hi")
        self.assertTrue(len(findings) >= 2)
        phrases = [f.matched_phrase for f in findings]
        self.assertTrue(any("toota hua dil" in p for p in phrases))
        self.assertTrue(any("tere bin main adhoora" in p for p in phrases))

    def test_04_subtext_and_specificity_analysis(self):
        # Lyric with strong subtext
        subtext_rich = """
[Verse 1]
The dust has learned to settle on the chair.
I moved the clock, but time was never there.
Cold coffee in the chipped ceramic rim.
"""
        song = parse_lyrics(subtext_rich)
        analysis = analyze_subtext_and_specificity(song)
        self.assertGreaterEqual(analysis.concrete_anchors_count, 4)
        self.assertEqual(analysis.abstract_assertions_count, 0)
        self.assertIn("Strong emotional subtext", analysis.assessment)

        # Lyric with ungrounded abstract assertions
        abstract_poor = """
[Verse 1]
I miss you so much every single day.
I feel so empty since you walked away.
"""
        song_poor = parse_lyrics(abstract_poor)
        analysis_poor = analyze_subtext_and_specificity(song_poor)
        self.assertGreaterEqual(analysis_poor.abstract_assertions_count, 2)
        self.assertIn("Over-reliance on direct emotional statements", analysis_poor.assessment)

    def test_05_section_progression_analysis(self):
        # Stagnant song where Verse 2 repeats Verse 1
        stagnant = """
[Verse 1]
I walk down the dark street alone.
I look at my silent black phone.

[Chorus]
Wait for me tonight.

[Verse 2]
I walk down the dark street alone.
I stare at my silent black phone.
"""
        song_stag = parse_lyrics(stagnant)
        prog_stag = analyze_section_progression(song_stag)
        self.assertGreater(prog_stag.verse_similarity_ratio, 0.75)
        self.assertIn("shares a high word overlap", prog_stag.progression_assessment)

        # Progressive song where Verse 2 develops new stakes
        progressive = """
[Verse 1]
The morning bus ticket sits in my coat,
A crease where you folded a three-sentence note.

[Chorus]
Stay where the light stays.

[Verse 2]
Five winters later, the station was paved,
The wooden bench vanished, the names never saved.
"""
        song_prog = parse_lyrics(progressive)
        prog_res = analyze_section_progression(song_prog)
        self.assertLess(prog_res.verse_similarity_ratio, 0.40)
        self.assertIn("Healthy narrative progression", prog_res.progression_assessment)

    def test_06_duration_and_pacing_calculator(self):
        # Optimal English song ~175 words (target ~2:50, < 180s)
        text = "[Verse 1]\n" + "word " * 175
        song = parse_lyrics(text)
        pacing = calculate_pacing(song, language="en")
        self.assertEqual(pacing.status, "optimal")
        self.assertEqual(pacing.target_duration_str, "~2:50")

        # Overcrowded song ~250 words (> 205 words limit)
        overcrowded = "[Verse 1]\n" + "word " * 250
        song_over = parse_lyrics(overcrowded)
        pacing_over = calculate_pacing(song_over, language="en")
        self.assertEqual(pacing_over.status, "overcrowded")

    def test_07_comprehensive_quality_gate_evaluation(self):
        sample = """
Title: Golden Hour Letters
Genre: Dreamy Indie Pop

[Verse 1]
The copper radiator clanks at five,
A slant of winter sun begins to climb.
Your handwriting in pencil on the sleeve,
Before we knew which trains we'd have to leave.

[Pre-Chorus]
The clock is ticking on the kitchen wall,
You answer before I even call.

[Chorus]
We built a summer out of paper planes,
And watched them soften in the autumn rain.
If every avenue must turn away,
I'd still walk back to hear what you would say.

[Verse 2]
The second floor is quiet after dark,
I found your compass resting by the park.
We swore we'd never turn into the crowd,
Who keep their whispers inside, but speak aloud.

[Bridge]
Maybe the distance isn't cruel or kind,
It's just the road the morning left behind.

[Final Chorus]
We built a summer out of paper planes,
And watched them soften in the autumn rain.
If every avenue must turn away,
I'd still walk back to hear what you would say.

[Outro]
Paper planes...
Softening in the rain.
"""
        report = evaluate_lyrics_quality(sample, language="en")
        self.assertEqual(report.language, "en")
        self.assertGreaterEqual(report.overall_score, 80)
        self.assertEqual(report.quality_status, "APPROVED_FOR_RELEASE")
    def test_08_verify_five_creative_scenarios(self):
        """Verifies that all 5 test scenario files pass the Lyrical Quality Gate."""
        scenarios = [
            ("test_a_english_romantic.txt", "en"),
            ("test_b_hindi_heartbreak.txt", "hi"),
            ("test_c_nostalgic_school.txt", "hi"),
            ("test_d_intimate_love.txt", "en"),
            ("test_e_non_romantic_identity.txt", "en"),
        ]
        scenarios_dir = os.path.join(PROJECT_ROOT, "tests", "scenarios")
        for filename, lang in scenarios:
            filepath = os.path.join(scenarios_dir, filename)
            self.assertTrue(os.path.exists(filepath), f"File {filename} should exist")
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            report = evaluate_lyrics_quality(content, language=lang)
            self.assertEqual(
                report.quality_status,
                "APPROVED_FOR_RELEASE",
                f"Scenario {filename} failed with score {report.overall_score}: {report.actionable_revisions}"
            )
            self.assertGreaterEqual(report.overall_score, 85)


if __name__ == "__main__":
    unittest.main()

