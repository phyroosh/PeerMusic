import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme08_VinylOrbit: React.FC<ThemeProps> = ({
  lyrics = "Har sukoon mein teri hi dhoon baje...",
  accent = "DHOON // VINYL ORBIT",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Vinyl disc spin
  const discRotation = (frame * 1.8) % 360;
  // Tonearm subtle breathing
  const tonearmAngle = 22 + Math.sin(frame * 0.03) * 1.2;

  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(212, 175, 55, 0.2)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(212, 175, 55, 0.12)",
        backgroundColor: "#08080C",
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
          {/* Vinyl Specular Reflection Sheen */}
          <linearGradient id="vinylSheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
            <stop offset="30%" stopColor="rgba(255, 255, 255, 0.02)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.18)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.02)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.12)" />
          </linearGradient>

          {/* Brass Tonearm Metallic */}
          <linearGradient id="brassTonearm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F5DF9E" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6D1C" />
          </linearGradient>

          {/* Center Label Sunset Purple */}
          <radialGradient id="centerLabel" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E07A5F" />
            <stop offset="60%" stopColor="#8134AF" />
            <stop offset="100%" stopColor="#4A154B" />
          </radialGradient>
        </defs>

        {/* 1. Deep Space Turntable Deck Plinth */}
        <rect width="520" height="420" fill="#0A0A0F" />
        {/* Subtle Plinth Edge Highlight */}
        <rect x="20" y="20" width="480" height="380" rx="18" fill="#111118" stroke="#1E1E28" strokeWidth="2" />

        {/* 2. Rotating Vinyl Record Platter */}
        <g transform="translate(210, 210)">
          {/* Outer Vinyl Edge */}
          <circle cx="0" cy="0" r="160" fill="#0B0B0E" stroke="#252530" strokeWidth="2" />

          {/* Concentric Grooves */}
          {[150, 140, 130, 120, 110, 100, 90, 80].map((r) => (
            <circle
              key={`groove-${r}`}
              cx="0"
              cy="0"
              r={r}
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="0.8"
            />
          ))}

          {/* Stardust Planetary Ring Highlights */}
          <circle cx="0" cy="0" r="125" fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1" strokeDasharray="6 14" />
          <circle cx="0" cy="0" r="95" fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="0.8" strokeDasharray="3 8" />

          {/* Light Sheen Cones */}
          <path d="M 0 0 L -110 -110 A 160 160 0 0 1 110 -110 Z" fill="url(#vinylSheen)" />
          <path d="M 0 0 L 110 110 A 160 160 0 0 1 -110 110 Z" fill="url(#vinylSheen)" />

          {/* Center Record Label (Spinning) */}
          <g transform={`rotate(${discRotation})`}>
            <circle cx="0" cy="0" r="54" fill="url(#centerLabel)" stroke="#DFB247" strokeWidth="1.5" />
            <text
              x="0"
              y="-18"
              textAnchor="middle"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="8"
              fontWeight="700"
              fill="#FFFFFF"
              letterSpacing="2"
            >
              PEERMUSIC LOFI
            </text>
            <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="6" fill="#0A0A0F" stroke="#D4AF37" strokeWidth="1" />
          </g>
        </g>

        {/* 3. Golden Brass Tonearm Assembly */}
        <g transform="translate(420, 90)">
          {/* Base Pivot */}
          <circle cx="0" cy="0" r="28" fill="#1E1E28" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="0" cy="0" r="14" fill="#D4AF37" />

          {/* Articulated Arm */}
          <g transform={`rotate(${tonearmAngle})`}>
            {/* Tone Arm Rod */}
            <path
              d="M 0 0 L -60 120 L -120 180"
              fill="none"
              stroke="url(#brassTonearm)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Cartridge Head-shell & Stylus */}
            <rect
              x="-135"
              y="172"
              width="24"
              height="16"
              rx="3"
              transform="rotate(35, -123, 180)"
              fill="#181820"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Stylus Contact Glow */}
            <circle cx="-120" cy="190" r="3" fill="#FFE082" filter="drop-shadow(0 0 6px #DFB247)" />
          </g>
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
          backgroundColor: "rgba(212, 175, 55, 0.14)",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          color: "#DFB247",
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
          color: "#FAF8F2",
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
          color: "#C5B388",
          letterSpacing: "0.08em",
        }}
      >
        Planetary vinyl grooves & warm crackle • Soulful Boom-Bap
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#050508",
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
      {/* Background Gold Aura */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
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
