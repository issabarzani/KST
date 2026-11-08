import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Process from '@/components/home/Process';
import Proposals from '@/components/home/Proposals';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';
import PageSeo, { abs, SITE } from '@/components/PageSeo';
import { services } from '@/lib/services';
import { whatsappNumbers } from '@/lib/contact';
import { useLang, type Lang } from '@/lib/lang-context';

const TITLE: Record<Lang, string> = {
  ku: 'تیمی خزمەتگوزاری کوردستان (KST) | چارەسەری ئەندازیاری تەواو لە هەولێر',
  en: 'Kurdistan Service Team (KST) | Turnkey engineering in Erbil',
  ar: 'تيم خدمة كردستان (KST) | حلول هندسية متكاملة في أربيل',
};
const DESC: Record<Lang, string> = {
  ku: 'KST لە هەولێر: ساردکەرەوە و هەوا، بیناسازی و نوژەنکردنەوە، کارەبا و سۆلار، هۆڵی نەشتەرگەری، ئامێری پزیشکی، ئایتی، سیستەمی بەڕێوەبردن، پاککردنەوە و ستاف؛ هەمووی بە یەک تیم.',
  en: 'Kurdistan Service Team (KST), Erbil: HVAC, construction and renovation, electrical and solar, operating rooms, medical equipment, IT, management setup, cleaning and staffing, all by one team.',
  ar: 'تيم خدمة كردستان (KST) في أربيل: التكييف، البناء والترميم، الكهرباء والطاقة الشمسية، غرف العمليات، الأجهزة الطبية، تقنية المعلومات، الأنظمة الإدارية، التنظيف والعمالة، بفريق واحد.',
};

export default function HomePage() {
  const { lang } = useLang();

  // Tells search engines who the company is, where it is, how to reach it and what it does
  const business = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE}/#business`,
    name: 'Kurdistan Service Team',
    alternateName: ['KST', 'تیمی خزمەتگوزاری کوردستان', 'تيم خدمة كردستان'],
    url: `${SITE}/`,
    logo: `${SITE}/assets/kst-logo.png`,
    image: `${SITE}/assets/og-image.jpg`,
    description: DESC[lang],
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
        itemOffered: { '@type': 'Service', name: s.name[lang], description: s.summary[lang], url: abs(`/services/${s.slug}`, lang) },
      })),
    },
  };

  return (
    <>
      <PageSeo path="/" lang={lang} title={TITLE[lang]} description={DESC[lang]} jsonLd={business} />
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
