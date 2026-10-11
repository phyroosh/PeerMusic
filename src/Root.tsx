import React from "react";
import { Composition } from "remotion";
import { KacchiNeendeinSong } from "./songs/kacchi-neendein/KacchiNeendeinSong";
import rawTimeline from "./songs/kacchi-neendein/timeline.json";
import { TimelineData, getTimelineDuration } from "./engine/types";
import { VIDEO_CONFIG } from "./config/videoConfig";

// Derive exact total duration dynamically from the complete timeline
const durationInFrames = getTimelineDuration(rawTimeline as unknown as TimelineData);
const fps = rawTimeline.fps || VIDEO_CONFIG.defaultFps;

export const Root: React.FC = () => {
  return (
    <>
      {/* 1. Master 16:9 Landscape Composition (YouTube / Desktop / TV) */}
      <Composition
        id="KacchiNeendein-Landscape"
        component={KacchiNeendeinSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 2. Master 9:16 Vertical Composition (Instagram Reels / YouTube Shorts / TikTok) */}
      <Composition
        id="KacchiNeendein-Vertical"
        component={KacchiNeendeinSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />
    </>
  );
};
