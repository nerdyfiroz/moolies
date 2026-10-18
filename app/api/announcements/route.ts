import { NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { Announcement } from "@/models/Announcement";
import { INITIAL_ANNOUNCEMENTS } from "@/lib/data/announcements";

export async function GET() {
  try {
    if (isMongoConfigured()) {
      await connectToDatabase();
      const announcements = await Announcement.find().sort({ publishedAt: -1 }).lean();
      if (announcements && announcements.length > 0) {
        return NextResponse.json({ success: true, data: announcements });
      }
    } else {
      const mem = getMemoryStore();
      if (mem.announcements && mem.announcements.length > 0) {
        return NextResponse.json({ success: true, data: mem.announcements });
      }
    }

    return NextResponse.json({ success: true, data: INITIAL_ANNOUNCEMENTS });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json({ success: true, data: INITIAL_ANNOUNCEMENTS });
  }
}
