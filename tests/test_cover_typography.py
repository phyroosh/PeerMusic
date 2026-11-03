#!/usr/bin/env python3
"""
Unit tests for PeerMusic Cover Typography Engine (Stage B Renderer)
"""

import os
import unittest
from PIL import Image

from scripts.cover_typography import (
    has_devanagari,
    resolve_fonts,
    detect_negative_space,
    wrap_title_intelligently,
    render_cover_typography,
)


class TestCoverTypography(unittest.TestCase):

    def test_devanagari_detection(self):
        self.assertTrue(has_devanagari("पानी पीने का बहाना"))
        self.assertTrue(has_devanagari("कच्ची नींदें"))
        self.assertFalse(has_devanagari("PAANI PEENE KA BAHAANA"))
        self.assertFalse(has_devanagari("TRYING TO FIT IN"))

    def test_font_resolution(self):
        latin_fonts = resolve_fonts(is_devanagari=False)
        self.assertIsNotNone(latin_fonts["title"])
        self.assertTrue(os.path.exists(latin_fonts["title"]))

        deva_fonts = resolve_fonts(is_devanagari=True)
        self.assertIsNotNone(deva_fonts["title"])
        self.assertTrue(os.path.exists(deva_fonts["title"]))

    def test_intelligent_wrapping(self):
        from PIL import ImageFont
        fonts = resolve_fonts()
        font = ImageFont.truetype(fonts["title"], 100)

        # 4-word title -> 2 lines
        lines_4 = wrap_title_intelligently("PAANI PEENE KA BAHAANA", font, max_width=900)
        self.assertEqual(len(lines_4), 2)
        self.assertEqual(lines_4, ["PAANI PEENE", "KA BAHAANA"])

        # 2-word title with small max_width -> 2 lines
        lines_2 = wrap_title_intelligently("ROUGH COPY", font, max_width=400)
        self.assertEqual(len(lines_2), 2)
        self.assertEqual(lines_2, ["ROUGH", "COPY"])

        # 2-word title with large max_width -> 1 line
        lines_2_wide = wrap_title_intelligently("ROUGH COPY", font, max_width=1200)
        self.assertEqual(len(lines_2_wide), 1)

        # 1-word title -> 1 line
        lines_1 = wrap_title_intelligently("KHUMAAR", font, max_width=900)
        self.assertEqual(len(lines_1), 1)

    def test_negative_space_detection(self):
        # Create an image where left half has noise/edges and right half is smooth gradient
        img = Image.new("RGB", (1920, 1080), (100, 100, 100))
        # Draw high contrast lines on left half
        from PIL import ImageDraw
        d = ImageDraw.Draw(img)
        for i in range(0, 960, 20):
            d.line([(i, 0), (i, 1080)], fill=(255, 255, 255), width=5)
        # Right half is clean
        best = detect_negative_space(img)
        self.assertIn("RIGHT", best)

    def test_render_cover_typography_english_16x9(self):
        img = Image.new("RGB", (1920, 1080), (60, 50, 40))
        out = render_cover_typography(
            base_image=img,
            title="TRYING TO FIT IN",
            subtitle="Rehearsals in the Mirror",
            negative_space="UPPER-RIGHT",
            aspect_ratio="16x9",
            include_badge=True,
        )
        self.assertEqual(out.size, (1920, 1080))
        # Output should not be identical to input
        import numpy as np
        diff = np.mean(np.abs(np.array(img, dtype=float) - np.array(out, dtype=float)))
        self.assertGreater(diff, 1.0)

    def test_render_cover_typography_devanagari_1x1(self):
        img = Image.new("RGB", (1500, 1500), (45, 40, 35))
        out = render_cover_typography(
            base_image=img,
            title="दिल रह गया",
            subtitle="क्लासरूम में",
            negative_space="UPPER-RIGHT",
            aspect_ratio="1x1",
            include_badge=True,
        )
        self.assertEqual(out.size, (1500, 1500))

    def test_render_cover_typography_without_subtitle(self):
        img = Image.new("RGB", (1920, 1080), (50, 50, 50))
        out = render_cover_typography(
            base_image=img,
            title="GOLDEN HOUR LETTERS",
            subtitle=None,
            negative_space="UPPER-RIGHT",
            aspect_ratio="16x9",
            include_badge=True,
        )
        self.assertEqual(out.size, (1920, 1080))


if __name__ == "__main__":
    unittest.main()
