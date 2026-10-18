"use client";

import React from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { BookOpen, CheckCircle, Clock, Sparkles, ExternalLink, FileText } from "lucide-react";
import { ROADMAP_DATA } from "@/lib/data/roadmap";

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({ isOpen, onClose }) => {
  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="The Lore Grimoire & Roadmap"
      subtitle="4-Phase Ecosystem Blueprint & Whitepaper"
      icon={<BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
      badge="Roadmap"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Whitepaper Header Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-white/20">
              Whitepaper Version 1.2
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              The Architecture of the Moolies Valley
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Exploring soft-staking Nesting algorithms, DAO voting mechanics, and our collaborative lore expansion.
            </p>
          </div>
          <a
            href="https://github.com/moolies-nft"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Read Whitepaper</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Roadmap Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROADMAP_DATA.map((phase) => {
            const isDone = phase.status === "completed";
            const isCurrent = phase.status === "in-progress";

            return (
              <div
                key={phase.phase}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                  isCurrent
                    ? "border-blue-500 bg-blue-50/50 dark:bg-slate-800/80 shadow-md ring-2 ring-blue-400/20"
                    : isDone
                    ? "border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-slate-800/40"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {phase.phase} • {phase.timeline}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isDone
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300"
                          : isCurrent
                          ? "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300 animate-pulse"
                          : "bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {phase.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                    {phase.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                    {phase.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {phase.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        {isDone ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : isCurrent ? (
                          <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </WorldModal>
  );
};
