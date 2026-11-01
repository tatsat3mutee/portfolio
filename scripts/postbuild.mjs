// Runs after both Vite builds. For SEO and link previews it:
//  1. pre-renders the home page, /khwaab and one page per episode into real HTML
//  2. adds structured data (schema.org JSON-LD): Person, WebSite, PodcastSeries, PodcastEpisode
//  3. writes sitemap.xml and robots.txt
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const SITE = 'https://tatsatpandey.com';
const { renderHome, renderKhwaab } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const data = JSON.parse(readFileSync('src/data/episodes.json', 'utf8'));
const { episodes } = data;
const art = data.artwork.replace('{w}', '1400').replace('{h}', '1400').replace('{f}', 'jpg');

const PERSON_ID = `${SITE}/#person`;
const SERIES_ID = `${SITE}/khwaab/#podcast`;
const sameAs = [
  'https://github.com/tatsat3mutee',
  'https://www.linkedin.com/in/tatsat-pandey/',
  'https://www.instagram.com/khwaab_e_surkhaab/',
  'https://www.youtube.com/channel/UCDgjJb9UjkElHwt8Lv7sk-w',
];
const platforms = [
  'https://open.spotify.com/show/1OWpKmBSf7qpdkCjpzbmFj',
  'https://podcasts.apple.com/in/podcast/surkhaab/id1548229682',
  'https://www.jiosaavn.com/shows/surkhaab/1/uDRhwF1FnQk_',
  'https://music.amazon.in/podcasts/dc80b6dc-e001-4e5b-9c6c-f50ab83ea90b/surkhaab',
  'https://hubhopper.com/podcast/surkhaab/318827',
  'https://youtube.com/playlist?list=PLZZtHBm9HcLdBKqPOo_umAqZZsjBM7GHe',
];

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Tatsat Pandey',
  url: `${SITE}/`,
  jobTitle: 'GenAI Engineer',
  description: 'GenAI engineer building multi-agent systems, retrieval (RAG) and developer tools, and a Hindi poet who hosts the podcast Khwaab-e-Surkhaab.',
  knowsAbout: ['Generative AI', 'Multi-agent systems', 'Retrieval-augmented generation', 'GraphRAG', 'LangGraph', 'Developer tools', 'Hindi poetry'],
  sameAs,
};
const series = {
  '@type': 'PodcastSeries',
  '@id': SERIES_ID,
  name: 'Khwaab-e-Surkhaab',
  alternateName: ['Surkhaab', 'ख़्वाब-ए-सुर्ख़ाब'],
  url: `${SITE}/khwaab/`,
  description: 'Hindi poems written and narrated by Tatsat Pandey, with a little music. Kuch khwaab abhi baaki hain…',
  image: art,
  inLanguage: 'hi',
  webFeed: 'https://feeds.hubhopper.com/0b8cb8ced0074f7a97e38571d24991e7.rss',
  author: { '@id': PERSON_ID },
  sameAs: platforms,
};
const isoDuration = (s) => `PT${Math.floor(s / 60)}M${Math.round(s % 60)}S`;
const episodeLd = (ep) => ({
  '@type': 'PodcastEpisode',
  '@id': `${SITE}/khwaab/${ep.slug}/#episode`,
  name: ep.subtitle ? `${ep.title} | ${ep.subtitle}` : ep.title,
  url: `${SITE}/khwaab/${ep.slug}/`,
  datePublished: ep.date,
  description: ep.description || undefined,
  inLanguage: 'hi',
  ...(ep.number ? { episodeNumber: ep.number } : {}),
  timeRequired: isoDuration(ep.duration),
  image: art,
  associatedMedia: { '@type': 'MediaObject', contentUrl: ep.audio, duration: isoDuration(ep.duration) },
  partOfSeries: { '@id': SERIES_ID },
  author: { '@id': PERSON_ID },
});
const ld = (graph) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const setMeta = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${esc(value)}$2`);
// Replace the whole #root element (it has a <noscript> fallback inside in the template).
const inject = (html, body, jsonLd) =>
  html
    .replace(/<div id="root">[\s\S]*?<\/noscript>\s*<\/div>/, `<div id="root" data-prerendered="1">${body}</div>`)
    .replace('</head>', `    ${jsonLd}\n  </head>`);
const write = (path, html) => {
  mkdirSync(path.replace(/\/[^/]+$/, ''), { recursive: true });
  writeFileSync(path, html);
};

// 1. home
const homeTpl = readFileSync('dist/index.html', 'utf8');
const website = { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Tatsat Pandey', author: { '@id': PERSON_ID } };
write('dist/index.html', inject(homeTpl, renderHome(), ld([person, website, { ...series, '@id': SERIES_ID }])));

// 2. /khwaab
const kTpl = readFileSync('dist/khwaab/index.html', 'utf8');
write('dist/khwaab/index.html', inject(kTpl, renderKhwaab(null), ld([series, person, ...episodes.slice(0, 10).map(episodeLd)])));

// 3. one page per episode
for (const ep of episodes) {
  const url = `${SITE}/khwaab/${ep.slug}/`;
  const title = `${ep.title}${ep.subtitle ? ` | ${ep.subtitle}` : ''} · Khwaab-e-Surkhaab`;
  const desc = (ep.description || 'A Hindi poem by Tatsat Pandey.').replace(/\s+/g, ' ').slice(0, 200);
  let html = kTpl.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  for (const [attr, key, val] of [
    ['name', 'description', desc],
    ['property', 'og:title', title],
    ['property', 'og:description', desc],
    ['property', 'og:url', url],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', desc],
  ]) html = setMeta(html, attr, key, val);
  write(`dist/khwaab/${ep.slug}/index.html`, inject(html, renderKhwaab(ep.slug), ld([episodeLd(ep), series, person])));
}

// 4. sitemap + robots
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, lastmod: today, priority: '1.0' },
  { loc: `${SITE}/khwaab/`, lastmod: episodes[0]?.date.slice(0, 10) ?? today, priority: '0.9' },
  ...episodes.map((ep) => ({ loc: `${SITE}/khwaab/${ep.slug}/`, lastmod: ep.date.slice(0, 10), priority: '0.7' })),
];
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

rmSync('dist-ssr', { recursive: true, force: true });
console.log(`[postbuild] pre-rendered home, /khwaab and ${episodes.length} episodes; sitemap has ${urls.length} URLs`);
