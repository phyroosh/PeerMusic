import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { AccordionWord } from "../../../engine/typography/AccordionWord";
import { RooftopConstellations } from "../assets/RooftopConstellations";
import { AudioWaveformBars } from "../../../engine/audio/AudioWaveformBars";

interface Scene10HostelRooftopOutroProps {
  scene: SceneConfig;
}

export const Scene10_HostelRooftopOutro: React.FC<Scene10HostelRooftopOutroProps> = ({ scene }) => {
  const line1 = scene.lines[0]; // Hostel ki chhat pe woh taare ginna,
  const line2 = scene.lines[1]; // Doston ke saath be-matlab sa hansna.
  const line3 = scene.lines[2]; // Yeh kacchi si neendein... Yeh pakke se khwaab...

  const symbolicVisual = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <RooftopConstellations size={270} />
      <AudioWaveformBars barsCount={24} barWidth={3} maxHeight={24} opacity={0.4} />
    </div>
  );

  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        maxWidth: "750px",
      }}
    >
      {/* Line 1: Hostel ki chhat */}
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

      {/* Line 2: Doston ke saath hansna */}
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

      {/* Line 3: Final Emotional Fade */}
      {line3 && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.35, marginTop: "12px" }}>
          {line3.words.map((w) =>
            w.text === "KHWAAB." ? (
              <AccordionWord
                key={w.id}
                text="KHWAAB."
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
                fontSize={46}
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
