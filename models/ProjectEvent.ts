import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProjectEvent extends Document {
  title: string;
  description: string;
  eventDate: string;
  eventType: "whitelist" | "mint" | "reveal" | "community" | "ama";
  isCompleted: boolean;
  order: number;
}

const ProjectEventSchema = new Schema<IProjectEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventType: {
      type: String,
      enum: ["whitelist", "mint", "reveal", "community", "ama"],
      default: "community",
    },
    isCompleted: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ProjectEvent: Model<IProjectEvent> =
  mongoose.models.ProjectEvent ||
  mongoose.model<IProjectEvent>("ProjectEvent", ProjectEventSchema);
