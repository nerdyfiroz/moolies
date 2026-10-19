"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicDoorGateProps {
  onEnter: () => void;
}

/* ─── Web Audio: Owl Hoot + Magical Whoosh ─── */
function playOwlAudio() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;

    // 1. Owl Hoot — two‑tone "hoo‑HOO"
    const hoot = (t: number, f: number, dur: number, vol: number) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(600, t);
      o.type = "sine";
      o.frequency.setValueAtTime(f, t);
      o.frequency.exponentialRampToValueAtTime(f * 0.85, t + dur);
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.06);
      g.gain.linearRampToValueAtTime(vol * 0.8, t + dur * 0.7);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(lp);
      lp.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + dur + 0.01);
    };
    hoot(now + 0.1, 320, 0.35, 0.3);
    hoot(now + 0.5, 260, 0.5, 0.45);

    // 2. Magical whoosh (mouth open reveal)
    const wt = now + 1.2;
    const wo = ctx.createOscillator();
    const wg = ctx.createGain();
    const wf = ctx.createBiquadFilter();
    wf.type = "bandpass";
    wf.frequency.setValueAtTime(400, wt);
    wf.frequency.exponentialRampToValueAtTime(1200, wt + 0.6);
    wf.Q.setValueAtTime(1.5, wt);
    wo.type = "sawtooth";
    wo.frequency.setValueAtTime(80, wt);
    wo.frequency.exponentialRampToValueAtTime(200, wt + 0.8);
    wg.gain.setValueAtTime(0.001, wt);
    wg.gain.linearRampToValueAtTime(0.25, wt + 0.2);
    wg.gain.exponentialRampToValueAtTime(0.001, wt + 1.0);
    wo.connect(wf);
    wf.connect(wg);
    wg.connect(ctx.destination);
    wo.start(wt);
    wo.stop(wt + 1.1);

    // 3. Soft wind‑chime sparkle
    const ct = now + 1.8;
    [659.25, 783.99, 987.77].forEach((freq, i) => {
      const co = ctx.createOscillator();
      const cg = ctx.createGain();
      co.type = "sine";
      co.frequency.setValueAtTime(freq, ct + i * 0.12);
      cg.gain.setValueAtTime(0.15, ct + i * 0.12);
      cg.gain.exponentialRampToValueAtTime(0.001, ct + i * 0.12 + 0.7);
      co.connect(cg);
      cg.connect(ctx.destination);
      co.start(ct + i * 0.12);
      co.stop(ct + i * 0.12 + 0.8);
    });
  } catch {
    /* graceful fallback */
  }
}

