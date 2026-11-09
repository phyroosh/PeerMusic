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

## 6. Mandatory In-Video Visual Protocol: Three Official PeerMusic Directions

Every lyric video must use one of these three user-selectable directions. Do not silently select a direction when the user has not expressed a preference:

1. **⚡ Electric Neon Pulse** — The existing sleek cyber-noir theme: circular audio spectrum, wet neon reflections, frosted stage, and electric-red kinetic lyrics.
2. **🌊 Liquid Crimson Silk** — The existing sensual motion-art theme: ruby-and-gold silk caustics, starlight motes, and fluid lyric motion.
3. **🎬 Cinematic Atmospheric Lyric Film** — Breathtaking, scenic environmental worlds and atmospheric visual stages that match the song's musical mood, vibe, and genre, designed specifically to display the lyrics beautifully. Strictly zero characters or human body rendering.

### 1. Mandatory Visual Direction Selection

When preparing a lyric video, ask the user:

> **"🎨 Which visual direction would you like for the lyric video?"**
>
> - **⚡ Electric Neon Pulse** — Bold, polished, audio-reactive cyber-noir lyric visuals.
> - **🌊 Liquid Crimson Silk** — Hypnotic ruby-and-gold fluid motion with elegant lyric animation.
> - **🎬 Cinematic Atmospheric Lyric Film** — Atmospheric, scenic environments matching the song's mood and aesthetic to display lyrics beautifully (strictly zero characters or human figures).

If the user explicitly requests a “scenic lyric video,” “atmospheric lyric film,” “lyric film,” or names one of the directions, proceed directly with that selection. Preserve the selected direction for the current song.

### 2. Core Requirements for Option 3: Cinematic Atmospheric Lyric Film

- **Scenic Lyric Display Philosophy**: The primary goal is to generate **beautiful, atmospheric scenes to display the lyrics** matching the song's musical mood, vibe, and aesthetic. Do not try hard to literally animate what is being told or sung word-for-word.
- 🌲 **MANDATORY OUTDOOR SCENIC PRIORITY**:
  - Strongly prioritize **expansive, breathtaking outdoor natural environments and open-air scenic landscapes** over confined indoor rooms or small tabletop props.
  - Outdoor settings provide vast cinematic scale, natural lighting arcs (dawn to dusk), wide horizon lines, and rich negative space for typography to breathe effortlessly.
  - **Preferred Outdoor Archetypes**:
    - *Vast Horizons & Skies*: Dawn sunrise breaking over mountain ridges, rolling mist through valleys, dramatic coastal cliffs under golden hour skies, starry celestial voids with auroras over still waters.
    - *Living Nature & Water*: Deep evergreen forest glades with sunbeams (komorebi), meadows of swaying wildflowers/lavender, crystal alpine lakes with rippling water caustics, serene river bends with smooth stones, ocean shorelines at blue hour.
    - *Open-Air Architectural Elements*: When architecture is used, prefer open outdoor structures (open stone clifftop terraces, ancient colonnades framing infinite horizons, garden pergolas under starlit skies, wooden piers stretching into glassy water) rather than closed indoor rooms.
    - *Outdoor Atmospheric Depth*: Volumetric sunbeams/god-rays, rolling ground fog, falling rain on open water, floating twilight embers, drifting pollen/petals, and gentle wind sway across foliage.
