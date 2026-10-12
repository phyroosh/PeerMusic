import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme05_TrainWires: React.FC<ThemeProps> = ({
  lyrics = "Patriyon pe daudti bechain sham...",
  accent = "SAFAR // LOCAL TRAIN",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Passing telephone poles & undulating wires
  const trainSpeed = (frame * 5) % 520;
  const wireDip1 = Math.sin(frame * 0.08) * 8;
  const wireDip2 = Math.cos(frame * 0.07 + 1) * 10;

  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(230, 81, 0, 0.25)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(230, 81, 0, 0.15)",
        backgroundColor: "#160A22",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 520 420"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          {/* Twilight Sunset Gradient */}
          <linearGradient id="twilightSunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E0C2B" />
            <stop offset="35%" stopColor="#511845" />
            <stop offset="65%" stopColor="#900C3F" />
            <stop offset="85%" stopColor="#C70039" />
            <stop offset="100%" stopColor="#FF5733" />
          </linearGradient>

          {/* Train Window Rim */}
          <linearGradient id="trainFrameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#37474F" />
            <stop offset="50%" stopColor="#263238" />
            <stop offset="100%" stopColor="#102027" />
          </linearGradient>

          {/* Sun Glow */}
          <radialGradient id="duskSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC107" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FF9800" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E65100" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Dusk Twilight Horizon */}
        <rect width="520" height="420" fill="url(#twilightSunset)" />

        {/* Setting Sun Silhouette on Horizon */}
        <circle cx="280" cy="270" r="85" fill="url(#duskSun)" />
        <circle cx="280" cy="270" r="32" fill="#FFE082" />

        {/* Distant Tree Line & Ground */}
        <path
          d="M 0 310 Q 140 300, 260 308 T 520 305 L 520 420 L 0 420 Z"
          fill="#1A0A1C"
        />

        {/* 2. Passing Telegraph Poles (Dynamic Translation) */}
        {[
          { offset: 0 },
          { offset: 260 },
          { offset: 520 },
        ].map((p, idx) => {
          const posX = ((p.offset - trainSpeed) % 520 + 520) % 520;
          return (
            <g key={`pole-${idx}`} transform={`translate(${posX}, 140)`}>
              {/* Wooden Pole */}
              <line x1="0" y1="0" x2="0" y2="180" stroke="#0E0512" strokeWidth="6" strokeLinecap="round" />
              {/* Horizontal Crossbars */}
              <line x1="-28" y1="20" x2="28" y2="20" stroke="#0E0512" strokeWidth="4" />
              <line x1="-20" y1="45" x2="20" y2="45" stroke="#0E0512" strokeWidth="4" />
              {/* Ceramic Insulators */}
              <circle cx="-24" cy="18" r="3" fill="#FFE082" opacity="0.6" />
              <circle cx="24" cy="18" r="3" fill="#FFE082" opacity="0.6" />
              <circle cx="-16" cy="43" r="3" fill="#FFE082" opacity="0.6" />
              <circle cx="16" cy="43" r="3" fill="#FFE082" opacity="0.6" />
            </g>
          );
        })}

        {/* 3. Undulating Telegraph Wires (Musical Staff Lines across the sky) */}
        <path
          d={`M 0 ${160 + wireDip1} Q 130 ${185 + wireDip1}, 260 ${160 + wireDip2} T 520 ${160 + wireDip1}`}
          fill="none"
          stroke="#0E0512"
          strokeWidth="2.2"
        />
        <path
          d={`M 0 ${185 + wireDip2} Q 130 ${210 + wireDip2}, 260 ${185 + wireDip1} T 520 ${185 + wireDip2}`}
          fill="none"
          stroke="#0E0512"
          strokeWidth="2"
        />

        {/* 4. Foreground Train Window Cutout & Steel Bars */}
        {/* Curved Rectangular Train Window Frame */}
        <path
          d="M 0 0 L 520 0 L 520 420 L 0 420 Z M 40 40 L 40 380 Q 40 380, 50 380 L 470 380 Q 480 380, 480 380 L 480 40 Q 480 40, 470 40 L 50 40 Z"
          fill="url(#trainFrameGrad)"
          fillRule="evenodd"
          stroke="#455A64"
          strokeWidth="3"
        />
        {/* Horizontal Safety Grille Bars */}
        <line x1="40" y1="260" x2="480" y2="260" stroke="#78909C" strokeWidth="6" />
        <line x1="40" y1="310" x2="480" y2="310" stroke="#78909C" strokeWidth="6" />
      </svg>
    </div>
  );

  const typo = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        maxWidth: "600px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "6px",
          backgroundColor: "rgba(255, 87, 51, 0.16)",
          border: "1px solid rgba(255, 87, 51, 0.4)",
          color: "#FF6F59",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          width: "fit-content",
        }}
      >
        {accent}
      </div>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: isLandscape ? "44px" : "32px",
          fontWeight: 700,
          color: "#FFF0EB",
          lineHeight: 1.25,
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
        }}
      >
        {lyrics}
      </div>

      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "17px",
          color: "#FFAB91",
          letterSpacing: "0.08em",
        }}
      >
        Suburban train journey through twilight dusk • Rhythmic Clatter & Bansuri
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0D0514",
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isLandscape ? "80px" : "40px",
        padding: isLandscape ? "80px 100px" : "40px 30px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Dusk Aura */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230, 81, 0, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {visual}
      {typo}
      <FilmAtmosphere dustCount={12} vignetteStrength={0.5} />
    </div>
  );
};
