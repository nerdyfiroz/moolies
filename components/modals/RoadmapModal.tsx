"use client";

import React from "react";
import { motion } from "framer-motion";
import { WorldModal } from "@/components/world/WorldModal";
import { CheckCircle2, Clock, Trophy, ShieldCheck, Flag } from "lucide-react";
import { ROADMAP_DATA } from "@/lib/data/roadmap";
import { soundEngine } from "@/lib/audio";

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitelist?: () => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitelist,
}) => {
  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="Project Goals & Roadmap"
      subtitle="Scored via the Meadow Goalpost — 4 Core Milestones"
      icon={<Trophy className="w-6 h-6 text-purple-300" />}
      badge="Official Goals"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Goalpost Header Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-950/80 via-indigo-950/70 to-purple-950/80 border border-purple-500/40 text-white shadow-lg space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full moolies-bubble-badge text-xs font-black uppercase tracking-wider">
              <Flag className="w-3.5 h-3.5 text-purple-300" />
              The Meadow Goalpost
            </span>
            <span className="text-xs font-semibold text-purple-200/80 font-moolies">
              Target: 100% On-Chain Execution
            </span>
          </div>

          <h3 className="font-moolies moolies-title-gradient text-xl sm:text-2xl font-black">
            Scoring the Future of the Moolies Realm
          </h3>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl leading-relaxed font-medium">
            Every kick hits the target. From hand-crafted vector art generation to soft-staking Nesting protocols, physical plushie distribution, and community DAO governance.
          </p>
        </div>

        {/* 4 Goals Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROADMAP_DATA.map((goal, idx) => {
            const isCompleted = goal.status === "completed";
            const isInProgress = goal.status === "in-progress";

            return (
              <motion.div
                key={goal.phase}
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.08 * idx, type: "spring", stiffness: 350, damping: 25 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between backdrop-blur-none ${
                  isInProgress
                    ? "border-purple-400 bg-purple-950/45 shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                    : isCompleted
                    ? "border-emerald-400/80 bg-emerald-950/30"
                    : "border-purple-500/25 bg-purple-950/30"
                }`}
              >
                <div className="space-y-3">
                  {/* Goal Header */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-moolies text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isInProgress
                          ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                          : "bg-purple-950/60 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      Goal {idx + 1} &middot; {goal.timeline}
                    </span>

                    <span className="text-xs font-bold flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-moolies">
                          <CheckCircle2 className="w-4 h-4" /> Goal Scored!
                        </span>
                      ) : isInProgress ? (
                        <span className="text-purple-300 flex items-center gap-1 font-moolies">
                          <Clock className="w-4 h-4 animate-spin text-fuchsia-400" style={{ animationDuration: "8s" }} /> In Progress
                        </span>
                      ) : (
                        <span className="text-purple-300/60 font-moolies">Upcoming Target</span>
                      )}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-moolies text-base sm:text-lg font-bold text-white">
                      {goal.title}
                    </h4>
                    <p className="text-xs text-purple-200/80 mt-1 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>

                  {/* Checklist */}
                  <ul className="space-y-1.5 pt-2 border-t border-purple-500/25 text-xs text-purple-100/90">
                    {goal.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            isCompleted
                              ? "bg-emerald-400"
                              : isInProgress
                              ? "bg-fuchsia-400"
                              : "bg-purple-400/60"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Whitelist Prompt */}
        {onOpenWhitelist && (
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-purple-200">
              <ShieldCheck className="w-5 h-5 text-purple-300 shrink-0" />
              <span>Be part of Goal 2: Apply for early guaranteed Whitelist minting privileges.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine?.playWoodKnock();
                onClose();
                onOpenWhitelist();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 text-white font-moolies font-black text-xs transition-all shadow-[0_4px_15px_rgba(168,85,247,0.4)] cursor-pointer whitespace-nowrap"
            >
              Apply Whitelist Form &rarr;
            </button>
          </div>
        )}
      </div>
    </WorldModal>
  );
};
