import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme06_AquariumGlow: React.FC<ThemeProps> = ({
  lyrics = "Khayalon ke samandar mein doobey rahe...",
  accent = "GEHRAIYAAN // AQUATIC",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Undulating fish motion & fin waves
  const fishY = Math.sin(frame * 0.05) * 14;
  const finWave1 = Math.sin(frame * 0.08) * 16;
  const finWave2 = Math.cos(frame * 0.07 + 1.2) * 20;
  const bubbleRise = (frame * 2.2) % 360;

  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(0, 229, 255, 0.2)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(0, 229, 255, 0.15)",
        backgroundColor: "#020712",
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
          {/* Deep Abyssal Water Gradient */}
          <linearGradient id="abyssalWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="45%" stopColor="#041527" />
            <stop offset="100%" stopColor="#020712" />
          </linearGradient>

          {/* Bioluminescent Betta Fish Body */}
          <linearGradient id="bettaBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF4081" />
            <stop offset="50%" stopColor="#7C4DFF" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>

          {/* Translucent Silky Fin Gradient */}
          <linearGradient id="silkyFin" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF4081" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#64FFDA" stopOpacity="0.1" />
          </linearGradient>

          {/* Light Caustics from surface */}
          <linearGradient id="caustics" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#64FFDA" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Water Abyss */}
        <rect width="520" height="420" fill="url(#abyssalWater)" />

        {/* Surface Caustics God-Rays */}
        <polygon points="120,0 200,0 290,420 180,420" fill="url(#caustics)" />
        <polygon points="280,0 360,0 460,420 350,420" fill="url(#caustics)" />

        {/* 2. Rising Micro-bubbles */}
        {[
          { x: 90, y: (380 - bubbleRise * 0.9) % 420, r: 3 },
          { x: 140, y: (420 - bubbleRise * 1.3) % 420, r: 4 },
          { x: 230, y: (390 - bubbleRise * 1.1) % 420, r: 2.5 },
          { x: 340, y: (440 - bubbleRise * 1.4) % 420, r: 5 },
          { x: 410, y: (370 - bubbleRise * 0.8) % 420, r: 3.5 },
          { x: 470, y: (410 - bubbleRise * 1.2) % 420, r: 2 },
        ].map((b, i) => (
          <circle
            key={`b-${i}`}
            cx={b.x}
            cy={b.y}
            r={b.r}
            fill="none"
            stroke="rgba(100, 255, 218, 0.6)"
            strokeWidth="0.8"
          />
        ))}

        {/* 3. Luminous Betta Fish (Center Metaphor) */}
        <g transform={`translate(230, ${210 + fishY})`}>
          {/* Huge Silky Dorsal & Tail Fins */}
          <path
            d={`M -20 -15 C ${-80 + finWave1} -70, ${-160 + finWave2} -60, ${-180 + finWave1} -10 C ${-170 + finWave2} 40, ${-120 + finWave1} 60, -20 15 Z`}
            fill="url(#silkyFin)"
            filter="drop-shadow(0 0 20px rgba(0, 229, 255, 0.5))"
          />
          <path
            d={`M -20 10 C ${-70 + finWave2} 50, ${-140 + finWave1} 80, ${-160 + finWave2} 40 C ${-130 + finWave1} 20, ${-80 + finWave2} 10, -20 5 Z`}
            fill="url(#silkyFin)"
            opacity="0.8"
          />

          {/* Fish Torso (Streamlined hydrodynamic form) */}
          <path
            d="M 60 0 C 40 -18, -10 -18, -30 0 C -10 18, 40 18, 60 0 Z"
            fill="url(#bettaBody)"
            filter="drop-shadow(0 0 15px rgba(255, 64, 129, 0.7))"
          />

          {/* Translucent Pectoral Fin */}
          <path
            d={`M 15 2 Q ${0 + finWave1 * 0.5} 35, ${-25 + finWave2 * 0.5} 30 Q ${-10} 15, 15 2 Z`}
            fill="#64FFDA"
            opacity="0.75"
          />

          {/* Glowing Eye */}
          <circle cx="45" cy="-4" r="3.5" fill="#FFFFFF" filter="drop-shadow(0 0 5px #00E5FF)" />
          <circle cx="46" cy="-4" r="1.5" fill="#020712" />
        </g>

        {/* Glass Aquarium Minimal Frame */}
        <rect
          x="10"
          y="10"
          width="500"
          height="400"
          rx="14"
          fill="none"
          stroke="rgba(0, 229, 255, 0.15)"
          strokeWidth="2"
        />
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
          backgroundColor: "rgba(0, 229, 255, 0.14)",
          border: "1px solid rgba(0, 229, 255, 0.4)",
          color: "#00E5FF",
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
          color: "#E0F7FA",
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
          color: "#80DEEA",
          letterSpacing: "0.08em",
        }}
      >
        Bioluminescent depths & floating thoughts • Ambient Sub-Bass Pad
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#02050A",
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
      {/* Background Cyan Halo */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {visual}
      {typo}
      <FilmAtmosphere dustCount={12} vignetteStrength={0.55} />
    </div>
  );
};
