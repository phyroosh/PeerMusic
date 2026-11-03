import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface SchoolWaliCrushSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const SchoolWaliCrushSong: React.FC<SchoolWaliCrushSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/school_wali_crush.mp3",
  coverImageSrc = "covers/school_wali_crush_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Acoustic Bollywood Pop Romance",
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
