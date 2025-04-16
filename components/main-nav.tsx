"use client"

import Link from "next/link"

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
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
    </nav>
  )
}
