import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface BreathSanctuarySceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const BreathSanctuaryScene: React.FC<BreathSanctuarySceneProps> = ({
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

  // Breathing expansion / contraction calculation for Phase 3 (750 - 1200)
  // Breath cycle: ~4 seconds per cycle (240 frames)
  const breathCycle = Math.sin((sceneFrame / fps) * Math.PI * 0.5);
  const lungScale = 1.0 + breathCycle * 0.18 + mid * 0.1;

  // Soundwave smoothing factor (580 - 750)
  const waveSmoothing = interpolate(sceneFrame, [580, 720], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dissolving armor pieces
  const armorPieces = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      x: 700 + (i % 4) * 140,
      startY: 200 + (i % 3) * 60,
      speed: 1.8 + (i % 3) * 0.5,
      rotSpeed: 0.8 + (i % 4) * 0.4,
      size: 28 + (i % 4) * 10,
      seed: i,
    }));
  }, []);

  // Undulating silk ribbon anchor points
  const silkPhase = sceneFrame * 0.035;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#06070D",
        overflow: "hidden",
      }}
    >
      {/* 1. Ethereal Sanctuary Twilight Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, #171B2F 0%, #0C0F1D 50%, #04050A 100%)",
        }}
      />

      {/* 2. Phase 1: Falling Armor Dissolving & Jasmine Vines (0 - 440) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [0, 20, 400, 440], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          {/* Falling Armor Plates */}
          {armorPieces.map((p) => {
            const py = p.startY + sceneFrame * p.speed;
            const rot = sceneFrame * p.rotSpeed;
            const dissolve = interpolate(py, [350, 700], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <g key={p.seed} transform={`translate(${p.x}, ${py}) rotate(${rot})`}>
                <polygon
                  points="-15,-20 20,-15 15,20 -20,15"
                  fill="#1E293B"
                  stroke="#64748B"
                  strokeWidth="2"
                  opacity={dissolve}
                />
                {/* Dissolving Stardust Particles */}
                {dissolve < 0.7 && (
                  <circle cx="0" cy="0" r="4" fill="#FEF08A" opacity={1 - dissolve} />
                )}
              </g>
            );
          })}

          {/* Crossing Swords softening into Jasmine Vines (Center) */}
          <g transform="translate(960, 520)">
            {/* Softening Vine 1 */}
            <path
              d="M -120 -120 Q 0 0 120 120"
              stroke="#22C55E"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Softening Vine 2 */}
            <path
              d="M 120 -120 Q 0 0 -120 120"
              stroke="#16A34A"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Jasmine Flower Petals */}
            {[-60, 0, 60].map((offset, idx) => (
              <circle
                key={idx}
                cx={offset}
                cy={offset}
                r="7"
                fill="#FFFBEB"
                filter="drop-shadow(0 0 6px rgba(254, 240, 138, 0.8))"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* 3. Phase 2: Floating Weightless Feather & Flattening Wave (440 - 750) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [420, 460, 720, 750], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          {/* Drifting White Feather in Zero Gravity */}
          <g
            transform={`translate(960, ${480 + Math.sin(sceneFrame * 0.04) * 20}) rotate(${Math.sin(sceneFrame * 0.03) * 15})`}
          >
            <path
              d="M 0 -80 Q 25 -40 20 20 Q 10 60 0 80 Q -10 60 -20 20 Q -25 -40 0 -80 Z"
              fill="rgba(255, 255, 255, 0.9)"
              filter="drop-shadow(0 0 12px rgba(255, 255, 255, 0.6))"
            />
            {/* Feather Shaft */}
            <line x1="0" y1="-80" x2="0" y2="90" stroke="#FDE68A" strokeWidth="2" />
          </g>

          {/* Jagged Soundwave Line Smoothing into Horizon (680px Y) */}
          <path
            d={`M 200 720 ${Array.from({ length: 30 })
              .map((_, i) => {
                const px = 200 + i * 50;
                const py =
                  720 +
                  Math.sin(i * 1.5 + sceneFrame * 0.2) *
                    (35 * waveSmoothing);
                return `L ${px} ${py}`;
              })
              .join(" ")} L 1720 720`}
            stroke="#38BDF8"
            strokeWidth="2.5"
            fill="none"
            opacity="0.8"
            filter="drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))"
          />
        </svg>
      </div>

      {/* 4. Phase 3 & 4: Undulating Silk Ribbon & Cosmic Breathing Core (750 - 1441) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [730, 770], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="lungBreathingGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity={0.5 + mid * 0.3} />
              <stop offset="70%" stopColor="#DC2626" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Undulating Translucent Crimson-Gold Silk Ribbon */}
          <path
            d={`M -100 ${540 + Math.sin(silkPhase) * 60} Q 480 ${480 + Math.cos(silkPhase * 1.2) * 90} 960 ${540 + Math.sin(silkPhase * 0.9) * 80} T 2020 ${540 + Math.cos(silkPhase) * 60}`}
            stroke="rgba(245, 158, 11, 0.65)"
            strokeWidth={14 + mid * 10}
            fill="none"
            strokeLinecap="round"
            filter="drop-shadow(0 0 16px rgba(220, 38, 38, 0.8))"
          />

          {/* Rhythmic Lung of Light (Breathing Cosmos) */}
          <circle
            cx="960"
            cy="540"
            r={140 * lungScale}
            fill="url(#lungBreathingGlow)"
            filter="blur(15px)"
          />

          {/* Concentric Breathing Halo Rings */}
          {Array.from({ length: 3 }).map((_, i) => (
            <circle
              key={i}
              cx="960"
              cy="540"
              r={(160 + i * 80) * lungScale}
              fill="none"
              stroke="#FDE68A"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              opacity={0.45 - i * 0.1}
            />
          ))}
        </svg>
      </div>

      {/* 5. Exhaled Starlight Motes (Soft Floating Aura) */}
      {Array.from({ length: 35 }).map((_, i) => {
        const sx = (i * 127) % 1920;
        const sy = (900 - (sceneFrame * 0.7 + i * 39) % 850);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: sx,
              top: sy,
              width: 2.5 + (i % 4),
              height: 2.5 + (i % 4),
              borderRadius: "50%",
              backgroundColor: "#E0F2FE",
              boxShadow: "0 0 8px #38BDF8",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 6. Vignette Frame */}
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
