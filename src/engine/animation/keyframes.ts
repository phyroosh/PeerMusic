import { spring as remotionSpring, SpringConfig } from "remotion";

/**
 * Supported Easing Curves for Keyframe Animation
 */
export type BuiltInEasing =
  | "linear"
  | "easeInQuad"
  | "easeOutQuad"
  | "easeInOutQuad"
  | "easeInCubic"
  | "easeOutCubic"
  | "easeInOutCubic"
  | "snappy"     // Cubic Bézier (0.16, 1, 0.3, 1) - Swiss typography snap
  | "smoothstep"
  | "spring";

export type EasingFunction = (t: number) => number;
export type EasingType = BuiltInEasing | EasingFunction;

/**
 * Mathematical Easing Implementations (0 to 1)
 */
export const EASING: Record<BuiltInEasing, EasingFunction> = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // Snappy: fast energetic acceleration with smooth settling (replaces sluggish ease)
  snappy: (t) => {
    const p1 = 1 - t;
    return 3 * p1 * p1 * t * 0.16 + 3 * p1 * t * t * 1.0 + t * t * t;
  },
  smoothstep: (t) => t * t * (3 - 2 * t),
  // Default spring curve (damped harmonic)
  spring: (t) => {
    return 1 - Math.exp(-6 * t) * Math.cos(7 * t);
  },
};

export const resolveEasing = (ease?: EasingType): EasingFunction => {
  if (!ease) return EASING.snappy;
  if (typeof ease === "function") return ease;
  return EASING[ease] || EASING.snappy;
};

export interface Keyframe<T = number> {
  frame: number;
  value: T;
  ease?: EasingType;
}

export interface KeyframeOptions {
  extrapolateLeft?: "clamp" | "extend";
  extrapolateRight?: "clamp" | "extend";
}

/**
 * Evaluates a track of numerical keyframes at the specified render frame.
 * 100% deterministic, frame-locked, and free of asynchronous browser clock jitter.
 */
export const interpolateKeyframes = (
  frame: number,
  keyframes: Keyframe<number>[],
  options: KeyframeOptions = {}
): number => {
  if (!keyframes || keyframes.length === 0) {
    return 0;
  }

  if (keyframes.length === 1) {
    return keyframes[0].value;
  }

  const { extrapolateLeft = "clamp", extrapolateRight = "clamp" } = options;

  // Before first keyframe
  if (frame <= keyframes[0].frame) {
    if (extrapolateLeft === "clamp") {
      return keyframes[0].value;
    }
  }

  // After last keyframe
  const lastIndex = keyframes.length - 1;
  if (frame >= keyframes[lastIndex].frame) {
    if (extrapolateRight === "clamp") {
      return keyframes[lastIndex].value;
    }
  }

  // Find surrounding keyframe segment
  for (let i = 0; i < lastIndex; i++) {
    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];

    if (frame >= k1.frame && frame <= k2.frame) {
      const span = k2.frame - k1.frame;
      if (span === 0) return k2.value;

      const rawT = (frame - k1.frame) / span;
      const easingFn = resolveEasing(k2.ease || k1.ease);
      const easedT = easingFn(Math.min(1, Math.max(0, rawT)));

      return k1.value + (k2.value - k1.value) * easedT;
    }
  }

  return keyframes[lastIndex].value;
};

/**
 * Convenient shorthand for evaluating a keyframe track.
 */
export const getKeyframeValue = interpolateKeyframes;

/**
 * Deterministic frame-based spring evaluation.
 * Clamps output when resting to eliminate microscopic rendering jitter.
 */
export const springSnap = (
  frame: number,
  startFrame: number,
  fps: number = 60,
  config: Partial<SpringConfig> = { damping: 16, stiffness: 180, mass: 0.6 }
): number => {
  if (frame < startFrame) return 0;
  const progress = remotionSpring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 16,
      stiffness: 180,
      mass: 0.6,
      ...config,
    },
  });

  return Math.abs(progress - 1) < 0.001 ? 1 : progress;
};
