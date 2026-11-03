# PeerMusic: Mandatory Musical Direction Confirmation Protocol

This rule is mandatory and active across all PeerMusic agent interactions.

---

## 1. Core Principle: The User Chooses the Musical Direction

When a user asks PeerMusic to create a song without explicitly specifying its language or musical direction, **PeerMusic must NOT immediately generate the song or assume a default**.

The user chooses the musical direction, not the agent. The agent makes creative decisions (lyrics, instrumentation, chord moods, arrangement) only *after* confirming the user's intended direction.

---

## 2. Mandatory Confirmation Step

Whenever a song creation request is received where the language and musical direction have **NOT** been explicitly established:

### The Workflow:
1. **Analyze the Request**: Check if the brief contains an explicit language/cultural musical identity.
2. **Halt Generation**:
   - ❌ **DO NOT** generate lyrics.
   - ❌ **DO NOT** write to `lyrics.txt`.
   - ❌ **DO NOT** generate Suno AI style prompts.
   - ❌ **DO NOT** invoke music-generation APIs or consume generation credits.
   - ❌ **DO NOT** trigger artwork, thumbnail, or Remotion rendering.
   - ❌ **DO NOT** silently default to English or Bollywood based on prompt language or emotional theme.
3. **Ask the User**:
   Prompt the user with the exact question:
   > **"🎵 What kind of song would you like to create?"**

   Present these two clearly distinguishable options:
   - **🇬🇧 English Song** — An English-language song with a suitable musical style, mood, and production direction.
   - **🇮🇳 Bollywood Song** — A Bollywood-style Hindi song with an appropriate Indian cinematic musical arrangement, emotional expression, and vocal direction.

   *(If interactive UI selection tools like `ask_question` are enabled, use them; otherwise, present these options clearly in the conversation chat).*
4. **STOP AND WAIT**: End the turn and wait for the user to make a selection or reply in natural language.
5. **Resume Workflow Only After Confirmation**: Only after receiving the user's response should PeerMusic proceed to the corresponding songwriting skill (`english-song-writer` or `bollywood-lyrics-writer`).

---

## 3. Intelligent Preference Detection

Apply this confirmation step intelligently rather than blindly asking when preference is already obvious:

| User Request | Action | Rationale |
| :--- | :--- | :--- |
| *"Create a song about school memories."* | ❓ **Ask Confirmation** | Unspecified direction. Must NOT default to English. |
| *"Create a beautiful English song about school memories."* | ⚡ **Proceed Directly (English)** | User explicitly requested English. No redundant confirmation. |
| *"Create an emotional Bollywood song about first love."* | ⚡ **Proceed Directly (Bollywood)** | User explicitly requested Bollywood. No redundant confirmation. |
| *"Make a Hindi song with a Bollywood cinematic feel."* | ⚡ **Proceed Directly (Bollywood)** | User explicitly requested Hindi / Bollywood playback. |
| *"Create a romantic song."* | ❓ **Ask Confirmation** | "Romantic" is an emotional tone/genre, NOT a language preference. |
| *"Make an upbeat lofi acoustic track."* | ❓ **Ask Confirmation** | "Lofi acoustic" is an instrumentation/vibe, NOT a language preference. |
| *"Compose a sad song about leaving home."* | ❓ **Ask Confirmation** | Theme is nostalgic sadness, language is unspecified. |

**Strict Rule**: Never confuse a song's subject, emotional tone, or genre (e.g. romance, heartbreak, lofi, acoustic, pop) for a language preference.

---

## 4. Session State & Follow-Up Modifications

1. **Current Session Scope**:
   - Once confirmed for the current song, preserve the selection throughout songwriting, Suno prompting, and motion design. Do not ask repeatedly for the same song.
2. **Follow-Up Changes Before Generation**:
   - If the user changes their mind before generation begins (e.g., User selects "Bollywood", then follows up with *"Actually, make it English"*), respect the new selection immediately and switch to the English songwriting workflow.
3. **Guards Against Silent Restarts**:
   - If generation has already begun, do not silently restart or create duplicate tracks. Clearly inform the user of the current generation status and use the application's existing revision/control capabilities.
4. **No Stale Preference Leakage**:
   - When a user starts a completely new song request, reset the direction state. Do not silently reuse an old preference from an earlier song if the new request is generic.

---

## 5. Mandatory Song Duration Protocol & Overlength Audio Decision Feature

Every newly generated song in PeerMusic has a strict baseline duration target (<= 180.0s / 3:00 max). However, when source audio generated or provided exceeds 180.0s (3:00):

