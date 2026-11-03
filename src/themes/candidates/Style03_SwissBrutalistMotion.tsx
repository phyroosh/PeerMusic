import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Style03_SwissBrutalistMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0B0C0E",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        boxSizing: "border-box",
        fontFamily: "'Arial Black', 'Impact', sans-serif",
      }}
    >
      {/* 1. Technical Swiss Drafting Grid */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="swissGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#swissGrid)" />
      </svg>

      {/* 2. Top Header Technical Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          zIndex: 10,
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#FF4500",
              color: "#000000",
              padding: "6px 14px",
              fontSize: "14px",
              fontWeight: 900,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            DIRTY HIT // PEERMUSIC 03
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.45)",
              letterSpacing: "3px",
              marginTop: "8px",
              fontFamily: "monospace",
            }}
          >
            BPM: 124 • 48.0 kHz 24-BIT MASTER
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
            fontFamily: "monospace",
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.6)",
            letterSpacing: "2px",
          }}
        >
          <div>LAT 47.3769° N, 8.5417° E</div>
          <div style={{ color: "#CCFF00", fontWeight: 700 }}>REC [ACTIVE]</div>
        </div>
      </div>

      {/* 3. Center Giant Swiss Typography & Waveform Spectrum */}
      <div style={{ zIndex: 10, margin: "auto 0" }}>
        {/* Massive Headline Typography */}
        <div
          style={{
            fontSize: "110px",
            lineHeight: 0.92,
            fontWeight: 900,
            letterSpacing: "-2px",
            color: "#FFFFFF",
            textTransform: "uppercase",
          }}
        >
          <div>SAY IT BEFORE</div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <span style={{ color: "#CCFF00" }}>THE LIGHT</span>
            <div
              style={{
                flex: 1,
                height: "28px",
                backgroundColor: "#FF4500",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
              }}
            >
              <span
                style={{
                  color: "#000000",
                  fontSize: "14px",
                  fontWeight: 900,
                  letterSpacing: "4px",
                  fontFamily: "monospace",
                }}
              >
                PEAK AMPLITUDE // 0 dB
              </span>
            </div>
          </div>
          <div>BURNS OUT.</div>
        </div>

        {/* Dynamic Graphic Equalizer Waveform Slice */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            height: "60px",
            marginTop: "36px",
          }}
        >
          {Array.from({ length: 64 }).map((_, i) => {
            const h = 8 + Math.abs(Math.sin(frame * 0.12 + i * 0.25)) * 48;
            const isHot = i > 40 && i < 54;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}px`,
                  backgroundColor: isHot ? "#FF4500" : "#FFFFFF",
                  opacity: isHot ? 1 : 0.65,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Metadata & Technical Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "2px solid rgba(255, 255, 255, 0.15)",
          paddingTop: "20px",
          zIndex: 10,
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", letterSpacing: "2px" }}>
          ARTIST: THE 1975 AESTHETIC // BRUTALIST KINETIC ENGINE
        </div>
        <div style={{ fontSize: "12px", color: "#FF4500", letterSpacing: "3px", fontWeight: 700 }}>
          HIGH-FASHION SWISS TYPOGRAPHY
        </div>
      </div>
    </div>
  );
};
