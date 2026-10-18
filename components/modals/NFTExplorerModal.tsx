"use client";

import React, { useState, useMemo } from "react";
import { WorldModal } from "@/components/world/WorldModal";
import { DEMO_NFTS, NFTItem } from "@/lib/data/nftCollection";
import { Layers, Search, Filter, ExternalLink, Sparkles, ChevronLeft, ChevronRight, User } from "lucide-react";
import Image from "next/image";

interface NFTExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NFTExplorerModal: React.FC<NFTExplorerModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("All");
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const rarities = ["All", "Legendary", "Epic", "Rare", "Common"];

  const filteredNFTs = useMemo(() => {
    return DEMO_NFTS.filter((nft) => {
      const matchesSearch =
        search === "" ||
        nft.tokenId.toString() === search.trim() ||
        nft.name.toLowerCase().includes(search.toLowerCase()) ||
        nft.attributes.some((a) => a.value.toLowerCase().includes(search.toLowerCase()));

      const matchesRarity =
        selectedRarity === "All" ||
        nft.rarityTier.toLowerCase() === selectedRarity.toLowerCase();

      return matchesSearch && matchesRarity;
    });
  }, [search, selectedRarity]);

  const totalPages = Math.ceil(filteredNFTs.length / itemsPerPage) || 1;
  const paginatedNFTs = filteredNFTs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRarityBadgeStyle = (tier: string) => {
    switch (tier) {
      case "Legendary":
        return "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300";
      case "Epic":
        return "bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/80 dark:text-purple-300";
      case "Rare":
        return "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/80 dark:text-sky-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <WorldModal
      isOpen={isOpen}
      onClose={onClose}
      title="The Treehouse Archive"
      subtitle="Collection Explorer • 2,000 Moolies Generation"
      icon={<Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
      badge="Explorer"
      maxWidth="max-w-5xl"
    >
      <div className="space-y-5">
        {/* Labeled Demo Notice */}
        <div className="px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between text-xs text-purple-800 dark:text-purple-300">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span><strong>Live Demo Metadata:</strong> Showing preview samples from the Genesis 2,000 collection trait generator.</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200">
            Preview Mode
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Token ID, trait, or name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          {/* Rarity filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Rarity:
            </span>
            {rarities.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setSelectedRarity(r);
                  setCurrentPage(1);
                }}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  selectedRarity === r
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of NFTs */}
        {paginatedNFTs.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <Layers className="w-10 h-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Moolies match your filter</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search keyword or selecting &quot;All&quot; rarities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {paginatedNFTs.map((nft) => (
              <div
                key={nft.tokenId}
                onClick={() => setSelectedNFT(nft)}
                className="group p-3 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 hover:border-purple-400 dark:hover:border-purple-500 transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square relative rounded-xl overflow-hidden bg-gradient-to-tr from-sky-100 to-amber-50 dark:from-slate-700 dark:to-slate-600 mb-2.5">
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                      #{nft.tokenId}
                    </span>
                    <span
                      className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-md border ${getRarityBadgeStyle(
                        nft.rarityTier
                      )}`}
                    >
                      {nft.rarityTier}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {nft.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {nft.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Score: {nft.rarityScore}</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold group-hover:underline">
                    View Traits &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredNFTs.length)} of {filteredNFTs.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Detailed Single NFT Modal / Overlay */}
        {selectedNFT && (
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-500/10 dark:bg-purple-950/30 border-2 border-purple-300 dark:border-purple-600 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2 py-0.5 rounded bg-purple-600 text-white">
                  Token #{selectedNFT.tokenId}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {selectedNFT.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNFT(null)}
                className="text-xs text-purple-700 dark:text-purple-300 hover:underline font-semibold cursor-pointer"
              >
                Close Details
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {selectedNFT.description}
            </p>

            {/* Traits Grid */}
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Handcrafted Vector Attributes ({selectedNFT.attributes.length})
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedNFT.attributes.map((attr, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-purple-200/60 dark:border-slate-700 text-center"
                  >
                    <p className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">
                      {attr.trait_type}
                    </p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-0.5">
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner & Marketplace Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs border-t border-purple-200/50 dark:border-purple-800/40">
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <User className="w-3.5 h-3.5" />
                <span>Owner: <code>{selectedNFT.ownerAddress.slice(0, 8)}...{selectedNFT.ownerAddress.slice(-6)}</code></span>
              </span>
              <a
                href={selectedNFT.openseaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-700 dark:text-purple-300 font-bold hover:underline"
              >
                <span>View on OpenSea Marketplace</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </WorldModal>
  );
};
