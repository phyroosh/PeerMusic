import React from "react";
import { Composition } from "remotion";
import { BotanicalScrapbookSong } from "./songs/kacchi-neendein/BotanicalScrapbookSong";
import { KacchiNeendeinSong } from "./songs/kacchi-neendein/KacchiNeendeinSong";
import rawTimeline from "./songs/kacchi-neendein/timeline.json";
import { RoughCopySong } from "./songs/rough-copy/RoughCopySong";
import roughCopyTimeline from "./songs/rough-copy/timeline.json";
import { WindowSeatSong } from "./songs/window-seat/WindowSeatSong";
import windowSeatTimeline from "./songs/window-seat/timeline.json";
import { AakhriBenchSong } from "./songs/aakhri-bench/AakhriBenchSong";
import aakhriBenchTimeline from "./songs/aakhri-bench/timeline.json";
import { StudentsLifeSong } from "./songs/students-life/StudentsLifeSong";
import studentsLifeTimeline from "./songs/students-life/timeline.json";
import { PencilKeNishaanSong } from "./songs/pencil-ke-nishaan/PencilKeNishaanSong";
import pencilKeNishaanTimeline from "./songs/pencil-ke-nishaan/timeline.json";
import { KalTakJoRozKaThaSong } from "./songs/kal-tak-jo-roz-ka-tha/KalTakJoRozKaThaSong";
import kalTakTimeline from "./songs/kal-tak-jo-roz-ka-tha/timeline.json";
import { DilRehGayaClassroomMeinSong } from "./songs/dil-reh-gaya-classroom-mein/DilRehGayaClassroomMeinSong";
import dilRehGayaTimeline from "./songs/dil-reh-gaya-classroom-mein/timeline.json";
import { PaaniPeeneKaBahaanaSong } from "./songs/paani-peene-ka-bahaana/PaaniPeeneKaBahaanaSong";
import paaniPeeneTimeline from "./songs/paani-peene-ka-bahaana/timeline.json";
import { KhumaarSong } from "./songs/khumaar/KhumaarSong";
import khumaarTimeline from "./songs/khumaar/timeline.json";
import { GoldenHourLettersSong } from "./songs/golden-hour-letters/GoldenHourLettersSong";
import goldenHourLettersTimeline from "./songs/golden-hour-letters/timeline.json";
import { BetweenThePagesSong } from "./songs/between-the-pages/BetweenThePagesSong";
import betweenThePagesTimeline from "./songs/between-the-pages/timeline.json";
import { TryingToFitInSong } from "./songs/trying-to-fit-in/TryingToFitInSong";
import tryingToFitInTimeline from "./songs/trying-to-fit-in/timeline.json";
import { KoreMarginSong } from "./songs/kore-margin/KoreMarginSong";
import koreMarginTimeline from "./songs/kore-margin/timeline.json";
import koreMarginRadioTimeline from "./songs/kore-margin/timeline_radio.json";
import { SchoolWaliCrushSong } from "./songs/school-wali-crush/SchoolWaliCrushSong";
import schoolWaliCrushTimeline from "./songs/school-wali-crush/timeline.json";
import schoolWaliCrushRadioTimeline from "./songs/school-wali-crush/timeline_radio.json";
import { SunoMereDilKiSong } from "./songs/suno-mere-dil-ki/SunoMereDilKiSong";
import sunoMereDilKiTimeline from "./songs/suno-mere-dil-ki/timeline.json";
import { TuMileNaMileSong } from "./songs/tu-mile-na-mile/TuMileNaMileSong";
import tuMileNaMileTimeline from "./songs/tu-mile-na-mile/timeline.json";
import tuMileNaMileRadioTimeline from "./songs/tu-mile-na-mile/timeline_radio.json";
import { TeriYaadonKiBaarishSong } from "./songs/teri-yaadon-ki-baarish/TeriYaadonKiBaarishSong";
import teriYaadonKiBaarishTimeline from "./songs/teri-yaadon-ki-baarish/timeline.json";
import teriYaadonKiBaarishRadioTimeline from "./songs/teri-yaadon-ki-baarish/timeline_radio.json";
import { TuEkSukoonSaLagtaHaiSong } from "./songs/tu-ek-sukoon-sa-lagta-hai/TuEkSukoonSaLagtaHaiSong";
import tuEkSukoonTimeline from "./songs/tu-ek-sukoon-sa-lagta-hai/timeline.json";
import tuEkSukoonRadioTimeline from "./songs/tu-ek-sukoon-sa-lagta-hai/timeline_radio.json";
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
import {
  Style01_MidnightCinematicFilm,
  Style02_NeonNoirRain,
  Style03_SwissBrutalistMotion,
  Style04_RetroCrtDreamcore,
  Style05_CelestialEclipse,
  Style06_LiquidChrome,
  Style07_VinylOrbit,
  Style08_SubmergedCaustics,
  Style09_MinimalistLofiSunset,
  Style10_VolumetricLaserConcert,
} from "./themes/candidates";

