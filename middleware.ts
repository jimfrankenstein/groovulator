// middleware.ts
// Detects which artist domain the request is coming from and sets an
// x-artist-slug request header so server components can build domain-aware URLs
// without each component needing to know the domain mapping.
//
// Does NOT handle rewrites — those stay in next.config.ts.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DOMAIN_SLUG_MAP: Record<string, string> = {
  "theverybaddays.com": "theverybaddays",
  "www.theverybaddays.com": "theverybaddays",
  "jimfrankenstein.com": "jimfrankenstein",
  "www.jimfrankenstein.com": "jimfrankenstein",
};

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const artistSlug = DOMAIN_SLUG_MAP[host] || "";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-artist-slug", artistSlug);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

// Run on all pages but skip static assets and Next.js internals.
// The root path "/" is explicitly included to ensure the header is set on landing pages.
export const config = {
  matcher: [
    "/",
    "/((?!_next|api|favicon|robots\\.txt|sitemap\\.xml|images|android-chrome|apple-touch|site\\.webmanifest).*)",
  ],
};
