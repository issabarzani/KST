import { Helmet } from '@dr.pogodin/react-helmet';
import { HTML_LANG, LANGS, localize, type Lang } from '@/lib/lang-context';

export const SITE = 'https://kurdistanserviceteam.com';
const OG_LOCALE: Record<Lang, string> = { ku: 'ckb_IQ', en: 'en_US', ar: 'ar_IQ' };

/** Absolute address of a page in a language, e.g. abs('/services/hvac', 'en') */
export const abs = (path: string, lang: Lang) => {
  const p = localize(path, lang);
  return p === '/' ? `${SITE}/` : `${SITE}${p}`;
};

/**
 * Title, description, social preview, language alternates and structured data for one page.
 * `path` is the Kurdish (default) address; the English and Arabic ones are derived from it.
 * The canonical link itself is added by the server for the exact address that was rendered.
 */
export default function PageSeo({
  path,
  lang,
  title,
  description,
  jsonLd,
}: {
  path: string;
  lang: Lang;
  title: string;
  description: string;
  jsonLd?: object;
}) {
  const url = abs(path, lang);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE}/assets/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Kurdistan Service Team" />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#0b1b2e" />
      {LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={HTML_LANG[l][0]} href={abs(path, l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={abs(path, 'ku')} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>}
    </Helmet>
  );
}
