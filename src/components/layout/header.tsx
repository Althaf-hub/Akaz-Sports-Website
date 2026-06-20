"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Heart, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/wishlist-context";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { wishlist } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
              isScrolled ? "glass shadow-[0_0_30px_rgba(0,0,0,0.5)]" : "bg-transparent"
            }`}
          >
            <Link href="/" className="relative z-50 flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tighter text-white uppercase group-hover:text-primary transition-colors duration-300">
                AKAZ<span className="text-primary group-hover:text-white transition-colors duration-300">.</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative group py-2"
                  >
                    <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(0,87,255,0.8)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-5 relative z-50">
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.form
                      initial={{ width: 0, opacity: 0, paddingRight: 0 }}
                      animate={{ width: "200px", opacity: 1, paddingRight: "10px" }}
                      exit={{ width: 0, opacity: 0, paddingRight: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSearch}
                      className="absolute right-6 top-1/2 -translate-y-1/2 overflow-hidden flex items-center origin-right"
                    >
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-sm text-white focus:outline-none focus:border-primary/50 placeholder:text-zinc-500 min-w-[150px]"
                        autoFocus
                      />
                    </motion.form>
                  )}
                </AnimatePresence>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Search" 
                  className={`transition-colors hover:scale-110 transform duration-200 relative z-10 ${isSearchOpen ? "text-white" : "text-zinc-400 hover:text-white"}`}
                >
                  {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </button>
              </div>
              
              <Link href="/wishlist" aria-label="Wishlist" className="text-zinc-400 hover:text-white transition-colors relative hover:scale-110 transform duration-200">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-[0_0_10px_rgba(244,63,94,0.8)]">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button aria-label="Cart Locked" className="text-zinc-600 cursor-not-allowed relative group transition-colors duration-200" title="Cart is currently locked">
                <ShoppingBag className="h-5 w-5 opacity-50" />
                <span className="absolute -bottom-1 -right-1 bg-zinc-950 rounded-full p-0.5 border border-zinc-800 flex items-center justify-center">
                  <Lock className="h-2.5 w-2.5 text-zinc-500" />
                </span>
              </button>
              <button
                aria-label="Toggle Menu"
                aria-expanded={mobileMenuOpen}
                className="md:hidden text-zinc-400 hover:text-white transition-colors ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-24"
          >
            <div className="flex flex-col items-center gap-8 text-2xl font-black uppercase tracking-widest w-full px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    className="block w-full py-4 text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 w-full h-px bg-white/10"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-6 mt-4"
              >
                <span className="text-sm text-zinc-500 font-sans tracking-normal">Support</span>
                <span className="text-sm text-zinc-500 font-sans tracking-normal">Account</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
