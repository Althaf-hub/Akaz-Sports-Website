"use client";

import { useWishlist } from "@/context/wishlist-context";
import { ProductCard } from "@/components/product/product-card";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 min-h-[70vh]">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-xs font-bold text-rose-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
          <Heart className="h-4 w-4 fill-current" /> Saved Items
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3 uppercase leading-none">
          Your <span className="text-rose-500">Wishlist</span>
        </h1>
        <p className="text-zinc-400 text-base">
          {wishlist.length > 0
            ? `You have ${wishlist.length} product${wishlist.length !== 1 ? "s" : ""} saved to your wishlist.`
            : "Keep track of the gear you love."}
        </p>
      </div>

      {/* Content */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-zinc-950 border border-white/5 rounded-3xl">
          <div className="h-16 w-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6 text-zinc-600">
            <Heart className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h3>
          <p className="text-zinc-500 max-w-sm mb-6">
            You haven't saved any products yet. Browse our catalog and click the heart icon to add items here.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(0,87,255,0.4)] transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,87,255,0.6)]"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
