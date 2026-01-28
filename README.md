## BMON (Framer HTML on Vercel via Next.js)

This repo serves the exact Framer-exported `public/index.html` through a tiny Next.js wrapper so Vercel can deploy it reliably (and deep links work).

### How it works

- `public/index.html` is the source of truth (served as-is).
- `middleware.js` rewrites all non-asset routes (e.g. `/pricing`) to `/index.html`.
- `pages/index.js` exists only so Next.js has a `pages/` directory and can build.

### Local dev

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Vercel deploy

- Framework Preset: `Next.js`
- Build Command: `next build` (or leave default)
- Output Directory: leave blank (default `.next`) or set to `.next` if required
