import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { SyllabusMountain } from "../assets/SyllabusMountain";

interface Scene05SyllabusDeadlineProps {
  scene: SceneConfig;
}

export const Scene05_SyllabusDeadline: React.FC<Scene05SyllabusDeadlineProps> = ({ scene }) => {
  const line1 = scene.lines[0]; // Photocopy
  const line2 = scene.lines[1]; // Syllabus pahad
  const line3 = scene.lines[2]; // Attendance bench
  const line4 = scene.lines[3]; // Deadline inch

  const symbolicVisual = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <SyllabusMountain size={270} />
    </div>
  );

  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "680px",
      }}
    >
      {/* Line 1: "Photocopy ke panno mein dooba savera" */}
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

      {/* Line 2: "Syllabus pahad sa, dil mein basera" */}
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

      {/* Line 3: "Subah ki attendance, woh aakhri bench" */}
      {line3 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line3.words.map((w) => (
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

      {/* Line 4: "Assignment ki deadline ka aakhri inch" */}
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
