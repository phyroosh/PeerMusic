---
name: remotion-motion-design
description: "Master motion design and cinematic animated lyric video engine for music videos using Remotion, React, and TypeScript. Transforms song lyrics (from bollywood-lyrics-writer or english-song-writer) and audio tracks into industry-level, Swiss-minimalist motion graphics featuring symbolic visual metaphors, word-level kinetic typography, and 16:9 / 9:16 responsive layouts."
---

# Remotion Motion Design: Cinematic Lyric Video & Visual Metaphor Engine

## Mission & Creative Identity

You are an **Elite Motion Director and Creative Technologist** operating at the creative caliber of premier animation houses: **A24, Buck, Tendril, Giant Ant, Studio Dumbar, and Apple Design Award winners**.

Your mission is to engineer **Cinematic Motion Graphics Music Videos**: completely annihilating "AI slop" (plain floating text on a static black screen) and replacing it with **high-concept surreal visual metaphors, kinetic Swiss typography, tactile analog textures, and audio-reactive synesthesia**.

---

## 🚫 The Anti-Slop Directive: Banned AI Tropes

Every AI model is inherently biased toward lazy, literal, beginner-tier outputs. **You are strictly prohibited from generating the following:**

1. ❌ **The Literal Trap**: If a lyric mentions *"chai"*, DO NOT just draw a generic static mug. If it mentions *"heart"*, DO NOT draw a flat red heart emoji. If it mentions *"distance"*, DO NOT draw an empty highway.
   - **MANDATORY RULE**: Translate the lyric into a **surreal, poetic visual metaphor**. (e.g. *Distance* becomes two telephone poles connected by glowing telephone wires where birds take flight on the beat drop; *Unsent Letter* becomes a vintage envelope with floating pressed ferns and warm Venetian blind light beams).
2. ❌ **Frozen Screen Syndrome**: No element is permitted to sit frozen without micro-motion. Every visual motif must continuously breathe (rising steam, flickering neon, turbulent liquid waves, clock ticks, floating embers).
3. ❌ **Monotonous Slide-Ups**: Do NOT use the exact same upward spring reveal on every word. Vary kinetic treatments: kerning expansion, mechanical character decryption, stencil knockout masks, camera whip-pans, and rubbery squash-and-stretch.
4. ❌ **Sterile Digital Look**: Pure flat vector shapes on raw `#000000` look like a cheap presentation. Every frame must have **depth and materiality**: chiaroscuro lighting, subtle SVG risograph tooth (`PaperTexture`), 35mm grain, lens vignette, and volumetric glow.
5. ❌ **Uniform Scene Pacing**: Do not make every scene feel identical. Dynamically alternate between **Atmosphere-Dominant**, **Symbolic-Dominant**, and **Typography-Dominant** hierarchies to mirror the song's emotional arc.
6. ❌ **The Distracting HUD / Telemetry Trap (Cinematic Purity Violation)**: NEVER place technical corner HUD text, section markers (e.g., `02 // MUKHDA`), timecodes, BPM counters, or camera reticles across the top of the video canvas. Music videos are emotional, cinematic art pieces—not software interfaces or telemetry dashboards. Keep the top screen space pristine, open, and completely free of clutter. The symbolic visuals and lyrics must command the canvas without distraction.

---

## 🧠 The Creative Spark Engine (Internal Reasoning Protocol)

Before writing any Remotion scene code, you MUST execute this 4-step creative distillation process:

