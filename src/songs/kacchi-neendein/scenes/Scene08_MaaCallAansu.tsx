import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { TelephoneDawn } from "../assets/TelephoneDawn";

interface Scene08MaaCallAansuProps {
  scene: SceneConfig;
}

export const Scene08_MaaCallAansu: React.FC<Scene08MaaCallAansuProps> = ({ scene }) => {
  const line1 = scene.lines[0]; // Maa ki call aati hai: "Khaana toh khaaya?"
  const line2 = scene.lines[1]; // "Haan bilkul theek hoon," jhooth keh ke chupaya.
  const line3 = scene.lines[2]; // Kambal mein chup kar jo aansu bahaye,
  const line4 = scene.lines[3]; // Subah phir muskaan ban kar woh chhaaye.
  const line5 = scene.lines[4]; // Apne hi kandhon pe kal ka yeh bojh hai...

  const symbolicVisual = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TelephoneDawn size={270} />
    </div>
  );

  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        maxWidth: "680px",
      }}
    >
      {/* Line 1: Maa ki call */}
      <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
        {line1.words.map((w) => (
          <WordReveal
            key={w.id}
            word={w}
            fontSize={44}
            isAccent={w.accent}
            sceneStartFrame={scene.startFrame}
          />
        ))}
      </div>

      {/* Line 2: Haan bilkul theek hoon */}
      {line2 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line2.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={40}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
            />
          ))}
        </div>
      )}

      {/* Line 3: Kambal mein chup kar jo aansu bahaye */}
      {line3 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35, opacity: 0.9 }}>
          {line3.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={38}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
            />
          ))}
        </div>
      )}

      {/* Line 4: Subah phir muskaan ban kar woh chhaaye */}
      {line4 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line4.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={42}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
            />
          ))}
        </div>
      )}

      {/* Line 5: Apne hi kandhon pe kal ka yeh bojh hai */}
      {line5 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line5.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={40}
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
