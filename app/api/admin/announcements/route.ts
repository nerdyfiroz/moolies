import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { Announcement } from "@/models/Announcement";
import { CreateAnnouncementSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = CreateAnnouncementSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || "Invalid announcement data" },
        { status: 400 }
      );
    }

    if (isMongoConfigured()) {
      await connectToDatabase();
      const created = await Announcement.create(parsed.data);
      return NextResponse.json({ success: true, data: created });
    } else {
      const mem = getMemoryStore();
      const newAnn = {
        _id: "ann_" + Math.random().toString(36).substring(2, 9),
        title: parsed.data.title,
        content: parsed.data.content,
        category: parsed.data.category,
        externalLink: parsed.data.externalLink || "",
        publishedAt: new Date().toISOString(),
      };
      mem.announcements.unshift(newAnn);
      return NextResponse.json({ success: true, data: newAnn });
    }
  } catch (error) {
    console.error("Create announcement error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create announcement" },
      { status: 500 }
    );
  }
}