import { CelestialEclipseSong } from "./themes/celestial";
import { SongCoverArtworkSong } from "./themes/cover-art";
import {
  PeerMusicStyle01_CrimsonVelvet,
  PeerMusicStyle02_NeonPulse,
  PeerMusicStyle03_LiquidSilk,
} from "./themes/peermusic-styles";
import dilRehGayaDevanagariTimeline from "./songs/dil-reh-gaya-classroom-mein/timeline_devanagari.json";

// Derive exact total duration dynamically from the complete timeline
const durationInFrames = getTimelineDuration(rawTimeline as unknown as TimelineData);
const fps = rawTimeline.fps || VIDEO_CONFIG.defaultFps;

const roughCopyDurationInFrames = getTimelineDuration(roughCopyTimeline as unknown as TimelineData);
const roughCopyFps = roughCopyTimeline.fps || VIDEO_CONFIG.defaultFps;

const windowSeatDurationInFrames = getTimelineDuration(windowSeatTimeline as unknown as TimelineData);
const windowSeatFps = windowSeatTimeline.fps || VIDEO_CONFIG.defaultFps;

const aakhriBenchDurationInFrames = getTimelineDuration(aakhriBenchTimeline as unknown as TimelineData);
const aakhriBenchFps = aakhriBenchTimeline.fps || VIDEO_CONFIG.defaultFps;

const studentsLifeDurationInFrames = getTimelineDuration(studentsLifeTimeline as unknown as TimelineData);
const studentsLifeFps = studentsLifeTimeline.fps || VIDEO_CONFIG.defaultFps;

const pencilKeNishaanDurationInFrames = getTimelineDuration(pencilKeNishaanTimeline as unknown as TimelineData);
const pencilKeNishaanFps = pencilKeNishaanTimeline.fps || VIDEO_CONFIG.defaultFps;

const kalTakDurationInFrames = getTimelineDuration(kalTakTimeline as unknown as TimelineData);
const kalTakFps = kalTakTimeline.fps || VIDEO_CONFIG.defaultFps;

const dilRehGayaDurationInFrames = getTimelineDuration(dilRehGayaTimeline as unknown as TimelineData);
const dilRehGayaFps = dilRehGayaTimeline.fps || VIDEO_CONFIG.defaultFps;

const paaniPeeneDurationInFrames = getTimelineDuration(paaniPeeneTimeline as unknown as TimelineData);
const paaniPeeneFps = paaniPeeneTimeline.fps || VIDEO_CONFIG.defaultFps;

const khumaarDurationInFrames = getTimelineDuration(khumaarTimeline as unknown as TimelineData);
const khumaarFps = khumaarTimeline.fps || VIDEO_CONFIG.defaultFps;

const goldenHourLettersDurationInFrames = getTimelineDuration(goldenHourLettersTimeline as unknown as TimelineData);
const goldenHourLettersFps = goldenHourLettersTimeline.fps || VIDEO_CONFIG.defaultFps;

const betweenThePagesDurationInFrames = getTimelineDuration(betweenThePagesTimeline as unknown as TimelineData);
const betweenThePagesFps = betweenThePagesTimeline.fps || VIDEO_CONFIG.defaultFps;

const tryingToFitInDurationInFrames = getTimelineDuration(tryingToFitInTimeline as unknown as TimelineData);
const tryingToFitInFps = tryingToFitInTimeline.fps || VIDEO_CONFIG.defaultFps;

