import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme20_MilkyWayCampfire: React.FC<ThemeProps> = ({
  lyrics = "Aag ke alaav mein beeti sard raat...",
  accent = "CAMPFIRE // MILKY WAY",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Campfire flame flickering & ember float
  const flame1 = Math.sin(frame * 0.25) * 8;
  const flame2 = Math.cos(frame * 0.3 + 1) * 10;
  const emberRise = (frame * 2.4) % 360;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#050B0B",
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isLandscape ? "80px 100px" : "40px 24px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Visual: Mountain Pine Campfire under Milky Way (SVG) */}
      <div
        style={{
          position: "relative",
          width: isLandscape ? "520px" : "360px",
          height: isLandscape ? "420px" : "300px",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(255, 120, 0, 0.25)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.9), 0 0 80px rgba(255, 120, 0, 0.15)",
          backgroundColor: "#04090E",
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
            {/* Deep Cosmic Milky Way Sky Gradient */}
            <linearGradient id="milkyWaySky" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="40%" stopColor="#1C1B3A" />
              <stop offset="70%" stopColor="#2E1840" />
              <stop offset="100%" stopColor="#061014" />
            </linearGradient>

            {/* Campfire Flame Gradients */}
            <radialGradient id="flameHot" cx="50%" cy="80%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FFE082" />
              <stop offset="60%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#E65100" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Midnight Sky */}
          <rect width="520" height="420" fill="url(#milkyWaySky)" />

          {/* Milky Way Diagonal Stardust Band */}
          <path
            d="M 50 0 Q 280 200, 480 420"
            fill="none"
            stroke="rgba(218, 165, 255, 0.15)"
            strokeWidth="90"
            filter="blur(25px)"
          />

          {/* Star Field */}
          {[
            { cx: 70, cy: 60, r: 1.2 },
            { cx: 140, cy: 30, r: 1.5 },
            { cx: 210, cy: 80, r: 1 },
            { cx: 290, cy: 40, r: 1.8 },
            { cx: 360, cy: 90, r: 1.2 },
            { cx: 430, cy: 50, r: 1.5 },
            { cx: 470, cy: 110, r: 1 },
          ].map((s, i) => (
            <circle key={`star-camp-${i}`} cx={s.cx} cy={s.cy} r={s.r} fill="#FFFFFF" opacity="0.8" />
          ))}

          {/* 2. Pine Tree Silhouettes on Left and Right */}
          {/* Left Pines */}
          <polygon points="50,160 30,220 70,220" fill="#030807" />
          <polygon points="50,200 20,270 80,270" fill="#030807" />
          <polygon points="50,250 10,340 90,340" fill="#030807" />
          <rect x="45" y="340" width="10" height="40" fill="#020504" />

          {/* Right Pines */}
          <polygon points="460,180 440,240 480,240" fill="#030807" />
          <polygon points="460,220 430,290 490,290" fill="#030807" />
          <polygon points="460,270 420,350 500,350" fill="#030807" />
          <rect x="455" y="350" width="10" height="30" fill="#020504" />

          {/* Ground Silhouette */}
          <rect x="0" y="360" width="520" height="60" fill="#04090A" />

          {/* 3. Campfire Assembly (Rocks, Wood Logs, Flames) */}
          <g transform="translate(260, 360)">
            {/* Ground Fire Glow Halo */}
            <circle cx="0" cy="0" r="140" fill="rgba(255, 120, 0, 0.18)" filter="blur(25px)" />

            {/* Firepit River Stones */}
            {[-50, -35, -20, 0, 20, 35, 50].map((rx, idx) => (
              <ellipse key={`stone-${idx}`} cx={rx} cy={10} rx="12" ry="8" fill="#1B1F22" stroke="#2D3338" strokeWidth="1" />
            ))}

            {/* Crossed Birch Wood Logs */}
            <line x1="-40" y1="12" x2="40" y2="-8" stroke="#3E2723" strokeWidth="10" strokeLinecap="round" />
            <line x1="40" y1="12" x2="-40" y2="-8" stroke="#4E342E" strokeWidth="10" strokeLinecap="round" />

            {/* Crackling Golden Orange Fire Tongue Shapes */}
            {/* Outer Flame */}
            <path
              d={`M -25 5 Q ${-10 + flame1} -50, 0 -95 Q ${10 + flame2} -50, 25 5 Z`}
              fill="url(#flameHot)"
              filter="drop-shadow(0 0 16px rgba(255, 120, 0, 0.9))"
            />
            {/* Inner Core Flame */}
            <path
              d={`M -14 5 Q ${-5 + flame2 * 0.5} -35, 0 -65 Q ${5 + flame1 * 0.5} -35, 14 5 Z`}
              fill="#FFF8E1"
            />

            {/* Rising Sparks / Embers drifting to stars */}
            {[
              { x: -10, y: (-20 - emberRise * 0.7) % 360, r: 2.5 },
              { x: 12, y: (-40 - emberRise * 0.9) % 360, r: 2 },
              { x: -5, y: (-60 - emberRise * 1.1) % 360, r: 3 },
              { x: 18, y: (-80 - emberRise * 0.8) % 360, r: 2 },
              { x: -15, y: (-110 - emberRise * 1.2) % 360, r: 2.2 },
            ].map((eb, i) => (
              <circle
                key={`ember-${i}`}
                cx={eb.x}
                cy={eb.y}
                r={eb.r}
                fill="#FFD54F"
                filter="drop-shadow(0 0 4px #FF9800)"
                opacity={Math.max(0, 1 + eb.y / 360)}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Right: Wilderness Campfire Typography */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "580px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 120, 0, 0.16)",
            border: "1px solid rgba(255, 120, 0, 0.45)",
            color: "#FFA726",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            width: "fit-content",
          }}
        >
          {accent}
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: isLandscape ? "46px" : "32px",
            fontWeight: 800,
            color: "#FFF8E7",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            textShadow: "0 0 30px rgba(255, 120, 0, 0.4)",
          }}
        >
          {lyrics}
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px",
            color: "#CFD8DC",
            letterSpacing: "0.08em",
          }}
        >
          Wilderness stone campfire & soaring embers under the Milky Way • Acoustic Campfire Beats
        </div>
      </div>

      <FilmAtmosphere dustCount={14} vignetteStrength={0.5} />
    </div>
  );
};
