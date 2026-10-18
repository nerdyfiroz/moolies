export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarChar: string; // owl visual descriptor
  quote: string;
  bio: string;
  twitter?: string;
  discord?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "archibald",
    name: "Professor Archibald",
    role: "Founder & Strategy Lead",
    avatarChar: "Spectacled Owl in Tuxedo",
    quote: "A well-read owl sees beyond the next tree branch.",
    bio: "Web3 veteran and collector since 2021. Leads tokenomics, brand partnerships, and community treasury governance with meticulous attention to detail.",
    twitter: "https://x.com/ArchibaldMoolie",
    discord: "Archibald#0001",
  },
  {
    id: "pip",
    name: "Pip",
    role: "Lead Artist & Illustrator",
    avatarChar: "Blue Owl in Beanie with Kite",
    quote: "Every cloud in the sky has a story waiting to be drawn.",
    bio: "Visual artist and children's book illustrator with over 9 years of animation experience. Handcrafted the entire Moolies landscape, characters, and trait universe.",
    twitter: "https://x.com/PipIllustrates",
    discord: "PipArt#1111",
  },
  {
    id: "barnaby",
    name: "Barnaby",
    role: "Head of Community & Vibe Curator",
    avatarChar: "Boba Owl in Polka-Dot Hoodie",
    quote: "Life is sweeter with extra brown sugar pearls and good friends.",
    bio: "Community builder known for hosting cozy Discord game nights, mental health check-ins, and meme art challenges.",
    twitter: "https://x.com/BobaBarnaby",
    discord: "BarnabyBoba#2222",
  },
  {
    id: "otis",
    name: "Otis",
    role: "Core Smart Contract & Full-Stack Engineer",
    avatarChar: "Sleeping Dev Owl with Eye Mask",
    quote: "Deploying on mainnet... waking up after gas drops to 12 gwei.",
    bio: "Full-stack Web3 developer specialized in ERC-721A optimizations, decentralized storage redundancy, and Next.js reactive applications.",
    twitter: "https://x.com/OtisDevs",
    discord: "OtisDev#3333",
  },
  {
    id: "violet",
    name: "Violet",
    role: "Security & Treehouse Guardian",
    avatarChar: "Purple Lookout Owl in Treehouse",
    quote: "No bad actors make it past my treehouse balcony.",
    bio: "Discord security architect and anti-phishing specialist ensuring a bot-free, secure environment for all Moolies applicants and holders.",
    twitter: "https://x.com/VioletLookout",
    discord: "VioletGuardian#4444",
  },
];
