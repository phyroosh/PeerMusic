import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface BurdenSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const BurdenScene: React.FC<BurdenSceneProps> = ({
  startFrame,
  endFrame,
  audioData,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const sceneFrame = Math.max(0, frame - startFrame);
  const sceneDuration = endFrame - startFrame;

  // Audio reactivity
  const bass = audioData.bassEnergy;
  const overall = audioData.overallEnergy;

  // Sub-phase progression within Verse 1:
  // Phase 1: 0 - 430 (f808-1229) -> Monolith & stooped silhouette
  // Phase 2: 430 - 850 (f1229-1654) -> Clenched fists & spectral doubt threads
  // Phase 3: 850 - 1200 (f1654-1994) -> Endless desolate corridor & footprints
  // Phase 4: 1200 - 1570 (f1994-2378) -> Obsidian guilt shard at chest
  // Phase 5: 1570 - 1850 (f2378-2658) -> Interlocking geometric arches & final fracture

  const phase =
    sceneFrame < 430
      ? 1
      : sceneFrame < 850
      ? 2
      : sceneFrame < 1200
      ? 3
      : sceneFrame < 1570
      ? 4
      : 5;

  // Smooth camera tracking
  const cameraScale = interpolate(
    sceneFrame,
    [0, 430, 850, 1200, 1570, 1850],
    [1.0, 1.06, 1.12, 1.08, 1.15, 1.22],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fracture burst at the end of Verse 1 (f1780 - 1850)
  const fractureBurst = interpolate(sceneFrame, [1780, 1845], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Procedural ash particles
  const ashParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      x: (i * 97) % 1920,
      baseY: (i * 53) % 1080,
      size: 2 + (i % 6),
      speed: 0.4 + (i % 5) * 0.15,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#05070C",
        overflow: "hidden",
        transform: `scale(${cameraScale + bass * 0.02})`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Cold Obsidian & Desolate Indigo Sky Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, #111827 0%, #080D17 55%, #030408 100%)",
        }}
      />

      {/* 2. Phase 1: Massive Monolithic Basalt Stone & Stooped Silhouette (0 - 430) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [0, 40, 390, 430], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="monolithGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <filter id="sapphireGlow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Jagged Massive Monolithic Boulder Suspended Above */}
          <path
            d="M 640 180 L 1280 140 L 1420 420 L 1180 520 L 740 490 L 520 360 Z"
            fill="url(#monolithGrad)"
            stroke="#334155"
            strokeWidth="3"
            filter="drop-shadow(0 25px 50px rgba(0,0,0,0.9))"
            transform={`translate(0, ${Math.sin(sceneFrame * 0.05) * 8 + bass * 12})`}
          />

          {/* Glowing Cold Sapphire Stress Cracks inside the stone */}
          <path
            d="M 850 240 Q 940 320 1020 380 T 1150 480"
            stroke="#38BDF8"
            strokeWidth={2 + bass * 3}
            fill="none"
            filter="url(#sapphireGlow)"
            opacity={0.6 + bass * 0.4}
          />
          <path
            d="M 1020 380 Q 900 420 820 460"
            stroke="#60A5FA"
            strokeWidth={1.5 + bass * 2}
            fill="none"
            filter="url(#sapphireGlow)"
            opacity={0.5 + bass * 0.5}
          />

          {/* Stooped Silhouette under the weight */}
          <ellipse cx="960" cy="620" rx="42" ry="46" fill="#0A0F1D" />
          {/* Bent spine & rounded stooped shoulders */}
          <path
            d="M 960 660 Q 910 710 930 810 L 990 810 Q 1010 710 960 660 Z"
            fill="#0A0F1D"
          />
          {/* Ground fracture under feet */}
          <path
            d="M 820 810 L 1100 810 M 890 810 L 860 840 M 1030 810 L 1070 850"
            stroke="#1E293B"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* 3. Phase 2: Clenched Stone Hands & Spectral Doubt Threads (430 - 850) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [420, 460, 810, 850], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="fistGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DC2626" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Left Fist Silhouette */}
          <g transform={`translate(${720 + Math.sin(sceneFrame * 0.4) * (bass * 6)}, 420)`}>
            <rect x="0" y="0" width="160" height="200" rx="30" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            {/* Clenched Knuckles */}
            <circle cx="35" cy="40" r="22" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <circle cx="75" cy="35" r="22" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <circle cx="115" cy="40" r="22" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          </g>

          {/* Right Fist Silhouette */}
          <g transform={`translate(${1040 - Math.sin(sceneFrame * 0.4) * (bass * 6)}, 420)`}>
            <rect x="0" y="0" width="160" height="200" rx="30" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            <circle cx="45" cy="40" r="22" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <circle cx="85" cy="35" r="22" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <circle cx="125" cy="40" r="22" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          </g>

          {/* Spectral Chains of Doubt Binding the Fists */}
          {Array.from({ length: 6 }).map((_, i) => {
            const yOffset = 450 + i * 28;
            const threadTension = Math.sin(sceneFrame * 0.3 + i) * (4 + bass * 12);
            return (
              <path
                key={i}
                d={`M 880 ${yOffset} Q 960 ${yOffset + threadTension} 1040 ${yOffset}`}
                stroke="#EF4444"
                strokeWidth={1.5 + bass * 1.5}
                fill="none"
                opacity={0.7 + Math.sin(sceneFrame * 0.2 + i) * 0.3}
                filter="drop-shadow(0 0 6px rgba(239, 68, 68, 0.8))"
              />
            );
          })}
        </svg>
      </div>

      {/* 4. Phase 3: Solitary Footsteps in Twilight Ash Corridor (850 - 1200) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [840, 880, 1160, 1200], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          {/* Perspective Monolithic Pillars */}
          <line x1="960" y1="480" x2="100" y2="1080" stroke="#1E293B" strokeWidth="2" />
          <line x1="960" y1="480" x2="1820" y2="1080" stroke="#1E293B" strokeWidth="2" />

          {/* Left Columns */}
          <rect x="260" y="580" width="60" height="500" fill="#0C1220" />
          <rect x="480" y="530" width="40" height="350" fill="#090E1A" />
          {/* Right Columns */}
          <rect x="1600" y="580" width="60" height="500" fill="#0C1220" />
          <rect x="1400" y="530" width="40" height="350" fill="#090E1A" />

          {/* Solitary Walker Silhouette moving forward */}
          <g transform={`translate(960, ${620 - (sceneFrame - 850) * 0.2}) scale(${0.7 + (sceneFrame - 850) * 0.0008})`}>
            <ellipse cx="0" cy="-60" rx="14" ry="16" fill="#030509" />
            <path d="M -16 -40 L 16 -40 L 12 40 L -12 40 Z" fill="#030509" />
            {/* Striding legs */}
            <line x1="-8" y1="40" x2={-16 + Math.sin(sceneFrame * 0.15) * 12} y2="90" stroke="#030509" strokeWidth="6" />
            <line x1="8" y1="40" x2={16 - Math.sin(sceneFrame * 0.15) * 12} y2="90" stroke="#030509" strokeWidth="6" />
          </g>

          {/* Glowing Footprints in the Ash */}
          {Array.from({ length: 6 }).map((_, i) => {
            const stepY = 750 + i * 50;
            const stepX = 960 + (i % 2 === 0 ? -24 : 24);
            const fade = interpolate(sceneFrame - 850, [i * 40, i * 40 + 80], [0, 0.7], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <ellipse
                key={i}
                cx={stepX}
                cy={stepY}
                rx="14"
                ry="7"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.5"
                opacity={fade * 0.6}
                filter="drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))"
              />
            );
          })}
        </svg>
      </div>

      {/* 5. Phase 4: Obsidian Core Clutched at Chest (1200 - 1570) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [1190, 1230, 1530, 1570], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="guiltGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity={0.7 + bass * 0.3} />
              <stop offset="40%" stopColor="#6366F1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Torso Outline */}
          <path
            d="M 840 320 C 880 280, 1040 280, 1080 320 L 1120 740 L 800 740 Z"
            fill="#0A0F1D"
            stroke="#1E293B"
            strokeWidth="3"
          />

          {/* Volumetric Radial Glow from Chest */}
          <circle cx="960" cy="480" r={160 + bass * 40} fill="url(#guiltGlow)" />

          {/* Jagged Obsidian Shard (Self-Inflicted Guilt) */}
          <polygon
            points="960,390 1010,470 985,560 935,540 915,460"
            fill="#1E1B4B"
            stroke="#C084FC"
            strokeWidth={2 + bass * 2}
            filter="drop-shadow(0 0 16px rgba(192, 132, 252, 0.9))"
            transform={`rotate(${Math.sin(sceneFrame * 0.05) * 4}, 960, 480)`}
          />
        </svg>
      </div>

      {/* 6. Phase 5: Interlocking Geometric Arches Tightening & Bursting (1570 - 1850) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(sceneFrame, [1560, 1600], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="fractureGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={fractureBurst * 0.9} />
              <stop offset="60%" stopColor="#EF4444" stopOpacity={fractureBurst * 0.6} />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Interlocking Concentric Arches */}
          {Array.from({ length: 5 }).map((_, i) => {
            const archScale = 1.0 - (sceneFrame - 1570) * 0.0006 + i * 0.18;
            const rotation = (i % 2 === 0 ? 1 : -1) * (sceneFrame - 1570) * 0.15;
            return (
              <g
                key={i}
                transform={`translate(960, 540) scale(${archScale}) rotate(${rotation})`}
              >
                <polygon
                  points="0,-240 200,-120 200,120 0,240 -200,120 -200,-120"
                  fill="none"
                  stroke={fractureBurst > 0.3 ? "#F59E0B" : "#334155"}
                  strokeWidth={2 + bass * 2}
                  strokeDasharray="18 12"
                  opacity={0.8}
                />
              </g>
            );
          })}

          {/* Fracture Light Explosion Center (Chorus intake) */}
          {fractureBurst > 0.1 && (
            <circle
              cx="960"
              cy="540"
              r={fractureBurst * 800}
              fill="url(#fractureGlow)"
              filter="blur(30px)"
            />
          )}
        </svg>
      </div>

      {/* 7. Floating Ash & Dark Starlight Motes */}
      {ashParticles.map((ash) => {
        const py = (ash.baseY + (sceneFrame * ash.speed) * 0.8) % 1080;
        const px = ash.x + Math.sin(sceneFrame * 0.03 + ash.seed) * 20;
        return (
          <div
            key={ash.seed}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: ash.size,
              height: ash.size,
              borderRadius: "50%",
              backgroundColor: fractureBurst > 0.4 ? "#FDE68A" : "#64748B",
              opacity: 0.35 + (fractureBurst * 0.4),
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 8. Vignette Edge Darkness */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 160px rgba(0, 0, 0, 0.9)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
