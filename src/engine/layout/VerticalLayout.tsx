import React from "react";
import { HierarchyState } from "../types";

interface VerticalLayoutProps {
  symbolicVisual?: React.ReactNode;
  typography?: React.ReactNode;
  hierarchy: HierarchyState;
}

export const VerticalLayout: React.FC<VerticalLayoutProps> = ({
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
          padding: "48px 36px 140px 36px",
          boxSizing: "border-box",
        }}
      >
        {symbolicVisual && <div style={{ marginBottom: "40px" }}>{symbolicVisual}</div>}
        {typography && <div style={{ textAlign: "center" }}>{typography}</div>}
      </div>
    );
  }

  const isSymbolic = hierarchy === "SYMBOLIC_DOMINANT";
  const visualScale = isSymbolic ? 1.0 : 0.72;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "100px 48px 180px 48px", // Bottom padding keeps clear of mobile reels UI
        boxSizing: "border-box",
      }}
    >
      {/* Top Half: Symbolic Visual */}
      <div
        style={{
          flex: isSymbolic ? 1.2 : 0.8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${visualScale})`,
          opacity: isSymbolic ? 1 : 0.75,
          width: "100%",
        }}
      >
        {symbolicVisual}
      </div>

      {/* Lower Half: Kinetic Typography Safe Zone */}
      <div
        style={{
          flex: isSymbolic ? 0.9 : 1.3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
        }}
      >
        {typography}
      </div>
    </div>
  );
};
