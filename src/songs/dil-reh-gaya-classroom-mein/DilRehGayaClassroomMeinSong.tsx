import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface DilRehGayaClassroomMeinSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const DilRehGayaClassroomMeinSong: React.FC<DilRehGayaClassroomMeinSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/dil_reh_gaya_classroom_mein.mp3",
  coverImageSrc = "covers/dil_reh_gaya_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "School Days Nostalgia & Corridor Reverie",
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
