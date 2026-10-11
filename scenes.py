"""
PeerMusic: Cinematic Lyrical Motion Video
=========================================
Song: Kacchi Neendein, Pakke Khwaab (Student Life Anthem)
Archetype: Cinematic Midnight & Sufi Soul (Student Nostalgia)
Master 60 FPS Kinetic Typography Scene
"""

import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from manim import *
import numpy as np

from references.easing_curves import (
    EASE_OUT_EXPO,
    EASE_CINEMATIC,
    EASE_WHIP,
    EASE_OVERSHOOT,
    EASE_SPRING,
)
from references.motion_primitives import (
    KineticPhrase,
    MinimalEditorialHUD,
    AmbientFloatingDust,
    punch_emphasis_word,
)


class MukhdaScene(MovingCameraScene):
    """
    Flagship 60 FPS Kinetic Lyrical Video for 'Kacchi Neendein, Pakke Khwaab'.
    Millisecond-synchronized to Suno Master Audio.
    """
    def construct(self):
        # ---------------------------------------------------------------------
        # 1. COLOR SYSTEM & PALETTE (Cinematic Midnight & Warm Amber)
        # ---------------------------------------------------------------------
        BG_COLOR = "#0B0D14"          # Deep Void Indigo
        TEXT_PRIMARY = "#F5F4F0"      # Ivory Milk
        ACCENT_AMBER = "#FFB84C"      # Warm Royal Amber (2 AM Chai Glow)
        MUTED_SLATE = "#5A5D6E"       # Editorial Sub-elements
        WARM_CREAM = "#EBE6DF"

        self.camera.background_color = BG_COLOR

        # ---------------------------------------------------------------------
        # 2. ATMOSPHERE & EDITORIAL HUD (Non-intrusive polish layer)
        # ---------------------------------------------------------------------
        hud = MinimalEditorialHUD(
            section_label="01 // MUKHDA  •  STUDENT LIFE",
            bpm=86,
            color=TEXT_PRIMARY,
            opacity=0.22,
        )
        self.add(hud)

        dust = AmbientFloatingDust(num_particles=45, color=ACCENT_AMBER, opacity=0.18)
        self.add(dust)

        # ---------------------------------------------------------------------
        # 3. PROLOGUE / TITLE CARD (0.0s -> 14.5s)
        #    Acoustic Guitar Fingerpicking Intro
        # ---------------------------------------------------------------------
        title_group = VGroup()

        meta_top = Text(
            "ROOM 204  //  02:00 AM  //  ACOUSTIC TAPE",
            font="Inter",
            font_size=15,
            color=MUTED_SLATE,
            weight=BOLD,
        ).set_opacity(0.8)

        title_line1 = Text(
            "KACCHI NEENDEIN",
            font="Inter",
            font_size=56,
            color=TEXT_PRIMARY,
            weight=BOLD,
        )

        title_line2 = Text(
            "PAKKE KHWAAB",
            font="Inter",
            font_size=68,
            color=ACCENT_AMBER,
            weight=BOLD,
        )

        title_sub = Text(
            "A S T U D E N T   L I F E   A N T H E M",
            font="Inter",
            font_size=16,
            color=WARM_CREAM,
        ).set_opacity(0.7)

        title_group = VGroup(meta_top, title_line1, title_line2, title_sub)
        title_group.arrange(DOWN, buff=0.35).move_to(ORIGIN)

        # Soft initial reveal of Title Card
        self.play(
            FadeIn(title_group, rate_func=EASE_CINEMATIC, shift=UP * 0.3),
            run_time=3.5,
        )

        # Camera pushes gently into Title while acoustic guitar arpeggios play
        self.play(
            self.camera.frame.animate(rate_func=linear)
            .scale(0.94)
            .shift(DOWN * 0.15),
            run_time=7.5,
        )

        # Title dissolves cleanly to open stage for vocal entrance at 15.38s
        self.play(
            FadeOut(title_group, rate_func=EASE_OUT_EXPO, shift=UP * 0.4),
            self.camera.frame.animate(rate_func=EASE_CINEMATIC).scale(1.06).move_to(ORIGIN),
            run_time=3.8,
        )

        # Small micro-pause leading into first vocal onset (15.38s)
        self.wait(0.58)

        # ---------------------------------------------------------------------
        # 4. LYRIC LINE 1 (15.38s -> 20.80s)
        #    "Raat ke do baje ki thandi si chai,"
        # ---------------------------------------------------------------------
        line1_phrase = KineticPhrase(
            words=["Raat", "ke", "do", "baje", "ki", "thandi", "si", "chai,"],
            font_size=46,
            font="Inter",
            color=TEXT_PRIMARY,
            weight=BOLD,
            word_spacing=0.28,
            max_words_per_line=8,
        ).move_to(LEFT * 0.5 + UP * 0.8)

        # Initially invisible & offset
        for w in line1_phrase.word_mobjects:
            w.set_opacity(0).shift(DOWN * 0.35)
        self.add(line1_phrase)

        # Sync reveals:
        # "Raat" (15.38s)
        self.play(
            line1_phrase.get_word(0).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            run_time=0.9,
        )
        # "ke"
        self.play(
            line1_phrase.get_word(1).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            run_time=0.35,
        )
        # "do baje"
        self.play(
            line1_phrase.get_word(2).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line1_phrase.get_word(3).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            run_time=0.75,
        )
        # "ki thandi si"
        self.play(
            line1_phrase.get_word(4).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line1_phrase.get_word(5).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line1_phrase.get_word(6).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            run_time=1.0,
        )
        # "chai," (Emotional Accent -> Amber Glow Pulse)
        self.play(
            line1_phrase.get_word(7).animate(rate_func=EASE_OUT_EXPO)
            .shift(UP * 0.35).set_opacity(1.0).set_color(ACCENT_AMBER),
            run_time=0.65,
        )
        punch_emphasis_word(self, line1_phrase.get_word(7), scale_factor=1.14, glow_color=ACCENT_AMBER, run_time=0.45)

        # Micro-drift while guitar holds
        self.play(
            self.camera.frame.animate(rate_func=linear).shift(RIGHT * 0.4 + DOWN * 0.1),
            run_time=0.95,
        )

        # ---------------------------------------------------------------------
        # 5. LYRIC LINE 2 (21.24s -> 25.30s)
        #    "Chaar doston ki be-wajah si ladaai."
        # ---------------------------------------------------------------------
        line2_phrase = KineticPhrase(
            words=["Chaar", "doston", "ki", "be-wajah", "si", "ladaai."],
            font_size=46,
            font="Inter",
            color=TEXT_PRIMARY,
            weight=BOLD,
            word_spacing=0.28,
            max_words_per_line=6,
        ).next_to(line1_phrase, DOWN, buff=0.7, aligned_edge=LEFT)

        for w in line2_phrase.word_mobjects:
            w.set_opacity(0).shift(DOWN * 0.35)
        self.add(line2_phrase)

        # "Chaar doston ki"
        self.play(
            line2_phrase.get_word(0).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0).set_color(ACCENT_AMBER),
            line2_phrase.get_word(1).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line2_phrase.get_word(2).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            run_time=1.4,
        )
        # "be-wajah si"
        self.play(
            line2_phrase.get_word(3).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line2_phrase.get_word(4).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            run_time=1.1,
        )
        # "ladaai."
        self.play(
            line2_phrase.get_word(5).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0).set_color(ACCENT_AMBER),
            run_time=0.85,
        )
        punch_emphasis_word(self, line2_phrase.get_word(5), scale_factor=1.12, glow_color=ACCENT_AMBER, run_time=0.45)

        # Transition wipe: Lines 1 & 2 glide away gracefully
        self.play(
            FadeOut(line1_phrase, shift=LEFT * 0.6, rate_func=EASE_OUT_EXPO),
            FadeOut(line2_phrase, shift=LEFT * 0.6, rate_func=EASE_OUT_EXPO),
            self.camera.frame.animate(rate_func=EASE_CINEMATIC).move_to(ORIGIN).scale(0.97),
            run_time=0.8,
        )

        # ---------------------------------------------------------------------
        # 6. LYRIC LINE 3 (25.30s -> 31.00s)
        #    "Deewaron pe chipke umeedon ke panne,"
        # ---------------------------------------------------------------------
        line3_phrase = KineticPhrase(
            words=["Deewaron", "pe", "chipke", "umeedon", "ke", "panne,"],
            font_size=48,
            font="Inter",
            color=TEXT_PRIMARY,
            weight=BOLD,
            word_spacing=0.3,
            max_words_per_line=6,
        ).move_to(LEFT * 0.3 + UP * 0.7)

        for w in line3_phrase.word_mobjects:
            w.set_opacity(0).shift(DOWN * 0.35)
        self.add(line3_phrase)

        # "Deewaron pe chipke"
        self.play(
            line3_phrase.get_word(0).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line3_phrase.get_word(1).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line3_phrase.get_word(2).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            run_time=2.3,
        )
        # "umeedon ke panne,"
        self.play(
            line3_phrase.get_word(3).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0).set_color(ACCENT_AMBER),
            line3_phrase.get_word(4).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line3_phrase.get_word(5).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0).set_color(ACCENT_AMBER),
            run_time=2.6,
        )
        punch_emphasis_word(self, line3_phrase.get_word(3), scale_factor=1.1, glow_color=ACCENT_AMBER, run_time=0.4)

        # ---------------------------------------------------------------------
        # 7. LYRIC LINE 4 (31.40s -> 36.00s)
        #    "Ghar se bahut door sapne sajaaye."
        # ---------------------------------------------------------------------
        line4_phrase = KineticPhrase(
            words=["Ghar", "se", "bahut", "door", "sapne", "sajaaye."],
            font_size=48,
            font="Inter",
            color=TEXT_PRIMARY,
            weight=BOLD,
            word_spacing=0.3,
            max_words_per_line=6,
        ).next_to(line3_phrase, DOWN, buff=0.7, aligned_edge=LEFT)

        for w in line4_phrase.word_mobjects:
            w.set_opacity(0).shift(DOWN * 0.35)
        self.add(line4_phrase)

        # "Ghar se bahut door"
        self.play(
            line4_phrase.get_word(0).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0).set_color(ACCENT_AMBER),
            line4_phrase.get_word(1).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line4_phrase.get_word(2).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line4_phrase.get_word(3).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0).set_color(ACCENT_AMBER),
            run_time=2.4,
        )
        # "sapne sajaaye."
        self.play(
            line4_phrase.get_word(4).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0),
            line4_phrase.get_word(5).animate(rate_func=EASE_OUT_EXPO).shift(UP * 0.35).set_opacity(1.0).set_color(ACCENT_AMBER),
            run_time=2.0,
        )

        # Dynamic whip transition into the Main Hook Drop
        self.play(
            FadeOut(line3_phrase, shift=DOWN * 0.5, rate_func=EASE_WHIP),
            FadeOut(line4_phrase, shift=DOWN * 0.5, rate_func=EASE_WHIP),
            self.camera.frame.animate(rate_func=EASE_WHIP).move_to(ORIGIN).scale(1.08),
            run_time=0.65,
        )

        # ---------------------------------------------------------------------
        # 8. THE HOOK DROP (36.00s -> 41.50s)
        #    "Yeh kacchi si neendein, yeh pakke se khwaab,"
        # ---------------------------------------------------------------------
        hook_part1 = Text(
            "YEH KACCHI SI NEENDEIN",
            font="Inter",
            font_size=52,
            color=TEXT_PRIMARY,
            weight=BOLD,
        ).move_to(UP * 0.75)

        hook_part2 = Text(
            "YEH PAKKE SE KHWAAB",
            font="Inter",
            font_size=60,
            color=ACCENT_AMBER,
            weight=BOLD,
        ).next_to(hook_part1, DOWN, buff=0.45)

        hook_group = VGroup(hook_part1, hook_part2)

        # Dramatic scale snap onto beat drop
        self.play(
            FadeIn(hook_part1, scale=0.88, rate_func=EASE_OUT_EXPO),
            self.camera.frame.animate(rate_func=EASE_OUT_EXPO).scale(0.92),
            run_time=2.2,
        )
        self.play(
            FadeIn(hook_part2, scale=1.12, rate_func=EASE_OVERSHOOT),
            self.camera.frame.animate(rate_func=EASE_OVERSHOOT).scale(0.95),
            run_time=2.4,
        )
        punch_emphasis_word(self, hook_part2, scale_factor=1.1, glow_color=ACCENT_AMBER, run_time=0.55)

        self.play(
            FadeOut(hook_group, shift=UP * 0.5, rate_func=EASE_OUT_EXPO),
            self.camera.frame.animate(rate_func=EASE_CINEMATIC).scale(1.08).move_to(ORIGIN),
            run_time=0.75,
        )

        # ---------------------------------------------------------------------
        # 9. LINE 6 (41.60s -> 47.80s)
        #    "Chhoti si jeb mein bada sa hisaab."
        # ---------------------------------------------------------------------
        line6_a = Text(
            "CHHOTI SI JEB MEIN",
            font="Inter",
            font_size=42,
            color=TEXT_PRIMARY,
            weight=BOLD,
        ).move_to(UP * 0.6)

        line6_b = Text(
            "BADA SA HISAAB.",
            font="Inter",
            font_size=58,
            color=ACCENT_AMBER,
            weight=BOLD,
        ).next_to(line6_a, DOWN, buff=0.4)

        line6_group = VGroup(line6_a, line6_b)

        self.play(
            FadeIn(line6_a, rate_func=EASE_OUT_EXPO, shift=RIGHT * 0.4),
            run_time=2.6,
        )
        self.play(
            FadeIn(line6_b, rate_func=EASE_OUT_EXPO, shift=RIGHT * 0.4),
            run_time=2.8,
        )
        punch_emphasis_word(self, line6_b, scale_factor=1.08, glow_color=ACCENT_AMBER, run_time=0.5)

        self.play(
            FadeOut(line6_group, shift=LEFT * 0.4, rate_func=EASE_OUT_EXPO),
            run_time=0.7,
        )

        # ---------------------------------------------------------------------
        # 10. LINES 7 & 8 (47.90s -> 59.00s)
        #     "Haan thoda sa darr hai, haan thodi thakan hai,"
        #     "Magar hauslon ka naya aasmaan hai..."
        # ---------------------------------------------------------------------
        line7_phrase = Text(
            "Haan thoda sa darr hai, haan thodi thakan hai,",
            font="Inter",
            font_size=38,
            color=WARM_CREAM,
            weight=MEDIUM,
        ).move_to(UP * 0.7)

        line8_a = Text(
            "Magar hauslon ka",
            font="Inter",
            font_size=44,
            color=TEXT_PRIMARY,
            weight=BOLD,
        ).next_to(line7_phrase, DOWN, buff=0.45)

        line8_b = Text(
            "NAYA AASMAAN HAI.",
            font="Inter",
            font_size=62,
            color=ACCENT_AMBER,
            weight=BOLD,
        ).next_to(line8_a, DOWN, buff=0.35)

        climax_group = VGroup(line7_phrase, line8_a, line8_b)

        self.play(
            FadeIn(line7_phrase, rate_func=EASE_CINEMATIC, shift=UP * 0.2),
            run_time=4.2,
        )
        self.play(
            FadeIn(line8_a, rate_func=EASE_OUT_EXPO, shift=UP * 0.3),
            run_time=2.8,
        )
        self.play(
            FadeIn(line8_b, rate_func=EASE_OVERSHOOT, scale=1.15),
            self.camera.frame.animate(rate_func=EASE_OVERSHOOT).scale(0.92),
            run_time=3.5,
        )
        punch_emphasis_word(self, line8_b, scale_factor=1.12, glow_color=ACCENT_AMBER, run_time=0.6)

        # ---------------------------------------------------------------------
        # 11. GRAND FINALE OUTRO OF MUKHDA (59.0s -> 65.0s)
        #     Camera glides slowly into the amber negative space
        # ---------------------------------------------------------------------
        self.play(
            FadeOut(climax_group, rate_func=EASE_CINEMATIC, shift=UP * 0.3),
            self.camera.frame.animate(rate_func=EASE_CINEMATIC).scale(1.15).move_to(ORIGIN),
            run_time=4.5,
        )
        self.wait(1.5)
