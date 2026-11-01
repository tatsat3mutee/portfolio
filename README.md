# tatsatpandey.com

Personal site: engineering work, projects, research, and the Hindi poetry podcast **Khwaab-e-Surkhaab** (`/khwaab`).
Built with [Astro](https://astro.build). Output is plain static files in `dist/`, so it runs on Render, Caddy/EC2, S3 or any static host.

## Run locally

```bash
npm ci
npm run dev      # http://localhost:4321
npm run build    # type-check + build to dist/
```

## Add a new episode (about 5 minutes)

1. Copy `src/content/episodes/agar-tum.md` to `src/content/episodes/<slug>.md`. The file name becomes the URL: `/khwaab/<slug>`.
2. Fill in `title`, `subtitle`, `date` (YYYY-MM-DD), `description` (one line) and `youtubeId` (the part after `watch?v=`). Write the episode notes as the Markdown body. Direct episode links are optional; empty ones fall back to the show page. Poem text goes in `poem` and only appears if `showPoem: true`.
3. Commit and push to `main`. Render rebuilds automatically.

The newest episode (by `date`) is shown first on `/khwaab`. The Spotify and Apple players on that page always show the newest episodes without any change.

## Where things live

| What | File |
|---|---|
| All external links (empty = button hidden) | `src/config/links.ts` |
| Colors, fonts, spacing | `src/styles/tokens.css` |
| Work / projects / episodes | `src/content/{work,projects,episodes}/*.md` |
| Recognitions | `src/data/recognitions.ts` |
| Show cover art (source) | `design/cover/cover.html` |
| Cover for podcast platforms | `design/cover/out/cover-3000.jpg`, `cover-1400.jpg` |
| Share images (1200×630) | `public/og/` |

Regenerate the cover, site cover images and `/khwaab` share image with `node design/cover/render.cjs` (needs Playwright). Regenerate the default share image with `npm run og`.

Search the repo for `TODO(Tatsat)` to find details still to fill in.

## Deploy on Render

Render dashboard → **New → Static Site** → pick this repo.

- Build command: `npm ci && npm run build`
- Publish directory: `dist`

Or use **New → Blueprint**, which reads `render.yaml` (same settings plus cache headers). Moving to EC2 + Caddy later needs no code changes.
