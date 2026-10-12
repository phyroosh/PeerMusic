import React from "react";
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import rawTimeline from "./timeline.json";
import { TimelineData, SceneConfig, LyricLine } from "../../engine/types";
import { applyOverridesAndValidate } from "../../engine/validation";
import { PaperTexture } from "../../engine/camera/PaperTexture";
import { VIDEO_CONFIG } from "../../config/videoConfig";

// Validate timeline at module load
const validation = applyOverridesAndValidate(rawTimeline as unknown as TimelineData);
const timeline = validation.timeline;

export const BotanicalScrapbookSong: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Find active scene based on current frame
  const currentScene: SceneConfig | undefined = timeline.scenes.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  ) || timeline.scenes[timeline.scenes.length - 1];

  // Subtle breathing of the pressed petals and shadows
  const shadowFloat = Math.sin(frame * 0.04) * 2;

  // Determine current active line within scene
  let activeLine: LyricLine | undefined;
  if (currentScene && currentScene.lines && currentScene.lines.length > 0) {
    activeLine = currentScene.lines.find((line) => {
      const firstWordStart = line.words[0]?.startFrame ?? currentScene.startFrame;
      const lastWordEnd = line.words[line.words.length - 1]?.endFrame ?? currentScene.endFrame;
      return frame >= firstWordStart && frame <= lastWordEnd + 60; // hold for 1 sec after line ends
    });

    // If no line currently speaking, default to the latest line passed or the first line
    if (!activeLine) {
      const pastLines = currentScene.lines.filter((line) => {
        const lastWordEnd = line.words[line.words.length - 1]?.endFrame ?? currentScene.endFrame;
        return frame >= lastWordEnd;
      });
      if (pastLines.length > 0) {
        activeLine = pastLines[pastLines.length - 1];
      } else {
        activeLine = currentScene.lines[0];
      }
    }
  }

  // Derive section badge
  const sectionBadge = currentScene?.sectionTag
    ? currentScene.sectionTag.replace("•", "//")
    : "HERBARIUM // VOL. 04";

  // Derive subtitle or emotional context
  let subtitleText = "Pressed rose petals inside unread letters • Room 204 Memories";
  if (currentScene?.name.includes("Chai")) {
    subtitleText = "2 AM cutting chai & midnight brotherhood • Warm Acoustic Folk";
  } else if (currentScene?.name.includes("Wall of Hope") || currentScene?.name.includes("Panne")) {
    subtitleText = "Blueprints pinned to damp hostel walls • Striving in the dark";
  } else if (currentScene?.name.includes("Hook") || currentScene?.name.includes("Neendein")) {
    subtitleText = "Kacchi neendein, pakke khwaab • Sleepless dreams taking flight";
  } else if (currentScene?.name.includes("Interlude")) {
    subtitleText = "Instrumental Interlude • Sitar resonance & acoustic night breeze";
  } else if (currentScene?.name.includes("Deadline") || currentScene?.name.includes("Syllabus")) {
    subtitleText = "Mountain of pages & ticking clock • The weight of expectations";
  } else if (currentScene?.name.includes("Maa")) {
    subtitleText = "Maa ki aawaaz aur dabe hue aansu • Distant love across telephone wires";
  } else if (currentScene?.name.includes("Outro") || currentScene?.name.includes("Rooftop")) {
    subtitleText = "Hostel terrace dawn • Tomorrow belongs to the restless";
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: VIDEO_CONFIG.colors.background,
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        alignItems: "center",
        justifyContent: isLandscape ? "space-between" : "center",
        gap: isLandscape ? "0px" : "60px",
        padding: isLandscape ? "80px 120px" : "80px 50px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Lossless Master Audio Synced Playback */}
      <Audio src={staticFile("audio/kacchi_neendein.mp3")} />

      {/* Background Vintage Ruled Grid / Journal Margin Lines */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.15, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="journalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="0" stroke={VIDEO_CONFIG.colors.gridLine} strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="40" stroke={VIDEO_CONFIG.colors.gridLine} strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#journalGrid)" />
        {/* Red Notebook Margin Line */}
        <line
          x1={isLandscape ? "180" : "40"}
          y1="0"
          x2={isLandscape ? "180" : "40"}
          y2="100%"
          stroke={VIDEO_CONFIG.colors.marginRed}
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>

      {/* Left (or Top in Vertical): Pressed Botanical Herbarium Specimen Card */}
      <div
        style={{
          position: "relative",
          width: isLandscape ? "500px" : "380px",
          height: isLandscape ? "520px" : "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 520"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Washi Tape Shadow */}
            <filter id="tapeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
            </filter>

            {/* Pressed Rose Petal Gradient */}
            <linearGradient id="rosePetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C93B4E" />
              <stop offset="60%" stopColor={VIDEO_CONFIG.colors.accentRose} />
              <stop offset="100%" stopColor="#52121C" />
            </linearGradient>

            {/* Dried Olive Fern Gradient */}
            <linearGradient id="fernLeaf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#526E48" />
              <stop offset="50%" stopColor="#3B5234" />
              <stop offset="100%" stopColor="#253520" />
            </linearGradient>
          </defs>

          {/* Pressed Cardboard Herbarium Backing Sheet */}
          <rect
            x="40"
            y="30"
            width="420"
            height="460"
            rx="6"
            fill={VIDEO_CONFIG.colors.paperCard}
            stroke={VIDEO_CONFIG.colors.cardBorder}
            strokeWidth="1.5"
            filter="drop-shadow(0 16px 35px rgba(60, 45, 30, 0.12))"
          />

          {/* Postal Cancellation Rubber Stamp (Vintage Kolkata 1974) */}
          <g transform="translate(100, 110) rotate(-14)" opacity="0.45">
            <circle cx="0" cy="0" r="42" fill="none" stroke={VIDEO_CONFIG.colors.stampInk} strokeWidth="2.5" strokeDasharray="6 3" />
            <circle cx="0" cy="0" r="34" fill="none" stroke={VIDEO_CONFIG.colors.stampInk} strokeWidth="1" />
            <text x="0" y="-8" textAnchor="middle" fontFamily="'Space Grotesk', serif" fontSize="9" fontWeight="700" fill={VIDEO_CONFIG.colors.stampInk}>
              G.P.O. ARCHIVE
            </text>
            <text x="0" y="8" textAnchor="middle" fontFamily="'Space Grotesk', serif" fontSize="11" fontWeight="700" fill={VIDEO_CONFIG.colors.stampInk}>
              OCT 1974
            </text>
            <text x="0" y="22" textAnchor="middle" fontFamily="'Space Grotesk', serif" fontSize="8" fill={VIDEO_CONFIG.colors.stampInk}>
              CALCUTTA
            </text>
          </g>

          {/* Botanical Specimen: Pressed Stem & Fern Leaves with organic micro-float */}
          <g transform={`translate(250, ${260 + shadowFloat})`}>
            {/* Main Curved Stem */}
            <path
              d="M 0 160 Q -15 40, -40 -120"
              fill="none"
              stroke="url(#fernLeaf)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Alternating Pressed Leaves */}
            {[-80, -40, 0, 40, 80, 120].map((ly, i) => {
              const isLeft = i % 2 === 0;
              return (
                <path
                  key={`leaf-${i}`}
                  d={
                    isLeft
                      ? `M ${-10 - i * 3} ${ly} Q ${-65 - i * 4} ${ly - 30}, ${-85 - i * 2} ${ly - 15} Q ${-50} ${ly + 10}, ${-10 - i * 3} ${ly}`
                      : `M ${-5 - i * 2} ${ly} Q ${50 + i * 4} ${ly - 25}, ${75 + i * 2} ${ly - 10} Q ${40} ${ly + 12}, ${-5 - i * 2} ${ly}`
                  }
                  fill="url(#fernLeaf)"
                  opacity="0.88"
                />
              );
            })}

            {/* Pressed Dried Rose Flower at Apex */}
            <g transform="translate(-40, -125)">
              <ellipse cx="0" cy="0" rx="36" ry="24" fill="url(#rosePetal)" transform="rotate(-15)" />
              <ellipse cx="-8" cy="-5" rx="26" ry="18" fill="url(#rosePetal)" opacity="0.9" />
              <ellipse cx="6" cy="4" rx="22" ry="15" fill="#52121C" opacity="0.8" />
              <circle cx="0" cy="0" r="12" fill="#3B0C14" />
            </g>
          </g>

          {/* Translucent Japanese Washi Tape Strips */}
          <rect
            x="180"
            y="110"
            width="80"
            height="22"
            rx="1"
            fill={VIDEO_CONFIG.colors.washiTape}
            opacity="0.75"
            transform="rotate(-6, 220, 121)"
            filter="url(#tapeShadow)"
          />
          <rect
            x="210"
            y="370"
            width="90"
            height="24"
            rx="1"
            fill={VIDEO_CONFIG.colors.washiTape}
            opacity="0.75"
            transform="rotate(4, 255, 382)"
            filter="url(#tapeShadow)"
          />

          {/* Handwritten Specimen Tag in pencil */}
          <g transform="translate(70, 430)">
            <text fontFamily={VIDEO_CONFIG.fonts.tag} fontSize="11" fill={VIDEO_CONFIG.colors.secondaryText} letterSpacing="1">
              SPECIMEN: Rosa indica (Dried 1974)
            </text>
            <text fontFamily={VIDEO_CONFIG.fonts.tag} fontSize="10" fill="#8C7D6B" y="16">
              TRACK: {timeline.songTitle}
            </text>
          </g>
        </svg>
      </div>

      {/* Right (or Bottom in Vertical): Synchronized Literary Vintage Typography */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isLandscape ? "flex-start" : "center",
          textAlign: isLandscape ? "left" : "center",
          gap: "22px",
          maxWidth: isLandscape ? "680px" : "100%",
          width: isLandscape ? "auto" : "100%",
          padding: isLandscape ? "0" : "10px 10px 0 10px",
          boxSizing: "border-box",
        }}
      >
        {/* Section Pill Badge */}
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "3px",
            backgroundColor: VIDEO_CONFIG.colors.accentFern,
            color: "#FAF6EE",
            fontFamily: VIDEO_CONFIG.fonts.accent,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.26em",
            width: "fit-content",
          }}
        >
          {sectionBadge}
        </div>

        {/* Dynamic Synchronized Lyrics Line */}
        <div
          style={{
            fontFamily: VIDEO_CONFIG.fonts.heading,
            fontSize: isLandscape ? "46px" : "36px",
            fontWeight: 700,
            color: VIDEO_CONFIG.colors.primaryText,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            minHeight: isLandscape ? "120px" : "80px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: isLandscape ? "flex-start" : "center",
            gap: "10px",
          }}
        >
          {activeLine ? (
            activeLine.words.map((word) => {
              const isSung = frame >= word.startFrame;
              const isCurrentlyActive = frame >= word.startFrame && frame <= word.endFrame;

              return (
                <span
                  key={word.id}
                  style={{
                    opacity: isSung ? 1 : 0.28,
                    color: isCurrentlyActive
                      ? VIDEO_CONFIG.colors.accentRose
                      : VIDEO_CONFIG.colors.primaryText,
                    textDecoration: isCurrentlyActive ? "underline" : "none",
                    textDecorationColor: VIDEO_CONFIG.colors.accentRose,
                    textUnderlineOffset: "6px",
                    transition: "opacity 0.15s ease, color 0.15s ease",
                    display: "inline-block",
                  }}
                >
                  {word.text}
                </span>
              );
            })
          ) : (
            <span style={{ fontStyle: "italic", opacity: 0.6 }}>
              {currentScene?.name || "Kacchi neendein, pakke khwaab..."}
            </span>
          )}
        </div>

        {/* Poetic Subtitle / Emotional Context */}
        <div
          style={{
            fontFamily: VIDEO_CONFIG.fonts.tag,
            fontSize: isLandscape ? "15px" : "13px",
            color: VIDEO_CONFIG.colors.secondaryText,
            lineHeight: 1.6,
          }}
        >
          {subtitleText}
        </div>
      </div>

      {/* Tactile Paper Texture */}
      <PaperTexture opacity={0.12} />
    </div>
  );
};
