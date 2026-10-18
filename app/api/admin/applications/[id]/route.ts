import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { WhitelistApplication } from "@/models/WhitelistApplication";
import { UpdateApplicationStatusSchema } from "@/lib/validation";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const parsed = UpdateApplicationStatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || "Invalid status update" },
        { status: 400 }
      );
    }

    const { status, adminNotes } = parsed.data;

    if (isMongoConfigured()) {
      await connectToDatabase();
      const updated = await WhitelistApplication.findByIdAndUpdate(
        id,
        {
          status,
          adminNotes: adminNotes || "",
          reviewedAt: new Date(),
        },
        { new: true }
      ).lean();

      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Application not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: updated });
    } else {
      const mem = getMemoryStore();
      const app = mem.applications.find((a) => a._id === id);

      if (!app) {
        return NextResponse.json(
          { success: false, error: "Application not found" },
          { status: 404 }
        );
      }

      app.status = status;
      if (adminNotes !== undefined) {
        app.adminNotes = adminNotes;
      }
      app.updatedAt = new Date().toISOString();

      return NextResponse.json({ success: true, data: app });
    }
  } catch (error) {
    console.error("Update application error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update application" },
      { status: 500 }
    );
  }
}
