import { Helmet } from '@dr.pogodin/react-helmet';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Process from '@/components/home/Process';
import Proposals from '@/components/home/Proposals';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';
import { services } from '@/lib/i18n';
import { whatsappNumbers } from '@/lib/contact';

const SITE = 'https://kurdistanserviceteam.com';
const TITLE = 'Kurdistan Service Team — تیمی خزمەتگوزاری کوردستان';
const DESC =
  'Kurdistan Service Team (KST): turnkey engineering, general contracting, HVAC, electrical, medical rooms and IT systems in Erbil, Kurdistan Region.';

// Tells search engines who the company is, where it is and how to reach it
const business = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${SITE}/#business`,
  name: 'Kurdistan Service Team',
  alternateName: ['KST', 'تیمی خزمەتگوزاری کوردستان', 'تيم خدمة كردستان'],
  url: `${SITE}/`,
  logo: `${SITE}/assets/kst-logo.png`,
  image: `${SITE}/assets/og-image.jpg`,
  description: DESC,
  telephone: whatsappNumbers.map((p) => p.replace(/\s/g, '')),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Swiss Mall, Pirmam',
    addressLocality: 'Erbil',
    addressRegion: 'Kurdistan Region',
    addressCountry: 'IQ',
  },
  areaServed: { '@type': 'AdministrativeArea', name: 'Kurdistan Region, Iraq' },
  knowsLanguage: ['ckb', 'ar', 'en'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name.en, description: s.desc.en },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content="Turnkey engineering in Kurdistan Region: construction, HVAC, electrical, medical rooms and IT systems." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/`} />
        <meta property="og:image" content={`${SITE}/assets/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kurdistan Service Team" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#0b1b2e" />
        <script type="application/ld+json">{JSON.stringify(business).replace(/</g, '\\u003c')}</script>
      </Helmet>
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Services />
        <Process />
        <Proposals />
        <Clients />
        <Contact />
      </main>
    </>
  );
}
