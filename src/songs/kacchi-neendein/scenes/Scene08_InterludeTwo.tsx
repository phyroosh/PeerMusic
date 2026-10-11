import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { TelephoneDawn } from "../assets/TelephoneDawn";
import { AudioWaveformBars } from "../../../engine/audio/AudioWaveformBars";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface Scene08InterludeTwoProps {
  scene: SceneConfig;
}

export const Scene08_InterludeTwo: React.FC<Scene08InterludeTwoProps> = ({ scene }) => {
  // Symbolic Visual Metaphor: Glowing Telephone in the soft blue twilight of 4 AM
  const symbolicVisual = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
      <TelephoneDawn size={280} />
      <AudioWaveformBars barsCount={36} barWidth={4} maxHeight={44} opacity={0.65} />
    </div>
  );

  // Atmospheric telemetry for mid-song acoustic interlude (clean, uncluttered canvas)
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
        [ INTERLUDE // 04:00 AM CALL OF HOME ]
      </div>
      <div
        style={{
          fontFamily: VIDEO_CONFIG.fonts.heading,
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: VIDEO_CONFIG.colors.warmCream,
          maxWidth: "480px",
          lineHeight: 1.4,
        }}
      >
        The Solitude of Distant Rooms
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
        86 BPM  •  FINGERPICKING & TWILIGHT STRINGS
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
