export interface WhitelistTask {
  id: string;
  title: string;
  description: string;
  actionUrl: string;
  actionLabel: string;
  isRequired: boolean;
}

export const DEFAULT_WHITELIST_TASKS: WhitelistTask[] = [
  {
    id: "task-follow-twitter",
    title: "Follow @moolieshq on X",
    description: "Stay updated with official drop alerts and project news",
    actionUrl: "https://x.com/moolieshq",
    actionLabel: "Follow",
    isRequired: true,
  },
  {
    id: "task-retweet-pinned",
    title: "Retweet the pinned post",
    description: "Help spread the word about Moolies in the ecosystem",
    actionUrl: "https://x.com/moolieshq",
    actionLabel: "Retweet",
    isRequired: true,
  },
];

export const DEFAULT_SETTINGS = {
  projectName: "Moolies",
  tagline: "A cozy, whimsical Moolies realm exploring the metaverse",
  description:
    "Moolies is a generative collection of 2,000 lovable Moolies adventurers living peacefully across the sunny meadow, lake, and treehouse. Each Moolie grants membership to the Nest DAO, exclusive physical & digital art drops, and staking rewards.",
  logoUrl: "/logo.png",
  totalSupply: 2000,
  mintedSupply: 412,
  whitelistPrice: "TBA",
  publicPrice: "TBA",
  currency: "ETH",
  blockchainNetwork: "Ethereum",
  chainId: 1,
  contractAddress: "0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573",
  explorerUrl: "https://etherscan.io",
  openseaUrl: "https://opensea.io/collection/moolies-official",
  twitterUrl: "https://x.com/moolieshq",
  discordUrl: "https://discord.gg/moolies",
  githubUrl: "https://github.com/moolies-nft",
  mintPhase: "whitelist" as const,
  isWhitelistOpen: true,
  whitelistStartDate: "TBA",
  whitelistEndDate: "TBA",
  publicMintStartDate: "TBA",
  revealDate: "TBA",
  whitelistTasks: DEFAULT_WHITELIST_TASKS,
};
