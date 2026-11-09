# PeerMusic Atmospheric Scenic Lyric Film Standard (Official Option 3)

This standard applies when the user selects **🎬 Cinematic Atmospheric Lyric Film**, the third official PeerMusic visual direction. It does not replace the existing **⚡ Electric Neon Pulse** or **🌊 Liquid Crimson Silk** theme options.

## The Non-Negotiable Definition

A PeerMusic atmospheric lyric video is a compact cinematic film whose visual world is a **breathtaking, evocative scenic environment** specifically tailored to match the song's musical mood, vibe, genre, and emotional arc. 

The primary purpose of the visual world is to serve as an **atmospheric sanctuary and stage to display the song's lyrics beautifully**. It is not an animation studio attempting to illustrate human characters, nor is it a literal micro-pantomime of every word the singer says.

---

## 🚫 The Strict Prohibitions

1. ❌ **STRICT BAN ON CHARACTERS & HUMAN BODIES**:
   - **Never** render human bodies, silhouettes of people, faces, eyes, ears, mouths, torsos, limbs, hands, clenched fists, or walking stick figures in SVG/Remotion/canvas code.
   - Code-drawn human anatomy inevitably looks crude, awkward, cartoonish, and amateurish. It severely detracts from the emotional seriousness of the music.
   - All visual elements must strictly focus on **environment, architecture, natural phenomena, light, weather, spatial depth, and material texture**.

2. ❌ **NO HYPER-LITERAL MICRO-PANTOMIME**:
   - Stop trying hard to animate what is literally or physically being told line-by-line.
   - If a lyric mentions *"mudh ke dekha"* (turning around), DO NOT animate someone turning.
   - If a lyric mentions *"dhadkan tezz hui"* (heartbeat), DO NOT animate an anatomical heart or pulsing chest.
   - If a lyric mentions *"akele chal rahe the"* (walking alone), DO NOT draw a walking stick figure with leg lines.
   - If a lyric mentions *"kaan ki baali"* (earring), DO NOT draw an earlobe or ear silhouette.
   - Let the lyrics tell the human story; let the visual scene provide the **mood, atmosphere, and stage**.

3. ❌ **NO RAPID 2-SECOND VISUAL WHIPLASH**:
   - Avoid frantically flipping or changing scenes, cameras, or visual objects every 1.5–3 seconds for individual words or phrases.
   - Give scenes room to breathe, live, and create genuine musical atmosphere that matches the flow of the song.

---

## 🌟 The Scenic Worldbuilding Pillars

1. **🌲 Outdoor Landscape & Scenic Primacy**:
   - Construct expansive, breathtaking outdoor scenic environments aligned with the song's genre and emotional tone:
     - *Acoustic Ballads / Nostalgic Indie*: Misty pine-forested mountain passes at dawn; golden hour coastal bluffs with breaking ocean spray; secluded wildflower meadows with swaying tall grass under twilight skies; sun-warmed open stone terraces overlooking endless valley horizons.
     - *Soulful Sufi / Hindustani Ghazal*: Vast starlit celestial night skies over silent desert dunes; reflective midnight alpine lakes reflecting the moon and floating water lanterns; ancient open marble colonnades under open sky with silver moonlight.
     - *Cinematic Pop / Ambient Electronic*: Moody rain-drenched coastal highways with horizon light trails; misty river gorges bathed in soft aurora light; open-air architectural light plazas reflecting glowing skies on wet stone.
   - **Why Outdoor Primacy Matters**: Outdoor environments offer epic cinematic scale, natural lighting progression (dawn -> daylight -> golden hour -> dusk -> starlight), infinite depth of field, and generous chiaroscuro negative space where lyrical typography can breathe effortlessly. Closed indoor rooms and small tabletop objects are strictly avoided.

2. **Section-Driven Scene Architecture**:
   - Structure scenes by **musical sections** (e.g., Intro, Verse 1, Chorus 1, Verse 2, Chorus 2, Bridge / Instrumental Solo, Outro).
   - Each major section occupies a distinct outdoor scenic space or an evolving natural lighting/atmospheric state.
   - The chorus should feel like an atmospheric release or natural escalation (e.g., dawn breaks over the mountain ridge; lighting shifts from cool sapphire to warm radiant amber; golden water caustics ripple across the lake).

