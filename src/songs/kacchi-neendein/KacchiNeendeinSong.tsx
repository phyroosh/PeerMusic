import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import rawTimeline from "./timeline.json";
import { TimelineData, SceneConfig } from "../../engine/types";
import { applyOverridesAndValidate } from "../../engine/validation";
import { CameraRig } from "../../engine/camera/CameraRig";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";
import { PaperTexture } from "../../engine/camera/PaperTexture";
import { Scene01_IntroTitle } from "./scenes/Scene01_IntroTitle";
import { Scene02_ChaiLadaai } from "./scenes/Scene02_ChaiLadaai";
import { Scene03_UmeedonPanne } from "./scenes/Scene03_UmeedonPanne";
import { Scene04_NeendeinHook } from "./scenes/Scene04_NeendeinHook";
import { Scene05_InterludeOne } from "./scenes/Scene05_InterludeOne";
import { Scene06_SyllabusDeadline } from "./scenes/Scene06_SyllabusDeadline";
import { Scene07_MukhdaReprise } from "./scenes/Scene07_MukhdaReprise";
import { Scene08_InterludeTwo } from "./scenes/Scene08_InterludeTwo";
import { Scene09_MaaCallAansu } from "./scenes/Scene09_MaaCallAansu";
import { Scene10_HostelRooftopOutro } from "./scenes/Scene10_HostelRooftopOutro";
import { VIDEO_CONFIG } from "../../config/videoConfig";

// Validate timeline & apply overrides at module load
const validation = applyOverridesAndValidate(rawTimeline as unknown as TimelineData);
const timeline = validation.timeline;

export const KacchiNeendeinSong: React.FC = () => {

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
      {/* 0. Lossless Master Audio Synced Playback */}
      <Audio src={staticFile("audio/kacchi_neendein.mp3")} />

      {/* 1. Cinematic 2.5D Camera Drift */}
      <CameraRig zoomScale={1.05} driftRangeX={20} driftRangeY={-12}>
        {/* Scene 01: Intro Title (0 - 462 frames) */}
        {timeline.scenes[0] && (
          <Sequence
            from={timeline.scenes[0].startFrame}
            durationInFrames={timeline.scenes[0].endFrame - timeline.scenes[0].startFrame}
          >
            <Scene01_IntroTitle scene={timeline.scenes[0]} />
          </Sequence>
        )}

        {/* Scene 02: 2 AM Chai & Dosti (462 - 785 frames) */}
        {timeline.scenes[1] && (
          <Sequence
            from={timeline.scenes[1].startFrame}
            durationInFrames={timeline.scenes[1].endFrame - timeline.scenes[1].startFrame}
          >
            <Scene02_ChaiLadaai scene={timeline.scenes[1]} />
          </Sequence>
        )}

        {/* Scene 03: Wall of Hope & Blueprints (785 - 1098 frames) */}
        {timeline.scenes[2] && (
          <Sequence
            from={timeline.scenes[2].startFrame}
            durationInFrames={timeline.scenes[2].endFrame - timeline.scenes[2].startFrame}
          >
            <Scene03_UmeedonPanne scene={timeline.scenes[2]} />
          </Sequence>
        )}

        {/* Scene 04: Hook Climax 1 (1098 - 1567 frames) */}
        {timeline.scenes[3] && (
          <Sequence
            from={timeline.scenes[3].startFrame}
            durationInFrames={timeline.scenes[3].endFrame - timeline.scenes[3].startFrame}
          >
            <Scene04_NeendeinHook scene={timeline.scenes[3]} />
          </Sequence>
        )}

        {/* Scene 05: Instrumental Interlude 1 & Syllabus Mountain (1567 - 2439 frames) */}
        {timeline.scenes[4] && (
          <Sequence
            from={timeline.scenes[4].startFrame}
            durationInFrames={timeline.scenes[4].endFrame - timeline.scenes[4].startFrame}
          >
            <Scene05_InterludeOne scene={timeline.scenes[4]} />
          </Sequence>
        )}

        {/* Scene 06: Antara 1 - Syllabus & Deadlines (2439 - 3000 frames) */}
        {timeline.scenes[5] && (
          <Sequence
            from={timeline.scenes[5].startFrame}
            durationInFrames={timeline.scenes[5].endFrame - timeline.scenes[5].startFrame}
          >
            <Scene06_SyllabusDeadline scene={timeline.scenes[5]} />
          </Sequence>
        )}

        {/* Scene 07: Mukhda Reprise (3000 - 3800 frames) */}
        {timeline.scenes[6] && (
          <Sequence
            from={timeline.scenes[6].startFrame}
            durationInFrames={timeline.scenes[6].endFrame - timeline.scenes[6].startFrame}
          >
            <Scene07_MukhdaReprise scene={timeline.scenes[6]} />
          </Sequence>
        )}

        {/* Scene 08: Instrumental Interlude 2 & Telephone Dawn (3800 - 4471 frames) */}
        {timeline.scenes[7] && (
          <Sequence
            from={timeline.scenes[7].startFrame}
            durationInFrames={timeline.scenes[7].endFrame - timeline.scenes[7].startFrame}
          >
            <Scene08_InterludeTwo scene={timeline.scenes[7]} />
          </Sequence>
        )}

        {/* Scene 09: Antara 2 - Maa Call & Bojh (4471 - 5457 frames) */}
        {timeline.scenes[8] && (
          <Sequence
            from={timeline.scenes[8].startFrame}
            durationInFrames={timeline.scenes[8].endFrame - timeline.scenes[8].startFrame}
          >
            <Scene09_MaaCallAansu scene={timeline.scenes[8]} />
          </Sequence>
        )}

        {/* Scene 10: Bridge & Hostel Rooftop Outro (5457 - 6960 frames) */}
        {timeline.scenes[9] && (
          <Sequence
            from={timeline.scenes[9].startFrame}
            durationInFrames={timeline.scenes[9].endFrame - timeline.scenes[9].startFrame}
          >
            <Scene10_HostelRooftopOutro scene={timeline.scenes[9]} />
          </Sequence>
        )}
      </CameraRig>

      {/* Polish Layer: 35mm Film Grain, Tactile Paper & Ambient Embers */}
      <FilmAtmosphere dustCount={20} vignetteStrength={0.6} />
      <PaperTexture opacity={0.06} />
    </div>
  );
};
