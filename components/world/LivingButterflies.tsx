"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * LivingButterflies
 * Brings all 5 butterflies in the Moolies world to life with:
 * 1. Rapid 3D wing flapping animations (rotateY / scaleX).
 * 2. Continuous organic flight paths across the meadow, treehouse porch, river, and sky.
 * 3. Interactive hover/tap response: butterflies do playful aerial loops when hovered or clicked!
 */
export const LivingButterflies: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {/* 1. MONARCH BUTTERFLY (Porch Tree Trunk & Flower Garden) */}
      <ButterflyMonarch />

      {/* 2. AZURE BLUE MORPHO BUTTERFLY (Bushes, River & Central Meadow) */}
      <ButterflyBlue />

      {/* 3. GOLDEN YELLOW SWALLOWTAIL BUTTERFLY (River Bank & Picnic) */}
      <ButterflyYellow />

      {/* 4. PURPLE & PINK BREEZE BUTTERFLY (Near Kite in High Sky) */}
      <ButterflyPurpleKite />

      {/* 5. ORANGE MEADOW BUTTERFLY (Shore Grass & Soccer Goal) */}
      <ButterflyOrangeShore />
    </div>
  );
};

// =========================================================================
// 1. MONARCH BUTTERFLY (Tree trunk / Porch flowers / Whitelist window)
// =========================================================================
const ButterflyMonarch: React.FC = () => {
  const [isExcited, setIsExcited] = useState(false);

  return (
    <motion.div
      style={{
        left: "14.2%",
        top: "35.8%",
        width: "42px",
        height: "36px",
      }}
      className="absolute pointer-events-auto cursor-pointer"
      onMouseEnter={() => setIsExcited(true)}
      onMouseLeave={() => setIsExcited(false)}
      onClick={() => setIsExcited((prev) => !prev)}
      title="Monarch Butterfly — Click or hover to watch it dance!"
      animate={
        isExcited
          ? {
              x: [0, 45, 80, 50, -20, 0],
              y: [0, -35, -15, 25, 10, 0],
              rotate: [0, -25, 15, -10, 15, 0],
              scale: [1, 1.25, 1.15, 0.95, 1.1, 1],
            }
          : {
              x: [0, 32, 60, 42, 12, 0],
              y: [0, -22, -8, 16, 10, 0],
              rotate: [2, -14, 10, -8, 6, 2],
            }
      }
      transition={{
        duration: isExcited ? 5.5 : 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Wing */}
        <motion.div
          style={{ transformOrigin: "right center" }}
          animate={{
            rotateY: [0, 68, 0],
            scaleX: [1, 0.28, 1],
          }}
          transition={{
            duration: isExcited ? 0.12 : 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[19px] h-[28px]"
        >
          <svg viewBox="0 0 24 34" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            <path
              d="M24,18 C20,4 10,0 2,4 C-3,8 2,24 16,28 C20,29 23,24 24,18 Z"
              fill="#F97316"
              stroke="#1C1917"
              strokeWidth="1.8"
            />
            <path d="M22,16 C18,7 11,4 5,8 C3,12 8,22 17,24 Z" fill="#FBBF24" />
            <circle cx="5" cy="7" r="1.5" fill="white" />
            <circle cx="8" cy="18" r="1.3" fill="white" />
            <path
              d="M24,20 C18,24 10,26 8,30 C6,34 14,35 18,31 C22,27 24,23 24,20 Z"
              fill="#EA580C"
              stroke="#1C1917"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>

        {/* Butterfly Slim Body */}
        <div className="w-[3px] h-[20px] bg-[#1c1917] rounded-full mx-[-1px] z-10 flex flex-col items-center">
          <div className="w-[4px] h-[4px] bg-[#292524] rounded-full mt-[-1px]" />
        </div>

        {/* Right Wing */}
        <motion.div
          style={{ transformOrigin: "left center" }}
          animate={{
            rotateY: [0, -68, 0],
            scaleX: [1, 0.28, 1],
          }}
          transition={{
            duration: isExcited ? 0.12 : 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[19px] h-[28px]"
        >
          <svg
            viewBox="0 0 24 34"
            fill="none"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] scale-x-[-1]"
          >
            <path
              d="M24,18 C20,4 10,0 2,4 C-3,8 2,24 16,28 C20,29 23,24 24,18 Z"
              fill="#F97316"
              stroke="#1C1917"
              strokeWidth="1.8"
            />
            <path d="M22,16 C18,7 11,4 5,8 C3,12 8,22 17,24 Z" fill="#FBBF24" />
            <circle cx="5" cy="7" r="1.5" fill="white" />
            <circle cx="8" cy="18" r="1.3" fill="white" />
            <path
              d="M24,20 C18,24 10,26 8,30 C6,34 14,35 18,31 C22,27 24,23 24,20 Z"
              fill="#EA580C"
              stroke="#1C1917"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

// =========================================================================
// 2. AZURE BLUE MORPHO BUTTERFLY (Meadow & River sweep)
// =========================================================================
const ButterflyBlue: React.FC = () => {
  const [isExcited, setIsExcited] = useState(false);

  return (
    <motion.div
      style={{
        left: "35.5%",
        top: "34.2%",
        width: "36px",
        height: "32px",
      }}
      className="absolute pointer-events-auto cursor-pointer"
      onMouseEnter={() => setIsExcited(true)}
      onClick={() => setIsExcited((prev) => !prev)}
      title="Blue Morpho Butterfly"
      animate={
        isExcited
          ? {
              x: [0, 80, 130, 70, -30, 0],
              y: [0, -50, 20, 60, -20, 0],
              rotate: [-6, 25, -18, 20, -12, -6],
            }
          : {
              x: [0, 55, 95, 60, 15, 0],
              y: [0, -32, 10, 38, 12, 0],
              rotate: [-4, 16, -12, 14, -8, -4],
            }
      }
      transition={{
        duration: isExcited ? 6 : 14,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Wing */}
        <motion.div
          style={{ transformOrigin: "right center" }}
          animate={{
            rotateY: [0, 72, 0],
            scaleX: [1, 0.22, 1],
          }}
          transition={{
            duration: 0.17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[16px] h-[24px]"
        >
          <svg viewBox="0 0 20 28" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
            <path
              d="M20,14 C16,2 8,0 2,3 C-2,7 2,20 14,24 C18,25 20,20 20,14 Z"
              fill="#0284C7"
              stroke="#082F49"
              strokeWidth="1.6"
            />
            <path d="M18,13 C14,5 9,3 4,6 C2,9 6,18 13,20 Z" fill="#38BDF8" />
            <circle cx="5" cy="6" r="1.2" fill="white" />
            <circle cx="7" cy="14" r="1" fill="#E0F2FE" />
          </svg>
        </motion.div>

        {/* Body */}
        <div className="w-[2.5px] h-[16px] bg-[#0c4a6e] rounded-full mx-[-1px] z-10" />

        {/* Right Wing */}
        <motion.div
          style={{ transformOrigin: "left center" }}
          animate={{
            rotateY: [0, -72, 0],
            scaleX: [1, 0.22, 1],
          }}
          transition={{
            duration: 0.17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[16px] h-[24px]"
        >
          <svg
            viewBox="0 0 20 28"
            fill="none"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] scale-x-[-1]"
          >
            <path
              d="M20,14 C16,2 8,0 2,3 C-2,7 2,20 14,24 C18,25 20,20 20,14 Z"
              fill="#0284C7"
              stroke="#082F49"
              strokeWidth="1.6"
            />
            <path d="M18,13 C14,5 9,3 4,6 C2,9 6,18 13,20 Z" fill="#38BDF8" />
            <circle cx="5" cy="6" r="1.2" fill="white" />
            <circle cx="7" cy="14" r="1" fill="#E0F2FE" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

// =========================================================================
// 3. GOLDEN YELLOW SWALLOWTAIL BUTTERFLY (River & Shore)
// =========================================================================
const ButterflyYellow: React.FC = () => {
  return (
    <motion.div
      style={{
        left: "35.3%",
        top: "42.5%",
        width: "34px",
        height: "30px",
      }}
      className="absolute pointer-events-auto cursor-pointer"
      title="Yellow Swallowtail Butterfly"
      animate={{
        x: [0, 40, 75, 35, -20, 0],
        y: [0, -28, -5, 24, 10, 0],
        rotate: [6, -15, 12, -10, 14, 6],
      }}
      transition={{
        duration: 11,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Wing */}
        <motion.div
          style={{ transformOrigin: "right center" }}
          animate={{
            rotateY: [0, 70, 0],
            scaleX: [1, 0.25, 1],
          }}
          transition={{
            duration: 0.18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[15px] h-[22px]"
        >
          <svg viewBox="0 0 20 26" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path
              d="M20,13 C16,2 7,0 2,3 C-2,7 2,18 14,22 C18,23 20,19 20,13 Z"
              fill="#FACC15"
              stroke="#1C1917"
              strokeWidth="1.6"
            />
            <path d="M18,12 C14,5 8,3 4,6 C2,8 6,16 13,18 Z" fill="#FEF08A" />
            {/* Tiger stripes */}
            <path d="M12,4 L10,9" stroke="#1C1917" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M16,7 L13,13" stroke="#1C1917" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Body */}
        <div className="w-[2.5px] h-[15px] bg-[#1c1917] rounded-full mx-[-1px] z-10" />

        {/* Right Wing */}
        <motion.div
          style={{ transformOrigin: "left center" }}
          animate={{
            rotateY: [0, -70, 0],
            scaleX: [1, 0.25, 1],
          }}
          transition={{
            duration: 0.18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[15px] h-[22px]"
        >
          <svg
            viewBox="0 0 20 26"
            fill="none"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] scale-x-[-1]"
          >
            <path
              d="M20,13 C16,2 7,0 2,3 C-2,7 2,18 14,22 C18,23 20,19 20,13 Z"
              fill="#FACC15"
              stroke="#1C1917"
              strokeWidth="1.6"
            />
            <path d="M18,12 C14,5 8,3 4,6 C2,8 6,16 13,18 Z" fill="#FEF08A" />
            <path d="M12,4 L10,9" stroke="#1C1917" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M16,7 L13,13" stroke="#1C1917" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

// =========================================================================
// 4. PURPLE & PINK BREEZE BUTTERFLY (Near Kite in High Sky)
// =========================================================================
const ButterflyPurpleKite: React.FC = () => {
  return (
    <motion.div
      style={{
        left: "77%",
        top: "16%",
        width: "32px",
        height: "28px",
      }}
      className="absolute pointer-events-auto cursor-pointer"
      title="Purple Kite Butterfly"
      animate={{
        x: [0, -35, -60, -25, 15, 0],
        y: [0, -25, 12, 30, 8, 0],
        rotate: [-8, 16, -12, 10, -6, -8],
      }}
      transition={{
        duration: 9.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Wing */}
        <motion.div
          style={{ transformOrigin: "right center" }}
          animate={{
            rotateY: [0, 75, 0],
            scaleX: [1, 0.2, 1],
          }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[14px] h-[20px]"
        >
          <svg viewBox="0 0 18 24" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path
              d="M18,12 C14,2 6,0 2,3 C-2,6 2,17 12,20 C16,21 18,17 18,12 Z"
              fill="#A855F7"
              stroke="#581C87"
              strokeWidth="1.5"
            />
            <path d="M16,11 C12,4 7,3 3,5 C1,7 4,14 11,17 Z" fill="#F472B6" />
            <circle cx="5" cy="5" r="1.1" fill="white" />
          </svg>
        </motion.div>

        {/* Body */}
        <div className="w-[2.2px] h-[14px] bg-[#581c87] rounded-full mx-[-1px] z-10" />

        {/* Right Wing */}
        <motion.div
          style={{ transformOrigin: "left center" }}
          animate={{
            rotateY: [0, -75, 0],
            scaleX: [1, 0.2, 1],
          }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[14px] h-[20px]"
        >
          <svg
            viewBox="0 0 18 24"
            fill="none"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] scale-x-[-1]"
          >
            <path
              d="M18,12 C14,2 6,0 2,3 C-2,6 2,17 12,20 C16,21 18,17 18,12 Z"
              fill="#A855F7"
              stroke="#581C87"
              strokeWidth="1.5"
            />
            <path d="M16,11 C12,4 7,3 3,5 C1,7 4,14 11,17 Z" fill="#F472B6" />
            <circle cx="5" cy="5" r="1.1" fill="white" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

// =========================================================================
// 5. ORANGE MEADOW BUTTERFLY (Shore Grass & Soccer Goal)
// =========================================================================
const ButterflyOrangeShore: React.FC = () => {
  return (
    <motion.div
      style={{
        left: "58.5%",
        top: "53%",
        width: "35px",
        height: "30px",
      }}
      className="absolute pointer-events-auto cursor-pointer"
      title="Shore Grass Butterfly"
      animate={{
        x: [0, 45, 80, 35, -25, 0],
        y: [0, -22, 10, 26, 8, 0],
        rotate: [-4, 15, -10, 12, -8, -4],
      }}
      transition={{
        duration: 10.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Wing */}
        <motion.div
          style={{ transformOrigin: "right center" }}
          animate={{
            rotateY: [0, 68, 0],
            scaleX: [1, 0.25, 1],
          }}
          transition={{
            duration: 0.17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[15px] h-[22px]"
        >
          <svg viewBox="0 0 20 26" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path
              d="M20,13 C16,2 7,0 2,3 C-2,7 2,18 14,22 C18,23 20,19 20,13 Z"
              fill="#F97316"
              stroke="#431407"
              strokeWidth="1.6"
            />
            <path d="M18,12 C14,5 8,3 4,6 C2,8 6,16 13,18 Z" fill="#FDE047" />
            <circle cx="5" cy="6" r="1.1" fill="white" />
          </svg>
        </motion.div>

        {/* Body */}
        <div className="w-[2.5px] h-[15px] bg-[#431407] rounded-full mx-[-1px] z-10" />

        {/* Right Wing */}
        <motion.div
          style={{ transformOrigin: "left center" }}
          animate={{
            rotateY: [0, -68, 0],
            scaleX: [1, 0.25, 1],
          }}
          transition={{
            duration: 0.17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[15px] h-[22px]"
        >
          <svg
            viewBox="0 0 20 26"
            fill="none"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] scale-x-[-1]"
          >
            <path
              d="M20,13 C16,2 7,0 2,3 C-2,7 2,18 14,22 C18,23 20,19 20,13 Z"
              fill="#F97316"
              stroke="#431407"
              strokeWidth="1.6"
            />
            <path d="M18,12 C14,5 8,3 4,6 C2,8 6,16 13,18 Z" fill="#FDE047" />
            <circle cx="5" cy="6" r="1.1" fill="white" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};
