import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Navbar.css'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    // Appear from top
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' }
    )

    // Hide/show on scroll direction
    let lastY = 0
    ScrollTrigger.create({
      onUpdate: (self) => {
        const currentY = self.scroll()
        if (currentY > lastY && currentY > 100) {
          gsap.to(navRef.current, { y: -80, duration: 0.4, ease: 'power2.out' })
        } else {
          gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.out' })
        }
        lastY = currentY
      },
    })
  }, [])

  return (
    <nav className="navbar" ref={navRef}>
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo" data-cursor>
          <span className="navbar__logo-dot" />
          SF
        </a>
        <ul className="navbar__links">
          <li><a href="#projetos" data-cursor>Projetos</a></li>
          <li><a href="#sobre" data-cursor>Sobre</a></li>
          <li><a href="#contato" data-cursor>Contato</a></li>
        </ul>
        <a
          href="https://github.com/SidyFurtado"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__cta"
          data-cursor
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}
