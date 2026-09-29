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
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Shop</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/products" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li><Link href="/categories" className="text-sm text-zinc-400 hover:text-white transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
            <ul className="flex flex-col gap-3">
              <li><span className="text-sm text-zinc-500">Cart and checkout coming soon</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/wishlist" className="text-sm text-zinc-400 hover:text-white transition-colors">Wishlist</Link></li>
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
