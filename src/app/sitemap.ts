import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/api";

// Build output must not depend on the WordPress origin being reachable.
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [products, { categories }] = await Promise.all([getAllProducts(), getCategories(true)]);
    return [
      { url: siteUrl, changeFrequency: "weekly", priority: 1 },
      { url: `${siteUrl}/products`, changeFrequency: "daily", priority: 0.9 },
      ...categories.map((category) => ({ url: `${siteUrl}/categories/${category.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
      ...products.map((product) => ({ url: `${siteUrl}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.7, images: product.images[0]?.src ? [product.images[0].src] : undefined })),
    ];
  } catch {
    return [{ url: siteUrl, changeFrequency: "weekly", priority: 1 }, { url: `${siteUrl}/products`, changeFrequency: "daily", priority: 0.9 }, { url: `${siteUrl}/categories`, changeFrequency: "weekly", priority: 0.8 }];
  }
}
