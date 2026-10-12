import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { PaperTexture } from "../../engine/camera/PaperTexture";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme12_SwissBrutalism: React.FC<ThemeProps> = ({
  lyrics = "DIL KE SHEHAR MEIN SANNATA HAI",
  accent = "BRUTALISM // 01 ARCHITECTURE",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Kinetic structural oscillation of architectural shadows
  const shadowShift = Math.sin(frame * 0.05) * 12;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0D0E11",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: isLandscape ? "70px 90px" : "40px 24px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Architectural Monolith Drafting Grid */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.12, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="brutalistGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#brutalistGrid)" />
      </svg>

      {/* Top Header Row: Asymmetric Stencil Badge & Technical Swiss Markers */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            backgroundColor: "#D4E824",
            color: "#0D0E11",
            padding: "8px 18px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px",
            fontWeight: 900,
            letterSpacing: "0.28em",
          }}
        >
          {accent}
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: "14px",
            color: "#6E7687",
            letterSpacing: "0.15em",
          }}
        >
          METROPOLIS // SCALE 1:1 • 138 BPM
        </div>
      </div>

      {/* Middle Center: Monumental Architectural Cantilever Stairs (SVG) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: isLandscape ? "320px" : "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 320"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="concreteGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E6E8EC" />
              <stop offset="100%" stopColor="#9AA0AA" />
            </linearGradient>
            <linearGradient id="concreteShadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B1E24" />
              <stop offset="100%" stopColor="#08090C" />
            </linearGradient>
          </defs>

          {/* Stepped Monolithic Blocks (Brutalist Concrete Cantilever) */}
          {[
            { x: 120, y: 220, w: 180, h: 45 },
            { x: 260, y: 175, w: 200, h: 45 },
            { x: 420, y: 130, w: 220, h: 45 },
            { x: 600, y: 85, w: 220, h: 45 },
          ].map((block, i) => (
            <g key={`step-${i}`}>
              {/* Dynamic Dropping Shadow */}
              <polygon
                points={`${block.x + shadowShift},${block.y + block.h} ${block.x + block.w + shadowShift},${block.y + block.h} ${block.x + block.w - 30 + shadowShift},320 ${block.x - 30 + shadowShift},320`}
                fill="url(#concreteShadow)"
                opacity="0.85"
              />
              {/* Solid Concrete Face */}
              <rect
                x={block.x}
                y={block.y}
                width={block.w}
                height={block.h}
                fill="url(#concreteGrad)"
                stroke="#1B1E24"
                strokeWidth="2"
              />
              {/* Acid Lime Architectural Accent Line */}
              {i === 2 && (
                <rect x={block.x} y={block.y} width={block.w} height="5" fill="#D4E824" />
              )}
            </g>
          ))}

          {/* Large Architectural Numeral "01" */}
          <text
            x="850"
            y="260"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="180"
            fontWeight="900"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3"
            letterSpacing="-8"
          >
            01
          </text>
        </svg>
      </div>

      {/* Bottom: Massive Monolithic Typography (Ultra-Bold Headline) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: isLandscape ? "64px" : "36px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            textTransform: "uppercase",
            maxWidth: "1100px",
          }}
        >
          {lyrics}
        </div>

        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "14px",
              color: "#D4E824",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            HEAVY MONOLITHIC BEATS • STARK CONTRAST
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.15)" }} />
        </div>
      </div>

      <PaperTexture opacity={0.05} />
    </div>
  );
};
