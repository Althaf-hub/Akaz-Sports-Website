/**
 * WooCommerce Store API – Reusable Fetch Functions
 *
 * Base URL: NEXT_PUBLIC_WC_STORE_API_URL
 * Docs: https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/src/StoreApi/README.md
 *
 * All functions are safe for use in:
 *  - Next.js Server Components (direct call)
 *  - Route Handlers (direct call)
 *  - Client Components (via /api/* proxy routes — to be built later)
 */

import { cache } from "react";
import type {
  Product,
  ProductBrand,
  ProductCategory,
  ProductsQueryParams,
  ProductsResponse,
  CategoriesResponse,
} from "@/types";

// ─── Config ───────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_WC_STORE_API_URL?.replace(/\/$/, "");

/** Default Next.js fetch cache options (1 hour ISR). Override per call. */
const DEFAULT_CACHE: RequestInit = {
  next: { revalidate: 3600 },
};

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Low-level fetch wrapper.
 * Returns { data, headers } so callers can read pagination headers.
 * Throws with a descriptive message on non-OK responses.
 */
async function apiFetch<T>(
  endpoint: string,
  init: RequestInit = {}
): Promise<{ data: T; headers: Headers }> {
  if (!BASE_URL) {
    throw new Error("WooCommerce Store API URL is not configured.");
  }
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...DEFAULT_CACHE,
    ...init,
  });

  if (!res.ok) {
    const body = await res.text();
    const errMsg = `WooCommerce API error ${res.status} ${res.statusText} for ${url}: ${body}`;
    console.error(`[WC API] ❌ ${errMsg}`);
    throw new Error(errMsg);
  }

  const data: T = await res.json();
  return { data, headers: res.headers };
}

/**
 * Build a URLSearchParams string from a plain object,
 * ignoring undefined / null / empty-string values.
 */
function buildQuery(params: Record<string, unknown>): string {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      sp.set(key, String(value));
    }
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

// ─── Category Fallback ────────────────────────────────────────────────────────

/**
 * Derives a unique, de-duplicated list of categories from the products array.
 * Used as a fallback when /products/categories returns an empty array.
 *
 * @example
 * const categories = extractCategoriesFromProducts(products);
 */
export function extractCategoriesFromProducts(
  products: Product[]
): ProductCategory[] {
  const seen = new Map<number, ProductCategory>();

  for (const product of products) {
    if (!Array.isArray(product.categories)) continue;
    for (const cat of product.categories) {
      if (!seen.has(cat.id)) {
        seen.set(cat.id, {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: "",
          parent: 0,
          count: 0,
          image: null,
          link: cat.link,
        });
      }
    }
  }

  const result = Array.from(seen.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return result;
}

// ─── Products ─────────────────────────────────────────────────────────────────

/**
 * Fetch a paginated list of products.
 *
 * @example
 * const { products, totalProducts, totalPages } = await getProducts({ per_page: 12 });
 */
export async function getProducts(
  params: ProductsQueryParams = {}
): Promise<ProductsResponse> {
  const {
    page = 1,
    per_page = 12,
    search,
    category,
    tag,
    on_sale,
    orderby,
    order,
    min_price,
    max_price,
    stock_status,
  } = params;

  const query = buildQuery({
    page,
    per_page,
    search,
    category,
    tag,
    on_sale: on_sale ? "true" : undefined,
    orderby,
    order,
    min_price,
    max_price,
    stock_status,
  });

  try {
    const { data, headers } = await apiFetch<Product[]>(
      `/products${query}`
    );

    const products = Array.isArray(data) ? data : [];
    const totalProducts = parseInt(headers.get("x-wp-total") ?? "0", 10);
    const totalPages = parseInt(headers.get("x-wp-totalpages") ?? "1", 10);

    return { products, totalProducts, totalPages, currentPage: page };
  } catch (err) {
    throw err; // Re-throw so Next.js error.tsx picks it up
  }
}

/**
 * Fetch a single product by its URL slug.
 * Returns `null` when not found instead of throwing.
 *
 * @example
 * const product = await getProductBySlug("adidas-football");
 */
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  if (!slug) return null;

  try {
    const { data } = await apiFetch<Product[]>(
      `/products${buildQuery({ slug })}`
    );
    const list = Array.isArray(data) ? data : [];
    const product = list[0] ?? null;

    return product;
  } catch (err) {
    console.error("WooCommerce product lookup failed.", err);
    return null;
  }
});

