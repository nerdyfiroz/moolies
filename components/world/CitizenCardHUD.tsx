"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, KeyRound, ChevronUp, ChevronDown, ShieldCheck, Feather } from "lucide-react";
import { soundEngine } from "@/lib/audio";

interface CitizenCardHUDProps {
  onOpenWhitelist: () => void;
  onOpenCheckStatus?: () => void;
}

export const CitizenCardHUD: React.FC<CitizenCardHUDProps> = ({
  onOpenWhitelist,
  onOpenCheckStatus,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    soundEngine?.playPop();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 left-3 sm:left-6 z-30 pointer-events-auto select-none">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* Minimized Compact Badge Button (Inspired by Fomies #acard) */
          <motion.button
            key="minimized"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            type="button"
            onClick={toggleExpand}
            title="Inspect your Moolies Realm Citizen Pass"
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-950/90 text-white backdrop-blur-md border border-amber-300/60 shadow-xl hover:border-amber-300 transition-all cursor-pointer group"
          >
            <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black text-[10px] shadow-xs">
              M
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black tracking-wider text-amber-300 leading-tight">
                CITIZEN CARD
              </p>
              <p className="text-[9px] text-slate-400 font-mono leading-tight">
                PASS: #2026-OWL
              </p>
            </div>
            <ChevronUp className="w-3.5 h-3.5 text-amber-300 group-hover:translate-y--0.5 transition-transform" />
          </motion.button>
        ) : (
          /* Expanded Realistic Citizen ID Card / Pass */
          <motion.div
            key="expanded"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="relative w-72 sm:w-80 rounded-3xl bg-slate-950/95 text-white border-2 border-amber-300/80 shadow-2xl backdrop-blur-lg p-4 space-y-3"
            style={{
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8), 0 0 25px rgba(245,158,11,0.25)",
            }}
          >
            {/* Card Header & Holographic Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                  Department of Moolies
                </span>
              </div>
              <button
                type="button"
                onClick={toggleExpand}
                className="w-6 h-6 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Collapse card"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Passport Identity Section */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-sky-400 to-indigo-500 p-0.5 shadow-md shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex flex-col items-center justify-center text-amber-300">
                  <Feather className="w-6 h-6 text-amber-400" />
                  <span className="text-[8px] font-black tracking-tighter">OWL PASS</span>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-black text-white truncate">
                    Realm Visitor #2026
                  </p>
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                </div>
                <p className="text-[10px] font-mono text-amber-300 mt-0.5">
                  STATUS: GUEST APPLICANT
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5 truncate">
                  Sector: Sunny Valley Clearing
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-1 grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  soundEngine?.playWoodKnock();
                  onOpenWhitelist();
                }}
                className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <KeyRound className="w-3 h-3" />
                <span>Apply Whitelist</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine?.playPop();
                  if (onOpenCheckStatus) {
                    onOpenCheckStatus();
                  } else {
                    onOpenWhitelist();
                  }
                }}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Check Status</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
