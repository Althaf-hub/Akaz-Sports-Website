import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import { Pagination } from "@/components/product/pagination";

interface CategoryPageProps { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }>; }

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found", robots: { index: false, follow: false } };
  const description = category.description.replace(/<[^>]+>/g, " ").trim() || `Browse ${category.name} products at Akaz Sports Hub.`;
  return { title: category.name, description, alternates: { canonical: `/categories/${category.slug}` }, openGraph: { title: category.name, description, images: category.image?.src ? [{ url: category.image.src, alt: category.image.alt || category.name }] : [] } };
}

export default async function CategorySlugPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: rawPage } = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const page = Math.max(1, Number.parseInt(rawPage || "1", 10) || 1);
  const result = await getProductsByCategory(category.id, { page, per_page: 12, orderby: "date", order: "desc" });
  return <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12"><div className="mb-10"><Link href="/categories" className="text-xs text-zinc-500 hover:text-white uppercase tracking-widest">← All categories</Link><h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-3 mb-3 uppercase leading-none">{category.name}</h1>{category.description && <p className="max-w-2xl text-zinc-400">{category.description.replace(/<[^>]+>/g, " ")}</p>}<p className="mt-3 text-sm text-zinc-500">{result.totalProducts} {result.totalProducts === 1 ? "product" : "products"}</p></div>{result.products.length === 0 ? <div className="py-24 text-center text-zinc-500">This category does not currently contain products.</div> : <><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">{result.products.map((product) => <ProductCard key={product.id} product={product} />)}</div><Suspense fallback={null}><Pagination currentPage={page} totalPages={result.totalPages} basePath={`/categories/${category.slug}`} /></Suspense></>}</div>;
}