- ❌ **STRICT PROHIBITION ON CHARACTERS & HUMAN BODIES**: Never attempt to render human figures, silhouettes of people, faces, eyes, ears, mouths, torsos, limbs, hands, clenched fists, or walking stick figures in SVG/Remotion/canvas code. Code-drawn human anatomy inevitably looks crude, awkward, and amateurish. The visuals must focus on environment, architecture, nature, light, texture, and atmospheric space.
- ❌ **NO HYPER-LITERAL MICRO-PANTOMIME**: Stop trying hard to micro-animate what is literally or physically being told line-by-line (e.g. if the lyric mentions turning around, walking, holding hands, or a racing heartbeat, do NOT attempt to animate those physical human actions).
- ❌ **NO RAPID 2-SECOND VISUAL WHIPLASH**: Avoid frantically flipping or changing scenes and objects every 1.5–3 seconds for individual words or phrases. Let scenic environments breathe, live, and create genuine musical atmosphere.
- ✅ **Section-Driven Scene Architecture**: Organize scenes by musical sections (Intro, Verse 1, Chorus, Verse 2, Bridge, Outro). Each major section gets a distinct, evolving, beautiful scenic space (e.g. dawn mist over a mountain ridge, sunlit balcony with Venetian blind god-rays, rain-slicked city bokeh, celestial starlight void, floating water lanterns) that matches the musical intensity and emotional progression of that section.
- ✅ **Lyrical Display Sanctuary**: The visual scene is an atmospheric sanctuary designed to display the lyrics. Provide ample chiaroscuro negative space, rich ambient depth, and soft lighting contrast so that the synchronized kinetic typography (high-fashion Didone/Roman serif, Devanagari calligraphy, or elegant script with soft couplet anticipation) is effortless to read, glowing, and breathtakingly integrated into the scene.
- ✅ **Living Environmental Micro-Motion & Audio Reactivity**: The world breathes with continuous, organic environmental micro-motion:
  - Volumetric god-rays, floating dust/embers/starlight motes, undulating mist, drifting clouds, falling rain or water caustics, soft wind sway.
  - Audio reactivity is tied to environmental elements: bass kicks produce soft light bloom / pulse in lanterns or horizon flares; vocal melismas/alaaps cause ambient light to expand; rhythm transients create subtle water ripples or lens shifts.
- Before writing video code, create `src/songs/<slug>/visual-plan.md` using the format in [`docs/NARRATIVE_LYRIC_FILM_STANDARD.md`](docs/NARRATIVE_LYRIC_FILM_STANDARD.md).

### 2A. Non-Negotiable Quality and Verification Gate:
- ❌ **No shortcut default:** Never solve a full lyric video with a pre-existing showcase component, static cover image, single procedural background, or a copied scene repeated across the track.
- ✅ **Complete-arc direction:** Account for the full song—intro, every verse, pre-chorus, chorus recurrence, bridge, instrumental transitions, and outro. Repeated lyrics must return with narrative escalation, not identical imagery.
- ✅ **Proof before delivery:** Render and inspect representative frames from every distinct story scene plus its inbound/outbound transition. Inspect at least one moving excerpt around each major section boundary; correct weak, unreadable, static, or generic moments before a final render.
- ✅ **No artificial time cap:** Never lower visual ambition, skip scene planning, reduce QA, or present an unfinished draft merely to finish quickly. Long renders are expected when required for a high-quality result.
- ✅ **Honest state:** If an asset, render, or review is still incomplete, state that plainly and continue the required work; do not call it final or imply the job is done.

### 3. Audio-Reactive Rhythm Standard (All Three Directions):
- Beat and vocal energy must affect the **scene's meaningful objects**: a kick can jolt the camera or fracture a reflection; a vocal sustain can stretch light, space, or letter spacing; a snare can snap a transition. Do not add a generic spectrum merely to satisfy audio reactivity.
- Each motif must have entrance, continuous micro-life, beat response, and a motivated transition into the next lyric image.

### 4. Zero Extra Text Standard:
- **Strict Rule**: Display ONLY the actual sung song lyrics and the official **Peer Music circular branding badge** (`PeerMusicLogoBadge`).
- ❌ **No Style Identifier Pills**: Never render style names, theme names, decorative badges, or prototype labels in the video canvas.
- ❌ **No Section Badges or Metadata Headers**: Never display `02 // MUKHDA` or timecodes.
- ❌ **No Subtitle Translations Under Lyrics**: Never render English translation sentences beneath Hindi lyrics.
- ❌ **No Text During Instrumental Breaks**: Lyrics appear strictly when sung or anticipating. Pure visual immersion during instrumental intros, solos, and outros.

