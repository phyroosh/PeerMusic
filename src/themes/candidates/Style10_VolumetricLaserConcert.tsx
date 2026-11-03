import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style10_VolumetricLaserConcert: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const laserSweep = Math.sin(frame * 0.04) * 60;
  const strobeFlash = Math.sin(frame * 0.15) > 0.9 ? 1 : 0.85;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#020204",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Arial Black', 'Impact', sans-serif",
      }}
    >
      {/* 1. Volumetric Stage Laser Light Sheets (Sharp diagonal beams) */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="laserBeam1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#A78BFA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="laserBeam2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.7" />
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Diagonal Volumetric Laser 1 */}
        <polygon
          points={`0,0 200,0 ${1600 + laserSweep},1080 ${1300 + laserSweep},1080`}
          fill="url(#laserBeam1)"
          style={{ mixBlendMode: "screen", filter: "blur(4px)" }}
        />

        {/* Diagonal Volumetric Laser 2 */}
        <polygon
          points={`1920,0 1720,0 ${300 - laserSweep},1080 ${600 - laserSweep},1080`}
          fill="url(#laserBeam2)"
          style={{ mixBlendMode: "screen", filter: "blur(4px)" }}
        />

        {/* Horizontal Laser Line */}
        <line
          x1="0"
          y1="540"
          x2="1920"
          y2="540"
          stroke="#C084FC"
          strokeWidth="3"
          strokeOpacity="0.6"
          filter="drop-shadow(0 0 10px #A855F7)"
        />
      </svg>

      {/* 2. Crowd Atmosphere Bokeh at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "220px",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, transparent 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: "40px",
          zIndex: 5,
        }}
      >
        <span style={{ fontSize: "14px", letterSpacing: "5px", color: "rgba(255, 255, 255, 0.35)", textTransform: "uppercase" }}>
          LIVE ARENA STAGE • VOLUMETRIC LASER HAZE
        </span>
      </div>

      {/* 3. Center Backlit Blinding Typography */}
      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          maxWidth: "1400px",
          padding: "0 40px",
          opacity: strobeFlash,
        }}
      >
        <div
          style={{
            fontSize: "15px",
            letterSpacing: "8px",
            color: "#A78BFA",
            textTransform: "uppercase",
            marginBottom: "32px",
            fontWeight: 700,
          }}
        >
          STADIUM CHORUS DROP // FULL BLACKOUT
        </div>

        <div
          style={{
            fontSize: "76px",
            lineHeight: 1.15,
            fontWeight: 900,
            letterSpacing: "-1px",
            color: "#FFFFFF",
            textTransform: "uppercase",
            textShadow:
              "0 0 20px rgba(255, 255, 255, 0.9), 0 0 50px rgba(168, 85, 247, 0.8), 0 0 100px rgba(139, 92, 246, 0.5)",
          }}
        >
          TOLD ME YOU LOVED ME WHEN THE LIGHTS WENT DOWN
        </div>

        <div
          style={{
            fontSize: "26px",
            marginTop: "28px",
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Screaming in the dark, echoes through the soundboard...
        </div>
      </div>
    </div>
  );
};
