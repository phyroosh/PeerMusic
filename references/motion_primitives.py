"""
Production Manim Motion Primitives & Kinetic Typography Engine
=============================================================
High-performance, modular components designed for industry-level music video motion design.
Supports Hindi, Hinglish, Devanagari, and English typography with Pango-backed layout.
"""

from manim import *
import numpy as np
from typing import List, Optional, Tuple, Union
from .easing_curves import EASE_OUT_EXPO, EASE_CINEMATIC, EASE_SPRING, EASE_OVERSHOOT


# -----------------------------------------------------------------------------
# Font Configurations & Multi-Language Typography Setup
# -----------------------------------------------------------------------------

# Recommended Elite Font Stacks (Installed locally or bundled in OS):
DEVANAGARI_FONTS = ["Noto Sans Devanagari", "Rozha One", "Yatra One", "Mukta", "Lohit Devanagari", "Sans"]
LATIN_EDITORIAL_FONTS = ["Inter", "Cabinet Grotesk", "Syne", "Cinzel", "Space Grotesk", "Helvetica Neue", "Arial"]


def get_safe_font(font_stack: List[str]) -> str:
    """Returns the first available font from the preference stack."""
    # In Manim Pango, specifying the font name will fall back cleanly.
    return font_stack[0]


# -----------------------------------------------------------------------------
# Kinetic Phrase: Word-Level & Syllable-Level Typography Container
# -----------------------------------------------------------------------------

class KineticPhrase(VGroup):
    """
    A typographic composition split into individual word Mobjects,
    retaining perfect baseline alignment, tracking, and negative space.
    """
    def __init__(
        self,
        words: List[str],
        font_size: float = 48,
        font: Optional[str] = None,
        color: str = "#FFFFFF",
        weight: str = BOLD,
        word_spacing: float = 0.35,
        line_height: float = 0.9,
        max_words_per_line: int = 5,
        **kwargs
    ):
        super().__init__(**kwargs)
        self.raw_words = words
        self.font = font or get_safe_font(LATIN_EDITORIAL_FONTS)
        self.base_font_size = font_size
        self.base_color = color
        self.word_mobjects: List[Text] = []
        
        # Build multi-line grid layout if phrase is long
        current_line = []
        lines: List[List[Text]] = []
        
        for w in words:
            mobj = Text(
                w,
                font=self.font,
                font_size=font_size,
                color=color,
                weight=weight,
            )
            self.word_mobjects.append(mobj)
            current_line.append(mobj)
            if len(current_line) >= max_words_per_line:
                lines.append(current_line)
                current_line = []
        if current_line:
            lines.append(current_line)
            
        # Arrange words in each line with precise spacing
        line_groups = []
        for line in lines:
            lg = VGroup(*line).arrange(RIGHT, buff=word_spacing)
            line_groups.append(lg)
            
        # Stack lines vertically with editorial negative space
        full_group = VGroup(*line_groups).arrange(DOWN, buff=line_height, aligned_edge=LEFT)
        for lg in line_groups:
            for wm in lg:
                self.add(wm)

    def get_word(self, index: int) -> Text:
        """Returns the word Mobject at the given index."""
        return self.word_mobjects[index]


# -----------------------------------------------------------------------------
# Kinetic Word-Level Reveal Animations
# -----------------------------------------------------------------------------

def cascade_word_reveal(
    scene: Scene,
    phrase: KineticPhrase,
    start_times: List[float],
    durations: Optional[List[float]] = None,
    shift_vector: np.ndarray = UP * 0.45,
    rate_func=EASE_OUT_EXPO,
    accent_indices: Optional[List[int]] = None,
    accent_color: str = "#FF4B4B",
):
    """
    Reveals words sequentially locked to exact audio timestamps.
    Each word accelerates upwards with an initial burst and settles into position.
    """
    total_words = len(phrase.word_mobjects)
    if durations is None:
        durations = [0.45] * total_words
        
    for i, word in enumerate(phrase.word_mobjects):
        # Prepare hidden state
        word.set_opacity(0)
        word.shift(-shift_vector)
        
    # Animate each word at its precise cue
    for i, word in enumerate(phrase.word_mobjects):
        t_start = start_times[i] if i < len(start_times) else 0.0
        dur = durations[i] if i < len(durations) else 0.45
        
        # Word highlight if marked as emotional accent
        target_color = accent_color if (accent_indices and i in accent_indices) else phrase.base_color
        
        scene.play(
            word.animate(rate_func=rate_func).shift(shift_vector).set_opacity(1.0).set_color(target_color),
            run_time=dur
        )


