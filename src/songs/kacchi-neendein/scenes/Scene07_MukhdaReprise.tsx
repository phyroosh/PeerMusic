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
  const line1 = scene.lines[0]; // "YEH KACCHI SI NEENDEIN, YEH PAKKE SE KHWAAB,"
  const line2 = scene.lines[1]; // "Chhoti si jeb mein bada sa hisaab."
  const line3 = scene.lines[2]; // "Magar hauslon ka naya aasmaan hai!"

  const symbolicVisual = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      <AudioWaveformBars barsCount={32} barWidth={4} maxHeight={48} opacity={0.7} />
    </div>
  );

  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "34px",
        maxWidth: "800px",
      }}
    >
      {/* Dynamic Optical Flash on Beat Drops in Reprise */}
      <AudioSynesthesiaFlash hitFrame={10} intensity={0.35} />
      <AudioSynesthesiaFlash hitFrame={180} intensity={0.35} />
      <AudioSynesthesiaFlash hitFrame={410} intensity={0.35} />

      {/* Line 1: Primary Reprise Hook */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.3 }}>
        {line1.words.map((w) =>
          w.text === "KHWAAB," ? (
            <AccordionWord
              key={w.id}
              text="KHWAAB,"
              startFrame={w.startFrame}
              endFrame={w.endFrame}
              isAccent={true}
              fontSize={62}
              sceneStartFrame={scene.startFrame}
            />
          ) : (
            <WordReveal
              key={w.id}
              word={w}
              fontSize={54}
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
              fontSize={46}
              isAccent={w.accent}
              sceneStartFrame={scene.startFrame}
            />
          ))}
        </div>
      )}

      {/* Line 3: "Magar hauslon ka naya aasmaan hai!" */}
      {line3 && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.35 }}>
          {line3.words.map((w) =>
            w.text === "aasmaan" ? (
              <AccordionWord
                key={w.id}
                text="AASMAAN"
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
                fontSize={50}
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
