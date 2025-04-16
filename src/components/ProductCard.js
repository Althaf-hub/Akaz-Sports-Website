import { Link } from "react-router-dom"
import { FaHeart, FaStar } from "react-icons/fa"

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" loading="lazy" />
        <span className="product-badge">{product.category}</span>
        <button className="product-favorite" aria-label="Add to favorites">
          <FaHeart />
        </button>
      </div>
      <div className="product-info">
        <div className="product-category">{product.brand}</div>
        <Link to={`/products/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-rating">
          <FaStar className="rating-star" />
          <span>{product.rating}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <button className="product-btn">
          <FaHeart />
          Add to Favorites
        </button>
      </div>
    </div>
  )
}

export default ProductCard

