import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface RiverSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const RiverScene: React.FC<RiverSceneProps> = ({
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

  // Sudden deceleration spring for Phase 1 (f0 - 210)
  const suddenStop = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 20, mass: 0.8, stiffness: 80 },
  });

  // Mirror glass shard dispersion for Phase 4 (f1060 - 1550)
  const glassDispersion = interpolate(sceneFrame, [1270, 1480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Camera glide along stream
  const cameraX = interpolate(sceneFrame, [0, sceneDuration], [0, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Water caustics animation
  const waterFlow = (sceneFrame * 2.2) % 600;

  // Riverbed pebble layout
  const pebbles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      x: 200 + (i * 55) % 1600,
      y: 720 + ((i * 37) % 240),
      rx: 18 + (i % 5) * 8,
      ry: 10 + (i % 4) * 5,
      color: i % 2 === 0 ? "#1E293B" : "#0F172A",
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#05090F",
        overflow: "hidden",
      }}
    >
      {/* 1. Serene Forest & Dawn Horizon Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #09131F 0%, #112233 45%, #183344 70%, #08121C 100%)",
        }}
      />

      {/* 2. Phase 1: Decelerating Motion Blur Lines (0 - 210) */}
      {sceneFrame < 230 && (
        <svg
          viewBox="0 0 1920 1080"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: Math.max(0, 1 - suddenStop),
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <line
              key={i}
              x1={(i * 80) % 1920}
              y1={200 + (i * 35) % 700}
              x2={((i * 80) % 1920) + (1 - suddenStop) * 400}
              y2={200 + (i * 35) % 700}
              stroke="rgba(147, 197, 253, 0.4)"
              strokeWidth="2"
            />
          ))}
        </svg>
      )}

      {/* 3. Pristine Mountain Stream & Flowing Water Caustics (All Phases) */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          transform: `translateX(${cameraX}px)`,
        }}
      >
        <defs>
          <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="sunbeamCaustic" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Riverbed Base */}
        <path
          d="M -100 640 Q 480 620 960 635 T 2020 640 L 2020 1080 L -100 1080 Z"
          fill="url(#streamGrad)"
        />

        {/* Riverbed Pebbles */}
        {pebbles.map((peb) => (
          <ellipse
            key={peb.seed}
            cx={peb.x}
            cy={peb.y}
            rx={peb.rx}
            ry={peb.ry}
            fill={peb.color}
            stroke="#334155"
            strokeWidth="1"
            opacity="0.8"
          />
        ))}

        {/* Dynamic Water Caustic Wave Ribbons */}
        {Array.from({ length: 4 }).map((_, i) => {
          const waveY = 660 + i * 50;
          const phaseOffset = sceneFrame * 0.04 + i * 1.2;
          return (
            <path
              key={i}
              d={`M -100 ${waveY} Q 400 ${waveY + Math.sin(phaseOffset) * 18} 960 ${waveY + Math.cos(phaseOffset) * 14} T 2020 ${waveY}`}
              stroke="#BAE6FD"
              strokeWidth={1.5 + mid * 2}
              fill="none"
              opacity={0.45 + Math.sin(phaseOffset) * 0.25}
              filter="drop-shadow(0 0 6px rgba(186, 230, 253, 0.6))"
            />
          );
        })}
      </svg>

      {/* 4. Phase 2: Dissolving Ink Parchment Sentences (210 - 660) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [200, 240, 620, 660], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          {/* Drifting Parchment Scroll on Water */}
          <g transform={`translate(${960 + Math.sin(sceneFrame * 0.03) * 30}, 690) rotate(4)`}>
            <rect
              x="-120"
              y="-40"
              width="240"
              height="80"
              rx="6"
              fill="#FEF3C7"
              opacity="0.85"
              stroke="#D97706"
              strokeWidth="2"
            />
            {/* Written Ink Lines Dissolving into Water */}
            {[-18, 0, 18].map((lineY, idx) => {
              const inkDissolve = interpolate(
                sceneFrame,
                [280 + idx * 60, 480 + idx * 60],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <line
                  key={idx}
                  x1="-90"
                  y1={lineY}
                  x2="90"
                  y2={lineY}
                  stroke="#1E1B4B"
                  strokeWidth="3"
                  strokeDasharray="14 6"
                  opacity={inkDissolve}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* 5. Phase 3: Single Crimson Maple Leaf Resting on Glass Surface (660 - 1060) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [640, 690, 1020, 1060], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          {/* Subtle Concentric Rings around the Leaf */}
          {Array.from({ length: 3 }).map((_, i) => {
            const r = ((sceneFrame * 1.5 + i * 70) % 240) + 20;
            return (
              <ellipse
                key={i}
                cx="960"
                cy="680"
                rx={r * 2}
                ry={r * 0.5}
                fill="none"
                stroke="#FDE68A"
                strokeWidth="1.2"
                opacity={Math.max(0, 0.6 - r / 240)}
              />
            );
          })}

          {/* Autumn Maple Leaf Silhouette */}
          <g transform={`translate(960, 680) rotate(${Math.sin(sceneFrame * 0.02) * 8})`}>
            <path
              d="M 0 0 L 15 -25 L 35 -20 L 25 -40 L 45 -50 L 20 -60 L 28 -80 L 0 -70 L -28 -80 L -20 -60 L -45 -50 L -25 -40 L -35 -20 L -15 -25 Z"
              fill="#DC2626"
              stroke="#F59E0B"
              strokeWidth="2"
              filter="drop-shadow(0 6px 12px rgba(0,0,0,0.6))"
            />
            {/* Leaf Stem */}
            <line x1="0" y1="0" x2="0" y2="25" stroke="#78350F" strokeWidth="2.5" />
          </g>
        </svg>
      </div>

      {/* 6. Phase 4: Water Reflection & Glass Mask Shattering (1060 - 1550) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [1040, 1090], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="epiphanyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Water Mirror Pool */}
          <ellipse
            cx="960"
            cy="540"
            rx="320"
            ry="220"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            opacity="0.7"
          />

          {/* Epiphany Golden Center Glow */}
          {glassDispersion > 0.2 && (
            <circle cx="960" cy="540" r={glassDispersion * 380} fill="url(#epiphanyGlow)" />
          )}

          {/* The Shattered Mask Glass Shards Dispersing */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const dist = glassDispersion * (180 + (i % 5) * 60);
            const shardX = 960 + Math.cos(angle) * dist;
            const shardY = 540 + Math.sin(angle) * dist;
            const rot = glassDispersion * (i * 45);

            return (
              <polygon
                key={i}
                points="-18,-18 22,-8 10,24 -14,16"
                transform={`translate(${shardX}, ${shardY}) rotate(${rot})`}
                fill="rgba(224, 242, 254, 0.75)"
                stroke="#38BDF8"
                strokeWidth="1.5"
                opacity={Math.max(0, 1 - glassDispersion * 0.8)}
                filter="drop-shadow(0 0 8px rgba(56, 189, 248, 0.9))"
              />
            );
          })}

          {/* The Revealed Gentle Silhouette Beneath */}
          {glassDispersion > 0.3 && (
            <g
              transform="translate(960, 540)"
              style={{
                opacity: glassDispersion,
              }}
            >
              <ellipse cx="0" cy="-20" rx="25" ry="30" fill="#0C1424" stroke="#FDE68A" strokeWidth="2" />
              <path
                d="M -12 -12 Q 0 -2 12 -12"
                stroke="#FBBF24"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}
        </svg>
      </div>

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
