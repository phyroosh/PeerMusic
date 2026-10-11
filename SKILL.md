---
name: lyric-motion-design-master
description: "End-to-end music creation and motion design system. Connects Bollywood lyric writing (Topic -> Lyrics pasted in chat for Suno AI) with industry-grade Remotion (React + TypeScript) motion graphics (Suno MP3 -> 60fps / 30fps Cinematic Video) with surreal visual metaphors, word-level kinetic typography, and Swiss minimalism."
---

# PeerMusic: End-to-End Cinematic Motion Graphics Music Video System

Welcome to the **PeerMusic Motion Design Suite**. This repository is equipped with an integrated production pipeline specifically designed for human-in-the-loop AI music video creation:

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
│  STAGE 2: REMOTION MOTION GRAPHICS ENGINE (MP3 + LYRICS)    │
│  • 3-Layer Visual Architecture (Symbols / Typo / Polish)    │
│  • Surreal Metaphor Engine (Anti-Literal Trap Enforcement)  │
│  • 7 Kinetic Typography Masterclasses (Accordion, Stencil)  │
│  • Scene-Dependent Hierarchy (Atmosphere / Symbol / Typo)   │
│  • Dual Layouts: 16:9 Landscape & 9:16 Vertical (Reels/Shorts)  │
│  • Audio-Reactive Synesthesia (Optical bursts, FFT bars)    │
│  • 60 FPS Standard Default (Silky fluid motion & springs)   │
│  • Cinematic Purity: Clean canvas (Zero unwanted HUD text)  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
[ Step 3: Industry-Level Cinematic Motion Graphics Video Delivered ]
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
   > *"Copy the lyrics above, paste them into Suno AI using the suggested style prompt, generate your song, and provide the MP3 audio file back here so we can animate the motion graphics video!"*

---

### Phase 2: Suno MP3 to Motion Graphics Video (Remotion)
When the user provides the Suno MP3 audio file:
1. **Save audio** to `public/audio/`.
2. **Synchronize lyrics & generate timeline**:
   - Align words to vocals (not just drum transients).
   - Assign unique IDs (`w_s01_01`, `w_s02_chai`) to every word.
   - Validate with `python3 scripts/validate_timeline.py <timeline.json>`.
3. **Execute the Creative Spark Engine**:
   - Decouple the literal nouns — translate emotions into **surreal visual metaphors**.
   - Select one of the 5 Aesthetic Design Languages (Cyber-Noir, Risograph Film, Swiss Brutalist, Ethereal Sufi, Collage).
4. **Assign scene visual hierarchy** (`ATMOSPHERE_DOMINANT`, `SYMBOLIC_DOMINANT`, or `TYPOGRAPHY_DOMINANT`).
5. **Preview in Remotion Studio**:
   ```bash
   npx remotion preview src/index.ts
   ```
6. **Render Master Videos**:
   ```bash
   # Landscape (16:9)
   npx remotion render src/index.ts KacchiNeendein-Landscape out/landscape.mp4

   # Vertical (9:16 Reels/Shorts)
   npx remotion render src/index.ts KacchiNeendein-Vertical out/vertical.mp4
   ```

---

## Directory & Creative Component Map

| Component | Path | Description |
| :--- | :--- | :--- |
| **Motion Skill** | [`.agents/skills/remotion-motion-design/SKILL.md`](.agents/skills/remotion-motion-design/SKILL.md) | Master creative design manual, anti-slop rules, & recipes |
| **Lyrics Skill** | [`.agents/skills/bollywood-lyrics-writer/SKILL.md`](.agents/skills/bollywood-lyrics-writer/SKILL.md) | Bollywood songwriting craft & Suno tagging |
| **Generic Engine**| [`src/engine/`](src/engine/) | Reusable typography, layout, camera & atmospheric textures |
| **Kinetic Accords**| [`src/engine/typography/AccordionWord.tsx`](src/engine/typography/AccordionWord.tsx) | Dynamic letter-spacing accordion breathing |
| **Stop Motion**   | [`src/engine/camera/StopMotionWrapper.tsx`](src/engine/camera/StopMotionWrapper.tsx) | Handcrafted animated-on-2s indie tactile frame stepper |
| **Synesthesia**   | [`src/engine/camera/AudioSynesthesiaFlash.tsx`](src/engine/camera/AudioSynesthesiaFlash.tsx) | Transient optical bursts and chromatic flashes |
| **Paper Texture** | [`src/engine/camera/PaperTexture.tsx`](src/engine/camera/PaperTexture.tsx) | Procedural analog risograph tooth & film grain |
| **Song Showcase** | [`src/songs/kacchi-neendein/`](src/songs/kacchi-neendein/) | Full 10-scene sequence with Chai, Clock, Hostel & Syllabus motifs |
| **Root Registry** | [`src/Root.tsx`](src/Root.tsx) | Registers 60 FPS 16:9 & 9:16 compositions dynamically |
| **Validator**     | [`scripts/validate_timeline.py`](scripts/validate_timeline.py) | Monotonic timestamp & override validator |

---

## 🎬 Core Technical Standards

1. **60 FPS Standard Default**: All compositions (`defaultFps: 60`), animation springs, camera drift rigs, and word timelines MUST be authored and rendered at **60 FPS** for silky-smooth motion graphics.
2. **Cinematic Canvas Purity (NO HUD / Telemetry Overlays)**: Never render technical overlays, corner timestamps, section badges (e.g. `02 // MUKHDA`), BPM readouts, or reticles at the top of the screen. Keep the artistic canvas clean, open, and cinematic so the symbolic visuals and lyrics command full attention.

