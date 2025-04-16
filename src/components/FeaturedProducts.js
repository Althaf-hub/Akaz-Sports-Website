import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"

// Sample product data
const featuredProducts = [
  {
    id: 1,
    name: "Pro Basketball",
    category: "Basketball",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 128,
    brand: "Nike",
  },
  {
    id: 2,
    name: "Premium Football",
    category: "Football",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 95,
    brand: "Adidas",
  },
  {
    id: 3,
    name: "Tennis Racket Pro",
    category: "Tennis",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 64,
    brand: "Wilson",
  },
  {
    id: 4,
    name: "Golf Club Set",
    category: "Golf",
    price: 349.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 42,
    brand: "Puma",
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Fitness",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 156,
    brand: "Nike",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    category: "Fitness",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 87,
    brand: "Under Armour",
  },
  {
    id: 7,
    name: "Basketball Jersey",
    category: "Basketball",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    reviews: 73,
    brand: "Nike",
  },
  {
    id: 8,
    name: "Football Cleats",
    category: "Football",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 58,
    brand: "Adidas",
  },
]

const FeaturedProducts = () => {
  return (
    <section className="products-section">
      <div className="container">
        <div className="products-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Check out our latest sports gear and equipment</p>
          </div>
          <div className="products-filters">
            <select className="filter-select">
              <option value="all">All Categories</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="golf">Golf</option>
            </select>
            <select className="filter-select">
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
        <div className="grid grid-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "2rem" }}>
          <Link to="/products" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts

