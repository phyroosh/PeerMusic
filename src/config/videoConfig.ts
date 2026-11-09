export const VIDEO_CONFIG = {
  // The agent must ask for (or infer from an explicit request) one of the three
  // official directions before rendering: Neon Pulse, Liquid Silk, or Narrative Film.
  defaultTheme: "UserSelectedVisualDirection",
  defaultFps: 60,
  highFps: 60,
  cinematicFps: 24,
  landscape: {
    width: 1920,
    height: 1080,
  },
  vertical: {
    width: 1080,
    height: 1920,
  },
  // Shared cinematic typography and contrast tokens for scene-driven lyric films.
  // A song cover may be one asset inside a scene, but is never the default video engine.
  songCover: {
    kenBurnsMinScale: 1.0,
    kenBurnsMaxScale: 1.06,
    driftRangePx: 18,
    ambientBreathingRate: 0.03,
    ambientBreathingAmp: 0.06,
    // Restrained starlight / cinematic drop shadow for pristine readability directly over artwork
    textShadow: "0 2px 14px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.75), 0 0 16px rgba(255, 230, 160, 0.35)",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.65)",
    // Feathered gradient scrim to elevate negative space contrast without cards or boxes
    scrimBottom: "linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.35) 45%, transparent 100%)",
    scrimTop: "linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.35) 45%, transparent 100%)",
  },
  // Celestial Eclipse (Cosmic Void & Golden Corona) Design Tokens
  celestial: {
    voidBg: "#030206",
    nebulaCenter: "#1A0D33",
    nebulaMid: "#080314",
    nebulaOuter: "#020106",
    coronaGold: "#FDE68A",
    coronaAmber: "#F59E0B",
    coronaPurple: "#C084FC",
    coronaViolet: "#A855F7",
    starGold: "#FDE68A",
    textPrimary: "#FAF5FF",
    textSecondary: "rgba(233, 213, 255, 0.45)",
    textShadow: "0 0 20px rgba(253, 230, 138, 0.65), 0 0 45px rgba(192, 132, 252, 0.38), 0 2px 10px rgba(0, 0, 0, 0.8)",
  },
  // Historical Aesthetic: Botanical Scrapbook (Herbarium) tokens
  colors: {
    background: "#EFE8DC",        // Oatmeal Kraft Paper
    paperCard: "#FAF6EE",         // Pressed Herbarium Cardboard Sheet
    cardBorder: "#D6CBBA",        // Card Border Stroke
    primaryText: "#2C261F",       // Deep Espresso Charcoal
    secondaryText: "#6B5E4D",     // Aged Walnut / Specimen Tag Pencil
    accentRose: "#8A2434",        // Dried Rose Petal Crimson
    accentFern: "#2A4436",        // Dried Botanical Olive-Fern Green
    washiTape: "#EADBBA",         // Japanese Translucent Washi Tape
    stampInk: "#2C3E50",          // Calcutta G.P.O. Vintage Stamp Ink
    gridLine: "#7A6F5D",          // Journal Ruled Grid
    marginRed: "#D9534F",         // Notebook Red Margin
    accentAmber: "#FFB84C",       // Warm Royal Amber
    mutedSlate: "#5A5D6E",        // Editorial Slate
    warmCream: "#FAF6EE",         // Warm Cream
  },
  fonts: {
    heading: "Georgia, 'Playfair Display', 'Times New Roman', serif",
    devanagari: "'Noto Serif Devanagari', 'Rozha One', 'Noto Sans Devanagari', serif",
    englishSerif: "'Georgia', 'Playfair Display', 'Times New Roman', serif",
    body: "'Inter', -apple-system, sans-serif",
    accent: "'Space Grotesk', sans-serif",
    tag: "'Courier New', monospace",
    mono: "'Courier New', monospace",
  },
} as const;

