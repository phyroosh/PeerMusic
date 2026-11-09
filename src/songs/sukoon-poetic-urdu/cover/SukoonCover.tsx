import React, { useMemo } from "react";
import { PeerMusicLogoBadge } from "../../../themes/peermusic-styles/PeerMusicLogoBadge";

// =========================================================================
// 1. Sukoon 16:9 Dedicated Widescreen Cover (1920 × 1080 YouTube Thumbnail)
// Theme: The Dawn Summit & Soaring Flight
// =========================================================================
export const SukoonCover16x9: React.FC = () => {
  // Dynamic flock of soaring white birds / cranes arcing across the sky
  const birds = useMemo(() => {
    return [
      { x: 1350, y: 460, scale: 0.9, rot: -28 },
      { x: 1220, y: 410, scale: 0.8, rot: -32 },
      { x: 1120, y: 350, scale: 0.72, rot: -25 },
      { x: 1040, y: 280, scale: 0.65, rot: -35 },
      { x: 960, y: 230, scale: 0.58, rot: -30 },
      { x: 900, y: 180, scale: 0.52, rot: -38 },
      { x: 830, y: 140, scale: 0.46, rot: -28 },
      { x: 1290, y: 530, scale: 0.75, rot: -22 },
      { x: 1180, y: 490, scale: 0.68, rot: -36 },
      { x: 1080, y: 430, scale: 0.62, rot: -29 },
    ];
  }, []);

  // Golden sunbeams radiating from the sunrise
  const sunbeams = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      angle: 190 + i * 20,
      width: 40 + (i % 3) * 25,
      opacity: 0.18 + (i % 3) * 0.08,
      seed: i,
    }));
  }, []);

  // Floating golden starlight and sun dust motes
  const dustMotes = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      x: (i * 47) % 1920,
      y: (i * 29) % 1080,
      size: 2 + (i % 4) * 1.5,
      opacity: 0.25 + (i % 5) * 0.12,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#050811",
        overflow: "hidden",
        fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
      }}
    >
      {/* 1. Dramatic Sunrise Horizon Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #070B16 0%, #0F172A 35%, #311B28 55%, #7C2D12 70%, #C2410C 85%, #F59E0B 100%)",
        }}
      />

      {/* 2. Blazing Golden Dawn Sun Core (Lower-Right @ x: 1520, y: 640) */}
      <div
        style={{
          position: "absolute",
          left: 1520,
          top: 640,
          transform: "translate(-50%, -50%)",
          width: 580,
          height: 580,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #FFFBEB 0%, #FEF08A 25%, #F59E0B 50%, rgba(220, 38, 38, 0.4) 75%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      {/* 3. Volumetric Sunbeams Piercing Through Sky */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="sunbeamGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>
        {sunbeams.map((b) => (
          <polygon
            key={b.seed}
            points={`1520,640 ${1520 + Math.cos((b.angle * Math.PI) / 180) * 1800},${640 + Math.sin((b.angle * Math.PI) / 180) * 1800} ${1520 + Math.cos(((b.angle + 8) * Math.PI) / 180) * 1800},${640 + Math.sin(((b.angle + 8) * Math.PI) / 180) * 1800}`}
            fill="url(#sunbeamGrad)"
            opacity={b.opacity}
          />
        ))}
      </svg>

      {/* 4. Layered Mountain Ridges with Chiaroscuro Depth */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="backRidge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E1065" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="foreRidge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="40%" stopColor="#1C1917" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
        </defs>

        {/* Distant Mountain Ridge */}
        <path
          d="M 680 750 L 1050 620 L 1380 690 L 1650 580 L 1920 640 L 1920 1080 L 680 1080 Z"
          fill="url(#backRidge)"
          opacity="0.85"
        />

        {/* Foreground Dramatic Summit Precipice (Anchors Right: x: 1400 - 1920) */}
        <path
          d="M 980 1080 L 1260 810 L 1460 620 L 1620 680 L 1920 620 L 1920 1080 Z"
          fill="url(#foreRidge)"
          filter="drop-shadow(0 -15px 30px rgba(0,0,0,0.8))"
        />

        {/* Golden Rim Light along the summit edge */}
        <path
          d="M 1260 810 L 1460 620 L 1620 680 L 1920 620"
          stroke="#FDE68A"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #F59E0B)"
        />

        {/* Solitary Silhouette Standing Tall on Summit Peak (x: 1460, y: 620) */}
        <g transform="translate(1460, 620)">
          {/* Head & Torso */}
          <ellipse cx="0" cy="-68" rx="9" ry="11" fill="#09090B" />
          <path d="M -12 -55 L 12 -55 L 10 0 L -10 0 Z" fill="#09090B" />

          {/* Arms Open Wide in Complete Release & Freedom */}
          <path
            d="M -10 -45 Q -38 -55 -65 -40 M 10 -45 Q 38 -55 65 -40"
            stroke="#09090B"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Golden Rim Highlights on the silhouette */}
          <ellipse cx="2" cy="-68" rx="8" ry="10" fill="none" stroke="#FEF08A" strokeWidth="1.5" opacity="0.8" />
          <path
            d="M -10 -45 Q -38 -55 -65 -40 M 10 -45 Q 38 -55 65 -40"
            stroke="#FEF08A"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </g>

        {/* 5. Flock of White Birds / Origami Cranes Soaring into the Sky */}
        {birds.map((b, idx) => (
          <g
            key={idx}
            transform={`translate(${b.x}, ${b.y}) scale(${b.scale}) rotate(${b.rot})`}
          >
            {/* Left Wing */}
            <path
              d="M 0 0 Q -24 -20 -44 -10 Q -24 5 0 3"
              fill="#FFFBEB"
              filter="drop-shadow(0 0 8px rgba(254, 240, 138, 0.9))"
            />
            {/* Right Wing */}
            <path
              d="M 0 0 Q 24 -20 44 -10 Q 24 5 0 3"
              fill="#FFFBEB"
              filter="drop-shadow(0 0 8px rgba(254, 240, 138, 0.9))"
            />
            {/* Body */}
            <ellipse cx="0" cy="0" rx="3.5" ry="12" fill="#FEF3C7" />
          </g>
        ))}
      </svg>

      {/* 6. Floating Golden Light Dust Motes */}
      {dustMotes.map((m) => (
        <div
          key={m.seed}
          style={{
            position: "absolute",
            left: m.x,
            top: m.y,
            width: m.size,
            height: m.size,
            borderRadius: "50%",
            backgroundColor: "#FEF08A",
            boxShadow: "0 0 8px #F59E0B",
            opacity: m.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 7. Asymmetric Left Editorial Typography Field */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 140,
          width: 860,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          zIndex: 40,
        }}
      >
        {/* Monumental Song Title */}
        <h1
          style={{
            margin: 0,
            fontSize: "128px",
            fontWeight: 800,
            letterSpacing: "8px",
            color: "#FAF4E8",
            lineHeight: 1.05,
            textShadow:
              "0 0 35px rgba(245, 158, 11, 0.7), 0 0 70px rgba(220, 38, 38, 0.35), 0 6px 22px rgba(0, 0, 0, 0.95)",
          }}
        >
          SUKOON
        </h1>

        {/* Poetic Subtitle */}
        <p
          style={{
            margin: "22px 0 0 0",
            fontSize: "38px",
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "2.5px",
            color: "#E5B869",
            textShadow:
              "0 2px 14px rgba(0, 0, 0, 0.9), 0 0 20px rgba(229, 184, 105, 0.45)",
          }}
        >
          Maine Khud Ko Maaf Kar Diya
        </p>
      </div>

      {/* 8. Official PeerMusic Circular Branding Badge (Upper Right) */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 70,
          zIndex: 50,
        }}
      >
        <PeerMusicLogoBadge size={54} glowIntensity={1.35} />
      </div>

      {/* 9. Cinematic Vignette Framing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow:
            "inset 0 0 180px rgba(0, 0, 0, 0.92), inset 0 0 70px rgba(0, 0, 0, 0.7)",
          pointerEvents: "none",
          zIndex: 45,
        }}
      />
    </div>
  );
};


// =========================================================================
// 2. Sukoon 1:1 Dedicated Square Cover (1500 × 1500 Streaming Distribution)
// Theme: The Dawn Summit & Soaring Flight
// =========================================================================
export const SukoonCover1x1: React.FC = () => {
  // Symmetrical bird flock soaring upward on square canvas
  const birds = useMemo(() => {
    return [
      { x: 620, y: 760, scale: 0.85, rot: -30 },
      { x: 880, y: 760, scale: 0.85, rot: 30 },
      { x: 520, y: 660, scale: 0.72, rot: -38 },
      { x: 980, y: 660, scale: 0.72, rot: 38 },
      { x: 440, y: 550, scale: 0.62, rot: -44 },
      { x: 1060, y: 550, scale: 0.62, rot: 44 },
      { x: 680, y: 620, scale: 0.78, rot: -18 },
      { x: 820, y: 620, scale: 0.78, rot: 18 },
      { x: 750, y: 530, scale: 0.7, rot: 0 },
    ];
  }, []);

  // Golden sunbeams radiating upward from behind the summit
  const sunbeams = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => ({
      angle: 220 + i * 15,
      width: 45 + (i % 3) * 20,
      opacity: 0.16 + (i % 3) * 0.08,
      seed: i,
    }));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: 1500,
        height: 1500,
        backgroundColor: "#050811",
        overflow: "hidden",
        fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
      }}
    >
      {/* 1. Deep Midnight Twilight & Sunrise Glow Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #070B16 0%, #111827 35%, #311B28 55%, #7C2D12 70%, #C2410C 85%, #F59E0B 100%)",
        }}
      />

      {/* 2. Central Blazing Dawn Sun (Center: x: 750, y: 950) */}
      <div
        style={{
          position: "absolute",
          left: 750,
          top: 950,
          transform: "translate(-50%, -50%)",
          width: 580,
          height: 580,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #FFFBEB 0%, #FEF08A 28%, #F59E0B 52%, rgba(220, 38, 38, 0.4) 75%, transparent 100%)",
          filter: "blur(42px)",
        }}
      />

      {/* 3. Radial Volumetric Sunbeams */}
      <svg
        viewBox="0 0 1500 1500"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="sunbeamSquare" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>
        {sunbeams.map((b) => (
          <polygon
            key={b.seed}
            points={`750,950 ${750 + Math.cos((b.angle * Math.PI) / 180) * 1600},${950 + Math.sin((b.angle * Math.PI) / 180) * 1600} ${750 + Math.cos(((b.angle + 8) * Math.PI) / 180) * 1600},${950 + Math.sin(((b.angle + 8) * Math.PI) / 180) * 1600}`}
            fill="url(#sunbeamSquare)"
            opacity={b.opacity}
          />
        ))}
      </svg>

      {/* 4. Layered Mountain Summit & Solitary Silhouette (Lower Half) */}
      <svg
        viewBox="0 0 1500 1500"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="foreRidgeSquare" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="35%" stopColor="#1C1917" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
        </defs>

        {/* Mountain Summit Base */}
        <path
          d="M 0 1500 L 320 1150 L 750 920 L 1180 1150 L 1500 1500 Z"
          fill="url(#foreRidgeSquare)"
          filter="drop-shadow(0 -15px 35px rgba(0,0,0,0.85))"
        />

        {/* Golden Ridge Rim Light */}
        <path
          d="M 320 1150 L 750 920 L 1180 1150"
          stroke="#FDE68A"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #F59E0B)"
        />

        {/* Solitary Silhouette Standing on the Peak (x: 750, y: 920) */}
        <g transform="translate(750, 920)">
          {/* Head & Torso */}
          <ellipse cx="0" cy="-72" rx="10" ry="12" fill="#09090B" />
          <path d="M -13 -58 L 13 -58 L 11 0 L -11 0 Z" fill="#09090B" />

          {/* Arms Open Wide to the Dawn */}
          <path
            d="M -11 -48 Q -40 -58 -68 -42 M 11 -48 Q 40 -58 68 -42"
            stroke="#09090B"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Golden Rim Highlights */}
          <ellipse cx="0" cy="-72" rx="9" ry="11" fill="none" stroke="#FEF08A" strokeWidth="1.5" opacity="0.85" />
          <path
            d="M -11 -48 Q -40 -58 -68 -42 M 11 -48 Q 40 -58 68 -42"
            stroke="#FEF08A"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </g>

        {/* Symmetrical Birds Flocking Upward */}
        {birds.map((b, idx) => (
          <g
            key={idx}
            transform={`translate(${b.x}, ${b.y}) scale(${b.scale}) rotate(${b.rot})`}
          >
            <path
              d="M 0 0 Q -24 -20 -44 -10 Q -24 5 0 3"
              fill="#FFFBEB"
              filter="drop-shadow(0 0 8px rgba(254, 240, 138, 0.9))"
            />
            <path
              d="M 0 0 Q 24 -20 44 -10 Q 24 5 0 3"
              fill="#FFFBEB"
              filter="drop-shadow(0 0 8px rgba(254, 240, 138, 0.9))"
            />
            <ellipse cx="0" cy="0" rx="3.5" ry="12" fill="#FEF3C7" />
          </g>
        ))}
      </svg>

      {/* 5. Centered Masthead Editorial Typography (Top 35%) */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 40,
        }}
      >
        {/* Monumental Song Title */}
        <h1
          style={{
            margin: 0,
            fontSize: "136px",
            fontWeight: 800,
            letterSpacing: "9px",
            color: "#FAF4E8",
            lineHeight: 1.05,
            textShadow:
              "0 0 35px rgba(245, 158, 11, 0.7), 0 0 70px rgba(220, 38, 38, 0.35), 0 6px 22px rgba(0, 0, 0, 0.95)",
          }}
        >
          SUKOON
        </h1>

        {/* Poetic Subtitle */}
        <p
          style={{
            margin: "24px 0 0 0",
            fontSize: "40px",
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "2.5px",
            color: "#E5B869",
            textShadow:
              "0 2px 14px rgba(0, 0, 0, 0.9), 0 0 20px rgba(229, 184, 105, 0.45)",
          }}
        >
          Maine Khud Ko Maaf Kar Diya
        </p>
      </div>

      {/* 6. Official PeerMusic Circular Branding Badge (Upper Left) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 70,
          zIndex: 50,
        }}
      >
        <PeerMusicLogoBadge size={60} glowIntensity={1.35} />
      </div>

      {/* 7. Cinematic Vignette Framing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow:
            "inset 0 0 180px rgba(0, 0, 0, 0.92), inset 0 0 70px rgba(0, 0, 0, 0.7)",
          pointerEvents: "none",
          zIndex: 45,
        }}
      />
    </div>
  );
};
