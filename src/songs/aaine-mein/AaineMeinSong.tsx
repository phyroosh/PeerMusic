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
import { MirrorShopScene } from "./scenes/MirrorShopScene";
import { TimeFreezeChorusScene } from "./scenes/TimeFreezeChorusScene";
import { EarringTurnScene } from "./scenes/EarringTurnScene";
import { ChorusEscalationScene } from "./scenes/ChorusEscalationScene";
import { SitarPathBridgeScene } from "./scenes/SitarPathBridgeScene";
import { OutroSanctuaryScene } from "./scenes/OutroSanctuaryScene";

export interface AaineMeinSongProps {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
}

export const AaineMeinSong: React.FC<AaineMeinSongProps> = ({
  timeline: propTimeline,
  audioSrc = "audio/aaine_mein.mp3",
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
      words: Array<{
        id: string;
        text: string;
        startFrame: number;
        endFrame: number;
        accent?: boolean;
      }>;
    }> = [];
    rawTimeline.scenes.forEach((scene) => {
      scene.lines.forEach((l) => {
        lines.push({
          id: l.id,
          text: l.text,
          startFrame: l.startFrame,
          endFrame: l.endFrame,
          sceneId: scene.id,
          words: l.words || [],
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

  // 7 Core Narrative Scenes Frame Boundaries
  const introOp = getSceneOpacity(0, 742);
  const mirrorShopOp = getSceneOpacity(742, 2093);
  const timeFreezeChorusOp = getSceneOpacity(2093, 4325);
  const earringTurnOp = getSceneOpacity(4325, 5705);
  const chorusEscalationOp = getSceneOpacity(5705, 7853);
  const sitarPathOp = getSceneOpacity(7853, 9150);
  const outroOp = getSceneOpacity(9150, 10854);

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

      {/* 2. Narrative Scene 1: Intro - The Bazaar & Weary Footsteps (f0–742) */}
      {introOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: introOp }}>
          <IntroScene startFrame={0} endFrame={742} audioData={audioData} />
        </div>
      )}

      {/* 3. Narrative Scene 2: Verse 1 - The Antique Mirror Shop & The Shard (f742–2093) */}
      {mirrorShopOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: mirrorShopOp }}>
          <MirrorShopScene startFrame={742} endFrame={2093} audioData={audioData} />
        </div>
      )}

      {/* 4. Narrative Scene 3: Pre-Chorus & Chorus 1 - Frozen Time & Rainbow Prism (f2093–4325) */}
      {timeFreezeChorusOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: timeFreezeChorusOp }}>
          <TimeFreezeChorusScene startFrame={2093} endFrame={4325} audioData={audioData} />
        </div>
      )}

      {/* 5. Narrative Scene 4: Verse 2 - The Earring Sway & Turning Around (f4325–5705) */}
      {earringTurnOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: earringTurnOp }}>
          <EarringTurnScene startFrame={4325} endFrame={5705} audioData={audioData} />
        </div>
      )}

      {/* 6. Narrative Scene 5: Pre-Chorus & Chorus 2 - The Crossroad Meeting (f5705–7853) */}
      {chorusEscalationOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: chorusEscalationOp }}>
          <ChorusEscalationScene startFrame={5705} endFrame={7853} audioData={audioData} />
        </div>
      )}

      {/* 7. Narrative Scene 6: Bridge - The Golden Road & Vibrating Sitar Strings (f7853–9150) */}
      {sitarPathOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: sitarPathOp }}>
          <SitarPathBridgeScene startFrame={7853} endFrame={9150} audioData={audioData} />
        </div>
      )}

      {/* 8. Narrative Scene 7: Chorus 3 & Outro - Dual Reflection Sanctuary (f9150–10854) */}
      {outroOp > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: outroOp }}>
          <OutroSanctuaryScene startFrame={9150} endFrame={10854} audioData={audioData} />
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
                fontSize: activeLine.text.length > 40 ? "42px" : "48px",
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

            {/* Subtle Mirrored Lyric Reflection */}
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
                  fontSize: activeLine.text.length > 40 ? "42px" : "48px",
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
                  fontSize: "24px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#E5B869",
                  letterSpacing: "1.2px",
                  textShadow:
                    "0 2px 10px rgba(0, 0, 0, 0.8), 0 0 16px rgba(245, 158, 11, 0.3)",
                }}
              >
                {nextLine.text}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 11. Subtle Perimeter Cinema Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 140px rgba(4,6,10,0.85)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
