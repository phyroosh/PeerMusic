import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
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

const ThumbnailCardComponent: React.FC<ThumbnailCardProps> = ({
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
  const { durationInFrames } = useVideoConfig();

  // 1. Organic floating/breathing micro-motion on the Polaroid card itself
  const cardFloatY = Math.sin(frame / 45) * 1.5;

  // 2. Slow continuous Ken Burns zoom effect on the inner specimen image
  const innerScale = interpolate(frame, [0, durationInFrames], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle breathing of the inner specimen artwork
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
        transform: `translate3d(0, ${cardFloatY.toFixed(2)}px, 0)`,
        willChange: "transform",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 520"
        style={{
          overflow: "visible",
          shapeRendering: "geometricPrecision",
          textRendering: "geometricPrecision",
        }}
      >
        <defs>
          {/* Washi Tape Shadow */}
          <filter id="thumbTapeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>

          {/* Polaroid Inner Photo Container Clipping Mask (overflow: hidden) */}
          <clipPath id="polaroidPhotoClip">
            <rect x="52" y="42" width="396" height="376" rx="4" />
          </clipPath>
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

        {/* Custom Song-Specific Artwork Container with Ken Burns Zoom (clipped to inner photo area) */}
        <g clipPath="url(#polaroidPhotoClip)">
          <g
            transform={`translate(250, 260) scale(${innerScale.toFixed(4)}) translate(-250, -260)`}
          >
            <g transform={`translate(250, ${260 + shadowFloat})`}>
              {children}
            </g>
          </g>
        </g>

        {/* Translucent Japanese Washi Tape Strips (Crisp and unscaled on top of frame) */}
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

        {/* Handwritten Specimen Tag in pencil (Crisp and stationary) */}
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

export const ThumbnailCard = React.memo(ThumbnailCardComponent);
