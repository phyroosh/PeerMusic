import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { SyllabusMountain } from "../assets/SyllabusMountain";
import { CanteenResonance } from "../assets/CanteenResonance";

interface Scene06SyllabusDeadlineProps {
  scene: SceneConfig;
}

export const Scene06_SyllabusDeadline: React.FC<Scene06SyllabusDeadlineProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const line1 = scene.lines[0]; // Syllabus pahad sa, dil mein basera
  const line2 = scene.lines[1]; // Subah ki attendance, woh aakhri bench
  const line3 = scene.lines[2]; // Assignment ki deadline ka aakhri inch
  const line4 = scene.lines[3]; // Magar canteen ki hansi mein har gam ghula hai
  const line5 = scene.lines[4]; // Ek doosre ke kandhe pe darr sab bhula hai

  // Transition from SyllabusMountain to CanteenResonance when line 4 starts (frame 5372 -> rel 494)
  const relCanteenStart = line4 && line4.words[0] ? line4.words[0].startFrame - scene.startFrame : 494;
  const transitionProgress = interpolate(
    frame,
    [relCanteenStart - 25, relCanteenStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const symbolicVisual = (
    <div
      style={{
        position: "relative",
        width: "260px",
        height: "260px",
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
        <SyllabusMountain size={260} />
      </div>
      <div
        style={{
          position: "absolute",
          opacity: transitionProgress,
          transform: `scale(${0.92 + transitionProgress * 0.08})`,
        }}
      >
        <CanteenResonance size={260} />
      </div>
    </div>
  );

  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "700px",
      }}
    >
      {/* Line 1 */}
      {line1 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line1.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={44}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
              lineEndFrame={line1.words[line1.words.length - 1].endFrame}
              holdFrames={14}
            />
          ))}
        </div>
      )}

      {/* Line 2 */}
      {line2 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line2.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={40}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
              lineEndFrame={line2.words[line2.words.length - 1].endFrame}
              holdFrames={14}
            />
          ))}
        </div>
      )}

      {/* Line 3 */}
      {line3 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line3.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={42}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
              lineEndFrame={line3.words[line3.words.length - 1].endFrame}
              holdFrames={14}
            />
          ))}
        </div>
      )}

      {/* Line 4 */}
      {line4 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line4.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={42}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
              lineEndFrame={line4.words[line4.words.length - 1].endFrame}
              holdFrames={14}
            />
          ))}
        </div>
      )}

      {/* Line 5 */}
      {line5 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line5.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={44}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
              lineEndFrame={line5.words[line5.words.length - 1].endFrame}
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
