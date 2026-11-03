import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface BetweenThePagesSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const BetweenThePagesSong: React.FC<BetweenThePagesSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/between_the_pages.mp3",
  coverImageSrc = "covers/between_the_pages_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Quiet Library Romance",
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
