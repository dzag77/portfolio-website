# Denys Zagorodny — Portfolio

Static portfolio site (plain HTML, CSS and JavaScript), built from the Portfolio-DS Figma file.

- `site/` — the website: `index.html` (home), `project.html` (HQ case study), `styles.css`, `app.js`, `assets/`
- `site/_redirects` — keeps old addresses (/hq-redesign, /work, /about, old CV link) working on Cloudflare Pages
- `design-system/` — design-system export notes (not part of the site build)

## Preview locally

Open `site/index.html` in a browser, or run `npm run dev`.

## Build

```bash
npm run build
```

Copies `site/` to `dist/`, which Cloudflare Pages publishes (build command `npm run build`, output directory `dist`). There are no dependencies.

## Update the resume

Replace `site/assets/resume-denys-2026.pdf` (keep the file name).
