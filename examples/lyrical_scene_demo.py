"""
Reference Implementation: Industry-Grade Bollywood Lyrical Motion Scene
========================================================================
Demonstrates elite kinetic typography, camera drift, bespoke Bézier easing,
and Swiss editorial polish for a Bollywood Mukhda phrase.
Run with:
  manim -qh --fps 60 examples/lyrical_scene_demo.py MukhdaDemoScene -p
"""

from manim import *
import numpy as np

# In production, import directly from references package:
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from references.easing_curves import EASE_OUT_EXPO, EASE_CINEMATIC, EASE_OVERSHOOT
from references.motion_primitives import (
    KineticPhrase,
    MinimalEditorialHUD,
    punch_emphasis_word,
)


class MukhdaDemoScene(MovingCameraScene):
    def construct(self):
        # ---------------------------------------------------------------------
        # 1. PALETTE & ART DIRECTION (Archetype: Cinematic Midnight & Sufi Soul)
        # ---------------------------------------------------------------------
        BG_COLOR = "#0B0D14"          # Deep Void Indigo
        TEXT_PRIMARY = "#F5F4F0"      # Ivory Milk
        ACCENT_AMBER = "#FFB84C"      # Warm Royal Amber (Emotional Accent)
        MUTED_GRAY = "#5A5D6E"        # Low-opacity metadata

        # Background Canvas
        self.camera.background_color = BG_COLOR

        # ---------------------------------------------------------------------
        # 2. POLISH LAYER: EDITORIAL HUD & AMBIENCE
        # ---------------------------------------------------------------------
        hud = MinimalEditorialHUD(
            section_label="01 // MUKHDA",
            bpm=96,
            color=TEXT_PRIMARY,
            opacity=0.22
        )
        self.add(hud)

        # ---------------------------------------------------------------------
        # 3. TYPOGRAPHY: LINE 1 ("Tu Hai Kahaan")
        # ---------------------------------------------------------------------
        # Words split for independent temporal control
        line1_words = ["Tu", "Hai", "Kahaan"]
        phrase_1 = KineticPhrase(
            words=line1_words,
            font_size=64,
            font="Space Grotesk",
            color=TEXT_PRIMARY,
            weight=BOLD,
            word_spacing=0.45
        ).move_to(LEFT * 1.5 + UP * 0.5)

        # Initially invisible & offset downwards for upward whip reveal
        for word in phrase_1.word_mobjects:
            word.set_opacity(0)
            word.shift(DOWN * 0.4)

        self.add(phrase_1)

        # ---------------------------------------------------------------------
        # 4. CHOREOGRAPHY: LINE 1 REVEAL (Synchronized to vocal onset)
        # ---------------------------------------------------------------------
        # Simulating audio cues:
        # 0.0s -> 0.4s: "Tu"
        # 0.4s -> 0.8s: "Hai"
        # 0.8s -> 1.6s: "Kahaan" (sustained vocal crest)
        
        # Word 1: "Tu"
        self.play(
            phrase_1.get_word(0).animate(rate_func=EASE_OUT_EXPO)
            .shift(UP * 0.4).set_opacity(1.0),
            run_time=0.38
        )
        
        # Word 2: "Hai"
        self.play(
            phrase_1.get_word(1).animate(rate_func=EASE_OUT_EXPO)
            .shift(UP * 0.4).set_opacity(1.0),
            run_time=0.36
        )

        # Word 3: "Kahaan" (Emotional Climax -> Amber Glow & Snap)
        self.play(
            phrase_1.get_word(2).animate(rate_func=EASE_OUT_EXPO)
            .shift(UP * 0.4).set_opacity(1.0).set_color(ACCENT_AMBER),
            run_time=0.55
        )

        # Subtle emphasis pulse on sustained vocal vibration
        punch_emphasis_word(
            scene=self,
            word_mobject=phrase_1.get_word(2),
            scale_factor=1.12,
            glow_color=ACCENT_AMBER,
            run_time=0.32
        )

        # ---------------------------------------------------------------------
        # 5. CAMERA CHOREOGRAPHY & RE-FRAMING (Subtle Drift)
        # ---------------------------------------------------------------------
        # While Line 1 lingers, camera pushes in gently
        self.play(
            self.camera.frame.animate(rate_func=EASE_CINEMATIC)
            .scale(0.92)
            .shift(RIGHT * 0.5 + UP * 0.2),
            run_time=1.2
        )

        # ---------------------------------------------------------------------
        # 6. TYPOGRAPHY: LINE 2 ("Raahein Yeh Sab Veeran")
        # ---------------------------------------------------------------------
        line2_words = ["Raahein", "Yeh", "Sab", "Veeran"]
        phrase_2 = KineticPhrase(
            words=line2_words,
            font_size=52,
            font="Space Grotesk",
            color=TEXT_PRIMARY,
            weight=BOLD,
            word_spacing=0.38
        ).next_to(phrase_1, DOWN, buff=0.85, aligned_edge=LEFT)

        for word in phrase_2.word_mobjects:
            word.set_opacity(0)
            word.shift(DOWN * 0.35)

        self.add(phrase_2)

        # Staggered cascade for line 2
        for i, word in enumerate(phrase_2.word_mobjects):
            target_color = ACCENT_AMBER if word.text == "Veeran" else TEXT_PRIMARY
            self.play(
                word.animate(rate_func=EASE_OUT_EXPO)
                .shift(UP * 0.35).set_opacity(0.95).set_color(target_color),
                run_time=0.32
            )

        # Final contemplative hold with slow camera breathing
        self.play(
            self.camera.frame.animate(rate_func=linear)
            .shift(UP * 0.15)
            .scale(0.98),
            run_time=1.5
        )