---

## 7. Mandatory Release Packaging Protocol: Remotion Cover Studio

> [!IMPORTANT]
> Every official thumbnail and single cover MUST be created as a dedicated, code-authored **Remotion composition**. Do not use Nano Banana, `generate_image`, image-generation APIs, or externally AI-generated cover art as the final cover base. The cover is a designed companion to the music video—not a one-frame screenshot, an imported AI poster, or a photo with a post-processed text overlay.

Every song must deliver a dedicated, high-effort **Remotion-authored** YouTube thumbnail and streaming cover:

1. **Original Cover Composition Requirement**:
   - Create `src/songs/<slug>/cover/<Slug>Cover.tsx` and register dedicated `<Slug>-Cover-16x9` and `<Slug>-Cover-1x1` compositions in `src/Root.tsx`.
   - Plan the cover in `src/songs/<slug>/cover/cover-plan.md` following [`docs/REMOTION_COVER_STUDIO_STANDARD.md`](docs/REMOTION_COVER_STUDIO_STANDARD.md). It must distill the song into a single strong editorial idea—not attempt to retell the entire video.
   - Author the full artwork in Remotion using purposeful SVG, CSS gradients, vector silhouettes, composited shapes, typography, lighting, texture, and any user-supplied/licensed assets. A visual motif from the lyric film may return, but the cover must be independently art-directed.
   - ❌ Never crop or resize the 16:9 composition into the square cover. Compose responsive 16:9 and 1:1 layouts separately.

2. **Maximum-Effort Art Direction**:
   - Build cinematic depth through layered light, parallax, controlled grain, atmospheric particles, silhouettes, material detail, and an intentional color grade. The image may be abstract, illustrative, graphical, or cinematic; it does not require a generated protagonist.
   - The cover must have one unmistakable focal idea, a deliberate negative-space typography field, and strong small-screen readability.
   - ❌ Do not use a generic gradient, a single unmodified video frame, a stock mockup, or a procedural wallpaper as a final cover.
   - Render and inspect multiple still frames while developing. Revise until the composition, hierarchy, title legibility, and material depth hold up at both full size and mobile-thumbnail size.

3. **Editorial Typography and Brand System**:
   - Render typography natively in Remotion/CSS/SVG so type, glow, shadow, and lighting belong to the scene. Never use Pillow/PIL to manufacture the final creative typography.
   - Keep title treatment away from the focal object. Use a purpose-built negative-space layout: upper-right, top masthead, or asymmetric-left when appropriate.
   - Main title: high-contrast Roman/Didone-inspired serif in champagne ivory (`#FAF4E8`); optional subtitle: restrained warm-gold cursive/italic (`#E5B869`). Use the circular PeerMusic badge/label mark only when it improves the composition.

4. **Dedicated Delivery Assets**:
   - Render the 16:9 Remotion composition to `out/<slug>_cover_16x9.png`, then conform a JPEG to `public/covers/<slug>_thumb.jpg` and `out/<slug>_thumb.jpg` (strictly <= 1.85 MB for YouTube Data API limits).
   - Render the separate 1:1 Remotion composition to `out/<slug>_cover_1x1.png`, then conform it to `public/covers/<slug>_cover_sq.jpg` for streaming distribution.
   - `scripts/artwork_pipeline.py` may be used only for lossless/resampling/conformance, JPEG compression, and metadata synchronization. It must not generate the cover concept, supply final typography, or invoke an external image generator.

5. **Studio Metadata Synchronization**:
   - `studio/metadata.json` must ALWAYS set `"thumbnail": "<slug>_thumb.jpg"`, ensuring YouTube uploads use the Remotion-authored cover.

