import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check, ChevronDown, MapPin, ShieldCheck, Minus } from 'lucide-react';
import { portfolio } from 'virtual:content';
import { useLang, sectionPath, servicePath } from '@/lib/lang-context';
import { sectorLabels } from '@/lib/i18n';
import { getService, itemCount, layerOrder, servicePageText as T, services, type Service, type Step } from '@/lib/services';
import { accentTokens } from '@/lib/color';
import { proposalsSection as P, hvac } from '@/lib/proposals';
import { useScrollSpy } from '@/lib/use-scroll-spy';
import { stagger } from '@/lib/reveal';
import BlueprintPanel from '@/components/home/BlueprintPanel';
import { plans } from '@/components/drawings';
import { audienceIcons, serviceIcons } from '@/components/service/icons';
import { dwg, quoteHref } from '@/components/service/ServiceHero';

const num = (n: number) => String(n).padStart(2, '0');
const latin = { fontFamily: 'var(--font-latin)' };

/** Clients that had work done in this field, straight from the shared client list. */
export const clientsFor = (svc: Service) => portfolio.filter((p) => p.sectors.some((s) => svc.sectors.includes(s)));

/* ------------------------------------------------------------------ intro + drawing title block */
export function Intro({ svc }: { svc: Service }) {
  const { lang } = useLang();
  const n = services.indexOf(svc) + 1;
  const cells: [string, string][] = [
    [T.titleBlock.field[lang], `${num(n)} / ${num(services.length)}`],
    [T.titleBlock.items[lang], String(itemCount(svc))],
    ...(svc.sectors.length ? [[T.titleBlock.clients[lang], String(clientsFor(svc).length)] as [string, string]] : []),
    ['DWG', dwg(n)],
  ];
  return (
    <section className="band bg-background" aria-labelledby="intro-title">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <h2 id="intro-title" className="reveal svc-ink text-sm font-extrabold uppercase tracking-[0.12em]">
            {lang === 'ku' ? 'پێشەکی' : lang === 'ar' ? 'مقدمة' : 'Overview'}
          </h2>
          <p className="reveal mt-5 max-w-3xl text-xl font-semibold leading-loose text-foreground sm:text-2xl sm:leading-loose" style={stagger(1)}>{svc.intro[lang]}</p>
          <p className="reveal mt-5 max-w-3xl text-base leading-loose text-muted-foreground" style={stagger(2)}>{svc.summary[lang]}</p>
        </div>
        <dl className="reveal zoom grid grid-cols-2 overflow-hidden rounded-md border border-border bg-card shadow-sm" style={stagger(2)}>
          {cells.map(([k, v], i) => (
            <div
              key={k}
              className={`border-b border-border p-5 ${cells.length % 2 === 1 && i === cells.length - 1 ? 'col-span-2' : i % 2 === 0 ? 'border-e' : ''}`}
            >
              <dt className="text-xs font-bold text-muted-foreground">{k}</dt>
              <dd className="ltr-isolate mt-1 text-2xl font-extrabold text-foreground" style={latin}>
                {v}
              </dd>
            </div>
          ))}
          <div className="col-span-2 p-5">
            <dt className="text-xs font-bold text-muted-foreground">{T.titleBlock.area[lang]}</dt>
            <dd className="mt-1 text-lg font-extrabold">{T.titleBlock.areaValue[lang]}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ sub-services with the scroll drawing */
export function Groups({ svc }: { svc: Service }) {
  const { lang } = useLang();
  const flat = useMemo(() => svc.groups.flatMap((g) => g.items.map((it) => ({ ...it, group: g.id }))), [svc]);
  const order = useMemo(() => layerOrder(svc), [svc]);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  useScrollSpy(listRef, (k) => setActive(Number(k)));
  const Plan = plans[svc.slug];
  const current = flat[active] ?? flat[0];
  const currentGroup = svc.groups.find((g) => g.id === current.group)!;
  let index = -1;

  return (
    <section id="what" className="band bg-secondary" aria-labelledby="what-title">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 id="what-title" className="reveal text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">{T.whatWeDo[lang]}</h2>
          <p className="reveal max-w-prose text-base leading-loose text-muted-foreground lg:text-lg" style={stagger(1)}>{T.whatWeDoHint[lang]}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <BlueprintPanel
            className="lg:order-2"
            caption={
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: accentTokens(svc.accent).onNight }}>
                  {currentGroup.title[lang]}
                </p>
                <p className="mt-2 text-lg font-extrabold leading-snug text-white">{current.title ? current.title[lang] : current.text[lang]}</p>
                {current.title && <p className="mt-1.5 leading-relaxed text-white/70">{current.text[lang]}</p>}
              </div>
            }
          >
            <Plan
              active={current.layer}
              order={order}
              accent={svc.accent}
              accent2={svc.accent2}
              label={`${T.drawingLabel[lang]} ${svc.name[lang]}. ${T.showing[lang]} ${current.title ? current.title[lang] : current.text[lang]}`}
            />
          </BlueprintPanel>

          <div ref={listRef} className="space-y-12 lg:order-1">
            {svc.groups.map((g) => (
              <div key={g.id}>
                <h3 className="reveal side flex items-center gap-3 text-xl font-extrabold leading-snug sm:text-2xl">
                  <span className="h-6 w-1.5 shrink-0 rounded-full" style={{ background: svc.accent }} aria-hidden="true" />
                  {g.title[lang]}
                </h3>
                {g.intro && <p className="reveal mt-3 max-w-prose leading-relaxed text-muted-foreground">{g.intro[lang]}</p>}
                <ol className="mt-5 space-y-3">
                  {g.items.map((it, j) => {
                    index += 1;
                    const i = index;
                    const on = i === active;
                    return (
                      <li
                        key={i}
                        data-key={String(i)}
                        onMouseEnter={() => setActive(i)}
                        className={`reveal relative flex gap-4 rounded-md border bg-card p-4 transition-[border-color,box-shadow] duration-300 sm:p-5 ${
                          on ? 'shadow-md' : 'border-border'
                        }`}
                        style={{ ...stagger(j, 0.05, 3), ...(on ? { borderColor: svc.accent, boxShadow: `0 0 0 1px ${svc.accent}` } : {}) }}
                      >
                        <span
                          className={`ltr-isolate flex h-9 w-9 shrink-0 items-center justify-center rounded text-xs font-extrabold transition-colors ${on ? '' : 'bg-muted text-muted-foreground'}`}
                          style={{ ...latin, ...(on ? { background: accentTokens(svc.accent).solid, color: accentTokens(svc.accent).onAccent } : {}) }}
                        >
                          {num(i + 1)}
                        </span>
                        <div className="min-w-0 pt-1">
                          {it.title && <h4 className="font-extrabold leading-snug">{it.title[lang]}</h4>}
                          <p className={it.title ? 'mt-1 leading-relaxed text-muted-foreground' : 'font-semibold leading-relaxed text-foreground'}>{it.text[lang]}</p>
                          {it.link && (
                            <Link to={servicePath(it.link, lang)} className="svc-ink mt-2 inline-flex items-center gap-1.5 text-sm font-bold underline-offset-4 hover:underline">
                              {getService(it.link)!.name[lang]}
                              <ArrowRight size={15} className="rtl:-scale-x-100" aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ HVAC: air for operating rooms (links to page 4) */
export function OrAirBlock() {
  const { lang } = useLang();
  const or = getService('operating-rooms')!;
  const t = accentTokens(or.accent);
  return (
    <section className="ink-scope bg-background py-16 sm:py-20" aria-labelledby="or-air-title" style={{ ['--ink-l' as string]: t.inkLight, ['--ink-d' as string]: t.inkDark }}>
      <div className="wrap">
        <div className="reveal grid gap-8 rounded-md border border-border bg-card p-6 shadow-sm sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14" style={{ borderInlineStartWidth: 6, borderInlineStartColor: or.accent }}>
          <div>
            <h2 id="or-air-title" className="text-2xl font-extrabold sm:text-3xl">{T.orBlock.title[lang]}</h2>
            <p className="mt-4 leading-loose text-muted-foreground">{T.orBlock.text[lang]}</p>
            <Link to={servicePath(or.slug, lang)} className="btn mt-7 hover:opacity-90" style={{ background: t.solid, color: t.onAccent }}>
              {or.name[lang]}
              <ArrowRight size={17} className="rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {T.orBlock.items.map((x, i) => (
              <li key={x.en} className="reveal zoom flex gap-3 rounded-md bg-muted/60 p-4 leading-relaxed" style={stagger(i + 2)}>
                <ShieldCheck size={20} className="mt-0.5 shrink-0" style={{ color: 'var(--ink)' }} aria-hidden="true" />
                <span>{x[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ HVAC: the proposal, now on its own page */
export function HvacProposal({ svc }: { svc: Service }) {
  const { lang } = useLang();
  const t = accentTokens(svc.accent);
  return (
    <section className="band bg-[hsl(var(--night))] text-white" aria-labelledby="proposal-title">
      <div className="wrap">
        <div className="reveal grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: t.onNight }}>{T.proposal.title[lang]}</p>
            <h2 id="proposal-title" className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{hvac.pitch[lang]}</h2>
          </div>
          <p className="max-w-prose leading-loose text-white/70 lg:text-lg">{hvac.summary[lang]}</p>
        </div>

        <h3 className="reveal mt-14 text-xl font-extrabold text-white">{P.scope[lang]}</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hvac.scope.map((g, i) => (
            <section key={g.title.en} className="reveal rounded-md border border-white/15 bg-white/[0.04] p-6" style={stagger(i)}>
              <p className="ltr-isolate text-sm font-extrabold" style={{ ...latin, color: t.onNight }}>{num(i + 1)}</p>
              <h4 className="mt-2 text-lg font-extrabold text-white">{g.title[lang]}</h4>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-white/75">
                {g.items.map((it) => (
                  <li key={it.en} className="flex gap-2.5">
                    <Check size={16} className="mt-1.5 shrink-0" style={{ color: t.onNight }} aria-hidden="true" />
                    {it[lang]}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <h3 className="reveal mt-14 text-xl font-extrabold text-white">{P.why[lang]}</h3>
        <dl className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {hvac.why.map((w, i) => (
            <div key={w.title.en} className="reveal side border-s-2 ps-4" style={{ ...stagger(i), borderColor: svc.accent }}>
              <dt className="font-bold text-white">{w.title[lang]}</dt>
              <dd className="mt-1 text-[0.95rem] leading-relaxed text-white/70">{w.text[lang]}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <section className="reveal rounded-md border border-white/15 bg-white/[0.04] p-6">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-white">
              <ShieldCheck size={20} style={{ color: t.onNight }} aria-hidden="true" />
              {P.quality[lang]}
            </h3>
            <ul className="mt-4 space-y-2 text-[0.95rem] text-white/75">
              {hvac.quality.map((q) => (
                <li key={q.en} className="flex gap-2.5">
                  <Check size={16} className="mt-1.5 shrink-0" style={{ color: t.onNight }} aria-hidden="true" />
                  {q[lang]}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/65">{hvac.safety[lang]}</p>
          </section>
          <section className="reveal zoom rounded-md p-6" style={{ ...stagger(1), background: t.solid, color: t.onAccent }}>
            <h3 className="text-lg font-extrabold">{P.request[lang]}</h3>
            <p className="mt-3 leading-relaxed">{hvac.commitment[lang]}</p>
            <Link to={quoteHref(svc.slug, lang)} className="btn mt-6 bg-[hsl(var(--night))] text-white hover:opacity-90">
              {T.quote[lang]}
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Electrical: three solar systems side by side */
export function SolarCompare({ svc }: { svc: Service }) {
  const { lang } = useLang();
  const S = T.solar;
  const green = svc.accent2 ?? svc.accent;
  const t = accentTokens(green);
  const yes = (v: boolean) =>
    v ? (
      <span className="inline-flex items-center gap-1.5 font-bold">
        <Check size={16} style={{ color: 'var(--ink)' }} aria-hidden="true" />
        {S.yes[lang]}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <Minus size={16} aria-hidden="true" />
        {S.no[lang]}
      </span>
    );
  return (
    <section className="ink-scope band bg-background" aria-labelledby="solar-title" style={{ ['--ink-l' as string]: t.inkLight, ['--ink-d' as string]: t.inkDark }}>
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 id="solar-title" className="reveal text-3xl font-extrabold sm:text-4xl">{S.title[lang]}</h2>
          <p className="reveal max-w-prose leading-loose text-muted-foreground lg:text-lg" style={stagger(1)}>{S.intro[lang]}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {S.types.map((x, i) => {
            const item = svc.groups.find((g) => g.id === 'solar')!.items[i];
            return (
              <article key={x.id} className="reveal flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm" style={stagger(i, 0.12)}>
                <div className="h-1.5" style={{ background: i === 2 ? `linear-gradient(90deg, ${svc.accent}, ${green})` : i === 0 ? svc.accent : green }} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="ltr-isolate text-2xl font-extrabold" style={latin}>{x.id}</h3>
                  <p className="mt-2 min-h-[3.5rem] leading-relaxed text-muted-foreground">{item.text[lang]}</p>
                  <dl className="mt-5 divide-y divide-border border-t border-border text-[0.95rem]">
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-muted-foreground">{S.rows.grid[lang]}</dt>
                      <dd>{yes(x.grid)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-muted-foreground">{S.rows.battery[lang]}</dt>
                      <dd>{yes(x.battery)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-muted-foreground">{S.rows.outage[lang]}</dt>
                      <dd className="font-bold">{x.outage[lang]}</dd>
                    </div>
                    <div className="py-3">
                      <dt className="text-muted-foreground">{S.rows.best[lang]}</dt>
                      <dd className="mt-1 font-bold">{x.best[lang]}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ how we work: a timeline that fills as you scroll */
export function Timeline({ svc, steps }: { svc: Service; steps: Step[] }) {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  useScrollSpy(listRef, (k) => setActive(Number(k)));
  const t = accentTokens(svc.accent);
  const pct = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 100;

  return (
    <section className="band bg-background" aria-labelledby="process-title">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="process-title" className="reveal text-3xl font-extrabold sm:text-4xl">{T.process[lang]}</h2>
          <p className="reveal mt-5 max-w-prose leading-loose text-muted-foreground lg:text-lg" style={stagger(1)}>{T.processIntro[lang]}</p>
          <p className="ltr-isolate mt-8 hidden text-6xl font-extrabold lg:block" style={latin} aria-hidden="true">
            <span className="svc-ink">{num(active + 1)}</span>
            <span className="text-2xl text-muted-foreground">/{num(steps.length)}</span>
          </p>
        </div>

        <ol ref={listRef} className="relative">
          <span className="absolute bottom-10 start-[1.2rem] top-10 w-0.5 -translate-x-1/2 bg-border rtl:translate-x-1/2" aria-hidden="true" />
          <span
            className="tl-fill absolute start-[1.2rem] top-10 w-0.5 -translate-x-1/2 rtl:translate-x-1/2"
            style={{ height: `calc((100% - 5rem) * ${pct / 100})`, background: svc.accent }}
            aria-hidden="true"
          />
          {steps.map((s, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <li key={s.title.en} data-key={String(i)} className="reveal side relative flex gap-5 py-5 sm:py-7">
                <span
                  className={`ltr-isolate relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold transition-colors duration-300 ${
                    on || done ? '' : 'border-border bg-background text-muted-foreground'
                  }`}
                  style={{
                    ...latin,
                    ...(done ? { background: t.solid, borderColor: svc.accent, color: t.onAccent } : {}),
                    ...(on ? { background: 'hsl(var(--night))', borderColor: svc.accent, color: t.onNight } : {}),
                  }}
                >
                  {num(i + 1)}
                </span>
                <div className="pt-1">
                  <h3 className={`text-lg font-extrabold leading-snug transition-colors duration-300 sm:text-xl ${on || done ? 'text-foreground' : 'text-muted-foreground'}`}>{s.title[lang]}</h3>
                  <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">{s.text[lang]}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ who it is for */
export function Audience({ svc }: { svc: Service }) {
  const { lang } = useLang();
  const t = accentTokens(svc.accent);
  return (
    <section className="band bg-secondary" aria-labelledby="audience-title">
      <div className="wrap">
        <h2 id="audience-title" className="reveal text-3xl font-extrabold sm:text-4xl">{T.audience[lang]}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {svc.audience.map((a, i) => {
            const Icon = audienceIcons[a.icon];
            return (
              <li key={a.label.en} className="reveal zoom flex flex-col items-start gap-4 rounded-md border border-border bg-card p-5" style={stagger(i)}>
                <span className="flex h-11 w-11 items-center justify-center rounded" style={{ background: t.solid, color: t.onAccent }}>
                  <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="font-bold leading-snug">{a.label[lang]}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ clients in this field (filtered from the one client list) */
export function FieldClients({ svc }: { svc: Service }) {
  const { lang } = useLang();
  const list = clientsFor(svc);
  if (!list.length) return null;
  const t = accentTokens(svc.accent);
  return (
    <section className="band bg-background" aria-labelledby="clients-title">
      <div className="wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="clients-title" className="text-3xl font-extrabold sm:text-4xl">{T.clients[lang]}</h2>
            <p className="mt-4 max-w-prose leading-loose text-muted-foreground">{T.clientsIntro[lang]}</p>
          </div>
          <Link to={sectionPath('clients', lang)} className="svc-ink inline-flex items-center gap-1.5 font-bold underline-offset-4 hover:underline">
            {T.allProjects[lang]}
            <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.id} className="reveal rounded-md border border-border bg-card p-5" style={stagger(i % 6)}>
              <p className="text-lg font-extrabold leading-snug">{lang === 'ku' ? p.nameKu : lang === 'ar' ? p.nameAr : p.nameEn}</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin size={14} aria-hidden="true" />
                {lang === 'ku' ? p.location : lang === 'ar' ? p.locationAr : p.locationEn}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.sectors.map((s) => {
                  const here = svc.sectors.includes(s);
                  return (
                    <li
                      key={s}
                      className={`rounded px-2.5 py-1 text-xs font-bold ${here ? '' : 'bg-muted text-muted-foreground'}`}
                      style={here ? { background: t.solid, color: t.onAccent } : undefined}
                    >
                      {sectorLabels[s]?.[lang] ?? s}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ (native disclosure, works without JavaScript) */
export function Faq({ svc }: { svc: Service }) {
  const { lang } = useLang();
  return (
    <section className="band bg-secondary" aria-labelledby="faq-title">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 id="faq-title" className="reveal text-3xl font-extrabold sm:text-4xl">{T.faq[lang]}</h2>
        <div className="space-y-3">
          {svc.faqs.map((f, i) => (
            <details key={f.q.en} className="reveal group rounded-md border border-border bg-card open:shadow-sm" open={i === 0} style={stagger(i, 0.1)}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-start text-lg font-extrabold leading-snug [&::-webkit-details-marker]:hidden">
                {f.q[lang]}
                <ChevronDown size={20} className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="border-t border-border px-5 pb-5 pt-4 leading-loose text-foreground/85">{f.a[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ related fields */
export function Related({ svc }: { svc: Service }) {
  const { lang } = useLang();
  return (
    <section className="band bg-background" aria-labelledby="related-title">
      <div className="wrap">
        <h2 id="related-title" className="reveal text-3xl font-extrabold sm:text-4xl">{T.related[lang]}</h2>
        <ul className={`mt-10 grid gap-4 ${svc.related.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {svc.related.map((slug, i) => {
            const r = getService(slug)!;
            const Icon = serviceIcons[slug];
            const t = accentTokens(r.accent);
            return (
              <li key={slug} className="reveal" style={stagger(i, 0.12)}>
                <Link to={servicePath(slug, lang)} className="group flex h-full flex-col rounded-md border border-border bg-card p-6 transition-colors hover:border-foreground/30">
                  <span className="flex h-11 w-11 items-center justify-center rounded" style={{ background: t.solid, color: t.onAccent }}>
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="mt-5 text-lg font-extrabold leading-snug">{r.name[lang]}</span>
                  <span className="mt-2 line-clamp-3 flex-1 leading-relaxed text-muted-foreground">{r.summary[lang]}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    {T.learnMore[lang]}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ final call to action */
export function FinalCta({ svc }: { svc: Service }) {
  const { lang } = useLang();
  const t = accentTokens(svc.accent);
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--night))] py-20 text-white sm:py-24" aria-labelledby="cta-title">
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: svc.accent }} aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        aria-hidden="true"
      />
      <div className="wrap relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="reveal max-w-2xl">
          <h2 id="cta-title" className="text-3xl font-extrabold text-white sm:text-5xl">{T.ctaTitle[lang]}</h2>
          <p className="mt-5 text-lg leading-loose text-white/75">{T.ctaText[lang]}</p>
        </div>
        <Link to={quoteHref(svc.slug, lang)} className="reveal zoom btn shrink-0 !px-8 text-base hover:opacity-90" style={{ ...stagger(2), background: t.solid, color: t.onAccent }}>
          {T.ctaButton[lang]}
          <ArrowRight size={18} className="rtl:-scale-x-100" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
