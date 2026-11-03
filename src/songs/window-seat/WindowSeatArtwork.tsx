import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG } from "../../config/videoConfig";

export const WindowSeatArtwork: React.FC = () => {
  const frame = useCurrentFrame();

  // Continuous organic micro-motion (breathing, paper float, rising steam & raindrop shimmer)
  const ticketFloatY = Math.sin(frame * 0.032) * 1.6;
  const ticketTilt = -3.5 + Math.sin(frame * 0.024) * 0.45;

  const windowFloatY = Math.cos(frame * 0.028) * 1.2;
  const steamOffset1 = (frame * 0.8) % 80;
  const steamOffset2 = ((frame + 40) * 0.75) % 80;
  const steamOpacity1 = Math.max(0, 0.7 - steamOffset1 / 80);
  const steamOpacity2 = Math.max(0, 0.65 - steamOffset2 / 80);

  const rainShift = (frame * 1.2) % 40;
  const kulhadPulse = 1 + Math.sin(frame * 0.06) * 0.015;

  return (
    <g transform="translate(0, 0)">
      <defs>
        {/* Vintage Cardboard Ticket Texture Gradient */}
        <linearGradient id="ticketCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2BE78" />
          <stop offset="50%" stopColor="#D5AE66" />
          <stop offset="100%" stopColor="#C89F55" />
        </linearGradient>

        {/* Earthen Clay Kulhad Gradient */}
        <linearGradient id="kulhadClay" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9C472A" />
          <stop offset="40%" stopColor="#BD5F3C" />
          <stop offset="70%" stopColor="#CE734E" />
          <stop offset="100%" stopColor="#873C21" />
        </linearGradient>

        {/* Golden Headphone Jack Metallic Gradient */}
        <linearGradient id="goldJack" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8860B" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>

        {/* Soft Drop Shadow for physical depth */}
        <filter id="ticketShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* 1. Train Window Miniature Frame with Rainy Dusk Horizon */}
      <g transform={`translate(-135, ${-160 + windowFloatY})`}>
        {/* Outer Dark Wooden Window Sill */}
        <rect
          x="0"
          y="0"
          width="270"
          height="190"
          rx="12"
          fill="#3E342B"
          stroke="#2A221A"
          strokeWidth="2"
          filter="url(#ticketShadow)"
        />

        {/* Inner Glass Pane / Evening Sky */}
        <rect
          x="8"
          y="8"
          width="254"
          height="174"
          rx="8"
          fill="#1C2433"
        />

        {/* Distant Twilight Horizon Gradient */}
        <rect x="8" y="90" width="254" height="92" fill="#3D2B2B" opacity="0.45" />
        <rect x="8" y="130" width="254" height="52" fill="#5A3A28" opacity="0.35" />

        {/* Distant Telephone Poles & Drooping Wires */}
        <g opacity="0.55">
          {/* Pole 1 */}
          <line x1="50" y1="85" x2="50" y2="155" stroke="#7A6F5D" strokeWidth="1.5" />
          <line x1="42" y1="92" x2="58" y2="92" stroke="#7A6F5D" strokeWidth="1.2" />
          {/* Pole 2 */}
          <line x1="165" y1="95" x2="165" y2="155" stroke="#7A6F5D" strokeWidth="1.2" />
          <line x1="158" y1="101" x2="172" y2="101" stroke="#7A6F5D" strokeWidth="1" />
          {/* Catenary Wire Curves */}
          <path d="M 8 96 Q 50 106, 95 102 T 165 106 T 262 108" fill="none" stroke="#8E8270" strokeWidth="0.8" />
          <path d="M 8 102 Q 50 112, 95 108 T 165 112 T 262 114" fill="none" stroke="#8E8270" strokeWidth="0.7" opacity="0.7" />
        </g>

        {/* Raindrop Streaks on Glass (Diagonal Motion Slant) */}
        <g opacity="0.65">
          {[25, 60, 95, 130, 175, 210, 240].map((rx, idx) => {
            const dy = ((rx * 7 + rainShift) % 150) + 12;
            return (
              <g key={`rain-${idx}`} transform={`translate(${rx}, ${dy})`}>
                <line x1="0" y1="0" x2="-4" y2="10" stroke="#7E9EB8" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="-4" cy="11" r="1.2" fill="#A8C8E6" opacity="0.85" />
              </g>
            );
          })}
        </g>

        {/* Glass Reflection Highlight */}
        <polygon points="12,12 80,12 30,170 12,170" fill="#FFFFFF" opacity="0.04" />
      </g>

      {/* 2. Vintage Indian Railways Cardboard Ticket (Edmonson Card) */}
      <g transform={`translate(-100, ${-40 + ticketFloatY}) rotate(${ticketTilt})`}>
        {/* Heavy Cardboard Ticket Body */}
        <rect
          x="0"
          y="0"
          width="215"
          height="125"
          rx="3"
          fill="url(#ticketCard)"
          stroke="#9E7632"
          strokeWidth="1.2"
          filter="url(#ticketShadow)"
        />

        {/* Ticket Perforation Dashes */}
        <line x1="165" y1="0" x2="165" y2="125" stroke="#8F6A28" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

        {/* Conductor Punch Hole (Circle Cutout) */}
        <circle cx="165" cy="62" r="5.5" fill="#3E342B" stroke="#684D1C" strokeWidth="1" />

        {/* Top Header Stamp */}
        <text
          x="12"
          y="18"
          fontFamily={VIDEO_CONFIG.fonts.tag}
          fontSize="8.5"
          fontWeight="bold"
          fill="#332410"
          letterSpacing="1"
        >
          NORTHERN RAILWAY // II SLEEPER
        </text>

        {/* Train & PNR Metadata */}
        <text x="12" y="34" fontFamily={VIDEO_CONFIG.fonts.tag} fontSize="8" fill="#423018">
          TR: 12952 • EXP  |  PNR: 429-081927
        </text>

        {/* Highlighted Window Seat Berth Stamp */}
        <rect x="10" y="42" width="145" height="26" rx="2" fill="#FAF6EE" opacity="0.85" />
        <text
          x="15"
          y="59"
          fontFamily={VIDEO_CONFIG.fonts.body}
          fontSize="12.5"
          fontWeight="900"
          fill="#8A2434"
          letterSpacing="0.5"
        >
          BERTH: 42 (WINDOW SEAT)
        </text>

        {/* Route Line */}
        <text x="12" y="82" fontFamily={VIDEO_CONFIG.fonts.tag} fontSize="8" fill="#3D2C16">
          DELHI JN (DLI)  →  VARANASI (BSB)
        </text>

        {/* Date & Fare Micro-print */}
        <text x="12" y="96" fontFamily={VIDEO_CONFIG.fonts.tag} fontSize="7.5" fill="#5E4627">
          DATE: 12-OCT-2026 • FARE: RS 340/-
        </text>

        <text x="12" y="112" fontFamily={VIDEO_CONFIG.fonts.tag} fontSize="7" fill="#6E522E" opacity="0.8">
          *NOT TRANSFERABLE • SAFAR AUR YAADEIN*
        </text>

        {/* Weathered Red Circular Conductor Seal */}
        <g transform="translate(130, 92) rotate(-18)" opacity="0.75">
          <circle cx="0" cy="0" r="16" fill="none" stroke="#B23B3B" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="0" y="-3" textAnchor="middle" fontFamily={VIDEO_CONFIG.fonts.tag} fontSize="5.5" fill="#B23B3B" fontWeight="bold">
            CHECKED
          </text>
          <text x="0" y="5" textAnchor="middle" fontFamily={VIDEO_CONFIG.fonts.tag} fontSize="5" fill="#B23B3B">
            TTE • DLI
          </text>
        </g>
      </g>

      {/* 3. Clay Kulhad (Cutting Chai) on the Sill */}
      <g transform={`translate(75, 45) scale(${kulhadPulse})`}>
        {/* Soft Shadow */}
        <ellipse cx="0" cy="48" rx="22" ry="6" fill="#000000" opacity="0.2" />

        {/* Kulhad Body */}
        <polygon
          points="-18,46 18,46 22,-8 -22,-8"
          fill="url(#kulhadClay)"
          stroke="#682E19"
          strokeWidth="1.2"
        />

        {/* Earthen Rim Bands */}
        <ellipse cx="0" cy="-8" rx="22" ry="5.5" fill="#582414" stroke="#461B0E" strokeWidth="1" />
        <ellipse cx="0" cy="-8" rx="19" ry="4" fill="#693B1F" />
        {/* Golden Tea Surface */}
        <ellipse cx="0" cy="-7" rx="17" ry="3.2" fill="#9C6233" />

        {/* Grooved Texture Lines on Clay */}
        <line x1="-19" y1="12" x2="19" y2="12" stroke="#7A341D" strokeWidth="1" opacity="0.6" />
        <line x1="-18" y1="28" x2="18" y2="28" stroke="#7A341D" strokeWidth="1" opacity="0.6" />

        {/* Dynamic Rising Steam Wisps */}
        <g transform={`translate(-5, ${-20 - steamOffset1})`} opacity={steamOpacity1}>
          <path
            d="M 0 10 Q -8 0, 0 -12 T 0 -30"
            fill="none"
            stroke="#FAF6EE"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
        <g transform={`translate(6, ${-20 - steamOffset2})`} opacity={steamOpacity2}>
          <path
            d="M 0 10 Q 7 0, 0 -12 T 0 -28"
            fill="none"
            stroke="#FAF6EE"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 4. Coiled Earphone Cable & Golden 3.5mm Jack Pin */}
      <g transform="translate(15, 60)">
        {/* Winding Earphone Cable */}
        <path
          d="M -90 -20 Q -40 25, 10 32 T 55 42 T 90 20"
          fill="none"
          stroke="#EAE5DA"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#ticketShadow)"
        />

        {/* 3.5mm Headphone Jack Pin */}
        <g transform="translate(90, 20) rotate(-35)">
          <rect x="-3" y="-14" width="6" height="14" rx="1.5" fill="#2C261F" />
          <rect x="-2" y="-28" width="4" height="14" rx="1" fill="url(#goldJack)" />
          {/* Black Insulating Rings */}
          <line x1="-2" y1="-23" x2="2" y2="-23" stroke="#1A1816" strokeWidth="1" />
          <line x1="-2" y1="-18" x2="2" y2="-18" stroke="#1A1816" strokeWidth="1" />
        </g>
      </g>
    </g>
  );
};
