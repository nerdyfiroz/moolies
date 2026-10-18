"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio";
import Link from "next/link";

interface WorldNavbarProps {
  onOpenDirectory?: () => void;
}

export const WorldNavbar: React.FC<WorldNavbarProps> = ({
  onOpenDirectory,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (soundEngine) {
      setIsPlayingAudio(soundEngine.getIsPlaying());
    }
  }, []);

  const toggleSound = () => {
    if (soundEngine) {
      const playing = soundEngine.toggleMute();
      setIsPlayingAudio(playing);
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 inset-x-3 sm:inset-x-6 z-40 flex items-center justify-between pointer-events-none">
      {/* Brand Badge - Pure Clean Typography, No Additional Icons */}
      <div className="pointer-events-auto px-4 py-2 rounded-full bg-slate-900/80 dark:bg-slate-900/90 text-white backdrop-blur-md border border-amber-300/40 shadow-lg flex items-center gap-2">
        <span className="font-black text-xs sm:text-sm tracking-wider text-amber-300">
          MOOLIES
        </span>
        <span className="text-[10px] font-semibold text-slate-300 hidden sm:inline border-l border-slate-700 pl-2">
          2,000 Genesis Owls
        </span>
      </div>

      {/* Right Controls - Minimal Text Controls Without Icons */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Audio Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md backdrop-blur-md border cursor-pointer ${
            isPlayingAudio
              ? "bg-amber-400 text-slate-950 border-amber-300 shadow-amber-400/20"
              : "bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500"
          }`}
        >
          {isPlayingAudio ? "Sound: ON" : "Sound: OFF"}
        </button>

        {/* Landmarks Directory Drawer Toggle */}
        {onOpenDirectory && (
          <button
            type="button"
            onClick={onOpenDirectory}
            className="px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-bold backdrop-blur-md border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
          >
            Landmarks
          </button>
        )}

        {/* Admin Portal Link */}
        <Link
          href="/admin"
          className="px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-slate-400 hover:text-slate-200 text-[11px] font-semibold backdrop-blur-md border border-slate-800 transition-colors"
        >
          Admin
        </Link>
      </div>
    </header>
  );
};
