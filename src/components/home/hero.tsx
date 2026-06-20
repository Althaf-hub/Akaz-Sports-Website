"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.2, 1] as const },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black px-4 sm:px-6 lg:px-8"
    >
      {/* Dynamic Background Elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/hero-bg-2.png" 
          alt="Female runner at starting blocks" 
          className="absolute inset-0 w-full h-full object-cover object-[center_top] opacity-80"
        />
        
        {/* Dark Overlays for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        
        {/* Geometric Grid (Subtle Texture) */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] opacity-50"
          style={{ backgroundSize: '4rem 4rem', transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(-20%)', transformOrigin: 'top center' }}
        />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl mx-auto pt-20"
      >
        {/* Pill Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md shadow-[0_0_20px_rgba(0,87,255,0.3)]">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Season 24 Collection Dropped
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-[8rem] font-black tracking-tighter text-white mb-6 uppercase leading-[0.9] w-full"
          style={{ textShadow: "0 20px 40px rgba(0,0,0,0.9)" }}
        >
          <span className="block text-white drop-shadow-2xl">Push</span>
          <span className="block relative text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
            Beyond<span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">.</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          variants={itemVariants}
          className="max-w-2xl text-lg sm:text-xl text-zinc-300 mb-12 font-medium drop-shadow-md"
        >
          Premium gear for those who refuse to settle. Focus your mind, fuel your drive, and elevate your performance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-10 py-5 text-sm font-black uppercase tracking-widest text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Shop Now
              <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link
            href="/categories"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 glass px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-white/40"
          >
            Explore Gear
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Scroll</span>
        <div className="h-10 w-px bg-zinc-800 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
