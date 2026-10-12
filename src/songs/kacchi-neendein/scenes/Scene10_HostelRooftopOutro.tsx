import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { AccordionWord } from "../../../engine/typography/AccordionWord";
import { DivergingTracks } from "../assets/DivergingTracks";
import { RooftopConstellations } from "../assets/RooftopConstellations";
import { AudioWaveformBars } from "../../../engine/audio/AudioWaveformBars";

interface Scene10HostelRooftopOutroProps {
  scene: SceneConfig;
}

export const Scene10_HostelRooftopOutro: React.FC<Scene10HostelRooftopOutroProps> = ({ scene }) => {
  const frame = useCurrentFrame();

  // Transition from DivergingTracks (Bridge: Degree / Raste) to RooftopConstellations (Outro: Taare / Chhat)
  // line_10_taare starts at absolute frame 12044 (rel 1130)
  const relRooftopStart = 1130;
  const transitionProgress = interpolate(
    frame,
    [relRooftopStart - 30, relRooftopStart + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const symbolicVisual = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      <div
        style={{
          position: "relative",
          width: "280px",
          height: "280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            opacity: 1 - transitionProgress,
            transform: `scale(${1 - transitionProgress * 0.08})`,
          }}
        >
          <DivergingTracks size={260} />
        </div>
        <div
          style={{
            position: "absolute",
            opacity: transitionProgress,
            transform: `scale(${0.92 + transitionProgress * 0.08})`,
          }}
        >
          <RooftopConstellations size={280} />
        </div>
      </div>
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
