import React from "react";
import { TimelineData } from "../../engine/types";
import { SongCoverArtworkSong } from "../../themes/cover-art";
import tryingToFitInTimeline from "./timeline.json";

export const TryingToFitInSong: React.FC = () => {
  return (
    <SongCoverArtworkSong
      timeline={tryingToFitInTimeline as unknown as TimelineData}
      audioSrc="audio/trying_to_fit_in.mp3"
      coverImageSrc="covers/trying_to_fit_in_clean_16x9.png"
      lyricsPosition="bottom"
      mood="Introspective Indie Bedroom Ballad"
    />
  );
};
