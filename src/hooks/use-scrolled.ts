"use client";

import { useState, useEffect } from "react";

/**
 * Returns `true` when the page has been scrolled past `threshold` pixels.
 * Useful for making the navbar appear on scroll.
 *
 * @example
 * const scrolled = useScrolled(20);
 */
export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    handler(); // run once on mount
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}
