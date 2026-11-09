import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface EarringTurnSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const EarringTurnScene: React.FC<EarringTurnSceneProps> = ({
  startFrame,
  endFrame,
  audioData,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const sceneFrame = Math.max(0, frame - startFrame);
  const sceneDuration = endFrame - startFrame;

  // Gentle camera drift across the open wildflower plateau
  const cameraScale = interpolate(sceneFrame, [0, sceneDuration], [1.0, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraX = Math.sin((sceneFrame / fps) * 0.35) * 8;
  const cameraY = Math.cos((sceneFrame / fps) * 0.45) * 4;

  const bass = audioData.bassEnergy;

  // Wind-blown wildflower stems and reeds swaying with trigonometric physics
  const wildflowerStems = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      x: 40 + i * 45 + ((i * 17) % 25),
      height: 180 + ((i * 31) % 140),
      swaySpeed: 1.2 + (i % 5) * 0.25,
      swayAmp: 12 + (i % 4) * 6,
      flowerColor:
        i % 3 === 0
          ? "#E879F9" // Heather pink
          : i % 3 === 1
          ? "#FBBF24" // Golden blossom
          : "#A78BFA", // Lavender
      seed: i,
    }));
  }, []);

  // Floating thistle and pollen seeds drifting horizontally across the coastal breeze
  const floatingSeeds = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      startX: ((i * 53) % 1920),
      baseY: 200 + ((i * 41) % 650),
      size: 2.2 + (i % 3) * 1.5,
      speedX: 0.8 + (i % 4) * 0.3,
      driftFreq: 0.03 + (i % 3) * 0.02,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#080712",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translate(${cameraX}px, ${cameraY}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Coastal Golden Hour Sky: Lavender Dusk to Warm Honey Gold and Terracotta */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "650px",
          background:
            "linear-gradient(180deg, #13122B 0%, #291B3A 35%, #592D46 65%, #A74C40 85%, #E8833A 98%, #FBBF24 100%)",
        }}
      />

      {/* 2. Golden Sun Sinking Over the Ocean Horizon (Reflecting on the water) */}
      <div
        style={{
          position: "absolute",
          top: "560px",
          left: "52%",
          width: "700px",
          height: "350px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(254, 240, 138, 0.9) 0%, rgba(245, 158, 11, 0.5) 35%, rgba(225, 29, 72, 0.2) 65%, transparent 80%)",
          filter: "blur(32px)",
          opacity: 0.85 + bass * 0.15,
          pointerEvents: "none",
        }}
      />

      {/* 3. Ocean Water Horizon and Tidal Caustic Shimmer (y=560 to 760) */}
      <div
        style={{
          position: "absolute",
          top: "560px",
          left: 0,
          right: 0,
          height: "200px",
          background:
            "linear-gradient(180deg, #1C152B 0%, #151122 45%, #0B0A14 100%)",
        }}
      />

      {/* Ocean Sun Glint Shimmer Strip */}
      <div
        style={{
          position: "absolute",
          top: "560px",
          left: "42%",
          width: "320px",
          height: "180px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.7) 0%, rgba(245, 158, 11, 0.35) 45%, transparent 75%)",
          filter: "blur(14px)",
          opacity: 0.8 + bass * 0.2,
          pointerEvents: "none",
        }}
      />

      {/* 4. Distant Coastal Headland Silhouette */}
      <svg
        viewBox="0 0 1920 300"
        style={{
          position: "absolute",
          top: "460px",
          left: 0,
          width: "100%",
          height: "300px",
        }}
      >
        <defs>
          <linearGradient id="headlandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#311B2C" />
            <stop offset="100%" stopColor="#120E18" />
          </linearGradient>
        </defs>
        {/* Distant Headland Bluff extending into the sea */}
        <path
          d="M 0,160 Q 220,130 460,180 Q 720,230 920,200 Q 1100,170 1320,220 L 1320,300 L 0,300 Z"
          fill="url(#headlandGrad)"
          opacity="0.85"
        />
      </svg>

      {/* 5. The Rolling Coastal Meadow Bluff Plateau (y=680 to 1080) */}
      <svg
        viewBox="0 0 1920 400"
        style={{
          position: "absolute",
          top: "680px",
          left: 0,
          width: "100%",
          height: "400px",
        }}
      >
        <defs>
          <linearGradient id="plateauGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1624" />
            <stop offset="60%" stopColor="#120F18" />
            <stop offset="100%" stopColor="#06050A" />
          </linearGradient>
        </defs>
        {/* Rolling hill slope of the meadow */}
        <path
          d="M 0,80 Q 480,30 960,60 Q 1440,90 1920,40 L 1920,400 L 0,400 Z"
          fill="url(#plateauGrad)"
        />
      </svg>

      {/* 6. Wind-Swaying Wildflowers, Reeds, and Heather along the Meadow */}
      <svg
        viewBox="0 0 1920 400"
        style={{
          position: "absolute",
          top: "680px",
          left: 0,
          width: "100%",
          height: "400px",
          pointerEvents: "none",
        }}
      >
        {wildflowerStems.map((stem) => {
          const windPhase =
            (sceneFrame / fps) * stem.swaySpeed + stem.seed;
          const swayOffset = Math.sin(windPhase) * stem.swayAmp;
          const tipX = stem.x + swayOffset;
          const baseY = 360;
          const tipY = baseY - stem.height;
          const cpX = stem.x + swayOffset * 0.45;
          const cpY = baseY - stem.height * 0.55;

          return (
            <g key={stem.seed}>
              {/* Stem line */}
              <path
                d={`M ${stem.x},${baseY} Q ${cpX},${cpY} ${tipX},${tipY}`}
                stroke="#2A2132"
                strokeWidth="2.2"
                fill="none"
              />
              {/* Wildflower Petals / Thistle Head catching warm golden rim light */}
              <circle
                cx={tipX}
                cy={tipY}
                r={3.8 + (stem.seed % 3)}
                fill={stem.flowerColor}
                opacity={0.85 + Math.sin(windPhase) * 0.15}
                style={{
                  filter: `drop-shadow(0 0 6px ${stem.flowerColor})`,
                }}
              />
              {/* Secondary blossom node */}
              <circle
                cx={cpX}
                cy={cpY}
                r="2.2"
                fill="#FBBF24"
                opacity="0.65"
              />
            </g>
          );
        })}
      </svg>

      {/* 7. Floating Thistle & Pollen Seeds Drifting on the Coastal Wind */}
      {floatingSeeds.map((seed) => {
        const posX =
          (seed.startX + sceneFrame * seed.speedX * 1.5) % 1920;
        const posY =
          seed.baseY + Math.sin(sceneFrame * seed.driftFreq + seed.seed) * 18;
        const pulse = 0.5 + Math.sin(sceneFrame * 0.05 + seed.seed) * 0.5;

        return (
          <div
            key={seed.seed}
            style={{
              position: "absolute",
              left: `${posX}px`,
              top: `${posY}px`,
              width: `${seed.size}px`,
              height: `${seed.size}px`,
              borderRadius: "50%",
              backgroundColor: "#FFFBEB",
              boxShadow: `0 0 10px rgba(251, 191, 36, ${0.75 * pulse})`,
              opacity: 0.35 + pulse * 0.55,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 8. Warm Golden Hour Ambient Glow Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 52% 62%, rgba(245, 158, 11, 0.18) 0%, transparent 68%)",
          mixBlendMode: "screen",
          opacity: 0.65 + bass * 0.2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
