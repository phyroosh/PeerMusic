export const VIDEO_CONFIG = {
  defaultFps: 30,
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
  colors: {
    background: "#0B0D14", // Deep Void Indigo
    primaryText: "#F5F4F0", // Ivory Milk
    accentAmber: "#FFB84C", // Warm Royal Amber (Chai Glow & Climax)
    mutedSlate: "#5A5D6E",  // Editorial Telemetry
    warmCream: "#EBE6DF",
    cardBorder: "rgba(255, 255, 255, 0.08)",
  },
  fonts: {
    heading: "'Space Grotesk', 'Inter', -apple-system, sans-serif",
    body: "'Inter', -apple-system, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
} as const;
