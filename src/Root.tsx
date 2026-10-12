import React from "react";
import { Composition } from "remotion";
import { BotanicalScrapbookSong } from "./songs/kacchi-neendein/BotanicalScrapbookSong";
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

import { Theme11_BotanicalScrapbook } from "./themes/diverse/Theme11_BotanicalScrapbook";
import { Theme12_SwissBrutalism } from "./themes/diverse/Theme12_SwissBrutalism";
import { Theme13_NeonRainPuddle } from "./themes/diverse/Theme13_NeonRainPuddle";
import { Theme14_SufiMandala } from "./themes/diverse/Theme14_SufiMandala";
import { Theme15_FilmBurnCelluloid } from "./themes/diverse/Theme15_FilmBurnCelluloid";
import { Theme16_BlueprintAirplane } from "./themes/diverse/Theme16_BlueprintAirplane";
import { Theme17_HighwayLightTrails } from "./themes/diverse/Theme17_HighwayLightTrails";
import { Theme18_KintsugiGold } from "./themes/diverse/Theme18_KintsugiGold";
import { Theme19_HologramMemoryCube } from "./themes/diverse/Theme19_HologramMemoryCube";
import { Theme20_MilkyWayCampfire } from "./themes/diverse/Theme20_MilkyWayCampfire";

// Derive exact total duration dynamically from the complete timeline
const durationInFrames = getTimelineDuration(rawTimeline as unknown as TimelineData);
const fps = rawTimeline.fps || VIDEO_CONFIG.defaultFps;

export const Root: React.FC = () => {
  return (
    <>
      {/* 1. Official DEFAULT Composition: Botanical Scrapbook Landscape (YouTube / Desktop / TV) */}
      <Composition
        id="KacchiNeendein-Landscape"
        component={BotanicalScrapbookSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 2. Official DEFAULT Composition: Botanical Scrapbook Vertical (Instagram Reels / YouTube Shorts / TikTok) */}
      <Composition
        id="KacchiNeendein-Vertical"
        component={BotanicalScrapbookSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 3. Dark Void Noir Variant (Secondary / Alternative) */}
      <Composition
        id="KacchiNeendein-DarkVoid-Landscape"
        component={KacchiNeendeinSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="KacchiNeendein-DarkVoid-Vertical"
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

      {/* 5. Diverse Aesthetic Themes 11-20 (60 FPS, 120 frames each) */}
      <Composition
        id="Theme11-BotanicalScrapbook"
        component={Theme11_BotanicalScrapbook}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme12-SwissBrutalism"
        component={Theme12_SwissBrutalism}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme13-NeonRainPuddle"
        component={Theme13_NeonRainPuddle}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme14-SufiMandala"
        component={Theme14_SufiMandala}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme15-FilmBurnCelluloid"
        component={Theme15_FilmBurnCelluloid}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme16-BlueprintAirplane"
        component={Theme16_BlueprintAirplane}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme17-HighwayLightTrails"
        component={Theme17_HighwayLightTrails}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme18-KintsugiGold"
        component={Theme18_KintsugiGold}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme19-HologramMemoryCube"
        component={Theme19_HologramMemoryCube}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Theme20-MilkyWayCampfire"
        component={Theme20_MilkyWayCampfire}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
    </>
  );
};
