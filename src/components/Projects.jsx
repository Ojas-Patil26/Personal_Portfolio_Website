import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from 'motion/react'
import './Projects.css'

// ─── Projects — real content ─────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'URLS',
    tag: 'Backend',
    desc: 'Collision-resistant URL shortener using djb2 hashing + base62 encoding, supporting 3.5 trillion unique short codes.',
    bullets: [
      'Built collision-resistant URL shortener using djb2 hashing + base62 encoding',
      'Supports 3.5 trillion unique short codes with guaranteed zero collision probability',
      'Exposes a RESTful API for URL creation, redirection, and retrieval',
      'Persistent storage via SQLite with indexed lookups for O(1) redirect performance',
    ],
    stack: ['Python', 'Flask', 'SQLite', 'REST API'],
    github: 'https://github.com/Ojas-Patil26/URLS',
    live: null,
    variant: 0,
  },
  {
    title: 'VeriQ',
    tag: 'AI',
    desc: '5-agent LLM-powered data quality pipeline for KPI monitoring with 14-day z-score anomaly detection.',
    bullets: [
      '5-agent LLM pipeline orchestrated via Google ADK and Gemini for autonomous data quality monitoring',
      '14-day z-score anomaly detection to flag statistical outliers in KPI time series',
      'Automated PDF incident reports generated and dispatched on anomaly detection events',
      'LangChain integration for agent memory, tool-use, and structured reasoning chains',
    ],
    stack: ['Python', 'Google ADK', 'Gemini', 'LangChain'],
    github: 'https://github.com/Ojas-Patil26/VeriQ',
    live: null,
    variant: 1,
  },
  {
    title: 'Portfolio Tracker',
    tag: 'Full-Stack',
    desc: 'Real-time stock portfolio tracker with dynamic charts and analytics powered by Yahoo Finance API.',
    bullets: [
      'Real-time stock portfolio tracker with live price updates via Yahoo Finance API',
      'Dynamic charts for daily and historical portfolio valuation trends',
      'Computed analytics: gain/loss %, portfolio allocation breakdown, and performance metrics',
      'Full-stack Flask backend with a vanilla JS frontend for fast, dependency-light rendering',
    ],
    stack: ['Python', 'Flask', 'JavaScript', 'Yahoo Finance API'],
    github: 'https://github.com/Ojas-Patil26/Portfolio_Tracker',
    live: null,
    variant: 2,
  },
  {
    title: 'Chatbot AI',
    tag: 'AI',
    desc: 'Voice-controlled assistant integrating real-time Spotify and weather data with 90%+ command recognition.',
    bullets: [
      'Voice-controlled assistant with 90%+ command recognition accuracy via an NLP pipeline',
      'Integrates real-time Spotify playback control and live weather data fetching',
      'Text-to-speech responses via Pyttsx3 for a fully hands-free experience',
      'Intent classification and entity extraction pipeline for robust natural language understanding',
    ],
    stack: ['Python', 'Pyttsx3', 'Spotify API', 'Weather API'],
    github: 'https://github.com/Ojas-Patil26/Chatbot-ai',
    live: null,
    variant: 3,
  },
  {
    title: 'French Press Loader',
    tag: 'Frontend',
    desc: "This site's own loading screen — a french-press coffee animation with plunger-driven progress, weighted phase gating, and a 150-particle splatter reveal, built entirely inline for pre-paint execution.",
    bullets: [
      'Custom french-press loading screen coded inline in index.html (markup, CSS, and a vanilla JS IIFE) so it paints before the React/Three.js bundle downloads',
      'Plunger position is the displayed progress itself — coffee fills over the first 8%, then the plunger descends once, driven by JS-set inline styles every animation frame',
      "Progress weighted across four real load signals: a custom 'site:ready' event (30%), a streamed video asset (55%), font loading (10%), and window load (5%), with time-gating and stall-creep so the bar never looks stuck",
      '100% triggers a 3-second pour sequence ending in a 150-particle glowing splatter that lingers over the reveal while the backdrop fades out, with a 10s hard failsafe and a static-plunge fallback for prefers-reduced-motion',
    ],
    stack: ['JavaScript', 'CSS3', 'requestAnimationFrame', 'WebM'],
    github: 'https://github.com/Ojas-Patil26/French-Press_Loading-Page',
    live: 'https://french-press-loading-page.vercel.app/',
    variant: 4,
  },
]
// ─────────────────────────────────────────────────────────────────────────────

