"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Sparkles, Compass, Bell, ShoppingBag, Palette, Waves, Clock, Coins, Users, Crown, KeyRound, Code2, FileText, HelpCircle, BookOpen } from "lucide-react";
import { WORLD_HOTSPOTS, Hotspot } from "@/lib/data/hotspots";
import { soundEngine } from "@/lib/audio";

interface WorldDirectoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHotspot: (hotspot: Hotspot) => void;
}

const renderDrawerIcon = (iconName: string, className = "w-4 h-4 text-white") => {
  switch (iconName) {
    case "Compass":
      return <Compass className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Bell":
      return <Bell className={className} />;
    case "ShoppingBag":
      return <ShoppingBag className={className} />;
    case "Palette":
      return <Palette className={className} />;
    case "Waves":
      return <Waves className={className} />;
    case "Clock":
      return <Clock className={className} />;
    case "Coins":
      return <Coins className={className} />;
    case "Users":
      return <Users className={className} />;
    case "Crown":
      return <Crown className={className} />;
    case "KeyRound":
      return <KeyRound className={className} />;
    case "Code2":
      return <Code2 className={className} />;
    case "FileText":
      return <FileText className={className} />;
    case "HelpCircle":
      return <HelpCircle className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const WorldDirectoryDrawer: React.FC<WorldDirectoryDrawerProps> = ({
  isOpen,
  onClose,
  onSelectHotspot,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All (15)" },
    { id: "core", label: "Core & Vision" },
    { id: "mint", label: "Mint & Economics" },
    { id: "team", label: "Moolies Team" },
    { id: "blockchain", label: "Ethereum" },
    { id: "lore", label: "Lore & Docs" },
    { id: "community", label: "Community" },
  ];

  const filteredHotspots = useMemo(() => {
    return WORLD_HOTSPOTS.filter((h) => {
      const matchesCategory = selectedCategory === "all" || h.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        h.title.toLowerCase().includes(q) ||
        h.subtitle.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.badgeText.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 border-l border-amber-300/40 shadow-2xl z-10 flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-b border-amber-200/60 dark:border-slate-700/60 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Realm Landmarks Explorer
                  </h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    15 Locations
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Search &amp; click any landmark to highlight on canvas and open its window
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close directory"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 shrink-0 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search landmarks, characters, contracts..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-amber-400 text-slate-950 shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Landmarks List */}
            <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
              {filteredHotspots.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No landmarks found matching &quot;{searchQuery}&quot;.
                </div>
              ) : (
                filteredHotspots.map((hotspot) => {
                  return (
                    <div
                      key={hotspot.id}
                      onClick={() => {
                        soundEngine?.playPop();
                        onSelectHotspot(hotspot);
                        onClose();
                      }}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-50/20 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          style={{ backgroundColor: hotspot.accentColor }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                        >
                          {renderDrawerIcon(hotspot.iconName, "w-4 h-4 text-white")}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {hotspot.title}
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                              {hotspot.badgeText}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {hotspot.subtitle}
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                            {hotspot.description}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors pl-2">
                        &rarr;
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
