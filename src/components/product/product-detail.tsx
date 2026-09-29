"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Lock, Tag } from "lucide-react";
import type { Product } from "@/types";
import { getDiscountPercent, getFormattedPrice, getFormattedRegularPrice, getProductBrand } from "@/lib/api";
import { useWishlist } from "@/context/wishlist-context";
import { ProductCard } from "@/components/product/product-card";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const mainImage = product.images[activeImageIndex];
  const price = getFormattedPrice(product);
  const regularPrice = getFormattedRegularPrice(product);
  const discount = getDiscountPercent(product);
  const brand = getProductBrand(product);

  return <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
    <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest"><Link href="/" className="hover:text-white">Home</Link><span>/</span><Link href="/products" className="hover:text-white">Products</Link><span>/</span><span className="text-zinc-300 truncate">{product.name}</span></nav>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32 items-start">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="relative aspect-square sm:aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-900/30 border border-white/5">
          {mainImage ? <Image src={mainImage.src} alt={mainImage.alt || product.name} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-contain p-8" /> : <div className="absolute inset-0 grid place-items-center text-zinc-600">No image available</div>}
          {product.on_sale && discount && <span className="absolute top-5 left-5 rounded-full bg-primary px-3 py-1 text-xs font-bold">-{discount}%</span>}
        </div>
        {product.images.length > 1 && <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">{product.images.map((image, index) => <button type="button" key={image.id} onClick={() => setActiveImageIndex(index)} aria-label={`View image ${index + 1} of ${product.name}`} aria-pressed={index === activeImageIndex} className={`relative aspect-square overflow-hidden rounded-xl bg-zinc-900/40 border ${index === activeImageIndex ? "border-primary" : "border-white/5"}`}><Image src={image.src} alt={image.alt || product.name} fill sizes="160px" className="object-contain p-2" /></button>)}</div>}
      </div>
      <div className="lg:col-span-5 flex flex-col gap-7 lg:sticky lg:top-32">
        <div className="flex flex-col gap-4">{brand && <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black text-primary uppercase tracking-widest"><Tag className="size-3" />{brand}</span>}<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">{product.name}</h1>{product.categories.length > 0 && <div className="flex flex-wrap gap-3">{product.categories.map((category) => <Link key={category.id} href={`/categories/${category.slug}`} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white">{category.name}</Link>)}</div>}</div>
        <div className="flex flex-wrap items-center gap-3 border-y border-white/10 py-5">{price ? <><span className="text-3xl font-black text-white">{price}</span>{product.on_sale && regularPrice && <span className="text-base text-zinc-500 line-through">{regularPrice}</span>}</> : <span className="text-zinc-400">Contact for price</span>}<span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${product.is_in_stock ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"}`}>{product.is_in_stock ? "In stock" : "Out of stock"}</span></div>
        {product.short_description && <p className="text-zinc-300 leading-relaxed">{product.short_description.replace(/<[^>]+>/g, " ")}</p>}
        {product.description && <div><h2 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Product details</h2><p className="text-sm leading-relaxed text-zinc-400">{product.description.replace(/<[^>]+>/g, " ")}</p></div>}
        <div className="flex flex-wrap gap-3 pt-2"><button onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-white/20"><Heart className={`size-4 ${wishlisted ? "fill-rose-500 text-rose-500" : ""}`} />{wishlisted ? "Saved to wishlist" : "Add to wishlist"}</button><span title="Purchasing is not available yet" className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-500"><Lock className="size-4" />Cart coming soon</span></div>
      </div>
    </div>
    {related.length > 0 && <section className="border-t border-white/5 pt-16"><h2 className="mb-10 text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Related products</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
  </div>;
}
