"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trophy, Coins, Sparkles, ExternalLink } from "lucide-react";

export interface InteractiveHotspot {
  id: string;
  title: string;
  subtitle: string;
  actionText?: string;
  left: number; // percentage (0 to 100)
  top: number; // percentage (0 to 100)
  width: number; // percentage (0 to 100)
  height: number; // percentage (0 to 100)
  borderRadius?: string;
  badgeText?: string;
  accentColor?: string;
  soundType?: "chime" | "wood" | "water" | "pop";
}

interface WorldHotspotProps {
  hotspot: {
    id: string;
    title: string;
    subtitle: string;
    left: number;
    top: number;
    width: number;
    height: number;
    borderRadius?: string;
    badgeText?: string;
    accentColor?: string;
  };
  onClick: (id: string) => void;
  isActive?: boolean;
}

const getHotspotIcon = (id: string) => {
  switch (id) {
    case "opensea":
      return <ShoppingBag className="w-3.5 h-3.5 text-sky-400" />;
    case "roadmap":
      return <Trophy className="w-3.5 h-3.5 text-emerald-400" />;
    case "collection":
      return <Coins className="w-3.5 h-3.5 text-amber-400" />;
    default:
      return <Sparkles className="w-3.5 h-3.5 text-amber-300" />;
  }
};

/**
 * WorldHotspot
 * Interactive landmark section hotspot.
 * On mouse hover or click/tap, displays a luminous section hover glow aura tailored to the section's accent color,
 * with animated border lighting and a floating section guidance badge.
 */
export const WorldHotspot: React.FC<WorldHotspotProps> = ({
  hotspot,
  onClick,
  isActive = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const accent = hotspot.accentColor || "#38BDF8";
  const showGlow = isHovered || isActive || isClicked;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 450);
    onClick(hotspot.id);
  };

  return (
    <div
      style={{
        left: `${hotspot.left}%`,
        top: `${hotspot.top}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      className={`absolute z-20 cursor-pointer select-none ${hotspot.borderRadius || "rounded-2xl"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${hotspot.title} — ${hotspot.subtitle}`}
    >
      {/* ======================================================== */}
      {/* SECTION HOVER GLOW AURA (Shown when hovered or clicked) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showGlow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              borderColor: accent,
              boxShadow: `0 0 28px ${accent}99, inset 0 0 16px ${accent}40`,
              backgroundColor: `${accent}18`,
            }}
            className={`absolute inset-0 pointer-events-none border-2 transition-all ${
              hotspot.borderRadius || "rounded-2xl"
            }`}
          >
            {/* Ambient breathing light pulse inside the section */}
            <motion.div
              animate={{
                opacity: [0.4, 0.85, 0.4],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: `radial-gradient(circle at center, ${accent}35 0%, transparent 75%)`,
              }}
              className="absolute inset-0 rounded-inherit pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* FLOATING HOVER BADGE */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              borderColor: `${accent}80`,
            }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-35 pointer-events-none px-3 py-1 rounded-full bg-slate-950/92 text-white border shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap text-[11px] font-black tracking-wide"
          >
            {getHotspotIcon(hotspot.id)}
            <span className="text-slate-100">{hotspot.badgeText || hotspot.title}</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transparent Clickable Area */}
      <div className="w-full h-full" />
    </div>
  );
};
