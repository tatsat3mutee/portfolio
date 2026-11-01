// Generates the default 1200x630 share image in public/og/. Run: npm run og
// og/khwaab.png comes from the cover art: node design/cover/render.cjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('public/og', { recursive: true });

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

await sharp(Buffer.from(def)).png({ compressionLevel: 9 }).toFile('public/og/default.png');
console.log('OG images written to public/og/');
