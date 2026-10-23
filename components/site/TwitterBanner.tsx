"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle, BellRing } from "lucide-react";

export const XIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const TwitterBanner: React.FC = () => {
  return (
    <motion.section
      id="twitter-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-purple-400/40 p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(46,16,101,0.25),0_0_30px_rgba(168,85,247,0.2)]">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Twitter Identity & Info */}
          <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
            {/* X Avatar / Logo Icon */}
            <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-700 flex items-center justify-center text-white shadow-lg border border-purple-300/40 group">
              <XIcon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-cooper text-xl sm:text-2xl text-white tracking-wide">
                  Moolies
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  Official Account
                </span>
              </div>
              <p className="font-mono text-purple-300 text-sm font-semibold">
                @moolieshq
              </p>
              <p className="text-xs sm:text-sm text-purple-200/80 max-w-md font-cartoon">
                Stay updated with official drop alerts, guaranteed whitelist announcements, and community sneak peeks.
              </p>
            </div>
          </div>

          {/* Direct Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              id="twitter-follow-button"
              href="https://x.com/moolieshq"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-purple-50 text-slate-950 font-bold font-cartoon text-sm shadow-[0_10px_25px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_30px_rgba(255,255,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
            >
              <XIcon className="w-4 h-4 text-black" />
              <span>Follow @moolieshq</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
            </a>

            <div className="flex items-center gap-1.5 text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-500/20">
              <BellRing className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
              <span>Turn On Notifications</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
