"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * LivingWorld3DAtmosphere
 * Infuses the 2D artwork with rich 3D depth and cinematic life:
 * 1. Warm golden volumetric sunbeams streaming down from the sun.
 * 2. Floating 3D sun pollen & golden dust motes drifting across the atmosphere.
 * 3. Falling tree leaves drifting on the meadow breeze.
 * 4. Cat kite rainbow ribbons softly waving in the sky.
 */
export const LivingWorld3DAtmosphere: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15 select-none">
      {/* ======================================================== */}
      {/* 1. VOLUMETRIC SUNBEAMS (Streaming from the Sun at Top Right) */}
      {/* ======================================================== */}
      <div className="absolute top-0 right-0 w-[70%] h-[75%] pointer-events-none overflow-hidden opacity-30 mix-blend-screen">
        <svg viewBox="0 0 700 500" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="sunbeamGrad1" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#FDE047" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sunbeamGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FEF08A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Sunbeam Ray 1 */}
          <polygon points="680,0 700,0 350,500 240,500" fill="url(#sunbeamGrad1)" />

          {/* Sunbeam Ray 2 */}
          <polygon points="620,0 650,0 160,500 80,500" fill="url(#sunbeamGrad2)" />

          {/* Sunbeam Ray 3 */}
          <polygon points="560,0 590,0 60,400 0,380" fill="url(#sunbeamGrad1)" />
        </svg>
      </div>

      {/* ======================================================== */}
      {/* 2. FLOATING 3D GOLDEN SUN POLLEN & DUST MOTES */}
      {/* ======================================================== */}
      {[
        { x: "22%", y: "45%", size: 3, delay: 0, dur: 7 },
        { x: "38%", y: "38%", size: 4, delay: 1.5, dur: 9 },
        { x: "48%", y: "52%", size: 3.5, delay: 3, dur: 8 },
        { x: "62%", y: "42%", size: 2.8, delay: 0.8, dur: 10 },
        { x: "74%", y: "35%", size: 4.2, delay: 2.2, dur: 7.5 },
        { x: "28%", y: "58%", size: 3, delay: 4, dur: 8.5 },
        { x: "55%", y: "65%", size: 3.8, delay: 1.2, dur: 9.5 },
      ].map((p, idx) => (
        <motion.div
          key={idx}
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          className="absolute rounded-full bg-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.85)]"
          animate={{
            y: [0, -18, 0],
            x: [0, 12, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ======================================================== */}
      {/* 3. DRIFTING GREEN LEAVES (From Big Tree on Left across Meadow) */}
      {/* ======================================================== */}
      {[
        { startY: "18%", delay: 0, dur: 16 },
        { startY: "26%", delay: 5.5, dur: 19 },
        { startY: "22%", delay: 11, dur: 17 },
      ].map((leaf, idx) => (
        <motion.div
          key={`leaf-${idx}`}
          style={{
            top: leaf.startY,
            left: "8%",
          }}
          className="absolute"
          animate={{
            x: ["0px", "650px"],
            y: [0, 45, -15, 60, 20, 80],
            rotate: [0, 180, 360, 540],
            opacity: [0, 0.85, 0.9, 0.75, 0],
          }}
          transition={{
            duration: leaf.dur,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "easeInOut",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M10,2 C15,2 18,7 18,10 C18,15 13,18 10,18 C5,18 2,13 2,10 C2,5 7,2 10,2 Z"
              fill="#22C55E"
              stroke="#15803D"
              strokeWidth="1.2"
            />
            <path d="M5,10 C10,9 12,11 15,10" stroke="#166534" strokeWidth="0.9" />
          </svg>
        </motion.div>
      ))}

      {/* ======================================================== */}
      {/* 4. CAT KITE WAVING RIBBONS (In High Sky Breeze) */}
      {/* ======================================================== */}
      <div
        style={{
          left: "57%",
          top: "11%",
          width: "12%",
          height: "14%",
        }}
        className="absolute pointer-events-none"
      >
        <motion.div
          animate={{
            rotate: [-2, 4, -2],
            x: [0, 4, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full opacity-65 mix-blend-overlay"
        >
          {/* Subtle animated wind shimmer around kite ribbons */}
          <div className="w-16 h-8 rounded-full bg-cyan-200/20 blur-md" />
        </motion.div>
      </div>
    </div>
  );
};