### 1. The Mandatory Overlength Audio Confirmation Step (Never Auto-Decide Silently)
If physical audio measurement via `python3 scripts/duration_guard.py check <audio_file>` reveals that the audio exceeds 180.0s:
- ❌ **NEVER** silently trim, crop, or make an arbitrary decision without asking the user.
- ❌ **NEVER** abort or panic in confusion.
- ✅ **MANDATORY**: The agent MUST ask the user using the interactive selection tool (`ask_question`), or present these exact options in conversation:
  > **"The source audio is [M:SS] ([N]s), exceeding the 3:00 limit. Which duration version would you like to render?"**
  > 1. **(Recommended) Radio Edit (<= 2:58 / ~176s)** — Musically trimmed & faded to comply with PeerMusic's <= 180s duration protocol.
  > 2. **Full Uncut Version ([M:SS] / [N]s)** — Render the full [M]-minute [SS]-second uncut song and lyrics.
  > 3. **Both Versions** — Render both the 180s-compliant Radio Edit and the Full [M:SS] Uncut Version.

### 2. Standardized Execution Workflow:
- **If User Chooses 1 ("Radio Edit")**:
  - Run `python3 scripts/duration_guard.py radio-edit public/audio/<slug>.mp3 --timeline src/songs/<slug>/timeline.json`.
  - Generates `public/audio/<slug>_radio.mp3` (faded out cleanly at <= 178s) and `src/songs/<slug>/timeline_radio.json`.
  - Register `<Slug>-Radio-Landscape` in `src/Root.tsx` and render `out/<slug>_radio_landscape.mp4`.
- **If User Chooses 2 ("Full Uncut Version")**:
  - Keep the full untrimmed audio and full `src/songs/<slug>/timeline.json`.
  - Register `<Slug>-Landscape` in `src/Root.tsx` and render `out/<slug>_landscape.mp4`.
- **If User Chooses 3 ("Both Versions")**:
  - Run the `radio-edit` tool to generate the radio assets, while preserving the full-length assets.
  - Register BOTH compositions (`<Slug>-Radio-Landscape` and `<Slug>-Landscape`) in `src/Root.tsx`.
  - Render both output files to `out/` so the user has the compliant radio edit for streaming and the full uncut masterpiece.

### 3. Baseline Songwriting Budgets & Prompting:
- Target Duration: ~170–178s (~2:50–2:58).
- English word budget: 140–185 sung words. Hindi word budget: 150–195 sung words.
- Suno prompts must specify: `compact radio arrangement, concise intro and outro, target duration 2:54, no extended solos`.

---

## 6. Mandatory In-Video Visual Protocol: Official PeerMusic Visual Themes Standard

Every lyrical video generated in PeerMusic—across **both English and Hindi/Bollywood pipelines**—must use one of PeerMusic's two official, high-aesthetic, audio-reactive visual themes:

### 1. Mandatory Visual Style Confirmation Step:
Whenever preparing a lyric video, the agent MUST ask the user:
> **"🎨 Which visual style would you like for the lyric video?"**
- **⚡ Electric Neon Pulse** — Modern, sleek cyber-vibe with a circular equalizer soundwave ring pulsating to the music rhythm, wet neon reflections, frosted glassmorphic stage, and electric red neon strike typography.
- **🌊 Liquid Crimson Silk** — Smooth, calming, hypnotic motion art with flowing ruby & molten gold silk caustics undulating to the music rhythm, floating starlight motes, and fluid gradient wave typography.

*(If interactive UI selection tools like `ask_question` are enabled, use them; otherwise, present these options clearly in conversation).*

### 2. Audio-Reactive Rhythm Standard (Rhythm Synesthesia):
- In **Electric Neon Pulse**, the circular soundwave spectrum bars and neon halos physically bounce and pulse in lockstep with the track's kick drum, bass, and rhythm transients.
- In **Liquid Crimson Silk**, the silk ribbons swell in amplitude and wave dynamics in sync with the musical phrasing and beat energy.

### 3. Zero Extra Text Standard:
- **Strict Rule**: Display ONLY the actual sung song lyrics and the official **Peer Music circular branding badge** (`PeerMusicLogoBadge`).
- ❌ **No Style Identifier Pills**: Never render style names (e.g. `STYLE 02`, `STYLE 03`) or decorative badges in the video canvas.
- ❌ **No Section Badges or Metadata Headers**: Never display `02 // MUKHDA` or timecodes.
- ❌ **No Subtitle Translations Under Lyrics**: Never render English translation sentences beneath Hindi lyrics.
- ❌ **No Text During Instrumental Breaks**: Lyrics appear strictly when sung or anticipating. Pure visual immersion during instrumental intros, solos, and outros.

