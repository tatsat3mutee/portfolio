// Generates public/og/default.png (1200x630 share image). Run: npm run og
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
mkdirSync('public/og', { recursive: true });
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="a" cx="0.78" cy="0.15" r="0.6"><stop offset="0" stop-color="#fc8b55" stop-opacity="0.55"/><stop offset="1" stop-color="#fc8b55" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="0.95" cy="0.85" r="0.5"><stop offset="0" stop-color="#ef6f8f" stop-opacity="0.4"/><stop offset="1" stop-color="#ef6f8f" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#fdba96"/><stop offset="0.5" stop-color="#fc8b55"/><stop offset="1" stop-color="#ef6f8f"/></linearGradient>
    <pattern id="d" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#ffffff" fill-opacity="0.08"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="#0c0b0e"/>
  <rect width="1200" height="630" fill="url(#d)"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <rect width="1200" height="630" fill="url(#b)"/>
  <text x="80" y="120" font-family="DejaVu Sans Mono, monospace" font-size="22" letter-spacing="5" fill="#aaa29a">TATSAT PANDEY</text>
  <text x="80" y="260" font-family="Helvetica, Arial, sans-serif" font-size="88" font-weight="600" letter-spacing="-3" fill="#f4efe9">I build <tspan font-family="Georgia, serif" font-style="italic" font-weight="400" fill="url(#t)">AI agents</tspan></text>
  <text x="80" y="370" font-family="Helvetica, Arial, sans-serif" font-size="88" font-weight="600" letter-spacing="-3" fill="#f4efe9">and write <tspan font-family="Georgia, serif" font-style="italic" font-weight="400" fill="url(#t)">poetry.</tspan></text>
  <text x="80" y="470" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#aaa29a">Multi-agent systems · RAG · developer tools · Khwaab-e-Surkhaab</text>
  <text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#fdba96">tatsatpandey.com</text>
</svg>`;
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og/default.png');
console.log('public/og/default.png written');
