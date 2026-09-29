import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Categories } from "@/components/home/categories";
import { Brands } from "@/components/home/brands";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CTA } from "@/components/home/cta";

// Catalog data is fetched at request time; api.ts retains its explicit revalidation.
export const revalidate = 0;

export default function Home() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Akaz Sports Hub";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: siteName, url: siteUrl }, { "@type": "WebSite", name: siteName, url: siteUrl }] };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Hero />
      <Brands />
      <FeaturedProducts />
      <Categories />
      <WhyChooseUs />
      <CTA />
    </>
  );
}
