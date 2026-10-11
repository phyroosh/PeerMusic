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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.35 }}>
        {line1.words.map((w) =>
          w.text === "khwaab," ? (
            <AccordionWord
              key={w.id}
              text="KHWAAB,"
              startFrame={w.startFrame}
              endFrame={w.endFrame}
              isAccent={true}
              fontSize={58}
              sceneStartFrame={scene.startFrame}
            />
          ) : (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={52}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
            />
          )
        )}
      </div>

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
            />
          ))}
        </div>
      )}

      {/* Line 3: "Haan thoda sa darr hai, haan thodi thakan hai" */}
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

      {/* Line 4: "Magar hauslon ka naya aasmaan hai!" */}
      {line4 && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.35 }}>
          {line4.words.map((w) =>
            w.text === "aasmaan" ? (
              <AccordionWord
                key={w.id}
                text="AASMAAN"
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
