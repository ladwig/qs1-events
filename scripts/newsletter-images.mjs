// Extracts each newsletter page as a JPG, so the TV slideshow can load pages
// directly instead of the 12 MB HTML. Runs on every build (prebuild).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public/newsletter');
const outDir = path.join(dir, 'pages');

fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(dir).filter((f) => /^\d+\.html$/.test(f))) {
  const n = file.replace('.html', '');
  const html = fs.readFileSync(path.join(dir, file), 'utf8');

  // ponytail: page images are the big ones; anything under 100 KB is an icon.
  const pages = [...html.matchAll(/data:image\/(?:png|jpe?g);base64,([A-Za-z0-9+/=]+)/g)]
    .map((m) => m[1])
    .filter((b64) => b64.length > 140_000);

  if (!pages.length) throw new Error(`${file}: no page images found`);

  for (const [i, b64] of pages.entries()) {
    const out = path.join(outDir, `${n}-page${i + 1}.jpg`);
    if (fs.existsSync(out)) continue;
    await sharp(Buffer.from(b64, 'base64'))
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toFile(out);
    console.log(`${path.basename(out)}  ${Math.round(fs.statSync(out).size / 1024)} KB`);
  }
}
