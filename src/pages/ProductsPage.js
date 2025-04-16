"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { FaList, FaThLarge } from "react-icons/fa"
import { productsData } from "../data/products"

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500)
  const [sortOption, setSortOption] = useState("latest")
  const [visibleProducts, setVisibleProducts] = useState(8)
  const [viewMode, setViewMode] = useState("grid")

  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(productsData)
    setFilteredProducts(productsData)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [selectedCategories, selectedBrands, priceRange, sortOption])

  const applyFilters = () => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    // Filter by price
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default: // latest
        filtered.sort((a, b) => b.id - a.id)
    }

    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleBrandChange = (brand, checked) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const handleMinPriceChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setMinPrice(value)
    setPriceRange([value, priceRange[1]])
  }

  const handleMaxPriceChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setMaxPrice(value)
    setPriceRange([priceRange[0], value])
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 8)
  }

  const categories = ["Football", "Basketball", "Tennis", "Golf", "Fitness"]
  const brands = ["Nike", "Adidas", "Under Armour", "Wilson", "Puma"]

  return (
    <>
      <Header />
      <main className="products-page">
        <div className="container">
          <div className="products-container">
            <aside className="filters-sidebar">
              <div className="filter-group">
                <h3 className="filter-title">Categories</h3>
                <div className="filter-options">
                  {categories.map((category) => (
                    <label key={category} className="filter-option">
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                      />
                      <span className="filter-label">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3 className="filter-title">Price Range</h3>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  />
                </div>
                <div className="price-inputs">
                  <input
                    type="number"
                    className="price-input"
                    placeholder="Min"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="price-input"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              </div>

              <div className="filter-group">
                <h3 className="filter-title">Brands</h3>
                <div className="filter-options">
                  {brands.map((brand) => (
                    <label key={brand} className="filter-option">
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => handleBrandChange(brand, e.target.checked)}
                      />
                      <span className="filter-label">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="filter-btn" onClick={applyFilters}>
                Apply Filters
              </button>
            </aside>

            <div className="products-content">
              <div className="products-header">
                <h1 className="products-title">All Products</h1>
                <div className="products-sort">
                  <select className="sort-select" value={sortOption} onChange={handleSortChange}>
                    <option value="latest">Latest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>

                  <div className="view-buttons">
                    <button
                      className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                      onClick={() => setViewMode("grid")}
                      aria-label="Grid view"
                    >
                      <FaThLarge />
                    </button>
                    <button
                      className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                      onClick={() => setViewMode("list")}
                      aria-label="List view"
                    >
                      <FaList />
                    </button>
                  </div>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <>
                  <div className={`products-${viewMode}`}>
                    {filteredProducts.slice(0, visibleProducts).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {visibleProducts < filteredProducts.length && (
                    <div className="load-more">
                      <button className="btn btn-primary" onClick={loadMoreProducts}>
                        Load More
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-products">
                  <h3 className="empty-title">No products found</h3>
                  <p className="empty-message">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ProductsPage

