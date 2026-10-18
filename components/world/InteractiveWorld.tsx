"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { WorldHotspot } from "@/components/world/WorldHotspot";
import { WorldNavbar, XLogo } from "@/components/world/WorldNavbar";
import { WORLD_HOTSPOTS } from "@/lib/data/hotspots";

// All modal components
import { OpenSeaComingSoonModal } from "@/components/modals/OpenSeaComingSoonModal";
import { WhitelistModal } from "@/components/modals/WhitelistModal";
import { CollectionDetailsModal } from "@/components/modals/CollectionDetailsModal";
import { RoadmapModal } from "@/components/modals/RoadmapModal";
import { NFTExplorerModal } from "@/components/modals/NFTExplorerModal";
import { ProjectDetailsModal } from "@/components/modals/ProjectDetailsModal";
import { AnnouncementsModal } from "@/components/modals/AnnouncementsModal";
import { BlockchainModal } from "@/components/modals/BlockchainModal";
import { ScheduleModal } from "@/components/modals/ScheduleModal";
import { MintInfoModal } from "@/components/modals/MintInfoModal";
import { TeamModal } from "@/components/modals/TeamModal";
import { WhitepaperModal } from "@/components/modals/WhitepaperModal";
import { FAQModal } from "@/components/modals/FAQModal";

// All possible modal IDs that can be active
type ModalId =
  | "opensea"
  | "whitelist"
  | "collection"
  | "roadmap"
  | "nft-explorer"
  | "project-details"
  | "announcements"
  | "blockchain"
  | "schedule"
  | "mint-info"
  | "team"
  | "whitepaper"
  | "faq"
  | null;

export const InteractiveWorld: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalId>(null);
  const [teamMemberId, setTeamMemberId] = useState<string>("archibald");
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

  /**
   * Maps a hotspot's modalId to the active modal state.
   * Team member hotspots (team-pip, team-barnaby, etc.) all open
   * the shared TeamModal with the correct member pre-selected.
   */
  const openModalForHotspot = (modalId: string) => {
    // Handle team member hotspots — they share the TeamModal
    if (modalId.startsWith("team-")) {
      const memberId = modalId.replace("team-", "");
      setTeamMemberId(memberId);
      setActiveModal("team");
      return;
    }

    // Direct modal ID mappings
    const modalMap: Record<string, ModalId> = {
      "opensea": "opensea",
      "whitelist": "whitelist",
      "collection": "collection",
      "roadmap": "roadmap",
      "nft-explorer": "nft-explorer",
      "project-details": "project-details",
      "announcements": "announcements",
      "blockchain": "blockchain",
      "schedule": "schedule",
      "mint-info": "mint-info",
      "whitepaper": "whitepaper",
      "faq": "faq",
    };

    const target = modalMap[modalId];
    if (target) {
      setActiveModal(target);
    }
  };

  const handleHotspotClick = (hotspotId: string) => {
    // Find the hotspot in WORLD_HOTSPOTS to get its modalId
    const hotspot = WORLD_HOTSPOTS.find((h) => h.id === hotspotId);
    if (hotspot) {
      openModalForHotspot(hotspot.modalId);
    }
  };

  // Navbar section callbacks — map navbar button IDs to modal states
  const handleNavOpenSea = () => setActiveModal("opensea");
  const handleNavWhitelist = () => setActiveModal("whitelist");
  const handleNavCollection = () => setActiveModal("collection");
  const handleNavRoadmap = () => setActiveModal("roadmap");

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#5fc2ea] select-none">
      {/* Top Floating Navbar */}
      <WorldNavbar
        onOpenOpenSea={handleNavOpenSea}
        onOpenWhitelist={handleNavWhitelist}
        onOpenCollectionDetails={handleNavCollection}
        onOpenRoadmap={handleNavRoadmap}
        activeSection={
          activeModal === "opensea" || activeModal === "whitelist" ||
          activeModal === "collection" || activeModal === "roadmap"
            ? (activeModal as "opensea" | "whitelist" | "collection" | "roadmap")
            : null
        }
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
            All 15 Interactive Section Hotspots from WORLD_HOTSPOTS data.
            Each hotspot is 100% invisible on the artwork — zero borders,
            zero rings, zero popups. Only cursor-pointer on hover.
            Clicking opens the corresponding section detail modal.
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

      {/* ==================== ALL SECTION MODALS ==================== */}

      {/* OpenSea Coming Soon Modal */}
      <OpenSeaComingSoonModal
        isOpen={activeModal === "opensea"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* Whitelist Application Modal */}
      <WhitelistModal
        isOpen={activeModal === "whitelist"}
        onClose={closeModal}
      />

      {/* Collection Details Modal (Supply Section) */}
      <CollectionDetailsModal
        isOpen={activeModal === "collection"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* Roadmap Modal (Goalpost Section) */}
      <RoadmapModal
        isOpen={activeModal === "roadmap"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* NFT Explorer Modal (Treehouse Section) */}
      <NFTExplorerModal
        isOpen={activeModal === "nft-explorer"}
        onClose={closeModal}
      />

      {/* Project Details Modal (Kite Section) */}
      <ProjectDetailsModal
        isOpen={activeModal === "project-details"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
        onOpenExplorer={() => setActiveModal("nft-explorer")}
      />

      {/* Announcements Modal */}
      <AnnouncementsModal
        isOpen={activeModal === "announcements"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* Blockchain / Ethereum Contract Modal */}
      <BlockchainModal
        isOpen={activeModal === "blockchain"}
        onClose={closeModal}
      />

      {/* Schedule / Live Countdowns Modal */}
      <ScheduleModal
        isOpen={activeModal === "schedule"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* Mint Info Modal (OpenSea sign + Supply sign) */}
      <MintInfoModal
        isOpen={activeModal === "mint-info"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* Team Modal (shared by all team member hotspots) */}
      <TeamModal
        isOpen={activeModal === "team"}
        onClose={closeModal}
        selectedMemberId={teamMemberId}
      />

      {/* Whitepaper Modal */}
      <WhitepaperModal
        isOpen={activeModal === "whitepaper"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      {/* FAQ Modal */}
      <FAQModal
        isOpen={activeModal === "faq"}
        onClose={closeModal}
      />
    </div>
  );
};
