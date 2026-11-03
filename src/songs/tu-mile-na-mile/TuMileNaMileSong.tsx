import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface TuMileNaMileSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const TuMileNaMileSong: React.FC<TuMileNaMileSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/tu_mile_na_mile.mp3",
  coverImageSrc = "covers/tu_mile_na_mile_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Late-Night Soulful Bollywood Indie Ballad",
}) => {
  return (
    <SongCoverArtworkSong
      timeline={propTimeline || (rawTimeline as unknown as TimelineData)}
      audioSrc={audioSrc}
      coverImageSrc={coverImageSrc}
      lyricsPosition={lyricsPosition}
      mood={mood}
    />
  );
};
