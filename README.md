# Aalirah — React

The Aalirah cleaning-service site, rebuilt as a single-page React app (was PHP).

## Stack
- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`) + a ported design-system in `src/index.css`
- **React Router** for `/`, `/services`, `/about`, `/book`
- **Framer Motion** for entrance/scroll/step animations
- **Lenis** for smooth scrolling (auto-disabled under `prefers-reduced-motion`)

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # serve the build
```

## Structure
```
src/
  lib/        site config + all page content/data (single source of truth)
  components/ Navbar, Footer, Loader, Icon, Reveal, Rail, BeforeAfter, Counter, …
  sections/   Home-page sections (Hero, ServicesGrid, WhyUs, Showcase, Testimonials, Faq, Contact)
  pages/      Home, Services, About, Book, NotFound
public/assets video + images (served at /assets/…)
```

## What changed vs. the PHP site
- Brand unified to **Aalirah** (config/logo/email were inconsistent).
- Hours corrected from "PST" → **ET** (West Hartford is Eastern).
- Testimonials localized to Connecticut (were Beverly Hills / Malibu / Bel Air).
- Booking is now a **3-step wizard with a live price estimate** instead of a static form.
- Added a visible **FAQ accordion** (the PHP site only had FAQ schema, no UI).
- Accessibility: keyboard focus rings, an accessible before/after slider, reduced-motion support.

## Pages
`/` · `/services` · `/pricing` · `/about` · `/book` · `/privacy` · `/terms`
· `/cleaning/<town>-ct` (local landing pages) · 404

## SEO
- Static pre-rendering (vite-react-ssg) — every route ships real HTML.
- Per-route `<title>`/meta/canonical/Open Graph + JSON-LD (LocalBusiness, WebSite,
  FAQ, Services, per-town Service, breadcrumbs). `public/sitemap.xml` + `robots.txt`.

## Going live — set these in `src/lib/site.ts`
| Field | What it does |
|---|---|
| `url` | Your real domain — also update `public/sitemap.xml` + `public/robots.txt` |
| `phone` / `email` / `social.*` | Real business contact info (currently placeholders) |
| `web3formsKey` **or** `formEndpoint` | Where booking/contact/newsletter leads are delivered. Web3Forms is free + needs no backend (https://web3forms.com). With neither set, forms fall back to the visitor's email client. |
| `gaId` | GA4 Measurement ID (`G-XXXXXXX`) to turn on analytics + lead tracking |
| `ogImage` | A branded 1200×630 share image (optional) |

Also: deploy with SPA history fallback (Vercel/Netlify/Cloudflare Pages do this
automatically), submit `sitemap.xml` to Google Search Console, and set up a
Google Business Profile — the biggest local-ranking lever.
