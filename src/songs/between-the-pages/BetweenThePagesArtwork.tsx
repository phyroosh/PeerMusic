import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const BetweenThePagesArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Organic micro-motions (breathing desk shelf, fluttering page corner, ticking clock)
  const shelfFloatY = Math.sin(frame * 0.025) * 1.5;
  const bookTilt = -2.5 + Math.sin(frame * 0.02) * 0.3;

  // Fluttering corner of the open book in the quiet room breeze
  const pageFlutter = Math.sin(frame * 0.045) * 2.8;

  // Brass clock hands rotation:
  // Smooth second hand rotation (1 full revolution every 60s = 3600 frames @ 60fps)
  const secondHandAngle = (frame / 3600) * 360 * 5; // gentle, visible movement
  const minuteHandAngle = (frame / 3600) * 360 * 0.8 + 84; // ~14 minutes
  const hourHandAngle = 92; // ~3 o'clock ("afternoon lessons")

  // Shimmering golden sunbeam intensity
  const sunbeamPulse = 0.22 + Math.sin(frame * 0.035) * 0.05;

  // Ambient floating library dust particles suspended in sunbeams
  const dustParticles = [
    { x: -110, y: -120, s: 2.0, speed: 0.032, amp: 4.2 },
    { x: -55, y: -80, s: 2.4, speed: 0.04, amp: 5.0 },
    { x: 30, y: -105, s: 1.8, speed: 0.028, amp: 3.6 },
    { x: 95, y: -65, s: 2.2, speed: 0.045, amp: 4.5 },
    { x: -75, y: 15, s: 1.6, speed: 0.035, amp: 3.8 },
    { x: -15, y: 45, s: 2.5, speed: 0.038, amp: 5.2 },
    { x: 70, y: 30, s: 1.7, speed: 0.042, amp: 4.0 },
    { x: 120, y: 75, s: 2.1, speed: 0.048, amp: 4.6 },
    { x: -45, y: 110, s: 1.5, speed: 0.03, amp: 3.5 },
    { x: 40, y: 120, s: 2.2, speed: 0.036, amp: 4.4 },
    { x: 100, y: -20, s: 1.9, speed: 0.044, amp: 4.1 },
  ];

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Weathered Oak Bookshelf Gradient */}
        <linearGradient id="oakShelf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A5A36" />
          <stop offset="35%" stopColor="#734524" />
          <stop offset="70%" stopColor="#5C3417" />
          <stop offset="100%" stopColor="#45240E" />
        </linearGradient>

        {/* Antique Book Leather Spines */}
        <linearGradient id="navyBookSpine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1B2A38" />
          <stop offset="30%" stopColor="#283E54" />
          <stop offset="70%" stopColor="#3A5570" />
          <stop offset="100%" stopColor="#1E2F40" />
        </linearGradient>

        <linearGradient id="crimsonBookSpine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5C1B20" />
          <stop offset="35%" stopColor="#7A242B" />
          <stop offset="70%" stopColor="#9E333C" />
          <stop offset="100%" stopColor="#631E23" />
        </linearGradient>

        <linearGradient id="sageBookSpine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2C3D32" />
          <stop offset="40%" stopColor="#3F5647" />
          <stop offset="75%" stopColor="#55735F" />
          <stop offset="100%" stopColor="#33473A" />
        </linearGradient>

        {/* Aged Parchment Book Pages */}
        <linearGradient id="parchmentPages" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAF4E8" />
          <stop offset="50%" stopColor="#F2E6CE" />
          <stop offset="100%" stopColor="#E2D2B0" />
        </linearGradient>

        {/* Polished Antique Brass (Clock, Pen, Trim) */}
        <linearGradient id="libraryBrass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8C6824" />
          <stop offset="30%" stopColor="#E5C158" />
          <stop offset="60%" stopColor="#F7DF88" />
          <stop offset="85%" stopColor="#C99B32" />
          <stop offset="100%" stopColor="#6E4F18" />
        </linearGradient>

        {/* Clock Face Enamel */}
        <radialGradient id="clockFace" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="75%" stopColor="#F7EED8" />
          <stop offset="100%" stopColor="#DFD2B5" />
        </radialGradient>

        {/* Diagonal Golden Sunbeam */}
        <linearGradient id="goldenSunbeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE8A3" stopOpacity={sunbeamPulse * 1.3} />
          <stop offset="50%" stopColor="#FCD374" stopOpacity={sunbeamPulse} />
          <stop offset="100%" stopColor="#F5B942" stopOpacity="0" />
        </linearGradient>

        {/* Pressed Botanical Fern */}
        <linearGradient id="driedFern" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A9A65" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#6E7D4E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#4A5633" stopOpacity="0.9" />
        </linearGradient>

        {/* Soft Drop Shadows */}
        <filter id="bookShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="3" dy="6" stdDeviation="6" floodOpacity="0.25" floodColor="#2A1E14" />
        </filter>
        <filter id="clockShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="4" dy="7" stdDeviation="5" floodOpacity="0.28" floodColor="#2A1B0E" />
        </filter>
        <filter id="sunGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Diagonal Afternoon Golden Sunbeam Streams */}
      <polygon
        points="-180,-180 -20,-180 180,180 20,180"
        fill="url(#goldenSunbeam)"
        style={{ pointerEvents: "none" }}
      />
      <polygon
        points="-120,-180 50,-180 190,140 20,140"
        fill="url(#goldenSunbeam)"
        opacity="0.65"
        style={{ pointerEvents: "none" }}
      />

      {/* 2. Weathered Oak Library Shelf Base */}
      <g transform={`translate(-145, ${105 + shelfFloatY})`}>
        {/* Shelf Plank */}
        <rect
          x="0"
          y="0"
          width="290"
          height="32"
          rx="3"
          fill="url(#oakShelf)"
          stroke="#3D200B"
          strokeWidth="1.2"
          filter="url(#bookShadow)"
        />
        {/* Subtle Woodgrain Streaks */}
        <line x1="15" y1="10" x2="275" y2="10" stroke="#4F260C" strokeWidth="0.8" opacity="0.45" />
        <line x1="25" y1="20" x2="260" y2="20" stroke="#4F260C" strokeWidth="0.7" opacity="0.4" />
        <line x1="60" y1="6" x2="190" y2="6" stroke="#A67045" strokeWidth="0.9" opacity="0.35" />
      </g>

      {/* 3. Vintage Brass Library Clock (Top-Left, Ticking Slow) */}
      <g transform="translate(-82, -62)" filter="url(#clockShadow)">
        {/* Outer Stepped Brass Casing */}
        <circle cx="0" cy="0" r="44" fill="url(#libraryBrass)" stroke="#5A3E10" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="38" fill="#422E0E" />
        <circle cx="0" cy="0" r="36" fill="url(#clockFace)" stroke="#7A5618" strokeWidth="1" />

        {/* Roman Numeral Hour Markers */}
        <text x="0" y="-23" textAnchor="middle" fontFamily="serif" fontSize="8" fontWeight="bold" fill="#2E2419">XII</text>
        <text x="26" y="3" textAnchor="middle" fontFamily="serif" fontSize="8" fontWeight="bold" fill="#2E2419">III</text>
        <text x="0" y="29" textAnchor="middle" fontFamily="serif" fontSize="8" fontWeight="bold" fill="#2E2419">VI</text>
        <text x="-26" y="3" textAnchor="middle" fontFamily="serif" fontSize="8" fontWeight="bold" fill="#2E2419">IX</text>

        {/* Minute Tick Ring */}
        {[...Array(12)].map((_, i) => (
          <line
            key={`tick_${i}`}
            x1="0"
            y1="-34"
            x2="0"
            y2="-31"
            stroke="#5C4830"
            strokeWidth={i % 3 === 0 ? "1.5" : "0.8"}
            transform={`rotate(${i * 30})`}
          />
        ))}

        {/* Clock Hands */}
        {/* Hour Hand (Pointing around 3 o'clock - afternoon lessons) */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-16"
          stroke="#1F1A15"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${hourHandAngle})`}
        />
        {/* Minute Hand */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-24"
          stroke="#2A221A"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${minuteHandAngle})`}
        />
        {/* Second Hand (Ticking Smoothly with Micro-Sweep) */}
        <line
          x1="0"
          y1="5"
          x2="0"
          y2="-27"
          stroke="#8A2434"
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${secondHandAngle})`}
        />
        {/* Central Brass Cap */}
        <circle cx="0" cy="0" r="3" fill="url(#libraryBrass)" stroke="#3D2A08" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="1.2" fill="#8A2434" />
      </g>

      {/* 4. The Stack of Antique Hardcover Books (Center-Left) */}
      <g transform={`translate(-45, ${10 + shelfFloatY}) rotate(${bookTilt})`} filter="url(#bookShadow)">
        {/* Book 1 (Bottom): Heavy Indigo Leather Bound Volume */}
        <g transform="translate(-65, 52)">
          {/* Page Edge Rim */}
          <rect x="18" y="2" width="128" height="20" rx="1" fill="url(#parchmentPages)" stroke="#B8A785" strokeWidth="0.8" />
          {/* Leather Spine & Cover */}
          <rect x="0" y="0" width="144" height="24" rx="3" fill="url(#navyBookSpine)" stroke="#111B24" strokeWidth="1" />
          {/* Gold Embossed Spine Ribs & Tooling */}
          <line x1="8" y1="2" x2="8" y2="22" stroke="url(#libraryBrass)" strokeWidth="1.5" opacity="0.8" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="url(#libraryBrass)" strokeWidth="0.8" opacity="0.6" />
          <line x1="134" y1="2" x2="134" y2="22" stroke="url(#libraryBrass)" strokeWidth="1.2" opacity="0.8" />
          <text x="70" y="15" textAnchor="middle" fontFamily="serif" fontSize="7" fontWeight="bold" letterSpacing="1.5" fill="#E5C158" opacity="0.85">
            DICTIONNAIRE
          </text>
        </g>

        {/* Book 2 (Middle): Crimson Cloth Bound Volume */}
        <g transform="translate(-58, 28) rotate(-1.5)">
          {/* Page Edge Rim */}
          <rect x="16" y="2" width="118" height="18" rx="1" fill="url(#parchmentPages)" stroke="#B8A785" strokeWidth="0.8" />
          {/* Crimson Spine */}
          <rect x="0" y="0" width="132" height="22" rx="2.5" fill="url(#crimsonBookSpine)" stroke="#3B1014" strokeWidth="1" />
          {/* Gilded Tooling */}
          <line x1="7" y1="2" x2="7" y2="20" stroke="url(#libraryBrass)" strokeWidth="1.2" opacity="0.85" />
          <line x1="124" y1="2" x2="124" y2="20" stroke="url(#libraryBrass)" strokeWidth="1.2" opacity="0.85" />
          <text x="65" y="14" textAnchor="middle" fontFamily="serif" fontSize="6.5" fontStyle="italic" letterSpacing="1.2" fill="#FDE38C" opacity="0.9">
            POÈMES • VOL. IV
          </text>
        </g>

        {/* Book 3 (Top): Sage Olive Leather with Gold Stamp */}
        <g transform="translate(-50, 6) rotate(1.2)">
          {/* Page Edge Rim */}
          <rect x="14" y="2" width="108" height="16" rx="1" fill="url(#parchmentPages)" stroke="#B8A785" strokeWidth="0.8" />
          {/* Sage Spine */}
          <rect x="0" y="0" width="120" height="20" rx="2" fill="url(#sageBookSpine)" stroke="#1C2620" strokeWidth="1" />
          {/* Title Foil */}
          <line x1="6" y1="2" x2="6" y2="18" stroke="url(#libraryBrass)" strokeWidth="1.2" opacity="0.85" />
          <line x1="112" y1="2" x2="112" y2="18" stroke="url(#libraryBrass)" strokeWidth="1.2" opacity="0.85" />
          <text x="58" y="13" textAnchor="middle" fontFamily="serif" fontSize="6" fontWeight="bold" letterSpacing="1.8" fill="#F3DF88" opacity="0.95">
            AFTERNOON LESSONS
          </text>
        </g>
      </g>

      {/* 5. Open Vintage Notebook / Book (Center-Right Foreground) */}
      <g transform={`translate(28, ${42 + shelfFloatY}) rotate(8)`} filter="url(#bookShadow)">
        {/* Hardcover Underneath */}
        <rect x="-6" y="-4" width="118" height="74" rx="3" fill="#3D291C" stroke="#26170D" strokeWidth="1.2" />

        {/* Left Page */}
        <path
          d="M 2 0 Q 28 2, 54 4 L 54 66 Q 28 65, 2 64 Z"
          fill="url(#parchmentPages)"
          stroke="#C4B393"
          strokeWidth="0.8"
        />

        {/* Right Page (With Breeze Page Flutter) */}
        <path
          d={`M 54 4 Q 80 2, 106 ${0 + pageFlutter} L 106 ${62 + pageFlutter * 0.8} Q 80 65, 54 66 Z`}
          fill="url(#parchmentPages)"
          stroke="#C4B393"
          strokeWidth="0.8"
        />

        {/* Center Spine Crease */}
        <line x1="54" y1="2" x2="54" y2="67" stroke="#7A6850" strokeWidth="1.2" opacity="0.75" />
        <line x1="53" y1="2" x2="53" y2="67" stroke="#3D3020" strokeWidth="0.8" opacity="0.5" />

        {/* Handwritten French Study Notes / Cursive Lines on Left Page */}
        <g opacity="0.55" stroke="#4A3728" strokeWidth="0.9" strokeLinecap="round">
          <line x1="10" y1="14" x2="46" y2="15" />
          <line x1="10" y1="22" x2="44" y2="23" />
          <line x1="10" y1="30" x2="40" y2="31" />
          <line x1="10" y1="38" x2="46" y2="39" />
          <line x1="10" y1="46" x2="36" y2="47" />
          <line x1="10" y1="54" x2="44" y2="55" />
        </g>

        {/* Subtle Handwritten Heading: "le présent" */}
        <text x="12" y="11" fontFamily="serif" fontSize="5.5" fontStyle="italic" fill="#8A2434" opacity="0.75">
          aimer • toujours
        </text>

        {/* Handwritten Notes on Right Page */}
        <g opacity="0.5" stroke="#4A3728" strokeWidth="0.9" strokeLinecap="round">
          <line x1="62" y1="15" x2={98 + pageFlutter * 0.5} y2={14 + pageFlutter * 0.2} />
          <line x1="62" y1="23" x2={96 + pageFlutter * 0.5} y2={22 + pageFlutter * 0.2} />
          <line x1="62" y1="31" x2={92 + pageFlutter * 0.5} y2={30 + pageFlutter * 0.2} />
          <line x1="62" y1="39" x2={98 + pageFlutter * 0.5} y2={38 + pageFlutter * 0.2} />
          <line x1="62" y1="47" x2={88 + pageFlutter * 0.5} y2={46 + pageFlutter * 0.2} />
          <line x1="62" y1="55" x2={95 + pageFlutter * 0.5} y2={54 + pageFlutter * 0.2} />
        </g>

        {/* 6. Pressed Botanical Fern Bookmark resting between pages */}
        <g transform="translate(54, 18) rotate(-14)" opacity="0.85">
          {/* Main Stem */}
          <path d="M 0 0 Q 4 16, 2 46" fill="none" stroke="url(#driedFern)" strokeWidth="1.2" />
          {/* Fern Pinnae Fronds */}
          {[6, 12, 18, 24, 30, 36, 42].map((y, idx) => (
            <g key={`frond_${idx}`}>
              <path
                d={`M 1 ${y} Q ${8 + idx * 0.6} ${y - 3}, ${12 + (idx % 2) * 2} ${y - 1}`}
                fill="none"
                stroke="url(#driedFern)"
                strokeWidth="0.9"
                strokeLinecap="round"
              />
              <path
                d={`M 0 ${y + 2} Q ${-7 - idx * 0.6} ${y - 1}, ${-10 - (idx % 2) * 2} ${y + 1}`}
                fill="none"
                stroke="url(#driedFern)"
                strokeWidth="0.9"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        {/* 7. Classic Slender Brass Fountain Pen resting on open notebook */}
        <g transform="translate(32, 54) rotate(-38)" filter="url(#bookShadow)">
          {/* Barrel & Grip */}
          <rect x="0" y="0" width="56" height="5.5" rx="2" fill="url(#libraryBrass)" stroke="#52390E" strokeWidth="0.6" />
          {/* Black Lacquer Section */}
          <rect x="36" y="0.5" width="12" height="4.5" fill="#1A1815" />
          {/* Gold Nib */}
          <polygon points="56,0.5 63,2.75 56,5" fill="url(#libraryBrass)" stroke="#6B4B12" strokeWidth="0.5" />
          {/* Nib Center Breather Hole & Slit */}
          <circle cx="58.5" cy="2.75" r="0.6" fill="#1F1A15" />
          <line x1="58.5" y1="2.75" x2="62.5" y2="2.75" stroke="#1F1A15" strokeWidth="0.4" />
          {/* Brass Clip */}
          <rect x="6" y="-1.2" width="22" height="1.4" rx="0.5" fill="url(#libraryBrass)" stroke="#5A3F10" strokeWidth="0.4" />
        </g>
      </g>

      {/* 8. Floating Golden Library Dust Motes Suspended in Sunlight */}
      {dustParticles.map((pt, i) => {
        const floatX = pt.x + Math.sin(frame * pt.speed + i) * pt.amp;
        const floatY = pt.y + Math.cos(frame * pt.speed * 0.8 + i) * pt.amp;
        const opacity = 0.35 + Math.sin(frame * 0.05 + i * 1.2) * 0.3;

        return (
          <circle
            key={`dust_${i}`}
            cx={floatX}
            cy={floatY}
            r={pt.s}
            fill="#FFE899"
            opacity={Math.max(0.1, opacity)}
            filter="url(#sunGlow)"
          />
        );
      })}

      {/* 9. Warm Ambient Vignette Glow around edges */}
      <circle cx="0" cy="0" r="140" fill="none" stroke="#FDE8A0" strokeWidth="1" opacity="0.12" />
    </g>
  );
};
