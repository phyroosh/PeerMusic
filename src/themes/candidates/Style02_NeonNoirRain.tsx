import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style02_NeonNoirRain: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const neonPulse = 0.85 + Math.sin(frame * 0.1) * 0.15;
  const rainOffset = (frame * 14) % 1080;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#05070C",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Helvetica Neue', 'Inter', sans-serif",
      }}
    >
      {/* 1. Midnight Wet Asphalt Radial Base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 60%, #0D1629 0%, #060912 60%, #030407 100%)",
        }}
      />

      {/* 2. Out-of-focus City Bokeh Lights */}
      {[
        { x: 320, y: 380, r: 85, c: "rgba(255, 30, 90, 0.28)" },
        { x: 500, y: 260, r: 120, c: "rgba(0, 240, 255, 0.22)" },
        { x: 960, y: 320, r: 150, c: "rgba(255, 170, 0, 0.25)" },
        { x: 1380, y: 290, r: 110, c: "rgba(255, 30, 90, 0.25)" },
        { x: 1550, y: 440, r: 90, c: "rgba(0, 240, 255, 0.2)" },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x + Math.sin(frame * 0.02 + i) * 15,
            top: b.y + Math.cos(frame * 0.02 + i) * 10,
            width: b.r * 2,
            height: b.r * 2,
            borderRadius: "50%",
            backgroundColor: b.c,
            filter: "blur(45px)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 3. Rain Streaks Down Glass Pane */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35, pointerEvents: "none" }}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (i * 64 + 30) % 1920;
          const y = ((i * 137 + rainOffset) % 1200) - 100;
          const length = 40 + (i % 5) * 20;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x + 3}
              y2={y + length}
              stroke="rgba(180, 220, 255, 0.5)"
              strokeWidth="1.2"
              strokeDasharray="10 5"
            />
          );
        })}
      </svg>

      {/* 4. Center Lyric Display with Electric Neon Glow */}
      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          maxWidth: "1350px",
          padding: "0 40px",
        }}
      >
        {/* Sleek Neon Status Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 20px",
            borderRadius: "30px",
            border: "1px solid rgba(0, 240, 255, 0.35)",
            backgroundColor: "rgba(0, 240, 255, 0.07)",
            marginBottom: "36px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#FF1E5A",
              boxShadow: "0 0 10px #FF1E5A",
            }}
          />
          <span
            style={{
              fontSize: "13px",
              letterSpacing: "4px",
              color: "#00F0FF",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            NIGHT DRIVE // 02:40 AM
          </span>
        </div>

        {/* Primary Lyric Line with Neon Tube Reflection */}
        <div
          style={{
            fontSize: "62px",
            lineHeight: 1.22,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            color: "#FFFFFF",
            textTransform: "none",
          }}
        >
          <span>Driving alone through the </span>
          <span
            style={{
              color: "#00F0FF",
              textShadow: `0 0 10px #00F0FF, 0 0 25px rgba(0, 240, 255, 0.8), 0 0 50px rgba(0, 240, 255, 0.4)`,
              opacity: neonPulse,
            }}
          >
            midnight rain
          </span>
        </div>

        {/* Sub-lyric Reflection */}
        <div
          style={{
            fontSize: "28px",
            marginTop: "24px",
            color: "rgba(255, 255, 255, 0.38)",
            fontWeight: 400,
            letterSpacing: "1px",
          }}
        >
          Headlights cutting through the mist, washed away again...
        </div>
      </div>

      {/* 5. Bottom Street Level Asphalt Reflection Horizon */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to top, rgba(0, 240, 255, 0.12) 0%, transparent 100%)",
          borderTop: "1px solid rgba(0, 240, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontSize: "13px", letterSpacing: "3px", color: "rgba(255, 255, 255, 0.4)" }}>
          WET WINDSHIELD OPTICS • 60 FPS
        </span>
        <span style={{ fontSize: "13px", letterSpacing: "3px", color: "#FF1E5A", textShadow: "0 0 8px #FF1E5A" }}>
          CYBER NOIR AESTHETIC
        </span>
      </div>
    </div>
  );
};
