import { LyricLine, SceneConfig } from "./types";

export interface LineBounds {
  startFrame: number;
  endFrame: number;
}

export const getLineBounds = (line: LyricLine): LineBounds | null => {
  if (line.words?.length) {
    const minWord = Math.min(...line.words.map((w) => w.startFrame));
    const maxWord = Math.max(...line.words.map((w) => w.endFrame));
    return {
      startFrame: typeof line.startFrame === "number" ? Math.min(line.startFrame, minWord) : minWord,
      endFrame: typeof line.endFrame === "number" ? Math.max(line.endFrame, maxWord) : maxWord,
    };
  }

  if (typeof line.startFrame === "number" && typeof line.endFrame === "number") {
    return {
      startFrame: line.startFrame,
      endFrame: line.endFrame,
    };
  }

  return null;
};

export interface TimedLyricLine {
  line: LyricLine;
  bounds: LineBounds;
}

// Module-level WeakMap cache to eliminate thousands of redundant allocations per render
const timedLinesCache = new WeakMap<SceneConfig[], TimedLyricLine[]>();

/**
 * Returns all timed lines from scenes sorted by startFrame, with overlap elimination.
 */
export const getAllTimedLines = (scenes: SceneConfig[]): TimedLyricLine[] => {
  const cached = timedLinesCache.get(scenes);
  if (cached) return cached;

  const rawLines = scenes
    .flatMap((scene) => scene.lines || [])
    .map((line) => {
      const bounds = getLineBounds(line);
      return bounds ? { line, bounds } : null;
    })
    .filter((entry): entry is TimedLyricLine => entry !== null)
    .sort((a, b) => a.bounds.startFrame - b.bounds.startFrame);

  // Enforce strict chronological order with zero premature onset: Line N+1 must NEVER start before Line N ends
  const sanitizedLines: TimedLyricLine[] = [];
  let minAllowedStart = 0;
  for (let idx = 0; idx < rawLines.length; idx++) {
    const entry = rawLines[idx];
    const sFrame = Math.max(entry.bounds.startFrame, minAllowedStart);
    const eFrame = Math.max(sFrame + 1, entry.bounds.endFrame);
    sanitizedLines.push({
      ...entry,
      bounds: {
        startFrame: sFrame,
        endFrame: eFrame,
      },
    });
    minAllowedStart = eFrame;
  }

  timedLinesCache.set(scenes, sanitizedLines);
  return sanitizedLines;
};

export interface TimedCouplet {
  first: TimedLyricLine;
  second?: TimedLyricLine;
  bounds: LineBounds;
}

// Module-level WeakMap cache for couplets
const timedCoupletsCache = new WeakMap<SceneConfig[], TimedCouplet[]>();

/**
 * Returns all timed lines grouped into 2-line couplets for continuous stanza readability.
 * If adjacent lines are within 150 frames (2.5s), they form a natural couplet pair.
 */
export const getAllTimedCouplets = (scenes: SceneConfig[]): TimedCouplet[] => {
  const cached = timedCoupletsCache.get(scenes);
  if (cached) return cached;

  const timedLines = getAllTimedLines(scenes);
  const couplets: TimedCouplet[] = [];

  let i = 0;
  while (i < timedLines.length) {
    const first = timedLines[i];
    const second = timedLines[i + 1];

    const canPair = Boolean(
      second &&
      second.bounds.startFrame >= first.bounds.startFrame &&
      second.bounds.startFrame - first.bounds.endFrame <= 150
    );

    if (canPair && second) {
      couplets.push({
        first,
        second,
        bounds: {
          startFrame: first.bounds.startFrame,
          endFrame: Math.max(first.bounds.endFrame, second.bounds.endFrame),
        },
      });
      i += 2;
    } else {
      couplets.push({
        first,
        second: undefined,
        bounds: {
          startFrame: first.bounds.startFrame,
          endFrame: first.bounds.endFrame,
        },
      });
      i += 1;
    }
  }

  timedCoupletsCache.set(scenes, couplets);
  return couplets;
};

