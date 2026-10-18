"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * CornerButterflies
 * Placed on the top-left and top-right corners of opened section modals.
 * They are flying (flapping wings continuously & subtle in-place hover) but stay fixed in their corner position.
 */
export const CornerButterflies: React.FC = () => {
  return (
    <>
      {/* ======================================================== */}
      {/* TOP-LEFT CORNER BUTTERFLY (Monarch Orange & Yellow) */}
      {/* ======================================================== */}
      <motion.div
        style={{
          top: "-20px",
          left: "-18px",
          width: "44px",
          height: "40px",
        }}
        className="absolute z-50 pointer-events-none select-none"
        animate={{
          y: [0, -4, 0],
          rotate: [22, 26, 22],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Left Wing (3D flapping) */}
          <motion.div
            style={{ transformOrigin: "right center" }}
            animate={{
              rotateY: [0, 72, 0],
              scaleX: [1, 0.22, 1],
            }}
            transition={{
              duration: 0.16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[19px] h-[28px]"
          >
            <svg viewBox="0 0 24 34" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
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

          {/* Butterfly Body */}
          <div className="w-[3px] h-[20px] bg-[#1c1917] rounded-full mx-[-1px] z-10 flex flex-col items-center">
            <div className="w-[4px] h-[4px] bg-[#292524] rounded-full mt-[-1px]" />
          </div>

          {/* Right Wing (3D flapping) */}
          <motion.div
            style={{ transformOrigin: "left center" }}
            animate={{
              rotateY: [0, -72, 0],
              scaleX: [1, 0.22, 1],
            }}
            transition={{
              duration: 0.16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[19px] h-[28px]"
          >
            <svg
              viewBox="0 0 24 34"
              fill="none"
              className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] scale-x-[-1]"
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

      {/* ======================================================== */}
      {/* TOP-RIGHT CORNER BUTTERFLY (Azure Blue Morpho) */}
      {/* ======================================================== */}
      <motion.div
        style={{
          top: "-20px",
          right: "-18px",
          width: "44px",
          height: "40px",
        }}
        className="absolute z-50 pointer-events-none select-none"
        animate={{
          y: [0, -4, 0],
          rotate: [-22, -26, -22],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Left Wing (3D flapping) */}
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
            className="w-[18px] h-[26px]"
          >
            <svg viewBox="0 0 20 28" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              <path
                d="M20,14 C16,2 8,0 2,3 C-2,7 2,20 14,24 C18,25 20,20 20,14 Z"
                fill="#0284C7"
                stroke="#082F49"
                strokeWidth="1.6"
              />
              <path d="M18,13 C14,5 9,3 4,6 C2,9 6,18 13,20 Z" fill="#38BDF8" />
              <circle cx="5" cy="6" r="1.3" fill="white" />
              <circle cx="7" cy="14" r="1.1" fill="#E0F2FE" />
            </svg>
          </motion.div>

          {/* Butterfly Body */}
          <div className="w-[3px] h-[18px] bg-[#0c4a6e] rounded-full mx-[-1px] z-10" />

          {/* Right Wing (3D flapping) */}
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
            className="w-[18px] h-[26px]"
          >
            <svg
              viewBox="0 0 20 28"
              fill="none"
              className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] scale-x-[-1]"
            >
              <path
                d="M20,14 C16,2 8,0 2,3 C-2,7 2,20 14,24 C18,25 20,20 20,14 Z"
                fill="#0284C7"
                stroke="#082F49"
                strokeWidth="1.6"
              />
              <path d="M18,13 C14,5 9,3 4,6 C2,9 6,18 13,20 Z" fill="#38BDF8" />
              <circle cx="5" cy="6" r="1.3" fill="white" />
              <circle cx="7" cy="14" r="1.1" fill="#E0F2FE" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
