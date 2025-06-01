"use client"

import { Canvas } from "@react-three/fiber"
import { PresentationControls, Environment, Float, Text, Sparkles } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// 3D Sports Equipment Component
function SportsEquipment() {
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2 + Math.PI / 4
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1
    }
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={modelRef} position={[0, 0, 0]} rotation={[0.3, Math.PI / 4, 0.2]}>
          {/* Soccer Ball */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
          </mesh>
          {/* Ball Pattern */}
          <mesh position={[0, 0, 1.01]}>
            <circleGeometry args={[0.3, 32]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>
      </Float>

      <Sparkles count={50} scale={10} size={2} speed={0.5} color="#f58549" />
      <Sparkles count={30} scale={8} size={1} speed={0.3} color="#eda24e" />
    </group>
  )
}

const heroImages = [
  "/assets/akaz/imgog.png",
  "/assets/akaz/img167.jpg",
  "/images/boot/ac.jpg",
  "/images/Gloves/cr1.jpg",
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-10"
      >
        <div className="container h-full mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col justify-center space-y-8 text-white"
            >
              <div className="space-y-6">
                <motion.h1 
                  className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl leading-tight"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-[#f58549] to-[#eda24e] bg-clip-text text-transparent">AKAZ</span>{" "}
                  <span className="text-white">SPORTS</span>{" "}
                  <span className="bg-gradient-to-r from-[#eda24e] to-[#f58549] bg-clip-text text-transparent">HUB</span>
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-6 text-xl text-gray-300 max-w-md leading-relaxed"
                >
                  Premium sports equipment for athletes who demand excellence. Designed for performance.
                </motion.p>
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex gap-4"
              >
                <Link href="/products">
                  <Button className="bg-gradient-to-r from-[#f58549] to-[#eda24e] text-white hover:opacity-90 px-8 py-3 rounded-full text-lg">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="px-8 py-3 rounded-full text-lg border-[#f58549] text-[#f58549] hover:bg-[#f58549] hover:text-white">
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <div className="hidden md:block relative h-full">
              <div className="sticky top-0 h-screen flex items-center">
                <div className="relative w-full h-[90vh] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10" />
                  <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <AnimatePresence mode="wait">
                      {heroImages.map((image, index) => (
                        <motion.div
                          key={image}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={image}
                            alt="Sports Equipment"
                            fill
                            className="object-cover rounded-xl"
                            priority={index === 0}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                  <div className="absolute inset-0 z-20">
                    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                      <Suspense fallback={null}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                        <PresentationControls
                          global
                          rotation={[0, 0, 0]}
                          polar={[-Math.PI / 4, Math.PI / 4]}
                          azimuth={[-Math.PI / 4, Math.PI / 4]}
                          config={{ mass: 2, tension: 400 }}
                          snap={{ mass: 4, tension: 400 }}
                        >
                          <SportsEquipment />
                        </PresentationControls>
                        <Environment preset="city" />
                      </Suspense>
                    </Canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>
    </div>
  )
}