import React from "react";
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TimelineData } from "../../engine/types";
import { applyOverridesAndValidate } from "../../engine/validation";
import { getActiveAndNextLyricLines } from "../../engine/lyricTiming";
import { SongCoverBackdrop } from "./SongCoverBackdrop";
import { CelestialLyricRenderer } from "../../engine/typography/CelestialLyricRenderer";
import { PeerMusicStyle02_NeonPulse, PeerMusicStyle03_LiquidSilk } from "../peermusic-styles";

export interface SongCoverArtworkSongProps {
  timeline: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  focalPoint?: "center" | "top" | "bottom" | "left" | "right";
  mood?: string;
  styleVariant?: "neon-pulse" | "liquid-silk" | "cover-classic";
}

/**
 * Intelligently resolves the appropriate cover art asset for the song
 */
export const resolveCoverImage = (
  timeline: TimelineData,
  explicitSrc?: string
): string | undefined => {
  if (explicitSrc) return explicitSrc;

  // Check timeline metadata if present
  const tlAny = timeline as unknown as { coverImage?: string };
  if (tlAny.coverImage) return tlAny.coverImage;

  // Derive song slug from audioFile or songTitle
  const rawIdentifier = timeline.audioFile || timeline.songTitle || "";
  const match = rawIdentifier.match(/([^/\\]+?)(?:\.[a-zA-Z0-9]+)?$/);
  if (!match) return undefined;

  const slug = match[1].toLowerCase().replace(/-/g, "_");

  // Default clean asset path in public/covers/
  return `covers/${slug}_clean_16x9.png`;
};

export const SongCoverArtworkSong: React.FC<SongCoverArtworkSongProps> = ({
  timeline: rawTimeline,
  audioSrc,
  coverImageSrc,
  lyricsPosition = "bottom",
  focalPoint = "center",
  mood,
  styleVariant = "neon-pulse",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // 1. Validate and sanitize timeline
  const validation = React.useMemo(
    () => applyOverridesAndValidate(rawTimeline),
    [rawTimeline]
  );
  const timeline = validation.timeline;

  // 2. Resolve master audio file
  const resolvedAudioSrc = audioSrc || timeline.audioFile;

  // 3. Resolve song-specific cover artwork
  const resolvedCoverSrc = React.useMemo(
    () => resolveCoverImage(timeline, coverImageSrc),
    [timeline, coverImageSrc]
  );

  // Route to Official PeerMusic Visual Themes
  if (styleVariant === "neon-pulse") {
    return (
      <PeerMusicStyle02_NeonPulse
        timeline={timeline}
        audioSrc={resolvedAudioSrc}
        coverImageSrc={resolvedCoverSrc}
      />
    );
  }

  if (styleVariant === "liquid-silk") {
    return (
      <PeerMusicStyle03_LiquidSilk
        timeline={timeline}
        audioSrc={resolvedAudioSrc}
        coverImageSrc={resolvedCoverSrc}
      />
    );
  }

  // 4. Dynamically find active and upcoming lyric line
  const { activeLine, nextLine, isSinging, isAnticipating } = getActiveAndNextLyricLines(
    timeline.scenes,
    frame
  );

  // 5. Strictly display text ONLY during singing and anticipation (Zero text during instrumental)
  const shouldDisplayLyrics = Boolean(activeLine && (isSinging || isAnticipating));

  // 6. Calculate vertical coordinate for lyrics based on negative-space configuration
  const lyricTop = React.useMemo(() => {
    if (lyricsPosition === "bottom") {
      return isLandscape ? "74%" : "70%";
    }
    if (lyricsPosition === "top") {
      return isLandscape ? "26%" : "28%";
    }
    return "50%";
  }, [lyricsPosition, isLandscape]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#07080B",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Lossless Master Audio Synced Playback */}
      {resolvedAudioSrc && <Audio src={staticFile(resolvedAudioSrc)} />}

      {/* 2. Dynamic Song Cover Artwork Backdrop (The Visual Star) */}
      <SongCoverBackdrop
        imageSrc={resolvedCoverSrc}
        mood={mood}
        focalPoint={focalPoint}
        lyricsPosition={lyricsPosition}
        enableParticles={true}
      />

      {/* 3. Pure Lyrics Typography Overlay (Directly over artwork, zero capsules, zero non-lyric text) */}
      <div
        style={{
          position: "absolute",
          top: lyricTop,
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
          zIndex: 10,
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
