import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const GoldenHourLettersArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Organic micro-motions: slow breathing, sunlight shimmer, and floating dust motes
  const envelopeSway = Math.sin(frame * 0.028) * 1.8;
  const envelopeFloatY = Math.cos(frame * 0.032) * 1.5;

  const letterFloatY = Math.sin(frame * 0.022) * 1.2;
  const letterTilt = -4.0 + Math.sin(frame * 0.018) * 0.35;

  const penFloatX = Math.cos(frame * 0.035) * 1.1;
  const penFloatY = Math.sin(frame * 0.035) * 0.9;
  const penTilt = 28 + Math.sin(frame * 0.024) * 0.6;

  const sealGleam = 0.85 + Math.sin(frame * 0.05) * 0.15;
  const lightShimmer = 0.28 + Math.sin(frame * 0.03) * 0.06;

  // Ambient floating golden dust motes illuminated by the sunset window
  const dustMotes = [
    { x: -110, y: -120, s: 1.8, speed: 0.032, amp: 4.0 },
    { x: -50, y: -60, s: 2.2, speed: 0.038, amp: 4.8 },
    { x: 40, y: -90, s: 1.6, speed: 0.028, amp: 3.5 },
    { x: 100, y: -40, s: 2.0, speed: 0.042, amp: 4.5 },
    { x: -75, y: 40, s: 1.7, speed: 0.03, amp: 3.8 },
    { x: 60, y: 60, s: 2.4, speed: 0.036, amp: 5.0 },
    { x: 110, y: 110, s: 1.5, speed: 0.045, amp: 3.2 },
    { x: -25, y: 130, s: 2.1, speed: 0.034, amp: 4.2 },
    { x: 20, y: -15, s: 1.9, speed: 0.04, amp: 3.9 },
  ];

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Warm Vintage Woodgrain Gradient for Desk Surface */}
        <linearGradient id="oakDeskWood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7A5232" />
          <stop offset="35%" stopColor="#633F23" />
          <stop offset="70%" stopColor="#4E2F17" />
          <stop offset="100%" stopColor="#3B210E" />
        </linearGradient>

        {/* Vintage Parchment Stationery Gradient */}
        <linearGradient id="parchmentPaper" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="60%" stopColor="#FAF4E4" />
          <stop offset="100%" stopColor="#EFE5D0" />
        </linearGradient>

        {/* Classic Wax Seal (Dried Crimson Rose) */}
        <radialGradient id="waxSealGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#B33948" />
          <stop offset="50%" stopColor="#8A2434" />
          <stop offset="100%" stopColor="#54121C" />
        </radialGradient>

        {/* Polished Brass Fountain Pen Body */}
        <linearGradient id="brassPenBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8C6B23" />
          <stop offset="45%" stopColor="#E5C158" />
          <stop offset="70%" stopColor="#F9E28C" />
          <stop offset="100%" stopColor="#6E5014" />
        </linearGradient>

        {/* Dried Botanical Herbarium Fern Gradient */}
        <linearGradient id="driedFernGrad" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#425C4B" />
          <stop offset="50%" stopColor="#2E4436" />
          <stop offset="100%" stopColor="#1D2E23" />
        </linearGradient>

        {/* Soft Drop Shadows for Tactile Depth */}
        <filter id="deskObjShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="4" dy="8" stdDeviation="6" floodOpacity="0.25" floodColor="#26170D" />
        </filter>
        <filter id="envelopeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodOpacity="0.18" floodColor="#3B2616" />
        </filter>
        <filter id="penGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodOpacity="0.3" floodColor="#F9E28C" />
        </filter>
      </defs>

      {/* 1. Diagonal Venetian Blind Sunset Beams (Golden Hour Slats) */}
      <g opacity={lightShimmer} style={{ pointerEvents: "none" }}>
        <polygon points="-220,-220 180,-220 280,240 -120,240" fill="#FFE8B2" opacity="0.16" />
        <polygon points="-160,-220 80,-220 190,240 50,240" fill="#FFDA8A" opacity="0.22" />
        <polygon points="-90,-220 -10,-220 110,240 10,240" fill="#FFF3D6" opacity="0.26" />
        <polygon points="-30,-220 50,-220 150,240 70,240" fill="#FFDA8A" opacity="0.18" />
      </g>

      {/* 2. Open Stationery Envelope (Base Background Layer) */}
      <g transform={`translate(-130, ${-120 + envelopeFloatY}) rotate(${envelopeSway})`}>
        {/* Envelope Body */}
        <rect
          x="0"
          y="0"
          width="260"
          height="175"
          rx="4"
          fill="#F5EBD7"
          stroke="#D8C8AF"
          strokeWidth="1.2"
          filter="url(#envelopeShadow)"
        />
        {/* Triangular Open Flap Backing */}
        <polygon points="0,0 130,95 260,0" fill="#EDE0C7" stroke="#D3C1A5" strokeWidth="1" />
        {/* Postal Stamp on Envelope Upper Right */}
        <g transform="translate(195, 18)">
          <rect x="0" y="0" width="46" height="54" rx="2" fill="#FAF6EE" stroke="#8A2434" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="23" cy="27" r="14" fill="none" stroke="#8A2434" strokeWidth="1" opacity="0.7" />
          <path d="M 17 27 Q 23 20 29 27" fill="none" stroke="#8A2434" strokeWidth="1.2" />
        </g>
        {/* Postmark Wave Lines */}
        <path d="M 150 32 Q 165 26 180 32 M 150 40 Q 165 34 180 40" stroke="#7A6F5D" strokeWidth="0.8" opacity="0.45" />
      </g>

      {/* 3. Unfolded Handwritten Letter Paper (Hero Midground Layer) */}
      <g transform={`translate(-85, ${-90 + letterFloatY}) rotate(${letterTilt})`}>
        <rect
          x="0"
          y="0"
          width="240"
          height="280"
          rx="4"
          fill="url(#parchmentPaper)"
          stroke="#D9CBB3"
          strokeWidth="1.2"
          filter="url(#deskObjShadow)"
        />

        {/* Faint Ruled Guidelines & Poetic Cursive Text Slats */}
        {[38, 62, 86, 110, 134, 158, 182, 206, 230].map((y, idx) => (
          <g key={`letter-line-${idx}`}>
            <line x1="24" y1={y} x2="216" y2={y} stroke="#D4C4A8" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.6" />
            {/* Organic simulated handwritten text wave */}
            <path
              d={`M 28 ${y - 4} Q 45 ${y - 8} 65 ${y - 4} T 115 ${y - 4} T 165 ${y - 5} T ${idx % 2 === 0 ? 200 : 180} ${y - 4}`}
              fill="none"
              stroke="#544534"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity={0.42}
            />
          </g>
        ))}

        {/* Delicate Crimson Wax Seal Impression in Corner */}
        <g transform="translate(195, 235)">
          <circle cx="0" cy="0" r="18" fill="url(#waxSealGrad)" filter="url(#deskObjShadow)" opacity={sealGleam} />
          <circle cx="0" cy="0" r="13" fill="none" stroke="#FAF6EE" strokeWidth="0.8" opacity="0.75" />
          {/* Embossed Botanical Monogram 'G' */}
          <path d="M 4 -5 Q -6 -7 -6 0 Q -6 7 2 6 Q 6 5 6 1 L 0 1" fill="none" stroke="#FAF6EE" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      {/* 4. Pressed Dried Botanical Herbarium (Fern Frond & Lavender) */}
      <g transform="translate(-10, -30) rotate(-16)" filter="url(#deskObjShadow)">
        {/* Main Fern Stem */}
        <path d="M 0 120 Q 15 50 35 -30 Q 45 -70 50 -100" fill="none" stroke="url(#driedFernGrad)" strokeWidth="2.2" strokeLinecap="round" />
        {/* Pairs of Pressed Fern Leaves */}
        {[-80, -60, -40, -20, 0, 20, 40, 60, 80].map((offsetY, idx) => {
          const leafLen = 22 - idx * 1.4;
          return (
            <g key={`fern-leaf-${idx}`} transform={`translate(${15 + idx * 3.5}, ${offsetY})`}>
              <path
                d={`M 0 0 Q ${leafLen * 0.7} -6 ${leafLen} 0 Q ${leafLen * 0.7} 4 0 0`}
                fill="url(#driedFernGrad)"
                opacity="0.88"
              />
              <path
                d={`M 0 0 Q ${-leafLen * 0.7} -6 ${-leafLen} 0 Q ${-leafLen * 0.7} 4 0 0`}
                fill="url(#driedFernGrad)"
                opacity="0.88"
              />
            </g>
          );
        })}
        {/* Dried Lavender Flower Buds at Tip */}
        <circle cx="51" cy="-104" r="3.2" fill="#7C6B8A" opacity="0.8" />
        <circle cx="48" cy="-110" r="2.8" fill="#8E7D9E" opacity="0.85" />
        <circle cx="53" cy="-116" r="2.5" fill="#7C6B8A" opacity="0.8" />
      </g>

      {/* 5. Classic Brass Fountain Pen Resting Diagonally */}
      <g transform={`translate(${60 + penFloatX}, ${40 + penFloatY}) rotate(${penTilt})`} filter="url(#penGlow)">
        {/* Pen Barrel */}
        <rect x="-6" y="-70" width="12" height="110" rx="3" fill="url(#brassPenBody)" />
        {/* Golden Grip Section */}
        <rect x="-4.5" y="40" width="9" height="24" rx="1.5" fill="#C9A33B" />
        {/* Golden Nib */}
        <polygon points="-4,64 4,64 0,84" fill="#FCE99F" stroke="#A88220" strokeWidth="0.5" />
        {/* Nib Ink Slit Line */}
        <line x1="0" y1="64" x2="0" y2="78" stroke="#3A2810" strokeWidth="0.8" />
        <circle cx="0" cy="74" r="0.9" fill="#3A2810" />
        {/* Pen Clip Accent */}
        <rect x="-8.5" y="-62" width="2.5" height="44" rx="1" fill="#FCE99F" />
      </g>

      {/* 6. Floating Ambient Dust Particles Drifting Across Sunlight */}
      {dustMotes.map((mote, i) => {
        const floatY = Math.sin(frame * mote.speed + i) * mote.amp;
        const floatX = Math.cos(frame * mote.speed * 0.8 + i) * (mote.amp * 0.6);
        const moteOpacity = 0.45 + Math.sin(frame * 0.04 + i * 1.3) * 0.35;
        return (
          <circle
            key={`gold-mote-${i}`}
            cx={mote.x + floatX}
            cy={mote.y + floatY}
            r={mote.s}
            fill="#FFEBB8"
            opacity={moteOpacity}
            filter="drop-shadow(0 0 3px rgba(255, 230, 160, 0.8))"
          />
        );
      })}
    </g>
  );
};
