// ─────────────────────────────────────────────────────────────────────────────
// WooCommerce Store API – Type Definitions
// Base URL: https://akazsportshub.com/wp-json/wc/store
// ─────────────────────────────────────────────────────────────────────────────

// ─── Images ──────────────────────────────────────────────────────────────────

export interface ProductImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

// ─── Prices ──────────────────────────────────────────────────────────────────

export interface ProductPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: null | { min_amount: string; max_amount: string };
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

// ─── Categories ──────────────────────────────────────────────────────────────

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image: ProductImage | null;
  /** URL of the category on the store (from product.categories[].link) */
  link?: string;
  /** Permalink from the /products/categories endpoint */
  permalink?: string;
  review_count?: number;
}

// ─── Brands ──────────────────────────────────────────────────────────────────

/** Matches the `brands[]` array returned by the WooCommerce Store API. */
export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
  link: string;
}

// ─── Tags ────────────────────────────────────────────────────────────────────

export interface ProductTag {
  id: number;
  name: string;
  slug: string;
}

// ─── Attributes ──────────────────────────────────────────────────────────────

export interface AttributeTerm {
  id: number;
  name: string;
  slug: string;
  default: boolean;
}

export interface ProductAttribute {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms: AttributeTerm[];
}

// ─── Add to Cart ─────────────────────────────────────────────────────────────

export interface AddToCart {
  text: string;
  description: string;
  url: string;
  minimum: number;
  maximum: number;
  multiple_of: number;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  variation: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: ProductPrices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: ProductImage[];
  categories: ProductCategory[];
  tags: ProductTag[];
  /** Brand taxonomies attached to the product (WooCommerce Brands plugin) */
  brands: ProductBrand[];
  attributes: ProductAttribute[];
  variations: number[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  low_stock_remaining: number | null;
  sold_individually: boolean;
  quantity_limit?: number;
  add_to_cart: AddToCart;
}

// ─── API Query Params ─────────────────────────────────────────────────────────

export type SortOrder = "asc" | "desc";

export type SortBy =
  | "date"
  | "modified"
  | "title"
  | "menu_order"
  | "price"
  | "popularity"
  | "rating";

export interface ProductsQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string | number;
  tag?: string | number;
  on_sale?: boolean;
  orderby?: SortBy;
  order?: SortOrder;
  min_price?: string;
  max_price?: string;
  stock_status?: "instock" | "outofstock" | "onbackorder";
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ProductsResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

export interface CategoriesResponse {
  categories: ProductCategory[];
}

// ─── API Error ────────────────────────────────────────────────────────────────

export interface ApiError {
  code: string;
  message: string;
  data?: {
    status: number;
  };
}
