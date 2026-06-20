import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ")} | Akaz Sports Hub`,
    description: `Browse all products in the ${slug} category.`,
  };
}

export const dynamic = "force-dynamic";

export default async function CategorySlugPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Fetch all products — no separate categories endpoint needed
  const res = await fetch(
    "https://akazsportshub.com/wp-json/wc/store/products?per_page=100",
    { cache: "no-store" }
  );
  const allProducts: Record<string, unknown>[] = await res.json();

  console.log("[CategorySlugPage] slug:", slug);
  console.log("[CategorySlugPage] allProducts.length:", allProducts.length);

  // Filter locally by slug — exactly as the task specifies
  const products = allProducts.filter((product) => {
    const cats = product.categories as { slug?: string }[] | undefined;
    return Array.isArray(cats) && cats.some((cat) => cat.slug === slug);
  });

  console.log("[CategorySlugPage] filtered products for slug:", slug, "→", products.length);

  // Derive category name from the matched products
  const categoryName = (() => {
    for (const p of products) {
      const cats = p.categories as { slug?: string; name?: string }[] | undefined;
      const match = cats?.find((c) => c.slug === slug);
      if (match?.name) return match.name;
    }
    // Fallback: humanise the slug
    return slug.replace(/-/g, " ");
  })();

  // If no products match and slug seems completely invalid, 404
  if (allProducts.length > 0 && products.length === 0) {
    // Don't hard 404 — just show empty state (slug may be valid but have no products)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
      {/* Header */}
      <div className="mb-10">
        <Link href="/categories" className="text-xs text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
          ← All Categories
        </Link>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-3 mb-3 uppercase leading-none capitalize">
          {categoryName}
        </h1>
        <p className="text-zinc-400">{products.length} product{products.length !== 1 ? "s" : ""} in this category</p>
      </div>

      {products.length === 0 ? (
        <div className="py-24 text-center text-zinc-500">
          No products found for category <strong className="text-white">&quot;{slug}&quot;</strong>.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => {
            const images = product.images as { src?: string; alt?: string }[] | undefined;
            const cats   = product.categories as { name?: string }[] | undefined;
            const brands = product.brands as { name?: string }[] | undefined;
            const imageSrc = images?.[0]?.src ?? null;

            return (
              <div key={String(product.id)} className="group flex flex-col gap-4">
                {/* Image */}
                <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-colors block">
                  {imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageSrc}
                      alt={images?.[0]?.alt || String(product.name)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm px-4 text-center">
                      {String(product.name)}
                    </div>
                  )}
                </Link>

                {/* Info */}
                <div className="flex flex-col gap-1 px-1">
                  {brands?.[0]?.name && (
                    <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest">{brands[0].name}</span>
                  )}
                  {cats?.[0]?.name && (
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{cats[0].name}</span>
                  )}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {String(product.name)}
                    </h3>
                  </Link>
                  <span className="text-xs text-zinc-500 italic">Contact for price</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
