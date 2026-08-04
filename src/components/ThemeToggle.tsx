'use client'

import { useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SunIcon, MoonIcon } from '@/icons'

type Theme = 'light' | 'dark'

/** The theme is a class on <html>, set by the inline script in layout.tsx. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

// No DOM on the server; the inline script corrects this before paint.
const getServerSnapshot = (): Theme => 'light'

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const reducedMotion = useReducedMotion()

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Blocked storage: the choice just will not persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      aria-pressed={theme === 'dark'}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-island-fg transition-colors duration-200 hover:bg-white/15 dark:border-black/10 dark:bg-black/5 dark:hover:bg-black/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-[17px] w-[17px]" />
          ) : (
            <MoonIcon className="h-[17px] w-[17px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
