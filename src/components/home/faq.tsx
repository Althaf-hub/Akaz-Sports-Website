"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqs = [
  {
    question: "What is Akaz Sports Hub?",
    answer:
      "Akaz Sports Hub is Qatar's premier sports company and an official GCC distributor of world-class athletic gear. We supply premium compression wear, sports footwear, training equipment, and performance apparel from globally recognised brands — including Captain, Triumph, Gowin, Babbler, and our own Akaz line. As Qatar's leading sports hub, we are committed to elevating every athlete's performance.",
  },
  {
    question: "Where is Akaz Sports Hub located?",
    answer:
      "Akaz Sports Hub is headquartered in Qatar and serves customers across the GCC region including Saudi Arabia, UAE, Kuwait, Bahrain, and Oman. Our online store ships throughout Qatar — from Doha and Al Rayyan to Al Wakrah and Al Khor — making it easy for athletes everywhere to access premium sports gear.",
  },
  {
    question: "What compression products does Akaz Sports Hub carry?",
    answer:
      "We carry a comprehensive range of compression wear including compression tights, shorts, long-sleeve tops, arm sleeves, calf sleeves, and full-body compression suits. Our compression sportswear is engineered to improve blood circulation, reduce muscle fatigue, speed up recovery, and enhance athletic performance during training and competition.",
  },
  {
    question: "What sports brands does Akaz Sports Hub distribute?",
    answer:
      "As an official GCC distributor, Akaz Sports Hub carries products from multiple top-tier brands. Our portfolio includes Captain, Triumph, Gowin, Babbler, and the exclusive Akaz brand. We continuously expand our brand partnerships to bring Qatar and GCC athletes the finest selection of authentic, performance-driven sports gear.",
  },
  {
    question: "Does Akaz Sports Hub ship across Qatar?",
    answer:
      "Yes! We offer fast and reliable delivery across all of Qatar. Orders above a certain threshold qualify for free express shipping. Our logistics team ensures your sports gear arrives promptly so you can get back to training without delay.",
  },
  {
    question: "Are the products on Akaz Sports Hub authentic?",
    answer:
      "Absolutely. Akaz Sports Hub only sources authentic, top-tier products directly from brand manufacturers and authorised distributors. As an official GCC distributor, we guarantee the authenticity and quality of every item sold through our platform — shop with complete confidence.",
  },
  {
    question: "Does Akaz Sports Hub cater to professional athletes and sports clubs?",
    answer:
      "Yes. Akaz Sports Hub supplies gear to professional athletes, sports clubs, schools, gyms, and fitness enthusiasts across Qatar and the GCC. Whether you are a seasoned competitor or just beginning your athletic journey, our sports hub has the right equipment to match your level and ambitions.",
  },
  {
    question: "What is Akaz Sports Hub's return policy?",
    answer:
      "We offer a 30-day hassle-free return policy on all eligible products. If you are not completely satisfied with your purchase — whether due to sizing, defects, or any other reason — simply contact our support team and we will arrange a return or exchange. Your satisfaction is our priority at Akaz Sports Hub.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full bg-zinc-950 py-32 relative overflow-hidden border-t border-white/5"
    >
      {/* Background glows */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-800/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center mb-20 text-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xl mb-6">
              Got Questions?
            </div>
            <h2
              id="faq-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white mb-4 uppercase"
            >
              Frequently Asked{" "}
              <span className="text-primary">Questions</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg font-medium">
              Everything you need to know about Akaz Sports Hub — Qatar&apos;s
              leading sports company for compression gear, footwear &amp; more.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors duration-300">
                <button
                  id={`faq-btn-${index}`}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-6 sm:p-8 text-left group"
                >
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors duration-200 leading-snug">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-primary text-white transition-all duration-300">
                    {openIndex === index ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                        <div className="h-px w-full bg-white/5 mb-6" />
                        <p className="text-zinc-400 text-base leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 text-center">
            <p className="text-zinc-500 font-medium text-sm">
              Still have questions?{" "}
              <a
                href="mailto:info@akazsportshub.com"
                className="text-white hover:text-primary transition-colors font-bold underline underline-offset-4"
              >
                Contact our team
              </a>{" "}
              — we&apos;re always happy to help.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
