import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal, ScrollParallax } from "@/components/ui/scroll-reveal";
import { getCategories } from "@/lib/api";

export async function Categories() {
  const { categories } = await getCategories(true);
  const display = categories.slice(0, 4);

  if (display.length === 0) return null;

  return (
    <section className="w-full bg-black py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white mb-4 uppercase">
              Shop By <span className="text-primary">Category</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg font-medium">
              Find exactly what you need for your sport.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {display.map((category, index) => (
            <ScrollReveal
              key={category.id}
              delay={index * 0.15}
              direction={index % 2 === 0 ? "left" : "right"}
              className={index === 0 ? "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <Link
                href={`/categories/${category.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-zinc-900 block w-full h-full ${
                  index === 0 ? "aspect-square lg:aspect-[4/3]" : "aspect-square"
                }`}
              >
                {category.image?.src && (
                  <ScrollParallax speed={0.15} className="absolute inset-0 h-[130%] -top-[15%] w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={category.image.src}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                    />
                  </ScrollParallax>
                )}
                {!category.image?.src && (
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-80" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
