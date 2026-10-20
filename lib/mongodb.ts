import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || "";

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const isMongoConfigured = (): boolean => {
  return Boolean(MONGODB_URI && MONGODB_URI.startsWith("mongodb"));
};

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!isMongoConfigured()) {
    return null;
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2500,
      dbName: process.env.MONGODB_DB_NAME || "moolies_db",
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    console.error("Failed to connect to MongoDB:", e);
    throw e;
  }

  return cached!.conn;
}

// In-Memory Fallback Store for development or when MONGODB_URI is not provided
interface MemoryStore {
  applications: Array<{
    _id: string;
    walletAddress: string;
    twitterUsername: string;
    discordUsername?: string;
    email?: string;
    reason: string;
    referralCode?: string;
    status: "pending" | "approved" | "waitlisted" | "rejected";
    adminNotes?: string;
    createdAt: string;
    updatedAt: string;
  }>;
  settings: Record<string, unknown>;
  announcements: Array<{
    _id: string;
    title: string;
    content: string;
    category: string;
    publishedAt: string;
    externalLink?: string;
  }>;
  events: Array<{
    _id: string;
    title: string;
    description: string;
    eventDate: string;
    eventType: string;
    isCompleted: boolean;
  }>;
}

declare global {
  var memoryStore: MemoryStore | undefined;
}

if (!global.memoryStore) {
  global.memoryStore = {
    applications: [
      {
        _id: "demo-app-1",
        walletAddress: "0x71C8A1b2F89A4c6c21e0B11eE5E729F4a6C49573",
        twitterUsername: "@cryptomoolie",
        discordUsername: "MoolieFan#1234",
        email: "demo@moolies.world",
        reason: "Active member in the Moolies community and digital art collector!",
        referralCode: "MOOLIENEST",
        status: "approved",
        adminNotes: "Early supporter, approved during alpha review",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        _id: "demo-app-2",
        walletAddress: "0x3B8C1D54F2E7aB57E4E98a877cD9F67923485E8a",
        twitterUsername: "@solomoolie",
        discordUsername: "MooliesLover#5678",
        reason: "Love the cartoon art style and story of the treehouse!",
        status: "pending",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
    ],
    settings: {},
    announcements: [],
    events: [],
  };
}

export const getMemoryStore = (): MemoryStore => {
  return global.memoryStore!;
};
