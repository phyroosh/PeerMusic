import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface IntroSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  startFrame,
  endFrame,
  audioData,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const sceneFrame = Math.max(0, frame - startFrame);
  const sceneDuration = endFrame - startFrame;

  // Camera slow push-in & subtle breathing float
  const cameraScale = interpolate(sceneFrame, [0, sceneDuration], [1.0, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraY = Math.sin((sceneFrame / fps) * 0.8) * 6;

  // Vocal sigh timing indicators:
  // f210-450: (aah) -> sceneFrame: 210 to 450
  // f480-750: (mmm) -> sceneFrame: 480 to 750
  const isAah = sceneFrame >= 210 && sceneFrame <= 450;
  const isMmm = sceneFrame >= 480 && sceneFrame <= 750;

  const breathIntensity = isAah
    ? interpolate(sceneFrame, [210, 280, 450], [0, 1.0, 0.2], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : isMmm
    ? interpolate(sceneFrame, [480, 560, 750], [0, 0.8, 0.1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0.15;

  // Lamp flicker + audio mid response
  const lampFlicker =
    Math.sin(sceneFrame * 0.25) * 0.08 +
    Math.sin(sceneFrame * 0.53) * 0.05 +
    audioData.midEnergy * 0.2;

  // Procedural floating mist particles
  const mistMotes = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      x: ((i * 137.5) % 1920),
      baseY: 200 + ((i * 73) % 700),
      size: 4 + ((i * 11) % 14),
      speed: 0.3 + ((i * 7) % 10) * 0.08,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#06080E",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Deep Midnight Chiaroscuro Atmospheric Base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 65%, #151D2A 0%, #0A0F17 50%, #04060A 100%)",
        }}
      />

      {/* 2. Rolling Mountain Mist Waves (SVG Procedural Waves) */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.65,
        }}
        viewBox="0 0 1920 1080"
        fill="none"
      >
        <defs>
          <linearGradient id="mistGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0" />
            <stop offset="50%" stopColor="#2A384F" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0B111E" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="mistGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#182335" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#334155" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0E1626" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFA63D" stopOpacity={0.8 + lampFlicker} />
            <stop offset="35%" stopColor="#E26D24" stopOpacity={0.4 + lampFlicker * 0.5} />
            <stop offset="70%" stopColor="#7C2D12" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: Distant rolling fog */}
        <path
          d={`M 0 680 Q 480 ${640 + Math.sin(sceneFrame * 0.02) * 25} 960 670 T 1920 680 L 1920 1080 L 0 1080 Z`}
          fill="url(#mistGrad1)"
        />

        {/* Layer 2: Midground mist layer */}
        <path
          d={`M 0 740 Q 520 ${710 + Math.cos(sceneFrame * 0.025) * 30} 1020 735 T 1920 740 L 1920 1080 L 0 1080 Z`}
          fill="url(#mistGrad2)"
        />
      </svg>

      {/* 3. Solitary Cliff Pedestal & Wet Obsidian Stone Silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 520,
          height: 380,
          background: "linear-gradient(180deg, #101622 0%, #06090E 90%)",
          clipPath: "polygon(22% 0%, 78% 0%, 94% 100%, 6% 100%)",
          boxShadow: "0 -20px 60px rgba(0, 0, 0, 0.9)",
        }}
      >
        {/* Wet stone surface sheen */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background:
              "linear-gradient(90deg, transparent, rgba(255, 175, 75, 0.25), rgba(255, 255, 255, 0.4), rgba(255, 175, 75, 0.25), transparent)",
            opacity: 0.7 + lampFlicker * 0.5,
          }}
        />
      </div>

      {/* 4. Solitary Antique Brass Lantern */}
      <div
        style={{
          position: "absolute",
          bottom: 350,
          left: "50%",
          transform: "translateX(-50%)",
          width: 80,
          height: 140,
        }}
      >
        {/* Volumetric Lamp Keylight Bloom */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -160,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "url(#lampGlow)",
            filter: "blur(40px)",
            pointerEvents: "none",
            transform: `scale(${1 + lampFlicker * 0.3})`,
          }}
        />

        {/* Lantern Hardware Silhouette */}
        <svg viewBox="0 0 80 140" style={{ width: "100%", height: "100%" }}>
          {/* Top Brass Cap */}
          <path d="M 30 15 Q 40 5 50 15 L 60 35 L 20 35 Z" fill="#2E2318" stroke="#5E452E" strokeWidth="2" />
          <circle cx="40" cy="8" r="6" fill="none" stroke="#5E452E" strokeWidth="2" />
          {/* Glass Enclosure */}
          <rect x="22" y="35" width="36" height="65" rx="3" fill="rgba(255, 185, 90, 0.15)" stroke="#3E2E1D" strokeWidth="2" />
          {/* Internal Flame */}
          <circle
            cx="40"
            cy="70"
            r={7 + lampFlicker * 4}
            fill="#FFAA40"
            filter="drop-shadow(0 0 12px #FF5500)"
          />
          <ellipse
            cx="40"
            cy="68"
            rx={3 + lampFlicker * 2}
            ry={9 + lampFlicker * 3}
            fill="#FFF5DF"
          />
          {/* Brass Base */}
          <path d="M 18 100 L 62 100 L 66 120 L 14 120 Z" fill="#2E2318" stroke="#5E452E" strokeWidth="2" />
        </svg>
      </div>

      {/* 5. Breathing Particle Vapor (Exhalation Aura for (aah) & (mmm)) */}
      {mistMotes.map((mote) => {
        const driftY = (mote.baseY - (sceneFrame * mote.speed) * 0.7) % 900;
        const driftX =
          mote.x +
          Math.sin((sceneFrame * 0.02) + mote.seed) * 35 +
          (isAah ? Math.cos(mote.seed) * breathIntensity * 80 : 0);

        const moteOpacity =
          interpolate(
            driftY,
            [100, 350, 700, 850],
            [0, 0.6 + breathIntensity * 0.4, 0.5, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

        return (
          <div
            key={mote.seed}
            style={{
              position: "absolute",
              left: driftX,
              top: driftY,
              width: mote.size * (1 + breathIntensity * 0.5),
              height: mote.size * (1 + breathIntensity * 0.5),
              borderRadius: "50%",
              backgroundColor: isAah ? "#93C5FD" : "#FDE68A",
              boxShadow: `0 0 ${mote.size * 2}px ${isAah ? "rgba(147, 197, 253, 0.8)" : "rgba(253, 230, 138, 0.6)"}`,
              opacity: moteOpacity,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 6. Cold Midnight Rain Overlay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
          pointerEvents: "none",
        }}
        viewBox="0 0 1920 1080"
      >
        {Array.from({ length: 45 }).map((_, i) => {
          const rx = (i * 47) % 1920;
          const ry = ((sceneFrame * 28 + i * 113) % 1200) - 100;
          return (
            <line
              key={i}
              x1={rx}
              y1={ry}
              x2={rx - 12}
              y2={ry + 45}
              stroke="rgba(200, 225, 255, 0.4)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* 7. Vignette & Edge Depth Mask */}
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
