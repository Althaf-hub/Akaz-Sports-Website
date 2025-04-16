import { ProductGrid } from "@/components/product-grid"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FeaturedBanner } from "@/components/featured-banner"
import { HeroSection } from "@/components/hero-section"
import { CategoryShowcase } from "@/components/category-showcase"
import { TestimonialSection } from "@/components/testimonial-section"
import { BlogSection } from "@/components/blog-section"

import Head from "next/head"

export const metadata = {
  title: "AKAZ SPORTS HUB - Premium Sports Equipment",
  description: "Your one-stop shop for all sports equipment and gear. Quality products for athletes of all levels.",
  keywords: "sports, equipment, gear, basketball, football, tennis, golf, fitness",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <CategoryShowcase />
        <section className="container py-16 md:py-24">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tight"> Latest Products</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#f58549] to-[#eda24e] mt-4 mb-3 rounded-full"></div>
              <p className="text-muted-foreground text-lg">
                Check out our latest sports gear and equipment
              </p>
            </div>
            {/* <div className="flex items-center gap-2">
              <select className="rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background">
                <option value="all">All Categories</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="tennis">Tennis</option>
                <option value="golf">Golf</option>
              </select>
              <select className="rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background">
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div> */}
          </div>
          <ProductGrid />
        </section>
        <FeaturedBanner />
        <TestimonialSection />
       
        <BlogSection />
      </main>
      <SiteFooter />
    </div>
  )
}

