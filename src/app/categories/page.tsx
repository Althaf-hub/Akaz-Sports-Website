import Link from "next/link";
import { extractCategoriesFromProducts } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Akaz Sports Hub",
  description: "Browse all sports gear categories — gym, cricket, football, accessories and more.",
};

export const dynamic = "force-dynamic";

function extractCategories(products: Record<string, unknown>[]) {
  const seen = new Map<number, { id: number; name: string; slug: string; image: string | null }>();
  for (const product of products) {
    const cats = product.categories as { id: number; name: string; slug: string }[] | undefined;
    if (!Array.isArray(cats)) continue;
    for (const cat of cats) {
      if (!cat.id || !cat.name || !cat.slug) continue;
      if (!seen.has(cat.id)) {
        // Grab the product image to use as category image if no dedicated one
        const images = product.images as { src?: string }[] | undefined;
        seen.set(cat.id, {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          image: images?.[0]?.src ?? null,
        });
      }
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export default async function CategoriesPage() {
  const res = await fetch(
    "https://akazsportshub.com/wp-json/wc/store/products?per_page=100",
    { cache: "no-store" }
  );
  const products: Record<string, unknown>[] = await res.json();

  console.log("[CategoriesPage] products.length:", products.length);
  console.log("[CategoriesPage] products[0]:", products[0]);
  console.log("[CategoriesPage] products[0].categories:", (products[0] as Record<string, unknown>)?.categories);

  const categories = extractCategories(products);

  console.log("[CategoriesPage] derived categories:", categories.map(c => `${c.name}(${c.id})`));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
      <div className="mb-10">
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Browse</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3 uppercase leading-none">
          All <span className="text-primary">Categories</span>
        </h1>
        <p className="text-zinc-400">{categories.length} categories derived from {products.length} products</p>
      </div>

      {categories.length === 0 ? (
        <div className="py-24 text-center text-zinc-500">
          No categories found. Check that products have .categories[] populated.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-colors aspect-square flex flex-col items-center justify-center text-center p-6"
            >
              {cat.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
                />
              )}
              <div className="relative z-10">
                <h2 className="text-xl font-black text-white uppercase group-hover:text-primary transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">
                  Slug: {cat.slug}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
