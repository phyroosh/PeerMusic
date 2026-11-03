import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface KalTakJoRozKaThaSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const KalTakJoRozKaThaSong: React.FC<KalTakJoRozKaThaSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/kal_tak_jo_roz_ka_tha.mp3",
  coverImageSrc = "covers/kal_tak_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "School Farewell & Nostalgic Memories",
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
