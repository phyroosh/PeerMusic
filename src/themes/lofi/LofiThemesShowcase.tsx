import React from "react";
import { Series } from "remotion";
import { Theme01_MonsoonWindow } from "./Theme01_MonsoonWindow";
import { Theme02_CassetteRibbon } from "./Theme02_CassetteRibbon";
import { Theme03_BalconyEmber } from "./Theme03_BalconyEmber";
import { Theme04_LibraryOrigami } from "./Theme04_LibraryOrigami";
import { Theme05_TrainWires } from "./Theme05_TrainWires";
import { Theme06_AquariumGlow } from "./Theme06_AquariumGlow";
import { Theme07_TerraceBreeze } from "./Theme07_TerraceBreeze";
import { Theme08_VinylOrbit } from "./Theme08_VinylOrbit";
import { Theme09_FoggyKettle } from "./Theme09_FoggyKettle";
import { Theme10_RetroCrtDreams } from "./Theme10_RetroCrtDreams";

export const LofiThemesShowcase: React.FC = () => {
  // Each theme showcased for 60 frames (1 second @ 60 FPS)
  return (
    <Series>
      <Series.Sequence durationInFrames={60}>
        <Theme01_MonsoonWindow />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Theme02_CassetteRibbon />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Theme03_BalconyEmber />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Theme04_LibraryOrigami />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Theme05_TrainWires />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Theme06_AquariumGlow />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Theme07_TerraceBreeze />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Theme08_VinylOrbit />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Theme09_FoggyKettle />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Theme10_RetroCrtDreams />
      </Series.Sequence>
    </Series>
  );
};
