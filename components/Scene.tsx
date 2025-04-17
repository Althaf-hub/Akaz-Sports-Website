"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const SoccerBoot = dynamic(
  () => import('./SoccerBoot').then((mod) => mod.SoccerBoot),
  { ssr: false }
)

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <SoccerBoot />
      </Suspense>
    </Canvas>
  )
} 