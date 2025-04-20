"use client";

import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

const NotFoundPage = () => {
  return (
    <>
      <SiteHeader />
      <main className="py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f58549] to-[#eda24e] mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg mb-8 max-w-md mx-auto text-gray-400">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" passHref>
              <span className="inline-block px-6 py-3 bg-[#f58549] hover:bg-[#e07539] text-white font-semibold rounded-full transition">
                Back to Home
              </span>
            </Link>
            <Link href="/products" passHref>
              <span className="inline-block px-6 py-3 border border-[#f58549] text-[#f58549] hover:bg-[#f58549] hover:text-white font-semibold rounded-full transition">
                Browse Products
              </span>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default NotFoundPage;
