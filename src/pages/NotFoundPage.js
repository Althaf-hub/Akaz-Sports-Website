import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main className="not-found py-16">
        <div className="container text-center">
          <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link to="/products" className="btn btn-outline border-[#f58549] text-[#f58549]">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage

