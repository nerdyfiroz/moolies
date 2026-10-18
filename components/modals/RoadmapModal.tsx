"use client";

import React from "react";
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
      icon={<Trophy className="w-6 h-6 text-amber-500" />}
      badge="Official Goals"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Goalpost Header Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white shadow-lg space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
              <Flag className="w-3.5 h-3.5 text-amber-300" />
              The Meadow Goalpost
            </span>
            <span className="text-xs font-semibold text-emerald-200">
              Target: 100% On-Chain Execution
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            Scoring the Future of the Moolies Realm
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            Every kick hits the target. From hand-crafted vector art generation to soft-staking Nesting protocols, physical plushie distribution, and community DAO governance.
          </p>
        </div>

        {/* 4 Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROADMAP_DATA.map((goal, idx) => {
            const isCompleted = goal.status === "completed";
            const isInProgress = goal.status === "in-progress";

            return (
              <div
                key={goal.phase}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                  isInProgress
                    ? "border-amber-400 bg-amber-500/5 dark:bg-amber-400/5 shadow-md"
                    : isCompleted
                    ? "border-emerald-400/80 bg-emerald-500/5 dark:bg-emerald-400/5"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40"
                }`}
              >
                <div className="space-y-3">
                  {/* Goal Header */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isInProgress
                          ? "bg-amber-400 text-slate-950"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Goal {idx + 1} &middot; {goal.timeline}
                    </span>

                    <span className="text-xs font-bold flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Goal Scored!
                        </span>
                      ) : isInProgress ? (
                        <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: "8s" }} /> In Progress
                        </span>
                      ) : (
                        <span className="text-slate-400">Upcoming Target</span>
                      )}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      {goal.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>

                  {/* Checklist */}
                  <ul className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    {goal.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            isCompleted
                              ? "bg-emerald-500"
                              : isInProgress
                              ? "bg-amber-400"
                              : "bg-slate-400"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Whitelist Prompt */}
        {onOpenWhitelist && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Be part of Goal 2: Apply for early guaranteed Whitelist minting privileges.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine?.playWoodKnock();
                onClose();
                onOpenWhitelist();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Apply Whitelist Form &rarr;
            </button>
          </div>
        )}
      </div>
    </WorldModal>
  );
};
