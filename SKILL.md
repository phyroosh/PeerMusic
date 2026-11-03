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
│  STAGE 2: AI MUSIC COVER & THUMBNAIL ARTIST                 │
│  • Song-Centric Concept Engine (Original Visual Identity)   │
│  • Dual Formats: 16:9 YouTube Thumbnail & 1:1 Album Cover   │
│  • Quality Benchmark: Atmospheric Depth & Serif/Script Type │
│  • Conformed via `scripts/artwork_pipeline.py` & Synced     │
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

### Phase 2: AI Cover Artwork & YouTube Thumbnail Generation
Once the song concept, lyrics, and MP3 are established:
1. **Understand the Song**: Extract title, lyrical meaning, emotional core, narrative atmosphere, and authentic music props.
2. **Strict Directives (Anti-Movie-Poster, Anti-Dilapidated-School & Anti-Synthetic-Font-Overlay)**:
   - ❌ **Anti-Movie-Poster**: Never generate full-body posed actors walking down hallways or movie billing blocks. It must be an intimate, candid music single album cover.
   - ❌ **Anti-Dilapidated School**: Never depict peeling paint, broken benches, or dingy government school corridors. Default to clean, modern, sun-drenched, stylish coming-of-age aesthetics.
   - ❌ **Anti-Synthetic Font Overlay**: Never use programmatic scripts (e.g. Pillow / `PIL.ImageDraw`) to paste flat TrueType fonts onto clean photos for release covers. Programmatic overlays look amateurish, flat, and disconnected from the scene's lighting and depth. Release cover typography MUST be synthesized natively by the AI image generation model, where the Didone serif title and warm gold cursive script are organically integrated into the scene's lighting, halation, and negative space.
   - ✅ **Intimate Music-Centric Subject**: Close-to-medium candid framing of an expressive young subject caught in an emotional/musical daydream with earphones/headphones.
   - ✅ **Tactile Props in Soft Focus**: 2-3 narrative props (open lyric notebook, water bottle catching golden light, earphones, guitar).
   - ✅ **Pure Fine-Art Background (NO Text) for Video Engine**: For Remotion lyric video backgrounds, strictly NO baked-in text, typography, or watermarks. The synchronized lyric engine handles all words separately.
   - ✅ **Native AI Typography for Release Covers**: For YouTube thumbnails and Spotify covers, generate the image directly using the typography-enabled prompt so the lettering is seamlessly woven into the 35mm film halation and atmosphere.
3. **Formulate Tailored Visual Concepts**:
   - Run `python3 scripts/artwork_pipeline.py concept <song-slug>` to inspect the song and generate custom prompt directions.
   - Design distinct, intentional compositions for both target formats using the **Master Cover Prompt Template**:
     > *"A stylish, modern indie music single album cover and lyrical video thumbnail, [16:9 widescreen for `_thumb.jpg` / 1:1 square for `_cover_sq.jpg`]. An intimate, cinematic candid close-to-medium shot of [EXPRESSIVE YOUNG SUBJECT IN EMOTIVE REVERIE / DAYDREAMING, e.g. sitting beside a sun-drenched modern school window at golden hour, wearing white earphones, looking wistfully toward the classroom door with a tender, nostalgic smile], shot on a prime 35mm lens with [WARM GOLDEN HOUR SUNLIGHT / TWILIGHT BLUE HOUR / DIM AMBER LIGHTING]. Featuring [3-4 SPECIFIC NARRATIVE PROPS IN SOFT FOCUS, e.g. open spiral notebook with poetic handwritten lyrics, clear water bottle on modern desk catching golden light, earphones, subtle vintage indie record label emblem in the corner]. Rich cinematic color grading with warm amber highlights and soft muted tones, dreamy 35mm film halation, atmospheric dust motes, and shallow depth of field with creamy background blur. Importantly, preserve a natural clean out-of-focus area on the [UPPER-RIGHT / RIGHT] of the frame to serve as dedicated negative space for typography. Tasteful indie music single typography placed with generous negative space: '[MAIN SONG TITLE IN UPPERCASE]' in elegant, high-contrast warm cream Didone/Roman serif typography with wide aesthetic tracking, and directly below it '[POETIC HINGLISH SUBTITLE]' in subtle warm gold italic or cursive script. Authentic indie pop / playback music single release aesthetic, intimate and emotional, strictly NOT a movie poster."*
4. **Generate Artwork with Nano Banana**:
   - Use `generate_image` with the 16:9 prompt (widescreen YouTube Thumbnail) and 1:1 prompt (square album cover).
