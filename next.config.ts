import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // WooCommerce product images
      {
        protocol: "https",
        hostname: "akazsportshub.com",
        pathname: "/**",
      },
      // WordPress uploads subdomain (common pattern)
      {
        protocol: "https",
        hostname: "*.akazsportshub.com",
        pathname: "/**",
      },
      // Placeholder fallback
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },

  // Hide X-Powered-By header
  poweredByHeader: false,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
