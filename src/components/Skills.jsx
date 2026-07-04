import { useRef, useEffect, useState } from 'react'
import './Skills.css'

/* ── Skill columns (4 cols) ─────────── */
const SKILL_SECTIONS = [
  {
    id: 'languages',
    num: '01',
    label: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    id: 'frameworks',
    num: '02',
    label: 'Frameworks',
    items: ['React', 'Next.js', 'Flask', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'LangChain', 'LlamaIndex', 'Three.js', 'Matplotlib'],
  },
  {
    id: 'tools',
    num: '03',
    label: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'Linux', 'VS Code', 'TinkerCAD', 'Vercel', '3D Printing', 'Figma'],
  },
  {
    id: 'ai',
    num: '04',
    label: 'AI & APIs',
    items: ['OpenAI API', 'Google ADK', 'Gemini', 'Prompt Engineering', 'Context Engineering', 'REST APIs', 'LLM Agents'],
  },
]

/* ── Certifications ───────────────────── */
const CERTS = [
  {
    name: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: 'Jun 2026',
    url: 'https://verify.skilljar.com/c/nj6igwqqbrb7',
  },
  {
    name: '5-Day AI Agents Intensive Course',
    issuer: 'Kaggle / Google',
    date: 'Dec 2025',
    url: 'https://www.kaggle.com/certification/badges/ojaspatil26/105',
  },
  {
    name: 'Prompt Engineering & Programming with OpenAI',
    issuer: 'Columbia+',
    date: 'Jul 2025',
    url: 'https://badges.plus.columbia.edu/a3a6a4d9-ae6b-405b-bc17-00771f71dff7',
  },
  {
    name: 'Show more certifications',
    issuer: 'LinkedIn',
    date: null,
    url: 'https://www.linkedin.com/in/ojaspatil26/details/certifications/',
  },
]

/* ── Marquee rows — 15 items each to
   guarantee no visible gap at any width  */
const ROW_1 = ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Three.js', 'HTML', 'CSS', 'Vite', 'Redux', 'Framer Motion', 'Tailwind', 'SVG', 'WebGL', 'Webpack', 'ESLint']
const ROW_2 = ['Python', 'Java', 'C++', 'Flask', 'Node.js', 'FastAPI', 'PostgreSQL', 'Supabase', 'SQL', 'REST APIs', 'SQLite', 'MongoDB', 'GraphQL', 'Express', 'JWT']
const ROW_3 = ['LangChain', 'OpenAI API', 'TensorFlow', 'Pandas', 'NumPy', 'Google ADK', 'Scikit-learn', 'Git', 'Linux', 'Vercel', 'Figma', 'Docker', 'VS Code', 'Postman', 'Gemini']