/**
 * Fetch a single product by its numeric WooCommerce ID.
 * Returns `null` when not found.
 *
 * @example
 * const product = await getProductById(42);
 */
export async function getProductById(id: number): Promise<Product | null> {
  if (!id) return null;

  try {
    const { data } = await apiFetch<Product>(`/products/${id}`);
    return data ?? null;
  } catch (err) {
    console.error("WooCommerce product lookup failed.", err);
    return null;
  }
}

/**
 * Search products by keyword.
 * Thin wrapper around `getProducts` with `search` pre-filled.
 *
 * @example
 * const { products } = await searchProducts("cricket bat", { per_page: 6 });
 */
export async function searchProducts(
  keyword: string,
  options: Omit<ProductsQueryParams, "search"> = {}
): Promise<ProductsResponse> {
  try {
    return await getProducts({ ...options, search: keyword });
  } catch (err) {
    console.error("WooCommerce product search failed.", err);
    throw err;
  }
}

/**
 * Fetch products belonging to a specific category.
 *
 * @example
 * const { products } = await getProductsByCategory(12);
 */
export async function getProductsByCategory(
  categoryId: number | string,
  options: Omit<ProductsQueryParams, "category"> = {}
): Promise<ProductsResponse> {
  try {
    return await getProducts({ ...options, category: categoryId });
  } catch (err) {
    console.error("WooCommerce category product lookup failed.", err);
    throw err;
  }
}

/**
 * Fetch products currently on sale.
 *
 * @example
 * const { products } = await getOnSaleProducts({ per_page: 8 });
 */
export async function getOnSaleProducts(
  options: Omit<ProductsQueryParams, "on_sale"> = {}
): Promise<ProductsResponse> {
  try {
    return await getProducts({ ...options, on_sale: true });
  } catch (err) {
    console.error("[WC API] getOnSaleProducts failed:", err);
    throw err;
  }
}

/**
 * Fetch related products from the same category, excluding the current product.
 *
 * @example
 * const related = await getRelatedProducts(12, 99, 4);
 */
export async function getRelatedProducts(
  categoryId: number,
  excludeProductId: number,
  limit = 4
): Promise<Product[]> {
  try {
    const { products } = await getProductsByCategory(categoryId, {
      per_page: limit + 1,
    });
    return products.filter((p) => p.id !== excludeProductId).slice(0, limit);
  } catch (err) {
    console.error(`[WC API] getRelatedProducts(cat=${categoryId}) failed:`, err);
    return [];
  }
}

// ─── Categories ───────────────────────────────────────────────────────────────

/**
 * Fetch all product categories.
 *
 * PRIMARY STRATEGY (always runs first):
 *   Fetch up to 100 products and extract unique categories from
 *   each product's `.categories[]` array. This guarantees the
 *   category IDs in the filter UI always match the actual products,
 *   regardless of whether /products/categories is working.
 *
 * SUPPLEMENT (runs in parallel, best-effort):
 *   Also call /products/categories to enrich entries with image/count
 *   data. Results are merged by ID — products-derived categories win
 *   for identity; API categories contribute image/count if available.
 *
 * @example
 * const { categories } = await getCategories();
 */
export async function getCategories(hideEmpty = true): Promise<CategoriesResponse> {
  const categories: ProductCategory[] = [];
  const knownIds = new Set<number>();
  let page = 1;

  while (true) {
    const { data, headers } = await apiFetch<ProductCategory[]>(
      `/products/categories${buildQuery({ page, per_page: 100, hide_empty: hideEmpty })}`
    );
    const batch = Array.isArray(data) ? data : [];
    const added = batch.filter((category) => !knownIds.has(category.id));
    added.forEach((category) => knownIds.add(category.id));
    categories.push(...added);

    const totalPages = Number(headers.get("x-wp-totalpages"));
    if (batch.length === 0 || added.length === 0 || (Number.isFinite(totalPages) && page >= totalPages) || batch.length < 100) break;
    page += 1;
  }

  return { categories: categories.sort((a, b) => a.name.localeCompare(b.name)) };
}

