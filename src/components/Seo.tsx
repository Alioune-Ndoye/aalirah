import { Head } from 'vite-react-ssg';
import { site } from '../lib/site';
import { abs } from '../lib/seo';

type Props = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
};

/** Per-route <head>: title, description, canonical, Open Graph + Twitter. */
export default function Seo({ title, description, path, image, type = 'website', noindex }: Props) {
  const url = abs(path);
  const img = image || site.ogImage;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      <meta name="geo.region" content={`US-${site.state}`} />
      <meta name="geo.placename" content={`${site.city}, ${site.stateFull}`} />
    </Head>
  );
}

/** Inline JSON-LD. Rendered in the body — Google reads structured data anywhere
 *  in the document, and this serializes reliably under static pre-rendering. */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
