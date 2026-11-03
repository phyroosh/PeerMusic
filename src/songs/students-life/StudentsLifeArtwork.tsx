import React from "react";
import { staticFile, useCurrentFrame } from "remotion";

export const StudentsLifeArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // Continuous organic micro-motions
  const breathY = Math.sin(frame * 0.03) * 1.8;
  const tilt = Math.cos(frame * 0.02) * 0.5;

  // Dust motes floating in sunlight beam
  const dustParticles = [
    { x: -90, y: -80, s: 1.6, speed: 0.3 },
    { x: -40, y: -30, s: 2.0, speed: 0.5 },
    { x: 15, y: -90, s: 1.4, speed: 0.4 },
    { x: 65, y: -50, s: 1.8, speed: 0.35 },
    { x: 100, y: -10, s: 1.5, speed: 0.6 },
    { x: -60, y: 40, s: 2.2, speed: 0.45 },
    { x: 30, y: 25, s: 1.6, speed: 0.5 },
    { x: 85, y: 70, s: 1.9, speed: 0.35 },
  ];

  // Sunlight shimmer across the hallway glass
  const lightShimmer = 0.12 + Math.sin(frame * 0.04) * 0.03;

  return (
    <g transform={`translate(0, ${breathY}) rotate(${tilt})`}>
      <defs>
        {/* Soft shadow for photograph mount */}
        <filter id="photoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="6" stdDeviation="6" floodOpacity="0.18" floodColor="#2C261F" />
        </filter>

        {/* Clip path for rounded photo corners */}
        <clipPath id="photoClip">
          <rect x="-125" y="-125" width="250" height="250" rx="4" />
        </clipPath>
      </defs>

      {/* Aged Archival Cardboard Mount Border */}
      <rect
        x="-135"
        y="-135"
        width="270"
        height="270"
        rx="6"
        fill="#F5EFE6"
        stroke="#D5C7B2"
        strokeWidth="1.2"
        filter="url(#photoShadow)"
      />

      {/* Subtle Inner Accent Rule on Mount */}
      <rect
        x="-130"
        y="-130"
        width="260"
        height="260"
        rx="4"
        fill="none"
        stroke="#8C7D6B"
        strokeWidth="0.6"
        strokeDasharray="4 2"
        opacity="0.4"
      />

      {/* Official Cover Photograph (Cyanotype Hallway Bench) */}
      <g clipPath="url(#photoClip)">
        <image
          href={staticFile("covers/students_life_cover.jpeg")}
          x="-125"
          y="-125"
          width="250"
          height="250"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Diagonal Sunlight Beam Overlay */}
        <polygon
          points="-125,-125 0,-125 125,50 125,125 20,125 -125,-20"
          fill="#FFF8E7"
          opacity={lightShimmer}
          style={{ mixBlendMode: "screen" }}
        />
      </g>

      {/* Vintage Photo Corner Tabs (Charcoal / Kraft paper corners holding photo) */}
      {/* Top-Left */}
      <polygon points="-135,-115 -115,-135 -135,-135" fill="#3A3226" opacity="0.85" />
      <line x1="-135" y1="-115" x2="-115" y2="-135" stroke="#C4B49C" strokeWidth="0.8" />

      {/* Top-Right */}
      <polygon points="135,-115 115,-135 135,-135" fill="#3A3226" opacity="0.85" />
      <line x1="135" y1="-115" x2="115" y2="-135" stroke="#C4B49C" strokeWidth="0.8" />

      {/* Bottom-Left */}
      <polygon points="-135,115 -115,135 -135,135" fill="#3A3226" opacity="0.85" />
      <line x1="-135" y1="115" x2="-115" y2="135" stroke="#C4B49C" strokeWidth="0.8" />

      {/* Bottom-Right */}
      <polygon points="135,115 115,135 135,135" fill="#3A3226" opacity="0.85" />
      <line x1="135" y1="115" x2="115" y2="135" stroke="#C4B49C" strokeWidth="0.8" />

      {/* Washi Tape Strip at Top (Tilted) */}
      <rect
        x="-45"
        y="-145"
        width="90"
        height="20"
        rx="2"
        fill="#E8DFC8"
        opacity="0.8"
        transform="rotate(-2, 0, -135)"
        stroke="#D2C5A9"
        strokeWidth="0.5"
      />

      {/* Floating Dust Motes in the Hallway Light */}
      {dustParticles.map((pt, i) => {
        const floatY = pt.y - ((frame * pt.speed) % 180) + 90;
        const alpha = Math.sin((frame * 0.05) + i) * 0.3 + 0.5;
        return (
          <circle
            key={`dust-${i}`}
            cx={pt.x}
            cy={floatY}
            r={pt.s}
            fill="#FFFDF7"
            opacity={alpha * 0.75}
            style={{ mixBlendMode: "screen" }}
          />
        );
      })}

      {/* Archival Specimen Notation Below Picture */}
      <text
        x="0"
        y="152"
        textAnchor="middle"
        fontFamily="'Caveat', 'Kalam', cursive, sans-serif"
        fontSize="12"
        fill="#5E5343"
        letterSpacing="0.5"
      >
        Class ke baad jo zindagi thi...
      </text>
    </g>
  );
};
