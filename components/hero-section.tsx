"use client"

import { Canvas } from "@react-three/fiber"
import { PresentationControls, Environment, useGLTF, Float, Text, Sparkles } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import Image from "next/image"
import Link from "next/link"

function SoccerBoot() {
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
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

const heroImages = [
  "/assets/akaz/imgog.png",
  "/assets/akaz/img167.jpg",
  "/images/boot/ac.jpg",
  "/images/Gloves/cr1.jpg",
]

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && contentRef.current) {
        const scrollPosition = window.scrollY
        const sectionTop = sectionRef.current.offsetTop
        const sectionHeight = sectionRef.current.offsetHeight
        const scrollPercentage = (scrollPosition - sectionTop) / sectionHeight

        if (scrollPercentage >= 0 && scrollPercentage <= 1) {
          contentRef.current.style.transform = `translateY(${scrollPercentage * 50}px)`
          contentRef.current.style.opacity = `${1 - scrollPercentage}`
        }
      }

      if (imageRef.current) {
        const scrollPosition = window.scrollY
        const translateY = scrollPosition * 0.2
        const scale = 1 + (scrollPosition * 0.0005)
        imageRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 z-10">
        <div className="container h-full mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div ref={contentRef} className="flex flex-col justify-center space-y-8 text-white transition-all duration-300">
              <div className="space-y-6">
                <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl leading-tight">
                  <span className="bg-gradient-to-r from-[#f58549] to-[#eda24e] bg-clip-text text-transparent">AKAZ</span>{" "}
                  <span className="text-white">SPORTS</span>{" "}
                  <span className="bg-gradient-to-r from-[#eda24e] to-[#f58549] bg-clip-text text-transparent">HUB</span>
                </h1>
                <p className="mt-6 text-xl text-gray-300 max-w-md leading-relaxed font-['Poppins']">
                  Premium sports equipment for athletes who demand excellence. Designed for performance.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
              
                <Button
                  variant="outline"
                  className=" bg-gradient-to-r from-[#f58549] to-[#eda24e] border-none text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Explore
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative h-full">
              <div className="sticky top-0 h-screen flex items-center">
                <div className="relative w-full h-[90vh] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10" />
                  <div 
                    ref={imageRef}
                    className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent rounded-xl overflow-hidden transition-transform duration-300"
                  >
                    {heroImages.map((image, index) => (
                      <Image
                        key={image}
                        src={image}
                        alt="Sports Equipment"
                        fill
                        className={`object-cover rounded-xl transition-opacity duration-1000 ${
                          index === currentImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                        priority={index === 0}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                  <Canvas className="absolute inset-0 z-20" dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.5} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                      <PresentationControls
                        global
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                        speed={1}
                      >
                        <SoccerBoot />
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
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>
    </div>
  )
}