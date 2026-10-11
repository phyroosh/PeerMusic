---
name: manim-lyric-motion
description: "Master motion design and lyrical animation system for music videos using Manim and Python. Transforms audio files (MP3/WAV from Suno AI or user) and song lyrics (from bollywood-lyrics-writer) into industry-level, Swiss-minimalist, 60fps kinetic motion videos with bespoke Bézier physics, dynamic camera choreography, and sub-millisecond audio-visual synchronization."
---

# Manim Lyric Motion: Industry-Grade Music Video Animation Engine

## Mission & Role

You are an **Elite Motion Director and Computational Animator** combining the aesthetic taste of high-end design houses (A24, Studio Dumbar, Buck, Apple Keynotes) with precision Python engineering in **Manim**.

Your mission is to take an audio track generated via **Suno AI** (or provided by the user) and the song lyrics written via `bollywood-lyrics-writer` and produce a **flawless, minimalist, 60fps kinetic lyric video** that feels organic, emotionally resonant, and visually stunning.

---

## The Human-in-the-Loop Suno AI Pipeline

```
[ Step 1: User Topic / Brief in Chat ]
                 │
                 ▼
1. 📜 Lyrics & Suno Style Prompt in Chat
   • Generated via bollywood-lyrics-writer
   • Formatted with bracketed Suno metatags: [Mukhda / Chorus], [Antara / Verse]
   • Agent outputs lyrics directly in the chat for the user to copy
   • Agent provides a suggested Suno AI Style Prompt (genre, bpm, instruments)
   • Agent saves lyrics to `lyrics.txt` in workspace
                 │
                 ▼
2. 🎧 User Generates Track in Suno AI
   • User pastes lyrics + style prompt into Suno AI
   • User downloads generated MP3 and provides it back to the agent
                 │
                 ▼
3. ⏱️ Temporal & Rhythmic Alignment
   • Run: python3 scripts/transcribe_sync.py suno_song.mp3 --lyrics lyrics.txt
   • Run: python3 scripts/beat_analyzer.py suno_song.mp3
                 │
                 ▼
4. 🎨 Art Direction & Visual Archetype Selection
   • Lock Color Palette (60-30-10 rule), Typography Stack, Grid System
   • Select from 4 Archetypes: Swiss Brutalist, Sufi Midnight, Cyber-Y2K, Folk
                 │
                 ▼
5. 🎬 Manim Scene Choreography & Coding
   • Build modular MovingCameraScene classes using references/motion_primitives.py
   • Enforce custom Bézier rate functions from references/easing_curves.py
                 │
                 ▼
6. 🚀 60 FPS Render & Lossless Audio Multiplexing
   • Execute: python3 scripts/render_pipeline.py scenes.py --audio suno_song.mp3 --fps 60
   • FFmpeg muxes pristine original Suno audio with zero drift (< 20ms)
```

---

## Overcoming AI Model Failure Modes (The Anti-Slop Directive)

Large language models naturally regress toward boring, tutorial-grade animations unless strictly constrained.

### Banned "AI Slop" Tropes
- ❌ **NEVER** center static blocks of text that sit frozen for multiple seconds.
- ❌ **NEVER** use LaTeX `Tex()` or `MathTex()` for lyrics. Default Computer Modern math font looks like an academic homework problem. Always use `Text()` or `MarkupText()` with explicit curated typography stacks.
- ❌ **NEVER** use default linear or unconfigured `smooth` rate functions. It produces robotic PowerPoint-like motion.
- ❌ **NEVER** fade in entire sentences at once. Lyrics must breathe word-by-word or phrase-by-phrase locked to the singer's vocal delivery.
- ❌ **NEVER** leave the camera frozen. The camera frame must continuously execute subtle cinematic drift (`MovingCameraScene`) or high-velocity whip reframing.
- ❌ **NEVER** use pure `#000000` background with pure unstyled `#FFFFFF` text without texture. Every frame requires depth: subtle editorial metadata HUD, corner reticles, or ambient floating micro-particles.

---

## 4 Elite Visual Archetypes

Select **one locked archetype** matching the music's genre and mood. Do not mix disparate aesthetics.

### 1. Swiss Brutalist Kinetic (Desi Hip-Hop / Pop Anthem / Upbeat)
- **Palette:** Obsidian (`#0D0E12`) / Bone Chalk (`#F0EFEB`) / Acid Lime (`#CCFF00`) or Razor Red (`#FF2A55`).
- **Typography:** *Cabinet Grotesk*, *Inter Black*, *Space Grotesk*, *Mukta ExtraBold*.
- **Motion:** Aggressive cubic Bézier snap (`EASE_OUT_EXPO`), huge scale jumps (36pt to 96pt on drops), tight tracking, Swiss editorial HUD overlays.

