import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { AccordionWord } from "../../../engine/typography/AccordionWord";
import { FloatingNotes } from "../assets/FloatingNotes";
import { AudioWaveformBars } from "../../../engine/audio/AudioWaveformBars";

interface Scene04NeendeinHookProps {
  scene: SceneConfig;
}

export const Scene04_NeendeinHook: React.FC<Scene04NeendeinHookProps> = ({ scene }) => {
  const line1 = scene.lines[0]; // "Yeh kacchi si neendein, yeh pakke se khwaab,"
  const line2 = scene.lines[1]; // "Chhoti si jeb mein bada sa hisaab."
  const line3 = scene.lines[2]; // "Haan thoda sa darr hai, haan thodi thakan hai,"
  const line4 = scene.lines[3]; // "Magar hauslon ka naya aasmaan hai!"

  // In TYPOGRAPHY_DOMINANT hierarchy, the symbolic visual acts as a supporting anchor
  const symbolicVisual = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <FloatingNotes size={220} />
      <AudioWaveformBars barsCount={28} barWidth={3.5} maxHeight={32} opacity={0.5} />
    </div>
  );

  // Kinetic Typography Hook (Large bold impact with AccordionWord highlights)
  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        maxWidth: "780px",
      }}
    >
      {/* Primary Hook Line: "Yeh kacchi si neendein, yeh pakke se khwaab" */}
      {line1 && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.35 }}>
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
                fontSize={52}
                isAccent={w.accent}
                sceneStartFrame={scene.startFrame}
                lineEndFrame={line1.words[line1.words.length - 1].endFrame}
                holdFrames={14}
              />
            )
          )}
        </div>
      )}

      {/* Line 2: "Chhoti si jeb mein bada sa hisaab" */}
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

      {/* Line 3: "Haan thoda sa darr hai, haan thodi thakan hai" */}
      {line3 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35, opacity: 0.95 }}>
          {line3.words.map((w) => (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={40}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
              lineEndFrame={line3.words[line3.words.length - 1].endFrame}
              holdFrames={14}
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
