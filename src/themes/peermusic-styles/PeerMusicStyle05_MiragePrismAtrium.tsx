import React from "react";
import { Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AudioSynesthesiaFlash } from "../../engine/camera/AudioSynesthesiaFlash";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";
import { useAudioVisualization } from "../../engine/audio/useAudioVisualization";
import { SAMPLE_10S_AUDIO, SAMPLE_LYRICS } from "./sampleData";

/**
 * Mirage Prism Atrium: an original architectural visual identity built from
 * suspended glass monoliths. Vocal energy changes their refraction and the
 * camera glides through a midnight gallery instead of sitting on a static loop.
 */
export const PeerMusicStyle05_MiragePrismAtrium: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const { bassEnergy, midEnergy, highEnergy, overallEnergy } = useAudioVisualization(SAMPLE_10S_AUDIO, 64);

  const firstLine = frame < SAMPLE_LYRICS[0].endFrame;
  const activeLine = firstLine ? SAMPLE_LYRICS[0] : SAMPLE_LYRICS[1];
  const upcomingLine = firstLine ? SAMPLE_LYRICS[1] : undefined;
  const lineProgress = spring({
    frame: frame - activeLine.startFrame,
    fps,
    config: { damping: 20, stiffness: 155, mass: 0.8 },
  });

  const cameraX = Math.sin(frame * 0.01) * 22 + (firstLine ? -8 : 10);
  const cameraY = Math.cos(frame * 0.012) * 10;
  const cameraScale = 1.06 + frame * 0.00005 + bassEnergy * 0.025;
  const lyricY = interpolate(lineProgress, [0, 1], [36, 0]);
  const lyricOpacity = interpolate(lineProgress, [0, 0.35, 1], [0, 0.78, 1]);

  const prisms = [
    { x: 205, y: 130, w: 205, h: 690, rotate: -11, phase: 0.2, tint: "rgba(209, 153, 255, 0.28)" },
    { x: 450, y: -90, w: 290, h: 850, rotate: 13, phase: 0.8, tint: "rgba(255, 195, 129, 0.3)" },
    { x: 695, y: 195, w: 185, h: 620, rotate: -8, phase: 1.4, tint: "rgba(247, 53, 87, 0.28)" },
    { x: 1010, y: -130, w: 330, h: 940, rotate: 9, phase: 2.1, tint: "rgba(255, 223, 186, 0.26)" },
    { x: 1280, y: 150, w: 230, h: 680, rotate: -14, phase: 2.9, tint: "rgba(180, 125, 255, 0.3)" },
    { x: 1535, y: -45, w: 245, h: 860, rotate: 8, phase: 3.6, tint: "rgba(248, 63, 95, 0.28)" },
  ];

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
        background: "#05060B",
        fontFamily: "Georgia, 'Playfair Display', 'Times New Roman', serif",
      }}
    >
      <Audio src={staticFile(SAMPLE_10S_AUDIO)} />

      <div
        style={{
          position: "absolute",
          inset: -60,
          transform: `translate3d(${cameraX}px, ${cameraY}px, 0) scale(${cameraScale})`,
          background:
            "radial-gradient(ellipse at 52% 24%, #241B37 0%, #111222 39%, #070912 65%, #020306 100%)",
        }}
      />

      {/* Refracted source light: it visibly swells with kick and vocal body. */}
      <div
        style={{
          position: "absolute",
          top: -300 + bassEnergy * 55,
          left: "50%",
          width: 1200 + midEnergy * 320,
          height: 820 + bassEnergy * 200,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(255,232,192,0.28) 0%, rgba(247,53,87,0.2) 27%, rgba(148,94,244,0.1) 52%, transparent 73%)",
          filter: "blur(42px)",
          mixBlendMode: "screen",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate3d(${cameraX * 0.65}px, ${cameraY * 0.5}px, 0) scale(${1 + bassEnergy * 0.02})`,
        }}
      >
        {prisms.map((prism, index) => {
          const sway = Math.sin(frame * 0.018 + prism.phase) * (5 + index * 0.8);
          const brightness = 0.72 + midEnergy * 0.23 + Math.max(0, Math.sin(frame * 0.035 + prism.phase)) * 0.08;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: prism.x,
                top: prism.y,
                width: prism.w,
                height: prism.h,
                transform: `rotate(${prism.rotate + sway}deg) skewY(${-4 + index * 1.6}deg)`,
                opacity: brightness,
                border: "1px solid rgba(255, 242, 222, 0.34)",
                background: `linear-gradient(112deg, rgba(255,255,255,0.2) 0%, ${prism.tint} 30%, rgba(7,8,15,0.08) 60%, rgba(255,224,184,0.18) 100%)`,
                boxShadow: `inset 18px 0 50px rgba(255,245,225,${0.14 + highEnergy * 0.14}), inset -16px 0 60px rgba(118,61,222,0.2), 0 0 ${40 + bassEnergy * 45}px ${prism.tint}`,
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${25 + ((frame * 0.24 + index * 17) % 56)}%`,
                  width: 2 + highEnergy * 2,
                  background: "linear-gradient(to bottom, transparent, rgba(255,248,230,0.82), transparent)",
                  filter: "blur(1px)",
                  opacity: 0.5 + highEnergy * 0.35,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* An anamorphic floor turns the architecture into a luxurious stage. */}
      <div
        style={{
          position: "absolute",
          left: -200,
          right: -200,
          bottom: -250,
          height: 510,
          transform: "perspective(700px) rotateX(60deg)",
          transformOrigin: "bottom center",
          background:
            "repeating-linear-gradient(90deg, rgba(255,218,170,0.09) 0 1px, transparent 1px 178px), repeating-linear-gradient(0deg, rgba(255,218,170,0.08) 0 1px, transparent 1px 105px)",
          opacity: 0.34 + bassEnergy * 0.18,
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.88), transparent 90%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(2,3,7,0.22) 0%, rgba(2,3,7,0.04) 34%, rgba(2,3,7,0.38) 63%, rgba(2,3,7,0.94) 100%)",
        }}
      />

      <Img
        src={staticFile("branding/peermusic_badge.png")}
        style={{
          position: "absolute",
          top: 58,
          left: 78,
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "1px solid rgba(255, 235, 205, 0.38)",
          boxShadow: `0 0 ${25 + bassEnergy * 25}px rgba(247, 53, 87, ${0.42 + bassEnergy * 0.24})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 142,
          zIndex: 8,
          textAlign: "center",
          color: "#FFF6E9",
          textShadow: "0 3px 18px rgba(0,0,0,0.98), 0 0 38px rgba(247,53,87,0.3)",
        }}
      >
        <div
          style={{
            transform: `translateY(${lyricY}px) scale(${1 + overallEnergy * 0.018})`,
            opacity: lyricOpacity,
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: `${interpolate(lineProgress, [0, 1], [10, 1])}px`,
            lineHeight: 1.2,
          }}
        >
          {activeLine.text}
        </div>
        {upcomingLine && (
          <div
            style={{
              marginTop: 23,
              color: "rgba(255, 239, 219, 0.43)",
              fontSize: 30,
              lineHeight: 1.35,
              fontWeight: 400,
              letterSpacing: "0.7px",
              opacity: interpolate(lineProgress, [0, 1], [0, 0.68]),
            }}
          >
            {upcomingLine.text}
          </div>
        )}
      </div>

      <FilmAtmosphere glowColor="#F6B96E" dustCount={17} vignetteStrength={0.6} />
      {[0, 158, 316, 454, 557].map((hitFrame) => (
        <AudioSynesthesiaFlash key={hitFrame} hitFrame={hitFrame} duration={7} flashColor="rgba(255,235,200,0.22)" intensity={0.72} />
      ))}
    </div>
  );
};
