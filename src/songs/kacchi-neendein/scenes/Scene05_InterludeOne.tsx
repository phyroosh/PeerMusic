import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { SyllabusMountain } from "../assets/SyllabusMountain";
import { AudioWaveformBars } from "../../../engine/audio/AudioWaveformBars";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface Scene05InterludeOneProps {
  scene: SceneConfig;
}

export const Scene05_InterludeOne: React.FC<Scene05InterludeOneProps> = ({ scene }) => {
  // Symbolic Visual Metaphor: Blueprint Mountain rising through isometric drafting grids
  const symbolicVisual = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
      <SyllabusMountain size={300} />
      <AudioWaveformBars barsCount={42} barWidth={4} maxHeight={48} opacity={0.7} />
    </div>
  );

  // Atmospheric telemetry for instrumental solo (clean canvas, no dead vocal text)
  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: VIDEO_CONFIG.fonts.mono,
          fontSize: "13px",
          letterSpacing: "0.24em",
          color: VIDEO_CONFIG.colors.accentAmber,
          fontWeight: 700,
          opacity: 0.85,
        }}
      >
        [ INTERLUDE // ACOUSTIC SOLO ]
      </div>
      <div
        style={{
          fontFamily: VIDEO_CONFIG.fonts.heading,
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: VIDEO_CONFIG.colors.warmCream,
          maxWidth: "460px",
          lineHeight: 1.4,
        }}
      >
        Midnight Blueprint Session
      </div>
      <div
        style={{
          fontFamily: VIDEO_CONFIG.fonts.body,
          fontSize: "14px",
          color: VIDEO_CONFIG.colors.mutedSlate,
          opacity: 0.8,
          letterSpacing: "0.08em",
        }}
      >
        86 BPM  •  FINGERSTYLE GUITAR RESONANCE
      </div>
    </div>
  );

  return (
    <ResponsiveContainer
      hierarchy={scene.hierarchy}
      symbolicVisual={symbolicVisual}
      typography={typography}
    />
  );
};
