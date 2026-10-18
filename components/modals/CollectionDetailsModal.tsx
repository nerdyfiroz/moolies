"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coins, Layers, Award, ArrowRight } from "lucide-react";
import { CornerButterflies } from "@/components/world/CornerButterflies";

interface CollectionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitelist?: () => void;
}

export const CollectionDetailsModal: React.FC<CollectionDetailsModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitelist,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
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

          {/* Modal Card with Spring Animation */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 25 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-slate-950/70 backdrop-blur-none text-white border-2 border-purple-400/50 shadow-[0_25px_60px_-15px_rgba(147,51,234,0.45),0_0_40px_rgba(168,85,247,0.25)] overflow-visible z-10 flex flex-col max-h-[90vh]"
          >
            {/* 2 Flying Butterflies fixed to top-left and top-right corners */}
            <CornerButterflies />

            {/* Inner Content Wrapper */}
            <div className="overflow-hidden rounded-3xl flex flex-col flex-1 max-h-full">
            {/* Header Banner */}
            <div className="relative p-6 sm:p-7 bg-gradient-to-r from-purple-950/80 via-slate-950/70 to-purple-950/80 border-b border-purple-500/30 text-white flex items-start justify-between shrink-0">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full moolies-bubble-badge text-[11px] font-black uppercase tracking-wider">
                  <Coins className="w-3.5 h-3.5 text-purple-300" />
                  <span>Supply &amp; Economics</span>
                </div>
                <h3 className="font-moolies moolies-title-gradient text-2xl sm:text-3xl font-black tracking-wide">
                  2,000 Genesis Moolies
                </h3>
                <p className="text-xs sm:text-sm font-medium text-purple-200/80 max-w-md">
                  Strictly capped generative collection hand-illustrated by Pip. Low gas ERC-721A smart contract on Ethereum.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-purple-500/40 hover:border-purple-400"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-purple-100">
              {/* 4 Animated Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total Supply", value: "2,000", sub: "Strictly Capped", color: "from-fuchsia-300 to-purple-300" },
                  { label: "Whitelist", value: "TBA", sub: "Date: TBA", color: "from-purple-300 to-indigo-300" },
                  { label: "Public Price", value: "TBA", sub: "Date: TBA", color: "from-sky-300 to-cyan-300" },
                  { label: "Standard", value: "ERC-721A", sub: "Low Gas Batch", color: "from-purple-300 to-pink-300" },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8, y: 22 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.08 * idx, type: "spring", stiffness: 360, damping: 24 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center shadow-lg hover:border-purple-400/60 transition-all"
                  >
                    <p className="font-moolies text-[10px] uppercase font-bold text-purple-300/80 tracking-wider">
                      {stat.label}
                    </p>
                    <p className={`font-moolies text-xl sm:text-2xl font-black mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent drop-shadow-sm`}>
                      {stat.value}
                    </p>
                    <p className="text-[9px] text-purple-200/60 font-medium">{stat.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* Trait & Art Structure */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="p-4 rounded-2xl bg-purple-950/35 border border-purple-500/30 space-y-3"
              >
                <div className="flex items-center gap-2 text-purple-300 font-moolies font-bold text-sm">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Artistic Traits &amp; Rarity Engine</span>
                </div>
                <p className="text-xs text-purple-200/80 leading-relaxed">
                  Hand-drawn vector artwork with 6-10 distinct trait layers: Background Realm, Feather Texture, Beanie &amp; Hats, Expressions, Eyewear, Outfits, and Meadow Held Items (including Boba Tea and Meadow Soccer Ball).
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                  <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30">
                    <span className="font-moolies text-purple-300/70 text-[10px] block">Trait Layers</span>
                    <strong className="font-moolies text-white text-sm">6-10 Layers</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30">
                    <span className="font-moolies text-purple-300/70 text-[10px] block">Traits per Owl</span>
                    <strong className="font-moolies text-fuchsia-300 text-sm">6-10 Traits</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30">
                    <span className="font-moolies text-purple-300/70 text-[10px] block">1-of-1 Legendaries</span>
                    <strong className="font-moolies text-emerald-300 text-sm">10 Owls</strong>
                  </div>
                </div>
              </motion.div>

              {/* Utility & Holder Rights */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="p-4 rounded-2xl bg-purple-950/35 border border-purple-500/30 space-y-2.5"
              >
                <div className="flex items-center gap-2 text-fuchsia-300 font-moolies font-bold text-sm">
                  <Award className="w-4 h-4 text-fuchsia-400" />
                  <span>Genesis Owl Holder Benefits</span>
                </div>
                <ul className="text-xs space-y-1.5 text-purple-200/80">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">&bull;</span>
                    <span><strong className="text-white">100% Commercial IP Rights</strong> — Own full commercial rights to monetize and merchandise your Mooli.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">&bull;</span>
                    <span><strong className="text-white">Non-Custodial Nesting</strong> — Earn reward tokens directly in your cold wallet without staking risk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">&bull;</span>
                    <span><strong className="text-white">Moolies DAO Governance</strong> — Propose and vote on community treasury funds and artist grants.</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-slate-950/70 border-t border-purple-500/30 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-purple-300/70 hidden sm:inline font-medium">
                Need early mint access? Apply to the whitelist!
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onOpenWhitelist && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenWhitelist();
                    }}
                    className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 text-white font-moolies font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-[0_4px_15px_rgba(168,85,247,0.4)]"
                  >
                    <span>Apply for Whitelist</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 text-xs font-semibold cursor-pointer border border-purple-500/40"
                >
                  Close
                </button>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
