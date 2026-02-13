import { useRef, useMemo, useState, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, Box, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch (e) {
    return false
  }
}

function AnimatedSphere({ position, color, speed = 1, distort = 0.4 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function GlowingTorus({ position, color, rotationSpeed = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 * rotationSpeed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * rotationSpeed
    }
  })
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Torus ref={meshRef} args={[1.5, 0.3, 32, 100]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.9}
        />
      </Torus>
    </Float>
  )
}

function FloatingCube({ position, color, size = 0.8 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
      <Box ref={meshRef} args={[size, size, size]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </Box>
    </Float>
  )
}

function ParticleField() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])
  
  const pointsRef = useRef()
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#38bdf8"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function Fallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(5,5,10,0.6), rgba(10,15,61,0.4))'}} />
      <div className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.06), rgba(34,211,238,0.04))' }} />
      <div className="absolute w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0.06), rgba(56,189,248,0.04))', animationDelay: '1s', top: '20%', left: '60%' }} />
      <div className="absolute w-48 h-48 rounded-full blur-3xl animate-pulse" style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.05), rgba(34,211,238,0.03))', animationDelay: '2s', bottom: '20%', right: '60%' }} />
    </div>
  )
}

function Scene3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ 
        antialias: true, 
        alpha: true, 
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'default'
      }}
      dpr={[1, 2]}
      onCreated={({ gl }) => {
        gl.setClearColor('#0a0a0f', 0)
      }}
    >
      <color attach="background" args={['#0a0a0f']} />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#6366f1" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#22d3ee" />
      
      <AnimatedSphere position={[0, 0, 0]} color="#38bdf8" distort={0.5} />
      <GlowingTorus position={[3, 1, -2]} color="#22d3ee" rotationSpeed={0.7} />
      <GlowingTorus position={[-3, -1, -2]} color="#60a5fa" rotationSpeed={0.5} />
      <FloatingCube position={[2.5, -1.5, 1]} color="#22d3ee" size={0.6} />
      <FloatingCube position={[-2.5, 1.5, 1]} color="#38bdf8" size={0.5} />
      
      <ParticleField />
      <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}

export default function Scene3D({ className = "" }) {
  const [webglSupported, setWebglSupported] = useState(true)
  
  useEffect(() => {
    setWebglSupported(checkWebGLSupport())
  }, [])
  
  if (!webglSupported) {
    return (
      <div className={`w-full h-full ${className}`}>
        <Fallback />
      </div>
    )
  }
  
  return (
    <div className={`w-full h-full ${className}`}>
      <WebGLErrorBoundary fallback={<Fallback />}>
        <Scene3DCanvas />
      </WebGLErrorBoundary>
    </div>
  )
}
