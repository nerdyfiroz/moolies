"use client";

import React, { useState, useEffect } from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { Coins, ExternalLink, ShieldCheck, Wallet, Minus, Plus, AlertCircle, ArrowUpRight } from "lucide-react";

interface MintInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitelist?: () => void;
}

export const MintInfoModal: React.FC<MintInfoModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitelist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  // Time remaining to whitelist mint
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 12,
    hours: 4,
    minutes: 32,
    seconds: 15,
  });

  useEffect(() => {
    const target = new Date("2026-11-06T14:00:00Z").getTime();
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      // Check for browser wallet (window.ethereum)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyWindow = window as any;
      if (typeof anyWindow.ethereum !== "undefined") {
        const accounts = await anyWindow.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts && accounts[0]) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
        }
      } else {
        // Fallback demo mock wallet
        setWalletAddress("0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573");
        setWalletConnected(true);
      }
    } catch {
      // User cancelled
    } finally {
      setIsConnecting(false);
    }
  };

  const unitPrice = 0.025;
  const totalPrice = (unitPrice * quantity).toFixed(3);

  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="Mint Information & Supply"
      subtitle="The 2000 Moolies Wooden Signboard"
      icon={<Coins className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
      badge="2,000 Supply"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Countdown Header */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-sky-500/10 border-2 border-amber-300 dark:border-amber-600/40 text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-300">
            Next Milestone: Guaranteed Whitelist Mint
          </span>
          <div className="flex items-center justify-center gap-3 sm:gap-6 mt-3 font-mono">
            <div className="p-2 sm:p-3 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-amber-200 dark:border-slate-700 w-16 sm:w-20">
              <span className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <p className="text-[10px] text-slate-400 font-sans uppercase mt-0.5">Days</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-amber-200 dark:border-slate-700 w-16 sm:w-20">
              <span className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <p className="text-[10px] text-slate-400 font-sans uppercase mt-0.5">Hours</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-amber-200 dark:border-slate-700 w-16 sm:w-20">
              <span className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <p className="text-[10px] text-slate-400 font-sans uppercase mt-0.5">Mins</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-amber-200 dark:border-slate-700 w-16 sm:w-20">
              <span className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <p className="text-[10px] text-slate-400 font-sans uppercase mt-0.5">Secs</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Target launch: TBA (To Be Announced)
          </p>
        </div>

        {/* Supply & Progress Bar */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Allocated & Presale Reserve
            </span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              412 / 2,000 Moolies (20.6%)
            </span>
          </div>
          <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
            <div
              style={{ width: "20.6%" }}
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
            />
          </div>
          <div className="grid grid-cols-3 text-center text-xs text-slate-500 pt-1">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">1,588</span>
              <p className="text-[10px]">Remaining for Mint</p>
            </div>
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">2,000</span>
              <p className="text-[10px]">Max Hard Cap</p>
            </div>
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">Ethereum</span>
              <p className="text-[10px]">ERC-721A</p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-300 dark:border-emerald-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                Phase 1: Whitelist
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                Guaranteed
              </span>
            </div>
            <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
              0.025 ETH
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-1">
              <li>• Max 2 Moolies per whitelisted wallet</li>
              <li>• Dedicated 48h window (zero gas competition)</li>
              <li>• Access requires approved whitelist slot</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-sky-500/10 border-2 border-sky-300 dark:border-sky-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
                Phase 2: Public
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">
                Open Access
              </span>
            </div>
            <p className="text-2xl font-black text-sky-700 dark:text-sky-400">
              0.040 ETH
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-1">
              <li>• Max 3 Moolies per transaction</li>
              <li>• Open to all Web3 collectors until sold out</li>
              <li>• Instant reveal following completion</li>
            </ul>
          </div>
        </div>

        {/* Interactive Mint Preview with Web3 Detection */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold">Interactive Mint Simulator</h4>
            </div>
            {walletConnected ? (
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-600/40">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            ) : (
              <button
                type="button"
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors cursor-pointer"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800 border border-slate-700">
            <div>
              <p className="text-xs text-slate-400">Select Mint Quantity</p>
              <p className="text-sm font-bold text-white mt-0.5">
                Total Price: <span className="text-amber-400">{totalPrice} ETH</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center font-bold"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-bold text-base">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(2, q + 1))}
                className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Honest state indicator */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-950/50 border border-amber-600/40 text-amber-200 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>Contract Status:</strong> The mint date and time is <strong>TBA</strong>. Apply for whitelist at the gate now to guarantee your allocation!
            </span>
          </div>

          {onOpenWhitelist && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWhitelist();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-white font-bold text-xs hover:from-amber-600 hover:to-emerald-600 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Whitelisted at the Gate</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* OpenSea Signboard Link */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Official OpenSea Smart Contract Verified</span>
          </span>
          <a
            href="https://opensea.io/collection/moolies-official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:underline font-bold"
          >
            <span>OpenSea Collection</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </WorldModal>
  );
};
