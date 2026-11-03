import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export interface SongCoverBackdropProps {
  imageSrc?: string;
  mood?: string;
  focalPoint?: "center" | "top" | "bottom" | "left" | "right";
  lyricsPosition?: "bottom" | "top" | "center";
  enableParticles?: boolean;
}

/**
 * Generates deterministic atmospheric particles for cinematic organic depth
 */
const PARTICLES = Array.from({ length: 18 }).map((_, i) => ({
  x: (i * 107 + 43) % 100, // percentage 0-100
  y: (i * 83 + 29) % 100,
  r: 1.2 + (i % 3) * 0.7,
  speed: 0.015 + (i % 5) * 0.006,
  amplitude: 10 + (i % 4) * 5,
  opacity: 0.25 + (i % 4) * 0.12,
}));

export const SongCoverBackdrop: React.FC<SongCoverBackdropProps> = ({
  imageSrc,
  mood = "cinematic",
  focalPoint = "center",
  lyricsPosition = "bottom",
  enableParticles = true,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // 1. Ken Burns slow, organic camera zoom (1.00 to 1.045)
  const kenBurnsScale = 1.0 + Math.sin(frame * 0.0022) * 0.035;

  // 2. Subtle camera pan / lateral drift
  const panX = Math.sin(frame * 0.0016) * 14;
  const panY = Math.cos(frame * 0.0019) * 9;

  // 3. Subtle ambient exposure & breathing
  const exposure = 1.0 + Math.sin(frame * 0.028) * 0.035;

  // 4. Resolve image source URL (supporting relative paths, staticFile, and direct URLs)
  const resolvedSrc = React.useMemo(() => {
    if (!imageSrc) return undefined;
    if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://") || imageSrc.startsWith("data:")) {
      return imageSrc;
    }
    // Clean leading slash for staticFile
    const cleanPath = imageSrc.startsWith("/") ? imageSrc.slice(1) : imageSrc;
    return staticFile(cleanPath);
  }, [imageSrc]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#08090C",
        overflow: "hidden",
      }}
    >
      {/* 1. Muted Deep Ambient Underlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, #161824 0%, #08090E 70%, #030406 100%)",
        }}
      />

      {/* 2. Ambient Blurred Backdrop Extension (eliminates letterbox/pillarbox while preserving aspect ratio) */}
      {resolvedSrc && (
        <div
          style={{
            position: "absolute",
            inset: -40,
            overflow: "hidden",
            filter: "blur(48px) brightness(0.65) saturate(1.2)",
            transform: `scale(${1.15 + Math.sin(frame * 0.0018) * 0.02})`,
            opacity: 0.85,
            pointerEvents: "none",
          }}
        >
          <Img
            src={resolvedSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* 3. Hero Song Cover Artwork (The Star of the Scene) */}
      {resolvedSrc ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `translate3d(${panX.toFixed(2)}px, ${panY.toFixed(2)}px, 0) scale(${kenBurnsScale.toFixed(4)})`,
            filter: `brightness(${exposure.toFixed(3)}) contrast(1.02)`,
            willChange: "transform, filter",
          }}
        >
          <Img
            src={resolvedSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: isLandscape ? "cover" : "contain",
              objectPosition: focalPoint,
            }}
          />
        </div>
      ) : (
        /* Graceful non-eclipse atmospheric fallback */
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 40%, #1F2438 0%, #0D101A 60%, #05060A 100%)",
          }}
        />
      )}

      {/* 4. Drifting 35mm Cinematic Atmospheric Particles */}
      {enableParticles && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        >
          {PARTICLES.map((p, i) => {
            const currentX = (p.x + Math.sin(frame * p.speed + i) * p.amplitude + 100) % 100;
            const currentY = (p.y - (frame * p.speed * 8) % 100 + 100) % 100;
            return (
              <circle
                key={i}
                cx={`${currentX}%`}
                cy={`${currentY}%`}
                r={p.r}
                fill="#FFF4D4"
                opacity={p.opacity}
                filter="blur(0.8px)"
              />
            );
          })}
        </svg>
      )}

      {/* 5. Feathered Negative-Space Scrim (Guarantees 100% lyric readability without cards or pill badges) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            lyricsPosition === "bottom"
              ? "linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.45) 32%, rgba(0, 0, 0, 0.15) 55%, transparent 75%)"
              : lyricsPosition === "top"
              ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.45) 32%, rgba(0, 0, 0, 0.15) 55%, transparent 75%)"
              : "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 55%, transparent 80%)",
        }}
      />

      {/* 6. Subtle Edge Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          boxShadow: "inset 0 0 120px rgba(0, 0, 0, 0.55)",
        }}
      />
    </div>
  );
};
