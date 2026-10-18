import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_AUTH_SECRET || "moolies-secret-key-2026";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("moolies_admin_token")?.value;
    if (!token) return false;

    // Simple deterministic signature check for admin session
    return token === `admin_session_${ADMIN_SECRET}`;
  } catch {
    return false;
  }
}

export function validateAdminPassword(password: string): boolean {
  if (!ADMIN_PASSWORD) return false;
  return password === ADMIN_PASSWORD;
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(ADMIN_PASSWORD && ADMIN_PASSWORD.trim().length > 0);
}

export function createAdminToken(): string {
  return `admin_session_${ADMIN_SECRET}`;
}
