import React, { useMemo } from "react";
import {
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TimelineData } from "../../engine/types";
import { useAudioVisualization } from "../../engine/audio/useAudioVisualization";
import { PeerMusicLogoBadge } from "../../themes/peermusic-styles/PeerMusicLogoBadge";
import rawTimeline from "./timeline.json";

// Narrative Scene Components
import { IntroScene } from "./scenes/IntroScene";
import { BurdenScene } from "./scenes/BurdenScene";
import { ReleaseScene } from "./scenes/ReleaseScene";
import { RiverScene } from "./scenes/RiverScene";
import { DawnFlightScene } from "./scenes/DawnFlightScene";
import { BreathSanctuaryScene } from "./scenes/BreathSanctuaryScene";
import { OutroTranquilityScene } from "./scenes/OutroTranquilityScene";

export interface SukoonPoeticUrduSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
}

export const SukoonPoeticUrduSong: React.FC<SukoonPoeticUrduSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/sukoon_poetic_urdu.mp3",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Resolve audio path & extract real-time audio FFT telemetry
  const resolvedAudio = useMemo(() => {
    const clean = audioSrc.startsWith("/") ? audioSrc.slice(1) : audioSrc;
    return staticFile(clean);
  }, [audioSrc]);

  const audioData = useAudioVisualization(audioSrc);
  const bass = audioData.bassEnergy;

  // Flatten and index all sung lines for frame-accurate kinetic typography
  const allLines = useMemo(() => {
    const lines: Array<{
      id: string;
      text: string;
      startFrame: number;
      endFrame: number;
      sceneId: string;
    }> = [];
    rawTimeline.scenes.forEach((scene) => {
      scene.lines.forEach((l) => {
        lines.push({
          id: l.id,
          text: l.text,
          startFrame: l.startFrame,
          endFrame: l.endFrame,
          sceneId: scene.id,
        });
      });
    });
    return lines.sort((a, b) => a.startFrame - b.startFrame);
  }, []);

  // Determine active lyric line and upcoming couplet anticipation
  const activeLineIndex = allLines.findIndex(
    (l) => frame >= l.startFrame && frame <= l.endFrame
  );
  const activeLine = activeLineIndex !== -1 ? allLines[activeLineIndex] : null;
  const nextLine =
    activeLineIndex !== -1 && activeLineIndex + 1 < allLines.length
      ? allLines[activeLineIndex + 1]
      : null;

  // Kinetic typography entrance and exit animations
  let lineOpacity = 0;
  let lineTranslateY = 0;
  let exitFade = 1;

  if (activeLine) {
    const elapsed = frame - activeLine.startFrame;
    const enterSpring = spring({
      frame: elapsed,
      fps,
      config: { damping: 15, mass: 0.85, stiffness: 65 },
    });
    lineOpacity = enterSpring;
    lineTranslateY = interpolate(enterSpring, [0, 1], [26, 0]);

    const remaining = activeLine.endFrame - frame;
    if (remaining < 16) {
      exitFade = interpolate(remaining, [0, 16], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
  }

  // Crossfade opacity helpers for 28-frame seamless scene transitions
  const getSceneOpacity = (start: number, end: number) => {
    const fadeDuration = 28;
    if (frame < start - fadeDuration || frame > end + fadeDuration) return 0;
    if (frame < start) {
      return interpolate(frame, [start - fadeDuration, start], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    if (frame > end - fadeDuration) {
      return interpolate(frame, [end - fadeDuration, end], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    return 1;
  };

  const introOp = getSceneOpacity(0, 808);
  const burdenOp = getSceneOpacity(808, 2658);
  const releaseOp = getSceneOpacity(2658, 4463);
  const riverOp = getSceneOpacity(4463, 6190);
  const dawnOp = getSceneOpacity(6190, 7979);
  const breathOp = getSceneOpacity(7979, 9420);
  const outroOp = getSceneOpacity(9420, 10617);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundColor: "#06080E",
        overflow: "hidden",
        fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
      }}
    >
      {/* 1. Synchronized High-Fidelity Audio Stream */}
      <Audio src={resolvedAudio} />

      {/* 2. Narrative Scene 1: Intro (Frames 0 - 808) */}
      {introOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: introOp }}>
          <IntroScene startFrame={0} endFrame={808} audioData={audioData} />
        </div>
      )}

      {/* 3. Narrative Scene 2: Verse 1 - The Heavy Burden (Frames 808 - 2658) */}
      {burdenOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: burdenOp }}>
          <BurdenScene startFrame={808} endFrame={2658} audioData={audioData} />
        </div>
      )}

      {/* 4. Narrative Scene 3: Chorus 1 - Letting Go & Peace (Frames 2658 - 4463) */}
      {releaseOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: releaseOp }}>
          <ReleaseScene startFrame={2658} endFrame={4463} audioData={audioData} />
        </div>
      )}

      {/* 5. Narrative Scene 4: Verse 2 - The End of the War & River (Frames 4463 - 6190) */}
      {riverOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: riverOp }}>
          <RiverScene startFrame={4463} endFrame={6190} audioData={audioData} />
        </div>
      )}

      {/* 6. Narrative Scene 5: Chorus 2 - Dawn Flight & Escalation (Frames 6190 - 7979) */}
      {dawnOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: dawnOp }}>
          <DawnFlightScene startFrame={6190} endFrame={7979} audioData={audioData} />
        </div>
      )}

      {/* 7. Narrative Scene 6: Bridge - Silence of Battle & Breath (Frames 7979 - 9420) */}
      {breathOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: breathOp }}>
          <BreathSanctuaryScene startFrame={7979} endFrame={9420} audioData={audioData} />
        </div>
      )}

      {/* 8. Narrative Scene 7: Outro - Complete Surrender & Floating Lantern (Frames 9420 - 10617) */}
      {outroOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: outroOp }}>
          <OutroTranquilityScene startFrame={9420} endFrame={10617} audioData={audioData} />
        </div>
      )}

      {/* 9. Official PeerMusic Branding Emblem (Upper Right Corner) */}
      <div
        style={{
          position: "absolute",
          top: 42,
          right: 50,
          zIndex: 50,
        }}
      >
        <PeerMusicLogoBadge size={54} glowIntensity={1.2 + bass * 0.4} />
      </div>

      {/* 10. Frame-Accurate Kinetic Lyrical Typography Overlay */}
      {activeLine && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 40,
            pointerEvents: "none",
            padding: "0 80px",
          }}
        >
          {/* Active Sung Poetic Line */}
          <div
            style={{
              position: "relative",
              opacity: lineOpacity * exitFade,
              transform: `translateY(${lineTranslateY}px) scale(${1.0 + bass * 0.022})`,
              transformOrigin: "center center",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: activeLine.text.length > 42 ? "42px" : "48px",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "1.5px",
                lineHeight: 1.3,
                textShadow:
                  "0 0 24px rgba(245, 158, 11, 0.75), 0 0 50px rgba(220, 38, 38, 0.45), 0 4px 14px rgba(0, 0, 0, 0.9)",
              }}
            >
              {activeLine.text}
            </h1>

            {/* Subtle Mirrored Wet-Floor Lyric Reflection */}
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                transform: "scaleY(-1)",
                opacity: 0.22 * (lineOpacity * exitFade),
                filter: "blur(4px)",
                pointerEvents: "none",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: activeLine.text.length > 42 ? "42px" : "48px",
                  fontWeight: 700,
                  color: "#FAF4E8",
                  letterSpacing: "1.5px",
                  lineHeight: 1.3,
                }}
              >
                {activeLine.text}
              </h1>
            </div>
          </div>

          {/* Couplet Anticipation (Soft Italic Serif for the upcoming line) */}
          {nextLine && (
            <div
              style={{
                marginTop: "22px",
                opacity: 0.42 * (lineOpacity * exitFade),
                transform: "translateY(4px)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "26px",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "rgba(250, 244, 232, 0.55)",
                  letterSpacing: "1px",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                }}
              >
                {nextLine.text}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 11. Cinematic Anamorphic Vignette Framing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow:
            "inset 0 0 140px rgba(0, 0, 0, 0.85), inset 0 0 60px rgba(0, 0, 0, 0.6)",
          pointerEvents: "none",
          zIndex: 45,
        }}
      />
    </div>
  );
};
