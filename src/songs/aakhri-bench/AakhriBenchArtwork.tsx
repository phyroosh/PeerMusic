import React from "react";
import { useCurrentFrame } from "remotion";

export const AakhriBenchArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // Continuous organic micro-motions
  const deskBreathY = Math.sin(frame * 0.025) * 1.2;
  const planeHoverY = Math.sin(frame * 0.04) * 3.5;
  const planeTilt = -8 + Math.cos(frame * 0.035) * 1.5;

  // Steam rising from chai
  const steamOffset1 = (frame * 0.9) % 70;
  const steamOffset2 = ((frame + 35) * 0.8) % 70;
  const steamOpacity1 = Math.max(0, 0.7 - steamOffset1 / 70);
  const steamOpacity2 = Math.max(0, 0.65 - steamOffset2 / 70);

  // Sunlight beam shimmer
  const sunBeamAlpha = 0.18 + Math.sin(frame * 0.03) * 0.04;

  // Dust motes floating in sunlight beam
  const dustParticles = [
    { x: -70, y: -90, s: 1.8, speed: 0.4 },
    { x: -30, y: -40, s: 2.2, speed: 0.6 },
    { x: 10, y: -110, s: 1.5, speed: 0.5 },
    { x: 50, y: -60, s: 2.0, speed: 0.35 },
    { x: 90, y: -20, s: 1.6, speed: 0.7 },
    { x: -50, y: 30, s: 2.4, speed: 0.45 },
    { x: 20, y: 15, s: 1.7, speed: 0.55 },
    { x: 80, y: 60, s: 2.1, speed: 0.4 },
  ];

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Dark Classroom Wall Gradient */}
        <linearGradient id="wallBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E232A" />
          <stop offset="60%" stopColor="#2A303A" />
          <stop offset="100%" stopColor="#181C22" />
        </linearGradient>

        {/* Vintage Blackboard Green Gradient */}
        <linearGradient id="blackboardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#24382C" />
          <stop offset="50%" stopColor="#1F3227" />
          <stop offset="100%" stopColor="#18271E" />
        </linearGradient>

        {/* Deep Polished Wood Desk Gradient */}
        <linearGradient id="woodDesk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A3A26" />
          <stop offset="40%" stopColor="#4A2E1D" />
          <stop offset="80%" stopColor="#3B2315" />
          <stop offset="100%" stopColor="#2C180D" />
        </linearGradient>

        {/* Amber Cutting Chai Liquid */}
        <linearGradient id="chaiTea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E28743" />
          <stop offset="50%" stopColor="#C45E20" />
          <stop offset="100%" stopColor="#8C3A0F" />
        </linearGradient>

        {/* Glass Fluting Gradient */}
        <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
        </linearGradient>

        {/* Golden Sunlight Beam Gradient */}
        <linearGradient id="sunbeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF2B2" stopOpacity={sunBeamAlpha} />
          <stop offset="70%" stopColor="#FDE047" stopOpacity={sunBeamAlpha * 0.5} />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>

        {/* Origami Airplane Paper Gradient */}
        <linearGradient id="origamiPaperLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="origamiPaperShadow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Soft Drop Shadow for physical depth */}
        <filter id="deskShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="8" stdDeviation="6" floodOpacity="0.35" />
        </filter>
        <filter id="planeShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="4" dy="10" stdDeviation="5" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* 1. Backdrop: Classroom Wall & Chalkboard Window */}
      <g transform={`translate(-140, ${-165 + deskBreathY})`}>
        {/* Wall Frame */}
        <rect
          x="0"
          y="0"
          width="280"
          height="195"
          rx="14"
          fill="url(#wallBg)"
          stroke="#38414E"
          strokeWidth="2"
          filter="url(#deskShadow)"
        />

        {/* Classroom Chalkboard Pane */}
        <rect
          x="12"
          y="12"
          width="256"
          height="171"
          rx="8"
          fill="url(#blackboardGrad)"
        />

        {/* Faded Blackboard Chalk Markings */}
        <g opacity="0.32" stroke="#E2E8F0" strokeWidth="1" strokeLinecap="round" fill="none">
          {/* Faded Math / Physics Equations */}
          <path d="M 28 35 Q 36 28, 44 35 T 52 42 T 60 35" />
          <text x="70" y="38" fill="#E2E8F0" fontSize="10" fontFamily="monospace">lim x→∞</text>
          <path d="M 130 30 L 145 42 M 145 30 L 130 42" />
          <text x="155" y="38" fill="#E2E8F0" fontSize="9" fontFamily="monospace">∫ e^(iπ) + 1 = 0</text>
          <text x="30" y="58" fill="#FDE047" fontSize="10" fontFamily="monospace" fontWeight="bold">ATTENDANCE: 74.9% ⚡</text>
          <line x1="30" y1="64" x2="160" y2="64" stroke="#FDE047" strokeWidth="0.8" />
        </g>

        {/* Diagonal Sunlight Beam Cutting Across Classroom */}
        <polygon
          points="80,12 180,12 268,183 140,183"
          fill="url(#sunbeam)"
          style={{ mixBlendMode: "screen" }}
        />

        {/* Floating Chalk Dust Motes in Light Beam */}
        <g>
          {dustParticles.map((pt, i) => {
            const dy = ((frame * pt.speed + i * 25) % 150) - 75;
            const dx = Math.sin(frame * 0.03 + i) * 6;
            return (
              <circle
                key={`dust-${i}`}
                cx={140 + pt.x + dx}
                cy={100 + dy}
                r={pt.s}
                fill="#FFFBEB"
                opacity={0.55 + Math.sin(frame * 0.05 + i) * 0.25}
              />
            );
          })}
        </g>
      </g>

      {/* 2. Foreground: Deep Wooden Backbench Desk Surface */}
      <g transform={`translate(-135, ${20 + deskBreathY})`}>
        {/* Main Wood Plank Top */}
        <rect
          x="0"
          y="0"
          width="270"
          height="120"
          rx="10"
          fill="url(#woodDesk)"
          stroke="#26160B"
          strokeWidth="2.5"
          filter="url(#deskShadow)"
        />

        {/* Subtle Horizontal Wood Grain Lines */}
        <g opacity="0.22" stroke="#1A0D06" strokeWidth="1">
          <line x1="10" y1="20" x2="260" y2="20" />
          <line x1="15" y1="45" x2="255" y2="45" />
          <line x1="8" y1="70" x2="262" y2="70" />
          <line x1="20" y1="95" x2="250" y2="95" />
        </g>

        {/* Compass Inscriptions & Desk Carvings */}
        <g opacity="0.65" stroke="#E5D3B8" strokeWidth="1.2" fill="none" strokeLinecap="round">
          {/* "YAARI FOREVER" Inscription */}
          <text
            x="22"
            y="32"
            fill="#D5B895"
            fontSize="8.5"
            fontFamily="monospace"
            letterSpacing="1.5"
            fontWeight="bold"
          >
            YAARI FOREVER ✦
          </text>
          {/* Compass carved Heart with Initials */}
          <path d="M 32 44 C 32 40, 24 38, 24 45 C 24 51, 32 55, 32 55 C 32 55, 40 51, 40 45 C 40 38, 32 40, 32 44 Z" />
          <text x="27" y="49" fill="#E5D3B8" fontSize="6" fontFamily="sans-serif">A+R</text>

          {/* Tally Marks: Countdown to Semester End */}
          <line x1="52" y1="42" x2="52" y2="52" />
          <line x1="56" y1="42" x2="56" y2="52" />
          <line x1="60" y1="42" x2="60" y2="52" />
          <line x1="64" y1="42" x2="64" y2="52" />
          <line x1="50" y1="52" x2="66" y2="42" stroke="#F87171" strokeWidth="1.5" />
        </g>

        {/* Wooden 30cm Ruler */}
        <g transform="translate(14, 82) rotate(-2)">
          <rect x="0" y="0" width="130" height="14" rx="2" fill="#E0B66E" stroke="#8C6326" strokeWidth="1" />
          {/* Millimeter Ticks */}
          {[...Array(26)].map((_, idx) => (
            <line
              key={`ruler-${idx}`}
              x1={6 + idx * 4.6}
              y1={0}
              x2={6 + idx * 4.6}
              y2={idx % 5 === 0 ? 7 : 4}
              stroke="#5A3A1A"
              strokeWidth="0.8"
            />
          ))}
          <text x="110" y="10" fill="#5A3A1A" fontSize="5.5" fontFamily="monospace">30 CM</text>
        </g>

        {/* Iconic Blue Reynolds Ballpoint Pen */}
        <g transform="translate(45, 68) rotate(6)">
          <rect x="0" y="0" width="75" height="4.5" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
          <rect x="52" y="-0.5" width="22" height="5.5" rx="1.5" fill="#2563EB" />
          <polygon points="0,2.25 -5,1.2 -5,3.3" fill="#D97706" />
          <line x1="55" y1="-3" x2="55" y2="2" stroke="#1D4ED8" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Samosa on Newspaper Paper Napkin */}
        <g transform="translate(160, 48)">
          {/* Torn Newspaper Corner */}
          <polygon
            points="-18,-8 48,-12 56,36 -12,42"
            fill="#F1EAD9"
            stroke="#D6CBBA"
            strokeWidth="0.8"
          />
          <line x1="-8" y1="0" x2="38" y2="-4" stroke="#A8A29E" strokeWidth="0.6" strokeDasharray="2,2" />
          <line x1="-6" y1="6" x2="42" y2="2" stroke="#A8A29E" strokeWidth="0.6" strokeDasharray="3,2" />
          <line x1="-4" y1="12" x2="36" y2="8" stroke="#A8A29E" strokeWidth="0.6" strokeDasharray="2,2" />

          {/* Crispy Golden Triangle Samosa */}
          <polygon
            points="6,4 32,28 -8,26"
            fill="#E09F3E"
            stroke="#9E5D12"
            strokeWidth="1.2"
          />
          <polygon
            points="6,4 32,28 16,30"
            fill="#C98424"
            opacity="0.6"
          />
        </g>

        {/* Fluted Cutting Chai Glass & Wire Holder */}
        <g transform="translate(225, 42)">
          {/* Chai Tea Glass Silhouette */}
          <polygon
            points="-14,-22 14,-22 10,24 -10,24"
            fill="url(#chaiTea)"
            stroke="#475569"
            strokeWidth="1.2"
          />
          {/* Glass Vertical Flutes */}
          <polygon
            points="-14,-22 14,-22 10,24 -10,24"
            fill="url(#glassReflection)"
          />
          <line x1="-5" y1="-20" x2="-3.5" y2="22" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
          <line x1="5" y1="-20" x2="3.5" y2="22" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />

          {/* Glass Rim */}
          <ellipse cx="0" cy="-22" rx="14" ry="3.5" fill="#C45E20" stroke="#94A3B8" strokeWidth="1" />
          <ellipse cx="0" cy="-22" rx="11" ry="2.5" fill="#E28743" />

          {/* Dynamic Rising Steam Ribbons */}
          <g>
            <path
              d={`M -3, -26 Q ${Math.sin(frame * 0.08) * 6}, ${-36 - steamOffset1 * 0.5} -1, ${-48 - steamOffset1}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={steamOpacity1}
            />
            <path
              d={`M 4, -26 Q ${Math.cos(frame * 0.08) * 6}, ${-36 - steamOffset2 * 0.5} 3, ${-48 - steamOffset2}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={steamOpacity2}
            />
          </g>
        </g>
      </g>

      {/* 3. The Origami Paper Airplane (Soaring Dream Symbol) */}
      <g
        transform={`translate(0, ${-45 + planeHoverY}) rotate(${planeTilt})`}
        filter="url(#planeShadow)"
      >
        {/* Soaring Flight Trail Arc (Dashed Golden Line) */}
        <path
          d="M -90 40 Q -40 20, -10 5"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="1.6"
          strokeDasharray="4 3"
          opacity="0.75"
        />

        {/* Origami Airplane Top Left Wing (Light Side) */}
        <polygon
          points="0,-18 36,0 0,6"
          fill="url(#origamiPaperLight)"
          stroke="#94A3B8"
          strokeWidth="0.8"
        />

        {/* Origami Airplane Bottom Right Wing (Shadowed Underbelly) */}
        <polygon
          points="0,-18 -32,2 0,6"
          fill="url(#origamiPaperShadow)"
          stroke="#64748B"
          strokeWidth="0.8"
        />

        {/* Central Fold Keel */}
        <polygon
          points="0,-18 0,16 6,5"
          fill="#64748B"
          stroke="#475569"
          strokeWidth="0.6"
        />
        <line x1="0" y1="-18" x2="0" y2="16" stroke="#334155" strokeWidth="1.2" />

        {/* Blue Ink Scribble on the Wing tip ("75%") */}
        <text
          x="8"
          y="-3"
          fill="#1D4ED8"
          fontSize="5"
          fontFamily="monospace"
          fontWeight="bold"
          transform="rotate(15)"
        >
          75%
        </text>
      </g>
    </g>
  );
};
