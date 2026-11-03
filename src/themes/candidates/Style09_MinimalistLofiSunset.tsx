import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style09_MinimalistLofiSunset: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const sunDip = Math.sin(frame * 0.03) * 8;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#13091B",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif",
      }}
    >
      {/* 1. Dusk Twilight Sunset Sky Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #1C0A35 0%, #4A154B 40%, #B83A64 70%, #F59E6C 100%)",
        }}
      />

      {/* 2. Stylized Segmented Wireframe Sunset Sun */}
      <div
        style={{
          position: "absolute",
          bottom: "260px",
          left: "50%",
          transform: `translate(-50%, ${sunDip}px)`,
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "linear-gradient(180deg, #FFED4A 0%, #FF76AC 60%, #E53E3E 100%)",
          boxShadow: "0 0 80px rgba(255, 118, 172, 0.6)",
        }}
      />

      {/* 3. Tokyo Skyline Silhouette & Highway Trails */}
      <svg
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "300px", zIndex: 5 }}
        viewBox="0 0 1920 300"
        preserveAspectRatio="none"
      >
        {/* City Buildings Silhouette */}
        <polygon
          points="
            0,300 0,160 80,160 80,120 140,120 140,180 220,180 220,90 280,90 280,200
            380,200 380,140 450,140 450,70 480,70 480,220 600,220 600,110 680,110 680,170
            800,170 800,50 850,50 850,190 980,190 980,130 1060,130 1060,80 1100,80 1100,210
            1240,210 1240,100 1320,100 1320,180 1450,180 1450,60 1500,60 1500,220
            1650,220 1650,120 1720,120 1720,170 1820,170 1820,90 1920,90 1920,300
          "
          fill="#0D0614"
        />

        {/* Highway Light Trails */}
        <path
          d="M 0,285 Q 960,250 1920,285"
          fill="none"
          stroke="#FF007F"
          strokeWidth="6"
          filter="drop-shadow(0 0 8px #FF007F)"
          opacity="0.85"
        />
        <path
          d="M 0,295 Q 960,265 1920,295"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="4"
          filter="drop-shadow(0 0 8px #00F0FF)"
          opacity="0.85"
        />
      </svg>

      {/* 4. Top Japanese City Pop Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "50px 80px",
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: "14px", letterSpacing: "5px", color: "#FFED4A", fontWeight: 700 }}>
          TOKYO TWILIGHT // CITY POP RETRO
        </span>
        <span style={{ fontSize: "14px", letterSpacing: "4px", color: "rgba(255, 255, 255, 0.6)" }}>
          80S ANIME HORIZON
        </span>
      </div>

      {/* 5. Center Lyric Line with Dual-Tone Glow */}
      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          padding: "0 40px",
          marginBottom: "120px",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            lineHeight: 1.2,
            fontStyle: "italic",
            fontWeight: 800,
            letterSpacing: "2px",
            color: "#FFF5F7",
            textShadow:
              "0 0 15px rgba(255, 0, 127, 0.8), 0 0 35px rgba(245, 158, 108, 0.6), 0 4px 15px rgba(0, 0, 0, 0.7)",
          }}
        >
          Midnight drives under neon skies
        </div>

        <div
          style={{
            fontSize: "28px",
            marginTop: "20px",
            color: "#FFED4A",
            letterSpacing: "3px",
            fontWeight: 600,
            textShadow: "0 0 10px rgba(255, 237, 74, 0.6)",
          }}
        >
          City lights reflecting in the rearview mirror...
        </div>
      </div>
    </div>
  );
};
