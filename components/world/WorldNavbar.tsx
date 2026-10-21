"use client";

import React from "react";
import { Sparkles, ExternalLink, X } from "lucide-react";

interface WorldNavbarProps {
  onOpenOpenSea: () => void;
  onOpenWhitelist: () => void;
  onOpenCollectionDetails: () => void;
  onOpenRoadmap: () => void;
  activeSection?: "opensea" | "whitelist" | "collection" | "roadmap" | null;
  onClose?: () => void;
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
  <div className="shrink-0 pointer-events-none animate-drip-hang">
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      className="filter drop-shadow-[0_2px_4px_rgba(250,204,21,0.7)]"
    >
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
  onClose,
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

      {/* Floating Vertical Column Navigation in Middle of Screen */}
      <div className="relative w-64 sm:w-72 rounded-3xl bg-slate-950/65 backdrop-blur-md border-2 border-purple-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_35px_rgba(147,51,234,0.35)] p-4 flex flex-col gap-2.5 pointer-events-auto select-none overflow-visible">
        {/* Optional Close / Minimize Button in Top-Right */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Minimize navigation"
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-purple-950/40 hover:bg-purple-900/70 text-purple-300 hover:text-white flex items-center justify-center transition-colors border border-purple-500/30 cursor-pointer z-20"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Brand Header */}
        <div className="relative flex flex-col items-center text-center pt-1 pb-2">
          <button
            type="button"
            onClick={onOpenCollectionDetails}
            title="Moolies PFP Collection"
            className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
          >
            <span
              className="font-cooper text-2xl sm:text-3xl tracking-wider moolies-cooper-brand"
              style={{
                fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
              }}
            >
              MOOLIES
            </span>
            <div className="inline-flex items-center gap-1 mt-0.5 px-2.5 py-0.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-[10px] font-mono text-purple-200">
              <Sparkles className="w-2.5 h-2.5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>2,000 Genesis</span>
            </div>
          </button>

          {/* Liquid Drip Accent under Brand Title */}
          <svg
            viewBox="0 0 160 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-3.5 mt-1 pointer-events-none overflow-visible filter drop-shadow-[0_2px_5px_rgba(147,51,234,0.7)]"
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
            <circle cx="15" cy="15" r="1.6" fill="#fdf4ff" opacity="0.9" />
            <circle cx="48" cy="16" r="2" fill="#fdf4ff" opacity="0.9" />
            <circle cx="91" cy="13" r="1.6" fill="#fdf4ff" opacity="0.9" />
            <circle cx="131" cy="12" r="1.5" fill="#fdf4ff" opacity="0.9" />
          </svg>
        </div>

        {/* Glowing Subtle Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/35 to-transparent my-0.5" />

        {/* 5 Distinctive Sections Stacked in a Column */}
        <nav aria-label="Core Realm Sections" className="flex flex-col gap-2 w-full">
          {/* Section 1: OpenSea */}
          <button
            type="button"
            onClick={onOpenOpenSea}
            className={`w-full px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between group relative ${
              activeSection === "opensea"
                ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-[0_0_16px_rgba(217,70,239,0.5)] border border-fuchsia-400/60"
                : "bg-purple-950/35 hover:bg-purple-900/55 border border-purple-500/30 hover:border-purple-400/50 hover:translate-x-1"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base group-hover:scale-110 transition-transform">⛵</span>
              <span
                className={`font-cooper text-sm font-black tracking-wide ${
                  activeSection === "opensea" ? "navbar-drip-text-active" : "navbar-drip-text group-hover:brightness-125"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                OpenSea
              </span>
            </div>
            {activeSection === "opensea" ? (
              <ActiveDripDrop />
            ) : (
              <span className="text-[10px] font-mono text-purple-300/60 uppercase">Market</span>
            )}
          </button>

          {/* Section 2: Whitelist */}
          <button
            type="button"
            onClick={onOpenWhitelist}
            className={`w-full px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between group relative ${
              activeSection === "whitelist"
                ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-[0_0_16px_rgba(217,70,239,0.5)] border border-fuchsia-400/60"
                : "bg-purple-950/35 hover:bg-purple-900/55 border border-purple-500/30 hover:border-purple-400/50 hover:translate-x-1"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base group-hover:scale-110 transition-transform">🦉</span>
              <span
                className={`font-cooper text-sm font-black tracking-wide ${
                  activeSection === "whitelist" ? "navbar-drip-text-active" : "navbar-drip-text group-hover:brightness-125"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Whitelist
              </span>
            </div>
            {activeSection === "whitelist" ? (
              <ActiveDripDrop />
            ) : (
              <span className="text-[10px] font-mono text-purple-300/60 uppercase">Access</span>
            )}
          </button>

          {/* Section 3: Collection Details */}
          <button
            type="button"
            onClick={onOpenCollectionDetails}
            className={`w-full px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between group relative ${
              activeSection === "collection"
                ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-[0_0_16px_rgba(217,70,239,0.5)] border border-fuchsia-400/60"
                : "bg-purple-950/35 hover:bg-purple-900/55 border border-purple-500/30 hover:border-purple-400/50 hover:translate-x-1"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base group-hover:scale-110 transition-transform">📜</span>
              <span
                className={`font-cooper text-sm font-black tracking-wide ${
                  activeSection === "collection" ? "navbar-drip-text-active" : "navbar-drip-text group-hover:brightness-125"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Collection
              </span>
            </div>
            {activeSection === "collection" ? (
              <ActiveDripDrop />
            ) : (
              <span className="text-[10px] font-mono text-purple-300/60 uppercase">Supply</span>
            )}
          </button>

          {/* Section 4: Roadmap */}
          <button
            type="button"
            onClick={onOpenRoadmap}
            className={`w-full px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between group relative ${
              activeSection === "roadmap"
                ? "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-[0_0_16px_rgba(217,70,239,0.5)] border border-fuchsia-400/60"
                : "bg-purple-950/35 hover:bg-purple-900/55 border border-purple-500/30 hover:border-purple-400/50 hover:translate-x-1"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base group-hover:scale-110 transition-transform">⚽</span>
              <span
                className={`font-cooper text-sm font-black tracking-wide ${
                  activeSection === "roadmap" ? "navbar-drip-text-active" : "navbar-drip-text group-hover:brightness-125"
                }`}
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Roadmap
              </span>
            </div>
            {activeSection === "roadmap" ? (
              <ActiveDripDrop />
            ) : (
              <span className="text-[10px] font-mono text-purple-300/60 uppercase">Goals</span>
            )}
          </button>

          {/* Section 5: Twitter X */}
          <a
            href="https://x.com/moolieshq"
            target="_blank"
            rel="noopener noreferrer"
            title="Official Moolies Project on X (Twitter)"
            className="w-full px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between bg-purple-950/45 hover:bg-purple-900/65 border border-purple-500/30 hover:border-purple-400/50 hover:translate-x-1 group"
          >
            <div className="flex items-center gap-2.5">
              <XLogo className="w-4 h-4 text-purple-200 group-hover:scale-110 transition-transform" />
              <span
                className="font-cooper text-sm font-black tracking-wide navbar-drip-text group-hover:brightness-125"
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                Twitter
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-purple-300 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </nav>

        {/* SVG Liquid Drips Hanging from Bottom of Column */}
        <svg
          viewBox="0 0 200 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-48 h-4 pointer-events-none overflow-visible filter drop-shadow-[0_3px_6px_rgba(147,51,234,0.6)]"
          aria-hidden="true"
        >
          <path
            d="M10,0 C12,4 13,8 14,12 C15,15 17,16.5 19,16.5 C21,16.5 23,15 24,12 C25,8 26,4 28,0 
               L60,0 C62,5 63,11 64.5,15 C66,18 69,18 70.5,15 C72,11 73,5 75,0 
               L115,0 C117,4 118,9 119,13 C120.2,16 122.8,16 124,13 C125,9 126,4 128,0 
               L165,0 C167,4 168,8 169,12 C170,15 172,16.5 174,16.5 C176,16.5 178,15 179,12 C180,8 181,4 183,0 Z"
            fill="url(#moolies-nav-drip-grad)"
            stroke="#2e1065"
            strokeWidth="1.2"
          />
          <circle cx="19" cy="12" r="1.5" fill="#ffffff" opacity="0.9" />
          <circle cx="67.5" cy="13" r="1.8" fill="#ffffff" opacity="0.9" />
          <circle cx="121.5" cy="11" r="1.4" fill="#ffffff" opacity="0.9" />
          <circle cx="174" cy="12" r="1.5" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>
    </>
  );
};
