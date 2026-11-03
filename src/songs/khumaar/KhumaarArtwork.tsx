import React from "react";
import { staticFile, useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const KhumaarArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Organic micro-motions (never dead: breathing ambient lamp glow, steam wisps & dust motes)
  const lampBreath = 0.88 + Math.sin(frame * 0.04) * 0.12;
  const steamWave1 = Math.sin(frame * 0.035) * 3;
  const steamWave2 = Math.cos(frame * 0.028) * 2.5;
  const halationPulse = 0.25 + Math.sin(frame * 0.05) * 0.08;

  // Ambient floating midnight dust motes
  const dustMotes = [
    { x: -110, y: -100, s: 1.8, speed: 0.035, amp: 4 },
    { x: -50, y: -60, s: 2.2, speed: 0.04, amp: 5 },
    { x: 30, y: -80, s: 1.6, speed: 0.03, amp: 3.8 },
    { x: 95, y: -30, s: 2.0, speed: 0.045, amp: 4.2 },
    { x: -80, y: 40, s: 1.7, speed: 0.032, amp: 4.0 },
    { x: 45, y: 60, s: 2.4, speed: 0.04, amp: 5.2 },
    { x: 105, y: 95, s: 1.5, speed: 0.048, amp: 3.5 },
    { x: -25, y: 120, s: 2.1, speed: 0.036, amp: 4.5 },
    { x: 10, y: -15, s: 1.9, speed: 0.042, amp: 4.0 },
  ];

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Warm Amber Midnight Lamp Glow */}
        <radialGradient id="lampGlowKhumaar" cx="20%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFD384" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#E28B38" stopOpacity="0.2" />
          <stop offset="80%" stopColor="#7B3A12" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0D1117" stopOpacity="0" />
        </radialGradient>

        {/* Soft Vignette / Twilight Rim */}
        <radialGradient id="twilightRim" cx="50%" cy="50%" r="75%">
          <stop offset="65%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#070A12" stopOpacity="0.55" />
        </radialGradient>

        {/* Soft Drop Shadow for overlays */}
        <filter id="moteGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Master High-Resolution Modern Indie Single Cover Art */}
      <image
        href={staticFile("covers/khumaar_cover_sq.jpg")}
        x="-198"
        y="-188"
        width="396"
        height="376"
        preserveAspectRatio="xMidYMid slice"
      />

      {/* 2. Dynamic Warm Ambient Lighting Bloom (Micro-pulsing with the singer's space) */}
      <rect
        x="-198"
        y="-188"
        width="396"
        height="376"
        fill="url(#lampGlowKhumaar)"
        opacity={lampBreath}
        style={{ mixBlendMode: "screen" }}
      />

      {/* 3. Midnight Halation Vignette */}
      <rect
        x="-198"
        y="-188"
        width="396"
        height="376"
        fill="url(#twilightRim)"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* 4. Rising Steam Wisps from the Chai Cup */}
      <g opacity="0.32" style={{ mixBlendMode: "screen" }}>
        <path
          d={`M -72,85 Q ${-75 + steamWave1},55 ${-70 - steamWave2},25 T ${-74 + steamWave1},-5`}
          fill="none"
          stroke="#FFF2DC"
          strokeWidth="3.2"
          strokeLinecap="round"
          filter="url(#moteGlow)"
        />
        <path
          d={`M -64,88 Q ${-60 - steamWave2},60 ${-66 + steamWave1},32 T ${-62 - steamWave2},2`}
          fill="none"
          stroke="#FFE4B5"
          strokeWidth="2.4"
          strokeLinecap="round"
          filter="url(#moteGlow)"
        />
      </g>

      {/* 5. Ambient 35mm Atmospheric Floating Dust Particles */}
      <g filter="url(#moteGlow)" opacity={halationPulse + 0.35}>
        {dustMotes.map((m, idx) => {
          const dy = Math.sin(frame * m.speed + idx) * m.amp;
          const dx = Math.cos(frame * m.speed * 0.7 + idx) * (m.amp * 0.6);
          const moteFade = 0.35 + Math.sin(frame * 0.05 + idx * 1.5) * 0.35;
          return (
            <circle
              key={idx}
              cx={m.x + dx}
              cy={m.y + dy}
              r={m.s}
              fill="#FFE8B6"
              opacity={moteFade}
            />
          );
        })}
      </g>
    </g>
  );
};
