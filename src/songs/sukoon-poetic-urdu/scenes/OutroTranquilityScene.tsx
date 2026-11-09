import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface OutroTranquilitySceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const OutroTranquilityScene: React.FC<OutroTranquilitySceneProps> = ({
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

  // The drifting water lantern position moving toward the horizon
  const lanternProgress = interpolate(sceneFrame, [0, sceneDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lanternX = 960 + Math.sin(sceneFrame * 0.02) * 40;
  const lanternY = 820 - lanternProgress * 220; // Drifts from 820 down to 600 (horizon)
  const lanternScale = 1.0 - lanternProgress * 0.45; // Shrinks with perspective

  // Flame gentle flicker
  const flameFlicker =
    Math.sin(sceneFrame * 0.3) * 0.1 + Math.sin(sceneFrame * 0.7) * 0.06 + mid * 0.15;

  // Final peaceful fade out to black (f1000 to sceneDuration)
  const masterFadeOut = interpolate(
    sceneFrame,
    [sceneDuration - 120, sceneDuration - 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Sparkling celestial stars
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      x: (i * 73) % 1920,
      y: (i * 47) % 550,
      size: 1.2 + (i % 4) * 0.8,
      twinkleSpeed: 0.05 + (i % 5) * 0.02,
      seed: i,
    }));
  }, []);

  // Embers rising from lantern
  const embers = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      speed: 1.2 + (i % 4) * 0.5,
      driftX: ((i % 5) - 2) * 12,
      size: 2 + (i % 3),
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#04050A",
        overflow: "hidden",
      }}
    >
      {/* 1. Deep Midnight Twilight & Mirrored Lake Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #060914 0%, #0F172A 45%, #151A2E 58%, #070B14 100%)",
        }}
      />

      {/* 2. Lake Horizon Line */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: "rgba(245, 158, 11, 0.4)",
          boxShadow: "0 0 12px rgba(245, 158, 11, 0.6)",
        }}
      />

      {/* 3. Celestial Starfield in Upper Sky */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {stars.map((s) => {
          const starOp =
            0.35 + Math.sin(sceneFrame * s.twinkleSpeed + s.seed) * 0.35;
          return (
            <circle
              key={s.seed}
              cx={s.x}
              cy={s.y}
              r={s.size}
              fill="#FEF08A"
              opacity={starOp}
            />
          );
        })}

        {/* Faint Constellation Line */}
        <path
          d="M 420 180 L 580 140 L 660 210 L 780 190"
          stroke="rgba(254, 240, 138, 0.25)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
        />
      </svg>

      {/* 4. Glassy Lake Water Reflections */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(4, 5, 10, 0.95) 100%)",
        }}
      >
        {/* Subtle Lantern Water Reflection Streak */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: lanternX - 30 * lanternScale,
            width: 60 * lanternScale,
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(245, 158, 11, 0.5) 0%, rgba(220, 38, 38, 0.2) 40%, transparent 80%)",
            filter: "blur(12px)",
            opacity: 0.75 + flameFlicker,
          }}
        />
      </div>

      {/* 5. Drifting Handcrafted Wooden Water Lantern */}
      <div
        style={{
          position: "absolute",
          left: lanternX,
          top: lanternY,
          transform: `translate(-50%, -50%) scale(${lanternScale})`,
          width: 90,
          height: 110,
        }}
      >
        {/* Water Ripple Ring around Lantern */}
        <svg
          viewBox="0 0 140 60"
          style={{
            position: "absolute",
            left: -25,
            top: 75,
            width: 140,
            height: 60,
            overflow: "visible",
          }}
        >
          <ellipse
            cx="70"
            cy="30"
            rx={45 + Math.sin(sceneFrame * 0.08) * 10}
            ry={12 + Math.sin(sceneFrame * 0.08) * 3}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </svg>

        {/* Volumetric Flame Warmth Glow */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -75,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(254, 240, 138, 0.8) 0%, rgba(245, 158, 11, 0.4) 45%, rgba(0,0,0,0) 75%)",
            filter: "blur(25px)",
            transform: `scale(${1 + flameFlicker})`,
          }}
        />

        {/* Wooden Lantern Base & Candle Silhouette */}
        <svg viewBox="0 0 90 110" style={{ width: "100%", height: "100%" }}>
          {/* Wooden Float Raft */}
          <rect x="5" y="80" width="80" height="15" rx="3" fill="#2E180E" stroke="#5E3018" strokeWidth="2" />
          {/* Paper Walls */}
          <polygon points="15,80 75,80 65,30 25,30" fill="rgba(254, 243, 199, 0.65)" stroke="#78350F" strokeWidth="1.5" />
          {/* Wooden Top Rim */}
          <rect x="23" y="26" width="44" height="6" rx="2" fill="#2E180E" stroke="#5E3018" strokeWidth="1.5" />
          {/* Steady Candle Flame */}
          <ellipse cx="45" cy="55" rx={5 + flameFlicker * 3} ry={11 + flameFlicker * 4} fill="#FEF08A" />
          <circle cx="45" cy="53" r={3} fill="#FFFFFF" />
        </svg>

        {/* Rising Embers from the Flame */}
        {embers.map((em) => {
          const progress = ((sceneFrame * em.speed + em.seed * 37) % 250);
          const ey = -progress;
          const ex = 45 + em.driftX + Math.sin(progress * 0.05) * 15;
          const op = interpolate(progress, [0, 40, 250], [0, 0.9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={em.seed}
              style={{
                position: "absolute",
                left: ex,
                top: ey,
                width: em.size,
                height: em.size,
                borderRadius: "50%",
                backgroundColor: "#FEF08A",
                boxShadow: "0 0 6px #F59E0B",
                opacity: op,
                pointerEvents: "none",
              }}
            />
          );
        })}
      </div>

      {/* 6. Vignette Frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 160px rgba(0, 0, 0, 0.85)",
          pointerEvents: "none",
        }}
      />

      {/* 7. Master Final Fade to Obsidian Black */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#06080E",
          opacity: masterFadeOut,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
