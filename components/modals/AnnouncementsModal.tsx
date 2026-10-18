"use client";

import React from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { Bell, Tag, Calendar, ExternalLink } from "lucide-react";
import { INITIAL_ANNOUNCEMENTS } from "@/lib/data/announcements";

interface AnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitelist?: () => void;
}

export const AnnouncementsModal: React.FC<AnnouncementsModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitelist,
}) => {
  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="Whispering Butterflies"
      subtitle="Latest Announcements & Nest Bulletins"
      icon={<Bell className="w-6 h-6 text-sky-500" />}
      badge="Updates"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {INITIAL_ANNOUNCEMENTS.map((ann) => (
          <div
            key={ann.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-sky-300 transition-colors space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {ann.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {ann.date}
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {ann.title}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {ann.content}
            </p>

            {ann.linkText && (
              <div className="pt-1">
                {ann.linkUrl === "#whitelist" ? (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenWhitelist?.();
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <span>{ann.linkText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href={ann.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    <span>{ann.linkText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </WorldModal>
  );
};
