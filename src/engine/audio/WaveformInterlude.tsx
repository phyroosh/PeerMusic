import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

interface WaveformInterludeProps {
  label?: string;
  sublabel?: string;
  width?: number | string;
  height?: number;
}

export const WaveformInterlude: React.FC<WaveformInterludeProps> = ({
  label = "INSTRUMENTAL RESONANCE",
  sublabel = "Acoustic strings & ambient melody in Room 204",
  width = "100%",
  height = 160,
}) => {
  const frame = useCurrentFrame();

  // Generate 3 harmonic sine-wave curve paths
  const pointsCount = 48;
  const svgWidth = 600;
  const svgHeight = 100;
  const midY = svgHeight / 2;

  const generateWavePath = (
    freq1: number,
    freq2: number,
    amp: number,
    speed: number,
    phase: number
  ) => {
    const points: [number, number][] = [];
    for (let i = 0; i <= pointsCount; i++) {
      const x = (i / pointsCount) * svgWidth;
      // Bell-curve envelope to taper edges smoothly to 0
      const norm = (i - pointsCount / 2) / (pointsCount / 2);
      const envelope = Math.exp(-norm * norm * 2.5);

      const y =
        midY +
        (Math.sin(i * freq1 + frame * speed + phase) * 0.65 +
          Math.cos(i * freq2 - frame * (speed * 0.7) + phase) * 0.35) *
          amp *
          envelope;

      points.push([x, y]);
    }

    return points.reduce((acc, [x, y], idx) => {
      return idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, "");
  };

  const wave1 = generateWavePath(0.35, 0.18, 28, 0.08, 0);
  const wave2 = generateWavePath(0.42, 0.22, 22, 0.06, 1.8);
  const wave3 = generateWavePath(0.28, 0.14, 16, 0.05, 3.4);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        width,
        alignItems: "flex-start",
      }}
    >
      {/* Musical Interlude Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "5px 14px",
          borderRadius: "3px",
          backgroundColor: VIDEO_CONFIG.colors.accentFern,
          color: "#FAF6EE",
          fontFamily: VIDEO_CONFIG.fonts.accent,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.24em",
        }}
      >
        <span style={{ fontSize: "12px", opacity: 0.9 }}>♪</span>
        {label}
      </div>

      {/* Harmonic Waveform Canvas */}
      <div
        style={{
          width: "100%",
          maxWidth: `${svgWidth}px`,
          height: `${height}px`,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* Subtle Center Zero-Axis Guide */}
          <line
            x1="0"
            y1={midY}
            x2={svgWidth}
            y2={midY}
            stroke={VIDEO_CONFIG.colors.cardBorder}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Tertiary Slate Wave */}
          <path
            d={wave3}
            fill="none"
            stroke={VIDEO_CONFIG.colors.gridLine}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Secondary Olive-Fern Wave */}
          <path
            d={wave2}
            fill="none"
            stroke={VIDEO_CONFIG.colors.accentFern}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Primary Dried Rose Crimson Wave */}
          <path
            d={wave1}
            fill="none"
            stroke={VIDEO_CONFIG.colors.accentRose}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Sublabel In Monospace Pencil Typography */}
      <div
        style={{
          fontFamily: VIDEO_CONFIG.fonts.tag,
          fontSize: "13px",
          color: VIDEO_CONFIG.colors.secondaryText,
          letterSpacing: "0.05em",
        }}
      >
        {sublabel}
      </div>
    </div>
  );
};
