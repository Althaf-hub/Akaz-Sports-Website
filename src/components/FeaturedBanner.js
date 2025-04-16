import { Link } from "react-router-dom"
import { FaExchangeAlt } from "react-icons/fa"

const FeaturedBanner = () => {
  return (
    <section className="featured-banner">
      <div className="featured-overlay"></div>
      <img
        src="/placeholder.svg?height=800&width=1200"
        alt="Featured sports equipment"
        className="featured-bg"
        loading="lazy"
      />
      <div className="container">
        <div className="featured-content">
          <div className="featured-text">
            <div className="featured-badge">New Collection</div>
            <h2 className="featured-title">
              New Season, <span>New Gear</span>
            </h2>
            <p className="featured-description">
              Discover our latest collection of premium sports equipment and apparel designed for peak performance.
            </p>
            <div className="featured-buttons">
              <Link to="/products" className="btn btn-primary">
                Shop Collection
              </Link>
              <Link to="/categories" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
          <div className="featured-image-container">
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Featured sports equipment"
              className="featured-image"
              loading="lazy"
            />
            <div className="featured-price">
              <div className="price-icon">
                <FaExchangeAlt />
              </div>
              <div className="price-text">
                <span className="price-label">Starting from</span>
                <span className="price-value">$99.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedBanner

