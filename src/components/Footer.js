import { Link } from "react-router-dom"
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-column">
            <h3 className="footer-logo">AKAZ SPORTS HUB</h3>
            <p className="footer-description">
              Your one-stop shop for all sports equipment and gear. Quality products for athletes of all levels.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Shop</h3>
            <div className="footer-links">
              <Link to="/products" className="footer-link">
                All Products
              </Link>
              <Link to="/categories/football" className="footer-link">
                Football
              </Link>
              <Link to="/categories/basketball" className="footer-link">
                Basketball
              </Link>
              <Link to="/categories/tennis" className="footer-link">
                Tennis
              </Link>
              <Link to="/categories/golf" className="footer-link">
                Golf
              </Link>
              <Link to="/categories/fitness" className="footer-link">
                Fitness
              </Link>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Information</h3>
            <div className="footer-links">
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
              <Link to="/shipping" className="footer-link">
                Shipping Policy
              </Link>
              <Link to="/returns" className="footer-link">
                Returns Policy
              </Link>
              <Link to="/faq" className="footer-link">
                FAQ
              </Link>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Contact</h3>
            <div className="footer-contact">
              <p>123 Sports Avenue</p>
              <p>Athletic City, AC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@akazsportshub.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} AKAZ SPORTS HUB. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-bottom-link">
              Terms of Service
            </Link>
            <Link to="/cookies" className="footer-bottom-link">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

