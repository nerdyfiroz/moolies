import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProjectSettings extends Document {
  projectName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  totalSupply: number;
  mintedSupply: number;
  whitelistPrice: string;
  publicPrice: string;
  currency: string;
  blockchainNetwork: string;
  chainId: number;
  contractAddress: string;
  explorerUrl: string;
  openseaUrl: string;
  twitterUrl: string;
  discordUrl: string;
  githubUrl?: string;
  mintPhase: "upcoming" | "whitelist" | "public" | "soldout" | "paused";
  isWhitelistOpen: boolean;
  whitelistStartDate: string;
  whitelistEndDate: string;
  publicMintStartDate: string;
  revealDate: string;
  whitelistTasks?: Array<{
    id: string;
    title: string;
    description?: string;
    actionUrl?: string;
    actionLabel?: string;
    isRequired?: boolean;
  }>;
  updatedAt: Date;
}

const ProjectSettingsSchema = new Schema<IProjectSettings>(
  {
    projectName: { type: String, default: "Moolies" },
    tagline: { type: String, default: "A cozy, whimsical Moolies realm exploring the metaverse" },
    description: {
      type: String,
      default:
        "Moolies is a generative collection of 2,000 lovable Moolies adventurers living peacefully across the sunny meadow, lake, and treehouse. Each Moolie grants membership to the Nest DAO, exclusive lore drops, and staking rewards.",
    },
    logoUrl: { type: String, default: "/logo.png" },
    totalSupply: { type: Number, default: 2000 },
    mintedSupply: { type: Number, default: 412 },
    whitelistPrice: { type: String, default: "0.025" },
    publicPrice: { type: String, default: "0.04" },
    currency: { type: String, default: "ETH" },
    blockchainNetwork: { type: String, default: "Ethereum" },
    chainId: { type: Number, default: 1 },
    contractAddress: { type: String, default: "0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573" },
    explorerUrl: { type: String, default: "https://etherscan.io" },
    openseaUrl: { type: String, default: "https://opensea.io/collection/moolies-official" },
    twitterUrl: { type: String, default: "https://x.com/moolieshq" },
    discordUrl: { type: String, default: "https://discord.gg/moolies" },
    githubUrl: { type: String, default: "" },
    mintPhase: {
      type: String,
      enum: ["upcoming", "whitelist", "public", "soldout", "paused"],
      default: "whitelist",
    },
    isWhitelistOpen: { type: Boolean, default: true },
    whitelistStartDate: { type: String, default: "TBA" },
    whitelistEndDate: { type: String, default: "TBA" },
    publicMintStartDate: { type: String, default: "TBA" },
    revealDate: { type: String, default: "TBA" },
    whitelistTasks: { type: Array, default: [] },
  },
  { timestamps: true }
);

export const ProjectSettings: Model<IProjectSettings> =
  mongoose.models.ProjectSettings ||
  mongoose.model<IProjectSettings>("ProjectSettings", ProjectSettingsSchema);
