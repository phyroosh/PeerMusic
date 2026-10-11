import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { FloatingNotes } from "../assets/FloatingNotes";
import { AudioWaveformBars } from "../../../engine/audio/AudioWaveformBars";

interface Scene03NeendeinHookProps {
  scene: SceneConfig;
}

export const Scene03_NeendeinHook: React.FC<Scene03NeendeinHookProps> = ({ scene }) => {
  const hookLine1 = scene.lines[0];
  const hookLine2 = scene.lines[1];

  // In TYPOGRAPHY_DOMINANT hierarchy, the symbolic visual acts as a supporting anchor
  const symbolicVisual = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <FloatingNotes size={220} />
      <AudioWaveformBars barsCount={24} barWidth={3} maxHeight={28} opacity={0.4} />
    </div>
  );

  // Kinetic Typography Hook (Large bold impact)
  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "36px",
        maxWidth: "750px",
      }}
    >
      {/* Primary Hook Line: "Yeh kacchi si neendein, yeh pakke se khwaab" */}
      <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
        {hookLine1.words.map((w) => (
          <WordReveal key={w.id} word={w} fontSize={54} isAccent={w.accent} />
        ))}
      </div>

      {/* Climax Line: "Magar hauslon ka naya aasmaan hai!" */}
      {hookLine2 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {hookLine2.words.map((w) => (
            <WordReveal key={w.id} word={w} fontSize={46} isAccent={w.accent} />
          ))}
        </div>
      )}
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
