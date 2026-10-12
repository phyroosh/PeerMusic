import React from "react";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const RoughCopyArtwork: React.FC = () => {
  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Fountain Pen Metallic Gradient */}
        <linearGradient id="penBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="45%" stopColor="#2E5584" />
          <stop offset="70%" stopColor="#4372A8" />
          <stop offset="100%" stopColor="#172E4C" />
        </linearGradient>

        <linearGradient id="nibGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C99738" />
          <stop offset="50%" stopColor="#F5D061" />
          <stop offset="100%" stopColor="#A67822" />
        </linearGradient>

        {/* Paper Note Soft Shadow */}
        <filter id="noteShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="5" stdDeviation="4" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* 1. Miniature Rough Copy Notebook Sheet */}
      <g transform="translate(-140, -150) rotate(-4)">
        {/* Notebook Page Background */}
        <rect
          x="0"
          y="0"
          width="260"
          height="310"
          rx="4"
          fill="#FFFDF7"
          stroke="#E2DCD0"
          strokeWidth="1.2"
          filter="url(#noteShadow)"
        />

        {/* Spiral Notebook Perforations on Left Edge */}
        {[-10, 20, 50, 80, 110, 140, 170, 200, 230, 260].map((py, idx) => (
          <g key={`hole-${idx}`} transform={`translate(12, ${py + 25})`}>
            <circle cx="0" cy="0" r="3.5" fill="#EAE3D2" stroke="#CFC4B0" strokeWidth="0.8" />
            <line x1="-8" y1="0" x2="-2" y2="0" stroke="#CFC4B0" strokeWidth="1" />
          </g>
        ))}

        {/* Ruled Blue Notebook Lines */}
        {[45, 70, 95, 120, 145, 170, 195, 220, 245, 270].map((ly, idx) => (
          <line
            key={`line-${idx}`}
            x1="32"
            y1={ly}
            x2="245"
            y2={ly}
            stroke="#9CB9D9"
            strokeWidth="0.9"
            opacity="0.55"
          />
        ))}

        {/* Red Margin Line */}
        <line x1="58" y1="15" x2="58" y2="295" stroke="#E57373" strokeWidth="1.2" opacity="0.65" />

        {/* Mathematical Compass Doodle Arcs in pencil */}
        <g opacity="0.45">
          <circle cx="160" cy="110" r="38" fill="none" stroke="#7A6F5D" strokeWidth="0.9" strokeDasharray="3 3" />
          <path d="M 122 110 Q 160 80, 198 110" fill="none" stroke="#7A6F5D" strokeWidth="1" />
          <line x1="160" y1="72" x2="160" y2="148" stroke="#7A6F5D" strokeWidth="0.8" strokeDasharray="2 2" />
        </g>

        {/* Doodled Marginalia in Pencil (School Last Bench Nostalgia) */}
        <g opacity="0.6" transform="translate(180, 45)">
          <path d="M 0 0 L 3 8 L 10 9 L 5 14 L 6 21 L 0 17 L -6 21 L -5 14 L -10 9 L -3 8 Z" fill="none" stroke="#6B5E4D" strokeWidth="0.8" />
        </g>
      </g>

      {/* 2. Folded Paper Secret Note with Hand-Drawn Heart */}
      <g transform="translate(-50, -40) rotate(7)">
        {/* Triangular/Square Folded Note */}
        <polygon
          points="0,0 120,-15 135,90 10,105"
          fill="#FAF4EB"
          stroke="#D8CEBE"
          strokeWidth="1.2"
          filter="url(#noteShadow)"
        />
        {/* Fold crease */}
        <line x1="0" y1="0" x2="135" y2="90" stroke="#E0D7C9" strokeWidth="1" strokeDasharray="2 2" />

        {/* Hand-Drawn Romantic Heart Doodle */}
        <g transform="translate(65, 48) scale(0.9)">
          {/* Soft Watercolor Fill */}
          <path
            d="M 0 -8 C -15 -28, -35 -5, 0 24 C 35 -5, 15 -28, 0 -8 Z"
            fill={VIDEO_CONFIG.colors.accentRose}
            opacity="0.22"
          />
          {/* Sketchy Pencil Outline */}
          <path
            d="M 0 -8 C -15 -28, -35 -5, 0 24 C 35 -5, 15 -28, 0 -8 Z"
            fill="none"
            stroke={VIDEO_CONFIG.colors.accentRose}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Second overlapping sketchy stroke */}
          <path
            d="M 1 -7 C -14 -26, -33 -4, 1 23 C 33 -4, 14 -26, 1 -7 Z"
            fill="none"
            stroke="#52121C"
            strokeWidth="1"
            opacity="0.6"
          />
        </g>

        {/* Monospace Micro-Pencil Inscription */}
        <text
          x="68"
          y="88"
          textAnchor="middle"
          fontFamily={VIDEO_CONFIG.fonts.tag}
          fontSize="9"
          fill="#6B5E4D"
          letterSpacing="1"
          opacity="0.8"
        >
          CLASS 10-B // SECRET
        </text>
      </g>

      {/* 3. Classic Vintage Blue Fountain Pen resting diagonally across the page */}
      <g transform="translate(50, 40) rotate(-42)">
        {/* Pen Barrel */}
        <rect x="-10" y="-70" width="20" height="150" rx="4" fill="url(#penBody)" filter="url(#noteShadow)" />
        {/* Golden Clip */}
        <rect x="-3" y="-60" width="6" height="55" rx="2" fill="url(#nibGold)" />
        <circle cx="0" cy="-6" r="3" fill="url(#nibGold)" />
        {/* Golden Ring Bands */}
        <rect x="-10" y="-12" width="20" height="4" fill="url(#nibGold)" />
        <rect x="-10" y="76" width="20" height="4" fill="url(#nibGold)" />
        {/* Black Grip Section */}
        <rect x="-8" y="80" width="16" height="30" rx="2" fill="#1C1D21" />
        {/* Two-Tone Golden/Silver Nib */}
        <polygon points="-7,110 7,110 4,138 0,146 -4,138" fill="url(#nibGold)" />
        <polygon points="-4,115 4,115 2,132 0,138 -2,132" fill="#E8ECEF" opacity="0.9" />
        {/* Nib Breathing Hole & Slit */}
        <circle cx="0" cy="126" r="1.5" fill="#1C1D21" />
        <line x1="0" y1="126" x2="0" y2="146" stroke="#1C1D21" strokeWidth="0.8" />
        {/* Fresh Blue Ink Drop at the Nib Tip */}
        <circle cx="0" cy="149" r="2.5" fill="#1E3A5F" opacity="0.85" />
      </g>
    </g>
  );
};
