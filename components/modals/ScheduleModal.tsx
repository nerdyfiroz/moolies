"use client";

import React, { useState, useEffect } from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { CalendarClock, CheckCircle2, Clock } from "lucide-react";
import { INITIAL_EVENTS } from "@/lib/data/announcements";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitelist?: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitelist,
}) => {
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getEventCountdown = (targetIso: string) => {
    const diff = new Date(targetIso).getTime() - now;
    if (diff <= 0) {
      return { isPast: true, text: "Completed" };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    return {
      isPast: false,
      text: `${days}d ${hours}h ${mins}m ${secs}s`,
    };
  };

  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="The Field Schedule"
      subtitle="Timetable & Live Event Countdowns"
      icon={<CalendarClock className="w-6 h-6 text-pink-600 dark:text-pink-400" />}
      badge="Project Schedule"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          All milestones are synchronized to UTC time. Keep track of upcoming deadlines, minting phases, and community reveal ceremonies below:
        </p>

        {/* Timeline List */}
        <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700 before:z-0">
          {INITIAL_EVENTS.map((event) => {
            const { isPast, text } = getEventCountdown(event.date);
            return (
              <div
                key={event.id}
                className="relative z-10 flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-pink-300 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    isPast
                      ? "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-950 dark:text-pink-300"
                  }`}
                >
                  {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {event.title}
                    </h4>
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto ${
                        isPast
                          ? "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                          : "bg-pink-50 text-pink-700 border border-pink-200 dark:bg-pink-950 dark:text-pink-300"
                      }`}
                    >
                      {text}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {event.description}
                  </p>

                  <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
                    <span>
                      {new Date(event.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      @{" "}
                      {new Date(event.date).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      })}
                    </span>
                    <span className="uppercase text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {onOpenWhitelist && (
          <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-pink-900 dark:text-pink-200 font-medium text-center sm:text-left">
              Ensure you apply before the Whitelist cutoff deadline!
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWhitelist();
              }}
              className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer shrink-0"
            >
              Apply at the Gate &rarr;
            </button>
          </div>
        )}
      </div>
    </WorldModal>
  );
};
