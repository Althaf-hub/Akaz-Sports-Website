"use client"

import dynamic from 'next/dynamic'
import { useRef } from "react"
import * as THREE from 'three'

const useFrame = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.useFrame),
  { ssr: false }
)

const Float = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Float),
  { ssr: false }
)

const Text = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Text),
  { ssr: false }
)

const Sparkles = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sparkles),
  { ssr: false }
)

export function SoccerBoot() {
  const modelRef = useRef<THREE.Group>(null)

  if (typeof window === 'undefined') return null

  const frame = useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2 + Math.PI / 4
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 - 1
    }
  })

  return (
    <group>
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={modelRef} position={[0, -1, 0]} rotation={[0.3, Math.PI / 4, 0.2]}>
          <mesh>
            <boxGeometry args={[1, 0.5, 2]} />
            <meshStandardMaterial color="#f58549" metalness={0.5} roughness={0.2} />
          </mesh>
        </group>
      </Float>

      <Sparkles count={30} scale={6} size={1} speed={0.3} color="#f58549" />
      <Sparkles count={30} scale={5} size={0.8} speed={0.2} color="#eda24e" />

      <Text position={[0, 1.5, 0]} fontSize={0.5} font="/fonts/Inter_Bold.json" anchorX="center" anchorY="middle">
        SPORTS GEAR
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.5}
          roughness={0.2}
          emissive="#eda24e"
          emissiveIntensity={0.5}
        />
      </Text>
    </group>
  )
} 