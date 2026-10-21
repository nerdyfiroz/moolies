"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, VolumeX, ArrowRight } from "lucide-react";

interface MooliesGatewayLoaderProps {
  onEnter: () => void;
}

/* ─────────────────────────────────────────────────────────────
   Web Audio Synthesizer: Whimsical Harmonic Chime & Portal Warp
   Dreamy pentatonic chord + windchime sparkles + warm whoosh
   ───────────────────────────────────────────────────────────── */
function playMooliesEntranceAudio() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();
    const t0 = ctx.currentTime;

    // 1. Warm Whimsical Chord (Major 9th: C4, E4, G4, B4, D5)
    const chordFreqs = [261.63, 329.63, 392.0, 493.88, 587.33];
    chordFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, t0 + idx * 0.05);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, t0);
      filter.frequency.exponentialRampToValueAtTime(400, t0 + 1.8);

      gain.gain.setValueAtTime(0.001, t0 + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.12, t0 + idx * 0.05 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t0 + idx * 0.05);
      osc.stop(t0 + 2.3);
    });

    // 2. Pentatonic Starlight Chimes
    const chimeFreqs = [1046.5, 1174.66, 1318.51, 1567.98, 1760.0, 2093.0];
    chimeFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = 0.35 + i * 0.08;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t0 + delay);

      gain.gain.setValueAtTime(0.001, t0 + delay);
      gain.gain.linearRampToValueAtTime(0.08, t0 + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t0 + delay);
      osc.stop(t0 + delay + 0.85);
    });

    // 3. Resonant Dimensional Whoosh
    const whooshTime = t0 + 0.15;
    const noiseOsc = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();

    noiseOsc.type = "sawtooth";
    noiseOsc.frequency.setValueAtTime(60, whooshTime);
    noiseOsc.frequency.exponentialRampToValueAtTime(280, whooshTime + 0.9);

    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(250, whooshTime);
    noiseFilter.frequency.exponentialRampToValueAtTime(1400, whooshTime + 0.8);
    noiseFilter.Q.setValueAtTime(2.2, whooshTime);

    noiseGain.gain.setValueAtTime(0.001, whooshTime);
    noiseGain.gain.linearRampToValueAtTime(0.18, whooshTime + 0.3);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, whooshTime + 1.2);

    noiseOsc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseOsc.start(whooshTime);
    noiseOsc.stop(whooshTime + 1.3);
  } catch {
    // AudioContext blocked or not supported - silently ignore
  }
}

// Lore status messages cycled during loading
const LOADING_STATUS_MESSAGES = [
  "Awakening the sunlit meadow & lake...",
  "Tuning the sky breeze for Pip's cat-kite...",
  "Warming up the cozy treehouse lanterns...",
  "Synthesizing 2,000 Genesis Moolies traits...",
  "Entering Moolies Realm...",
];