5. **Evaluate, Compress & Conform Assets**:
   - Save directly to standardized paths via:
     ```bash
     python3 scripts/artwork_pipeline.py process --song <song-slug> --source <img_path_16x9> --format 16x9
     python3 scripts/artwork_pipeline.py process --song <song-slug> --source <img_path_1x1> --format 1x1
     ```
   - Automatically:
     - Saves canonical 16:9 thumbnail to `public/covers/<slug>_thumb.jpg` (auto-compressed JPEG strictly $< 1.8$ MB for YouTube Data API limits).
     - Saves canonical 1:1 square cover to `public/covers/<slug>_cover_sq.jpg` (high-res Spotify distribution cover).
     - Saves production PNGs to `out/<slug>_cover_16x9.png` and `src/songs/<slug>/`.
     - Syncs metadata in `studio/metadata.json` for localhost Studio UI detection.

---

### Phase 3: Suno MP3 to Motion Graphics Video (Remotion)
When the user provides the Suno MP3 audio file:
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
4. **Default Visual Engine: Dynamic Song Cover Artwork System**:
   - Every song renders with its own song-specific cover artwork as the primary visual element (`SongCoverArtworkSong`).
   - Features slow Ken Burns zooms, subtle camera drift, ambient lighting breathing, and drifting 35mm atmospheric dust particles.
   - **Lyrics Only**: Zero headers, subtitles, song titles, artist tags, or footers. Zero text during instrumental sections.
   - **Zero Capsules**: Direct-canvas placement with subtle feathered negative-space contrast scrim.
   - **Optional Themes**: `CelestialEclipse` (cosmic void & golden corona) and `BotanicalScrapbook` remain available when explicitly requested.
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
| **Motion Skill** | [`.agents/skills/remotion-motion-design/SKILL.md`](.agents/skills/remotion-motion-design/SKILL.md) | Master creative design manual: Dynamic Song Cover Artwork default, lyrics-only & anti-slop rules |
| **Default Theme**| [`src/themes/cover-art/SongCoverArtworkSong.tsx`](src/themes/cover-art/SongCoverArtworkSong.tsx) | Official default theme: Full-bleed 16:9 cinematic cover artwork, Ken Burns motion, and synced lyrics |
| **Celestial Lyrics**| [`src/engine/typography/CelestialLyricRenderer.tsx`](src/engine/typography/CelestialLyricRenderer.tsx) | Pure lyrics-only typography (English + Devanagari, no capsules, zero branding) |
| **Lyrics Skill (Hindi)** | [`.agents/skills/bollywood-lyrics-writer/SKILL.md`](.agents/skills/bollywood-lyrics-writer/SKILL.md) | Bollywood songwriting craft & Suno tagging |
| **Lyrics Skill (English)** | [`.agents/skills/english-song-writer/SKILL.md`](.agents/skills/english-song-writer/SKILL.md) | Beautiful English songwriting, Suno prompting & natural phrasing |
| **Artwork Engine** | [`scripts/artwork_pipeline.py`](scripts/artwork_pipeline.py) | AI Cover & Thumbnail engine: concept formulation, conformance, and metadata sync |
| **Generic Engine**| [`src/engine/`](src/engine/) | Reusable typography, layout, camera & atmospheric textures |
| **Lyric Illumination**| [`src/engine/typography/CinematicLyricLine.tsx`](src/engine/typography/CinematicLyricLine.tsx) | Line-level illumination for archival alternative themes |
| **Root Registry** | [`src/Root.tsx`](src/Root.tsx) | Registers 60 FPS 16:9 & 9:16 compositions dynamically with Song Cover Artwork default |
| **Validator**     | [`scripts/validate_timeline.py`](scripts/validate_timeline.py) | Monotonic timestamp & override validator |

---

## 🎬 Core Technical Standards

1. **Official Default Theme (Dynamic Song Cover Artwork)**: All new English and Hindi music videos strictly default to the **Dynamic Song Cover Artwork** aesthetic (`SongCoverArtworkSong` with `SongCoverBackdrop` and `CelestialLyricRenderer`). Features full-bleed 16:9 candid cinematic cover art, slow Ken Burns camera motion, and drifting 35mm dust motes.
2. **Strict Lyrics-Only Display**: The actual song lyrics must be the **ONLY visible text** in the music video. Never render decorative uppercase headings, subtitles, scene tags, song titles, artist names, or footer branding. Never render Polaroid specimen cards, kraft paper gridlines, or English translations under the lyrics. During instrumental intros, interludes, and outros, display **zero text**.
3. **Strictly No Capsule-Style Visuals**: Never use rounded-rect containers, pill-shaped badges, floating text cards, or background plates around lyrics. Text is rendered directly over the artwork with restrained golden-violet starlight glow.
4. **Multilingual Script Support**: Support both English (`'Georgia' / 'Playfair Display'`) and Hindi Devanagari (`'Noto Serif Devanagari' / 'Rozha One'` with `letterSpacing: "normal"`).
5. **60 FPS Standard Default**: All compositions (`defaultFps: 60`), animation springs, and camera rigs MUST be authored and rendered at **60 FPS** for silky-smooth motion graphics.
6. **Zero Hardcoded Delays**: Timelines dynamically display lyrics whenever the singer begins singing.