export interface ActiveLyricState {
  activeLine?: LyricLine;
  nextLine?: LyricLine;
  activeBounds?: LineBounds;
  isSinging: boolean;
  isAnticipating: boolean;
  progress: number; // 0 to 1 smooth progress while singing
  activeLineIndex?: number;
  lineStartFrame?: number;
  lineEndFrame?: number;
}

/**
 * Selects the active lyric line, next upcoming line, and illumination state for the current frame.
 * Guarantees ZERO DELAY on line onset: every line transitions cleanly line-by-line as sung,
 * sliding up into active focus without couplet freezes or premature stalls.
 */
export const getActiveAndNextLyricLines = (
  scenes: SceneConfig[],
  frame: number,
  anticipationFrames = 45,
  holdFrames = 25
): ActiveLyricState => {
  const timedLines = getAllTimedLines(scenes);
  if (timedLines.length === 0) {
    return { isSinging: false, isAnticipating: false, progress: 0 };
  }

  // 1. Direct singing check: Is the current frame within any line's active sung duration?
  for (let i = 0; i < timedLines.length; i++) {
    const timed = timedLines[i];
    if (frame >= timed.bounds.startFrame && frame < timed.bounds.endFrame) {
      const nextTimed = timedLines[i + 1];
      const duration = Math.max(1, timed.bounds.endFrame - timed.bounds.startFrame);
      const progress = Math.min(1, Math.max(0, (frame - timed.bounds.startFrame) / duration));

      return {
        activeLine: timed.line,
        nextLine: nextTimed?.line,
        activeBounds: timed.bounds,
        isSinging: true,
        isAnticipating: false,
        progress,
        activeLineIndex: i,
        lineStartFrame: timed.bounds.startFrame,
        lineEndFrame: timed.bounds.endFrame,
      };
    }
  }

  // 2. Post-singing hold: During short breath pauses, hold the current line until next line's anticipation begins
  for (let i = timedLines.length - 1; i >= 0; i--) {
    const timed = timedLines[i];
    const nextTimed = timedLines[i + 1];
    const nextAnticipation = nextTimed ? nextTimed.bounds.startFrame - anticipationFrames : Infinity;
    const maxHold = Math.min(timed.bounds.endFrame + holdFrames, nextAnticipation);

    if (frame >= timed.bounds.endFrame && frame < maxHold) {
      return {
        activeLine: timed.line,
        nextLine: nextTimed?.line,
        activeBounds: timed.bounds,
        isSinging: false,
        isAnticipating: false,
        progress: 1,
        activeLineIndex: i,
        lineStartFrame: timed.bounds.startFrame,
        lineEndFrame: timed.bounds.endFrame,
      };
    }
  }

  // 3. Anticipation preview: Show upcoming line when approaching its vocal onset
  for (let i = 0; i < timedLines.length; i++) {
    const timed = timedLines[i];
    if (frame >= timed.bounds.startFrame - anticipationFrames && frame < timed.bounds.startFrame) {
      const nextTimed = timedLines[i + 1];
      return {
        activeLine: timed.line,
        nextLine: nextTimed?.line,
        activeBounds: timed.bounds,
        isSinging: false,
        isAnticipating: true,
        progress: 0,
        activeLineIndex: i,
        lineStartFrame: timed.bounds.startFrame,
        lineEndFrame: timed.bounds.endFrame,
      };
    }
  }

  // 4. Pure instrumental period (Intro, Outro, or Interlude)
  return {
    isSinging: false,
    isAnticipating: false,
    progress: 0,
  };
};

/**
 * Selects the lyric line for the current render frame.
 */
export const getActiveLyricLine = (
  scenes: SceneConfig[],
  frame: number,
  anticipationFrames = 45
): LyricLine | undefined => {
  return getActiveAndNextLyricLines(scenes, frame, anticipationFrames).activeLine;
};

export const isWordActiveAtFrame = (startFrame: number, endFrame: number, frame: number): boolean =>
  frame >= startFrame && frame < endFrame;

export const isWordSungAtFrame = (endFrame: number, frame: number): boolean => frame >= endFrame;
