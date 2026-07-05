import { NextResponse } from "next/server";
import {
  createSessionToken,
  sessionCookieOptions,
  verifyCredentials,
  COOKIE_NAME,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Нэвтрэх нэр эсвэл нууц үг буруу" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, await createSessionToken(), sessionCookieOptions());
  return response;
}
