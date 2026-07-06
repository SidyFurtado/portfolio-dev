import { useEffect, useRef } from 'react'
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
    title: 'Entre Nós',
    subtitle: 'Jogo interativo para casais',
    tags: ['JavaScript', 'HTML', 'CSS'],
    category: 'Game',
    url: 'https://github.com/SidyFurtado/entre-nos',
    preview: 'https://sidyfurtado.github.io/entre-nos/',
    image: '/portfolio-dev/preview_entre_nos.png',
    accent: '#ff2d78',
  },
  {
    id: 4,
    number: '04',
    title: 'Verdade ou Consequência',
    subtitle: 'Jogo de entretenimento adulto',
    tags: ['JavaScript', 'HTML', 'CSS'],
    category: 'Game',
    url: 'https://github.com/SidyFurtado/verdade-ou-consequencia',
    preview: 'https://sidyfurtado.github.io/verdade-ou-consequencia/',
    image: '/portfolio-dev/preview_verdade.png',
    accent: '#6c63ff',
  },
  {
    id: 5,
    number: '05',
    title: 'Filmmaker Doc Hub',
    subtitle: 'Centralizador de produção audiovisual',
    tags: ['JavaScript', 'HTML', 'CSS'],
    category: 'Aplicação Web',
    url: 'https://github.com/SidyFurtado/projeto-filmmaker',
    preview: 'https://sidyfurtado.github.io/projeto-filmmaker/',
    image: '/portfolio-dev/preview_filmmaker.png',
    accent: '#00d4ff',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    gsap.fromTo(
      card,
      { opacity: 0, y: 60, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        delay: (index % 3) * 0.12,
      }
    )

    // 3D tilt on mouse
    const onEnter = (e) => {
      const rect = card.getBoundingClientRect()
      const onMove = (ev) => {
        const x = ((ev.clientX - rect.left) / rect.width - 0.5) * 20
        const y = -((ev.clientY - rect.top) / rect.height - 0.5) * 20
        gsap.to(card, {
          rotateY: x,
          rotateX: y,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800,
        })
      }
      card.addEventListener('mousemove', onMove)
      card._onMove = onMove
    }

    const onLeave = () => {
      card.removeEventListener('mousemove', card._onMove)
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        transformPerspective: 800,
      })
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [index])

  return (
    <a
      href={project.preview || project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      ref={cardRef}
      style={{ '--accent': project.accent }}
      data-cursor
    >
      <div className="project-card__inner">
        <div className="project-card__top">
          <span className="project-card__number">{project.number}</span>
          <span className="project-card__category">{project.category}</span>
        </div>
        
        {/* Project Visual Preview */}
        <div className="project-card__preview-wrapper">
          {project.image ? (
            <img src={project.image} alt={project.title} className="project-card__image" />
          ) : (
            <div className="project-card__fallback">
              <span className="code-symbol">&lt;/&gt;</span>
              <span className="fallback-text">C++ Audio Plugin / VST</span>
            </div>
          )}
          <div className="project-card__overlay-shimmer" />
        </div>

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <div className="project-card__tags">
          {project.tags.map((t) => (
            <span key={t} className="project-card__tag">{t}</span>
          ))}
        </div>
        <div className="project-card__arrow">↗</div>
      </div>
      <div className="project-card__glow" />
    </a>
  )
}

export default function Projects() {
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
  }, [])

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

        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
