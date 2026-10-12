import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme07_TerraceBreeze: React.FC<ThemeProps> = ({
  lyrics = "Hawa ke jhonke se lauta wo pal...",
  accent = "HAWA // BREEZE",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Billowing fabric sine-wave motion
  const wave1 = Math.sin(frame * 0.07) * 22;
  const wave2 = Math.cos(frame * 0.08 + 1) * 26;
  const wave3 = Math.sin(frame * 0.06 + 2) * 18;

  // Flying birds in distant sky
  const birdFlight = (frame * 1.6) % 600;

  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(244, 162, 97, 0.2)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7), 0 0 70px rgba(244, 162, 97, 0.12)",
        backgroundColor: "#1C1418",
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
          {/* Overcast Sunset Sky Gradient */}
          <linearGradient id="overcastDusk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E202B" />
            <stop offset="50%" stopColor="#4A3340" />
            <stop offset="100%" stopColor="#6C4B52" />
          </linearGradient>

          {/* Billowing White Cotton Dupatta Gradient */}
          <linearGradient id="cottonFabric" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F7F1E5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#DBC8B5" stopOpacity="0.65" />
          </linearGradient>

          {/* Terracotta Rooftop Parapet */}
          <linearGradient id="terracotta" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B35436" />
            <stop offset="100%" stopColor="#7E341F" />
          </linearGradient>
        </defs>

        {/* 1. Pastel Overcast Sky */}
        <rect width="520" height="420" fill="url(#overcastDusk)" />

        {/* 2. Distant Flying Birds Silhouette */}
        {[
          { x: (500 - birdFlight) % 520, y: 70, s: 0.8 },
          { x: (540 - birdFlight) % 520, y: 85, s: 0.6 },
          { x: (480 - birdFlight) % 520, y: 95, s: 0.5 },
        ].map((b, i) => (
          <path
            key={`bird-${i}`}
            d={`M ${b.x} ${b.y} Q ${b.x + 8 * b.s} ${b.y - 6 * b.s}, ${b.x + 16 * b.s} ${b.y} Q ${b.x + 24 * b.s} ${b.y - 6 * b.s}, ${b.x + 32 * b.s} ${b.y}`}
            fill="none"
            stroke="#DBC8B5"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.65"
          />
        ))}

        {/* 3. Distant Rooftops Silhouette */}
        <path
          d="M 0 310 L 60 310 L 60 280 L 130 280 L 130 310 L 220 310 L 220 270 L 280 270 L 280 310 L 370 310 L 370 290 L 440 290 L 440 310 L 520 310 L 520 420 L 0 420 Z"
          fill="#1C1418"
          opacity="0.85"
        />

        {/* 4. Concrete Parapet Wall (Foreground) */}
        <rect x="0" y="340" width="520" height="80" fill="url(#terracotta)" />
        <rect x="0" y="336" width="520" height="6" fill="#D36A49" />

        {/* 5. Clothesline Poles & Wire */}
        {/* Left Pole */}
        <line x1="60" y1="120" x2="60" y2="340" stroke="#2B1A1E" strokeWidth="6" strokeLinecap="round" />
        {/* Right Pole */}
        <line x1="460" y1="120" x2="460" y2="340" stroke="#2B1A1E" strokeWidth="6" strokeLinecap="round" />
        {/* Sagging Clothesline Wire */}
        <path
          d="M 60 140 Q 260 155, 460 140"
          fill="none"
          stroke="#422930"
          strokeWidth="2.5"
        />

        {/* 6. Billowing Sheer Cotton Dupatta (Central Kinetic Metaphor) */}
        {/* Wooden Clothespins / Pegs */}
        <rect x="155" y="142" width="6" height="14" rx="2" fill="#D4A373" />
        <rect x="345" y="142" width="6" height="14" rx="2" fill="#D4A373" />

        {/* Flowing Translucent Cotton Fabric */}
        <path
          d={`M 158 146 Q ${250 + wave1} ${152 + wave2 * 0.2}, 348 146 C ${370 + wave2} 210, ${320 + wave1} 270, ${340 + wave2} 310 C ${290 + wave3} 325, ${200 + wave1} 330, ${150 + wave2} 310 C ${180 + wave1} 250, ${140 + wave2} 200, 158 146 Z`}
          fill="url(#cottonFabric)"
          filter="drop-shadow(0 15px 30px rgba(0, 0, 0, 0.45))"
        />
        {/* Fabric Folds / Contour Lines */}
        <path
          d={`M 190 155 Q ${210 + wave1} 240, ${220 + wave2} 320`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1.5"
        />
        <path
          d={`M 260 155 Q ${270 + wave2} 230, ${290 + wave1} 320`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1.5"
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
          backgroundColor: "rgba(244, 162, 97, 0.14)",
          border: "1px solid rgba(244, 162, 97, 0.4)",
          color: "#F4A261",
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
          color: "#FFF5EB",
          lineHeight: 1.25,
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
        }}
      >
        {lyrics}
      </div>

      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "17px",
          color: "#E29578",
          letterSpacing: "0.08em",
        }}
      >
        Rooftop afternoon breeze & gentle memories • Acoustic Strumming
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#140D10",
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
      {/* Background Pastel Amber Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244, 162, 97, 0.08) 0%, transparent 70%)",
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
