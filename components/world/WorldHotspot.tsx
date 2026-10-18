"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Hotspot } from "@/lib/data/hotspots";
import { soundEngine } from "@/lib/audio";

interface WorldHotspotProps {
  hotspot: Hotspot;
  onClick: (hotspot: Hotspot) => void;
  isActive?: boolean;
}

export const WorldHotspot: React.FC<WorldHotspotProps> = ({
  hotspot,
  onClick,
  isActive = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleTrigger = () => {
    switch (hotspot.soundType) {
      case "chime":
        soundEngine?.playChime();
        break;
      case "wood":
        soundEngine?.playWoodKnock();
        break;
      case "water":
        soundEngine?.playWaterSplash();
        break;
      default:
        soundEngine?.playPop();
    }
    onClick(hotspot);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTrigger();
    }
  };

  return (
    <div
      style={{
        left: `${hotspot.left}%`,
        top: `${hotspot.top}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      className={`absolute z-20 ${hotspot.borderRadius || "rounded-2xl"}`}
    >
      {/* Invisible interactive bounding region over the artwork itself */}
      <motion.button
        type="button"
        onClick={handleTrigger}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`${hotspot.title} — ${hotspot.subtitle}`}
        className={`w-full h-full cursor-pointer focus:outline-none transition-all duration-300 ${
          hotspot.borderRadius || "rounded-2xl"
        } ${
          isActive
            ? "ring-3 ring-amber-400 bg-amber-400/20 shadow-[0_0_25px_rgba(251,191,36,0.6)]"
            : "hover:ring-2 hover:ring-amber-300/80 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,245,160,0.45)] focus:ring-3 focus:ring-amber-400 focus:bg-white/15"
        }`}
      />

      {/* Floating Tooltip displaying object title when hovering over the artwork */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 8,
          scale: isHovered ? 1 : 0.95,
          pointerEvents: isHovered ? "auto" : "none",
        }}
        transition={{ duration: 0.15 }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[240px] px-3 py-1.5 bg-slate-900/90 text-white backdrop-blur-md rounded-xl shadow-2xl border border-amber-300/50 text-center z-30 pointer-events-none select-none"
      >
        <p className="text-xs font-bold text-amber-300 leading-tight">
          {hotspot.title}
        </p>
        <p className="text-[10px] text-slate-300 mt-0.5 font-medium leading-tight">
          {hotspot.subtitle}
        </p>
        <div className="mt-1 text-[9px] uppercase tracking-wider font-extrabold text-emerald-400">
          Click to Explore &rarr;
        </div>

        {/* Small downward triangle pointer */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-slate-900/90" />
      </motion.div>
    </div>
  );
};
