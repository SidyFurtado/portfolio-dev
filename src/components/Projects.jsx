import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 1,
    number: '01',
    title: 'Meu Dinheiro',
    subtitle: 'Controle financeiro web',
    tags: ['HTML', 'JavaScript', 'CSS'],
    category: 'Aplicação Web',
    url: 'https://github.com/SidyFurtado/Meu-Dinheiro-Web',
    preview: 'https://sidyfurtado.github.io/Meu-Dinheiro-Web/',
    image: '/portfolio-dev/preview_meu_dinheiro.png',
    accent: '#6c63ff',
  },
  {
    id: 2,
    number: '02',
    title: 'AUREQ Equalizer',
    subtitle: 'Plug-in VST de áudio paramétrico em C++',
    tags: ['C++', 'DSP', 'CMake'],
    category: 'Engenharia de Áudio',
    url: 'https://github.com/SidyFurtado/VST-Project',
    preview: null,
    image: null,
    accent: '#00d4ff',
  },
  {
    id: 3,
    number: '03',
    title: 'Verdade ou Consequência',
    subtitle: 'Jogo de entretenimento adulto',
    tags: ['JavaScript', 'HTML', 'CSS'],
    category: 'Game',
    url: 'https://github.com/SidyFurtado/verdade-ou-consequencia',
    preview: 'https://sidyfurtado.github.io/verdade-ou-consequencia/',
    image: '/portfolio-dev/preview_verdade.png',
    accent: '#ff2d78',
  },
  {
    id: 4,
    number: '04',
    title: 'Filmmaker Doc Hub',
    subtitle: 'Centralizador de produção audiovisual',
    tags: ['JavaScript', 'HTML', 'CSS'],
    category: 'Aplicação Web',
    url: 'https://github.com/SidyFurtado/projeto-filmmaker',
    preview: 'https://sidyfurtado.github.io/projeto-filmmaker/',
    image: '/portfolio-dev/preview_filmmaker.png',
    accent: '#6c63ff',
  },
  {
    id: 5,
    number: '05',
    title: 'Portfólio Audiovisual',
    subtitle: 'Portfólio de Sidy Furtado | Produtor Audiovisual',
    tags: ['HTML', 'CSS', 'Design', 'Vídeo'],
    category: 'Filmmaking',
    url: 'https://github.com/SidyFurtado/portfolio',
    preview: 'https://sidyfurtado.github.io/portfolio/',
    image: '/portfolio-dev/preview_audiovisual.png',
    accent: '#00d4ff',
  },
]

export default function Projects() {
  const headingRef = useRef(null)
  const listRef = useRef(null)
  const previewContainerRef = useRef(null)
  const [modal, setModal] = useState({ active: false, index: 0 })

  // Cursor following logic for the floating preview
  useEffect(() => {
    const container = listRef.current
    const preview = previewContainerRef.current
    if (!container || !preview) return

    // Position setup
    gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0 })

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      gsap.to(preview, {
        x: x,
        y: y,
        duration: 0.45,
        ease: 'power3.out',
      })
    }

    container.addEventListener('mousemove', onMouseMove)
    return () => container.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Header and Rows scroll animation
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

    const rows = listRef.current.querySelectorAll('.project-row')
    rows.forEach((row, i) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
          },
          delay: i * 0.05,
        }
      )
    })
  }, [])

  const handleMouseEnter = (index) => {
    setModal({ active: true, index })
    gsap.to(previewContainerRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: 'back.out(1.5)',
    })
  }

  const handleMouseLeave = () => {
    setModal({ active: false, index: modal.index })
    gsap.to(previewContainerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    })
  }

  return (
    <section id="projetos" className="projects">
      <div className="container">
        <div className="projects__header" ref={headingRef}>
          <span className="section-tag">✦ Projetos</span>
          <h2 className="section-title">
            O que eu<br />
            <span className="gradient-text">construí</span>
          </h2>
        </div>

        {/* Vertical Rows Container */}
        <div className="projects__list" ref={listRef} data-cursor>
          {PROJECTS.map((project, index) => (
            <a
              key={project.id}
              href={project.preview || project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row"
              style={{ '--accent': project.accent }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="project-row__content">
                <div className="project-row__left">
                  <span className="project-row__number">{project.number}</span>
                  <h3 className="project-row__title">{project.title}</h3>
                </div>
                <div className="project-row__center">
                  <span className="project-row__subtitle">{project.subtitle}</span>
                </div>
                <div className="project-row__right">
                  <span className="project-row__category">{project.category}</span>
                  <div className="project-row__arrow">↗</div>
                </div>
              </div>
            </a>
          ))}

          {/* Single Shared Floating Preview Window */}
          <div className="projects__floating-preview" ref={previewContainerRef}>
            <div 
              className="projects__floating-slider"
              style={{ transform: `translateY(-${modal.index * 100}%)` }}
            >
              {PROJECTS.map((project) => (
                <div className="projects__floating-slide" key={project.id}>
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="projects__floating-image" 
                    />
                  ) : (
                    <div className="projects__floating-fallback" style={{ '--accent-fallback': project.accent }}>
                      <span className="floating-fallback-code">&lt;/&gt;</span>
                      <span className="floating-fallback-desc">C++ VST / Audio</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
