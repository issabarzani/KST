import type { CSSProperties } from 'react';
import { useLang } from '@/lib/lang-context';
import { getService, servicePageText as T, type ServiceSlug } from '@/lib/services';
import { processSteps } from '@/lib/process';
import { accentTokens } from '@/lib/color';
import PageSeo, { abs, SITE } from '@/components/PageSeo';
import ServiceHero from '@/components/service/ServiceHero';
import {
  Audience,
  Faq,
  FieldClients,
  FinalCta,
  Groups,
  HvacProposal,
  Intro,
  OrAirBlock,
  Related,
  SolarCompare,
  Timeline,
} from '@/components/service/ServiceSections';

const BRAND = { ku: 'تیمی خزمەتگوزاری کوردستان', en: 'Kurdistan Service Team', ar: 'تيم خدمة كردستان' };

/** One page per KST field: /services/<slug> (and /en/..., /ar/...). */
export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const { lang } = useLang();
  const svc = getService(slug)!;
  const path = `/services/${slug}`;
  const url = abs(path, lang);
  const t = accentTokens(svc.accent);
  // The HVAC page uses the 8-step process from the HVAC proposal
  const steps = slug === 'hvac' ? processSteps : svc.steps;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: svc.name[lang],
        serviceType: svc.name.en,
        description: svc.summary[lang],
        url,
        inLanguage: lang === 'ku' ? 'ckb' : lang,
        provider: { '@type': 'GeneralContractor', '@id': `${SITE}/#business`, name: 'Kurdistan Service Team', url: `${SITE}/` },
        areaServed: { '@type': 'AdministrativeArea', name: 'Kurdistan Region' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: svc.name[lang],
          itemListElement: svc.groups.flatMap((g) =>
            g.items.map((it) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: (it.title ?? it.text)[lang] } }))
          ),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: T.home[lang], item: abs('/', lang) },
          { '@type': 'ListItem', position: 2, name: T.services[lang], item: `${abs('/', lang)}#services` },
          { '@type': 'ListItem', position: 3, name: svc.name[lang], item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: svc.faqs.map((f) => ({ '@type': 'Question', name: f.q[lang], acceptedAnswer: { '@type': 'Answer', text: f.a[lang] } })),
      },
    ],
  };

  const vars = { '--svc-ink-l': t.inkLight, '--svc-ink-d': t.inkDark } as CSSProperties;

  return (
    <>
      <PageSeo path={path} lang={lang} title={`${svc.name[lang]} | ${BRAND[lang]} (KST)`} description={svc.summary[lang]} jsonLd={jsonLd} />
      <main id="main" tabIndex={-1} className="svc-scope outline-none" style={vars} data-page="service" data-service={slug}>
        <ServiceHero svc={svc} />
        <Intro svc={svc} />
        <Groups svc={svc} />
        {slug === 'hvac' && <OrAirBlock />}
        {slug === 'electrical-solar' && <SolarCompare svc={svc} />}
        <Timeline svc={svc} steps={steps} />
        {slug === 'hvac' && <HvacProposal svc={svc} />}
        <Audience svc={svc} />
        <FieldClients svc={svc} />
        <Faq svc={svc} />
        <Related svc={svc} />
        <FinalCta svc={svc} />
      </main>
    </>
  );
}
