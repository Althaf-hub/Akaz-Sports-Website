import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Akaz Sports Hub | Premium Sports Gear",
    template: "%s | Akaz Sports Hub",
  },
  description: "Unleash your true potential with premium sports gear, footwear, and apparel from the world's best athletic brands.",
  keywords: ["sports gear", "athletic wear", "shoes", "fitness", "Akaz Sports Hub", "premium activewear"],
  authors: [{ name: "Akaz Sports Hub" }],
  creator: "Akaz Sports Hub",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Akaz Sports Hub | Premium Sports Gear",
    description: "Unleash your true potential with premium sports gear, footwear, and apparel.",
    siteName: "Akaz Sports Hub",
    images: [
      {
        url: "/images/hero-bg.png",
        width: 1200,
        height: 700,
        alt: "Akaz Sports Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akaz Sports Hub | Premium Sports Gear",
    description: "Unleash your true potential with premium sports gear, footwear, and apparel.",
    creator: "@akazsportshub",
    images: ["/images/hero-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LenisProvider } from "@/components/providers/lenis-provider";
import { WishlistProvider } from "@/context/wishlist-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
