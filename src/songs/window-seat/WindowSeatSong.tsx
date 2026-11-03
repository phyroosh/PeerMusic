import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import rawTimeline from "./timeline.json";

export interface WindowSeatSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
  lyricsPosition?: "bottom" | "top" | "center";
  mood?: string;
}

export const WindowSeatSong: React.FC<WindowSeatSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/window_seat.mp3",
  coverImageSrc = "covers/window_seat_clean_16x9.png",
  lyricsPosition = "bottom",
  mood = "Bus Window Reverie & Passing Towns",
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
