import React from "react";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const KacchiNeendeinArtwork: React.FC = () => {
  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Soft Drop Shadow for layered paper elements */}
        <filter id="knPaperShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="2" dy="5" stdDeviation="4" floodOpacity="0.14" />
        </filter>

        {/* Vintage Brass Clock Rim Gradient */}
        <linearGradient id="brassGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DFB76C" />
          <stop offset="40%" stopColor="#F7DF94" />
          <stop offset="70%" stopColor="#B3862E" />
          <stop offset="100%" stopColor="#7A5615" />
        </linearGradient>

        {/* Cutting Chai Amber Tea Gradient */}
        <linearGradient id="chaiTeaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E59850" />
          <stop offset="35%" stopColor="#C9752D" />
          <stop offset="85%" stopColor="#9C4D14" />
          <stop offset="100%" stopColor="#692E08" />
        </linearGradient>

        {/* Glass Reflection Gradient */}
        <linearGradient id="glassSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
        </linearGradient>

        {/* Pressed Crimson Rose Petal Gradient */}
        <linearGradient id="roseVelvet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D24558" />
          <stop offset="45%" stopColor={VIDEO_CONFIG.colors.accentRose} />
          <stop offset="80%" stopColor="#5E1420" />
          <stop offset="100%" stopColor="#380810" />
        </linearGradient>

        {/* Dried Herbarium Olive Leaf Gradient */}
        <linearGradient id="oliveHerb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5E7C53" />
          <stop offset="50%" stopColor="#435D39" />
          <stop offset="100%" stopColor="#283A21" />
        </linearGradient>
      </defs>

      {/* =================================================================== */}
      {/* 1. BACKGROUND: Folded Blueprint / Graph Paper Corner (Umeedon Ke Panne) */}
      {/* =================================================================== */}
      <g transform="translate(-130, -145) rotate(-3)">
        {/* Graph Sheet */}
        <rect
          x="0"
          y="0"
          width="250"
          height="295"
          rx="3"
          fill="#F5F8FA"
          stroke="#D0DDE8"
          strokeWidth="1.2"
          filter="url(#knPaperShadow)"
        />
        {/* Architectural Grid Lines */}
        {[25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275].map((gy, i) => (
          <line
            key={`g-horiz-${i}`}
            x1="10"
            y1={gy}
            x2="240"
            y2={gy}
            stroke="#BDD3E5"
            strokeWidth="0.8"
            opacity="0.55"
          />
        ))}
        {[30, 55, 80, 105, 130, 155, 180, 205, 230].map((gx, i) => (
          <line
            key={`g-vert-${i}`}
            x1={gx}
            y1="10"
            x2={gx}
            y2="285"
            stroke="#BDD3E5"
            strokeWidth="0.8"
            opacity="0.55"
          />
        ))}
        {/* Subtle Draft Pencil Geometry (Compass Arcs & Coordinates) */}
        <circle cx="75" cy="80" r="34" fill="none" stroke="#7A8FA3" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.6" />
        <line x1="41" y1="80" x2="109" y2="80" stroke="#7A8FA3" strokeWidth="0.8" opacity="0.5" />
        <line x1="75" y1="46" x2="75" y2="114" stroke="#7A8FA3" strokeWidth="0.8" opacity="0.5" />
        <text
          x="75"
          y="126"
          textAnchor="middle"
          fontFamily={VIDEO_CONFIG.fonts.tag}
          fontSize="8"
          fill="#6F8498"
          letterSpacing="1"
          opacity="0.8"
        >
          ROOM 204 // BLUEPRINT
        </text>
      </g>

      {/* =================================================================== */}
      {/* 2. CELESTIAL STARDUST & CONSTELLATION (Hostel Ki Chhat Ke Taare) */}
      {/* =================================================================== */}
      <g transform="translate(-20, -110)" opacity="0.75">
        {/* Constellation Guide Lines */}
        <path
          d="M -70 10 L -30 -15 L 20 -5 L 60 -25 L 110 -10"
          fill="none"
          stroke="#C99738"
          strokeWidth="0.9"
          strokeDasharray="2 3"
          opacity="0.65"
        />
        {/* Star Nodes */}
        {[
          { x: -70, y: 10, r: 2.2 },
          { x: -30, y: -15, r: 3.0 },
          { x: 20, y: -5, r: 2.5 },
          { x: 60, y: -25, r: 3.2 },
          { x: 110, y: -10, r: 2.0 },
          { x: -5, y: -35, r: 1.8 },
          { x: 85, y: 15, r: 2.0 },
        ].map((star, i) => (
          <g key={`star-${i}`} transform={`translate(${star.x}, ${star.y})`}>
            <circle cx="0" cy="0" r={star.r} fill="#D4AF37" />
            <circle cx="0" cy="0" r={star.r * 1.8} fill="#F5D061" opacity="0.3" />
          </g>
        ))}
      </g>

      {/* =================================================================== */}
      {/* 3. VINTAGE MIDNIGHT CLOCK: EXACT 02:00 AM (Raat Ke Do Baje) */}
      {/* =================================================================== */}
      <g transform="translate(68, -45) rotate(7)">
        {/* Clock Drop Shadow */}
        <circle cx="0" cy="0" r="48" fill="none" filter="url(#knPaperShadow)" />
        {/* Outer Brass Bezel */}
        <circle cx="0" cy="0" r="46" fill="url(#brassGold)" stroke="#664612" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="42" fill="#FAF6ED" stroke="#B88A2E" strokeWidth="0.8" />
        {/* Minute Track Ring */}
        <circle cx="0" cy="0" r="38" fill="none" stroke="#8C6E3D" strokeWidth="0.8" strokeDasharray="1 3" opacity="0.8" />

        {/* Roman Numerals for 12, 3, 6, 9 */}
        <text x="0" y="-28" textAnchor="middle" fontFamily={VIDEO_CONFIG.fonts.accent} fontSize="9" fontWeight="700" fill="#423420">XII</text>
        <text x="29" y="3" textAnchor="middle" fontFamily={VIDEO_CONFIG.fonts.accent} fontSize="8" fontWeight="700" fill="#423420">III</text>
        <text x="0" y="34" textAnchor="middle" fontFamily={VIDEO_CONFIG.fonts.accent} fontSize="8" fontWeight="700" fill="#423420">VI</text>
        <text x="-29" y="3" textAnchor="middle" fontFamily={VIDEO_CONFIG.fonts.accent} fontSize="8" fontWeight="700" fill="#423420">IX</text>

        {/* Clock Hands: LOCKED AT EXACTLY 02:00 AM */}
        <line x1="0" y1="3" x2="0" y2="-27" stroke="#2B2114" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="0" y1="0" x2="16" y2="-9.5" stroke="#2B2114" strokeWidth="3" strokeLinecap="round" />

        {/* Center Pivot Rivet */}
        <circle cx="0" cy="0" r="3.2" fill="url(#brassGold)" stroke="#3B2A10" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="1.2" fill="#1C1408" />

        {/* 2:00 AM Stamp Caption */}
        <text
          x="0"
          y="18"
          textAnchor="middle"
          fontFamily={VIDEO_CONFIG.fonts.tag}
          fontSize="7.5"
          fontWeight="700"
          fill="#8C6830"
          letterSpacing="0.5"
        >
          02:00 AM
        </text>
      </g>

      {/* =================================================================== */}
      {/* 4. ROADSIDE CUTTING CHAI GLASS (Thandi Si Chai) */}
      {/* =================================================================== */}
      <g transform="translate(-75, 42) rotate(-5)">
        {/* Chai Glass Drop Shadow */}
        <rect x="-24" y="-35" width="48" height="75" rx="3" fill="none" filter="url(#knPaperShadow)" />

        {/* Warm Wisps of Bezier Rising Steam */}
        <g opacity="0.45">
          <path
            d="M -6 -40 C -12 -55, -2 -68, -8 -82"
            fill="none"
            stroke="#9E8F7A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 6 -38 C 12 -52, 2 -64, 8 -76"
            fill="none"
            stroke="#9E8F7A"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>

        {/* Outer Tapered Glass Body */}
        <polygon
          points="-24,-35 24,-35 17,40 -17,40"
          fill="#FFFFFF"
          fillOpacity="0.12"
          stroke="#8A9BA8"
          strokeWidth="1.4"
        />

        {/* Thick Heavy Glass Base */}
        <polygon
          points="-17,40 17,40 14,48 -14,48"
          fill="#CBD5E0"
          fillOpacity="0.45"
          stroke="#7A8E9E"
          strokeWidth="1.2"
        />

        {/* Warm Amber Chai Liquid Level inside glass */}
        <polygon
          points="-20,-10 20,-10 16.5,37 -16.5,37"
          fill="url(#chaiTeaGrad)"
          opacity="0.92"
        />
        {/* Liquid Surface Meniscus */}
        <ellipse cx="0" cy="-10" rx="20" ry="3.5" fill="#F0A660" opacity="0.8" />

        {/* Classic Indian Fluted Facets (Vertical Glass Ridge Lines) */}
        {[-14, -7, 0, 7, 14].map((fx, idx) => (
          <line
            key={`flute-${idx}`}
            x1={fx}
            y1="-33"
            x2={fx * 0.72}
            y2="38"
            stroke="#FFFFFF"
            strokeWidth="1.1"
            opacity="0.4"
          />
        ))}

        {/* Glass Surface Curvature Sheen */}
        <polygon
          points="-23,-34 -15,-34 -11,39 -16.5,39"
          fill="url(#glassSheen)"
          opacity="0.7"
        />

        {/* Upper Glass Rim Band */}
        <ellipse cx="0" cy="-35" rx="24" ry="4" fill="none" stroke="#9BB0C1" strokeWidth="1.6" />
      </g>

      {/* =================================================================== */}
      {/* 5. PRESSED BOTANICAL SPECIMEN: ROSA INDICA & FERN LEAVES */}
      {/* =================================================================== */}
      <g transform="translate(10, 15)">
        {/* Main Curved Stem */}
        <path
          d="M -15 155 Q -10 50, -18 -75 Q -22 -115, -15 -145"
          fill="none"
          stroke="url(#oliveHerb)"
          strokeWidth="4.2"
          strokeLinecap="round"
        />

        {/* Alternating Pressed Dried Herbarium Leaves with Fine Veins */}
        {[
          { y: -105, isLeft: false, len: 45, rot: 25 },
          { y: -70, isLeft: true, len: 52, rot: -28 },
          { y: -30, isLeft: false, len: 58, rot: 22 },
          { y: 10, isLeft: true, len: 62, rot: -25 },
          { y: 55, isLeft: false, len: 56, rot: 20 },
          { y: 95, isLeft: true, len: 48, rot: -22 },
        ].map((leaf, i) => {
          const dir = leaf.isLeft ? -1 : 1;
          const lx = dir * leaf.len;
          return (
            <g key={`herb-leaf-${i}`} transform={`translate(-15, ${leaf.y}) rotate(${leaf.rot})`}>
              {/* Leaf Blade */}
              <path
                d={`M 0 0 Q ${lx * 0.5} ${-14} ${lx} ${-4} Q ${lx * 0.6} ${12} 0 0`}
                fill="url(#oliveHerb)"
                opacity="0.9"
              />
              {/* Leaf Central Vein (Midrib) */}
              <path
                d={`M 0 0 Q ${lx * 0.5} ${-4} ${lx * 0.9} ${-4}`}
                fill="none"
                stroke="#1E2B18"
                strokeWidth="1.0"
                opacity="0.6"
              />
              {/* Lateral Veinlets */}
              <line x1={lx * 0.25} y1="-3" x2={lx * 0.4} y2="-7" stroke="#1E2B18" strokeWidth="0.7" opacity="0.45" />
              <line x1={lx * 0.45} y1="-4" x2={lx * 0.65} y2="-6" stroke="#1E2B18" strokeWidth="0.7" opacity="0.45" />
              <line x1={lx * 0.3} y1="-2" x2={lx * 0.45} y2="4" stroke="#1E2B18" strokeWidth="0.7" opacity="0.45" />
            </g>
          );
        })}

        {/* Sepals (Calyx) beneath the Rose Flower */}
        <g transform="translate(-15, -145)">
          <path d="M 0 0 Q -15 8, -24 22 Q -12 14, 0 0" fill="#3B5234" opacity="0.95" />
          <path d="M 0 0 Q 15 8, 26 20 Q 12 12, 0 0" fill="#3B5234" opacity="0.95" />
          <path d="M 0 0 Q -5 12, -8 26 Q -2 15, 0 0" fill="#283A21" />
        </g>

        {/* Multi-Layered Pressed Dried Rose at Apex */}
        <g transform="translate(-15, -155)">
          {/* Layer 1: Outermost Petal Ring (Deep Velvet Burgundy) */}
          <ellipse cx="0" cy="0" rx="42" ry="28" fill="#52121C" transform="rotate(-12)" />
          <path
            d="M -38 -8 C -42 -26, -18 -34, 4 -28 C 26 -35, 44 -20, 38 -6 C 42 16, 18 28, -6 26 C -28 28, -42 14, -38 -8 Z"
            fill="#5E1420"
            opacity="0.92"
          />

          {/* Layer 2: Intermediate Petals (Crimson Herbarium Texture) */}
          <ellipse cx="-4" cy="-4" rx="30" ry="22" fill="url(#roseVelvet)" transform="rotate(-5)" />
          <ellipse cx="8" cy="4" rx="26" ry="18" fill="url(#roseVelvet)" transform="rotate(18)" />

          {/* Layer 3: Unfolding Petal Folds */}
          <path
            d="M -18 -6 C -22 -18, -6 -24, 8 -18 C 22 -22, 28 -8, 20 4 C 14 16, -2 18, -14 12 C -20 8, -20 -2, -18 -6 Z"
            fill="#A62B3F"
            opacity="0.85"
          />

          {/* Layer 4: Deep Inner Folded Rose Core */}
          <ellipse cx="-1" cy="-2" rx="15" ry="11" fill="#751523" />
          <ellipse cx="1" cy="-1" rx="9" ry="7" fill="#420B13" />
          <circle cx="0" cy="0" r="4.5" fill="#28050B" />
        </g>
      </g>
    </g>
  );
};
