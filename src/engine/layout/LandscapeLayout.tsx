import React from "react";
import { HierarchyState } from "../types";

interface LandscapeLayoutProps {
  symbolicVisual?: React.ReactNode;
  typography?: React.ReactNode;
  hierarchy: HierarchyState;
}

export const LandscapeLayout: React.FC<LandscapeLayoutProps> = ({
  symbolicVisual,
  typography,
  hierarchy,
}) => {
  if (hierarchy === "ATMOSPHERE_DOMINANT") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px",
          boxSizing: "border-box",
        }}
      >
        {symbolicVisual && <div style={{ marginBottom: "32px" }}>{symbolicVisual}</div>}
        {typography && <div style={{ textAlign: "center" }}>{typography}</div>}
      </div>
    );
  }

  // SYMBOLIC_DOMINANT vs TYPOGRAPHY_DOMINANT
  const isSymbolic = hierarchy === "SYMBOLIC_DOMINANT";
  const visualFlex = isSymbolic ? 1.2 : 0.8;
  const typoFlex = isSymbolic ? 0.9 : 1.3;
  const visualScale = isSymbolic ? 1.05 : 0.78;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "80px 100px",
        boxSizing: "border-box",
        gap: "60px",
      }}
    >
      {/* Left Column: Symbolic Visual Metaphor */}
      {symbolicVisual && (
        <div
          style={{
            flex: visualFlex,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${visualScale})`,
            transition: "all 0.3s ease",
            opacity: isSymbolic ? 1 : 0.65,
          }}
        >
          {symbolicVisual}
        </div>
      )}

      {/* Right Column: Kinetic Typography */}
      {typography && (
        <div
          style={{
            flex: typoFlex,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isSymbolic ? "flex-start" : "center",
            textAlign: isSymbolic ? "left" : "center",
          }}
        >
          {typography}
        </div>
      )}
    </div>
  );
};
