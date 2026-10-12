import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme10_RetroCrtDreams: React.FC<ThemeProps> = ({
  lyrics = "Kahin door kisi purane khwaab mein...",
  accent = "KHWAAB // CRT 1994",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // CRT scanline flicker & phosphor wave animation
  const crtFlicker = 0.92 + Math.sin(frame * 0.4) * 0.08;
  const waveCycle = (frame * 0.1) % (Math.PI * 2);

  // Generate Lissajous / oscilloscope sine wave path
  const wavePoints = Array.from({ length: 40 }).map((_, i) => {
    const x = 70 + i * 7.5;
    const y = 140 + Math.sin(i * 0.25 + waveCycle) * 28 + Math.cos(i * 0.1 - waveCycle * 0.5) * 12;
    return `${x},${y}`;
  }).join(" ");

  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(0, 255, 136, 0.2)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.9), 0 0 80px rgba(0, 255, 136, 0.15)",
        backgroundColor: "#050B08",
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
          {/* CRT Screen Bulbous Vignette */}
          <radialGradient id="crtGlass" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#0A241A" stopOpacity={crtFlicker} />
            <stop offset="70%" stopColor="#04120D" stopOpacity={crtFlicker} />
            <stop offset="100%" stopColor="#010604" />
          </radialGradient>

          {/* Phosphor Green Beam Glow */}
          <linearGradient id="phosphorBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00FF88" />
            <stop offset="50%" stopColor="#18FFFF" />
            <stop offset="100%" stopColor="#00E676" />
          </linearGradient>

          {/* CRT Plastic Housing Gray */}
          <linearGradient id="crtCase" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2A3036" />
            <stop offset="50%" stopColor="#1C2227" />
            <stop offset="100%" stopColor="#101518" />
          </linearGradient>
        </defs>

        {/* 1. Dark Room Background */}
        <rect width="520" height="420" fill="#040806" />

        {/* Phosphor Light Spilling onto Floor */}
        <ellipse cx="260" cy="380" rx="200" ry="30" fill="rgba(0, 255, 136, 0.12)" filter="blur(20px)" />

        {/* 2. Vintage Television Set */}
        {/* Antenna (Rabbit Ears) */}
        <line x1="260" y1="70" x2="180" y2="10" stroke="#78909C" strokeWidth="4" strokeLinecap="round" />
        <circle cx="180" cy="10" r="5" fill="#B0BEC5" />
        <line x1="260" y1="70" x2="340" y2="15" stroke="#78909C" strokeWidth="4" strokeLinecap="round" />
        <circle cx="340" cy="15" r="5" fill="#B0BEC5" />

        {/* Outer Heavy Plastic Casing */}
        <rect
          x="40"
          y="70"
          width="440"
          height="280"
          rx="28"
          fill="url(#crtCase)"
          stroke="#37474F"
          strokeWidth="3"
          filter="drop-shadow(0 15px 35px rgba(0, 0, 0, 0.8))"
        />

        {/* 3. Curved Glass Screen Bezel */}
        <rect
          x="65"
          y="92"
          width="320"
          height="236"
          rx="24"
          fill="url(#crtGlass)"
          stroke="#000000"
          strokeWidth="4"
        />

        {/* Horizontal Scanline Grid */}
        {Array.from({ length: 24 }).map((_, idx) => (
          <line
            key={`scanline-${idx}`}
            x1="65"
            y1={102 + idx * 10}
            x2="385"
            y2={102 + idx * 10}
            stroke="rgba(0, 0, 0, 0.45)"
            strokeWidth="2.5"
          />
        ))}

        {/* Oscilloscope Phosphor Vector Waveform */}
        <polyline
          points={wavePoints}
          fill="none"
          stroke="url(#phosphorBeam)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="drop-shadow(0 0 8px rgba(0, 255, 136, 0.9))"
        />

        {/* CRT Glass Reflection Arc */}
        <path
          d="M 85 105 Q 220 95, 360 108"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2.5"
        />

        {/* 4. Side Control Panel (Dials & Speaker Grille) */}
        <g transform="translate(400, 95)">
          {/* Top Dial */}
          <circle cx="25" cy="30" r="14" fill="#151A1E" stroke="#455A64" strokeWidth="2" />
          <line x1="25" y1="20" x2="25" y2="30" stroke="#00FF88" strokeWidth="2" />
          {/* Bottom Dial */}
          <circle cx="25" cy="75" r="14" fill="#151A1E" stroke="#455A64" strokeWidth="2" />
          <line x1="20" y1="70" x2="25" y2="75" stroke="#00FF88" strokeWidth="2" />

          {/* Red Power Indicator LED */}
          <circle cx="25" cy="120" r="4" fill="#FF1744" filter="drop-shadow(0 0 6px #FF1744)" />

          {/* Speaker Slits */}
          {[150, 162, 174, 186, 198, 210].map((sy) => (
            <line key={`spk-${sy}`} x1="8" y1={sy} x2="42" y2={sy} stroke="#0A0E11" strokeWidth="3" strokeLinecap="round" />
          ))}
        </g>
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
          backgroundColor: "rgba(0, 255, 136, 0.14)",
          border: "1px solid rgba(0, 255, 136, 0.4)",
          color: "#00FF88",
          fontFamily: "'Space Grotesk', monospace",
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
          color: "#E8FDF5",
          lineHeight: 1.25,
          textShadow: "0 4px 20px rgba(0, 255, 136, 0.4)",
        }}
      >
        {lyrics}
      </div>

      <div
        style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: "17px",
          color: "#69F0AE",
          letterSpacing: "0.08em",
        }}
      >
        Phosphor glow in a dark room • 90s Vintage Synth Lofi
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#030605",
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
      {/* Background Phosphor Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {visual}
      {typo}
      <FilmAtmosphere dustCount={14} vignetteStrength={0.5} />
    </div>
  );
};