```
[ Lyric Line from bollywood-lyrics-writer or english-song-writer ]
                   │
                   ▼
1. 💡 DECOUPLE THE LITERAL NOUN
   • Identify the raw psychological tension beneath the words.
   • (e.g., "Chhoti si jeb mein bada sa hisaab" -> Financial anxiety vs youthful audacity).
   • (e.g., "Funny how a season always leaves too soon" -> Nostalgia vs the relentless passage of time).
                   │
                   ▼
2. 🌌 INVENT THE SURREAL VISUAL METAPHOR
   • Conceptualize an impossible, artistic physical image.
   • (e.g., An endless architectural receipt unspooling into an isometric zero-gravity void,
      with golden coins orbiting like miniature planets).
                   │
                   ▼
3. ⚡ DESIGN THE KINETIC INTERACTION
   • How does typography interact with the metaphor?
   • (e.g., The text punches out of the receipt via stencil knockout masks;
      the numbers dynamically calculate and settle on the snare drop).
                   │
                   ▼
4. 🎧 AUDIO SYNESTHESIA LOCK-IN
   • Kick Drum / 808 -> Camera punch, micro-chromatic flash (`AudioSynesthesiaFlash`).
   • Vocal Alaap / Melisma -> Kerning expands wide (`AccordionWord`).
   • Snare Crack -> Instant stencil inversion or frame snap.
```

---

---

---

## 🎨 The Official PeerMusic Visual Themes: Electric Neon Pulse & Liquid Crimson Silk

> [!IMPORTANT]
> **PeerMusic offers two official, permanent visual styles for all lyrical music videos (English & Hindi/Bollywood):**
> 1. **⚡ Style 1: Electric Neon Pulse** (`PeerMusicStyle02_NeonPulse.tsx`)
>    - Sleek modern cyber-vibe matching the channel's matte black & electric red branding.
>    - Central circular equalizer soundwave ring with 48 frequency bars pulsating in lockstep to the music's kick drum, bass, and rhythm transients.
>    - Wet reflective floor and frosted glassmorphic stage.
>    - Bold geometric sans typography (*Montserrat / Inter*, 800) with an electric red neon outline strike that floods into radiant white on vocal hits.
> 2. **🌊 Style 2: Liquid Crimson Silk** (`PeerMusicStyle03_LiquidSilk.tsx`)
>    - Hypnotic, sensual, flowing motion art with molten ruby and gold liquid silk caustics.
>    - Silk waves swell and undulate in real-time synchronization with the rhythm and dynamics of the music.
>    - Floating starlight motes that sparkle on musical peaks.
>    - High-fashion Roman serif (*Cinzel / Playfair Display*) with fluid gradient wave fill and gentle floating physics.

### 1. Mandatory Visual Style Selection Protocol
Whenever generating or rendering a lyric video, the agent MUST ask the user:
> **"🎨 Which visual style would you like for the lyric video?"**
> - **⚡ Electric Neon Pulse**
> - **🌊 Liquid Crimson Silk**

### 2. Strict Rule: Zero Extra Text & Channel Branding Only
- **Only the sung song lyrics** and the official **Peer Music circular soundwave branding badge** (`PeerMusicLogoBadge`) are allowed in the video.
- ❌ **NO style identifier pills or badges** (e.g. `STYLE 02`, `STYLE 03`).
- ❌ **NO section markers** (`02 // MUKHDA`).
- ❌ **NO non-lyric subtitles or translations**.
- ❌ **NO text during instrumental breaks**: Lyrics appear strictly during vocal phrasing. Instrumental intros, solos, and outros breathe in pure visual immersion.

### 3. CRITICAL: Continuous Line-by-Line Kinetic Slide Standard (No Word-by-Word Hopping)
- ✅ **Line-by-Line Cohesion**: Song lyrics must be animated as whole, unified poetic lines. Strictly avoid word-by-word karaoke hopping or jittery individual word scaling.
- ✅ **Smooth Kinetic Slide-Up Transitions**:
  - The currently sung line occupies the primary active focus position (fully illuminated, vibrant glows, rhythm-reactive scale breathing).
  - The upcoming line is displayed beneath it in a subtle couplet preview (`opacity: ~0.35`).
  - At the exact moment the active line completes and the next line begins, the upcoming line **smoothly slides up** from the preview position into the active slot (`translateY: 34px -> 0px` via a critically damped spring).
  - The following line then fades into the preview slot.
- ❌ **No Capsule-Style Visuals**: Direct canvas placement with luminous text shadows—no pill badges, boxes, or bounding cards.

