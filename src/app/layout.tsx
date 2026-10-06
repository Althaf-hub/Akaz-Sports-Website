import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { WishlistProvider } from "@/context/wishlist-context";
import { SITE_URL } from "@/lib/site";

const siteUrl = new URL(SITE_URL);

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Vercel preview deployments should never be indexed.
// VERCEL_ENV is "production" only on the real production deployment.
const isPreviewDeployment =
  typeof process.env.VERCEL_ENV === "string" &&
  process.env.VERCEL_ENV !== "production";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Akaz Sports Hub | #1 Sports Hub Qatar – Premium Gear & Compression",
    template: "%s | Akaz Sports Hub Qatar",
  },
  description:
    "Akaz Sports Hub is Qatar's leading sports company. Shop premium compression wear, athletic footwear, sports equipment, and apparel from top global brands. Your ultimate sports hub in Qatar.",
  keywords: [
    "sports hub",
    "sports hub Qatar",
    "Akaz Sports Hub",
    "Akaz Sports",
    "sports company Qatar",
    "compression wear Qatar",
    "compression sports gear",
    "premium sports gear Qatar",
    "athletic wear Qatar",
    "sports equipment Qatar",
    "sports footwear Qatar",
    "GCC sports distributor",
    "sports apparel Middle East",
    "buy sports gear Qatar",
    "fitness gear Qatar",
    "sports hub Doha",
  ],
  authors: [{ name: "Akaz Sports Hub", url: SITE_URL }],
  creator: "Akaz Sports Hub",
  publisher: "Akaz Sports Hub",
  category: "Sports & Fitness",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Akaz Sports Hub | #1 Sports Hub Qatar – Premium Gear & Compression",
    description:
      "Akaz Sports Hub is Qatar's leading sports company. Premium compression wear, athletic footwear, and sports equipment from top global brands.",
    siteName: "Akaz Sports Hub",
    images: [
      {
        url: "/images/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Akaz Sports Hub – Qatar's Premier Sports Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akaz Sports Hub | #1 Sports Hub Qatar – Premium Gear & Compression",
    description:
      "Qatar's leading sports hub. Premium compression wear, footwear & sports gear from top global brands.",
    creator: "@akazsportshub",
    images: ["/images/hero-bg.png"],
  },
  // On Vercel preview deployments, override to noindex so Google ignores them.
  robots: isPreviewDeployment
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
  other: {
    "geo.region": "QA",
    "geo.placename": "Qatar",
    "geo.position": "25.2854;51.5310",
    "ICBM": "25.2854, 51.5310",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="dark h-full antialiased selection:bg-primary selection:text-white"
    >
      <body className="min-h-full flex flex-col bg-black text-white font-sans overflow-x-hidden">
        <LenisProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-1 flex flex-col w-full relative z-0">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
