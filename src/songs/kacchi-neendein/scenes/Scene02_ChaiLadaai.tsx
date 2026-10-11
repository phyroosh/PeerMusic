import React from "react";
import { SceneConfig } from "../../../engine/types";
import { ResponsiveContainer } from "../../../engine/layout/ResponsiveContainer";
import { WordReveal } from "../../../engine/typography/WordReveal";
import { SteamingChaiGlass } from "../assets/SteamingChaiGlass";
import { MidnightClock } from "../assets/MidnightClock";

interface Scene02ChaiLadaaiProps {
  scene: SceneConfig;
}

export const Scene02_ChaiLadaai: React.FC<Scene02ChaiLadaaiProps> = ({ scene }) => {
  const line1 = scene.lines[0];
  const line2 = scene.lines[1];

  // Symbolic Visual Metaphor: Steaming Chai Glass alongside Glowing 2 AM Clock
  const symbolicVisual = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <SteamingChaiGlass size={240} />
      <MidnightClock size={180} />
    </div>
  );

  // Kinetic Typography
  const typography = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        maxWidth: "650px",
      }}
    >
      {/* Line 1: "Raat ke do baje ki thandi si chai" */}
      <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
        {line1.words.map((w) => (
          <WordReveal key={w.id} word={w} fontSize={46} isAccent={w.accent} />
        ))}
      </div>

      {/* Line 2: "Chaar doston ki be-wajah si ladaai" */}
      {line2 && (
        <div style={{ display: "flex", flexWrap: "wrap", lineHeight: 1.35 }}>
          {line2.words.map((w) => (
            <WordReveal key={w.id} word={w} fontSize={42} isAccent={w.accent} />
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
