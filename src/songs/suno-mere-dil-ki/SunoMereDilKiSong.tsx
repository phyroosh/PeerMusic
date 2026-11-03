import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface SunoMereDilKiSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const SunoMereDilKiSong: React.FC<SunoMereDilKiSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/suno_mere_dil_ki.mp3",
  coverImageSrc = "covers/suno_mere_dil_ki_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Bollywood Romantic Ballad",
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
