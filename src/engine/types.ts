export type HierarchyState =
  | "ATMOSPHERE_DOMINANT"
  | "SYMBOLIC_DOMINANT"
  | "TYPOGRAPHY_DOMINANT";

export interface LyricWord {
  id: string; // Globally unique identifier for every word (e.g. "w_sc02_chai")
  text: string;
  startFrame: number;
  endFrame: number;
  accent?: boolean;
  color?: string;
}

export interface LyricLine {
  id: string;
  text?: string;
  words: LyricWord[];
}

export interface SceneConfig {
  id: string;
  name: string;
  sectionTag: string; // e.g. "01 // INTRO", "02 // MUKHDA"
  startFrame: number;
  endFrame: number;
  hierarchy: HierarchyState;
  symbolKey?: string;
  lines: LyricLine[];
}

export interface WordOverride {
  startFrame?: number;
  endFrame?: number;
  accent?: boolean;
  color?: string;
}

export type TimelineOverrides = Record<string, WordOverride>;

export interface TimelineData {
  songTitle?: string;
  audioFile?: string;
  fps: number;
  bpm?: number;
  scenes: SceneConfig[];
  overrides?: TimelineOverrides;
}

/**
 * Derives the exact total composition duration in frames dynamically
 * from the maximum endFrame of all scenes.
 */
export function getTimelineDuration(timeline: TimelineData): number {
  if (!timeline.scenes || timeline.scenes.length === 0) {
    return 300;
  }
  return Math.max(...timeline.scenes.map((scene) => scene.endFrame));
}
