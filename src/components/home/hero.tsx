"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Mouse Parallax for pseudo-3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Shifts based on depth
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], ["-2%", "2%"]);

  const fgX = useTransform(smoothMouseX, [-0.5, 0.5], ["2%", "-2%"]);
  const fgY = useTransform(smoothMouseY, [-0.5, 0.5], ["2%", "-2%"]);

  const smokeX = useTransform(smoothMouseX, [-0.5, 0.5], ["-5%", "5%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
    hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(20px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black px-4 sm:px-6 lg:px-8"
      style={{ perspective: "1000px" }}
    >
      {/* Background Layers (Scroll + Mouse Parallax) */}
      <motion.div style={{ y: scrollY, opacity: scrollOpacity, x: bgX, y: bgY }} className="absolute inset-0 z-0 pointer-events-none scale-105">

        {/* Main Athlete Image */}
        <motion.img
          src="/images/hero-bg-2.png"
          alt="Athlete"
          className="absolute inset-0 w-full h-full object-cover object-[center_top] opacity-80"
        />

        {/* Cinematic Lighting: Blue Ambient */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen translate-x-1/3 -translate-y-1/3" />

        {/* Cinematic Lighting: Primary Accent */}
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[150px] mix-blend-screen -translate-x-1/3 translate-y-1/3" />

        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      </motion.div>

      {/* Particle System (Smoke & Light Streaks) */}
      <motion.div style={{ x: smokeX, y: scrollY }} className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-zinc-400/10 rounded-full blur-[100px]"
          animate={{ x: [0, 200, 0], y: [0, 100, 0], rotate: [0, 45, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[800px] h-[600px] bg-zinc-500/10 rounded-full blur-[120px]"
          animate={{ x: [0, -200, 0], y: [0, -100, 0], rotate: [0, -45, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        {/* Light streak */}
        <motion.div
          className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm rotate-12"
          animate={{ opacity: [0, 1, 0], x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Foreground Content */}
      <motion.div
        style={{ x: fgX, y: fgY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl mx-auto pt-20 transform-gpu"
      >
        {/* Glassmorphism Pill */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            GCC DISTRIBUTER
          </div>
        </motion.div>

        {/* Pseudo-3D Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-[4rem] sm:text-7xl md:text-[9rem] font-black tracking-tighter text-white mb-6 uppercase leading-[0.85] w-full mix-blend-screen"
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            Push
          </span>
          <span className="block relative text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-600 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            Beyond<span className="text-primary drop-shadow-[0_0_30px_rgba(0,87,255,0.8)]">.</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg sm:text-xl text-zinc-300 mb-12 font-medium drop-shadow-2xl"
        >
          Premium gear for those who refuse to settle. Focus your mind, fuel your drive, and elevate your performance.
        </motion.p>

        {/* Magnetic CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto z-20"
        >
          <MagneticButton>
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-10 py-5 text-sm font-black uppercase tracking-widest text-black transition-all shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Shop Now
                <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/categories"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            >
              Explore Gear
            </Link>
          </MagneticButton>
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
            className="absolute inset-0 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
