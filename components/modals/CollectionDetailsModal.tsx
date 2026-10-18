"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coins, Layers, Award, ArrowRight } from "lucide-react";

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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card with Spring Animation */}
          <motion.div
            initial={{ scale: 0.82, opacity: 0, y: 35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 25 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-slate-950 text-white border-2 border-amber-400 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            style={{
              boxShadow: "0 25px 60px -15px rgba(245, 158, 11, 0.35), 0 0 35px rgba(245, 158, 11, 0.15)",
            }}
          >
            {/* Header Banner */}
            <div className="relative p-6 sm:p-7 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 text-slate-950 flex items-start justify-between shrink-0">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/15 text-[11px] font-black uppercase tracking-wider text-slate-950">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Supply &amp; Economics</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  2,000 Genesis Moolies
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-900/90 max-w-md">
                  Strictly capped generative collection hand-illustrated by Pip. Low gas ERC-721A smart contract on Ethereum.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-950/15 hover:bg-slate-950/30 text-slate-950 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-200">
              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Supply</p>
                  <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">2,000</p>
                  <p className="text-[9px] text-slate-500">Strictly Capped</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Whitelist</p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">0.025 ETH</p>
                  <p className="text-[9px] text-amber-300 font-semibold">Date: TBA</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Public Price</p>
                  <p className="text-xl sm:text-2xl font-black text-sky-400 mt-1">0.040 ETH</p>
                  <p className="text-[9px] text-amber-300 font-semibold">Date: TBA</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Standard</p>
                  <p className="text-xl sm:text-2xl font-black text-purple-400 mt-1">ERC-721A</p>
                  <p className="text-[9px] text-slate-500">Low Gas Batch</p>
                </div>
              </div>

              {/* Trait & Art Structure */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>Artistic Traits &amp; Rarity Engine</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Over 180 hand-drawn vector traits across 7 distinct layer categories: Background Realm, Feather Texture, Beanie &amp; Hats, Expressions, Eyewear, Outfits, and Meadow Held Items (including the Boba Tea and Meadow Soccer Ball).
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Trait Layers</span>
                    <strong className="text-white text-sm">7 Layers</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Hand-Drawn Assets</span>
                    <strong className="text-amber-300 text-sm">180+ Traits</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">1-of-1 Legendaries</span>
                    <strong className="text-emerald-400 text-sm">10 Owls</strong>
                  </div>
                </div>
              </div>

              {/* Utility & Holder Rights */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Award className="w-4 h-4" />
                  <span>Genesis Owl Holder Benefits</span>
                </div>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">&bull;</span>
                    <span><strong>100% Commercial IP Rights</strong> — Own full commercial rights to monetize and merchandise your Mooli.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">&bull;</span>
                    <span><strong>Non-Custodial Nesting</strong> — Earn reward tokens directly in your cold wallet without staking risk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">&bull;</span>
                    <span><strong>Moolies DAO Governance</strong> — Propose and vote on community treasury funds and artist grants.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-400 hidden sm:inline">
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
                    className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-md"
                  >
                    <span>Apply for Whitelist</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer border border-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
