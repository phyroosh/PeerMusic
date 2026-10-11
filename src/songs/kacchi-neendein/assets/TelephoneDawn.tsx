import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface TelephoneDawnProps {
  size?: number;
}

export const TelephoneDawn: React.FC<TelephoneDawnProps> = ({ size = 260 }) => {
  const frame = useCurrentFrame();

  // Voice signal oscillation
  const waveOffset = frame * 0.15;
  const sunPulse = 0.85 + Math.sin(frame * 0.08) * 0.15;
  const tearDropY = (frame * 1.2) % 60;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size * 1.15}px`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 240 280"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="dawnSunGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#D66027" stopOpacity="0.1" />
            <stop offset="60%" stopColor={VIDEO_CONFIG.colors.accentAmber} stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
          </linearGradient>

          <filter id="dawnGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="receiverGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor={VIDEO_CONFIG.colors.accentAmber} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* 1. Rising Morning Dawn Beams from Horizon */}
        <g opacity={sunPulse * 0.7}>
          {[ -45, -30, -15, 0, 15, 30, 45 ].map((deg, i) => (
            <line
              key={i}
              x1="120"
              y1="190"
              x2={120 + Math.sin((deg * Math.PI) / 180) * 130}
              y2={190 - Math.cos((deg * Math.PI) / 180) * 130}
              stroke="url(#dawnSunGrad)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          ))}
        </g>

        {/* Dawn Horizon Semi-Circle */}
        <ellipse
          cx="120"
          cy="190"
          rx="65"
          ry="32"
          fill="url(#dawnSunGrad)"
          filter="url(#dawnGlow)"
        />

        {/* 2. Floating Telephone Receiver Silhouette */}
        <g transform="translate(120, 95)">
          {/* Receiver Bridge */}
          <path
            d="M -48,-10 C -25,-25 25,-25 48,-10 C 35,5 20,-2 -20,-2 C -35,5 -48,-10 -48,-10 Z"
            fill="url(#receiverGrad)"
            filter="url(#dawnGlow)"
          />

          {/* Left Earpiece */}
          <ellipse cx="-48" cy="-5" rx="14" ry="10" fill="#FFFFFF" opacity="0.95" />
          {/* Right Mouthpiece */}
          <ellipse cx="48" cy="-5" rx="14" ry="10" fill={VIDEO_CONFIG.colors.accentAmber} opacity="0.95" />

          {/* Radiating Voice Arcs from Earpiece ("Khaana toh khaaya?") */}
          {[18, 28, 38].map((radius, i) => (
            <path
              key={i}
              d={`M ${-48 - radius * 0.7} ${-5 - radius * 0.7} A ${radius} ${radius} 0 0 0 ${-48 - radius * 0.7} ${-5 + radius * 0.7}`}
              fill="none"
              stroke={VIDEO_CONFIG.colors.accentAmber}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity={0.7 - i * 0.2}
            />
          ))}
        </g>

        {/* 3. Oscillating Heartbeat / Vocal Waveform Line */}
        <path
          d={`M 30,190 Q 60,${190 + Math.sin(waveOffset) * 12} 90,190 T 150,${190 + Math.cos(waveOffset) * 12} T 210,190`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 4. Solitary Luminous Tear Transforming into Morning Glow */}
        <circle
          cx="120"
          cy={125 + tearDropY * 0.8}
          r="3"
          fill="#FFFFFF"
          filter="url(#dawnGlow)"
          opacity={Math.max(0, 1 - tearDropY / 60)}
        />

        {/* 5. Telemetry Meta */}
        <text
          x="120"
          y="255"
          textAnchor="middle"
          fill={VIDEO_CONFIG.colors.mutedSlate}
          fontSize="8"
          fontFamily={VIDEO_CONFIG.fonts.mono}
          letterSpacing="1.4px"
        >
          INCOMING FREQUENCY // MAA • 07:15 AM
        </text>
      </svg>
    </div>
  );
};
