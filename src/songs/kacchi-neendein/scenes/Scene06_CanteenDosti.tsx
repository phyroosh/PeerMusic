import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { CanteenResonance } from "../assets/CanteenResonance";

interface Scene06CanteenDostiProps {
  scene: SceneConfig;
}

export const Scene06_CanteenDosti: React.FC<Scene06CanteenDostiProps> = ({ scene }) => {
  const line1 = scene.lines[0];
  const line2 = scene.lines[1];

  const symbolicVisual = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CanteenResonance size={260} />
    </div>
  );

  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        maxWidth: "680px",
      }}
    >
      {/* Line 1: "Magar canteen ki hansi mein har gam ghula hai" */}
      <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
        {line1.words.map((w) => (
          <WordReveal
            key={w.id}
            word={w}
            fontSize={46}
            isAccent={w.accent}
            sceneStartFrame={scene.startFrame}
          />
        ))}
      </div>

      {/* Line 2: "Ek doosre ke kandhe pe darr sab bhula hai" */}
      {line2 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line2.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={44}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
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
