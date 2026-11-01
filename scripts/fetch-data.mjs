// Runs before every build (npm run build -> prebuild).
// Pulls the latest podcast episodes (Hubhopper RSS) and GitHub repos so the
// site is never stale. If a fetch fails, the saved snapshot in src/data is kept
// and the build carries on.
import { readFileSync, writeFileSync } from 'node:fs';

const FEED = 'https://feeds.hubhopper.com/0b8cb8ced0074f7a97e38571d24991e7.rss';
const GH_USER = 'tatsat3mutee';
const EP_FILE = new URL('../src/data/episodes.json', import.meta.url);
const GH_FILE = new URL('../src/data/github.json', import.meta.url);

const timeout = (ms) => AbortSignal.timeout(ms);

const decode = (s = '') =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decode(m[1]) : '';
};

const toSeconds = (d = '') => {
  if (/^\d+$/.test(d)) return Number(d);
  return d.split(':').reduce((acc, p) => acc * 60 + Number(p || 0), 0);
};

// "Kayi Sawal | By Tatsat Pandey | Episode 31" -> title, subtitle, number
export function cleanTitle(raw) {
  let number = null;
  const keep = [];
  for (let part of raw.split('|').map((p) => p.trim())) {
    const m = part.match(/episode\s*(\d+)/i);
    if (m) {
      number = Number(m[1]);
      part = part.replace(/episode\s*\d+/i, '').replace(/^[\s-]+|[\s-]+$/g, '');
    }
    if (/tatsat\s*pandey/i.test(part)) continue;
    if (part) keep.push(part);
  }
  return { title: keep[0] || raw, subtitle: keep.slice(1).join(' · ') || null, number };
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

export function parseFeed(xml, old) {
  const items = xml.split(/<item[\s>]/i).slice(1);
  const appleByTitle = new Map(old.episodes.map((e) => [e.title.toLowerCase(), e.appleUrl]));
  const eps = items
    .map((item) => {
      const audio = (item.match(/<enclosure[^>]*url="([^"]+)"/i) || [])[1];
      const { title, subtitle, number } = cleanTitle(tag(item, 'title'));
      const date = new Date(tag(item, 'pubDate'));
      return {
        slug: slugify(title),
        title,
        subtitle,
        number,
        date: isNaN(date) ? null : date.toISOString(),
        duration: toSeconds(tag(item, 'itunes:duration')),
        audio: audio ? audio.replace(/&amp;/g, '&') : null,
        appleUrl: appleByTitle.get(title.toLowerCase()) || null,
        description: tag(item, 'description') || tag(item, 'itunes:summary'),
      };
    })
    .filter((e) => e.audio && e.date)
    .sort((a, b) => b.date.localeCompare(a.date));
  if (eps.length === 0) throw new Error('feed had no playable episodes');
  // keep slugs unique
  const seen = new Set();
  for (const e of eps) {
    let s = e.slug, i = 2;
    while (seen.has(s)) s = `${e.slug}-${i++}`;
    e.slug = s;
    seen.add(s);
  }
  return eps;
}

async function episodes() {
  const old = JSON.parse(readFileSync(EP_FILE, 'utf8'));
  const res = await fetch(FEED, { signal: timeout(15000) });
  if (!res.ok) throw new Error(`feed HTTP ${res.status}`);
  const eps = parseFeed(await res.text(), old);
  writeFileSync(EP_FILE, JSON.stringify({ ...old, source: 'rss', fetchedAt: new Date().toISOString(), episodes: eps }, null, 2));
  return eps.length;
}

async function github() {
  const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'tatsatpandey.com-build' },
    signal: timeout(15000),
  });
  if (!res.ok) throw new Error(`GitHub HTTP ${res.status}`);
  const repos = (await res.json()).map((r) => ({
    name: r.name,
    description: r.description,
    language: r.language,
    stars: r.stargazers_count,
    fork: r.fork,
    pushedAt: r.pushed_at,
    homepage: r.homepage,
    url: r.html_url,
    topics: r.topics || [],
  }));
  if (repos.length === 0) throw new Error('no repos returned');
  writeFileSync(GH_FILE, JSON.stringify(repos, null, 2));
  return repos.length;
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) for (const [name, job] of [['episodes', episodes], ['github', github]]) {
  try {
    console.log(`[data] ${name}: ${await job()} fetched`);
  } catch (e) {
    console.log(`[data] ${name}: kept saved snapshot (${e.message})`);
  }
}
