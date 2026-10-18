export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  category: "general" | "whitelist" | "giveaway" | "tech" | "lore";
  date: string;
  linkText?: string;
  linkUrl?: string;
}

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-1",
    title: "The Secret Gate Is Open — Whitelist Applications Live!",
    content:
      "We are delighted to officially welcome early community members to apply for guaranteed mint slots. Applications are reviewed on a rolling basis by our core council. Be genuine in your reason to join!",
    category: "whitelist",
    date: "October 15, 2026",
    linkText: "Apply at the Gate",
    linkUrl: "#whitelist",
  },
  {
    id: "ann-2",
    title: "Smart Contract Completed & Audited with ERC-721A",
    content:
      "Otis completed our gas-efficient smart contract implementation. Minting up to 5 Moolies in a single transaction incurs virtually the same gas cost as minting just 1! The audit report is available for community review.",
    category: "tech",
    date: "October 12, 2026",
    linkText: "View Contract Details",
    linkUrl: "#blockchain",
  },
  {
    id: "ann-3",
    title: "Community Fan Art Contest: Draw Your Dream Kite",
    content:
      "Show your creativity! Pip is judging our community kite design challenge in Discord. Top 5 winning submissions will receive guaranteed WL spots and an exclusive custom kite trait in our secondary lore drop.",
    category: "giveaway",
    date: "October 08, 2026",
    linkText: "Join Discord Challenge",
    linkUrl: "https://discord.gg/moolies",
  },
];

export interface ProjectEventItem {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  type: "whitelist" | "mint" | "reveal" | "community" | "ama";
}

export const INITIAL_EVENTS: ProjectEventItem[] = [
  {
    id: "ev-1",
    title: "Whitelist Applications Review",
    description: "Review of Whitelist submissions & verified Twitter tasks. Date & time TBA.",
    date: "TBA",
    type: "whitelist",
  },
  {
    id: "ev-2",
    title: "Guaranteed Whitelist Mint",
    description: "Approved wallet addresses can mint at 0.025 ETH. Exact date and time is TBA.",
    date: "TBA",
    type: "mint",
  },
  {
    id: "ev-3",
    title: "Public Mint Phase",
    description: "Public mint opens for all remaining supply at 0.04 ETH. Date & time TBA.",
    date: "TBA",
    type: "mint",
  },
  {
    id: "ev-4",
    title: "Grand Metadata Reveal Party",
    description: "All unboxed Moolies reveal their traits, hats, and companions live in Discord voice stage!",
    date: "2026-11-10T18:00:00Z",
    type: "reveal",
  },
  {
    id: "ev-5",
    title: "AMA with Archibald & Pip",
    description: "Live community chat covering Phase 3 Nesting mechanics and physical collectibles.",
    date: "2026-11-15T19:00:00Z",
    type: "ama",
  },
];
