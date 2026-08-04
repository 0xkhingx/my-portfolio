'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const navIcons: Record<string, string> = {
  work: 'M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z',
  services: 'M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z',
  about: 'M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6',
  experience: 'M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71zM8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0',
  contact: 'M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z',
}

const sections = [
  { id: 'work', label: 'Work', iconKey: 'work' },
  { id: 'services', label: 'Services', iconKey: 'services' },
  { id: 'experience', label: 'Experience', iconKey: 'experience' },
  { id: 'about', label: 'About', iconKey: 'about' },
  { id: 'contact', label: 'Contact', iconKey: 'contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [ripple, setRipple] = useState(false)
  // Expanded on hover, keyboard focus, or tap.
  const [isOpen, setIsOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const islandRef = useRef<HTMLDivElement>(null)
  const lastPointerType = useRef<string>('mouse')
  const isCollapsed = activeSection !== 'hero' && !isOpen

  // Shared by the island width and the link positions.
  const islandSpring = reducedMotion
    ? { duration: 0 }
    : ({ type: 'spring', stiffness: 340, damping: 34, mass: 0.9 } as const)

  // `layout` caches the projected size; re-render so it remeasures on resize.
  const [, setResizeTick] = useState(0)
  useEffect(() => {
    let frame = 0
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setResizeTick((t) => t + 1))
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Touch has no hover to fall out of, so close on the next tap outside.
  useEffect(() => {
    if (!isOpen) return
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      if (!islandRef.current?.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [isOpen])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0, rootMargin: '-5% 0px -75% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    const onScroll = () => { if (window.scrollY < 100) setActiveSection('hero') }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observers.forEach((o) => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleNavClick = useCallback((id: string) => {
    setIsOpen(false)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <motion.nav
      className="fixed top-12 left-0 w-full flex justify-center px-3 sm:px-6 z-50 pointer-events-none"
      initial={reducedMotion ? { opacity: 0 } : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <motion.div
        ref={islandRef}
        layout
        transition={islandSpring}
        onMouseEnter={() => {
          setRipple(true)
          setIsOpen(true)
        }}
        onMouseLeave={() => {
          setRipple(false)
          setIsOpen(false)
        }}
        onFocusCapture={() => setIsOpen(true)}
        onBlurCapture={(e) => {
          // Only close when focus actually leaves the island, not when it moves
          // between the links inside it.
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false)
        }}
        onPointerDown={(e) => {
          lastPointerType.current = e.pointerType
        }}
        onClickCapture={(e) => {
          // First tap opens the island instead of following the link under it.
          if (isCollapsed && lastPointerType.current !== 'mouse') {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(true)
          }
        }}
        className={`pointer-events-auto flex items-center justify-center bg-island/75 backdrop-blur-2xl backdrop-saturate-150 rounded-full border border-white/20 dark:border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_12px_40px_rgba(18,21,28,0.35)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_12px_40px_rgba(0,0,0,0.55)] h-[60px] md:h-[80px] overflow-hidden ${
  isCollapsed
    ? 'gap-2 px-3 sm:gap-3 sm:px-5 w-auto min-w-[150px] sm:min-w-[190px]'
    : 'gap-2 px-3 sm:gap-3 sm:px-4 lg:gap-4 lg:px-6 w-full sm:w-auto max-w-full'
}`}
      >
        <motion.button
          layout
          transition={islandSpring}
          onClick={() => handleNavClick('hero')}
          aria-label="Home"
          className="flex shrink-0 font-display text-island-fg font-bold text-[26px] tracking-tight whitespace-nowrap leading-none cursor-pointer"
        >
          0x
        </motion.button>

        <ul className="list-none flex flex-1 sm:flex-none justify-between sm:justify-start gap-2 lg:gap-3 items-center m-0 p-0 min-w-0">
          <AnimatePresence initial={false} mode="popLayout">
          {sections
            .filter((s) => (isCollapsed ? s.id === activeSection : true))
            .map((s, i) => (
            <motion.li
              key={s.id}
              layout
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.9, filter: 'blur(5px)' }
              }
              animate={
                ripple && !reducedMotion
                  ? { opacity: 1, scale: 1, filter: 'blur(0px)', y: [0, -7, 3, -2, 0] }
                  : { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.9, filter: 'blur(5px)' }
              }
              transition={{
                layout: islandSpring,
                opacity: {
                  duration: reducedMotion ? 0 : 0.2,
                  delay: reducedMotion ? 0 : i * 0.035,
                },
                scale: {
                  duration: reducedMotion ? 0 : 0.28,
                  delay: reducedMotion ? 0 : i * 0.035,
                },
                filter: {
                  duration: reducedMotion ? 0 : 0.25,
                  delay: reducedMotion ? 0 : i * 0.035,
                },
                y: { delay: i * 0.045, duration: 0.55, ease: 'easeOut' },
              }}
              className="flex-1 sm:flex-none rounded-full relative z-0 overflow-hidden"
            >
              <a
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(s.id) }}
                className={`relative inline-flex w-full sm:w-11 lg:w-auto h-11 lg:h-auto items-center justify-center lg:px-3 lg:py-3 rounded-full text-[14px] font-semibold uppercase tracking-wide whitespace-nowrap leading-none no-underline transition-colors duration-300 will-change-transform ${
                  activeSection === s.id
                    ? 'text-island-fg'
                    : 'text-island-fg/75 hover:text-island-fg'
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
                <span className="nav-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-100 lg:opacity-0 transition-opacity duration-250">
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-[18px] h-[18px] text-island-fg"
                  >
                    <path d={navIcons[s.iconKey]} />
                  </svg>
                </span>
                <span className="nav-text hidden lg:inline transition-opacity duration-250">
                  {s.label}
                </span>
              </a>
            </motion.li>
          ))}
          </AnimatePresence>
        </ul>

        <ThemeToggle />
      </motion.div>
    </motion.nav>
  )
}
