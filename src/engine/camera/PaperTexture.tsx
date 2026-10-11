import React from "react";

interface PaperTextureProps {
  opacity?: number;
}

/**
 * Procedural Analog Paper & Risograph Grain Texture:
 * Imparts tactile analog print materiality using hardware-accelerated SVG noise.
 */
export const PaperTexture: React.FC<PaperTextureProps> = ({ opacity = 0.05 }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 42,
        opacity,
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="paperNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paperNoise)" />
      </svg>
    </div>
  );
};
