import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Categories } from "@/components/home/categories";
import { Brands } from "@/components/home/brands";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CTA } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <FeaturedProducts />
      <Categories />
      <WhyChooseUs />
      <CTA />
    </>
  );
}
