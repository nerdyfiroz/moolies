"use client";

import React from "react";
import { Sparkles, ExternalLink } from "lucide-react";

interface WorldNavbarProps {
  onOpenOpenSea: () => void;
  onOpenWhitelist: () => void;
  onOpenCollectionDetails: () => void;
  onOpenRoadmap: () => void;
  activeSection?: "opensea" | "whitelist" | "collection" | "roadmap" | null;
}

// Official X (Twitter) Logo SVG Component
export const XLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Reusable SVG Drip Droplet for Active Buttons
const ActiveDripDrop = () => (
  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 pointer-events-none animate-drip-hang z-20">
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" className="filter drop-shadow-[0_2px_4px_rgba(147,51,234,0.7)]">
      <path
        d="M2,0 C3,3 4,6.5 5,8.5 C5.8,10.8 8.2,10.8 9,8.5 C10,6.5 11,3 12,0 Z"
        fill="url(#moolies-nav-drip-grad)"
        stroke="#2e1065"
        strokeWidth="1"
      />
      <circle cx="7" cy="7.5" r="1.3" fill="#ffffff" opacity="0.9" />
    </svg>
  </div>
);

export const WorldNavbar: React.FC<WorldNavbarProps> = ({
  onOpenOpenSea,
  onOpenWhitelist,
  onOpenCollectionDetails,
  onOpenRoadmap,
  activeSection = null,
}) => {
  return (
    <>
      {/* Global SVG Gradients for Drip Effects */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="moolies-nav-drip-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="35%" stopColor="#c084fc" />
            <stop offset="70%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>
          <linearGradient id="moolies-badge-drip-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="40%" stopColor="#c084fc" />
            <stop offset="75%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top Header Row (Brand Logo + Centered Navigation Bar) */}
      <header className="fixed top-2.5 sm:top-4 inset-x-2.5 sm:inset-x-8 z-40 flex items-center justify-between pointer-events-none gap-2">
        {/* Brand Badge */}
        <div className="relative shrink-0 pointer-events-auto">
          <button
            type="button"
            onClick={onOpenCollectionDetails}
            title="Moolies Genesis Collection"
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-slate-950/85 text-white backdrop-blur-none border border-purple-400/50 shadow-[0_4px_22px_rgba(147,51,234,0.35)] flex items-center gap-1.5 sm:gap-2 hover:border-purple-300 transition-all cursor-pointer group shrink-0 relative overflow-visible"
          >
            {/* Cooper Black Brand Title with Glossy Slime Drip */}
            <span className="font-cooper text-base sm:text-lg tracking-wider moolies-cooper-brand">
              MOOLIES
            </span>
            <span className="font-cooper text-[11px] font-bold text-purple-200/90 hidden md:inline border-l border-purple-500/40 pl-2">
              2,000 Genesis Owls
            </span>
            <Sparkles className="w-3.5 h-3.5 text-purple-300 hidden sm:inline group-hover:rotate-12 transition-transform" />
          </button>

          {/* SVG Liquid Drips hanging from bottom of brand badge */}
          <svg
            viewBox="0 0 160 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-2.5 left-3 w-36 h-3.5 pointer-events-none overflow-visible filter drop-shadow-[0_2px_4px_rgba(147,51,234,0.6)]"
            aria-hidden="true"
          >
            <path
              d="M6,0 C8,4 9,8 10,11 C11,14 13,15.5 15,15.5 C17,15.5 19,14 20,11 C21,8 22,4 24,0 
                 L40,0 C42,5 43,12 45,15 C46.5,17.2 49.5,17.2 51,15 C53,12 54,5 56,0 
                 L84,0 C86,4 87,9 88,12 C89.2,15.5 92.8,15.5 94,12 C95,9 96,4 98,0 
                 L122,0 C124,3 125,7 126,10 C127,13 129.5,14 131,14 C132.5,14 135,13 136,10 C137,7 138,3 140,0 Z"
              fill="url(#moolies-badge-drip-grad)"
              stroke="#2e1065"
              strokeWidth="1.2"
            />
            {/* Glossy highlight shine dots inside the droplets */}
            <circle cx="15" cy="12" r="1.4" fill="#fdf4ff" opacity="0.85" />
            <circle cx="48" cy="13" r="1.7" fill="#fdf4ff" opacity="0.85" />
            <circle cx="91" cy="10" r="1.4" fill="#fdf4ff" opacity="0.85" />
            <circle cx="131" cy="9.5" r="1.3" fill="#fdf4ff" opacity="0.85" />
          </svg>
        </div>

        {/* Desktop Centered Navigation Bar */}
        <div className="relative pointer-events-auto hidden sm:block">
          <nav
            aria-label="Core Sections (Desktop)"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-none border border-purple-500/50 shadow-[0_10px_30px_rgba(147,51,234,0.3)] relative z-10"
          >
            {/* Section 1: OpenSea */}
            <button
              type="button"
              onClick={onOpenOpenSea}
              className={`font-cooper navbar-cooper-text px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 relative ${
                activeSection === "opensea"
                  ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md font-black"
                  : "text-purple-200/85 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              <span>⛵</span>
              <span>OpenSea</span>
              {activeSection === "opensea" && <ActiveDripDrop />}
            </button>

            {/* Section 2: Whitelist */}
            <button
              type="button"
              onClick={onOpenWhitelist}
              className={`font-cooper navbar-cooper-text px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 relative ${
                activeSection === "whitelist"
                  ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md font-black"
                  : "text-purple-200/85 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              <span>🦉</span>
              <span>Whitelist</span>
              {activeSection === "whitelist" && <ActiveDripDrop />}
            </button>

            {/* Section 3: Collection Details */}
            <button
              type="button"
              onClick={onOpenCollectionDetails}
              className={`font-cooper navbar-cooper-text px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 relative ${
                activeSection === "collection"
                  ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md font-black"
                  : "text-purple-200/85 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              <span>📜</span>
              <span>Collection Details</span>
              {activeSection === "collection" && <ActiveDripDrop />}
            </button>

            {/* Section 4: Roadmap */}
            <button
              type="button"
              onClick={onOpenRoadmap}
              className={`font-cooper navbar-cooper-text px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 relative ${
                activeSection === "roadmap"
                  ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md font-black"
                  : "text-purple-200/85 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              <span>⚽</span>
              <span>Roadmap</span>
              {activeSection === "roadmap" && <ActiveDripDrop />}
            </button>

            {/* Section 5: Project Twitter (X Logo Link) */}
            <a
              href="https://x.com/moolieshq"
              target="_blank"
              rel="noopener noreferrer"
              title="Official Moolies Project on X (Twitter)"
              className="font-cooper navbar-cooper-text flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-950/70 hover:bg-purple-900/90 border border-purple-500/40 transition-all cursor-pointer shrink-0"
            >
              <XLogo className="w-3.5 h-3.5 text-purple-200" />
              <span>Twitter</span>
              <ExternalLink className="w-3 h-3 text-purple-300" />
            </a>
          </nav>

          {/* SVG Drip Trim for Desktop Navbar */}
          <svg
            viewBox="0 0 440 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-[92%] h-3.5 pointer-events-none overflow-visible filter drop-shadow-[0_3px_6px_rgba(147,51,234,0.45)]"
            aria-hidden="true"
          >
            <path
              d="M20,0 C22,3 23,7 24,9.5 C25,12 27,13.5 29,13.5 C31,13.5 33,12 34,9.5 C35,7 36,3 38,0 
                 L112,0 C114,4 115,11 116.5,14 C118,16.5 121,16.5 122.5,14 C124,11 125,4 127,0 
                 L210,0 C212,3 213,8 214,10.5 C215.2,13 217.8,13 219,10.5 C220,8 221,3 223,0 
                 L306,0 C308,4 309,12 310.5,15 C312,17.2 315,17.2 316.5,15 C318,12 319,4 321,0 
                 L398,0 C400,3 401,7 402,9.5 C403,12 405,13.5 407,13.5 C409,13.5 411,12 412,9.5 C413,7 414,3 416,0 Z"
              fill="url(#moolies-nav-drip-grad)"
              stroke="#2e1065"
              strokeWidth="1.2"
            />
            {/* Glossy specular shine dots inside the droplets */}
            <circle cx="29" cy="10" r="1.4" fill="#ffffff" opacity="0.85" />
            <circle cx="119.5" cy="12.5" r="1.8" fill="#ffffff" opacity="0.85" />
            <circle cx="216.5" cy="8.5" r="1.3" fill="#ffffff" opacity="0.85" />
            <circle cx="313.5" cy="13" r="1.8" fill="#ffffff" opacity="0.85" />
            <circle cx="407" cy="10" r="1.4" fill="#ffffff" opacity="0.85" />
          </svg>
        </div>

        {/* Right Spacer for balance */}
        <div className="hidden sm:block w-32 shrink-0 pointer-events-none" />
      </header>

      {/* Mobile Floating 5-Section Navigation Bar */}
      <div className="fixed top-12 sm:hidden inset-x-2 z-40 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-sm pointer-events-auto">
          <nav
            aria-label="Core Sections (Mobile)"
            className="w-full flex items-center justify-between gap-1 p-1 rounded-2xl bg-slate-950/85 text-white backdrop-blur-none border border-purple-500/50 shadow-2xl relative z-10"
          >
            {/* Section 1: OpenSea */}
            <button
              type="button"
              onClick={onOpenOpenSea}
              className={`font-cooper navbar-cooper-text flex-1 py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 relative ${
                activeSection === "opensea"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm font-black"
                  : "text-purple-200/85 hover:text-white active:bg-purple-900/60"
              }`}
            >
              <span className="text-xs">⛵</span>
              <span className="leading-none">OpenSea</span>
              {activeSection === "opensea" && <ActiveDripDrop />}
            </button>

            {/* Section 2: Whitelist */}
            <button
              type="button"
              onClick={onOpenWhitelist}
              className={`font-cooper navbar-cooper-text flex-1 py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 relative ${
                activeSection === "whitelist"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm font-black"
                  : "text-purple-200/85 hover:text-white active:bg-purple-900/60"
              }`}
            >
              <span className="text-xs">🦉</span>
              <span className="leading-none">Whitelist</span>
              {activeSection === "whitelist" && <ActiveDripDrop />}
            </button>

            {/* Section 3: Supply */}
            <button
              type="button"
              onClick={onOpenCollectionDetails}
              className={`font-cooper navbar-cooper-text flex-1 py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 relative ${
                activeSection === "collection"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm font-black"
                  : "text-purple-200/85 hover:text-white active:bg-purple-900/60"
              }`}
            >
              <span className="text-xs">📜</span>
              <span className="leading-none">Supply</span>
              {activeSection === "collection" && <ActiveDripDrop />}
            </button>

            {/* Section 4: Roadmap */}
            <button
              type="button"
              onClick={onOpenRoadmap}
              className={`font-cooper navbar-cooper-text flex-1 py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 relative ${
                activeSection === "roadmap"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm font-black"
                  : "text-purple-200/85 hover:text-white active:bg-purple-900/60"
              }`}
            >
              <span className="text-xs">⚽</span>
              <span className="leading-none">Roadmap</span>
              {activeSection === "roadmap" && <ActiveDripDrop />}
            </button>

            {/* Section 5: Twitter X */}
            <a
              href="https://x.com/moolieshq"
              target="_blank"
              rel="noopener noreferrer"
              title="Official Moolies on X"
              className="font-cooper navbar-cooper-text flex-none py-1.5 px-2.5 rounded-xl bg-purple-950/70 text-white border border-purple-500/40 flex flex-col items-center justify-center gap-0.5 active:bg-purple-900"
            >
              <XLogo className="w-3.5 h-3.5 text-purple-200" />
              <span className="text-[10px] leading-none text-purple-200 font-bold">X</span>
            </a>
          </nav>

          {/* SVG Drip Trim for Mobile Navbar */}
          <svg
            viewBox="0 0 280 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-3 pointer-events-none overflow-visible filter drop-shadow-[0_2px_4px_rgba(147,51,234,0.5)]"
            aria-hidden="true"
          >
            <path
              d="M14,0 C16,3 17,6 18,8 C19,10 20.5,11 22,11 C23.5,11 25,10 26,8 C27,6 28,3 30,0 
                 L86,0 C88,3 89,8 90,10.5 C91,12.5 93,12.5 94,10.5 C95,8 96,3 98,0 
                 L154,0 C156,3 157,6 158,8 C159,10 160.5,11 162,11 C163.5,11 165,10 166,8 C167,6 168,3 170,0 
                 L224,0 C226,3 227,8 228,10.5 C229,12.5 231,12.5 232,10.5 C233,8 234,3 236,0 Z"
              fill="url(#moolies-nav-drip-grad)"
              stroke="#2e1065"
              strokeWidth="1.2"
            />
            <circle cx="22" cy="8" r="1.2" fill="#ffffff" opacity="0.85" />
            <circle cx="92" cy="9.5" r="1.4" fill="#ffffff" opacity="0.85" />
            <circle cx="162" cy="8" r="1.2" fill="#ffffff" opacity="0.85" />
            <circle cx="230" cy="9.5" r="1.4" fill="#ffffff" opacity="0.85" />
          </svg>
        </div>
      </div>
    </>
  );
};
