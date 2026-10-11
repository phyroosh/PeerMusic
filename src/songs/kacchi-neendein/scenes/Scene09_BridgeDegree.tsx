import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { AccordionWord } from "../../../engine/typography/AccordionWord";
import { DivergingTracks } from "../assets/DivergingTracks";

interface Scene09BridgeDegreeProps {
  scene: SceneConfig;
}

export const Scene09_BridgeDegree: React.FC<Scene09BridgeDegreeProps> = ({ scene }) => {
  const line1 = scene.lines[0]; // Ek din yeh kamre bhi peeche chhutenge,
  const line2 = scene.lines[1]; // Degree milegi, yeh raste battenge.
  const line3 = scene.lines[2]; // Inhi be-parwah lamhon ko dhoondhenge...

  const symbolicVisual = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <DivergingTracks size={260} />
    </div>
  );

  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        maxWidth: "750px",
      }}
    >
      {/* Line 1: "Ek din yeh kamre bhi peeche chhutenge" */}
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

      {/* Line 2: "Degree milegi, yeh raste battenge" */}
      {line2 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line2.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={46}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
            />
          ))}
        </div>
      )}

      {/* Line 3: "Inhi be-parwah lamhon ko DHOONDHENGE!" */}
      {line3 && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.35 }}>
          {line3.words.map((w) =>
            w.text === "DHOONDHENGE!" ? (
              <AccordionWord
                key={w.id}
                text="DHOONDHENGE!"
                startFrame={w.startFrame}
                endFrame={w.endFrame}
                isAccent={true}
                fontSize={56}
                sceneStartFrame={scene.startFrame}
              />
            ) : (
              <WordReveal
                key={w.id}
                word={w}
                fontSize={48}
                isAccent={w.accent}
                sceneStartFrame={scene.startFrame}
              />
            )
          )}
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
