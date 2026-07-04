import { useRef, useEffect, useState } from 'react'
import './Contact.css'

const SOCIALS = [
  {
    label: 'Email',
    value: 'ojaspatil332@gmail.com',
    href: 'mailto:ojaspatil332@gmail.com',
    icon: '✉',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ojaspatil26',
    href: 'https://www.linkedin.com/in/ojaspatil26',
    icon: '↗',
  },
  {
    label: 'GitHub',
    value: 'github.com/Ojas-Patil26',
    href: 'https://github.com/Ojas-Patil26',
    icon: '↗',
  },
  {
    label: 'Resume',
    value: 'Download PDF',
    href: '/OjasPatil_Resume.pdf',
    icon: '↓',
    download: true,
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.12 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className="section-contact" ref={sectionRef}>
      <div className="section-inner">

        <div className="contact-eyebrow">/ 06 — Contact</div>

        {/* Giant heading as mailto link */}
        <a
          href="mailto:ojaspatil332@gmail.com"
          className={`contact-heading-link ${inView ? 'in-view' : ''}`}
          aria-label="Send me an email"
        >
          <h2 className="contact-heading">
            Let's <em>talk.</em>
          </h2>
          <span className="contact-heading-arrow">↗</span>
        </a>

        {/* Subtext */}
        <p className={`contact-sub ${inView ? 'in-view' : ''}`}>
          Whether it's an internship, a collaboration, or just a good
          conversation — my inbox is open.
        </p>

        {/* Socials grid */}
        <div className={`contact-socials ${inView ? 'in-view' : ''}`}>
          {SOCIALS.map((s, idx) => (
            <a
              key={idx}
              href={s.href}
              className="contact-social-item"
              target={s.download ? '_blank' : undefined}
              rel={s.download ? 'noopener noreferrer' : undefined}
              style={{ transitionDelay: `${0.55 + idx * 0.06}s` }}
            >
              <span className="contact-social-label">{s.label}</span>
              <span className="contact-social-value">{s.value}</span>
              <span className="contact-social-icon">{s.icon}</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className={`contact-footer ${inView ? 'in-view' : ''}`}>
          © 2025 Ojas Patil
        </div>

      </div>
    </section>
  )
}
