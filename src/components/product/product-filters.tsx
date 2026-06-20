"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import type { ProductCategory } from "@/types";

interface ProductFiltersProps {
  categories: ProductCategory[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Local state for immediate input feedback
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Update URL parameters
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // Reset to page 1 on any filter change
      if (name !== "page") {
        params.delete("page");
      }
      return params.toString();
    },
    [searchParams]
  );

  // Effect to apply debounced search term to URL
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearchTerm !== currentSearch) {
      router.push(`/products?${createQueryString("search", debouncedSearchTerm)}`);
    }
  }, [debouncedSearchTerm, router, createQueryString, searchParams]);

  // Handle Category Change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/products?${createQueryString("category", e.target.value)}`);
  };

  // Handle Sort Change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    
    if (value === "") {
      params.delete("orderby");
      params.delete("order");
    } else if (value === "price_asc") {
      params.set("orderby", "price");
      params.set("order", "asc");
    } else if (value === "price_desc") {
      params.set("orderby", "price");
      params.set("order", "desc");
    } else if (value === "date_desc") {
      params.set("orderby", "date");
      params.set("order", "desc");
    }
    
    router.push(`/products?${params.toString()}`);
  };

  // Determine current sort value for the select
  const currentOrderBy = searchParams.get("orderby");
  const currentOrder = searchParams.get("order");
  let currentSort = "";
  if (currentOrderBy === "price" && currentOrder === "asc") currentSort = "price_asc";
  else if (currentOrderBy === "price" && currentOrder === "desc") currentSort = "price_desc";
  else if (currentOrderBy === "date" && currentOrder === "desc") currentSort = "date_desc";

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between w-full p-4 mb-8 bg-zinc-950 border border-white/10 rounded-2xl">
      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-zinc-500" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full bg-zinc-900 border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        {/* Category Select */}
        <select
          className="bg-zinc-900 border border-white/5 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none pr-10 cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a1a1aa\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
          value={searchParams.get("category") || ""}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Sort Select */}
        <select
          className="bg-zinc-900 border border-white/5 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none pr-10 cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a1a1aa\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
          value={currentSort}
          onChange={handleSortChange}
        >
          <option value="">Default Sorting</option>
          <option value="date_desc">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
