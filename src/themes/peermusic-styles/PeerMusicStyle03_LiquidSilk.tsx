import React from "react";
import { Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { PeerMusicLogoBadge } from "./PeerMusicLogoBadge";
import { SAMPLE_10S_AUDIO, SAMPLE_COVER_IMAGE, SAMPLE_LYRICS } from "./sampleData";
import { useAudioVisualization } from "../../engine/audio/useAudioVisualization";
import { TimelineData } from "../../engine/types";
import { getActiveAndNextLyricLines } from "../../engine/lyricTiming";
import { resolveCoverImage } from "../cover-art/SongCoverArtworkSong";

export interface PeerMusicStyle03Props {
  timeline?: TimelineData;
  audioSrc?: string;
  coverImageSrc?: string;
}

export const PeerMusicStyle03_LiquidSilk: React.FC<PeerMusicStyle03Props> = ({
  timeline,
  audioSrc = SAMPLE_10S_AUDIO,
  coverImageSrc,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // 1. Audio-Reactive Rhythm Analysis (Frame-accurate FFT)
  const { bassEnergy, midEnergy, highEnergy, overallEnergy } = useAudioVisualization(audioSrc, 64);

  // 2. Music-Driven Undulating Silk Wave Physics (Smoothed rhythm modulation)
  // When music swells or hits a beat, the silk ribbons breathe and surge with musical intensity!
  const rhythmSurge = bassEnergy * 40;
  const silkWave1 = Math.sin(frame * 0.02) * (28 + rhythmSurge);
  const silkWave2 = Math.cos(frame * 0.016) * (36 + rhythmSurge * 1.2);
  const silkWave3 = Math.sin(frame * 0.024) * (20 + rhythmSurge * 0.8);

  // 3. Dynamic Camera Breathing Tied to Audio
  const cameraScale = 1.0 + Math.sin(frame * 0.008) * 0.025 + bassEnergy * 0.02;
  const cameraDriftX = Math.sin(frame * 0.006) * 12;

  // 4. Resolve Active Lyrics (Supports full TimelineData or sample preview)
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
      };
    }

    // Default 10s sample logic: Line 1 (0..315), Line 2 (316..600)
    const isLine1Active = frame < 316;
    const activeLine = isLine1Active ? SAMPLE_LYRICS[0] : SAMPLE_LYRICS[1];
    const nextLine = isLine1Active ? SAMPLE_LYRICS[1] : undefined;
    const lineStartFrame = isLine1Active ? 0 : 316;
    const lineEndFrame = isLine1Active ? 316 : 600;

    return {
      activeLine,
      nextLine,
      lineStartFrame,
      lineEndFrame,
      isSinging: true,
      isAnticipating: false,
      showLyrics: true,
    };
  }, [timeline, frame]);

  const { activeLine, nextLine, lineStartFrame, isSinging, showLyrics } = activeLyricData;

  const isVertical = height > width;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#040306",
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

      {/* 1. Deep Midnight Void with Crimson Caustic Radiance */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, rgba(35, 8, 15, ${0.7 + bassEnergy * 0.3}) 0%, #090306 60%, #020103 100%)`,
          transition: "background 0.05s ease-out",
        }}
      />

      {/* 2. Audio-Reactive Liquid Silk Waves (SVG Specular Ribbons Moving to Music Rhythm) */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          mixBlendMode: "screen",
          opacity: 0.8 + overallEnergy * 0.2,
        }}
        viewBox={isVertical ? "0 0 1080 1920" : "0 0 1920 1080"}
      >
        <defs>
          <linearGradient id="silkCrimsonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1E27" stopOpacity={0.75 + bassEnergy * 0.25} />
            <stop offset="35%" stopColor="#FFA44A" stopOpacity={0.6 + midEnergy * 0.3} />
            <stop offset="70%" stopColor="#9E0B1B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF1E27" stopOpacity={0.7 + bassEnergy * 0.25} />
          </linearGradient>

          <linearGradient id="silkCrimsonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF3850" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#FF1E27" stopOpacity={0.7 + midEnergy * 0.25} />
            <stop offset="100%" stopColor="#6E0010" stopOpacity="0.25" />
          </linearGradient>

          <filter id="silkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={18 + bassEnergy * 10} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Liquid Silk Ribbon 1 (Surges with Bass and Vocal Rhythm) */}
        <path
          d={
            isVertical
              ? `M -100,${750 + silkWave1 * 1.5} C 250,${420 - silkWave2} 550,${1100 + silkWave3} 850,${650 - silkWave1} C 1000,${450 + silkWave2} 1180,${850 - silkWave3} 1250,${780 + silkWave1}`
              : `M -200,${450 + silkWave1} C 400,${220 - silkWave2} 800,${640 + silkWave3} 1400,${360 - silkWave1} C 1700,${220 + silkWave2} 2000,${480 - silkWave3} 2200,${420 + silkWave1}`
          }
          fill="none"
          stroke="url(#silkCrimsonGrad1)"
          strokeWidth={isVertical ? 50 + bassEnergy * 20 : 60 + bassEnergy * 24}
          strokeLinecap="round"
          filter="url(#silkGlow)"
          opacity={0.6 + midEnergy * 0.25}
          style={{ transition: "stroke-width 0.05s ease-out" }}
        />

        {/* Liquid Silk Ribbon 2 (Harmonic Counter-Wave) */}
        <path
          d={
            isVertical
              ? `M -100,${1050 - silkWave2 * 1.4} C 300,${1350 + silkWave3} 600,${550 - silkWave1} 900,${1200 + silkWave2} 1250,${950 - silkWave3}`
              : `M -200,${590 - silkWave2} C 500,${780 + silkWave3} 1000,${320 - silkWave1} 1500,${680 + silkWave2} 2200,${540 - silkWave3}`
          }
          fill="none"
          stroke="url(#silkCrimsonGrad2)"
          strokeWidth={isVertical ? 32 + midEnergy * 14 : 38 + midEnergy * 18}
          strokeLinecap="round"
          filter="url(#silkGlow)"
          opacity={0.5 + highEnergy * 0.3}
          style={{ transition: "stroke-width 0.05s ease-out" }}
        />
      </svg>

      {/* 3. Hero Visual Overlay (Masked with Seductive Fluid Chiaroscuro) */}
      {resolvedCoverSrc && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.42 + midEnergy * 0.16,
            filter: "blur(26px) saturate(1.6) brightness(0.7)",
            transform: `scale(${cameraScale}) translate3d(${cameraDriftX.toFixed(2)}px, 0, 0)`,
            pointerEvents: "none",
            transition: "transform 0.05s ease-out",
          }}
        >
          <Img
            src={staticFile(resolvedCoverSrc)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* 4. Drifting Bioluminescent Starlight Embers (Sparkle on Audio Transients) */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "screen" }}
      >
        {[
          { x: 300, y: 300, r: 2.2, o: 0.8 },
          { x: 600, y: 700, r: 1.8, o: 0.6 },
          { x: 950, y: 250, r: 2.8, o: 0.9 },
          { x: 1300, y: 650, r: 1.6, o: 0.7 },
          { x: 1600, y: 400, r: 2.4, o: 0.85 },
          { x: 800, y: 800, r: 2.0, o: 0.5 },
        ].map((p, i) => {
          const vHeight = isVertical ? 1920 : 1080;
          const cy = (p.y - frame * 0.45 + vHeight) % vHeight;
          const cx = (p.x * (width / 1920)) + Math.sin(frame * 0.03 + i) * 16;
          const sparkGlow = p.o * (0.8 + highEnergy * 0.5);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={p.r * (1 + highEnergy * 0.4)}
              fill="#FFF0D4"
              opacity={sparkGlow}
              filter="blur(1px)"
            />
          );
        })}
      </svg>

      {/* 5. Deep Velvet Scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(3, 2, 4, 0.95) 0%, rgba(6, 3, 5, 0.55) 35%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      {/* 6. Official Peer Music Channel Branding Badge (Clean, Zero Extra Pills) */}
      <div style={{ position: "absolute", top: isVertical ? 80 : 60, left: isVertical ? 60 : 80, zIndex: 60 }}>
        <PeerMusicLogoBadge size={isVertical ? 48 : 56} glowIntensity={1.2 + bassEnergy * 0.35} />
      </div>

      {/* 7. Center Hypnotic Fluid Typography (Line-by-Line Kinetic Progression) */}
      {showLyrics && activeLine && (() => {
        const activeText = (activeLine.text || activeLine.words?.map((w) => w.text).join(" ") || "").replace(/[*_]/g, "").trim();
        const nextText = nextLine ? (nextLine.text || nextLine.words?.map((w) => w.text).join(" ") || "").replace(/[*_]/g, "").trim() : "";

        // Line-by-line slide transition: On line arrival, slides up smoothly into active focus
        const lineSpring = spring({
          frame: frame - lineStartFrame,
          fps,
          config: { damping: 18, stiffness: 140 },
        });

        const slideTranslateY = interpolate(lineSpring, [0, 1], [34, 0]);
        const waveY = Math.sin(frame * 0.04) * 3;
        const lineOpacity = isSinging ? interpolate(lineSpring, [0, 1], [0.35, 1.0]) : 0.65;
        const scale = 1.0 + (isSinging ? bassEnergy * 0.025 : 0);

        // Upcoming line preview: Slides up gently beneath the active line
        const nextSpring = spring({
          frame: frame - lineStartFrame,
          fps,
          config: { damping: 20, stiffness: 120 },
        });
        const nextSlideY = interpolate(nextSpring, [0, 1], [16, 0]);
        const nextOpacity = interpolate(nextSpring, [0, 1], [0.1, 0.38]);

        return (
          <div
            style={{
              position: "absolute",
              bottom: isVertical ? "18%" : "15%",
              left: "50%",
              transform: "translateX(-50%)",
              width: isVertical ? "92%" : "90%",
              maxWidth: isVertical ? "960px" : "1400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: isVertical ? "18px" : "24px",
              zIndex: 30,
              textAlign: "center",
            }}
          >
            {/* Active Line (Line-by-line kinetic focus, radiant ruby/gold glow, organic float) */}
            <div
              style={{
                fontFamily: "'Rozha One', 'Noto Serif Devanagari', 'Cinzel', 'Playfair Display', serif",
                fontSize: isVertical ? "44px" : "56px",
                lineHeight: 1.35,
                fontWeight: isSinging ? 600 : 400,
                color: "#FFF5EB",
                opacity: lineOpacity,
                transform: `translate3d(0, ${(slideTranslateY + waveY).toFixed(2)}px, 0) scale(${scale.toFixed(3)})`,
                textShadow: isSinging
                  ? `0 0 25px rgba(255, 30, 39, 0.95), 0 0 ${45 + bassEnergy * 25}px rgba(255, 164, 74, 0.75), 0 2px 10px rgba(0, 0, 0, 0.95)`
                  : "0 0 15px rgba(255, 30, 39, 0.4), 0 2px 8px rgba(0, 0, 0, 0.85)",
                letterSpacing: "0.5px",
                transition: "text-shadow 0.05s ease-out",
              }}
            >
              {activeText}
            </div>

            {/* Next Line Upcoming Couplet Preview (Smooth slide from below) */}
            {nextText && (
              <div
                style={{
                  fontFamily: "'Rozha One', 'Noto Serif Devanagari', 'Cinzel', 'Playfair Display', serif",
                  fontSize: isVertical ? "30px" : "42px",
                  color: `rgba(255, 240, 245, ${nextOpacity.toFixed(3)})`,
                  fontWeight: 400,
                  lineHeight: 1.3,
                  letterSpacing: "0.5px",
                  transform: `translate3d(0, ${nextSlideY.toFixed(2)}px, 0)`,
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                }}
              >
                {nextText}
              </div>
            )}

            {/* Glowing Ruby Starlight Filament (Breathing with music energy) */}
            <div
              style={{
                width: `${(isVertical ? 240 : 320) + overallEnergy * 80}px`,
                height: "2px",
                background: "linear-gradient(90deg, transparent 0%, #FF1E27 30%, #FFA44A 50%, #FF1E27 70%, transparent 100%)",
                boxShadow: `0 0 ${10 + bassEnergy * 10}px #FF1E27`,
                marginTop: "10px",
                transition: "width 0.05s ease-out",
              }}
            />
          </div>
        );
      })()}
    </div>
  );
};
