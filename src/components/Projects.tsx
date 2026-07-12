"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowLeftIcon, ArrowRightIcon, GitHubIcon, LinkIcon } from "@/icons";

const AUTO_MS = 3000;

/**
 * Interactive project carousel. Auto-rotates every 6s; pauses on hover,
 * focus, and for users who prefer reduced motion.
 */
export default function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    timer.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % projects.length);
    }, AUTO_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduceMotion]);

  const project = projects[index];

  return (
    <section id="work" className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Selected work
        </h2>
        <p className="mt-2 max-w-md text-ink-soft">
          A rotating shelf of things I&apos;ve shipped. Hover to pause.
        </p>

        <div
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="relative overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-[0_16px_50px_rgba(31,36,48,0.08)]"
            aria-roledescription="carousel"
            aria-label="Projects"
          >
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.article
                key={project.id}
                custom={direction}
                initial={
                  reduceMotion ? { opacity: 0 } : { x: direction * 80, opacity: 0 }
                }
                animate={{ x: 0, opacity: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { x: direction * -80, opacity: 0 }
                }
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                className="grid gap-0 md:grid-cols-2"
              >
                <div className="relative aspect-[4/3] bg-cream-deep md:aspect-auto md:min-h-[22rem]">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 32rem, 100vw"
                    priority={index === 0}
                  />
                </div>

                <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
                  <h3 className="font-display text-2xl font-bold">{project.title}</h3>
                  <p className="text-ink-soft">{project.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-cream-deep px-3 py-1 text-xs font-medium text-ink-soft"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline"
                      >
                        <LinkIcon /> Live site
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline"
                      >
                        <GitHubIcon /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Choose project">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show ${p.title}`}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-ink" : "w-2.5 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(index - 1, -1)}
                aria-label="Previous project"
                className="rounded-full border border-ink/15 p-2.5 text-lg transition-colors hover:bg-ink hover:text-cream"
              >
                <ArrowLeftIcon />
              </button>
              <button
                onClick={() => go(index + 1, 1)}
                aria-label="Next project"
                className="rounded-full border border-ink/15 p-2.5 text-lg transition-colors hover:bg-ink hover:text-cream"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
