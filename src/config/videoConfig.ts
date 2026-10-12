export const VIDEO_CONFIG = {
  defaultTheme: "BotanicalScrapbook",
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
  // Default Aesthetic: Botanical Scrapbook (Herbarium) with full design system tokens
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
    heading: "Georgia, 'Times New Roman', serif",
    body: "'Inter', -apple-system, sans-serif",
    accent: "'Space Grotesk', sans-serif",
    tag: "'Courier New', monospace",
    mono: "'Courier New', monospace",
  },
} as const;

