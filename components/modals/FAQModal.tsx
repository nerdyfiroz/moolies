"use client";

import React, { useState } from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { FAQ_DATA } from "@/lib/data/faq";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="Picnic Questions & Perks"
      subtitle="Frequently Asked Questions & Community Guides"
      icon={<HelpCircle className="w-6 h-6 text-rose-500" />}
      badge="FAQ"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Holder perks quick highlight */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-slate-800 dark:to-slate-800/80 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold text-rose-800 dark:text-rose-300">Did you know?</span>
            <p className="mt-0.5">
              Every genesis Moolie holder automatically qualifies for soft-staking Nesting multipliers and receives a guaranteed free physical enamel pin shipped anywhere in the world!
            </p>
          </div>
        </div>

        {/* Accordion Items */}
        <div className="space-y-2.5">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                      {item.category}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/40">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </WorldModal>
  );
};
