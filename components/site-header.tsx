"use client"

import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MainNav } from "@/components/main-nav"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function SiteHeader() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [showNote, setShowNote] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearchClick = () => {
    router.push("/products")
  }

  return (
    <div className="sticky top-0 z-50">
      {showNote && (
        <div className="w-full bg-[#f4a460] text-white py-1 px-4 text-center text-sm font-medium shadow-md">
          <div className="container flex items-center justify-center relative">
          
        
          </div>
        </div>
      )}
      <header
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-[#e7b18e]/20 bg-gradient-to-r from-white to-[#f4a460]/5 backdrop-blur-sm shadow-lg"
            : "bg-white shadow-md"
        }`}
      >
        <div className="container flex h-16 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-[#e7b18e]/30 hover:bg-[#e7b18e]/10 hover:border-[#e7b18e]"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                  <span className="text-[#000000] relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#f4a460] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                    AKAZ
                  </span>
                </Link>
                <div className="flex flex-col gap-6">
                  <Link
                    href="/"
                    className="text-sm font-medium transition-colors hover:text-[#e7b18e] hover:font-semibold relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#e7b18e] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="text-sm font-medium transition-colors hover:text-[#e7b18e] hover:font-semibold relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#e7b18e] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    Products
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-medium transition-colors hover:text-[#e7b18e] hover:font-semibold relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#e7b18e] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <span className="hidden font-bold text-3xl sm:inline-block tracking-tight relative">
              <span className="bg-gradient-to-r from-black to-[#e7b18e] bg-clip-text text-transparent relative after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[#e7b18e] after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                AKAZ
              </span>
            </span>
          </Link>
          <div className="hidden md:flex">
            <MainNav />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex h-10 w-10 border-2 border-[#808080]/30 hover:bg-[#e7b18e]/10 hover:border-[#e7b18e] hover:text-black transition-all duration-300 shadow-sm hover:shadow"
              onClick={handleSearchClick}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search products</span>
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
