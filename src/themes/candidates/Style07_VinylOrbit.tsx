import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style07_VinylOrbit: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const vinylRotation = (frame * 1.5) % 360;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0D0A08",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "80px 120px",
        boxSizing: "border-box",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* 1. Warm Analog Amber Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 35% 50%, #241A12 0%, #0E0A08 65%, #050403 100%)",
        }}
      />

      {/* 2. Left Side: Spinning Vinyl Turntable Metaphor */}
      <div
        style={{
          position: "relative",
          width: "560px",
          height: "560px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {/* Vinyl Base Glow */}
        <div
          style={{
            position: "absolute",
            width: "540px",
            height: "540px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Rotating Vinyl Record */}
        <div
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "#151515",
            backgroundImage:
              "repeating-radial-gradient(circle, #181818 0px, #181818 2px, #111111 3px, #111111 4px)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.1)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${vinylRotation}deg)`,
          }}
        >
          {/* Vinyl Light Sheen (Anamorphic highlight reflections) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "conic-gradient(from 45deg, transparent 0deg, rgba(255, 255, 255, 0.08) 45deg, transparent 90deg, transparent 180deg, rgba(255, 255, 255, 0.08) 225deg, transparent 270deg)",
            }}
          />

          {/* Center Record Label */}
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "6px solid #1E1E1E",
              color: "#FFFBEB",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "11px", letterSpacing: "3px", fontWeight: 700 }}>PEERMUSIC</div>
            <div style={{ fontSize: "9px", letterSpacing: "2px", opacity: 0.8, marginTop: "2px" }}>
              33 ⅓ RPM • STEREO
            </div>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "#111111",
                marginTop: "12px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            />
          </div>
        </div>

        {/* Minimalist Stylus Tonearm */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "20px",
            width: "6px",
            height: "280px",
            backgroundColor: "#C59B63",
            transformOrigin: "top right",
            transform: "rotate(24deg)",
            borderRadius: "3px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "-8px",
              width: "22px",
              height: "35px",
              backgroundColor: "#2B2117",
              border: "1px solid #C59B63",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      {/* 3. Right Side: Lyric Display with Warm Tube-Amp Glow */}
      <div
        style={{
          flex: 1,
          maxWidth: "850px",
          marginLeft: "80px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "#F59E0B",
            marginBottom: "20px",
            fontWeight: 600,
          }}
        >
          SIDE A • TRACK 01 // INDIE ANALOG
        </div>

        <div
          style={{
            fontSize: "56px",
            lineHeight: 1.25,
            color: "#FFFBEB",
            fontWeight: 400,
            textShadow: "0 2px 25px rgba(0, 0, 0, 0.8)",
          }}
        >
          <span>Found your letter folded </span>
          <span
            style={{
              color: "#FDE68A",
              fontStyle: "italic",
              fontWeight: 600,
              textShadow: "0 0 25px rgba(245, 158, 11, 0.8), 0 0 45px rgba(217, 119, 6, 0.4)",
            }}
          >
            in my winter coat
          </span>
        </div>

        <div
          style={{
            fontSize: "28px",
            lineHeight: 1.5,
            color: "rgba(254, 243, 199, 0.42)",
            marginTop: "24px",
            fontStyle: "italic",
          }}
        >
          Every word you typed, every line you wrote...
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 18px",
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            borderRadius: "6px",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <span style={{ fontSize: "12px", letterSpacing: "2px", color: "#FDE68A", textTransform: "uppercase" }}>
            Analog Tube Warmth • Warm Harmonics
          </span>
        </div>
      </div>
    </div>
  );
};