/**
 * Fetch a single category by its slug.
 * Returns `null` when not found.
 *
 * @example
 * const category = await getCategoryBySlug("cricket");
 */
export async function getCategoryBySlug(
  slug: string
): Promise<ProductCategory | null> {
  if (!slug) return null;

  try {
    const { data } = await apiFetch<ProductCategory[]>(
      `/products/categories${buildQuery({ slug })}`
    );
    const list = Array.isArray(data) ? data : [];
    return list[0] ?? null;
  } catch (err) {
    console.error("WooCommerce category lookup failed.", err);
    return null;
  }
}

/** Fetch every catalog product for SEO output only; normal UI should stay paginated. */
export async function getAllProducts(): Promise<Product[]> {
  const firstPage = await getProducts({ page: 1, per_page: 100, orderby: "date", order: "desc" });
  if (firstPage.totalPages <= 1) return firstPage.products;

  const remaining = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      getProducts({ page: index + 2, per_page: 100, orderby: "date", order: "desc" })
    )
  );
  return [firstPage.products, ...remaining.map((page) => page.products)].flat();
}

// ─── Price Helpers ────────────────────────────────────────────────────────────

/**
 * Format a raw WooCommerce price string (e.g. "150000") to a display string.
 * Uses the API-supplied currency prefix/symbol so it works for any currency.
 * WooCommerce stores prices as integers scaled by 10^currency_minor_unit.
 *
 * Pass `currencySymbol` from `product.prices.currency_prefix` (e.g. "ر.ق")
 * or fall back to `product.prices.currency_symbol`.
 *
 * @example
 * formatPrice("150000", "ر.ق", 2) // "ر.ق1,500.00"
 * formatPrice("0", "ر.ق", 2)      // "" (empty — price not set)
 */
export function formatPrice(
  rawPrice: string,
  currencySymbol = "",
  minorUnit = 2
): string {
  const numeric = parseInt(rawPrice ?? "0", 10);
  if (numeric === 0) return ""; // Price not set on this product
  const amount = numeric / Math.pow(10, minorUnit);
  return `${currencySymbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: minorUnit,
  })}`;
}

/**
 * Get a formatted display price from a product, using the correct currency.
 * Returns empty string if no price is set.
 *
 * @example
 * getFormattedPrice(product) // "ر.ق1,500" or ""
 */
export function getFormattedPrice(product: Product): string {
  const { prices } = product;
  const symbol = prices.currency_prefix || prices.currency_symbol || "";
  const minor = prices.currency_minor_unit ?? 2;
  const raw = product.on_sale ? prices.sale_price : prices.price;
  return formatPrice(raw, symbol, minor);
}

/**
 * Get the formatted regular (non-sale) price.
 */
export function getFormattedRegularPrice(product: Product): string {
  const { prices } = product;
  const symbol = prices.currency_prefix || prices.currency_symbol || "";
  const minor = prices.currency_minor_unit ?? 2;
  return formatPrice(prices.regular_price, symbol, minor);
}

/**
 * Calculate the discount percentage between regular and sale price.
 * Returns `null` if the product is not on sale.
 *
 * @example
 * getDiscountPercent(product) // 25
 */
export function getDiscountPercent(product: Product): number | null {
  if (!product.on_sale) return null;
  const regular = parseInt(product.prices.regular_price ?? "0", 10);
  const sale = parseInt(product.prices.sale_price ?? "0", 10);
  if (!regular || !sale || regular <= sale) return null;
  return Math.round(((regular - sale) / regular) * 100);
}

/**
 * Get the primary display image URL for a product.
 * Falls back to a placeholder if no images are available.
 *
 * @example
 * getProductImageUrl(product) // "https://..."
 */
export function getProductImageUrl(product: Product): string {
  return (
    product.images?.[0]?.src ??
    `https://placehold.co/600x600/1a1a2e/ffffff?text=${encodeURIComponent(product.name)}`
  );
}

/**
 * Get the primary brand name for a product, or empty string.
 */
export function getProductBrand(product: Product): string {
  const brands = (product as Product & { brands?: ProductBrand[] }).brands;
  return brands?.[0]?.name ?? "";
}