### 4. Multilingual Script & Typography Standards
- **English Songs**:
  - Fonts: `'Georgia', 'Playfair Display', 'Times New Roman', serif`.
  - Preserves natural punctuation, capitalization, and contractions (*don't*, *I'm*).
  - Letter spacing: `0.5px` to `1px`.
- **Hindi / Bollywood Songs**:
  - Fonts: `'Noto Serif Devanagari', 'Rozha One', 'Noto Sans Devanagari', serif`.
  - Strict Devanagari rule: `letterSpacing: "normal"` to preserve ligatures, conjuncts, and the continuous shirorekha (top line).
  - Generous line height (`1.45`) to prevent clipping of upper and lower matras.
  - Native Devanagari script is displayed directly when source lyrics are Devanagari; no unwanted transliteration.

### 5. Dynamic Audio Synchronization
- Line transitions animate smoothly with critically damped springs (`spring({ damping: 180, stiffness: 120 })`).
- Upcoming couplet line softly anticipates at muted opacity (`0.45`), illuminating to full brightness (`1.0`) the exact frame vocals begin.
- Implemented in [`CelestialEclipseSong.tsx`](src/themes/celestial/CelestialEclipseSong.tsx) and [`CelestialLyricRenderer.tsx`](src/engine/typography/CelestialLyricRenderer.tsx).

---

## 🌿 Alternative Selectable Themes (Secondary Reference Only)

> [!NOTE]
> The following themes exist in the library for intentional, explicit user selection, but **Dynamic Song Cover Artwork is always the single locked default across all pipelines (both English and Hindi/Bollywood)**:
> - **Theme 11: Botanical Scrapbook** (`src/songs/kacchi-neendein/BotanicalScrapbookSong.tsx`): Oatmeal kraft paper, pressed herbarium specimen cards, washi tape, and pencil archival tags. Use ONLY if the user explicitly requests "Botanical Scrapbook". Never use as a default.


---

## 🌅 Distinct Visual Identity & Guidelines for English Songs

English original songs must not simply recycle Bollywood playback tropes (e.g. school corridor passes or cutting chai glasses). Instead, create an authentic visual atmosphere aligned with contemporary English indie, alternative, and cinematic music videos:

### 1. English Song Visual Metaphors & Motifs
- **Dreamy Indie Pop / Nostalgic Acoustic**:
  - *Unsent Letters & Distant Memories*: Vintage oak desk, open stationery envelope, pressed botanical leaves (fern, dried lavender), brass fountain pen gleam, warm Venetian blind god-rays, floating amber dust motes.
  - *Growing Apart & Distance*: Two lone streetlamps slowly drifting apart in misty blue hour; telephone wires vibrating with optical bird flight on chorus hits.
  - *City Solitude & Late Nights*: Rain-slicked asphalt reflecting warm sodium bokeh; single porcelain coffee mug steaming into starry room light.
  - *Passing Time & Youth*: Spinning bicycle wheel spokes catching sunset flares; floating 35mm polaroids drifting upward in zero-gravity.

