import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  category: "general" | "whitelist" | "giveaway" | "tech" | "lore";
  externalLink?: string;
  publishedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["general", "whitelist", "giveaway", "tech", "lore"],
      default: "general",
    },
    externalLink: { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Announcement: Model<IAnnouncement> =
  mongoose.models.Announcement ||
  mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);
