export interface WordTiming {
  id: string;
  text: string;
  startFrame: number;
  endFrame: number;
  accent?: boolean;
}

export interface LineTiming {
  id: string;
  text: string;
  startFrame: number;
  endFrame: number;
  words: WordTiming[];
}

export const SAMPLE_10S_AUDIO = "audio/sample_10s_khumaar.mp3";
export const SAMPLE_COVER_IMAGE = "covers/khumaar_clean_16x9.png";
export const BRAND_LOGO_IMAGE = "branding/peermusic_badge.png";

// Exact 10-second sample lyrics (600 frames at 60fps)
export const SAMPLE_LYRICS: LineTiming[] = [
  {
    id: "line_01",
    text: "Aadhi si raat hai, khamosh yeh shehar hai,",
    startFrame: 0,
    endFrame: 316,
    words: [
      { id: "w1", text: "Aadhi", startFrame: 0, endFrame: 40, accent: true },
      { id: "w2", text: "si", startFrame: 40, endFrame: 79 },
      { id: "w3", text: "raat", startFrame: 79, endFrame: 118, accent: true },
      { id: "w4", text: "hai,", startFrame: 118, endFrame: 158 },
      { id: "w5", text: "khamosh", startFrame: 158, endFrame: 198, accent: true },
      { id: "w6", text: "yeh", startFrame: 198, endFrame: 237 },
      { id: "w7", text: "shehar", startFrame: 237, endFrame: 276, accent: true },
      { id: "w8", text: "hai,", startFrame: 276, endFrame: 316 },
    ],
  },
  {
    id: "line_02",
    text: "Tu saamne hai baithi, bas tera hi asar hai.",
    startFrame: 316,
    endFrame: 600,
    words: [
      { id: "w9", text: "Tu", startFrame: 316, endFrame: 350 },
      { id: "w10", text: "saamne", startFrame: 350, endFrame: 385, accent: true },
      { id: "w11", text: "hai", startFrame: 385, endFrame: 419 },
      { id: "w12", text: "baithi,", startFrame: 419, endFrame: 454 },
      { id: "w13", text: "bas", startFrame: 454, endFrame: 488 },
      { id: "w14", text: "tera", startFrame: 488, endFrame: 523, accent: true },
      { id: "w15", text: "hi", startFrame: 523, endFrame: 557 },
      { id: "w16", text: "asar", startFrame: 557, endFrame: 592, accent: true },
      { id: "w17", text: "hai.", startFrame: 592, endFrame: 600 },
    ],
  },
];
