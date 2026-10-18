export interface RoadmapPhase {
  phase: string;
  title: string;
  timeline: string;
  status: "completed" | "in-progress" | "upcoming";
  description: string;
  items: string[];
}

export const ROADMAP_DATA: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "The Gathering (Genesis)",
    timeline: "Q3 2026",
    status: "completed",
    description: "Laying the foundations of the Moolies forest, building our community, and handcrafting 2,000 distinct vector traits.",
    items: [
      "Original artwork & 2,000 unique trait generation",
      "Gas-optimized ERC-721A smart contract audit",
      "Launch of interactive web world and community Discord",
      "Whitelist application opening via the Secret Gate",
      "Social media campaigns and community meme art contests",
    ],
  },
  {
    phase: "Phase 2",
    title: "The Flight (Mint & Reveal)",
    timeline: "Q4 2026",
    status: "in-progress",
    description: "Whitelisted birds and public collectors mint their Moolie, followed by an interactive reveal event and OpenSea verification.",
    items: [
      "Guaranteed Whitelist Mint (Price: TBA)",
      "Public Mint Phase (Price: TBA)",
      "Synchronized metadata reveal with unboxing animation",
      "Secondary marketplace listing & OpenSea badge verification",
      "Rarity sniper integration & community treasury setup",
    ],
  },
  {
    phase: "Phase 3",
    title: "The Perch (Nesting & Utility)",
    timeline: "Q1 2027",
    status: "upcoming",
    description: "Holders nest their Moolies to earn $SEED tokens, gain voting power in the Nest DAO, and unlock physical collectors' merch.",
    items: [
      "Soft-staking 'Nesting' system (earn without transferring custody)",
      "Nest DAO launch: community-voted art grants and events",
      "Exclusive plushie & collectible enamel pin drops for verified holders",
      "Collabs with leading Web3 eco-friendly creative initiatives",
    ],
  },
  {
    phase: "Phase 4",
    title: "The Endless Valley (Metaverse & Lore)",
    timeline: "Q2 2027 & Beyond",
    status: "upcoming",
    description: "Expanding the world into a 2D interactive cozy sandbox game, illustrated children's storybook, and cross-chain expeditions.",
    items: [
      "Moolies World browser game expansion (picnic minigames, kite races)",
      "Physical illustrated coffee-table lore book published globally",
      "Animated short series starring Barnaby, Pip, and Archibald",
      "Generative 3D avatar companions for holders",
    ],
  },
];
