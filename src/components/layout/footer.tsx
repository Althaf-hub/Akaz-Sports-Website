import Link from "next/link";


export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tighter text-white">
                AKAZ<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400">
              Premium sports gear and apparel for the modern athlete. Elevate your performance.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-bold">
                IG
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-bold">
                TW
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-bold">
                FB
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-bold">
                YT
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Shop</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/categories/men" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/categories/women" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/categories/footwear" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Footwear
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Clearance Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/help" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Akaz Sports Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span>Secured Payments</span>
            {/* Payment icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
