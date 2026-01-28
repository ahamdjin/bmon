## BMON (marketing site)

Next.js + Tailwind marketing site (Vercel-ready).

### Local dev

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Pages

- `/` (home)
- `/pricing`
- `/integrations`
- `/partners`
- `/features/[slug]`
- `/terms`
- `/privacy`

### Notes

- Images are hotlinked from `framerusercontent.com` to keep parity with the reference layout.
- Demo scheduling uses the GoHighLevel embed (`links.bmon.ai`) on the home page.

### Deploy

Push to GitHub and import into Vercel. Vercel detects Next.js automatically.
