# tatsatpandey.com

Personal site: GenAI engineering work and the Hindi poetry podcast **Khwaab-e-Surkhaab** (`/khwaab`).

Built with React, Vite, [Motion](https://motion.dev) (animation) and [Lenis](https://lenis.darkroom.engineering) (smooth scroll). Output is static files in `dist/`, so it runs on Render, Caddy/EC2 or any static host.

## Run locally

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # fetches fresh data, type-checks, builds to dist/
```

## It updates itself

Every build (every push to `main` on Render) runs `scripts/fetch-data.mjs` first:

- **Podcast episodes** come from the Hubhopper RSS feed. A new episode appears on the site, in the player and in the episode list after the next deploy, with no code change.
- **GitHub activity** (language, stars, "updated 3d ago", the "More on GitHub" list) comes from the GitHub API.

If either source is unreachable, the saved copies in `src/data/*.json` are used and the build still succeeds.

To refresh without code changes, trigger a manual deploy in Render (or push any commit).

## Common edits

| What | Where |
|---|---|
| Links, socials, podcast platforms, email | `src/data/site.ts` |
| Selected projects (which repos, order, text) | `projects` in `src/data/site.ts` |
| Recognitions, tech marquee | `src/data/site.ts` |
| YouTube video shown on /khwaab | `podcast.latestVideoId` in `src/data/site.ts` |
| Colors, fonts, spacing | top of `src/styles.css` |
| Default share image | `npm run og` → `public/og/default.png` |

### Resume

Add your resume as **`public/resume.pdf`** (for example by uploading it in GitHub's web UI). The Resume buttons appear automatically on the next deploy, and stay hidden while the file is missing.

### Links to share

- **The show:** `tatsatpandey.com/khwaab` (its own page, good for the Instagram bio). `tatsatpandey.com/poetry` redirects there too.
- **One episode:** `tatsatpandey.com/khwaab/<episode>/`, for example `tatsatpandey.com/khwaab/agar-tum/`. Each episode page is generated on every build, opens with that episode in the player, and has its own share preview. The Share button next to each episode copies this link.

## Deploy on Render

Static Site, branch `main`:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`

Old addresses (`/work`, `/projects`, `/research`) redirect to the new sections.
