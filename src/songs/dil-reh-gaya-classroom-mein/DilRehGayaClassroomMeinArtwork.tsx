import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const DilRehGayaClassroomMeinArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // Continuous organic micro-motions
  const deskFloatY = Math.sin(frame * 0.028) * 1.6;
  const deskTilt = -1.8 + Math.sin(frame * 0.022) * 0.3;

  const planeHoverY = Math.sin(frame * 0.042) * 2.5;
  const planeBank = -18 + Math.sin(frame * 0.032) * 1.8;

  const bellSway = Math.sin(frame * 0.036) * 2.2;
  const inkDropPulse = 0.9 + Math.sin(frame * 0.05) * 0.1;

  // Sunlight shimmer intensity
  const lightShimmer = 0.18 + Math.sin(frame * 0.03) * 0.04;

  // Floating classroom sunlight dust & chalk motes
  const dustParticles = [
    { x: -115, y: -125, s: 1.8, speed: 0.04, amp: 4 },
    { x: -50, y: -65, s: 2.2, speed: 0.03, amp: 5 },
    { x: 30, y: -90, s: 1.5, speed: 0.05, amp: 3.5 },
    { x: 95, y: -40, s: 2.0, speed: 0.035, amp: 4.5 },
    { x: -80, y: 30, s: 1.6, speed: 0.045, amp: 4 },
    { x: 45, y: 50, s: 2.4, speed: 0.03, amp: 5.5 },
    { x: 110, y: 95, s: 1.7, speed: 0.04, amp: 3 },
    { x: -25, y: 120, s: 2.1, speed: 0.05, amp: 4.2 },
    { x: -85, y: 85, s: 1.4, speed: 0.042, amp: 3.8 },
    { x: 20, y: -25, s: 1.9, speed: 0.038, amp: 4.0 },
  ];

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Rich Teak Woodgrain Planks Gradient */}
        <linearGradient id="drgTeakPlankLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A46E40" />
          <stop offset="45%" stopColor="#8F562A" />
          <stop offset="85%" stopColor="#75421B" />
          <stop offset="100%" stopColor="#5E3112" />
        </linearGradient>

        {/* Polished Brass Bell & Metallic Trim */}
        <linearGradient id="drgBrassMetallic" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9C7728" />
          <stop offset="30%" stopColor="#FDE38C" />
          <stop offset="65%" stopColor="#CFA037" />
          <stop offset="100%" stopColor="#7A5817" />
        </linearGradient>

        {/* Vintage Fountain Pen Royal Ink */}
        <linearGradient id="drgRoyalInk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Origami Paper Plane Facet Shading */}
        <linearGradient id="drgPlaneTopWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDE7DB" />
        </linearGradient>
        <linearGradient id="drgPlaneUnderWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DCD4C5" />
          <stop offset="100%" stopColor="#C8BEAD" />
        </linearGradient>

        {/* Soft Drop Shadows */}
        <filter id="drgDeskObjShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodOpacity="0.25" floodColor="#2A1B0E" />
        </filter>
        <filter id="drgPlaneShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="5" dy="9" stdDeviation="6" floodOpacity="0.22" floodColor="#3A3022" />
        </filter>
        <filter id="drgBellGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodOpacity="0.3" floodColor="#FDE38C" />
        </filter>
      </defs>

      {/* 1. Base Element: Wooden School Desk Slab */}
      <g transform={`translate(-140, ${-145 + deskFloatY}) rotate(${deskTilt})`}>
        {/* Desk Plank Slab */}
        <rect
          x="0"
          y="0"
          width="280"
          height="295"
          rx="6"
          fill="url(#drgTeakPlankLight)"
          stroke="#4D270C"
          strokeWidth="1.5"
          filter="url(#drgDeskObjShadow)"
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

        {/* Hand-Carved Desk Inscription: "Dil Reh Gaya Classroom Mein" */}
        <g transform="translate(140, 52)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="#3B1C07"
            fontFamily="'Fraunces', 'Cinzel', serif"
            fontSize="12.5"
            letterSpacing="2.5"
            fontWeight="700"
            opacity="0.85"
            style={{ textShadow: "0.5px 0.5px 0px rgba(255, 230, 200, 0.25)" }}
          >
            DIL REH GAYA CLASSROOM MEIN
          </text>
          <line x1="-105" y1="7" x2="105" y2="7" stroke="#3B1C07" strokeWidth="0.8" opacity="0.65" />
          <line x1="-70" y1="10" x2="70" y2="10" stroke="#3B1C07" strokeWidth="0.5" opacity="0.45" />
        </g>

        {/* Compass Geometry Scratches & Tally Marks on the desk */}
        <circle cx="52" cy="115" r="24" fill="none" stroke="#3B1C07" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.35" />
        <line x1="52" y1="85" x2="52" y2="145" stroke="#3B1C07" strokeWidth="0.5" opacity="0.25" />
        <line x1="22" y1="115" x2="82" y2="115" stroke="#3B1C07" strokeWidth="0.5" opacity="0.25" />

        {/* Tally marks: |||| \ */}
        <g transform="translate(42, 240)" opacity="0.45" stroke="#3B1C07" strokeWidth="0.8">
          <line x1="0" y1="0" x2="0" y2="16" />
          <line x1="4" y1="0" x2="4" y2="16" />
          <line x1="8" y1="0" x2="8" y2="16" />
          <line x1="12" y1="0" x2="12" y2="16" />
          <line x1="-2" y1="14" x2="15" y2="2" />
        </g>
      </g>

      {/* 2. Open School Notebook Sheet */}
      <g transform={`translate(-85, ${-80 + deskFloatY * 0.7}) rotate(3.5)`}>
        <rect
          x="0"
          y="0"
          width="170"
          height="190"
          rx="4"
          fill="#FAF6EE"
          stroke="#D5CCA8"
          strokeWidth="1"
          filter="url(#drgDeskObjShadow)"
        />
        {/* Blue ruled notebook lines */}
        {[30, 48, 66, 84, 102, 120, 138, 156, 174].map((ly, idx) => (
          <line
            key={`ruled-${idx}`}
            x1="12"
            y1={ly}
            x2="158"
            y2={ly}
            stroke="#93C5FD"
            strokeWidth="0.7"
            opacity="0.55"
          />
        ))}
        {/* Red notebook margin line */}
        <line x1="38" y1="8" x2="38" y2="182" stroke="#F87171" strokeWidth="0.9" opacity="0.75" />

        {/* Hand-written Cursive Notes */}
        <g transform="translate(46, 44)">
          <text
            x="0"
            y="0"
            fill="#1E3A8A"
            fontFamily="'Caveat', 'Kalam', cursive"
            fontSize="11"
            opacity="0.8"
          >
            "Ek ghanti thi, sau kahaaniyan..."
          </text>
          <text
            x="0"
            y="18"
            fill="#1E3A8A"
            fontFamily="'Caveat', 'Kalam', cursive"
            fontSize="10"
            opacity="0.7"
          >
            Ek bench thi, poora jahaan.
          </text>
          <text
            x="0"
            y="36"
            fill="#64748B"
            fontFamily="'Caveat', 'Kalam', cursive"
            fontSize="9"
            opacity="0.6"
          >
            Roll No. 24 • Present Ma'am!
          </text>
        </g>

        {/* Vintage Fountain Pen laying across notebook */}
        <g transform="translate(135, 110) rotate(-42)">
          <rect x="-3" y="-35" width="6" height="70" rx="3" fill="url(#drgRoyalInk)" />
          <path d="M -3,-35 L 0,-48 L 3,-35 Z" fill="url(#drgBrassMetallic)" />
          <circle cx="0" cy="-38" r="1" fill="#000" />
          <line x1="0" y1="-38" x2="0" y2="-47" stroke="#000" strokeWidth="0.4" />
          <rect x="-3.5" y="-10" width="7" height="3" fill="url(#drgBrassMetallic)" />
        </g>
      </g>

      {/* 3. Golden Sunbeam Light Cone across classroom desk */}
      <polygon
        points="-190,-180 80,-180 180,180 -90,180"
        fill="url(#drgBrassMetallic)"
        opacity={lightShimmer}
        style={{ mixBlendMode: "screen", pointerEvents: "none" }}
      />

      {/* 4. Hanging Brass School Bell */}
      <g transform={`translate(100, -110) rotate(${bellSway})`}>
        {/* Support chain / beam */}
        <line x1="0" y1="-45" x2="0" y2="0" stroke="#7A5817" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="4" fill="url(#drgBrassMetallic)" />

        {/* Bell dome */}
        <path
          d="M -22,25 C -22,12 -14,4 0,4 C 14,4 22,12 22,25 C 24,28 26,30 26,32 L -26,32 C -26,30 -24,28 -22,25 Z"
          fill="url(#drgBrassMetallic)"
          stroke="#7A5817"
          strokeWidth="1.2"
          filter="url(#drgBellGlow)"
        />
        {/* Clapper ball & dangling rope */}
        <circle cx="0" cy="35" r="4.5" fill="#7A5817" />
        <line x1="0" y1="35" x2="0" y2="52" stroke="#A46E40" strokeWidth="1.8" strokeDasharray="3,1" />

        {/* Acoustic Chime Vibration Wave Rings */}
        {[1, 2].map((ring) => {
          const wavePhase = (frame * 0.05 + ring * 0.5) % 1;
          const waveRadius = 26 + wavePhase * 24;
          const waveAlpha = (1 - wavePhase) * 0.35;
          return (
            <ellipse
              key={`chime-${ring}`}
              cx="0"
              cy="32"
              rx={waveRadius}
              ry={waveRadius * 0.4}
              fill="none"
              stroke="#FDE38C"
              strokeWidth="1.2"
              opacity={waveAlpha}
            />
          );
        })}
      </g>

      {/* 5. Origami Paper Airplane in Flight */}
      <g
        transform={`translate(35, ${-70 + planeHoverY}) rotate(${planeBank}) scale(0.95)`}
        filter="url(#drgPlaneShadow)"
      >
        {/* Left Wing (Top) */}
        <polygon points="0,0 -42,-18 32,-30" fill="url(#drgPlaneTopWing)" stroke="#D5CCA8" strokeWidth="0.6" />
        {/* Right Wing (Folded Underside) */}
        <polygon points="0,0 -38,12 32,-30" fill="url(#drgPlaneUnderWing)" stroke="#C8BEAD" strokeWidth="0.6" />
        {/* Center Crease Keel */}
        <polygon points="0,0 -42,-18 -38,12" fill="#BEB4A2" />

        {/* Dotted Flight Breeze Trail */}
        <path
          d="M -42,-18 C -75,-25 -100,-10 -130,-30"
          fill="none"
          stroke="#7A6F5D"
          strokeWidth="1.2"
          strokeDasharray="3,4"
          opacity="0.45"
        />
      </g>

      {/* 6. Floating Classroom Sunlight Dust & Chalk Motes */}
      {dustParticles.map((pt, i) => {
        const floatX = pt.x + Math.sin(frame * pt.speed + i) * pt.amp;
        const floatY = pt.y + Math.cos(frame * pt.speed * 0.8 + i) * pt.amp;
        const alpha = 0.4 + Math.sin(frame * pt.speed * 1.5 + i) * 0.35;
        return (
          <circle
            key={`dust-${i}`}
            cx={floatX}
            cy={floatY}
            r={pt.s}
            fill="#FFFBEB"
            opacity={alpha}
            style={{ filter: "drop-shadow(0 0 3px rgba(253, 227, 140, 0.8))" }}
          />
        );
      })}
    </g>
  );
};