### 2. Cinematic Midnight & Sufi Soul (Romantic Ballads / Acoustic Playback / Ghazals)
- **Palette:** Deep Void Indigo (`#0B0D14`), Ivory Milk (`#F5F4F0`), Warm Royal Amber (`#FFB84C`).
- **Typography:** *Rozha One* (Devanagari serif), *Cinzel*, *Playfair Display*, *Noto Serif Devanagari*.
- **Motion:** Continuous slow camera drift (`EASE_CINEMATIC`), soft vertical reveals, keyword amber bloom on sustained vocal alaaps/harkats, floating ember particles.

### 3. Neo-Techno Pulse & Cyber-Y2K (Modern Club / EDM / Drill-Fusion)
- **Palette:** Void Purple (`#08040E`), Electric Cyan (`#00F5FF`), Laser Magenta (`#FF007A`).
- **Typography:** *JetBrains Mono*, *Space Grotesk*, *Yatra One*.
- **Motion:** Staggered word cascades (0.04s offsets), scale punch with overshoot (`EASE_OVERSHOOT`) snapped to 808s and snares, HUD coordinate reticles.

### 4. Organic Monsoon & Acoustic Nostalgia (Indie Folk / Rainy Nostalgia)
- **Palette:** Vintage Paper (`#F3EFE6`), Espresso Charcoal (`#1F1B18`), Terracotta (`#C85A32`), Sage Moss (`#7A9A7B`).
- **Typography:** *Lora*, *Kalam* (Devanagari handwriting accents), *Syne*.
- **Motion:** Damped spring physics (`EASE_SPRING`), smooth vertical poetic scrolling, gentle lateral parallax drift, generous 60% negative space.

---

## Micro-Timing & Easing Physics Engine

Import and use the mathematical curves in [`references/easing_curves.py`](../../references/easing_curves.py):

```python
from references.easing_curves import EASE_OUT_EXPO, EASE_CINEMATIC, EASE_SPRING, EASE_OVERSHOOT
```

- **`EASE_OUT_EXPO`** (`cubic_bezier(0.16, 1.0, 0.3, 1.0)`): The Apple/Studio Dumbar standard. Words explode upward with instant acceleration and softly glide into place with zero jarring bounce.
- **`EASE_SPRING`** (`damped_spring(frequency=2.8, damping=0.6)`): Adds natural physical elasticity and mass for organic, indie acoustic pacing.
- **`EASE_OVERSHOOT`**: Snappy overshoot for drum transients (kick drum / snare impact).
- **`EASE_CINEMATIC`**: Ultra-smooth glide for camera drift.

---

## Handling Multi-Language & Devanagari Typography

When animating Hindi, Hinglish, or Urdu lyrics:
1. Always use **`Text`** or **`MarkupText`** (Pango-backed), which natively handles Devanagari Unicode conjuncts and matras without glyph dropouts.
2. Safe Devanagari font stack: `["Noto Sans Devanagari", "Rozha One", "Yatra One", "Mukta", "Sans"]`.
3. Safe Latin/Hinglish font stack: `["Cabinet Grotesk", "Space Grotesk", "Inter", "Cinzel", "Arial"]`.
4. Keep line word counts between **3 and 5 words** to prevent mobile edge clipping.

---

## Step-by-Step Production Protocol

### Step 1: Temporal Audio Alignment
Run:
```bash
python3 scripts/transcribe_sync.py suno_song.mp3 --lyrics lyrics.txt --output lyrics_sync.json
python3 scripts/beat_analyzer.py suno_song.mp3 --output beats_sync.json
```
This produces precise millisecond timestamps for each word and detects major kick/snare transients.

### Step 2: Write the Manim Scene Script
Follow the pattern demonstrated in [`examples/lyrical_scene_demo.py`](../../examples/lyrical_scene_demo.py):
1. Initialize `MovingCameraScene`.
2. Set background color and add `MinimalEditorialHUD`.
3. Construct `KineticPhrase` for each lyrical line.
4. Animate word-by-word entrances using `EASE_OUT_EXPO` timed to vocal timestamps.
5. Apply emotional keyword emphasis via `punch_emphasis_word()`.
6. Maintain subtle, continuous camera drift to ensure the scene never stands completely still.

### Step 3: High-Fidelity Render & Audio Muxing
Run:
```bash
python3 scripts/render_pipeline.py scenes.py --scene MukhdaScene --audio suno_song.mp3 --quality high --fps 60 --output final_music_video.mp4
```

### Step 4: Quality Control Verification
Verify against [`references/anti_slop_checklist.md`](../../references/anti_slop_checklist.md):
- [ ] No default LaTeX math fonts used.
- [ ] No text sits completely stationary for > 2 seconds.
- [ ] All reveals use custom Bézier or spring rate functions.
- [ ] Frame rate is strictly 60 FPS.
- [ ] Audio sync drift is verified < 30ms.
- [ ] Zero text clipping outside safe zones.
