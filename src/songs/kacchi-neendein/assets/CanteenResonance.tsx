import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface CanteenResonanceProps {
  size?: number;
}

export const CanteenResonance: React.FC<CanteenResonanceProps> = ({ size = 260 }) => {
  const frame = useCurrentFrame();

  // Expanding harmonic ripple pulses
  const ripple1 = (frame * 1.8) % 120;
  const ripple2 = (frame * 1.8 + 40) % 120;
  const ripple3 = (frame * 1.8 + 80) % 120;

  const glowPulse = 0.8 + Math.sin(frame * 0.12) * 0.2;
  const friendOrbit = frame * 0.04;

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
          <linearGradient id="canteenWarmth" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={VIDEO_CONFIG.colors.accentAmber} stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF7A45" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#121420" stopOpacity="0.1" />
          </linearGradient>

          <filter id="resonanceGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Concentric Laughter Harmonic Ripples */}
        {[ripple1, ripple2, ripple3].map((r, i) => {
          const opacity = Math.max(0, 1 - r / 120) * 0.5;
          return (
            <circle
              key={i}
              cx="120"
              cy="120"
              r={30 + r}
              fill="none"
              stroke={VIDEO_CONFIG.colors.accentAmber}
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity={opacity}
            />
          );
        })}

        {/* 2. Core Interlocking Tea Glass Rings / Shared Resonance Center */}
        <circle
          cx="105"
          cy="120"
          r="48"
          fill="none"
          stroke={VIDEO_CONFIG.colors.primaryText}
          strokeWidth="1.8"
          opacity="0.35"
        />
        <circle
          cx="135"
          cy="120"
          r="48"
          fill="none"
          stroke={VIDEO_CONFIG.colors.accentAmber}
          strokeWidth="1.8"
          opacity="0.5"
        />

        {/* Center Intersecting Glow */}
        <ellipse
          cx="120"
          cy="120"
          rx="22"
          ry="38"
          fill="url(#canteenWarmth)"
          filter="url(#resonanceGlow)"
          opacity={glowPulse}
        />

        {/* 3. Four Friends Orbiting Nodes ("Chaar Dost" Shared Shoulders) */}
        {[0, 1, 2, 3].map((idx) => {
          const angle = friendOrbit + (idx * Math.PI) / 2;
          const nx = 120 + Math.cos(angle) * 65;
          const ny = 120 + Math.sin(angle) * 65;
          return (
            <g key={idx}>
              {/* Connecting thread to center */}
              <line
                x1="120"
                y1="120"
                x2={nx}
                y2={ny}
                stroke={VIDEO_CONFIG.colors.accentAmber}
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.4"
              />
              <circle
                cx={nx}
                cy={ny}
                r={idx === 0 ? "5.5" : "4.5"}
                fill={idx === 0 ? "#FFFFFF" : VIDEO_CONFIG.colors.accentAmber}
                filter="url(#resonanceGlow)"
              />
            </g>
          );
        })}

        {/* 4. Telemetry Readout */}
        <text
          x="120"
          y="225"
          textAnchor="middle"
          fill={VIDEO_CONFIG.colors.mutedSlate}
          fontSize="8"
          fontFamily={VIDEO_CONFIG.fonts.mono}
          letterSpacing="1.2px"
        >
          CANTEEN RESONANCE // 4 NODES SYNCED
        </text>
      </svg>
    </div>
  );
};
