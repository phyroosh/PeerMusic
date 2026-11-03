import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface GoldenHourLettersSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const GoldenHourLettersSong: React.FC<GoldenHourLettersSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/golden_hour_letters.mp3",
  coverImageSrc = "covers/golden_hour_letters_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Quiet Amber Writing Desk Reverie",
}) => {
  return (
    <SongCoverArtworkSong
      timeline={(propTimeline || (rawTimeline as unknown as TimelineData))}
      audioSrc={audioSrc}
      coverImageSrc={coverImageSrc}
      lyricsPosition={lyricsPosition}
      mood={mood}
    />
  );
};
