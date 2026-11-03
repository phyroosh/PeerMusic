import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style05_CelestialEclipse: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const coronaPulse = 1 + Math.sin(frame * 0.05) * 0.08;
  const starTwinkle = (i: number) => 0.4 + Math.sin(frame * 0.08 + i) * 0.4;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#030206",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Georgia', 'Playfair Display', serif",
      }}
    >
      {/* 1. Deep Cosmic Nebula Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 40%, #1A0D33 0%, #080314 60%, #020106 100%)",
        }}
      />

      {/* 2. Twinkling Star Field */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        {[
          { x: 180, y: 150, r: 1.2, i: 1 },
          { x: 420, y: 280, r: 2.0, i: 2 },
          { x: 780, y: 180, r: 1.5, i: 3 },
          { x: 1120, y: 220, r: 2.2, i: 4 },
          { x: 1450, y: 140, r: 1.8, i: 5 },
          { x: 1720, y: 320, r: 1.3, i: 6 },
          { x: 250, y: 680, r: 1.5, i: 7 },
          { x: 600, y: 820, r: 2.0, i: 8 },
          { x: 1300, y: 760, r: 1.4, i: 9 },
          { x: 1680, y: 850, r: 2.1, i: 10 },
        ].map((s, idx) => (
          <circle
            key={idx}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#FDE68A"
            opacity={starTwinkle(s.i)}
            filter="blur(0.5px)"
          />
        ))}
      </svg>

      {/* 3. Luminous Glowing Eclipse Corona Ring */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${coronaPulse})`,
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #000000 62%, rgba(253, 230, 138, 0.9) 66%, rgba(192, 132, 252, 0.4) 75%, transparent 85%)",
          boxShadow:
            "0 0 50px rgba(253, 230, 138, 0.6), 0 0 100px rgba(168, 85, 247, 0.35)",
          pointerEvents: "none",
        }}
      />

      {/* 4. Center Lyric Display with Starlight Glow (Lyrics Only, No Containers) */}
      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          maxWidth: "1300px",
          padding: "0 40px",
          marginTop: "200px",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            lineHeight: 1.28,
            color: "#FAF5FF",
            fontWeight: 400,
            letterSpacing: "1px",
            textShadow:
              "0 0 20px rgba(253, 230, 138, 0.7), 0 0 45px rgba(192, 132, 252, 0.4), 0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          Lost in the starlight between our worlds
        </div>
      </div>
    </div>
  );
};
