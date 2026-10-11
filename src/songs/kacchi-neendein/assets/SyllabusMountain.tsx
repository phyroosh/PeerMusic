import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface SyllabusMountainProps {
  size?: number;
}

export const SyllabusMountain: React.FC<SyllabusMountainProps> = ({ size = 260 }) => {
  const frame = useCurrentFrame();

  // Gentle mechanical hovering & pulsing
  const hoverY = Math.sin(frame * 0.07) * 8;
  const pulseScale = 1 + Math.sin(frame * 0.1) * 0.02;
  const tickRotation = (frame * 1.5) % 360;

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
          <linearGradient id="pageGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#252A3D" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#151722" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="pageGradTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5EFEB" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D4C8BC" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="amberAccentGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={VIDEO_CONFIG.colors.accentAmber} />
            <stop offset="100%" stopColor="#FF6B4A" />
          </linearGradient>

          <filter id="pageGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Isometric Mountain Sheets (Tiered Photocopy Pages) */}
        <g transform={`translate(0, ${hoverY})`}>
          {/* Base Sheet 1 */}
          <polygon
            points="120,240 210,195 120,150 30,195"
            fill="url(#pageGrad1)"
            stroke={VIDEO_CONFIG.colors.mutedSlate}
            strokeWidth="1.2"
            opacity="0.45"
          />
          {/* Base Sheet 2 */}
          <polygon
            points="120,225 210,180 120,135 30,180"
            fill="url(#pageGrad1)"
            stroke={VIDEO_CONFIG.colors.mutedSlate}
            strokeWidth="1.2"
            opacity="0.6"
          />
          {/* Intermediate Sheet 3 */}
          <polygon
            points="120,205 205,162 120,120 35,162"
            fill="url(#pageGrad1)"
            stroke={VIDEO_CONFIG.colors.accentAmber}
            strokeWidth="1"
            opacity="0.75"
          />
          {/* Intermediate Sheet 4 */}
          <polygon
            points="120,185 200,145 120,105 40,145"
            fill="#1C2133"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
          />
          {/* Intermediate Sheet 5 */}
          <polygon
            points="120,165 195,128 120,90 45,128"
            fill="#232A40"
            stroke={VIDEO_CONFIG.colors.accentAmber}
            strokeWidth="1.2"
          />
          {/* Top Highlight Sheet (Photocopy Page with Written Syllabus) */}
          <polygon
            points="120,145 190,110 120,75 50,110"
            fill="url(#pageGradTop)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            filter="url(#pageGlow)"
          />

          {/* Faux Text lines on Top Sheet */}
          <line x1="85" y1="102" x2="135" y2="82" stroke="#2D2B28" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="95" y1="112" x2="155" y2="92" stroke="#2D2B28" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="105" y1="122" x2="145" y2="108" stroke={VIDEO_CONFIG.colors.accentAmber} strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 2. Technical Ruler / Vertical Caliper Gauge on Left Side */}
        <g transform="translate(18, 50)">
          <line x1="0" y1="0" x2="0" y2="180" stroke={VIDEO_CONFIG.colors.mutedSlate} strokeWidth="1.5" />
          {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map((y, i) => (
            <line
              key={i}
              x1="0"
              y1={y}
              x2={i % 2 === 0 ? 8 : 4}
              y2={y}
              stroke={i === 4 ? VIDEO_CONFIG.colors.accentAmber : VIDEO_CONFIG.colors.mutedSlate}
              strokeWidth={i === 4 ? 2 : 1}
            />
          ))}
          <text x="12" y="85" fill={VIDEO_CONFIG.colors.accentAmber} fontSize="9" fontFamily={VIDEO_CONFIG.fonts.mono} fontWeight="bold">
            INCH 0.99
          </text>
        </g>

        {/* 3. Circular Deadline Dial on Top Right */}
        <g transform={`translate(180, 55) scale(${pulseScale})`}>
          <circle cx="0" cy="0" r="28" fill="#11141F" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <circle
            cx="0"
            cy="0"
            r="24"
            fill="none"
            stroke="url(#amberAccentGrad)"
            strokeWidth="3"
            strokeDasharray="110 40"
            transform={`rotate(${tickRotation})`}
          />
          <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily={VIDEO_CONFIG.fonts.mono} fontWeight="bold">
            23:59
          </text>
          <text x="0" y="14" textAnchor="middle" fill={VIDEO_CONFIG.colors.accentAmber} fontSize="6" fontFamily={VIDEO_CONFIG.fonts.mono} letterSpacing="0.5px">
            DEADLINE
          </text>
        </g>

        {/* 4. Telemetry Tag */}
        <text
          x="120"
          y="270"
          textAnchor="middle"
          fill={VIDEO_CONFIG.colors.mutedSlate}
          fontSize="8"
          fontFamily={VIDEO_CONFIG.fonts.mono}
          letterSpacing="1.5px"
          opacity="0.8"
        >
          SYLLABUS MASS // ATTENDANCE 75.1%
        </text>
      </svg>
    </div>
  );
};
