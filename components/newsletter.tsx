"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you can replace this with your actual API endpoint
      const response = await fetch("https://api.example.com/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe")
      }

      toast.success("Successfully subscribed to our newsletter!")
      setEmail("")
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-gradient-to-r from-[#f58549] to-[#eda24e] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/90 mb-8">
            Stay updated with the latest sports news, product launches, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-white text-[#f58549] hover:bg-white/90"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-white/70 text-sm mt-4">
            By subscribing, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-white">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  )
} 