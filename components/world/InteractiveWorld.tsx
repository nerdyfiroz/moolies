"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { WorldHotspot, InteractiveHotspot } from "@/components/world/WorldHotspot";
import { WorldNavbar, XLogo } from "@/components/world/WorldNavbar";
import { OpenSeaComingSoonModal } from "@/components/modals/OpenSeaComingSoonModal";
import { WhitelistModal } from "@/components/modals/WhitelistModal";
import { CollectionDetailsModal } from "@/components/modals/CollectionDetailsModal";
import { RoadmapModal } from "@/components/modals/RoadmapModal";

// The 4 core invisible hotspots matching the landmarks in moolies-world.png (1024x650)
// 100% Invisible on the artwork, exactly like fomies.family
const CORE_HOTSPOTS: InteractiveHotspot[] = [
  {
    id: "opensea",
    title: "OpenSea Marketplace",
    subtitle: "Coming Soon... Click to view secondary market status",
    left: 0.0,
    top: 32.0,
    width: 13.0,
    height: 26.0,
  },
  {
    id: "whitelist-window",
    title: "Treehouse Window (Whitelist Bureau)",
    subtitle: "Click window to open the Whitelist Application Form",
    left: 9.0,
    top: 6.0,
    width: 16.0,
    height: 23.0,
  },
  {
    id: "goalpost",
    title: "Meadow Goalpost (Roadmap)",
    subtitle: "Click goalpost to view Scored Project Goals & Roadmap",
    left: 67.0,
    top: 31.0,
    width: 19.0,
    height: 22.0,
  },
  {
    id: "supply",
    title: "2,000 Supply Board",
    subtitle: "Click supply to view Collection Details & Tokenomics",
    left: 85.0,
    top: 48.0,
    width: 15.0,
    height: 30.0,
  },
];

export const InteractiveWorld: React.FC = () => {
  const [activeModal, setActiveModal] = useState<"opensea" | "whitelist" | "collection" | "roadmap" | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Position viewport pleasantly on initial mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      const targetScroll = (el.scrollWidth - el.clientWidth) * 0.2;
      if (targetScroll > 0) {
        el.scrollLeft = targetScroll;
      }
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, [data-hotspot]")) {
      return;
    }
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startXRef.current) * 1.3;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
      e.preventDefault();
      scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleHotspotClick = (hotspotId: string) => {
    if (hotspotId === "opensea") {
      setActiveModal("opensea");
    } else if (hotspotId === "whitelist-window" || hotspotId === "whitelist") {
      setActiveModal("whitelist");
    } else if (hotspotId === "supply" || hotspotId === "collection") {
      setActiveModal("collection");
    } else if (hotspotId === "goalpost" || hotspotId === "roadmap") {
      setActiveModal("roadmap");
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#5fc2ea] select-none">
      {/* Top Floating Navbar (Only the 5 requested sections) */}
      <WorldNavbar
        onOpenOpenSea={() => setActiveModal("opensea")}
        onOpenWhitelist={() => setActiveModal("whitelist")}
        onOpenCollectionDetails={() => setActiveModal("collection")}
        onOpenRoadmap={() => setActiveModal("roadmap")}
        activeSection={activeModal}
      />

      {/* Full-Screen Edge-to-Edge Main Viewport with Panning */}
      <main
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[100dvh] overflow-x-auto overflow-y-hidden select-none bg-[#5fc2ea] no-scrollbar flex items-center justify-start md:justify-center cursor-grab active:cursor-grabbing touch-pan-x"
      >
        {/*
          World Artwork Canvas — Fully Covers Full Screen.
          Maintains exact 1024 / 650 aspect ratio so invisible hotspot percentages
          perfectly align with the drawn artwork on every single device!
        */}
        <div
          style={{
            width: "max(100vw, calc(100dvh * 1024 / 650))",
            height: "max(100dvh, calc(100vw * 650 / 1024))",
            aspectRatio: "1024 / 650",
          }}
          className="relative flex-shrink-0 bg-[#5fc2ea] overflow-hidden"
        >
          {/* Main Landscape Illustration Image */}
          <Image
            src="/moolies-world.png"
            alt="Moolies Interactive Illustrated World"
            fill
            priority
            quality={95}
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="w-full h-full object-fill pointer-events-none select-none"
          />

          {/* Section 5: Minimal Project X (Twitter) Logo Link on the website */}
          <a
            href="https://x.com/moolieshq"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Official Project on X / Twitter (@moolieshq)"
            style={{
              right: "2.5%",
              top: "14.0%",
            }}
            className="absolute z-30 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-950/90 hover:bg-black text-white hover:text-amber-300 backdrop-blur-md border border-slate-700/80 hover:border-amber-400 shadow-xl cursor-pointer transition-all hover:scale-105 active:scale-95"
            aria-label="Official Project X Twitter"
          >
            <XLogo className="w-4 h-4 sm:w-5 sm:h-5 text-current" />
          </a>

          {/*
            100% Invisible Section Hotspots on the artwork:
            1. OpenSea logo section (on left tree trunk) -> Coming soon... with animation
            2. Whitelist section (small treehouse window) -> Whitelist application form
            3. Supply section (2,000 supply board on right) -> Collection details with animation
            4. Roadmap section (meadow goalpost) -> Beautiful roadmap and scored goals
          */}
          {CORE_HOTSPOTS.map((hotspot) => (
            <WorldHotspot
              key={hotspot.id}
              hotspot={hotspot}
              onClick={handleHotspotClick}
            />
          ))}
        </div>
      </main>

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
