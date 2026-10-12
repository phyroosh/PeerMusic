import React from "react";
import { Audio, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import rawTimeline from "./timeline.json";
import { TimelineData, SceneConfig, LyricLine } from "../../engine/types";
import { applyOverridesAndValidate } from "../../engine/validation";
import { PaperTexture } from "../../engine/camera/PaperTexture";
import { VIDEO_CONFIG } from "../../config/videoConfig";
import { WaveformInterlude } from "../../engine/audio/WaveformInterlude";
import { ThumbnailCard } from "../../engine/thumbnail/ThumbnailCard";
import { RoughCopyArtwork } from "./RoughCopyArtwork";

// Validate timeline at module load
const validation = applyOverridesAndValidate(rawTimeline as unknown as TimelineData);
const timeline = validation.timeline;

export const RoughCopySong: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // 1. Calculate first sung vocal across all non-intro scenes
  const firstSungScene = timeline.scenes.find(
    (s) => !s.id.toLowerCase().includes("intro") && s.lines && s.lines.length > 0
  );
  const firstVocalStart = firstSungScene?.lines[0]?.words[0]?.startFrame ?? 1110;

  // 2. Intro Showcase & Smooth Pan Animation
  const introTransitionStart = Math.max(0, firstVocalStart - 150);
  const introTransitionEnd = Math.max(introTransitionStart + 1, firstVocalStart - 30);

  const introProgress = interpolate(frame, [introTransitionStart, introTransitionEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const thumbnailTranslateX = isLandscape
    ? interpolate(introProgress, [0, 1], [580, 0])
    : 0;
  const thumbnailTranslateY = !isLandscape
    ? interpolate(introProgress, [0, 1], [220, 0])
    : 0;
  const thumbnailScale = interpolate(introProgress, [0, 1], [1.1, 1]);
  const lyricsOpacity = interpolate(introProgress, [0.35, 1], [0, 1]);
  const lyricsTranslateX = isLandscape
    ? interpolate(introProgress, [0.35, 1], [40, 0])
    : 0;

  // 3. Find active scene based on current frame
  const currentScene: (SceneConfig & { subtitle?: string }) | undefined = (timeline.scenes.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  ) || timeline.scenes[timeline.scenes.length - 1]) as SceneConfig & { subtitle?: string };

  // 4. Determine Active Lyric Line with 60-frame (1 sec) anticipation window
  const anticipationFrames = 60;
  let activeLine: LyricLine | undefined;

  if (frame >= introTransitionEnd) {
    if (currentScene && !currentScene.id.toLowerCase().includes("intro")) {
      for (const line of currentScene.lines) {
        if (!line.words || line.words.length === 0) continue;
        const firstWordStart = line.words[0].startFrame;
        const lastWordEnd = line.words[line.words.length - 1].endFrame;

        if (frame >= firstWordStart - anticipationFrames && frame <= lastWordEnd + 35) {
          activeLine = line;
          break;
        }
      }
    }

    // Check if next scene's first line is approaching
    if (!activeLine) {
      const nextScene = timeline.scenes.find(
        (s) => s.startFrame > frame && !s.id.toLowerCase().includes("intro")
      );
      if (nextScene && nextScene.lines && nextScene.lines.length > 0) {
        const firstLine = nextScene.lines[0];
        if (firstLine && firstLine.words && firstLine.words.length > 0) {
          const firstWordStart = firstLine.words[0].startFrame;
          if (frame >= firstWordStart - anticipationFrames && frame < firstWordStart) {
            activeLine = firstLine;
          }
        }
      }
    }
  }

  // 5. Derive section badge and subtitle
  const sectionBadge = currentScene?.sectionTag
    ? currentScene.sectionTag.replace("•", "//")
    : "ROUGH COPY // CLASS 10-B";

  const subtitleText =
    currentScene?.subtitle ||
    "Rough copy ke aakhri panne pe • School Romance Memories";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: VIDEO_CONFIG.colors.background,
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        alignItems: "center",
        justifyContent: isLandscape ? "space-between" : "center",
        gap: isLandscape ? "0px" : "60px",
        padding: isLandscape ? "80px 120px" : "80px 50px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Lossless Master Audio Synced Playback */}
      <Audio src={staticFile("audio/rough_copy.mp3")} />

      {/* Background Vintage Ruled Grid / School Notebook Margin Lines */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.15, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="roughCopyGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="0" stroke={VIDEO_CONFIG.colors.gridLine} strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="40" stroke={VIDEO_CONFIG.colors.gridLine} strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#roughCopyGrid)" />
        {/* Red School Notebook Margin Line */}
        <line
          x1={isLandscape ? "180" : "40"}
          y1="0"
          x2={isLandscape ? "180" : "40"}
          y2="100%"
          stroke={VIDEO_CONFIG.colors.marginRed}
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>

      {/* Left: Bespoke Song-Specific Thumbnail Card with Centered Intro Animation */}
      <div
        style={{
          transform: `translate(${thumbnailTranslateX}px, ${thumbnailTranslateY}px) scale(${thumbnailScale})`,
          transition: "transform 0.05s ease-out",
          zIndex: 10,
        }}
      >
        <ThumbnailCard
          stampTitle="ROUGH COPY"
          stampDate="CLASS 10-B"
          stampLocation="LAST BENCH"
          specimenTag="SPECIMEN: Kept inside Rough Notebook"
          trackTitle={`TRACK: ${timeline.songTitle}`}
          width={isLandscape ? 500 : 420}
          height={isLandscape ? 520 : 440}
        >
          <RoughCopyArtwork />
        </ThumbnailCard>
      </div>

      {/* Right: Synchronized Literary Lyrics OR Fluid Audio Waveform Interlude */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isLandscape ? "flex-start" : "center",
          textAlign: isLandscape ? "left" : "center",
          gap: "22px",
          maxWidth: isLandscape ? "680px" : "100%",
          width: isLandscape ? "auto" : "100%",
          padding: isLandscape ? "0" : "10px 10px 0 10px",
          boxSizing: "border-box",
          opacity: lyricsOpacity,
          transform: `translateX(${lyricsTranslateX}px)`,
          transition: "opacity 0.15s ease",
          zIndex: 5,
        }}
      >
        {activeLine ? (
          <>
            {/* Section Pill Badge */}
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: "3px",
                backgroundColor: VIDEO_CONFIG.colors.accentFern,
                color: "#FAF6EE",
                fontFamily: VIDEO_CONFIG.fonts.accent,
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.26em",
                width: "fit-content",
              }}
            >
              {sectionBadge}
            </div>

            {/* Dynamic Synchronized Lyrics Line with Advance Dimmed Preview */}
            <div
              style={{
                fontFamily: VIDEO_CONFIG.fonts.heading,
                fontSize: isLandscape ? "46px" : "36px",
                fontWeight: 700,
                color: VIDEO_CONFIG.colors.primaryText,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                minHeight: isLandscape ? "120px" : "80px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: isLandscape ? "flex-start" : "center",
                gap: "10px",
              }}
            >
              {activeLine.words.map((word) => {
                const isSung = frame > word.endFrame;
                const isCurrentlyActive = frame >= word.startFrame && frame <= word.endFrame;

                return (
                  <span
                    key={word.id}
                    style={{
                      opacity: isCurrentlyActive || isSung ? 1 : 0.32,
                      color: isCurrentlyActive
                        ? VIDEO_CONFIG.colors.accentRose
                        : VIDEO_CONFIG.colors.primaryText,
                      textDecoration: isCurrentlyActive ? "underline" : "none",
                      textDecorationColor: VIDEO_CONFIG.colors.accentRose,
                      textUnderlineOffset: "6px",
                      transition: "opacity 0.15s ease, color 0.15s ease",
                      display: "inline-block",
                    }}
                  >
                    {word.text}
                  </span>
                );
              })}
            </div>

            {/* Poetic Subtitle / Emotional Context */}
            <div
              style={{
                fontFamily: VIDEO_CONFIG.fonts.tag,
                fontSize: isLandscape ? "15px" : "13px",
                color: VIDEO_CONFIG.colors.secondaryText,
                lineHeight: 1.6,
              }}
            >
              {subtitleText}
            </div>
          </>
        ) : (
          /* Pure Audio Waveform Interlude when singer is not singing */
          <WaveformInterlude
            label={currentScene?.name.toUpperCase() || "ACOUSTIC INTERLUDE"}
            sublabel={subtitleText}
            width={isLandscape ? "640px" : "100%"}
            height={130}
          />
        )}
      </div>

      {/* Tactile Paper Texture */}
      <PaperTexture opacity={0.12} />
    </div>
  );
};
