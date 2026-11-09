import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface ReleaseSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const ReleaseScene: React.FC<ReleaseSceneProps> = ({
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

  // Hand opening spring physics (Phase 1: 0 - 390)
  const handOpenProgress = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 14, mass: 1.2, stiffness: 45 },
  });

  // Camera slow pull-back into wide tranquil sea
  const cameraScale = interpolate(sceneFrame, [0, 800, 1800], [1.18, 1.05, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Falling sand / soil particles for Phase 3 (770 - 1070)
  const sandParticles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      x: 960 + ((i % 10) - 5) * 22 + (Math.sin(i * 3) * 35),
      speed: 2.5 + (i % 7) * 0.8,
      size: 3 + (i % 4),
      seed: i,
    }));
  }, []);

  // Floating starlight embers
  const floatingEmbers = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      x: (i * 149) % 1920,
      baseY: 900 - (i * 19) % 600,
      size: 2.5 + (i % 5),
      speed: 0.5 + (i % 6) * 0.15,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#080608",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Warm Crimson & Golden Twilight Sky Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #180B15 0%, #2A121F 35%, #4C1D24 60%, #1A0D15 100%)",
        }}
      />

      {/* 2. Concentric Golden Horizon Caustics */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1400,
          height: 700,
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(245, 158, 11, 0.35) 0%, rgba(220, 38, 38, 0.2) 45%, rgba(0,0,0,0) 80%)",
          filter: "blur(50px)",
        }}
      />

      {/* 3. Phase 1: Uncurling Hand in Suspension (0 - 390) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [0, 20, 350, 390], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="palmGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Palm Silhouette & Opening Fingers */}
          <g transform="translate(960, 540)">
            {/* Palm Core */}
            <circle cx="0" cy="40" r="70" fill="#1C141D" stroke="#D97706" strokeWidth="2" />
            <circle cx="0" cy="30" r={30 + handOpenProgress * 25} fill="url(#palmGlow)" />

            {/* Fingers uncurling outwards based on spring */}
            {[-45, -20, 5, 30, 55].map((angle, idx) => {
              const uncurl = handOpenProgress;
              const fingerLength = 70 + uncurl * 55;
              const fingerRad = (angle * Math.PI) / 180;
              const x2 = Math.sin(fingerRad) * fingerLength;
              const y2 = -Math.cos(fingerRad) * fingerLength;

              return (
                <line
                  key={idx}
                  x1={Math.sin(fingerRad) * 45}
                  y1={-Math.cos(fingerRad) * 45 + 30}
                  x2={x2}
                  y2={y2 + 30}
                  stroke="#2E1B26"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
              );
            })}
          </g>

          {/* Dissipating Dark Smoke converting into Gold Sparks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const rad = (i * 15 * Math.PI) / 180;
            const dist = handOpenProgress * (120 + (i % 6) * 45);
            return (
              <circle
                key={i}
                cx={960 + Math.sin(rad) * dist}
                cy={570 - Math.cos(rad) * dist}
                r={3 + (i % 3)}
                fill="#FDE68A"
                opacity={Math.max(0, 1 - handOpenProgress * 0.7)}
                filter="drop-shadow(0 0 6px #F59E0B)"
              />
            );
          })}
        </svg>
      </div>

      {/* 4. Phase 2 & 3: Glassy Twilight Horizon & Falling Sand/Soil (390 - 1070) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [370, 420, 1040, 1080], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          {/* Mirror Sea Horizon */}
          <line x1="0" y1="620" x2="1920" y2="620" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" />

          {/* Water Surface Reflection Shimmer */}
          <rect x="0" y="620" width="1920" height="460" fill="url(#waterGrad)" opacity="0.8" />

          {/* Concentric Audio-Reactive Water Ripples */}
          {Array.from({ length: 4 }).map((_, i) => {
            const rippleR = ((sceneFrame * 2 + i * 90) % 500) + 40;
            const rippleOp = interpolate(rippleR, [40, 250, 500], [0.7, 0.4, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <ellipse
                key={i}
                cx="960"
                cy="740"
                rx={rippleR * 2.8}
                ry={rippleR * 0.6}
                fill="none"
                stroke="#F59E0B"
                strokeWidth={1.5 + bass * 2}
                opacity={rippleOp}
              />
            );
          })}

          {/* Golden Sand Dissolving into Fertile Earth (Phase 3: 770 - 1070) */}
          {sceneFrame >= 750 &&
            sandParticles.map((p) => {
              const sandProgress = (sceneFrame - 750) * p.speed;
              const y = 380 + (sandProgress % 400);
              return (
                <circle
                  key={p.seed}
                  cx={p.x}
                  cy={y}
                  r={p.size}
                  fill="#FBBF24"
                  opacity={0.8}
                  filter="drop-shadow(0 0 4px #D97706)"
                />
              );
            })}

          {/* Tiny Sprouting Shoots on Fertile Ground (770 - 1070) */}
          {sceneFrame >= 850 && (
            <g transform="translate(960, 780)">
              <path
                d="M 0 0 Q -15 -30 -30 -40 Q -10 -25 0 0"
                fill="#10B981"
                opacity={interpolate(sceneFrame, [850, 950], [0, 0.8], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}
              />
              <path
                d="M 0 0 Q 15 -30 30 -40 Q 10 -25 0 0"
                fill="#34D399"
                opacity={interpolate(sceneFrame, [870, 970], [0, 0.8], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}
              />
            </g>
          )}
        </svg>
      </div>

      {/* 5. Phase 4: Two Silhouettes Reconciling & Merging into Golden Light (1070 - 1800) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [1050, 1100], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="reconciliationGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#F59E0B" stopOpacity={0.7 + bass * 0.3} />
              <stop offset="70%" stopColor="#DC2626" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Center Expanding Mandala Rings */}
          {Array.from({ length: 5 }).map((_, i) => {
            const r = 120 + i * 90 + Math.sin(sceneFrame * 0.05 + i) * 20 + bass * 40;
            return (
              <circle
                key={i}
                cx="960"
                cy="520"
                r={r}
                fill="none"
                stroke="#F59E0B"
                strokeWidth={1.5 + (i === 0 ? bass * 2 : 0)}
                strokeDasharray="6 8"
                opacity={0.6 - i * 0.1}
              />
            );
          })}

          {/* Golden Core Luminescence */}
          <circle cx="960" cy="520" r={220 + bass * 50} fill="url(#reconciliationGlow)" />

          {/* Reconciled Silhouette in Golden Light */}
          <g transform="translate(960, 520)">
            <ellipse cx="0" cy="-60" rx="22" ry="26" fill="#1C141D" />
            <path d="M -30 -30 L 30 -30 L 22 90 L -22 90 Z" fill="#1C141D" />
            {/* Open peaceful arms */}
            <path
              d="M -30 -10 Q -70 20 -100 0 M 30 -10 Q 70 20 100 0"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* 6. Floating Golden Starlight Embers */}
      {floatingEmbers.map((ember) => {
        const ey = (ember.baseY - (sceneFrame * ember.speed) * 0.8) % 1080;
        const ex = ember.x + Math.sin(sceneFrame * 0.04 + ember.seed) * 25;
        const opacity = interpolate(ey, [100, 400, 900], [0, 0.8, 0.4], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={ember.seed}
            style={{
              position: "absolute",
              left: ex,
              top: ey,
              width: ember.size,
              height: ember.size,
              borderRadius: "50%",
              backgroundColor: "#FEF08A",
              boxShadow: "0 0 10px #F59E0B",
              opacity,
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
