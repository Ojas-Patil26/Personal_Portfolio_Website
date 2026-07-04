import { useRef, useEffect, useState } from 'react'
import './Experience.css'

const JOBS = [
  {
    company: 'W. P. Carey School of Business',
    role: 'Office Assistant',
    period: 'Mar 2026',
    periodEnd: 'Present',
    location: 'Tempe, AZ',
    bullets: [
      'Coordinating alumni and donor events for the W. P. Carey School of Business, managing logistics and communications from planning through execution.',
      'Building WP Carey HQ, a Hivebrite-powered alumni engagement platform, with custom HTML and JavaScript components to surface new features and improve the experience for 5,000+ alumni.',
      'Curating and maintaining a 5,000+ alumni database to support targeted outreach, event invitations, and platform onboarding.',
    ],
    tags: ['Hivebrite', 'HTML', 'JavaScript', 'Event Coordination', 'Alumni Engagement'],
  },
  {
    company: 'Ira A. Fulton Schools of Engineering',
    role: 'C2 Camp Counselor',
    period: 'Aug 2025',
    periodEnd: 'Aug 2025',
    location: 'Tempe, AZ',
    bullets: [
      'Mentored 50+ incoming engineering students through E2 Camp transition activities, improving confidence and team participation.',
      'Led the Maroon Group to a Gold Medal among camp cohorts through collaborative challenges.',
      'Achieved 100% participation in group challenges and reflection sessions.',
    ],
    tags: ['Leadership', 'Mentorship', 'Education'],
  },
  {
    company: 'Grand Challenges Scholars Program',
    role: 'Researcher',
    period: 'Jan 2025',
    periodEnd: 'May 2025',
    location: 'Arizona State University',
    bullets: [
      'Designed and simulated a precision firefighting drone swarm achieving 70% faster wildfire response and 30% lower spread area in test environments.',
      'Implemented a graphene-based power system model using CNT micro-drone research, improving flight duration and energy efficiency.',
      'Presented results to faculty, highlighting autonomous-systems innovation and sustainable engineering impact.',
    ],
    tags: ['Drone Systems', 'Research', 'Autonomous Systems', 'Python'],
  },
  {
    company: 'EPICS at Arizona State University',
    role: 'Lead Researcher',
    period: 'Aug 2024',
    periodEnd: 'Dec 2024',
    location: 'Arizona State University',
    bullets: [
      'Improved dental crown prototype strength by 20% through research-driven material selection optimized for durability.',
      'Developed crown designs through CAD iteration sessions, translating geometry constraints into manufacturable 3D prints.',
      'Executed 5+ durability and fit tests to refine material choices and strengthen the final prototype.',
    ],
    tags: ['CAD', '3D Printing', 'Research', 'Biomedical'],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const railFillRef = useRef(null)
  const [visibleCards, setVisibleCards] = useState(new Set())

  /* IntersectionObserver — reveal each card as it enters view */
  useEffect(() => {
    const cards = listRef.current?.querySelectorAll('.exp-entry')
    if (!cards) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.idx]))
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach((card) => obs.observe(card))
    return () => obs.disconnect()
  }, [])

  /* Scroll-driven rail fill */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !railFillRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.5))
      )
      railFillRef.current.style.height = `${progress * 100}%`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="experience" className="section-experience" ref={sectionRef}>
      <div className="section-inner">

        {/* ── Section header ── */}
        <div className="exp-section-header">
          <div>
            <div className="exp-eyebrow">/ 02 — Experience</div>
            <h2 className="exp-heading">
              My <em>Track Record</em>.
            </h2>
          </div>
        </div>

        {/* ── Timeline list ── */}
        <div className="exp-list" ref={listRef}>

          {/* The vertical rail */}
          <div className="exp-rail">
            <div className="exp-rail-fill" ref={railFillRef} />
          </div>

          {JOBS.map((job, idx) => (
            <div
              key={idx}
              className={`exp-entry ${visibleCards.has(String(idx)) ? 'in-view' : ''}`}
              data-idx={idx}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >

              {/* ── Left: year column ── */}
              <div className="exp-year-col">
                <span className="exp-period">{job.period}</span>
                <span className="exp-period-sep">—</span>
                <span className="exp-period">{job.periodEnd}</span>
                <div className="exp-dot" />
              </div>

              {/* ── Right: company block ── */}
              <div className="exp-block">
                <div className="exp-header">
                  <h3 className="exp-company">{job.role}</h3>
                  <div className="exp-role">{job.company}</div>
                  <div className="exp-location">{job.location}</div>
                </div>

                <div className="exp-detail">
                  <ul className="exp-bullets">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="exp-tags">
                    {job.tags.map((t, i) => (
                      <span key={i} className="exp-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
