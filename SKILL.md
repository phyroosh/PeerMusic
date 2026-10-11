---
name: lyric-motion-design-master
description: "End-to-end music creation and motion design system. Connects Bollywood lyric writing (Topic -> Lyrics pasted in chat for Suno AI) with industry-grade Manim + Python kinetic typography (Suno MP3 -> 60fps Music Video) with Swiss minimalism, bespoke Bézier physics, and millisecond-accurate sync."
---

# PeerMusic: End-to-End Lyrical Motion Design System

Welcome to the **PeerMusic Motion Design Engine**. This repository is equipped with an integrated production pipeline specifically designed for human-in-the-loop AI music video creation:

```
[ Step 1: User provides Topic / Story / Mood in Chat ]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 1: LYRICS & SUNO AI PROMPT IN CHAT                   │
│  • Agent writes singable Bollywood/Hindustani lyrics        │
│  • Formatted with Suno-ready tags: [Mukhda], [Antara], etc. │
│  • Agent pastes copy-pasteable lyrics directly in CHAT      │
│  • Agent provides tailored Suno AI Style Prompt             │
│  • Agent saves lyrics to `lyrics.txt` in workspace          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
[ Step 2: User copies lyrics ──▶ Generates song in SUNO AI ──▶ Provides MP3 ]
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 2: MANIM KINETIC MOTION ENGINE (MP3 + LYRICS)        │
│  • Agent ingests the Suno MP3 audio file                    │
│  • Runs Whisper word-level alignment (transcribe_sync.py)   │
│  • Runs Librosa BPM & beat transient detector               │
│  • Selects locked Visual Archetype (Swiss / Sufi / Cyber)   │
│  • Authors modular MovingCameraScene classes in Manim       │
│  • Renders at 60 FPS and losslessly muxes original Suno MP3 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
[ Step 3: Industry-Level 60 FPS Lyrical Music Video Delivered ]
```

---

## The Conversational Protocol for AI Agents

When interacting with the user, agents MUST follow this exact 2-step conversational flow:

### Phase 1: Topic to Lyrics & Suno Prompt
1. **Analyze the brief** (topic, emotion, language, mood).
2. **Write the lyrics** using `.agents/skills/bollywood-lyrics-writer/SKILL.md`.
3. **Format with Suno AI Metatags**:
   - `[Mukhda / Chorus]`
   - `[Antara 1 / Verse 1]`
   - `[Mukhda Reprise / Chorus]`
   - `[Antara 2 / Verse 2]`
   - `[Bridge]`
   - `[Outro]`
4. **Paste directly in chat**:
   - Output the lyrics in a clean markdown code block so the user can copy with one click.
   - Also save a copy to `lyrics.txt` in the workspace.
   - Provide a **Recommended Suno AI Style Prompt** (e.g. `Bollywood acoustic ballad, soulful male vocals, emotive acoustic guitar, soft strings, 85 bpm, intimate`).
5. **Prompt the user**:
   > *"Copy the lyrics above, paste them into Suno AI using the suggested style prompt, generate your song, and provide the MP3 audio file back here so we can animate the music video!"*

---

### Phase 2: Suno MP3 to 60 FPS Motion Video
When the user provides the Suno MP3 audio file:
1. **Save / locate the audio file** (e.g. `suno_song.mp3`).
2. **Extract word-level timestamps & transients**:
   ```bash
   python3 scripts/transcribe_sync.py suno_song.mp3 --lyrics lyrics.txt --output lyrics_sync.json
   python3 scripts/beat_analyzer.py suno_song.mp3 --output beats_sync.json
   ```
3. **Author the Manim scene script**:
   - Pick a visual archetype from [`references/design_archetypes.md`](references/design_archetypes.md).
   - Use `KineticPhrase` and `MinimalEditorialHUD` from [`references/motion_primitives.py`](references/motion_primitives.py).
   - Apply `EASE_OUT_EXPO` on word reveals and `punch_emphasis_word` on vocal crests.
   - Implement continuous camera drift (`MovingCameraScene`).
4. **Render at 60 FPS & Mux Audio**:
   ```bash
   python3 scripts/render_pipeline.py scenes.py --scene MukhdaScene --audio suno_song.mp3 --quality high --fps 60 --output final_music_video.mp4
   ```
5. **Verify against [`references/anti_slop_checklist.md`](references/anti_slop_checklist.md)**:
   - Check sync offset < 30ms, no default math fonts, 60 FPS, no frozen camera.

---

## Project Structure & Quick Links

| Component | Path | Description |
| :--- | :--- | :--- |
| **Motion Skill** | [`.agents/skills/manim-lyric-motion/SKILL.md`](.agents/skills/manim-lyric-motion/SKILL.md) | Motion design manual & prompt directives |
| **Lyrics Skill** | [`.agents/skills/bollywood-lyrics-writer/SKILL.md`](.agents/skills/bollywood-lyrics-writer/SKILL.md) | Bollywood songwriting craft & Suno tagging |
| **Easing Curves** | [`references/easing_curves.py`](references/easing_curves.py) | Bézier curves, spring dynamics & pulses |
| **Motion Primitives** | [`references/motion_primitives.py`](references/motion_primitives.py) | `KineticPhrase`, `MinimalEditorialHUD`, camera drift |
| **Visual Archetypes**| [`references/design_archetypes.md`](references/design_archetypes.md) | Swiss Brutalist, Sufi Midnight, Cyber-Y2K, Folk |
| **Anti-Slop Checklist**| [`references/anti_slop_checklist.md`](references/anti_slop_checklist.md) | Mandatory quality gates for AI models |
| **Transcription Sync**| [`scripts/transcribe_sync.py`](scripts/transcribe_sync.py) | Whisper audio to word timestamps |
| **Beat Analyzer** | [`scripts/beat_analyzer.py`](scripts/beat_analyzer.py) | Librosa BPM & transient onset detector |
| **Render Pipeline** | [`scripts/render_pipeline.py`](scripts/render_pipeline.py) | 60 FPS scene compiler & lossless audio muxer |
| **Sample Demo** | [`examples/lyrical_scene_demo.py`](examples/lyrical_scene_demo.py) | Working reference scene implementation |
