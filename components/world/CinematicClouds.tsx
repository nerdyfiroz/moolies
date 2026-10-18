"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * CinematicClouds
 * Renders multiple layers of fluffy stylized 2D cartoon clouds
 * that continuously drift across the sky from left to right using Framer Motion.
 * Offset initial positions ensure clouds are gracefully populated across the sky immediately on load.
 */
export const CinematicClouds: React.FC = () => {
  return (
    <div className="absolute inset-x-0 top-0 h-[30%] pointer-events-none overflow-hidden z-11 select-none">
      {/* ======================================================== */}
      {/* CLOUD 1: High Altitude Giant Fluffy Cloud */}
      {/* ======================================================== */}
      <motion.div
        style={{
          top: "2.5%",
          left: 0,
        }}
        className="absolute"
        animate={{
          x: ["-280px", "1150px"],
        }}
        transition={{
          duration: 52,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="240" height="85" viewBox="0 0 240 85" fill="none" className="opacity-90 drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)]">
            {/* Soft Cloud Base */}
            <path
              d="M35 70 C15 70 0 58 0 42 C0 26 20 14 36 16 C45 6 68 0 88 9 C104 2 130 0 146 9 C162 2 190 6 202 20 C222 20 240 34 240 50 C240 68 222 74 206 70 L35 70 Z"
              fill="white"
            />
            {/* Shaded bottom puff */}
            <path
              d="M50 62 C32 62 16 54 16 42 C16 30 35 22 50 24 C58 14 78 10 95 18 C112 10 136 10 150 18 C168 12 192 18 200 30 C218 34 224 48 218 60 Z"
              fill="#F0F9FF"
              fillOpacity="0.85"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ======================================================== */}
      {/* CLOUD 2: Mid-Sky Cozy Cloud (Pre-offset so it's visible on load) */}
      {/* ======================================================== */}
      <motion.div
        style={{
          top: "10%",
          left: 0,
        }}
        className="absolute"
        initial={{ x: "320px" }}
        animate={{
          x: ["320px", "1150px", "-260px", "320px"],
        }}
        transition={{
          duration: 65,
          times: [0, 0.58, 0.5801, 1],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg width="200" height="70" viewBox="0 0 200 70" fill="none" className="opacity-85 drop-shadow-[0_3px_6px_rgba(0,0,0,0.05)]">
            <path
              d="M30 58 C12 58 0 46 0 32 C0 18 18 10 32 12 C40 4 60 0 76 6 C90 2 112 0 126 6 C140 2 164 4 174 16 C192 17 200 28 200 42 C200 56 188 60 172 58 L30 58 Z"
              fill="white"
            />
            <path
              d="M40 50 C26 50 12 44 12 32 C12 20 28 14 40 16 C48 10 66 6 80 12 C94 6 114 6 126 12 C138 8 158 12 166 22 C180 24 188 34 185 46 Z"
              fill="#E0F2FE"
              fillOpacity="0.75"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ======================================================== */}
      {/* CLOUD 3: Trailing Fluffy Cloud (Pre-offset mid sky) */}
      {/* ======================================================== */}
      <motion.div
        style={{
          top: "15%",
          left: 0,
        }}
        className="absolute"
        initial={{ x: "720px" }}
        animate={{
          x: ["720px", "1150px", "-220px", "720px"],
        }}
        transition={{
          duration: 58,
          times: [0, 0.31, 0.3101, 1],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <svg width="170" height="60" viewBox="0 0 170 60" fill="none" className="opacity-80">
            <path
              d="M24 50 C10 50 0 40 0 28 C0 14 15 7 28 9 C35 3 52 0 66 6 C78 2 98 0 110 6 C122 2 142 5 150 15 C164 16 170 26 170 38 C170 50 158 53 146 50 L24 50 Z"
              fill="white"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ======================================================== */}
      {/* CLOUD 4: Fresh incoming cloud entering from offscreen left */}
      {/* ======================================================== */}
      <motion.div
        style={{
          top: "6%",
          left: 0,
        }}
        className="absolute"
        animate={{
          x: ["-240px", "1150px"],
        }}
        transition={{
          duration: 72,
          repeat: Infinity,
          ease: "linear",
          delay: 15,
        }}
      >
        <svg width="190" height="65" viewBox="0 0 190 65" fill="none" className="opacity-75">
          <path
            d="M28 54 C12 54 0 44 0 30 C0 16 16 8 30 10 C38 4 56 0 72 6 C84 2 105 0 118 6 C132 2 152 4 162 16 C178 17 190 28 190 40 C190 52 178 56 164 54 L28 54 Z"
            fill="white"
          />
        </svg>
      </motion.div>
    </div>
  );
};
