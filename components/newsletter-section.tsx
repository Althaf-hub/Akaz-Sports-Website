import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  return (
    <section className="py-12 md:py-20 bg-black text-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive deals, training tips, and early access to new products.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
            />
            <Button className="bg-[#f4a460] text-black hover:bg-[#e09450]">Subscribe</Button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  )
}

