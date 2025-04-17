"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Heart, Search } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import React from "react"
import { ProductCard } from "@/components/product-card"

// All products data
const allProducts = [
  
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
    name: "Anza Copa Rise",
    category: "Soccer Boots",
    price: "price soon",
    image: "/images/boot/ac.jpg",
    rating: 4.6,
    reviews: 100,
    brand: "Anza",
  },  
  {
    id: 11,
    name: "Akaz Jersey",
    category: "Jersey",
    price: "price soon",
    image: "/assets/akaz/img83.jpg",
    rating: 4.5,
    reviews: 42,
    brand: "Akaz",
  },
  {
    id: 12,
    name: "Academy 4 Ball",
    category: "Football",
    price: "price soon",
    image: "/images/ball/5.png",
    rating: 4.6,
    reviews: 38,
    brand: "Captain",
  },
  {
    id: 13,
    name: "BagPack (10L)",
    category: "Bag",
    price: "price soon",
    image: "/images/bag/1.jpg",
    rating: 4.8,
    reviews: 112,
    brand: "Captain",
  },
  {
    id: 14,
    name: "Anza Rhino",
    category: "Soccer Boots",
    price: "price soon",
    image: "/images/boot/ar.jpg",
    rating: 4.8,
    reviews: 112,
    brand: "Anza",
  },
  {
    id: 15,
    name: "Pro Junior Racket",
    category: "Badminton",
    price: "price soon",
    image: "/images/racket/2.png",
    rating: 4.7,
    reviews: 65,
    brand: "Captain",
  },
  {
    id: 16,
    name: "Anza Future",
    category: "Soccer Boots",
    price: "price soon",
    image: "/images/boot/af.jpg",
    rating: 4.5,
    reviews: 87,
    brand: "Anza",
  },
]


const categories = ["All", "Badminton", "Football", "Compressions", "Bag", "Bottles", "Shorts", "Socks", "Guards", "Soccer Boots", "Cricket", "Jersey"]
const brands = ["Captain", "Anza","Akaz"]

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("latest")
  const [searchQuery, setSearchQuery] = useState("")

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle category selection
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "All") {
      setSelectedCategories(checked ? [] : [])
      return
    }

    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  // Handle brand selection
  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value)
  }

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]
    console.log('Initial products:', allProducts)
    console.log('Selected categories:', selectedCategories)

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => {
        const isIncluded = selectedCategories.includes(product.category)
        console.log(`Product ${product.name} (${product.category}) included:`, isIncluded)
        return isIncluded
      })
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    console.log('Filtered products:', filtered)
    // Sort products
    switch (sortOption) {
      case "popular":
        return [...filtered].sort((a, b) => b.reviews - a.reviews)
      default: // latest
        return [...filtered].sort((a, b) => b.id - a.id)
    }
  }, [selectedCategories, selectedBrands, sortOption, searchQuery])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-6 flex items-start">
            <div className="relative w-full max-w-2xl">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-lg border-2 border-grey-900 pl-10 pr-4 py-2 "
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#eda24e]" />
            </div>
          </div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full md:w-64">
              <div className="sticky top-24 space-y-6 bg-white p-6 rounded-xl shadow-md">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.toLowerCase()}`}
                          checked={
                            category === "All" ? selectedCategories.length === 0 : selectedCategories.includes(category)
                          }
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <label
                          htmlFor={`category-${category.toLowerCase()}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand.toLowerCase()}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                        />
                        <label
                          htmlFor={`brand-${brand.toLowerCase()}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold">All Products</h1>
                <div className="flex items-center gap-2">
                  <select
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
                  {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                  ))}
                </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

