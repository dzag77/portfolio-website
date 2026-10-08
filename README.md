# Denys Zagorodny — Portfolio

Static portfolio site (plain HTML, CSS and JavaScript), built from the Portfolio-DS Figma file.

- `site/` — the website: `index.html` (home), `project.html` (HQ case study), `styles.css`, `app.js`, `assets/`
- `site/_redirects` — keeps old addresses (/hq-redesign, /work, /about, old CV link) working
- `design-system/` — design-system export notes (not part of the site build)

## Preview locally

Open `site/index.html` in a browser, or run `npm run dev`.

## Build

```bash
npm run build
```

Copies `site/` to `dist/`. Cloudflare (Workers Builds) then runs `npx wrangler deploy` on `main`, or `npx wrangler versions upload` on other branches for a preview link, using `wrangler.jsonc` (Worker `portfolio-website`, assets in `dist/`). There are no npm dependencies.

## Update the resume

Replace `site/assets/resume-denys-2026.pdf` (keep the file name).
