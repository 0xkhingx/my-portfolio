# Setup notes

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # eslint (flat config in eslint.config.mjs)
npm run build    # production build
```

## Where the content lives
- **Icons** — SVG React components in `src/icons/`, re-exported from
  `src/icons/index.tsx`. The contract: accept `SVGProps<SVGSVGElement>`, spread
  the props onto the `<svg>`, use `currentColor`, and stay decorative
  (`aria-hidden="true"`, no `<title>`). `src/data/skills.ts` maps to them by key.
- **Projects** — `src/data/projects.ts` + screenshots in `public/projects/`.
- **Polaroids & experience** — `src/data/experience.ts`. Each polaroid needs an
  `alt` describing the photo; `caption` is decorative.
- **Copy** — Hero tagline in `src/components/Hero.tsx`, About paragraph in
  `src/components/About.tsx`.

## Images
Everything on the page renders through `next/image`, including the hero
portrait. Keep source files in `public/` under ~1600px.

## Contact form
Posts to Formspree (`https://formspree.io/f/xdaqnvke`) from
`src/components/Contact.tsx`, with `Accept: application/json` so the response is
JSON rather than a redirect. Failures surface an inline error with a mailto
fallback. There is no spam protection yet — a honeypot field or Formspree's
captcha would be the next step.

## Theming
`@theme` in `src/app/globals.css` defines the palette; the `.dark` block swaps
the values, so most components need no `dark:` variant. `--color-island` and
`--color-island-fg` are the navbar's own pair and invert with the page.

The theme is a class on `<html>`, applied by an inline script in
`src/app/layout.tsx` before first paint and toggled from
`src/components/ThemeToggle.tsx`.

## Metadata
`src/app/opengraph-image.tsx` and `src/app/icon.tsx` generate the social card and
favicon at build time via `next/og`. `metadataBase` in `src/app/layout.tsx` must
point at the production origin for the OG image URL to resolve.

## Fonts
Lexend loads via `next/font`. Bitcount is not in `next/font`'s registry, so it is
a `<link>` in `src/app/layout.tsx`. To self-host, switch to `next/font/local` and
update `--font-display` in `globals.css`.

## Accessibility
- Reduced motion is honoured in the carousel, polaroid arc, navbar, and skills
  marquee. The marquee and framer-motion are JS-driven, so the
  `prefers-reduced-motion` block in `globals.css` does not reach them —
  components opt out with `useReducedMotion()`. New JS animation should do the same.
- Icons are decorative: no `<title>` element, `aria-hidden="true"` by default,
  overridable through the props spread.
- The carousel pauses on hover and focus, the modal closes on Escape, and
  `section[id]` carries `scroll-margin-top` so anchors clear the fixed navbar.
