// Renders the cover art from cover.html.
//   design/cover/out/cover-3000.jpg   podcast platforms (3000x3000)
//   design/cover/out/cover-1400.jpg   platforms that want 1400x1400
//   public/khwaab/cover-{480,800,1200}.webp   used on the site
//   public/og/khwaab.png              1200x630 share image
// Run from the repo root: node design/cover/render.cjs
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require('playwright');
const sharp = require('sharp');

(async () => {
  const root = path.resolve(__dirname, '../..');
  const url = 'file://' + path.join(__dirname, 'cover.html');
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
  fs.mkdirSync(path.join(root, 'public/khwaab'), { recursive: true });

  const browser = await chromium.launch();

  const sq = await browser.newPage({ viewport: { width: 1000, height: 1000 }, deviceScaleFactor: 3 });
  await sq.goto(url);
  await sq.evaluate(() => document.fonts.ready);
  const big = await sq.locator('.cover').screenshot({ type: 'png' });

  await sharp(big).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(__dirname, 'out/cover-3000.jpg'));
  await sharp(big).resize(1400).jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(__dirname, 'out/cover-1400.jpg'));
  for (const w of [480, 800, 1200]) {
    await sharp(big).resize(w).webp({ quality: 80 }).toFile(path.join(root, `public/khwaab/cover-${w}.webp`));
  }

  const wide = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await wide.goto(url + '?layout=wide');
  await wide.evaluate(() => document.fonts.ready);
  const og = await wide.locator('.cover').screenshot({ type: 'png' });
  await sharp(og).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(path.join(root, 'public/og/khwaab.png'));

  await browser.close();
  console.log('Cover images written.');
})();