const koreMarginDurationInFrames = getTimelineDuration(koreMarginTimeline as unknown as TimelineData);
const koreMarginFps = koreMarginTimeline.fps || VIDEO_CONFIG.defaultFps;

const koreMarginRadioDurationInFrames = getTimelineDuration(koreMarginRadioTimeline as unknown as TimelineData);
const koreMarginRadioFps = koreMarginRadioTimeline.fps || VIDEO_CONFIG.defaultFps;

const schoolWaliCrushDurationInFrames = getTimelineDuration(schoolWaliCrushTimeline as unknown as TimelineData);
const schoolWaliCrushFps = schoolWaliCrushTimeline.fps || VIDEO_CONFIG.defaultFps;

const schoolWaliCrushRadioDurationInFrames = getTimelineDuration(schoolWaliCrushRadioTimeline as unknown as TimelineData);
const schoolWaliCrushRadioFps = schoolWaliCrushRadioTimeline.fps || VIDEO_CONFIG.defaultFps;

const sunoMereDilKiDurationInFrames = getTimelineDuration(sunoMereDilKiTimeline as unknown as TimelineData);
const sunoMereDilKiFps = sunoMereDilKiTimeline.fps || VIDEO_CONFIG.defaultFps;

const tuMileNaMileDurationInFrames = getTimelineDuration(tuMileNaMileTimeline as unknown as TimelineData);
const tuMileNaMileFps = tuMileNaMileTimeline.fps || VIDEO_CONFIG.defaultFps;

const tuMileNaMileRadioDurationInFrames = getTimelineDuration(tuMileNaMileRadioTimeline as unknown as TimelineData);
const tuMileNaMileRadioFps = tuMileNaMileRadioTimeline.fps || VIDEO_CONFIG.defaultFps;

const teriYaadonKiBaarishDurationInFrames = getTimelineDuration(teriYaadonKiBaarishTimeline as unknown as TimelineData);
const teriYaadonKiBaarishFps = teriYaadonKiBaarishTimeline.fps || VIDEO_CONFIG.defaultFps;

const teriYaadonKiBaarishRadioDurationInFrames = getTimelineDuration(teriYaadonKiBaarishRadioTimeline as unknown as TimelineData);
const teriYaadonKiBaarishRadioFps = teriYaadonKiBaarishRadioTimeline.fps || VIDEO_CONFIG.defaultFps;

const tuEkSukoonDurationInFrames = getTimelineDuration(tuEkSukoonTimeline as unknown as TimelineData);
const tuEkSukoonFps = tuEkSukoonTimeline.fps || VIDEO_CONFIG.defaultFps;

const tuEkSukoonRadioDurationInFrames = getTimelineDuration(tuEkSukoonRadioTimeline as unknown as TimelineData);
const tuEkSukoonRadioFps = tuEkSukoonRadioTimeline.fps || VIDEO_CONFIG.defaultFps;

// Dynamic Song Cover Artwork Default Theme Song Wrappers
const TryingToFitInCoverSong: React.FC = () => (
  <SongCoverArtworkSong
    timeline={tryingToFitInTimeline as unknown as TimelineData}
    audioSrc="audio/trying_to_fit_in.mp3"
    coverImageSrc="covers/trying_to_fit_in_clean_16x9.png"
    lyricsPosition="bottom"
    mood="Introspective Indie Bedroom Ballad"
  />
);

const TryingToFitInCelestialSong: React.FC = () => (
  <CelestialEclipseSong
    timeline={tryingToFitInTimeline as unknown as TimelineData}
    audioSrc="audio/trying_to_fit_in.mp3"
  />
);

const BetweenThePagesCoverSong: React.FC = () => (
  <SongCoverArtworkSong
    timeline={betweenThePagesTimeline as unknown as TimelineData}
    audioSrc="audio/between_the_pages.mp3"
    coverImageSrc="covers/between_the_pages_clean_16x9.png"
    lyricsPosition="bottom"
    mood="Quiet Library Romance"
  />
);

const KacchiNeendeinCoverSong: React.FC = () => (
  <SongCoverArtworkSong
    timeline={rawTimeline as unknown as TimelineData}
    audioSrc="audio/kacchi_neendein.mp3"
    coverImageSrc="covers/kacchi_neendein_clean_16x9.png"
    lyricsPosition="bottom"
    mood="Late Night Urban Ambition"
  />
);

