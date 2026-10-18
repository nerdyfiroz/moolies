"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorldNavbar } from "@/components/world/WorldNavbar";

interface ScoutedNavbarArrivalProps {
  navbarState: "hidden" | "arriving" | "visible";
  onArrivalComplete: () => void;
  onOpenOpenSea: () => void;
  onOpenWhitelist: () => void;
  onOpenCollectionDetails: () => void;
  onOpenRoadmap: () => void;
  activeSection: "opensea" | "whitelist" | "collection" | "roadmap" | null;
}

/**
 * ScoutedNavbarArrival
 * 1. Hidden by default on page entry.
 * 2. When triggered by user click, 3 scouting butterflies flutter down from the sky,
 *    guiding the floating navbar down into place over 6.5 seconds.
 * 3. Once safely arrived, the scout butterflies flutter away and vanish!
 */
export const ScoutedNavbarArrival: React.FC<ScoutedNavbarArrivalProps> = ({
  navbarState,
  onArrivalComplete,
  onOpenOpenSea,
  onOpenWhitelist,
  onOpenCollectionDetails,
  onOpenRoadmap,
  activeSection,
}) => {
  const [showButterflies, setShowButterflies] = useState(false);

  useEffect(() => {
    if (navbarState === "arriving") {
      setShowButterflies(true);

      // Animation duration: 6.5 seconds (within user's 5-10 sec request)
      const timer = setTimeout(() => {
        setShowButterflies(false);
        onArrivalComplete();
      }, 6500);

      return () => clearTimeout(timer);
    } else if (navbarState === "visible") {
      setShowButterflies(false);
    }
  }, [navbarState, onArrivalComplete]);

  if (navbarState === "hidden") {
    return null;
  }

  const isArriving = navbarState === "arriving";

  return (
    <div className="fixed top-0 inset-x-0 z-40 pointer-events-none select-none">
      {/* ======================================================== */}
      {/* SCOUTING BUTTERFLIES (Guiding the Navbar In) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showButterflies && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* 1. Left Butterfly Scout (Monarch Orange) */}
            <motion.div
              initial={{ y: -80, x: "32%", opacity: 0 }}
              animate={{
                y: [ -80, 25, 18, 22, -90 ],
                x: [ "32%", "30%", "31%", "30%", "28%" ],
                opacity: [ 0, 1, 1, 1, 0 ],
                rotate: [ -10, 15, -8, 12, -25 ],
              }}
              transition={{
                duration: 6.5,
                times: [ 0, 0.35, 0.65, 0.85, 1 ],
                ease: "easeInOut",
              }}
              className="absolute z-50 w-9 h-8"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ rotateY: [0, 72, 0] }}
                  transition={{ duration: 0.16, repeat: Infinity }}
                  style={{ transformOrigin: "right center" }}
                  className="w-4 h-6"
                >
                  <svg viewBox="0 0 20 28" fill="none" className="w-full h-full drop-shadow-md">
                    <path d="M20,14 C16,2 8,0 2,3 C-2,7 2,20 14,24 Z" fill="#F97316" stroke="#431407" strokeWidth="1.5" />
                    <path d="M18,13 C14,5 9,3 4,6 Z" fill="#FBBF24" />
                  </svg>
                </motion.div>
                <div className="w-1 h-4 bg-stone-900 rounded-full z-10" />
                <motion.div
                  animate={{ rotateY: [0, -72, 0] }}
                  transition={{ duration: 0.16, repeat: Infinity }}
                  style={{ transformOrigin: "left center" }}
                  className="w-4 h-6"
                >
                  <svg viewBox="0 0 20 28" fill="none" className="w-full h-full drop-shadow-md scale-x-[-1]">
                    <path d="M20,14 C16,2 8,0 2,3 C-2,7 2,20 14,24 Z" fill="#F97316" stroke="#431407" strokeWidth="1.5" />
                    <path d="M18,13 C14,5 9,3 4,6 Z" fill="#FBBF24" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* 2. Center/Right Butterfly Scout (Azure Blue) */}
            <motion.div
              initial={{ y: -90, x: "65%", opacity: 0 }}
              animate={{
                y: [ -90, 20, 16, 20, -95 ],
                x: [ "65%", "68%", "67%", "68%", "72%" ],
                opacity: [ 0, 1, 1, 1, 0 ],
                rotate: [ 12, -15, 10, -8, 20 ],
              }}
              transition={{
                duration: 6.5,
                times: [ 0, 0.38, 0.68, 0.85, 1 ],
                ease: "easeInOut",
              }}
              className="absolute z-50 w-9 h-8"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ rotateY: [0, 75, 0] }}
                  transition={{ duration: 0.15, repeat: Infinity }}
                  style={{ transformOrigin: "right center" }}
                  className="w-4 h-6"
                >
                  <svg viewBox="0 0 20 28" fill="none" className="w-full h-full drop-shadow-md">
                    <path d="M20,14 C16,2 8,0 2,3 C-2,7 2,20 14,24 Z" fill="#0284C7" stroke="#082F49" strokeWidth="1.5" />
                    <path d="M18,13 C14,5 9,3 4,6 Z" fill="#38BDF8" />
                  </svg>
                </motion.div>
                <div className="w-1 h-4 bg-stone-900 rounded-full z-10" />
                <motion.div
                  animate={{ rotateY: [0, -75, 0] }}
                  transition={{ duration: 0.15, repeat: Infinity }}
                  style={{ transformOrigin: "left center" }}
                  className="w-4 h-6"
                >
                  <svg viewBox="0 0 20 28" fill="none" className="w-full h-full drop-shadow-md scale-x-[-1]">
                    <path d="M20,14 C16,2 8,0 2,3 C-2,7 2,20 14,24 Z" fill="#0284C7" stroke="#082F49" strokeWidth="1.5" />
                    <path d="M18,13 C14,5 9,3 4,6 Z" fill="#38BDF8" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* 3. Top Center Butterfly (Golden Swallowtail) */}
            <motion.div
              initial={{ y: -70, x: "50%", opacity: 0 }}
              animate={{
                y: [ -70, 8, 4, 6, -85 ],
                x: [ "50%", "49%", "51%", "49%", "52%" ],
                opacity: [ 0, 1, 1, 1, 0 ],
                rotate: [ 5, -8, 6, -5, 14 ],
              }}
              transition={{
                duration: 6.5,
                times: [ 0, 0.4, 0.7, 0.85, 1 ],
                ease: "easeInOut",
              }}
              className="absolute z-50 w-8 h-7 -translate-x-1/2"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ rotateY: [0, 70, 0] }}
                  transition={{ duration: 0.17, repeat: Infinity }}
                  style={{ transformOrigin: "right center" }}
                  className="w-3.5 h-5"
                >
                  <svg viewBox="0 0 20 26" fill="none" className="w-full h-full drop-shadow-md">
                    <path d="M20,13 C16,2 7,0 2,3 C-2,7 2,18 14,22 Z" fill="#FACC15" stroke="#1C1917" strokeWidth="1.5" />
                    <path d="M18,12 C14,5 8,3 4,6 Z" fill="#FEF08A" />
                  </svg>
                </motion.div>
                <div className="w-1 h-3.5 bg-stone-900 rounded-full z-10" />
                <motion.div
                  animate={{ rotateY: [0, -70, 0] }}
                  transition={{ duration: 0.17, repeat: Infinity }}
                  style={{ transformOrigin: "left center" }}
                  className="w-3.5 h-5"
                >
                  <svg viewBox="0 0 20 26" fill="none" className="w-full h-full drop-shadow-md scale-x-[-1]">
                    <path d="M20,13 C16,2 7,0 2,3 C-2,7 2,18 14,22 Z" fill="#FACC15" stroke="#1C1917" strokeWidth="1.5" />
                    <path d="M18,12 C14,5 8,3 4,6 Z" fill="#FEF08A" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* THE FLOATING NAVBAR (Glides in smoothly guided by butterflies) */}
      {/* ======================================================== */}
      <motion.div
        initial={isArriving ? { y: -100, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: isArriving ? 3.5 : 0.4,
          ease: [0.16, 1, 0.3, 1],
          delay: isArriving ? 0.4 : 0,
        }}
        className="pointer-events-auto"
      >
        <WorldNavbar
          onOpenOpenSea={onOpenOpenSea}
          onOpenWhitelist={onOpenWhitelist}
          onOpenCollectionDetails={onOpenCollectionDetails}
          onOpenRoadmap={onOpenRoadmap}
          activeSection={activeSection}
        />
      </motion.div>
    </div>
  );
};
