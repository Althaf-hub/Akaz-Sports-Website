import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getCategories } from "@/lib/api";

// Do not require WordPress API access while generating a deployment build.
export const revalidate = 0;

export const metadata: Metadata = { title: "Categories", description: "Browse sports gear categories at Akaz Sports Hub.", alternates: { canonical: "/categories" } };

export default async function CategoriesPage() {
  const { categories } = await getCategories(true);
  return <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12"><div className="mb-10"><p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Browse</p><h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3 uppercase leading-none">All <span className="text-primary">Categories</span></h1><p className="text-zinc-400">Explore sports gear by category.</p></div>{categories.length === 0 ? <div className="py-24 text-center text-zinc-500">Categories are currently unavailable. Please try again later.</div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{categories.map((category) => <Link key={category.id} href={`/categories/${category.slug}`} className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-colors aspect-square flex flex-col items-center justify-center text-center p-6">{category.image?.src && <Image src={category.image.src} alt={category.image.alt || category.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover opacity-30 group-hover:opacity-50 transition-opacity" />}<div className="relative z-10"><h2 className="text-xl font-black text-white uppercase group-hover:text-primary transition-colors">{category.name}</h2>{category.count > 0 && <p className="text-xs text-zinc-400 mt-2">{category.count} {category.count === 1 ? "product" : "products"}</p>}</div></Link>)}</div>}</div>;
}
