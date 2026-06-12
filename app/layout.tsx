import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteConfig from '@/data/siteConfig';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.SITE_NAME} — Professional Cleaning Services in ${siteConfig.SITE_CITY}, ${siteConfig.SITE_STATE}`,
    template: `%s | ${siteConfig.SITE_NAME}`,
  },
  description: siteConfig.SITE_DESC,
  metadataBase: new URL(siteConfig.SITE_URL),
  openGraph: {
    siteName: siteConfig.SITE_NAME,
    type: 'website',
    images: [{ url: siteConfig.SITE_OG_IMAGE }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Custom compiled CSS — served as static file from /public */}
        <link rel="stylesheet" href="/assets/css/output.css" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Performance hints */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      </head>
      <body className="bg-white text-forest font-sans antialiased overflow-x-hidden">

        {/* Loader */}
        <div id="ldr" aria-hidden="true">
          <div className="ldr-inner">
            <span className="ldr-brand">
              {siteConfig.SITE_NAME}<span style={{ color: 'var(--mint)' }}>.</span>
            </span>
            <div className="ldr-track"><div className="ldr-fill"></div></div>
            <span className="ldr-sub">{siteConfig.SITE_TAGLINE}</span>
          </div>
        </div>

        {/* Custom cursor */}
        <div id="cur"  aria-hidden="true"></div>
        <div id="cur2" aria-hidden="true"></div>

        <Navbar />
        {children}
        <Footer />

        {/* GSAP + Lenis — loaded after interactive so they don't block render */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"            strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"   strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"  strategy="afterInteractive" />
        <Script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"                          strategy="afterInteractive" />
        <Script src="/assets/js/main.js"                                                          strategy="afterInteractive" />
      </body>
    </html>
  );
}
