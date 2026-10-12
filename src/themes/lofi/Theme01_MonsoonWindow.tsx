import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme01_MonsoonWindow: React.FC<ThemeProps> = ({
  lyrics = "Bheegi si sadkon pe khamosh lamhe...",
  accent = "BE-WAJAH",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Rain drop & wisp animations
  const rainOffset = (frame * 3) % 400;
  const streetlightPulse = 0.85 + Math.sin(frame * 0.05) * 0.15;
  const lampGlow = 0.9 + Math.cos(frame * 0.03) * 0.1;

  // Steamed Window with Streetlamp & Rain Metaphor
  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(224, 242, 254, 0.12)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7), 0 0 80px rgba(245, 158, 11, 0.12)",
        backgroundColor: "#080D1A",
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
          {/* Deep Rainy Indigo Backdrop */}
          <radialGradient id="lampGlow" cx="68%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#FFAA2A" stopOpacity={0.45 * lampGlow} />
            <stop offset="35%" stopColor="#F59E0B" stopOpacity={0.2 * lampGlow} />
            <stop offset="70%" stopColor="#1E293B" stopOpacity={0.1} />
            <stop offset="100%" stopColor="#080D1A" stopOpacity="0" />
          </radialGradient>

          {/* Rain Streak Gradient */}
          <linearGradient id="rainStreak" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0" />
            <stop offset="60%" stopColor="#93C5FD" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.7" />
          </linearGradient>

          {/* Glass Condensation Frost Filter */}
          <radialGradient id="glassFrost" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0B132B" stopOpacity="0.35" />
          </radialGradient>
        </defs>

        {/* 1. Nocturnal Distant Sky */}
        <rect width="520" height="420" fill="#080D1A" />
        <rect width="520" height="420" fill="url(#glassFrost)" />

        {/* 2. Lone Distant Sodium Streetlamp (Bokeh Disc) */}
        <circle cx="350" cy="150" r="140" fill="url(#lampGlow)" />
        <circle
          cx="350"
          cy="150"
          r="16"
          fill="#FFFBEB"
          filter="drop-shadow(0 0 25px rgba(254, 240, 138, 0.9))"
          opacity={streetlightPulse}
        />
        {/* Lamp Post Silhouette */}
        <path
          d="M 350 166 L 350 420 M 342 166 L 358 166"
          stroke="#0F172A"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 3. Diagonal Falling Rain Streaks */}
        {[
          { x: 40, y: (rainOffset * 1.8 + 20) % 440, l: 45 },
          { x: 120, y: (rainOffset * 2.1 + 180) % 440, l: 60 },
          { x: 190, y: (rainOffset * 1.6 + 90) % 440, l: 40 },
          { x: 280, y: (rainOffset * 2.4 + 310) % 440, l: 70 },
          { x: 370, y: (rainOffset * 1.9 + 50) % 440, l: 50 },
          { x: 440, y: (rainOffset * 2.2 + 220) % 440, l: 65 },
          { x: 490, y: (rainOffset * 1.7 + 140) % 440, l: 35 },
        ].map((drop, i) => (
          <line
            key={`rain-${i}`}
            x1={drop.x}
            y1={drop.y - drop.l}
            x2={drop.x + 8}
            y2={drop.y}
            stroke="url(#rainStreak)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {/* 4. Foreground Steamed Windowpane Condensation Droplets */}
        {[
          { cx: 160, cy: 110, r: 6 },
          { cx: 163, cy: 135, r: 4 },
          { cx: 164, cy: 165, r: 3 },
          { cx: 220, cy: 240, r: 8 },
          { cx: 222, cy: 280, r: 5 },
          { cx: 90, cy: 190, r: 7 },
          { cx: 310, cy: 320, r: 9 },
          { cx: 312, cy: 355, r: 5 },
          { cx: 420, cy: 90, r: 6 },
          { cx: 423, cy: 120, r: 4 },
        ].map((d, i) => (
          <g key={`drop-${i}`}>
            <ellipse
              cx={d.cx}
              cy={d.cy}
              rx={d.r}
              ry={d.r * 1.3}
              fill="rgba(224, 242, 254, 0.45)"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="0.8"
            />
            {/* Specular highlight */}
            <circle cx={d.cx - d.r * 0.3} cy={d.cy - d.r * 0.4} r={d.r * 0.3} fill="#FFFFFF" />
          </g>
        ))}

        {/* Window Pane Minimal Wood Frame Division */}
        <line x1="260" y1="0" x2="260" y2="420" stroke="rgba(15, 23, 42, 0.85)" strokeWidth="8" />
        <line x1="0" y1="210" x2="520" y2="210" stroke="rgba(15, 23, 42, 0.85)" strokeWidth="8" />
      </svg>
    </div>
  );

  // Typography Layer
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
          backgroundColor: "rgba(245, 158, 11, 0.12)",
          border: "1px solid rgba(245, 158, 11, 0.35)",
          color: "#F59E0B",
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
          color: "#F1F5F9",
          lineHeight: 1.25,
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
        }}
      >
        {lyrics}
      </div>

      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "17px",
          color: "#94A3B8",
          letterSpacing: "0.08em",
        }}
      >
        Midnight rain on quiet streets • Lofi Piano & Vinyl
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#070B14",
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
      {/* Background Ambience */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {visual}
      {typo}
      <FilmAtmosphere dustCount={12} vignetteStrength={0.5} />
    </div>
  );
};
