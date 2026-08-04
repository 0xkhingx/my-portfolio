'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FileTextIcon, DownloadIcon } from '@/icons'

const RESUME_PDF = '/Ogundele_Oluwadamilare_Resume.pdf'
const RESUME_SIZE = '569 KB'

const headingLines = ["Hi, I'm", '0xkhingx']
const fullName = 'Oluwadamilare'
const subtitle = 'Software Engineer, ML Specialist'
const tagline = 'Machine learning, Human touch'

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (!isHovered) return

    let i = 0
    const id = setInterval(() => {
      i += 1
      setCharIndex(i)
      if (i >= fullName.length) clearInterval(id)
    }, 40)

    return () => clearInterval(id)
  }, [isHovered])

  const startReveal = () => {
    setCharIndex(0)
    setIsHovered(true)
  }

  const displayedText = isHovered ? fullName.slice(0, charIndex) : headingLines[1]

  // Stable accessible name, independent of the reveal animation.
  const headingLabel = `${headingLines[0]} ${headingLines[1]}, ${fullName}`

  return (
    <section id="hero" className="px-6 sm:px-10 bg-cream">
      <div className="mx-auto min-h-screen flex flex-col max-w-[950px] relative">
        <div className="h-[140px] md:h-[160px]" />
        <div className="flex-1 flex items-center">
            <div className="flex flex-col md:flex-row gap-14 md:gap-16 items-center md:items-start w-full">
              <motion.div
                className="flex flex-col items-center md:items-start gap-7 md:gap-8 flex-1 w-full max-w-full md:max-w-[calc(100%-380px)]"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
                }}
              >
                <motion.h1
                  variants={itemVariants}
                  onMouseEnter={startReveal}
                  onMouseLeave={() => setIsHovered(false)}
                  // Touch and pen have no hover, so tap toggles the same reveal.
                  onPointerDown={(e) => {
                    if (e.pointerType === 'mouse') return
                    if (isHovered) setIsHovered(false)
                    else startReveal()
                  }}
                  aria-label={headingLabel}
                  className="text-center md:text-left text-ink text-5xl md:text-7xl leading-[1.1] font-bold tracking-tight"
                >
                  <span aria-hidden="true">
                  {headingLines[0]}
                  <br />
                  <span className="font-display">{displayedText.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      animate={
                        !isHovered && i === 0
                          ? { y: [0, -5, 0] }
                          : { y: 0 }
                      }
                      transition={
                        !isHovered && i === 0
                          ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                          : {}
                      }
                    >
                      {char}
                    </motion.span>
                  ))}</span>
                  </span>
                </motion.h1>
                <motion.span
                  variants={itemVariants}
                  className="text-center md:text-left text-ink text-xl md:text-2xl font-semibold leading-snug block"
                >
                  {subtitle}
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="block text-center md:text-left text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft/60"
                >
                  {tagline}
                </motion.span>
                <motion.div
                  variants={itemVariants}
                  className="mt-2 flex items-center gap-2"
                >
                  <a
                    href={RESUME_PDF}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream shadow-lg shadow-ink/15 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                  >
                    <FileTextIcon className="h-4 w-4 shrink-0" />
                    View resume
                    <span className="text-[11px] font-medium text-cream/60">
                      PDF · {RESUME_SIZE}
                    </span>
                  </a>
                  <a
                    href={RESUME_PDF}
                    download
                    aria-label={`Download resume (PDF, ${RESUME_SIZE})`}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
                  >
                    <DownloadIcon className="h-[18px] w-[18px]" />
                  </a>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex-shrink-0 self-center md:self-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                <div className="relative w-[240px] md:w-[300px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-ink/15">
                  <Image
                    src="/20260208_141931.jpg"
                    alt="Oluwadamilare Ogundele"
                    fill
                    priority
                    sizes="(min-width: 768px) 300px, 240px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
        </div>
      </div>
    </section>
  )
}
