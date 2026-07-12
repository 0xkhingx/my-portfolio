import { workExperience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Experience
        </h2>

        <ol className="mt-10 space-y-6">
          {workExperience.map((job) => (
            <li
              key={job.id}
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
