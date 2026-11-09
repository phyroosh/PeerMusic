import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface OutroSanctuarySceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const OutroSanctuaryScene: React.FC<OutroSanctuarySceneProps> = ({
  startFrame,
  endFrame,
  audioData,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const sceneFrame = Math.max(0, frame - startFrame);
  const sceneDuration = endFrame - startFrame;

  // Gentle, serene camera glide over the still midnight mirror lake
  const cameraScale = interpolate(sceneFrame, [0, sceneDuration], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraY = Math.sin((sceneFrame / fps) * 0.35) * 4;

  const bass = audioData.bassEnergy;

  // Outro acoustic decay & peaceful fade to obsidian (f10200–10854)
  const isFinalOutro = frame >= 10200;
  const outroFade = isFinalOutro
    ? interpolate(frame, [10200, 10750, 10854], [1, 0.45, 0.05], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Midnight starfield reflecting in the lake
  const nightStars = useMemo(() => {
    return Array.from({ length: 55 }).map((_, i) => ({
      x: ((i * 47) % 1880) + 20,
      y: ((i * 31) % 480) + 20,
      size: 1.5 + (i % 3) * 1.3,
      twinkleFreq: 0.05 + (i % 4) * 0.025,
      seed: i,
    }));
  }, []);

  // Floating bioluminescent starlight motes rising gently from the lake
  const bioParticles = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => ({
      x: 100 + ((i * 41) % 1720),
      baseY: 980 - ((i * 37) % 550),
      size: 2.2 + (i % 3) * 1.6,
      speedY: 0.25 + (i % 4) * 0.08,
      driftFreq: 0.02 + (i % 3) * 0.015,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#030409",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Midnight Celestial Sky Gradient: Obsidian Void to Deep Moonlit Indigo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "560px",
          background:
            "linear-gradient(180deg, #020307 0%, #060917 40%, #0E132B 75%, #181E3B 100%)",
          opacity: outroFade,
        }}
      />

      {/* 2. Soft Moonlit Horizon Glow (Reflecting across the water) */}
      <div
        style={{
          position: "absolute",
          top: "520px",
          left: "50%",
          width: "800px",
          height: "280px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(224, 231, 255, 0.6) 0%, rgba(99, 102, 241, 0.25) 40%, transparent 75%)",
          filter: "blur(32px)",
          opacity: (0.7 + bass * 0.15) * outroFade,
          pointerEvents: "none",
        }}
      />

      {/* 3. Twinkling Midnight Sky Stars */}
      {nightStars.map((st) => {
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
              backgroundColor: "#F8FAFC",
              boxShadow: `0 0 8px rgba(224, 231, 255, ${0.8 * twinkle})`,
              opacity: (0.4 + twinkle * 0.6) * outroFade,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 4. Distant Moonlit Mountain Ridge Silhouettes (Sky Geometry) */}
      <svg
        viewBox="0 0 1920 560"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "560px",
          opacity: outroFade,
        }}
      >
        <defs>
          <linearGradient id="outroPeakGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2342" />
            <stop offset="60%" stopColor="#101326" />
            <stop offset="100%" stopColor="#080A15" />
          </linearGradient>
        </defs>

        <polygon
          points="0,450 160,400 320,440 510,350 680,420 860,330 1060,400 1240,320 1420,390 1610,340 1780,410 1920,370 1920,560 0,560"
          fill="url(#outroPeakGrad)"
        />
      </svg>

      {/* 5. Glassy Alpine Mirror Lake Water Body (y=540 to 1080) */}
      <div
        style={{
          position: "absolute",
          top: "540px",
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, #0A0D1F 0%, #060815 40%, #030409 100%)",
        }}
      />

      {/* 6. Inverted Moonlit Mountain & Star Reflection in the Water ("Aaine Mein") */}
      <div
        style={{
          position: "absolute",
          top: "540px",
          left: 0,
          right: 0,
          height: "380px",
          transform: "scaleY(-1)",
          transformOrigin: "top center",
          opacity: 0.55 * outroFade,
          filter: "blur(2px)",
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 100%)",
        }}
      >
        <svg viewBox="0 0 1920 560" style={{ width: "100%", height: "100%" }}>
          <polygon
            points="0,450 160,400 320,440 510,350 680,420 860,330 1060,400 1240,320 1420,390 1610,340 1780,410 1920,370 1920,560 0,560"
            fill="url(#outroPeakGrad)"
          />
        </svg>
      </div>

      {/* 7. Subtle Water Caustic Ripples Across the Midnight Mirror Lake */}
      <svg
        viewBox="0 0 1920 540"
        style={{
          position: "absolute",
          top: "540px",
          left: 0,
          width: "100%",
          height: "540px",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="nightRippleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#E0E7FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const yPos = 60 + idx * 65;
          const wavePhase = (sceneFrame / fps) * 0.7 + idx;
          const pathD = `M 0,${yPos} Q 480,${yPos + Math.sin(wavePhase) * 3} 960,${yPos} T 1920,${yPos}`;

          return (
            <path
              key={idx}
              d={pathD}
              stroke="url(#nightRippleGrad)"
              strokeWidth={1.6 + bass * 0.6}
              fill="none"
              opacity={(0.22 + (idx % 3) * 0.08) * outroFade}
            />
          );
        })}
      </svg>

      {/* 8. Floating Bioluminescent Starlight Particles Rising from the Water */}
      {bioParticles.map((pt) => {
        const posY =
          (pt.baseY - sceneFrame * pt.speedY * 1.1 + 1080) % 1080;
        const posX =
          pt.x + Math.sin(sceneFrame * pt.driftFreq + pt.seed) * 20;
        const pulse = 0.5 + Math.sin(sceneFrame * 0.05 + pt.seed) * 0.5;

        return (
          <div
            key={pt.seed}
            style={{
              position: "absolute",
              left: `${posX}px`,
              top: `${posY}px`,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              borderRadius: "50%",
              backgroundColor: "#E0E7FF",
              boxShadow: `0 0 10px rgba(165, 180, 252, ${0.8 * pulse}), 0 0 18px rgba(224, 231, 255, ${0.45 * pulse})`,
              opacity: (0.35 + pulse * 0.65) * outroFade,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 9. Peaceful Fade to Velvety Obsidian Overlay */}
      {isFinalOutro && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#030409",
            opacity: 1 - outroFade,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
