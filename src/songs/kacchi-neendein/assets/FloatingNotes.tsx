import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface FloatingNotesProps {
  size?: number;
}

export const FloatingNotes: React.FC<FloatingNotesProps> = ({ size = 280 }) => {
  const frame = useCurrentFrame();

  const rot1 = Math.sin(frame * 0.04) * 6 - 8;
  const rot2 = Math.cos(frame * 0.05 + 1.0) * 5 + 6;
  const floatY = Math.sin(frame * 0.06) * 10;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size * 0.85}px`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Note Sheet */}
      <div
        style={{
          position: "absolute",
          width: "160px",
          height: "190px",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          borderRadius: "8px",
          transform: `rotate(${rot1}deg) translateY(${floatY}px)`,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          boxShadow: "0 14px 30px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ width: "60%", height: "4px", backgroundColor: VIDEO_CONFIG.colors.accentAmber, opacity: 0.6, borderRadius: "2px" }} />
        <div style={{ width: "90%", height: "2px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
        <div style={{ width: "80%", height: "2px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
        <div style={{ width: "85%", height: "2px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
      </div>

      {/* Foreground Highlighted Note Sheet */}
      <div
        style={{
          position: "absolute",
          width: "170px",
          height: "200px",
          backgroundColor: "rgba(245, 244, 240, 0.1)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${VIDEO_CONFIG.colors.accentAmber}55`,
          borderRadius: "8px",
          transform: `rotate(${rot2}deg) translateY(${-floatY * 0.8}px)`,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 25px rgba(255, 184, 76, 0.15)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "11px", fontFamily: VIDEO_CONFIG.fonts.mono, color: VIDEO_CONFIG.colors.accentAmber, letterSpacing: "0.1em" }}>
            GOAL // 2026
          </div>
          <div style={{ fontSize: "16px", fontFamily: VIDEO_CONFIG.fonts.heading, fontWeight: 700, color: VIDEO_CONFIG.colors.primaryText }}>
            Pakke Khwaab
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ width: "100%", height: "2px", backgroundColor: "rgba(255,255,255,0.25)" }} />
          <div style={{ width: "75%", height: "2px", backgroundColor: "rgba(255,255,255,0.25)" }} />
          <div style={{ width: "50%", height: "2px", backgroundColor: VIDEO_CONFIG.colors.accentAmber, opacity: 0.8 }} />
        </div>
      </div>
    </div>
  );
};
