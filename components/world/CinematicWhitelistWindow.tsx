"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, KeyRound } from "lucide-react";

interface CinematicWhitelistWindowProps {
  isOpen: boolean; // whether WhitelistModal is currently open
  onOpen: () => void; // triggers modal opening
}

/**
 * Cinematic Whitelist Window
 * Positioned on the treehouse porch structure under the beam (left: 11.8%, top: 30.5%, width: 14.2%, height: 19.5%).
 * When tapped/clicked, the dual wooden shutters swing open outward in 3D perspective,
 * unleashing a warm golden light burst & sparkles, cinematically presenting the Whitelist form.
 */
export const CinematicWhitelistWindow: React.FC<CinematicWhitelistWindowProps> = ({
  isOpen,
  onOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);

  // Sync internal animation state with parent isOpen
  useEffect(() => {
    if (isOpen) {
      setIsAnimatingOpen(true);
    } else {
      setIsAnimatingOpen(false);
    }
  }, [isOpen]);

  const handleWindowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger opening sequence
    setIsAnimatingOpen(true);

    // Call onOpen to present the Whitelist form cinematically
    setTimeout(() => {
      onOpen();
    }, 320);
  };

  const isWindowOpen = isOpen || isAnimatingOpen;

  return (
    <div
      style={{
        left: "11.6%",
        top: "30.4%",
        width: "14.4%",
        height: "19.6%",
        perspective: "1000px",
      }}
      className="absolute z-25 flex items-center justify-center select-none"
    >
      {/* Interactive Clickable Window Container */}
      <div
        onClick={handleWindowClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Treehouse Whitelist Window — Tap to open application form"
        title="Whitelist Window — Tap to open application form"
        className="relative w-full h-full cursor-pointer group flex items-center justify-center focus:outline-none"
      >
        {/* Floating Hover Guidance Tag */}
        <AnimatePresence>
          {isHovered && !isWindowOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                top: "-28px",
              }}
              className="absolute z-40 pointer-events-none px-2.5 py-1 rounded-full bg-slate-950/90 text-amber-300 border border-amber-400/80 shadow-xl backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap text-[10px] font-black tracking-wide"
            >
              <KeyRound className="w-3 h-3 text-emerald-400" />
              <span>Tap to Open Whitelist</span>
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: "4s" }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outer Wooden Arch Window Frame with Hover Glow */}
        <div
          className={`relative w-full h-full rounded-t-full rounded-b-2xl overflow-hidden border-[3.5px] transition-all duration-300 flex items-center justify-center ${
            isHovered || isWindowOpen
              ? "border-amber-400 bg-[#2a1408] shadow-[0_0_35px_rgba(251,191,36,0.9),0_8px_24px_rgba(0,0,0,0.7),inset_0_0_15px_rgba(251,191,36,0.4)]"
              : "border-[#3e1f0c] bg-[#2a1408] shadow-[0_8px_20px_rgba(0,0,0,0.55),inset_0_2px_8px_rgba(0,0,0,0.6)]"
          }`}
        >
          {/* ========================================================= */}
          {/* INTERIOR ROOM (Revealed when shutters swing open) */}
          {/* ========================================================= */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c0d06] via-[#3a1d0d] to-[#5a2e15] flex items-center justify-center overflow-hidden">
            {/* Warm Golden Candlelight Glow */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(251,191,36,0.95),rgba(245,158,11,0.6)_50%,rgba(69,26,3,0.9)_100%)] transition-opacity duration-500 ${
                isWindowOpen ? "opacity-100" : "opacity-75"
              }`}
            />

            {/* Cozy Window Glass Grid Panes */}
            <div className="absolute inset-0 flex flex-col justify-between p-1 opacity-45">
              <div className="w-full h-full border border-amber-300/40 rounded-t-full grid grid-cols-2 grid-rows-2">
                <div className="border-r border-b border-amber-300/40" />
                <div className="border-b border-amber-300/40" />
                <div className="border-r border-amber-300/40" />
                <div />
              </div>
            </div>

            {/* Inside Warm Silhouette / Cozy Lamp */}
            <div className="relative flex flex-col items-center justify-center mt-2">
              <div className="w-3 h-3 rounded-full bg-amber-200 blur-[2px] animate-pulse" />
              <div className="w-5 h-6 bg-gradient-to-t from-amber-600 to-amber-300 rounded-t-md opacity-90 shadow-md" />
            </div>

            {/* Cinematic Light Beam Burst on Opening */}
            <AnimatePresence>
              {isWindowOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.8, 2.2] }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(254,240,138,0.95)_0%,rgba(245,158,11,0.7)_40%,transparent_75%)]"
                />
              )}
            </AnimatePresence>
          </div>

          {/* ========================================================= */}
          {/* DUAL 3D WOODEN SHUTTERS (Swing Open Cinematically) */}
          {/* ========================================================= */}
          <div className="absolute inset-0 flex items-stretch">
            {/* LEFT WOODEN SHUTTER */}
            <motion.div
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: isWindowOpen ? -122 : 0,
                x: isWindowOpen ? -2 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 24,
                mass: 0.8,
              }}
              className="relative w-1/2 h-full bg-[#784421] border-r border-[#3a1d0d] shadow-[2px_0_6px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between p-1 select-none"
            >
              {/* Wooden planks texture & grain lines */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#633618] via-[#854c27] to-[#6d3c1c] opacity-95" />
              <div className="absolute inset-y-0 right-1 w-px bg-[#4a240e] opacity-70" />
              <div className="absolute inset-y-0 left-2 w-px bg-[#9b5a2f] opacity-40" />

              {/* Shutter Top Cutout (Cute Heart / Arch) */}
              <div className="relative mx-auto mt-2 w-2.5 h-2.5 rounded-full bg-[#301608] flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
              </div>

              {/* Horizontal cross beam */}
              <div className="relative w-full h-1.5 bg-[#522810] rounded-sm shadow-sm my-auto border-t border-[#92542a]/40" />

              {/* Bottom decorative plank */}
              <div className="relative w-full h-1 bg-[#421f0c] rounded-sm mb-1" />
            </motion.div>

            {/* RIGHT WOODEN SHUTTER */}
            <motion.div
              style={{
                transformOrigin: "right center",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: isWindowOpen ? 122 : 0,
                x: isWindowOpen ? 2 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 24,
                mass: 0.8,
              }}
              className="relative w-1/2 h-full bg-[#784421] border-l border-[#3a1d0d] shadow-[-2px_0_6px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between p-1 select-none"
            >
              {/* Wooden planks texture & grain lines */}
              <div className="absolute inset-0 bg-gradient-to-l from-[#633618] via-[#854c27] to-[#6d3c1c] opacity-95" />
              <div className="absolute inset-y-0 left-1 w-px bg-[#4a240e] opacity-70" />
              <div className="absolute inset-y-0 right-2 w-px bg-[#9b5a2f] opacity-40" />

              {/* Shutter Top Cutout (Cute Heart / Arch) */}
              <div className="relative mx-auto mt-2 w-2.5 h-2.5 rounded-full bg-[#301608] flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
              </div>

              {/* Horizontal cross beam */}
              <div className="relative w-full h-1.5 bg-[#522810] rounded-sm shadow-sm my-auto border-t border-[#92542a]/40" />

              {/* Bottom decorative plank */}
              <div className="relative w-full h-1 bg-[#421f0c] rounded-sm mb-1" />
            </motion.div>
          </div>

          {/* Golden Center Light Leak (when shutters closed) */}
          {!isWindowOpen && (
            <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-1 bg-amber-300 blur-[1.5px] opacity-80 pointer-events-none animate-pulse" />
          )}

          {/* Wooden Window Sill with mini floral accents */}
          <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-t from-[#411f0a] to-[#6d3a1a] border-t border-[#8e4f25] shadow-md flex items-center justify-around px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-sm" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-sm" />
            <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-sm" />
          </div>
        </div>

        {/* Magical Sparkles Burst Animation */}
        <AnimatePresence>
          {isWindowOpen && (
            <>
              <motion.div
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, x: -28, y: -25 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute z-50 pointer-events-none"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
              </motion.div>
              <motion.div
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.6, x: 30, y: -20 }}
                transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
                className="absolute z-50 pointer-events-none"
              >
                <Sparkles className="w-6 h-6 text-yellow-200" />
              </motion.div>
              <motion.div
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.3, x: 0, y: -38 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                className="absolute z-50 pointer-events-none"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
