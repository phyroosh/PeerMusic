import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface GrassStainedKneesSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
  styleVariant?: "neon-pulse" | "liquid-silk" | "cover-classic";
}

export const GrassStainedKneesSong: React.FC<GrassStainedKneesSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/grass_stained_knees.mp3",
  coverImageSrc = "covers/grass_stained_knees_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Endless Summer Nostalgia",
  styleVariant = "neon-pulse",
}) => {
  return (
    <SongCoverArtworkSong
      timeline={(propTimeline || (rawTimeline as unknown as TimelineData))}
      audioSrc={audioSrc}
      coverImageSrc={coverImageSrc}
      lyricsPosition={lyricsPosition}
      mood={mood}
      styleVariant={styleVariant}
    />
  );
};
