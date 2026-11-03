import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface AakhriBenchSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const AakhriBenchSong: React.FC<AakhriBenchSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/aakhri_bench.mp3",
  coverImageSrc = "covers/aakhri_bench_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Backbench Dosti & Carefree Days",
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
