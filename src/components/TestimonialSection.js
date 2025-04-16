import { FaStar } from "react-icons/fa"

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Professional Basketball Player",
    content:
      "The quality of equipment from Akaz Sports Hub has significantly improved my game. I wouldn't trust any other brand for my professional needs.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Tennis Coach",
    content:
      "I recommend Akaz Sports Hub to all my students. Their tennis rackets provide the perfect balance of power and control for players at any level.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Amateur Golfer",
    content:
      "As someone who plays golf on weekends, I was looking for quality without breaking the bank. Akaz Sports Hub delivered exactly what I needed.",
    rating: 4,
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

const TestimonialSection = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Trusted by sports enthusiasts everywhere</p>
        </div>
        <div className="grid grid-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-decoration"></div>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="testimonial-star" style={{ opacity: i < testimonial.rating ? 1 : 0.3 }} />
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="author-image"
                  loading="lazy"
                />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection

