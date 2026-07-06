import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { group: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript ES2024', 'React', 'Vite'] },
  { group: 'Backend / Sistemas', items: ['C++', 'CMake', 'Shell Script', 'Node.js'] },
  { group: 'Áudio & DSP', items: ['VST / JUCE', 'Engenharia de Sinal', 'Processamento de Áudio'] },
  { group: 'Design & UX', items: ['Animação Web', 'Three.js / WebGL', 'GSAP', 'Design Interativo'] },
  { group: 'Ferramentas', items: ['Git / GitHub', 'Vite', 'npm', 'VS Code'] },
]

function FloatingOrbs() {
  const group = useRef()
  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.06
  })

  const orbs = [
    { pos: [0, 0, 0], scale: 1.2, color: '#6c63ff', distort: 0.6, speed: 2 },
    { pos: [2.5, 1, -1], scale: 0.6, color: '#00d4ff', distort: 0.4, speed: 3 },
    { pos: [-2, -1, 0], scale: 0.8, color: '#ff2d78', distort: 0.5, speed: 1.5 },
    { pos: [1.5, -2, 1], scale: 0.4, color: '#6c63ff', distort: 0.7, speed: 4 },
    { pos: [-1.5, 2, -0.5], scale: 0.5, color: '#00d4ff', distort: 0.3, speed: 2.5 },
  ]

  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <Float key={i} speed={o.speed} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[o.scale, 64, 64]} position={o.pos}>
            <MeshDistortMaterial
              color={o.color}
              distort={o.distort}
              speed={o.speed}
              roughness={0.1}
              metalness={0.3}
              transparent
              opacity={0.85}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      }
    )

    const skills = sectionRef.current.querySelectorAll('.skill-group')
    gsap.fromTo(
      skills,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: skills[0],
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
    <section id="sobre" className="about" ref={sectionRef}>
      <div className="container about__inner">
        {/* Text Side */}
        <div className="about__text">
          <div className="about__header" ref={headingRef}>
            <span className="section-tag">✦ Sobre</span>
            <h2 className="section-title">
              Quem sou<br />
              <span className="gradient-text">eu</span>
            </h2>
            <p className="about__bio">
              Sou <strong>Sidy Furtado</strong>, desenvolvedor criativo brasileiro que une 
              código, estética e inovação em cada projeto. Da web ao áudio, do design 
              de jogos à engenharia de plug-ins VST — eu construo coisas que surpreendem.
            </p>
          </div>

          <div className="about__skills">
            {SKILLS.map((sg) => (
              <div key={sg.group} className="skill-group">
                <span className="skill-group__title">{sg.group}</span>
                <div className="skill-group__items">
                  {sg.items.map((s) => (
                    <span key={s} className="skill-item">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Orbs Side */}
        <div className="about__canvas">
          <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 2]} gl={{ alpha: true }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[4, 4, 4]} intensity={1.5} color="#6c63ff" />
            <pointLight position={[-4, -4, 4]} intensity={1} color="#00d4ff" />
            <pointLight position={[0, 0, 6]} intensity={0.5} color="#ff2d78" />
            <FloatingOrbs />
          </Canvas>
        </div>
      </div>
    </section>
  )
}
