/**
 * PeerMusic Duration Configuration & Single Source of Truth (Remotion/TypeScript)
 * ==============================================================================
 * Mirrors the authoritative duration constraints defined in scripts/duration_policy.py.
 */

export const DURATION_CONFIG = {
  // Target duration range: ~2:50 - 2:58
  targetMinSeconds: 170.0,
  targetMaxSeconds: 178.0,
  targetPreferredSeconds: 174.0,

  // Absolute hard ceiling: 3:00 (180.0 seconds)
  maxDurationSeconds: 180.0,

  // Max trailing silence in seconds
  maxTrailingSilenceSeconds: 2.5,

  // Default fps
  defaultFps: 60,

  /**
   * Maximum allowed composition duration in frames for a given framerate.
   * E.g. at 60 FPS: 180 * 60 = 10,800 frames.
   */
  getMaxFrames(fps: number = 60): number {
    return Math.floor(this.maxDurationSeconds * fps);
  },

  /**
   * Validates whether a duration in frames complies with the 180s hard limit.
   */
  isFrameDurationCompliant(frames: number, fps: number = 60): boolean {
    const durationSec = frames / fps;
    return durationSec > 0 && durationSec <= this.maxDurationSeconds;
  },

  /**
   * Validates whether a duration in seconds complies with the 180s hard limit.
   */
  isDurationCompliant(durationSeconds: number): boolean {
    return durationSeconds > 0 && durationSeconds <= this.maxDurationSeconds;
  },
} as const;
