// Generates the 1200x630 share images in public/og/. Run: npm run og
// TODO(Tatsat): when the real cover art exists, use it for og/khwaab.png instead.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('public/og', { recursive: true });

const khwaab = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3a1f3f"/><stop offset="0.5" stop-color="#c63a7c"/>
    <stop offset="0.8" stop-color="#e2582f"/><stop offset="1" stop-color="#f3a953"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#s)"/>
  <circle cx="900" cy="420" r="150" fill="#ffd28a" opacity="0.9"/>
  <path d="M0 460 Q300 410 600 450 T1200 430 V630 H0Z" fill="#3a1f3f"/>
  <rect y="520" width="1200" height="110" fill="#24152d"/>
  <g fill="#e2408a"><circle cx="1110" cy="70" r="26"/><circle cx="1150" cy="120" r="20"/><circle cx="1070" cy="130" r="18"/><circle cx="1170" cy="50" r="18"/></g>
  <text x="80" y="230" font-family="Georgia, serif" font-size="86" font-weight="700" fill="#fbead3">Khwaab-e-Surkhaab</text>
  <text x="80" y="310" font-family="Georgia, serif" font-style="italic" font-size="44" fill="#ffd28a">Kuch khwaab abhi baaki hain…</text>
  <text x="80" y="585" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#fbead3">Hindi poetry podcast · tatsatpandey.com/khwaab</text>
</svg>`;

const def = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f7f3ec"/>
  <rect x="0" y="560" width="1200" height="70" fill="#24152d"/>
  <circle cx="1020" cy="300" r="140" fill="#f3a953"/>
  <rect x="880" y="300" width="300" height="260" fill="#f7f3ec"/>
  <text x="80" y="250" font-family="Georgia, serif" font-size="96" font-weight="700" fill="#1c1814">Tatsat Pandey</text>
  <text x="80" y="330" font-family="Helvetica, Arial, sans-serif" font-size="38" fill="#5f564d">GenAI platforms · Developer tooling · Hindi poetry</text>
  <text x="80" y="605" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#fbead3">tatsatpandey.com</text>
</svg>`;

await sharp(Buffer.from(khwaab)).png({ compressionLevel: 9 }).toFile('public/og/khwaab.png');
await sharp(Buffer.from(def)).png({ compressionLevel: 9 }).toFile('public/og/default.png');
console.log('OG images written to public/og/');