/* Counter-rotates each card so it stays upright while the deck spins */
function ProjectCard({ project, index, angle, radius, smoothRotation, isActive, onExpand }) {
  const counterRotate = useTransform(smoothRotation, (v) => -v - angle)

  return (
    <motion.div
      className="project-card-arm"
      style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
    >
      <motion.div
        className={`project-card project-card--v${project.variant}${isActive ? ' active' : ''}`}
        style={{ rotate: counterRotate }}
        onClick={isActive ? onExpand : undefined}
      >
        {/* Top row: index + tag (+ expand hint when active) */}
        <div className="project-card-top">
          <span className="project-card-index">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="project-card-top-right">
            {isActive && (
              <span className="project-card-expand-hint">click to expand ↗</span>
            )}
            <span className="project-card-tag">{project.tag}</span>
          </div>
        </div>

        {/* Title + description */}
        <div className="project-card-body">
          <h4 className="project-card-title">{project.title}</h4>
          <p className="project-card-desc">{project.desc}</p>
        </div>

        {/* Stack + links */}
        <div className="project-card-footer">
          <div className="project-card-stack">
            {project.stack.slice(0, 3).map((t) => (
              <span key={t} className="project-stack-tag">{t}</span>
            ))}
          </div>
          <div className="project-card-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                onClick={(e) => e.stopPropagation()}
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const stickyRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress → rotation, spring for weighted inertia
  const rotation = useTransform(scrollYProgress, [0, 1], [0, -360])
  const smoothRotation = useSpring(rotation, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  })

  // ── Entry fade (orbit only) ─────────────────────────────────────────
  // The header now scrolls normally, un-pinned, above the orbit. Only the
  // orbit (cards) is sticky — and like any element, it slides up from the
  // bottom of the viewport before it locks into its pinned position, which
  // can show a card peeking up while still overlapping the section above.
  // Track the orbit's own approach (from "just below the viewport" to
  // "locked at the top") and fade just the orbit in over the back of that
  // approach, so the cards are invisible while still overlapping Skills
  // and fully visible by the moment they pin. The header is unaffected.
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress: entryProgress } = useScroll({
    target: stickyRef,
    offset: ['start end', 'start start'],
  })
  const entryOpacity = useTransform(entryProgress, [0.35, 1], [0, 1])
  const orbitOpacity = prefersReducedMotion ? 1 : entryOpacity

  const [activeIdx, setActiveIdx] = useState(0)
  const [expandedIdx, setExpandedIdx] = useState(null)

  // Orbit radius must shrink with the card size (set via CSS breakpoints)
  // or the cards get pushed outside the viewport and clipped by
  // .projects-sticky's overflow: hidden on small screens.
  const [radius, setRadius] = useState(() => {
    if (typeof window === 'undefined') return 300
    const w = window.innerWidth
    if (w <= 480) return 60
    if (w <= 768) return 120
    return 300
  })

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth
      setRadius(w <= 480 ? 60 : w <= 768 ? 120 : 300)
    }
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [])

  useMotionValueEvent(smoothRotation, 'change', (v) => {
    const step = 360 / PROJECTS.length
    const idx =
      Math.round(((-v % 360) + 360) % 360 / step) % PROJECTS.length
    setActiveIdx(idx)
  })

  // ESC closes expanded overlay
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setExpandedIdx(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Trap body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = expandedIdx !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [expandedIdx])

  const expandedProject = expandedIdx !== null ? PROJECTS[expandedIdx] : null

  return (
    <section
      id="projects"
      className="section-projects"
      ref={ref}
      style={{ height: `${PROJECTS.length * 80}vh` }}
    >
      {/* Sticky viewport — header is fixed/pinned alongside the orbit and
          stays fully visible the whole time the cards are rotating. Only
          the orbit below fades in (see orbitOpacity). */}
      <div className="projects-sticky" ref={stickyRef}>

        {/* Header — pinned, always fully visible, never fades */}
        <div className="projects-header-wrap">
          <motion.div
            className="projects-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="projects-eyebrow">/ 04 — Projects</div>
            <h2 className="projects-heading">From Scratch.</h2>
            <p className="projects-subhead">Scroll to rotate the deck.</p>
          </motion.div>
        </div>

        {/* Orbit area — fades in as it nears its pinned position, so the
            cards don't pop into view while still overlapping the section
            above. */}
        <motion.div className="projects-orbit-wrap" style={{ opacity: orbitOpacity }}>
          {/* Center label — updates as deck rotates */}
          <div className="projects-center-label">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="projects-center-inner"
            >
              <p className="projects-center-counter">
                {String(activeIdx + 1).padStart(2, '0')} /{' '}
                {String(PROJECTS.length).padStart(2, '0')} ·{' '}
                {PROJECTS[activeIdx].tag}
              </p>
              <h3 className="projects-center-title">
                {PROJECTS[activeIdx].title}
              </h3>
            </motion.div>
          </div>

          {/* Spinning deck */}
          <motion.div
            className="projects-deck"
            style={{
              rotate: smoothRotation,
              transformStyle: 'preserve-3d',
              perspective: 1200,
            }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={i}
                angle={(360 / PROJECTS.length) * i}
                radius={radius}
                smoothRotation={smoothRotation}
                isActive={i === activeIdx}
                onExpand={() => setExpandedIdx(i)}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <p className="projects-scroll-cue">
          ↑ scroll up to reverse &nbsp;·&nbsp; scroll down to rotate ↓
        </p>
      </div>

      {/* Expanded project overlay — portalled to body so z-index is global */}
      {createPortal(
        <AnimatePresence>
          {expandedProject && (
            <motion.div
              className="project-expand-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setExpandedIdx(null)}
            >
              <motion.div
                className={`project-expand-card project-card--v${expandedProject.variant}`}
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top row */}
                <div className="project-expand-top">
                  <span className="project-expand-tag">{expandedProject.tag}</span>
                  <button
                    className="project-expand-close"
                    onClick={() => setExpandedIdx(null)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Title */}
                <h3 className="project-expand-title">{expandedProject.title}</h3>

                {/* Bullet points */}
                <ul className="project-expand-bullets">
                  {expandedProject.bullets.map((b, i) => (
                    <li key={i} className="project-expand-bullet">{b}</li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="project-expand-stack">
                  {expandedProject.stack.map((t) => (
                    <span key={t} className="project-stack-tag">{t}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="project-expand-links">
                  {expandedProject.github && (
                    <a
                      href={expandedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-expand-link"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {expandedProject.live && (
                    <a
                      href={expandedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-expand-link"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
