import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LyricLine } from "../types";
import { LineBounds, getLineBounds } from "../lyricTiming";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export interface CinematicLyricLineProps {
  line: LyricLine;
  nextLine?: LyricLine;
  isLandscape?: boolean;
  accentColor?: string;
  primaryTextColor?: string;
  sectionBadge?: string;
  badgeBackgroundColor?: string;
  subtitle?: string;
  showProgressFilament?: boolean;
  showUpcomingPreview?: boolean;
}

const STOP_WORDS = new Set([
  "ki", "ka", "ke", "ko", "se", "mein", "par", "pe", "hai", "hain", "tha", "thi", "the",
  "ho", "bhi", "aur", "to", "yeh", "woh", "ek", "sa", "si", "na", "ne", "mera", "meri", "mere",
  "tera", "teri", "tere", "apna", "apni", "apne", "hum", "tum", "kuch", "sab", "raha", "rahi", "rahe",
  "gaya", "gayi", "gaye", "a", "an", "the", "in", "on", "at", "to", "of", "and", "is", "for",
  "with", "by", "from", "it", "this", "that",
]);

interface ParsedWord {
  text: string;
  cleanWord: string;
  isAccent: boolean;
}

interface ParsedLineData {
  cleanFullText: string;
  words: ParsedWord[];
  accentWords: string[];
}

function parseLineWordsAndAccents(line?: LyricLine): ParsedLineData {
  if (!line) {
    return { cleanFullText: "", words: [], accentWords: [] };
  }

  const rawText = line.text || line.words?.map((w) => w.text).join(" ") || "";

  // 1. Explicit accentWords array
  const explicitAccents = (line.accentWords || []).map((w) =>
    w.toLowerCase().replace(/[^a-z0-9]/gi, "")
  );

  // 2. Markdown *word* or _word_ syntax
  const markdownMatches: string[] = [];
  const mdRegex = /[*_]([^*_]+)[*_]/g;
  let match: RegExpExecArray | null;
  while ((match = mdRegex.exec(rawText)) !== null) {
    markdownMatches.push(match[1].toLowerCase().replace(/[^a-z0-9]/gi, ""));
  }

  // Strip markdown markers from display text
  const cleanFullText = rawText.replace(/[*_]/g, "");
  const rawTokens = cleanFullText.split(/\s+/).filter(Boolean);

  const targetAccents = new Set<string>([...explicitAccents, ...markdownMatches]);

  // 3. Fallback: pick the single most impactful word (or longest word among words with accent === true)
  if (targetAccents.size === 0) {
    let candidate = "";
    let candidateLen = 0;

    // Check words with accent === true first, but pick ONLY the single longest among them
    if (line.words?.length) {
      for (const w of line.words) {
        if (w.accent) {
          const clean = w.text.toLowerCase().replace(/[^a-z0-9]/gi, "");
          if (clean.length >= 3 && !STOP_WORDS.has(clean) && clean.length > candidateLen) {
            candidate = clean;
            candidateLen = clean.length;
          }
        }
      }
    }

    // If still empty, scan rawTokens for longest impactful noun/keyword (excluding stop words)
    if (!candidate && rawTokens.length > 0) {
      for (const token of rawTokens) {
        const clean = token.toLowerCase().replace(/[^a-z0-9]/gi, "");
        if (clean.length >= 3 && !STOP_WORDS.has(clean)) {
          if (clean.length > candidateLen) {
            candidate = clean;
            candidateLen = clean.length;
          }
        }
      }
    }

    // Fallback if all words were in stop words: select longest word in line
    if (!candidate && rawTokens.length > 0) {
      for (const token of rawTokens) {
        const clean = token.toLowerCase().replace(/[^a-z0-9]/gi, "");
        if (clean.length > candidateLen) {
          candidate = clean;
          candidateLen = clean.length;
        }
      }
    }

    if (candidate) {
      targetAccents.add(candidate);
    }
  }

  let matchedAccent = false;
  const words: ParsedWord[] = rawTokens.map((token) => {
    const clean = token.toLowerCase().replace(/[^a-z0-9]/gi, "");
    const shouldAccent = !matchedAccent && targetAccents.has(clean);
    if (shouldAccent) {
      matchedAccent = true;
    }
    return {
      text: token,
      cleanWord: clean,
      isAccent: shouldAccent,
    };
  });

  return {
    cleanFullText,
    words,
    accentWords: Array.from(targetAccents),
  };
}

