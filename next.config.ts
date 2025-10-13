import type { NextConfig } from "next";

const hostRule = (host: string, dest: string) => ({
  source:
    "/:path((?!_next|api|favicon|robots\\.txt|sitemap\\.xml|images|android-chrome|apple-touch|site\\.webmanifest).*)",
  has: [{ type: "host" as const, value: host }],
  destination: `${dest}/:path*`,
});

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // The Very Bad Days domain rewrites
        hostRule("theverybaddays.com", "/theverybaddays"),
        hostRule("www.theverybaddays.com", "/theverybaddays"),

        // Jim Frankenstein domain rewrites
        hostRule("jimfrankenstein.com", "/jimfrankenstein"),
        hostRule("www.jimfrankenstein.com", "/jimfrankenstein"),

        // Root path rewrites (for homepage)
        {
          source: "/",
          has: [{ type: "host" as const, value: "theverybaddays.com" }],
          destination: "/theverybaddays",
        },
        {
          source: "/",
          has: [{ type: "host" as const, value: "www.theverybaddays.com" }],
          destination: "/theverybaddays",
        },
        {
          source: "/",
          has: [{ type: "host" as const, value: "jimfrankenstein.com" }],
          destination: "/jimfrankenstein",
        },
        {
          source: "/",
          has: [{ type: "host" as const, value: "www.jimfrankenstein.com" }],
          destination: "/jimfrankenstein",
        },
      ],
    };
  },
};

export default nextConfig;
