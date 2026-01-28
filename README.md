## BMON (static site)

This repo deploys a static Framer-exported site from `public/`.

### Local preview

From the repo root:

```bash
cd public
python -m http.server 3000
```

Open `http://localhost:3000`.

### Deploy (Vercel)

- `vercel.json` sets `public/` as the output directory and rewrites all routes to `index.html` so deep links like `/pricing` work.
