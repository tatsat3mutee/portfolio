// Runs after `vite build`. Gives every episode its own address, e.g.
// tatsatpandey.com/khwaab/agar-tum/, with its own title and share preview
// (WhatsApp, Instagram DMs, LinkedIn). The page opens with that episode loaded.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://tatsatpandey.com';
const base = readFileSync('dist/khwaab/index.html', 'utf8');
const { episodes } = JSON.parse(readFileSync('src/data/episodes.json', 'utf8'));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const setMeta = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${esc(value)}$2`);

for (const ep of episodes) {
  const url = `${SITE}/khwaab/${ep.slug}/`;
  const title = `${ep.title}${ep.subtitle ? ` | ${ep.subtitle}` : ''} · Khwaab-e-Surkhaab`;
  const desc = (ep.description || 'A Hindi poem by Tatsat Pandey.').replace(/\s+/g, ' ').slice(0, 200);
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, 'name', 'description', desc);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', desc);
  html = setMeta(html, 'property', 'og:url', url);
  mkdirSync(`dist/khwaab/${ep.slug}`, { recursive: true });
  writeFileSync(`dist/khwaab/${ep.slug}/index.html`, html);
}
console.log(`[pages] ${episodes.length} episode pages written`);
