import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FilmAtmosphere } from "../../engine/camera/FilmAtmosphere";

interface ThemeProps {
  lyrics?: string;
  accent?: string;
}

export const Theme19_HologramMemoryCube: React.FC<ThemeProps> = ({
  lyrics = "Dhadkanon ka data stream ban gaya...",
  accent = "TESSERACT // MEMORY CORE",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  // Rotating isometric wireframe hypercube angles
  const rotAngle = (frame * 1.2) % 360;
  const hoverY = Math.sin(frame * 0.06) * 12;
  const holoGlow = 0.85 + Math.sin(frame * 0.12) * 0.15;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#03060A",
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
      {/* Background Holographic Cyan Nebula */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: isLandscape ? "15%" : "50%",
          transform: isLandscape ? "none" : "translateX(-50%)",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 255, 163, 0.08) 0%, rgba(0, 210, 255, 0.05) 50%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Visual: Floating Wireframe Hypercube (SVG) */}
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
            <linearGradient id="holoEmerald" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00FFA3" />
              <stop offset="50%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#7B2CBF" />
            </linearGradient>
          </defs>

          {/* Hologram Pedestal Base Emitter Rings */}
          <ellipse cx="260" cy="350" rx="140" ry="24" fill="none" stroke="#00D2FF" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
          <ellipse cx="260" cy="350" rx="80" ry="14" fill="none" stroke="#00FFA3" strokeWidth="1.2" opacity="0.6" />

          {/* Floating Isometric Hypercube (Outer Cube & Inner Cube with vertices) */}
          <g transform={`translate(260, ${200 + hoverY}) rotate(${rotAngle * 0.3})`}>
            {/* Outer Cube Front Face */}
            <polygon points="-80,-80 80,-80 80,80 -80,80" fill="rgba(0, 255, 163, 0.04)" stroke="url(#holoEmerald)" strokeWidth="2.5" />
            {/* Outer Cube Back Face (Slanted) */}
            <polygon points="-40,-120 120,-120 120,40 -40,40" fill="none" stroke="url(#holoEmerald)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />

            {/* Connecting Cube Edges */}
            <line x1="-80" y1="-80" x2="-40" y2="-120" stroke="url(#holoEmerald)" strokeWidth="2" />
            <line x1="80" y1="-80" x2="120" y2="-120" stroke="url(#holoEmerald)" strokeWidth="2" />
            <line x1="80" y1="80" x2="120" y2="40" stroke="url(#holoEmerald)" strokeWidth="2" />
            <line x1="-80" y1="80" x2="-40" y2="40" stroke="url(#holoEmerald)" strokeWidth="2" />

            {/* Inner Concentric Tesseract Cube (Rotating opposite) */}
            <g transform={`rotate(${-rotAngle * 0.6}) scale(0.55)`}>
              <polygon points="-80,-80 80,-80 80,80 -80,80" fill="rgba(0, 210, 255, 0.1)" stroke="#00D2FF" strokeWidth="2" />
              <polygon points="-40,-120 120,-120 120,40 -40,40" fill="none" stroke="#00D2FF" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="-80" y1="-80" x2="-40" y2="-120" stroke="#00D2FF" strokeWidth="1.5" />
              <line x1="80" y1="-80" x2="120" y2="-120" stroke="#00D2FF" strokeWidth="1.5" />
              <line x1="80" y1="80" x2="120" y2="40" stroke="#00D2FF" strokeWidth="1.5" />
              <line x1="-80" y1="80" x2="-40" y2="40" stroke="#00D2FF" strokeWidth="1.5" />

              {/* Core Glowing Singularity Node */}
              <circle cx="20" cy="-40" r="12" fill="#FFFFFF" filter="drop-shadow(0 0 16px #00FFA3)" opacity={holoGlow} />
            </g>

            {/* Glowing Corner Vertices */}
            {[-80, 80].map((vx) =>
              [-80, 80].map((vy) => (
                <circle key={`v-${vx}-${vy}`} cx={vx} cy={vy} r="4" fill="#00FFA3" filter="drop-shadow(0 0 6px #00FFA3)" />
              ))
            )}
          </g>

          {/* Floating Data Packet Nodes */}
          {[
            { cx: 120, cy: 140, r: 2.5 },
            { cx: 390, cy: 110, r: 3 },
            { cx: 410, cy: 260, r: 2 },
            { cx: 130, cy: 290, r: 2.5 },
          ].map((pt, i) => (
            <circle key={`node-${i}`} cx={pt.cx} cy={pt.cy} r={pt.r} fill="#00D2FF" opacity="0.75" />
          ))}
        </svg>
      </div>

      {/* Right: Cybernetic Terminal Typography */}
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
            backgroundColor: "rgba(0, 255, 163, 0.14)",
            border: "1px solid rgba(0, 255, 163, 0.45)",
            color: "#00FFA3",
            fontFamily: "'Space Grotesk', monospace",
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
            color: "#FFFFFF",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            textShadow: "0 0 30px rgba(0, 255, 163, 0.4)",
          }}
        >
          {lyrics}
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: "16px",
            color: "#00D2FF",
            letterSpacing: "0.08em",
          }}
        >
          Rotating 3D wireframe tesseract memory capsule • Future Garage Lofi
        </div>
      </div>

      <FilmAtmosphere dustCount={14} vignetteStrength={0.55} />
    </div>
  );
};
