import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

interface EditorialHUDProps {
  sectionTag?: string;
  bpm?: number;
  opacity?: number;
  trackTitle?: string;
}

export const EditorialHUD: React.FC<EditorialHUDProps> = ({
  sectionTag = "01 // INTRO",
  bpm = 86,
  opacity = 0.35,
  trackTitle = "PEERMUSIC MASTER",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Compute timecode (MM:SS:FF)
  const totalSeconds = Math.floor(frame / fps);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const subFrames = frame % fps;

  const timecode = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(subFrames).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        fontFamily: VIDEO_CONFIG.fonts.mono,
        color: VIDEO_CONFIG.colors.primaryText,
        opacity,
        padding: "48px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 50,
      }}
    >
      {/* Top Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: VIDEO_CONFIG.colors.accentAmber,
              boxShadow: `0 0 8px ${VIDEO_CONFIG.colors.accentAmber}`,
            }}
          />
          <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em" }}>
            {sectionTag}
          </span>
        </div>

        <div style={{ fontSize: "13px", letterSpacing: "0.08em" }}>
          {trackTitle} &nbsp;|&nbsp; BPM: {bpm} &nbsp;|&nbsp; {fps} FPS
        </div>
      </div>

      {/* Corner Crosshairs / Reticles */}
      <div style={{ position: "absolute", top: "36px", left: "36px", width: "16px", height: "16px", borderTop: "1px solid rgba(255,255,255,0.4)", borderLeft: "1px solid rgba(255,255,255,0.4)" }} />
      <div style={{ position: "absolute", top: "36px", right: "36px", width: "16px", height: "16px", borderTop: "1px solid rgba(255,255,255,0.4)", borderRight: "1px solid rgba(255,255,255,0.4)" }} />
      <div style={{ position: "absolute", bottom: "36px", left: "36px", width: "16px", height: "16px", borderBottom: "1px solid rgba(255,255,255,0.4)", borderLeft: "1px solid rgba(255,255,255,0.4)" }} />
      <div style={{ position: "absolute", bottom: "36px", right: "36px", width: "16px", height: "16px", borderBottom: "1px solid rgba(255,255,255,0.4)", borderRight: "1px solid rgba(255,255,255,0.4)" }} />

      {/* Bottom Footer Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontSize: "13px", letterSpacing: "0.06em", color: VIDEO_CONFIG.colors.accentAmber }}>
          TC: {timecode}
        </div>
        <div style={{ fontSize: "12px", letterSpacing: "0.1em", opacity: 0.7 }}>
          PEERMUSIC CINEMATIC ENGINE
        </div>
      </div>
    </div>
  );
};
