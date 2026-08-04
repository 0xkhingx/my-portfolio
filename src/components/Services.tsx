'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { skills } from '@/data/skills'
import type { IconComponent } from '@/types'
import {
  Code2Icon,
  WrenchIcon,
  LightbulbIcon,
  ReactIcon,
  PythonIcon,
  NodedotjsIcon,
  JavascriptIcon,
  FlaskIcon,
  FastapiIcon,
  NextdotjsIcon,
  TypescriptIcon,
  SupabaseIcon,
  Html5Icon,
  Css3Icon,
  PostgresqlIcon,
  SqliteIcon,
  BootstrapIcon,
  TailwindcssIcon,
  GitIcon,
  LayersIcon,
  BrainIcon,
  MonitorSmartphoneIcon,
  BookOpenIcon,
  GitBranchIcon,
  LayoutIcon,
  MessageSquareIcon,
  EyeIcon,
} from '@/icons'

const categories = ['tools', 'programming', 'skills'] as const
type Cat = (typeof categories)[number]

const categoryIcons: Record<Cat, IconComponent> = {
  programming: Code2Icon,
  tools: WrenchIcon,
  skills: LightbulbIcon,
}

const categoryLabels: Record<Cat, string> = {
  programming: 'Programming',
  tools: 'Tools',
  skills: 'Skills',
}

const iconMap: Record<string, IconComponent> = {
  react: ReactIcon,
  python: PythonIcon,
  nodedotjs: NodedotjsIcon,
  javascript: JavascriptIcon,
  flask: FlaskIcon,
  fastapi: FastapiIcon,
  nextdotjs: NextdotjsIcon,
  typescript: TypescriptIcon,
  supabase: SupabaseIcon,
  html5: Html5Icon,
  css3: Css3Icon,
  postgresql: PostgresqlIcon,
  sqlite: SqliteIcon,
  bootstrap: BootstrapIcon,
  tailwindcss: TailwindcssIcon,
  git: GitIcon,
  layers: LayersIcon,
  brain: BrainIcon,
  'monitor-smartphone': MonitorSmartphoneIcon,
  'book-open': BookOpenIcon,
  'git-branch': GitBranchIcon,
  layout: LayoutIcon,
  'message-square': MessageSquareIcon,
  eye: EyeIcon,
}

const ICON_COPIES = 5
/** Pixels per 60fps frame; scaled by real elapsed time so refresh rate doesn't change the speed. */
const ICON_SCROLL_SPEED = 0.3

export default function Services() {
  const [activeCat, setActiveCat] = useState<Cat>('programming')
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  const filtered = skills.filter((s) => s.category === activeCat)
  const iconKey = hoveredIcon || activeCat
  const IconComponent = hoveredIcon ? (iconMap[hoveredIcon] ?? categoryIcons[activeCat]) : categoryIcons[activeCat]

  const iconTrackRef = useRef<HTMLDivElement>(null)
  const iconRafRef = useRef(0)

  const iconItems = Array.from({ length: ICON_COPIES }, () => skills).flat()

  useEffect(() => {
    const track = iconTrackRef.current
    if (!track) return

    track.style.transform = 'translateX(0px)'
    if (reduceMotion) return

    // Measured: icon size changes at md, so the step cannot be hardcoded.
    let setWidth = 0
    const measure = () => {
      const items = track.children
      if (items.length < 2) return
      const step =
        (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft
      setWidth = step * skills.length
    }
    measure()
    window.addEventListener('resize', measure)

    let acc = 0
    let last = performance.now()
    const tick = (now: number) => {
      // Clamp so a backgrounded tab does not jump the track on return.
      const dt = Math.min(now - last, 100)
      last = now
      if (setWidth > 0) {
        acc = (acc + ICON_SCROLL_SPEED * (dt / (1000 / 60))) % setWidth
        track.style.transform = `translateX(-${acc}px)`
      }
      iconRafRef.current = requestAnimationFrame(tick)
    }
    iconRafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(iconRafRef.current)
      window.removeEventListener('resize', measure)
    }
  }, [reduceMotion])

  return (
    <section id="services" className="w-full flex justify-center bg-cream py-32 md:py-44">
      <motion.div
        className="w-[90%] max-w-[1100px] min-w-0 px-6 md:px-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-center text-ink text-4xl md:text-5xl font-bold tracking-tight mb-16">
          Stack
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-5 mb-16">
          {categories.map((cat) => {
            const isCenter = cat === 'programming'
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCat(cat)
                  setHoveredIcon(null)
                }}
                className={`font-bold uppercase tracking-[0.08em] rounded-full transition-all duration-200 ${
                  isCenter
                    ? 'text-sm md:text-lg px-4 md:px-8 py-2 md:py-4'
                    : 'text-xs md:text-base px-3 md:px-7 py-1.5 md:py-3.5'
                } ${
                  activeCat === cat
                    ? isCenter
                      ? 'bg-white/50 dark:bg-white/12 backdrop-blur-md border border-white/60 dark:border-white/15 shadow-md text-ink'
                      : 'bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/15 shadow-md text-ink'
                    : 'bg-white/20 dark:bg-white/[0.04] backdrop-blur-sm border border-white/20 dark:border-white/10 text-ink-soft hover:bg-white/40 dark:hover:bg-white/10 hover:text-ink'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            )
          })}
        </div>

        <div className="w-[64px] h-[64px] mb-16 flex items-center justify-center text-ink">
          <AnimatePresence mode="wait">
            <motion.div
              key={iconKey}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
            >
              <IconComponent className="w-11 h-11" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-[720px] mb-24">
          {filtered.map((skill) => (
            <span
              key={skill.name}
              onMouseEnter={() => setHoveredIcon(skill.icon)}
              onMouseLeave={() => setHoveredIcon(null)}
              className="text-sm md:text-base font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-white/30 dark:bg-white/[0.06] backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm text-ink whitespace-nowrap cursor-default transition-all duration-200 hover:bg-white/50 dark:hover:bg-white/[0.12] hover:-translate-y-1 hover:shadow-lg"
            >
              {skill.name}
            </span>
          ))}
        </div>

        <div className="w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
          <div
            ref={iconTrackRef}
            className="flex gap-5"
            style={{ transform: 'translateX(0px)', willChange: 'transform' }}
          >
            {iconItems.map((skill, i) => {
              const SkillIcon = iconMap[skill.icon]
              return (
                <div
                  key={`${i}-${skill.name}`}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 dark:bg-white/[0.06] backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm flex items-center justify-center flex-shrink-0 text-ink"
                >
                  {SkillIcon && <SkillIcon className="w-6 h-6 md:w-7 md:h-7" />}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
