import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroScene from './HeroScene'
import './Hero.css'

export default function Hero() {
  const sectionRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const tagRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const subtitleRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Text reveal on load ──────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.3 })

    tl.from(tagRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    })

    const lines = [line1Ref.current, line2Ref.current, line3Ref.current]
    lines.forEach((line, i) => {
      if (!line) return
      const words = line.querySelectorAll('.word')
      tl.from(words, {
        yPercent: 110,
        opacity: 0,
        rotateX: -60,
        stagger: 0.06,
        duration: 0.9,
        ease: 'expo.out',
      }, `-=${i === 0 ? 0.3 : 0.6}`)
    })

    tl.from(subtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.4')

    // Scroll hint pulsing
    gsap.to(scrollHintRef.current, {
      y: 10,
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut',
      delay: 1.5,
    })

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const wrapWords = (text, className = '') =>
    text.split(' ').map((w, i) => (
      <span className="word-wrap" key={i}>
        <span className={`word ${className}`}>{w}&nbsp;</span>
      </span>
    ))

  return (
    <section className="hero" ref={sectionRef}>
      {/* 3D Background */}
      <div className="hero__canvas">
        <HeroScene mouse={mouse} />
      </div>

      {/* Gradient overlay */}
      <div className="hero__overlay" />

      {/* Content */}
      <div className="hero__content container">
        <span className="hero__tag" ref={tagRef}>
          ✦ Desenvolvedor Criativo
        </span>

        <h1 className="hero__title">
          <div className="hero__title-line" ref={line1Ref}>
            {wrapWords('Criando')}
          </div>
          <div className="hero__title-line hero__title-line--accent" ref={line2Ref}>
            {wrapWords('experiências')}
          </div>
          <div className="hero__title-line" ref={line3Ref}>
            {wrapWords('impossíveis')}
          </div>
        </h1>

        <p className="hero__subtitle" ref={subtitleRef}>
          Web · Jogos · Áudio · Tudo que seu computador pode renderizar
        </p>

        <div className="hero__cta">
          <a href="#projetos" className="hero__btn hero__btn--primary" data-cursor>
            Ver Projetos
          </a>
          <a href="https://github.com/SidyFurtado" className="hero__btn hero__btn--ghost" target="_blank" rel="noopener noreferrer" data-cursor>
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="hero__scroll" ref={scrollHintRef}>
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  )
}
