import React from "react";
import { Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioSynesthesiaFlash } from "../../engine/camera/AudioSynesthesiaFlash";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";
import { useAudioVisualization } from "../../engine/audio/useAudioVisualization";
import { SAMPLE_10S_AUDIO, SAMPLE_LYRICS } from "./sampleData";

/**
 * Opaline Bloom is an original PeerMusic visual direction: a midnight gallery
 * containing a living, glass-like flower. Its faceted petals turn vocal energy
 * into light rather than using a literal equalizer or an on-screen UI.
 */
export const PeerMusicStyle04_OpalineBloom: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const { bassEnergy, midEnergy, highEnergy, overallEnergy } = useAudioVisualization(SAMPLE_10S_AUDIO, 64);

  const firstLine = frame < SAMPLE_LYRICS[0].endFrame;
  const activeLine = firstLine ? SAMPLE_LYRICS[0] : SAMPLE_LYRICS[1];
  const upcomingLine = firstLine ? SAMPLE_LYRICS[1] : undefined;
  const lineStart = activeLine.startFrame;
  const lineEnter = spring({
    frame: frame - lineStart,
    fps,
    config: { damping: 18, stiffness: 115, mass: 0.9 },
  });

  const cameraScale = 1.025 + Math.sin(frame * 0.008) * 0.017 + bassEnergy * 0.025;
  const bloomScale = 0.93 + lineEnter * 0.08 + bassEnergy * 0.08;
  const bloomRotation = -10 + frame * 0.052;
  const bloomLift = Math.sin(frame * 0.02) * 12 - bassEnergy * 8;
  const lyricOpacity = interpolate(lineEnter, [0, 0.45, 1], [0, 0.72, 1]);
  const lyricY = interpolate(lineEnter, [0, 1], [46, 0]);
  const lyricTracking = interpolate(lineEnter, [0, 1], [12, 1.2]);

  const petals = Array.from({ length: 14 }, (_, index) => {
    const angle = (index / 14) * 360;
    const wave = Math.sin(frame * 0.043 + index * 0.93);
    const petalPulse = 1 + bassEnergy * (0.045 + (index % 3) * 0.014) + wave * 0.022;
    const opacity = 0.3 + midEnergy * 0.22 + ((Math.sin(frame * 0.028 + index) + 1) / 2) * 0.22;
    return { angle, petalPulse, opacity, index };
  });

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
        background: "#05060B",
        fontFamily: "Georgia, 'Playfair Display', 'Times New Roman', serif",
      }}
    >
      <Audio src={staticFile(SAMPLE_10S_AUDIO)} />

      {/* Deep brand-black gallery, warmed subtly by coral and champagne light. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale})`,
          background:
            "radial-gradient(ellipse at 50% 38%, #20121F 0%, #10111E 37%, #070912 67%, #030407 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1100 + bassEnergy * 240,
          height: 460 + midEnergy * 140,
          left: "50%",
          top: "22%",
          transform: "translate(-50%, -50%) rotate(-12deg)",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(246, 46, 75, 0.15) 35%, rgba(255, 219, 164, 0.28) 50%, rgba(174, 103, 255, 0.16) 64%, transparent 100%)",
          filter: "blur(62px)",
          mixBlendMode: "screen",
        }}
      />

      {/* The opaline flower is a surreal, living light sculpture rather than a literal scene. */}
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <radialGradient id="opb-core" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF4DB" stopOpacity="0.98" />
            <stop offset="21%" stopColor="#F6B96E" stopOpacity="0.9" />
            <stop offset="54%" stopColor="#F42B57" stopOpacity="0.56" />
            <stop offset="100%" stopColor="#6D3CA9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="opb-petal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5E6" stopOpacity="0.94" />
            <stop offset="35%" stopColor="#F6B96E" stopOpacity="0.68" />
            <stop offset="73%" stopColor="#F43A62" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.02" />
          </linearGradient>
          <filter id="opb-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="opb-glass" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feSpecularLighting in="blur" surfaceScale="7" specularConstant="0.9" specularExponent="25" lightingColor="#FFF7EA" result="specular">
              <fePointLight x="850" y="260" z="170" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="lit" />
            <feMerge><feMergeNode in="lit" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g transform={`translate(960 414) rotate(${bloomRotation}) scale(${bloomScale}) translate(0 ${bloomLift})`}>
          <circle r={260 + bassEnergy * 66} fill="#F42B57" opacity={0.1 + overallEnergy * 0.12} filter="url(#opb-soft-glow)" />
          {petals.map((petal) => (
            <g key={petal.index} transform={`rotate(${petal.angle}) scale(${petal.petalPulse})`} opacity={petal.opacity}>
              <path
                d="M 0,-40 C 112,-120 166,-285 0,-430 C -166,-285 -112,-120 0,-40 Z"
                fill="url(#opb-petal)"
                filter="url(#opb-glass)"
              />
              <path
                d="M 0,-52 C 35,-145 27,-270 0,-374 C -27,-270 -35,-145 0,-52 Z"
                fill="none"
                stroke="#FFF5E6"
                strokeOpacity="0.3"
                strokeWidth="1.6"
              />
            </g>
          ))}
          <circle r={116 + bassEnergy * 20} fill="url(#opb-core)" opacity={0.96} />
          <circle r={72 + highEnergy * 16} fill="none" stroke="#FFF2DC" strokeOpacity={0.55 + highEnergy * 0.25} strokeWidth="1.5" />
          <circle r={34 + bassEnergy * 12} fill="#FFF6DF" opacity={0.7 + highEnergy * 0.2} filter="url(#opb-soft-glow)" />
        </g>

        {Array.from({ length: 8 }, (_, index) => {
          const angle = index * 45 + frame * 0.09;
          const radius = 350 + (index % 2) * 72 + midEnergy * 50;
          const x = 960 + Math.cos((angle * Math.PI) / 180) * radius;
          const y = 414 + Math.sin((angle * Math.PI) / 180) * radius * 0.54;
          const glint = 3 + highEnergy * 7 + Math.max(0, Math.sin(frame * 0.09 + index)) * 5;
          return <circle key={index} cx={x} cy={y} r={glint} fill="#FFF4DE" opacity={0.25 + highEnergy * 0.5} />;
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(3,4,8,0.35) 0%, rgba(3,4,8,0.05) 31%, rgba(3,4,8,0.18) 53%, rgba(3,4,8,0.9) 100%)",
        }}
      />

      {/* Official circular mark only: no theme name, metadata, or decorative UI. */}
      <Img
        src={staticFile("branding/peermusic_badge.png")}
        style={{
          position: "absolute",
          left: 78,
          top: 58,
          width: 58,
          height: 58,
          borderRadius: "50%",
          boxShadow: `0 0 ${24 + bassEnergy * 22}px rgba(246, 46, 75, ${0.48 + bassEnergy * 0.25})`,
          border: "1px solid rgba(255, 236, 209, 0.35)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 150,
          zIndex: 10,
          textAlign: "center",
          color: "#FFF5E8",
          textShadow: "0 3px 15px rgba(0,0,0,0.95), 0 0 34px rgba(246,46,75,0.3)",
        }}
      >
        <div
          style={{
            transform: `translateY(${lyricY}px) scale(${1 + bassEnergy * 0.018})`,
            opacity: lyricOpacity,
            fontSize: 65,
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: `${lyricTracking}px`,
            willChange: "transform, opacity, letter-spacing",
          }}
        >
          {activeLine.text}
        </div>
        {upcomingLine && (
          <div
            style={{
              marginTop: 23,
              color: "rgba(255, 238, 218, 0.42)",
              fontSize: 30,
              lineHeight: 1.35,
              fontWeight: 400,
              letterSpacing: "0.8px",
              opacity: interpolate(lineEnter, [0, 1], [0, 0.7]),
            }}
          >
            {upcomingLine.text}
          </div>
        )}
      </div>

      <FilmAtmosphere glowColor="#F6B96E" dustCount={15} vignetteStrength={0.64} />
      {[0, 158, 316, 454, 557].map((hitFrame) => (
        <AudioSynesthesiaFlash key={hitFrame} hitFrame={hitFrame} duration={8} flashColor="rgba(255, 227, 186, 0.28)" intensity={0.8} />
      ))}
    </div>
  );
};
