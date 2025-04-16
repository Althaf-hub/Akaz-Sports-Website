"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { FaStar, FaHeart, FaShoppingCart, FaShare, FaCheck } from "react-icons/fa"
import { productsData } from "../data/products"

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = productsData.find((p) => p.id === Number.parseInt(id))
    setProduct(foundProduct)

    // Get related products from the same category
    if (foundProduct) {
      const related = productsData
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [id])

  if (!product) {
    return (
      <>
        <Header />
        <main className="container py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Mock product images (in a real app, product would have multiple images)
  const productImages = [
    product.image,
    "/placeholder.svg?height=300&width=300&text=Image2",
    "/placeholder.svg?height=300&width=300&text=Image3",
    "/placeholder.svg?height=300&width=300&text=Image4",
  ]

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <>
      <Header />
      <main className="product-detail py-8">
        <div className="container">
          <div className="breadcrumbs mb-6">
            <Link to="/">Home</Link> /<Link to="/products"> Products</Link> /
            <Link to={`/categories/${product.category.toLowerCase()}`}> {product.category}</Link> /
            <span> {product.name}</span>
          </div>

          <div className="product-detail-main grid grid-2 gap-8">
            <div className="product-images">
              <div className="main-image mb-4">
                <img
                  src={productImages[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="image-thumbnails flex gap-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail-btn ${selectedImage === index ? "active" : ""}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-auto rounded"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-info">
              <span className="badge badge-primary">{product.category}</span>
              <h1 className="product-title text-3xl font-bold mt-2 mb-2">{product.name}</h1>

              <div className="product-meta flex items-center gap-4 mb-4">
                <div className="product-rating flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"} />
                  ))}
                  <span className="ml-2">{product.rating}</span>
                </div>
                <span className="reviews-count">({product.reviews} Reviews)</span>
                <span className="brand">
                  Brand: <strong>{product.brand}</strong>
                </span>
              </div>

              <div className="product-price text-3xl font-bold mb-4 text-gradient">${product.price.toFixed(2)}</div>

              <p className="product-description mb-6">
                This premium {product.category.toLowerCase()} equipment is designed for athletes who demand excellence.
                Featuring advanced technology and high-quality materials, it delivers superior performance for both
                professional and amateur players.
              </p>

              <div className="product-availability flex items-center gap-2 mb-4">
                <FaCheck className="text-green-500" />
                <span>In Stock</span>
              </div>

              <div className="product-actions mb-6">
                <div className="quantity-selector flex items-center mb-4">
                  <span className="mr-4">Quantity:</span>
                  <div className="flex">
                    <button className="quantity-btn" onClick={decreaseQuantity}>
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                      className="quantity-input"
                    />
                    <button className="quantity-btn" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons flex gap-4">
                  <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                  <button className="btn btn-outline flex items-center justify-center">
                    <FaHeart />
                  </button>
                  <button className="btn btn-outline flex items-center justify-center">
                    <FaShare />
                  </button>
                </div>
              </div>

              <div className="product-meta-info">
                <div className="meta-item">
                  <span className="meta-label">SKU:</span>
                  <span className="meta-value">SP-{product.id.toString().padStart(4, "0")}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <Link to={`/categories/${product.category.toLowerCase()}`} className="meta-value link">
                    {product.category}
                  </Link>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Tags:</span>
                  <span className="meta-value">
                    <Link to={`/products?tag=sports`} className="tag-link">
                      Sports
                    </Link>
                    ,
                    <Link to={`/products?tag=${product.category.toLowerCase()}`} className="tag-link">
                      {product.category}
                    </Link>
                    ,
                    <Link to={`/products?tag=equipment`} className="tag-link">
                      Equipment
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-tabs mt-12">
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`tab-btn ${activeTab === "specifications" ? "active" : ""}`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
              <button
                className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews ({product.reviews})
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "description" && (
                <div className="description-tab">
                  <h3>Product Description</h3>
                  <p>
                    Experience the ultimate in {product.category} performance with the {product.name} from{" "}
                    {product.brand}. Designed with the latest technology and premium materials, this product delivers
                    exceptional performance for athletes of all levels.
                  </p>
                  <p>
                    The {product.name} features advanced design elements that enhance your game, providing better
                    control, comfort, and durability. Whether you're a professional athlete or a weekend warrior, this
                    product will help you perform at your best.
                  </p>
                  <p>Key features include:</p>
                  <ul>
                    <li>Premium quality materials for durability</li>
                    <li>Ergonomic design for comfort</li>
                    <li>Advanced technology for superior performance</li>
                    <li>Lightweight construction for easy handling</li>
                    <li>Professional-grade specifications</li>
                  </ul>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="specifications-tab">
                  <h3>Product Specifications</h3>
                  <table className="specs-table">
                    <tbody>
                      <tr>
                        <td>Brand</td>
                        <td>{product.brand}</td>
                      </tr>
                      <tr>
                        <td>Model</td>
                        <td>{product.name}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{product.category}</td>
                      </tr>
                      <tr>
                        <td>Material</td>
                        <td>Premium synthetic materials</td>
                      </tr>
                      <tr>
                        <td>Weight</td>
                        <td>Varies by size</td>
                      </tr>
                      <tr>
                        <td>Dimensions</td>
                        <td>Standard regulation size</td>
                      </tr>
                      <tr>
                        <td>Color Options</td>
                        <td>Multiple colors available</td>
                      </tr>
                      <tr>
                        <td>Warranty</td>
                        <td>1 year manufacturer warranty</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="reviews-tab">
                  <h3>Customer Reviews</h3>
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <div className="rating-number">{product.rating}</div>
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <div className="total-reviews">Based on {product.reviews} reviews</div>
                    </div>
                    <div className="rating-bars">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="rating-bar-item">
                          <span className="stars-count">{stars} stars</span>
                          <div className="rating-bar">
                            <div
                              className="rating-fill"
                              style={{
                                width: `${Math.round(Math.random() * 100)}%`,
                                backgroundColor: stars > 3 ? "#f58549" : "#ccc",
                              }}
                            ></div>
                          </div>
                          <span className="percentage">{Math.round(Math.random() * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="customer-reviews">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="review-item">
                        <div className="reviewer-info">
                          <img
                            src={`/placeholder.svg?height=50&width=50&text=User${i + 1}`}
                            alt={`Reviewer ${i + 1}`}
                            className="reviewer-avatar"
                          />
                          <div>
                            <h4 className="reviewer-name">Customer {i + 1}</h4>
                            <div className="review-date">April {i + 1}, 2025</div>
                          </div>
                        </div>
                        <div className="review-rating">
                          {[...Array(5)].map((_, j) => (
                            <FaStar key={j} className={j < 5 - i ? "text-yellow-500" : "text-gray-300"} />
                          ))}
                        </div>
                        <h5 className="review-title">Great product, highly recommend!</h5>
                        <p className="review-content">
                          This {product.name} exceeded my expectations. The quality is excellent and it has improved my
                          game significantly. I would definitely recommend this to anyone looking for a high-quality{" "}
                          {product.category.toLowerCase()} equipment.
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="write-review">
                    <h3>Write a Review</h3>
                    <form className="review-form">
                      <div className="form-group">
                        <label>Your Rating</label>
                        <div className="rating-selector">
                          {[...Array(5)].map((_, i) => (
                            <button key={i} type="button" className="rating-star-btn">
                              <FaStar />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Review Title</label>
                        <input type="text" placeholder="Give your review a title" />
                      </div>
                      <div className="form-group">
                        <label>Your Review</label>
                        <textarea rows="5" placeholder="Write your review here"></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="related-products mt-16">
            <h2 className="section-title">Related Products</h2>
            <p className="section-subtitle">You might also like these products</p>
            <div className="grid grid-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ProductDetailPage

