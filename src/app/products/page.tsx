import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";
import { Pagination } from "@/components/product/pagination";
import { ProductsLoadingSkeleton } from "@/components/product/product-skeleton";
import type { SortBy, SortOrder } from "@/types";
import { AlertCircle, PackageSearch } from "lucide-react";

export const metadata = {
  title: "Products | Akaz Sports Hub",
  description:
    "Browse our premium collection of sports gear — gym gloves, belts, support accessories, jerseys and more.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    orderby?: string;
    order?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await the searchParams in Next.js 15
  const params = await searchParams;

  const page = params.page ? parseInt(params.page, 10) : 1;
  const search = params.search;
  const category = params.category;
  const orderby = params.orderby as SortBy | undefined;
  const order = params.order as SortOrder | undefined;

  // Fetch products + categories in parallel, each with independent error handling
  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];
  let totalPages = 1;
  let totalProducts = 0;
  let categories: Awaited<ReturnType<typeof getCategories>>["categories"] = [];
  let productsError: string | null = null;

  const [productsResult, categoriesResult] = await Promise.allSettled([
    getProducts({
      page,
      per_page: 12,
      search,
      category,
      orderby,
      order,
    }),
    getCategories(true),
  ]);

  if (productsResult.status === "fulfilled") {
    let fetchedProducts = productsResult.value.products;
    
    // If no specific ordering is requested, randomize the products on the page
    if (!orderby) {
      fetchedProducts = [...fetchedProducts].sort(() => Math.random() - 0.5);
    }
    
    products = fetchedProducts;
    totalPages = productsResult.value.totalPages;
    totalProducts = productsResult.value.totalProducts;
  } else {
    productsError = productsResult.reason?.message ?? "Unknown error fetching products.";
    console.error("[ProductsPage] Products fetch failed:", productsError);
  }

  if (categoriesResult.status === "fulfilled") {
    categories = categoriesResult.value.categories;
  } else {
    console.error("[ProductsPage] Categories fetch failed:", categoriesResult.reason);
    // Non-fatal: page can still render without category filters
  }

  // Hard error — no products and the fetch itself failed
  if (productsError) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-3">
          Failed to load products
        </h2>
        <p className="text-zinc-400 max-w-md mb-2">
          Could not reach the store API. Please try again in a moment.
        </p>
        <p className="text-xs text-zinc-600 font-mono bg-zinc-950 rounded-lg px-4 py-2 max-w-xl break-all">
          {productsError}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">
          Store Catalog
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3 uppercase leading-none">
          All <span className="text-primary">Products</span>
        </h1>
        <p className="text-zinc-400 text-base">
          {totalProducts > 0
            ? `Showing ${totalProducts} product${totalProducts !== 1 ? "s" : ""} — gym gear, sports accessories & more.`
            : "Discover the tools you need to elevate your game."}
        </p>
      </div>

      {/* Filters (client component — needs Suspense for useSearchParams) */}
      <Suspense
        fallback={
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between w-full p-4 mb-8 bg-zinc-950 border border-white/10 rounded-2xl animate-pulse">
            <div className="h-10 w-full md:w-80 bg-zinc-900 rounded-full" />
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="h-10 w-full sm:w-44 bg-zinc-900 rounded-full" />
              <div className="h-10 w-full sm:w-44 bg-zinc-900 rounded-full" />
            </div>
          </div>
        }
      >
        <ProductFilters categories={categories} />
      </Suspense>

      {/* Active filters summary */}
      {(search || category) && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-zinc-500 uppercase tracking-widest">Filtered by:</span>
          {search && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
              Search: &quot;{search}&quot;
            </span>
          )}
          {category && categories.find((c) => String(c.id) === category) && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800 border border-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
              Category: {categories.find((c) => String(c.id) === category)?.name}
            </span>
          )}
        </div>
      )}

      {/* Product grid or empty / error state */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-zinc-950 border border-white/5 rounded-3xl">
          <div className="h-16 w-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6 text-zinc-600">
            <PackageSearch className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
          <p className="text-zinc-500 max-w-sm">
            {search
              ? `We couldn't find any products matching "${search}". Try a different search term.`
              : "No products match your current filters. Try adjusting your category or sort options."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination — also needs Suspense for useSearchParams */}
          <Suspense fallback={null}>
            <Pagination currentPage={page} totalPages={totalPages} />
          </Suspense>
        </>
      )}
    </div>
  );
}
