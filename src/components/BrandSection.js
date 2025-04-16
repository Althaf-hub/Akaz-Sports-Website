const BrandSection = () => {
  return (
    <section className="brands">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Trusted by the world's leading sports brands</h2>
        </div>
        <div className="brands-container">
          {[1, 2, 3, 4, 5].map((brand) => (
            <img
              key={brand}
              src={`/placeholder.svg?height=60&width=120&text=BRAND${brand}`}
              alt={`Brand ${brand}`}
              className="brand-item"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandSection

