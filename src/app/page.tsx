import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Categories } from "@/components/home/categories";
import { Brands } from "@/components/home/brands";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CTA } from "@/components/home/cta";
import { FAQ } from "@/components/home/faq";
import { SITE_URL } from "@/lib/site";

// Catalog data is fetched at request time; api.ts retains its explicit revalidation.
export const revalidate = 0;

const faqItems = [
  {
    question: "What is Akaz Sports Hub?",
    answer:
      "Akaz Sports Hub is Qatar's premier sports company and an official GCC distributor of world-class athletic gear. We supply premium compression wear, sports footwear, training equipment, and performance apparel from globally recognised brands.",
  },
  {
    question: "Where is Akaz Sports Hub located?",
    answer:
      "Akaz Sports Hub is headquartered in Qatar and serves customers across the GCC region including Saudi Arabia, UAE, Kuwait, Bahrain, and Oman.",
  },
  {
    question: "What compression products does Akaz Sports Hub carry?",
    answer:
      "We carry compression tights, shorts, long-sleeve tops, arm sleeves, calf sleeves, and full-body compression suits engineered to improve performance and recovery.",
  },
  {
    question: "What sports brands does Akaz Sports Hub distribute?",
    answer:
      "Our portfolio includes Captain, Triumph, Gowin, Babbler, and the exclusive Akaz brand.",
  },
  {
    question: "Does Akaz Sports Hub ship across Qatar?",
    answer:
      "Yes! We offer fast and reliable delivery across all of Qatar with free express shipping above a qualifying order threshold.",
  },
  {
    question: "Are the products on Akaz Sports Hub authentic?",
    answer:
      "Absolutely. We only source authentic, top-tier products directly from brand manufacturers and authorised distributors as an official GCC distributor.",
  },
  {
    question: "Does Akaz Sports Hub cater to professional athletes and sports clubs?",
    answer:
      "Yes. We supply gear to professional athletes, sports clubs, schools, gyms, and fitness enthusiasts across Qatar and the GCC.",
  },
  {
    question: "What is Akaz Sports Hub's return policy?",
    answer:
      "We offer a 30-day hassle-free return policy on all eligible products.",
  },
];

export default function Home() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Akaz Sports Hub";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: siteName,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo.png`,
        },
        description:
          "Qatar's leading sports hub and GCC distributor of premium compression wear, sports footwear, and athletic gear.",
        sameAs: [
          "https://www.instagram.com/akazsportshub",
          "https://twitter.com/akazsportshub",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: siteName,
        url: SITE_URL,
        image: `${SITE_URL}/images/hero-bg.png`,
        description:
          "Akaz Sports Hub — Qatar's premier sports company. Premium compression wear, footwear, and sports equipment for athletes across Qatar and the GCC.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "QA",
          addressLocality: "Doha",
          addressRegion: "Ad Dawhah",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.2854,
          longitude: 51.531,
        },
        areaServed: ["QA", "SA", "AE", "KW", "BH", "OM"],
        priceRange: "$$",
        email: "info@akazsportshub.com",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: siteName,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Brands />
      <FeaturedProducts />
      <Categories />
      <WhyChooseUs />
      <FAQ />
      <CTA />
    </>
  );
}

