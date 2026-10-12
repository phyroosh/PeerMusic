import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme14_SufiMandala: React.FC<ThemeProps> = ({
  lyrics = "Tere dar pe aake sukoon mila hai...",
  accent = "RAQS // SUFI TRANCE",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Counter-rotating concentric sacred geometric rings
  const rot1 = (frame * 0.4) % 360;
  const rot2 = (-frame * 0.3) % 360;
  const rot3 = (frame * 0.6) % 360;
  const stardustPulse = 0.85 + Math.sin(frame * 0.08) * 0.15;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#05060F",
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
      {/* Background Cosmic Indigo Aura */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: isLandscape ? "15%" : "50%",
          transform: isLandscape ? "none" : "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(229, 193, 88, 0.1) 0%, rgba(18, 41, 86, 0.25) 50%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Left: Sacred Geometric Gold Leaf Astrolabe Mandala */}
      <div
        style={{
          position: "relative",
          width: isLandscape ? "520px" : "360px",
          height: isLandscape ? "520px" : "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 520 520"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="goldLeaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="45%" stopColor="#E5C158" />
              <stop offset="80%" stopColor="#B8902A" />
              <stop offset="100%" stopColor="#7E5F12" />
            </linearGradient>

            <linearGradient id="lapisAzure" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0B1938" />
            </linearGradient>
          </defs>

          {/* Center Astrolabe Body */}
          <g transform="translate(260, 260)">
            {/* Outer Deep Lapis Ring */}
            <circle cx="0" cy="0" r="230" fill="url(#lapisAzure)" stroke="url(#goldLeaf)" strokeWidth="2.5" opacity="0.65" />

            {/* Ring 1 (Clockwise Rotation - 12 Star Facets) */}
            <g transform={`rotate(${rot1})`}>
              <circle cx="0" cy="0" r="200" fill="none" stroke="url(#goldLeaf)" strokeWidth="1.5" strokeDasharray="8 6" />
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={`star12-${i}`} transform={`rotate(${i * 30})`}>
                  <line x1="0" y1="180" x2="0" y2="200" stroke="url(#goldLeaf)" strokeWidth="2" />
                  <circle cx="0" cy="180" r="3.5" fill="#FFF2B2" />
                </g>
              ))}
            </g>

            {/* Ring 2 (Counter-Clockwise - 8-Point Octagram) */}
            <g transform={`rotate(${rot2})`}>
              <rect x="-115" y="-115" width="230" height="230" fill="none" stroke="url(#goldLeaf)" strokeWidth="2" opacity="0.85" />
              <rect x="-115" y="-115" width="230" height="230" fill="none" stroke="url(#goldLeaf)" strokeWidth="2" transform="rotate(45)" opacity="0.85" />
              <circle cx="0" cy="0" r="145" fill="none" stroke="url(#goldLeaf)" strokeWidth="1" strokeDasharray="4 8" />
            </g>

            {/* Ring 3 (Inner Sacred Flower of Life / 6 Petals) */}
            <g transform={`rotate(${rot3})`}>
              <circle cx="0" cy="0" r="90" fill="none" stroke="url(#goldLeaf)" strokeWidth="2" />
              {Array.from({ length: 6 }).map((_, i) => (
                <circle
                  key={`petal-${i}`}
                  cx={Math.cos((i * Math.PI) / 3) * 45}
                  cy={Math.sin((i * Math.PI) / 3) * 45}
                  r="45"
                  fill="none"
                  stroke="url(#goldLeaf)"
                  strokeWidth="1.2"
                  opacity="0.8"
                />
              ))}
            </g>

            {/* Central Glowing Pearl */}
            <circle cx="0" cy="0" r="18" fill="#FFFDF0" filter="drop-shadow(0 0 16px rgba(229, 193, 88, 0.95))" opacity={stardustPulse} />
            <circle cx="0" cy="0" r="7" fill="#7E5F12" />
          </g>
        </svg>
      </div>

      {/* Right: Golden Ethereal Calligraphic Typography */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          maxWidth: "580px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "4px",
            backgroundColor: "rgba(229, 193, 88, 0.15)",
            border: "1px solid rgba(229, 193, 88, 0.45)",
            color: "#E5C158",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.26em",
            width: "fit-content",
          }}
        >
          {accent}
        </div>

        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: isLandscape ? "46px" : "32px",
            fontWeight: 700,
            color: "#FFFBF2",
            lineHeight: 1.3,
            textShadow: "0 0 25px rgba(229, 193, 88, 0.35)",
          }}
        >
          {lyrics}
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px",
            color: "#B4C6E7",
            letterSpacing: "0.08em",
          }}
        >
          Sacred geometry & rotating celestial gears • Soulful Sufi Ghazal
        </div>
      </div>

      <FilmAtmosphere dustCount={16} vignetteStrength={0.5} />
    </div>
  );
};
