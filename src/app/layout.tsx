import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://akazsportshub.com"),
  title: {
    default: "Akaz Sports Hub | Premium Sports Gear",
    template: "%s | Akaz Sports Hub",
  },
  description: "Unleash your true potential with premium sports gear, footwear, and apparel from the world's best athletic brands.",
  keywords: ["sports gear", "athletic wear", "shoes", "fitness", "Akaz Sports Hub", "premium activewear"],
  authors: [{ name: "Akaz Sports Hub" }],
  creator: "Akaz Sports Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akazsportshub.com",
    title: "Akaz Sports Hub | Premium Sports Gear",
    description: "Unleash your true potential with premium sports gear, footwear, and apparel.",
    siteName: "Akaz Sports Hub",
    images: [
      {
        url: "/og-image.jpg", // Placeholder
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
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { WishlistProvider } from "@/context/wishlist-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${oswald.variable} h-full antialiased selection:bg-primary selection:text-white`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-sans overflow-x-hidden">
        <WishlistProvider>
          <Header />
          <main className="flex-1 flex flex-col w-full relative z-0">
            {children}
          </main>
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}
