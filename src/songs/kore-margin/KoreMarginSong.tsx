import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface KoreMarginSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const KoreMarginSong: React.FC<KoreMarginSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/kore_margin.mp3",
  coverImageSrc = "covers/kore_margin_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Soulful Student Life Indie Ballad",
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
