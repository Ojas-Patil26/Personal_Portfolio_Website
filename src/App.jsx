import { useEffect } from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Fun from './components/Fun.jsx'
import Contact from './components/Contact.jsx'

function App() {
  // Signals the inline loading screen in index.html (30% of its progress
  // weight). Safe to fire twice under StrictMode — the loader listens once.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('site:ready'))
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Fun />
      <Contact />
    </>
  )
}

export default App
