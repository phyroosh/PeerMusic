---
name: lyric-motion-design-master
description: "End-to-end music creation and motion design system. Connects Bollywood & English songwriting (Topic -> Lyrics pasted in chat for Suno AI) with industry-grade Remotion (React + TypeScript) motion graphics (Suno MP3 -> 60fps / 30fps Cinematic Video) with surreal visual metaphors, word-level kinetic typography, and Swiss minimalism."
---

# PeerMusic: End-to-End Cinematic Motion Graphics Music Video System

Welcome to the **PeerMusic Motion Design Suite**. This repository is equipped with an integrated production pipeline specifically designed for human-in-the-loop AI music video creation:

```
[ Step 1: User provides Topic / Story / Mood / Language in Chat ]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 1: PROFOUND POETIC SONGWRITING & SUNO AI PROMPT      │
│  • 4-Part Emotional Architecture (Subtext, Conflict, Truth) │
│  • 7-Stage Creative Reasoning & 10 Lyrical Quality Gates    │
│  • Mode A: Poetic Bollywood & Hindustani Indie Playback     │
│  • Mode B: Profound English Original Songs (Indie/Ballad)   │
│  • Formatted with Suno-ready tags: [Chorus], [Verse], etc.  │
│  • Audited via `scripts/songwriting_engine.py` for depth    │
│  • Agent provides tailored Suno AI Style Prompt             │
│  • Agent saves lyrics to `lyrics.txt` in workspace          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
[ Step 2: User copies lyrics ──▶ Generates song in SUNO AI ──▶ Provides MP3 ]
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 2: REMOTION COVER & THUMBNAIL STUDIO                 │
│  • Code-Authored Editorial Art Direction                    │
│  • Dual Compositions: 16:9 YouTube & 1:1 Streaming          │
│  • Quality Benchmark: Material Depth, Type & Small-Size Read │
│  • Conformed & Synced after Remotion Still Rendering         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 3: REMOTION MOTION GRAPHICS ENGINE (MP3 + LYRICS)    │
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
[ Step 4: Industry-Level Lyrical Video & Distribution Package Delivered ]
```

---

## The Conversational Protocol for AI Agents

When interacting with the user, agents MUST follow this exact conversational flow:

### Phase 1: Topic to Lyrics & Suno Prompt

1. **Mandatory Musical Direction Confirmation Protocol**:
   - **Check Established Direction**: Determine whether the user's brief explicitly specifies an English song or a Bollywood-style Hindi song.
   - **MANDATORY CONFIRMATION IF MISSING OR AMBIGUOUS**:
     Whenever the user has NOT clearly established the language and musical direction (e.g. *"Create a beautiful song about school memories"* or *"Create a romantic song"*):
     - 🛑 **STOP**: Do NOT generate lyrics, do NOT write to `lyrics.txt`, do NOT craft a Suno prompt, and do NOT initiate rendering.
     - 🛑 **NEVER DEFAULT**: Never automatically default to English or Bollywood based on prompt language, theme, or mood.
     - ❓ **ASK**: Prompt the user with the mandatory question:
       > **"🎵 What kind of song would you like to create?"**
       >
       > - **🇬🇧 English Song** — An English-language song with a suitable musical style, mood, and production direction.
       > - **🇮🇳 Bollywood Song** — A Bollywood-style Hindi song with an appropriate Indian cinematic musical arrangement, emotional expression, and vocal direction.
     - ⏳ **WAIT**: Stop execution and wait for the user to make a choice or respond in natural language.
   - **Intelligent Preference Detection**:
     - *Explicit English* (e.g. *"Create a beautiful English song about school memories"*): Proceed directly to **Mode B** without redundant confirmation.
     - *Explicit Bollywood/Hindi* (e.g. *"Create an emotional Bollywood song about first love"*, *"Make a Hindi song with a Bollywood cinematic feel"*): Proceed directly to **Mode A** without redundant confirmation.
     - *Mood/Genre ≠ Language*: A request for a "romantic song", "nostalgic ballad", or "lofi track" does NOT establish language. Confirmation is mandatory.
   - **Session State & Follow-Up Changes**:
     - Store the user's selection in the session (tracked via `scripts/song_session.py`).
     - If the user responds with their choice (e.g., *"Bollywood"* or *"English"*), proceed with that mode.
     - If the user changes their mind before generation begins (e.g., *"Actually, make it English"*), update the selection and switch workflows.
     - If generation has already begun, do not silently restart; communicate current status clearly.
     - Reset preferences on new song requests to prevent stale preference leakage.

