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
  lineEndFrame?: number;
  holdFrames?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  word,
  isAccent = false,
  fontSize = 54,
  baseColor = VIDEO_CONFIG.colors.primaryText,
  sceneStartFrame = 0,
  lineEndFrame,
  holdFrames = 18,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Support absolute timeline timestamps inside relative Sequence containers
  const wordStart = word.startFrame >= sceneStartFrame ? word.startFrame - sceneStartFrame : word.startFrame;
  const wordEnd = word.endFrame >= sceneStartFrame ? word.endFrame - sceneStartFrame : word.endFrame;

  // Determine exit threshold if lineEndFrame is specified
  const relLineEnd =
    lineEndFrame !== undefined
      ? lineEndFrame >= sceneStartFrame
        ? lineEndFrame - sceneStartFrame
        : lineEndFrame
      : undefined;

  const effectiveHold =
    holdFrames !== undefined
      ? holdFrames > 20
        ? holdFrames
        : Math.round(holdFrames * (fps / 30))
      : Math.round(fps * 0.5);

  const exitStart = relLineEnd !== undefined ? relLineEnd + effectiveHold : undefined;
  const exitDuration = Math.round(fps * 0.25); // 0.25s smooth fade-out and upward drift

  // 1. Pre-entrance: completely hidden before singer onsets the word
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

  // 2. Post-phrase exit: completely gone after hold duration during interludes
  if (exitStart !== undefined && frame >= exitStart + exitDuration) {
    return null;
  }

  // Instant attack spring: zero sluggishness on onset downbeat
  const attackSpring = spring({
    frame: frame - wordStart,
    fps,
    config: {
      damping: 18,
      stiffness: 280,
      mass: 0.35,
    },
  });

  // Calculate exit fade progress (0 = fully visible, 1 = fully faded)
  let exitProgress = 0;
  if (exitStart !== undefined && frame >= exitStart) {
    exitProgress = Math.min(1, Math.max(0, (frame - exitStart) / exitDuration));
  }

  // Active vocal status: word is being sung RIGHT NOW
  const isActive = frame >= wordStart && frame <= wordEnd;

  // Motion dynamics: instant attack (subtle 8px settle), scale snap, exit upward drift
  const translateY = (1 - attackSpring) * 8 - exitProgress * 12;
  const scale = (0.96 + attackSpring * 0.04) * (1 - exitProgress * 0.08) + (isActive ? 0.04 : 0);
  const opacity = (1 - exitProgress);

  // Dynamic visual hierarchy: active words bloom warmly, completed words rest legibly
  const wordColor = isActive || isAccent || word.accent
    ? VIDEO_CONFIG.colors.accentAmber
    : word.color || baseColor;

  const textShadow = isActive
    ? `0 0 28px rgba(255, 184, 76, 0.7), 0 0 10px rgba(255, 184, 76, 0.4)`
    : isAccent || word.accent
    ? `0 0 16px rgba(255, 184, 76, 0.35)`
    : "none";

  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        color: wordColor,
        fontWeight: isAccent || word.accent || isActive ? 800 : 700,
        margin: "0 0.28em",
        transition: "color 0.1s ease, text-shadow 0.1s ease",
        textShadow,
        fontFamily: VIDEO_CONFIG.fonts.heading,
        fontSize: `${fontSize}px`,
        letterSpacing: "-0.02em",
        filter: exitProgress > 0 ? `blur(${exitProgress * 3}px)` : "none",
      }}
    >
      {word.text}
    </span>
  );
};
