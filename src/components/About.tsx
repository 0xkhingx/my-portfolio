"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { polaroids } from "@/data/experience";
import type { Polaroid } from "@/types";
import { CloseIcon } from "@/icons";

/** Arc geometry: rotation + vertical lift per polaroid, middle one highest. */
function arcTransform(i: number, count: number) {
  const mid = (count - 1) / 2;
  const offset = i - mid; // -2..2 for 5 items
  return {
    rotate: offset * 7,
    y: Math.abs(offset) * 26,
  };
}

export default function About() {
  const [active, setActive] = useState<Polaroid | null>(null);
  const reduceMotion = useReducedMotion();

  // Close modal on Escape
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="about" className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          About
        </h2>
        <p className="mt-2 max-w-md text-ink-soft">
          A few snapshots. Hover to look closer, click for the story.
        </p>

        {/* Polaroid arc */}
        <ul className="mt-16 flex flex-wrap items-start justify-center gap-4 sm:-space-x-6 sm:gap-0">
          {polaroids.map((p, i) => {
            const { rotate, y } = arcTransform(i, polaroids.length);
            return (
              <li key={p.id} style={{ zIndex: 10 + i }}>
                <motion.button
                  type="button"
                  onClick={() => setActive(p)}
                  aria-haspopup="dialog"
                  aria-label={`Open snapshot: ${p.caption}`}
                  initial={false}
                  animate={
                    reduceMotion ? { rotate: 0, y: 0 } : { rotate, y }
                  }
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { rotate: 0, y: y - 24, scale: 1.08, zIndex: 30 }
                  }
                  whileFocus={
                    reduceMotion ? undefined : { rotate: 0, y: y - 24, scale: 1.08 }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="block w-36 cursor-pointer bg-paper p-2.5 pb-4 shadow-[0_10px_30px_rgba(31,36,48,0.18)] sm:w-44"
                >
                  <span className="relative block aspect-square overflow-hidden bg-cream-deep">
                    <Image
                      src={p.image}
                      alt={p.caption}
                      fill
                      className="object-cover"
                      sizes="11rem"
                    />
                  </span>
                  <span className="mt-3 block text-center font-display text-sm text-ink-soft">
                    {p.caption}
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-lg text-ink-soft">
            I build because I choose to. No grand mission — just the conviction that if
            I&apos;m spending my time here, it&apos;ll be on things I actually believe in.
            Code that feels right, interfaces that respect the person using them, models
            that do something real. Not because there&apos;s hope or a higher purpose.
            Because this is mine to decide.
          </p>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { scale: 0.9, rotate: -2, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-paper p-4 pb-6 shadow-2xl"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  autoFocus
                  className="rounded-full p-1.5 text-xl text-ink-soft hover:bg-cream-deep"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="relative mt-1 aspect-square overflow-hidden bg-cream-deep">
                <Image
                  src={active.image}
                  alt={active.caption}
                  fill
                  className="object-cover"
                  sizes="24rem"
                />
              </div>
              <h3 className="mt-4 text-center font-display text-lg font-bold">
                {active.caption}
              </h3>
              <p className="mt-2 text-center text-sm text-ink-soft">{active.story}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
