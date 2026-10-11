# Elite Visual Archetypes & Art Direction Guide

When designing music video motion in Manim, the AI agent **must select one locked visual archetype** matching the song's genre and emotional mood. Never mix conflicting aesthetic languages.

---

## 1. Swiss Brutalist Kinetic (Desi Hip-Hop / High-Energy Pop Anthem)
Best for: Energetic tracks, fast rap verses, dance hooks, punchy Hinglish.

- **Background:** Deep Obsidian (`#0D0E12`) or Raw Bone Chalk (`#F0EFEB`)
- **Primary Text:** Stark White (`#FFFFFF`) or Deep Jet (`#111111`)
- **Accent Color:** Acid Volt Lime (`#CCFF00`) or Razor Red (`#FF2A55`)
- **Muted Sub-elements:** Slate Gray (`#5A5D6E`) at 30% opacity
- **Typography Stack:**
  - Latin: *Cabinet Grotesk*, *Inter Black*, *Space Grotesk*
  - Devanagari: *Mukta ExtraBold*, *Noto Sans Devanagari 900*
- **Motion Grammar:**
  - High acceleration launches (`EASE_OUT_EXPO`)
  - Tight line heights (0.85) and massive scale jumps (words scaling from 36pt to 96pt on drops)
  - Horizontal & vertical whip-pan camera shifts between stanzas
  - Technical metadata HUD (timecodes, BPM counters, grid lines)

---

## 2. Cinematic Midnight & Sufi Soul (Playback Ballads / Heartbreak / Intimacy)
Best for: Soulful ghazals, Sufi ballads, acoustic playback, emotional Mukhdas.

- **Background:** Deep Void Indigo (`#0B0D14`) with subtle warm vignette
- **Primary Text:** Soft Ivory Milk (`#F5F4F0`)
- **Accent Color:** Warm Royal Amber / Zaffran (`#FFB84C`) or Dusty Rose (`#E08585`)
- **Atmosphere:** Warm floating embers / dust particles, soft focal depth blur
- **Typography Stack:**
  - Latin: *Cinzel*, *Playfair Display*, *Editorial New*, *Syne*
  - Devanagari: *Rozha One* (ornate high-contrast serif), *Noto Serif Devanagari*
- **Motion Grammar:**
  - Continuous imperceptible camera drift (`EASE_CINEMATIC`) — the frame is never completely static
  - Word reveals timed to sustained vocal vowels and alaap vibratos
  - Soft vertical lift (UP * 0.25) combined with gentle opacity blooms
  - Keywords hold in place while the rest of the stanza dissolves gently into the background

---

## 3. Neo-Techno Pulse & Cyber-Y2K (Modern Club / EDM / Drill-Fusion)
Best for: Synth-pop, club remixes, futuristic trap, driving basslines.

- **Background:** Void Purple (`#08040E`)
- **Primary Text:** Crisp Pure White (`#FFFFFF`)
- **Accent Colors:** Electric Cyan (`#00F5FF`) and Laser Magenta (`#FF007A`)
- **Overlays:** Monospaced coordinate reticles, audio-reactive waveform bars, corner timestamps
- **Typography Stack:**
  - Latin: *JetBrains Mono*, *Space Grotesk*, *Druk Wide*
  - Devanagari: *Yatra One*, *Tiro Devanagari*
- **Motion Grammar:**
  - Rapid staggered reveals (0.04s per word)
  - Scale punch with overshoot (`EASE_OVERSHOOT`) snapped to kick drums and snares
  - Rapid tracking/kerning expansions on sustained notes
  - Instant snap camera transitions

---

## 4. Organic Monsoon & Acoustic Nostalgia (Indie Folk / Monsoon Longing)
Best for: Acoustic guitar ballads, ukulele indie, rainy nostalgia, intimate storytelling.

- **Background:** Warm Muted Khaki / Vintage Paper (`#F3EFE6`) or Deep Forest Slate (`#1A2421`)
- **Primary Text:** Espresso Charcoal (`#1F1B18`) or Soft Cream (`#EBE6DF`)
- **Accent Color:** Terracotta Clay (`#C85A32`) or Sage Moss (`#7A9A7B`)
- **Atmosphere:** Subtle film texture, handmade line accents, generous 60% negative space
- **Typography Stack:**
  - Latin: *Lora*, *Fraunces*, *Syne*
  - Devanagari: *Kalam*, *Rozha One*, *Halant*
- **Motion Grammar:**
  - Organic breathing easing (`EASE_SPRING`)
  - Underline strokes that draw smoothly beneath key emotional words
  - Smooth vertical scroll like a physical poetry collection
  - Gentle lateral parallax drift between background elements and foreground lyrics

---

## Golden Ratio Layout Rules

1. **The 60-30-10 Rule:**
   - 60% Negative Space / Ambient Background
   - 30% Primary Typographic Structure
   - 10% High-Contrast Accent / Highlighting
2. **Safe Framing Boundaries:**
   - Always leave at least `1.2` units of padding from all 4 screen edges in Manim coordinates.
   - For 9:16 vertical videos (Reels/Shorts), confine all typography within `width = 5.5` to ensure zero crop on mobile devices.
3. **Typographic Hierarchy:**
   - Primary Lyric Line: 48pt – 64pt
   - Secondary / Subtitle Line: 24pt – 32pt
   - Editorial HUD / Metadata: 12pt – 16pt (Opacity 0.2 – 0.3)
