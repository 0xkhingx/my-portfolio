# Setup notes

## Run it
```bash
npm install
npm run dev
```

## Drop in your real content (all in one place)
- **Icons** — put your 46 SVG React components in `src/icons/` and re-export
  from `src/icons/index.tsx`. The only contract: accept `SVGProps<SVGSVGElement>`,
  render at `1em`, use `currentColor`. Then point `src/data/skills.ts` at them.
- **Projects** — `src/data/projects.ts` + screenshots in `public/images/`
  (replace the placeholder SVGs; any raster format works with next/image).
- **Polaroids & experience** — `src/data/experience.ts`.
- **Copy** — Hero tagline in `src/components/Hero.tsx`, About paragraph in
  `src/components/About.tsx`.

## Contact form
Validation is done; sending is stubbed in `src/components/Contact.tsx`
(`handleSubmit`). Wire it to a Next.js route handler, Formspree, or Resend.

## Fonts
Lexend loads via `next/font`. Bitcount isn't in next/font's registry yet, so
it's a `<link>` in `src/app/layout.tsx`. If you self-host it later, swap to
`next/font/local` and update `--font-display` in `globals.css`.

## Accessibility already handled
Reduced motion is respected everywhere (carousel stops auto-rotating, marquee
freezes, reveals become fades), the carousel pauses on hover/focus, the modal
closes on Escape, and focus states are visible on cream.
