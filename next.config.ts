import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // Run before the filesystem checks so "/" rewrites too
      beforeFiles: [
        // --- The Very Bad Days ---
        {
          source: "/",
          has: [{ type: "host", value: "theverybaddays.com" }],
          destination: "/theverybaddays",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "theverybaddays.com" }],
          destination: "/theverybaddays/:path*",
        },

        {
          source: "/",
          has: [{ type: "host", value: "www.theverybaddays.com" }],
          destination: "/theverybaddays",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "www.theverybaddays.com" }],
          destination: "/theverybaddays/:path*",
        },

        // --- Jim Frankenstein ---
        {
          source: "/",
          has: [{ type: "host", value: "jimfrankenstein.com" }],
          destination: "/jimfrankenstein",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "jimfrankenstein.com" }],
          destination: "/jimfrankenstein/:path*",
        },

        {
          source: "/",
          has: [{ type: "host", value: "www.jimfrankenstein.com" }],
          destination: "/jimfrankenstein",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "www.jimfrankenstein.com" }],
          destination: "/jimfrankenstein/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
