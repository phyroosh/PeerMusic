import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const PaaniPeeneKaBahaanaArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Organic micro-motions (never dead: gentle pendulum swing, breathing & dust motes)
  const passSway = Math.sin(frame * 0.032) * 2.8;
  const passFloatY = Math.cos(frame * 0.038) * 2.0;

  const notebookFloatY = Math.sin(frame * 0.024) * 1.5;
  const notebookTilt = -3.5 + Math.sin(frame * 0.02) * 0.4;

  const pencilFloatX = Math.cos(frame * 0.04) * 1.4;
  const pencilFloatY = Math.sin(frame * 0.04) * 1.2;
  const pencilTilt = 32 + Math.sin(frame * 0.028) * 0.7;

  const eraserPulse = 1.0 + Math.sin(frame * 0.06) * 0.03;
  const lightShimmer = 0.22 + Math.sin(frame * 0.035) * 0.05;

  // Ambient floating classroom dust motes
  const dustParticles = [
    { x: -120, y: -130, s: 1.8, speed: 0.035, amp: 4.5 },
    { x: -60, y: -70, s: 2.2, speed: 0.04, amp: 5.0 },
    { x: 35, y: -95, s: 1.6, speed: 0.03, amp: 3.8 },
    { x: 105, y: -45, s: 2.0, speed: 0.045, amp: 4.2 },
    { x: -85, y: 35, s: 1.7, speed: 0.032, amp: 4.0 },
    { x: 50, y: 55, s: 2.4, speed: 0.04, amp: 5.2 },
    { x: 115, y: 100, s: 1.5, speed: 0.048, amp: 3.5 },
    { x: -30, y: 125, s: 2.1, speed: 0.036, amp: 4.5 },
    { x: 15, y: -20, s: 1.9, speed: 0.042, amp: 4.0 },
  ];

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Weathered Teak Woodgrain Gradient for Corridor Pass */}
        <linearGradient id="passWood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A5A36" />
          <stop offset="35%" stopColor="#734524" />
          <stop offset="70%" stopColor="#5C3417" />
          <stop offset="100%" stopColor="#45240E" />
        </linearGradient>

        {/* Polished Brass Eyelet / Grommet */}
        <linearGradient id="passBrass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9C7728" />
          <stop offset="50%" stopColor="#FDE38C" />
          <stop offset="100%" stopColor="#7A5817" />
        </linearGradient>

        {/* Classic School Graphite Pencil Body (Deep Burgundy & Gold) */}
        <linearGradient id="pencilWood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8A1C24" />
          <stop offset="40%" stopColor="#B3242E" />
          <stop offset="75%" stopColor="#D93845" />
          <stop offset="100%" stopColor="#73151C" />
        </linearGradient>

        {/* Sharpened Raw Wood Cone */}
        <linearGradient id="sharpenedWood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8C799" />
          <stop offset="60%" stopColor="#D4A774" />
          <stop offset="100%" stopColor="#BA8C59" />
        </linearGradient>

        {/* Soft Drop Shadows */}
        <filter id="passShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="4" dy="7" stdDeviation="5" floodOpacity="0.22" floodColor="#2A1B0E" />
        </filter>
        <filter id="notebookShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="5" stdDeviation="4" floodOpacity="0.16" floodColor="#3B2A1C" />
        </filter>
        <filter id="pencilShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="3" dy="5" stdDeviation="3.5" floodOpacity="0.2" floodColor="#261A10" />
        </filter>
        <filter id="eraserGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodOpacity="0.25" floodColor="#FDE38C" />
        </filter>
      </defs>

      {/* 1. Diagonal Warm Morning God-Rays (Classroom Corridor Window Sunlight) */}
      <g opacity={lightShimmer} style={{ pointerEvents: "none" }}>
        <polygon points="-220,-220 180,-220 280,240 -120,240" fill="#FFF3D6" opacity="0.15" />
        <polygon points="-160,-220 80,-220 190,240 50,240" fill="#FFE8B2" opacity="0.18" />
        <polygon points="-90,-220 -10,-220 110,240 10,240" fill="#FFF9E6" opacity="0.22" />
      </g>

      {/* 2. Open High School Notebook (Background Layer) */}
      <g transform={`translate(-135, ${-130 + notebookFloatY}) rotate(${notebookTilt})`}>
        {/* Notebook Cover/Pages */}
        <rect
          x="0"
          y="0"
          width="250"
          height="290"
          rx="5"
          fill="#FFFDF7"
          stroke="#E5DEC9"
          strokeWidth="1.2"
          filter="url(#notebookShadow)"
        />

        {/* Spiral Binder Loops on Left Edge */}
        {[-15, 15, 45, 75, 105, 135, 165, 195, 225, 255].map((sy, idx) => (
          <g key={`spiral-${idx}`} transform={`translate(10, ${sy + 20})`}>
            <circle cx="0" cy="0" r="3.2" fill="#E2D7C3" stroke="#BAAA93" strokeWidth="0.8" />
            <path d="M -8 -1 C -2 -4, 2 -4, 6 -1" fill="none" stroke="#BAAA93" strokeWidth="1" />
          </g>
        ))}

        {/* Ruled Notebook Lines */}
        {[40, 65, 90, 115, 140, 165, 190, 215, 240, 265].map((ly, idx) => (
          <line
            key={`line-${idx}`}
            x1="30"
            y1={ly}
            x2="235"
            y2={ly}
            stroke="#99B8DB"
            strokeWidth="0.8"
            opacity="0.5"
          />
        ))}

        {/* Left Margin Line */}
        <line x1="55" y1="15" x2="55" y2="275" stroke="#E57373" strokeWidth="1.2" opacity="0.6" />

        {/* Hand-Drawn Bicycle & Heart Doodles on Margin (Innocent Nostalgia) */}
        <g transform="translate(130, 85)" opacity="0.6">
          {/* Bicycle Wheels */}
          <circle cx="-16" cy="12" r="10" fill="none" stroke="#7A6F5D" strokeWidth="1" />
          <circle cx="16" cy="12" r="10" fill="none" stroke="#7A6F5D" strokeWidth="1" />
          {/* Frame */}
          <path d="M -16 12 L -2 12 L 8 -2 L -6 -2 Z M 8 -2 L 16 12 M -6 -2 L -6 -6 L -10 -6 M 8 -2 L 8 -7 L 12 -7" fill="none" stroke="#7A6F5D" strokeWidth="1" />
        </g>

        {/* Geometry Compass Curve Arcs */}
        <g opacity="0.4" transform="translate(145, 180)">
          <path d="M -30 0 A 30 30 0 0 1 30 0" fill="none" stroke="#8C7D6B" strokeWidth="0.9" strokeDasharray="3 3" />
          <line x1="0" y1="-35" x2="0" y2="15" stroke="#8C7D6B" strokeWidth="0.8" strokeDasharray="2 2" />
        </g>
      </g>

      {/* 3. The Iconic Wooden School Corridor Pass (Hero Motif) */}
      <g transform={`translate(-10, ${-40 + passFloatY}) rotate(${passSway})`}>
        {/* Jute Hanging Twine Loop */}
        <path
          d="M 60 10 C 60 -45, 80 -45, 80 10"
          fill="none"
          stroke="#B39369"
          strokeWidth="2.5"
          strokeDasharray="4 1.5"
        />

        {/* Wooden Block Tag */}
        <rect
          x="10"
          y="10"
          width="120"
          height="165"
          rx="6"
          fill="url(#passWood)"
          stroke="#381D0B"
          strokeWidth="1.5"
          filter="url(#passShadow)"
        />

        {/* Brass Hanging Grommet Hole */}
        <circle cx="70" cy="26" r="6" fill="#241306" stroke="url(#passBrass)" strokeWidth="2" />

        {/* Wood Carved Chamfer Inset */}
        <rect
          x="16"
          y="38"
          width="108"
          height="130"
          rx="3"
          fill="none"
          stroke="#A87349"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Stamped Authentic Hindi/English School Pass Typography */}
        <text
          x="70"
          y="68"
          textAnchor="middle"
          fontFamily={VIDEO_CONFIG.fonts.accent}
          fontSize="11"
          fontWeight="900"
          letterSpacing="2"
          fill="#FDE38C"
        >
          PAANI PASS
        </text>

        <line x1="28" y1="76" x2="112" y2="76" stroke="#CFA037" strokeWidth="1" opacity="0.7" />

        <text
          x="70"
          y="98"
          textAnchor="middle"
          fontFamily={VIDEO_CONFIG.fonts.body}
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1"
          fill="#F5EFEB"
          opacity="0.9"
        >
          CLASS 10-B
        </text>

        <text
          x="70"
          y="120"
          textAnchor="middle"
          fontFamily={VIDEO_CONFIG.fonts.tag}
          fontSize="9"
          fill="#D4B483"
          opacity="0.8"
        >
          ROLL NO: 12
        </text>

        {/* School Stamp Seal on Wood */}
        <circle cx="70" cy="142" r="14" fill="none" stroke="#D4A76A" strokeWidth="0.9" strokeDasharray="2 2" opacity="0.6" />
        <text
          x="70"
          y="145"
          textAnchor="middle"
          fontFamily={VIDEO_CONFIG.fonts.body}
          fontSize="6.5"
          fontWeight="700"
          fill="#D4A76A"
          opacity="0.75"
        >
          DISPATCH
        </text>
      </g>

      {/* 4. Sharpened HB Graphite Pencil & Curled Wood Shavings */}
      <g transform={`translate(${60 + pencilFloatX}, ${50 + pencilFloatY}) rotate(${pencilTilt})`}>
        {/* Pencil Shadow & Body */}
        <g filter="url(#pencilShadow)">
          {/* Main Hexagonal Barrel */}
          <rect x="-6" y="-70" width="12" height="110" rx="1" fill="url(#pencilWood)" stroke="#590F14" strokeWidth="0.8" />
          {/* Gold Embossed Brand Strip */}
          <line x1="-6" y1="-20" x2="6" y2="-20" stroke="#FDE38C" strokeWidth="1.2" />
          <line x1="-6" y1="-24" x2="6" y2="-24" stroke="#FDE38C" strokeWidth="1.2" />
          {/* Sharpened Wood Cone */}
          <polygon points="-6,40 6,40 0,68" fill="url(#sharpenedWood)" stroke="#8A633B" strokeWidth="0.6" />
          {/* Graphite Tip */}
          <polygon points="-2,58 2,58 0,68" fill="#2B2D30" />
        </g>

        {/* Curled Wooden Pencil Shaving Flower */}
        <g transform="translate(18, 48) rotate(-24)" opacity="0.85">
          <path
            d="M 0 0 C 8 -12, 18 -6, 14 6 C 10 16, -2 14, -6 6 C -10 -2, 2 -8, 6 -4"
            fill="none"
            stroke="#CFA06E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 0 0 C 8 -12, 18 -6, 14 6 C 10 16, -2 14, -6 6 C -10 -2, 2 -8, 6 -4"
            fill="none"
            stroke="#8A1C24"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* 5. The Saved Vintage Eraser (Bridge Motif) */}
      <g
        transform={`translate(-100, 115) scale(${eraserPulse})`}
        filter="url(#eraserGlow)"
      >
        {/* Rubber Body */}
        <rect x="0" y="0" width="46" height="24" rx="3" fill="#F8F7F2" stroke="#D1CCC0" strokeWidth="1" />
        {/* Blue Cardboard Sleeve */}
        <rect x="14" y="0" width="32" height="24" fill="#1E3A8A" stroke="#0F2466" strokeWidth="0.8" />
        <rect x="18" y="4" width="2" height="16" fill="#FDE38C" />
        <text
          x="30"
          y="15"
          textAnchor="middle"
          fontFamily={VIDEO_CONFIG.fonts.accent}
          fontSize="7"
          fontWeight="700"
          fill="#FFFFFF"
        >
          APSARA
        </text>
      </g>

      {/* 6. Suspended Floating Golden Chalk & Dust Motes */}
      {dustParticles.map((pt, idx) => {
        const floatY = Math.sin(frame * pt.speed + idx) * pt.amp;
        const floatX = Math.cos(frame * pt.speed * 0.8 + idx) * (pt.amp * 0.6);
        const motePulse = 0.6 + Math.sin(frame * 0.05 + idx * 1.5) * 0.35;
        return (
          <circle
            key={`dust-${idx}`}
            cx={pt.x + floatX}
            cy={pt.y + floatY}
            r={pt.s}
            fill="#FFF5DC"
            opacity={motePulse}
            filter="drop-shadow(0 0 3px rgba(253, 227, 140, 0.7))"
          />
        );
      })}
    </g>
  );
};
