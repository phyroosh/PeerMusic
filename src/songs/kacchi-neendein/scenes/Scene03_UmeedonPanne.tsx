import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { OrigamiBlueprints } from "../assets/OrigamiBlueprints";

interface Scene03UmeedonPanneProps {
  scene: SceneConfig;
}

export const Scene03_UmeedonPanne: React.FC<Scene03UmeedonPanneProps> = ({ scene }) => {
  const line1 = scene.lines[0];
  const line2 = scene.lines[1];

  // Symbolic Visual Metaphor: Blueprint drafting grid with ascending origami crane
  const symbolicVisual = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <OrigamiBlueprints size={260} />
    </div>
  );

  // Kinetic Typography
  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        maxWidth: "680px",
      }}
    >
      {/* Line 1: "Deewaron pe chipke umeedon ke panne" */}
      <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
        {line1.words.map((w) => (
          <WordReveal
            key={w.id}
            word={w}
            fontSize={46}
            isAccent={w.accent}
            sceneStartFrame={scene.startFrame}
            lineEndFrame={line1.words[line1.words.length - 1].endFrame}
            holdFrames={14}
          />
        ))}
      </div>

      {/* Line 2: "Ghar se bahut door sapne sajaaye" */}
      {line2 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line2.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={44}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
              lineEndFrame={line2.words[line2.words.length - 1].endFrame}
              holdFrames={16}
            />
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
