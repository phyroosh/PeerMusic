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
import { KacchiNeendeinArtwork } from "./KacchiNeendeinArtwork";
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

export const BotanicalScrapbookSong: React.FC = () => {
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
  const currentScene: SceneConfig | undefined = timeline.scenes.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  ) || timeline.scenes[timeline.scenes.length - 1];

  // 4. Always dynamically get active and upcoming lyric line
  const { activeLine, nextLine } = getActiveAndNextLyricLines(timeline.scenes, frame);

  // 5. Derive Section Tag and Emotional Subtitle
  const sectionBadge = currentScene?.sectionTag
    ? currentScene.sectionTag.replace("•", "//")
    : "HOSTEL // ROOM 204";

  const subtitleText =
    currentScene?.subtitle ||
    (currentScene?.name.includes("Chai")
      ? "2 AM cutting chai & midnight brotherhood • Warm Acoustic Folk"
      : currentScene?.name.includes("Wall of Hope") || currentScene?.name.includes("Panne")
      ? "Blueprints pinned to damp hostel walls • Striving in the dark"
      : currentScene?.name.includes("Hook") || currentScene?.name.includes("Neendein")
      ? "Kacchi neendein, pakke khwaab • Sleepless dreams taking flight"
      : currentScene?.name.includes("Interlude")
      ? "Instrumental Interlude • Sitar resonance & acoustic night breeze"
      : currentScene?.name.includes("Deadline") || currentScene?.name.includes("Syllabus")
      ? "Mountain of pages & ticking clock • The weight of expectations"
      : currentScene?.name.includes("Reprise")
      ? "Chhoti si jeb mein bada sa hisaab • Unbreakable courage"
      : currentScene?.name.includes("Maa")
      ? "Maa ki aawaaz aur dabe hue aansu • Distant love across telephone wires"
      : currentScene?.name.includes("Outro") || currentScene?.name.includes("Rooftop")
      ? "Hostel terrace dawn • Tomorrow belongs to the restless"
      : "Pressed rose petals inside unread letters • Room 204 Memories");

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
      <Audio src={staticFile("audio/kacchi_neendein.mp3")} />

      {/* Background Vintage Ruled Grid / Journal Margin Lines */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.15, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="journalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="0" stroke={VIDEO_CONFIG.colors.gridLine} strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="40" stroke={VIDEO_CONFIG.colors.gridLine} strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#journalGrid)" />
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

      {/* Left: Song-Specific Thumbnail Card with Centered Intro Animation */}
      <div
        style={{
          transform: `translate3d(${thumbnailTranslateX.toFixed(2)}px, ${thumbnailTranslateY.toFixed(2)}px, 0) scale(${thumbnailScale.toFixed(4)})`,
          willChange: "transform",
          zIndex: 10,
        }}
      >
        <ThumbnailCard
          stampTitle="HOSTEL ARCHIVE"
          stampDate="ROOM 204"
          stampLocation="MIDNIGHT 02:00 AM"
          specimenTag="SPECIMEN: Late-Night Aspirations & Cutting Chai"
          trackTitle={`TRACK: ${timeline.songTitle}`}
          width={isLandscape ? 500 : 420}
          height={isLandscape ? 520 : 440}
        >
          <KacchiNeendeinArtwork />
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
          transform: `translate3d(${lyricsTranslateX.toFixed(2)}px, 0, 0)`,
          willChange: "transform, opacity",
          zIndex: 5,
        }}
      >
        {activeLine ? (
          <CinematicLyricLine
            line={activeLine}
            nextLine={nextLine}
            isLandscape={isLandscape}
            accentColor={VIDEO_CONFIG.colors.accentRose}
            sectionBadge={sectionBadge}
            subtitle={subtitleText}
          />
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
