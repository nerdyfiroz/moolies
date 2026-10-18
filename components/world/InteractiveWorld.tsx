"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WORLD_HOTSPOTS, Hotspot } from "@/lib/data/hotspots";
import { WorldHotspot } from "@/components/world/WorldHotspot";
import { WorldNavbar } from "@/components/world/WorldNavbar";
import { WorldDirectoryDrawer } from "@/components/world/WorldDirectoryDrawer";
import { ProjectDetailsModal } from "@/components/modals/ProjectDetailsModal";
import { NFTExplorerModal } from "@/components/modals/NFTExplorerModal";
import { WhitelistModal } from "@/components/modals/WhitelistModal";
import { MintInfoModal } from "@/components/modals/MintInfoModal";
import { ScheduleModal } from "@/components/modals/ScheduleModal";
import { TeamModal } from "@/components/modals/TeamModal";
import { RoadmapModal } from "@/components/modals/RoadmapModal";
import { BlockchainModal } from "@/components/modals/BlockchainModal";
import { AnnouncementsModal } from "@/components/modals/AnnouncementsModal";
import { FAQModal } from "@/components/modals/FAQModal";


export const InteractiveWorld: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState<string>("archibald");
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleHotspotClick = (hotspot: Hotspot) => {
    setActiveHotspotId(hotspot.id);

    // Map hotspot to modal
    switch (hotspot.id) {
      case "kite":
        setActiveModal("project-details");
        break;
      case "treehouse":
        setActiveModal("nft-explorer");
        break;
      case "whitelist-gate":
        setActiveModal("whitelist");
        break;
      case "sign-opensea":
      case "sign-supply":
        setActiveModal("mint-info");
        break;
      case "schedule":
        setActiveModal("schedule");
        break;
      case "owl-boba":
        setSelectedTeamMemberId("barnaby");
        setActiveModal("team");
        break;
      case "owl-suit":
        setSelectedTeamMemberId("archibald");
        setActiveModal("team");
        break;
      case "owl-artist":
        setSelectedTeamMemberId("pip");
        setActiveModal("team");
        break;
      case "owl-dev":
        setSelectedTeamMemberId("otis");
        setActiveModal("team");
        break;
      case "roadmap-book":
        setActiveModal("roadmap");
        break;
      case "lake":
        setActiveModal("blockchain");
        break;
      case "announcements":
        setActiveModal("announcements");
        break;
      case "faq":
        setActiveModal("faq");
        break;
      default:
        setActiveModal(hotspot.modalId);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveHotspotId(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#5fc2ea] select-none flex flex-col justify-between">
      {/* Top Navbar */}
      <WorldNavbar onOpenDirectory={() => setIsDirectoryOpen(true)} />

      {/* Main Viewport Container */}
      <main className="relative flex-1 w-full h-full flex items-center justify-center overflow-auto sm:overflow-hidden p-0 sm:p-2">
        {/* World Artwork Aspect Box (1024 x 650 => 16:10.15) */}
        <div
          style={{ aspectRatio: "1024 / 650" }}
          className="relative w-full max-w-[1920px] max-h-full mx-auto shadow-2xl overflow-hidden min-w-[760px] sm:min-w-0"
        >
          {/* Main Landscape Illustration Image */}
          <Image
            src="/moolies-world.png"
            alt="Moolies Interactive Illustrated World"
            fill
            priority
            quality={95}
            sizes="100vw"
            onLoad={() => setImageLoaded(true)}
            className={`object-contain sm:object-cover w-full h-full pointer-events-none transition-opacity duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Subtle floating kite motion overlay (synchronized over the cat-kite in sky) */}
          <motion.div
            style={{ left: "67.5%", top: "12%" }}
            animate={{
              y: [-4, 6, -4],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-28 h-28 pointer-events-none z-10 opacity-0"
            aria-hidden="true"
          />

          {/* Interactive Normalized Hotspots System */}
          {WORLD_HOTSPOTS.map((hotspot) => (
            <WorldHotspot
              key={hotspot.id}
              hotspot={hotspot}
              onClick={handleHotspotClick}
              isActive={activeHotspotId === hotspot.id}
            />
          ))}
        </div>
      </main>

      {/* Bottom Hint Banner - Clean, Minimal Text Without Icons */}
      <footer className="fixed bottom-3 sm:bottom-4 inset-x-0 z-30 flex items-center justify-center pointer-events-none px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pointer-events-auto flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900/85 text-white backdrop-blur-md border border-amber-300/40 shadow-xl text-xs sm:text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
          <span className="hidden sm:inline">
            Explore the realm — click directly on the <strong>Flying Cat-Kite</strong>, <strong>Treehouse</strong>, <strong>Signs</strong>, <strong>Gate</strong>, or <strong>Owls</strong>!
          </span>
          <span className="sm:hidden">
            Tap directly on characters and objects to explore
          </span>
          <button
            type="button"
            onClick={() => setIsDirectoryOpen(true)}
            className="px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] cursor-pointer transition-colors"
          >
            All Landmarks
          </button>
        </motion.div>
      </footer>

      {/* Accessible Landmarks Directory Drawer */}
      <WorldDirectoryDrawer
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        onSelectHotspot={handleHotspotClick}
      />

      {/* Modals Collection */}
      <ProjectDetailsModal
        isOpen={activeModal === "project-details"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
        onOpenExplorer={() => setActiveModal("nft-explorer")}
      />

      <NFTExplorerModal
        isOpen={activeModal === "nft-explorer"}
        onClose={closeModal}
      />

      <WhitelistModal
        isOpen={activeModal === "whitelist"}
        onClose={closeModal}
      />

      <MintInfoModal
        isOpen={activeModal === "mint-info"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      <ScheduleModal
        isOpen={activeModal === "schedule"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      <TeamModal
        isOpen={activeModal === "team"}
        onClose={closeModal}
        selectedMemberId={selectedTeamMemberId}
      />

      <RoadmapModal
        isOpen={activeModal === "roadmap"}
        onClose={closeModal}
      />

      <BlockchainModal
        isOpen={activeModal === "blockchain"}
        onClose={closeModal}
      />

      <AnnouncementsModal
        isOpen={activeModal === "announcements"}
        onClose={closeModal}
        onOpenWhitelist={() => setActiveModal("whitelist")}
      />

      <FAQModal
        isOpen={activeModal === "faq"}
        onClose={closeModal}
      />
    </div>
  );
};
