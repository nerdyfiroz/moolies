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

export const WorldNavbar: React.FC<WorldNavbarProps> = ({
  onOpenOpenSea,
  onOpenWhitelist,
  onOpenCollectionDetails,
  onOpenRoadmap,
  activeSection = null,
}) => {
  return (
    <>
      {/* Top Header Row (Brand Logo + Admin Control) */}
      <header className="fixed top-2.5 sm:top-4 inset-x-2.5 sm:inset-x-8 z-40 flex items-center justify-between pointer-events-none gap-2">
        {/* Brand Badge */}
        <button
          type="button"
          onClick={onOpenCollectionDetails}
          title="Moolies Genesis Collection"
          className="pointer-events-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-slate-950/75 text-white backdrop-blur-none border border-purple-400/50 shadow-[0_4px_20px_rgba(147,51,234,0.3)] flex items-center gap-1.5 sm:gap-2 hover:border-purple-300 transition-all cursor-pointer group shrink-0"
        >
          <span className="font-drip text-sm sm:text-base tracking-wider moolies-dripping-title">
            MOOLIES
          </span>
          <span className="font-cartoon text-[11px] font-semibold text-purple-200/90 hidden md:inline border-l border-purple-500/40 pl-2">
            2,000 Genesis Owls
          </span>
          <Sparkles className="w-3.5 h-3.5 text-purple-300 hidden sm:inline" />
        </button>

        {/* Desktop Centered Navigation Bar */}
        <nav
          aria-label="Core Sections (Desktop)"
          className="pointer-events-auto hidden sm:flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-2xl bg-slate-950/70 backdrop-blur-none border border-purple-500/40 shadow-[0_10px_30px_rgba(147,51,234,0.25)]"
        >
          {/* Section 1: OpenSea */}
          <button
            type="button"
            onClick={onOpenOpenSea}
            className={`font-moolies px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeSection === "opensea"
                ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md font-black"
                : "text-purple-200/80 hover:text-white hover:bg-purple-900/40"
            }`}
          >
            <span>⛵</span>
            <span>OpenSea</span>
          </button>

          {/* Section 2: Whitelist */}
          <button
            type="button"
            onClick={onOpenWhitelist}
            className={`font-moolies px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeSection === "whitelist"
                ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md font-black"
                : "text-purple-200/80 hover:text-white hover:bg-purple-900/40"
            }`}
          >
            <span>🦉</span>
            <span>Whitelist</span>
          </button>

          {/* Section 3: Collection Details */}
          <button
            type="button"
            onClick={onOpenCollectionDetails}
            className={`font-moolies px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeSection === "collection"
                ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md font-black"
                : "text-purple-200/80 hover:text-white hover:bg-purple-900/40"
            }`}
          >
            <span>📜</span>
            <span>Collection Details</span>
          </button>

          {/* Section 4: Roadmap */}
          <button
            type="button"
            onClick={onOpenRoadmap}
            className={`font-moolies px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeSection === "roadmap"
                ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md font-black"
                : "text-purple-200/80 hover:text-white hover:bg-purple-900/40"
            }`}
          >
            <span>⚽</span>
            <span>Roadmap</span>
          </button>

          {/* Section 5: Project Twitter (X Logo Link) */}
          <a
            href="https://x.com/moolieshq"
            target="_blank"
            rel="noopener noreferrer"
            title="Official Moolies Project on X (Twitter)"
            className="font-moolies flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 transition-all cursor-pointer shrink-0"
          >
            <XLogo className="w-3.5 h-3.5 text-purple-200" />
            <span>Twitter</span>
            <ExternalLink className="w-3 h-3 text-purple-300" />
          </a>
        </nav>

        {/* Right Spacer for balance */}
        <div className="hidden sm:block w-32 shrink-0 pointer-events-none" />
      </header>

      {/* Mobile Floating 5-Section Navigation Bar */}
      <div className="fixed top-12 sm:hidden inset-x-2 z-40 flex items-center justify-center pointer-events-none">
        <nav
          aria-label="Core Sections (Mobile)"
          className="pointer-events-auto w-full max-w-sm flex items-center justify-between gap-1 p-1 rounded-2xl bg-slate-950/80 text-white backdrop-blur-none border border-purple-500/40 shadow-2xl"
        >
          {/* Section 1: OpenSea */}
          <button
            type="button"
            onClick={onOpenOpenSea}
            className={`font-moolies flex-1 py-1.5 px-1 rounded-xl text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              activeSection === "opensea"
                ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                : "text-purple-200/80 hover:text-white active:bg-purple-900/60"
            }`}
          >
            <span className="text-xs">⛵</span>
            <span className="leading-none">OpenSea</span>
          </button>

          {/* Section 2: Whitelist */}
          <button
            type="button"
            onClick={onOpenWhitelist}
            className={`font-moolies flex-1 py-1.5 px-1 rounded-xl text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              activeSection === "whitelist"
                ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                : "text-purple-200/80 hover:text-white active:bg-purple-900/60"
            }`}
          >
            <span className="text-xs">🦉</span>
            <span className="leading-none">Whitelist</span>
          </button>

          {/* Section 3: Supply */}
          <button
            type="button"
            onClick={onOpenCollectionDetails}
            className={`font-moolies flex-1 py-1.5 px-1 rounded-xl text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              activeSection === "collection"
                ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                : "text-purple-200/80 hover:text-white active:bg-purple-900/60"
            }`}
          >
            <span className="text-xs">📜</span>
            <span className="leading-none">Supply</span>
          </button>

          {/* Section 4: Roadmap */}
          <button
            type="button"
            onClick={onOpenRoadmap}
            className={`font-moolies flex-1 py-1.5 px-1 rounded-xl text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              activeSection === "roadmap"
                ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm"
                : "text-purple-200/80 hover:text-white active:bg-purple-900/60"
            }`}
          >
            <span className="text-xs">⚽</span>
            <span className="leading-none">Roadmap</span>
          </button>

          {/* Section 5: Twitter X */}
          <a
            href="https://x.com/moolieshq"
            target="_blank"
            rel="noopener noreferrer"
            title="Official Moolies on X"
            className="font-moolies flex-none py-1.5 px-2.5 rounded-xl bg-purple-950/60 text-white border border-purple-500/40 flex flex-col items-center justify-center gap-0.5 active:bg-purple-900"
          >
            <XLogo className="w-3.5 h-3.5 text-purple-200" />
            <span className="text-[10px] leading-none text-purple-200">X</span>
          </a>
        </nav>
      </div>
    </>
  );
};
