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
    <div className="group relative flex flex-col gap-4 transition-all duration-500 hover:-translate-y-2 hover:z-10">
      {/* ── Image Container ─────────────────────────────────────────────── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-900/30 backdrop-blur-xl border border-white/5 group-hover:border-white/20 transition-all duration-500 shadow-lg group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Link href={detailHref} className="absolute inset-0 z-0" aria-label={product.name}>
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-contain p-6 object-center transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-xs px-4 text-center">
              {product.name}
            </div>
          )}
        </Link>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none mix-blend-multiply" />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2 z-10 pointer-events-none">
          {product.on_sale && discount && (
            <span className="rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-[0_5px_15px_rgba(0,87,255,0.4)] border border-primary/50">
              -{discount}%
            </span>
          )}
          {!product.is_in_stock && (
            <span className="rounded-full bg-red-600/90 backdrop-blur-md px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-[0_5px_15px_rgba(220,38,38,0.4)] border border-red-500/50">
              Sold Out
            </span>
          )}
        </div>

        {/* Hover — Wishlist */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 translate-y-10 opacity-0 transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0 group-hover:opacity-100 z-20 whitespace-nowrap">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (isWishlisted) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product);
              }
            }}
            className={`flex h-10 items-center justify-center gap-2 rounded-full backdrop-blur-xl border px-5 transition-all text-white text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-105 ${
              isWishlisted
                ? "bg-rose-500/80 border-rose-400 hover:bg-rose-600/90 shadow-[0_5px_20px_rgba(244,63,94,0.4)]"
                : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${isWishlisted ? "fill-current" : ""}`} />
            <span>{isWishlisted ? "Saved" : "Wishlist"}</span>
          </button>
        </div>
      </div>

      {/* ── Product Info ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5 px-2 pt-1">
        {/* Brand + Category */}
        <div className="flex items-center gap-2 flex-wrap">
          {brand && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-widest backdrop-blur-sm">
              <Tag className="h-2 w-2 text-primary" />
              {brand}
            </span>
          )}
          {product.categories?.[0] && (
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
              {product.categories[0].name}
            </span>
          )}
        </div>

        <Link href={detailHref}>
          <h3 className="text-lg font-black text-white line-clamp-2 group-hover:text-primary transition-colors leading-tight drop-shadow-md">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          {price ? (
            <>
              <span className="text-base font-black text-white tracking-wide">{price}</span>
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