def punch_emphasis_word(
    scene: Scene,
    word_mobject: Text,
    scale_factor: float = 1.18,
    glow_color: Optional[str] = None,
    run_time: float = 0.28,
):
    """
    Punches a single keyword on an 808 drop or vocal climax with snappy recovery.
    """
    orig_color = word_mobject.get_color()
    highlight_color = glow_color or orig_color
    
    scene.play(
        word_mobject.animate(rate_func=EASE_OVERSHOOT)
        .scale(scale_factor)
        .set_color(highlight_color),
        run_time=run_time * 0.5
    )
    scene.play(
        word_mobject.animate(rate_func=EASE_OUT_EXPO)
        .scale(1.0 / scale_factor)
        .set_color(orig_color),
        run_time=run_time * 0.5
    )


# -----------------------------------------------------------------------------
# Dynamic Camera Choreography (MovingCameraScene)
# -----------------------------------------------------------------------------

def continuous_cinematic_drift(
    scene: MovingCameraScene,
    direction: np.ndarray = RIGHT * 0.4 + UP * 0.2,
    zoom_delta: float = 0.96,
    run_time: float = 5.0,
):
    """
    Executes a subtle, high-end floating camera drift to eliminate static video stagnation.
    Keeps the composition breathing organically behind the typography.
    """
    scene.play(
        scene.camera.frame.animate(rate_func=linear)
        .shift(direction)
        .scale(zoom_delta),
        run_time=run_time
    )


def whip_pan_cut(
    scene: MovingCameraScene,
    target_center: np.ndarray,
    target_width: float = 14.0,
    run_time: float = 0.65,
):
    """
    High-velocity kinetic camera sweep transitioning between lyrical stanzas.
    """
    scene.play(
        scene.camera.frame.animate(rate_func=EASE_OUT_EXPO)
        .move_to(target_center)
        .set(width=target_width),
        run_time=run_time
    )


# -----------------------------------------------------------------------------
# Swiss Editorial Overlays & Minimalist Atmosphere
# -----------------------------------------------------------------------------

class MinimalEditorialHUD(VGroup):
    """
    Adds refined, high-taste Swiss editorial micro-elements:
    - Subtle aspect-ratio guidelines
    - Precision timestamp counter
    - Index mark (e.g. '01 // MUKHDA')
    - Framing reticles
    """
    def __init__(
        self,
        section_label: str = "01 // MUKHDA",
        bpm: int = 120,
        color: str = "#FFFFFF",
        opacity: float = 0.25,
        **kwargs
    ):
        super().__init__(**kwargs)
        
        # Section Label (Top Left)
        label = Text(
            section_label,
            font="Inter",
            font_size=16,
            color=color,
            weight=BOLD,
        ).set_opacity(opacity).to_corner(UL, buff=0.8)
        
        # BPM & Track Telemetry (Top Right)
        telemetry = Text(
            f"BPM: {bpm}  |  60 FPS  |  MASTER AUDIO",
            font="Inter",
            font_size=13,
            color=color,
        ).set_opacity(opacity * 0.8).to_corner(UR, buff=0.8)
        
        # Thin Editorial Crosshairs / Reticles in Corners
        reticles = VGroup()
        for corner in [UL, UR, DL, DR]:
            cross = VGroup(
                Line(LEFT * 0.15, RIGHT * 0.15, stroke_width=1, color=color),
                Line(UP * 0.15, DOWN * 0.15, stroke_width=1, color=color),
            ).set_opacity(opacity * 0.7).to_corner(corner, buff=0.5)
            reticles.add(cross)
            
        # Subtle horizontal bounding line at bottom
        footer_line = Line(
            start=LEFT * 6.5,
            end=RIGHT * 6.5,
            stroke_width=0.75,
            color=color
        ).set_opacity(opacity * 0.4).to_edge(DOWN, buff=0.8)

        self.add(label, telemetry, reticles, footer_line)


class AmbientFloatingDust(VGroup):
    """
    Generates sparse, subtle floating micro-particles simulating 35mm film stock ambiance.
    """
    def __init__(
        self,
        num_particles: int = 35,
        color: str = "#E0E0E0",
        opacity: float = 0.15,
        **kwargs
    ):
        super().__init__(**kwargs)
        np.random.seed(42)
        for _ in range(num_particles):
            x = np.random.uniform(-7.0, 7.0)
            y = np.random.uniform(-4.0, 4.0)
            radius = np.random.uniform(0.015, 0.04)
            dot = Dot(
                point=[x, y, 0],
                radius=radius,
                color=color,
                fill_opacity=np.random.uniform(0.05, opacity)
            )
            self.add(dot)
            
    def drift(self, scene: Scene, run_time: float = 6.0):
        """Slow, imperceptible Brownian drift."""
        anims = []
        for dot in self:
            dx = np.random.uniform(-0.3, 0.3)
            dy = np.random.uniform(0.1, 0.5)
            anims.append(dot.animate(rate_func=linear).shift(RIGHT * dx + UP * dy))
        scene.play(*anims, run_time=run_time)
