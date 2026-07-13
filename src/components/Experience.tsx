import { motion } from "framer-motion";
import { workExperience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 sm:px-10">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Experience
        </h2>

        <ol className="mt-10 space-y-6">
          {workExperience.map((job, i) => (
            <motion.li
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-ink/10 bg-paper p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-bold">
                  {job.role} · <span className="text-clay">{job.company}</span>
                </h3>
                <p className="text-sm text-ink-faint">{job.period}</p>
              </div>
              <p className="mt-3 text-ink-soft">{job.summary}</p>
              {job.highlights.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-ink-soft">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
