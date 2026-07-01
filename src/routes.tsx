import type { RouteRecord } from 'vite-react-ssg';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServicePage from './pages/ServicePage';
import About from './pages/About';
import Book from './pages/Book';
import Pricing from './pages/Pricing';
import Reviews from './pages/Reviews';
import LeaveReview from './pages/LeaveReview';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import Account from './pages/Account';
import HowItWorks from './pages/HowItWorks';
import Guarantee from './pages/Guarantee';
import Specials from './pages/Specials';
import LegalPage from './pages/LegalPage';
import AreaPage from './pages/AreaPage';
import NotFound from './pages/NotFound';
import { areas } from './lib/areas';
import { services } from './lib/data';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      // Per-service keyword pages (literal paths → pre-rendered)
      ...services.map((s) => ({ path: `services/${s.slug}`, element: <ServicePage slug={s.slug} /> })),
      { path: 'pricing', element: <Pricing /> },
      { path: 'reviews', element: <Reviews /> },
      // Post-service review link sent to customers (write a review and/or record a video)
      { path: 'review', element: <LeaveReview /> },
      // Admin CRM dashboard (token-gated) — bookings + review moderation
      { path: 'admin', element: <AdminDashboard /> },
      // Customer accounts
      { path: 'login', element: <Auth mode="login" /> },
      { path: 'signup', element: <Auth mode="signup" /> },
      { path: 'account', element: <Account /> },
      { path: 'how-it-works', element: <HowItWorks /> },
      { path: 'guarantee', element: <Guarantee /> },
      { path: 'specials', element: <Specials /> },
      { path: 'about', element: <About /> },
      { path: 'book', element: <Book /> },
      { path: 'privacy', element: <LegalPage kind="privacy" /> },
      { path: 'terms', element: <LegalPage kind="terms" /> },
      // Local service-area landing pages (literal paths → pre-rendered)
      ...areas.map((a) => ({ path: `cleaning/${a.slug}`, element: <AreaPage slug={a.slug} /> })),
      { path: '*', element: <NotFound /> },
    ],
  },
];
