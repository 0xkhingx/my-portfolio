"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EmailIcon } from "@/icons";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent";

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Add your name so I know who's writing.";
  if (!values.email.trim()) {
    errors.email = "Add an email so I can reply.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "That email doesn't look complete — check for a typo.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Tell me a little more — at least a sentence.";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (field: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const handleBlur = (field: keyof typeof values) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xdaqnvke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  const field =
    "w-full rounded-2xl border bg-paper px-4 py-3 text-ink placeholder:text-ink-faint transition-colors focus:outline-none";
  const ok = "border-ink/15 focus:border-ink";
  const bad = "border-red-700/60 focus:border-red-700";

  return (
    <section id="contact" className="px-6 py-24 sm:px-10">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Say hello
        </h2>
        <p className="mt-2 text-ink-soft">
          A project, a role, or just a good idea — my inbox is open.
        </p>

        {status === "sent" ? (
          <div className="mt-10 rounded-3xl border border-moss/40 bg-paper p-8 text-center">
            <EmailIcon className="mx-auto text-3xl text-moss" aria-hidden />
            <h3 className="mt-3 font-display text-xl font-bold">Message sent</h3>
            <p className="mt-2 text-ink-soft">
              Thanks, {values.name.split(" ")[0]} — I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="Ada Lovelace"
                className={`${field} ${errors.name ? bad : ok}`}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-800">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="you@example.com"
                className={`${field} ${errors.email ? bad : ok}`}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-800">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange("message")}
                onBlur={handleBlur("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="What are we building?"
                className={`${field} resize-y ${errors.message ? bad : ok}`}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-800">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-ink px-6 py-3.5 font-medium text-cream transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
