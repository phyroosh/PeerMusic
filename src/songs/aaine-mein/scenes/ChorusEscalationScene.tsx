import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface ChorusEscalationSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const ChorusEscalationScene: React.FC<ChorusEscalationSceneProps> = ({
  startFrame,
  endFrame,
  audioData,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const sceneFrame = Math.max(0, frame - startFrame);
  const sceneDuration = endFrame - startFrame;

  // Cinematic forward push over the reflective twilight tide waters
  const cameraScale = interpolate(sceneFrame, [0, sceneDuration], [1.0, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraY = Math.sin((sceneFrame / fps) * 0.4) * 5;

  const bass = audioData.bassEnergy;

  // Pre-Chorus (f5705–6300) to Chorus 2 (f6300–7853) climax lift
  const isChorus = frame >= 6300;
  const chorusLift = isChorus
    ? interpolate(frame, [6300, 6420], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Emerging evening stars in the twilight sky
  const eveningStars = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => ({
      x: ((i * 47) % 1880) + 20,
      y: ((i * 31) % 440) + 20,
      size: 1.5 + (i % 3) * 1.2,
      twinkleFreq: 0.05 + (i % 4) * 0.03,
      seed: i,
    }));
  }, []);

  // Luminous twilight embers and starlight motes rising seaward
  const twilightEmbers = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      x: 100 + ((i * 43) % 1720),
      baseY: 950 - ((i * 37) % 700),
      size: 2.2 + (i % 4) * 1.8,
      speedY: 0.35 + (i % 5) * 0.1,
      driftFreq: 0.025 + (i % 3) * 0.015,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#060712",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Deep Celestial Twilight Sky: Midnight Cobalt, Magenta, and Amber Horizon */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "620px",
          background:
            "linear-gradient(180deg, #07091B 0%, #12132D 35%, #2F1735 65%, #6B2338 85%, #B44A29 96%, #F59E0B 100%)",
        }}
      />

      {/* 2. Twinkling Evening Constellations */}
      {eveningStars.map((st) => {
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
              boxShadow: `0 0 8px rgba(254, 243, 199, ${0.8 * twinkle})`,
              opacity: (0.4 + twinkle * 0.6) * (0.6 + chorusLift * 0.4),
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 3. Radiant Golden Twilight Horizon Flare */}
      <div
        style={{
          position: "absolute",
          top: "560px",
          left: "50%",
          width: "900px",
          height: "360px",
          transform: `translate(-50%, -50%) scale(${1 + bass * 0.14})`,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(254, 240, 138, 0.9) 0%, rgba(245, 158, 11, 0.5) 30%, rgba(190, 24, 93, 0.25) 60%, transparent 80%)",
          filter: "blur(32px)",
          opacity: 0.85 + chorusLift * 0.25 + bass * 0.2,
          pointerEvents: "none",
        }}
      />

      {/* 4. Glassy Ocean Tide Waters & Reflective Basin (y=560 to 1080) */}
      <div
        style={{
          position: "absolute",
          top: "560px",
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, #101026 0%, #0A0C1A 40%, #05060E 100%)",
        }}
      />

      {/* 5. Two Converging Luminous Paths of Golden Light Across the Water ("Is Mod Par Mil Gaye") */}
      <svg
        viewBox="0 0 1920 520"
        style={{
          position: "absolute",
          top: "560px",
          left: 0,
          width: "100%",
          height: "520px",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="convergingPathLeft" x1="0" y1="1" x2="0.6" y2="0">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FEF08A" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="convergingPathRight" x1="1" y1="1" x2="0.4" y2="0">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FEF08A" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="horizonGlint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#FFFBEB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Left Golden Tide Trail (From bottom-left to center horizon x=960, y=0) */}
        <polygon
          points="240,520 480,520 980,0 940,0"
          fill="url(#convergingPathLeft)"
          filter="blur(18px)"
          opacity={0.7 + chorusLift * 0.3 + bass * 0.15}
        />
        <polygon
          points="320,520 400,520 965,0 955,0"
          fill="url(#convergingPathLeft)"
          filter="blur(6px)"
          opacity={0.85 + chorusLift * 0.25}
        />

        {/* Right Golden Tide Trail (From bottom-right to center horizon x=960, y=0) */}
        <polygon
          points="1440,520 1680,520 980,0 940,0"
          fill="url(#convergingPathRight)"
          filter="blur(18px)"
          opacity={0.7 + chorusLift * 0.3 + bass * 0.15}
        />
        <polygon
          points="1520,520 1600,520 965,0 955,0"
          fill="url(#convergingPathRight)"
          filter="blur(6px)"
          opacity={0.85 + chorusLift * 0.25}
        />

        {/* The Exact Intersection Point: Radiant Starburst of Destiny at x=960, y=0 */}
        <circle
          cx="960"
          cy="0"
          r={28 + bass * 8}
          fill="#FFFBEB"
          filter="blur(8px)"
          opacity={0.9 + chorusLift * 0.1}
        />
        <rect
          x="660"
          y="-2"
          width="600"
          height="4"
          fill="url(#horizonGlint)"
          filter="blur(2px)"
          opacity={0.95 + bass * 0.1}
        />
      </svg>

      {/* 6. Distant Coastal Island Silhouettes (Framing the Twilight Horizon) */}
      <svg
        viewBox="0 0 1920 300"
        style={{
          position: "absolute",
          top: "470px",
          left: 0,
          width: "100%",
          height: "300px",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="islandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#25172C" />
            <stop offset="100%" stopColor="#0E0A16" />
          </linearGradient>
        </defs>
        {/* Left Coastal Island */}
        <polygon
          points="0,180 180,140 380,190 560,160 740,210 740,300 0,300"
          fill="url(#islandGrad)"
          opacity="0.9"
        />
        {/* Right Coastal Island */}
        <polygon
          points="1180,210 1360,150 1540,190 1740,130 1920,170 1920,300 1180,300"
          fill="url(#islandGrad)"
          opacity="0.9"
        />
      </svg>

      {/* 7. Luminous Twilight Embers and Starlight Motes Floating Upward */}
      {twilightEmbers.map((em) => {
        const posY =
          (em.baseY - sceneFrame * em.speedY * 1.2 + 1080) % 1080;
        const posX =
          em.x + Math.sin(sceneFrame * em.driftFreq + em.seed) * 24;
        const pulse = 0.5 + Math.sin(sceneFrame * 0.06 + em.seed) * 0.5;

        return (
          <div
            key={em.seed}
            style={{
              position: "absolute",
              left: `${posX}px`,
              top: `${posY}px`,
              width: `${em.size}px`,
              height: `${em.size}px`,
              borderRadius: "50%",
              backgroundColor: "#FEF08A",
              boxShadow: `0 0 12px rgba(245, 158, 11, ${0.85 * pulse}), 0 0 22px rgba(254, 240, 138, ${0.5 * pulse})`,
              opacity: 0.4 + pulse * 0.6,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 8. Full Canvas Atmospheric Ambient Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(245, 158, 11, 0.22) 0%, transparent 70%)",
          mixBlendMode: "screen",
          opacity: 0.75 + bass * 0.25,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
