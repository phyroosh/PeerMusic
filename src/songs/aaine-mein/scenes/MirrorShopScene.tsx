import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioVisualizationData } from "../../../engine/audio/useAudioVisualization";

interface MirrorShopSceneProps {
  startFrame: number;
  endFrame: number;
  audioData: AudioVisualizationData;
}

export const MirrorShopScene: React.FC<MirrorShopSceneProps> = ({
  startFrame,
  endFrame,
  audioData,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const sceneFrame = Math.max(0, frame - startFrame);
  const sceneDuration = endFrame - startFrame;

  // Gentle camera pan and push forward across the glassy lake shore
  const cameraScale = interpolate(sceneFrame, [0, sceneDuration], [1.0, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraX = Math.sin((sceneFrame / fps) * 0.4) * 8;
  const cameraY = Math.cos((sceneFrame / fps) * 0.5) * 4;

  const bass = audioData.bassEnergy;

  // Diamond sun glint on the water surface ("Kaanch ke tukde par chamki nazar")
  const isShardEpiphany = frame >= 1350 && frame <= 1700;
  const shardGlint = isShardEpiphany
    ? interpolate(frame, [1350, 1480, 1700], [0.1, 1.0, 0.2], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0.15;

  // Lake water caustic ripples across the mirror surface
  const rippleWaves = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => ({
      y: 620 + i * 48,
      speed: 0.8 + i * 0.12,
      amp: 2.5 + (i % 3) * 1.5,
      freq: 0.008 + i * 0.002,
      opacity: 0.18 + (i % 4) * 0.08,
      seed: i,
    }));
  }, []);

  // Diamond water sparkle glints on the lake
  const waterSparkles = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      x: 320 + ((i * 47) % 1280),
      y: 610 + ((i * 31) % 360),
      size: 2.4 + (i % 4) * 1.8,
      blinkFreq: 0.08 + (i % 5) * 0.03,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#060A14",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translate(${cameraX}px, ${cameraY}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Alpine Morning Sky: Soft Lilac and Radiant Golden Light */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "600px",
          background:
            "linear-gradient(180deg, #091122 0%, #152238 35%, #382D42 65%, #7A4B3A 85%, #E58E3A 98%, #FBBF24 100%)",
        }}
      />

      {/* 2. Morning Sunburst on Horizon (Reflecting onto water) */}
      <div
        style={{
          position: "absolute",
          top: "520px",
          left: "58%",
          width: "600px",
          height: "300px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(254, 240, 138, 0.85) 0%, rgba(245, 158, 11, 0.45) 40%, transparent 75%)",
          filter: "blur(32px)",
          opacity: 0.8 + shardGlint * 0.35 + bass * 0.15,
          pointerEvents: "none",
        }}
      />

      {/* 3. Distant Alpine Mountain Peaks (Real Sky Geometry) */}
      <svg
        viewBox="0 0 1920 600"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "600px",
        }}
      >
        <defs>
          <linearGradient id="lakePeakGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#433045" />
            <stop offset="60%" stopColor="#221C2B" />
            <stop offset="100%" stopColor="#121520" />
          </linearGradient>
          <linearGradient id="snowGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Majestic Serrated Peaks */}
        <polygon
          points="0,480 140,430 290,470 460,380 620,440 780,350 960,420 1120,330 1280,410 1440,360 1620,430 1780,370 1920,420 1920,600 0,600"
          fill="url(#lakePeakGrad)"
        />
        {/* Snowcaps catching morning sunlight */}
        <polygon points="440,390 460,380 480,390 470,405" fill="url(#snowGlow)" />
        <polygon points="760,362 780,350 800,362 790,378" fill="url(#snowGlow)" />
        <polygon points="1100,342 1120,330 1140,342 1130,360" fill="url(#snowGlow)" />
        <polygon points="1420,372 1440,360 1460,372 1450,388" fill="url(#snowGlow)" />
      </svg>

      {/* 4. Glassy Alpine Mirror Lake Water Body (y=580 to y=1080) */}
      <div
        style={{
          position: "absolute",
          top: "580px",
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, #0C1527 0%, #0A111F 30%, #060B14 70%, #030509 100%)",
        }}
      />

      {/* 5. Inverted Flawless Mountain & Sky Reflection in the Lake ("Aaine Mein") */}
      <div
        style={{
          position: "absolute",
          top: "580px",
          left: 0,
          right: 0,
          height: "400px",
          transform: "scaleY(-1)",
          transformOrigin: "top center",
          opacity: 0.65 + bass * 0.1,
          filter: "blur(2.5px)",
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
        }}
      >
        <svg viewBox="0 0 1920 600" style={{ width: "100%", height: "100%" }}>
          <polygon
            points="0,480 140,430 290,470 460,380 620,440 780,350 960,420 1120,330 1280,410 1440,360 1620,430 1780,370 1920,420 1920,600 0,600"
            fill="url(#lakePeakGrad)"
          />
        </svg>
      </div>

      {/* 6. Shimmering Water Caustics & Sine Wave Ripples on the Lake */}
      <svg
        viewBox="0 0 1920 500"
        style={{
          position: "absolute",
          top: "580px",
          left: 0,
          width: "100%",
          height: "500px",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="waterRippleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {rippleWaves.map((wave) => {
          const wavePhase = (sceneFrame / fps) * wave.speed + wave.seed;
          const yPos = wave.y - 580;
          const pathD = `M 0,${yPos} Q 480,${yPos + Math.sin(wavePhase) * wave.amp} 960,${yPos} T 1920,${yPos}`;

          return (
            <path
              key={wave.seed}
              d={pathD}
              stroke="url(#waterRippleGrad)"
              strokeWidth={1.8 + bass * 0.8}
              fill="none"
              opacity={wave.opacity + bass * 0.15}
            />
          );
        })}
      </svg>

      {/* 7. Diamond Sun Glint Epiphany on the Water ("Kaanch ke tukde par chamki nazar") */}
      <div
        style={{
          position: "absolute",
          top: "650px",
          left: "58%",
          width: "120px",
          height: "120px",
          transform: "translate(-50%, -50%)",
          opacity: shardGlint,
          pointerEvents: "none",
        }}
      >
        {/* Core Diamond Starburst */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254,243,199,0.9) 25%, rgba(245,158,11,0.5) 55%, transparent 75%)",
            borderRadius: "50%",
            filter: "blur(4px)",
          }}
        />
        {/* Horizontal & Vertical Diffraction Spikes */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-180px",
            right: "-180px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #FFFFFF 50%, transparent)",
            boxShadow: "0 0 12px rgba(254,243,199,0.9)",
            transform: "translateY(-50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "-120px",
            bottom: "-120px",
            width: "2px",
            background:
              "linear-gradient(180deg, transparent, #FFFFFF 50%, transparent)",
            boxShadow: "0 0 12px rgba(254,243,199,0.9)",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* 8. Diamond Sparkles Dancing on Lake Surface */}
      {waterSparkles.map((sp) => {
        const blink =
          0.3 +
          Math.sin((sceneFrame / fps) * sp.blinkFreq * 60 + sp.seed) * 0.7;

        return (
          <div
            key={sp.seed}
            style={{
              position: "absolute",
              left: `${sp.x}px`,
              top: `${sp.y}px`,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              borderRadius: "50%",
              backgroundColor: "#FFFBEB",
              boxShadow: `0 0 8px rgba(254, 240, 138, ${0.8 * blink})`,
              opacity: blink * (0.4 + shardGlint * 0.5),
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* 9. Shoreline Weathered Boulders & Pine Trees in Foreground (Left & Right) */}
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
          <linearGradient id="shoreBoulderGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1C1823" />
            <stop offset="60%" stopColor="#100F17" />
            <stop offset="100%" stopColor="#05060A" />
          </linearGradient>
        </defs>

        {/* Left Rocky Shoreline & Mossy Granite Boulders */}
        <path
          d="M 0,840 Q 180,820 280,890 Q 360,940 320,1080 L 0,1080 Z"
          fill="url(#shoreBoulderGrad)"
        />
        <path
          d="M 60,910 Q 140,880 210,930 Q 260,970 200,1080 L 60,1080 Z"
          fill="#13121C"
        />

        {/* Right Rocky Shoreline */}
        <path
          d="M 1920,830 Q 1740,810 1620,880 Q 1540,940 1590,1080 L 1920,1080 Z"
          fill="url(#shoreBoulderGrad)"
        />
        <path
          d="M 1840,900 Q 1760,870 1690,920 Q 1630,970 1710,1080 L 1840,1080 Z"
          fill="#13121C"
        />
      </svg>
    </div>
  );
};
