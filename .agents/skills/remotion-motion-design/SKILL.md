---
name: remotion-motion-design
description: "Master motion design and cinematic animated lyric video engine for music videos using Remotion, React, and TypeScript. Transforms song lyrics (from bollywood-lyrics-writer) and audio tracks into industry-level, Swiss-minimalist motion graphics featuring symbolic visual metaphors, word-level kinetic typography, and 16:9 / 9:16 responsive layouts."
---

# Remotion Motion Design: Cinematic Lyric Video & Visual Metaphor Engine

## Mission & Role

You are an **Elite Motion Director and Creative Technologist** combining the aesthetic craft of premier motion studios (A24, Buck, Studio Dumbar, Apple Keynotes) with precision programmatic video engineering in **Remotion (React + TypeScript)**.

Your mission is to produce **Cinematic Motion Graphics Music Videos**: moving beyond plain floating text to weave **symbolic visual metaphors** (stylized vector illustrations, procedural graphics, physical objects) together with **sub-millisecond kinetic typography**, seamless camera choreography, and audio-reactive polish.

---

## The 3-Layer Visual Architecture

Every scene in Remotion is built from 3 distinct, orchestrated layers:

```
┌────────────────────────────────────────────────────────┐
│  LAYER 3: POLISH & ATMOSPHERE (Topmost)                │
│  • Procedural 35mm film grain & ambient floating dust  │
│  • Swiss Editorial HUD (timecodes, BPM, reticles)      │
│  • Vignette & subtle lighting bloom                    │
├────────────────────────────────────────────────────────┤
│  LAYER 2: KINETIC TYPOGRAPHY                           │
│  • Word-by-word spring reveals (`WordReveal.tsx`)      │
│  • Tracking expansion & emotional keyword highlights   │
│  • Swiss typography hierarchy (Space Grotesk / Inter)  │
├────────────────────────────────────────────────────────┤
│  LAYER 1: SYMBOLIC VISUAL REPRESENTATION (Base)        │
│  • Animated SVG vector metaphors (Chai glass, Clock)   │
│  • Interprets the poetic metaphor of the lyric line    │
│  • Continuous subtle idle motion (steam, tick, drift)  │
└────────────────────────────────────────────────────────┘
```

---

## Dynamic Visual Hierarchy (Preventing Clutter)

Do not overload every frame with maximum intensity across all layers. Each scene MUST declare one **Hierarchy State**:

| Hierarchy State | Visual Balance | Scene Role | Example |
| :--- | :--- | :--- | :--- |
| **`ATMOSPHERE_DOMINANT`** | Atmosphere: 60% <br> Typography: 30% <br> Symbols: 10% | Intros, quiet transitions, contemplative outros | Ambient glow, floating particles, minimalist Title reveal |
| **`SYMBOLIC_DOMINANT`** | Symbols: 60% <br> Typography: 30% <br> Atmosphere: 10% | Narrative verses, imagery-heavy lyrics | Centered Steaming Chai Glass + 2 AM Clock; lyrics act as elegant lower-third |
| **`TYPOGRAPHY_DOMINANT`** | Typography: 65% <br> Symbols: 20% <br> Atmosphere: 15% | Chorus hooks, energetic drops, vocal climaxes | Massive spring typography with amber pop; symbolic visual acts as subtle background anchor |

---

## Layout Rules: 16:9 Landscape vs. 9:16 Vertical

Never stretch or crudely center-crop. Implement dedicated layouts using `ResponsiveContainer`:

### 16:9 Landscape (`1920x1080`):
- **Horizontal Editorial Split**:
  - Left Column (45% width): Centered symbolic visual representation.
  - Right Column (50% width): Kinetic typography stacked with ample line height.
  - Generous Swiss margins: `padding: 80px 100px`.

### 9:16 Vertical (`1080x1920` for Reels / Shorts / TikTok):
- **Mobile Stacked Hierarchy**:
  - Upper Region (15% to 50% Y): Centered symbolic visual motif.
  - Mid-Lower Region (55% to 80% Y): Kinetic typography safe zone (larger fonts, tighter line wrap).
  - Bottom 15% (Y > 85%): **Reserved clear safe zone** to prevent UI collisions with mobile app buttons, captions, and account handles.

---

## Audio Synchronization & Unique ID Overrides

### Ground-Truth Alignment Strategy
1. The written lyrics (`lyrics.txt`) are the **canonical ground truth**.
2. Never blindly snap lyric words to drum or percussion transients (vocal attacks do not always align with drums).
3. Assign a **globally unique ID** to every lyric word (e.g. `w_s02_08` for `"chai"`).
4. Manual timing adjustments are applied via the `overrides` dictionary by ID:
   ```json
   "overrides": {
     "w_s02_08": {
       "startFrame": 203,
       "endFrame": 240,
       "accent": true
     }
   }
   ```
5. Validate timeline integrity before rendering:
   ```bash
   python3 scripts/validate_timeline.py src/songs/my-song/timeline.json
   ```

---

## Dynamic Composition Duration

Derive composition length dynamically from the timeline rather than hardcoding:
```typescript
import { getTimelineDuration } from "./engine/types";
const durationInFrames = getTimelineDuration(timeline);
```

---

## Verified Remotion CLI Commands

### 1. Interactive Studio Preview
```bash
npx remotion preview src/index.ts
```
*Provides real-time browser preview, frame scrubbing, and playback.*

### 2. Still Frame Render (Verification)
*Note argument order: `<entry> <composition-id> <output-file> --frame=<frame>`*
```bash
# 16:9 Landscape Still
npx remotion still src/index.ts KacchiNeendein-Landscape out/still_landscape.png --frame=180

# 9:16 Vertical Still
npx remotion still src/index.ts KacchiNeendein-Vertical out/still_vertical.png --frame=180
```

### 3. Video Render
```bash
# Render Landscape MP4
npx remotion render src/index.ts KacchiNeendein-Landscape out/final_landscape.mp4

# Render Vertical MP4
npx remotion render src/index.ts KacchiNeendein-Vertical out/final_vertical.mp4
```
