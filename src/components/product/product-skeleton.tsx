export function ProductSkeleton() {
  return (
    <div className="group flex flex-col gap-4 animate-pulse">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-900" />
      <div className="flex flex-col gap-2 px-1">
        <div className="h-3 w-1/3 rounded-full bg-zinc-900" />
        <div className="h-4 w-3/4 rounded-full bg-zinc-800" />
        <div className="h-4 w-1/4 rounded-full bg-zinc-800 mt-1" />
      </div>
    </div>
  );
}

/** Full-page loading skeleton for the products grid + filters bar */
export function ProductsLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header skeleton */}
      <div className="mb-10 space-y-3 animate-pulse">
        <div className="h-3 w-24 rounded-full bg-zinc-900" />
        <div className="h-12 w-72 rounded-lg bg-zinc-900" />
        <div className="h-4 w-56 rounded-full bg-zinc-900" />
      </div>

      {/* Filters skeleton */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between w-full p-4 mb-8 bg-zinc-950 border border-white/10 rounded-2xl animate-pulse">
        <div className="h-10 w-full md:w-80 bg-zinc-900 rounded-full" />
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="h-10 w-full sm:w-44 bg-zinc-900 rounded-full" />
          <div className="h-10 w-full sm:w-44 bg-zinc-900 rounded-full" />
        </div>
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