2. **Creative Modes (Profound Poetic Engine)**:
   - **Mode A: Hindi / Bollywood Playback Songs**: Selected after Bollywood confirmation or explicit request. Uses [`.agents/skills/bollywood-lyrics-writer/SKILL.md`](.agents/skills/bollywood-lyrics-writer/SKILL.md). Embeds Hindustani poetic subtext (*Satah*, *Kashmakash*, *Khamosh Sach*), avoiding Bollywood cliches.
   - **Mode B: English Original Songs**: Selected after English confirmation or explicit request. Uses [`.agents/skills/english-song-writer/SKILL.md`](.agents/skills/english-song-writer/SKILL.md). Employs 4-part emotional architecture, imply-more-than-explain principle, and tactile sensory imagery.

3. **Craft the Lyrics (7-Stage Pipeline, 10 Quality Gates & Duration Budget)**:
   - Follow the 7-stage creative pipeline: Understand -> Poetic Motif -> Sectional Progression -> Complete Lyrics -> Poetic Revision -> Musical Usability -> Delivery.
   - Imply more than you explain: let physical details, silence, and habits reveal inner emotion rather than literal declarations.
   - Exercise restraint: balance striking visual lines with painful, disarming simplicity.
   - **MANDATORY DURATION POLICY (Target: ~2:50–2:58 / 170–178s | Hard Limit: 180.0s / 3:00)**:
     - For **Hindi/Bollywood**: Use nuanced conversational Hindustani, organic Urdu touch, and **150–195 sung words** (total sung words including all repeated Mukhda sections).
     - For **English**: Use natural spoken cadence, singable open vowels, crystallized chorus hook, and **140–185 sung words** (total sung words including all repeated chorus sections).
     - Count repeated chorus lines every time they are sung. Never pad with extra verses merely to reach arbitrary length.
     - Verify quality pre-flight using `python3 scripts/songwriting_engine.py audit <lyrics_file> --lang <en|hi>`.
4. **Compact Arrangement & Suno AI Metatags**:
   - Use a focused, compact arrangement designed specifically to finish in under 3 minutes (avoiding bloated 10-section marathons):
     - *Hindi/Bollywood*: `[Short Intro]`, `[Antara 1 / Verse 1]`, `[Mukhda / Chorus]`, `[Antara 2 / Verse 2]`, `[Mukhda / Chorus]`, `[Bridge]` (optional short), `[Concise Outro]`
     - *English*: `[Short Intro]`, `[Verse 1]`, `[Pre-Chorus]` (optional, 2 lines), `[Chorus]`, `[Verse 2]`, `[Chorus]`, `[Bridge]` (optional short, 2–4 lines), `[Concise Outro]`
   - Keep instrumental sections purposeful and brief: 4–6 bars for intro, concise turnaround between verse and chorus, and a clean fade outro (avoid extended solos, long ambient interludes, or multiple repeated final choruses).
5. **Paste directly in chat**:
   - Output the lyrics in a clean markdown code block so the user can copy with one click.
   - Also save a copy to `lyrics.txt` in the workspace.
   - Provide a **Recommended Suno AI Style Prompt** including explicit compact duration directives (e.g. `Dreamy indie pop, nostalgic acoustic ballad, intimate breathy male vocals with gentle harmonies, warm fingerpicked acoustic guitar, soft upright felt piano, warm analog tape saturation, subtle ambient reverb, 78 bpm, compact radio arrangement, concise intro and outro, target duration 2:54, delicate fade outro`).
6. **Prompt the user**:
   > *"Copy the lyrics above, paste them into Suno AI using the suggested style prompt (configured for a compact 2:50–2:58 song), generate your track, and provide the MP3 audio file back here so we can run the duration guard and animate the motion graphics video!"*

---

### Phase 2: Remotion Cover Artwork & YouTube Thumbnail Generation
Once the song concept, lyrics, and MP3 are established:
1. **Understand and Distill the Song**: Extract the title, emotional core, visual motif, color arc, and one editorial focal idea. The cover is a distilled single image, not a poster version of every lyric scene.
2. **Strict Remotion-Only Creative Rule**:
   - ❌ Do not use Nano Banana, `generate_image`, external image-generation APIs, or externally AI-generated artwork for final covers or thumbnails.
   - ❌ Do not use Pillow/PIL to create final typography or take a raw video screenshot and call it a cover.
   - ✅ Create a dedicated Remotion component at `src/songs/<slug>/cover/<Slug>Cover.tsx` and a `cover-plan.md` following [`docs/REMOTION_COVER_STUDIO_STANDARD.md`](docs/REMOTION_COVER_STUDIO_STANDARD.md).
   - ✅ Build with code-authored visual layers: SVG, CSS, shapes, typography, lighting, material texture, controlled particles, and user-supplied/licensed media where appropriate.
