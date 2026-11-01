# Design plan (v1)

No references were in `design/references/` yet, so v1 uses this starting point. Every value lives in `src/styles/tokens.css`, so the look can change without touching components.
Add 4–6 vibrant.design screenshots to `design/references/` (one line each on what you like) and the tokens can be retuned.

**Palette**
- Engineering pages: paper `#f7f3ec`, ink `#1c1814`, muted `#5f564d`, accent `#2f5d50` (dark mode included)
- Khwaab: dusk `#24152d`, ember `#e2582f`, amber `#f3a953`, bougainvillea `#c63a7c`, cream `#fbead3`

**Type:** Fraunces (headings, self-hosted, 36 KB), system sans (body), Caveat (tagline only, 51 KB).

**Layout:** a bento grid on `/` (Work wide, Khwaab tall tile with art, Projects, Research), then recognitions. `/khwaab` has a large dusk hero with art and platform buttons, then the latest episode video, live Spotify/Apple players, the episode list, and an about section.

**Cover art:** `design/cover/cover.html`. A dusk balcony with a lantern, cutting chai, an open notebook and bougainvillea, and a pair of surkhaab (ruddy shelduck) birds crossing the sun. The title is in Devanagari (Rozha One) and Roman (Fraunces), and the tagline is in Caveat. It exports 3000/1400 px squares for podcast platforms, WebP sizes for the site, and the 1200×630 share image.
