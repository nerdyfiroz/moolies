"use client";

import React from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { Sparkles, ExternalLink, ShieldCheck, MessageSquare, Feather, Award } from "lucide-react";
import Image from "next/image";

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitelist?: () => void;
  onOpenExplorer?: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitelist,
  onOpenExplorer,
}) => {
  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="The Moolies Realm"
      subtitle="Genesis Owl Collection & Metaverse Ecosystem"
      icon={<Sparkles className="w-6 h-6 text-amber-500" />}
      badge="Genesis 2,000"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Sky banner with kite badge */}
        <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-r from-sky-400 via-sky-300 to-amber-200 text-slate-900 shadow-md">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-bold text-sky-900 mb-2">
              <Feather className="w-3.5 h-3.5 text-amber-600" />
              Handcrafted Generative Art
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome to the Sunny Valley of Moolies
            </h3>
            <p className="text-sm sm:text-base text-slate-800 mt-2 leading-relaxed">
              Where 2,000 whimsical owls drink boba, read ancient lore by the lake, fly cat-kites, and build the future of decentralized storytelling together.
            </p>
          </div>
          <div className="absolute right-4 bottom-2 opacity-30 sm:opacity-50 pointer-events-none">
            <Sparkles className="w-36 h-36 text-white" />
          </div>
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800/60 border border-amber-200/70 dark:border-slate-700 text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Supply</p>
            <p className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">2,000</p>
            <p className="text-[10px] text-slate-400">Strictly Capped</p>
          </div>
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-slate-800/60 border border-sky-200/70 dark:border-slate-700 text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Network</p>
            <p className="text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-400 mt-1">Ethereum</p>
            <p className="text-[10px] text-slate-400">ERC-721A Low Gas</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-800/60 border border-emerald-200/70 dark:border-slate-700 text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Whitelist Price</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">0.025 ETH</p>
            <p className="text-[10px] text-slate-400">Max 2 per wallet</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-slate-800/60 border border-purple-200/70 dark:border-slate-700 text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Public Price</p>
            <p className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">0.040 ETH</p>
            <p className="text-[10px] text-slate-400">Fair Community Mint</p>
          </div>
        </div>

        {/* Project Vision & Utility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
              <Award className="w-5 h-5" />
              <h4>Holder Utility & Benefits</h4>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Nest DAO Voting:</strong> Community treasury governance on art grants and lore directions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Soft-Staking 'Nesting':</strong> Earn rewards without giving up wallet custody or risking assets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Commercial Rights:</strong> Complete non-exclusive IP commercialization rights.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Physical Collectors Drop:</strong> Custom plushies & enamel pins exclusively for Genesis holders.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold">
              <ShieldCheck className="w-5 h-5" />
              <h4>Security & Transparency</h4>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <span><strong>No Gas Wars:</strong> Dedicated whitelist minting window spanning 48 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <span><strong>ERC-721A Standard:</strong> Batch mint multiple owls for the gas price of a single mint.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <span><strong>Decentralized IPFS Storage:</strong> Permanent metadata pinned across redundant IPFS gateways.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <span><strong>Verified Smart Contract:</strong> Audited open-source code on Etherscan.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Collection Artwork Preview */}
        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-200/50 dark:border-amber-400/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Artwork & Traits Preview</span>
            </h4>
            {onOpenExplorer && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenExplorer();
                }}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 flex items-center gap-1 hover:underline"
              >
                Open Full Treehouse Explorer &rarr;
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[1, 2, 42, 77, 128, 256].map((id) => (
              <div
                key={id}
                className="aspect-square rounded-xl overflow-hidden relative border border-amber-200/60 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm group"
              >
                <Image
                  src="/moolies-world.png"
                  alt={`Moolie preview #${id}`}
                  fill
                  sizes="160px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900/80 text-white">
                  #{id}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Links & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="https://x.com/moolieshq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-sm transition-colors"
            >
              <TwitterIcon className="w-4 h-4 text-sky-400" />
              Follow on X
            </a>
            <a
              href="https://discord.gg/moolies"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-indigo-200" />
              Discord
            </a>
            <a
              href="https://opensea.io/collection/moolies-official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              OpenSea
            </a>
          </div>

          {onOpenWhitelist && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWhitelist();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Apply for Whitelist Slot &rarr;
            </button>
          )}
        </div>
      </div>
    </WorldModal>
  );
};
