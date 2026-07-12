'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isHovered) {
      setCharIndex(1)
      intervalRef.current = setInterval(() => {
        setCharIndex((prev) => {
          if (prev >= fullName.length) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return fullName.length
          }
          return prev + 1
        })
      }, 40)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setCharIndex(0)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovered])

  const displayedText = isHovered ? fullName.slice(0, charIndex) : headingLines[1]

  return (
    <section id="hero" className="px-6 sm:px-10 bg-[#f6f2ea]">
      <div className="mx-auto min-h-screen flex flex-col max-w-[950px] relative">
        <div className="h-[140px] md:h-[160px]" />
        <div className="flex-1 flex items-center">
            <div className="flex flex-col md:flex-row gap-14 md:gap-16 items-start w-full">
              <motion.div
                className="flex flex-col gap-7 md:gap-8 flex-1 w-full max-w-full md:max-w-[calc(100%-380px)]"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
                }}
              >
                <motion.h1
                  variants={itemVariants}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="text-[#1f2430] text-5xl md:text-7xl leading-[1.1] font-bold tracking-tight"
                >
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
                </motion.h1>
                <motion.span
                  variants={itemVariants}
                  className="text-[#1f2430] text-xl md:text-2xl font-semibold leading-snug block"
                >
                  {subtitle}
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#5f6675]/60"
                >
                  {tagline}
                  <span className="mx-2.5 text-[#5f6675]/20">·</span>
                  <a
                    href="/Ogundele_Oluwadamilare_Resume.pdf"
                    download
                    className="inline whitespace-nowrap text-ink underline-offset-4 hover:underline transition-colors duration-200"
                  >
                    Resume ↓
                  </a>
                </motion.span>
              </motion.div>
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                <div className="w-[240px] md:w-[300px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-[#5f6675]/15">
                  <img
                    src="/20260208_141931.jpg"
                    alt="0xkhingx"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
        </div>
      </div>
    </section>
  )
}
