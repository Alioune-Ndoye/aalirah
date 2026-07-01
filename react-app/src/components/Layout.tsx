import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';
import Loader from './Loader';
import MobileCTA from './MobileCTA';
import ErrorBoundary from './ErrorBoundary';
import Analytics from './Analytics';
import { JsonLd } from './Seo';
import { globalLd } from '../lib/seo';
import { AuthProvider } from '../lib/auth';

export default function Layout() {
  return (
    <AuthProvider>
      <SmoothScroll>
        {/* Site-wide LocalBusiness + WebSite structured data (every page) */}
        <JsonLd data={globalLd()} />
        <Analytics />
        <Loader />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
        <MobileCTA />
      </SmoothScroll>
    </AuthProvider>
  );
}