export const MooliesGatewayLoader: React.FC<MooliesGatewayLoaderProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const hasTriggeredRef = useRef(false);

  // Smooth preloader progress
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // 2.0s clean load

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min((elapsed / duration) * 100, 100);

      const bounded = Math.min(Math.round(rawPct), 100);
      setProgress(bounded);

      const messageStep = Math.min(
        Math.floor((bounded / 100) * LOADING_STATUS_MESSAGES.length),
        LOADING_STATUS_MESSAGES.length - 1
      );
      setStatusIdx(messageStep);

      if (bounded >= 100) {
        clearInterval(timer);
        setIsReady(true);
      }
    }, 35);

    return () => clearInterval(timer);
  }, []);

  // Enter realm trigger
  const handleEnterRealm = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    if (soundEnabled) {
      playMooliesEntranceAudio();
    }

    setIsWarping(true);

    setTimeout(() => {
      onEnter();
    }, 700);
  }, [soundEnabled, onEnter]);

  // Keyboard shortcut: Space or Enter to enter realm
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.code === "Enter") && isReady && !isWarping) {
        e.preventDefault();
        handleEnterRealm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReady, isWarping, handleEnterRealm]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isWarping ? 0 : 1, scale: isWarping ? 1.05 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #1a0d33 0%, #100824 50%, #080314 85%, #04010a 100%)",
      }}
    >
      {/* Soft Ambient Aurora Glow (Subtle & Clean) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Top Header Row (Brand Pill & Sound Toggle) */}
      <header className="absolute top-0 inset-x-0 p-5 sm:p-7 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-cooper text-xs font-bold tracking-wider text-purple-200">
            MOOLIES REALM
          </span>
          <span className="text-[10px] text-purple-300/60 font-mono hidden sm:inline">
            // 2,000 GENESIS
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-purple-200 hover:text-white transition-all text-xs font-mono backdrop-blur-md cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px] hidden sm:inline">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] hidden sm:inline text-slate-400">MUTED</span>
              </>
            )}
          </button>

          {isReady && (
            <button
              type="button"
              onClick={handleEnterRealm}
              className="px-3.5 py-1.5 rounded-full bg-purple-500/20 hover:bg-purple-500/35 border border-purple-400/40 text-purple-200 hover:text-white transition-all text-xs font-semibold backdrop-blur-md cursor-pointer flex items-center gap-1.5 group"
            >
              <span>Skip</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </header>

      {/* Main Centerpiece: Clean, Simple & Whimsical */}
      <main className="relative z-20 flex flex-col items-center justify-center max-w-sm w-full px-6 text-center">
        {/* Cute Floating Mascot Icon */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 mb-5 flex items-center justify-center"
        >
          {/* Subtle Outer Pulse Glow */}
          <div className="absolute inset-0 rounded-full bg-purple-500/25 blur-xl animate-pulse" />

          {/* Clean Glass Avatar Disc */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-purple-900/60 via-purple-700/40 to-indigo-800/60 border-2 border-purple-400/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.35)] overflow-hidden">
            {/* Soft inner meadow vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-purple-500/10 to-purple-950/60" />

            {/* Signature Moolies Beanie Mascot SVG */}
            <svg
              viewBox="0 0 64 64"
              className="w-18 h-18 sm:w-20 sm:h-20 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            >
              {/* Mascot Head Base */}
              <ellipse cx="32" cy="38" rx="20" ry="18" fill="#F3E8FF" stroke="#581C87" strokeWidth="2.5" />
              {/* Cute Cheeks */}
              <ellipse cx="20" cy="41" rx="3.5" ry="2" fill="#F472B6" opacity="0.8" />
              <ellipse cx="44" cy="41" rx="3.5" ry="2" fill="#F472B6" opacity="0.8" />
              {/* Big Curious Eyes */}
              <circle cx="24" cy="36" r="3.8" fill="#1E1B4B" />
              <circle cx="25.2" cy="35" r="1.3" fill="#FFFFFF" />
              <circle cx="40" cy="36" r="3.8" fill="#1E1B4B" />
              <circle cx="41.2" cy="35" r="1.3" fill="#FFFFFF" />
              {/* Golden Beak */}
              <path d="M 29 40 Q 32 44, 35 40 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
              {/* Signature Purple Slouchy Knit Beanie */}
              <path
                d="M 14 30 C 14 18, 50 18, 50 30 C 47 34, 17 34, 14 30 Z"
                fill="#9333EA"
                stroke="#581C87"
                strokeWidth="2.5"
              />
              {/* Beanie Knit Fold Ribbing */}
              <rect x="13" y="27" width="38" height="6.5" rx="3" fill="#A855F7" stroke="#581C87" strokeWidth="1.8" />
              {/* Fluffy Beanie Pom-Pom on top */}
              <circle cx="32" cy="17" r="5.5" fill="#C084FC" stroke="#581C87" strokeWidth="1.8" />
            </svg>
          </div>
        </motion.div>

        {/* Brand Headline */}
        <h1
          className="font-cooper text-3xl sm:text-4xl font-black tracking-wide mb-2 moolies-cooper-brand"
          style={{
            fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
          }}
        >
          MOOLIES WORLD
        </h1>

        {/* Dynamic cycling status message */}
        <div className="h-6 flex items-center justify-center mb-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="font-cartoon text-xs sm:text-sm text-purple-200/85 font-medium tracking-wide flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{LOADING_STATUS_MESSAGES[statusIdx]}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Simple & Clean Progress Bar */}
        <div className="w-full space-y-3">
          <div className="relative p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-inner">
            <motion.div
              className="h-2 rounded-full relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #facc15 85%, #38bdf8 100%)",
                width: `${progress}%`,
                boxShadow: "0 0 12px rgba(236, 72, 153, 0.5)",
              }}
              transition={{ ease: "easeOut", duration: 0.08 }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-purple-300/70 px-1">
            <span>READYING WORLD</span>
            <span className="font-bold text-amber-300 tracking-wider">{progress}%</span>
          </div>

          {/* Action Button: Revealed when ready */}
          <div className="pt-2 min-h-[54px] flex items-center justify-center">
            {isReady ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.95, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEnterRealm}
                className="relative group w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white font-cooper text-sm sm:text-base font-black tracking-wider shadow-[0_6px_25px_rgba(168,85,247,0.45)] border border-purple-300/40 cursor-pointer overflow-hidden flex items-center justify-center gap-2 transition-all"
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
                <span>ENTER MOOLIES WORLD</span>
                <ArrowRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ) : (
              <div className="text-[11px] font-mono text-purple-300/50 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <span>Connecting to illustrated realm...</span>
              </div>
            )}
          </div>

          {isReady && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-[11px] text-purple-300/60 font-sans tracking-wide"
            >
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] border border-white/20">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] border border-white/20">Enter</kbd> to unlock
            </motion.p>
          )}
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="absolute bottom-5 inset-x-0 text-center pointer-events-none z-20">
        <p className="text-[10px] sm:text-xs font-mono text-purple-300/40 uppercase tracking-widest">
          Ethereum Mainnet • Handcrafted Vector Ecosystem
        </p>
      </footer>
    </motion.div>
  );
};
