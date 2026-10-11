import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

interface AccordionWordProps {
  text: string;
  startFrame: number;
  endFrame: number;
  isAccent?: boolean;
  fontSize?: number;
  sceneStartFrame?: number;
  lineEndFrame?: number;
  holdFrames?: number;
}

/**
 * Kinetic Accordion Word:
 * Dynamically expands letter-spacing on vocal sustain/melisma,
 * snapping into tight editorial kerning on downbeats with clean exit lifecycle.
 */
export const AccordionWord: React.FC<AccordionWordProps> = ({
  text,
  startFrame,
  endFrame,
  isAccent = false,
  fontSize = 58,
  sceneStartFrame = 0,
  lineEndFrame,
  holdFrames = 18,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relStart = startFrame >= sceneStartFrame ? startFrame - sceneStartFrame : startFrame;
  const relEnd = endFrame >= sceneStartFrame ? endFrame - sceneStartFrame : endFrame;

  // Determine exit threshold if lineEndFrame is specified
  const relLineEnd =
    lineEndFrame !== undefined
      ? lineEndFrame >= sceneStartFrame
        ? lineEndFrame - sceneStartFrame
        : lineEndFrame
      : undefined;

  const exitStart = relLineEnd !== undefined ? relLineEnd + holdFrames : undefined;
  const exitDuration = 10;

  if (frame < relStart) {
    return <span style={{ opacity: 0, margin: "0 0.3em" }}>{text}</span>;
  }

  if (exitStart !== undefined && frame >= exitStart + exitDuration) {
    return null;
  }

  // Snappy entrance attack
  const entrySpring = spring({
    frame: frame - relStart,
    fps,
    config: { damping: 16, stiffness: 240, mass: 0.4 },
  });

  // Calculate exit fade progress
  let exitProgress = 0;
  if (exitStart !== undefined && frame >= exitStart) {
    exitProgress = Math.min(1, Math.max(0, (frame - exitStart) / exitDuration));
  }

  // Breathing expansion across vocal sustain duration
  const activeProgress = Math.min(
    1,
    Math.max(0, (frame - relStart) / Math.max(1, relEnd - relStart))
  );

  // Expands letter spacing from wide to tight snap
  const letterSpacing = interpolate(
    activeProgress,
    [0, 0.4, 1],
    [0.18, 0.32, -0.02] // em
  );

  const isActive = frame >= relStart && frame <= relEnd;
  const scale = (0.95 + entrySpring * 0.05 + (isAccent ? Math.sin(activeProgress * Math.PI) * 0.08 : 0)) * (1 - exitProgress * 0.08);
  const opacity = (1 - exitProgress);
  const translateY = (1 - entrySpring) * 8 - exitProgress * 12;

  return (
    <span
      style={{
        display: "inline-block",
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        letterSpacing: `${letterSpacing}em`,
        fontSize: `${fontSize}px`,
        fontWeight: isAccent || isActive ? 800 : 700,
        fontFamily: VIDEO_CONFIG.fonts.heading,
        color: isAccent || isActive ? VIDEO_CONFIG.colors.accentAmber : VIDEO_CONFIG.colors.primaryText,
        textShadow: isAccent || isActive ? `0 0 32px rgba(255, 184, 76, 0.65)` : "none",
        margin: "0 0.35em",
        transition: "color 0.1s ease",
        filter: exitProgress > 0 ? `blur(${exitProgress * 3}px)` : "none",
      }}
    >
      {text}
    </span>
  );
};
