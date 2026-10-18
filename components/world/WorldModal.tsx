"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { soundEngine } from "@/lib/audio";

interface WorldModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  maxWidth?: string; // e.g. "max-w-2xl", "max-w-4xl"
}

export const WorldModal: React.FC<WorldModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  badge,
  children,
  maxWidth = "max-w-3xl",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    soundEngine?.playPop();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={`relative w-full ${maxWidth} bg-white dark:bg-slate-900 border-4 border-amber-200/80 dark:border-amber-400/30 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col max-h-[90vh]`}
          >
            {/* Modal Header */}
            <div className="relative px-6 py-5 bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800 border-b border-amber-100 dark:border-slate-700/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3.5 pr-8">
                {icon && (
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm border border-amber-200 dark:border-amber-500/30">
                    {icon}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2
                      id="modal-title"
                      className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
                    >
                      {title}
                    </h2>
                    {badge && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300/60">
                        {badge}
                      </span>
                    )}
                  </div>
                  {subtitle && (
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-amber-700 dark:text-slate-300 transition-colors flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 overflow-y-auto text-slate-800 dark:text-slate-200 space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
