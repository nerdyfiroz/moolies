"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coins, Layers, Award, ArrowRight } from "lucide-react";
import { soundEngine } from "@/lib/audio";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundEngine?.playPop();
              onClose();
            }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card with Spring Animation */}
          <motion.div
            initial={{ scale: 0.82, opacity: 0, y: 35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 25 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
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
                onClick={() => {
                  soundEngine?.playPop();
                  onClose();
                }}
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
                  <p className="text-[9px] text-slate-500">Guaranteed Mint</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Public Price</p>
                  <p className="text-xl sm:text-2xl font-black text-sky-400 mt-1">0.040 ETH</p>
                  <p className="text-[9px] text-slate-500">Dutch / Fair</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Standard</p>
                  <p className="text-xl sm:text-2xl font-black text-purple-400 mt-1">ERC-721A</p>
                  <p className="text-[9px] text-slate-500">Low Gas Batch</p>
                </div>
              </div>

              {/* Trait Architecture */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <h4>Generative Trait Architecture</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every Moolie is procedurally generated from over 180 hand-drawn vector traits across 7 distinct visual layers:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="font-bold text-slate-200">28 Headwear</span>
                    <p className="text-[10px] text-slate-400">Beanies, Crowns, Berets</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="font-bold text-slate-200">34 Outfits</span>
                    <p className="text-[10px] text-slate-400">Hoodies, Tuxedos, Ponchos</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="font-bold text-slate-200">22 Eye Traits</span>
                    <p className="text-[10px] text-slate-400">Spectacles, Goggles, Wink</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="font-bold text-slate-200">18 Beak Styles</span>
                    <p className="text-[10px] text-slate-400">Golden, Polished, Whistle</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="font-bold text-slate-200">26 Held Items</span>
                    <p className="text-[10px] text-slate-400">Boba Tea, Kites, Grimoires</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <span className="font-bold text-slate-200">12 Environments</span>
                    <p className="text-[10px] text-slate-400">Meadow, Lake, Sunset</p>
                  </div>
                </div>
              </div>

              {/* Utility & Holder Rights */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Award className="w-4 h-4" />
                  <h4>Holder Utility &amp; Non-Custodial Nesting</h4>
                </div>
                <ul className="space-y-1.5 text-slate-300 pl-4 list-disc text-xs">
                  <li><strong>Non-Custodial Soft-Staking:</strong> Earn rewards without transferring your NFT to third-party contracts.</li>
                  <li><strong>Nest DAO Voting:</strong> Treasury governance on art grants and community expeditions.</li>
                  <li><strong>Full Commercial IP:</strong> 100% non-exclusive commercialization rights to your individual owl.</li>
                  <li><strong>Physical Collectors Drop:</strong> Genesis holders receive custom plushies and enamel pin sets.</li>
                </ul>
              </div>

              {/* Action Button */}
              {onOpenWhitelist && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine?.playWoodKnock();
                      onClose();
                      onOpenWhitelist();
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-colors"
                  >
                    <span>Apply for Guaranteed Whitelist Allocation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
