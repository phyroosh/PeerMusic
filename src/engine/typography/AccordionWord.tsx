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
}

/**
 * Kinetic Accordion Word:
 * Dynamically expands letter-spacing on vocal sustain/melisma,
 * snapping into tight editorial kerning on downbeats.
 */
export const AccordionWord: React.FC<AccordionWordProps> = ({
  text,
  startFrame,
  endFrame,
  isAccent = false,
  fontSize = 58,
  sceneStartFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relStart = startFrame >= sceneStartFrame ? startFrame - sceneStartFrame : startFrame;
  const relEnd = endFrame >= sceneStartFrame ? endFrame - sceneStartFrame : endFrame;

  if (frame < relStart) {
    return <span style={{ opacity: 0, margin: "0 0.3em" }}>{text}</span>;
  }

  // Entrance spring
  const entrySpring = spring({
    frame: frame - relStart,
    fps,
    config: { damping: 12, stiffness: 170, mass: 0.5 },
  });

  // Breathing expansion across word duration
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

  const scale = 0.88 + entrySpring * 0.12 + (isAccent ? Math.sin(activeProgress * Math.PI) * 0.08 : 0);
  const opacity = Math.min(1, entrySpring * 1.5);

  return (
    <span
      style={{
        display: "inline-block",
        transform: `scale(${scale}) translateY(${(1 - entrySpring) * 24}px)`,
        opacity,
        letterSpacing: `${letterSpacing}em`,
        fontSize: `${fontSize}px`,
        fontWeight: isAccent ? 800 : 700,
        fontFamily: VIDEO_CONFIG.fonts.heading,
        color: isAccent ? VIDEO_CONFIG.colors.accentAmber : VIDEO_CONFIG.colors.primaryText,
        textShadow: isAccent ? `0 0 32px rgba(255, 184, 76, 0.5)` : "none",
        margin: "0 0.35em",
        transition: "color 0.15s ease",
      }}
    >
      {text}
    </span>
  );
};
