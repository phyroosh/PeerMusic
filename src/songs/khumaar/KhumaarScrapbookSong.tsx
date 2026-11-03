import React from "react";
import { Audio, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import rawTimeline from "./timeline.json";
import { TimelineData, SceneConfig } from "../../engine/types";
import { applyOverridesAndValidate } from "../../engine/validation";
import { getActiveAndNextLyricLines } from "../../engine/lyricTiming";
import { PaperTexture } from "../../engine/camera/PaperTexture";
import { VIDEO_CONFIG } from "../../config/videoConfig";
import { WaveformInterlude } from "../../engine/audio/WaveformInterlude";
import { ThumbnailCard } from "../../engine/thumbnail/ThumbnailCard";
import { KhumaarArtwork } from "./KhumaarArtwork";
import { CinematicLyricLine } from "../../engine/typography/CinematicLyricLine";

// Validate timeline at module load
const validation = applyOverridesAndValidate(rawTimeline as unknown as TimelineData);
const timeline = validation.timeline;

// Precompute vocal timing once at module load to eliminate per-frame allocations
const allWordStartFrames = timeline.scenes
  .flatMap((s) => s.lines || [])
  .flatMap((l) => l.words || [])
  .map((w) => w.startFrame)
  .filter((sf) => typeof sf === "number");
const firstVocalStart = allWordStartFrames.length > 0 ? Math.min(...allWordStartFrames) : 0;
const introTransitionEnd = Math.max(0, firstVocalStart - 30);
const introTransitionStart = Math.max(0, introTransitionEnd - 120);

export const KhumaarSong: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  const introProgress =
    introTransitionStart === introTransitionEnd
      ? 1
      : interpolate(frame, [introTransitionStart, introTransitionEnd], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });

  const thumbnailTranslateX = isLandscape ? interpolate(introProgress, [0, 1], [580, 0]) : 0;
  const thumbnailTranslateY = !isLandscape ? interpolate(introProgress, [0, 1], [220, 0]) : 0;
  const thumbnailScale = interpolate(introProgress, [0, 1], [1.1, 1]);
  const lyricsOpacity = interpolate(introProgress, [0.35, 1], [0, 1]);
  const lyricsTranslateX = isLandscape ? interpolate(introProgress, [0.35, 1], [40, 0]) : 0;

  // Find active scene based on current frame
  const currentScene: (SceneConfig & { subtitle?: string }) | undefined = (timeline.scenes.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  ) || timeline.scenes[timeline.scenes.length - 1]) as SceneConfig & { subtitle?: string };

  // Always dynamically get active and upcoming lyric line
  const { activeLine, nextLine } = getActiveAndNextLyricLines(timeline.scenes, frame);

  // Derive section badge and subtitle
  const sectionBadge = currentScene?.sectionTag
    ? currentScene.sectionTag.replace("•", "//")
    : "KHUMAAR // MIDNIGHT CONFESSION";

  const subtitleText =
    currentScene?.subtitle ||
    "Sitting in the quiet hours past 2 AM • Only your presence fills the room";

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
      {/* Master 320k Audio Playback */}
      <Audio src={staticFile("audio/khumaar.mp3")} />

      {/* Background Vintage Ruled Grid / Journal Notebook Margin Lines */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.15, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="scrapbookGridKhumaar" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="0" stroke={VIDEO_CONFIG.colors.gridLine} strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="40" stroke={VIDEO_CONFIG.colors.gridLine} strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#scrapbookGridKhumaar)" />
        {/* Red Notebook Margin Line */}
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

      {/* Tactile Analog Paper Texture Overlay */}
      <PaperTexture opacity={0.12} />

      {/* LEFT COLUMN: Herbarium Thumbnail Card with Bespoke Artwork & Ken Burns Zoom */}
      <div
        style={{
          transform: `translate3d(${thumbnailTranslateX.toFixed(2)}px, ${thumbnailTranslateY.toFixed(2)}px, 0) scale(${thumbnailScale.toFixed(4)})`,
          transformOrigin: isLandscape ? "left center" : "center center",
          willChange: "transform",
          zIndex: 10,
        }}
      >
        <ThumbnailCard
          stampTitle="MIDNIGHT CAFE"
          stampDate="2:30 AM"
          stampLocation="DELHI NOCTURNE"
          specimenTag="SPECIMEN: Melting Ice & Unspoken Words"
          trackTitle="TRACK: Khumaar (Yeh Kaisa Suroor Hai)"
          width={isLandscape ? 500 : 440}
          height={isLandscape ? 520 : 460}
        >
          <KhumaarArtwork />
        </ThumbnailCard>
      </div>

      {/* RIGHT COLUMN: Cinematic Luminous Lyrical Typography or Interlude Waveform */}
      <div
        style={{
          width: isLandscape ? "52%" : "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          opacity: lyricsOpacity,
          transform: `translate3d(${lyricsTranslateX.toFixed(2)}px, 0, 0)`,
          willChange: "transform, opacity",
          zIndex: 5,
        }}
      >
        {/* Editorial Scene Subtitle */}
        <div
          style={{
            fontFamily: VIDEO_CONFIG.fonts.tag,
            fontSize: isLandscape ? "14px" : "13px",
            color: VIDEO_CONFIG.colors.secondaryText,
            marginBottom: "28px",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          {sectionBadge}
        </div>

        {/* Dynamic Display: Cinematic Lyrical Line or Waveform Interlude */}
        {activeLine ? (
          <div style={{ width: "100%", minHeight: isLandscape ? "240px" : "180px" }}>
            <CinematicLyricLine line={activeLine} nextLine={nextLine} isLandscape={isLandscape} />
          </div>
        ) : (
          <div style={{ width: "100%", minHeight: isLandscape ? "240px" : "180px" }}>
            <WaveformInterlude
              label={sectionBadge}
              sublabel={subtitleText}
            />
          </div>
        )}
      </div>
    </div>
  );
};
