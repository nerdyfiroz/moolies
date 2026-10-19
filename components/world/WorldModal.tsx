"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { soundEngine } from "@/lib/audio";
import { CornerButterflies } from "@/components/world/CornerButterflies";

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
          {/* Backdrop: Visible, clear background without any blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-none"
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
            className={`relative w-full ${maxWidth} bg-slate-950/75 backdrop-blur-none border-2 border-purple-400/50 rounded-3xl shadow-[0_25px_60px_-15px_rgba(147,51,234,0.45),0_0_40px_rgba(168,85,247,0.25)] overflow-visible my-auto z-10 flex flex-col max-h-[90vh] text-purple-100 font-cartoon`}
          >
            {/* 2 Flying Butterflies fixed to the top-left and top-right corners */}
            <CornerButterflies />

            {/* Inner Content Wrapper */}
            <div className="overflow-hidden rounded-3xl flex flex-col flex-1 max-h-full">
            {/* Modal Header */}
            <div className="relative px-6 py-5 bg-gradient-to-r from-purple-950/85 via-slate-950/75 to-purple-950/85 border-b border-purple-500/35 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3.5 pr-8">
                {icon && (
                  <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 shadow-sm border border-purple-400/40">
                    {icon}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2
                      id="modal-title"
                      className="font-drip moolies-dripping-title text-2xl sm:text-3xl md:text-4xl tracking-wide"
                    >
                      {title}
                    </h2>
                    {badge && (
                      <span className="font-bubble moolies-bubble-badge text-xs px-3 py-1 rounded-full">
                        {badge}
                      </span>
                    )}
                  </div>
                  {subtitle && (
                    <p className="font-cartoon text-xs sm:text-sm font-semibold text-purple-200/90 mt-1 tracking-wide">
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
                className="w-10 h-10 rounded-full bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 hover:text-white transition-all flex items-center justify-center shrink-0 border border-purple-500/40 hover:border-purple-400 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer font-cartoon"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 overflow-y-auto text-purple-100 space-y-4 font-cartoon">
              {children}
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
