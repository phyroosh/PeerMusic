import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { AccordionWord } from "../../../engine/typography/AccordionWord";
import { AudioWaveformBars } from "../../../engine/audio/AudioWaveformBars";
import { AudioSynesthesiaFlash } from "../../../engine/camera/AudioSynesthesiaFlash";

interface Scene07MukhdaRepriseProps {
  scene: SceneConfig;
}

export const Scene07_MukhdaReprise: React.FC<Scene07MukhdaRepriseProps> = ({ scene }) => {
  const line1 = scene.lines[0]; // Yeh kacchi si neendein, yeh pakke se khwaab
  const line2 = scene.lines[1]; // Chhoti si jeb mein bada sa hisaab
  const line3 = scene.lines[2]; // Haan thoda sa darr hai, haan thodi thakan hai
  const line4 = scene.lines[3]; // Magar hauslon ka naya aasmaan hai
  const line5 = scene.lines[4]; // Yeh kacchi si neendein, yeh pakke se khwaab

  const symbolicVisual = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      <AudioWaveformBars barsCount={36} barWidth={4} maxHeight={48} opacity={0.7} />
    </div>
  );

  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "800px",
      }}
    >
      <AudioSynesthesiaFlash hitFrame={10} intensity={0.35} />
      <AudioSynesthesiaFlash hitFrame={305} intensity={0.35} />
      <AudioSynesthesiaFlash hitFrame={477} intensity={0.35} />

      {/* Line 1 */}
      {line1 && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.3 }}>
          {line1.words.map((w) =>
            w.text.toLowerCase().includes("khwaab") ? (
              <AccordionWord
                key={w.id}
                text={w.text.toUpperCase()}
                startFrame={w.startFrame}
                endFrame={w.endFrame}
                isAccent={true}
                fontSize={58}
                sceneStartFrame={scene.startFrame}
                lineEndFrame={line1.words[line1.words.length - 1].endFrame}
                holdFrames={14}
              />
            ) : (
              <WordReveal
                key={w.id}
                word={w}
                fontSize={50}
                isAccent={w.accent}
                sceneStartFrame={scene.startFrame}
                lineEndFrame={line1.words[line1.words.length - 1].endFrame}
                holdFrames={14}
              />
            )
          )}
        </div>
      )}

      {/* Line 2 */}
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
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.35 }}>
          {line4.words.map((w) =>
            w.text.toLowerCase().includes("aasmaan") ? (
              <AccordionWord
                key={w.id}
                text="AASMAAN"
                startFrame={w.startFrame}
                endFrame={w.endFrame}
                isAccent={true}
                fontSize={56}
                sceneStartFrame={scene.startFrame}
                lineEndFrame={line4.words[line4.words.length - 1].endFrame}
                holdFrames={14}
              />
            ) : (
              <WordReveal
                key={w.id}
                word={w}
                fontSize={48}
                isAccent={w.accent}
                sceneStartFrame={scene.startFrame}
                lineEndFrame={line4.words[line4.words.length - 1].endFrame}
                holdFrames={14}
              />
            )
          )}
        </div>
      )}

      {/* Line 5 */}
      {line5 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line5.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={46}
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
