import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { ProjectSettings } from "@/models/ProjectSettings";
import { ProjectSettingsSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = ProjectSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || "Invalid settings data" },
        { status: 400 }
      );
    }

    if (isMongoConfigured()) {
      await connectToDatabase();
      const updated = await ProjectSettings.findOneAndUpdate(
        {},
        { ...parsed.data, updatedAt: new Date() },
        { upsert: true, new: true }
      ).lean();

      return NextResponse.json({
        success: true,
        message: "Project settings updated successfully",
        data: updated,
      });
    } else {
      const mem = getMemoryStore();
      mem.settings = { ...mem.settings, ...parsed.data };

      return NextResponse.json({
        success: true,
        message: "Project settings updated successfully (in memory)",
        data: mem.settings,
      });
    }
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project settings" },
      { status: 500 }
    );
  }
}
