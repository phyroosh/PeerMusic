import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
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

  // Cinematic forward dolly tracking across the high mountain pass
  const cameraScale = interpolate(sceneFrame, [0, sceneDuration], [1.0, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraY = Math.sin((sceneFrame / fps) * 0.6) * 4;

  // Vocal sigh timing (f455–666: Rabba... oh Rabba...)
  const isVocalSigh = frame >= 455 && frame <= 666;
  const vocalAura = isVocalSigh
    ? interpolate(frame, [455, 520, 666], [0, 0.85, 0.15], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0.05;

  const bass = audioData.bassEnergy;

  // Golden morning dew and pollen particles drifting through the alpine air
  const pollenParticles = useMemo(() => {
    return Array.from({ length: 55 }).map((_, i) => ({
      x: (i * 47) % 1920,
      baseY: 100 + ((i * 39) % 850),
      size: 2.2 + (i % 4) * 1.6,
      speed: 0.2 + (i % 5) * 0.09,
      driftFreq: 0.02 + (i % 3) * 0.015,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#05070E",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Deep Alpine Dawn Sky Gradient: Cobalt Twilight to Warm Morning Amber */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #070B16 0%, #0F192C 38%, #2B2335 68%, #6B3A36 84%, #D97736 96%, #F59E0B 100%)",
        }}
      />

      {/* 2. Morning Dawn Sunburst & Volumetric God-Rays Slicing Over Mountain Saddle */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "62%",
          width: "800px",
          height: "800px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(254, 243, 199, 0.85) 0%, rgba(245, 158, 11, 0.45) 30%, rgba(217, 119, 6, 0.15) 55%, transparent 75%)",
          filter: "blur(40px)",
          opacity: 0.75 + vocalAura * 0.35 + bass * 0.15,
          pointerEvents: "none",
        }}
      />

      {/* Volumetric Morning Sunbeam Rays */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.45 + vocalAura * 0.3,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="introRayGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#FDE68A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D97736" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="introRayGrad2" x1="0.2" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Diagonal Ray Cones from Mountain Saddle (x=1190, y=470) */}
        <polygon points="1190,470 0,920 0,1080 320,1080" fill="url(#introRayGrad1)" opacity="0.65" />
        <polygon points="1190,470 380,1080 820,1080" fill="url(#introRayGrad2)" opacity="0.55" />
        <polygon points="1190,470 950,1080 1480,1080" fill="url(#introRayGrad1)" opacity="0.7" />
        <polygon points="1190,470 1560,1080 1920,1080 1920,860" fill="url(#introRayGrad2)" opacity="0.6" />
      </svg>

      {/* 3. Mountain Ridge Layer 1 (Farthest Alpine Peaks) */}
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
          <linearGradient id="peakFarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A344A" />
            <stop offset="60%" stopColor="#251E33" />
            <stop offset="100%" stopColor="#141422" />
          </linearGradient>
        </defs>
        {/* Distant jagged snow-capped peaks */}
        <polygon
          points="0,580 180,510 340,545 490,460 680,515 860,430 1020,490 1190,450 1380,505 1560,420 1740,480 1920,440 1920,1080 0,1080"
          fill="url(#peakFarGrad)"
          opacity="0.85"
        />
      </svg>

      {/* 4. Undulating Valley Fog Layer 1 (Drifting between ridges) */}
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: 0,
          right: 0,
          height: "180px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(254, 215, 170, 0.45) 0%, rgba(217, 119, 6, 0.25) 45%, transparent 75%)",
          filter: "blur(28px)",
          transform: `translateX(${Math.sin((sceneFrame / fps) * 0.35) * 45}px)`,
          pointerEvents: "none",
        }}
      />

      {/* 5. Mountain Ridge Layer 2 (Mid-Distance Rugged Pine Ridges) */}
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
          <linearGradient id="ridgeMidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D2132" />
            <stop offset="50%" stopColor="#1A1826" />
            <stop offset="100%" stopColor="#0D0E17" />
          </linearGradient>
        </defs>
        <polygon
          points="0,670 240,610 460,660 720,580 980,635 1220,570 1480,620 1710,560 1920,600 1920,1080 0,1080"
          fill="url(#ridgeMidGrad)"
          opacity="0.95"
        />
      </svg>

      {/* 6. Rolling Ground Fog Layer 2 (Dense Low Mountain Mist) */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "-10%",
          width: "120%",
          height: "220px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(251, 191, 36, 0.2) 30%, rgba(180, 83, 9, 0.25) 70%, transparent 100%)",
          filter: "blur(32px)",
          transform: `translateX(${Math.cos((sceneFrame / fps) * 0.28) * 35}px)`,
          pointerEvents: "none",
        }}
      />

      {/* 7. Foreground Alpine Slope & Pine Silhouette Forest (Framing the Pass) */}
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
          <linearGradient id="foreRidgeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16121D" />
            <stop offset="100%" stopColor="#06080E" />
          </linearGradient>
        </defs>

        {/* Left Alpine Bluff with pine silhouettes */}
        <polygon
          points="0,740 160,710 320,770 520,730 680,820 820,870 0,1080"
          fill="url(#foreRidgeGrad)"
        />
        {/* Pine Tree Silhouettes along the left ridge */}
        <polygon points="120,720 135,660 150,720" fill="#0A0C14" />
        <polygon points="180,715 198,640 215,715" fill="#0A0C14" />
        <polygon points="260,760 280,680 300,760" fill="#0A0C14" />
        <polygon points="380,745 402,665 425,745" fill="#0A0C14" />
        <polygon points="480,735 505,650 530,735" fill="#0A0C14" />

        {/* Right Alpine Bluff with pine silhouettes */}
        <polygon
          points="1920,720 1760,690 1580,750 1390,720 1210,810 1080,880 1920,1080"
          fill="url(#foreRidgeGrad)"
        />
        <polygon points="1440,730 1460,650 1480,730" fill="#0A0C14" />
        <polygon points="1540,745 1562,660 1585,745" fill="#0A0C14" />
        <polygon points="1660,705 1682,625 1705,705" fill="#0A0C14" />
        <polygon points="1780,695 1805,615 1830,695" fill="#0A0C14" />
      </svg>

      {/* 8. Floating Golden Dew & Pollen Motes drifting through Sunbeams */}
      {pollenParticles.map((pt) => {
        const floatY =
          (pt.baseY + sceneFrame * pt.speed * 0.8) % 1080;
        const driftX =
          pt.x + Math.sin(sceneFrame * pt.driftFreq + pt.seed) * 22;
        const pulse = 0.5 + Math.sin(sceneFrame * 0.05 + pt.seed) * 0.5;

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
              backgroundColor: "#FEF3C7",
              boxShadow: `0 0 10px rgba(245, 158, 11, ${0.7 * pulse}), 0 0 18px rgba(254, 243, 199, ${0.4 * pulse})`,
              opacity: 0.35 + pulse * 0.55 + vocalAura * 0.25,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 9. Soft Atmospheric Horizon Bloom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 62% 48%, rgba(245, 158, 11, 0.18) 0%, transparent 65%)",
          mixBlendMode: "screen",
          opacity: 0.6 + bass * 0.2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
