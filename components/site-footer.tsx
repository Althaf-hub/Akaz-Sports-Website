import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-black text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-[#f58549] to-[#eda24e] text-transparent bg-clip-text">
              AKAZ SPORTS HUB
            </h3>
            <p className="text-sm text-gray-400">
              Your one-stop shop for all sports equipment and gear. Quality products for athletes of all levels.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="https://www.facebook.com/share/1A4UBP3wby/" className="text-gray-400 hover:text-[#f58549] transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.instagram.com/captain.gcc_?igsh=MTNwdnZjYXc4ZG1lMQ==" className="text-gray-400 hover:text-[#eda24e] transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
           
            
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-[#f58549] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#eda24e] transition-colors">
                  Football
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#f58549] transition-colors">
                  Basketball
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#eda24e] transition-colors">
                  Tennis
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#f58549] transition-colors">
                  Golf
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#eda24e] transition-colors">
                  Fitness
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Information</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-[#f58549] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#eda24e] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#f58549] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#eda24e] transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#f58549] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>
            <address className="not-italic text-sm text-gray-400">
              <p>Zone 53 building no 53</p>
              <p>street 790,Doha,Qatar</p>
              <p className="mt-2">Phone: (+974) 30016557</p>
              <p>Email: akazsportshub@akazsportshub.com</p>
            </address>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AKAZ SPORTS HUB. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-[#f58549] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#eda24e] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[#f58549] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

