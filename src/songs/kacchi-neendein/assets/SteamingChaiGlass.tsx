import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface SteamingChaiGlassProps {
  size?: number;
}

export const SteamingChaiGlass: React.FC<SteamingChaiGlassProps> = ({ size = 260 }) => {
  const frame = useCurrentFrame();

  // Dynamic bezier curves for 3 rising steam wisps
  const steam1Offset = Math.sin(frame * 0.08) * 12;
  const steam2Offset = Math.cos(frame * 0.07 + 1.2) * 14;
  const steam3Offset = Math.sin(frame * 0.09 + 2.4) * 10;

  const steamY = (frame * 1.5) % 90;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size * 1.25}px`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {/* 1. Rising Animated Steam Wisps (SVG) */}
      <svg
        width={size}
        height={size * 0.65}
        viewBox="0 0 200 130"
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="steamGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={VIDEO_CONFIG.colors.accentAmber} stopOpacity="0.45" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Steam Wisp 1 */}
        <path
          d={`M 85 ${110 - steamY * 0.8} Q ${75 + steam1Offset} ${70 - steamY * 0.5}, ${90 + steam1Offset * 1.2} ${25 - steamY * 0.3}`}
          fill="none"
          stroke="url(#steamGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Steam Wisp 2 */}
        <path
          d={`M 100 ${115 - steamY * 0.85} Q ${115 + steam2Offset} ${65 - steamY * 0.55}, ${105 + steam2Offset * 1.3} ${15 - steamY * 0.35}`}
          fill="none"
          stroke="url(#steamGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Steam Wisp 3 */}
        <path
          d={`M 115 ${110 - steamY * 0.75} Q ${125 + steam3Offset} ${75 - steamY * 0.45}, ${118 + steam3Offset * 1.1} ${30 - steamY * 0.25}`}
          fill="none"
          stroke="url(#steamGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* 2. Fluted Cutting Chai Glass */}
      <svg
        width={size * 0.65}
        height={size * 0.75}
        viewBox="0 0 130 160"
        style={{
          filter: `drop-shadow(0 12px 28px rgba(255, 184, 76, 0.25))`,
        }}
      >
        <defs>
          {/* Chai Tea Fluid Gradient */}
          <linearGradient id="chaiFluid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E28738" />
            <stop offset="40%" stopColor="#C9651C" />
            <stop offset="100%" stopColor="#7E3A0E" />
          </linearGradient>

          {/* Glass Rim Reflection */}
          <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="25%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="75%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
          </linearGradient>
        </defs>

        {/* Glass Outer Body (Tapered) */}
        <polygon
          points="20,15 110,15 95,145 35,145"
          fill="rgba(255, 255, 255, 0.08)"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Fluted Vertical Glass Ribs */}
        <line x1="38" y1="20" x2="48" y2="140" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
        <line x1="56" y1="20" x2="61" y2="140" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        <line x1="74" y1="20" x2="69" y2="140" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
        <line x1="92" y1="20" x2="82" y2="140" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

        {/* Hot Chai Liquid (Fills bottom 75%) */}
        <polygon
          points="25,48 105,48 93,142 37,142"
          fill="url(#chaiFluid)"
          opacity="0.95"
        />

        {/* Chai Surface Ellipse */}
        <ellipse cx="65" cy="48" rx="40" ry="6" fill="#F4A259" opacity="0.8" />

        {/* Glass Top Rim */}
        <ellipse
          cx="65"
          cy="15"
          rx="45"
          ry="7"
          fill="none"
          stroke="url(#glassReflection)"
          strokeWidth="3"
        />

        {/* Bottom Glass Base */}
        <ellipse cx="65" cy="145" rx="30" ry="5" fill="rgba(255,255,255,0.2)" />
      </svg>
    </div>
  );
};
