import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const PencilKeNishaanArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // Continuous organic micro-motion (breathing float, pencil angle sway, paper texture drift)
  const paperFloatY = Math.sin(frame * 0.03) * 1.6;
  const paperTilt = -3.5 + Math.sin(frame * 0.02) * 0.4;

  const pencilFloatX = Math.sin(frame * 0.04) * 1.4;
  const pencilFloatY = Math.cos(frame * 0.04) * 1.4;
  const pencilTilt = -38 + Math.sin(frame * 0.035) * 0.8;

  const eraserFloatY = Math.sin(frame * 0.045) * 1.2;
  const eraserTilt = 18 + Math.cos(frame * 0.025) * 0.6;

  // Floating classroom sunlight dust particles
  const dustOffsets = [
    { x: -60, y: -90, speed: 0.04, amp: 4 },
    { x: 70, y: -60, speed: 0.03, amp: 5 },
    { x: -30, y: 70, speed: 0.05, amp: 3.5 },
    { x: 80, y: 80, speed: 0.035, amp: 4.5 },
  ];

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Cedarwood Hexagonal Pencil Body Gradients */}
        <linearGradient id="pencilWoodFacet1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D9822B" />
          <stop offset="60%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#E08E30" />
        </linearGradient>

        <linearGradient id="pencilWoodFacet2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B36214" />
          <stop offset="50%" stopColor="#CF771F" />
          <stop offset="100%" stopColor="#964E0C" />
        </linearGradient>

        {/* Sharpened Wood Cone Grain */}
        <linearGradient id="sharpenedCone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2DEC2" />
          <stop offset="70%" stopColor="#E2C59F" />
          <stop offset="100%" stopColor="#C9A87E" />
        </linearGradient>

        {/* Brass Ferrule Metallic Sheen */}
        <linearGradient id="ferruleBrass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9E7628" />
          <stop offset="45%" stopColor="#F3D272" />
          <stop offset="75%" stopColor="#C79C37" />
          <stop offset="100%" stopColor="#7E5C1B" />
        </linearGradient>

        {/* Pink Rubber Eraser */}
        <linearGradient id="eraserPink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D97A84" />
          <stop offset="50%" stopColor="#F49CA6" />
          <stop offset="100%" stopColor="#C86771" />
        </linearGradient>

        {/* Pressed Specimen Shadow */}
        <filter id="pencilShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="3" dy="5" stdDeviation="4" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* 1. Classroom Notebook Ruled Card with Desk Sketches */}
      <g transform={`translate(-135, ${-145 + paperFloatY}) rotate(${paperTilt})`}>
        {/* Cardboard Sheet */}
        <rect
          x="0"
          y="0"
          width="250"
          height="300"
          rx="5"
          fill="#FFFDF8"
          stroke="#E0D7C6"
          strokeWidth="1.2"
          filter="url(#pencilShadow)"
        />

        {/* Notebook Single Margin Red Rule */}
        <line x1="48" y1="12" x2="48" y2="288" stroke="#E26D6D" strokeWidth="1.1" opacity="0.65" />

        {/* Soft Blue Ruled Lines */}
        {[35, 60, 85, 110, 135, 160, 185, 210, 235, 260].map((ly, idx) => (
          <line
            key={`rule-${idx}`}
            x1="20"
            y1={ly}
            x2="235"
            y2={ly}
            stroke="#A3BCD6"
            strokeWidth="0.8"
            opacity="0.45"
          />
        ))}

        {/* Secretly Erased Desk Heart & Initial Impression (The Central Poetic Motif) */}
        <g transform="translate(130, 115)" opacity="0.55">
          {/* Faint Eraser Smudge Trail */}
          <ellipse cx="0" cy="0" rx="42" ry="32" fill="#EAE3D5" opacity="0.4" />
          <path
            d="M -30 -15 Q 0 -5, 30 -20"
            stroke="#D3C7B5"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Graphite Impression (Indentation Left in Wood/Paper) */}
          <path
            d="M 0 -12 C -18 -32, -38 -8, 0 24 C 38 -8, 18 -32, 0 -12 Z"
            fill="none"
            stroke="#7A6F5D"
            strokeWidth="1.1"
            strokeDasharray="4 2 2 2"
          />
          {/* Crossed Initials "S + A" in Margin */}
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fontFamily={VIDEO_CONFIG.fonts.heading}
            fontStyle="italic"
            fontWeight="bold"
            fontSize="15"
            fill="#8C7D6B"
            opacity="0.7"
          >
            P + K
          </text>
        </g>

        {/* Folded Paper Airplane Doodle with Dotted Flight Loop */}
        <g transform="translate(165, 55)" opacity="0.6">
          <path
            d="M -30 20 Q -10 5, 5 15 T 35 -10"
            fill="none"
            stroke="#8C7D6B"
            strokeWidth="0.9"
            strokeDasharray="2 3"
          />
          {/* Origami Airplane Outline */}
          <polygon
            points="35,-10 18,-4 24,-14"
            fill="#F2EDE4"
            stroke="#6B5E4D"
            strokeWidth="0.8"
          />
          <line x1="35" y1="-10" x2="22" y2="-7" stroke="#6B5E4D" strokeWidth="0.6" />
        </g>

        {/* Math Geometry Compass Degree Marks */}
        <g transform="translate(75, 235)" opacity="0.45">
          <circle cx="0" cy="0" r="28" fill="none" stroke="#7A6F5D" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="-28" y1="0" x2="28" y2="0" stroke="#7A6F5D" strokeWidth="0.7" />
          <line x1="0" y1="-28" x2="0" y2="28" stroke="#7A6F5D" strokeWidth="0.7" />
          <text x="12" y="-12" fontFamily={VIDEO_CONFIG.fonts.accent} fontSize="8" fill="#7A6F5D">
            45°
          </text>
        </g>
      </g>

      {/* 2. Pressed Forget-Me-Not Botanical Specimen (Archival Herbarium Anchor) */}
      <g transform="translate(70, -70) rotate(12)">
        {/* Delicate Stem */}
        <path
          d="M 0 0 Q 8 30, 2 65 T -4 105"
          fill="none"
          stroke="#556B48"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Tiny pressed leaves */}
        <ellipse cx="6" cy="35" rx="9" ry="4" fill="#6B8259" transform="rotate(25, 6, 35)" opacity="0.85" />
        <ellipse cx="-4" cy="70" rx="8" ry="3.5" fill="#5F764E" transform="rotate(-30, -4, 70)" opacity="0.8" />

        {/* Blue Forget-Me-Not Blossoms (Innocent First Love Symbol) */}
        {[
          { cx: 0, cy: 0, r: 12 },
          { cx: 12, cy: 18, r: 10 },
          { cx: -8, cy: 15, r: 9 },
        ].map((fl, idx) => (
          <g key={`flower-${idx}`} transform={`translate(${fl.cx}, ${fl.cy})`}>
            {/* 5 Soft Petals */}
            {[0, 72, 144, 216, 288].map((ang, pIdx) => (
              <circle
                key={`petal-${pIdx}`}
                cx={Math.sin((ang * Math.PI) / 180) * (fl.r * 0.55)}
                cy={-Math.cos((ang * Math.PI) / 180) * (fl.r * 0.55)}
                r={fl.r * 0.45}
                fill="#5B87B5"
                opacity="0.88"
              />
            ))}
            {/* Golden Pollen Eye */}
            <circle cx="0" cy="0" r={fl.r * 0.22} fill="#E8B438" />
          </g>
        ))}

        {/* Archival Transparent Washi Tape securing stem */}
        <rect
          x="-14"
          y="42"
          width="40"
          height="14"
          rx="1"
          fill={VIDEO_CONFIG.colors.washiTape}
          opacity="0.8"
          transform="rotate(-8, 6, 49)"
          filter="url(#pencilShadow)"
        />
      </g>

      {/* 3. Vintage Rectangular Kaccha Eraser (Stationery Motif) */}
      <g transform={`translate(-65, ${95 + eraserFloatY}) rotate(${eraserTilt})`}>
        {/* Eraser Body */}
        <rect
          x="-22"
          y="-14"
          width="44"
          height="28"
          rx="3"
          fill="#F7F3E9"
          stroke="#D6CBBA"
          strokeWidth="1.1"
          filter="url(#pencilShadow)"
        />
        {/* Classic Blue/Red Brand Sleeve band */}
        <rect x="-10" y="-14" width="20" height="28" fill="#3D5A80" opacity="0.85" />
        <line x1="-10" y1="-14" x2="-10" y2="14" stroke="#293241" strokeWidth="0.8" />
        <line x1="10" y1="-14" x2="10" y2="14" stroke="#293241" strokeWidth="0.8" />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily={VIDEO_CONFIG.fonts.accent}
          fontSize="6"
          fontWeight="700"
          fill="#FFF"
          letterSpacing="0.8"
        >
          NON-DUST
        </text>

        {/* Scattered Eraser Crumbs around it */}
        <circle cx="30" cy="8" r="1.2" fill="#C5BAA8" />
        <circle cx="35" cy="-4" r="0.9" fill="#C5BAA8" />
        <circle cx="26" cy="-12" r="1.1" fill="#C5BAA8" />
        <circle cx="-28" cy="12" r="1.0" fill="#C5BAA8" />
      </g>

      {/* 4. The Iconic Hexagonal Wood HB Pencil */}
      <g transform={`translate(${20 + pencilFloatX}, ${10 + pencilFloatY}) rotate(${pencilTilt})`}>
        {/* Main Hexagonal Pencil Shaft */}
        <rect
          x="-14"
          y="-130"
          width="14"
          height="200"
          fill="url(#pencilWoodFacet1)"
          filter="url(#pencilShadow)"
        />
        <rect
          x="0"
          y="-130"
          width="14"
          height="200"
          fill="url(#pencilWoodFacet2)"
          filter="url(#pencilShadow)"
        />
        {/* Center Ridge Highlight */}
        <line x1="0" y1="-130" x2="0" y2="70" stroke="#FFF" strokeWidth="0.8" opacity="0.45" />

        {/* Gold Stamped Text on Pencil Body */}
        <text
          x="-6"
          y="-30"
          transform="rotate(90, -6, -30)"
          fontFamily={VIDEO_CONFIG.fonts.accent}
          fontSize="7"
          fontWeight="700"
          fill="#FFE082"
          letterSpacing="1.2"
          opacity="0.85"
        >
          HB • CLASSROOM 10-B • NATARAJ
        </text>

        {/* Sharpened Wooden Cone */}
        <polygon
          points="-14,70 14,70 0,112"
          fill="url(#sharpenedCone)"
          stroke="#C4A377"
          strokeWidth="0.6"
        />
        {/* Cut Facet Curves on wood collar */}
        <path d="M -14 70 Q -7 74, 0 70 Q 7 74, 14 70" fill="none" stroke="#A8875B" strokeWidth="0.8" />

        {/* Graphite Lead Tip */}
        <polygon points="-4,100 4,100 0,114" fill="#2C261F" />

        {/* Brass Ferrule Collar at Back */}
        <rect x="-14.5" y="-146" width="29" height="16" fill="url(#ferruleBrass)" rx="1" />
        {/* Ferrule embossed ribbed bands */}
        <line x1="-14" y1="-142" x2="14" y2="-142" stroke="#664C18" strokeWidth="0.9" />
        <line x1="-14" y1="-136" x2="14" y2="-136" stroke="#664C18" strokeWidth="0.9" />

        {/* Pink Rubber Eraser Block */}
        <path
          d="M -13 -146 L -13 -164 C -13 -168, 13 -168, 13 -164 L 13 -146 Z"
          fill="url(#eraserPink)"
        />
      </g>

      {/* 5. Classroom Sunlight Beam Dust Particles */}
      {dustOffsets.map((pt, idx) => {
        const floatDelta = Math.sin(frame * pt.speed + idx) * pt.amp;
        return (
          <circle
            key={`dust-${idx}`}
            cx={pt.x + floatDelta}
            cy={pt.y + floatDelta * 0.8}
            r={1.2}
            fill="#FFF"
            opacity={0.35 + Math.sin(frame * 0.05 + idx) * 0.25}
          />
        );
      })}
    </g>
  );
};
