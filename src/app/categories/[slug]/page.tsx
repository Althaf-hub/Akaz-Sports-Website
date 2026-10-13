import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import { Pagination } from "@/components/product/pagination";
import { SITE_URL } from "@/lib/site";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// ─── Metadata (uses the slug-matched category name, never results[0]) ─────────

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return { title: "Category not found", robots: { index: false, follow: false } };

  const description =
    category.description.replace(/<[^>]+>/g, " ").trim() ||
    `Browse ${category.name} products at Akaz Sports Hub – Qatar's premier sports store.`;

  return {
    title: `${category.name} | Akaz Sports Hub`,
    description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title: `${category.name} | Akaz Sports Hub`,
      description,
      images: category.image?.src
        ? [{ url: category.image.src, alt: category.image.alt || category.name }]
        : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategorySlugPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: rawPage } = await searchParams;

  // getCategoryBySlug now fetches all categories and does an exact .slug match.
  // It never falls back to results[0], so every category page shows the right data.
  const category = await getCategoryBySlug(slug);
  if (!category) return notFound(); // return ensures execution stops here

  const page = Math.max(1, Number.parseInt(rawPage || "1", 10) || 1);

  // Products filtered by the resolved category ID — pagination-safe.
  const result = await getProductsByCategory(category.id, {
    page,
    per_page: 12,
    orderby: "date",
    order: "desc",
  });

  // ── JSON-LD: BreadcrumbList — uses matched category.name ──────────────────
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${SITE_URL}/categories` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/categories/${category.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="mb-10">
          <Link href="/categories" className="text-xs text-zinc-500 hover:text-white uppercase tracking-widest">
            ← All categories
          </Link>
          {/* h1 + metadata always use the matched category name */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-3 mb-3 uppercase leading-none">
            {category.name}
          </h1>
          {category.description && (
            <p className="max-w-2xl text-zinc-400">{category.description.replace(/<[^>]+>/g, " ")}</p>
          )}
          <p className="mt-3 text-sm text-zinc-500">
            {result.totalProducts} {result.totalProducts === 1 ? "product" : "products"}
          </p>
        </div>

        {result.products.length === 0 ? (
          <div className="py-24 text-center text-zinc-500">
            This category does not currently contain any products.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {result.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* Pagination page state is derived from the URL searchParam */}
            <Suspense fallback={null}>
              <Pagination currentPage={page} totalPages={result.totalPages} basePath={`/categories/${category.slug}`} />
            </Suspense>
          </>
        )}
      </div>
    </>
  );
}