3. **Compose, Review, and Export Both Formats**:
   - Register separately designed `<Slug>-Cover-16x9` and `<Slug>-Cover-1x1` Remotion compositions; never crop one to make the other.
   - Render stills to `out/<slug>_cover_16x9.png` and `out/<slug>_cover_1x1.png`, inspect them at full resolution and mobile-thumbnail scale, and iterate until they meet the editorial quality gate.
   - Use `scripts/artwork_pipeline.py` only to conform JPEGs, enforce size limits, and synchronize `studio/metadata.json`; it may not create the visual concept or typography.

---

### Phase 3: Suno MP3 to Motion Graphics Video (Remotion)
When the user provides the Suno MP3 audio file:
> **Maximum-effort requirement:** This phase is a premium, quality-first directing assignment. Do not rush to the first render or choose the fastest available template. Analyze the complete song, direct its full narrative arc, and continue through real rendered review until each scene earns its place in the film. Rendering successfully is only the beginning of verification, never the completion criterion.

1. **Save audio** to `public/audio/<song_slug>.mp3`.
2. **Mandatory Duration Guard (Hard Limit: 180.0s / 3:00 | Target: ~2:50–2:58)**:
   - Measure and validate the actual audio file:
     ```bash
     python3 scripts/duration_guard.py check public/audio/<song_slug>.mp3
     ```
   - If duration <= 180.0s: Accepted.
   - If duration > 180.0s: Automatically apply controlled trimming fallback:
     ```bash
     python3 scripts/duration_guard.py enforce public/audio/<song_slug>.mp3
     ```
     Detects musical phrase cadence/pause and applies clean 2.5s fade-out ending <= 178.0s. Never silently render videos from overlength audio.
3. **Synchronize lyrics & generate timeline**:
   - Align words to vocals with `scripts/transcribe_sync.py` (which prunes any lines beyond the audio duration).
   - Assign unique IDs (`w_s01_01`, `w_s02_chai`) to every word.
   - Validate with `python3 scripts/validate_timeline.py <timeline.json>` (strictly asserts timeline <= 180.0s).
4. **Visual Direction Selection: Three Official PeerMusic Options**:
   - Ask which direction the user wants unless their request already establishes it: **Electric Neon Pulse**, **Liquid Crimson Silk**, or **🎬 Cinematic Atmospheric Lyric Film**.
   - **Electric Neon Pulse** and **Liquid Crimson Silk** remain the two original, fully supported PeerMusic theme options. Use their existing audio-reactive compositions when selected.
   - **🎬 Cinematic Atmospheric Lyric Film** is the third option. When selected, the agent generates breathtaking, evocative scenic environmental worlds (landscapes, nature, architecture, atmospheric lighting, weather, spatial depth) that match the song's musical mood, vibe, and aesthetic to display lyrics beautifully.
   - 🌲 **Outdoor Scenic Primacy**: Strongly prioritize expansive, breathtaking **outdoor natural environments and open-air scenic stages** (mountain passes, misty valleys, alpine lakes, coastal bluffs, evergreen forest glades, starlit celestial horizons) over confined indoor rooms or tabletop props.
   - ❌ **Strict Ban on Characters & Human Bodies**: Strictly zero characters, human bodies, silhouettes of people, faces, eyes, ears, limbs, or walking stick figures.
   - ❌ **Anti-Literal Rule**: Do not try hard to literally animate what is being told or sung word-for-word. Avoid frantic 2-second visual whiplash.
   - ✅ **Section-Driven Scene Architecture**: Organize scenes by musical sections (Intro, Verse 1, Chorus, Verse 2, Bridge, Outro). Each major section gets an evolving, living outdoor scenic environment tailored to the musical dynamics.
   - For this option, create `src/songs/<slug>/visual-plan.md` following [`docs/NARRATIVE_LYRIC_FILM_STANDARD.md`](docs/NARRATIVE_LYRIC_FILM_STANDARD.md).
   - Build separate scene components in `src/songs/<slug>/scenes/`; each provides an atmospheric sanctuary with ample chiaroscuro contrast for kinetic typography.
   - **Lyrics Only**: Zero headers, subtitles, song titles, artist tags, or footers. Zero text during instrumental sections.
   - **Zero Capsules**: Direct-canvas placement with scene-aware contrast and no lyric cards.
   - **High-effort implementation rule**: Do not reuse a scene or visual motif unchanged across an entire section. Build the song from bespoke scene components and evolve environments as the song progresses. Repeated choruses must receive new lighting, scale, or atmospheric escalation.
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
7. **Mandatory Review Loop Before Delivery**:
   - Inspect frames and moving excerpts from every distinct scene, every section boundary, and the final outro.
   - Rework any scene that reads as generic wallpaper, a static cover loop, a repeated template, or an image unrelated to the lyric being sung.
   - Do not call a video finished because the build passes. Finish only after the full narrative, typography timing, scene transitions, and 60fps render have been reviewed.

