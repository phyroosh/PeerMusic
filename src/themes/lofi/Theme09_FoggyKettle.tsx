import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme09_FoggyKettle: React.FC<ThemeProps> = ({
  lyrics = "Dhoop ki pehli kiran aur garam chai...",
  accent = "KADAK // WINTER CHAI",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Kettle gentle hovering & tea stream flow
  const kettleHover = Math.sin(frame * 0.05) * 8;
  const kettleTilt = 12 + Math.sin(frame * 0.04) * 2;
  const steamWave1 = Math.sin(frame * 0.08) * 15;
  const steamWave2 = Math.cos(frame * 0.07 + 1) * 18;
  const steamRise = (frame * 1.6) % 150;

  const visual = (
    <div
      style={{
        position: "relative",
        width: isLandscape ? "520px" : "360px",
        height: isLandscape ? "420px" : "300px",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(230, 126, 34, 0.25)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(230, 126, 34, 0.15)",
        backgroundColor: "#0F1318",
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
          {/* Winter Morning Haze */}
          <linearGradient id="winterHaze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#121820" />
            <stop offset="60%" stopColor="#1E2836" />
            <stop offset="100%" stopColor="#28374A" />
          </linearGradient>

          {/* Aluminum Kettle Metal */}
          <linearGradient id="aluminumKettle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D5DCE2" />
            <stop offset="40%" stopColor="#9AA5B1" />
            <stop offset="70%" stopColor="#616E7C" />
            <stop offset="100%" stopColor="#3E4C59" />
          </linearGradient>

          {/* Pouring Golden Chai Stream */}
          <linearGradient id="teaStream" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF9F43" />
            <stop offset="50%" stopColor="#EE5A24" />
            <stop offset="100%" stopColor="#EA2027" />
          </linearGradient>

          {/* Steam Cloud Gradient */}
          <linearGradient id="denseSteam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(255, 159, 67, 0.3)" />
            <stop offset="50%" stopColor="rgba(240, 244, 248, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>

        {/* 1. Winter Foggy Background */}
        <rect width="520" height="420" fill="url(#winterHaze)" />

        {/* Morning Sunlight God-Rays through Fog */}
        <polygon points="180,0 260,0 420,420 280,420" fill="rgba(255, 223, 120, 0.08)" />
        <polygon points="320,0 390,0 520,380 440,420" fill="rgba(255, 223, 120, 0.05)" />

        {/* 2. Billowing Heavy Morning Steam */}
        <path
          d={`M 150 ${220 - steamRise} Q ${180 + steamWave1} ${140 - steamRise * 0.7}, ${200 + steamWave2} ${80 - steamRise * 0.5} T ${220 + steamWave1} 20`}
          fill="none"
          stroke="url(#denseSteam)"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d={`M 320 ${320 - steamRise} Q ${350 + steamWave2} ${240 - steamRise * 0.7}, ${340 + steamWave1} ${160 - steamRise * 0.5} T ${360 + steamWave2} 80`}
          fill="none"
          stroke="url(#denseSteam)"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* 3. Suspended Vintage Aluminum Chai Kettle */}
        <g transform={`translate(160, ${150 + kettleHover}) rotate(${kettleTilt}, 70, 70)`}>
          {/* Wire Handle Arch */}
          <path
            d="M 10 50 C 10 -20, 130 -20, 130 50"
            fill="none"
            stroke="#2E3842"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Wooden Grip on Handle */}
          <rect x="50" y="-18" width="40" height="12" rx="4" fill="#8B5A2B" stroke="#5C3A1E" strokeWidth="1" />

          {/* Kettle Spout Pouring Downwards */}
          <path
            d="M 130 80 Q 185 85, 195 125 L 180 130 Q 170 95, 125 95 Z"
            fill="url(#aluminumKettle)"
            stroke="#2E3842"
            strokeWidth="1.5"
          />

          {/* Kettle Ribbed Bulbous Body */}
          <ellipse cx="70" cy="90" rx="65" ry="50" fill="url(#aluminumKettle)" stroke="#2E3842" strokeWidth="2" />
          {/* Horizontal Embossed Ring Ribs */}
          <path d="M 15 90 Q 70 102, 125 90" fill="none" stroke="#616E7C" strokeWidth="2" />
          <path d="M 22 105 Q 70 118, 118 105" fill="none" stroke="#616E7C" strokeWidth="2" />

          {/* Lid & Knob */}
          <ellipse cx="70" cy="46" rx="35" ry="10" fill="url(#aluminumKettle)" stroke="#2E3842" strokeWidth="1.5" />
          <circle cx="70" cy="38" r="6" fill="#2E3842" />
        </g>

        {/* 4. Golden Chai Liquid Stream (From Spout to Glass) */}
        <path
          d={`M 330 250 Q ${335 + steamWave1 * 0.3} 300, 340 350`}
          fill="none"
          stroke="url(#teaStream)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="drop-shadow(0 0 10px rgba(255, 159, 67, 0.8))"
        />

        {/* 5. Fluted Cutting Chai Glass on Wooden Table */}
        {/* Table Surface */}
        <rect x="0" y="375" width="520" height="45" fill="#1C1814" />
        <line x1="0" y1="375" x2="520" y2="375" stroke="#382C22" strokeWidth="2" />

        {/* Cutting Glass */}
        <g transform="translate(315, 315)">
          {/* Glass Body */}
          <polygon points="12,0 38,0 34,60 16,60" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5" />
          {/* Chai Liquid in Glass */}
          <polygon points="13,15 37,15 34,58 16,58" fill="url(#teaStream)" />
          {/* Froth on top of Chai */}
          <ellipse cx="25" cy="15" rx="12" ry="3" fill="#FFEAA7" opacity="0.85" />
          {/* Fluted facets */}
          <line x1="20" y1="0" x2="19" y2="60" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
          <line x1="30" y1="0" x2="31" y2="60" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
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
          backgroundColor: "rgba(230, 126, 34, 0.16)",
          border: "1px solid rgba(230, 126, 34, 0.45)",
          color: "#E67E22",
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
          color: "#FDF8F0",
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
          color: "#D5A069",
          letterSpacing: "0.08em",
        }}
      >
        Cold winter mornings & steaming cutting chai • Cozy Sitar Lofi
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0B0E12",
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
      {/* Background Amber Steam Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230, 126, 34, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {visual}
      {typo}
      <FilmAtmosphere dustCount={14} vignetteStrength={0.5} />
    </div>
  );
};
