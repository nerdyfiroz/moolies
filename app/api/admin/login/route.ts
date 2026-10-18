import { NextRequest, NextResponse } from "next/server";
import { validateAdminPassword, createAdminToken, isAdminPasswordConfigured } from "@/lib/auth";
import { AdminLoginSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AdminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Password is required" }, { status: 400 });
    }

    if (!isAdminPasswordConfigured()) {
      return NextResponse.json(
        { success: false, error: "ADMIN_PASSWORD environment variable is not configured on the server" },
        { status: 500 }
      );
    }

    if (!validateAdminPassword(parsed.data.password)) {
      return NextResponse.json({ success: false, error: "Invalid admin password" }, { status: 401 });
    }

    const token = createAdminToken();
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
    });

    response.cookies.set("moolies_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}
