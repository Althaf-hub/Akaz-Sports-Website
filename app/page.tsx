import { ProductGrid } from "@/components/product-grid"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FeaturedBanner } from "@/components/featured-banner"
import { HeroSection } from "@/components/hero-section"
import { CategoryShowcase } from "@/components/category-showcase"
import { TestimonialSection } from "@/components/testimonial-section"
import { BlogSection } from "@/components/blog-section"
import { motion } from "framer-motion"

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoryShowcase />
        </motion.div>

        <section className="container py-16 md:py-24">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-between gap-4 md:flex-row mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold tracking-tight">Latest Products</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#f58549] to-[#eda24e] mt-4 mb-3 rounded-full"></div>
              <p className="text-muted-foreground text-lg">
                Check out our latest sports gear and equipment
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ProductGrid />
          </motion.div>
        </section>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FeaturedBanner />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TestimonialSection />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <BlogSection />
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}