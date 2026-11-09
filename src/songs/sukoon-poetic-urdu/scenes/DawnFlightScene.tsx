import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface DawnFlightSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const DawnFlightScene: React.FC<DawnFlightSceneProps> = ({
  startFrame,
  endFrame,
  audioData,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const sceneFrame = Math.max(0, frame - startFrame);
  const sceneDuration = endFrame - startFrame;

  const bass = audioData.bassEnergy;
  const mid = audioData.midEnergy;

  // Camera sweeping flight motion
  const cameraScale = interpolate(sceneFrame, [0, 800, 1789], [1.0, 1.08, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraY = Math.sin((sceneFrame / fps) * 0.5) * 8;

  // Procedural flock of white birds / cranes soaring
  const birds = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      delay: i * 16,
      startX: 500 + (i % 5) * 80,
      startY: 750 + (i % 3) * 60,
      speedX: 2.8 + (i % 4) * 0.6,
      speedY: 2.2 + (i % 3) * 0.5,
      wingRate: 0.22 + (i % 5) * 0.04,
      scale: 0.6 + (i % 5) * 0.15,
      seed: i,
    }));
  }, []);

  // Wildflowers swaying for Phase 3 (870 - 1240)
  const flowers = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      x: 100 + (i * 65) % 1720,
      y: 920 + (i % 4) * 35,
      height: 70 + (i % 6) * 15,
      color: i % 2 === 0 ? "#DC2626" : "#F59E0B",
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0A0B10",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Brilliant Golden Sunrise & Azure Sky Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #1E1B4B 0%, #312E81 25%, #7C2D12 55%, #B45309 75%, #F59E0B 100%)",
        }}
      />

      {/* 2. Rising Golden Sun Sphere & Anamorphic Flare */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FEF08A 0%, #F59E0B 40%, rgba(245, 158, 11, 0) 75%)",
          filter: "blur(25px)",
          opacity: 0.85 + bass * 0.15,
        }}
      />

      {/* Horizontal Anamorphic Lens Flare Streak */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: 0,
          right: 0,
          height: 8,
          background:
            "linear-gradient(90deg, transparent, rgba(254, 240, 138, 0.7), rgba(245, 158, 11, 0.9), rgba(254, 240, 138, 0.7), transparent)",
          filter: "blur(4px)",
          transform: `scaleY(${1 + bass * 1.5})`,
          opacity: 0.75,
        }}
      />

      {/* 3. Phase 1: Majestic Mountain Crest & Soaring Bird Flock (0 - 870) */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="mountainRidgeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="50%" stopColor="#1C1917" />
            <stop offset="100%" stopColor="#0C0A09" />
          </linearGradient>
        </defs>

        {/* Distant Mountain Ridges */}
        <path
          d="M 0 720 L 420 540 L 860 660 L 1320 480 L 1740 620 L 1920 560 L 1920 1080 L 0 1080 Z"
          fill="url(#mountainRidgeGrad)"
          opacity="0.9"
        />

        {/* Soaring Bird Flock (Taking flight into sunrise) */}
        {sceneFrame < 920 &&
          birds.map((b) => {
            const flightTime = Math.max(0, sceneFrame - b.delay);
            if (flightTime <= 0) return null;

            const bx = b.startX + flightTime * b.speedX;
            const by = b.startY - flightTime * b.speedY;
            const wingFlap = Math.sin(flightTime * b.wingRate) * 16;

            return (
              <g
                key={b.seed}
                transform={`translate(${bx}, ${by}) scale(${b.scale}) rotate(-18)`}
              >
                {/* Left Wing */}
                <path
                  d={`M 0 0 Q -20 ${-15 + wingFlap} -40 ${-5 + wingFlap * 1.5} Q -20 ${5 + wingFlap * 0.5} 0 4`}
                  fill="#FFFBEB"
                  filter="drop-shadow(0 0 6px rgba(254, 240, 138, 0.8))"
                />
                {/* Right Wing */}
                <path
                  d={`M 0 0 Q 20 ${-15 + wingFlap} 40 ${-5 + wingFlap * 1.5} Q 20 ${5 + wingFlap * 0.5} 0 4`}
                  fill="#FFFBEB"
                  filter="drop-shadow(0 0 6px rgba(254, 240, 138, 0.8))"
                />
                {/* Body Core */}
                <ellipse cx="0" cy="0" rx="4" ry="12" fill="#FEF3C7" />
              </g>
            );
          })}
      </svg>

      {/* 4. Phase 3: Blooming Poppies & Wildflowers Valley (870 - 1240) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [850, 900, 1200, 1240], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          {/* Rolling Emerald/Golden Meadow Slope */}
          <path
            d="M 0 880 Q 480 840 960 860 T 1920 870 L 1920 1080 L 0 1080 Z"
            fill="linear-gradient(180deg, #14532D 0%, #052E16 100%)"
          />

          {/* Swaying Flowers */}
          {flowers.map((fl) => {
            const wind = Math.sin(sceneFrame * 0.05 + fl.seed) * 12;
            return (
              <g key={fl.seed} transform={`translate(${fl.x}, ${fl.y})`}>
                {/* Stem */}
                <path
                  d={`M 0 0 Q ${wind * 0.5} ${-fl.height * 0.5} ${wind} ${-fl.height}`}
                  stroke="#15803D"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Blossom Petals */}
                <circle
                  cx={wind}
                  cy={-fl.height}
                  r={9 + (fl.seed % 4)}
                  fill={fl.color}
                  filter="drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"
                />
                <circle cx={wind} cy={-fl.height} r="3" fill="#FEF08A" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* 5. Phase 4: Celestial Mandala Core (1240 - 1789) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [1220, 1270], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="mandalaCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#F59E0B" stopOpacity={0.6 + bass * 0.3} />
              <stop offset="70%" stopColor="#DC2626" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Radial Rotating Sacred Geometry Mandala */}
          {Array.from({ length: 6 }).map((_, i) => {
            const rot = (i % 2 === 0 ? 1 : -1) * sceneFrame * (0.08 + i * 0.02);
            const radius = 100 + i * 65 + bass * 30;
            return (
              <g
                key={i}
                transform={`translate(960, 540) rotate(${rot})`}
              >
                <circle
                  cx="0"
                  cy="0"
                  r={radius}
                  fill="none"
                  stroke="#FDE68A"
                  strokeWidth={1.5 + (i === 1 ? bass * 2 : 0)}
                  strokeDasharray={`${8 + i * 4} ${6 + i * 2}`}
                  opacity={0.7 - i * 0.08}
                />
              </g>
            );
          })}

          <circle cx="960" cy="540" r={200 + bass * 60} fill="url(#mandalaCoreGlow)" />
        </svg>
      </div>

      {/* 6. Floating Golden Light Dust Motes */}
      {Array.from({ length: 35 }).map((_, i) => {
        const mx = (i * 133 + sceneFrame * 0.5) % 1920;
        const my = (850 - (sceneFrame * 0.8 + i * 47) % 800);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: mx,
              top: my,
              width: 3 + (i % 5),
              height: 3 + (i % 5),
              borderRadius: "50%",
              backgroundColor: "#FEF08A",
              boxShadow: "0 0 10px #F59E0B",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 7. Vignette Frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 160px rgba(0, 0, 0, 0.85)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
