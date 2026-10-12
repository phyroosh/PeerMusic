import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme02_CassetteRibbon: React.FC<ThemeProps> = ({
  lyrics = "Purani yaadein phir se rewind hui...",
  accent = "REWIND // 1998",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Spool rotation
  const spoolRotation = (frame * 1.5) % 360;

  // Wave undulation of the unspooled magnetic tape ribbon
  const ribbonWave1 = Math.sin(frame * 0.05) * 16;
  const ribbonWave2 = Math.cos(frame * 0.06 + 1) * 20;
  const ribbonWave3 = Math.sin(frame * 0.07 + 2) * 14;

  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 520 420"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Cassette Body Gradient */}
          <linearGradient id="cassetteBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2A2420" />
            <stop offset="50%" stopColor="#1E1916" />
            <stop offset="100%" stopColor="#120F0D" />
          </linearGradient>

          {/* Magnetic Ribbon Gradient */}
          <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A0522D" />
            <stop offset="40%" stopColor="#D97736" />
            <stop offset="70%" stopColor="#8B4513" />
            <stop offset="100%" stopColor="#4A2511" />
          </linearGradient>

          {/* Vintage Label Paper */}
          <linearGradient id="tapeLabel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5ECE0" />
            <stop offset="100%" stopColor="#DFD1BE" />
          </linearGradient>
        </defs>

        {/* Floating Unspooling Magnetic Tape Ribbon (Curves behind & around) */}
        <path
          d={`M 260 270 C ${180 + ribbonWave1} 330, ${120 + ribbonWave2} 360, ${40} ${330 + ribbonWave3} S ${-40} 260, ${-80} 340`}
          fill="none"
          stroke="url(#ribbonGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.85"
          filter="drop-shadow(0 8px 16px rgba(0,0,0,0.6))"
        />
        <path
          d={`M 320 270 C ${400 + ribbonWave2} 320, ${460 + ribbonWave1} 270, ${540} ${330 + ribbonWave2} S ${600} 380, ${640} 300`}
          fill="none"
          stroke="url(#ribbonGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.7"
          filter="drop-shadow(0 8px 16px rgba(0,0,0,0.6))"
        />

        {/* Vintage Cassette Shell */}
        <g transform="translate(60, 60)">
          {/* Main Outer Body */}
          <rect
            x="0"
            y="0"
            width="400"
            height="250"
            rx="18"
            fill="url(#cassetteBody)"
            stroke="rgba(245, 236, 224, 0.15)"
            strokeWidth="2"
            filter="drop-shadow(0 20px 40px rgba(0,0,0,0.8))"
          />

          {/* Vintage Paper Label */}
          <rect
            x="24"
            y="20"
            width="352"
            height="150"
            rx="8"
            fill="url(#tapeLabel)"
          />

          {/* Label Red & Blue Vintage Stripes */}
          <rect x="24" y="32" width="352" height="6" fill="#D9534F" />
          <rect x="24" y="42" width="352" height="4" fill="#337AB7" />

          {/* Label Handwritten Text */}
          <text
            x="40"
            y="70"
            fontFamily="'Space Grotesk', monospace"
            fontSize="15"
            fontWeight="700"
            fill="#2B2520"
            letterSpacing="2"
          >
            SIDE A • LOFI MEMORIES
          </text>
          <text
            x="40"
            y="88"
            fontFamily="'Inter', sans-serif"
            fontSize="12"
            fill="#6E6258"
          >
            Nostalgic Rhodes & Tape Hiss (82 BPM)
          </text>

          {/* Center Transparent Window */}
          <rect
            x="90"
            y="98"
            width="220"
            height="62"
            rx="6"
            fill="#120F0D"
            stroke="#DFD1BE"
            strokeWidth="1.5"
          />

          {/* Left Spool */}
          <g transform="translate(150, 129)">
            <circle cx="0" cy="0" r="24" fill="#DFD1BE" />
            <circle cx="0" cy="0" r="14" fill="#120F0D" />
            <g transform={`rotate(${spoolRotation})`}>
              <rect x="-3" y="-14" width="6" height="28" fill="#DFD1BE" />
              <rect x="-14" y="-3" width="28" height="6" fill="#DFD1BE" />
            </g>
          </g>

          {/* Right Spool */}
          <g transform="translate(250, 129)">
            <circle cx="0" cy="0" r="24" fill="#DFD1BE" />
            <circle cx="0" cy="0" r="14" fill="#120F0D" />
            <g transform={`rotate(${spoolRotation})`}>
              <rect x="-3" y="-14" width="6" height="28" fill="#DFD1BE" />
              <rect x="-14" y="-3" width="28" height="6" fill="#DFD1BE" />
            </g>
          </g>

          {/* Tape Level Between Spools */}
          <line x1="174" y1="129" x2="226" y2="129" stroke="#A0522D" strokeWidth="18" opacity="0.6" />

          {/* Bottom Trapezoid Guide Area */}
          <polygon
            points="70,250 100,200 300,200 330,250"
            fill="#171311"
            stroke="rgba(245, 236, 224, 0.1)"
            strokeWidth="1"
          />
          {/* Pressure Pad & Rollers */}
          <circle cx="120" cy="225" r="7" fill="#DFD1BE" />
          <circle cx="280" cy="225" r="7" fill="#DFD1BE" />
          <rect x="185" y="218" width="30" height="12" rx="2" fill="#D97736" />
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
          borderRadius: "4px",
          backgroundColor: "rgba(217, 119, 54, 0.14)",
          border: "1px solid rgba(217, 119, 54, 0.4)",
          color: "#E57E3B",
          fontFamily: "'Space Grotesk', monospace",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.25em",
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
          color: "#F6EFE7",
          lineHeight: 1.25,
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
        }}
      >
        {lyrics}
      </div>

      <div
        style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: "16px",
          color: "#A8988B",
          letterSpacing: "0.06em",
        }}
      >
        Fluttering tape reels & nostalgic chords • 90s Desi Indie
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#110E0C",
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
      {/* Warm Ambient Backlight */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "25%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217, 119, 54, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {visual}
      {typo}
      <FilmAtmosphere dustCount={14} vignetteStrength={0.55} />
    </div>
  );
};
