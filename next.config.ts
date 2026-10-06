import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // WooCommerce product images — must stay as bare domain (WordPress origin)
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

  async headers() {
    return [
      // ── Security headers on every route ──────────────────────────────────
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // ── Vercel preview deployments — block indexing ───────────────────────
      // Match any host ending in .vercel.app to prevent indexing of preview/alias URLs
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "(.*\\.)?vercel\\.app",
          },
        ],
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  // ── Old WordPress URL → Next.js URL redirects (permanent 301) ────────────
  async redirects() {
    return [
      // /product/:slug  →  /products/:slug
      {
        source: "/product/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
      // /product-category/:slug  →  /categories/:slug
      {
        source: "/product-category/:slug",
        destination: "/categories/:slug",
        permanent: true,
      },
      // /product-category/:parent/:slug  →  /categories/:slug
      {
        source: "/product-category/:parent/:slug",
        destination: "/categories/:slug",
        permanent: true,
      },
      // /shop  →  /products
      {
        source: "/shop",
        destination: "/products",
        permanent: true,
      },
      // Trailing-slash variants of the above
      {
        source: "/product/:slug/",
        destination: "/products/:slug",
        permanent: true,
      },
      {
        source: "/product-category/:slug/",
        destination: "/categories/:slug",
        permanent: true,
      },
      {
        source: "/shop/",
        destination: "/products",
        permanent: true,
      },
      // WooCommerce checkout-flow pages — redirect home (cart built later, so temporary redirect)
      {
        source: "/cart",
        destination: "/",
        permanent: false,
      },
      {
        source: "/cart/",
        destination: "/",
        permanent: false,
      },
      {
        source: "/checkout",
        destination: "/",
        permanent: false,
      },
      {
        source: "/checkout/",
        destination: "/",
        permanent: false,
      },
      {
        source: "/my-account",
        destination: "/",
        permanent: false,
      },
      {
        source: "/my-account/",
        destination: "/",
        permanent: false,
      },
      // WordPress "/?p=NNN" style permalinks — catch-all, send to products
      {
        source: "/",
        has: [{ type: "query", key: "p" }],
        destination: "/products",
        permanent: false, // soft redirect; we don't know the slug
      },
    ];
  },
};

export default nextConfig;

