import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { WhitelistApplication } from "@/models/WhitelistApplication";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet")?.trim().toLowerCase();

    if (!wallet || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid Ethereum wallet address." },
        { status: 400 }
      );
    }

    if (isMongoConfigured()) {
      await connectToDatabase();
      const app = await WhitelistApplication.findOne({ walletAddress: wallet }).lean();

      if (!app) {
        return NextResponse.json({
          success: true,
          found: false,
          message: "No whitelist application found for this wallet address.",
        });
      }

      return NextResponse.json({
        success: true,
        found: true,
        data: {
          walletAddress: app.walletAddress,
          twitterUsername: app.twitterUsername,
          twitterCommentUrl: (app as any).twitterCommentUrl || "",
          status: app.status,
          createdAt: app.createdAt,
        },
      });
    } else {
      const mem = getMemoryStore();
      const app = mem.applications.find((a) => a.walletAddress.toLowerCase() === wallet);

      if (!app) {
        return NextResponse.json({
          success: true,
          found: false,
          message: "No whitelist application found for this wallet address.",
        });
      }

      return NextResponse.json({
        success: true,
        found: true,
        data: {
          walletAddress: app.walletAddress,
          twitterUsername: app.twitterUsername,
          twitterCommentUrl: (app as any).twitterCommentUrl || "",
          status: app.status,
          createdAt: app.createdAt,
        },
      });
    }
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { success: false, error: "Error checking application status." },
      { status: 500 }
    );
  }
}
