import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import './Fun.css'

// ─── Media grid — real photos + video clips ────────────────────────────────
// width/height are the actual encoded dimensions. They drive the masonry
// grid's aspect-ratio (via inline style) so each tile reserves the right
// amount of space before the file loads, avoiding layout shift — and so
// every tile keeps its own natural ratio instead of being cropped to fit
// a fixed box. All EXIF/device/location metadata has been stripped from
// the source files; only pixel data ships to the browser.
const MEDIA = [
  { type: 'photo', src: '/photos/photo-01.jpg', width: 1440, height: 1920 },
  { type: 'photo', src: '/photos/photo-02.jpg', width: 1920, height: 1440 },
  { type: 'photo', src: '/photos/photo-03.jpg', width: 1920, height: 1080 },
  { type: 'photo', src: '/photos/photo-04.jpg', width: 1080, height: 1920 },
  { type: 'video', src: '/videos/video-01.mp4', width: 720, height: 1280 },
  { type: 'photo', src: '/photos/photo-05.jpg', width: 1920, height: 1440 },
  { type: 'photo', src: '/photos/photo-06.jpg', width: 1440, height: 1920 },
  { type: 'photo', src: '/photos/photo-07.jpg', width: 1440, height: 1920 },
  { type: 'photo', src: '/photos/photo-08.jpg', width: 1920, height: 1440 },
  { type: 'photo', src: '/photos/photo-09.jpg', width: 1440, height: 1920 },
  { type: 'photo', src: '/photos/photo-10.jpg', width: 1440, height: 1920 },
  { type: 'video', src: '/videos/video-02.mp4', width: 960, height: 540 },
  { type: 'photo', src: '/photos/photo-11.jpg', width: 1280, height: 1920 },
  { type: 'photo', src: '/photos/photo-12.jpg', width: 1920, height: 1440 },
  { type: 'photo', src: '/photos/photo-13.jpg', width: 1920, height: 1440 },
  { type: 'photo', src: '/photos/photo-14.jpg', width: 1290, height: 972 },
]

export default function Fun() {
  const prefersReducedMotion = useReducedMotion()
  const [lightbox, setLightbox] = useState(null) // index or null

  const openLightbox  = (i) => setLightbox(i)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() => setLightbox((i) => (i - 1 + MEDIA.length) % MEDIA.length), [])
  const next = useCallback(() => setLightbox((i) => (i + 1) % MEDIA.length), [])

  /* Keyboard nav + ESC */
  useEffect(() => {
    if (lightbox === null) return
    const handle = (e) => {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handle)
    /* Trap body scroll while open */
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handle)
      document.body.style.overflow = ''
    }
  }, [lightbox, closeLightbox, prev, next])

  const activeItem = lightbox !== null ? MEDIA[lightbox] : null

  return (
    <section id="fun" className="section-fun">
      <div className="section-inner">

        {/* ── Section header ── */}
        <div className="fun-header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="fun-header-inner"
          >
            <div className="fun-eyebrow">/ 05 — Fun</div>
            <div className="fun-heading-row">
              <h2 className="fun-heading"><em>Biome</em> Seed.</h2>
            </div>
          </motion.div>
        </div>

        {/* ── Masonry media grid ── */}
        <div className="photo-grid">
          {MEDIA.map((item, i) => (
            <motion.div
              key={item.src}
              className="photo-card"
              style={{ aspectRatio: `${item.width} / ${item.height}` }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
              onClick={() => openLightbox(i)}
              role="button"
              aria-label={item.type === 'video' ? 'Play video' : 'View photo'}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
            >
              {item.type === 'photo' ? (
                <img
                  className="photo-img"
                  src={item.src}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <video
                  className="photo-img"
                  src={item.src}
                  autoPlay={!prefersReducedMotion}
                  muted
                  loop={!prefersReducedMotion}
                  controls={prefersReducedMotion}
                  playsInline
                  preload="metadata"
                />
              )}

              {/* Hover darken overlay */}
              <div className="photo-hover-overlay" aria-hidden="true" />

              {/* Arrow indicator */}
              <div className="photo-arrow" aria-hidden="true">↗</div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Media lightbox"
          >
            {/* Click inside doesn't close */}
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {activeItem.type === 'photo' ? (
                <img className="lightbox-media" src={activeItem.src} alt="" />
              ) : (
                <video
                  className="lightbox-media"
                  src={activeItem.src}
                  controls
                  playsInline
                />
              )}
            </div>

            {/* Controls */}
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">✕</button>
            <button className="lightbox-prev"  onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous">←</button>
            <button className="lightbox-next"  onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next">→</button>

            {/* Counter */}
            <p className="lightbox-counter">
              {String(lightbox + 1).padStart(2, '0')} / {String(MEDIA.length).padStart(2, '0')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
