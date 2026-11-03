import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style06_LiquidChrome: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const chromeWave = Math.sin(frame * 0.05) * 20;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#030305",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Trebuchet MS', 'Arial Black', sans-serif",
      }}
    >
      {/* 1. Fluid Molten Chrome Blob Art (SVG Specular Filter) */}
      <svg
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "600px",
          pointerEvents: "none",
          opacity: 0.85,
        }}
        viewBox="0 0 900 600"
      >
        <defs>
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#8EC5FC" />
            <stop offset="50%" stopColor="#E0C3FC" />
            <stop offset="75%" stopColor="#80D0C7" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="liquidGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={`M 250,300 C 250,${150 + chromeWave} 400,${100 - chromeWave} 550,200 C 700,${300 + chromeWave} 680,450 500,${480 - chromeWave} C 320,510 250,420 250,300 Z`}
          fill="none"
          stroke="url(#chromeGrad)"
          strokeWidth="32"
          filter="url(#liquidGlow)"
          opacity="0.75"
        />
        <circle
          cx={450 + chromeWave}
          cy={280}
          r={70}
          fill="none"
          stroke="url(#chromeGrad)"
          strokeWidth="18"
          filter="url(#liquidGlow)"
          opacity="0.85"
        />
      </svg>

      {/* 2. Center Ultra-Wide Typography */}
      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          maxWidth: "1400px",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            letterSpacing: "8px",
            textTransform: "uppercase",
            color: "#8EC5FC",
            marginBottom: "30px",
            fontWeight: 700,
          }}
        >
          AVANT-POP // PRISMATIC DISPERSION
        </div>

        <div
          style={{
            fontSize: "76px",
            lineHeight: 1.15,
            fontWeight: 900,
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#FFFFFF",
            background: "linear-gradient(180deg, #FFFFFF 0%, #A0B2C6 45%, #E2E8F0 55%, #FFFFFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 25px rgba(142, 197, 252, 0.45))",
          }}
        >
          MEET ME WHERE THE SUNLIGHT TURNS TO GOLD
        </div>

        <div
          style={{
            fontSize: "24px",
            marginTop: "28px",
            letterSpacing: "4px",
            color: "rgba(255, 255, 255, 0.4)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Liquid Mercury Resonance • 60 FPS Engine
        </div>
      </div>

      {/* 3. Bottom Minimalist Corner Coordinates */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "60px",
          right: "60px",
          display: "flex",
          justifyContent: "space-between",
          color: "rgba(255, 255, 255, 0.3)",
          fontSize: "12px",
          letterSpacing: "3px",
          fontFamily: "monospace",
        }}
      >
        <span>Y2K LIQUID CHROME CORE</span>
        <span>SPECULAR REFLECTION: 94%</span>
      </div>
    </div>
  );
};
