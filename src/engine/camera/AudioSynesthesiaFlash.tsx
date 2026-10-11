import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface AudioSynesthesiaFlashProps {
  hitFrame: number;
  duration?: number; // total frames for flash decay
  flashColor?: string;
  intensity?: number;
}

/**
 * Audio-Synesthesia Flash:
 * Injects a high-energy optical burst and micro-chromatic flash
 * on heavy drum drops, snare attacks, or vocal climaxes.
 */
export const AudioSynesthesiaFlash: React.FC<AudioSynesthesiaFlashProps> = ({
  hitFrame,
  duration = 10,
  flashColor = "rgba(255, 184, 76, 0.45)",
  intensity = 1.0,
}) => {
  const frame = useCurrentFrame();

  if (frame < hitFrame || frame > hitFrame + duration) {
    return null;
  }

  const elapsed = frame - hitFrame;
  const progress = elapsed / duration;

  // Sharp instant spike at frame 0, rapid exponential decay
  const opacity = Math.max(0, (1 - Math.pow(progress, 0.5)) * intensity);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: flashColor,
        opacity,
        pointerEvents: "none",
        mixBlendMode: "screen",
        zIndex: 45,
      }}
    />
  );
};
