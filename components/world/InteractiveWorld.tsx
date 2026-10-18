"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { WorldHotspot } from "@/components/world/WorldHotspot";
import { XLogo } from "@/components/world/WorldNavbar";
import { WORLD_HOTSPOTS } from "@/lib/data/hotspots";

// The 4 Section Modals (5th Section is Project Twitter direct link)
import { OpenSeaComingSoonModal } from "@/components/modals/OpenSeaComingSoonModal";
import { WhitelistModal } from "@/components/modals/WhitelistModal";
import { CollectionDetailsModal } from "@/components/modals/CollectionDetailsModal";
import { RoadmapModal } from "@/components/modals/RoadmapModal";
import { LivingWorldEffects } from "@/components/world/LivingWorldEffects";
import { CinematicDoorGate } from "@/components/world/CinematicDoorGate";
import { ScoutedNavbarArrival } from "@/components/world/ScoutedNavbarArrival";

// The 4 interactive modal sections
type SectionModalId = "opensea" | "whitelist" | "collection" | "roadmap" | null;

export const InteractiveWorld: React.FC = () => {
  const [activeModal, setActiveModal] = useState<SectionModalId>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [navbarState, setNavbarState] = useState<"hidden" | "arriving" | "visible">("hidden");

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

  // Canvas Click: when user clicks anywhere on the website except the selected sections,
  // the navbar arrives with butterfly scouts!
  const handleCanvasClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, [data-hotspot]")) {
      return;
    }
    if (hasMovedRef.current) {
      return;
    }
    if (navbarState === "hidden") {
      setNavbarState("arriving");
    }
  };

  // Hotspot click handler — opens the corresponding modal
  const handleHotspotClick = (hotspotId: string) => {
    if (hotspotId === "opensea" || hotspotId === "sign-opensea") {
      setActiveModal("opensea");
    } else if (hotspotId === "whitelist" || hotspotId === "whitelist-window" || hotspotId === "whitelist-gate") {
      setActiveModal("whitelist");
    } else if (hotspotId === "collection" || hotspotId === "supply" || hotspotId === "sign-supply") {
      setActiveModal("collection");
    } else if (hotspotId === "roadmap" || hotspotId === "goalpost" || hotspotId === "roadmap-book") {
      setActiveModal("roadmap");
    }
  };

  // Navbar section triggers
  const handleNavOpenSea = () => setActiveModal("opensea");
  const handleNavWhitelist = () => setActiveModal("whitelist");
  const handleNavCollection = () => setActiveModal("collection");
  const handleNavRoadmap = () => setActiveModal("roadmap");

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#5fc2ea] select-none">
      {/* Cinematic Wooden Door Gate Entry Loading Interface */}
      {!hasEntered && (
        <CinematicDoorGate onEnter={() => setHasEntered(true)} />
      )}

      {/* Floating Navbar: Hidden at first, scouts in with butterflies on canvas click */}
      <ScoutedNavbarArrival
        navbarState={navbarState}
        onArrivalComplete={() => setNavbarState("visible")}
        onOpenOpenSea={handleNavOpenSea}
        onOpenWhitelist={handleNavWhitelist}
        onOpenCollectionDetails={handleNavCollection}
        onOpenRoadmap={handleNavRoadmap}
        activeSection={activeModal}
      />

      {/* Full-Screen Edge-to-Edge Main Viewport with Panning */}
      <main
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        className="relative w-full h-[100dvh] overflow-x-auto overflow-y-hidden select-none bg-[#5fc2ea] no-scrollbar flex items-center justify-start md:justify-center cursor-grab active:cursor-grabbing touch-pan-x"
      >
        {/* Ambient atmospheric backdrop for ultra-wide desktop displays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block select-none" aria-hidden="true">
          <Image
            src="/moolies-world.png"
            alt=""
            fill
            priority={false}
            quality={40}
            className="w-full h-full object-cover blur-3xl opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-[#5fc2ea]/20 backdrop-blur-sm" />
        </div>

        {/*
          World Artwork Canvas — 100% fully visible on desktop view without any cropping.
          Fixed firmly in place (no mouse tilt / wobble).
        */}
        <div
          className="world-canvas-container relative z-10 flex-shrink-0 bg-[#5fc2ea] overflow-hidden shadow-2xl"
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

          {/* Living World Ambient Atmosphere (Continuous Clouds Left-to-Right, River Waves, Flying Butterflies) */}
          <LivingWorldEffects />

          {/* Section 5: Official Project X (Twitter) Quick Access Button on Artwork */}
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
            Interactive landmark hotspots on the artwork:
            1. OpenSea Sign (Left tree trunk) -> OpenSea Coming Soon Modal
            2. Whitelist (Treehouse porch) -> Whitelist Modal
            3. Roadmap (Meadow goalpost) -> Roadmap Modal
            4. Collection Details (2,000 Supply board on right) -> Collection Details Modal
            (5. Project Twitter is the X link button at top right)
          */}
          {WORLD_HOTSPOTS.map((hotspot) => (
            <WorldHotspot
              key={hotspot.id}
              hotspot={hotspot}
              onClick={handleHotspotClick}
            />
          ))}
        </div>
      </main>

      {/* ==================== 5 SECTIONS: MODALS ==================== */}

      {/* Section 1: OpenSea Coming Soon Modal */}
      <OpenSeaComingSoonModal
        isOpen={activeModal === "opensea"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* Section 2: Whitelist Application Modal */}
      <WhitelistModal
        isOpen={activeModal === "whitelist"}
        onClose={closeModal}
      />

      {/* Section 3: Collection Details Modal */}
      <CollectionDetailsModal
        isOpen={activeModal === "collection"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* Section 4: Roadmap Modal */}
      <RoadmapModal
        isOpen={activeModal === "roadmap"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />
    </div>
  );
};
