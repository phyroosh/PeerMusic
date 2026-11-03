import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";

interface PeerMusicLogoBadgeProps {
  size?: number;
  glowIntensity?: number;
}

export const PeerMusicLogoBadge: React.FC<PeerMusicLogoBadgeProps> = ({
  size = 64,
  glowIntensity = 1,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing pulse for the brand neon red glow
  const pulse = 0.85 + Math.sin(frame * 0.08) * 0.15 * glowIntensity;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* 1. Official Peer Music Circular Equalizer "P" Badge */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: `0 0 ${20 * pulse}px rgba(255, 30, 39, ${0.5 * pulse}), 0 0 ${40 * pulse}px rgba(255, 30, 39, ${0.25 * pulse})`,
          border: "1.5px solid rgba(255, 30, 39, 0.4)",
          backgroundColor: "#0A0A0E",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("branding/peermusic_badge.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 2. Sleek Brand Typography */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "'Montserrat', 'Inter', 'Helvetica Neue', sans-serif",
            fontSize: `${Math.round(size * 0.28)}px`,
            fontWeight: 800,
            letterSpacing: "4px",
            color: "#FFFFFF",
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          PEER MUSIC
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: `${Math.max(10, Math.round(size * 0.16))}px`,
            fontWeight: 500,
            letterSpacing: "2.5px",
            color: "#FF2A3A",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          STUDIO MASTER
        </span>
      </div>
    </div>
  );
};
