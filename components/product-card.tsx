import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  category: string
  price: string
  image: string
  rating: number
  reviews: number
  brand?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl border-0 rounded-xl">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-gray-100 relative group">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-[#f58549] to-[#eda24e] text-white text-xs font-medium rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
      <CardContent className="p-5">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#eda24e]">{product.brand || "AKAZ"}</p>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          </div>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium text-lg hover:text-[#f58549] transition-colors">{product.name}</h3>
          </Link>
        </div>
        <div className="mt-3 font-bold text-xl text-[#f58549]">{product.price}</div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
       
      </CardFooter>
    </Card>
  )
}