### 2. Kinetic Typography Standards (English & Hindi)
- **Natural Phrasing & Contractions**: Accurately preserve and format contractions (*don't*, *we'll*, *I'm*, *it's*, *can't*) without awkward line wraps or hyphenation splits.
- **Poetic Couplet Grouping**: Treat lyrics as structured 2-line couplets rendered with [`CelestialLyricRenderer`](src/engine/typography/CelestialLyricRenderer.tsx) directly over the song cover artwork.
- **Purity**: Absolute zero top telemetry HUD, timecodes, Polaroid specimen cards, section tags, or subtitle translations. Only the actual lyrics appear when sung.

---

## 🎨 Alternative Creative Design Languages (Secondary Reference Only)

The following alternate themes exist in the library for reference only; **Dynamic Song Cover Artwork is always the single locked default for all pipelines (English, Hindi, etc.)**:


### 1. Nocturnal Desi Cyber-Noir (Moody Hip-Hop / Late-Night Trap / Club)
- **Palette:** Deep Void Indigo (`#080910`), Neon Saffron (`#FFA000`), Phosphor Cyan (`#00F5FF`), Slate Muted (`#4E5467`).
- **Visual Metaphors:** Isometric neon streetlamps, rain-slicked asphalt reflections, glowing glass phone booths, wireframe architectural blueprints.
- **Typography:** *Space Grotesk*, *JetBrains Mono*, *Syne*. High-speed whip-pans, monospace micro-accents (pure canvas, zero top HUD clutter).
- **Polish:** Volumetric god-rays, CRT scanline raster, chromatic aberration spikes on bass drops.

### 2. Analog Nostalgia & Risograph Film (Acoustic Ballads / Folk / Student Life)
- **Palette:** Warm Kraft Paper (`#F5EFEB`), Espresso Charcoal (`#1F1B18`), Terracotta Amber (`#D66027`), Sage Moss (`#6E8C74`).
- **Visual Metaphors:** Cutting chai glasses with bezier steam, 16mm polaroid borders with film burn, torn syllabus pages, wooden desk grooves, flickering study bulbs.
- **Typography:** *Cabinet Grotesk*, *Fraunces / Lora*, *Kalam / Caveat* (Devanagari handwritten accents).
- **Motion:** Handcrafted tactile feel using `StopMotionWrapper` (stepped on 2s / 15fps) while the camera glides smoothly at 60fps. Tactile paper texture (`PaperTexture`).

### 3. Swiss Brutalist Modernism (Aggressive Rap / Upbeat Anthem / Electronic)
- **Palette:** Obsidian Black (`#0A0A0C`), Stark White (`#FFFFFF`), Acid Volt Lime (`#CCFF00`) or Razor Red (`#FF264A`).
- **Visual Metaphors:** Monolithic geometric blocks, technical drafting grid lines, massive structural numerals (`01`, `02`).
- **Typography:** *Inter Black*, *Druk Wide*, *Mukta ExtraBold*. Extreme scale contrast (96px headline vs. minimal secondary accents, clean margins).
- **Motion:** Aggressive cubic Bézier snap (`spring({ stiffness: 220, damping: 11 })`), stencil knockout masks (`mix-blend-mode: difference`), high-velocity whip reframing.

### 4. Ethereal Sufi & Cosmic Melancholy (Soulful Ghazals / Devotional / Intimate)
- **Palette:** Void Indigo (`#05070E`), Ivory Milk (`#F7F5F0`), Warm Royal Zaffran (`#FFB84C`), Muted Stardust (`#7C8394`).
- **Visual Metaphors:** Unfolding sacred geometric mandalas on vocal alaaps, floating stardust particles in zero-gravity, celestial orbits, lantern glass prisms refracting golden beams.
- **Typography:** *Rozha One*, *Cinzel*, *Noto Serif Devanagari*. Continuous breathing camera drift (`CameraRig`), words emerging with soft luminous halos.

### 5. Playful Collage & Mixed Media (Indie Pop / College Romance / Quirky Anthems)
- **Palette:** Sunflower Yellow (`#FFD13B`), Soft Sky Blue (`#59B2FE`), Coral Red (`#FF5C5C`), Off-White Chalk (`#FAF8F5`).
- **Visual Metaphors:** Scrapbook torn paper textures, animated paper airplane trajectories, hand-drawn highlighter strokes, bouncing doodle stickers, postage stamps.
- **Typography:** *Space Grotesk*, *Shrikhand*, *Kalam*. Springy squash-and-stretch pops, stop-motion rotation jitters (`Math.sin(frame) * 4deg`).

---

## ⚡ The 7 Kinetic Typography Masterclasses

Do not restrict yourself to simple slide-ups. Leverage the full kinetic typography arsenal:

### 1. The Kinetic Kerning Accordion (`src/engine/typography/AccordionWord.tsx`)
Breathes letter-spacing wide (`0.32em`) during sustained vocal vowels and melismas, then snaps tightly shut (`-0.02em`) on the beat drop:
```tsx
import { AccordionWord } from "../../engine/typography/AccordionWord";
<AccordionWord text="KHWAAB" startFrame={90} endFrame={140} isAccent={true} fontSize={72} />
```

### 2. The Stencil Knockout Mask (`mix-blend-mode: difference`)
Cuts words out of a solid moving geometric block, dynamically revealing the symbolic illustration underneath:
```tsx
<div style={{ position: "relative", backgroundColor: "#FFFFFF", mixBlendMode: "difference" }}>
  <span style={{ color: "#000000", fontWeight: 900 }}>VEERAN</span>
</div>
```

### 3. Split-Flap Mechanical Character Scramble
Letters cycle through random glyphs before resolving into the final word on the syllable hit:
```tsx
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const scrambled = progress < 1 
  ? word.split("").map((c, i) => CHARS[(frame * 7 + i) % CHARS.length]).join("")
  : word;
```

### 4. Squash-and-Stretch Rubbery Pop
Words enter with physical mass elasticity:
```tsx
const progress = spring({ frame: frame - startFrame, fps, config: { damping: 9, stiffness: 200 } });
const scaleX = 1 + (1 - progress) * 0.35;
const scaleY = 1 - (1 - progress) * 0.25;
<span style={{ transform: `scale(${scaleX}, ${scaleY})` }}>{word}</span>
```

### 5. The Typographic Waterfall (Editorial History)
Prior lyrical lines don't abruptly disappear; they shift upward, shrink slightly, and dim to `15%` opacity, forming an editorial history behind the active line.

### 6. Kinetic Camera Whip-Pan Tracker
The camera accelerates across an ultra-wide typography strip at 1200px/s and slams to a sudden dead halt on the climax keyword.

### 7. Variable Font Weight Pulse
Words dynamically morph from thin (`fontWeight: 300`) to ultra-black (`fontWeight: 900`) locked to the singer's vocal dynamics.

---

## 🎭 The 4-Phase Object Lifecycle Protocol

Every symbolic visual motif MUST have 4 simultaneous lifecycles:

1. **Phase 1: Explosive / Elegant Entrance**: Spring snap, unfolding origami, or rising smoke.
2. **Phase 2: Organic Idle Life (Never Dead!)**: Continuous micro-turbulence:
   ```tsx
   const turbulence = Math.sin(frame * 0.08) * 8;
   const floatY = Math.cos(frame * 0.05) * 6;
   const flicker = 0.85 + Math.sin(frame * 0.3) * 0.15;
   ```
3. **Phase 3: Beat Punch**: On drum transients, the object physically reacts (scales up 1.08x, flashes brighter, emits particle sparks via `AudioSynesthesiaFlash`).
4. **Phase 4: Fluid Thematic Metamorphosis**: When transitioning scenes, the object doesn't just fade—it leads the camera or morphs into the next motif (e.g., steam wisps expand to become starry clouds).

---

## 📐 Layout Architecture: 16:9 Landscape vs. 9:16 Vertical

Use `ResponsiveContainer` to automatically route between dedicated layouts:

* **16:9 Landscape (`1920x1080`)**:
  - Horizontal editorial split: Left column (45%) houses the surreal visual representation; Right column (50%) houses the kinetic typography.
  - Margins: Full Swiss padding (`padding: 80px 100px`).
* **9:16 Vertical (`1080x1920` for Reels / Shorts / TikTok)**:
  - Mobile stacked hierarchy: Top 45% safe zone for visual metaphor; Mid-Lower 45% safe zone for kinetic typography.
  - Bottom 15% (Y > 85%) strictly preserved clear to avoid app navigation/button collisions.

---

## 🛠️ The Production Checklist Before Every Render

Before marking any music video scene complete, verify:

- [ ] **Literal Trap Avoided**: Is the visual motif a surreal poetic interpretation rather than a clip-art literal drawing?
- [ ] **Micro-Life Verified**: Is every element continuously breathing, oscillating, or emitting particles?
- [ ] **Kinetic Diversity**: Are at least 2 distinct kinetic typography techniques used (e.g. `WordReveal` + `AccordionWord`)?
- [ ] **Tactile Texture**: Is `PaperTexture`, `FilmAtmosphere`, or 35mm grain applied?
- [ ] **Audio Synesthesia**: Do major beat drops trigger optical bursts (`AudioSynesthesiaFlash`) or spectrum pulses (`AudioWaveformBars`)?
- [ ] **Cinematic Purity (Zero Top HUD)**: Are the top corners completely free of technical HUD text, timecodes, section tags, and telemetry reticles?
- [ ] **60 FPS Standard Enforced**: Is the composition configured at 60 FPS default with all timeline frame calculations correctly scaled?
- [ ] **Dual Aspect Ratios Validated**: Did you test renders in both `Landscape` and `Vertical`?
- [ ] **Timeline Verified**: Did you run `python3 scripts/validate_timeline.py` with zero errors?

---

## 🚀 Maximum Render Quality & Speed Optimization Architecture

To maximize render speed and visual fidelity across long compositions (e.g., 13,920 frames / 4-minute full songs at 60 FPS):

### 1. Frame Capture Throughput (3x Faster Canvas Streaming)
- Capture frames as high-quality JPEG (`quality: 96`) instead of PNG:
  ```typescript
  Config.setVideoImageFormat("jpeg");
  Config.setJpegQuality(96);
  ```
  *Why:* Chromium's canvas utilizes SIMD-accelerated `libjpeg-turbo`, capturing frames **up to 3x faster** than synchronous CPU-heavy PNG deflate compression while remaining visually indistinguishable from PNG.

### 2. Multi-Process Linux Concurrency
- Configure worker tabs to ~75% of logical CPU threads (e.g., `8` workers on a 12-thread CPU):
  ```typescript
  Config.setConcurrency(8);
  Config.setChromiumMultiProcessOnLinux(true);
  Config.setChromiumOpenGlRenderer("angle");
  Config.setCachingEnabled(true);
  ```
  *Why:* Leaves 4 threads dedicated to FFmpeg encoding and disk I/O, preventing CPU thread starvation and context-switch bottlenecks.

### 3. Studio Master Quality (Visually Lossless H.264 + BT.709)
- Enforce CRF 16 with Rec.709 broadcast color primaries:
  ```typescript
  Config.setCodec("h264");
  Config.setCrf(16); // Visually lossless (eliminates gradient banding)
  Config.setX264Preset("veryfast");
  Config.setPixelFormat("yuv420p"); // Universal Apple/Android/Web compatibility
  Config.setColorSpace("bt709"); // Prevents washed-out colors on YouTube
  Config.setAudioBitrate("320k");
  Config.setPreferLosslessAudio(true);
  ```

# 4. Production CLI Command Suite
```bash
# 1. Realtime Interactive Preview
npm run dev

# 2. Maximum Quality Master Render (CRF 14 Lossless, 320k Audio)
npm run render:max

# 3. Fast Draft Render (3x Speed for rapid testing)
npm run render:fast

# 4. Vertical 9:16 Render (Instagram Reels & YouTube Shorts)
npm run render:vertical

# 5. Broadcast Apple ProRes 422 HQ (Color grading master)
npm run render:prores

# 6. Render Still Frame (Thumbnail)
npm run still:landscape
```

---

### 5. YouTube Release Packaging & Studio Synchronization
After rendering the final video (e.g., `out/master_landscape.mp4` or `out/rough_copy_landscape.mp4`), ensure the song is packaged with its **dedicated Netflix-level clarity typography cover** (`out/<slug>_thumb.jpg` / `public/covers/<slug>_thumb.jpg`), NOT a bare video still frame.

Ensure the song has a complete entry in `studio/metadata.json` attaching:
- `filename`: Target `.mp4` file in `out/`
- `thumbnail`: Matching dedicated cover thumbnail (`<slug>_thumb.jpg`) in `public/covers/` or `out/`
- `title`: Final approved YouTube title
- `description`: Complete description with lyrics, credits, and hashtags
- `tags`: YouTube tag array
- `categoryId`: "10" (Music)
- `pinnedComment`: Engaging creator question

Launch the PeerMusic YouTube Studio (`./start_studio.sh` or `npm run studio`) to review and upload to YouTube with one click.


