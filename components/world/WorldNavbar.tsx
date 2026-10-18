"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Shield, ExternalLink } from "lucide-react";

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
          className="pointer-events-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-slate-950/90 text-white backdrop-blur-md border border-amber-300/60 shadow-lg flex items-center gap-1.5 sm:gap-2 hover:border-amber-300 transition-all cursor-pointer group shrink-0"
        >
          <span className="font-black text-xs sm:text-sm tracking-wider text-amber-300 group-hover:text-amber-200">
            MOOLIES
          </span>
          <span className="text-[10px] font-semibold text-slate-300 hidden md:inline border-l border-slate-700 pl-2">
            2,000 Genesis Owls
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 hidden sm:inline" />
        </button>

        {/* Desktop Centered Navigation Bar */}
        <nav
          aria-label="Core Sections (Desktop)"
          className="pointer-events-auto hidden sm:flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl"
        >
          {/* Section 1: OpenSea */}
          <button
            type="button"
            onClick={onOpenOpenSea}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeSection === "opensea"
                ? "bg-sky-400 text-slate-950 shadow-sm font-black"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <span>⛵</span>
            <span>OpenSea</span>
          </button>

          {/* Section 2: Whitelist */}
          <button
            type="button"
            onClick={onOpenWhitelist}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeSection === "whitelist"
                ? "bg-amber-400 text-slate-950 shadow-sm font-black"
                : "text-amber-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <span>🦉</span>
            <span>Whitelist</span>
          </button>

          {/* Section 3: Collection Details */}
          <button
            type="button"
            onClick={onOpenCollectionDetails}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeSection === "collection"
                ? "bg-purple-400 text-slate-950 shadow-sm font-black"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <span>📜</span>
            <span>Collection Details</span>
          </button>

          {/* Section 4: Roadmap */}
          <button
            type="button"
            onClick={onOpenRoadmap}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeSection === "roadmap"
                ? "bg-emerald-400 text-slate-950 shadow-sm font-black"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
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
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer shrink-0"
          >
            <XLogo className="w-3.5 h-3.5 text-white" />
            <span>Twitter</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </nav>

        {/* Right Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 shrink-0 justify-end">
          {/* Admin Portal Link */}
          <Link
            href="/admin"
            className="p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-slate-950/60 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-semibold backdrop-blur-md border border-slate-800 transition-colors flex items-center gap-1"
            title="Council Admin Portal"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Admin</span>
          </Link>
        </div>
      </header>

      {/* Mobile Floating 5-Section Navigation Bar */}
      <div className="fixed top-12 sm:hidden inset-x-2 z-40 flex items-center justify-center pointer-events-none">
        <nav
          aria-label="Core Sections (Mobile)"
          className="pointer-events-auto w-full max-w-sm flex items-center justify-between gap-1 p-1 rounded-2xl bg-slate-950/95 text-white backdrop-blur-md border border-slate-800 shadow-2xl"
        >
          {/* Section 1: OpenSea */}
          <button
            type="button"
            onClick={onOpenOpenSea}
            className={`flex-1 py-1.5 px-1 rounded-xl text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              activeSection === "opensea"
                ? "bg-sky-400 text-slate-950 shadow-sm"
                : "text-slate-300 hover:text-white active:bg-slate-800"
            }`}
          >
            <span className="text-xs">⛵</span>
            <span className="leading-none">OpenSea</span>
          </button>

          {/* Section 2: Whitelist */}
          <button
            type="button"
            onClick={onOpenWhitelist}
            className={`flex-1 py-1.5 px-1 rounded-xl text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              activeSection === "whitelist"
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "text-amber-300 hover:text-white active:bg-slate-800"
            }`}
          >
            <span className="text-xs">🦉</span>
            <span className="leading-none">Whitelist</span>
          </button>

          {/* Section 3: Supply */}
          <button
            type="button"
            onClick={onOpenCollectionDetails}
            className={`flex-1 py-1.5 px-1 rounded-xl text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              activeSection === "collection"
                ? "bg-purple-400 text-slate-950 shadow-sm"
                : "text-slate-300 hover:text-white active:bg-slate-800"
            }`}
          >
            <span className="text-xs">📜</span>
            <span className="leading-none">Supply</span>
          </button>

          {/* Section 4: Roadmap */}
          <button
            type="button"
            onClick={onOpenRoadmap}
            className={`flex-1 py-1.5 px-1 rounded-xl text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              activeSection === "roadmap"
                ? "bg-emerald-400 text-slate-950 shadow-sm"
                : "text-slate-300 hover:text-white active:bg-slate-800"
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
            className="flex-none py-1.5 px-2.5 rounded-xl bg-slate-900 text-white border border-slate-700/80 flex flex-col items-center justify-center gap-0.5 active:bg-slate-800"
          >
            <XLogo className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] leading-none text-slate-300">X</span>
          </a>
        </nav>
      </div>
    </>
  );
};
