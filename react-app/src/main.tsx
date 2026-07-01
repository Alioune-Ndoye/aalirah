import './index.css';
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';

// Static-site generation entry. ViteReactSSG builds the router from `routes`,
// pre-renders each path to HTML at build time, and hydrates on the client.
export const createRoot = ViteReactSSG({ routes });
