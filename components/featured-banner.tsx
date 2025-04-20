import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturedBanner() {
  return (
    <section className="relative bg-black text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>
      <div className="absolute top-0 right-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Featured sports equipment"
          className="h-full w-full object-cover opacity-50"
          loading="lazy"
        />
      </div>
      <div className="container relative z-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6 order-2 md:order-1">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#f58549]/20 to-[#eda24e]/20 text-white rounded-full text-sm font-medium mb-2 w-fit">
              New Collection
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                New Season,{" "}
                <span className="bg-gradient-to-r from-[#f58549] to-[#eda24e] text-transparent bg-clip-text">
                  New Gear
                </span>
              </h2>
              <p className="mt-6 text-gray-300 text-xl leading-relaxed max-w-lg">
                Discover our latest collection of premium sports equipment and apparel designed for peak performance.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row pt-4">
            <Link href="/products">
                <Button className="bg-gradient-to-r from-[#f58549] to-[#eda24e] text-white hover:bg-gradient-to-r hover:from-[#e07539] hover:to-[#d99239] rounded-full px-8 py-6 text-lg">
                  Shop Collection
                </Button>
              </Link>
            
            </div>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-2xl md:h-[500px] order-1 md:order-2 shadow-2xl transform md:translate-x-12">
            <img
              src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Featured sports equipment"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-[#f58549] to-[#eda24e] rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black"
                  >
                    
                  </svg>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

