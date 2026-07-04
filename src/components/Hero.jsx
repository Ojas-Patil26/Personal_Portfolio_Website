import { useEffect, useRef, useState } from 'react'
import ParticleBackground from './ParticleBackground.jsx'
import './Hero.css'

const NAV_LINKS = ['About', 'Experience', 'Skills', 'Projects', 'Fun', 'Contact']

export default function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const smoothTimeRef = useRef(0)
  const [isDark, setIsDark] = useState(false)

  /* ---------- theme toggle ---------- */
  useEffect(() => {
    document.body.classList.toggle('dark', isDark)
  }, [isDark])

  /* ---------- eased scrub: read scrollY each frame, lerp time, seek once ---------- */
  useEffect(() => {
    let raf
    const tick = () => {
      const video = videoRef.current
      const hero = heroRef.current
      if (video && video.duration && hero) {
        const progress = Math.min(window.scrollY / hero.offsetHeight, 1)
        const rawTarget = progress * video.duration
        smoothTimeRef.current += (rawTarget - smoothTimeRef.current) * 0.07
        video.currentTime = smoothTimeRef.current
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* ---------- ensure front-facing first frame on load ---------- */
  const onLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      smoothTimeRef.current = 0
    }
  }

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <nav className="navbar">
        <button className="brand" onClick={scrollToTop}>.ojas</button>

        <ul className="nav-links">
          {NAV_LINKS.map((label) => (
            <li key={label}>
              <a href={`#${label.toLowerCase()}`}>{label}</a>
            </li>
          ))}
        </ul>

        <button
          className="theme-toggle"
          onClick={() => setIsDark((d) => !d)}
          aria-label="Toggle colour theme"
        >
          {isDark ? '🌙' : '☀️'}
        </button>
      </nav>

      <header className="hero" ref={heroRef}>
        <ParticleBackground />

        <svg
          className="title"
          viewBox="0 0 920 380"
          preserveAspectRatio="xMidYMin meet"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* padded 40u each side so the words read centred, not bleeding off-edge;
                control point only 18u off baseline keeps the line nearly flat */}
            <path id="lineTop" d="M 40 150 Q 460 132 880 150" />
            <path id="lineBottom" d="M 40 324 Q 460 306 880 324" />
          </defs>
          <text className="title-text">
            <textPath
              href="#lineTop"
              startOffset="0"
              textLength="840"
              lengthAdjust="spacingAndGlyphs"
            >
              SOFTWARE
            </textPath>
          </text>
          <text className="title-text">
            <textPath
              href="#lineBottom"
              startOffset="0"
              textLength="840"
              lengthAdjust="spacingAndGlyphs"
            >
              ENGINEER
            </textPath>
          </text>
        </svg>

        <video
          className="figurine"
          ref={videoRef}
          src="/figurine.webm"
          muted
          loop={false}
          playsInline
          preload="auto"
          onLoadedMetadata={onLoadedMetadata}
        />

        <a
          className="resume-btn"
          href="/OjasPatil_Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Download Resume
        </a>

        <div className="scroll-cue">scroll ↓</div>
      </header>
    </>
  )
}
