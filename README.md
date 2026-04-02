# susanbrander-website
Code for my personal website

## Stack

- [Astro](https://astro.build) — static site generator, zero JS by default
- [Tailwind CSS v4](https://tailwindcss.com) — via `@tailwindcss/vite`
- TypeScript (strict mode)
- Deployed on [Vercel](https://vercel.com)

## Development

Requires Node 22 (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Commands

| Command           | Action                              |
|-------------------|-------------------------------------|
| `npm run dev`     | Start dev server with hot reload    |
| `npm run build`   | Build static output to `dist/`      |
| `npm run preview` | Preview the production build locally |
| `npm run check`   | Type-check with `astro check`       |

## Project structure

```
src/
  components/   # Hero, About, Speaking, TechLeadingLadies, Links, Footer
  data/         # speaking.ts — typed talk data
  layouts/      # BaseLayout.astro — HTML shell, meta, OG tags, fonts
  pages/        # index.astro
  styles/       # global.css — design tokens, base styles
public/
  favicon.svg
  images/       # speaking photos
docs/           # Research and profile (not deployed)
```

## Deploy

The site is live on Vercel. The GitHub repo is connected — every push to `main` deploys automatically.

To deploy: commit your changes and push to `main`.

No `vercel.json` is required. Vercel auto-detects Astro, runs `astro build`, and serves from `dist/`.

## Content updates

| What to update | Where |
|---|---|
| Speaking appearances | `src/data/speaking.ts` |
| Speaking photos | `public/images/` — drop JPEGs in, update `src/components/Speaking.astro` |
| About / hero copy | `src/components/About.astro`, `src/components/Hero.astro` |
| Links | `src/components/Links.astro` |
| Meta / OG tags | `src/pages/index.astro` |
| Colours and fonts | `src/styles/global.css` (`@theme` block) |
