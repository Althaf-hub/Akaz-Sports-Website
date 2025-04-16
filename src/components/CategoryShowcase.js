import { Link } from "react-router-dom"

const categories = [
  {
    name: "Football",
    image: "/placeholder.svg?height=400&width=300",
    count: 42,
  },
  {
    name: "Basketball",
    image: "/placeholder.svg?height=400&width=300",
    count: 38,
  },
  {
    name: "Tennis",
    image: "/placeholder.svg?height=400&width=300",
    count: 24,
  },
  {
    name: "Golf",
    image: "/placeholder.svg?height=400&width=300",
    count: 36,
  },
]

const CategoryShowcase = () => {
  return (
    <section className="category-showcase">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Shop By Category</h2>
          <p className="section-subtitle">Find the perfect gear for your sport from our curated collections</p>
        </div>
        <div className="grid grid-4">
          {categories.map((category, index) => (
            <Link to={`/categories/${category.name.toLowerCase()}`} key={category.name} className="category-card">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="category-image"
                loading="lazy"
              />
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} Products</p>
                <div className="category-indicator"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcase

