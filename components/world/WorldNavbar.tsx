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
            title="Moolies PFP Collection"
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-slate-950/90 text-white backdrop-blur-none border border-purple-400/60 shadow-[0_4px_22px_rgba(147,51,234,0.4)] flex items-center gap-1.5 sm:gap-2 hover:border-purple-300 transition-all cursor-pointer group shrink-0 relative overflow-visible"
          >
            {/* Cooper Black Brand Title with Glossy Slime Drip */}
            <span
              className="font-cooper text-base sm:text-xl tracking-wider moolies-cooper-brand"
              style={{
                fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
              }}
            >
              MOOLIES
            </span>
            <span
              className="font-cooper text-xs sm:text-sm font-black text-purple-200/95 hidden md:inline border-l border-purple-500/50 pl-2"
              style={{
                fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
              }}
            >
              2,000 Genesis Moolies
            </span>
            <Sparkles className="w-3.5 h-3.5 text-purple-300 hidden sm:inline group-hover:rotate-12 transition-transform" />
          </button>

          {/* SVG Liquid Drips hanging from bottom of brand badge */}
          <svg
            viewBox="0 0 160 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-3.5 left-3 w-36 h-4 pointer-events-none overflow-visible filter drop-shadow-[0_2px_5px_rgba(147,51,234,0.7)]"
            aria-hidden="true"
          >
            <path
              d="M6,0 C8,5 9,10 10,14 C11,17.5 13,19.5 15,19.5 C17,19.5 19,17.5 20,14 C21,10 22,5 24,0 
                 L40,0 C42,6 43,14 45,18 C46.5,21 49.5,21 51,18 C53,14 54,6 56,0 
                 L84,0 C86,5 87,11 88,15 C89.2,19 92.8,19 94,15 C95,11 96,5 98,0 
                 L122,0 C124,4 125,9 126,13 C127,16.5 129.5,17.5 131,17.5 C132.5,17.5 135,16.5 136,13 C137,9 138,4 140,0 Z"
              fill="url(#moolies-badge-drip-grad)"
              stroke="#2e1065"
              strokeWidth="1.2"
            />
            {/* Glossy highlight shine dots inside the droplets */}
            <circle cx="15" cy="15" r="1.6" fill="#fdf4ff" opacity="0.9" />
            <circle cx="48" cy="16" r="2" fill="#fdf4ff" opacity="0.9" />
            <circle cx="91" cy="13" r="1.6" fill="#fdf4ff" opacity="0.9" />
            <circle cx="131" cy="12" r="1.5" fill="#fdf4ff" opacity="0.9" />
          </svg>
        </div>

        {/* Desktop Centered Navigation Bar */}
        <div className="relative pointer-events-auto hidden sm:block">
          <nav
            aria-label="Core Sections (Desktop)"
            className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-2xl bg-slate-950/85 backdrop-blur-none border border-purple-500/60 shadow-[0_10px_30px_rgba(147,51,234,0.35)] relative z-10"
          >
            {/* Section 1: OpenSea */}
            <button
              type="button"
              onClick={onOpenOpenSea}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-1.5 relative group ${
                activeSection === "opensea"
                  ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-[0_0_16px_rgba(217,70,239,0.5)] border border-fuchsia-400/60"
                  : "bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400/50"
              }`}
            >
              <span className="text-sm sm:text-base group-hover:scale-110 transition-transform">⛵</span>
              <span
                className={`font-cooper text-xs sm:text-sm font-black tracking-wide transition-all ${
                  activeSection === "opensea" ? "navbar-drip-text-active" : "navbar-drip-text group-hover:brightness-125"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                OpenSea
              </span>
              {activeSection === "opensea" && <ActiveDripDrop />}
            </button>

            {/* Section 2: Whitelist */}
            <button
              type="button"
              onClick={onOpenWhitelist}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-1.5 relative group ${
                activeSection === "whitelist"
                  ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-[0_0_16px_rgba(217,70,239,0.5)] border border-fuchsia-400/60"
                  : "bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400/50"
              }`}
            >
              <span className="text-sm sm:text-base group-hover:scale-110 transition-transform">🦉</span>
              <span
                className={`font-cooper text-xs sm:text-sm font-black tracking-wide transition-all ${
                  activeSection === "whitelist" ? "navbar-drip-text-active" : "navbar-drip-text group-hover:brightness-125"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Whitelist
              </span>
              {activeSection === "whitelist" && <ActiveDripDrop />}
            </button>

            {/* Section 3: Collection Details */}
            <button
              type="button"
              onClick={onOpenCollectionDetails}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-1.5 relative group ${
                activeSection === "collection"
                  ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-[0_0_16px_rgba(217,70,239,0.5)] border border-fuchsia-400/60"
                  : "bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400/50"
              }`}
            >
              <span className="text-sm sm:text-base group-hover:scale-110 transition-transform">📜</span>
              <span
                className={`font-cooper text-xs sm:text-sm font-black tracking-wide transition-all ${
                  activeSection === "collection" ? "navbar-drip-text-active" : "navbar-drip-text group-hover:brightness-125"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Collection Details
              </span>
              {activeSection === "collection" && <ActiveDripDrop />}
            </button>

            {/* Section 4: Roadmap */}
            <button
              type="button"
              onClick={onOpenRoadmap}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-1.5 relative group ${
                activeSection === "roadmap"
                  ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-[0_0_16px_rgba(217,70,239,0.5)] border border-fuchsia-400/60"
                  : "bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400/50"
              }`}
            >
              <span className="text-sm sm:text-base group-hover:scale-110 transition-transform">⚽</span>
              <span
                className={`font-cooper text-xs sm:text-sm font-black tracking-wide transition-all ${
                  activeSection === "roadmap" ? "navbar-drip-text-active" : "navbar-drip-text group-hover:brightness-125"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Roadmap
              </span>
              {activeSection === "roadmap" && <ActiveDripDrop />}
            </button>

            {/* Section 5: Project Twitter (X Logo Link) */}
            <a
              href="https://x.com/moolieshq"
              target="_blank"
              rel="noopener noreferrer"
              title="Official Moolies Project on X (Twitter)"
              className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-1.5 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 hover:border-purple-400/60 group"
            >
              <XLogo className="w-3.5 h-3.5 text-purple-200 group-hover:scale-110 transition-transform" />
              <span
                className="font-cooper text-xs sm:text-sm font-black tracking-wide navbar-drip-text group-hover:brightness-125"
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Twitter
              </span>
              <ExternalLink className="w-3 h-3 text-purple-300" />
            </a>
          </nav>

          {/* SVG Drip Trim for Desktop Navbar - Bold, Juicy Drops */}
          <svg
            viewBox="0 0 460 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-[94%] h-4.5 pointer-events-none overflow-visible filter drop-shadow-[0_3px_6px_rgba(147,51,234,0.55)]"
            aria-hidden="true"
          >
            <path
              d="M20,0 C22,4 23,8 24,12 C25,15.5 27,17.5 29,17.5 C31,17.5 33,15.5 34,12 C35,8 36,4 38,0 
                 L112,0 C114,5 115,13 116.5,17 C118,20 121,20 122.5,17 C124,13 125,5 127,0 
                 L210,0 C212,4 213,9 214,13 C215.2,16 217.8,16 219,13 C220,9 221,4 223,0 
                 L306,0 C308,5 309,14 310.5,18 C312,21 315,21 316.5,18 C318,14 319,5 321,0 
                 L398,0 C400,4 401,8 402,12 C403,15.5 405,17.5 407,17.5 C409,17.5 411,15.5 412,12 C413,8 414,4 416,0 Z"
              fill="url(#moolies-nav-drip-grad)"
              stroke="#2e1065"
              strokeWidth="1.2"
            />
            {/* Glossy specular shine dots inside the droplets */}
            <circle cx="29" cy="13" r="1.6" fill="#ffffff" opacity="0.9" />
            <circle cx="119.5" cy="15" r="2.1" fill="#ffffff" opacity="0.9" />
            <circle cx="216.5" cy="11" r="1.5" fill="#ffffff" opacity="0.9" />
            <circle cx="313.5" cy="16" r="2.1" fill="#ffffff" opacity="0.9" />
            <circle cx="407" cy="13" r="1.6" fill="#ffffff" opacity="0.9" />
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
            className="w-full flex items-center justify-between gap-1 p-1 rounded-2xl bg-slate-950/90 text-white backdrop-blur-none border border-purple-500/60 shadow-2xl relative z-10"
          >
            {/* Section 1: OpenSea */}
            <button
              type="button"
              onClick={onOpenOpenSea}
              className={`flex-1 py-1.5 px-1 rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 relative ${
                activeSection === "opensea"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                  : "bg-purple-950/40 hover:bg-purple-900/60"
              }`}
            >
              <span className="text-xs">⛵</span>
              <span
                className={`font-cooper text-[11px] font-black leading-none ${
                  activeSection === "opensea" ? "navbar-drip-text-active" : "navbar-drip-text"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                OpenSea
              </span>
              {activeSection === "opensea" && <ActiveDripDrop />}
            </button>

            {/* Section 2: Whitelist */}
            <button
              type="button"
              onClick={onOpenWhitelist}
              className={`flex-1 py-1.5 px-1 rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 relative ${
                activeSection === "whitelist"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                  : "bg-purple-950/40 hover:bg-purple-900/60"
              }`}
            >
              <span className="text-xs">🦉</span>
              <span
                className={`font-cooper text-[11px] font-black leading-none ${
                  activeSection === "whitelist" ? "navbar-drip-text-active" : "navbar-drip-text"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Whitelist
              </span>
              {activeSection === "whitelist" && <ActiveDripDrop />}
            </button>

            {/* Section 3: Supply */}
            <button
              type="button"
              onClick={onOpenCollectionDetails}
              className={`flex-1 py-1.5 px-1 rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 relative ${
                activeSection === "collection"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                  : "bg-purple-950/40 hover:bg-purple-900/60"
              }`}
            >
              <span className="text-xs">📜</span>
              <span
                className={`font-cooper text-[11px] font-black leading-none ${
                  activeSection === "collection" ? "navbar-drip-text-active" : "navbar-drip-text"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Supply
              </span>
              {activeSection === "collection" && <ActiveDripDrop />}
            </button>

            {/* Section 4: Roadmap */}
            <button
              type="button"
              onClick={onOpenRoadmap}
              className={`flex-1 py-1.5 px-1 rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 relative ${
                activeSection === "roadmap"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                  : "bg-purple-950/40 hover:bg-purple-900/60"
              }`}
            >
              <span className="text-xs">⚽</span>
              <span
                className={`font-cooper text-[11px] font-black leading-none ${
                  activeSection === "roadmap" ? "navbar-drip-text-active" : "navbar-drip-text"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Roadmap
              </span>
              {activeSection === "roadmap" && <ActiveDripDrop />}
            </button>

            {/* Section 5: Twitter X */}
            <a
              href="https://x.com/moolieshq"
              target="_blank"
              rel="noopener noreferrer"
              title="Official Moolies on X"
              className="flex-none py-1.5 px-2.5 rounded-xl bg-purple-950/70 text-white border border-purple-500/40 flex flex-col items-center justify-center gap-0.5 active:bg-purple-900"
            >
              <XLogo className="w-3.5 h-3.5 text-purple-200" />
              <span
                className="font-cooper text-[10px] leading-none navbar-drip-text font-black"
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                X
              </span>
            </a>
          </nav>

          {/* SVG Drip Trim for Mobile Navbar */}
          <svg
            viewBox="0 0 280 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-[90%] h-3.5 pointer-events-none overflow-visible filter drop-shadow-[0_2px_4px_rgba(147,51,234,0.5)]"
            aria-hidden="true"
          >
            <path
              d="M14,0 C16,4 17,7 18,9.5 C19,11.5 20.5,12.5 22,12.5 C23.5,12.5 25,11.5 26,9.5 C27,7 28,4 30,0 
                 L86,0 C88,4 89,9 90,12 C91,14.5 93,14.5 94,12 C95,9 96,4 98,0 
                 L154,0 C156,4 157,7 158,9.5 C159,11.5 160.5,12.5 162,12.5 C163.5,12.5 165,11.5 166,9.5 C167,7 168,4 170,0 
                 L224,0 C226,4 227,9 228,12 C229,14.5 231,14.5 232,12 C233,9 234,4 236,0 Z"
              fill="url(#moolies-nav-drip-grad)"
              stroke="#2e1065"
              strokeWidth="1.2"
            />
            <circle cx="22" cy="9.5" r="1.3" fill="#ffffff" opacity="0.85" />
            <circle cx="92" cy="11.5" r="1.6" fill="#ffffff" opacity="0.85" />
            <circle cx="162" cy="9.5" r="1.3" fill="#ffffff" opacity="0.85" />
            <circle cx="230" cy="11.5" r="1.6" fill="#ffffff" opacity="0.85" />
          </svg>
        </div>
      </div>
    </>
  );
};
