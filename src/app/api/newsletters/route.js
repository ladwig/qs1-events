import fs from 'node:fs';
import path from 'node:path';

// Evaluated at build time, served as a static file — no runtime fs on Vercel.
export const dynamic = 'force-static';

// 2.html = July 2026, and each following number is the next month.
// ponytail: breaks if a month is ever skipped — hardcode that one label here if it happens.
const ANCHOR = { n: 2, year: 2026, month: 6 }; // month is 0-based

export function GET() {
  const items = fs
    .readdirSync(path.join(process.cwd(), 'public/newsletter'))
    .map((f) => /^(\d+)\.html$/.exec(f))
    .filter(Boolean)
    .map((m) => Number(m[1]))
    .sort((a, b) => b - a)
    .map((n) => ({
      file: `${n}.html`,
      label: new Date(ANCHOR.year, ANCHOR.month + n - ANCHOR.n).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    }));

  return Response.json(items);
}
