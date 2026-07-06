import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const bigTextRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      bigTextRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: bigTextRef.current,
          start: 'top 85%',
        },
      }
    )

    // Magnetic button
    const btn = btnRef.current
    const onMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      gsap.to(btn, {
        x: (e.clientX - cx) * 0.35,
        y: (e.clientY - cy) * 0.35,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }
    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)

    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <footer id="contato" className="footer">
      {/* Decorative line */}
      <div className="footer__line" />

      <div className="container footer__inner">
        <div className="footer__cta" ref={bigTextRef}>
          <span className="footer__cta-label section-tag">✦ Contato</span>
          <h2 className="footer__big-text">
            Vamos criar<br />
            <span className="gradient-text">algo juntos?</span>
          </h2>
          <p className="footer__sub">
            Tenho um projeto, uma ideia, ou só quero bater um papo.
          </p>
          <a
            ref={btnRef}
            href="https://github.com/SidyFurtado"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__btn"
            data-cursor
          >
            <span>Ver GitHub</span>
            <div className="footer__btn-glow" />
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__copy">
            © 2026 <strong>Sidy Furtado</strong> — Feito com código, café e 3D
          </span>
          <div className="footer__links">
            <a href="https://github.com/SidyFurtado" target="_blank" rel="noopener noreferrer" data-cursor>
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
