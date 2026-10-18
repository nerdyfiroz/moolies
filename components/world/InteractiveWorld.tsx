"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WorldHotspot, InteractiveHotspot } from "@/components/world/WorldHotspot";
import { WorldNavbar, XLogo } from "@/components/world/WorldNavbar";
import { MobileDesktopNotice } from "@/components/world/MobileDesktopNotice";
import { OpenSeaComingSoonModal } from "@/components/modals/OpenSeaComingSoonModal";
import { WhitelistModal } from "@/components/modals/WhitelistModal";
import { CollectionDetailsModal } from "@/components/modals/CollectionDetailsModal";
import { RoadmapModal } from "@/components/modals/RoadmapModal";
import { soundEngine } from "@/lib/audio";
import { ChevronLeft, ChevronRight } from "lucide-react";

// The 4 core interactive hotspots matching the illustration landmarks
const CORE_HOTSPOTS: InteractiveHotspot[] = [
  {
    id: "opensea",
    title: "OpenSea Marketplace",
    subtitle: "Official Secondary Marketplace (Coming Soon...)",
    actionText: "Coming Soon... Click to view status",
    left: 0.0,
    top: 28.0,
    width: 14.0,
    height: 32.0,
    borderRadius: "rounded-r-3xl",
    accentColor: "#0284C7",
    soundType: "wood",
  },
  {
    id: "whitelist-window",
    title: "Treehouse Window",
    subtitle: "Official Whitelist Application Bureau",
    actionText: "Click window to Apply for Whitelist",
    left: 9.0,
    top: 4.0,
    width: 20.0,
    height: 32.0,
    borderRadius: "rounded-3xl",
    accentColor: "#F59E0B",
    soundType: "wood",
  },
  {
    id: "supply",
    title: "2,000 Moolies Supply",
    subtitle: "Collection Details, Traits & Economics",
    actionText: "Click supply to view Collection Details",
    left: 86.0,
    top: 42.0,
    width: 14.0,
    height: 38.0,
    borderRadius: "rounded-l-3xl",
    accentColor: "#EAB308",
    soundType: "wood",
  },
  {
    id: "goalpost",
    title: "The Meadow Goalpost",
    subtitle: "Scored Project Goals & 4-Phase Roadmap",
    actionText: "Click goalpost to view Roadmap",
    left: 73.0,
    top: 38.0,
    width: 18.0,
    height: 25.0,
    borderRadius: "rounded-2xl",
    accentColor: "#10B981",
    soundType: "pop",
  },
];

