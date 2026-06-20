import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import { ScrollReveal, ScrollParallax } from "@/components/ui/scroll-reveal";

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
    <section id="trending" className="w-full bg-black py-32 border-t border-white/5 relative overflow-hidden">
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
        <ScrollReveal delay={0.1}>
          <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3/1] w-full overflow-hidden rounded-3xl bg-zinc-900/30 backdrop-blur-xl border border-white/5 group hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 mb-16">
            <ScrollParallax speed={0.2} className="absolute inset-0 h-[140%] -top-[20%] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/chalk.jpg" 
                alt="Promo Image" 
                className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0" 
              />
            </ScrollParallax>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none mix-blend-multiply" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-[0_5px_15px_rgba(255,255,255,0.1)] mb-4">
                Exclusive
              </span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none drop-shadow-lg">
                Premium Gear
              </h3>
              <p className="text-sm md:text-base font-bold text-zinc-300 uppercase tracking-widest max-w-lg mx-auto">
                Ready to dominate the field
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-10">
          {products.map((product, index) => (
            <ScrollParallax key={product.id} speed={index % 2 === 0 ? 0.05 : 0.15}>
              <ScrollReveal delay={index * 0.1} direction="up">
                <ProductCard product={product} />
              </ScrollReveal>
            </ScrollParallax>
          ))}
        </div>
      </div>
    </section>
  );
}
