import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Stars, GradientTexture } from '@react-three/drei'
import * as THREE from 'three'

// ─── Morphing Blob ────────────────────────────────────────────────────
function MorphBlob({ mouse }) {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!meshRef.current) return
    meshRef.current.rotation.x = t * 0.08 + mouse.current.y * 0.3
    meshRef.current.rotation.y = t * 0.12 + mouse.current.x * 0.3
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mouse.current.x * 0.8,
      0.05
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      mouse.current.y * 0.4,
      0.05
    )
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1.5, 128, 128]} />
        <MeshDistortMaterial
          color="#6c63ff"
          envMapIntensity={0.8}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.2}
          roughness={0.15}
          distort={0.5}
          speed={2.5}
          radius={1}
        >
          <GradientTexture
            stops={[0, 0.4, 1]}
            colors={['#ff2d78', '#6c63ff', '#00d4ff']}
          />
        </MeshDistortMaterial>
      </mesh>
    </Float>
  )
}

// ─── Floating Particles ───────────────────────────────────────────────
function Particles({ count = 200 }) {
  const mesh = useRef()

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      sz[i] = Math.random() * 2.5 + 0.5
    }
    return [pos, sz]
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.02
    mesh.current.rotation.x = t * 0.008
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4ff"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Orbital Rings ────────────────────────────────────────────────────
function OrbitalRing({ radius = 2.8, color = '#6c63ff', speed = 0.3, tilt = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * speed
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 2, 200]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  )
}

// ─── Scene Wrapper ────────────────────────────────────────────────────
export default function HeroScene({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#6c63ff" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#00d4ff" />
      <pointLight position={[0, -5, 2]} intensity={0.8} color="#ff2d78" />
      <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <Particles count={250} />
      <OrbitalRing radius={2.6} color="#6c63ff" speed={0.25} tilt={0.3} />
      <OrbitalRing radius={2.9} color="#00d4ff" speed={-0.18} tilt={-0.5} />
      <OrbitalRing radius={3.2} color="#ff2d78" speed={0.14} tilt={0.8} />
      <MorphBlob mouse={mouse} />
    </Canvas>
  )
}
