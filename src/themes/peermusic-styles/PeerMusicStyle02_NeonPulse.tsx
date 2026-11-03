import React from "react";
import { Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { PeerMusicLogoBadge } from "./PeerMusicLogoBadge";
import { SAMPLE_10S_AUDIO, SAMPLE_COVER_IMAGE, SAMPLE_LYRICS } from "./sampleData";
import { useAudioVisualization } from "../../engine/audio/useAudioVisualization";
import { TimelineData } from "../../engine/types";
import { getActiveAndNextLyricLines } from "../../engine/lyricTiming";
import { resolveCoverImage } from "../cover-art/SongCoverArtworkSong";

export interface PeerMusicStyle02Props {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
}

export const PeerMusicStyle02_NeonPulse: React.FC<PeerMusicStyle02Props> = ({
  timeline,
  audioSrc = SAMPLE_10S_AUDIO,
  coverImageSrc,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // 1. Audio-Reactive Rhythm Analysis (Frame-accurate FFT)
  const { frequencies, bassEnergy, midEnergy, overallEnergy } = useAudioVisualization(audioSrc, 64);

  // 2. Central Equalizer Beat Scale (Reacts directly to kick drum & sub-bass rhythm)
  const beatScale = 1.0 + bassEnergy * 0.18;
  const neonGlowRadius = 25 + bassEnergy * 40;

  // 3. Resolve active lyrics (Supports both full TimelineData and sample preview)
  const resolvedCoverSrc = timeline ? resolveCoverImage(timeline, coverImageSrc) : (coverImageSrc || SAMPLE_COVER_IMAGE);

  const activeLyricData = React.useMemo(() => {
    if (timeline?.scenes) {
      const state = getActiveAndNextLyricLines(timeline.scenes, frame);
      return {
        activeLine: state.activeLine,
        nextLine: state.nextLine,
        lineStartFrame: state.lineStartFrame ?? state.activeBounds?.startFrame ?? frame,
        lineEndFrame: state.lineEndFrame ?? state.activeBounds?.endFrame ?? (frame + 60),
        isSinging: state.isSinging,
        isAnticipating: state.isAnticipating,
        showLyrics: Boolean(state.activeLine && (state.isSinging || state.isAnticipating)),
        progress: state.progress,
      };
    }

    // Default 10s sample logic: Line 1 (0..315), Line 2 (316..600)
    const isLine1Active = frame < 316;
    const activeLine = isLine1Active ? SAMPLE_LYRICS[0] : SAMPLE_LYRICS[1];
    const nextLine = isLine1Active ? SAMPLE_LYRICS[1] : undefined;
    const lineStartFrame = isLine1Active ? 0 : 316;
    const lineDuration = isLine1Active ? 316 : 284;
    const lineElapsed = isLine1Active ? frame : frame - 316;
    const lineProgress = Math.min(1, Math.max(0, lineElapsed / lineDuration));

    return {
      activeLine,
      nextLine,
      lineStartFrame,
      lineEndFrame: isLine1Active ? 316 : 600,
      isSinging: true,
      isAnticipating: false,
      showLyrics: true,
      progress: lineProgress,
    };
  }, [timeline, frame]);

  const { activeLine, nextLine, lineStartFrame, isSinging, showLyrics, progress } = activeLyricData;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#050608",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 0. Lossless Master Audio Synced Playback */}
      {audioSrc && <Audio src={staticFile(audioSrc)} />}

      {/* 1. Deep Obsidian Horizon with Perspective Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 32%, #180509 0%, #080608 60%, #020204 100%)",
        }}
      />

      {/* 2. Ambient Cover Art Glow (Tinted Midnight Crimson, Breathing with Rhythm) */}
      {resolvedCoverSrc && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.32 + midEnergy * 0.18,
            filter: "blur(48px) saturate(1.8) brightness(0.65)",
            transform: `scale(${1.08 + bassEnergy * 0.04})`,
            pointerEvents: "none",
            transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
          }}
        >
          <Img
            src={staticFile(resolvedCoverSrc)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* 3. Central Audio-Reactive Crimson Equalizer Ring (Synced to Music Rhythm) */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "480px",
          height: "480px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        {/* Pulsating Concentric Neon Rings Locked to Rhythm */}
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            border: "1.5px solid rgba(255, 30, 39, 0.45)",
            boxShadow: `0 0 ${neonGlowRadius}px rgba(255, 30, 39, ${0.4 + bassEnergy * 0.5}), inset 0 0 35px rgba(255, 30, 39, ${0.2 + bassEnergy * 0.3})`,
            transform: `scale(${beatScale})`,
            transition: "transform 0.04s ease-out",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            border: "1px dashed rgba(255, 30, 39, 0.65)",
            transform: `rotate(${frame * 0.25}deg)`,
            opacity: 0.6 + overallEnergy * 0.35,
          }}
        />

        {/* Circular Audio Equalizer Spectrum Bars (48 Radial Bars Locked to Music Frequencies) */}
        <svg
          width="480"
          height="480"
          viewBox="-240 -240 480 480"
          style={{ position: "absolute" }}
        >
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i / 48) * Math.PI * 2;
            // Map index to frequency bin with symmetry
            const freqIndex = i < 24 ? i * 2 : (48 - i) * 2;
            const freqVal = frequencies[freqIndex % frequencies.length] || 0.1;

            // Bar length responds directly to music energy!
            const barLen = 10 + freqVal * 54;
            const rInner = 175;
            const rOuter = rInner + barLen;

            const x1 = Math.cos(angle) * rInner;
            const y1 = Math.sin(angle) * rInner;
            const x2 = Math.cos(angle) * rOuter;
            const y2 = Math.sin(angle) * rOuter;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 3 === 0 ? "#FF1E27" : "#FF5E6C"}
                strokeWidth={2.4 + freqVal * 1.5}
                strokeLinecap="round"
                opacity={0.65 + freqVal * 0.35}
                style={{
                  filter: `drop-shadow(0 0 ${4 + freqVal * 8}px #FF1E27)`,
                }}
              />
            );
          })}
        </svg>

        {/* Center Stylized Peer Music Holographic Core */}
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: "#0A0B10",
            border: "2px solid #FF1E27",
            boxShadow: `0 0 ${25 + bassEnergy * 30}px #FF1E27`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            transform: `scale(${1.0 + bassEnergy * 0.08})`,
            transition: "transform 0.05s ease-out",
          }}
        >
          <Img
            src={staticFile("branding/peermusic_badge.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* 4. Floor Wet Neon Reflection Grid */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to top, rgba(2, 3, 5, 0.96) 0%, rgba(20, 5, 8, 0.6) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 5. Official Peer Music Channel Branding Badge (Clean, Zero Extra Pills) */}
      <div style={{ position: "absolute", top: 60, left: 80, zIndex: 60 }}>
        <PeerMusicLogoBadge size={56} glowIntensity={1.2 + bassEnergy * 0.4} />
      </div>

      {/* 6. Lower-Third Frosted Glassmorphic Lyric Stage (Line-by-Line Kinetic Progression) */}
      {showLyrics && activeLine && (() => {
        const activeText = (activeLine.text || activeLine.words?.map((w) => w.text).join(" ") || "").replace(/[*_]/g, "").trim();
        const nextText = nextLine ? (nextLine.text || nextLine.words?.map((w) => w.text).join(" ") || "").replace(/[*_]/g, "").trim() : "";

        // Snappy kinetic spring transition on line arrival
        const lineSpring = spring({
          frame: frame - lineStartFrame,
          fps,
          config: { damping: 16, stiffness: 220 },
        });

        const slideTranslateY = interpolate(lineSpring, [0, 1], [30, 0]);
        const lineOpacity = isSinging ? interpolate(lineSpring, [0, 1], [0.35, 1.0]) : 0.65;
        const scale = 1.0 + (isSinging ? bassEnergy * 0.03 : 0);

        // Upcoming line preview: Slides up gently beneath the active line
        const nextSpring = spring({
          frame: frame - lineStartFrame,
          fps,
          config: { damping: 18, stiffness: 150 },
        });
        const nextSlideY = interpolate(nextSpring, [0, 1], [14, 0]);
        const nextOpacity = interpolate(nextSpring, [0, 1], [0.1, 0.35]);

        return (
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "86%",
              maxWidth: "1350px",
              padding: "36px 48px",
              borderRadius: "28px",
              background: "rgba(10, 12, 18, 0.68)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 30, 39, 0.35)",
              boxShadow: `0 10px 40px rgba(0, 0, 0, 0.75), 0 0 ${25 + bassEnergy * 25}px rgba(255, 30, 39, 0.25)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              zIndex: 30,
              transition: "box-shadow 0.05s ease-out",
            }}
          >
            {/* Active Line (Clean line-by-line kinetic focus, radiant neon strike glow) */}
            <div
              style={{
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                fontSize: "50px",
                fontWeight: 800,
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                textAlign: "center",
                color: "#FFFFFF",
                opacity: lineOpacity,
                transform: `translate3d(0, ${slideTranslateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`,
                textShadow: isSinging
                  ? `0 0 10px #FF1E27, 0 0 25px #FF1E27, 0 0 ${40 + bassEnergy * 30}px rgba(255, 30, 39, 0.85)`
                  : "0 0 15px rgba(255, 30, 39, 0.4)",
                transition: "text-shadow 0.05s ease-out",
              }}
            >
              {activeText}
            </div>

            {/* Next Line Upcoming Couplet Preview (Smooth slide from below) */}
            {nextText && (
              <div
                style={{
                  fontFamily: "'Montserrat', 'Inter', sans-serif",
                  fontSize: "36px",
                  fontWeight: 600,
                  color: `rgba(255, 255, 255, ${nextOpacity.toFixed(3)})`,
                  letterSpacing: "0.5px",
                  transform: `translate3d(0, ${nextSlideY.toFixed(2)}px, 0)`,
                  textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
                }}
              >
                {nextText}
              </div>
            )}

            {/* Sleek Neon Red Dynamic Progress Track */}
            <div
              style={{
                width: "100%",
                height: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "3px",
                overflow: "hidden",
                position: "relative",
                marginTop: "6px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${(progress * 100).toFixed(2)}%`,
                  background: "linear-gradient(90deg, #FF1E27 0%, #FF5E6C 80%, #FFFFFF 100%)",
                  boxShadow: "0 0 12px #FF1E27",
                  borderRadius: "3px",
                }}
              />
            </div>
          </div>
        );
      })()}
    </div>
  );
};
