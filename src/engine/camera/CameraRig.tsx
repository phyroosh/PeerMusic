import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface CameraRigProps {
  children: React.ReactNode;
  driftRangeX?: number; // max pixels to drift horizontally
  driftRangeY?: number; // max pixels to drift vertically
  zoomScale?: number;   // e.g. 1.05 for subtle 5% zoom-in over duration
  durationInFrames?: number;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  driftRangeX = 24,
  driftRangeY = -16,
  zoomScale = 1.04,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames: configDuration } = useVideoConfig();
  const totalFrames = durationInFrames || configDuration;

  // Continuous subtle linear drift
  const progress = Math.min(1, Math.max(0, frame / totalFrames));

  const translateX = interpolate(progress, [0, 1], [-driftRangeX * 0.5, driftRangeX * 0.5]);
  const translateY = interpolate(progress, [0, 1], [-driftRangeY * 0.5, driftRangeY * 0.5]);
  const scale = interpolate(progress, [0, 1], [1.0, zoomScale]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        transformOrigin: "center center",
        transition: "transform 0.1s linear",
      }}
    >
      {children}
    </div>
  );
};
