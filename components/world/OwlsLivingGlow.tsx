"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * OwlsLivingGlow
 * Features:
 * 1. Continuous luminous light glow sweep moving Left to Right across the owls.
 * 2. ONLY glows on the owls (using precise SVG owl silhouettes mask).
 * 3. Timing: 5.0s active sweep across all owls, 1.0s rest/pause, then resets and repeats.
 * 4. Interactive pointer hover: Hovering directly over any owl triggers an interactive glowing aura & sparkle reaction!
 */
export const OwlsLivingGlow: React.FC = () => {
  const [hoveredOwl, setHoveredOwl] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 z-18 pointer-events-none overflow-hidden select-none">
      {/* ======================================================== */}
      {/* 1. MASKED SWEEPING GLOW (ONLY GLOWS ON THE OWLS) */}
      {/* ======================================================== */}
      <svg
        viewBox="0 0 1024 650"
        className="w-full h-full absolute inset-0 pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Mask that strictly isolates ONLY the 5 owls on the artwork */}
          <mask id="owlsSilhouetteMask">
            {/* Black background hides all non-owl areas (sky, meadow, water, trees) */}
            <rect width="1024" height="650" fill="black" />

            {/* 1. Purple Balcony Owl (top left treehouse window) */}
            <ellipse cx="186" cy="148" rx="48" ry="52" fill="white" />
            <polygon points="150,110 162,90 178,110" fill="white" />
            <polygon points="194,110 210,90 222,110" fill="white" />

            {/* 2. Left Picnic Brown Owl with Drink (boba hoodie owl) */}
            <ellipse cx="170" cy="510" rx="98" ry="118" fill="white" />
            <ellipse cx="170" cy="425" rx="88" ry="60" fill="white" />
            <polygon points="90,410 110,360 135,400" fill="white" />
            <polygon points="205,400 230,360 250,410" fill="white" />

            {/* 3. Mid Picnic Business Owl with Spectacles & Suit */}
            <ellipse cx="360" cy="515" rx="82" ry="106" fill="white" />
            <ellipse cx="360" cy="435" rx="76" ry="56" fill="white" />
            <polygon points="295,415 315,370 338,405" fill="white" />
            <polygon points="382,405 405,370 425,415" fill="white" />

            {/* 4. Kite Flyer Blue Owl (on soccer goal crossbar) */}
            <ellipse cx="882" cy="236" rx="52" ry="58" fill="white" />
            <ellipse cx="882" cy="195" rx="42" ry="38" fill="white" />

            {/* 5. Sleeping Owl with Eye Mask on Blanket (bottom right) */}
            <ellipse cx="895" cy="580" rx="98" ry="66" fill="white" />
            <ellipse cx="840" cy="570" rx="58" ry="52" fill="white" />
          </mask>

          {/* Golden luminous sweeping glow gradient */}
          <linearGradient id="owlSweepLightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0" />
            <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>

          {/* Secondary cyan-white prismatic shimmer */}
          <linearGradient id="owlSweepPrismGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Masked Glowing Container: Only elements inside the owls' silhouettes are visible */}
        <g mask="url(#owlsSilhouetteMask)">
          {/* Main Sweeping Light Beam:
              Moves from -220px to 1180px over 5.0 seconds,
              rests for 1.0 second (opacity 0 at right), then repeats (6.0s total cycle).
          */}
          <motion.rect
            y="0"
            width="220"
            height="650"
            fill="url(#owlSweepLightGrad)"
            style={{ mixBlendMode: "color-dodge" }}
            animate={{
              x: [-240, 1180, 1180],
              opacity: [0.95, 0.95, 0],
            }}
            transition={{
              duration: 6.0,
              times: [0, 0.8333, 1], // 0s to 5s moving, 5s to 6s rest
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Secondary Soft Ambient Wave over the owls */}
          <motion.rect
            y="0"
            width="140"
            height="650"
            fill="url(#owlSweepPrismGrad)"
            style={{ mixBlendMode: "screen" }}
            animate={{
              x: [-180, 1160, 1160],
              opacity: [0.75, 0.75, 0],
            }}
            transition={{
              duration: 6.0,
              times: [0, 0.8333, 1],
              repeat: Infinity,
              ease: "linear",
              delay: 0.25,
            }}
          />
        </g>
      </svg>

      {/* ======================================================== */}
      {/* 2. INTERACTIVE MOUSE POINTER HOVER GLOW ZONES OVER THE OWLS */}
      {/* ======================================================== */}

      {/* Owl 1: Balcony Owl */}
      <div
        style={{
          left: "13.2%",
          top: "8.8%",
          width: "9.5%",
          height: "15.0%",
          borderRadius: "50% 50% 40% 40%",
        }}
        className="absolute pointer-events-auto cursor-pointer"
        onMouseEnter={() => setHoveredOwl("balcony")}
        onMouseLeave={() => setHoveredOwl(null)}
        title="Balcony Owl — Moolies Sentinel"
      >
        <OwlHoverHighlight isHovered={hoveredOwl === "balcony"} label="Balcony Owl" color="#A855F7" />
      </div>

      {/* Owl 2: Left Picnic Brown Owl with Boba */}
      <div
        style={{
          left: "6.2%",
          top: "56.5%",
          width: "21.5%",
          height: "41.0%",
          borderRadius: "45% 45% 35% 35%",
        }}
        className="absolute pointer-events-auto cursor-pointer"
        onMouseEnter={() => setHoveredOwl("boba")}
        onMouseLeave={() => setHoveredOwl(null)}
        title="Boba Owl — Chilling with drink"
      >
        <OwlHoverHighlight isHovered={hoveredOwl === "boba"} label="Picnic Owl" color="#F59E0B" />
      </div>

      {/* Owl 3: Business Suit Owl with Glasses */}
      <div
        style={{
          left: "26.5%",
          top: "59.5%",
          width: "17.8%",
          height: "36.0%",
          borderRadius: "45% 45% 35% 35%",
        }}
        className="absolute pointer-events-auto cursor-pointer"
        onMouseEnter={() => setHoveredOwl("suit")}
        onMouseLeave={() => setHoveredOwl(null)}
        title="Professor Owl — Project Lorekeeper"
      >
        <OwlHoverHighlight isHovered={hoveredOwl === "suit"} label="Lorekeeper Owl" color="#EAB308" />
      </div>

      {/* Owl 4: Kite Flyer Blue Owl */}
      <div
        style={{
          left: "80.5%",
          top: "26.0%",
          width: "11.5%",
          height: "18.5%",
          borderRadius: "50% 50% 40% 40%",
        }}
        className="absolute pointer-events-auto cursor-pointer"
        onMouseEnter={() => setHoveredOwl("kite")}
        onMouseLeave={() => setHoveredOwl(null)}
        title="Kite Flyer Owl — Flying high"
      >
        <OwlHoverHighlight isHovered={hoveredOwl === "kite"} label="Kite Flyer Owl" color="#38BDF8" />
      </div>

      {/* Owl 5: Sleeping Owl with Cyan Mask */}
      <div
        style={{
          left: "76.5%",
          top: "76.0%",
          width: "22.5%",
          height: "22.0%",
          borderRadius: "40% 40% 30% 30%",
        }}
        className="absolute pointer-events-auto cursor-pointer"
        onMouseEnter={() => setHoveredOwl("sleep")}
        onMouseLeave={() => setHoveredOwl(null)}
        title="Sleepy Owl — Dozing on the picnic blanket"
      >
        <OwlHoverHighlight isHovered={hoveredOwl === "sleep"} label="Sleepy Owl" color="#06B6D4" />
      </div>
    </div>
  );
};

// Component for interactive hover highlight when pointer is over an owl
const OwlHoverHighlight: React.FC<{
  isHovered: boolean;
  label: string;
  color: string;
}> = ({ isHovered, label, color }) => {
  return (
    <AnimatePresence>
      {isHovered && (
        <>
          {/* Radiant Aura around the Owl */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: `0 0 35px ${color}B3, inset 0 0 20px ${color}66`,
              borderColor: `${color}CC`,
              background: `radial-gradient(circle, ${color}26 0%, transparent 75%)`,
            }}
            className="absolute inset-0 rounded-inherit border-2 pointer-events-none"
          />

          {/* Cute Floating Owl Badge */}
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            style={{ borderColor: `${color}80` }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 z-40 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-white border shadow-lg backdrop-blur-md flex items-center gap-1 whitespace-nowrap text-[10px] font-bold tracking-wide pointer-events-none"
          >
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: "3s" }} />
            <span>{label}</span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
