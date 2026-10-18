"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface CinematicDoorGateProps {
  onEnter: () => void;
}

/**
 * Web Audio Synthesizer for Realistic Door Knocking and Opening Creak
 */
function playRealisticAudio() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Helper: Single acoustic wood knock
    const singleKnock = (time: number, freq: number, gainVal: number) => {
      // 1. Transient click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "triangle";
      clickOsc.frequency.setValueAtTime(freq * 2.8, time);
      clickOsc.frequency.exponentialRampToValueAtTime(80, time + 0.04);
      clickGain.gain.setValueAtTime(gainVal * 0.9, time);
      clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(time);
      clickOsc.stop(time + 0.05);

      // 2. Deep wooden body cavity resonance
      const woodOsc = ctx.createOscillator();
      const woodGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq, time);
      filter.Q.setValueAtTime(5.5, time);

      woodOsc.type = "sine";
      woodOsc.frequency.setValueAtTime(freq, time);
      woodOsc.frequency.exponentialRampToValueAtTime(freq * 0.65, time + 0.12);

      woodGain.gain.setValueAtTime(gainVal, time);
      woodGain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

      woodOsc.connect(filter);
      filter.connect(woodGain);
      woodGain.connect(ctx.destination);
      woodOsc.start(time);
      woodOsc.stop(time + 0.15);
    };

    // 3 Distinct Rhythmic Knocks: "Knock... Knock... Knock!"
    singleKnock(now + 0.05, 230, 0.75);
    singleKnock(now + 0.26, 220, 0.85);
    singleKnock(now + 0.48, 245, 0.95);

    // Iron Lock Bolt Click
    const boltTime = now + 0.82;
    const boltOsc = ctx.createOscillator();
    const boltGain = ctx.createGain();
    boltOsc.type = "square";
    boltOsc.frequency.setValueAtTime(880, boltTime);
    boltOsc.frequency.exponentialRampToValueAtTime(220, boltTime + 0.06);
    boltGain.gain.setValueAtTime(0.35, boltTime);
    boltGain.gain.exponentialRampToValueAtTime(0.001, boltTime + 0.07);
    boltOsc.connect(boltGain);
    boltGain.connect(ctx.destination);
    boltOsc.start(boltTime);
    boltOsc.stop(boltTime + 0.08);

    // Realistic Wooden Door Creak Sound (Frequency modulated wood friction)
    const creakTime = now + 0.95;
    const creakOsc = ctx.createOscillator();
    const creakGain = ctx.createGain();
    const creakFilter = ctx.createBiquadFilter();

    creakFilter.type = "lowpass";
    creakFilter.frequency.setValueAtTime(650, creakTime);
    creakFilter.frequency.linearRampToValueAtTime(320, creakTime + 1.2);

    creakOsc.type = "sawtooth";
    creakOsc.frequency.setValueAtTime(115, creakTime);
    creakOsc.frequency.linearRampToValueAtTime(175, creakTime + 0.45);
    creakOsc.frequency.linearRampToValueAtTime(120, creakTime + 0.95);
    creakOsc.frequency.linearRampToValueAtTime(95, creakTime + 1.2);

    creakGain.gain.setValueAtTime(0.001, creakTime);
    creakGain.gain.linearRampToValueAtTime(0.35, creakTime + 0.15);
    creakGain.gain.linearRampToValueAtTime(0.25, creakTime + 0.85);
    creakGain.gain.exponentialRampToValueAtTime(0.001, creakTime + 1.25);

    creakOsc.connect(creakFilter);
    creakFilter.connect(creakGain);
    creakGain.connect(ctx.destination);
    creakOsc.start(creakTime);
    creakOsc.stop(creakTime + 1.3);

    // Warm Outdoor Sunlight Air Chime on Open
    const openTime = now + 1.35;
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chimeOsc.type = "sine";
    chimeOsc.frequency.setValueAtTime(523.25, openTime); // C5
    chimeOsc.frequency.exponentialRampToValueAtTime(659.25, openTime + 0.5); // E5
    chimeGain.gain.setValueAtTime(0.2, openTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, openTime + 1.1);
    chimeOsc.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chimeOsc.start(openTime);
    chimeOsc.stop(openTime + 1.2);
  } catch {
    // Graceful fallback if Web Audio is unsupported
  }
}

/**
 * CinematicDoorGate
 * Realistic wooden double-door loading entry interface.
 * User must knock / click to open with audible knocking and opening sounds.
 */
