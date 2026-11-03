import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface PencilKeNishaanSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const PencilKeNishaanSong: React.FC<PencilKeNishaanSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/pencil_ke_nishaan.mp3",
  coverImageSrc = "covers/pencil_ke_nishaan_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "School Crush & Desk Carvings Nostalgia",
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
