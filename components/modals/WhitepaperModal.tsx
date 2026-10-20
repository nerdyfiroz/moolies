"use client";

import React, { useState } from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { FileText, ShieldCheck, CheckCircle2 } from "lucide-react";

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitelist?: () => void;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitelist,
}) => {
  const [activeSection, setActiveSection] = useState<number>(0);

  const sections = [
    {
      id: "executive-summary",
      title: "1. Executive Summary & Vision",
      content: (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <strong>Moolies</strong> is a generative digital art ecosystem featuring 2,000 unique Moolies adventurers living in a decentralized, community-governed realm on Ethereum. Beyond visual aesthetics, Moolies pioneers sustainable NFT tokenomics, gas-minimized ERC-721A architecture, and non-custodial soft-staking (&quot;Nesting&quot;).
          </p>
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white">Core Principle:</span> Community first. 100% fair launch, zero predatory token mechanics, and immutable ownership recorded on Ethereum Mainnet.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "contract-architecture",
      title: "2. Smart Contract & ERC-721A Standard",
      content: (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Minting multiple NFTs simultaneously historically caused exorbitant Ethereum gas fees. Moolies utilizes the battle-tested <strong>ERC-721A standard</strong> originally created by the Azuki team.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Sequential Minting:</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Batch minting 5 Moolies costs essentially the same gas as minting a single NFT.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-sky-600 dark:text-sky-400">On-Chain Metadata:</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Provenance hashes and IPFS hash hashes are frozen permanently prior to reveal.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "nesting-utility",
      title: "3. Soft-Staking 'Nesting' Protocol",
      content: (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Traditional staking requires transferring your NFT into a third-party custodial smart contract, exposing collectors to smart contract vulnerabilities.
          </p>
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-300 dark:border-emerald-700/60 text-xs sm:text-sm space-y-2">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">How Moolies Nesting Works:</span>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 pl-4 list-disc text-xs">
              <li><strong>Zero Custody Loss:</strong> Your Moolie never leaves your cold wallet or hardware device.</li>
              <li><strong>Zero Gas Staking:</strong> Simply hold your Moolie in your wallet; nesting begins automatically from your acquisition block.</li>
              <li><strong>Tiered Multipliers:</strong> Moolies nested continuously for 30, 60, and 90 days unlock upgraded physical merch eligibility and exclusive Discord roles.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "nest-dao",
      title: "4. Nest DAO Governance & Treasury",
      content: (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            20% of secondary sale royalties and a dedicated 15 ETH genesis reserve are allocated to the <strong>Nest DAO Treasury</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-300/40 text-center">
              <p className="font-black text-amber-600 dark:text-amber-400 text-base">1 Moolie = 1 Vote</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Snapshot weighted</p>
            </div>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-300/40 text-center">
              <p className="font-black text-sky-600 dark:text-sky-400 text-base">Art Grants</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Funding creators</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-300/40 text-center">
              <p className="font-black text-purple-600 dark:text-purple-400 text-base">IP Licensing</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Commercial ventures</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="Moolies Whitepaper"
      subtitle="Ecosystem Architecture, ERC-721A & Staking Economics"
      icon={<FileText className="w-6 h-6 text-blue-500" />}
      badge="v1.2 Official"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
          {sections.map((sec, idx) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === idx
                  ? "bg-amber-400 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">
            {sections[activeSection].title}
          </h3>
          {sections[activeSection].content}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Audited & verified by the Moolies Technical Council</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenWhitelist && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenWhitelist();
                }}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Apply for Whitelist &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </WorldModal>
  );
};
