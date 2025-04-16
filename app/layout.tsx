import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
})

export const metadata = {
  title: "AKAZ SPORTS HUB - Premium Sports Equipment",
  description: "Your one-stop shop for all sports equipment and gear. Quality products for athletes of all levels.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#f58549",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'