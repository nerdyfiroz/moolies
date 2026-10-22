"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface MooliesGatewayLoaderProps {
  onEnter: () => void;
}

const LOADING_STATUS_MESSAGES = [
  "Awakening the sunlit meadow & lake...",
  "Tuning the sky breeze for Pip's cat-kite...",
  "Warming up the cozy treehouse lanterns...",
  "Synthesizing 2,000 Genesis Moolies traits...",
  "Entering Moolies Realm...",
];

export const MooliesGatewayLoader: React.FC<MooliesGatewayLoaderProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Smooth preloader progress from 0% to 100% then auto-enter
  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800; // 1.8s clean smooth count

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min((elapsed / duration) * 100, 100);
      const bounded = Math.min(Math.round(rawPct), 100);

      setProgress(bounded);

      const messageStep = Math.min(
        Math.floor((bounded / 100) * LOADING_STATUS_MESSAGES.length),
        LOADING_STATUS_MESSAGES.length - 1
      );
      setStatusIdx(messageStep);

      if (bounded >= 100) {
        clearInterval(timer);
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          // Short pause so user sees 100% then smooth transition into main page
          setTimeout(() => {
            setIsWarping(true);
            setTimeout(() => {
              onEnter();
            }, 450);
          }, 250);
        }
      }
    }, 30);

    return () => clearInterval(timer);
  }, [onEnter]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isWarping ? 0 : 1, scale: isWarping ? 1.05 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #1a0d33 0%, #100824 50%, #080314 85%, #04010a 100%)",
      }}
    >
      {/* Soft Ambient Aurora Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Main Centerpiece: Clean, Simple & Whimsical */}
      <main className="relative z-20 flex flex-col items-center justify-center max-w-sm w-full px-6 text-center">
        {/* Cute Floating Mascot Icon */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 mb-5 flex items-center justify-center"
        >
          {/* Subtle Outer Pulse Glow */}
          <div className="absolute inset-0 rounded-full bg-purple-500/25 blur-xl animate-pulse" />

          {/* Clean Glass Avatar Disc */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-purple-900/60 via-purple-700/40 to-indigo-800/60 border-2 border-purple-400/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.35)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-purple-500/10 to-purple-950/60" />

            {/* Signature Moolies Beanie Mascot SVG */}
            <svg
              viewBox="0 0 64 64"
              className="w-18 h-18 sm:w-20 sm:h-20 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            >
              <ellipse cx="32" cy="38" rx="20" ry="18" fill="#F3E8FF" stroke="#581C87" strokeWidth="2.5" />
              <ellipse cx="20" cy="41" rx="3.5" ry="2" fill="#F472B6" opacity="0.8" />
              <ellipse cx="44" cy="41" rx="3.5" ry="2" fill="#F472B6" opacity="0.8" />
              <circle cx="24" cy="36" r="3.8" fill="#1E1B4B" />
              <circle cx="25.2" cy="35" r="1.3" fill="#FFFFFF" />
              <circle cx="40" cy="36" r="3.8" fill="#1E1B4B" />
              <circle cx="41.2" cy="35" r="1.3" fill="#FFFFFF" />
              <path d="M 29 40 Q 32 44, 35 40 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
              <path
                d="M 14 30 C 14 18, 50 18, 50 30 C 47 34, 17 34, 14 30 Z"
                fill="#9333EA"
                stroke="#581C87"
                strokeWidth="2.5"
              />
              <rect x="13" y="27" width="38" height="6.5" rx="3" fill="#A855F7" stroke="#581C87" strokeWidth="1.8" />
              <circle cx="32" cy="17" r="5.5" fill="#C084FC" stroke="#581C87" strokeWidth="1.8" />
            </svg>
          </div>
        </motion.div>

        {/* Brand Headline */}
        <h1
          className="font-cooper text-3xl sm:text-4xl font-black tracking-wide mb-2 moolies-cooper-brand"
          style={{
            fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
          }}
        >
          MOOLIES WORLD
        </h1>

        {/* Cycling status message */}
        <div className="h-6 flex items-center justify-center mb-5">
          <p className="font-cartoon text-xs sm:text-sm text-purple-200/85 font-medium tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{LOADING_STATUS_MESSAGES[statusIdx]}</span>
          </p>
        </div>

        {/* Simple & Clean Progress Bar */}
        <div className="w-full space-y-3">
          <div className="relative p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-inner">
            <motion.div
              className="h-2.5 rounded-full relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #facc15 85%, #38bdf8 100%)",
                width: `${progress}%`,
                boxShadow: "0 0 12px rgba(236, 72, 153, 0.5)",
              }}
              transition={{ ease: "easeOut", duration: 0.08 }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-purple-300/70 px-1">
            <span className="tracking-wider">LOADING REALM</span>
            <span className="font-bold text-amber-300 text-sm tracking-wider">{progress}%</span>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="absolute bottom-5 inset-x-0 text-center pointer-events-none z-20">
        <p className="text-[10px] sm:text-xs font-mono text-purple-300/40 uppercase tracking-widest">
          Ethereum Mainnet • Handcrafted Vector Ecosystem
        </p>
      </footer>
    </motion.div>
  );
};
