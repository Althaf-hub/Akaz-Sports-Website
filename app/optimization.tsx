import React from "react"
// This file contains optimization utilities for the website

// Image optimization
export const optimizeImage = (src: string, width: number, quality = 80) => {
  if (src.startsWith("/placeholder.svg")) {
    return src
  }

  // For real images, we would use a proper image optimization service
  return `${src}?w=${width}&q=${quality}`
}

// Lazy loading helper
export const lazyLoadComponent = (component: React.ComponentType) => {
  return React.lazy(() => import(component))
}

// Debounce function for search and filters
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Memoize expensive calculations
export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = func(...args)
    cache.set(key, result)

    return result
  }) as T
}

