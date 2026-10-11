import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

interface FilmAtmosphereProps {
  glowColor?: string;
  dustCount?: number;
  vignetteStrength?: number;
}

export const FilmAtmosphere: React.FC<FilmAtmosphereProps> = ({
  glowColor = VIDEO_CONFIG.colors.accentAmber,
  dustCount = 18,
  vignetteStrength = 0.65,
}) => {
  const frame = useCurrentFrame();

  // Deterministic pseudo-random particles
  const particles = React.useMemo(() => {
    return Array.from({ length: dustCount }).map((_, i) => {
      const seed = (i + 1) * 37.13;
      const x = (Math.sin(seed * 1.5) * 0.5 + 0.5) * 100; // %
      const startY = (Math.cos(seed * 2.1) * 0.5 + 0.5) * 100;
      const size = 1.5 + (Math.sin(seed * 3.7) * 0.5 + 0.5) * 3;
      const speed = 0.15 + (Math.cos(seed * 0.9) * 0.5 + 0.5) * 0.35;
      const opacity = 0.1 + (Math.sin(seed * 5.2) * 0.5 + 0.5) * 0.25;
      return { id: i, x, startY, size, speed, opacity };
    });
  }, [dustCount]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        overflow: "hidden",
      }}
    >
      {/* 1. Subtle Ambient Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: "900px",
          height: "900px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${glowColor}18 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* 2. Floating Micro-Dust Particles */}
      {particles.map((p) => {
        const currentY = (p.startY - frame * p.speed + 200) % 110;
        const driftX = Math.sin(frame * 0.03 + p.id) * 12;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `calc(${p.x}% + ${driftX}px)`,
              top: `${currentY}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              backgroundColor: glowColor,
              opacity: p.opacity,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}

      {/* 3. Cinema Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, transparent 40%, rgba(5, 6, 10, ${vignetteStrength}) 100%)`,
        }}
      />
    </div>
  );
};
