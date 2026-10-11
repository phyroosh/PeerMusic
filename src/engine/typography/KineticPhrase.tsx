import React from "react";
import { LyricWord } from "../types";
import { WordReveal } from "./WordReveal";

interface KineticPhraseProps {
  words: LyricWord[];
  fontSize?: number;
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
  maxWidth?: string | number;
  sceneStartFrame?: number;
  lineEndFrame?: number;
  holdFrames?: number;
}

export const KineticPhrase: React.FC<KineticPhraseProps> = ({
  words,
  fontSize = 54,
  textAlign = "center",
  lineHeight = 1.35,
  maxWidth = "90%",
  sceneStartFrame = 0,
  lineEndFrame,
  holdFrames = 18,
}) => {
  // If lineEndFrame is not explicitly provided, infer it from the last word in the phrase
  const effectiveLineEndFrame =
    lineEndFrame !== undefined
      ? lineEndFrame
      : words.length > 0
      ? Math.max(...words.map((w) => w.endFrame))
      : undefined;

  return (
    <div
      style={{
        maxWidth,
        textAlign,
        lineHeight,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          textAlign === "left"
            ? "flex-start"
            : textAlign === "right"
            ? "flex-end"
            : "center",
        alignItems: "center",
      }}
    >
      {words.map((word) => (
        <WordReveal
          key={word.id}
          word={word}
          fontSize={fontSize}
          isAccent={word.accent}
          sceneStartFrame={sceneStartFrame}
          lineEndFrame={effectiveLineEndFrame}
          holdFrames={holdFrames}
        />
      ))}
    </div>
  );
};
