import React from "react";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const KacchiNeendeinArtwork: React.FC = () => {
  return (
    <g>
      <defs>
        {/* Pressed Rose Petal Gradient */}
        <linearGradient id="rosePetalKN" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C93B4E" />
          <stop offset="60%" stopColor={VIDEO_CONFIG.colors.accentRose} />
          <stop offset="100%" stopColor="#52121C" />
        </linearGradient>

        {/* Dried Olive Fern Gradient */}
        <linearGradient id="fernLeafKN" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#526E48" />
          <stop offset="50%" stopColor="#3B5234" />
          <stop offset="100%" stopColor="#253520" />
        </linearGradient>
      </defs>

      {/* Main Curved Stem */}
      <path
        d="M 0 160 Q -15 40, -40 -120"
        fill="none"
        stroke="url(#fernLeafKN)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Alternating Pressed Leaves */}
      {[-80, -40, 0, 40, 80, 120].map((ly, i) => {
        const isLeft = i % 2 === 0;
        return (
          <path
            key={`leaf-${i}`}
            d={
              isLeft
                ? `M ${-10 - i * 3} ${ly} Q ${-65 - i * 4} ${ly - 30}, ${-85 - i * 2} ${ly - 15} Q ${-50} ${ly + 10}, ${-10 - i * 3} ${ly}`
                : `M ${-5 - i * 2} ${ly} Q ${50 + i * 4} ${ly - 25}, ${75 + i * 2} ${ly - 10} Q ${40} ${ly + 12}, ${-5 - i * 2} ${ly}`
            }
            fill="url(#fernLeafKN)"
            opacity="0.88"
          />
        );
      })}

      {/* Pressed Dried Rose Flower at Apex */}
      <g transform="translate(-40, -125)">
        <ellipse cx="0" cy="0" rx="36" ry="24" fill="url(#rosePetalKN)" transform="rotate(-15)" />
        <ellipse cx="-8" cy="-5" rx="26" ry="18" fill="url(#rosePetalKN)" opacity="0.9" />
        <ellipse cx="6" cy="4" rx="22" ry="15" fill="#52121C" opacity="0.8" />
        <circle cx="0" cy="0" r="12" fill="#3B0C14" />
      </g>
    </g>
  );
};
