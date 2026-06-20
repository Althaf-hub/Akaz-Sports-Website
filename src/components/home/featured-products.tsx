import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export async function FeaturedProducts() {
  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];

  try {
    const result = await getProducts({ per_page: 50 });
    const allProducts = result.products;
    
    // Prioritize requested products
    const priorityKeywords = ["acer", "boor", "bottle"];
    const selected: typeof allProducts = [];
    
    for (const keyword of priorityKeywords) {
      const match = allProducts.find(p => p.name.toLowerCase().includes(keyword) && !selected.some(s => s.id === p.id));
      if (match) {
        selected.push(match);
      }
    }
    
    // Fill the rest randomly up to 4
    const remaining = allProducts.filter(p => !selected.some(s => s.id === p.id));
    const randomRemaining = remaining.sort(() => 0.5 - Math.random()).slice(0, 4 - selected.length);
    
    products = [...selected, ...randomRemaining];
  } catch (err) {
    console.error("[FeaturedProducts] fetch failed:", err);
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-black py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white mb-2 uppercase">
                Trending <span className="text-primary">Now</span>
              </h2>
              <p className="text-zinc-400 text-lg font-medium">Top picks for the season. Dominate the field.</p>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-primary"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
