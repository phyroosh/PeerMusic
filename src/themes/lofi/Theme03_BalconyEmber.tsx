import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme03_BalconyEmber: React.FC<ThemeProps> = ({
  lyrics = "Tanhaaiyon ka ye ajeeb sa shor...",
  accent = "KHAAMOSHI // 02:45 AM",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Ember pulse & floating smoke
  const emberPulse = 0.85 + Math.sin(frame * 0.1) * 0.15;
  const smokeWisp1 = Math.sin(frame * 0.06) * 12;
  const smokeWisp2 = Math.cos(frame * 0.05 + 1.2) * 15;
  const smokeRise = (frame * 1.8) % 180;

  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 60px rgba(255, 60, 40, 0.12)",
        backgroundColor: "#07060E",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 520 420"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          {/* Deep Midnight Sky Gradient */}
          <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B0918" />
            <stop offset="50%" stopColor="#15122B" />
            <stop offset="100%" stopColor="#251F47" />
          </linearGradient>

          {/* Ember Hot Glow */}
          <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity={emberPulse} />
            <stop offset="40%" stopColor="#FF2E1F" stopOpacity={0.7 * emberPulse} />
            <stop offset="100%" stopColor="#FF1100" stopOpacity="0" />
          </radialGradient>

          {/* Smoke Gradient */}
          <linearGradient id="smokeLine" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(255, 140, 100, 0.35)" />
            <stop offset="60%" stopColor="rgba(200, 190, 230, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>

        {/* 1. Nocturnal Sky & Distant Stars */}
        <rect width="520" height="420" fill="url(#nightSky)" />
        {[
          { cx: 80, cy: 50, r: 1.2 },
          { cx: 160, cy: 30, r: 1.5 },
          { cx: 240, cy: 75, r: 1 },
          { cx: 320, cy: 40, r: 1.8 },
          { cx: 430, cy: 60, r: 1.2 },
          { cx: 480, cy: 30, r: 1 },
        ].map((s, i) => (
          <circle key={`star-${i}`} cx={s.cx} cy={s.cy} r={s.r} fill="#E2DCF7" opacity="0.6" />
        ))}

        {/* Crescent Moon */}
        <path
          d="M 420 70 A 24 24 0 1 0 442 98 A 20 20 0 1 1 420 70 Z"
          fill="#FFFDF0"
          filter="drop-shadow(0 0 14px rgba(255, 250, 220, 0.7))"
        />

        {/* 2. Layered City Skyline Silhouettes */}
        {/* Distant Layer */}
        <path
          d="M 0 320 L 50 320 L 50 260 L 90 260 L 90 320 L 160 320 L 160 280 L 210 280 L 210 320 L 310 320 L 310 250 L 360 250 L 360 320 L 440 320 L 440 290 L 520 290 L 520 420 L 0 420 Z"
          fill="#110E22"
          opacity="0.85"
        />
        {/* Midground Layer */}
        <path
          d="M 0 350 L 70 350 L 70 310 L 120 310 L 120 350 L 200 350 L 200 290 L 270 290 L 270 350 L 380 350 L 380 310 L 450 310 L 450 350 L 520 350 L 520 420 L 0 420 Z"
          fill="#0B0916"
        />

        {/* City Window Dots */}
        {[
          { x: 55, y: 275 },
          { x: 75, y: 290 },
          { x: 175, y: 300 },
          { x: 325, y: 270 },
          { x: 345, y: 285 },
          { x: 400, y: 325 },
        ].map((w, i) => (
          <rect key={`win-${i}`} x={w.x} y={w.y} width="4" height="6" fill="#FDE047" opacity="0.4" />
        ))}

        {/* 3. Balcony Railing (Foreground Architectural Lines) */}
        <line x1="0" y1="360" x2="520" y2="360" stroke="#1E1A33" strokeWidth="8" />
        <line x1="0" y1="410" x2="520" y2="410" stroke="#1E1A33" strokeWidth="6" />
        {[40, 100, 160, 220, 280, 340, 400, 460].map((rx) => (
          <line key={`balcony-post-${rx}`} x1={rx} y1="360" x2={rx} y2="420" stroke="#1E1A33" strokeWidth="5" />
        ))}

        {/* 4. Solitary Glowing Cigarette Resting on Railing */}
        <g transform="translate(190, 350)">
          {/* Cigarette Body */}
          <rect x="0" y="0" width="70" height="7" rx="2" fill="#EAE5DC" />
          {/* Filter Tip */}
          <rect x="52" y="0" width="18" height="7" rx="1" fill="#C98A4B" />

          {/* Burning Ember Tip */}
          <circle cx="0" cy="3.5" r="16" fill="url(#emberGlow)" />
          <circle cx="0" cy="3.5" r="3.5" fill="#FFF275" />

          {/* Rising Smoke Wisps */}
          <path
            d={`M 0 0 Q ${-10 + smokeWisp1} ${-50 - smokeRise * 0.4}, ${smokeWisp2} ${-120 - smokeRise * 0.7} T ${smokeWisp1 * 1.5} ${-180 - smokeRise * 0.9}`}
            fill="none"
            stroke="url(#smokeLine)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );

  const typo = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        maxWidth: "600px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "6px",
          backgroundColor: "rgba(255, 59, 48, 0.12)",
          border: "1px solid rgba(255, 59, 48, 0.35)",
          color: "#FF5E57",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          width: "fit-content",
        }}
      >
        {accent}
      </div>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: isLandscape ? "44px" : "32px",
          fontWeight: 700,
          color: "#EDE9FE",
          lineHeight: 1.25,
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
        }}
      >
        {lyrics}
      </div>

      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "17px",
          color: "#A78BFA",
          letterSpacing: "0.08em",
        }}
      >
        Balcony solitude under late-night skies • Moody Acoustic Beats
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#06050C",
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isLandscape ? "80px" : "40px",
        padding: isLandscape ? "80px 100px" : "40px 30px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Violet Aura */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {visual}
      {typo}
      <FilmAtmosphere dustCount={12} vignetteStrength={0.55} />
    </div>
  );
};
