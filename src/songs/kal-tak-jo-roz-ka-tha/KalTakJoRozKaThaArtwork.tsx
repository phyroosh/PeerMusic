import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const KalTakJoRozKaThaArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // Continuous organic micro-motions (breathing desk tilt, paper flight, bell sway)
  const deskFloatY = Math.sin(frame * 0.03) * 1.5;
  const deskTilt = -2.2 + Math.sin(frame * 0.02) * 0.35;

  const planeHoverY = Math.sin(frame * 0.045) * 2.2;
  const planeBank = -20 + Math.sin(frame * 0.035) * 1.5;

  const tiffinFloatY = Math.cos(frame * 0.032) * 1.2;
  const tiffinTilt = 2.8 + Math.sin(frame * 0.025) * 0.4;

  const bellSway = Math.sin(frame * 0.038) * 2.0;
  const leafShimmer = 0.92 + Math.sin(frame * 0.05) * 0.08;

  // Sunlight shimmer intensity
  const lightShimmer = 0.15 + Math.sin(frame * 0.035) * 0.035;

  // Floating classroom sunlight dust & chalk motes
  const dustParticles = [
    { x: -110, y: -120, s: 1.8, speed: 0.04, amp: 4 },
    { x: -55, y: -70, s: 2.2, speed: 0.03, amp: 5 },
    { x: 25, y: -95, s: 1.5, speed: 0.05, amp: 3.5 },
    { x: 90, y: -45, s: 2.0, speed: 0.035, amp: 4.5 },
    { x: -75, y: 25, s: 1.6, speed: 0.045, amp: 4 },
    { x: 40, y: 45, s: 2.4, speed: 0.03, amp: 5.5 },
    { x: 105, y: 90, s: 1.7, speed: 0.04, amp: 3 },
    { x: -30, y: 115, s: 2.1, speed: 0.05, amp: 4.2 },
    { x: -90, y: 80, s: 1.4, speed: 0.042, amp: 3.8 },
    { x: 15, y: -30, s: 1.9, speed: 0.038, amp: 4.0 },
  ];

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Rich Teak Woodgrain Planks Gradient */}
        <linearGradient id="teakPlankLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A46E40" />
          <stop offset="45%" stopColor="#8F562A" />
          <stop offset="85%" stopColor="#75421B" />
          <stop offset="100%" stopColor="#5E3112" />
        </linearGradient>

        {/* Polished Brass Bell & Metallic Trim */}
        <linearGradient id="brassMetallic" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9C7728" />
          <stop offset="30%" stopColor="#FDE38C" />
          <stop offset="65%" stopColor="#CFA037" />
          <stop offset="100%" stopColor="#7A5817" />
        </linearGradient>

        {/* Stainless Steel Tiffin Box Gradient */}
        <linearGradient id="steelBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#BCC5CE" />
          <stop offset="30%" stopColor="#EAF0F6" />
          <stop offset="70%" stopColor="#CCD5DE" />
          <stop offset="100%" stopColor="#9CA8B5" />
        </linearGradient>

        {/* Pressed Skeleton Leaf Amber Gradient */}
        <linearGradient id="leafAmber" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#F5CE7A" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#D99436" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#8A4A10" stopOpacity="0.9" />
        </linearGradient>

        {/* Origami Paper Plane Facet Shading */}
        <linearGradient id="planeTopWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDE7DB" />
        </linearGradient>
        <linearGradient id="planeUnderWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DCD4C5" />
          <stop offset="100%" stopColor="#C8BEAD" />
        </linearGradient>

        {/* Realistic Soft Drop Shadows */}
        <filter id="deskObjShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodOpacity="0.24" floodColor="#2A1B0E" />
        </filter>
        <filter id="leafShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="2" dy="3" stdDeviation="2.5" floodOpacity="0.18" floodColor="#3B2612" />
        </filter>
        <filter id="planeShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="5" dy="9" stdDeviation="6" floodOpacity="0.2" floodColor="#3A3022" />
        </filter>
      </defs>

      {/* 1. Base Element: Classroom Wooden Desk Slab with Hand-Carved Memories */}
      <g transform={`translate(-140, ${-145 + deskFloatY}) rotate(${deskTilt})`}>
        {/* Desk Plank Slab */}
        <rect
          x="0"
          y="0"
          width="280"
          height="295"
          rx="6"
          fill="url(#teakPlankLight)"
          stroke="#4D270C"
          strokeWidth="1.5"
          filter="url(#deskObjShadow)"
        />

        {/* Teak Woodgrain Fiber Flow */}
        {[24, 54, 84, 114, 144, 174, 204, 234, 264].map((gy, idx) => (
          <path
            key={`grain-${idx}`}
            d={`M 12,${gy} Q 70,${gy + (idx % 2 === 0 ? 3 : -3)} 140,${gy} T 268,${gy + (idx % 3 === 0 ? 2 : -2)}`}
            fill="none"
            stroke="#542B0D"
            strokeWidth="0.8"
            opacity="0.32"
          />
        ))}

        {/* Iconic Dividing Scratch: "Desk pe aadhi si ek lakeer" */}
        <line
          x1="140"
          y1="16"
          x2="140"
          y2="280"
          stroke="#3B1C05"
          strokeWidth="1.8"
          strokeDasharray="14 3 28 4 8 2"
          opacity="0.88"
        />
        {/* Subtle highlight next to carved groove */}
        <line
          x1="141.5"
          y1="17"
          x2="141.5"
          y2="279"
          stroke="#D49B6A"
          strokeWidth="0.7"
          opacity="0.4"
        />

        {/* Hand-carved Initials etched with compass: "KT + 10B" & Heart */}
        <g transform="translate(190, 48) rotate(4)" opacity="0.7">
          <text
            x="0"
            y="0"
            fontFamily={VIDEO_CONFIG.fonts.accent}
            fontSize="14"
            fontWeight="bold"
            fill="#3B1C05"
            letterSpacing="0.08em"
          >
            KT + 10B
          </text>
          {/* Compass-etched Heart */}
          <path
            d="M 12,8 C 12,3 4,3 4,10 C 4,15 12,20 12,20 C 12,20 20,15 20,10 C 20,3 12,3 12,8 Z"
            fill="none"
            stroke="#3B1C05"
            strokeWidth="1.1"
          />
          {/* Compass Arc Scratches */}
          <path
            d="M -10,25 A 35 35 0 0 1 30,22"
            fill="none"
            stroke="#3B1C05"
            strokeWidth="0.7"
            strokeDasharray="4 2"
            opacity="0.6"
          />
        </g>

        {/* Leaky Fountain Pen Ink Stain */}
        <g transform="translate(42, 230)" opacity="0.6">
          <circle cx="0" cy="0" r="7" fill="#1C304A" />
          <circle cx="-5" cy="4" r="3" fill="#1C304A" />
          <circle cx="6" cy="-3" r="2.5" fill="#1C304A" />
          <circle cx="3" cy="6" r="1.8" fill="#1C304A" />
        </g>
      </g>

      {/* 2. Vintage School Attendance Index Slip: "Roll No. 24 • Present, Sir!" */}
      <g transform="translate(-115, -125) rotate(-6)" filter="url(#leafShadow)">
        {/* Paper Slip Card */}
        <rect x="0" y="0" width="135" height="85" rx="3" fill="#FAF6EE" stroke="#D2C7B5" strokeWidth="1" />
        {/* Faint Ruled Lines */}
        {[22, 38, 54, 70].map((ly, idx) => (
          <line key={`rule-${idx}`} x1="8" y1={ly} x2="127" y2={ly} stroke="#9BB2C4" strokeWidth="0.6" opacity="0.6" />
        ))}
        {/* Vertical Red Margin */}
        <line x1="26" y1="0" x2="26" y2="85" stroke="#E2726E" strokeWidth="0.8" opacity="0.5" />

        {/* Handwritten Pencil Content */}
        <text
          x="32"
          y="18"
          fontFamily={VIDEO_CONFIG.fonts.tag}
          fontSize="9"
          fontWeight="bold"
          fill="#4A3F33"
          letterSpacing="0.08em"
        >
          ROLL NO. 24
        </text>
        <text
          x="32"
          y="34"
          fontFamily={VIDEO_CONFIG.fonts.tag}
          fontSize="8"
          fill="#6B5E4D"
        >
          CLASS: 10-A (1998)
        </text>
        <text
          x="32"
          y="50"
          fontFamily={VIDEO_CONFIG.fonts.heading}
          fontSize="8.5"
          fontStyle="italic"
          fill="#2A4436"
        >
          Attendance: Present ✓
        </text>
        <text
          x="32"
          y="66"
          fontFamily={VIDEO_CONFIG.fonts.accent}
          fontSize="7.5"
          fill="#8A2434"
          letterSpacing="0.05em"
        >
          ST. XAVIER'S HIGH
        </text>

        {/* Washi Tape Strip holding slip */}
        <rect
          x="40"
          y="-6"
          width="48"
          height="14"
          rx="1"
          fill="#EADBBA"
          opacity="0.8"
          transform="rotate(3, 64, 1)"
        />
      </g>

      {/* 3. Botanical Pressed Skeleton Peepal Leaf with Brass Specimen Needle */}
      <g transform={`translate(-20, -5) rotate(18)`} filter="url(#leafShadow)" opacity={leafShimmer}>
        {/* Delicate Bodhi / Peepal Leaf Silhouette */}
        <path
          d="M 0,-45 C 22,-20 32,8 20,38 C 12,50 4,58 0,62 C -4,58 -12,50 -20,38 C -32,8 -22,-20 0,-45 Z"
          fill="url(#leafAmber)"
          stroke="#9E5D1D"
          strokeWidth="0.8"
        />
        {/* Elongated Peepal Leaf Tail Tip */}
        <path
          d="M 0,-45 C 0,-56 4,-64 2,-72 C 0,-64 0,-56 0,-45"
          fill="none"
          stroke="#7A4512"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Central Leaf Vein (Rachis) */}
        <path d="M 0,-45 L 0,62" fill="none" stroke="#7A4512" strokeWidth="1.2" />

        {/* Lateral Secondary Veins */}
        {[-30, -18, -6, 6, 18, 30, 42].map((vy, idx) => (
          <g key={`vein-${idx}`}>
            <path
              d={`M 0,${vy} Q 10,${vy - 5} 18,${vy - 2}`}
              fill="none"
              stroke="#B36F22"
              strokeWidth="0.6"
              opacity="0.8"
            />
            <path
              d={`M 0,${vy} Q -10,${vy - 5} -18,${vy - 2}`}
              fill="none"
              stroke="#B36F22"
              strokeWidth="0.6"
              opacity="0.8"
            />
          </g>
        ))}

        {/* Antique Brass Specimen Pin holding the leaf */}
        <g transform="translate(0, 15)">
          {/* Cast needle shadow */}
          <line x1="1" y1="2" x2="8" y2="18" stroke="#2B1A0A" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
          {/* Needle Shaft */}
          <line x1="0" y1="0" x2="6" y2="15" stroke="#C49A32" strokeWidth="1.1" strokeLinecap="round" />
          {/* Spherical Brass Bead Head */}
          <circle cx="0" cy="0" r="3.2" fill="url(#brassMetallic)" stroke="#664610" strokeWidth="0.6" />
          {/* Highlight glint */}
          <circle cx="-0.8" cy="-0.8" r="1.0" fill="#FFFFFF" opacity="0.9" />
        </g>
      </g>

      {/* 4. The Origami Paper Airplane: "Woh panno ke airplane bana kar, hawa mein jo tarashe the!" */}
      <g transform={`translate(65, ${-45 + planeHoverY}) rotate(${planeBank})`} filter="url(#planeShadow)">
        {/* Faint Dotted Trajectory Trail arching from behind */}
        <path
          d="M -70,55 Q -30,25 0,0"
          fill="none"
          stroke="#7A6F5D"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.5"
        />

        {/* Paper Plane 3D Geometry */}
        {/* Left Underwing Fold (Shadowed) */}
        <polygon points="0,0 -42,-18 -28,8" fill="url(#planeUnderWing)" stroke="#AFA594" strokeWidth="0.7" />
        {/* Right Underwing Fold */}
        <polygon points="0,0 -28,8 -38,24" fill="#BDB3A1" stroke="#AFA594" strokeWidth="0.7" />
        {/* Main Fuselage Spine */}
        <polygon points="0,0 -48,-4 -28,8" fill="#EDE7DC" stroke="#9E9482" strokeWidth="0.8" />
        {/* Top Wing (Facing Sunlight) */}
        <polygon points="0,0 26,-8 -48,-4" fill="url(#planeTopWing)" stroke="#ABA18F" strokeWidth="0.8" />

        {/* Faint Lined Notebook Blue Lines printed on the folded paper */}
        <line x1="-36" y1="-3" x2="-8" y2="-6" stroke="#9CB6CA" strokeWidth="0.5" opacity="0.6" />
        <line x1="-32" y1="2" x2="-6" y2="-1" stroke="#9CB6CA" strokeWidth="0.5" opacity="0.6" />
      </g>

      {/* 5. Iconic Polished Brass School Bell: "Ab woh ghanti nahi bulaati..." */}
      <g transform={`translate(-78, 88) rotate(${bellSway})`} filter="url(#deskObjShadow)">
        {/* Turned Hardwood Handle */}
        <path
          d="M 12,-35 C 9,-35 8,-28 10,-20 C 11,-15 9,-8 9,0 L 15,0 C 15,-8 13,-15 14,-20 C 16,-28 15,-35 12,-35 Z"
          fill="#542B0D"
          stroke="#361A05"
          strokeWidth="0.8"
        />
        {/* Brass Cap Collar */}
        <ellipse cx="12" cy="0" rx="6" ry="2.5" fill="url(#brassMetallic)" stroke="#735213" strokeWidth="0.8" />

        {/* Bell Flare Dome */}
        <path
          d="M 6,0 C 6,10 -2,22 -8,28 L 32,28 C 26,22 18,10 18,0 Z"
          fill="url(#brassMetallic)"
          stroke="#735213"
          strokeWidth="1.2"
        />
        {/* Bottom Rim Lip */}
        <ellipse cx="12" cy="28" rx="20" ry="4.5" fill="url(#brassMetallic)" stroke="#735213" strokeWidth="1.2" />

        {/* Inner Clapper Tip */}
        <circle cx="12" cy="32" r="3.2" fill="#3D2905" />
      </g>

      {/* 6. Stainless Steel 2-Tier Tiffin Box: "Ek tiffin mein chaar haath" */}
      <g transform={`translate(48, ${24 + tiffinFloatY}) rotate(${tiffinTilt})`} filter="url(#deskObjShadow)">
        {/* Bottom Tier Container */}
        <rect x="0" y="42" width="84" height="40" rx="8" fill="url(#steelBody)" stroke="#8F9CA8" strokeWidth="1.2" />
        {/* Middle Tier Container */}
        <rect x="0" y="8" width="84" height="38" rx="8" fill="url(#steelBody)" stroke="#8F9CA8" strokeWidth="1.2" />
        {/* Tier Seam Divider Ring */}
        <line x1="2" y1="44" x2="82" y2="44" stroke="#717E8C" strokeWidth="1.4" />

        {/* Top Dome Lid */}
        <path
          d="M 6,10 C 6,2 24,-4 42,-4 C 60,-4 78,2 78,10 Z"
          fill="#FFFFFF"
          stroke="#8F9CA8"
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* Top Wire Handle */}
        <path
          d="M 28,-3 C 28,-14 56,-14 56,-3"
          fill="none"
          stroke="#7F8D9B"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Dual Brass Side Clamps */}
        <g transform="translate(-4, 20)">
          <rect x="0" y="0" width="6" height="42" rx="2" fill="url(#brassMetallic)" stroke="#664610" strokeWidth="0.8" />
          <circle cx="3" cy="8" r="2" fill="#52380C" />
          <circle cx="3" cy="34" r="2" fill="#52380C" />
        </g>
        <g transform="translate(82, 20)">
          <rect x="0" y="0" width="6" height="42" rx="2" fill="url(#brassMetallic)" stroke="#664610" strokeWidth="0.8" />
          <circle cx="3" cy="8" r="2" fill="#52380C" />
          <circle cx="3" cy="34" r="2" fill="#52380C" />
        </g>
      </g>

      {/* 7. Diagonal Slanted Classroom Window Sunlight Beam */}
      <polygon
        points="-170,-170 40,-170 170,40 170,170 -40,170 -170,-40"
        fill="#FFF9E6"
        opacity={lightShimmer}
        style={{ mixBlendMode: "screen", pointerEvents: "none" }}
      />

      {/* 8. Floating Classroom Chalk & Sunlight Dust Motes */}
      {dustParticles.map((dp, idx) => {
        const py = dp.y + Math.sin(frame * dp.speed + idx) * dp.amp;
        const px = dp.x + Math.cos(frame * dp.speed * 0.8 + idx) * (dp.amp * 0.7);
        const pOpacity = 0.35 + Math.sin(frame * 0.05 + idx * 1.5) * 0.25;

        return (
          <circle
            key={`dust-${idx}`}
            cx={px}
            cy={py}
            r={dp.s}
            fill="#FFFBE8"
            opacity={pOpacity}
            style={{ pointerEvents: "none" }}
          />
        );
      })}
    </g>
  );
};
