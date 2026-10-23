import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWhitelistApplication extends Document {
  walletAddress: string;
  twitterUsername: string;
  twitterCommentUrl?: string;
  discordUsername?: string;
  email?: string;
  reason?: string;
  completedTasks?: string[];
  referralCode?: string;
  status: "pending" | "approved" | "waitlisted" | "rejected";
  adminNotes?: string;
  reviewedAt?: Date;
  ipHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WhitelistApplicationSchema = new Schema<IWhitelistApplication>(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    twitterUsername: {
      type: String,
      required: true,
      trim: true,
    },
    twitterCommentUrl: {
      type: String,
      trim: true,
      default: "",
    },
    discordUsername: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    reason: {
      type: String,
      default: "Twitter and Whitelist tasks completed",
      trim: true,
      maxlength: 1000,
    },
    completedTasks: {
      type: [String],
      default: [],
    },
    referralCode: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "waitlisted", "rejected"],
      default: "pending",
      index: true,
    },
    adminNotes: {
      type: String,
      default: "",
    },
    reviewedAt: {
      type: Date,
    },
    ipHash: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const WhitelistApplication: Model<IWhitelistApplication> =
  mongoose.models.WhitelistApplication ||
  mongoose.model<IWhitelistApplication>("WhitelistApplication", WhitelistApplicationSchema);
