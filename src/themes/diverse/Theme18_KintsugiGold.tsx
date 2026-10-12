import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme18_KintsugiGold: React.FC<ThemeProps> = ({
  lyrics = "Toota hua dil bhi sonay sa chamka...",
  accent = "KINTSUGI // GOLDEN REPAIR",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Molten gold seam pulsing luminescence
  const goldPulse = 0.88 + Math.sin(frame * 0.08) * 0.12;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0D0D10",
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
      {/* Background Zen Stone Warm Light Cone */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: isLandscape ? "15%" : "50%",
          transform: isLandscape ? "none" : "translateX(-50%)",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, rgba(197, 155, 39, 0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Visual: Cracked Ceramic Bowl with Molten Gold Seams (SVG) */}
      <div
        style={{
          position: "relative",
          width: isLandscape ? "520px" : "360px",
          height: isLandscape ? "420px" : "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 520 420"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Charcoal Ceramic Texture */}
            <linearGradient id="charcoalClay" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#25252B" />
              <stop offset="50%" stopColor="#18181D" />
              <stop offset="100%" stopColor="#0F0F13" />
            </linearGradient>

            {/* Glowing Liquid Gold Seam Gradient */}
            <linearGradient id="liquidGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="45%" stopColor="#FFD700" />
              <stop offset="80%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8A6D1C" />
            </linearGradient>
          </defs>

          {/* Ceramic Bowl Pedestal Silhouette */}
          <ellipse cx="260" cy="340" rx="90" ry="14" fill="#08080A" filter="blur(10px)" />

          {/* Main Ceramic Bowl Geometry */}
          <g transform="translate(260, 220)">
            {/* Outer Ceramic Hemispherical Vessel */}
            <path
              d="M -160 -40 C -160 110, 160 110, 160 -40 Q 0 -60, -160 -40 Z"
              fill="url(#charcoalClay)"
              stroke="#2E2E36"
              strokeWidth="2.5"
              filter="drop-shadow(0 20px 40px rgba(0,0,0,0.85))"
            />
            {/* Bowl Rim Lip */}
            <ellipse cx="0" cy="-40" rx="160" ry="24" fill="#15151A" stroke="#33333D" strokeWidth="2" />

            {/* Molten Liquid Gold Kintsugi Fractures */}
            {/* Main Primary Fracture Seam */}
            <path
              d="M -80 -40 Q -50 0, -30 20 T 10 55 T 40 90"
              fill="none"
              stroke="url(#liquidGold)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))"
              opacity={goldPulse}
            />
            {/* Branch Fracture 1 */}
            <path
              d="M -30 20 Q 20 10, 80 15 T 130 -30"
              fill="none"
              stroke="url(#liquidGold)"
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px rgba(255, 215, 0, 0.7))"
              opacity={goldPulse}
            />
            {/* Branch Fracture 2 */}
            <path
              d="M 10 55 Q -20 70, -70 80"
              fill="none"
              stroke="url(#liquidGold)"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px rgba(255, 215, 0, 0.7))"
              opacity={goldPulse}
            />

            {/* Golden Specular Solder Droplets */}
            <circle cx="-30" cy="20" r="5" fill="#FFF8C4" filter="drop-shadow(0 0 6px #FFD700)" />
            <circle cx="10" cy="55" r="4.5" fill="#FFF8C4" filter="drop-shadow(0 0 6px #FFD700)" />
            <circle cx="80" cy="15" r="4" fill="#FFF8C4" filter="drop-shadow(0 0 6px #FFD700)" />
          </g>
        </svg>
      </div>

      {/* Right: Wabi-Sabi Poetic Typography */}
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
            backgroundColor: "rgba(255, 215, 0, 0.14)",
            border: "1px solid rgba(255, 215, 0, 0.45)",
            color: "#FFD700",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.24em",
            width: "fit-content",
          }}
        >
          {accent}
        </div>

        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: isLandscape ? "46px" : "32px",
            fontWeight: 700,
            color: "#F6F5F2",
            lineHeight: 1.28,
            textShadow: "0 0 25px rgba(255, 215, 0, 0.35)",
          }}
        >
          {lyrics}
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px",
            color: "#A8A49C",
            letterSpacing: "0.08em",
          }}
        >
          Cracked earthenware healed with molten gold • Wabi-Sabi Ballad
        </div>
      </div>

      <FilmAtmosphere dustCount={14} vignetteStrength={0.5} />
    </div>
  );
};
