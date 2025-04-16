"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaSearch, FaHeart, FaBars, FaTimes } from "react-icons/fa"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-top">
        <div className="container">
          <p>Free shipping on orders over $50 | Use code SPORT20 for 20% off</p>
        </div>
      </div>
      <div className="container">
        <div className="header-main">
          <Link to="/" className="logo">
            <span>AKAZ</span> <span>SPORTS HUB</span>
          </Link>

          <nav className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/categories/football" className="nav-link">
              Categories
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          <div className="header-actions">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search products..." />
            </div>

            <button className="favorites-btn">
              <FaHeart />
              <span className="favorites-count">3</span>
            </button>

            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="container">
            <nav className="mobile-nav">
              <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Home
              </Link>
              <Link to="/products" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Products
              </Link>
              <Link to="/categories/football" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Categories
              </Link>
              <Link to="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>
                About
              </Link>
              <Link to="/contact" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

