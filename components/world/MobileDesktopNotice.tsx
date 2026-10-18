"use client";

import React, { useState, useEffect } from "react";
import { Monitor, X, CheckCircle2 } from "lucide-react";

interface MobileDesktopNoticeProps {
  onOpenLandmarks?: () => void;
}

export const MobileDesktopNotice: React.FC<MobileDesktopNoticeProps> = ({
  onOpenLandmarks,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isNarrowScreen = window.innerWidth < 820;

      // In desktop mode on mobile browsers, the screen width is simulated to be 980px+ or user agent changes
      return isMobileUA || isNarrowScreen;
    };

    const mobileDetected = checkIsMobile();
    setIsMobile(mobileDetected);

    // Check if dismissed before in this session
    const dismissed = sessionStorage.getItem("moolies_mobile_desktop_dismissed");
    if (mobileDetected && !dismissed) {
      setIsModalOpen(true);
    }

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDismissModal = () => {
    setIsModalOpen(false);
    try {
      sessionStorage.setItem("moolies_mobile_desktop_dismissed", "true");
    } catch {
      // Ignored
    }
  };

  const handleReopenModal = () => {
    setIsModalOpen(true);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Top Mobile Sticky Note Banner */}
      <div className="fixed top-14 sm:top-16 inset-x-3 sm:inset-x-6 z-30 pointer-events-auto">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/95 text-slate-950 shadow-lg backdrop-blur-md border border-amber-300 text-xs font-semibold">
          <div className="flex items-center gap-2 overflow-hidden">
            <Monitor className="w-4 h-4 shrink-0 text-slate-950" />
            <span className="truncate">
              Please use <strong>Desktop Mode</strong> to view the website
            </span>
          </div>
          <button
            type="button"
            onClick={handleReopenModal}
            className="shrink-0 px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 hover:bg-slate-900 text-[11px] font-bold cursor-pointer transition-colors"
          >
            How to enable
          </button>
        </div>
      </div>

      {/* Prominent Desktop Mode Guidance Modal for Mobile Users */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={handleDismissModal}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border-2 border-amber-400 rounded-3xl shadow-2xl p-6 z-10 my-auto text-slate-900 dark:text-slate-100 flex flex-col space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Monitor className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                    Please Use Desktop Mode
                  </h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                    Recommended for the Interactive Illustrated Realm
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDismissModal}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Dismiss notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explanation */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Moolies is a large interactive illustrated world with clickable landmarks, character animations, and rich trait explorers. For the complete visual details and responsive buttons, <strong>please switch your mobile browser to Desktop Mode</strong>.
            </p>

            {/* Steps Guide Box */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 space-y-2.5 text-xs text-slate-800 dark:text-slate-200">
              <p className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                How to enable Desktop Mode on your phone:
              </p>
              <div className="space-y-1.5 pl-2 text-[11px] sm:text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">Chrome:</span>
                  <span>Tap <strong>⋮</strong> (three dots menu) at the top-right &rarr; check <strong>&quot;Desktop site&quot;</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">Safari:</span>
                  <span>Tap <strong>aA</strong> in the bottom/top address bar &rarr; tap <strong>&quot;Request Desktop Website&quot;</strong>.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleDismissModal}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs text-center cursor-pointer shadow-md transition-colors"
              >
                Continue Anyway
              </button>
              {onOpenLandmarks && (
                <button
                  type="button"
                  onClick={() => {
                    handleDismissModal();
                    onOpenLandmarks();
                  }}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center cursor-pointer border border-slate-700 transition-colors"
                >
                  All Landmarks List
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
