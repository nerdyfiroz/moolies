"use client";

import React from "react";
import Image from "next/image";
import { KeyRound, Coins } from "lucide-react";
import { XIcon } from "./TwitterBanner";

export const MooliesHeader: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 py-3.5 transition-all">
      <div className="max-w-5xl mx-auto rounded-2xl bg-slate-950/80 backdrop-blur-md border border-purple-400/40 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_10px_30px_rgba(46,16,101,0.2)]">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center">
            <Image
              src="/moolies-logo.png"
              alt="Moolies Owl Logo"
              width={44}
              height={44}
              priority
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-drip text-2xl sm:text-3xl tracking-wide leading-none bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_2px_0_#1a052b] drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
              Moolies
            </span>
            <span className="text-[10px] text-purple-300 font-cartoon font-semibold tracking-wider -mt-0.5">
              2,000 PFP NFTs
            </span>
          </div>
        </div>

        {/* Navigation jump pills */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollTo("whitelist-application")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-cartoon font-bold text-purple-200 hover:text-white hover:bg-purple-900/40 transition-colors cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span>Whitelist</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("collection-details")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-cartoon font-bold text-purple-200 hover:text-white hover:bg-purple-900/40 transition-colors cursor-pointer"
          >
            <Coins className="w-3.5 h-3.5 text-purple-300" />
            <span>Collection</span>
          </button>
        </nav>

        {/* Twitter CTA Button */}
        <div className="flex items-center gap-2">
          <a
            id="header-twitter-button"
            href="https://x.com/moolieshq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-950 font-cartoon text-xs font-bold shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <XIcon className="w-3.5 h-3.5 text-black" />
            <span>@moolieshq</span>
          </a>
        </div>
      </div>
    </header>
  );
};
