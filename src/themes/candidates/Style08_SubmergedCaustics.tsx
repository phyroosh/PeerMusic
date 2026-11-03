import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style08_SubmergedCaustics: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const bubbleOffset = (i: number) => ((frame * 2.5 + i * 150) % 1200);

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#020912",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', 'Outfit', sans-serif",
      }}
    >
      {/* 1. Deep Ocean Abyss Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 20%, #06344E 0%, #031B2A 50%, #010810 100%)",
        }}
      />

      {/* 2. Overhead Refracted Sunlight Caustic Rays */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          width: "60%",
          height: "70%",
          background: "linear-gradient(180deg, rgba(78, 236, 213, 0.22) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* 3. Rising Bioluminescent Bubbles */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        {[
          { x: 300, r: 8, i: 1 },
          { x: 550, r: 14, i: 2 },
          { x: 820, r: 6, i: 3 },
          { x: 1050, r: 16, i: 4 },
          { x: 1350, r: 10, i: 5 },
          { x: 1620, r: 12, i: 6 },
        ].map((b, idx) => (
          <circle
            key={idx}
            cx={b.x + Math.sin(frame * 0.05 + b.i) * 20}
            cy={1100 - bubbleOffset(b.i)}
            r={b.r}
            fill="none"
            stroke="rgba(78, 236, 213, 0.6)"
            strokeWidth="1.5"
            style={{
              filter: "drop-shadow(0 0 6px rgba(78, 236, 213, 0.8))",
            }}
          />
        ))}
      </svg>

      {/* 4. Center Weightless Oceanic Typography */}
      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          maxWidth: "1300px",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "8px",
            color: "#6EE7B7",
            textTransform: "uppercase",
            marginBottom: "28px",
            fontWeight: 600,
          }}
        >
          SUBMERGED REVERBERATION // DEEP BLUE
        </div>

        <div
          style={{
            fontSize: "64px",
            lineHeight: 1.25,
            fontWeight: 700,
            letterSpacing: "1px",
            color: "#E0F2FE",
            textShadow:
              "0 0 20px rgba(78, 236, 213, 0.7), 0 0 45px rgba(6, 182, 212, 0.4)",
          }}
        >
          Drowning slowly in the silence of your eyes
        </div>

        <div
          style={{
            fontSize: "28px",
            marginTop: "24px",
            color: "rgba(224, 242, 254, 0.45)",
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          Underwater whispers, suspended where the light fades away...
        </div>
      </div>

      {/* 5. Minimalist Depth Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          color: "rgba(110, 231, 183, 0.4)",
          fontSize: "12px",
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}
      >
        <span>DEPTH: -400M // CAUSTICS 60FPS</span>
        <span>AQUATIC AMBIENCE ENGINE</span>
      </div>
    </div>
  );
};
