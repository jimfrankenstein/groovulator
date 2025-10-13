// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const MAP: Record<string, string> = {
  "theverybaddays.com": "/theverybaddays",
  "www.theverybaddays.com": "/theverybaddays",
  "jimfrankenstein.com": "/jimfrankenstein",
  "www.jimfrankenstein.com": "/jimfrankenstein",
};

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const base = MAP[host];
  if (!base) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // let assets and common files pass through untouched
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // rewrite to the subfolder while keeping the clean domain in the URL bar
  if (!pathname.startsWith(base)) {
    const url = req.nextUrl.clone();
    url.pathname = base + pathname;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// run on everything (we exclude assets inside the function)
export const config = { matcher: ["/:path*"] };
