import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { portfolio } from 'virtual:content';
import { useLang } from '@/lib/lang-context';
import { clientsSection, sectorLabels } from '@/lib/i18n';

const PAGE = 10;

export default function Clients() {
  const { lang } = useLang();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE);

  // Filter list is built from the data, in the order sectors first appear
  const sectors = Array.from(new Set(portfolio.flatMap((p) => p.sectors)));
  // A client shows under every sector it has worked in
  const q = query.trim().toLowerCase();
  const matches = portfolio.filter(
    (p) =>
      (filter === 'All' || p.sectors.includes(filter)) &&
      (!q || [p.nameKu, p.nameEn, p.nameAr].some((n) => n.toLowerCase().includes(q)))
  );
  const shown = matches.slice(0, visible);
  const sectorName = (s: string) => sectorLabels[s]?.[lang] ?? s;

  return (
    <section id="clients" className="band bg-background">
      <div className="wrap">
        <h2 className="max-w-3xl text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">{clientsSection.title[lang]}</h2>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={clientsSection.label[lang]}>
          {['All', ...sectors].map((s) => (
            <button
              key={s}
              onClick={() => { setFilter(s); setVisible(PAGE); }}
              aria-pressed={filter === s}
              className={`min-h-[40px] rounded-full border px-4 text-sm font-semibold transition-colors ${
                filter === s
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {s === 'All' ? clientsSection.all[lang] : sectorName(s)}
            </button>
          ))}
        </div>

        <div className="relative mt-5 max-w-md">
          <Search size={17} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisible(PAGE); }}
            placeholder={clientsSection.search[lang]}
            aria-label={clientsSection.search[lang]}
            className="field !ps-11"
          />
        </div>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {shown.map((p) => (
            <li key={p.id} className="grid gap-x-8 gap-y-3 py-5 sm:py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto] md:items-center">
              <h3 className="text-lg font-bold sm:text-xl">{lang === 'ku' ? p.nameKu : lang === 'ar' ? p.nameAr : p.nameEn}</h3>
              <ul className="flex flex-wrap gap-2" aria-label={clientsSection.label[lang]}>
                {p.sectors.map((s) => (
                  <li
                    key={s}
                    className={`rounded px-2.5 py-1 text-xs font-bold ${
                      s === filter ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {sectorName(s)}
                  </li>
                ))}
              </ul>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground md:min-w-[6rem]">
                <MapPin size={14} className="text-[hsl(var(--accent))]" />
                {lang === 'ku' ? p.location : lang === 'ar' ? p.locationAr : p.locationEn}
              </span>
            </li>
          ))}
        </ul>

        {matches.length === 0 && <p className="py-10 text-center text-muted-foreground">{clientsSection.empty[lang]}</p>}

        {matches.length > visible && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <button onClick={() => setVisible((v) => v + PAGE)} className="btn border border-border bg-card hover:bg-muted">
              {clientsSection.showMore[lang]}
            </button>
            <p className="text-sm text-muted-foreground">{shown.length} / {matches.length} {clientsSection.count[lang]}</p>
          </div>
        )}
      </div>
    </section>
  );
}
