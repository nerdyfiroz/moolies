import { NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { ProjectEvent } from "@/models/ProjectEvent";
import { INITIAL_EVENTS } from "@/lib/data/announcements";

export async function GET() {
  try {
    if (isMongoConfigured()) {
      await connectToDatabase();
      const events = await ProjectEvent.find().sort({ order: 1, eventDate: 1 }).lean();
      if (events && events.length > 0) {
        return NextResponse.json({ success: true, data: events });
      }
    } else {
      const mem = getMemoryStore();
      if (mem.events && mem.events.length > 0) {
        return NextResponse.json({ success: true, data: mem.events });
      }
    }

    return NextResponse.json({ success: true, data: INITIAL_EVENTS });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ success: true, data: INITIAL_EVENTS });
  }
}
