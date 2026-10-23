"use client";

import React from "react";
import { motion } from "framer-motion";
import { MooliesHeader } from "./MooliesHeader";
import { TwitterBanner, XIcon } from "./TwitterBanner";
import { WhitelistSection } from "./WhitelistSection";
import { CollectionDetailsSection } from "./CollectionDetailsSection";

export const MooliesSite: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#D3A0F7] text-slate-900 flex flex-col selection:bg-purple-900 selection:text-white">
      {/* 1. Header Navigation */}
      <MooliesHeader />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6 py-6 sm:py-10 space-y-12 sm:space-y-16">
        {/* Hero Title & Description */}
        <div className="w-full max-w-4xl mx-auto text-center space-y-4 pt-2 sm:pt-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-drip text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide leading-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_4px_0_#1a052b] drop-shadow-[0_8px_20px_rgba(26,5,43,0.35)]"
          >
            Moolies
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-cartoon text-base sm:text-lg text-slate-900/90 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            A cozy, whimsical PFP collection of 2,000 lovable adventurers tokenized on Ethereum with fair launch tokenomics and non-custodial Nesting.
          </motion.p>
        </div>

        {/* 2. Twitter Showcase Section */}
        <TwitterBanner />

        {/* 3. Whitelist Application Section */}
        <WhitelistSection isWhitelistOpen={true} />

        {/* 4. Collection Details Section */}
        <CollectionDetailsSection />
      </main>

      {/* 5. Minimal Clean Footer */}
      <footer className="w-full border-t border-purple-900/15 py-8 px-4 text-center space-y-3 mt-12 bg-purple-950/5">
        <div className="flex items-center justify-center gap-4">
          <a
            id="footer-twitter-link"
            href="https://x.com/moolieshq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/90 text-white hover:bg-slate-900 font-cartoon text-xs font-bold transition-all shadow-sm"
          >
            <XIcon className="w-3.5 h-3.5 text-white" />
            <span>Follow @moolieshq</span>
          </a>
        </div>
        <p className="font-cartoon text-xs text-slate-800/80 font-medium">
          Moolies &copy; {new Date().getFullYear()} &bull; 2,000 PFP NFTs on Ethereum. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
