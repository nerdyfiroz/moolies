"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, VolumeX, ArrowRight, Compass } from "lucide-react";

interface MooliesGatewayLoaderProps {
  onEnter: () => void;
}

/* ─────────────────────────────────────────────────────────────
   Web Audio Synthesizer: Whimsical Harmonic Chime & Portal Warp
   Lush, dreamy pentatonic chord + windchime sparkles + warm whoosh
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

    // 2. Pentatonic Starlight Chimes (sparkling high cascade)
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
  "Brewing brown sugar boba & lavender tea...",
  "Tuning the sky breeze for Pip's cat-kite...",
  "Warming up the cozy treehouse lanterns...",
  "Synthesizing 2,000 Genesis Moolies traits...",
  "Synchronizing Soft-Staking Nest DAO protocol...",
  "Dimensional Gateway open. Ready to enter!",
];

// Interactive floating butterflies
interface ButterflyParticle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  color: string;
  delay: number;
  size: number;
}

const BUTTERFLIES: ButterflyParticle[] = [
  { id: 1, startX: -140, startY: -60, targetX: -260, targetY: -220, color: "#C084FC", delay: 0.1, size: 24 },
  { id: 2, startX: 130, startY: -90, targetX: 280, targetY: -260, color: "#38BDF8", delay: 0.25, size: 22 },
  { id: 3, startX: -160, startY: 80, targetX: -320, targetY: 180, color: "#F472B6", delay: 0.4, size: 20 },
  { id: 4, startX: 150, startY: 70, targetX: 300, targetY: 210, color: "#FBBF24", delay: 0.2, size: 22 },
  { id: 5, startX: -90, startY: -150, targetX: -180, targetY: -320, color: "#34D399", delay: 0.3, size: 18 },
  { id: 6, startX: 100, startY: -160, targetX: 220, targetY: -340, color: "#E879F9", delay: 0.15, size: 20 },
  { id: 7, startX: 0, startY: 170, targetX: 40, targetY: 340, color: "#60A5FA", delay: 0.5, size: 24 },
];

export const MooliesGatewayLoader: React.FC<MooliesGatewayLoaderProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const hasTriggeredRef = useRef(false);

  // Parallax tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  // Simulated smooth preloader progress
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400; // 2.4s smooth load

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min((elapsed / duration) * 100, 100);

      // Easing curve for realistic loading feel
      const easedPct = Math.round(
        rawPct < 70
          ? rawPct * 1.05
          : 70 + (rawPct - 70) * (30 / 30)
      );

      const bounded = Math.min(Math.max(easedPct, 0), 100);
      setProgress(bounded);

      // Cycle status message based on progress
      const messageStep = Math.min(
        Math.floor((bounded / 100) * LOADING_STATUS_MESSAGES.length),
        LOADING_STATUS_MESSAGES.length - 1
      );
      setStatusIdx(messageStep);

      if (bounded >= 100) {
        clearInterval(timer);
        setIsReady(true);
      }
    }, 45);

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

    // Smooth warp reveal duration matches the Iris animation
    setTimeout(() => {
      onEnter();
    }, 1100);
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
      animate={{ opacity: isWarping ? 0 : 1 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#0a0518]"
      style={{
        background:
          "radial-gradient(circle at 50% 45%, #1f103d 0%, #110826 45%, #080312 85%, #04010a 100%)",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. AMBIENT CELESTIAL CANVAS & STARLIGHT FIELD
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Luminous Nebula Aurora Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.55, 0.35],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/30 via-fuchsia-600/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tl from-cyan-600/25 via-indigo-600/20 to-transparent blur-3xl"
        />

        {/* Floating Twinkling Stars */}
        {Array.from({ length: 42 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 2.2 + (i % 5) * 0.7,
              repeat: Infinity,
              delay: (i % 10) * 0.3,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: `${(i * 19) % 100}%`,
              left: `${(i * 23 + 7) % 100}%`,
              width: i % 3 === 0 ? "3px" : "2px",
              height: i % 3 === 0 ? "3px" : "2px",
              backgroundColor: i % 2 === 0 ? "#E9D5FF" : "#FDE047",
              borderRadius: "50%",
              boxShadow: i % 4 === 0 ? "0 0 8px #C084FC" : "none",
            }}
          />
        ))}

        {/* Soft Dreamy Floating Clouds */}
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-80 h-32 bg-white/[0.03] rounded-full blur-2xl pointer-events-none"
        />
        <motion.div
          animate={{ x: ["10%", "-10%", "10%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-36 bg-cyan-400/[0.03] rounded-full blur-2xl pointer-events-none"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TOP UTILITY BAR (Brand Pill, Sound Toggle, Quick Skip)
          ───────────────────────────────────────────────────────────── */}
      <header className="absolute top-0 inset-x-0 p-5 sm:p-7 flex items-center justify-between z-30 pointer-events-auto">
        {/* Realm Header Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-cooper text-xs font-bold tracking-wider text-purple-200">
            MOOLIES REALM
          </span>
          <span className="text-[10px] text-purple-300/60 font-mono hidden sm:inline">
            // PFP COLLECTION
          </span>
        </div>

        {/* Right Controls: Sound & Quick Skip */}
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

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CENTERPIECE: THE LUMINOUS DIMENSIONAL PORTAL
          ───────────────────────────────────────────────────────────── */}
      <main
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
          transition: "transform 0.15s ease-out",
        }}
        className="relative z-20 flex flex-col items-center justify-center max-w-lg w-full px-6 text-center"
      >
        {/* Shockwave Glow Behind Portal */}
        <motion.div
          animate={{
            scale: isWarping ? [1, 4] : isReady ? [1, 1.12, 1] : [0.95, 1.05, 0.95],
            opacity: isWarping ? [0.6, 1, 0] : [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: isWarping ? 0.9 : 3.5,
            repeat: isWarping ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(217,70,239,0.2) 40%, rgba(56,189,248,0.1) 70%, transparent 100%)",
            filter: "blur(24px)",
          }}
        />

        {/* Portal Portal Ring Construction */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-6">
          {/* Outer Celestial Glyph Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-purple-400/35 pointer-events-none"
            style={{
              boxShadow: "0 0 25px rgba(168, 85, 247, 0.25), inset 0 0 20px rgba(192, 132, 252, 0.15)",
            }}
          >
            {/* Tiny Orbiting Runes */}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[10px] text-amber-300">✦</span>
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 text-[10px] text-cyan-300">✧</span>
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] text-fuchsia-300">✦</span>
            <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 text-[10px] text-emerald-300">✧</span>
          </motion.div>

          {/* Counter-rotating Prismatic Accent Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border border-purple-300/20 pointer-events-none"
          />

          {/* Glowing Glass Portal Iris Center */}
          <motion.div
            animate={
              isWarping
                ? { scale: [1, 16], opacity: [1, 0] }
                : { scale: [1, 1.03, 1] }
            }
            transition={
              isWarping
                ? { duration: 1.0, ease: "easeInOut" }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-amber-400 shadow-[0_0_40px_rgba(168,85,247,0.5)] flex items-center justify-center cursor-pointer group"
            onClick={isReady ? handleEnterRealm : undefined}
          >
            {/* Inner Portal Window with sunny Moolies world vignette */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#5fc2ea] via-[#7ed4f5] to-[#99e0fb] border-2 border-white/50 flex flex-col items-center justify-center shadow-inner">
              {/* Mini meadow artwork scenery inside the portal */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400/90 via-sky-300/80 to-amber-100/90" />

              {/* Distant rolling green hills silhouette */}
              <svg
                viewBox="0 0 100 60"
                className="absolute -bottom-1 inset-x-0 w-full h-18 text-emerald-500/80 fill-current pointer-events-none"
                preserveAspectRatio="none"
              >
                <path d="M0 45 Q 25 30, 50 42 T 100 35 L 100 60 L 0 60 Z" />
                <path d="M0 50 Q 35 38, 70 48 T 100 45 L 100 60 L 0 60 Z" fill="#22c55e" opacity="0.9" />
              </svg>

              {/* The Moolies Beanie & Cat-Kite Portal Mascot Icon */}
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                  rotate: [-2, 2, -2],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Stylized Beanie & Mascot SVG */}
                <svg
                  viewBox="0 0 64 64"
                  className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
                >
                  {/* Purple Boba / Mascot Head Base */}
                  <ellipse cx="32" cy="38" rx="20" ry="18" fill="#F3E8FF" stroke="#581C87" strokeWidth="2.5" />
                  {/* Cute Cheeks */}
                  <ellipse cx="20" cy="41" rx="3.5" ry="2" fill="#F472B6" opacity="0.75" />
                  <ellipse cx="44" cy="41" rx="3.5" ry="2" fill="#F472B6" opacity="0.75" />
                  {/* Big Curious Eyes */}
                  <circle cx="24" cy="36" r="3.8" fill="#1E1B4B" />
                  <circle cx="25.2" cy="35" r="1.3" fill="#FFFFFF" />
                  <circle cx="40" cy="36" r="3.8" fill="#1E1B4B" />
                  <circle cx="41.2" cy="35" r="1.3" fill="#FFFFFF" />
                  {/* Golden Beak / Happy Smile */}
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

                {/* Flying Cat-Kite Mini Silhouette in sky */}
                <motion.div
                  animate={{
                    x: [-6, 6, -6],
                    y: [-4, 2, -4],
                    rotate: [-8, 8, -8],
                  }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 -right-4 w-6 h-6 text-fuchsia-600 pointer-events-none"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12,2 22,12 12,22 2,12" fill="#F43F5E" />
                    <line x1="12" y1="2" x2="12" y2="22" stroke="#BE123C" strokeWidth="1.5" />
                    <line x1="2" y1="12" x2="22" y2="12" stroke="#BE123C" strokeWidth="1.5" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Shimmer Light Reflection Sweep Across Glass */}
              <motion.div
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Interactive Floating Butterflies around Portal */}
          {BUTTERFLIES.map((bf) => (
            <motion.div
              key={bf.id}
              initial={{ x: bf.startX, y: bf.startY, opacity: 0.8 }}
              animate={
                isWarping
                  ? {
                      x: bf.targetX * 2.2,
                      y: bf.targetY * 2.2,
                      scale: [1, 2, 0],
                      opacity: [1, 1, 0],
                    }
                  : {
                      x: [bf.startX, bf.startX + 14, bf.startX - 10, bf.startX],
                      y: [bf.startY, bf.startY - 16, bf.startY + 12, bf.startY],
                      rotate: [-12, 18, -8, -12],
                    }
              }
              transition={
                isWarping
                  ? { duration: 0.9, ease: "easeOut" }
                  : { duration: 4 + (bf.id % 3), repeat: Infinity, ease: "easeInOut", delay: bf.delay }
              }
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                color: bf.color,
                pointerEvents: "none",
              }}
            >
              {/* Fluttering Butterfly SVG */}
              <motion.svg
                animate={{ scaleX: [1, 0.2, 1] }}
                transition={{ duration: 0.28, repeat: Infinity, ease: "easeInOut" }}
                width={bf.size}
                height={bf.size}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
              >
                <path d="M12 4C10.5 1 4 2 3 7C2 11 6 15 11 14C11 16 9 19 6 20C9 21 12 18 12 15C12 18 15 21 18 20C15 19 13 16 13 14C18 15 22 11 21 7C20 2 13.5 1 12 4Z" />
              </motion.svg>
            </motion.div>
          ))}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. TITLE & LORE STATUS
            ───────────────────────────────────────────────────────────── */}
        {/* Dripping Brand Headline */}
        <h1
          className="font-cooper text-3xl sm:text-4xl md:text-5xl font-black tracking-wide mb-2 moolies-cooper-brand"
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-cartoon text-xs sm:text-sm text-purple-200/90 font-medium tracking-wide flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "3s" }} />
              <span>{LOADING_STATUS_MESSAGES[statusIdx]}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            5. MODERN PROGRESS BAR & ENTER CALL TO ACTION
            ───────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-sm space-y-4">
          {/* Progress Bar Container */}
          <div className="relative p-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-inner">
            <motion.div
              className="h-2.5 rounded-full relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #facc15 85%, #38bdf8 100%)",
                width: `${progress}%`,
                boxShadow: "0 0 14px rgba(236, 72, 153, 0.65)",
              }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            >
              {/* Shimmer sweep inside progress bar */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12"
              />
            </motion.div>
          </div>

          {/* Progress Percentage & Stats */}
          <div className="flex items-center justify-between text-[11px] font-mono text-purple-300/75 px-1">
            <span className="flex items-center gap-1">
              <Compass className="w-3 h-3 text-cyan-400" />
              <span>VALLEY CLEARING</span>
            </span>
            <span className="font-bold text-amber-300 tracking-wider">
              {progress}%
            </span>
          </div>

          {/* Call-to-Action Interactive Button (Reveals at 100%) */}
          <div className="pt-2 min-h-[58px] flex items-center justify-center">
            {isReady ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnterRealm}
                className="relative group w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white font-cooper text-sm sm:text-base font-black tracking-wider shadow-[0_8px_30px_rgba(168,85,247,0.55)] border border-purple-300/40 cursor-pointer overflow-hidden flex items-center justify-center gap-2.5 transition-all"
                style={{
                  fontFamily: 'var(--font-cooper-black), "Cooper Black", "Caprasimo", serif',
                }}
              >
                {/* Button Shimmer sweep */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                />

                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
                <span>ENTER MOOLIES WORLD</span>
                <ArrowRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ) : (
              <div className="text-[11px] font-mono text-purple-300/50 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <span>Synchronizing illustrated realm...</span>
              </div>
            )}
          </div>

          {/* Subtext Prompt */}
          {isReady && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] text-purple-300/70 font-sans tracking-wide"
            >
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] border border-white/20">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] border border-white/20">Enter</kbd> to unlock
            </motion.p>
          )}
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          6. BOTTOM FOOTER CREDITS & DECENTRALIZED METAVERSE BADGE
          ───────────────────────────────────────────────────────────── */}
      <footer className="absolute bottom-5 inset-x-0 text-center pointer-events-none z-20">
        <p className="text-[10px] sm:text-xs font-mono text-purple-300/40 uppercase tracking-widest">
          Ethereum Mainnet • Handcrafted Vector Ecosystem • 2,000 Genesis
        </p>
      </footer>
    </motion.div>
  );
};
