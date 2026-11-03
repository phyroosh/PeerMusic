import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface KhumaarSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const KhumaarSong: React.FC<KhumaarSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/khumaar.mp3",
  coverImageSrc = "covers/khumaar_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Late Night Acoustic Romance",
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
