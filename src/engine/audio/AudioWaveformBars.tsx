import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

interface AudioWaveformBarsProps {
  barsCount?: number;
  barWidth?: number;
  maxHeight?: number;
  color?: string;
  opacity?: number;
}

export const AudioWaveformBars: React.FC<AudioWaveformBarsProps> = ({
  barsCount = 28,
  barWidth = 3,
  maxHeight = 36,
  color = VIDEO_CONFIG.colors.accentAmber,
  opacity = 0.5,
}) => {
  const frame = useCurrentFrame();

  // Multi-frequency harmonic oscillator simulating an audio FFT spectrum
  const bars = React.useMemo(() => {
    return Array.from({ length: barsCount }).map((_, i) => {
      // Natural bell-curve frequency distribution
      const normIndex = (i - barsCount / 2) / (barsCount / 2);
      const envelope = Math.exp(-normIndex * normIndex * 2.2);

      const f1 = Math.sin(frame * 0.18 + i * 0.45);
      const f2 = Math.cos(frame * 0.32 + i * 0.22);
      const f3 = Math.sin(frame * 0.08 + i * 0.9);

      const rawHeight = Math.max(0.12, (f1 * 0.4 + f2 * 0.35 + f3 * 0.25 + 0.6) * envelope);
      const height = Math.min(maxHeight, Math.max(4, rawHeight * maxHeight));

      return { id: i, height };
    });
  }, [barsCount, frame, maxHeight]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "4px",
        height: `${maxHeight}px`,
        opacity,
      }}
    >
      {bars.map((bar) => (
        <div
          key={bar.id}
          style={{
            width: `${barWidth}px`,
            height: `${bar.height}px`,
            backgroundColor: color,
            borderRadius: "2px",
            transition: "height 0.05s ease",
            boxShadow: `0 0 6px ${color}33`,
          }}
        />
      ))}
    </div>
  );
};
