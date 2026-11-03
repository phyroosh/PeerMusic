import React from "react";
import { Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { PeerMusicLogoBadge } from "./PeerMusicLogoBadge";
import { SAMPLE_10S_AUDIO, SAMPLE_COVER_IMAGE, SAMPLE_LYRICS, WordTiming, LineTiming } from "./sampleData";

export const PeerMusicStyle01_CrimsonVelvet: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // 1. Cinematic 2.5D Camera Drift & Zoom
  const cameraZoom = 1.0 + (frame / 600) * 0.045;
  const cameraPanX = Math.sin(frame * 0.012) * 12;
  const cameraPanY = Math.cos(frame * 0.015) * 8;

  // 2. Breathing Seductive Crimson Light Leak
  const leakX = 25 + Math.sin(frame * 0.02) * 15;
  const leakOpacity = 0.45 + Math.sin(frame * 0.035) * 0.15;
  const flareWidth = 700 + Math.sin(frame * 0.04) * 60;

  // 3. Audio Synesthesia Heartbeat (Crimson Bloom Pulse)
  const pulse = 1.0 + Math.sin(frame * 0.1) * 0.025;

  // 4. Determine Active Line
  const isLine1Active = frame < 316;
  const activeLineIndex = isLine1Active ? 0 : 1;
  const activeLine = SAMPLE_LYRICS[activeLineIndex];
  const nextLine = isLine1Active ? SAMPLE_LYRICS[1] : undefined;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#06070A",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 0. Lossless 10-Second Sample Master Audio */}
      <Audio src={staticFile(SAMPLE_10S_AUDIO)} />

      {/* 1. Deep Matte Obsidian Background with Radial Velvet Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 45%, #18090E 0%, #0A080C 50%, #040406 100%)",
        }}
      />

      {/* 2. Ambient Blurred Artwork Underlay (adds warmth and atmospheric depth) */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          filter: "blur(65px) brightness(0.55) saturate(1.4)",
          opacity: 0.7,
          transform: `scale(${cameraZoom * 1.1})`,
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile(SAMPLE_COVER_IMAGE)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 3. Hero Candid Cover Artwork with Crimson Chiaroscuro Rim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translate3d(${cameraPanX.toFixed(2)}px, ${cameraPanY.toFixed(2)}px, 0) scale(${cameraZoom.toFixed(4)})`,
          willChange: "transform",
        }}
      >
        <Img
          src={staticFile(SAMPLE_COVER_IMAGE)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.08) brightness(0.92)",
          }}
        />
      </div>

      {/* 4. Anamorphic Breathing Crimson Light Leak */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: `${leakX}%`,
          width: "600px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 30, 39, 0.28) 0%, rgba(180, 10, 20, 0.1) 45%, transparent 75%)",
          filter: "blur(80px)",
          opacity: leakOpacity,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      {/* 5. Horizontal Anamorphic Crimson/Gold Lens Streak */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${flareWidth}px`,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 30, 39, 0.7) 40%, rgba(255, 210, 120, 0.9) 50%, rgba(255, 30, 39, 0.7) 60%, transparent 100%)",
          filter: "blur(1px)",
          boxShadow: "0 0 20px rgba(255, 30, 39, 0.8)",
          pointerEvents: "none",
        }}
      />

      {/* 6. Sensual 35mm Drifting Crimson & Golden Embers */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "screen" }}
      >
        {[
          { x: 200, y: 350, r: 1.8, c: "#FF2A3A", o: 0.6, speed: 0.02 },
          { x: 500, y: 650, r: 2.2, c: "#FFD384", o: 0.5, speed: 0.025 },
          { x: 850, y: 280, r: 1.5, c: "#FF2A3A", o: 0.7, speed: 0.018 },
          { x: 1100, y: 720, r: 2.5, c: "#FF9E7A", o: 0.65, speed: 0.022 },
          { x: 1400, y: 380, r: 1.6, c: "#FFD384", o: 0.45, speed: 0.028 },
          { x: 1650, y: 550, r: 2.0, c: "#FF2A3A", o: 0.55, speed: 0.02 },
          { x: 750, y: 820, r: 1.4, c: "#FF5A66", o: 0.4, speed: 0.024 },
          { x: 1250, y: 200, r: 2.4, c: "#FFD384", o: 0.6, speed: 0.019 },
        ].map((p, i) => {
          const cy = (p.y - frame * p.speed * 30 + 1080) % 1080;
          const cx = p.x + Math.sin(frame * p.speed + i) * 16;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={p.r}
              fill={p.c}
              opacity={p.o}
              filter="blur(0.8px)"
            />
          );
        })}
      </svg>

      {/* 7. Feathered Cinematic Scrim Gradient (Ensures 100% lyric legibility) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(4, 5, 8, 0.92) 0%, rgba(6, 7, 10, 0.6) 35%, rgba(6, 7, 10, 0.2) 65%, transparent 85%)",
          pointerEvents: "none",
        }}
      />

      {/* 8. Top-Left Official Peer Music Logo Watermark */}
      <div style={{ position: "absolute", top: 60, left: 80, zIndex: 60 }}>
        <PeerMusicLogoBadge size={56} glowIntensity={1.2} />
      </div>

      {/* 9. Top-Right Style Identifier Pill */}
      <div
        style={{
          position: "absolute",
          top: 65,
          right: 80,
          zIndex: 60,
          padding: "8px 18px",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 30, 39, 0.12)",
          border: "1px solid rgba(255, 30, 39, 0.35)",
          color: "#FF5E6C",
          fontSize: "13px",
          letterSpacing: "3px",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        STYLE 01 • CRIMSON VELVET NOIR
      </div>

      {/* 10. Center Seductive Kinetic Lyric Typography */}
      <div
        style={{
          position: "absolute",
          bottom: "16%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "1400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          zIndex: 30,
          textAlign: "center",
        }}
      >
        {/* Active Line (Word-by-word Liquid Gold & Crimson Shimmer) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.28em",
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontSize: "58px",
            lineHeight: 1.3,
          }}
        >
          {activeLine.words.map((w) => {
            const hasStarted = frame >= w.startFrame;
            const isCurrentlySinging = frame >= w.startFrame && frame <= w.endFrame;

            const wordSpring = hasStarted
              ? spring({
                  frame: frame - w.startFrame,
                  fps,
                  config: { damping: 18, stiffness: 220, mass: 0.4 },
                })
              : 0;

            const translateY = hasStarted ? (1 - wordSpring) * 10 : 8;
            const scale = isCurrentlySinging ? 1.04 : 1.0;

            // Liquid Gold/Crimson Glow when sung
            const textColor = isCurrentlySinging
              ? "#FFFFFF"
              : hasStarted
              ? "#FAF5FF"
              : "rgba(235, 230, 240, 0.35)";

            const textShadow = isCurrentlySinging
              ? "0 0 24px rgba(255, 30, 39, 0.95), 0 0 50px rgba(255, 180, 80, 0.5), 0 2px 10px rgba(0, 0, 0, 0.95)"
              : hasStarted
              ? "0 0 15px rgba(255, 30, 39, 0.3), 0 2px 8px rgba(0, 0, 0, 0.85)"
              : "none";

            return (
              <span
                key={w.id}
                style={{
                  display: "inline-block",
                  color: textColor,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  textShadow,
                  transition: "color 0.15s ease",
                  fontWeight: isCurrentlySinging || w.accent ? 700 : 500,
                  position: "relative",
                }}
              >
                {w.text}
                {/* Accent Underline Shimmer */}
                {w.accent && hasStarted && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: "5%",
                      width: "90%",
                      height: "2.5px",
                      background: "linear-gradient(90deg, #FF1E27, #FFD384, #FF1E27)",
                      borderRadius: "2px",
                      boxShadow: "0 0 8px rgba(255, 30, 39, 0.8)",
                      opacity: isCurrentlySinging ? 1 : 0.45,
                    }}
                  />
                )}
              </span>
            );
          })}
        </div>

        {/* Next Line Couplet Preview (Anticipating smoothly in muted silver) */}
        {nextLine && (
          <div
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: "44px",
              color: "rgba(255, 255, 255, 0.38)",
              fontWeight: 400,
              lineHeight: 1.3,
              letterSpacing: "0.5px",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
            }}
          >
            {nextLine.text}
          </div>
        )}

        {/* Sleek Seductive Soundwave Filament at base */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginTop: "10px",
            opacity: 0.85,
          }}
        >
          {Array.from({ length: 28 }).map((_, i) => {
            const barHeight = 6 + Math.abs(Math.sin(frame * 0.12 + i * 0.35)) * 18;
            const isCenter = Math.abs(i - 14) < 6;
            return (
              <div
                key={i}
                style={{
                  width: "3px",
                  height: `${barHeight}px`,
                  backgroundColor: isCenter ? "#FF1E27" : "#FFA24C",
                  borderRadius: "2px",
                  boxShadow: isCenter ? "0 0 8px #FF1E27" : "none",
                  transition: "height 0.05s ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