/**
 * CinematicLyricLine:
 * Delivers buttery-smooth 2-line couplet focus shift and keyword accent sweeps.
 *
 * 1. Forgiving Line-Level Focus:
 *    Active Line animates smoothly into crisp focus via a critically damped spring
 *    (damping: 200, stiffness: 120), transitioning from opacity 0.38 & blur(0.6px) to opacity 1.0 & blur(0px).
 *    Inactive / Next Line in pair remains softly muted until its lineStartFrame arrives.
 * 2. Animated Accent Underline:
 *    Emotional keywords sweep an animated warm orange underline (#E07A2B) 8-12 frames after
 *    line onset, animating scaleX from 0 to 1 without word-sync snapping or jitter.
 * 3. Soft Progress Sweep:
 *    Applies a subtle, wide-feathered 30% linear-gradient mask across the active line's duration.
 * 4. 100% Deterministic: Frame-locked using Remotion's useCurrentFrame() and spring().
 */
export const CinematicLyricLineComponent: React.FC<CinematicLyricLineProps> = ({
  line,
  nextLine,
  isLandscape = true,
  accentColor = "#E07A2B", // Brand Orange
  primaryTextColor = VIDEO_CONFIG.colors.primaryText,
  sectionBadge,
  badgeBackgroundColor = VIDEO_CONFIG.colors.accentFern,
  subtitle,
  showProgressFilament = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bounds for Line 1
  const l1Bounds: LineBounds = getLineBounds(line) || { startFrame: 0, endFrame: 1 };
  const l1Start = l1Bounds.startFrame;
  const l1End = l1Bounds.endFrame;

  // Bounds for Line 2 (if present)
  const l2Bounds: LineBounds | null = nextLine ? getLineBounds(nextLine) : null;
  const l2Start = l2Bounds ? l2Bounds.startFrame : l1End + 999999;
  const l2End = l2Bounds ? l2Bounds.endFrame : l1End + 999999;

  // Accurate vocal transition: Line 2 can NEVER highlight while Line 1 is still being sung
  const switchFrame = l2Bounds ? Math.max(l1End, l2Start) : l1End;
  const isL1Active = frame >= l1Start && frame < switchFrame;
  const isL1Past = frame >= switchFrame;
  const isL2Active = Boolean(l2Bounds && frame >= switchFrame && frame < l2End);
  const isL2Inactive = Boolean(l2Bounds && frame < switchFrame);
  const isL2Past = Boolean(l2Bounds && frame >= l2End);

  // Parse words & accents for both lines
  const l1Data = parseLineWordsAndAccents(line);
  const l2Data = parseLineWordsAndAccents(nextLine);

  // 1. Line 1 Spring onset & visual properties (critically damped: damping 200, stiffness 120)
  const l1Spring = frame >= l1Start
    ? spring({
        frame: frame - l1Start,
        fps,
        config: { damping: 200, stiffness: 120 },
      })
    : 0;

  // Line 1 resting transition when Line 2 starts
  const l1RestProgress = isL1Past && l2Bounds
    ? interpolate(frame, [switchFrame, switchFrame + 18], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const l1Opacity = frame < l1Start
    ? interpolate(frame, [l1Start - 45, l1Start], [0.15, 0.38], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : isL1Past
    ? interpolate(l1RestProgress, [0, 1], [1.0, 0.45])
    : interpolate(l1Spring, [0, 1], [0.38, 1.0]);

  const l1Blur = frame < l1Start
    ? 0.6
    : isL1Past
    ? 0
    : interpolate(l1Spring, [0, 1], [0.6, 0]);

  const l1TranslateY = frame < l1Start
    ? 6
    : interpolate(l1Spring, [0, 1], [6, 0]);

  // Line 1 Accent Underline Sweep (triggers gracefully 10 frames after l1Start)
  const l1AccentTrigger = l1Start + 10;
  const l1AccentSpring = frame >= l1AccentTrigger
    ? spring({
        frame: frame - l1AccentTrigger,
        fps,
        config: { damping: 18, stiffness: 140 },
      })
    : 0;
  const l1AccentProgress = Math.min(1, Math.max(0, l1AccentSpring));

  // Line 1 Soft Progress Mask (feathered 30% sweep across duration)
  const l1Duration = Math.max(1, switchFrame - l1Start);
  const l1LinearProgress = isL1Active
    ? Math.min(1, Math.max(0, (frame - l1Start) / l1Duration))
    : isL1Past
    ? 1
    : 0;

  // 2. Line 2 Spring onset & visual properties: strictly keyed to switchFrame
  const l2Spring = frame >= switchFrame
    ? spring({
        frame: frame - switchFrame,
        fps,
        config: { damping: 200, stiffness: 120 },
      })
    : 0;

  const l2RestProgress = isL2Past
    ? interpolate(frame, [l2End, l2End + 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const l2Opacity = isL2Inactive
    ? 0.38
    : isL2Past
    ? interpolate(l2RestProgress, [0, 1], [1.0, 0.45])
    : interpolate(l2Spring, [0, 1], [0.38, 1.0]);

  const l2Blur = isL2Inactive
    ? 0.6
    : isL2Past
    ? 0
    : interpolate(l2Spring, [0, 1], [0.6, 0]);

  const l2TranslateY = isL2Inactive
    ? 4
    : interpolate(l2Spring, [0, 1], [6, 0]);

  // Line 2 Accent Underline Sweep (triggers gracefully 10 frames after switchFrame)
  const l2AccentTrigger = switchFrame + 10;
  const l2AccentSpring = frame >= l2AccentTrigger
    ? spring({
        frame: frame - l2AccentTrigger,
        fps,
        config: { damping: 18, stiffness: 140 },
      })
    : 0;
  const l2AccentProgress = Math.min(1, Math.max(0, l2AccentSpring));

  // Line 2 Soft Progress Mask
  const l2Duration = Math.max(1, l2End - switchFrame);
  const l2LinearProgress = isL2Active
    ? Math.min(1, Math.max(0, (frame - switchFrame) / l2Duration))
    : isL2Past
    ? 1
    : 0;

  // Left Editorial Spine Animation
  const isAnySinging = isL1Active || isL2Active;
  const spineActiveSpring = isL2Active ? l2Spring : l1Spring;

  // Active progress filament across the active line
  const activeLineProgress = isL2Active ? l2LinearProgress : l1LinearProgress;

  // Helper for generating feathered 30% progress sweep mask
  const getProgressSweepMask = (progress: number, isActive: boolean) => {
    if (!isActive) return undefined;
    const p = progress * 100;
    const pStart = Math.max(0, p - 15);
    const pEnd = Math.min(100, p + 15);
    return `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${pStart.toFixed(1)}%, rgba(0,0,0,0.65) ${pEnd.toFixed(1)}%, rgba(0,0,0,0.65) 100%)`;
  };

  const l1Mask = getProgressSweepMask(l1LinearProgress, isL1Active);
  const l2Mask = getProgressSweepMask(l2LinearProgress, isL2Active);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        gap: isLandscape ? "18px" : "14px",
        maxWidth: isLandscape ? "720px" : "100%",
        width: isLandscape ? "100%" : "auto",
        margin: isLandscape ? "0" : "0 auto",
        boxSizing: "border-box",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "geometricPrecision",
      }}
    >
      {/* 1. Section Pill Badge (Campus Archive Standard) */}
      {sectionBadge && (
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "3px",
            backgroundColor: badgeBackgroundColor,
            color: "#FAF6EE",
            fontFamily: VIDEO_CONFIG.fonts.accent,
            fontSize: isLandscape ? "12px" : "11px",
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            width: "fit-content",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {sectionBadge}
        </div>
      )}

      {/* 2. Hero 2-Line Couplet Display with Left Editorial Spine */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: isLandscape ? "20px" : "16px",
          width: "100%",
          padding: isLandscape ? "4px 0" : "4px 8px",
          boxSizing: "border-box",
        }}
      >
        {/* Left Editorial Accent Spine (Lights up when singing) */}
        <div
          style={{
            width: isLandscape ? "4px" : "3px",
            borderRadius: "2px",
            background: isAnySinging
              ? `linear-gradient(180deg, ${accentColor}, #D97706)`
              : isL1Past && isL2Past
              ? "#B8AC9B"
              : "rgba(122, 111, 93, 0.25)",
            opacity: isAnySinging ? 1 : isL1Past && isL2Past ? 0.5 : 0.25,
            transform: `scaleY(${isAnySinging ? spineActiveSpring : isL1Past ? 0.7 : 0.3})`,
            transformOrigin: "top",
            boxShadow: isAnySinging ? `0 0 12px ${accentColor}80` : "none",
            flexShrink: 0,
          }}
        />

        {/* 2-Line Couplet Typography Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isLandscape ? "14px" : "10px",
            flex: 1,
            width: "100%",
          }}
        >
          {/* Couplet Line 1 */}
          <div
            style={{
              fontFamily: VIDEO_CONFIG.fonts.heading,
              fontSize: isLandscape ? "42px" : "30px",
              fontWeight: 700,
              color: isL1Active ? primaryTextColor : "#4A3F33",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              opacity: l1Opacity,
              filter: `blur(${l1Blur.toFixed(2)}px)${isL1Active ? ` drop-shadow(0 0 16px ${accentColor}26)` : ""}`,
              transform: `translate3d(0, ${l1TranslateY.toFixed(2)}px, 0)`,
              willChange: "transform, opacity, filter",
              WebkitMaskImage: l1Mask,
              maskImage: l1Mask,
            }}
          >
            {l1Data.words.map((word, idx) => (
              <span
                key={`l1-w-${idx}`}
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginRight: "0.26em",
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>{word.text}</span>
                {word.isAccent && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: isLandscape ? "-2px" : "-1px",
                      left: "-2px",
                      right: "-2px",
                      height: isLandscape ? "4px" : "3px",
                      backgroundColor: "#E07A2B",
                      borderRadius: "2px",
                      transformOrigin: "left center",
                      transform: `scaleX(${l1AccentProgress.toFixed(4)})`,
                      boxShadow: "0 0 10px rgba(224, 122, 43, 0.45)",
                      opacity: l1AccentProgress > 0 ? 0.95 : 0,
                      zIndex: 1,
                    }}
                  />
                )}
              </span>
            ))}
          </div>

          {/* Couplet Line 2 (Inactive / Secondary Line in the Pair) */}
          {nextLine && (
            <div
              style={{
                fontFamily: VIDEO_CONFIG.fonts.heading,
                fontSize: isLandscape ? "42px" : "30px",
                fontWeight: isL2Active ? 700 : 600,
                color: isL2Active ? primaryTextColor : "#4A3F33",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                opacity: l2Opacity,
                filter: `blur(${l2Blur.toFixed(2)}px)${isL2Active ? ` drop-shadow(0 0 16px ${accentColor}26)` : ""}`,
                transform: `translate3d(0, ${l2TranslateY.toFixed(2)}px, 0)`,
                willChange: "transform, opacity, filter",
                WebkitMaskImage: l2Mask,
                maskImage: l2Mask,
              }}
            >
              {l2Data.words.map((word, idx) => (
                <span
                  key={`l2-w-${idx}`}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginRight: "0.26em",
                  }}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>{word.text}</span>
                  {word.isAccent && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: isLandscape ? "-2px" : "-1px",
                        left: "-2px",
                        right: "-2px",
                        height: isLandscape ? "4px" : "3px",
                        backgroundColor: "#E07A2B",
                        borderRadius: "2px",
                        transformOrigin: "left center",
                        transform: `scaleX(${l2AccentProgress.toFixed(4)})`,
                        boxShadow: "0 0 10px rgba(224, 122, 43, 0.45)",
                        opacity: l2AccentProgress > 0 ? 0.95 : 0,
                        zIndex: 1,
                      }}
                    />
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Fluid Continuous Progress Ribbon (Tracks vocal breath smoothly at 60 FPS) */}
          {showProgressFilament && isAnySinging && (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "2px",
                backgroundColor: "rgba(122, 111, 93, 0.12)",
                borderRadius: "1px",
                overflow: "hidden",
                marginTop: "6px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${(activeLineProgress * 100).toFixed(2)}%`,
                  background: `linear-gradient(90deg, ${accentColor}, #D97706)`,
                  boxShadow: `0 0 8px ${accentColor}80`,
                  borderRadius: "1px",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 3. Poetic Monospace Subtitle (Campus Archive Metadata) */}
      {subtitle && (
        <div
          style={{
            fontFamily: VIDEO_CONFIG.fonts.tag,
            fontSize: isLandscape ? "14px" : "12px",
            color: VIDEO_CONFIG.colors.secondaryText,
            lineHeight: 1.6,
            marginTop: "2px",
            paddingLeft: isLandscape ? "24px" : "19px",
            opacity: 0.85,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export const CinematicLyricLine = React.memo(CinematicLyricLineComponent);
