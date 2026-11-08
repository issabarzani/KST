import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Search } from 'lucide-react';
import { portfolio } from 'virtual:content';
import { useLang, servicePath } from '@/lib/lang-context';
import { clientsSection, sectorLabels } from '@/lib/i18n';
import { services, type Service, type ServiceSlug } from '@/lib/services';
import { accentTokens } from '@/lib/color';
import { stagger } from '@/lib/reveal';

type Client = (typeof portfolio)[number];

/** The fields a client's work belongs to, in the order of the eight fields. */
const fieldsOf = (p: Client): Service[] => services.filter((s) => p.sectors.some((x) => s.sectors.includes(x)));

/*
  Every project we have delivered, as cards. Filter by field or search by name;
  each card links to the pages of the fields we worked in for that client.
*/
export default function Clients() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<'all' | ServiceSlug>('all');
  const [query, setQuery] = useState('');

  const withClients = useMemo(() => services.filter((s) => portfolio.some((p) => fieldsOf(p).includes(s))), []);
  const countFor = (slug: ServiceSlug) => portfolio.filter((p) => fieldsOf(p).some((s) => s.slug === slug)).length;

  const q = query.trim().toLowerCase();
  const matches = portfolio.filter(
    (p) =>
      (filter === 'all' || fieldsOf(p).some((s) => s.slug === filter)) &&
      (!q || [p.nameKu, p.nameEn, p.nameAr].some((n) => n.toLowerCase().includes(q)))
  );
  const nameOf = (p: Client) => (lang === 'ku' ? p.nameKu : lang === 'ar' ? p.nameAr : p.nameEn);
  const locOf = (p: Client) => (lang === 'ku' ? p.location : lang === 'ar' ? p.locationAr : p.locationEn);
  const sep = lang === 'en' ? ', ' : '، ';

  const chip = (active: boolean) =>
    `inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
      active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
    }`;

  return (
    <section id="clients" className="band bg-background">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 className="reveal max-w-3xl text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">{clientsSection.title[lang]}</h2>
          <p className="reveal max-w-prose text-base leading-loose text-muted-foreground lg:text-lg" style={stagger(1)}>
            {clientsSection.intro[lang]}
          </p>
        </div>

        <div className="reveal mt-10 flex flex-wrap gap-2" role="group" aria-label={clientsSection.label[lang]} style={stagger(2)}>
          <button onClick={() => setFilter('all')} aria-pressed={filter === 'all'} className={chip(filter === 'all')}>
            {clientsSection.all[lang]}
            <span className="ltr-isolate font-bold">{portfolio.length}</span>
          </button>
          {withClients.map((s) => (
            <button key={s.slug} onClick={() => setFilter(s.slug)} aria-pressed={filter === s.slug} className={chip(filter === s.slug)}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.accent }} aria-hidden="true" />
              {s.name[lang]}
              <span className="ltr-isolate font-bold">{countFor(s.slug)}</span>
            </button>
          ))}
        </div>

        <div className="reveal relative mt-5 max-w-md" style={stagger(3)}>
          <Search size={17} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={clientsSection.search[lang]}
            aria-label={clientsSection.search[lang]}
            className="field !ps-11"
          />
        </div>

        <p className="mb-4 mt-8 text-sm text-muted-foreground" aria-live="polite">
          <span className="ltr-isolate font-bold text-foreground">{matches.length}</span> {clientsSection.count[lang]}
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((p, i) => {
            const fields = fieldsOf(p);
            return (
              <li key={p.id} className="reveal relative overflow-hidden rounded-md border border-border bg-card p-5 sm:p-6" style={stagger(i % 6, 0.06)}>
                {/* a thin bar in the colours of the fields we worked in */}
                <span className="absolute inset-x-0 top-0 flex h-1" aria-hidden="true">
                  {fields.map((s) => (
                    <span key={s.slug} className="flex-1" style={{ background: s.accent }} />
                  ))}
                </span>
                <p className="text-lg font-extrabold leading-snug">{nameOf(p)}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin size={14} aria-hidden="true" />
                  {locOf(p)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">{p.sectors.map((x) => sectorLabels[x]?.[lang] ?? x).join(sep)}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {fields.map((s) => {
                    const t = accentTokens(s.accent);
                    return (
                      <li key={s.slug}>
                        <Link
                          to={servicePath(s.slug, lang)}
                          className="inline-flex rounded px-2.5 py-1 text-xs font-bold transition-opacity hover:opacity-85"
                          style={{ background: t.solid, color: t.onAccent }}
                        >
                          {s.name[lang]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        {matches.length === 0 && <p className="py-10 text-center text-muted-foreground">{clientsSection.empty[lang]}</p>}
      </div>
    </section>
  );
}
