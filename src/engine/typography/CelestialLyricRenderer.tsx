import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LyricLine } from "../types";
import { LineBounds, getLineBounds } from "../lyricTiming";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export interface CelestialLyricRendererProps {
  line: LyricLine;
  nextLine?: LyricLine;
  isLandscape?: boolean;
}

/**
 * Checks if a string contains any Devanagari Unicode characters (U+0900 to U+097F)
 */
export const containsDevanagari = (text?: string): boolean => {
  if (!text) return false;
  return /[\u0900-\u097F]/.test(text);
};

/**
 * Extracts clean display text from a LyricLine
 */
export const getCleanLineText = (line?: LyricLine): string => {
  if (!line) return "";
  const raw = line.text || line.words?.map((w) => w.text).join(" ") || "";
  // Strip markdown formatting markers (*word*, _word_) if present
  return raw.replace(/[*_]/g, "").trim();
};

/**
 * CelestialLyricRenderer:
 * Renders pure, unadorned song lyrics directly over the cosmic void.
 *
 * Rules:
 * - LYRICS ONLY: Zero uppercase headings, subtitles, labels, footers, or branding.
 * - ZERO CAPSULES: No containers, pill badges, cards, plates, or bounding boxes.
 * - Luminous starlight typography with gold/purple ethereal text shadows.
 * - Full English and Devanagari script support with verified spacing and line heights.
 */
export const CelestialLyricRenderer: React.FC<CelestialLyricRendererProps> = ({
  line,
  nextLine,
  isLandscape = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const l1Bounds: LineBounds = getLineBounds(line) || { startFrame: 0, endFrame: 1 };
  const l1Start = l1Bounds.startFrame;
  const l1End = l1Bounds.endFrame;

  const l2Bounds: LineBounds | null = nextLine ? getLineBounds(nextLine) : null;
  const l2Start = l2Bounds ? l2Bounds.startFrame : l1End + 999999;
  const l2End = l2Bounds ? l2Bounds.endFrame : l1End + 999999;

  // Accurate vocal transition: Line 2 can NEVER highlight while Line 1 is still being sung
  const switchFrame = l2Bounds ? Math.max(l1End, l2Start) : l1End;
  const isL1Active = frame >= l1Start && frame < switchFrame;
  const isL1Past = frame >= switchFrame;
  const isL2Active = Boolean(l2Bounds && frame >= switchFrame && frame < l2End);

  // Smooth critically-damped spring onset on vocal arrival
  const l1Spring = frame >= l1Start
    ? spring({
        frame: frame - l1Start,
        fps,
        config: { damping: 180, stiffness: 120 },
      })
    : 0;

  // Anticipation lead-in: smoothly fade in from 30 frames before vocal onset
  const l1Opacity = frame < l1Start
    ? interpolate(frame, [l1Start - 30, l1Start], [0, 0.4], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : isL1Past
    ? interpolate(frame, [switchFrame, switchFrame + 20], [1.0, 0.45], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : interpolate(l1Spring, [0, 1], [0.4, 1.0]);

  const l1TranslateY = frame < l1Start
    ? 8
    : interpolate(l1Spring, [0, 1], [8, 0]);

  // Line 2 spring onset & opacity: strictly keyed to switchFrame
  const l2Spring = frame >= switchFrame
    ? spring({
        frame: frame - switchFrame,
        fps,
        config: { damping: 180, stiffness: 120 },
      })
    : 0;

  const l2Opacity = !l2Bounds || frame < l1Start
    ? 0
    : frame < switchFrame
    ? 0.45
    : interpolate(l2Spring, [0, 1], [0.45, 1.0]);

  const l2TranslateY = frame < switchFrame
    ? 6
    : interpolate(l2Spring, [0, 1], [6, 0]);

  const l1Text = getCleanLineText(line);
  const l2Text = getCleanLineText(nextLine);

  const isL1Devanagari = containsDevanagari(l1Text);
  const isL2Devanagari = containsDevanagari(l2Text);

  // Dedicated typography tokens per script
  const l1FontFamily = isL1Devanagari
    ? VIDEO_CONFIG.fonts.devanagari
    : VIDEO_CONFIG.fonts.englishSerif;

  const l2FontFamily = isL2Devanagari
    ? VIDEO_CONFIG.fonts.devanagari
    : VIDEO_CONFIG.fonts.englishSerif;

  const primaryFontSize = isLandscape
    ? isL1Devanagari ? "56px" : "62px"
    : isL1Devanagari ? "42px" : "46px";

  const secondaryFontSize = isLandscape
    ? isL2Devanagari ? "44px" : "48px"
    : isL2Devanagari ? "34px" : "38px";

  return (
    <div
      style={{
        zIndex: 10,
        textAlign: "center",
        maxWidth: isLandscape ? "1400px" : "960px",
        width: "100%",
        padding: isLandscape ? "0 40px" : "0 30px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isLandscape ? "22px" : "16px",
      }}
    >
      {/* 1. Main Hero Lyric Line */}
      {l1Text && (
        <div
          style={{
            fontFamily: l1FontFamily,
            fontSize: primaryFontSize,
            lineHeight: isL1Devanagari ? 1.45 : 1.28,
            letterSpacing: isL1Devanagari ? "normal" : "0.5px",
            color: isL1Active ? "#FAF5FF" : "rgba(233, 213, 255, 0.7)",
            fontWeight: isL1Active ? 400 : 300,
            opacity: l1Opacity,
            transform: `translate3d(0, ${l1TranslateY.toFixed(2)}px, 0)`,
            willChange: "transform, opacity",
            textShadow: isL1Active
              ? "0 0 20px rgba(253, 230, 138, 0.7), 0 0 45px rgba(192, 132, 252, 0.4), 0 2px 10px rgba(0, 0, 0, 0.85)"
              : "0 0 15px rgba(192, 132, 252, 0.25), 0 2px 8px rgba(0, 0, 0, 0.8)",
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {l1Text}
        </div>
      )}

      {/* 2. Secondary Lyric Line (Couplet continuation, strictly actual lyrics) */}
      {l2Text && (
        <div
          style={{
            fontFamily: l2FontFamily,
            fontSize: secondaryFontSize,
            lineHeight: isL2Devanagari ? 1.45 : 1.3,
            letterSpacing: isL2Devanagari ? "normal" : "0.5px",
            color: isL2Active ? "#FAF5FF" : "rgba(233, 213, 255, 0.45)",
            fontWeight: isL2Active ? 400 : 300,
            opacity: l2Opacity,
            transform: `translate3d(0, ${l2TranslateY.toFixed(2)}px, 0)`,
            willChange: "transform, opacity",
            textShadow: isL2Active
              ? "0 0 20px rgba(253, 230, 138, 0.7), 0 0 45px rgba(192, 132, 252, 0.4), 0 2px 10px rgba(0, 0, 0, 0.85)"
              : "0 0 12px rgba(192, 132, 252, 0.2), 0 2px 8px rgba(0, 0, 0, 0.8)",
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {l2Text}
        </div>
      )}
    </div>
  );
};
