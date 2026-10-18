"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/audio";
import { ArrowRight } from "lucide-react";

export interface InteractiveHotspot {
  id: string;
  title: string;
  subtitle: string;
  actionText?: string;
  left: number; // percentage
  top: number; // percentage
  width: number; // percentage
  height: number; // percentage
  borderRadius?: string;
  accentColor: string;
  soundType: "chime" | "wood" | "water" | "pop";
}

interface WorldHotspotProps {
  hotspot: InteractiveHotspot;
  onClick: (hotspot: InteractiveHotspot) => void;
  isActive?: boolean;
}

export const WorldHotspot: React.FC<WorldHotspotProps> = ({
  hotspot,
  onClick,
  isActive = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const handleTrigger = () => {
    // 1. Trigger the section detail modal IMMEDIATELY
    try {
      onClick(hotspot);
    } catch (err) {
      console.error("Hotspot modal trigger error:", err);
    }

    // 2. Play audio safely as an enhancement (never blocks modal opening)
    try {
      if (soundEngine) {
        if (hotspot.soundType === "chime") soundEngine.playChime();
        else if (hotspot.soundType === "wood") soundEngine.playWoodKnock();
        else if (hotspot.soundType === "water") soundEngine.playWaterSplash();
        else soundEngine.playPop();
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartPos.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const t = e.changedTouches[0];
    const dx = Math.abs(t.clientX - touchStartPos.current.x);
    const dy = Math.abs(t.clientY - touchStartPos.current.y);
    touchStartPos.current = null;
    // Deliberate tap gesture (< 25px movement)
    if (dx < 25 && dy < 25) {
      handleTrigger();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTrigger();
    }
  };

  // Smart tooltip positioning to prevent viewport boundary clipping
  const isNearTop = hotspot.top < 22;
  const isNearLeft = hotspot.left < 18;
  const isNearRight = hotspot.left > 75;

  let tooltipPosClasses = "bottom-full mb-3";
  let arrowClasses = "top-full border-t-slate-950";

  if (isNearTop) {
    tooltipPosClasses = "top-full mt-3";
    arrowClasses = "bottom-full border-b-slate-950 border-t-transparent";
  }

  let horizontalAlignClasses = "left-1/2 -translate-x-1/2";
  let arrowAlignClasses = "left-1/2 -translate-x-1/2";

  if (isNearLeft) {
    horizontalAlignClasses = "left-0";
    arrowAlignClasses = "left-6";
  } else if (isNearRight) {
    horizontalAlignClasses = "right-0";
    arrowAlignClasses = "right-6";
  }

  return (
    <div
      data-hotspot="true"
      style={{
        left: `${hotspot.left}%`,
        top: `${hotspot.top}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleTrigger();
      }}
      className={`absolute z-20 group ${hotspot.borderRadius || "rounded-2xl"}`}
    >
      {/* 100% INVISIBLE by default — zero borders, zero badges, pristine artwork */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleTrigger();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={`${hotspot.title} — ${hotspot.subtitle}. Click to explore.`}
        className={`w-full h-full cursor-pointer focus:outline-none transition-all duration-300 bg-transparent border-0 ring-0 ${
          hotspot.borderRadius || "rounded-2xl"
        } ${
          isActive
            ? "ring-2 ring-amber-400/80 bg-amber-400/10 shadow-[0_0_25px_rgba(251,191,36,0.4)]"
            : "hover:ring-2 hover:ring-white/60 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] focus-visible:ring-2 focus-visible:ring-amber-400"
        }`}
      />

      {/* Smooth Rich Tooltip (Visible ONLY on mouse hover or keyboard focus on desktop) */}
      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div
            initial={{ opacity: 0, y: isNearTop ? -6 : 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isNearTop ? -4 : 4, scale: 0.95 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute ${tooltipPosClasses} ${horizontalAlignClasses} w-max max-w-[260px] p-3 bg-slate-950/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-amber-300/70 z-40 pointer-events-none select-none`}
            style={{
              boxShadow: `0 12px 32px -5px rgba(0, 0, 0, 0.7), 0 0 20px ${hotspot.accentColor}40`,
            }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: hotspot.accentColor }}
              />
              <p className="text-xs font-black text-amber-300 leading-tight">
                {hotspot.title}
              </p>
            </div>

            <p className="text-[11px] text-slate-300 font-medium leading-tight">
              {hotspot.subtitle}
            </p>

            <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-emerald-400 font-bold">
              <span>{hotspot.actionText || "Click to open"}</span>
              <ArrowRight className="w-3 h-3" />
            </div>

            {/* Downward/Upward Pointer Triangle */}
            <div
              className={`absolute ${arrowClasses} ${arrowAlignClasses} border-x-5 border-x-transparent border-t-5`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
