import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme15_FilmBurnCelluloid: React.FC<ThemeProps> = ({
  lyrics = "Ret jaise haath se phisalta waqt...",
  accent = "KODAK 35MM // 24 FPS",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Film burn rolling flicker & light leak
  const burnIntensity = 0.85 + Math.sin(frame * 0.15) * 0.15 + Math.cos(frame * 0.08) * 0.1;
  const scratchPos = (frame * 17) % 1920;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0C0A09",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Top Celluloid Sprocket Perforation Strip */}
      <div
        style={{
          width: "100%",
          height: "64px",
          backgroundColor: "#161311",
          borderBottom: "2px solid #2B2520",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 20px",
          boxSizing: "border-box",
          zIndex: 3,
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={`sprocket-top-${i}`}
            style={{
              width: "28px",
              height: "36px",
              borderRadius: "4px",
              backgroundColor: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          />
        ))}
      </div>

      {/* 2. Main Center Frame with Film Burn Light Leak */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: isLandscape ? "row" : "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isLandscape ? "40px 120px" : "30px 24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Massive Rolling Film Burn / Light Leak (Orange-Magenta Flare) */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "-10%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 107, 43, 0.45) 0%, rgba(217, 30, 91, 0.3) 45%, transparent 70%)",
            filter: "blur(70px)",
            opacity: burnIntensity,
            pointerEvents: "none",
          }}
        />

        {/* Left: Film Slate & Target Gate (SVG) */}
        <div
          style={{
            position: "relative",
            width: isLandscape ? "440px" : "300px",
            height: isLandscape ? "340px" : "240px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 440 340"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="filmBurnGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF6B2B" />
                <stop offset="60%" stopColor="#D91E5B" />
                <stop offset="100%" stopColor="#4A0E17" />
              </linearGradient>
            </defs>

            {/* Vintage Framing Guides */}
            <rect
              x="20"
              y="20"
              width="400"
              height="300"
              rx="8"
              fill="rgba(255, 255, 255, 0.02)"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
            />
            {/* Center Crosshair Target */}
            <circle cx="220" cy="170" r="90" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <circle cx="220" cy="170" r="40" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
            <line x1="220" y1="60" x2="220" y2="280" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <line x1="110" y1="170" x2="330" y2="170" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />

            {/* Celluloid Film Frame Counter Dial */}
            <text
              x="220"
              y="185"
              textAnchor="middle"
              fontFamily="'Space Grotesk', monospace"
              fontSize="48"
              fontWeight="900"
              fill="#FFFFFF"
              letterSpacing="2"
              opacity="0.9"
            >
              8
            </text>

            {/* Film Gauge Markings */}
            <text x="35" y="45" fontFamily="'Space Grotesk', monospace" fontSize="12" fill="#E8D5B5" letterSpacing="2">
              FRAME // 1440
            </text>
            <text x="35" y="305" fontFamily="'Space Grotesk', monospace" fontSize="12" fill="#FF6B2B" letterSpacing="2">
              KODAK VISION3 500T
            </text>
          </svg>
        </div>

        {/* Right: Vintage Cinema Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "600px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "4px",
              backgroundColor: "rgba(255, 107, 43, 0.18)",
              border: "1px solid rgba(255, 107, 43, 0.5)",
              color: "#FF6B2B",
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
              fontSize: isLandscape ? "46px" : "32px",
              fontWeight: 800,
              color: "#FFF9F0",
              lineHeight: 1.25,
              textShadow: "0 0 35px rgba(255, 107, 43, 0.4)",
            }}
          >
            {lyrics}
          </div>

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "16px",
              color: "#D4BBA5",
              letterSpacing: "0.08em",
            }}
          >
            35mm analog celluloid with rolling light leaks • Vintage Indie Ballad
          </div>
        </div>
      </div>

      {/* 3. Bottom Celluloid Sprocket Perforation Strip */}
      <div
        style={{
          width: "100%",
          height: "64px",
          backgroundColor: "#161311",
          borderTop: "2px solid #2B2520",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 20px",
          boxSizing: "border-box",
          zIndex: 3,
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={`sprocket-bot-${i}`}
            style={{
              width: "28px",
              height: "36px",
              borderRadius: "4px",
              backgroundColor: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          />
        ))}
      </div>

      {/* Vertical Emulsion Scratches */}
      <line
        x1={scratchPos}
        y1="0"
        x2={scratchPos}
        y2="100%"
        style={{ position: "absolute", top: 0, left: `${scratchPos}px`, width: "1px", height: "100%", backgroundColor: "rgba(255,255,255,0.08)" }}
      />

      <FilmAtmosphere dustCount={20} vignetteStrength={0.6} />
    </div>
  );
};
