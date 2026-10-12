import React from "react";
import { Composition } from "remotion";
import { KacchiNeendeinSong } from "./songs/kacchi-neendein/KacchiNeendeinSong";
import rawTimeline from "./songs/kacchi-neendein/timeline.json";
import { TimelineData, getTimelineDuration } from "./engine/types";
import { VIDEO_CONFIG } from "./config/videoConfig";

import { Theme01_MonsoonWindow } from "./themes/lofi/Theme01_MonsoonWindow";
import { Theme02_CassetteRibbon } from "./themes/lofi/Theme02_CassetteRibbon";
import { Theme03_BalconyEmber } from "./themes/lofi/Theme03_BalconyEmber";
import { Theme04_LibraryOrigami } from "./themes/lofi/Theme04_LibraryOrigami";
import { Theme05_TrainWires } from "./themes/lofi/Theme05_TrainWires";
import { Theme06_AquariumGlow } from "./themes/lofi/Theme06_AquariumGlow";
import { Theme07_TerraceBreeze } from "./themes/lofi/Theme07_TerraceBreeze";
import { Theme08_VinylOrbit } from "./themes/lofi/Theme08_VinylOrbit";
import { Theme09_FoggyKettle } from "./themes/lofi/Theme09_FoggyKettle";
import { Theme10_RetroCrtDreams } from "./themes/lofi/Theme10_RetroCrtDreams";
import { LofiThemesShowcase } from "./themes/lofi/LofiThemesShowcase";

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

      {/* 3. Lofi Themes 1-10 (60 FPS, 120 frames each for preview & stills) */}
      <Composition
        id="Theme01-MonsoonWindow"
        component={Theme01_MonsoonWindow}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme02-CassetteRibbon"
        component={Theme02_CassetteRibbon}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme03-BalconyEmber"
        component={Theme03_BalconyEmber}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme04-LibraryOrigami"
        component={Theme04_LibraryOrigami}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme05-TrainWires"
        component={Theme05_TrainWires}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme06-AquariumGlow"
        component={Theme06_AquariumGlow}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme07-TerraceBreeze"
        component={Theme07_TerraceBreeze}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme08-VinylOrbit"
        component={Theme08_VinylOrbit}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme09-FoggyKettle"
        component={Theme09_FoggyKettle}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme10-RetroCrtDreams"
        component={Theme10_RetroCrtDreams}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 4. Master 10-Theme Showcase Sequence (600 frames / 10s @ 60 FPS) */}
      <Composition
        id="Lofi-Themes-Showcase"
        component={LofiThemesShowcase}
        durationInFrames={600}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
    </>
  );
};
