import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface DivergingTracksProps {
  size?: number;
}

export const DivergingTracks: React.FC<DivergingTracksProps> = ({ size = 260 }) => {
  const frame = useCurrentFrame();

  // Forward velocity motion on perspective tracks
  const trackFlow = (frame * 3.5) % 40;
  const sunPulse = 1 + Math.sin(frame * 0.1) * 0.05;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size * 1.1}px`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 240 260"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="horizonGlowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor={VIDEO_CONFIG.colors.accentAmber} stopOpacity="0.75" />
            <stop offset="100%" stopColor="#11131E" stopOpacity="0" />
          </linearGradient>

          <filter id="trackGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Distant Rising Sun / Graduation Horizon */}
        <circle
          cx="120"
          cy="75"
          r={28 * sunPulse}
          fill="url(#horizonGlowGrad)"
          filter="url(#trackGlow)"
        />
        <circle cx="120" cy="75" r="14" fill="#FFFFFF" />

        {/* Horizon Line */}
        <line x1="20" y1="95" x2="220" y2="95" stroke={VIDEO_CONFIG.colors.accentAmber} strokeWidth="1.2" opacity="0.6" />

        {/* 2. Left Diverging Road (Fork 1: Raste Battenge) */}
        <line x1="120" y1="95" x2="25" y2="235" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
        <line x1="120" y1="95" x2="65" y2="235" stroke={VIDEO_CONFIG.colors.accentAmber} strokeWidth="1.5" opacity="0.75" />

        {/* 3. Right Diverging Road (Fork 2: Raste Battenge) */}
        <line x1="120" y1="95" x2="215" y2="235" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
        <line x1="120" y1="95" x2="175" y2="235" stroke={VIDEO_CONFIG.colors.accentAmber} strokeWidth="1.5" opacity="0.75" />

        {/* 4. Cross Ties / Sleepers Moving with Velocity */}
        {[30, 60, 95, 135, 180, 230].map((baseY, i) => {
          const animatedY = 95 + ((baseY - 95 + trackFlow) % 140);
          const ratio = (animatedY - 95) / 140;
          if (ratio <= 0.05 || ratio >= 0.98) return null;

          // Left tie coordinates
          const leftX1 = 120 - ratio * 95;
          const leftX2 = 120 - ratio * 55;

          // Right tie coordinates
          const rightX1 = 120 + ratio * 55;
          const rightX2 = 120 + ratio * 95;

          return (
            <g key={i} opacity={Math.min(1, ratio * 1.5)}>
              <line x1={leftX1} y1={animatedY} x2={leftX2} y2={animatedY} stroke={VIDEO_CONFIG.colors.mutedSlate} strokeWidth={1 + ratio * 2} />
              <line x1={rightX1} y1={animatedY} x2={rightX2} y2={animatedY} stroke={VIDEO_CONFIG.colors.mutedSlate} strokeWidth={1 + ratio * 2} />
            </g>
          );
        })}

        {/* 5. Center Infinite Compass Rose & Degree Scroll Motif */}
        <circle cx="120" cy="95" r="4.5" fill="#FFFFFF" filter="url(#trackGlow)" />
        <polygon points="120,40 123,55 120,52 117,55" fill={VIDEO_CONFIG.colors.accentAmber} />

        {/* 6. Telemetry */}
        <text
          x="120"
          y="250"
          textAnchor="middle"
          fill={VIDEO_CONFIG.colors.mutedSlate}
          fontSize="8"
          fontFamily={VIDEO_CONFIG.fonts.mono}
          letterSpacing="1.5px"
        >
          TRAJECTORY DIVERGENCE // DEGREE GRANTED
        </text>
      </svg>
    </div>
  );
};
