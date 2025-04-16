import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Professional Athlete",
    content: "The quality of sports equipment I received was exceptional. It has significantly improved my performance on the field.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Fitness Trainer",
    content: "As a fitness trainer, I recommend these products to all my clients. The durability and performance are unmatched.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Sports Coach",
    content: "The equipment has helped my team perform better than ever. The customer service is also outstanding.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
]

export function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#f58549] to-[#eda24e] text-transparent bg-clip-text">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#f58549] to-[#eda24e] mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
            Trusted by sports enthusiasts everywhere
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative ${
                index % 2 === 0 ? "border-l-4 border-[#f58549]" : "border-l-4 border-[#eda24e]"
              }`}
            >
              <div
                className={`absolute top-0 right-0 w-16 h-16 ${
                  index % 2 === 0 ? "bg-[#f58549]/10" : "bg-[#eda24e]/10"
                } rounded-bl-3xl`}
              ></div>
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? `fill-[${index % 2 === 0 ? "#f58549" : "#eda24e"}] text-[${index % 2 === 0 ? "#f58549" : "#eda24e"}]`
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
                  alt={testimonial.name}
                  className={`w-14 h-14 rounded-full object-cover border-2 border-[${index % 2 === 0 ? "#f58549" : "#eda24e"}]`}
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

