"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { WORLD_HOTSPOTS, Hotspot } from "@/lib/data/hotspots";
import { soundEngine } from "@/lib/audio";

interface WorldDirectoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHotspot: (hotspot: Hotspot) => void;
}

export const WorldDirectoryDrawer: React.FC<WorldDirectoryDrawerProps> = ({
  isOpen,
  onClose,
  onSelectHotspot,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 border-l border-amber-200 dark:border-slate-800 shadow-2xl z-10 flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-amber-50 to-sky-50 dark:from-slate-800 dark:to-slate-800 border-b border-amber-100 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  World Landmarks Directory
                </h3>
                <p className="text-xs text-slate-500">
                  Click any landmark to open its realm window
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer"
                aria-label="Close directory"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {WORLD_HOTSPOTS.map((hotspot) => {
                return (
                  <div
                    key={hotspot.id}
                    onClick={() => {
                      soundEngine?.playPop();
                      onSelectHotspot(hotspot);
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-50/30 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        style={{ backgroundColor: hotspot.accentColor }}
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {hotspot.title}
                          </h4>
                          {hotspot.badgeText && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                              {hotspot.badgeText}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {hotspot.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors pl-2">
                      &rarr;
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
