import React from "react";
import { useVideoConfig } from "remotion";
import { HierarchyState } from "../types";
import { LandscapeLayout } from "./LandscapeLayout";
import { VerticalLayout } from "./VerticalLayout";

interface ResponsiveContainerProps {
  symbolicVisual?: React.ReactNode;
  typography?: React.ReactNode;
  hierarchy: HierarchyState;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  symbolicVisual,
  typography,
  hierarchy,
}) => {
  const { width, height } = useVideoConfig();
  const isLandscape = width >= height;

  if (isLandscape) {
    return (
      <LandscapeLayout
        symbolicVisual={symbolicVisual}
        typography={typography}
        hierarchy={hierarchy}
      />
    );
  }

  return (
    <VerticalLayout
      symbolicVisual={symbolicVisual}
      typography={typography}
      hierarchy={hierarchy}
    />
  );
};