export const InteractiveWorld: React.FC = () => {
  const [activeModal, setActiveModal] = useState<"opensea" | "whitelist" | "collection" | "roadmap" | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Center or scroll to the main landmark on initial load
  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      const targetScroll = (el.scrollWidth - el.clientWidth) * 0.25;
      if (targetScroll > 0) {
        el.scrollLeft = targetScroll;
      }
    }
  }, []);

  const scrollToPercent = (percent: number) => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        const target = (percent / 100) * el.scrollWidth - el.clientWidth / 2;
        el.scrollTo({ left: Math.max(0, Math.min(target, maxScroll)), behavior: "smooth" });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, [data-hotspot]")) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startXRef.current) * 1.3;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleHotspotClick = (hotspot: InteractiveHotspot) => {
    // 1. Immediately open the requested section modal
    if (hotspot.id === "opensea") {
      setActiveModal("opensea");
    } else if (hotspot.id === "whitelist-window") {
      setActiveModal("whitelist");
    } else if (hotspot.id === "supply") {
      setActiveModal("collection");
    } else if (hotspot.id === "goalpost") {
      setActiveModal("roadmap");
    }

    // 2. Smoothly scroll camera to the landmark (safe fallback)
    try {
      if (hotspot.id === "opensea") scrollToPercent(5);
      else if (hotspot.id === "whitelist-window") scrollToPercent(16);
      else if (hotspot.id === "supply") scrollToPercent(94);
      else if (hotspot.id === "goalpost") scrollToPercent(78);
    } catch {
      // Ignored
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#5fc2ea] select-none">
      {/* Top Floating Navbar (Only the 4-5 requested sections) */}
      <WorldNavbar
        onOpenOpenSea={() => {
          setActiveModal("opensea");
          try { scrollToPercent(5); } catch {}
        }}
        onOpenWhitelist={() => {
          setActiveModal("whitelist");
          try { scrollToPercent(16); } catch {}
        }}
        onOpenCollectionDetails={() => {
          setActiveModal("collection");
          try { scrollToPercent(94); } catch {}
        }}
        onOpenRoadmap={() => {
          setActiveModal("roadmap");
          try { scrollToPercent(78); } catch {}
        }}
        activeSection={activeModal}
      />

      {/* Note for Phone Users: Please use Desktop Mode */}
      <MobileDesktopNotice onOpenLandmarks={() => setActiveModal("whitelist")} />

      {/* Full-Screen Edge-to-Edge Main Viewport with Smooth Pan/Scroll */}
      <main
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[100dvh] overflow-x-auto overflow-y-hidden select-none bg-[#5fc2ea] no-scrollbar flex items-center justify-start md:justify-center cursor-grab active:cursor-grabbing touch-pan-x"
      >
        {/* World Artwork Canvas — Fully Covers Full Screen */}
        <div
          style={{
            aspectRatio: "1024 / 650",
            minWidth: "100%",
            minHeight: "100dvh",
            height: "100dvh",
            width: "auto",
          }}
          className="relative h-[100dvh] w-auto max-w-none flex-shrink-0 bg-[#5fc2ea] overflow-hidden"
        >
          {/* Main Landscape Illustration Image (Covering 100% of the canvas) */}
          <Image
            src="/moolies-world.png"
            alt="Moolies Interactive Illustrated World"
            fill
            priority
            quality={95}
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover w-full h-full pointer-events-none select-none"
          />

          {/* Project X (Twitter) Logo Link on the website */}
          <motion.a
            href="https://x.com/moolieshq"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, rotate: 1.5 }}
            whileTap={{ scale: 0.95 }}
            title="Follow Official Project on X / Twitter (@moolieshq)"
            style={{
              right: "3.5%",
              top: "16.0%",
              boxShadow: "0 12px 28px -6px rgba(0, 0, 0, 0.7)",
            }}
            className="absolute z-30 flex items-center gap-2 p-1.5 sm:p-2 sm:px-3 rounded-2xl bg-slate-950/95 text-white backdrop-blur-md border border-slate-700 hover:border-amber-400 shadow-2xl cursor-pointer group transition-all"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black flex items-center justify-center border border-slate-700 group-hover:border-amber-400 transition-colors shrink-0">
              <XLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:text-amber-300 transition-colors" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-white group-hover:text-amber-300 leading-tight">
                Project X
              </p>
              <p className="text-[9px] text-slate-400 leading-tight">
                @moolieshq
              </p>
            </div>
          </motion.a>

          {/* Interactive Responsive Hotspots (Zero Floating Icons) */}
          {CORE_HOTSPOTS.map((hotspot) => (
            <WorldHotspot
              key={hotspot.id}
              hotspot={hotspot}
              onClick={handleHotspotClick}
              isActive={
                (activeModal === "opensea" && hotspot.id === "opensea") ||
                (activeModal === "whitelist" && hotspot.id === "whitelist-window") ||
                (activeModal === "collection" && hotspot.id === "supply") ||
                (activeModal === "roadmap" && hotspot.id === "goalpost")
              }
            />
          ))}
        </div>
      </main>

      {/* Floating Left/Right Navigation Arrows for quick mobile panning */}
      <button
        type="button"
        onClick={() => {
          soundEngine?.playPop();
          scrollToPercent(0);
        }}
        aria-label="Scroll left to OpenSea & Treehouse"
        className="md:hidden fixed left-2 bottom-14 z-30 p-2 rounded-full bg-slate-950/80 text-white border border-slate-700 shadow-lg backdrop-blur-md cursor-pointer hover:bg-slate-900 active:scale-90 transition-transform"
      >
        <ChevronLeft className="w-4 h-4 text-amber-300" />
      </button>

      <button
        type="button"
        onClick={() => {
          soundEngine?.playPop();
          scrollToPercent(100);
        }}
        aria-label="Scroll right to Goalpost & Supply"
        className="md:hidden fixed right-2 bottom-14 z-30 p-2 rounded-full bg-slate-950/80 text-white border border-slate-700 shadow-lg backdrop-blur-md cursor-pointer hover:bg-slate-900 active:scale-90 transition-transform"
      >
        <ChevronRight className="w-4 h-4 text-amber-300" />
      </button>

      {/* Bottom Hint Banner - Minimal, Clean Guidance */}
      <footer className="fixed bottom-3 sm:bottom-4 inset-x-0 z-20 flex items-center justify-center pointer-events-none px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950/85 text-white backdrop-blur-md border border-amber-300/40 shadow-xl text-[11px] sm:text-xs font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
          <span className="hidden sm:inline text-slate-300">
            Click directly on the <strong>OpenSea Sign</strong>, <strong>Treehouse Window</strong>, <strong>2000 Supply</strong>, or <strong>Goalpost</strong>!
          </span>
          <span className="sm:hidden text-[10px] text-slate-300">
            Swipe world &bull; Tap Window, Signs, or Goalpost
          </span>
        </motion.div>
      </footer>

      {/* 1. OpenSea Coming Soon Modal */}
      <OpenSeaComingSoonModal
        isOpen={activeModal === "opensea"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* 2. Whitelist Application Modal */}
      <WhitelistModal
        isOpen={activeModal === "whitelist"}
        onClose={closeModal}
      />

      {/* 3. Collection Details Modal (Supply Section) */}
      <CollectionDetailsModal
        isOpen={activeModal === "collection"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* 4. Roadmap Modal (Goalpost Section) */}
      <RoadmapModal
        isOpen={activeModal === "roadmap"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />
    </div>
  );
};
