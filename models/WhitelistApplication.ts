import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWhitelistApplication extends Document {
  walletAddress: string;
  twitterUsername: string;
  discordUsername?: string;
  email?: string;
  reason: string;
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
      required: true,
      trim: true,
      maxlength: 1000,
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
