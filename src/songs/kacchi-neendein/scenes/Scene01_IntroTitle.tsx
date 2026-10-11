import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { AudioWaveformBars } from "../../../engine/audio/AudioWaveformBars";
import { VIDEO_CONFIG } from "../../../config/videoConfig";

interface Scene01IntroTitleProps {
  scene: SceneConfig;
}

export const Scene01_IntroTitle: React.FC<Scene01IntroTitleProps> = ({ scene }) => {
  const titleLine = scene.lines[0];

  const typography = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      {/* Category / Sub-tag */}
      <div
        style={{
          fontSize: "14px",
          fontFamily: VIDEO_CONFIG.fonts.mono,
          letterSpacing: "0.22em",
          color: VIDEO_CONFIG.colors.accentAmber,
          fontWeight: 700,
        }}
      >
        STUDENT LIFE ANTHEM // 2026
      </div>

      {/* Main Track Title */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        {titleLine.words.map((w) => (
          <WordReveal key={w.id} word={w} fontSize={68} isAccent={w.accent} sceneStartFrame={scene.startFrame} />
        ))}
      </div>

      {/* Harmonic Waveform Accent */}
      <div style={{ marginTop: "16px" }}>
        <AudioWaveformBars barsCount={36} barWidth={4} maxHeight={42} opacity={0.65} />
      </div>
    </div>
  );

  return (
    <ResponsiveContainer
      hierarchy={scene.hierarchy}
      typography={typography}
    />
  );
};
