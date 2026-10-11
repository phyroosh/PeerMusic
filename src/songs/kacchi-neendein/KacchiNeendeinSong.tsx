import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import rawTimeline from "./timeline.json";
import { TimelineData, SceneConfig } from "../../engine/types";
import { applyOverridesAndValidate } from "../../engine/validation";
import { CameraRig } from "../../engine/camera/CameraRig";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";
import { EditorialHUD } from "../../engine/typography/EditorialHUD";
import { Scene01_IntroTitle } from "./scenes/Scene01_IntroTitle";
import { Scene02_ChaiLadaai } from "./scenes/Scene02_ChaiLadaai";
import { Scene03_NeendeinHook } from "./scenes/Scene03_NeendeinHook";
import { VIDEO_CONFIG } from "../../config/videoConfig";

// Validate timeline & apply overrides at module load
const validation = applyOverridesAndValidate(rawTimeline as unknown as TimelineData);
const timeline = validation.timeline;

export const KacchiNeendeinSong: React.FC = () => {
  const frame = useCurrentFrame();

  // Find currently active scene for HUD telemetry
  const activeScene: SceneConfig | undefined = timeline.scenes.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );
  const activeTag = activeScene ? activeScene.sectionTag : "01 // INTRO";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: VIDEO_CONFIG.colors.background,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Cinematic 2.5D Camera Drift */}
      <CameraRig zoomScale={1.05} driftRangeX={20} driftRangeY={-12}>
        {/* 2. Scene 01: Intro Title (0 - 90 frames) */}
        <Sequence from={timeline.scenes[0].startFrame} durationInFrames={timeline.scenes[0].endFrame - timeline.scenes[0].startFrame}>
          <Scene01_IntroTitle scene={timeline.scenes[0]} />
        </Sequence>

        {/* 3. Scene 02: 2 AM Chai & Dosti (90 - 270 frames) */}
        <Sequence from={timeline.scenes[1].startFrame} durationInFrames={timeline.scenes[1].endFrame - timeline.scenes[1].startFrame}>
          <Scene02_ChaiLadaai scene={timeline.scenes[1]} />
        </Sequence>

        {/* 4. Scene 03: Hook Climax (270 - 480 frames) */}
        <Sequence from={timeline.scenes[2].startFrame} durationInFrames={timeline.scenes[2].endFrame - timeline.scenes[2].startFrame}>
          <Scene03_NeendeinHook scene={timeline.scenes[2]} />
        </Sequence>
      </CameraRig>

      {/* 5. Polish Layer: 35mm Film Grain & Ambient Embers */}
      <FilmAtmosphere dustCount={20} vignetteStrength={0.6} />

      {/* 6. Polish Layer: Swiss Editorial Telemetry HUD */}
      <EditorialHUD
        sectionTag={activeTag}
        bpm={timeline.bpm || 86}
        trackTitle="KACCHI NEENDEIN"
        opacity={0.3}
      />
    </div>
  );
};
