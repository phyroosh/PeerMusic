import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { PaperTexture } from "../../engine/camera/PaperTexture";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme11_BotanicalScrapbook: React.FC<ThemeProps> = ({
  lyrics = "Purani kitabon mein sookhe gulaab...",
  accent = "HERBARIUM // VOL. 04",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Subtle breathing of the pressed petals and shadows
  const shadowFloat = Math.sin(frame * 0.04) * 2;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#EFE8DC",
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isLandscape ? "80px 120px" : "50px 30px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Vintage Ruled Grid / Journal Margin Lines */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.15, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="journalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="0" stroke="#7A6F5D" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="40" stroke="#7A6F5D" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#journalGrid)" />
        {/* Red Margin Line */}
        <line x1={isLandscape ? "180" : "40"} y1="0" x2={isLandscape ? "180" : "40"} y2="100%" stroke="#D9534F" strokeWidth="1.5" opacity="0.6" />
      </svg>

      {/* Left: Pressed Botanical Herbarium Specimen */}
      <div
        style={{
          position: "relative",
          width: isLandscape ? "500px" : "360px",
          height: isLandscape ? "520px" : "380px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 520"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Washi Tape Shadow & Translucency */}
            <filter id="tapeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
            </filter>

            {/* Pressed Rose Petal Gradient */}
            <linearGradient id="rosePetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C93B4E" />
              <stop offset="60%" stopColor="#8A2434" />
              <stop offset="100%" stopColor="#52121C" />
            </linearGradient>

            {/* Dried Olive Fern Gradient */}
            <linearGradient id="fernLeaf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#526E48" />
              <stop offset="50%" stopColor="#3B5234" />
              <stop offset="100%" stopColor="#253520" />
            </linearGradient>
          </defs>

          {/* Pressed Cardboard Herbarium Backing Sheet */}
          <rect
            x="40"
            y="30"
            width="420"
            height="460"
            rx="6"
            fill="#FAF6EE"
            stroke="#D6CBBA"
            strokeWidth="1.5"
            filter="drop-shadow(0 16px 35px rgba(60, 45, 30, 0.12))"
          />

          {/* Postal Cancellation Rubber Stamp (Vintage Kolkata 1974) */}
          <g transform="translate(100, 110) rotate(-14)" opacity="0.45">
            <circle cx="0" cy="0" r="42" fill="none" stroke="#2C3E50" strokeWidth="2.5" strokeDasharray="6 3" />
            <circle cx="0" cy="0" r="34" fill="none" stroke="#2C3E50" strokeWidth="1" />
            <text x="0" y="-8" textAnchor="middle" fontFamily="'Space Grotesk', serif" fontSize="9" fontWeight="700" fill="#2C3E50">
              G.P.O. ARCHIVE
            </text>
            <text x="0" y="8" textAnchor="middle" fontFamily="'Space Grotesk', serif" fontSize="11" fontWeight="700" fill="#2C3E50">
              OCT 1974
            </text>
            <text x="0" y="22" textAnchor="middle" fontFamily="'Space Grotesk', serif" fontSize="8" fill="#2C3E50">
              CALCUTTA
            </text>
          </g>

          {/* Botanical Specimen: Pressed Stem & Fern Leaves */}
          <g transform={`translate(250, ${260 + shadowFloat})`}>
            {/* Main Curved Stem */}
            <path
              d="M 0 160 Q -15 40, -40 -120"
              fill="none"
              stroke="url(#fernLeaf)"
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
                  fill="url(#fernLeaf)"
                  opacity="0.88"
                />
              );
            })}

            {/* Pressed Dried Rose Flower at Apex */}
            <g transform="translate(-40, -125)">
              <ellipse cx="0" cy="0" rx="36" ry="24" fill="url(#rosePetal)" transform="rotate(-15)" />
              <ellipse cx="-8" cy="-5" rx="26" ry="18" fill="url(#rosePetal)" opacity="0.9" />
              <ellipse cx="6" cy="4" rx="22" ry="15" fill="#52121C" opacity="0.8" />
              <circle cx="0" cy="0" r="12" fill="#3B0C14" />
            </g>
          </g>

          {/* Translucent Japanese Washi Tape Strips holding stem down */}
          {/* Top Tape */}
          <rect
            x="180"
            y="110"
            width="80"
            height="22"
            rx="1"
            fill="#EADBBA"
            opacity="0.75"
            transform="rotate(-6, 220, 121)"
            filter="url(#tapeShadow)"
          />
          {/* Bottom Tape */}
          <rect
            x="210"
            y="370"
            width="90"
            height="24"
            rx="1"
            fill="#EADBBA"
            opacity="0.75"
            transform="rotate(4, 255, 382)"
            filter="url(#tapeShadow)"
          />

          {/* Handwritten Specimen Tag in pencil */}
          <g transform="translate(70, 430)">
            <text fontFamily="'Courier New', monospace" fontSize="11" fill="#6B5E4D" letterSpacing="1">
              SPECIMEN: Rosa indica (Dried 1974)
            </text>
            <text fontFamily="'Courier New', monospace" fontSize="10" fill="#8C7D6B" y="16">
              LOCATION: Kolkata Botanical Conservatory
            </text>
          </g>
        </svg>
      </div>

      {/* Right: Literary Vintage Typography */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          maxWidth: "620px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "3px",
            backgroundColor: "#2A4436",
            color: "#FAF6EE",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.26em",
            width: "fit-content",
          }}
        >
          {accent}
        </div>

        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: isLandscape ? "46px" : "34px",
            fontWeight: 700,
            color: "#2C261F",
            lineHeight: 1.28,
            letterSpacing: "-0.01em",
          }}
        >
          {lyrics}
        </div>

        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "15px",
            color: "#6B5E4D",
            lineHeight: 1.6,
          }}
        >
          Dried rose petals pressed inside unread letters • Warm Acoustic Folk
        </div>
      </div>

      {/* Tactile Paper Texture */}
      <PaperTexture opacity={0.12} />
    </div>
  );
};
