import { GitHubIcon, EmailIcon } from "@/icons";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
        <p className="font-display text-sm text-ink-soft">
          © {new Date().getFullYear()} 0xkhingx · Oluwadamilare
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/0xkhingx"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-xl text-ink-soft transition-colors hover:text-ink"
          >
            <GitHubIcon />
          </a>
          <a
            href="#contact"
            aria-label="Contact"
            className="text-xl text-ink-soft transition-colors hover:text-ink"
          >
            <EmailIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
