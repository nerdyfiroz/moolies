"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import { CornerButterflies } from "@/components/world/CornerButterflies";

interface OpenSeaComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitelist?: () => void;
}

export const OpenSeaComingSoonModal: React.FC<OpenSeaComingSoonModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitelist,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Backdrop: Visible background without blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-none"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-slate-950 text-white border-2 border-sky-400/80 shadow-2xl overflow-visible z-10 p-6 sm:p-8 space-y-6 text-center"
            style={{
              boxShadow: "0 25px 60px -15px rgba(14, 165, 233, 0.4), 0 0 40px rgba(14, 165, 233, 0.2)",
            }}
          >
            {/* 2 Flying Butterflies fixed to the top-left and top-right corners */}
            <CornerButterflies />
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-slate-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Animated OpenSea Boat Logo & Ripple */}
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-sky-500 blur-xl"
              />
              <motion.div
                animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg border-2 border-sky-200"
              >
                {/* Stylized OpenSea Ship Logo */}
                <svg
                  className="w-12 h-12 text-white fill-current"
                  viewBox="0 0 40 40"
                  aria-hidden="true"
                >
                  <path d="M20 2C10.059 2 2 10.059 2 20s8.059 18 18 18 18-8.059 18-18S29.941 2 20 2zm-.286 6.551c.361 0 .684.223.81.56l2.128 5.676-5.877 3.393 2.939-9.629zm-4.397 12.355l4.896-2.827 3.921 2.264-8.817.563zm13.332-1.258l-2.732-1.577 2.112-5.633.62 7.21zm-13.627 3.23l8.887-.568 2.059 2.059-10.946-1.491zm12.923.363l-1.393-1.393 2.138-.137-.745 1.53zm-9.352 2.871l7.85 1.07-5.064 3.798-2.786-4.868zm1.066 6.368l3.708-2.781-3.708 2.781z" />
                </svg>
              </motion.div>
            </div>

            {/* Coming Soon Animated Text */}
            <div className="space-y-2">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: [0.98, 1.04, 0.98] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/60 text-sky-300 text-xs font-black uppercase tracking-widest"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-spin" style={{ animationDuration: "6s" }} />
                <span>OpenSea Marketplace</span>
              </motion.div>

              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Coming Soon...
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                The official Moolies Genesis secondary collection on <strong>OpenSea</strong> will unlock immediately following our Whitelist &amp; Public Mint reveal!
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Mint Date</span>
                <p className="font-bold text-amber-400">TBA</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Mint Price</span>
                <p className="font-bold text-emerald-400">TBA</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Supply</span>
                <p className="font-bold text-sky-400">2,000</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              {onOpenWhitelist && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenWhitelist();
                  }}
                  className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-colors"
                >
                  <span>Apply for Whitelist Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <a
                href="https://x.com/moolieshq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
              >
                <span>Follow on X</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
