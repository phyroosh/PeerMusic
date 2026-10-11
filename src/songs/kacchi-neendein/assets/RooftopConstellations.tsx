import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface RooftopConstellationsProps {
  size?: number;
}

export const RooftopConstellations: React.FC<RooftopConstellationsProps> = ({ size = 260 }) => {
  const frame = useCurrentFrame();

  // Subtle celestial orbital rotation
  const orbitAngle = frame * 0.02;
  const starTwinkle1 = 0.6 + Math.sin(frame * 0.08) * 0.4;
  const starTwinkle2 = 0.6 + Math.cos(frame * 0.09) * 0.4;
  const starTwinkle3 = 0.7 + Math.sin(frame * 0.12 + 1.5) * 0.3;

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
          <filter id="starGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="astrolabeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={VIDEO_CONFIG.colors.accentAmber} stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* 1. Celestial Astrolabe Outer Dial */}
        <circle cx="120" cy="120" r="95" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
        <circle cx="120" cy="120" r="85" fill="none" stroke={VIDEO_CONFIG.colors.accentAmber} strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />

        {/* 2. Rotating Constellation Network */}
        <g transform={`rotate(${orbitAngle}, 120, 120)`}>
          {/* Major Constellation Connecting Lines */}
          <line x1="75" y1="65" x2="110" y2="90" stroke={VIDEO_CONFIG.colors.accentAmber} strokeWidth="1.2" opacity="0.6" />
          <line x1="110" y1="90" x2="160" y2="75" stroke={VIDEO_CONFIG.colors.accentAmber} strokeWidth="1.2" opacity="0.6" />
          <line x1="160" y1="75" x2="180" y2="130" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
          <line x1="180" y1="130" x2="140" y2="165" stroke={VIDEO_CONFIG.colors.accentAmber} strokeWidth="1.2" opacity="0.6" />
          <line x1="140" y1="165" x2="90" y2="155" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
          <line x1="90" y1="155" x2="75" y2="65" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 4" />

          {/* Golden Star Nodes with Twinkle */}
          <circle cx="75" cy="65" r="4.5" fill="#FFFFFF" filter="url(#starGlow)" opacity={starTwinkle1} />
          <circle cx="110" cy="90" r="5" fill={VIDEO_CONFIG.colors.accentAmber} filter="url(#starGlow)" opacity={starTwinkle2} />
          <circle cx="160" cy="75" r="4" fill="#FFFFFF" opacity={starTwinkle3} />
          <circle cx="180" cy="130" r="5" fill={VIDEO_CONFIG.colors.accentAmber} filter="url(#starGlow)" opacity={starTwinkle1} />
          <circle cx="140" cy="165" r="4.5" fill="#FFFFFF" opacity={starTwinkle2} />
          <circle cx="90" cy="155" r="3.5" fill={VIDEO_CONFIG.colors.accentAmber} opacity={starTwinkle3} />
        </g>

        {/* 3. Deep Midnight North Star (Anchor in Center) */}
        <g transform="translate(120, 120)">
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" filter="url(#starGlow)" />
          {/* Subtle Cross Ray Flare */}
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#FFFFFF" strokeWidth="1" opacity={starTwinkle1} />
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#FFFFFF" strokeWidth="1" opacity={starTwinkle1} />
        </g>

        {/* 4. Ambient Distant Stars */}
        <circle cx="45" cy="110" r="1.5" fill="#FFFFFF" opacity="0.4" />
        <circle cx="195" cy="60" r="1.5" fill="#FFFFFF" opacity="0.4" />
        <circle cx="60" cy="185" r="1.8" fill={VIDEO_CONFIG.colors.accentAmber} opacity="0.5" />
        <circle cx="170" cy="195" r="1.5" fill="#FFFFFF" opacity="0.3" />

        {/* 5. Telemetry Meta */}
        <text
          x="120"
          y="230"
          textAnchor="middle"
          fill={VIDEO_CONFIG.colors.mutedSlate}
          fontSize="8"
          fontFamily={VIDEO_CONFIG.fonts.mono}
          letterSpacing="1.8px"
        >
          HOSTEL ROOFTOP // TAARE 03:30 AM
        </text>
      </svg>
    </div>
  );
};
