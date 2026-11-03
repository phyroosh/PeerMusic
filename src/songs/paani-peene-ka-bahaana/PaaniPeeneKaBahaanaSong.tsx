import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface PaaniPeeneKaBahaanaSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const PaaniPeeneKaBahaanaSong: React.FC<PaaniPeeneKaBahaanaSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/paani_peene_ka_bahaana.mp3",
  coverImageSrc = "covers/paani_peene_ka_bahaana_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Classroom Crush & Corridor Memories",
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
