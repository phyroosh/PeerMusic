import React from "react";
import { useCurrentFrame } from "remotion";

interface StopMotionWrapperProps {
  children: (steppedFrame: number) => React.ReactNode;
  step?: number; // 2 = animate on 2s (15fps on a 30fps timeline), 3 = on 3s
}

/**
 * Stop-Motion Frame Modulator:
 * Quantizes time updates for visual elements to 2s or 3s,
 * imparting a tactile, handcrafted, physical stop-motion animation aesthetic
 * while allowing the global camera to drift at full 30/60 FPS smoothness.
 */
export const StopMotionWrapper: React.FC<StopMotionWrapperProps> = ({
  children,
  step = 2,
}) => {
  const frame = useCurrentFrame();
  const steppedFrame = Math.floor(frame / step) * step;

  return <>{children(steppedFrame)}</>;
};
