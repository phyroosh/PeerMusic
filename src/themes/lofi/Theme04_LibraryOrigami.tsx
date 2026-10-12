import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme04_LibraryOrigami: React.FC<ThemeProps> = ({
  lyrics = "Kore kagazon pe dhoonde naye lafz...",
  accent = "KITAABEIN // STUDY",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Floating origami cranes motion
  const crane1Y = Math.sin(frame * 0.05) * 14;
  const crane1Rot = Math.sin(frame * 0.04) * 6;
  const crane2Y = Math.cos(frame * 0.06 + 1) * 18;
  const crane2Rot = Math.cos(frame * 0.05) * 8;

  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(223, 178, 71, 0.15)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 70px rgba(223, 178, 71, 0.1)",
        backgroundColor: "#0D0A08",
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
          {/* Volumetric Lamp Light Cone */}
          <linearGradient id="lampCone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DFB247" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#C49B38" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#DFB247" stopOpacity="0" />
          </linearGradient>

          {/* Banker's Lamp Green Glass Shade */}
          <linearGradient id="bankerGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B5E39" />
            <stop offset="50%" stopColor="#124027" />
            <stop offset="100%" stopColor="#0B2618" />
          </linearGradient>

          {/* Brass Metal */}
          <linearGradient id="brassMetal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F9DF92" />
            <stop offset="50%" stopColor="#C89D34" />
            <stop offset="100%" stopColor="#7E5F19" />
          </linearGradient>

          {/* Parchment Book Spine */}
          <linearGradient id="book1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8D3426" />
            <stop offset="100%" stopColor="#5E1E14" />
          </linearGradient>
          <linearGradient id="book2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A4B7C" />
            <stop offset="100%" stopColor="#182E4E" />
          </linearGradient>
        </defs>

        {/* 1. Dark Atmospheric Background */}
        <rect width="520" height="420" fill="#0D0A08" />

        {/* Volumetric Light Cone from Banker's Lamp */}
        <polygon points="170,175 30,420 370,420" fill="url(#lampCone)" />

        {/* 2. Wooden Mahogany Desk Surface */}
        <rect x="0" y="340" width="520" height="80" fill="#1C140E" />
        <line x1="0" y1="340" x2="520" y2="340" stroke="#38291C" strokeWidth="2" />

        {/* 3. Stack of Hardcover Books */}
        <g transform="translate(80, 260)">
          {/* Bottom Book */}
          <rect x="0" y="50" width="160" height="28" rx="3" fill="url(#book1)" />
          <rect x="150" y="52" width="8" height="24" fill="#F0E5D3" />
          {/* Middle Book */}
          <rect x="15" y="24" width="140" height="26" rx="3" fill="url(#book2)" />
          <rect x="145" y="26" width="8" height="22" fill="#F0E5D3" />
          {/* Top Open Parchment Journal */}
          <rect x="25" y="2" width="125" height="22" rx="3" fill="#D4AF37" opacity="0.85" />
          {/* Ribbon Bookmark */}
          <path d="M 90 24 L 90 60 L 96 54 L 102 60 L 102 24 Z" fill="#C93B2B" />
        </g>

        {/* 4. Vintage Brass Banker's Lamp */}
        <g transform="translate(140, 120)">
          {/* Brass Base */}
          <ellipse cx="60" cy="220" rx="35" ry="10" fill="url(#brassMetal)" />
          {/* Brass Neck Curved Arch */}
          <path
            d="M 60 220 L 60 100 C 60 60, 30 50, 30 50"
            fill="none"
            stroke="url(#brassMetal)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Green Emerald Glass Shade */}
          <path
            d="M -10 50 C -10 30, 70 30, 70 50 C 70 56, -10 56, -10 50 Z"
            fill="url(#bankerGlass)"
            stroke="url(#brassMetal)"
            strokeWidth="2"
            filter="drop-shadow(0 4px 12px rgba(18, 64, 39, 0.6))"
          />
          {/* Inner Light Bulb Glow */}
          <circle cx="30" cy="54" r="10" fill="#FFFBEB" filter="drop-shadow(0 0 16px rgba(254, 240, 138, 0.9))" />
        </g>

        {/* 5. Floating Origami Cranes (Symbolic Metaphor for Unspoken Letters) */}
        {/* Crane 1 (Large) */}
        <g transform={`translate(360, ${180 + crane1Y}) rotate(${crane1Rot}) scale(0.95)`}>
          {/* Origami Geometric Facets */}
          <polygon points="0,0 35,-30 20,20" fill="#FBF7EE" />
          <polygon points="0,0 20,20 -25,25" fill="#E8DEC9" />
          <polygon points="0,0 35,-30 60,-10" fill="#DFD1B8" />
          <polygon points="0,0 -35,-25 -25,25" fill="#FAF5E8" />
          <polygon points="-35,-25 -50,-15 -25,25" fill="#D3C3A7" />
          {/* Subtle Golden Shadow */}
          <polygon points="0,0 20,20 15,35" fill="rgba(212, 175, 55, 0.4)" />
        </g>

        {/* Crane 2 (Smaller, higher in flight) */}
        <g transform={`translate(420, ${90 + crane2Y}) rotate(${crane2Rot}) scale(0.65)`}>
          <polygon points="0,0 35,-30 20,20" fill="#FBF7EE" />
          <polygon points="0,0 20,20 -25,25" fill="#E8DEC9" />
          <polygon points="0,0 35,-30 60,-10" fill="#DFD1B8" />
          <polygon points="0,0 -35,-25 -25,25" fill="#FAF5E8" />
          <polygon points="-35,-25 -50,-15 -25,25" fill="#D3C3A7" />
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
          backgroundColor: "rgba(223, 178, 71, 0.14)",
          border: "1px solid rgba(223, 178, 71, 0.4)",
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
          color: "#FDFBF7",
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
          color: "#D1C2A5",
          letterSpacing: "0.08em",
        }}
      >
        Quiet study nights & origami thoughts • Warm Nylon Guitar
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0A0806",
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
      {/* Background Amber Halo */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "20%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(223, 178, 71, 0.08) 0%, transparent 70%)",
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
