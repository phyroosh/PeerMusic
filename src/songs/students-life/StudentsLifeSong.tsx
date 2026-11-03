import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface StudentsLifeSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const StudentsLifeSong: React.FC<StudentsLifeSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/students_life.mp3",
  coverImageSrc = "covers/students_life_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Student Life & Hostel Memories",
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
