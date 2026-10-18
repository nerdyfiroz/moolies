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
    const status = searchParams.get("status") || "approved";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let records: any[] = [];

    if (isMongoConfigured()) {
      await connectToDatabase();
      const filter = status === "all" ? {} : { status };
      records = await WhitelistApplication.find(filter).sort({ createdAt: -1 }).lean();
    } else {
      const mem = getMemoryStore();
      records = status === "all" ? mem.applications : mem.applications.filter((a) => a.status === status);
    }

    // Generate CSV
    const headers = ["Wallet Address", "Twitter", "Discord", "Status", "Referral Code", "Submitted At"];
    const rows = records.map((r) => [
      r.walletAddress,
      `"${(r.twitterUsername || "").replace(/"/g, '""')}"`,
      `"${(r.discordUsername || "").replace(/"/g, '""')}"`,
      r.status,
      `"${(r.referralCode || "").replace(/"/g, '""')}"`,
      r.createdAt,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="moolies-whitelist-${status}-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ success: false, error: "Failed to export CSV" }, { status: 500 });
  }
}
