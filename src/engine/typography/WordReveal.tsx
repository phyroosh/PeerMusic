import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LyricWord } from "../types";
import { VIDEO_CONFIG } from "../../config/videoConfig";

interface WordRevealProps {
  word: LyricWord;
  isAccent?: boolean;
  fontSize?: number;
  baseColor?: string;
  sceneStartFrame?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  word,
  isAccent = false,
  fontSize = 54,
  baseColor = VIDEO_CONFIG.colors.primaryText,
  sceneStartFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Support absolute timeline timestamps inside relative Sequence containers
  const wordStart = word.startFrame >= sceneStartFrame ? word.startFrame - sceneStartFrame : word.startFrame;
  const wordEnd = word.endFrame >= sceneStartFrame ? word.endFrame - sceneStartFrame : word.endFrame;

  // If frame has not reached the word start, keep completely invisible
  if (frame < wordStart) {
    return (
      <span
        style={{
          display: "inline-block",
          opacity: 0,
          margin: "0 0.28em",
          userSelect: "none",
        }}
      >
        {word.text}
      </span>
    );
  }

  // Calculate entrance spring
  const progress = spring({
    frame: frame - wordStart,
    fps,
    config: {
      damping: 13,
      stiffness: 160,
      mass: 0.55,
    },
  });

  // Calculate active pulse if current frame is between word start and end
  const isActive = frame >= wordStart && frame <= wordEnd;

  const translateY = (1 - progress) * 28; // Upward spring reveal
  const opacity = Math.min(1, progress * 1.5);
  const scale = 0.85 + progress * 0.15 + (isActive && isAccent ? 0.08 : 0);

  const wordColor = isAccent || word.accent
    ? VIDEO_CONFIG.colors.accentAmber
    : word.color || baseColor;

  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        color: wordColor,
        fontWeight: isAccent || word.accent ? 800 : 700,
        margin: "0 0.28em",
        transition: "color 0.2s ease",
        textShadow:
          isAccent || word.accent
            ? `0 0 24px rgba(255, 184, 76, 0.45)`
            : "none",
        fontFamily: VIDEO_CONFIG.fonts.heading,
        fontSize: `${fontSize}px`,
        letterSpacing: "-0.02em",
      }}
    >
      {word.text}
    </span>
  );
};
