"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { productsData } from "../data/products"

const CategoryPage = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [sortOption, setSortOption] = useState("latest")
  const [visibleProducts, setVisibleProducts] = useState(8)

  useEffect(() => {
    // In a real app, this would be an API call
    const categoryProducts = productsData.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    setProducts(categoryProducts)
    setVisibleProducts(8) // Reset visible products when category changes
  }, [category])

  const sortProducts = () => {
    const sortedProducts = [...products]

    switch (sortOption) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "popular":
        sortedProducts.sort((a, b) => b.reviews - a.reviews)
        break
      default: // latest
        sortedProducts.sort((a, b) => b.id - a.id)
    }

    return sortedProducts
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 4)
  }

  const sortedProducts = sortProducts()
  const displayedProducts = sortedProducts.slice(0, visibleProducts)

  // Capitalize first letter of category
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <>
      <Header />
      <main className="category-page py-8">
        <div className="container">
          <div className="category-header text-center mb-8">
            <h1 className="section-title">{categoryName} Equipment</h1>
            <p className="section-subtitle">
              Explore our collection of premium {category.toLowerCase()} equipment and gear
            </p>
          </div>

          <div className="category-filters flex justify-between items-center mb-6">
            <div className="results-count">
              Showing {Math.min(visibleProducts, sortedProducts.length)} of {sortedProducts.length} products
            </div>
            <div className="sort-options">
              <select className="filter-select" value={sortOption} onChange={handleSortChange}>
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {displayedProducts.length > 0 ? (
            <>
              <div className="grid grid-4">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {visibleProducts < sortedProducts.length && (
                <div className="text-center mt-8">
                  <button className="btn btn-primary" onClick={loadMoreProducts}>
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-category text-center py-16">
              <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
              <p className="mb-6">We couldn't find any products in this category.</p>
              <Link to="/products" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default CategoryPage

