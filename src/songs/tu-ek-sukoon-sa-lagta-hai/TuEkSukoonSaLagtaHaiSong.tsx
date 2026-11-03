import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface TuEkSukoonSaLagtaHaiSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const TuEkSukoonSaLagtaHaiSong: React.FC<TuEkSukoonSaLagtaHaiSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/tu_ek_sukoon_sa_lagta_hai.mp3",
  coverImageSrc = "covers/tu_ek_sukoon_sa_lagta_hai_clean_16x9.png",
  lyricsPosition = "top",
  mood = "Late-Night Cozy Monsoon Hindi Ballad",
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
