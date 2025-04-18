import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const role = req.cookies.get("role")?.value || null;
  console.log("Role:", role);
  if (url.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
