import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface RoughCopySongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const RoughCopySong: React.FC<RoughCopySongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/rough_copy.mp3",
  coverImageSrc = "covers/rough_copy_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Rough Copy Doodles & Secret Poetry",
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
