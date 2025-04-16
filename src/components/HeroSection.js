import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PresentationControls, Environment, useGLTF, Float, Text, Sparkles } from "@react-three/drei"
import { Link } from "react-router-dom"

const SoccerBoot = () => {
  const { scene } = useGLTF("/assets/3d/duck.glb")

  return (
    <group>
      {/* Stylized platform */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main model - positioned to look more like a soccer boot */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <primitive object={scene} scale={2} position={[0, -1, 0]} rotation={[0.3, Math.PI / 4, 0.2]} />
      </Float>

      {/* Add sparkles with both colors */}
      <Sparkles count={30} scale={6} size={1} speed={0.3} color="#f58549" />
      <Sparkles count={30} scale={5} size={0.8} speed={0.2} color="#eda24e" />

      {/* 3D Text */}
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

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">Premium Quality</div>
            <h1 className="hero-title">
              <span>AKAZ</span> <span>SPORTS</span> <span>HUB</span>
            </h1>
            <p className="hero-description">
              Premium sports equipment for athletes who demand excellence. Designed for performance.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/categories" className="btn btn-outline">
                Explore
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">500+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">10k+</span>
                <span className="stat-label">Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">15+</span>
                <span className="stat-label">Sports</span>
              </div>
            </div>
          </div>
          <div className="hero-3d">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
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
                  <SoccerBoot />
                </PresentationControls>
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

