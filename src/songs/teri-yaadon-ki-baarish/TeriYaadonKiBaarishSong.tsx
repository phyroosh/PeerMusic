import React from "react";
import { TimelineData } from "../../engine/types";
import { PeerMusicStyle03_LiquidSilk } from "../../themes/peermusic-styles";
import radioTimeline from "./timeline_radio.json";

export interface TeriYaadonKiBaarishSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
}

export const TeriYaadonKiBaarishSong: React.FC<TeriYaadonKiBaarishSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/teri_yaadon_ki_baarish_radio.mp3",
  coverImageSrc = "covers/teri_yaadon_ki_baarish_clean_16x9.png",
}) => {
  return (
    <PeerMusicStyle03_LiquidSilk
      timeline={propTimeline || (radioTimeline as unknown as TimelineData)}
      audioSrc={audioSrc}
      coverImageSrc={coverImageSrc}
    />
  );
};
