"use client";

import Link from "next/link";
import { Heart, Tag } from "lucide-react";
import { type Product } from "@/types";
import { getFormattedPrice, getFormattedRegularPrice, getProductBrand, getDiscountPercent } from "@/lib/api";
import { useWishlist } from "@/context/wishlist-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Use plain <img> — NOT next/image — so external URLs are never blocked by remotePatterns
  const imageSrc = product.images?.[0]?.src ?? null;
  const imageAlt = product.images?.[0]?.alt || product.name;
  const discount   = getDiscountPercent(product);
  const price      = getFormattedPrice(product);
  const regularPrice = getFormattedRegularPrice(product);
  const brand      = getProductBrand(product);
  const detailHref = `/products/${product.slug}`;

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  // Debug log (server-side — shows in terminal)
  console.log(`[ProductCard] ${product.name} | imageSrc=${imageSrc ?? "NONE"} | categories=${product.categories?.map(c => c.name).join(", ") || "NONE"}`);

  return (
    <div className="group relative flex flex-col gap-4">
      {/* ── Image Container ─────────────────────────────────────────────── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white border border-white/5 group-hover:border-white/20 transition-colors duration-500">
        <Link href={detailHref} className="absolute inset-0 z-0" aria-label={product.name}>
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-contain p-4 object-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-xs px-4 text-center">
              {product.name}
            </div>
          )}
        </Link>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2 z-10 pointer-events-none">
          {product.on_sale && discount && (
            <span className="rounded bg-primary px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
              -{discount}%
            </span>
          )}
          {!product.is_in_stock && (
            <span className="rounded bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
              Sold Out
            </span>
          )}
        </div>

        {/* Hover — Wishlist */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 translate-y-10 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-20 whitespace-nowrap">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (isWishlisted) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product);
              }
            }}
            className={`flex h-10 items-center justify-center gap-2 rounded-full backdrop-blur-sm border px-4 transition-colors text-white text-xs font-bold uppercase tracking-wide shadow-lg ${
              isWishlisted
                ? "bg-rose-500 border-rose-500 hover:bg-rose-600 hover:border-rose-600"
                : "bg-zinc-900/90 border-white/10 hover:bg-rose-500 hover:border-rose-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
          </button>
        </div>
      </div>

      {/* ── Product Info ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5 px-1">
        {/* Brand + Category */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {brand && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary/80 uppercase tracking-widest">
              <Tag className="h-2.5 w-2.5" />
              {brand}
            </span>
          )}
          {product.categories?.[0] && (
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              {brand ? "· " : ""}{product.categories[0].name}
            </span>
          )}
        </div>

        <Link href={detailHref}>
          <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-0.5">
          {price ? (
            <>
              <span className="text-sm font-black text-white tracking-wide">{price}</span>
              {product.on_sale && regularPrice && (
                <span className="text-xs font-medium text-zinc-500 line-through">{regularPrice}</span>
              )}
            </>
          ) : (
            <span className="text-xs font-semibold text-zinc-500 italic">Contact for price</span>
          )}
        </div>
      </div>
    </div>
  );
}
