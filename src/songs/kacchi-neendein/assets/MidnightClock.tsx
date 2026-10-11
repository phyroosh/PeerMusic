import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface MidnightClockProps {
  size?: number;
}

export const MidnightClock: React.FC<MidnightClockProps> = ({ size = 200 }) => {
  const frame = useCurrentFrame();

  // Pulsating colon every half second (15 frames @ 30fps)
  const colonOpacity = Math.sin(frame * 0.2) > 0 ? 1 : 0.2;

  // Gentle second hand tick
  const secondAngle = (frame * 6) % 360;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        fontFamily: VIDEO_CONFIG.fonts.mono,
      }}
    >
      {/* 1. Minimalist Circular Dial */}
      <svg
        width={size * 0.75}
        height={size * 0.75}
        viewBox="0 0 120 120"
        style={{
          filter: `drop-shadow(0 0 18px rgba(255, 184, 76, 0.2))`,
        }}
      >
        {/* Outer Ring */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="rgba(11, 13, 20, 0.6)"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2"
        />

        {/* 12, 3, 6, 9 Cardinal Ticks */}
        <line x1="60" y1="12" x2="60" y2="18" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <line x1="108" y1="60" x2="102" y2="60" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <line x1="60" y1="108" x2="60" y2="102" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <line x1="12" y1="60" x2="18" y2="60" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

        {/* Hour Hand pointing to 2:00 (60 degrees) */}
        <line
          x1="60"
          y1="60"
          x2="80"
          y2="26"
          stroke={VIDEO_CONFIG.colors.primaryText}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Minute Hand pointing to 12:00 (0 degrees) */}
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="18"
          stroke={VIDEO_CONFIG.colors.primaryText}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Center Pivot Dot */}
        <circle cx="60" cy="60" r="4" fill={VIDEO_CONFIG.colors.accentAmber} />
      </svg>

      {/* 2. Glowing Digital Readout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: VIDEO_CONFIG.colors.primaryText,
          textShadow: `0 0 16px ${VIDEO_CONFIG.colors.accentAmber}66`,
        }}
      >
        <span>02</span>
        <span style={{ opacity: colonOpacity, margin: "0 2px", color: VIDEO_CONFIG.colors.accentAmber }}>:</span>
        <span>00</span>
        <span style={{ fontSize: "14px", marginLeft: "8px", opacity: 0.6, color: VIDEO_CONFIG.colors.accentAmber }}>AM</span>
      </div>
    </div>
  );
};
