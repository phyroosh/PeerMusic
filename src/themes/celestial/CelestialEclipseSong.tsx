import React from "react";
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TimelineData } from "../../engine/types";
import { applyOverridesAndValidate } from "../../engine/validation";
import { getActiveAndNextLyricLines } from "../../engine/lyricTiming";
import { CelestialBackdrop } from "./CelestialBackdrop";
import { CelestialLyricRenderer } from "../../engine/typography/CelestialLyricRenderer";

export interface CelestialEclipseSongProps {
  timeline: TimelineData;
  audioSrc?: string;
}

export const CelestialEclipseSong: React.FC<CelestialEclipseSongProps> = ({
  timeline: rawTimeline,
  audioSrc,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Validate and sanitize timeline
  const validation = React.useMemo(
    () => applyOverridesAndValidate(rawTimeline),
    [rawTimeline]
  );
  const timeline = validation.timeline;

  // Resolve audio file path
  const resolvedAudioSrc = audioSrc || timeline.audioFile;

  // Dynamically find active and upcoming lyric line
  const { activeLine, nextLine, isSinging, isAnticipating } = getActiveAndNextLyricLines(
    timeline.scenes,
    frame
  );

  // Show lyrics during active singing and anticipation window
  const shouldDisplayLyrics = Boolean(activeLine && (isSinging || isAnticipating));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#030206",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Lossless Master Audio Synced Playback */}
      {resolvedAudioSrc && <Audio src={staticFile(resolvedAudioSrc)} />}

      {/* 2. Celestial Backdrop (Cosmic Void, Dynamic Corona Eclipse, Breathing Lights, Twinkling Stars) */}
      <CelestialBackdrop intensity={isSinging ? 1.15 : 1.0} />

      {/* 3. Lyrics-Only Container (Zero capsules, zero headers, zero subtitles, zero branding) */}
      <div
        style={{
          position: "absolute",
          top: isLandscape ? "63%" : "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        {shouldDisplayLyrics && activeLine ? (
          <CelestialLyricRenderer
            line={activeLine}
            nextLine={nextLine}
            isLandscape={isLandscape}
          />
        ) : null}
      </div>
    </div>
  );
};