export const CinematicDoorGate: React.FC<CinematicDoorGateProps> = ({ onEnter }) => {
  const [doorState, setDoorState] = useState<"idle" | "knocking" | "opening" | "done">("idle");
  const hasTriggeredRef = useRef(false);

  const handleKnock = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // 1. Play realistic audible knocking and creak sounds
    playRealisticAudio();

    // 2. Knocking animation phase
    setDoorState("knocking");

    // 3. Opening phase (doors swing wide in 3D)
    setTimeout(() => {
      setDoorState("opening");
    }, 750);

    // 4. Complete entry into the Moolies world
    setTimeout(() => {
      setDoorState("done");
      onEnter();
    }, 2100);
  };

  if (doorState === "done") return null;

  const isOpening = doorState === "opening";
  const isKnocking = doorState === "knocking";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening ? [1, 1, 0] : 1 }}
      transition={{ duration: 1.6, times: [0, 0.7, 1] }}
      style={{ perspective: "1400px" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 overflow-hidden select-none cursor-pointer"
      onClick={handleKnock}
      role="button"
      tabIndex={0}
      aria-label="Wooden Door Gate — Knock at the door to open"
    >
      {/* Background Ambience / Forest Stone Arch Frame */}
      <div className="absolute inset-0 bg-[#0f0a06] flex items-center justify-center">
        {/* Stone Arch Silhouette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,22,12,0.85)_0%,rgba(10,5,2,0.98)_75%)] pointer-events-none" />

        {/* Torchlight ambient flickering glow on the sides */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-32 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "0.5s" }} />

        {/* Golden light burst behind doors (revealed as they open) */}
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,240,138,0.95)_0%,rgba(95,194,234,0.8)_45%,rgba(15,23,42,0.95)_100%)] transition-opacity duration-1000 ${
            isOpening ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* ======================================================== */}
      {/* 3D WOODEN DOUBLE DOORS */}
      {/* ======================================================== */}
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[820px] mx-4 flex items-stretch rounded-t-full overflow-hidden border-[8px] border-[#221006] shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_4px_16px_rgba(0,0,0,0.8)]">
        {/* LEFT WOODEN DOOR */}
        <motion.div
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
          }}
          animate={
            isOpening
              ? { rotateY: -108, x: -15 }
              : isKnocking
              ? { rotateY: [0, -1.8, 0, -2.2, 0] }
              : { rotateY: 0 }
          }
          transition={
            isOpening
              ? { duration: 1.35, ease: [0.25, 1, 0.5, 1] }
              : isKnocking
              ? { duration: 0.65 }
              : { duration: 0.3 }
          }
          className="relative w-1/2 h-full bg-[#522912] border-r-[4px] border-[#221006] shadow-[6px_0_15px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col justify-between p-6 select-none"
        >
          {/* Wooden Grain & Planks */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3e1f0e] via-[#5c2e14] to-[#46230f] opacity-95" />
          <div className="absolute inset-y-0 left-1/4 w-px bg-[#261208] opacity-80" />
          <div className="absolute inset-y-0 left-2/4 w-px bg-[#261208] opacity-80" />
          <div className="absolute inset-y-0 left-3/4 w-px bg-[#261208] opacity-80" />

          {/* Heavy Cast Iron Hinges */}
          <div className="absolute top-16 left-0 w-24 h-5 bg-gradient-to-r from-[#171717] to-[#383838] rounded-r-md border-y border-stone-800 shadow-md flex items-center justify-end pr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-900 shadow-inner" />
          </div>
          <div className="absolute bottom-24 left-0 w-24 h-5 bg-gradient-to-r from-[#171717] to-[#383838] rounded-r-md border-y border-stone-800 shadow-md flex items-center justify-end pr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-900 shadow-inner" />
          </div>

          {/* Left Decorative Arch Molding */}
          <div className="relative w-full h-36 rounded-t-full border-4 border-[#35190a] bg-[#3a1d0d]/60 shadow-inner mt-8" />

          {/* Left Brass Owl Door Knocker */}
          <div className="relative self-end mr-4 my-auto flex flex-col items-center">
            {/* Knocker Plate */}
            <div className="w-14 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-600 to-amber-700 border-2 border-amber-900 shadow-xl flex items-center justify-center">
              {/* Cute Owl Silhouette on Knocker Plate */}
              <div className="w-8 h-9 rounded-full bg-amber-950/70 border border-amber-300/60 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber-300/80" />
              </div>
            </div>
            {/* Swinging Knocker Ring */}
            <motion.div
              animate={isKnocking ? { rotateX: [0, 45, 0, 50, 0, 40, 0] } : { rotateX: 0 }}
              transition={{ duration: 0.65 }}
              style={{ transformOrigin: "top center" }}
              className="w-10 h-10 -mt-2 rounded-full border-[5px] border-amber-400 shadow-[0_4px_8px_rgba(0,0,0,0.6)] bg-transparent"
            />
          </div>

          {/* Lower Plank Beam */}
          <div className="relative w-full h-8 bg-[#321709] rounded-md border-t border-[#653316]/50 shadow-md mb-6" />
        </motion.div>

        {/* RIGHT WOODEN DOOR */}
        <motion.div
          style={{
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
          }}
          animate={
            isOpening
              ? { rotateY: 108, x: 15 }
              : isKnocking
              ? { rotateY: [0, 1.8, 0, 2.2, 0] }
              : { rotateY: 0 }
          }
          transition={
            isOpening
              ? { duration: 1.35, ease: [0.25, 1, 0.5, 1] }
              : isKnocking
              ? { duration: 0.65 }
              : { duration: 0.3 }
          }
          className="relative w-1/2 h-full bg-[#522912] border-l-[4px] border-[#221006] shadow-[-6px_0_15px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col justify-between p-6 select-none"
        >
          {/* Wooden Grain & Planks */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#3e1f0e] via-[#5c2e14] to-[#46230f] opacity-95" />
          <div className="absolute inset-y-0 right-1/4 w-px bg-[#261208] opacity-80" />
          <div className="absolute inset-y-0 right-2/4 w-px bg-[#261208] opacity-80" />
          <div className="absolute inset-y-0 right-3/4 w-px bg-[#261208] opacity-80" />

          {/* Heavy Cast Iron Hinges */}
          <div className="absolute top-16 right-0 w-24 h-5 bg-gradient-to-l from-[#171717] to-[#383838] rounded-l-md border-y border-stone-800 shadow-md flex items-center justify-start pl-2">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-900 shadow-inner" />
          </div>
          <div className="absolute bottom-24 right-0 w-24 h-5 bg-gradient-to-l from-[#171717] to-[#383838] rounded-l-md border-y border-stone-800 shadow-md flex items-center justify-start pl-2">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-900 shadow-inner" />
          </div>

          {/* Right Decorative Arch Molding */}
          <div className="relative w-full h-36 rounded-t-full border-4 border-[#35190a] bg-[#3a1d0d]/60 shadow-inner mt-8" />

          {/* Right Brass Owl Door Knocker */}
          <div className="relative self-start ml-4 my-auto flex flex-col items-center">
            {/* Knocker Plate */}
            <div className="w-14 h-16 rounded-2xl bg-gradient-to-bl from-amber-400 via-yellow-600 to-amber-700 border-2 border-amber-900 shadow-xl flex items-center justify-center">
              <div className="w-8 h-9 rounded-full bg-amber-950/70 border border-amber-300/60 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber-300/80" />
              </div>
            </div>
            {/* Swinging Knocker Ring */}
            <motion.div
              animate={isKnocking ? { rotateX: [0, 45, 0, 50, 0, 40, 0] } : { rotateX: 0 }}
              transition={{ duration: 0.65 }}
              style={{ transformOrigin: "top center" }}
              className="w-10 h-10 -mt-2 rounded-full border-[5px] border-amber-400 shadow-[0_4px_8px_rgba(0,0,0,0.6)] bg-transparent"
            />
          </div>

          {/* Lower Plank Beam */}
          <div className="relative w-full h-8 bg-[#321709] rounded-md border-t border-[#653316]/50 shadow-md mb-6" />
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* CENTER PROMPT SIGN: "Knock at the door to open" */}
      {/* ======================================================== */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute z-60 pointer-events-none flex flex-col items-center justify-center text-center px-6 py-4 rounded-3xl bg-slate-950/90 border-2 border-amber-400/80 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: "4s" }} />
              <span className="text-xs font-black tracking-widest text-amber-300 uppercase">
                Moolies Illustrated World
              </span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: "4s" }} />
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide drop-shadow-md">
              Knock at the door to open
            </h1>

            <p className="text-xs sm:text-sm text-amber-200/90 font-medium mt-1">
              Tap or click anywhere to knock and enter
            </p>

            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="mt-3 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-[11px] font-bold text-amber-300 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Click to Knock</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
