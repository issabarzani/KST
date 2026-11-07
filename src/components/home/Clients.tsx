import { useMemo, useRef, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { portfolio } from 'virtual:content';
import { useLang } from '@/lib/lang-context';
import { clientsSection, sectorLabels } from '@/lib/i18n';
import { useScrollSpy } from '@/lib/use-scroll-spy';
import BlueprintPanel from '@/components/home/BlueprintPanel';
import RegionMap, { type Place } from '@/components/home/RegionMap';

const placeOf = (locationEn: string): Place | null => (/pirmam/i.test(locationEn) ? 'Pirmam' : /erbil/i.test(locationEn) ? 'Erbil' : null);

export default function Clients() {
  const { lang } = useLang();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string>(portfolio[0]?.id ?? '');
  const listRef = useRef<HTMLUListElement>(null);

  // Filter list is built from the data, in the order sectors first appear
  const sectors = useMemo(() => Array.from(new Set(portfolio.flatMap((p) => p.sectors))), []);
  const counts = useMemo(() => {
    const c: Record<Place, number> = { Erbil: 0, Pirmam: 0 };
    for (const p of portfolio) {
      const pl = placeOf(p.locationEn);
      if (pl) c[pl] += 1;
    }
    return c;
  }, []);

  // A client shows under every sector it has worked in
  const q = query.trim().toLowerCase();
  const matches = portfolio.filter(
    (p) =>
      (filter === 'All' || p.sectors.includes(filter)) &&
      (!q || [p.nameKu, p.nameEn, p.nameAr].some((n) => n.toLowerCase().includes(q)))
  );
  const active = matches.find((p) => p.id === activeId) ?? matches[0];
  const sectorName = (s: string) => sectorLabels[s]?.[lang] ?? s;
  const nameOf = (p: (typeof portfolio)[number]) => (lang === 'ku' ? p.nameKu : lang === 'ar' ? p.nameAr : p.nameEn);
  const locOf = (p: (typeof portfolio)[number]) => (lang === 'ku' ? p.location : lang === 'ar' ? p.locationAr : p.locationEn);

  // The map follows the client crossing the middle of the screen
  useScrollSpy(listRef, setActiveId, [filter, q]);

  return (
    <section id="clients" className="band bg-background">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 className="max-w-3xl text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">{clientsSection.title[lang]}</h2>
          <p className="max-w-prose text-base leading-loose text-muted-foreground lg:text-lg">{clientsSection.intro[lang]}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={clientsSection.label[lang]}>
          {['All', ...sectors].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder={clientsSection.search[lang]}
            aria-label={clientsSection.search[lang]}
            className="field !ps-11"
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <BlueprintPanel
            className="lg:order-2"
            captionOnMobile
            caption={
              active ? (
                <>
                  <div className="min-w-0">
                    <p className="truncate text-base font-extrabold text-white lg:text-xl">{nameOf(active)}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/65">
                      <MapPin size={13} className="text-[hsl(var(--gold))]" aria-hidden="true" />
                      {locOf(active)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-xs font-bold text-white/80">
                    {active.sectors.length} {clientsSection.works[lang]}
                  </span>
                </>
              ) : null
            }
          >
            <RegionMap
              active={active ? placeOf(active.locationEn) : null}
              counts={counts}
              lang={lang}
              label={`${clientsSection.mapLabel[lang]} ${active ? nameOf(active) : ''}`}
            />
          </BlueprintPanel>

          <div className="lg:order-1">
            <p className="mb-3 text-sm text-muted-foreground">
              <span className="ltr-isolate font-bold text-foreground">{matches.length}</span> {clientsSection.count[lang]}
            </p>
            <ul ref={listRef} className="divide-y divide-border overflow-hidden rounded-md border border-border bg-card">
              {matches.map((p) => {
                const on = p.id === active?.id;
                return (
                  <li key={p.id} data-key={p.id} className={`relative transition-colors duration-300 ${on ? 'bg-primary/[0.07]' : ''}`}>
                    <span className={`absolute inset-y-0 start-0 w-1 transition-colors ${on ? 'bg-[hsl(var(--accent))]' : 'bg-transparent'}`} aria-hidden="true" />
                    <button
                      type="button"
                      onClick={() => setActiveId(p.id)}
                      aria-pressed={on}
                      className="grid w-full gap-3 px-5 py-5 text-start sm:px-6"
                    >
                      <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="text-lg font-extrabold leading-snug">{nameOf(p)}</span>
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin size={14} className="text-[hsl(var(--accent))]" aria-hidden="true" />
                          {locOf(p)}
                        </span>
                      </span>
                      <span className="flex flex-wrap gap-2">
                        {p.sectors.map((s) => (
                          <span
                            key={s}
                            className={`rounded px-2.5 py-1 text-xs font-bold ${
                              s === filter ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {sectorName(s)}
                          </span>
                        ))}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {matches.length === 0 && <p className="py-10 text-center text-muted-foreground">{clientsSection.empty[lang]}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
