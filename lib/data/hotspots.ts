export interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  category: "core" | "mint" | "lore" | "community";
  // Bounding box in percentage of artwork (0 to 100)
  left: number; // left %
  top: number; // top %
  width: number; // width %
  height: number; // height %
  borderRadius?: string;
  badgeText: string;
  accentColor: string;
  soundType: "chime" | "wood" | "water" | "pop";
  modalId: "opensea" | "whitelist" | "collection" | "roadmap";
  description: string;
  iconName: string;
}

// Exactly the 4 interactive artwork landmark hotspots (+ Project Twitter link)
export const WORLD_HOTSPOTS: Hotspot[] = [
  {
    id: "opensea",
    title: "OpenSea Marketplace",
    subtitle: "Coming Soon... Secondary Market Status",
    category: "mint",
    left: 0.0,
    top: 28.0,
    width: 13.0,
    height: 26.0,
    borderRadius: "rounded-r-2xl",
    badgeText: "OpenSea",
    accentColor: "#38BDF8",
    soundType: "wood",
    modalId: "opensea",
    description: "The wooden signboard carved on the ancient tree. Check verified OpenSea collection status, floor prices, and mint details.",
    iconName: "ShoppingBag",
  },
  {
    id: "whitelist",
    title: "Apply for Whitelist",
    subtitle: "Treehouse Window (Whitelist Bureau)",
    category: "mint",
    left: 9.0,
    top: 5.0,
    width: 17.0,
    height: 25.0,
    borderRadius: "rounded-3xl",
    badgeText: "Whitelist Bureau",
    accentColor: "#10B981",
    soundType: "wood",
    modalId: "whitelist",
    description: "Look through the treehouse window to submit your wallet and complete Twitter tasks for guaranteed early mint access.",
    iconName: "KeyRound",
  },
  {
    id: "roadmap",
    title: "Project Goals & Roadmap",
    subtitle: "Meadow Goalpost (Scored Goals)",
    category: "lore",
    left: 67.0,
    top: 31.0,
    width: 19.0,
    height: 23.0,
    borderRadius: "rounded-2xl",
    badgeText: "Roadmap",
    accentColor: "#10B981",
    soundType: "pop",
    modalId: "roadmap",
    description: "The meadow goalpost where every project goal is scored! View our 4-phase journey, nesting utility, and DAO milestones.",
    iconName: "Trophy",
  },
  {
    id: "collection",
    title: "Collection Details & Supply",
    subtitle: "2,000 Supply Board & Tokenomics",
    category: "mint",
    left: 85.0,
    top: 46.0,
    width: 15.0,
    height: 35.0,
    borderRadius: "rounded-l-2xl",
    badgeText: "2,000 Supply",
    accentColor: "#F59E0B",
    soundType: "wood",
    modalId: "collection",
    description: "Handcrafted wooden sign showing the capped 2,000 supply, fair tokenomics, 180+ traits, and holder IP benefits.",
    iconName: "Coins",
  },
];
