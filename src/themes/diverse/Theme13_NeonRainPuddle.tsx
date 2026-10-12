import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme13_NeonRainPuddle: React.FC<ThemeProps> = ({
  lyrics = "Kanch ke tukdon jaisi ye roshni...",
  accent = "REFLECTIONS // MIDNIGHT RAIN",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Expanding rain puddle ripples
  const ripple1 = (frame * 1.8) % 180;
  const ripple2 = ((frame * 1.5) + 60) % 180;
  const ripple3 = ((frame * 2.1) + 120) % 180;
  const neonGlow = 0.88 + Math.sin(frame * 0.1) * 0.12;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0A0D14",
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isLandscape ? "80px 100px" : "40px 24px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left / Center Visual: Wet Asphalt Puddle with Inverted Neon Reflection */}
      <div
        style={{
          position: "relative",
          width: isLandscape ? "540px" : "360px",
          height: isLandscape ? "460px" : "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 540 460"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Dark Asphalt Texture Gradient */}
            <radialGradient id="asphaltPuddle" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#121824" />
              <stop offset="60%" stopColor="#0D121B" />
              <stop offset="100%" stopColor="#080B11" />
            </radialGradient>

            {/* Inverted Neon Pink & Cyan Glow */}
            <linearGradient id="neonPinkCyan" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF1493" stopOpacity={neonGlow} />
              <stop offset="50%" stopColor="#9400D3" stopOpacity={0.8 * neonGlow} />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity={neonGlow} />
            </linearGradient>

            {/* Ripple Edge Shimmer */}
            <linearGradient id="rippleShimmer" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.6)" />
              <stop offset="50%" stopColor="rgba(255, 20, 147, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 240, 255, 0.1)" />
            </linearGradient>
          </defs>

          {/* 1. Wet Asphalt Ground Oval Puddle */}
          <ellipse
            cx="270"
            cy="230"
            rx="250"
            ry="200"
            fill="url(#asphaltPuddle)"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="2"
            filter="drop-shadow(0 20px 40px rgba(0,0,0,0.9))"
          />

          {/* 2. Inverted Neon Signage Mirrored in the Water (Distorted Reflection) */}
          <g transform="translate(140, 170) scale(1, -1)">
            {/* Neon Kanji / Devanagari / English Sign Reflection */}
            <text
              x="0"
              y="0"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="68"
              fontWeight="900"
              fill="none"
              stroke="url(#neonPinkCyan)"
              strokeWidth="3.5"
              letterSpacing="6"
              filter="blur(1.5px) drop-shadow(0 0 18px rgba(255, 20, 147, 0.8))"
              opacity="0.85"
            >
              HOTEL
            </text>
            <text
              x="20"
              y="45"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="24"
              fontWeight="700"
              fill="#00F0FF"
              letterSpacing="8"
              filter="blur(1px) drop-shadow(0 0 12px #00F0FF)"
              opacity="0.8"
            >
              CHAI & NEON
            </text>
          </g>

          {/* 3. Expanding Concentric Rain Ripple Rings */}
          {/* Ripple Center 1 */}
          <g transform="translate(260, 220)">
            <ellipse
              cx="0"
              cy="0"
              rx={ripple1}
              ry={ripple1 * 0.55}
              fill="none"
              stroke="url(#rippleShimmer)"
              strokeWidth={Math.max(0.5, 3 - ripple1 * 0.02)}
              opacity={Math.max(0, 1 - ripple1 / 180)}
            />
            <ellipse
              cx="0"
              cy="0"
              rx={Math.max(0, ripple1 - 25)}
              ry={Math.max(0, (ripple1 - 25) * 0.55)}
              fill="none"
              stroke="rgba(255, 20, 147, 0.4)"
              strokeWidth="1.2"
              opacity={Math.max(0, 0.8 - ripple1 / 180)}
            />
          </g>

          {/* Ripple Center 2 (Offset rain drop hit) */}
          <g transform="translate(180, 280)">
            <ellipse
              cx="0"
              cy="0"
              rx={ripple2}
              ry={ripple2 * 0.55}
              fill="none"
              stroke="rgba(0, 240, 255, 0.5)"
              strokeWidth={Math.max(0.5, 2.5 - ripple2 * 0.02)}
              opacity={Math.max(0, 0.9 - ripple2 / 180)}
            />
          </g>

          {/* Ripple Center 3 */}
          <g transform="translate(370, 180)">
            <ellipse
              cx="0"
              cy="0"
              rx={ripple3}
              ry={ripple3 * 0.55}
              fill="none"
              stroke="rgba(255, 179, 0, 0.6)"
              strokeWidth={Math.max(0.5, 2.5 - ripple3 * 0.02)}
              opacity={Math.max(0, 0.8 - ripple3 / 180)}
            />
          </g>
        </svg>
      </div>

      {/* Right: Modern Cyber-Editorial Typography */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "580px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 20, 147, 0.15)",
            border: "1px solid rgba(255, 20, 147, 0.45)",
            color: "#FF2A85",
            fontFamily: "'Space Grotesk', monospace",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.24em",
            width: "fit-content",
          }}
        >
          {accent}
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: isLandscape ? "46px" : "32px",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            textShadow: "0 0 30px rgba(0, 240, 255, 0.4)",
          }}
        >
          {lyrics}
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px",
            color: "#00F0FF",
            letterSpacing: "0.08em",
            opacity: 0.9,
          }}
        >
          Inverted neon reflections on rain-slicked asphalt • Synth Trap Lofi
        </div>
      </div>

      <FilmAtmosphere dustCount={12} vignetteStrength={0.55} />
    </div>
  );
};
