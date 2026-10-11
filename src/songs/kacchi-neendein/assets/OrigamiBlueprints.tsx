import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface OrigamiBlueprintsProps {
  size?: number;
}

export const OrigamiBlueprints: React.FC<OrigamiBlueprintsProps> = ({ size = 260 }) => {
  const frame = useCurrentFrame();

  // Floating gentle oscillation
  const floatY = Math.sin(frame * 0.06) * 12;
  const floatX = Math.cos(frame * 0.05) * 8;
  const wingFlap = Math.sin(frame * 0.12) * 15;
  const shimmer = 0.75 + Math.sin(frame * 0.1) * 0.25;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Blueprint Grid Pattern */}
          <pattern id="origamiGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="0.8" />
          </pattern>

          {/* Golden Glow Filter */}
          <filter id="craneGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="craneGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor={VIDEO_CONFIG.colors.accentAmber} stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D66027" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="noteGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2235" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#121420" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* 1. Background Drafting Frame & Grid */}
        <rect
          x="20"
          y="20"
          width="200"
          height="200"
          rx="12"
          fill="url(#noteGrad)"
          stroke={VIDEO_CONFIG.colors.mutedSlate}
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <rect x="20" y="20" width="200" height="200" rx="12" fill="url(#origamiGrid)" />

        {/* 2. Technical Blueprint Compass / Corner Marks */}
        <path d="M 25 35 L 35 25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M 215 35 L 205 25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M 25 205 L 35 215" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M 215 205 L 205 215" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* Blueprint Dimension Telemetry */}
        <text x="32" y="42" fill={VIDEO_CONFIG.colors.accentAmber} fontSize="8" fontFamily={VIDEO_CONFIG.fonts.mono} letterSpacing="1px" opacity="0.8">
          DREAM // 02:00 AM GRID
        </text>
        <text x="32" y="210" fill={VIDEO_CONFIG.colors.mutedSlate} fontSize="7" fontFamily={VIDEO_CONFIG.fonts.mono} opacity="0.7">
          SCALE: 1:∞  •  ORIGAMI SEED #204
        </text>

        {/* 3. Dotted Flight Trajectory Arc */}
        <path
          d="M 50 180 Q 90 150, 120 110 T 170 50"
          fill="none"
          stroke={VIDEO_CONFIG.colors.accentAmber}
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity={shimmer * 0.7}
        />

        {/* Trajectory Waypoint Dots */}
        <circle cx="50" cy="180" r="2.5" fill={VIDEO_CONFIG.colors.mutedSlate} opacity="0.5" />
        <circle cx="120" cy="110" r="3" fill={VIDEO_CONFIG.colors.accentAmber} opacity="0.7" />
        <circle cx="170" cy="50" r="3.5" fill="#FFFFFF" opacity="0.9" filter="url(#craneGlow)" />

        {/* 4. Ascending Origami Crane (Geometric Facets) */}
        <g
          transform={`translate(${120 + floatX}, ${105 + floatY}) rotate(${-12 + floatX * 0.4})`}
          filter="url(#craneGlow)"
        >
          {/* Main Body */}
          <polygon points="0,0 -24,18 -8,32" fill="#E8DED1" opacity="0.85" />
          <polygon points="0,0 24,18 8,32" fill="#D4C5B5" opacity="0.8" />
          <polygon points="0,0 0,-34 -8,32" fill="url(#craneGrad)" opacity="0.95" />

          {/* Left Wing (Animated Flap) */}
          <polygon
            points={`0,0 -42,${-14 + wingFlap * 0.5} -18,12`}
            fill="#FFFFFF"
            opacity="0.9"
            stroke={VIDEO_CONFIG.colors.accentAmber}
            strokeWidth="0.8"
          />

          {/* Right Wing (Animated Flap Counterpart) */}
          <polygon
            points={`0,0 46,${-12 - wingFlap * 0.5} 18,12`}
            fill={VIDEO_CONFIG.colors.accentAmber}
            opacity="0.85"
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />

          {/* Crane Tail / Head */}
          <polygon points="0,-34 -6,-44 0,-40" fill="#FFFFFF" />
          <polygon points="0,32 4,52 0,44" fill={VIDEO_CONFIG.colors.accentAmber} opacity="0.75" />
        </g>
      </svg>
    </div>
  );
};
