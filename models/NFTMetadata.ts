import mongoose, { Schema, Document, Model } from "mongoose";

export interface INFTAttribute {
  trait_type: string;
  value: string;
}

export interface INFTMetadata extends Document {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  attributes: INFTAttribute[];
  rarityScore: number;
  rarityTier: "Common" | "Rare" | "Epic" | "Legendary";
  ownerAddress?: string;
  openseaUrl?: string;
}

const NFTMetadataSchema = new Schema<INFTMetadata>(
  {
    tokenId: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    attributes: [
      {
        trait_type: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    rarityScore: { type: Number, default: 50 },
    rarityTier: {
      type: String,
      enum: ["Common", "Rare", "Epic", "Legendary"],
      default: "Common",
    },
    ownerAddress: { type: String, default: "" },
    openseaUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const NFTMetadata: Model<INFTMetadata> =
  mongoose.models.NFTMetadata ||
  mongoose.model<INFTMetadata>("NFTMetadata", NFTMetadataSchema);
