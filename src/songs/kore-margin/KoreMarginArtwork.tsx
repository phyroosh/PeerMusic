import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const KoreMarginArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // Continuous organic micro-motions (never frozen: subtle breathing, page float & lamp beam shimmer)
  const notebookFloatY = Math.sin(frame * 0.03) * 1.6;
  const notebookTilt = -3.5 + Math.sin(frame * 0.02) * 0.4;

  const glassesFloatY = Math.cos(frame * 0.035) * 1.4;
  const glassesTilt = 12 + Math.sin(frame * 0.025) * 0.5;

  const penFloatX = Math.sin(frame * 0.04) * 1.1;
  const penFloatY = Math.cos(frame * 0.04) * 1.1;
  const penTilt = -38 + Math.sin(frame * 0.03) * 0.7;

  // Lamp warm glow pulsation & dust motes
  const lampGlowPulse = 0.28 + Math.sin(frame * 0.04) * 0.06;
  const steamPulse = Math.sin(frame * 0.05) * 2.5;

  // Floating midnight study dust particles suspended in the lamp beam
  const dustMotes = [
    { x: -90, y: -110, r: 1.8, s: 0.032, amp: 3.5 },
    { x: -30, y: -70, r: 2.2, s: 0.04, amp: 4.8 },
    { x: 45, y: -95, r: 1.6, s: 0.028, amp: 3.2 },
    { x: 80, y: -40, r: 2.4, s: 0.045, amp: 5.0 },
    { x: -65, y: 25, r: 1.5, s: 0.035, amp: 3.6 },
    { x: 10, y: 55, r: 2.0, s: 0.038, amp: 4.5 },
    { x: 95, y: 40, r: 1.7, s: 0.042, amp: 3.8 },
    { x: -40, y: 115, r: 2.1, s: 0.034, amp: 4.2 },
    { x: 60, y: 125, r: 1.8, s: 0.037, amp: 4.0 },
  ];

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Soft Drop Shadow for Notebook */}
        <filter id="koreShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="4" dy="6" stdDeviation="5" floodOpacity="0.16" />
        </filter>

        {/* Vintage Desk Lamp Golden Glow Beam */}
        <radialGradient id="lampConeGlow" cx="65%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#FFE082" stopOpacity={lampGlowPulse * 1.4} />
          <stop offset="45%" stopColor="#FFCA28" stopOpacity={lampGlowPulse * 0.8} />
          <stop offset="85%" stopColor="#FFA000" stopOpacity={lampGlowPulse * 0.25} />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>

        {/* Chai Glass Gradient */}
        <linearGradient id="cuttingChai" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E09F67" />
          <stop offset="40%" stopColor="#C87D43" />
          <stop offset="80%" stopColor="#9C5221" />
          <stop offset="100%" stopColor="#6E3510" />
        </linearGradient>

        {/* Chai Glass Rim & Wall */}
        <linearGradient id="glassWall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="25%" stopColor="#E2E8F0" stopOpacity="0.15" />
          <stop offset="75%" stopColor="#CBD5E1" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
        </linearGradient>

        {/* Fountain Pen Metallic Navy & Gold */}
        <linearGradient id="penNavy" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0F2744" />
          <stop offset="45%" stopColor="#1E4572" />
          <stop offset="70%" stopColor="#2D629E" />
          <stop offset="100%" stopColor="#0B1D33" />
        </linearGradient>

        <linearGradient id="penNib" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B3862A" />
          <stop offset="50%" stopColor="#F5D061" />
          <stop offset="100%" stopColor="#8C6518" />
        </linearGradient>

        {/* Spectacles Tortoiseshell Frame */}
        <linearGradient id="specsFrame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3E2723" />
          <stop offset="50%" stopColor="#6D4C41" />
          <stop offset="100%" stopColor="#2A1B17" />
        </linearGradient>
      </defs>

      {/* 0. Ambient Lamp Glow Field */}
      <circle cx="60" cy="-40" r="280" fill="url(#lampConeGlow)" pointerEvents="none" />

      {/* 1. Miniature Notebook with Ruled Lines & Kore Margin */}
      <g transform={`translate(-135, ${-145 + notebookFloatY}) rotate(${notebookTilt})`}>
        {/* Ivory Paper Sheet */}
        <rect
          x="0"
          y="0"
          width="265"
          height="315"
          rx="5"
          fill="#FFFDF6"
          stroke="#E6DFD1"
          strokeWidth="1.2"
          filter="url(#koreShadow)"
        />

        {/* Spiral Binder Holes on Left Edge */}
        {[-5, 25, 55, 85, 115, 145, 175, 205, 235, 265].map((py, idx) => (
          <g key={`hole-${idx}`} transform={`translate(13, ${py + 22})`}>
            <circle cx="0" cy="0" r="3.2" fill="#EAE3D2" stroke="#D3C7B2" strokeWidth="0.8" />
            <line x1="-7" y1="0" x2="-2" y2="0" stroke="#C8BC9E" strokeWidth="1" />
          </g>
        ))}

        {/* Faded Blue Horizontal Ruled Notebook Lines */}
        {[48, 73, 98, 123, 148, 173, 198, 223, 248, 273].map((ly, idx) => (
          <line
            key={`line-${idx}`}
            x1="32"
            y1={ly}
            x2="250"
            y2={ly}
            stroke="#9CB9D9"
            strokeWidth="0.85"
            opacity="0.55"
          />
        ))}

        {/* Prominent Red Margin Line - The "Kore Margin" Motif */}
        <line x1="62" y1="18" x2="62" y2="300" stroke="#E57373" strokeWidth="1.3" opacity="0.75" />

        {/* Marginalia & Student Doodles in Pencil within the Margin */}
        <g opacity="0.55" stroke="#7A6F5D" strokeWidth="0.9" fill="none">
          {/* Formula Crossouts in Margin */}
          <line x1="38" y1="52" x2="56" y2="52" strokeDasharray="1 1" />
          <line x1="38" y1="54" x2="56" y2="50" />
          
          {/* Small Star Doodle */}
          <path d="M 47 90 L 49 95 L 54 96 L 50 100 L 51 105 L 47 102 L 43 105 L 44 100 L 40 96 L 45 95 Z" />
          
          {/* Checklist boxes */}
          <rect x="42" y="140" width="10" height="10" rx="1.5" />
          <path d="M 44 145 L 47 148 L 54 142" stroke="#3B82F6" strokeWidth="1.2" />

          {/* Summation Sigma Symbol */}
          <path d="M 54 190 L 42 190 L 48 196 L 42 202 L 54 202" />

          {/* Small Heart / Wish Doodled */}
          <path d="M 48 245 C 48 242 43 238 41 242 C 39 246 48 252 48 252 C 48 252 57 246 55 242 C 53 238 48 242 48 245 Z" fill="#EF4444" fillOpacity="0.25" stroke="#EF4444" strokeWidth="0.7" />
        </g>

        {/* Mock Exam Problem Rough Work Scratched Out */}
        <g opacity="0.45" stroke="#5E6A7D" strokeWidth="0.8">
          <line x1="72" y1="71" x2="160" y2="71" strokeDasharray="3 3" />
          <line x1="72" y1="96" x2="200" y2="96" strokeDasharray="2 3" />
          <line x1="72" y1="121" x2="140" y2="121" strokeDasharray="4 2" />
          {/* Struck out calculation */}
          <line x1="70" y1="120" x2="145" y2="122" stroke="#DC2626" strokeWidth="1.1" />
        </g>
      </g>

      {/* 2. Classic Fluted Cutting Chai Glass */}
      <g transform="translate(100, 75)">
        {/* Soft shadow below glass */}
        <ellipse cx="0" cy="52" rx="22" ry="6" fill="#000000" fillOpacity="0.2" />

        {/* Fluted Glass Base & Liquid */}
        <path
          d="M -18 48 L -14 0 L 14 0 L 18 48 Z"
          fill="url(#cuttingChai)"
          opacity="0.9"
        />

        {/* Glass Outline & Highlights */}
        <path
          d="M -22 -10 L -18 48 Q 0 52 18 48 L 22 -10 Q 0 -14 -22 -10 Z"
          fill="url(#glassWall)"
          stroke="#E2E8F0"
          strokeWidth="1.2"
        />

        {/* Fluted Vertical Ribs on Glass */}
        {[-10, -4, 4, 10].map((rx, idx) => (
          <line
            key={`rib-${idx}`}
            x1={rx * 0.9}
            y1="-6"
            x2={rx * 0.75}
            y2="45"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            opacity="0.35"
          />
        ))}

        {/* Animated Rising Steam Wisps */}
        <path
          d={`M -4 -16 Q ${-8 + steamPulse} -28 -3 -38 T ${-6 - steamPulse} -52`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          opacity="0.3"
          strokeLinecap="round"
        />
        <path
          d={`M 5 -18 Q ${8 - steamPulse} -32 4 -44 T ${7 + steamPulse} -58`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.0"
          opacity="0.25"
          strokeLinecap="round"
        />
      </g>

      {/* 3. Folded Student's Wire-Rim Specs (Chashma) */}
      <g transform={`translate(-45, ${70 + glassesFloatY}) rotate(${glassesTilt})`}>
        {/* Left Lens */}
        <circle cx="-22" cy="0" r="16" fill="#F8FAFC" fillOpacity="0.2" stroke="url(#specsFrame)" strokeWidth="1.8" />
        {/* Right Lens */}
        <circle cx="22" cy="0" r="16" fill="#F8FAFC" fillOpacity="0.2" stroke="url(#specsFrame)" strokeWidth="1.8" />
        {/* Bridge */}
        <path d="M -6 0 Q 0 -4 6 0" fill="none" stroke="url(#specsFrame)" strokeWidth="1.8" />
        {/* Folded Temples */}
        <line x1="-38" y1="0" x2="-32" y2="18" stroke="url(#specsFrame)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="38" y1="0" x2="32" y2="18" stroke="url(#specsFrame)" strokeWidth="1.6" strokeLinecap="round" />
        {/* Lens Glare */}
        <path d="M -28 -6 Q -22 -12 -16 -8" fill="none" stroke="#FFFFFF" strokeWidth="1.1" opacity="0.65" />
      </g>

      {/* 4. Elegant Fountain Pen Resting on Table */}
      <g transform={`translate(${115 + penFloatX}, ${-60 + penFloatY}) rotate(${penTilt})`}>
        {/* Pen Barrel */}
        <rect x="-4.5" y="-60" width="9" height="75" rx="3" fill="url(#penNavy)" />
        {/* Gold Trim Ring */}
        <rect x="-4.5" y="15" width="9" height="3" fill="url(#penNib)" />
        {/* Pen Nib (Pointed) */}
        <path d="M -4 18 L 0 34 L 4 18 Z" fill="url(#penNib)" />
        {/* Nib Slit */}
        <line x1="0" y1="20" x2="0" y2="30" stroke="#4A3B12" strokeWidth="0.6" />
        {/* Deep Blue Ink Droplet Pulse */}
        <circle cx="0" cy="38" r="2.2" fill="#1D4ED8" opacity="0.85" />
      </g>

      {/* 5. Suspended Golden Dust Motes */}
      {dustMotes.map((mote, idx) => {
        const floatDeltaY = Math.sin(frame * mote.s + idx) * mote.amp;
        return (
          <circle
            key={`mote-${idx}`}
            cx={mote.x}
            cy={mote.y + floatDeltaY}
            r={mote.r}
            fill="#FDE047"
            opacity={0.35 + Math.sin(frame * 0.05 + idx) * 0.25}
          />
        );
      })}
    </g>
  );
};
