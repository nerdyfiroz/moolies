import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured, getMemoryStore } from "@/lib/mongodb";
import { WhitelistApplication } from "@/models/WhitelistApplication";
import { ProjectSettings } from "@/models/ProjectSettings";
import { WhitelistSubmissionSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Validation
    const validationResult = WhitelistSubmissionSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid input data";
      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }

    const {
      walletAddress,
      twitterUsername,
      discordUsername,
      email,
      reason,
      completedTasks,
      referralCode,
      websiteHoneypot,
      submissionTimestamp,
    } = validationResult.data;

    // 2. Anti-Bot Honeypot & Timing Check
    if (websiteHoneypot && websiteHoneypot.length > 0) {
      return NextResponse.json({ success: false, error: "Bot activity detected" }, { status: 400 });
    }

    if (submissionTimestamp && Date.now() - submissionTimestamp < 1200) {
      return NextResponse.json(
        { success: false, error: "Submission completed too quickly. Please try again." },
        { status: 400 }
      );
    }

    const normalizedWallet = walletAddress.toLowerCase();

    // 3. Check Whitelist Status & Duplicate Applications
    if (isMongoConfigured()) {
      await connectToDatabase();

      // Check if whitelist is currently open
      const settings = await ProjectSettings.findOne().lean();
      if (settings && settings.isWhitelistOpen === false) {
        return NextResponse.json(
          {
            success: false,
            error: "The Whitelist Gate is currently closed. Keep an eye on announcements for the next wave!",
          },
          { status: 403 }
        );
      }

      // Check duplicate
      const existing = await WhitelistApplication.findOne({ walletAddress: normalizedWallet }).lean();
      if (existing) {
        return NextResponse.json(
          {
            success: false,
            error: `An application has already been submitted for wallet ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}. You can check your application status anytime at the Gate!`,
          },
          { status: 409 }
        );
      }

      // Save application
      const newApp = await WhitelistApplication.create({
        walletAddress: normalizedWallet,
        twitterUsername,
        discordUsername: discordUsername || "",
        email: email || "",
        reason,
        completedTasks: completedTasks || [],
        referralCode: referralCode || "",
        status: "pending",
      });

      return NextResponse.json({
        success: true,
        message: "Your application has been received by the Moolies Council!",
        applicationId: newApp._id.toString(),
        status: "pending",
      });
    } else {
      // In-Memory store fallback
      const mem = getMemoryStore();

      const existing = mem.applications.find(
        (app) => app.walletAddress.toLowerCase() === normalizedWallet
      );
      if (existing) {
        return NextResponse.json(
          {
            success: false,
            error: `An application has already been submitted for wallet ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}. You can check your application status anytime at the Gate!`,
          },
          { status: 409 }
        );
      }

      const id = "app_" + Math.random().toString(36).substring(2, 9);
      const newApp = {
        _id: id,
        walletAddress: normalizedWallet,
        twitterUsername,
        discordUsername: discordUsername || "",
        email: email || "",
        reason,
        completedTasks: completedTasks || [],
        referralCode: referralCode || "",
        status: "pending" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mem.applications.unshift(newApp);

      return NextResponse.json({
        success: true,
        message: "Your application has been received by the Moolies Council!",
        applicationId: id,
        status: "pending",
      });
    }
  } catch (error) {
    console.error("Whitelist submission error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your application." },
      { status: 500 }
    );
  }
}
