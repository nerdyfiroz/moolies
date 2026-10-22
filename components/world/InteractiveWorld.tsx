"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { WorldHotspot } from "@/components/world/WorldHotspot";
import { WORLD_HOTSPOTS } from "@/lib/data/hotspots";

// The 4 Section Modals (5th Section is Project Twitter direct link)
import { OpenSeaComingSoonModal } from "@/components/modals/OpenSeaComingSoonModal";
import { WhitelistModal } from "@/components/modals/WhitelistModal";
import { CollectionDetailsModal } from "@/components/modals/CollectionDetailsModal";
import { RoadmapModal } from "@/components/modals/RoadmapModal";
import { MooliesGatewayLoader } from "@/components/world/MooliesGatewayLoader";
import { WorldNavbar } from "@/components/world/WorldNavbar";
import { LivingWorldEffects } from "@/components/world/LivingWorldEffects";

// The 4 interactive modal sections
type SectionModalId = "opensea" | "whitelist" | "collection" | "roadmap" | null;

export const InteractiveWorld: React.FC = () => {
  const [activeModal, setActiveModal] = useState<SectionModalId>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Canvas Click: when user clicks on the page (except on section buttons or modals),
  // the menu arrives with the animation and the background becomes blurred!
  const handleCanvasClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, [data-hotspot], [role='dialog']")) {
      return;
    }
    if (hasMovedRef.current) {
      return;
    }

    if (activeModal) {
      setActiveModal(null);
      return;
    }

    // Toggle menu: opens with animation and blurs background
    setIsMenuOpen((prev) => !prev);
  };

  // Hotspot click handler — opens the corresponding modal and shows menu with section highlighted
  const handleHotspotClick = (hotspotId: string) => {
    setIsMenuOpen(true);
    if (hotspotId === "opensea" || hotspotId === "sign-opensea") {
      setActiveModal("opensea");
    } else if (
      hotspotId === "whitelist" ||
      hotspotId === "whitelist-window" ||
      hotspotId === "whitelist-gate"
    ) {
      setActiveModal("whitelist");
    } else if (
      hotspotId === "collection" ||
      hotspotId === "supply" ||
      hotspotId === "sign-supply"
    ) {
      setActiveModal("collection");
    } else if (
      hotspotId === "roadmap" ||
      hotspotId === "goalpost" ||
      hotspotId === "roadmap-book"
    ) {
      setActiveModal("roadmap");
    }
  };

  // Navbar section triggers
  const handleNavOpenSea = () => {
    setIsMenuOpen(true);
    setActiveModal("opensea");
  };
  const handleNavWhitelist = () => {
    setIsMenuOpen(true);
    setActiveModal("whitelist");
  };
  const handleNavCollection = () => {
    setIsMenuOpen(true);
    setActiveModal("collection");
  };
  const handleNavRoadmap = () => {
    setIsMenuOpen(true);
    setActiveModal("roadmap");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const isBackgroundBlurred = isMenuOpen || activeModal !== null;

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#5fc2ea] select-none">
      {/* 1. Loading Interface: Only 0-100% count, completely overlays everything until finished */}
      {isLoading && (
        <MooliesGatewayLoader onEnter={() => setIsLoading(false)} />
      )}

      {/* 2. Menu in Middle: Only arrives when user clicks the page (or a section hotspot) */}
      {!isLoading && isMenuOpen && (
        <div
          className={`fixed inset-0 z-[60] pointer-events-none flex items-center p-4 transition-all duration-500 ease-in-out ${
            activeModal
              ? "justify-center md:justify-start md:pl-8 lg:pl-14"
              : "justify-center"
          }`}
        >
          <div className="pointer-events-auto">
            <WorldNavbar
              onOpenOpenSea={handleNavOpenSea}
              onOpenWhitelist={handleNavWhitelist}
              onOpenCollectionDetails={handleNavCollection}
              onOpenRoadmap={handleNavRoadmap}
              activeSection={activeModal}
              onClose={() => {
                if (activeModal) {
                  setActiveModal(null);
                } else {
                  setIsMenuOpen(false);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* 3. Full-Screen Edge-to-Edge Main Viewport with Panning */}
      <main
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        className="relative w-full h-[100dvh] overflow-x-auto overflow-y-hidden select-none bg-[#5fc2ea] no-scrollbar flex items-center justify-start md:justify-center cursor-grab active:cursor-grabbing touch-pan-x"
      >
        {/*
          World Artwork Canvas:
          Clear upon arrival.
          When user clicks on the page and menu arrives, background blurs!
        */}
        <div
          className="world-canvas-container relative flex-shrink-0 bg-[#5fc2ea] overflow-hidden scale-[1.04] transition-all duration-700"
          style={{
            filter: isBackgroundBlurred ? "blur(7px) brightness(0.95)" : "none",
          }}
        >
          {/* Main Landscape Illustration Image */}
          <Image
            src="/moolies-world.png"
            alt="Moolies Illustrated World"
            fill
            priority
            quality={95}
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="w-full h-full object-fill pointer-events-none select-none"
          />

          {/* Living World Ambient Atmosphere (River waves & caustics, flying butterflies, 3D atmosphere) */}
          <LivingWorldEffects />

          {/* Interactive landmark hotspots on the artwork */}
          {WORLD_HOTSPOTS.map((hotspot) => (
            <WorldHotspot
              key={hotspot.id}
              hotspot={hotspot}
              onClick={handleHotspotClick}
              isActive={activeModal === hotspot.modalId}
            />
          ))}
        </div>

        {/* Ambient Darkened Tint Overlay when background is blurred */}
        <div
          className={`absolute inset-0 bg-slate-950/20 pointer-events-none z-10 transition-opacity duration-700 ${
            isBackgroundBlurred ? "opacity-100" : "opacity-0"
          }`}
        />
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
