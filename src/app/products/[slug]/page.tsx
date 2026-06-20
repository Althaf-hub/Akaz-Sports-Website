import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(
    `https://akazsportshub.com/wp-json/wc/store/products?slug=${slug}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const product = Array.isArray(data) ? data[0] : null;
  if (!product) return { title: "Product Not Found | Akaz Sports Hub" };
  return {
    title: `${product.name} | Akaz Sports Hub`,
    description: String(product.short_description || product.description || "").replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  // Fetch the single product by slug
  const res = await fetch(
    `https://akazsportshub.com/wp-json/wc/store/products?slug=${slug}`,
    { cache: "no-store" }
  );
  const data: Record<string, unknown>[] = await res.json();
  const product = Array.isArray(data) ? data[0] : null;

  console.log("[ProductDetailPage] slug:", slug);
  console.log("[ProductDetailPage] product:", product?.name ?? "NOT FOUND");
  console.log("[ProductDetailPage] images:", (product?.images as unknown[] | undefined)?.length ?? 0);
  console.log("[ProductDetailPage] categories:", product?.categories);

  if (!product) {
    notFound();
  }

  const images  = product.images  as { src?: string; alt?: string }[] | undefined;
  const cats    = product.categories as { id?: number; name?: string; slug?: string }[] | undefined;
  const brands  = product.brands  as { name?: string; slug?: string }[] | undefined;
  const mainImage = images?.[0]?.src ?? null;
  const description = String(product.description ?? "").replace(/<[^>]+>/g, "").trim();
  const shortDesc   = String(product.short_description ?? "").replace(/<[^>]+>/g, "").trim();

  // Related products — fetch same category, exclude this product
  let related: Record<string, unknown>[] = [];
  const firstCatId = (cats?.[0] as { id?: number } | undefined)?.id;
  if (firstCatId) {
    try {
      const relRes = await fetch(
        `https://akazsportshub.com/wp-json/wc/store/products?category=${firstCatId}&per_page=5`,
        { cache: "no-store" }
      );
      const relData: Record<string, unknown>[] = await relRes.json();
      related = relData.filter((p) => p.slug !== slug).slice(0, 4);
    } catch {
      // Non-fatal
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Products</Link>
        <span>/</span>
        <span className="text-zinc-300">{String(product.name)}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left — Image */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white border border-white/5">
            {mainImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mainImage}
                alt={images?.[0]?.alt || String(product.name)}
                className="absolute inset-0 w-full h-full object-contain p-8"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm">
                No image available
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images && images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.slice(1).map((img, i) =>
                img.src ? (
                  <div key={i} className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-white border border-white/5 cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt || ""} className="w-full h-full object-contain p-2" />
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div className="flex flex-col gap-5">
          {/* Brand */}
          {brands?.[0]?.name && (
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
              {brands[0].name}
            </span>
          )}

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            {String(product.name)}
          </h1>

          {/* Categories */}
          {cats && cats.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cats.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="text-xs font-semibold uppercase tracking-widest text-zinc-400 bg-zinc-900 border border-white/10 rounded-full px-3 py-1 hover:border-primary hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Short description */}
          {shortDesc && (
            <p className="text-zinc-400 leading-relaxed">{shortDesc}</p>
          )}

          {/* Removed View on store button as requested */}

          {/* Full description */}
          {description && (
            <div className="mt-4 pt-6 border-t border-white/5">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-3">Description</h2>
              <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
            Related <span className="text-primary">Products</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => {
              const pImages = p.images as { src?: string; alt?: string }[] | undefined;
              const pSrc = pImages?.[0]?.src ?? null;
              return (
                <Link key={String(p.id)} href={`/products/${p.slug}`} className="group flex flex-col gap-3">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white border border-white/5 hover:border-white/20 transition-colors">
                    {pSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={pSrc} alt={pImages?.[0]?.alt || String(p.name)} className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-900" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2">{String(p.name)}</h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
