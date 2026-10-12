import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { PaperTexture } from "../../engine/camera/PaperTexture";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme16_BlueprintAirplane: React.FC<ThemeProps> = ({
  lyrics = "Kagaz ka jahaaz aur unche aasman...",
  accent = "BLUEPRINT // TRAJECTORY",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Paper airplane gentle banking & gliding loop
  const planeGlideY = Math.sin(frame * 0.05) * 14;
  const planeAngle = -12 + Math.cos(frame * 0.04) * 4;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0A192F",
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
      {/* Blueprint Grid Lines & Drafting Annotations */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.22, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="blueprintGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="none" stroke="#64DFDF" strokeWidth="0.7" />
            <rect width="10" height="10" fill="none" stroke="#64DFDF" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprintGrid)" />

        {/* Diagonal Drafting Horizon Axis */}
        <line x1="0" y1="1080" x2="1920" y2="0" stroke="#64DFDF" strokeWidth="1" strokeDasharray="12 6" />
      </svg>

      {/* Left: Folded Origami Paper Airplane on Looping Trajectory (SVG) */}
      <div
        style={{
          position: "relative",
          width: isLandscape ? "520px" : "360px",
          height: isLandscape ? "460px" : "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 520 460"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Chalk Dashed Path Gradient */}
            <linearGradient id="chalkPath" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#64DFDF" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#64DFDF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
            </linearGradient>

            {/* Paper Airplane Geometric Facets */}
            <linearGradient id="planeLeftWing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D5E3EE" />
            </linearGradient>
            <linearGradient id="planeRightWing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#BDD0DE" />
              <stop offset="100%" stopColor="#8DA3B3" />
            </linearGradient>
            <linearGradient id="planeKeel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B92A4" />
              <stop offset="100%" stopColor="#556E80" />
            </linearGradient>
          </defs>

          {/* 1. Compass Drafting Circles in Blueprint */}
          <circle cx="260" cy="230" r="180" fill="none" stroke="#64DFDF" strokeWidth="1" strokeDasharray="8 8" opacity="0.3" />
          <circle cx="260" cy="230" r="90" fill="none" stroke="#64DFDF" strokeWidth="0.8" opacity="0.2" />

          {/* 2. Looping Dashed Flight Trajectory Path */}
          <path
            d="M 60 410 C 140 380, 180 280, 150 200 C 120 120, 210 100, 270 180 C 310 240, 360 210, 410 160"
            fill="none"
            stroke="url(#chalkPath)"
            strokeWidth="3"
            strokeDasharray="10 8"
            strokeLinecap="round"
          />

          {/* 3. Origami Paper Airplane Model (At endpoint of trajectory) */}
          <g transform={`translate(410, ${160 + planeGlideY}) rotate(${planeAngle}) scale(1.15)`}>
            {/* Left Top Wing Facet */}
            <polygon points="0,0 -90,-45 -65,0" fill="url(#planeLeftWing)" filter="drop-shadow(0 12px 24px rgba(0,0,0,0.5))" />
            {/* Right Slanted Wing Facet */}
            <polygon points="0,0 -90,45 -65,0" fill="url(#planeRightWing)" />
            {/* Center Fold Crease Keel */}
            <polygon points="0,0 -65,0 -85,15" fill="url(#planeKeel)" />
            {/* Top Wing Shading Line */}
            <line x1="0" y1="0" x2="-65" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>

          {/* 4. Drafting Coordinate Notes */}
          <text x="70" y="430" fontFamily="'Space Grotesk', monospace" fontSize="11" fill="#64DFDF" letterSpacing="1" opacity="0.7">
            [ORIGIN: 02°14'N]
          </text>
          <text x="350" y="90" fontFamily="'Space Grotesk', monospace" fontSize="11" fill="#64DFDF" letterSpacing="1" opacity="0.7">
            [ALTITUDE: +380M]
          </text>
        </svg>
      </div>

      {/* Right: Technical Blueprint Typography */}
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
            borderRadius: "3px",
            backgroundColor: "rgba(100, 223, 223, 0.15)",
            border: "1px solid rgba(100, 223, 223, 0.45)",
            color: "#64DFDF",
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
            color: "#FFFFFF",
            lineHeight: 1.25,
            textShadow: "0 0 30px rgba(100, 223, 223, 0.4)",
          }}
        >
          {lyrics}
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px",
            color: "#8892B0",
            letterSpacing: "0.08em",
          }}
        >
          Paper airplane trajectory across drafting grids • Dreamy Indie Pop
        </div>
      </div>

      <PaperTexture opacity={0.08} />
    </div>
  );
};