/* ─── Butterfly Component ─── */
function Butterfly({ delay, startX, startY, color }: { delay: number; startX: number; startY: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: startX, y: startY, scale: 0.5 }}
      animate={{
        opacity: [0, 1, 1, 1, 0.8],
        x: [startX, startX + 30, startX - 20, startX + 15, startX - 10],
        y: [startY, startY - 40, startY - 20, startY - 50, startY - 30],
        scale: [0.5, 1, 0.9, 1.1, 1],
        rotate: [0, 10, -15, 8, -5],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="absolute pointer-events-none"
      style={{ zIndex: 20 }}
    >
      {/* CSS Butterfly */}
      <div className="relative" style={{ width: 24, height: 20 }}>
        {/* Left Wing */}
        <motion.div
          animate={{ rotateY: [0, 70, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 12,
            height: 18,
            borderRadius: "50% 0 50% 50%",
            background: `linear-gradient(135deg, ${color}, ${color}88)`,
            transformOrigin: "right center",
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
        {/* Right Wing */}
        <motion.div
          animate={{ rotateY: [0, -70, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 12,
            height: 18,
            borderRadius: "0 50% 50% 50%",
            background: `linear-gradient(225deg, ${color}, ${color}88)`,
            transformOrigin: "left center",
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
        {/* Body */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 2,
            transform: "translateX(-50%)",
            width: 3,
            height: 14,
            borderRadius: 2,
            background: "#1a1a2e",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Sparkle Particle ─── */
function Sparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
      transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 1.5 + Math.random() * 2 }}
      className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: "radial-gradient(circle, #fef08a, #f59e0b00)",
        boxShadow: "0 0 6px 2px rgba(250, 204, 21, 0.4)",
      }}
    />
  );
}

/**
 * CinematicDoorGate — Owl Loading Interface
 *
 * A beautiful owl flies in from above, flaps its wings, then opens its mouth wide.
 * The Moolies website is revealed from inside the owl's mouth (zoom-into-mouth transition).
 * Butterflies flutter around the owl throughout the animation.
 */
export const CinematicDoorGate: React.FC<CinematicDoorGateProps> = ({ onEnter }) => {
  const [phase, setPhase] = useState<"flying" | "landing" | "opening" | "reveal" | "done">("flying");
  const hasTriggeredRef = useRef(false);
  const [mouthOpen, setMouthOpen] = useState(0); // 0 to 1

  // Auto-advance from "flying" → "landing" after 2s
  useEffect(() => {
    const t = setTimeout(() => setPhase("landing"), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleClick = useCallback(() => {
    if (hasTriggeredRef.current) return;
    if (phase === "flying") return; // Wait for landing
    hasTriggeredRef.current = true;

    playOwlAudio();
    setPhase("opening");

    // Mouth open animation
    let start: number | null = null;
    const animateMouth = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 800, 1);
      setMouthOpen(progress);
      if (progress < 1) {
        requestAnimationFrame(animateMouth);
      } else {
        setTimeout(() => setPhase("reveal"), 200);
        setTimeout(() => {
          setPhase("done");
          onEnter();
        }, 1400);
      }
    };
    requestAnimationFrame(animateMouth);
  }, [phase, onEnter]);

  if (phase === "done") return null;

  const isFlying = phase === "flying";
  const isLanding = phase === "landing";
  const isOpening = phase === "opening";
  const isRevealing = phase === "reveal";

  // Butterfly data
  const butterflies = [
    { delay: 0.2, startX: -120, startY: -80, color: "#c084fc" },
    { delay: 0.6, startX: 100, startY: -60, color: "#60a5fa" },
    { delay: 1.0, startX: -80, startY: 40, color: "#f472b6" },
    { delay: 1.4, startX: 130, startY: 50, color: "#34d399" },
    { delay: 0.8, startX: -160, startY: -20, color: "#fbbf24" },
    { delay: 1.8, startX: 160, startY: -100, color: "#a78bfa" },
  ];

  // Sparkles
  const sparkles = Array.from({ length: 14 }, (_, i) => ({
    delay: i * 0.3 + Math.random() * 0.5,
    x: 15 + Math.random() * 70,
    y: 10 + Math.random() * 80,
  }));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isRevealing ? 0 : 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Click to let the owl reveal the Moolies world"
    >
      {/* Night sky / mystical forest background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 40%, #1a103a 0%, #0c0820 40%, #050312 100%)",
      }}>
        {/* Stars */}
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + Math.random() * 3, delay: Math.random() * 2, repeat: Infinity }}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: 1.5 + Math.random() * 2,
              height: 1.5 + Math.random() * 2,
              background: `rgba(255,255,255,${0.4 + Math.random() * 0.6})`,
            }}
          />
        ))}

        {/* Moonlight glow */}
        <div className="absolute top-8 right-16 w-20 h-20 rounded-full opacity-40 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #fef9c3 0%, #fef9c300 70%)",
            boxShadow: "0 0 60px 30px rgba(254, 249, 195, 0.15)",
          }}
        />

        {/* Magical ambient glow behind owl */}
        <motion.div
          animate={{
            scale: isOpening || isRevealing ? [1, 2.5] : [1, 1.15, 1],
            opacity: isOpening || isRevealing ? [0.3, 0.9] : [0.2, 0.35, 0.2],
          }}
          transition={{ duration: isOpening ? 1.2 : 3, repeat: isOpening ? 0 : Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 70%)",
          }}
        />

        {/* Sparkles */}
        {sparkles.map((s, i) => (
          <Sparkle key={i} delay={s.delay} x={s.x} y={s.y} />
        ))}
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* THE OWL */}
      {/* ═══════════════════════════════════════ */}
      <motion.div
        initial={{ y: -400, scale: 0.4, rotate: -5 }}
        animate={
          isFlying
            ? { y: [-400, -200, -100], scale: [0.4, 0.7, 0.85], rotate: [-5, 3, 0] }
            : isLanding
            ? { y: 0, scale: 1, rotate: 0 }
            : isOpening || isRevealing
            ? { y: 0, scale: isRevealing ? 3.5 : 1, rotate: 0 }
            : { y: 0, scale: 1, rotate: 0 }
        }
        transition={
          isFlying
            ? { duration: 2, ease: "easeOut" }
            : isLanding
            ? { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
            : isRevealing
            ? { duration: 1.2, ease: "easeIn" }
            : { duration: 0.5 }
        }
        className="relative z-10 flex flex-col items-center"
      >
        {/* Butterflies around the owl */}
        {butterflies.map((b, i) => (
          <Butterfly key={i} delay={b.delay} startX={b.startX} startY={b.startY} color={b.color} />
        ))}

        {/* Owl SVG Body */}
        <svg
          viewBox="0 0 300 340"
          width="280"
          height="320"
          className="drop-shadow-[0_15px_40px_rgba(147,51,234,0.3)]"
          style={{ filter: "drop-shadow(0 8px 25px rgba(0,0,0,0.5))" }}
        >
          {/* ── Wing Left (flapping) ── */}
          <motion.g
            animate={
              isFlying
                ? { rotate: [0, -25, 0, -30, 0] }
                : isLanding
                ? { rotate: [0, -10, 0] }
                : { rotate: 0 }
            }
            transition={
              isFlying
                ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                : isLanding
                ? { duration: 0.8 }
                : { duration: 0.4 }
            }
            style={{ transformOrigin: "150px 140px" }}
          >
            <ellipse cx="45" cy="155" rx="55" ry="75"
              fill="url(#wingGradL)"
              stroke="#4a2d1a" strokeWidth="2"
              transform="rotate(-15 45 155)"
            />
          </motion.g>

          {/* ── Wing Right (flapping) ── */}
          <motion.g
            animate={
              isFlying
                ? { rotate: [0, 25, 0, 30, 0] }
                : isLanding
                ? { rotate: [0, 10, 0] }
                : { rotate: 0 }
            }
            transition={
              isFlying
                ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                : isLanding
                ? { duration: 0.8 }
                : { duration: 0.4 }
            }
            style={{ transformOrigin: "150px 140px" }}
          >
            <ellipse cx="255" cy="155" rx="55" ry="75"
              fill="url(#wingGradR)"
              stroke="#4a2d1a" strokeWidth="2"
              transform="rotate(15 255 155)"
            />
          </motion.g>

          {/* ── Main Body ── */}
          <ellipse cx="150" cy="190" rx="90" ry="120"
            fill="url(#bodyGrad)"
            stroke="#3d2010" strokeWidth="2.5"
          />

          {/* Belly Patch */}
          <ellipse cx="150" cy="220" rx="55" ry="70"
            fill="url(#bellyGrad)"
          />

          {/* Belly feather pattern */}
          {[0, 1, 2, 3].map(i => (
            <path key={i}
              d={`M${120 + i * 20} ${185 + i * 12} Q${130 + i * 20} ${195 + i * 12} ${140 + i * 20} ${185 + i * 12}`}
              fill="none" stroke="#c9a36c55" strokeWidth="1.5"
            />
          ))}

          {/* ── Head ── */}
          <circle cx="150" cy="95" r="65"
            fill="url(#headGrad)"
            stroke="#3d2010" strokeWidth="2"
          />

          {/* Ear Tufts */}
          <polygon points="100,50 88,15 115,55"
            fill="url(#tuftGrad)" stroke="#4a2d1a" strokeWidth="1.5"
          />
          <polygon points="200,50 212,15 185,55"
            fill="url(#tuftGrad)" stroke="#4a2d1a" strokeWidth="1.5"
          />

          {/* Facial Disc */}
          <ellipse cx="150" cy="100" rx="50" ry="45"
            fill="url(#facialDisc)" opacity="0.5"
          />

          {/* ── Eyes ── */}
          {/* Left Eye Disc */}
          <circle cx="125" cy="90" r="22"
            fill="url(#eyeDiscGrad)" stroke="#2d1a08" strokeWidth="1.5"
          />
          {/* Left Eye */}
          <motion.circle cx="125" cy="90" r="14"
            animate={isOpening ? { r: [14, 16, 14] } : {}}
            transition={{ duration: 0.5 }}
            fill="url(#eyeGrad)"
            stroke="#1a0f05" strokeWidth="1.5"
          />
          {/* Left Pupil */}
          <circle cx="125" cy="90" r="7" fill="#0f0a05" />
          {/* Left Eye Shine */}
          <circle cx="120" cy="86" r="3" fill="rgba(255,255,255,0.85)" />
          <circle cx="128" cy="93" r="1.5" fill="rgba(255,255,255,0.5)" />

          {/* Right Eye Disc */}
          <circle cx="175" cy="90" r="22"
            fill="url(#eyeDiscGrad)" stroke="#2d1a08" strokeWidth="1.5"
          />
          {/* Right Eye */}
          <motion.circle cx="175" cy="90" r="14"
            animate={isOpening ? { r: [14, 16, 14] } : {}}
            transition={{ duration: 0.5 }}
            fill="url(#eyeGrad)"
            stroke="#1a0f05" strokeWidth="1.5"
          />
          {/* Right Pupil */}
          <circle cx="175" cy="90" r="7" fill="#0f0a05" />
          {/* Right Eye Shine */}
          <circle cx="170" cy="86" r="3" fill="rgba(255,255,255,0.85)" />
          <circle cx="178" cy="93" r="1.5" fill="rgba(255,255,255,0.5)" />

          {/* ── Beak / Mouth ── */}
          {/* Upper beak */}
          <path
            d="M140 110 Q150 102 160 110 L155 118 Q150 115 145 118 Z"
            fill="url(#beakGrad)" stroke="#5a3a12" strokeWidth="1"
          />

          {/* Lower beak / mouth — opens with mouthOpen */}
          <motion.path
            d={`M140 ${110 + mouthOpen * 6} Q150 ${118 + mouthOpen * 45} 160 ${110 + mouthOpen * 6}`}
            fill="url(#beakGrad)" stroke="#5a3a12" strokeWidth="1"
          />

          {/* Inner mouth glow (darkness/portal visible when open) */}
          {mouthOpen > 0.1 && (
            <motion.ellipse
              cx="150"
              cy={118 + mouthOpen * 20}
              rx={8 + mouthOpen * 15}
              ry={mouthOpen * 22}
              fill="url(#mouthPortal)"
              initial={{ opacity: 0 }}
              animate={{ opacity: mouthOpen }}
            />
          )}

          {/* ── Feet ── */}
          <g>
            <path d="M120 305 L110 325 L120 320 L125 328 L130 318 L135 325 L130 305"
              fill="#8B6914" stroke="#5a4510" strokeWidth="1.5" strokeLinejoin="round"
            />
            <path d="M170 305 L165 325 L170 320 L175 328 L180 318 L185 325 L180 305"
              fill="#8B6914" stroke="#5a4510" strokeWidth="1.5" strokeLinejoin="round"
            />
          </g>

          {/* Gradients */}
          <defs>
            <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#8B5E3C" />
              <stop offset="50%" stopColor="#6B4226" />
              <stop offset="100%" stopColor="#4A2D1A" />
            </radialGradient>
            <radialGradient id="bellyGrad" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#D4A574" />
              <stop offset="100%" stopColor="#B08050" />
            </radialGradient>
            <radialGradient id="headGrad" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#7B5030" />
              <stop offset="100%" stopColor="#5A3820" />
            </radialGradient>
            <linearGradient id="wingGradL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5A3820" />
              <stop offset="50%" stopColor="#7B5030" />
              <stop offset="100%" stopColor="#4A2D1A" />
            </linearGradient>
            <linearGradient id="wingGradR" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5A3820" />
              <stop offset="50%" stopColor="#7B5030" />
              <stop offset="100%" stopColor="#4A2D1A" />
            </linearGradient>
            <linearGradient id="tuftGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#6B4226" />
              <stop offset="100%" stopColor="#5A3820" />
            </linearGradient>
            <radialGradient id="facialDisc" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#C9A36C" />
              <stop offset="100%" stopColor="#8B5E3C" />
            </radialGradient>
            <radialGradient id="eyeDiscGrad" cx="50%" cy="45%">
              <stop offset="0%" stopColor="#C9A36C" />
              <stop offset="100%" stopColor="#9B7B50" />
            </radialGradient>
            <radialGradient id="eyeGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="40%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#CC7722" />
            </radialGradient>
            <linearGradient id="beakGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#C9943C" />
              <stop offset="100%" stopColor="#8B6914" />
            </linearGradient>
            <radialGradient id="mouthPortal" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#5fc2ea" />
              <stop offset="40%" stopColor="#3b82f6" />
              <stop offset="70%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </radialGradient>
          </defs>
        </svg>

        {/* Glow ring around owl during mouth open */}
        <AnimatePresence>
          {(isOpening || isRevealing) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.8, 2.5] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{
                border: "2px solid rgba(147, 51, 234, 0.4)",
                boxShadow: "0 0 30px 10px rgba(147, 51, 234, 0.2), inset 0 0 30px 10px rgba(96, 165, 250, 0.15)",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ═══════════════════════════════════════ */}
      {/* TEXT INSCRIPTION */}
      {/* ═══════════════════════════════════════ */}
      <AnimatePresence>
        {!isOpening && !isRevealing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: isFlying ? 2.2 : 0.3 }}
            className="absolute bottom-[12%] sm:bottom-[15%] inset-x-0 z-20 flex flex-col items-center text-center px-4 pointer-events-none"
          >
            {/* Ornament */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                color: "#c084fc",
                textShadow: "0 0 15px rgba(192, 132, 252, 0.5)",
                letterSpacing: "0.3em",
              }}
              className="text-[10px] sm:text-xs font-serif uppercase mb-2 select-none"
            >
              ✦ MOOLIES WORLD ✦
            </motion.div>

            {/* Main Title */}
            <h1
              style={{
                background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 50%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
                filter: "drop-shadow(0 2px 8px rgba(147, 51, 234, 0.4))",
              }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold select-none leading-tight"
            >
              {isFlying ? "The Owl is arriving..." : "Tap to awaken the Owl"}
            </h1>

            {/* Subtitle */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ color: "#a78bfa" }}
              className="text-xs sm:text-sm mt-2 select-none"
            >
              {isFlying ? "~ butterflies lead the way ~" : "~ click anywhere to enter the world ~"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
