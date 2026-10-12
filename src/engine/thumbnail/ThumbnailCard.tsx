import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export interface ThumbnailCardProps {
  stampTitle?: string;
  stampDate?: string;
  stampLocation?: string;
  specimenTag?: string;
  trackTitle?: string;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}

export const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  stampTitle = "G.P.O. ARCHIVE",
  stampDate = "OCT 1974",
  stampLocation = "CALCUTTA",
  specimenTag = "SPECIMEN: Rosa indica (Dried 1974)",
  trackTitle = "TRACK: Kacchi Neendein, Pakke Khwaab",
  width = 500,
  height = 520,
  children,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing of the specimen and tape
  const shadowFloat = Math.sin(frame * 0.04) * 2;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 520"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Washi Tape Shadow */}
          <filter id="thumbTapeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Pressed Cardboard Herbarium Backing Sheet */}
        <rect
          x="40"
          y="30"
          width="420"
          height="460"
          rx="6"
          fill={VIDEO_CONFIG.colors.paperCard}
          stroke={VIDEO_CONFIG.colors.cardBorder}
          strokeWidth="1.5"
          filter="drop-shadow(0 16px 35px rgba(60, 45, 30, 0.12))"
        />

        {/* Vintage Postal Cancellation Rubber Stamp */}
        <g transform="translate(100, 110) rotate(-14)" opacity="0.45">
          <circle cx="0" cy="0" r="42" fill="none" stroke={VIDEO_CONFIG.colors.stampInk} strokeWidth="2.5" strokeDasharray="6 3" />
          <circle cx="0" cy="0" r="34" fill="none" stroke={VIDEO_CONFIG.colors.stampInk} strokeWidth="1" />
          <text
            x="0"
            y="-8"
            textAnchor="middle"
            fontFamily={VIDEO_CONFIG.fonts.accent}
            fontSize="9"
            fontWeight="700"
            fill={VIDEO_CONFIG.colors.stampInk}
          >
            {stampTitle}
          </text>
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fontFamily={VIDEO_CONFIG.fonts.accent}
            fontSize="11"
            fontWeight="700"
            fill={VIDEO_CONFIG.colors.stampInk}
          >
            {stampDate}
          </text>
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fontFamily={VIDEO_CONFIG.fonts.accent}
            fontSize="8"
            fill={VIDEO_CONFIG.colors.stampInk}
          >
            {stampLocation}
          </text>
        </g>

        {/* Custom Song-Specific Artwork Container with organic breathing float */}
        <g transform={`translate(250, ${260 + shadowFloat})`}>
          {children}
        </g>

        {/* Translucent Japanese Washi Tape Strips */}
        <rect
          x="180"
          y="110"
          width="80"
          height="22"
          rx="1"
          fill={VIDEO_CONFIG.colors.washiTape}
          opacity="0.75"
          transform="rotate(-6, 220, 121)"
          filter="url(#thumbTapeShadow)"
        />
        <rect
          x="210"
          y="370"
          width="90"
          height="24"
          rx="1"
          fill={VIDEO_CONFIG.colors.washiTape}
          opacity="0.75"
          transform="rotate(4, 255, 382)"
          filter="url(#thumbTapeShadow)"
        />

        {/* Handwritten Specimen Tag in pencil */}
        <g transform="translate(70, 430)">
          <text
            fontFamily={VIDEO_CONFIG.fonts.tag}
            fontSize="11"
            fill={VIDEO_CONFIG.colors.secondaryText}
            letterSpacing="1"
          >
            {specimenTag}
          </text>
          <text
            fontFamily={VIDEO_CONFIG.fonts.tag}
            fontSize="10"
            fill="#8C7D6B"
            y="16"
          >
            {trackTitle}
          </text>
        </g>
      </svg>
    </div>
  );
};
