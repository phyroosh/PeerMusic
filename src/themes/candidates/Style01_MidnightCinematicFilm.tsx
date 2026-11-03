import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style01_MidnightCinematicFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Subtle breathing motion of light leaks and dust
  const leakX = 20 + Math.sin(frame * 0.04) * 15;
  const leakOpacity = 0.5 + Math.sin(frame * 0.05) * 0.15;
  const flareWidth = 600 + Math.sin(frame * 0.06) * 50;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#07080B",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Georgia', 'Playfair Display', serif",
      }}
    >
      {/* 1. Deep Atmospheric Vignette & Film Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 45%, #161822 0%, #08090D 70%, #030406 100%)",
        }}
      />

      {/* 2. Anamorphic Warm Amber Light Leak */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: `${leakX}%`,
          width: "550px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(235, 150, 50, 0.22) 0%, rgba(200, 80, 20, 0.08) 50%, transparent 75%)",
          filter: "blur(70px)",
          opacity: leakOpacity,
          pointerEvents: "none",
        }}
      />

      {/* 3. Horizontal Anamorphic Lens Flare Streak */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${flareWidth}px`,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(245, 180, 70, 0.6) 50%, transparent 100%)",
          filter: "blur(1px)",
          boxShadow: "0 0 15px rgba(245, 160, 50, 0.5)",
          pointerEvents: "none",
        }}
      />

      {/* 4. Drifting 35mm Dust Motes */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        {[
          { x: 300, y: 350, r: 1.5, o: 0.4 },
          { x: 650, y: 220, r: 2.2, o: 0.6 },
          { x: 920, y: 410, r: 1.8, o: 0.5 },
          { x: 1250, y: 280, r: 2.5, o: 0.7 },
          { x: 1540, y: 480, r: 1.2, o: 0.3 },
          { x: 450, y: 620, r: 1.6, o: 0.4 },
          { x: 1100, y: 700, r: 2.0, o: 0.5 },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.x + Math.sin(frame * 0.03 + i) * 12}
            cy={p.y + Math.cos(frame * 0.03 + i) * 8}
            r={p.r}
            fill="#F5D7A1"
            opacity={p.o}
            filter="blur(0.5px)"
          />
        ))}
      </svg>

      {/* 5. Center Kinetic Lyric Composition */}
      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          maxWidth: "1300px",
          padding: "0 40px",
        }}
      >
        {/* Track Chapter Marker */}
        <div
          style={{
            fontSize: "15px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#D99B52",
            marginBottom: "28px",
            fontWeight: 500,
            opacity: 0.9,
          }}
        >
          Scene 03 • Golden Hour Letters
        </div>

        {/* Primary Lyric Line with Halation Glow on Active Words */}
        <div
          style={{
            fontSize: "58px",
            lineHeight: 1.25,
            color: "#F2EDE4",
            fontWeight: 400,
            letterSpacing: "0.5px",
            textShadow: "0 2px 20px rgba(0, 0, 0, 0.8)",
          }}
        >
          <span>I still read the letters </span>
          <span
            style={{
              color: "#FFF4DD",
              fontWeight: 600,
              fontStyle: "italic",
              textShadow:
                "0 0 20px rgba(245, 170, 50, 0.85), 0 0 45px rgba(245, 140, 20, 0.45)",
            }}
          >
            that you wrote to me in June
          </span>
        </div>

        {/* Anticipation / Second Line */}
        <div
          style={{
            fontSize: "30px",
            lineHeight: 1.5,
            color: "rgba(230, 222, 210, 0.38)",
            marginTop: "20px",
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          Every word you typed, every line you wrote...
        </div>
      </div>

      {/* 6. Cinematic 2.35:1 Widescreen Letterbox Bars */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "90px",
          backgroundColor: "#030305",
          borderBottom: "1px solid rgba(217, 155, 82, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          boxSizing: "border-box",
          zIndex: 20,
        }}
      >
        <span style={{ fontSize: "12px", letterSpacing: "3px", color: "rgba(255, 255, 255, 0.35)", textTransform: "uppercase" }}>
          PeerMusic Cinematic Master
        </span>
        <span style={{ fontSize: "12px", letterSpacing: "3px", color: "rgba(217, 155, 82, 0.6)" }}>
          2.39:1 ANAMORPHIC • KODAK VISION3
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "90px",
          backgroundColor: "#030305",
          borderTop: "1px solid rgba(217, 155, 82, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          boxSizing: "border-box",
          zIndex: 20,
        }}
      >
        <span style={{ fontSize: "12px", letterSpacing: "4px", color: "rgba(255, 255, 255, 0.35)" }}>
          TIME 01:24 // 60 FPS
        </span>
        <span style={{ fontSize: "12px", letterSpacing: "3px", color: "rgba(217, 155, 82, 0.6)" }}>
          WARM TUNGSTEN HALATION
        </span>
      </div>
    </div>
  );
};
