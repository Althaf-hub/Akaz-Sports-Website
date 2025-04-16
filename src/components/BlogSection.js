import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Football Boots",
    excerpt:
      "A comprehensive guide to selecting football boots based on your playing style, position, and field conditions.",
    date: "April 2, 2025",
    image: "/placeholder.svg?height=300&width=500",
    category: "Football",
  },
  {
    id: 2,
    title: "5 Essential Basketball Drills for Beginners",
    excerpt: "Master the fundamentals with these simple yet effective basketball drills designed for new players.",
    date: "March 28, 2025",
    image: "/placeholder.svg?height=300&width=500",
    category: "Basketball",
  },
  {
    id: 3,
    title: "The Evolution of Tennis Racket Technology",
    excerpt: "Explore how tennis racket design has changed over the decades and how it affects modern gameplay.",
    date: "March 15, 2025",
    image: "/placeholder.svg?height=300&width=500",
    category: "Tennis",
  },
]

const BlogSection = () => {
  return (
    <section className="blog">
      <div className="container">
        <div className="blog-header">
          <div>
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-subtitle">Tips, guides, and news from the world of sports</p>
          </div>
          <Link to="/blog" className="btn btn-primary">
            View All Articles
          </Link>
        </div>
        <div className="grid grid-3">
          {blogPosts.map((post, index) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image-container">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="blog-image" loading="lazy" />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="blog-title">{post.title}</h3>
                </Link>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="blog-link">
                  Read More <FaArrowRight className="blog-link-icon" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection

