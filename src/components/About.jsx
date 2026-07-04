import { useRef, useEffect, useState } from 'react'
import './About.css'

const MARQUEE_TEXT = 'about — '.repeat(10)

export default function About() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="section-about" ref={sectionRef}>

      {/* ── Ghost marquee background ── */}
      <div className="about-bg-marquee" aria-hidden="true">
        <div className="about-bg-marquee-track">
          <span>{MARQUEE_TEXT}</span>
          <span>{MARQUEE_TEXT}</span>
        </div>
      </div>

      <div className="about-layout">

        {/* ── Left column: text ── */}
        <div className="about-left">
          <div className={`about-text ${inView ? 'in-view' : ''}`}>

            <div className="about-eyebrow">/ 01 — About</div>

            <h2 className="about-heading">
              <span className="about-heading-hi">Hi, I'm</span>
              <span className="about-heading-name">Ojas Patil.</span>
            </h2>

            <div className={`about-bio ${inView ? 'in-view' : ''}`}>
              <p>
                I'm a CS junior at Arizona State University, studying Computer Science
                and Business. I build things <em>end to end</em> and care a lot about
                whether they actually hold up.
              </p>
              <p>
                My recent work spans <em>agentic LLM pipelines</em> that monitor
                production KPIs, live <em>financial dashboards</em>, and{' '}
                <em>offline voice AI</em>. What ties it together is{' '}
                <em>ownership</em>. I like seeing a project through from the{' '}
                <em>first commit</em> to something that{' '}
                <em>works in the real world</em>. Right now I'm especially drawn to the
                parts of AI moving faster than any playbook, because that's where the
                interesting problems live.
              </p>
              <p className="about-cta-line">
                I'm actively looking for SWE and AI/ML internships for Fall 2026 and
                Summer 2027. I'm always{' '}
                <a href="#contact" className="about-contact-link">
                  up for a good conversation
                </a>.
              </p>
            </div>

          </div>
        </div>

        {/* ── Right column: photo fills full height ── */}
        <div className="about-right">
          <img
            className={`about-photo ${inView ? 'in-view' : ''}`}
            src="/ojas_nobg.png"
            alt="Ojas Patil"
            loading="eager"
            draggable={false}
          />
        </div>

      </div>
    </section>
  )
}