const DilRehGayaDevanagariCoverSong: React.FC = () => (
  <SongCoverArtworkSong
    timeline={dilRehGayaDevanagariTimeline as unknown as TimelineData}
    audioSrc="audio/dil_reh_gaya_classroom_mein.mp3"
    coverImageSrc="covers/dil_reh_gaya_clean_16x9.png"
    lyricsPosition="bottom"
    mood="School Nostalgia"
  />
);

// Celestial Eclipse Optional Theme Song Wrappers
const BetweenThePagesCelestialSong: React.FC = () => (
  <CelestialEclipseSong
    timeline={betweenThePagesTimeline as unknown as TimelineData}
    audioSrc="audio/between_the_pages.mp3"
  />
);

const KacchiNeendeinCelestialSong: React.FC = () => (
  <CelestialEclipseSong
    timeline={rawTimeline as unknown as TimelineData}
    audioSrc="audio/kacchi_neendein.mp3"
  />
);

const DilRehGayaDevanagariCelestialSong: React.FC = () => (
  <CelestialEclipseSong
    timeline={dilRehGayaDevanagariTimeline as unknown as TimelineData}
    audioSrc="audio/dil_reh_gaya_classroom_mein.mp3"
  />
);

export const Root: React.FC = () => {
  return (
    <>
      {/* 0. Teri Yaadon Ki Baarish (तेरी यादों की बारिश - Late-Night Soulful Bollywood Indie Ballad): Master Landscape (16:9 60 FPS) */}
      <Composition
        id="TeriYaadonKiBaarish-Landscape"
        component={() => (
          <TeriYaadonKiBaarishSong
            timeline={teriYaadonKiBaarishTimeline as unknown as TimelineData}
            audioSrc="audio/teri_yaadon_ki_baarish.mp3"
          />
        )}
        durationInFrames={teriYaadonKiBaarishDurationInFrames}
        fps={teriYaadonKiBaarishFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Teri Yaadon Ki Baarish (तेरी यादों की बारिश): Master Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="TeriYaadonKiBaarish-Vertical"
        component={() => (
          <TeriYaadonKiBaarishSong
            timeline={teriYaadonKiBaarishTimeline as unknown as TimelineData}
            audioSrc="audio/teri_yaadon_ki_baarish.mp3"
          />
        )}
        durationInFrames={teriYaadonKiBaarishDurationInFrames}
        fps={teriYaadonKiBaarishFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Teri Yaadon Ki Baarish (Radio Edit: <= 3:00 / 176.5s 60 FPS Compliant Landscape) */}
      <Composition
        id="TeriYaadonKiBaarish-Radio-Landscape"
        component={() => (
          <TeriYaadonKiBaarishSong
            timeline={teriYaadonKiBaarishRadioTimeline as unknown as TimelineData}
            audioSrc="audio/teri_yaadon_ki_baarish_radio.mp3"
          />
        )}
        durationInFrames={teriYaadonKiBaarishRadioDurationInFrames}
        fps={teriYaadonKiBaarishRadioFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Teri Yaadon Ki Baarish (Radio Edit: <= 3:00 / 176.5s 60 FPS Compliant Vertical) */}
      <Composition
        id="TeriYaadonKiBaarish-Radio-Vertical"
        component={() => (
          <TeriYaadonKiBaarishSong
            timeline={teriYaadonKiBaarishRadioTimeline as unknown as TimelineData}
            audioSrc="audio/teri_yaadon_ki_baarish_radio.mp3"
          />
        )}
        durationInFrames={teriYaadonKiBaarishRadioDurationInFrames}
        fps={teriYaadonKiBaarishRadioFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Tu Ek Sukoon Sa Lagta Hai (तू एक सुकून सा लगता है - Late-Night Cozy Monsoon Hindi Ballad): Master Landscape (16:9 60 FPS) */}
      <Composition
        id="TuEkSukoonSaLagtaHai-Landscape"
        component={TuEkSukoonSaLagtaHaiSong}
        durationInFrames={tuEkSukoonDurationInFrames}
        fps={tuEkSukoonFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Tu Ek Sukoon Sa Lagta Hai (तू एक सुकून सा लगता है): Master Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="TuEkSukoonSaLagtaHai-Vertical"
        component={TuEkSukoonSaLagtaHaiSong}
        durationInFrames={tuEkSukoonDurationInFrames}
        fps={tuEkSukoonFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Tu Ek Sukoon Sa Lagta Hai (Radio Edit: <= 3:00 / 172.67s 60 FPS Compliant) */}
      <Composition
        id="TuEkSukoonSaLagtaHai-Radio-Landscape"
        component={() => (
          <TuEkSukoonSaLagtaHaiSong
            timeline={tuEkSukoonRadioTimeline as unknown as TimelineData}
            audioSrc="audio/tu_ek_sukoon_sa_lagta_hai_radio.mp3"
          />
        )}
        durationInFrames={tuEkSukoonRadioDurationInFrames}
        fps={tuEkSukoonRadioFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Tu Mile Na Mile (तू मिले ना मिले - Late-Night Soulful Bollywood Indie Ballad): Master Landscape (16:9 60 FPS) */}
      <Composition
        id="TuMileNaMile-Landscape"
        component={TuMileNaMileSong}
        durationInFrames={tuMileNaMileDurationInFrames}
        fps={tuMileNaMileFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Tu Mile Na Mile (तू मिले ना मिले): Master Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="TuMileNaMile-Vertical"
        component={TuMileNaMileSong}
        durationInFrames={tuMileNaMileDurationInFrames}
        fps={tuMileNaMileFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Tu Mile Na Mile (Radio Edit: <= 3:00 / 176.5s 60 FPS Compliant) */}
      <Composition
        id="TuMileNaMile-Radio-Landscape"
        component={() => (
          <TuMileNaMileSong
            timeline={tuMileNaMileRadioTimeline as unknown as TimelineData}
            audioSrc="audio/tu_mile_na_mile_radio.mp3"
          />
        )}
        durationInFrames={tuMileNaMileRadioDurationInFrames}
        fps={tuMileNaMileRadioFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Suno Mere Dil Ki (सुनो मेरे दिल की - Bollywood Romantic Ballad): Master Landscape (16:9 60 FPS) */}
      <Composition
        id="SunoMereDilKi-Landscape"
        component={SunoMereDilKiSong}
        durationInFrames={sunoMereDilKiDurationInFrames}
        fps={sunoMereDilKiFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Suno Mere Dil Ki (सुनो मेरे दिल की): Master Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="SunoMereDilKi-Vertical"
        component={SunoMereDilKiSong}
        durationInFrames={sunoMereDilKiDurationInFrames}
        fps={sunoMereDilKiFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. School Wali Crush (स्कूल वाली क्रश - Romantic Bollywood Indie): Master Landscape (16:9 60 FPS) */}
      <Composition
        id="SchoolWaliCrush-Landscape"
        component={SchoolWaliCrushSong}
        durationInFrames={schoolWaliCrushDurationInFrames}
        fps={schoolWaliCrushFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. School Wali Crush (स्कूल वाली क्रश): Master Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="SchoolWaliCrush-Vertical"
        component={SchoolWaliCrushSong}
        durationInFrames={schoolWaliCrushDurationInFrames}
        fps={schoolWaliCrushFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. School Wali Crush (Radio Edit: <= 3:00 / 176.5s 60 FPS Compliant) */}
      <Composition
        id="SchoolWaliCrush-Radio-Landscape"
        component={() => (
          <SchoolWaliCrushSong
            timeline={schoolWaliCrushRadioTimeline as unknown as TimelineData}
            audioSrc="audio/school_wali_crush_radio.mp3"
          />
        )}
        durationInFrames={schoolWaliCrushRadioDurationInFrames}
        fps={schoolWaliCrushRadioFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. School Wali Crush (Radio Edit Vertical: <= 3:00 / 176.5s 60 FPS Compliant) */}
      <Composition
        id="SchoolWaliCrush-Radio-Vertical"
        component={() => (
          <SchoolWaliCrushSong
            timeline={schoolWaliCrushRadioTimeline as unknown as TimelineData}
            audioSrc="audio/school_wali_crush_radio.mp3"
          />
        )}
        durationInFrames={schoolWaliCrushRadioDurationInFrames}
        fps={schoolWaliCrushRadioFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Trying to Fit In (English Dreamy Indie Pop): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="TryingToFitIn-Landscape"
        component={TryingToFitInCoverSong}
        durationInFrames={tryingToFitInDurationInFrames}
        fps={tryingToFitInFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Trying to Fit In (English Dreamy Indie Pop): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="TryingToFitIn-Vertical"
        component={TryingToFitInCoverSong}
        durationInFrames={tryingToFitInDurationInFrames}
        fps={tryingToFitInFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Trying to Fit In (Optional Explicit Theme: Celestial Eclipse Landscape) */}
      <Composition
        id="TryingToFitIn-Celestial-Landscape"
        component={TryingToFitInCelestialSong}
        durationInFrames={tryingToFitInDurationInFrames}
        fps={tryingToFitInFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Trying to Fit In (Optional Explicit Theme: Celestial Eclipse Vertical) */}
      <Composition
        id="TryingToFitIn-Celestial-Vertical"
        component={TryingToFitInCelestialSong}
        durationInFrames={tryingToFitInDurationInFrames}
        fps={tryingToFitInFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Kore Margin (Soulful Student Life Indie Ballad): Master Landscape (16:9 60 FPS) */}
      <Composition
        id="KoreMargin-Landscape"
        component={KoreMarginSong}
        durationInFrames={koreMarginDurationInFrames}
        fps={koreMarginFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Kore Margin (Soulful Student Life Indie Ballad): Master Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="KoreMargin-Vertical"
        component={KoreMarginSong}
        durationInFrames={koreMarginDurationInFrames}
        fps={koreMarginFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Kore Margin (Strict Radio Cut: <= 3:00 / 176.5s 60 FPS) */}
      <Composition
        id="KoreMargin-Radio-Landscape"
        component={() => (
          <KoreMarginSong
            timeline={koreMarginRadioTimeline as unknown as TimelineData}
            audioSrc="audio/kore_margin_radio.mp3"
          />
        )}
        durationInFrames={koreMarginRadioDurationInFrames}
        fps={koreMarginRadioFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Between the Pages (English Bedroom Pop / Library Crush): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="BetweenThePages-Landscape"
        component={BetweenThePagesCoverSong}
        durationInFrames={betweenThePagesDurationInFrames}
        fps={betweenThePagesFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Between the Pages (English Bedroom Pop / Library Crush): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="BetweenThePages-Vertical"
        component={BetweenThePagesCoverSong}
        durationInFrames={betweenThePagesDurationInFrames}
        fps={betweenThePagesFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Between the Pages (Optional Explicit Theme: Celestial Eclipse Landscape) */}
      <Composition
        id="BetweenThePages-Celestial-Landscape"
        component={BetweenThePagesCelestialSong}
        durationInFrames={betweenThePagesDurationInFrames}
        fps={betweenThePagesFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Between the Pages (Optional Explicit Theme: Celestial Eclipse Vertical) */}
      <Composition
        id="BetweenThePages-Celestial-Vertical"
        component={BetweenThePagesCelestialSong}
        durationInFrames={betweenThePagesDurationInFrames}
        fps={betweenThePagesFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Between the Pages (Alternative Explicit Theme: Botanical Scrapbook Landscape) */}
      <Composition
        id="BetweenThePages-Botanical-Landscape"
        component={BetweenThePagesSong}
        durationInFrames={betweenThePagesDurationInFrames}
        fps={betweenThePagesFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Between the Pages (Alternative Explicit Theme: Botanical Scrapbook Vertical) */}
      <Composition
        id="BetweenThePages-Botanical-Vertical"
        component={BetweenThePagesSong}
        durationInFrames={betweenThePagesDurationInFrames}
        fps={betweenThePagesFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />
      {/* 0. Golden Hour Letters (English Dreamy Indie Pop Ballad): Landscape (16:9 60 FPS) */}
      <Composition
        id="GoldenHourLetters-Landscape"
        component={GoldenHourLettersSong}
        durationInFrames={goldenHourLettersDurationInFrames}
        fps={goldenHourLettersFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Golden Hour Letters (English Dreamy Indie Pop Ballad): Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="GoldenHourLetters-Vertical"
        component={GoldenHourLettersSong}
        durationInFrames={goldenHourLettersDurationInFrames}
        fps={goldenHourLettersFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Khumaar (Late Night Acoustic Indie Ballad): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="Khumaar-Landscape"
        component={KhumaarSong}
        durationInFrames={khumaarDurationInFrames}
        fps={khumaarFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Khumaar (Late Night Acoustic Indie Ballad): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="Khumaar-Vertical"
        component={KhumaarSong}
        durationInFrames={khumaarDurationInFrames}
        fps={khumaarFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Paani Peene Ka Bahaana (School Crush Ballad): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="PaaniPeeneKaBahaana-Landscape"
        component={PaaniPeeneKaBahaanaSong}
        durationInFrames={paaniPeeneDurationInFrames}
        fps={paaniPeeneFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Paani Peene Ka Bahaana (School Crush Ballad): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="PaaniPeeneKaBahaana-Vertical"
        component={PaaniPeeneKaBahaanaSong}
        durationInFrames={paaniPeeneDurationInFrames}
        fps={paaniPeeneFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Dil Reh Gaya Classroom Mein (School Nostalgia Ballad): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="DilRehGayaClassroomMein-Landscape"
        component={DilRehGayaClassroomMeinSong}
        durationInFrames={dilRehGayaDurationInFrames}
        fps={dilRehGayaFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Dil Reh Gaya Classroom Mein (School Nostalgia Ballad): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="DilRehGayaClassroomMein-Vertical"
        component={DilRehGayaClassroomMeinSong}
        durationInFrames={dilRehGayaDurationInFrames}
        fps={dilRehGayaFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Kal Tak Jo Roz Ka Tha (School Nostalgia Ballad): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="KalTakJoRozKaTha-Landscape"
        component={KalTakJoRozKaThaSong}
        durationInFrames={kalTakDurationInFrames}
        fps={kalTakFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Kal Tak Jo Roz Ka Tha (School Nostalgia Ballad): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="KalTakJoRozKaTha-Vertical"
        component={KalTakJoRozKaThaSong}
        durationInFrames={kalTakDurationInFrames}
        fps={kalTakFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Pencil Ke Nishaan (School Crush Ballad): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="PencilKeNishaan-Landscape"
        component={PencilKeNishaanSong}
        durationInFrames={pencilKeNishaanDurationInFrames}
        fps={pencilKeNishaanFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Pencil Ke Nishaan (School Crush Ballad): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="PencilKeNishaan-Vertical"
        component={PencilKeNishaanSong}
        durationInFrames={pencilKeNishaanDurationInFrames}
        fps={pencilKeNishaanFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Class Ke Baad (Student Life): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="StudentsLife-Landscape"
        component={StudentsLifeSong}
        durationInFrames={studentsLifeDurationInFrames}
        fps={studentsLifeFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Class Ke Baad (Student Life): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="StudentsLife-Vertical"
        component={StudentsLifeSong}
        durationInFrames={studentsLifeDurationInFrames}
        fps={studentsLifeFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 0. Aakhri Bench (Yaari Aur Khwaab): Student Anthem Landscape (16:9 60 FPS) */}
      <Composition
        id="AakhriBench-Landscape"
        component={AakhriBenchSong}
        durationInFrames={aakhriBenchDurationInFrames}
        fps={aakhriBenchFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Aakhri Bench (Yaari Aur Khwaab): Student Anthem Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="AakhriBench-Vertical"
        component={AakhriBenchSong}
        durationInFrames={aakhriBenchDurationInFrames}
        fps={aakhriBenchFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 1. Window Seat (Safar Aur Yaadein): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="WindowSeat-Landscape"
        component={WindowSeatSong}
        durationInFrames={windowSeatDurationInFrames}
        fps={windowSeatFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 0. Window Seat (Safar Aur Yaadein): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="WindowSeat-Vertical"
        component={WindowSeatSong}
        durationInFrames={windowSeatDurationInFrames}
        fps={windowSeatFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 1. Rough Copy (School Crush Song): Official DEFAULT Song Cover Art Landscape (16:9 60 FPS) */}
      <Composition
        id="RoughCopy-Landscape"
        component={RoughCopySong}
        durationInFrames={roughCopyDurationInFrames}
        fps={roughCopyFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />


      {/* 0. Rough Copy (School Crush Song): Official DEFAULT Song Cover Art Vertical (9:16 60 FPS Reels/Shorts) */}
      <Composition
        id="RoughCopy-Vertical"
        component={RoughCopySong}
        durationInFrames={roughCopyDurationInFrames}
        fps={roughCopyFps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />
      {/* 1. Official DEFAULT Composition: Dynamic Song Cover Artwork Landscape (Flagship Hindi Music Video) */}
      <Composition
        id="KacchiNeendein-Landscape"
        component={KacchiNeendeinCoverSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* 2. Official DEFAULT Composition: Dynamic Song Cover Artwork Vertical (Flagship Hindi Shorts/Reels) */}
      <Composition
        id="KacchiNeendein-Vertical"
        component={KacchiNeendeinCoverSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* 2b. Hindi Devanagari Script Composition: Dynamic Song Cover Artwork Landscape */}
      <Composition
        id="DilRehGaya-Devanagari-Landscape"
        component={DilRehGayaDevanagariCoverSong}
        durationInFrames={dilRehGayaDurationInFrames}
        fps={dilRehGayaFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* Optional Theme: Celestial Eclipse Landscape */}
      <Composition
        id="KacchiNeendein-Celestial-Landscape"
        component={KacchiNeendeinCelestialSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* Optional Theme: Celestial Eclipse Vertical */}
      <Composition
        id="KacchiNeendein-Celestial-Vertical"
        component={KacchiNeendeinCelestialSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.vertical.width}
        height={VIDEO_CONFIG.vertical.height}
      />

      {/* Optional Theme: Dil Reh Gaya Devanagari Celestial Eclipse Landscape */}
      <Composition
        id="DilRehGaya-Devanagari-Celestial-Landscape"
        component={DilRehGayaDevanagariCelestialSong}
        durationInFrames={dilRehGayaDurationInFrames}
        fps={dilRehGayaFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* Alternative Explicit Theme: Botanical Scrapbook Landscape */}
      <Composition
        id="KacchiNeendein-Botanical-Landscape"
        component={BotanicalScrapbookSong}
        durationInFrames={durationInFrames}
        fps={fps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* Alternative Explicit Theme: Botanical Scrapbook Vertical */}
      <Composition
        id="KacchiNeendein-Botanical-Vertical"
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

      {/* 10 Visual Style Candidates for PeerMusic Default Lyrical Theme */}
      <Composition
        id="Candidate01-MidnightFilm"
        component={Style01_MidnightCinematicFilm}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Candidate02-NeonNoirRain"
        component={Style02_NeonNoirRain}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Candidate03-SwissBrutalist"
        component={Style03_SwissBrutalistMotion}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Candidate04-RetroCrtDreamcore"
        component={Style04_RetroCrtDreamcore}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Candidate05-CelestialEclipse"
        component={Style05_CelestialEclipse}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Candidate06-LiquidChrome"
        component={Style06_LiquidChrome}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Candidate07-VinylOrbit"
        component={Style07_VinylOrbit}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Candidate08-SubmergedCaustics"
        component={Style08_SubmergedCaustics}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Candidate09-MinimalistSunset"
        component={Style09_MinimalistLofiSunset}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="Candidate10-VolumetricLaser"
        component={Style10_VolumetricLaserConcert}
        durationInFrames={120}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />

      {/* --- PEER MUSIC BRANDED 10-SECOND STYLE EXAMPLES --- */}
      <Composition
        id="PeerMusic-Style01-CrimsonVelvet"
        component={PeerMusicStyle01_CrimsonVelvet}
        durationInFrames={600}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="PeerMusic-Style02-NeonPulse"
        component={PeerMusicStyle02_NeonPulse}
        durationInFrames={600}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
      <Composition
        id="PeerMusic-Style03-LiquidSilk"
        component={PeerMusicStyle03_LiquidSilk}
        durationInFrames={600}
        fps={VIDEO_CONFIG.defaultFps}
        width={VIDEO_CONFIG.landscape.width}
        height={VIDEO_CONFIG.landscape.height}
      />
    </>
  );
};
