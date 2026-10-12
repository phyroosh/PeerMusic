import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme17_HighwayLightTrails: React.FC<ThemeProps> = ({
  lyrics = "Raaste badal gaye, par manzilein wahi...",
  accent = "EXPOSURE // HIGHWAY NIGHT",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Kinetic sweep of light streaks
  const trailSweep = (frame * 3.5) % 800;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#06070B",
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
      {/* Visual: Long Exposure Highway Light Trails (SVG) */}
      <div
        style={{
          position: "relative",
          width: isLandscape ? "540px" : "360px",
          height: isLandscape ? "420px" : "300px",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(255, 30, 60, 0.25)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.9), 0 0 80px rgba(255, 30, 60, 0.15)",
          backgroundColor: "#080910",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 540 420"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            {/* Mountain Valley Fog */}
            <linearGradient id="valleyFog" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B0D18" />
              <stop offset="60%" stopColor="#141724" />
              <stop offset="100%" stopColor="#1C2030" />
            </linearGradient>

            {/* Red Taillight Streak */}
            <linearGradient id="taillightTrail" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF1744" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FF1744" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF5252" stopOpacity="1" />
            </linearGradient>

            {/* White/Amber Headlight Streak */}
            <linearGradient id="headlightTrail" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE57F" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FFF9C4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* 1. Valley Fog & Distant Mountain Ridges */}
          <rect width="540" height="420" fill="url(#valleyFog)" />

          {/* Mountain Ridge Silhouettes */}
          <path d="M 0 220 Q 140 180, 270 210 T 540 190 L 540 420 L 0 420 Z" fill="#0C0E16" />
          <path d="M 0 270 Q 200 240, 360 270 T 540 250 L 540 420 L 0 420 Z" fill="#07080D" />

          {/* Highway Asphalt Road Surface */}
          <polygon points="270,220 290,220 540,420 80,420" fill="#0B0D13" stroke="#1A1E29" strokeWidth="1" />

          {/* 2. Sweeping Taillight Neon Crimson Streaks (Right Lane) */}
          <path
            d="M 285 220 Q 340 290, 480 420"
            fill="none"
            stroke="url(#taillightTrail)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="drop-shadow(0 0 16px #FF1744)"
          />
          <path
            d="M 288 220 Q 345 290, 495 420"
            fill="none"
            stroke="#FF5252"
            strokeWidth="3"
            filter="drop-shadow(0 0 8px #FF1744)"
          />
          <path
            d="M 292 220 Q 355 290, 520 420"
            fill="none"
            stroke="#FF1744"
            strokeWidth="5"
            opacity="0.8"
          />

          {/* 3. Sweeping Headlight White/Gold Streaks (Left Lane) */}
          <path
            d="M 275 220 Q 210 290, 140 420"
            fill="none"
            stroke="url(#headlightTrail)"
            strokeWidth="7"
            strokeLinecap="round"
            filter="drop-shadow(0 0 16px #FFF9C4)"
          />
          <path
            d="M 272 220 Q 205 290, 120 420"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
          />

          {/* Vanishing Point Glow */}
          <circle cx="280" cy="220" r="14" fill="#FFFFFF" opacity="0.6" filter="blur(6px)" />
        </svg>
      </div>

      {/* Right: Cinematic Night-Drive Typography */}
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
            backgroundColor: "rgba(255, 23, 68, 0.16)",
            border: "1px solid rgba(255, 23, 68, 0.45)",
            color: "#FF5252",
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
            color: "#FFF5F5",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            textShadow: "0 0 30px rgba(255, 23, 68, 0.45)",
          }}
        >
          {lyrics}
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px",
            color: "#A2A7B8",
            letterSpacing: "0.08em",
          }}
        >
          Long exposure taillights on mountain highways • Night Drive Lofi
        </div>
      </div>

      <FilmAtmosphere dustCount={12} vignetteStrength={0.55} />
    </div>
  );
};
