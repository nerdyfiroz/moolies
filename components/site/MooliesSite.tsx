"use client";

import React from "react";
import Image from "next/image";
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
        {/* Hero Welcome Header */}
        <div className="w-full max-w-4xl mx-auto text-center space-y-3 pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-950/85 text-purple-200 border border-purple-400/40 text-xs font-cartoon font-bold shadow-md"
          >
            <span>Welcome to the Official Moolies Realm</span>
          </motion.div>

          {/* Owl Character Mascot Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex justify-center pt-1"
          >
            <div className="relative w-32 h-26 sm:w-40 sm:h-32">
              <Image
                src="/moolies-logo.png"
                alt="Moolies Owl Mascot"
                fill
                priority
                className="object-contain filter drop-shadow-[0_12px_24px_rgba(46,16,101,0.25)] hover:scale-105 transition-transform"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-drip text-6xl sm:text-7xl md:text-8xl tracking-wide leading-tight bg-gradient-to-b from-[#fce7f3] via-[#d946ef] to-[#7e22ce] bg-clip-text text-transparent drop-shadow-[0_3px_0_#1a052b] drop-shadow-[0_8px_20px_rgba(147,51,234,0.4)]"
          >
            Moolies
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