export default function Skills() {
  const sectionRef = useRef(null)
  const groupRefs  = useRef([])
  const certRef    = useRef(null)

  const [headerIn, setHeaderIn] = useState(false)
  const [groupsIn, setGroupsIn] = useState(new Set())
  const [certIn,   setCertIn]   = useState(false)

  /* Section header entrance */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderIn(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* Staggered card entrance */
  useEffect(() => {
    const refs = groupRefs.current.filter(Boolean)
    if (!refs.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGroupsIn((prev) => new Set([...prev, entry.target.dataset.idx]))
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    refs.forEach((r) => obs.observe(r))
    return () => obs.disconnect()
  }, [])

  /* Cert section entrance */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCertIn(true) },
      { threshold: 0.1 }
    )
    if (certRef.current) obs.observe(certRef.current)
    return () => obs.disconnect()
  }, [])

  /* Theme-wave animation on dark toggle */
  useEffect(() => {
    let resetTimeout

    const applyWave = () => {
      clearTimeout(resetTimeout)
      const section = sectionRef.current
      if (!section) return

      const cards = section.querySelectorAll('.skill-group')
      let maxDelay = 0

      cards.forEach((card, ci) => {
        const cardDelay = ci * 60
        card.style.transitionDelay = `${cardDelay}ms`
        card.querySelectorAll('.skill-group-num, .skill-group-label, .skill-group-item')
          .forEach((el, ei) => {
            const d = cardDelay + ei * 18
            el.style.transitionDelay = `${d}ms`
            if (d > maxDelay) maxDelay = d
          })
      })

      const certCards = section.querySelectorAll('.cert-card')
      certCards.forEach((card, ci) => {
        const d = cards.length * 60 + ci * 40
        card.style.transitionDelay = `${d}ms`
        if (d > maxDelay) maxDelay = d
      })

      resetTimeout = setTimeout(() => {
        cards.forEach((card) => {
          card.style.transitionDelay = ''
          card.querySelectorAll('.skill-group-num, .skill-group-label, .skill-group-item')
            .forEach((el) => { el.style.transitionDelay = '' })
        })
        certCards.forEach((card) => { card.style.transitionDelay = '' })
      }, maxDelay + 600)
    }

    const observer = new MutationObserver(applyWave)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => { observer.disconnect(); clearTimeout(resetTimeout) }
  }, [])

  return (
    <section id="skills" className="section-skills" ref={sectionRef}>
      <div className="section-inner">

        {/* ── Header ── */}
        <div className={`skills-header ${headerIn ? 'in-view' : ''}`}>
          <div className="skills-eyebrow">/ 03 — Skills</div>
          <h2 className="skills-heading">
            What I <em>work with</em>.
          </h2>
        </div>

        {/* ── 4-column card grid ── */}
        <div className="skills-grid">
          {SKILL_SECTIONS.map((sec, si) => (
            <div
              key={sec.id}
              className={`skill-group ${groupsIn.has(String(si)) ? 'in-view' : ''}`}
              data-idx={si}
              ref={(el) => (groupRefs.current[si] = el)}
              style={{ transitionDelay: `${si * 80}ms` }}
            >
              <div className="skill-group-num">{sec.num}</div>
              <div className="skill-group-label">{sec.label}</div>
              <ul className="skill-group-list">
                {sec.items.map((item, ii) => (
                  <li key={ii} className="skill-group-item">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Certifications grid ── */}
        <div className={`skills-certs ${certIn ? 'in-view' : ''}`} ref={certRef}>
          <div className="skills-certs-header">
            <span className="skills-certs-label">Certifications</span>
            <span className="skills-certs-rule" aria-hidden="true" />
          </div>

          <div className="certs-grid">
            {CERTS.map((cert, i) => {
              const Tag = cert.url ? 'a' : 'div'
              const linkProps = cert.url
                ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer' }
                : {}
              return (
                <Tag
                  key={i}
                  className={`cert-card ${cert.url ? 'cert-card--link' : ''}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                  {...linkProps}
                >
                  {cert.issuer && (
                    <span className="cert-card-issuer">{cert.issuer}</span>
                  )}
                  <span className="cert-card-name">{cert.name}</span>
                  {cert.date && (
                    <span className="cert-card-date">{cert.date}</span>
                  )}
                  {cert.url && (
                    <span className="cert-card-arrow" aria-hidden="true">↗</span>
                  )}
                </Tag>
              )
            })}
          </div>
        </div>

      </div>

      {/* ── Marquee rows — full bleed ── */}
      <div className="skills-marquee-section">
        {[
          { items: ROW_1, dir: 'left',  speed: 38 },
          { items: ROW_2, dir: 'right', speed: 32 },
          { items: ROW_3, dir: 'left',  speed: 42 },
        ].map((row, ri) => (
          <div key={ri} className={`marquee-row marquee-${row.dir}`}>
            <div
              className="marquee-track"
              style={{ animationDuration: `${row.speed}s` }}
            >
              {[...row.items, ...row.items].map((skill, i) => (
                <span key={i} className="skill-chip">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
