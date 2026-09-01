# Property Post Maker by Rashid

A live property marketing post generator. Fill in four fields — **Property &
Type**, **Location**, **Price**, and **Highlights** — and instantly get a
polished, share-ready 1080×1350 (Instagram-portrait) property creative,
automatically branded for **VEDLABS** / Vedant Dhavan. No AI API, backend, or
database involved — everything runs client-side in the browser.

## Features

- Live, instant preview — the creative re-renders as you type, no submit step.
- Premium, editorial real-estate visual design (dark charcoal + gold accents,
  serif display type, architectural line texture) — not a plain form dump.
- Fixed 1080×1350 canvas designed for Instagram/social sharing, exported as a
  crisp PNG (2x pixel density) via a **Download PNG** button that captures
  only the creative, not the surrounding app chrome.
- **Use Sample Data** and **Reset** buttons for quick testing/demoing.
- Sensible empty states (the creative always looks intentional, even before
  you've typed anything) and inline validation for required fields.
- Branding (VEDLABS, Vedant Dhavan, contact number) is baked into the
  creative automatically — the user never has to type it.
- Fully responsive: stacked layout on mobile, form-left/preview-right on
  desktop.
- Accessible: proper `<label>`/`for` pairing, `aria-required`,
  `aria-invalid`, `aria-describedby` on error/helper text, keyboard-only
  operable controls, `aria-live` status messages.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) + TypeScript
- React 19
- Tailwind CSS v4
- [`html-to-image`](https://github.com/bubkoo/html-to-image) for the
  client-side DOM → PNG export
- pnpm as the package manager
- No backend, database, or external API — deploys as a fully static/edge
  Next.js app

## Project structure

```
app/
  layout.tsx        Root layout, fonts (Inter + Playfair Display), metadata
  page.tsx           Page state: form data, validation, sample/reset/download
  globals.css        Tailwind import + design tokens (colors, fonts)
components/
  PropertyForm.tsx   The left-hand input panel (4 fields + actions)
  FormField.tsx      Reusable, accessible labeled input
  PreviewStage.tsx   Responsive scaling wrapper around the creative
  PostPreview.tsx    The actual 1080x1350 marketing creative (export target)
lib/
  types.ts           Shared form data types + empty state
  sample-data.ts      "Use Sample Data" content
  highlights.ts       Parses "3000 sq.ft · Corner plot · Ready to move" into chips
  export-image.ts     PNG export helper (html-to-image wrapper) + filename slug
```

## Local development

Requires Node.js 18.18+ (Node 20 LTS recommended) and
[pnpm](https://pnpm.io/installation).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Edit any field and the
preview on the right updates immediately — no save/refresh needed.

### Other scripts

```bash
pnpm build   # production build
pnpm start   # run the production build locally
pnpm lint    # ESLint (next/core-web-vitals + next/typescript)
```

## How the PNG export works

The creative (`PostPreview`) is always rendered at its true 1080×1350 pixel
size in the DOM. For on-screen preview, a wrapper (`PreviewStage`) scales
that node down with a CSS `transform: scale()` computed from the available
container width (via `ResizeObserver`), so it fits any screen size while the
underlying node's real dimensions — and therefore its typography and layout
— never change.

When you click **Download PNG**, `lib/export-image.ts` waits for web fonts to
finish loading (`document.fonts.ready`) and then rasterizes that same
unscaled node with `html-to-image` at `pixelRatio: 2`, producing a sharp
2160×2700px PNG that matches the on-screen design exactly. Only the creative
node is captured — the form, buttons, and page chrome are never included.

## Customizing branding

Brand name, creator, and contact number are intentionally hard-coded in
`components/PostPreview.tsx` (search for `VEDLABS`, `Vedant Dhavan`, and
`+91 XXXXX XXXXX`) since the user should never need to enter them. Update
those directly to rebrand the tool for a different agent/agency.

## Deploying to Vercel

This is a standard Next.js 15 app with no backend, database, or environment
variables required, so it deploys to [Vercel](https://vercel.com) with zero
extra configuration.

**Option A — Git integration (recommended)**

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Vercel, click **Add New → Project** and import the repo.
3. Vercel auto-detects Next.js. Leave the default build command
   (`pnpm build` / framework preset "Next.js") and output settings as-is.
4. Click **Deploy**.

**Option B — Vercel CLI**

```bash
pnpm add -g vercel   # if you don't already have it
vercel                # first deploy / links the project
vercel --prod         # subsequent production deploys
```

No environment variables, database, or third-party API keys are needed for
any part of this app.

## Notes & assumptions

- The **Property & Type**, **Location**, and **Price** fields are required to
  enable the download (a complete, useful creative needs at least those
  three); **Highlights** is optional but recommended.
- Highlights can be separated with `·`, `|`, or `,` — they're parsed into
  individual pill badges automatically.
- Field lengths are capped (see `maxLength` in `PropertyForm.tsx`) to keep
  the fixed 1080×1350 canvas looking intentional; extremely long input is
  clipped by the canvas's `overflow-hidden` rather than breaking the layout.
