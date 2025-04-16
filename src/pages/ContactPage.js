import Header from "../components/Header"
import Footer from "../components/Footer"
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa"

const ContactPage = () => {
  return (
    <>
      <Header />
      <main>
        <section className="contact-hero py-16 bg-gradient-to-r from-[#f58549] to-[#eda24e] text-white">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Get in touch with our team and we'll get back to
              you as soon as possible.
            </p>
          </div>
        </section>

        <section className="contact-info py-16">
          <div className="container">
            <div className="grid grid-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                <p className="mb-8">
                  Fill out the form and our team will get back to you within 24 hours. You can also reach us through the
                  contact information provided.
                </p>

                <div className="contact-methods space-y-6">
                  <div className="contact-method flex items-start">
                    <div className="contact-icon mr-4 text-xl text-[#f58549]">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Our Location</h3>
                      <p>123 Sports Avenue, Athletic City, AC 12345</p>
                    </div>
                  </div>

                  <div className="contact-method flex items-start">
                    <div className="contact-icon mr-4 text-xl text-[#f58549]">
                      <FaPhone />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Phone Number</h3>
                      <p>(123) 456-7890</p>
                    </div>
                  </div>

                  <div className="contact-method flex items-start">
                    <div className="contact-icon mr-4 text-xl text-[#f58549]">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Email Address</h3>
                      <p>info@akazsportshub.com</p>
                    </div>
                  </div>

                  <div className="contact-method flex items-start">
                    <div className="contact-icon mr-4 text-xl text-[#f58549]">
                      <FaClock />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Working Hours</h3>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="social-links mt-8">
                  <h3 className="text-lg font-bold mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="social-link bg-[#f58549] text-white p-2 rounded-full">
                      <FaFacebookF />
                    </a>
                    <a href="#" className="social-link bg-[#eda24e] text-white p-2 rounded-full">
                      <FaTwitter />
                    </a>
                    <a href="#" className="social-link bg-[#f58549] text-white p-2 rounded-full">
                      <FaInstagram />
                    </a>
                    <a href="#" className="social-link bg-[#eda24e] text-white p-2 rounded-full">
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <div className="contact-form-container bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form className="contact-form">
                    <div className="form-group mb-4">
                      <label className="block mb-1 font-medium">Your Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="block mb-1 font-medium">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="block mb-1 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="block mb-1 font-medium">Subject</label>
                      <input
                        type="text"
                        placeholder="Enter subject"
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="block mb-1 font-medium">Message</label>
                      <textarea
                        rows="5"
                        placeholder="Enter your message"
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="map-section">
          <div className="container-fluid">
            <div className="map-container h-96">
              <img
                src="/placeholder.svg?height=400&width=1200&text=Google Map"
                alt="Location Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="faq py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Find answers to common questions about our products and services</p>
            </div>

            <div className="faq-list max-w-3xl mx-auto">
              <div className="faq-item mb-4 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
                <p>
                  We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All
                  payments are processed securely.
                </p>
              </div>

              <div className="faq-item mb-4 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">How long does shipping take?</h3>
                <p>
                  Standard shipping typically takes 3-5 business days within the continental US. Express shipping
                  options are available for faster delivery.
                </p>
              </div>

              <div className="faq-item mb-4 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">What is your return policy?</h3>
                <p>
                  We offer a 30-day return policy for most items. Products must be in their original condition with all
                  tags and packaging intact.
                </p>
              </div>

              <div className="faq-item mb-4 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Do you ship internationally?</h3>
                <p>
                  Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by
                  location.
                </p>
              </div>

              <div className="faq-item bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Do you offer warranties on products?</h3>
                <p>
                  Most products come with a manufacturer's warranty. The warranty period varies by product and brand.
                  Please check the product description for specific warranty information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ContactPage

