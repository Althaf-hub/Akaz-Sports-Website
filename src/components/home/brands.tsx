"use client";

import { motion } from "framer-motion";

const brands = [
  "CAPTAIN",
  "TRIUMPH",
  "GOWIN",
  "BABBLER",
  "AKAZ"
];

export function Brands() {
  return (
    <section className="w-full overflow-hidden bg-black py-16 border-y border-white/5 relative flex items-center">
      {/* Gradient masks for fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex whitespace-nowrap items-center"
        >
          {/* We duplicate the array to create a seamless infinite scroll effect */}
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="mx-12 text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-zinc-800 uppercase tracking-tighter hover:text-zinc-600 transition-colors cursor-default"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