---

## 7. Mandatory Release Packaging Protocol: Netflix-Grade Heroic Protagonist, Clean Silent Background & Editorial Thumbnail Standard

> [!IMPORTANT]
> **The Official Music Video Cover / Thumbnail is an ENTIRELY SEPARATE asset from the clean in-video backdrop.**
> Never use the bare, textless video backdrop or a subtitle frame-grab as the final YouTube thumbnail or music single cover.

Every song in PeerMusic must deliver a dedicated, **Netflix-Original caliber Music Video Single Cover and YouTube Thumbnail**:

1. **Clean Silent Background Standard (Zero Visual Noise)**:
   - ❌ **No Grainy, Cluttered, or Chaotic Backgrounds**: Backdrops must be clean, silent, and atmospheric.
   - ✅ **Cinematic Anamorphic Bokeh**: Use a 35mm prime lens aesthetic with smooth, creamy out-of-focus optical bokeh circles (e.g. city rain lights in sapphire, cyan, amber, and ruby).
   - ✅ **Velvety Black Depth**: True deep inky black levels (`#06080E`) with rich shadow gradients instead of flat, murky gray-blue tones.

2. **Heroic Protagonist Presence Standard (Hero Character Standard)**:
   - ❌ **No Random, Cartoonish, or Distorted Figures**: The character must look like a cinematic hero.
   - ✅ **Charismatic, Clean-Featured Hero**: Handsome/beautiful, neat well-groomed hair and beard, sharp jawline with gentle rim lighting, poised styling in modern understated wardrobe (e.g. textured knit sweater, classic coat, tailored shirt).
   - ✅ **Intimate Music Single Poise**: Lost in thought, contemplative, or gazing into negative space; authentic and emotive.

3. **Netflix-Grade Color Grading & Chiaroscuro Harmony**:
   - Masterful chiaroscuro: Moody blue-hour cobalt/midnight slate or teal rain exterior, balanced against the warm golden-amber tungsten key light (`#FFA44A`) from a vintage brass banker's desk lamp.
   - Grounding foreground props: Steaming ceramic coffee mug and open handwritten journal/fountain pen on a polished dark wood table to provide satisfying visual weight.

4. **Editorial Cover Typography & Negative Space Layouts**:
   - ❌ **Zero Dead-Center Text Standard**: Never stamp song titles across the subject's face, neck, chest, or central focal point.
   - ✅ **Dedicated Negative-Space Layout Standards**:
     - **Upper-Right Balanced** (`upper-right` - Recommended): Subject on the left third looking rightward; upper-right 45% open bokeh negative space with Didone title and gold cursive subtitle.
     - **Top Editorial Masthead** (`top-masthead`): Subject in lower-middle frame; upper 28-32% clean dark negative space with Didone Roman serif title and warm gold script subtitle across the top.
     - **Asymmetric Left-Weighted** (`asymmetric-left`): Subject strictly on the right third; left 45% open dark negative space with vertically stacked Didone typography.
   - **Main Song Title**: Rendered in prominent, high-contrast, elegant Roman / Didone serif typography in warm champagne ivory (`#FAF4E8`) (e.g. `TERI YAADON KI BAARISH`, `PAANI PEENE KA BAHAANA`, `KHUMAAR`, `AAKHRI BENCH`, `WINDOW SEAT`).
   - **Warm Gold Script Subtitle**: Flowing cursive/italic script in warm amber/honey gold (`#E5B869`) directly beneath the title (e.g. `Khidki Pe Baarish`, `Classroom Ki Khidki`, `Yeh Kaisa Suroor Hai`, `Yaari Aur Khwaab`).
   - **Atmospheric Depth**: Dual-pass drop shadows and subtle feathered scrim for crisp legibility over cinematic backgrounds.
   - **Indie Record Label Emblem**: Circular vinyl record badge with grooved concentric rings and micro-typography in the opposite lower corner.

5. **Dedicated Delivery Assets**:
   - **16:9 YouTube Thumbnail**: Saved to `public/covers/<slug>_thumb.jpg` and `out/<slug>_thumb.jpg` (strictly <= 1.85 MB for YouTube Data API limits) and `out/<slug>_cover_16x9.png`.
   - **1:1 Streaming Single Cover**: Saved to `public/covers/<slug>_cover_sq.jpg` and `out/<slug>_cover_1x1.png` for Spotify, Apple Music, and streaming distribution.

6. **Studio Metadata Synchronization**:
   - `studio/metadata.json` must ALWAYS set `"thumbnail": "<slug>_thumb.jpg"`, ensuring YouTube uploads use the typography-rich Netflix-level cover.

