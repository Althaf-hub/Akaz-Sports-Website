"use client"
import Link from "next/link"
import {SiteHeader} from "../components/site-header"
import {SiteFooter} from "../components/site-footer"

const NotFoundPage = () => {
  return (
    <>
      <SiteHeader />
      <main className="not-found py-16">
        <div className="container text-center">
          <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link href
            ="/products" className="btn btn-outline border-[#f58549] text-[#f58549]">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

export default NotFoundPage

