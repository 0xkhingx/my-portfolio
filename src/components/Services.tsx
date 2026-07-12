'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '@/data/skills'
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

const categoryIcons: Record<Cat, React.ComponentType<{ className?: string }>> = {
  programming: Code2Icon,
  tools: WrenchIcon,
  skills: LightbulbIcon,
}

const categoryLabels: Record<Cat, string> = {
  programming: 'Programming',
  tools: 'Tools',
  skills: 'Skills',
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
const ICON_SCROLL_SPEED = 0.3
const ICON_GAP = 20
const ICON_SIZE = 56
const ICON_STEP = ICON_SIZE + ICON_GAP

export default function Services() {
  const [activeCat, setActiveCat] = useState<Cat>('programming')
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const filtered = skills.filter((s) => s.category === activeCat)
  const iconKey = hoveredIcon || activeCat
  const IconComponent = hoveredIcon ? (iconMap[hoveredIcon] ?? categoryIcons[activeCat]) : categoryIcons[activeCat]

  const iconTrackRef = useRef<HTMLDivElement>(null)
  const iconAccRef = useRef(0)
  const iconRafRef = useRef(0)

  const iconSetWidth = skills.length * ICON_STEP
  const iconItems = Array.from({ length: ICON_COPIES }, () => skills).flat()

  useEffect(() => {
    iconAccRef.current = 0
    if (iconTrackRef.current) iconTrackRef.current.style.transform = 'translateX(0px)'

    const tick = () => {
      iconAccRef.current += ICON_SCROLL_SPEED
      const resetAt = iconSetWidth * (ICON_COPIES - 1)
      if (iconAccRef.current > resetAt) iconAccRef.current -= iconSetWidth
      const posInSet = iconAccRef.current % iconSetWidth
      if (iconTrackRef.current) iconTrackRef.current.style.transform = `translateX(-${posInSet}px)`
      iconRafRef.current = requestAnimationFrame(tick)
    }

    iconRafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(iconRafRef.current)
  }, [])

  return (
    <section id="services" className="w-full flex justify-center bg-[#f6f2ea] py-32 md:py-44">
      <div className="w-[90%] max-w-[1100px] min-w-0 px-6 md:px-8 flex flex-col items-center">
        <h2 className="text-center text-[#1f2430] text-4xl md:text-5xl font-bold tracking-tight mb-16">
          Services
        </h2>

        <div className="flex items-center gap-4 md:gap-5 mb-16">
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
                    ? 'text-base md:text-lg px-7 md:px-8 py-3.5 md:py-4'
                    : 'text-sm md:text-base px-6 md:px-7 py-3 md:py-3.5'
                } ${
                  activeCat === cat
                    ? isCenter
                      ? 'bg-white/50 backdrop-blur-md border border-white/60 shadow-md text-[#1f2430]'
                      : 'bg-white/40 backdrop-blur-md border border-white/60 shadow-md text-[#1f2430]'
                    : 'bg-white/20 backdrop-blur-sm border border-white/20 text-[#5f6675] hover:bg-white/40 hover:text-[#1f2430]'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            )
          })}
        </div>

        <div className="w-[64px] h-[64px] mb-16 flex items-center justify-center text-[#1f2430]">
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
              className="text-sm md:text-base font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm text-[#1f2430] whitespace-nowrap cursor-default transition-all duration-200 hover:bg-white/50 hover:-translate-y-1 hover:shadow-lg"
            >
              {skill.name}
            </span>
          ))}
        </div>

        <div className="w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#f6f2ea] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#f6f2ea] to-transparent z-10 pointer-events-none" />
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
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-center flex-shrink-0 text-[#1f2430]"
                >
                  {SkillIcon && <SkillIcon className="w-6 h-6 md:w-7 md:h-7" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