---

## Directory & Creative Component Map

| Component | Path | Description |
| :--- | :--- | :--- |
| **Motion Skill** | [`.agents/skills/remotion-motion-design/SKILL.md`](.agents/skills/remotion-motion-design/SKILL.md) | Master creative design manual: the two original themes plus atmospheric scenic lyric-film direction |
| **Atmospheric Film Standard**| [`docs/NARRATIVE_LYRIC_FILM_STANDARD.md`](docs/NARRATIVE_LYRIC_FILM_STANDARD.md) | Required scenic worldbuilding contract and lyric display quality gate for option 3 |
| **Celestial Lyrics**| [`src/engine/typography/CelestialLyricRenderer.tsx`](src/engine/typography/CelestialLyricRenderer.tsx) | Pure lyrics-only typography (English + Devanagari, no capsules, zero branding) |
| **Lyrics Skill (Hindi)** | [`.agents/skills/bollywood-lyrics-writer/SKILL.md`](.agents/skills/bollywood-lyrics-writer/SKILL.md) | Bollywood songwriting craft & Suno tagging |
| **Lyrics Skill (English)** | [`.agents/skills/english-song-writer/SKILL.md`](.agents/skills/english-song-writer/SKILL.md) | Beautiful English songwriting, Suno prompting & natural phrasing |
| **Artwork Engine** | [`scripts/artwork_pipeline.py`](scripts/artwork_pipeline.py) | AI Cover & Thumbnail engine: concept formulation, conformance, and metadata sync |
| **Generic Engine**| [`src/engine/`](src/engine/) | Reusable typography, layout, camera & atmospheric textures |
| **Lyric Illumination**| [`src/engine/typography/CinematicLyricLine.tsx`](src/engine/typography/CinematicLyricLine.tsx) | Line-level illumination for archival alternative themes |
| **Root Registry** | [`src/Root.tsx`](src/Root.tsx) | Registers 60 FPS 16:9 & 9:16 song-specific narrative compositions |
| **Validator**     | [`scripts/validate_timeline.py`](scripts/validate_timeline.py) | Monotonic timestamp & override validator |

---

## 🎬 Core Technical Standards

1. **Official Visual Directions**: All new English and Hindi lyric videos offer **Electric Neon Pulse**, **Liquid Crimson Silk**, and **Cinematic Atmospheric Lyric Film**. The third option focuses on breathtaking, evocative scenic environments and atmospheric stagecraft matching the song to display lyrics, strictly prohibiting characters or human body rendering. A cover image, equalizer, or decorative theme can support a scene but can never be that option's backbone.
2. **Strict Lyrics-Only Display**: The actual song lyrics must be the **ONLY visible text** in the music video. Never render decorative uppercase headings, subtitles, scene tags, song titles, artist names, or footer branding. Never render Polaroid specimen cards, kraft paper gridlines, or English translations under the lyrics. During instrumental intros, interludes, and outros, display **zero text**.
3. **Strictly No Capsule-Style Visuals**: Never use rounded-rect containers, pill-shaped badges, floating text cards, or background plates around lyrics. Text is rendered directly over the artwork with restrained golden-violet starlight glow.
4. **Multilingual Script Support**: Support both English (`'Georgia' / 'Playfair Display'`) and Hindi Devanagari (`'Noto Serif Devanagari' / 'Rozha One'` with `letterSpacing: "normal"`).
5. **60 FPS Standard Default**: All compositions (`defaultFps: 60`), animation springs, and camera rigs MUST be authored and rendered at **60 FPS** for silky-smooth motion graphics.
6. **Zero Hardcoded Delays**: Timelines dynamically display lyrics whenever the singer begins singing.

