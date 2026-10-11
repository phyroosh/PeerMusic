import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { AccordionWord } from "../../../engine/typography/AccordionWord";
import { RooftopConstellations } from "../assets/RooftopConstellations";
import { AudioWaveformBars } from "../../../engine/audio/AudioWaveformBars";

interface Scene10HostelRooftopOutroProps {
  scene: SceneConfig;
}

export const Scene10_HostelRooftopOutro: React.FC<Scene10HostelRooftopOutroProps> = ({ scene }) => {
  const symbolicVisual = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      <RooftopConstellations size={280} />
      <AudioWaveformBars barsCount={32} barWidth={3.5} maxHeight={32} opacity={0.5} />
    </div>
  );

  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        maxWidth: "780px",
      }}
    >
      {scene.lines.map((line) => {
        if (!line.words || line.words.length === 0) return null;
        const lineEnd = line.words[line.words.length - 1].endFrame;

        return (
          <div key={line.id} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.35 }}>
            {line.words.map((w) =>
              w.text.toLowerCase().includes("khwaab") ? (
                <AccordionWord
                  key={w.id}
                  text={w.text.toUpperCase()}
                  startFrame={w.startFrame}
                  endFrame={w.endFrame}
                  isAccent={true}
                  fontSize={54}
                  sceneStartFrame={scene.startFrame}
                  lineEndFrame={lineEnd}
                  holdFrames={18}
                />
              ) : (
                <WordReveal
                  key={w.id}
                  word={w}
                  fontSize={44}
                  isAccent={w.accent}
                  sceneStartFrame={scene.startFrame}
                  lineEndFrame={lineEnd}
                  holdFrames={14}
                />
              )
            )}
          </div>
        );
      })}
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
