import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { ProjectEvent } from "@/models/ProjectEvent";
import { CreateProjectEventSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = CreateProjectEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || "Invalid event data" },
        { status: 400 }
      );
    }

    if (isMongoConfigured()) {
      await connectToDatabase();
      const created = await ProjectEvent.create(parsed.data);
      return NextResponse.json({ success: true, data: created });
    } else {
      const mem = getMemoryStore();
      const newEv = {
        _id: "ev_" + Math.random().toString(36).substring(2, 9),
        title: parsed.data.title,
        description: parsed.data.description,
        eventDate: parsed.data.eventDate,
        eventType: parsed.data.eventType,
        isCompleted: parsed.data.isCompleted || false,
      };
      mem.events.push(newEv);
      return NextResponse.json({ success: true, data: newEv });
    }
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 500 }
    );
  }
}
