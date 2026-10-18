import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { WhitelistApplication } from "@/models/WhitelistApplication";

export async function GET(req: NextRequest) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status") || "all";
    const searchQuery = searchParams.get("search")?.toLowerCase().trim() || "";

    if (isMongoConfigured()) {
      await connectToDatabase();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const query: any = {};
      if (statusFilter && statusFilter !== "all") {
        query.status = statusFilter;
      }
      if (searchQuery) {
        query.$or = [
          { walletAddress: { $regex: searchQuery, $options: "i" } },
          { twitterUsername: { $regex: searchQuery, $options: "i" } },
          { discordUsername: { $regex: searchQuery, $options: "i" } },
        ];
      }

      const applications = await WhitelistApplication.find(query).sort({ createdAt: -1 }).lean();

      // Aggregate counts
      const counts = {
        total: await WhitelistApplication.countDocuments(),
        pending: await WhitelistApplication.countDocuments({ status: "pending" }),
        approved: await WhitelistApplication.countDocuments({ status: "approved" }),
        waitlisted: await WhitelistApplication.countDocuments({ status: "waitlisted" }),
        rejected: await WhitelistApplication.countDocuments({ status: "rejected" }),
      };

      return NextResponse.json({
        success: true,
        data: applications,
        stats: counts,
      });
    } else {
      const mem = getMemoryStore();
      let apps = [...mem.applications];

      if (statusFilter && statusFilter !== "all") {
        apps = apps.filter((a) => a.status === statusFilter);
      }

      if (searchQuery) {
        apps = apps.filter(
          (a) =>
            a.walletAddress.toLowerCase().includes(searchQuery) ||
            a.twitterUsername.toLowerCase().includes(searchQuery) ||
            (a.discordUsername && a.discordUsername.toLowerCase().includes(searchQuery))
        );
      }

      const counts = {
        total: mem.applications.length,
        pending: mem.applications.filter((a) => a.status === "pending").length,
        approved: mem.applications.filter((a) => a.status === "approved").length,
        waitlisted: mem.applications.filter((a) => a.status === "waitlisted").length,
        rejected: mem.applications.filter((a) => a.status === "rejected").length,
      };

      return NextResponse.json({
        success: true,
        data: apps,
        stats: counts,
      });
    }
  } catch (error) {
    console.error("Admin applications error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load applications" },
      { status: 500 }
    );
  }
}
