import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface SitarPathBridgeSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const SitarPathBridgeScene: React.FC<SitarPathBridgeSceneProps> = ({
  startFrame,
  endFrame,
  audioData,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const sceneFrame = Math.max(0, frame - startFrame);
  const sceneDuration = endFrame - startFrame;

  // Slow majestic drift across the high mountain starfield
  const cameraScale = interpolate(sceneFrame, [0, sceneDuration], [1.0, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraY = Math.sin((sceneFrame / fps) * 0.45) * 5;

  const bass = audioData.bassEnergy;

  // Vocal sustain & sitar resonance (f8200–8900: Sitar ki taar jaisi...)
  const isSitarSustain = frame >= 8200 && frame <= 9000;
  const sitarIntensity = isSitarSustain
    ? interpolate(frame, [8200, 8500, 9000], [0.3, 1.0, 0.4], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0.25;

  // Starfield constellation stars
  const celestialStars = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      x: ((i * 59) % 1880) + 20,
      y: ((i * 37) % 680) + 20,
      size: 1.6 + (i % 4) * 1.4,
      twinkleFreq: 0.06 + (i % 4) * 0.03,
      seed: i,
    }));
  }, []);

  // 7 Harmonic Sitar Celestial Aurora Waves across the cosmic sky
  const sitarStrings = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => ({
      index: i,
      baseY: 180 + i * 55,
      freq: 0.0035 + i * 0.0008,
      speed: 1.4 + i * 0.2,
      amp: 16 + i * 4,
      color:
        i % 3 === 0
          ? "#F59E0B" // Warm Amber Gold
          : i % 3 === 1
          ? "#38BDF8" // Celestial Cyan
          : "#C084FC", // Ethereal Violet
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#04050C",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Infinite Cosmic Sky Gradient: Velvety Void to Deep Indigo Twilight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #020308 0%, #070B1A 40%, #11142B 75%, #1C1938 100%)",
        }}
      />

      {/* 2. Soft Milky Way Nebular Band Across the Sky */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "120%",
          height: "400px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.2) 0%, rgba(56, 189, 248, 0.15) 35%, transparent 70%)",
          filter: "blur(48px)",
          transform: "rotate(-8deg)",
          opacity: 0.75 + sitarIntensity * 0.35,
          pointerEvents: "none",
        }}
      />

      {/* 3. Twinkling Constellation Stars */}
      {celestialStars.map((st) => {
        const twinkle =
          0.3 +
          Math.sin((sceneFrame / fps) * st.twinkleFreq * 60 + st.seed) * 0.7;

        return (
          <div
            key={st.seed}
            style={{
              position: "absolute",
              left: `${st.x}px`,
              top: `${st.y}px`,
              width: `${st.size}px`,
              height: `${st.size}px`,
              borderRadius: "50%",
              backgroundColor: "#FFFBEB",
              boxShadow: `0 0 10px rgba(254, 243, 199, ${0.85 * twinkle})`,
              opacity: 0.4 + twinkle * 0.6,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 4. 7 Harmonic Sitar Celestial Aurora Waves ("Sitar ki taar jaisi bajti hai") */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="auroraGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#C084FC" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {sitarStrings.map((string) => {
          const stringPhase =
            (sceneFrame / fps) * string.speed + string.index * 0.6;
          const currentAmp =
            string.amp * (1 + bass * 0.7 + sitarIntensity * 0.9);

          // Build continuous sinusoidal wave across the 1920px width
          const points: string[] = [];
          for (let x = 0; x <= 1920; x += 30) {
            const y =
              string.baseY +
              Math.sin(x * string.freq + stringPhase) * currentAmp +
              Math.cos(x * 0.008 + stringPhase * 0.7) * (currentAmp * 0.4);
            points.push(`${x},${y}`);
          }
          const pathD = `M ${points.join(" L ")}`;

          return (
            <g key={string.index}>
              {/* Outer soft luminous bloom */}
              <path
                d={pathD}
                stroke="url(#auroraGlow)"
                strokeWidth={14 + bass * 4}
                fill="none"
                filter="blur(10px)"
                opacity={0.5 + sitarIntensity * 0.45}
              />
              {/* Core resonant taut string */}
              <path
                d={pathD}
                stroke={string.color}
                strokeWidth={2.4 + bass * 0.8}
                fill="none"
                opacity={0.85 + sitarIntensity * 0.15}
                filter="blur(1px)"
              />
            </g>
          );
        })}
      </svg>

      {/* 5. Shooting Star Streak Across the Constellations */}
      {sceneFrame > 240 && sceneFrame < 380 && (
        <div
          style={{
            position: "absolute",
            top: `${140 + (sceneFrame - 240) * 1.8}px`,
            left: `${600 + (sceneFrame - 240) * 4.5}px`,
            width: "120px",
            height: "2px",
            background:
              "linear-gradient(90deg, #FFFFFF, rgba(254, 240, 138, 0.8) 40%, transparent 100%)",
            transform: "rotate(24deg)",
            filter: "blur(1px)",
            opacity: interpolate(sceneFrame, [240, 260, 360, 380], [0, 0.9, 0.9, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            pointerEvents: "none",
          }}
        />
      )}

      {/* 6. High-Altitude Alpine Ridge Silhouettes (Anchoring the Bottom 25%) */}
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
        <defs>
          <linearGradient id="nightRidgeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15172C" />
            <stop offset="50%" stopColor="#0B0C17" />
            <stop offset="100%" stopColor="#04040A" />
          </linearGradient>
        </defs>

        {/* Far Starlit Peaks */}
        <polygon
          points="0,780 220,730 460,790 740,710 980,760 1240,690 1480,750 1710,700 1920,740 1920,1080 0,1080"
          fill="url(#nightRidgeGrad)"
          opacity="0.85"
        />

        {/* Foreground Mountain Saddle */}
        <polygon
          points="0,860 320,810 680,880 1060,820 1420,890 1780,830 1920,870 1920,1080 0,1080"
          fill="#06060F"
        />
      </svg>

      {/* 7. Full Celestial Ambient Pulse Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
          mixBlendMode: "screen",
          opacity: 0.65 + bass * 0.25,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
