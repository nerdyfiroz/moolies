"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";

export const CollectionDetailsSection: React.FC = () => {
  const stats = [
    {
      label: "Total Supply",
      value: "2,000",
      sub: "Strictly Capped",
      color: "from-fuchsia-300 to-purple-300",
    },
    {
      label: "Whitelist Price",
      value: "TBA",
      sub: "Phase 1 Guaranteed",
      color: "from-purple-300 to-indigo-300",
    },
    {
      label: "Public Price",
      value: "TBA",
      sub: "Phase 2 Public Sale",
      color: "from-sky-300 to-cyan-300",
    },
    {
      label: "Smart Contract",
      value: "ERC-721A",
      sub: "Ultra Low Gas Batch",
      color: "from-pink-300 to-purple-300",
    },
  ];

  return (
    <section id="collection-details" className="w-full max-w-4xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bubble moolies-bubble-badge text-xs font-black uppercase tracking-wider">
          <Coins className="w-3.5 h-3.5 text-purple-300" />
          <span>PFP Supply &amp; Economics</span>
        </div>
        <h2 className="font-cooper text-3xl sm:text-4xl text-slate-950 tracking-wide drop-shadow-sm">
          Collection Details
        </h2>
        <p className="font-cartoon text-sm text-slate-800/90 max-w-lg mx-auto font-medium">
          Moolies is a strictly capped generative PFP collection of 2,000 lovable adventurers on Ethereum.
        </p>
      </div>

      {/* Main Glassmorphic Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-purple-400/40 p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(46,16,101,0.25),0_0_35px_rgba(168,85,247,0.2)]">
        {/* Glow ambient spots */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* 4 Key Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.3 }}
              className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center shadow-lg hover:border-purple-400/60 transition-all hover:-translate-y-0.5"
            >
              <p className="font-moolies text-[11px] uppercase font-bold text-purple-300/80 tracking-wider">
                {stat.label}
              </p>
              <p
                className={`font-moolies text-2xl sm:text-3xl font-black mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent drop-shadow-sm`}
              >
                {stat.value}
              </p>
              <p className="text-[10px] text-purple-200/70 font-medium mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
