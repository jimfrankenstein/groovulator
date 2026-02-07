// Sets x-artist-slug header so server components can build domain-aware URLs.
// Rewrites stay in next.config.ts.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DOMAIN_SLUG_MAP } from "@/app/constants/domains";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-artist-slug", DOMAIN_SLUG_MAP[host] || "");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|api|favicon|robots\\.txt|sitemap\\.xml|images|android-chrome|apple-touch|site\\.webmanifest).*)",
  ],
};
