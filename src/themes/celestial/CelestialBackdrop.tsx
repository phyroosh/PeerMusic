import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export interface CelestialBackdropProps {
  /** Optional scale multiplier for corona pulsation */
  intensity?: number;
}

export const CelestialBackdrop: React.FC<CelestialBackdropProps> = ({ intensity = 1.0 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Gentle, organic breathing of the golden corona and volumetric aura
  const coronaPulse = 1 + (Math.sin(frame * 0.038) * 0.05 + Math.sin(frame * 0.085) * 0.02) * intensity;
  const haloBreathe = 1 + Math.sin(frame * 0.025) * 0.08 * intensity;
  const purpleAtmosphereShift = Math.sin(frame * 0.02) * 4;

  const starTwinkle = (seed: number) => 0.3 + Math.sin(frame * 0.065 + seed * 1.4) * 0.45;

  // Curated sparse star field mapped to composition dimensions
  const stars = isLandscape
    ? [
        { x: width * 0.09, y: height * 0.14, r: 1.2, s: 1 },
        { x: width * 0.22, y: height * 0.26, r: 2.0, s: 2 },
        { x: width * 0.41, y: height * 0.17, r: 1.5, s: 3 },
        { x: width * 0.58, y: height * 0.20, r: 2.2, s: 4 },
        { x: width * 0.76, y: height * 0.13, r: 1.7, s: 5 },
        { x: width * 0.89, y: height * 0.30, r: 1.3, s: 6 },
        { x: width * 0.13, y: height * 0.63, r: 1.4, s: 7 },
        { x: width * 0.31, y: height * 0.76, r: 1.9, s: 8 },
        { x: width * 0.68, y: height * 0.70, r: 1.5, s: 9 },
        { x: width * 0.87, y: height * 0.79, r: 2.1, s: 10 },
        { x: width * 0.06, y: height * 0.88, r: 1.1, s: 11 },
        { x: width * 0.48, y: height * 0.85, r: 1.6, s: 12 },
        { x: width * 0.94, y: height * 0.48, r: 1.3, s: 13 },
      ]
    : [
        { x: width * 0.12, y: height * 0.10, r: 1.5, s: 1 },
        { x: width * 0.28, y: height * 0.18, r: 2.2, s: 2 },
        { x: width * 0.78, y: height * 0.12, r: 1.8, s: 3 },
        { x: width * 0.85, y: height * 0.24, r: 2.0, s: 4 },
        { x: width * 0.15, y: height * 0.35, r: 1.4, s: 5 },
        { x: width * 0.88, y: height * 0.42, r: 1.6, s: 6 },
        { x: width * 0.18, y: height * 0.75, r: 2.0, s: 7 },
        { x: width * 0.82, y: height * 0.72, r: 1.8, s: 8 },
        { x: width * 0.35, y: height * 0.88, r: 1.5, s: 9 },
        { x: width * 0.70, y: height * 0.90, r: 2.1, s: 10 },
        { x: width * 0.10, y: height * 0.55, r: 1.2, s: 11 },
        { x: width * 0.90, y: height * 0.58, r: 1.3, s: 12 },
      ];

  const eclipseSize = isLandscape ? 280 : 320;
  const eclipseTop = isLandscape ? "24%" : "22%";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#030206",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* 1. Deep Cosmic Nebula Gradient with Breathing Center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% ${38 + purpleAtmosphereShift * 0.5}%, #1A0D33 0%, #080314 58%, #020106 100%)`,
        }}
      />

      {/* 2. Soft Volumetric Purple Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: eclipseTop,
          left: "50%",
          transform: `translate(-50%, -50%) scale(${haloBreathe})`,
          width: eclipseSize * 2.6,
          height: eclipseSize * 2.6,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(107, 33, 168, 0.08) 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* 3. Twinkling Golden Starfield */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {stars.map((s, idx) => (
          <circle
            key={`star-${idx}`}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#FDE68A"
            opacity={starTwinkle(s.s)}
            filter="blur(0.5px)"
          />
        ))}
      </svg>

      {/* 4. Golden Corona Ring Surrounding the Black Eclipse */}
      <div
        style={{
          position: "absolute",
          top: eclipseTop,
          left: "50%",
          transform: `translate(-50%, -50%) scale(${coronaPulse.toFixed(4)})`,
          width: `${eclipseSize}px`,
          height: `${eclipseSize}px`,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #000000 62%, rgba(253, 230, 138, 0.95) 66%, rgba(245, 158, 11, 0.55) 70%, rgba(192, 132, 252, 0.4) 75%, transparent 85%)",
          boxShadow:
            "0 0 50px rgba(253, 230, 138, 0.65), 0 0 100px rgba(168, 85, 247, 0.38), 0 0 160px rgba(126, 34, 206, 0.2)",
          willChange: "transform",
        }}
      />

      {/* 5. Deep Pure Void Core (Guarantees Total Eclipse Black Center) */}
      <div
        style={{
          position: "absolute",
          top: eclipseTop,
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${eclipseSize * 0.92}px`,
          height: `${eclipseSize * 0.92}px`,
          borderRadius: "50%",
          backgroundColor: "#000000",
        }}
      />
    </div>
  );
};
