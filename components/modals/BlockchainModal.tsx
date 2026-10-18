"use client";

import React, { useState } from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { Waves, Copy, Check, ExternalLink, ShieldCheck, Cpu, Code2 } from "lucide-react";

interface BlockchainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlockchainModal: React.FC<BlockchainModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="The Waters of Ethereum"
      subtitle="Decentralized Smart Contract Architecture"
      icon={<Waves className="w-6 h-6 text-cyan-500" />}
      badge="Verified Contract"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Lake Introduction */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-teal-500/10 border-2 border-cyan-300 dark:border-cyan-700/60 text-slate-800 dark:text-slate-200">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm mb-1">
            <ShieldCheck className="w-5 h-5" />
            <span>Audited & Verified on Ethereum</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The Moolies smart contract incorporates the <strong>Azuki ERC-721A</strong> gas-saving standard, reducing sequential batch minting costs by over 70% compared to standard ERC-721 contracts.
          </p>
        </div>

        {/* Contract Address Card */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Verified Contract Address</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Mainnet & Sepolia
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-800 border border-slate-700">
            <code className="text-xs sm:text-sm font-mono text-cyan-300 truncate">
              {contractAddress}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Cpu className="w-3.5 h-3.5 text-cyan-500" />
              Token Standard
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">ERC-721A</p>
            <p className="text-[10px] text-slate-500">Batch Minting Optimized</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Code2 className="w-3.5 h-3.5 text-cyan-500" />
              Metadata Storage
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">IPFS & Arweave</p>
            <p className="text-[10px] text-slate-500">Permanent Decentralized</p>
          </div>
        </div>

        {/* Explorer Link */}
        <div className="pt-2 flex justify-end">
          <a
            href={`https://etherscan.io/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>View Verified Contract on Etherscan</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </WorldModal>
  );
};
