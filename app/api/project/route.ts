import { NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { ProjectSettings } from "@/models/ProjectSettings";
import { DEFAULT_SETTINGS } from "@/lib/data/defaultSettings";

export async function GET() {
  try {
    if (isMongoConfigured()) {
      await connectToDatabase();
      const settings = await ProjectSettings.findOne().lean();
      if (settings) {
        return NextResponse.json({ success: true, data: settings });
      }
    } else {
      const mem = getMemoryStore();
      if (mem.settings && Object.keys(mem.settings).length > 0) {
        return NextResponse.json({
          success: true,
          data: { ...DEFAULT_SETTINGS, ...mem.settings },
        });
      }
    }

    return NextResponse.json({ success: true, data: DEFAULT_SETTINGS });
  } catch (error) {
    console.error("Error fetching project settings:", error);
    return NextResponse.json({ success: true, data: DEFAULT_SETTINGS });
  }
}
