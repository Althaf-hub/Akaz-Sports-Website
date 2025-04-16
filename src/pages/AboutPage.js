import Header from "../components/Header"
import Footer from "../components/Footer"
import { FaTrophy, FaUsers, FaGlobe, FaCheckCircle } from "react-icons/fa"

const AboutPage = () => {
  return (
    <>
      <Header />
      <main>
        <section className="about-hero py-16 bg-gradient-to-r from-[#f58549] to-[#eda24e] text-white">
          <div className="container">
            <div className="grid grid-2 items-center gap-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">About AKAZ Sports Hub</h1>
                <p className="text-lg mb-6">
                  We're passionate about sports and dedicated to providing athletes of all levels with the highest
                  quality equipment and gear.
                </p>
                <div className="stats-grid grid grid-2 gap-4">
                  <div className="stat-card bg-white/20 p-4 rounded-lg">
                    <div className="text-3xl font-bold">10+</div>
                    <div>Years of Experience</div>
                  </div>
                  <div className="stat-card bg-white/20 p-4 rounded-lg">
                    <div className="text-3xl font-bold">5000+</div>
                    <div>Happy Customers</div>
                  </div>
                  <div className="stat-card bg-white/20 p-4 rounded-lg">
                    <div className="text-3xl font-bold">500+</div>
                    <div>Products</div>
                  </div>
                  <div className="stat-card bg-white/20 p-4 rounded-lg">
                    <div className="text-3xl font-bold">15+</div>
                    <div>Sports Categories</div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="/placeholder.svg?height=400&width=600&text=About Us"
                  alt="About AKAZ Sports Hub"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="our-story py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Story</h2>
              <p className="section-subtitle">How we became the leading sports equipment provider</p>
            </div>
            <div className="grid grid-2 gap-8 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=400&width=600&text=Our Story"
                  alt="Our Story"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">From Passion to Business</h3>
                <p className="mb-4">
                  AKAZ Sports Hub was founded in 2015 by a group of sports enthusiasts who were frustrated with the lack
                  of high-quality sports equipment in the market. What started as a small online store has now grown
                  into one of the leading sports equipment retailers in the country.
                </p>
                <p className="mb-4">
                  Our journey began with a simple mission: to provide athletes with the best equipment to help them
                  perform at their best. This mission continues to drive everything we do today.
                </p>
                <p>
                  Over the years, we've expanded our product range to cover more sports and cater to athletes of all
                  levels, from beginners to professionals. We take pride in our curated selection of products from the
                  world's leading sports brands, as well as our exceptional customer service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="our-values py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Values</h2>
              <p className="section-subtitle">The principles that guide our business</p>
            </div>
            <div className="grid grid-4 gap-6">
              <div className="value-card bg-white p-6 rounded-lg shadow-md text-center">
                <div className="value-icon mb-4 text-4xl text-[#f58549]">
                  <FaTrophy />
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p>We strive for excellence in everything we do, from product selection to customer service.</p>
              </div>
              <div className="value-card bg-white p-6 rounded-lg shadow-md text-center">
                <div className="value-icon mb-4 text-4xl text-[#eda24e]">
                  <FaUsers />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p>We believe in building a community of athletes who support and inspire each other.</p>
              </div>
              <div className="value-card bg-white p-6 rounded-lg shadow-md text-center">
                <div className="value-icon mb-4 text-4xl text-[#f58549]">
                  <FaGlobe />
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p>We're committed to sustainable practices that minimize our environmental impact.</p>
              </div>
              <div className="value-card bg-white p-6 rounded-lg shadow-md text-center">
                <div className="value-icon mb-4 text-4xl text-[#eda24e]">
                  <FaCheckCircle />
                </div>
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p>We operate with honesty and transparency in all our business dealings.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="team py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="section-title">Meet Our Team</h2>
              <p className="section-subtitle">The people behind AKAZ Sports Hub</p>
            </div>
            <div className="grid grid-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((member) => (
                <div key={member} className="team-card bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={`/placeholder.svg?height=300&width=300&text=Team Member ${member}`}
                    alt={`Team Member ${member}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">Team Member {member}</h3>
                    <p className="text-[#f58549] mb-2">Position Title</p>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta py-16 bg-gradient-to-r from-[#f58549] to-[#eda24e] text-white text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Be part of our growing community of sports enthusiasts and get exclusive deals, training tips, and early
              access to new products.
            </p>
            <form className="newsletter-form flex max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-l-lg" />
              <button type="submit" className="btn btn-black rounded-l-none">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AboutPage

