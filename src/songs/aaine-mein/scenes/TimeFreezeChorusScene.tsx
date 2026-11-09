import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface TimeFreezeChorusSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const TimeFreezeChorusScene: React.FC<TimeFreezeChorusSceneProps> = ({
  startFrame,
  endFrame,
  audioData,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const sceneFrame = Math.max(0, frame - startFrame);
  const sceneDuration = endFrame - startFrame;

  // Camera tracking: Slow cinematic crane up into the panoramic summit vista
  const cameraScale = interpolate(sceneFrame, [0, sceneDuration], [1.0, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraY = Math.sin((sceneFrame / fps) * 0.45) * 6;

  // Pre-Chorus (f2093–2680) to Chorus 1 (f2680–4325) transition
  const isChorus = frame >= 2680;
  const chorusLift = isChorus
    ? interpolate(frame, [2680, 2760], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Rainbow arc bloom ("Dhanak se rang") peaking around f3300–4100
  const isDhanakRang = frame >= 3250 && frame <= 4200;
  const rainbowAura = isDhanakRang
    ? interpolate(frame, [3250, 3450, 4200], [0.3, 1.0, 0.4], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0.25;

  const bass = audioData.bassEnergy;

  // Swirling golden sunlit pollen motes rising on mountain updrafts
  const updraftParticles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      x: 100 + ((i * 41) % 1720),
      baseY: 980 - ((i * 37) % 750),
      size: 2.2 + (i % 4) * 1.8,
      speed: 0.35 + (i % 5) * 0.12,
      driftFreq: 0.025 + (i % 3) * 0.015,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#060810",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Dramatic Sunrise Sky Gradient: Indigo to Radiant Gold and Coral Amber */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, #090E1F 0%, #171E36 28%, #3D2942 55%, #8B443B 75%, #E1772C 90%, #F59E0B 100%)`,
        }}
      />

      {/* 2. Blazing Golden Dawn Sunburst on the Mountain Summit Horizon */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          width: "900px",
          height: "900px",
          transform: `translate(-50%, -50%) scale(${1 + bass * 0.12})`,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 251, 235, 0.95) 0%, rgba(251, 191, 36, 0.65) 25%, rgba(245, 158, 11, 0.3) 48%, transparent 72%)",
          filter: "blur(36px)",
          opacity: 0.8 + chorusLift * 0.25 + bass * 0.2,
          pointerEvents: "none",
        }}
      />

      {/* 3. The Panoramic Atmospheric Rainbow Arc ("Dhanak se rang") */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: (0.45 + chorusLift * 0.55) * (0.6 + rainbowAura * 0.4),
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="rainbowGrad" x1="0" y1="1" x2="1" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
            <stop offset="20%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#FDE047" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#06B6D4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Majestic Arching Rainbow Arc over the Mountain Horizon */}
        <path
          d="M 120,780 A 840,480 0 0,1 1800,780"
          stroke="url(#rainbowGrad)"
          strokeWidth={42 + bass * 8}
          fill="none"
          strokeLinecap="round"
          filter="blur(16px)"
        />
        <path
          d="M 160,780 A 800,440 0 0,1 1760,780"
          stroke="url(#rainbowGrad)"
          strokeWidth={24 + bass * 4}
          fill="none"
          strokeLinecap="round"
          filter="blur(6px)"
          opacity="0.9"
        />
      </svg>

      {/* 4. Volumetric Golden Sunbeams Radiating from the Sun */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.55 + chorusLift * 0.35 + bass * 0.15,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="chorusRayGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#FDE68A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D97736" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Radial solar beams from summit sun center (x=960, y=520) */}
        <polygon points="960,520 0,180 0,380" fill="url(#chorusRayGrad)" opacity="0.6" />
        <polygon points="960,520 0,620 200,980" fill="url(#chorusRayGrad)" opacity="0.55" />
        <polygon points="960,520 400,1080 750,1080" fill="url(#chorusRayGrad)" opacity="0.7" />
        <polygon points="960,520 1170,1080 1520,1080" fill="url(#chorusRayGrad)" opacity="0.7" />
        <polygon points="960,520 1720,980 1920,620" fill="url(#chorusRayGrad)" opacity="0.55" />
        <polygon points="960,520 1920,380 1920,180" fill="url(#chorusRayGrad)" opacity="0.6" />
      </svg>

      {/* 5. Majestic Rolling Mountain Ridges Layer (Distanced Horizon) */}
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
          <linearGradient id="summitRidgeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A2638" />
            <stop offset="50%" stopColor="#2A1B29" />
            <stop offset="100%" stopColor="#15121D" />
          </linearGradient>
          <linearGradient id="summitRidgeMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E1C2C" />
            <stop offset="60%" stopColor="#1A1420" />
            <stop offset="100%" stopColor="#0B0910" />
          </linearGradient>
        </defs>

        {/* Far Ridge */}
        <polygon
          points="0,620 220,570 440,620 680,550 960,590 1240,540 1520,610 1740,560 1920,600 1920,1080 0,1080"
          fill="url(#summitRidgeFar)"
          opacity="0.9"
        />

        {/* Mid-Ground Mountain Horizon */}
        <polygon
          points="0,710 280,660 560,720 840,640 1080,700 1360,630 1640,690 1920,650 1920,1080 0,1080"
          fill="url(#summitRidgeMid)"
        />
      </svg>

      {/* 6. Foreground Summit Cliff & Natural Stone Promontory */}
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
          <linearGradient id="foreCliffGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#17121E" />
            <stop offset="100%" stopColor="#05060A" />
          </linearGradient>
        </defs>

        {/* Left Summit Bluff */}
        <path
          d="M 0,820 Q 240,790 420,860 Q 560,920 480,1080 L 0,1080 Z"
          fill="url(#foreCliffGrad)"
        />
        {/* Right Summit Bluff */}
        <path
          d="M 1920,810 Q 1680,780 1500,850 Q 1360,910 1440,1080 L 1920,1080 Z"
          fill="url(#foreCliffGrad)"
        />
      </svg>

      {/* 7. Swirling Golden Sunlit Pollen Motes Rising on Updrafts */}
      {updraftParticles.map((pt) => {
        const floatY =
          (pt.baseY - sceneFrame * pt.speed * 1.2 + 1080) % 1080;
        const driftX =
          pt.x + Math.sin(sceneFrame * pt.driftFreq + pt.seed) * 26;
        const pulse = 0.5 + Math.sin(sceneFrame * 0.06 + pt.seed) * 0.5;

        return (
          <div
            key={pt.seed}
            style={{
              position: "absolute",
              left: `${driftX}px`,
              top: `${floatY}px`,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              borderRadius: "50%",
              backgroundColor: "#FEF08A",
              boxShadow: `0 0 12px rgba(245, 158, 11, ${0.8 * pulse}), 0 0 20px rgba(254, 240, 138, ${0.5 * pulse})`,
              opacity: 0.4 + pulse * 0.6,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 8. Full Horizon Solar Bloom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(251, 191, 36, 0.22) 0%, transparent 70%)",
          mixBlendMode: "screen",
          opacity: 0.7 + bass * 0.25,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
