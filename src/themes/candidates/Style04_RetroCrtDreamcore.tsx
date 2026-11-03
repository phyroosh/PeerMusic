import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style04_RetroCrtDreamcore: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const jitter = Math.sin(frame * 0.4) * 1.5;
  const scanlineShift = (frame * 2) % 4;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0A0908",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Courier New', monospace",
      }}
    >
      {/* 1. Ambient CRT TV Frame / Vignette */}
      <div
        style={{
          width: "1400px",
          height: "820px",
          borderRadius: "40px",
          backgroundColor: "#111417",
          boxShadow: "0 0 80px rgba(0, 0, 0, 0.9), inset 0 0 40px rgba(0, 0, 0, 0.8)",
          border: "12px solid #1C2025",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "50px 70px",
          boxSizing: "border-box",
        }}
      >
        {/* Curved CRT Screen Phosphor Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 50%, rgba(35, 60, 50, 0.3) 0%, rgba(10, 15, 12, 0.95) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Scanlines Pattern Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0px, rgba(0, 0, 0, 0.45) 2px, transparent 2px, transparent 4px)`,
            backgroundPosition: `0 ${scanlineShift}px`,
            pointerEvents: "none",
            opacity: 0.85,
          }}
        />

        {/* 2. Authentic Camcorder OSD Overlay */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#34D399",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "3px",
            zIndex: 10,
            textShadow: "0 0 10px rgba(52, 211, 153, 0.7)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "#EF4444" }}>● REC</span>
            <span>PLAY ▶</span>
            <span style={{ fontSize: "16px", color: "rgba(52, 211, 153, 0.7)" }}>SP</span>
          </div>
          <div>00:03:24:18</div>
          <div style={{ border: "2px solid #34D399", padding: "2px 8px", fontSize: "14px", borderRadius: "3px" }}>
            [■■■□]
          </div>
        </div>

        {/* 3. Center Lyric Display with Chromatic Aberration RGB Shift */}
        <div
          style={{
            zIndex: 10,
            textAlign: "center",
            transform: `translate(${jitter}px, 0)`,
          }}
        >
          {/* Main Lyric Line with Phosphor Bleed */}
          <div
            style={{
              fontSize: "56px",
              lineHeight: 1.3,
              fontWeight: 800,
              color: "#F3F4F6",
              textShadow:
                "-2.5px 0 0 rgba(255, 0, 60, 0.85), 2.5px 0 0 rgba(0, 240, 255, 0.85), 0 0 15px rgba(255, 255, 255, 0.6)",
              letterSpacing: "1px",
            }}
          >
            Just like a memory fading on the tape...
          </div>

          {/* Sub-text glow */}
          <div
            style={{
              fontSize: "26px",
              color: "#34D399",
              marginTop: "20px",
              letterSpacing: "2px",
              textShadow: "0 0 8px rgba(52, 211, 153, 0.6)",
            }}
          >
            [ AUDIO TRACK 02 // CHROMA OFFSET ACTIVE ]
          </div>
        </div>

        {/* 4. Bottom CRT OSD & Date Stamp */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(52, 211, 153, 0.7)",
            fontSize: "18px",
            letterSpacing: "3px",
            zIndex: 10,
          }}
        >
          <div>OCT. 21 1994 • HI-8 ANALOG</div>
          <div>AUTO-TRACKING: 98%</div>
        </div>
      </div>
    </div>
  );
};
