/* Generates public/sitemap.xml from the route data so it never drifts.
   Run automatically before build (see package.json). */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const read = (p) => readFileSync(resolve(root, p), 'utf8');
const slugs = (file) => [...read(file).matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const SITE_URL = (read('src/lib/site.ts').match(/url:\s*'([^']+)'/) || [])[1]?.replace(/\/$/, '') || 'https://www.aalirah.com';
const services = slugs('src/lib/data.ts');
const areas = slugs('src/lib/areas.ts');
const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  ['/', 'weekly', '1.0'],
  ['/services', 'monthly', '0.9'],
  ['/pricing', 'monthly', '0.85'],
  ['/book', 'monthly', '0.8'],
  ['/reviews', 'monthly', '0.7'],
  ['/how-it-works', 'monthly', '0.6'],
  ['/about', 'monthly', '0.6'],
  ['/privacy', 'yearly', '0.2'],
  ['/terms', 'yearly', '0.2'],
  // NOTE: /guarantee and /specials are admin-gated (hidden until enabled in
  // the dashboard) — re-add them here when those pages go live.
  // Private/noindex pages (login, signup, account, crew, admin, review) are
  // deliberately excluded.
];

const url = (loc, freq, pri) =>
  `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;

const entries = [
  ...staticPages.map(([loc, f, p]) => url(loc, f, p)),
  ...services.map((s) => url(`/services/${s}`, 'monthly', '0.8')),
  ...areas.map((a) => url(`/cleaning/${a}`, 'monthly', '0.7')),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
writeFileSync(resolve(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml: ${entries.length} URLs (${services.length} services, ${areas.length} areas)`);