3. **Lyrical Display Sanctuary**:
   - The visual environment must be composed with intentional chiaroscuro negative space so typography has optimal contrast and readability.
   - Pair synchronized kinetic typography (champagne serif / Devanagari calligraphy) with soft couplet anticipation. The lyrics are the emotional center of the video.

4. **Living Environmental Micro-Motion & Audio Reactivity**:
   - Keep scenes alive with natural, continuous outdoor micro-motion: drifting mist, volumetric god-rays, shimmering water caustics, floating embers or pollen motes, gentle wind sway across trees and grass.
   - Audio reactivity affects outdoor elements: bass kicks pulse lighting bloom, horizon flares, or water ripples; vocal alaaps/melismas cause atmospheric haze to expand; snare hits motivate lighting contrast shifts.

---

## Required Pre-Production Artifact

Before code or rendering, create `src/songs/<slug>/visual-plan.md`. Structure the plan by musical sections using outdoor settings:

| Section & Time | Musical Energy & Dynamics | Outdoor Scenic Environment & Aesthetic Palette | Atmospheric & Lighting Elements | Audio-Reactive Behavior | Kinetic Typography & Framing |
| --- | --- | --- | --- | --- | --- |
| **Intro** (0:00–0:15) | Gentle acoustic intro, contemplative | Open clifftop stone terrace overlooking misty valley at dawn | Volumetric morning god-rays, floating amber dust motes | Ambient light breathes gently to guitar picking | Clean instrumental breathing (zero text) |
| **Verse 1** (0:15–0:45) | Intimate vocal entry, restrained rhythm | Winding mountain path through pine forest with deep cool sapphire shadows | Soft rolling ground mist, warm dawn keylight filtering through trees (komorebi) | Subtle light pulse on bass notes | Centered champagne Didone serif with italic couplet anticipation |
| **Chorus 1** (0:45–1:15) | Full drum kit kicks in, vocal lift | Majestic mountain summit horizon with breaking dawn sun | Golden hour sunrise flare, dissolving mist, radiant sky bloom | Bass kick triggers warm radial sunburst bloom | Illuminated high-contrast couplets with golden starlight glow |
| **Verse 2** (1:15–1:45) | Rhythmic groove, introspective | Glassy alpine lake at morning blue hour | Shimmering water caustics, soft wind ripples across water | Subtle caustic vibration on snare transient | Left-weighted negative space layout |
| **Chorus 2** (1:45–2:15) | Climax arrangement, soaring strings | Panoramic coastal bluff under blazing golden twilight | Floating starlight motes, sweeping lens flare, breaking surf | Bass kick drives horizon glow expansion | Maximum typographic scale and radiant aura |
| **Outro** (2:15–2:54) | Delicate acoustic fade, settling peace | Vast celestial twilight horizon over still water, stars emerging | Gentle rising embers, soft darkness encroaching | Soft light fade synced to acoustic decay | Pure visual immersion into velvety obsidian with PeerMusic badge |

---

## Minimum Quality Gate

Before delivery, inspect frames from the opening, one verse, one chorus, one transition, and the ending. Reject the render if any of these are true:

- ❌ Any human character, silhouette of a person, face, eye, ear, limb, or stick figure appears in the scene.
- ❌ The scene attempts to literally pantomime sung physical actions instead of setting an atmospheric environment.
- ❌ Scenes frantically change every 1.5–3 seconds, causing visual whiplash.
- ❌ The environment lacks continuous micro-motion or depth (e.g. flat vector on raw `#000000`).
- ❌ On-screen text contains anything other than the lyric and the permitted PeerMusic circular badge (no HUD, section tags, or translations).
- ❌ Typography is difficult to read due to poor scenic contrast or busy background placement.

---

## Implementation Contract

- Author separate, modular scene components under `src/songs/<slug>/scenes/` structured around musical sections.
- Keep every scene deterministic and authored at **60 FPS**.
- Ensure scenes feature deep lighting, rich atmospheric textures (`PaperTexture`, `FilmAtmosphere`, grain), and subtle camera drift (`CameraRig`).
- Dedicated release cover artwork remains an independent Remotion composition (`src/songs/<slug>/cover/`), never a raw screenshot of the video.
