import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_PREFIXES = ["/dashboard", "/studios/add-studio", "/my-listings", "/my-bookings", "/studios/edit"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivate = PRIVATE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (!isPrivate) return NextResponse.next();

  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/studios/add-studio/:path*", "/my-listings/:path*", "/my-bookings/:path*", "/studios/edit/:path*"],
};