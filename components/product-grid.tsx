import Link from "next/link"
import { ProductCard } from "@/components/product-card"

// Mock product data
const products = [
 
  
  {
    id: 0,
    name: "Shinguards",
    category: "Guards",
    price: "Price soon",
    image: "/images/guards/s.jpg",
    rating: 4.5,
    reviews: 128,
    brand: "Captain",
  },
  {
    id: 1,
    name: "Double Layered (White)",
    category: "Shorts",
    price: "Price soon",
    image: "/images/shorts/white.jpg",
    rating: 4.5,
    reviews: 128,
    brand: "Captain",
  },
  {
    id: 2,
    name: "Duffle Bag",
    category: "Bag",
    price: "price soon",
    image: "/images/bag/1.jpg",
    rating: 4.8,
    reviews: 95,
    brand: "Captain",
  },
  {
    id: 3,
    name: "Crystal grip",
    category: "Socks",
    price: "price soon",
    image: "/images/Socks/s1.png",
    rating: 4.7,
    reviews: 64,
    brand: "Captain",
  },
  {
    id: 5,
    name: "Premier Football",
    category: "Football",
    price: "price soon",
    image: "/images/ball/bb.jpg",
    rating: 4.9,
    reviews: 42,
    brand: "Captain",
  },
  {
    id: 4,
    name: "Cricket Gloves",
    category: "Cricket",
    price: "price soon",
    image: "/images/Gloves/cr1.jpg",
    rating: 4.6,
    reviews: 156,
    brand: "Captain",
  },
  {
    id: 6,
    name: "Double Layered (Black)",
    category: "Shorts",
    price: "price soon",
    image: "/images/shorts/s1.jpg",
    rating: 4.4,
    reviews: 87,
    brand: "Captain",
  },
  {
    id: 7,
    name: "Bottle 750ml",
    category: "Bottles",
    price: "price soon",
    image: "/images/bottle/b1.jpg",
    rating: 4.3,
    reviews: 73,
    brand: "Captain",
  },
  {
    id: 8,
    name: "Little Star",
    category: "Football",
    price: "price soon",
    image: "/images/ball/b1.png",
    rating: 4.7,
    reviews: 58,
    brand: "Captain",
  },
  {
    id: 9,
    name: "Arm Sleeves (Black)",
    category: "Compressions",
    price: "price soon",
    image: "/images/compressions/c1.jpg",
    rating: 4.5,
    reviews: 42,
    brand: "Captain",
  },
  {
    id: 10,
    name: "Academy 4 Ball",
    category: "Football",
    price: "price soon",
    image: "/images/ball/5.png",
    rating: 4.6,
    reviews: 38,
    brand: "Captain",
  },
  {
    id: 11,
    name: "BagPack (10L)",
    category: "Bag",
    price: "price soon",
    image: "/images/blk-3.png",
    rating: 4.8,
    reviews: 112,
    brand: "Captain",
  },
  {
    id: 12,
    name: "Anza Rhino",
    category: "Soccer Boots",
    price: "price soon",
    image: "/images/boot/ar.jpg",
    rating: 4.8,
    reviews: 112,
    brand: "Anza",
  },
  {
    id: 13,
    name: "Pro Junior Racket",
    category: "Badminton",
    price: "price soon",
    image: "/images/racket/2.png",
    rating: 4.7,
    reviews: 65,
    brand: "Captain",
  },
]

export function ProductGrid() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div className="col-span-full mt-8 flex justify-center">
        <Link
          href="/products"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          View All Products
        </Link>
      </div>
    </div>
  )
}

