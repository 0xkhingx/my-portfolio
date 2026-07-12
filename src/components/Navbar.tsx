'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const navIcons: Record<string, string> = {
  home: 'M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z',
  work: 'M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z',
  services: 'M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z',
  about: 'M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6',
  contact: 'M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z',
}

const sections = [
  { id: 'hero', label: 'Home', iconKey: 'home' },
  { id: 'work', label: 'Work', iconKey: 'work' },
  { id: 'services', label: 'Services', iconKey: 'services' },
  { id: 'about', label: 'About', iconKey: 'about' },
  { id: 'contact', label: 'Contact', iconKey: 'contact' },
]

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [ripple, setRipple] = useState(false)
  const isCollapsed = activeSection !== 'hero'

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id === 'hero' ? 'hero' : id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0, rootMargin: '-15% 0px -65% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = useCallback((id: string) => {
    const el = document.getElementById(id === 'hero' ? 'hero' : id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <motion.nav
      className="fixed top-12 left-0 w-full flex justify-center px-6 sm:px-10 z-50 pointer-events-none"
      initial={reducedMotion ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <motion.div
        whileHover={{ scaleX: 1.03, scaleY: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 6, mass: 0.6 }}
        onMouseEnter={() => setRipple(true)}
        onMouseLeave={() => setRipple(false)}
        className={`pointer-events-auto flex items-center justify-center bg-gradient-to-b from-white/25 to-white/10 backdrop-blur-xl rounded-full border border-white/40 shadow-xl h-[60px] md:h-[80px] overflow-hidden ${
  isCollapsed
    ? 'gap-2 px-3 sm:gap-3 sm:px-6 w-auto min-w-[140px] sm:min-w-[200px]'
    : 'gap-2 px-3 sm:gap-3 sm:px-6 md:gap-10 md:px-12 w-auto min-w-0 md:min-w-[500px] max-w-[900px]'
}`}
      >
        <button onClick={() => handleNavClick('hero')} className="font-display text-gray-900 font-bold text-[26px] tracking-tight whitespace-nowrap leading-none cursor-pointer">
          <span className="sm:hidden">0x</span>
          <span className="hidden sm:inline">{isCollapsed ? '0x' : '0xkhingx'}</span>
        </button>

        <ul className="list-none flex gap-2 items-center m-0 p-0">
          {sections
            .filter((s) => (isCollapsed ? s.id === activeSection : true))
            .map((s, i) => (
            <motion.li
              key={s.id}
              animate={ripple ? { y: [0, -7, 3, -2, 0] } : { y: 0 }}
              transition={{
                delay: i * 0.045,
                duration: 0.55,
                ease: 'easeOut',
              }}
              className="rounded-full relative z-0 overflow-hidden"
            >
              <a
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(s.id) }}
                className={`relative inline-flex items-center justify-center px-2 sm:px-3 py-[10px] rounded-full text-[14px] font-semibold uppercase tracking-wide whitespace-nowrap leading-none no-underline transition-colors duration-300 will-change-transform ${
                  activeSection === s.id
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                onMouseEnter={(e) => {
                  const link = e.currentTarget
                  link.style.transform = 'scale(1.08)'
                  link.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  const icon = link.querySelector('.nav-icon') as HTMLElement
                  if (icon) {
                    icon.style.transform = 'scale(1.2)'
                    icon.style.transition = 'transform 0.4s cubic-bezier(0.34, 2, 0.64, 1)'
                    icon.style.opacity = '1'
                  }
const text = link.querySelector('.nav-text') as HTMLElement
                  if (text) text.style.opacity = '0'
                }}
                onMouseLeave={(e) => {
                  const link = e.currentTarget
                  link.style.transform = 'scale(1)'
                  link.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  const icon = link.querySelector('.nav-icon') as HTMLElement
                  if (icon) {
                    icon.style.transform = 'scale(1)'
                    icon.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    icon.style.opacity = '0'
                  }
                  const text = link.querySelector('.nav-text') as HTMLElement
                  if (text) text.style.opacity = '1'
                }}
              >
                <span className="nav-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-100 sm:opacity-0 transition-opacity duration-250">
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-[18px] h-[18px] text-gray-700"
                  >
                    <path d={navIcons[s.iconKey]} />
                  </svg>
                </span>
                <span className="nav-text hidden sm:inline transition-opacity duration-250">
                  {s.label}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  )
}
