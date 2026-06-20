"use client";

import { useState, useEffect } from "react";

/**
 * Debounces a value by `delay` milliseconds.
 * Useful for search inputs to avoid firing on every keystroke.
 *
 * @example
 * const debouncedSearch = useDebounce(search, 400);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
