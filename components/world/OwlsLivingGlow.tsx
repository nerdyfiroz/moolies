"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * EXACT SILHOUETTE PATHS FOR THE 5 MOOLIES (ViewBox: 1024 x 650)
 * Traced with high geometric precision to fit each Moolies character exactly.
 */
const MOOLIES_PATHS = {
  // 1. Purple Balcony Moolies (top-left treehouse balcony window)
  balcony:
    "M 142,92 C 142,92 135,115 136,155 C 137,185 145,215 152,224 C 160,227 205,227 214,224 C 220,215 228,185 228,155 C 229,115 222,92 222,92 C 210,98 195,104 182,104 C 169,104 154,98 142,92 Z",

  // 2. Big Brown Picnic Moolies (hoodie Moolies with boba drink on the left)
  boba:
    "M 105,372 C 105,372 82,410 68,460 C 56,515 62,560 76,598 C 88,628 112,634 140,630 C 158,622 186,622 204,630 C 232,634 256,628 268,598 C 282,560 288,515 276,460 C 262,410 238,372 238,372 C 218,384 192,390 172,390 C 152,390 125,384 105,372 Z",

  // 3. Business Suit Moolies (spectacles, suit & red tie)
  suit:
    "M 308,398 C 308,398 285,435 272,485 C 262,535 268,575 280,604 C 294,628 318,632 340,626 C 350,620 366,620 376,626 C 398,632 422,628 436,604 C 448,575 452,535 442,485 C 430,435 406,398 406,398 C 388,410 368,414 357,414 C 346,414 326,410 308,398 Z",

  // 4. Kite Flyer Blue Moolies (on soccer crossbar)
  kite:
    "M 872,172 C 872,172 840,185 828,212 C 816,242 820,268 834,282 C 848,290 892,290 906,282 C 920,268 924,242 912,212 C 900,185 872,172 872,172 Z",

  // 5. Sleeping Moolies (on blanket with cyan sleep mask, bottom right)
  sleep:
    "M 835,508 C 800,518 780,545 780,578 C 780,612 805,632 842,635 C 890,638 955,636 985,628 C 998,615 1000,585 990,560 C 975,530 935,510 885,506 C 862,504 848,506 835,508 Z",
};

// Center positions for the floating badges above each Moolies
const MOOLIES_BADGES = {
  balcony: { x: "18.2%", y: "10.5%", label: "Balcony Moolies", color: "#C084FC" },
  boba: { x: "17.0%", y: "54.0%", label: "Picnic Moolies", color: "#FBBF24" },
  suit: { x: "35.5%", y: "57.5%", label: "Lorekeeper Moolies", color: "#FDE047" },
  kite: { x: "87.0%", y: "23.5%", label: "Kite Flyer Moolies", color: "#38BDF8" },
  sleep: { x: "88.5%", y: "74.5%", label: "Sleepy Moolies", color: "#22D3EE" },
};

/**
 * MooliesLivingGlow
 * 1. Sweeping hover glow moving Left-to-Right strictly on the Moolies (5s moving, 1s rest).
 * 2. Exact SVG silhouette matching for all 5 Moolies — no rectangular boxes.
 * 3. Interactive hover glow hugs the exact contours of each Moolies individually.
 */
export const MooliesLivingGlow: React.FC = () => {
  const [hoveredMoolie, setHoveredMoolie] = useState<keyof typeof MOOLIES_PATHS | null>(null);

  return (
    <div className="absolute inset-0 z-18 pointer-events-none select-none">
      <svg
        viewBox="0 0 1024 650"
        className="w-full h-full absolute inset-0"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Intense SVG Soft Glow Filter */}
          <filter id="mooliesSilhouetteGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Mask that strictly isolates ONLY the 5 Moolies' exact silhouettes */}
          <mask id="exactMooliesSilhouetteMask">
            <rect width="1024" height="650" fill="black" />
            <path d={MOOLIES_PATHS.balcony} fill="white" />
            <path d={MOOLIES_PATHS.boba} fill="white" />
            <path d={MOOLIES_PATHS.suit} fill="white" />
            <path d={MOOLIES_PATHS.kite} fill="white" />
            <path d={MOOLIES_PATHS.sleep} fill="white" />
          </mask>

          {/* Golden luminous sweeping glow gradient */}
          <linearGradient id="mooliesSweepLightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0" />
            <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>

          {/* Cyan/Sky Blue secondary ambient wave */}
          <linearGradient id="mooliesSweepPrismGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ======================================================== */}
        {/* 1. MASKED SWEEPING GLOW (STRICTLY CONFINED TO MOOLIES) */}
        {/* ======================================================== */}
        <g mask="url(#exactMooliesSilhouetteMask)">
          {/* Main 5-second left-to-right sweep, 1-second rest, resets continuously */}
          <motion.rect
            y="0"
            width="240"
            height="650"
            fill="url(#mooliesSweepLightGrad)"
            style={{ mixBlendMode: "color-dodge" }}
            animate={{
              x: [-260, 1180, 1180],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 6.0,
              times: [0, 0.8333, 1], // 0s to 5s active (83.3%), 5s to 6s rest
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.rect
            y="0"
            width="160"
            height="650"
            fill="url(#mooliesSweepPrismGrad)"
            style={{ mixBlendMode: "screen" }}
            animate={{
              x: [-190, 1160, 1160],
              opacity: [0.8, 0.8, 0],
            }}
            transition={{
              duration: 6.0,
              times: [0, 0.8333, 1],
              repeat: Infinity,
              ease: "linear",
              delay: 0.2,
            }}
          />
        </g>

        {/* ======================================================== */}
        {/* 2. EXACT SILHOUETTE HOVER GLOWS (Hugs every Moolies curve) */}
        {/* ======================================================== */}
        {(["balcony", "boba", "suit", "kite", "sleep"] as const).map((key) => {
          const isHovered = hoveredMoolie === key;
          const badge = MOOLIES_BADGES[key];

          return (
            <g key={key}>
              {/* Visible Hover Glow Path: Hugs the exact contours of the Moolies */}
              {isHovered && (
                <path
                  d={MOOLIES_PATHS[key]}
                  fill={badge.color}
                  fillOpacity="0.22"
                  stroke={badge.color}
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  filter="url(#mooliesSilhouetteGlow)"
                  className="pointer-events-none transition-all duration-200"
                />
              )}

              {/* Exact Clickable/Hoverable Hitbox: Captures mouse pointer ONLY on the Moolies */}
              <path
                d={MOOLIES_PATHS[key]}
                fill="rgba(0,0,0,0.001)"
                style={{ pointerEvents: "all" }}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredMoolie(key)}
                onMouseLeave={() => setHoveredMoolie(null)}
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Badges above the hovered Moolies */}
      <AnimatePresence>
        {hoveredMoolie && (
          <motion.div
            key={hoveredMoolie}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            style={{
              left: MOOLIES_BADGES[hoveredMoolie].x,
              top: MOOLIES_BADGES[hoveredMoolie].y,
              borderColor: `${MOOLIES_BADGES[hoveredMoolie].color}99`,
              boxShadow: `0 4px 18px rgba(0,0,0,0.7), 0 0 14px ${MOOLIES_BADGES[hoveredMoolie].color}66`,
            }}
            className="absolute -translate-x-1/2 -translate-y-full z-40 px-3 py-1 rounded-full bg-slate-950/92 text-white border backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap text-[11px] font-black tracking-wide pointer-events-none"
          >
            <Sparkles
              className="w-3.5 h-3.5 text-amber-300 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <span>{MOOLIES_BADGES[hoveredMoolie].label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
