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
import { StudentsLifeArtwork } from "./StudentsLifeArtwork";
import { CinematicLyricLine } from "../../engine/typography/CinematicLyricLine";

// Validate timeline at module load
const validation = applyOverridesAndValidate(rawTimeline as unknown as TimelineData);
const timeline = validation.timeline;

// Precompute vocal timing once at module load to eliminate per-frame array allocations
const allWordStartFrames = timeline.scenes
  .flatMap((s) => s.lines || [])
  .flatMap((l) => l.words || [])
  .map((w) => w.startFrame)
  .filter((sf) => typeof sf === "number");
const firstVocalStart = allWordStartFrames.length > 0 ? Math.min(...allWordStartFrames) : 0;
const introTransitionEnd = Math.max(0, firstVocalStart - 30);
const introTransitionStart = Math.max(0, introTransitionEnd - 120);

export const StudentsLifeSong: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  const introProgress = introTransitionStart === introTransitionEnd
    ? 1
    : interpolate(frame, [introTransitionStart, introTransitionEnd], [0, 1], {
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

  // 4. Always dynamically get active and upcoming lyric line
  const { activeLine, nextLine } = getActiveAndNextLyricLines(timeline.scenes, frame);

  // 5. Derive section badge and subtitle
  const sectionBadge = currentScene?.sectionTag
    ? currentScene.sectionTag.replace("•", "//")
    : "CLASS KE BAAD // STUDENT LIFE ANTHEM";

  const subtitleText =
    currentScene?.subtitle ||
    "Class ke baad jo zindagi thi • College Dosti & Memories Anthem";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: VIDEO_CONFIG.colors.background,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: isLandscape ? "60px 80px" : "80px 40px",
      }}
    >
      {/* Subtle Notebook/Journal Ruled Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(122, 111, 93, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(122, 111, 93, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Vertical Red Margin Guideline */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: isLandscape ? "180px" : "40px",
          width: "1.5px",
          backgroundColor: "#D9534F",
          opacity: 0.28,
          pointerEvents: "none",
        }}
      />

      {/* Lossless Synced Audio Playback */}
      <Audio src={staticFile("audio/students_life.mp3")} />

      {/* Left / Center: Bespoke Thumbnail Card Artwork */}
      <div
        style={{
          transform: `translate3d(${thumbnailTranslateX.toFixed(2)}px, ${thumbnailTranslateY.toFixed(2)}px, 0) scale(${thumbnailScale.toFixed(4)})`,
          willChange: "transform",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <ThumbnailCard
          stampTitle="CAMPUS ARCHIVE"
          stampDate="OCT 2026"
          stampLocation="HALLWAY BENCH #07"
          specimenTag="SPECIMEN: Cyanotype Corridor Bench"
          trackTitle="TRACK: Class Ke Baad (Student Life)"
          width={isLandscape ? 500 : 420}
          height={isLandscape ? 520 : 440}
        >
          <StudentsLifeArtwork />
        </ThumbnailCard>
      </div>

      {/* Spacer between card and lyrics in Landscape */}
      {isLandscape && <div style={{ width: "90px", flexShrink: 0 }} />}

      {/* Right: Synchronized Literary Lyrics OR Fluid Audio Waveform Interlude */}
      <div
        style={{
          flex: 1,
          maxWidth: isLandscape ? "720px" : "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: isLandscape ? "flex-start" : "center",
          textAlign: isLandscape ? "left" : "center",
          opacity: lyricsOpacity,
          transform: `translateX(${lyricsTranslateX}px)`,
          zIndex: 5,
          marginTop: isLandscape ? 0 : "40px",
          minHeight: "260px",
        }}
      >
        {activeLine ? (
          <CinematicLyricLine
            line={activeLine}
            nextLine={nextLine}
            isLandscape={isLandscape}
            accentColor="#D97706"
            sectionBadge={sectionBadge}
            subtitle={subtitleText}
          />
        ) : (
          /* Pure Audio Waveform Interlude when singer is not singing */
          <WaveformInterlude
            label={currentScene?.name.toUpperCase() || "CAMPUS INTERLUDE"}
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
