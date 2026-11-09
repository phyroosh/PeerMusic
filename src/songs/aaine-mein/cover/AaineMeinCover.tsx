import React, { useMemo } from "react";

// =========================================================================
// 1. Aaine Mein 16:9 Dedicated Widescreen Cover (1920 × 1080 YouTube Thumbnail)
// Theme: The Antique Baroque Mirror & Prismatic Twilight Horizon
// Architectural & Atmospheric Worldbuilding — Strictly Zero Human Bodies/Silhouettes
// =========================================================================
export const AaineMeinCover16x9: React.FC = () => {
  // Volumetric sunbeams streaming diagonally across the scene
  const sunbeams = useMemo(() => {
    return [
      { angle: 35, width: 100, opacity: 0.28, x: 1320, y: -80 },
      { angle: 42, width: 150, opacity: 0.35, x: 1480, y: -60 },
      { angle: 28, width: 80, opacity: 0.22, x: 1220, y: -100 },
      { angle: 48, width: 120, opacity: 0.25, x: 1640, y: -40 },
    ];
  }, []);

  // Golden starlight motes & atmospheric dust particles
  const dustMotes = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      x: (i * 37 + 120) % 1920,
      y: (i * 29 + 60) % 1080,
      size: 2 + (i % 5) * 1.8,
      opacity: 0.25 + (i % 6) * 0.12,
      seed: i,
    }));
  }, []);

  // Prismatic rainbow flare shards ("Dhanak se rang")
  const prismFlares = useMemo(() => {
    return [
      { x: 1320, y: 440, color: "rgba(239, 68, 68, 0.45)", size: 200, rot: 15 },
      { x: 1380, y: 490, color: "rgba(245, 158, 11, 0.5)", size: 180, rot: -25 },
      { x: 1440, y: 530, color: "rgba(16, 185, 129, 0.45)", size: 170, rot: 35 },
      { x: 1500, y: 570, color: "rgba(59, 130, 246, 0.5)", size: 190, rot: -10 },
      { x: 1560, y: 610, color: "rgba(168, 85, 247, 0.45)", size: 180, rot: 45 },
    ];
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#06080E",
        overflow: "hidden",
        fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
      }}
    >
      {/* 1. Deep Midnight Velvet & Warm Ochre Ambient Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 75% 50%, #2A170F 0%, #150E0D 40%, #0B080C 75%, #05060A 100%)",
        }}
      />

      {/* 2. Diagonal Volumetric Golden Sunbeams */}
      {sunbeams.map((beam, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: beam.x,
            top: beam.y,
            width: beam.width,
            height: 1400,
            transform: `rotate(${beam.angle}deg)`,
            transformOrigin: "top left",
            background:
              "linear-gradient(to bottom, rgba(254, 243, 199, 0.45) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 95%)",
            filter: "blur(18px)",
            opacity: beam.opacity,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 3. Right-Aligned Majestic Baroque Gold Arch Mirror */}
      <div
        style={{
          position: "absolute",
          right: 180,
          top: 80,
          width: 720,
          height: 940,
        }}
      >
        {/* Mirror Shadow & Golden Back-Glow */}
        <div
          style={{
            position: "absolute",
            inset: "-25px",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(245, 158, 11, 0.3) 0%, rgba(220, 38, 38, 0.12) 50%, transparent 80%)",
            filter: "blur(40px)",
          }}
        />

        <svg
          viewBox="0 0 720 940"
          style={{
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.85))",
          }}
        >
          <defs>
            <linearGradient id="goldFrameGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF7ED" />
              <stop offset="25%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="75%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
            <linearGradient id="mirrorGlassGrad" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#0F172A" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#1E1B4B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#090D16" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="glassStreak" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Outer Baroque Arch Frame */}
          <path
            d="M 360 25 C 550 25 680 150 680 360 L 680 870 C 680 900 650 915 620 915 L 100 915 C 70 915 40 900 40 870 L 40 360 C 40 150 170 25 360 25 Z"
            fill="none"
            stroke="url(#goldFrameGrad)"
            strokeWidth="34"
          />
          {/* Inner Golden Bevel Rim */}
          <path
            d="M 360 46 C 530 46 648 162 648 360 L 648 860 C 648 880 628 892 608 892 L 112 892 C 92 892 72 880 72 860 L 72 360 C 72 162 190 46 360 46 Z"
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="4"
            opacity="0.85"
          />
          {/* Mirror Surface Glass */}
          <path
            d="M 360 52 C 524 52 638 168 638 360 L 638 855 C 638 875 622 886 602 886 L 118 886 C 98 886 82 875 82 855 L 82 360 C 82 168 196 52 360 52 Z"
            fill="url(#mirrorGlassGrad)"
          />
          {/* Diagonal Glass Sheen Highlight */}
          <path
            d="M 170 52 L 510 886 L 430 886 L 95 52 Z"
            fill="url(#glassStreak)"
            opacity="0.55"
            style={{ mixBlendMode: "overlay" }}
          />
        </svg>

        {/* Ethereal Twilight Horizon & Starlight Inside Mirror (Strictly Zero Characters) */}
        <div
          style={{
            position: "absolute",
            inset: "56px 86px 56px 86px",
            overflow: "hidden",
            borderRadius: "275px 275px 140px 140px",
          }}
        >
          {/* Celestial Twilight Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, #0A0F1F 0%, #17153B 40%, #2E1A47 70%, #4A1E35 90%, #682B29 100%)",
            }}
          />

          {/* Golden Horizon Glow */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              width: 500,
              height: 220,
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(251, 191, 36, 0.6) 0%, rgba(225, 29, 72, 0.3) 50%, transparent 80%)",
              filter: "blur(25px)",
            }}
          />

          {/* Starlight Constellations in Reflection */}
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(i * 31 + 45) % 100}%`,
                top: `${(i * 23 + 20) % 75}%`,
                width: 2 + (i % 3) * 1.5,
                height: 2 + (i % 3) * 1.5,
                borderRadius: "50%",
                backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FDE68A",
                boxShadow: "0 0 6px #FBBF24",
                opacity: 0.5 + (i % 4) * 0.15,
              }}
            />
          ))}

          {/* Prismatic Rainbow Caustic Wave Inside Mirror */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: "50%",
              transform: "translateX(-50%)",
              width: 380,
              height: 120,
              background:
                "linear-gradient(90deg, rgba(239, 68, 68, 0.35) 0%, rgba(245, 158, 11, 0.4) 25%, rgba(16, 185, 129, 0.35) 50%, rgba(59, 130, 246, 0.4) 75%, rgba(168, 85, 247, 0.35) 100%)",
              filter: "blur(20px)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </div>

      {/* 4. Prismatic Rainbow Flare Shards ("Dhanak se rang") */}
      {prismFlares.map((flare, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: flare.x,
            top: flare.y,
            width: flare.size,
            height: flare.size / 2.2,
            transform: `rotate(${flare.rot}deg)`,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${flare.color} 0%, transparent 70%)`,
            filter: "blur(22px)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 5. Drifting Sunlit Dust Motes & Embers */}
      {dustMotes.map((mote, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: mote.x,
            top: mote.y,
            width: mote.size,
            height: mote.size,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? "#FFFBEB" : "#FBBF24",
            opacity: mote.opacity,
            boxShadow: `0 0 ${mote.size * 2}px #F59E0B`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 6. Hanging Filigree Antique Brass Lantern (Left-Center Midground) */}
      <div
        style={{
          position: "absolute",
          left: 780,
          top: -20,
          width: 90,
          height: 280,
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.85))",
        }}
      >
        <svg viewBox="0 0 90 280" style={{ width: "100%", height: "100%" }}>
          <line x1="45" y1="0" x2="45" y2="100" stroke="#78350F" strokeWidth="2.5" />
          <polygon points="45,95 80,120 10,120" fill="#92400E" stroke="#F59E0B" strokeWidth="2" />
          <rect
            x="18"
            y="120"
            width="54"
            height="70"
            rx="8"
            fill="rgba(251, 191, 36, 0.35)"
            stroke="#D97706"
            strokeWidth="2.5"
          />
          <circle cx="45" cy="155" r="14" fill="#FFFBEB" style={{ filter: "drop-shadow(0 0 16px #F59E0B)" }} />
          <polygon points="18,190 72,190 45,225" fill="#92400E" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="45" cy="235" r="4" fill="#D97706" />
        </svg>
      </div>

      {/* 7. Asymmetric High-Fashion Editorial Typography (Left-Third Negative Space) */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 360,
          width: 720,
          zIndex: 30,
        }}
      >
        {/* Monumental Title */}
        <h1
          style={{
            margin: 0,
            fontSize: "124px",
            fontWeight: 800,
            color: "#FAF4E8",
            letterSpacing: "4px",
            lineHeight: 1.02,
            textShadow:
              "0 0 35px rgba(245, 158, 11, 0.5), 0 0 70px rgba(220, 38, 38, 0.3), 0 4px 18px rgba(0,0,0,0.9)",
          }}
        >
          AAINE
          <br />
          MEIN
        </h1>

        {/* Poetic Subtitle */}
        <p
          style={{
            margin: "24px 0 0 6px",
            fontSize: "36px",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#E5B869",
            letterSpacing: "1.8px",
            textShadow:
              "0 2px 12px rgba(0,0,0,0.9), 0 0 20px rgba(245, 158, 11, 0.4)",
          }}
        >
          Pehli Nazar Mein Pyar
        </p>
      </div>

      {/* 8. Cinematic Perimeter Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 140px rgba(4,6,10,0.85)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// =========================================================================
// 2. Aaine Mein 1:1 Dedicated Square Cover (1500 × 1500 Spotify / Apple Music)
// Theme: The Antique Baroque Mirror & Prismatic Twilight Horizon
// Architectural & Atmospheric Worldbuilding — Strictly Zero Human Bodies/Silhouettes
// =========================================================================
export const AaineMeinCover1x1: React.FC = () => {
  // Diagonal volumetric sunbeams
  const sunbeams = useMemo(() => {
    return [
      { angle: 32, width: 120, opacity: 0.3, x: 1000, y: -100 },
      { angle: 38, width: 170, opacity: 0.35, x: 1180, y: -80 },
      { angle: 26, width: 90, opacity: 0.22, x: 860, y: -120 },
    ];
  }, []);

  // Golden starlight motes & atmospheric dust particles
  const dustMotes = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      x: (i * 39 + 100) % 1500,
      y: (i * 31 + 80) % 1500,
      size: 2.2 + (i % 5) * 1.8,
      opacity: 0.25 + (i % 6) * 0.12,
      seed: i,
    }));
  }, []);

  // Prismatic rainbow flare caustics
  const prismFlares = useMemo(() => {
    return [
      { x: 550, y: 780, color: "rgba(239, 68, 68, 0.45)", size: 240, rot: -15 },
      { x: 670, y: 840, color: "rgba(245, 158, 11, 0.5)", size: 260, rot: 25 },
      { x: 800, y: 800, color: "rgba(16, 185, 129, 0.45)", size: 250, rot: -30 },
      { x: 920, y: 850, color: "rgba(59, 130, 246, 0.5)", size: 260, rot: 20 },
      { x: 1020, y: 810, color: "rgba(168, 85, 247, 0.45)", size: 240, rot: -10 },
    ];
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: 1500,
        height: 1500,
        backgroundColor: "#06080E",
        overflow: "hidden",
        fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
      }}
    >
      {/* 1. Deep Midnight Velvet & Warm Ochre Ambient Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, #2A170F 0%, #150E0D 40%, #0B080C 75%, #05060A 100%)",
        }}
      />

      {/* 2. Volumetric Diagonal Golden Sunbeams */}
      {sunbeams.map((beam, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: beam.x,
            top: beam.y,
            width: beam.width,
            height: 1800,
            transform: `rotate(${beam.angle}deg)`,
            transformOrigin: "top left",
            background:
              "linear-gradient(to bottom, rgba(254, 243, 199, 0.45) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 95%)",
            filter: "blur(22px)",
            opacity: beam.opacity,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 3. Top Centered Masthead Typography Field */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 30,
        }}
      >
        {/* Monumental Title */}
        <h1
          style={{
            margin: 0,
            fontSize: "134px",
            fontWeight: 800,
            color: "#FAF4E8",
            letterSpacing: "5px",
            lineHeight: 1.05,
            textShadow:
              "0 0 35px rgba(245, 158, 11, 0.5), 0 0 70px rgba(220, 38, 38, 0.3), 0 4px 18px rgba(0,0,0,0.9)",
          }}
        >
          AAINE MEIN
        </h1>

        {/* Poetic Subtitle */}
        <p
          style={{
            margin: "20px 0 0 0",
            fontSize: "38px",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#E5B869",
            letterSpacing: "2px",
            textShadow:
              "0 2px 12px rgba(0,0,0,0.9), 0 0 20px rgba(245, 158, 11, 0.4)",
          }}
        >
          Pehli Nazar Mein Pyar
        </p>
      </div>

      {/* 4. Centered Baroque Gold Arch Mirror */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 70,
          transform: "translateX(-50%)",
          width: 860,
          height: 1000,
        }}
      >
        {/* Mirror Back-Glow */}
        <div
          style={{
            position: "absolute",
            inset: "-30px",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(245, 158, 11, 0.32) 0%, rgba(220, 38, 38, 0.15) 50%, transparent 80%)",
            filter: "blur(45px)",
          }}
        />

        <svg
          viewBox="0 0 860 1000"
          style={{
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 30px 45px rgba(0,0,0,0.9))",
          }}
        >
          <defs>
            <linearGradient id="sqGoldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF7ED" />
              <stop offset="25%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="75%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
            <linearGradient id="sqGlassGrad" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#0F172A" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#1E1B4B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#090D16" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="sqStreak" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Outer Baroque Arch Frame */}
          <path
            d="M 430 30 C 660 30 810 170 810 400 L 810 930 C 810 965 775 980 740 980 L 120 980 C 85 980 50 965 50 930 L 50 400 C 50 170 200 30 430 30 Z"
            fill="none"
            stroke="url(#sqGoldGrad)"
            strokeWidth="38"
          />
          {/* Inner Golden Bevel Rim */}
          <path
            d="M 430 52 C 638 52 774 182 774 400 L 774 918 C 774 940 750 952 726 952 L 134 952 C 110 952 86 940 86 918 L 86 400 C 86 182 222 52 430 52 Z"
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="4"
            opacity="0.85"
          />
          {/* Mirror Surface Glass */}
          <path
            d="M 430 58 C 632 58 764 188 764 400 L 764 912 C 764 934 744 946 720 946 L 140 946 C 116 946 96 934 96 912 L 96 400 C 96 188 228 58 430 58 Z"
            fill="url(#sqGlassGrad)"
          />
          {/* Diagonal Glass Sheen Highlight */}
          <path
            d="M 200 58 L 610 946 L 520 946 L 110 58 Z"
            fill="url(#sqStreak)"
            opacity="0.55"
            style={{ mixBlendMode: "overlay" }}
          />
        </svg>

        {/* Ethereal Twilight Horizon & Starlight Inside Mirror (Strictly Zero Characters) */}
        <div
          style={{
            position: "absolute",
            inset: "65px 105px 65px 105px",
            overflow: "hidden",
            borderRadius: "320px 320px 160px 160px",
          }}
        >
          {/* Celestial Twilight Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, #0A0F1F 0%, #17153B 40%, #2E1A47 70%, #4A1E35 90%, #682B29 100%)",
            }}
          />

          {/* Golden Horizon Glow */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              width: 580,
              height: 250,
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(251, 191, 36, 0.6) 0%, rgba(225, 29, 72, 0.3) 50%, transparent 80%)",
              filter: "blur(30px)",
            }}
          />

          {/* Starlight Constellations */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(i * 29 + 35) % 100}%`,
                top: `${(i * 27 + 15) % 75}%`,
                width: 2.2 + (i % 3) * 1.5,
                height: 2.2 + (i % 3) * 1.5,
                borderRadius: "50%",
                backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FDE68A",
                boxShadow: "0 0 6px #FBBF24",
                opacity: 0.5 + (i % 4) * 0.15,
              }}
            />
          ))}

          {/* Prismatic Rainbow Caustic Wave Inside Mirror */}
          <div
            style={{
              position: "absolute",
              bottom: 90,
              left: "50%",
              transform: "translateX(-50%)",
              width: 440,
              height: 140,
              background:
                "linear-gradient(90deg, rgba(239, 68, 68, 0.35) 0%, rgba(245, 158, 11, 0.4) 25%, rgba(16, 185, 129, 0.35) 50%, rgba(59, 130, 246, 0.4) 75%, rgba(168, 85, 247, 0.35) 100%)",
              filter: "blur(22px)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </div>

      {/* 5. Prismatic Rainbow Flare Shards ("Dhanak se rang") */}
      {prismFlares.map((flare, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: flare.x,
            top: flare.y,
            width: flare.size,
            height: flare.size / 2.2,
            transform: `rotate(${flare.rot}deg)`,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${flare.color} 0%, transparent 70%)`,
            filter: "blur(24px)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 6. Drifting Sunlit Dust Motes & Embers */}
      {dustMotes.map((mote, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: mote.x,
            top: mote.y,
            width: mote.size,
            height: mote.size,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? "#FFFBEB" : "#FBBF24",
            opacity: mote.opacity,
            boxShadow: `0 0 ${mote.size * 2}px #F59E0B`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 7. Cinematic Perimeter Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 160px rgba(4,6,10,0.85)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
