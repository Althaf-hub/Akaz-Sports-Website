import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

// Revalidate sitemap every hour on Vercel; don't hammer cPanel on every request.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static routes — always present, never includes /wishlist
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/products`,
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/categories`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: now,
    },
  ];

  try {
    const [products, { categories }] = await Promise.all([
      getAllProducts(),
      getCategories(true),
    ]);

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      lastModified: now,
      // Product images are served from the bare domain (WP uploads) — don't rewrite
      images: product.images[0]?.src ? [product.images[0].src] : undefined,
    }));

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${SITE_URL}/categories/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: now,
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
  } catch {
    // If WooCommerce is unreachable during build/revalidation, return static routes only
    return staticRoutes;
  }
}

