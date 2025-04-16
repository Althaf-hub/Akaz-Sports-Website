"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react"
import emailjs from '@emailjs/browser'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await emailjs.send(
        'service_vimfyjb', // Replace with your EmailJS service ID
        'template_ctjanf9', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'JEmlBDceRT7yKfs8o' // Replace with your EmailJS public key
      )
      
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-16">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#f58549] to-[#eda24e] mt-4 mb-3 rounded-full"></div>
            <p className="text-muted-foreground text-lg">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-100 text-green-700 rounded-md">
                        Message sent successfully! We'll get back to you soon.
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-100 text-red-700 rounded-md">
                        There was an error sending your message. Please try again later.
                      </div>
                    )}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        required
                        className="min-h-[150px]"
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#f58549] to-[#eda24e] text-white hover:bg-gradient-to-r hover:from-[#e07539] hover:to-[#d99239]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gradient-to-r from-[#f58549] to-[#eda24e] rounded-full">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Our Location</h3>
                        <p className="text-sm text-muted-foreground">
                          Zone 53 building no 53
                          <br />
                          street 790, Doha, Qatar
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gradient-to-r from-[#f58549] to-[#eda24e] rounded-full">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-sm text-muted-foreground">(+974) 30016557</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gradient-to-r from-[#f58549] to-[#eda24e] rounded-full">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-sm text-muted-foreground">akazsportshub@akazsportshub.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gradient-to-r from-[#f58549] to-[#eda24e] rounded-full">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Working Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          Monday - Thursday: 9:00 AM - 11:00 PM
                          <br />
                          Friday: Closed
                          <br />
                          Saturday: 1:00 PM - 10:00 PM
                          <br />
                          Sunday: 9:00 AM - 11:00 PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gradient-to-r from-[#f58549] to-[#eda24e] rounded-full">
                        <Instagram className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Follow Us</h3>
                        <div className="flex gap-4 mt-2">
                          <a
                            href="https://www.instagram.com/akazsportshub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#f58549] transition-colors"
                          >
                            <Instagram className="h-4 w-4" />
                            Instagram
                          </a>
                          <a
                            href="https://www.facebook.com/akazsportshub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#f58549] transition-colors"
                          >
                            <Facebook className="h-4 w-4" />
                            Facebook
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
} 