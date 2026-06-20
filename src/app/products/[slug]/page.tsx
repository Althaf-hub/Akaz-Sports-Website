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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32 items-start">
        {/* Left — Images (Scrollable) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative aspect-square sm:aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-900/30 backdrop-blur-2xl border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group">
            {mainImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mainImage}
                alt={images?.[0]?.alt || String(product.name)}
                className="absolute inset-0 w-full h-full object-contain p-12 transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm font-medium uppercase tracking-widest">
                No image available
              </div>
            )}
            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none mix-blend-multiply opacity-50" />
          </div>

          {/* Thumbnail strip */}
          {images && images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {images.slice(1).map((img, i) =>
                img.src ? (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900/40 backdrop-blur-md border border-white/5 cursor-pointer hover:border-white/20 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt || ""} className="w-full h-full object-contain p-3" />
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Right — Info (Sticky) */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-32">
          <div className="flex flex-col gap-4">
            {/* Brand */}
            {brands?.[0]?.name && (
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-[10px] font-black text-primary uppercase tracking-widest w-fit shadow-[0_0_20px_rgba(0,87,255,0.15)]">
                {brands[0].name}
              </span>
            )}

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-lg uppercase">
              {String(product.name)}
            </h1>
            
            {/* Categories */}
            {cats && cats.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {cats.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />

          {/* Short description */}
          {shortDesc && (
            <p className="text-zinc-400 leading-relaxed text-lg font-medium drop-shadow-md">
              {shortDesc}
            </p>
          )}

          {/* Full description */}
          {description && (
            <div className="pt-6">
              <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Product Details</h2>
              <p className="text-zinc-400 leading-relaxed text-sm font-medium">{description}</p>
            </div>
          )}
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pt-16 border-t border-white/5">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
              Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">The Kit</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {related.map((p) => {
              const pImages = p.images as { src?: string; alt?: string }[] | undefined;
              const pSrc = pImages?.[0]?.src ?? null;
              return (
                <Link key={String(p.id)} href={`/products/${p.slug}`} className="group flex flex-col gap-4 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-900/30 backdrop-blur-xl border border-white/5 shadow-lg group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] group-hover:border-white/20 transition-all duration-500">
                    {pSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={pSrc} alt={pImages?.[0]?.alt || String(p.name)} className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-900/50" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none mix-blend-multiply" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors leading-tight drop-shadow-md px-2">{String(p.name)}</h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
