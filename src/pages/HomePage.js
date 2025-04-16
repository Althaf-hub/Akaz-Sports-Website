import Header from "../components/Header"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import CategoryShowcase from "../components/CategoryShowcase"
import FeaturedProducts from "../components/FeaturedProducts"
import FeaturedBanner from "../components/FeaturedBanner"
import TestimonialSection from "../components/TestimonialSection"
import BrandSection from "../components/BrandSection"
import BlogSection from "../components/BlogSection"

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoryShowcase />
        <FeaturedProducts />
        <FeaturedBanner />
        <TestimonialSection />
        <BrandSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  )
}

export default HomePage

