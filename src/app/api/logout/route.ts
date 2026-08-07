import { NextResponse } from "next/server";
import { sessionCookieOptions } from "@/lib/auth/session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    ...sessionCookieOptions(),
    value: "",
    maxAge: 0,
  });
  return res;
}

export async function GET(request: Request) {
  const res = NextResponse.redirect(new URL("/enter", request.url));
  res.cookies.set({
    ...sessionCookieOptions(),
    value: "",
    maxAge: 0,
  });
  return res;
}
