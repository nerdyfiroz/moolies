"use client";

import React from "react";

/**
 * Living World Effects:
 * 1. Clouds in the sky moving continuously left-to-right.
 * 2. Animated butterflies flying & fluttering continuously over the meadow and flowers.
 * 3. Flowing waves & water ripples moving in the river from left to right.
 *
 * All effects are pointer-events-none and aligned to the 1024x650 world canvas coordinates.
 */
export const LivingWorldEffects: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      <style jsx global>{`
        /* ==================== CLOUD ANIMATIONS (Left to Right) ==================== */
        @keyframes cloudDrift1 {
          0% {
            left: -250px;
          }
          100% {
            left: 105%;
          }
        }
        @keyframes cloudDrift2 {
          0% {
            left: -220px;
          }
          100% {
            left: 105%;
          }
        }
        @keyframes cloudDrift3 {
          0% {
            left: -180px;
          }
          100% {
            left: 105%;
          }
        }
        @keyframes cloudBob {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        /* ==================== BUTTERFLY WING FLAPPING ==================== */
        @keyframes wingFlapLeft {
          0%, 100% {
            transform: scaleX(1) rotate(0deg);
          }
          50% {
            transform: scaleX(0.12) rotate(-22deg);
          }
        }
        @keyframes wingFlapRight {
          0%, 100% {
            transform: scaleX(1) rotate(0deg);
          }
          50% {
            transform: scaleX(0.12) rotate(22deg);
          }
        }

        /* Flight trajectory 1: Monarch Butterfly near Porch / Flowers */
        @keyframes butterflyFlyPorch {
          0% {
            transform: translate(0px, 0px) rotate(4deg);
          }
          20% {
            transform: translate(35px, -24px) rotate(-12deg);
          }
          40% {
            transform: translate(65px, -8px) rotate(10deg);
          }
          60% {
            transform: translate(45px, 20px) rotate(-8deg);
          }
          80% {
            transform: translate(15px, 12px) rotate(6deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(4deg);
          }
        }

        /* Flight trajectory 2: Blue Butterfly across Meadow & Lake */
        @keyframes butterflyFlyMeadow {
          0% {
            transform: translate(0px, 0px) rotate(-6deg);
          }
          25% {
            transform: translate(50px, -30px) rotate(14deg);
          }
          50% {
            transform: translate(95px, -10px) rotate(-10deg);
          }
          75% {
            transform: translate(45px, 25px) rotate(8deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(-6deg);
          }
        }

        /* Flight trajectory 3: Golden Butterfly near Goalpost */
        @keyframes butterflyFlyGoal {
          0% {
            transform: translate(0px, 0px) rotate(8deg);
          }
          30% {
            transform: translate(-35px, -22px) rotate(-14deg);
          }
          60% {
            transform: translate(-65px, 8px) rotate(12deg);
          }
          85% {
            transform: translate(-25px, 18px) rotate(-6deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(8deg);
          }
        }

        /* ==================== RIVER WAVES (Left to Right) ==================== */
        @keyframes riverWaveFlow {
          0% {
            transform: translateX(-40%);
          }
          100% {
            transform: translateX(40%);
          }
        }
        @keyframes riverShimmer {
          0%, 100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.75;
          }
        }
      `}</style>

      {/* ======================================================== */}
      {/* 1. CLOUDS IN THE SKY (Drifting continuously Left to Right) */}
      {/* ======================================================== */}
      <div className="absolute inset-x-0 top-0 h-[28%] overflow-hidden pointer-events-none">
        {/* Cloud 1 — High altitude fluffy cloud */}
        <div
          style={{
            top: "3%",
            left: "-5%",
            animation: "cloudDrift1 48s linear infinite",
          }}
          className="absolute"
        >
          <div style={{ animation: "cloudBob 7s ease-in-out infinite" }}>
            <svg width="220" height="75" viewBox="0 0 220 75" fill="none" className="opacity-80">
              <path
                d="M30 60 C15 60 0 50 0 35 C0 20 18 10 32 12 C40 4 60 0 78 8 C92 2 115 0 130 8 C145 2 170 5 180 18 C198 18 215 30 215 45 C215 60 198 65 185 62 L30 60 Z"
                fill="white"
              />
              <path
                d="M45 52 C30 52 15 45 15 35 C15 25 32 18 45 20 C52 12 70 8 85 15 C100 8 122 8 135 15 C150 10 172 15 180 25 C195 28 200 40 195 50 Z"
                fill="#F0F9FF"
                fillOpacity="0.85"
              />
            </svg>
          </div>
        </div>

        {/* Cloud 2 — Mid sky cozy cloud */}
        <div
          style={{
            top: "11%",
            left: "-25%",
            animation: "cloudDrift2 62s linear infinite",
            animationDelay: "-18s",
          }}
          className="absolute"
        >
          <div style={{ animation: "cloudBob 9s ease-in-out infinite", animationDelay: "-3s" }}>
            <svg width="180" height="60" viewBox="0 0 180 60" fill="none" className="opacity-75">
              <path
                d="M25 50 C10 50 0 40 0 28 C0 15 15 8 28 10 C36 4 52 0 68 6 C80 2 100 0 112 6 C125 2 145 4 154 15 C170 16 180 26 180 38 C180 50 168 53 155 50 L25 50 Z"
                fill="white"
              />
              <path
                d="M35 44 C22 44 10 38 10 28 C10 18 25 12 35 14 C42 8 58 4 70 10 C82 5 100 5 110 10 C122 6 140 10 148 18 C160 20 168 30 165 40 Z"
                fill="#E0F2FE"
                fillOpacity="0.75"
              />
            </svg>
          </div>
        </div>

        {/* Cloud 3 — Gentle trailing cloud */}
        <div
          style={{
            top: "16%",
            left: "-20%",
            animation: "cloudDrift3 55s linear infinite",
            animationDelay: "-34s",
          }}
          className="absolute"
        >
          <div style={{ animation: "cloudBob 8s ease-in-out infinite", animationDelay: "-5s" }}>
            <svg width="150" height="50" viewBox="0 0 150 50" fill="none" className="opacity-70">
              <path
                d="M20 42 C8 42 0 34 0 24 C0 12 12 6 24 8 C30 3 44 0 58 5 C68 2 85 0 95 5 C106 2 122 4 130 13 C142 14 150 22 150 32 C150 42 140 45 130 42 L20 42 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. RIVER WAVES (Flowing smoothly in the Same Direction: Left to Right) */}
      {/* ======================================================== */}
      <div
        style={{
          left: "28.5%",
          top: "46.2%",
          width: "47.5%",
          height: "11.2%",
          borderRadius: "50% 50% 45% 45% / 60% 60% 40% 40%",
        }}
        className="absolute overflow-hidden pointer-events-none"
      >
        {/* Layer 1: Water surface flow ripples */}
        <div
          style={{
            animation: "riverWaveFlow 7s linear infinite",
            width: "200%",
          }}
          className="absolute inset-y-0 -left-1/2 flex items-center"
        >
          <svg width="100%" height="100%" viewBox="0 0 800 65" preserveAspectRatio="none">
            {/* Wave crest row 1 */}
            <path
              d="M0,18 Q40,12 80,18 T160,18 T240,18 T320,18 T400,18 T480,18 T560,18 T640,18 T720,18 T800,18"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="28 18"
              className="opacity-60"
            />
            {/* Wave crest row 2 (mid lake) */}
            <path
              d="M20,34 Q60,28 100,34 T180,34 T260,34 T340,34 T420,34 T500,34 T580,34 T660,34 T740,34 T820,34"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="36 24"
              className="opacity-70"
            />
            {/* Wave crest row 3 (lower stream) */}
            <path
              d="M10,48 Q50,42 90,48 T170,48 T250,48 T330,48 T410,48 T490,48 T570,48 T650,48 T730,48 T810,48"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="24 20"
              className="opacity-50"
            />
          </svg>
        </div>

        {/* Layer 2: Secondary staggered wave flow for organic river depth */}
        <div
          style={{
            animation: "riverWaveFlow 5.2s linear infinite",
            animationDelay: "-2.6s",
            width: "200%",
          }}
          className="absolute inset-y-0 -left-1/2 flex items-center"
        >
          <svg width="100%" height="100%" viewBox="0 0 800 65" preserveAspectRatio="none">
            <path
              d="M30,26 Q70,20 110,26 T190,26 T270,26 T350,26 T430,26 T510,26 T590,26 T670,26 T750,26 T830,26"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="32 22"
              className="opacity-55"
            />
            <path
              d="M15,42 Q55,36 95,42 T175,42 T255,42 T335,42 T415,42 T495,42 T575,42 T655,42 T735,42 T815,42"
              fill="none"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="20 16"
              className="opacity-45"
            />
          </svg>
        </div>

        {/* Ambient river light shimmer */}
        <div
          style={{
            animation: "riverShimmer 3.5s ease-in-out infinite",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent"
        />
      </div>

      {/* ======================================================== */}
      {/* 3. CONTINUOUSLY FLYING & FLUTTERING BUTTERFLIES */}
      {/* ======================================================== */}

      {/* BUTTERFLY 1: Monarch Orange/Yellow Butterfly (Near Porch & Flowers) */}
      <div
        style={{
          left: "14.2%",
          top: "33.5%",
          width: "36px",
          height: "36px",
          animation: "butterflyFlyPorch 11s ease-in-out infinite",
        }}
        className="absolute z-20 pointer-events-none"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Left Wing with rapid 3D flapping */}
          <div
            style={{
              transformOrigin: "right center",
              animation: "wingFlapLeft 0.22s ease-in-out infinite",
            }}
            className="w-[17px] h-[24px]"
          >
            <svg viewBox="0 0 24 32" className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
              {/* Outer black wing border */}
              <path
                d="M23 16 C23 4 15 0 6 3 C0 5 0 14 5 18 C0 22 2 30 10 31 C18 32 23 24 23 16 Z"
                fill="#18181B"
              />
              {/* Inner vibrant orange wing blade */}
              <path
                d="M21 15 C21 6 15 3 8 5 C3 7 3 13 7 16 C3 19 5 26 11 27 C17 28 21 21 21 15 Z"
                fill="#F97316"
              />
              {/* Yellow wing core accent */}
              <path
                d="M19 14 C19 8 15 6 10 7 C7 8 7 12 10 14 C7 16 8 21 12 22 C16 23 19 18 19 14 Z"
                fill="#FBBF24"
              />
              {/* White wing margin dots */}
              <circle cx="3" cy="8" r="1.2" fill="white" />
              <circle cx="4" cy="14" r="1" fill="white" />
              <circle cx="5" cy="24" r="1.1" fill="white" />
            </svg>
          </div>

          {/* Center Body */}
          <div className="w-[3px] h-[16px] bg-slate-900 rounded-full z-10 mx-[-1px] shadow-xs flex flex-col items-center justify-between py-0.5">
            <div className="w-[4px] h-[4px] bg-slate-950 rounded-full" />
            <div className="w-[2px] h-[8px] bg-slate-800 rounded-full" />
          </div>

          {/* Right Wing with rapid 3D flapping */}
          <div
            style={{
              transformOrigin: "left center",
              animation: "wingFlapRight 0.22s ease-in-out infinite",
            }}
            className="w-[17px] h-[24px]"
          >
            <svg viewBox="0 0 24 32" className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
              {/* Outer black wing border */}
              <path
                d="M1 16 C1 4 9 0 18 3 C24 5 24 14 19 18 C24 22 22 30 14 31 C6 32 1 24 1 16 Z"
                fill="#18181B"
              />
              {/* Inner vibrant orange wing blade */}
              <path
                d="M3 15 C3 6 9 3 16 5 C21 7 21 13 17 16 C21 19 19 26 13 27 C7 28 3 21 3 15 Z"
                fill="#F97316"
              />
              {/* Yellow wing core accent */}
              <path
                d="M5 14 C5 8 9 6 14 7 C17 8 17 12 14 14 C17 16 16 21 12 22 C8 23 5 18 5 14 Z"
                fill="#FBBF24"
              />
              {/* White wing margin dots */}
              <circle cx="21" cy="8" r="1.2" fill="white" />
              <circle cx="20" cy="14" r="1" fill="white" />
              <circle cx="19" cy="24" r="1.1" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      {/* BUTTERFLY 2: Vibrant Cyan / Sky Blue Butterfly (Fluttering Across Lower Meadow) */}
      <div
        style={{
          left: "42.0%",
          top: "54.0%",
          width: "32px",
          height: "32px",
          animation: "butterflyFlyMeadow 13s ease-in-out infinite",
          animationDelay: "-4s",
        }}
        className="absolute z-20 pointer-events-none"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            style={{
              transformOrigin: "right center",
              animation: "wingFlapLeft 0.19s ease-in-out infinite",
            }}
            className="w-[15px] h-[21px]"
          >
            <svg viewBox="0 0 24 32" className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
              <path
                d="M23 16 C23 4 15 0 6 3 C0 5 0 14 5 18 C0 22 2 30 10 31 C18 32 23 24 23 16 Z"
                fill="#0369A1"
              />
              <path
                d="M21 15 C21 6 15 3 8 5 C3 7 3 13 7 16 C3 19 5 26 11 27 C17 28 21 21 21 15 Z"
                fill="#38BDF8"
              />
              <path
                d="M19 14 C19 8 15 6 10 7 C7 8 7 12 10 14 C7 16 8 21 12 22 C16 23 19 18 19 14 Z"
                fill="#E0F2FE"
              />
            </svg>
          </div>

          <div className="w-[2.5px] h-[14px] bg-slate-900 rounded-full z-10 mx-[-1px]" />

          <div
            style={{
              transformOrigin: "left center",
              animation: "wingFlapRight 0.19s ease-in-out infinite",
            }}
            className="w-[15px] h-[21px]"
          >
            <svg viewBox="0 0 24 32" className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
              <path
                d="M1 16 C1 4 9 0 18 3 C24 5 24 14 19 18 C24 22 22 30 14 31 C6 32 1 24 1 16 Z"
                fill="#0369A1"
              />
              <path
                d="M3 15 C3 6 9 3 16 5 C21 7 21 13 17 16 C21 19 19 26 13 27 C7 28 3 21 3 15 Z"
                fill="#38BDF8"
              />
              <path
                d="M5 14 C5 8 9 6 14 7 C17 8 17 12 14 14 C17 16 16 21 12 22 C8 23 5 18 5 14 Z"
                fill="#E0F2FE"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* BUTTERFLY 3: Golden / Coral Butterfly (Dancing Near Goalpost & Field) */}
      <div
        style={{
          left: "70.5%",
          top: "41.0%",
          width: "30px",
          height: "30px",
          animation: "butterflyFlyGoal 15s ease-in-out infinite",
          animationDelay: "-8s",
        }}
        className="absolute z-20 pointer-events-none"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            style={{
              transformOrigin: "right center",
              animation: "wingFlapLeft 0.24s ease-in-out infinite",
            }}
            className="w-[14px] h-[20px]"
          >
            <svg viewBox="0 0 24 32" className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
              <path
                d="M23 16 C23 4 15 0 6 3 C0 5 0 14 5 18 C0 22 2 30 10 31 C18 32 23 24 23 16 Z"
                fill="#B45309"
              />
              <path
                d="M21 15 C21 6 15 3 8 5 C3 7 3 13 7 16 C3 19 5 26 11 27 C17 28 21 21 21 15 Z"
                fill="#FBBF24"
              />
              <path
                d="M19 14 C19 8 15 6 10 7 C7 8 7 12 10 14 C7 16 8 21 12 22 C16 23 19 18 19 14 Z"
                fill="#FEF3C7"
              />
            </svg>
          </div>

          <div className="w-[2.5px] h-[13px] bg-slate-900 rounded-full z-10 mx-[-1px]" />

          <div
            style={{
              transformOrigin: "left center",
              animation: "wingFlapRight 0.24s ease-in-out infinite",
            }}
            className="w-[14px] h-[20px]"
          >
            <svg viewBox="0 0 24 32" className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
              <path
                d="M1 16 C1 4 9 0 18 3 C24 5 24 14 19 18 C24 22 22 30 14 31 C6 32 1 24 1 16 Z"
                fill="#B45309"
              />
              <path
                d="M3 15 C3 6 9 3 16 5 C21 7 21 13 17 16 C21 19 19 26 13 27 C7 28 3 21 3 15 Z"
                fill="#FBBF24"
              />
              <path
                d="M5 14 C5 8 9 6 14 7 C17 8 17 12 14 14 C17 16 16 21 12 22 C8 23 5 18 5 14 Z"
                fill="#FEF3C7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
