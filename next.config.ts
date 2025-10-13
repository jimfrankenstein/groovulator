import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add the async rewrites function here
  async rewrites() {
    return [
      // 1. Rewrite for www.jimfrankenstein.com
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.jimfrankenstein.com",
          },
        ],
        destination: "/jimfrankenstein/:path*",
      },
      // 2. Rewrite for www.theverybaddays.com
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.theverybaddays.com",
          },
        ],
        destination: "/theverybaddays/:path*",
      },
    ];
  },

  /* config options here */
};

export default nextConfig;
