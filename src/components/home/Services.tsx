import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import { useLang, servicePath } from '@/lib/lang-context';
import { servicesSection as S } from '@/lib/i18n';
import { services, type ServiceSlug } from '@/lib/services';
import { accentTokens } from '@/lib/color';
import { useScrollSpy } from '@/lib/use-scroll-spy';
import BuildingSection from '@/components/home/BuildingSection';
import BlueprintPanel from '@/components/home/BlueprintPanel';
import { serviceIcons } from '@/components/service/icons';

const num = (n: number) => String(n).padStart(2, '0');

/*
  Home page: the eight fields as cards (summary + four points), each opening its own page.
  The building drawing stays pinned beside them and draws the field crossing the middle of the screen in its colour.
*/
export default function Services() {
  const { lang } = useLang();
  const [active, setActive] = useState<ServiceSlug>(services[0].slug);
  const listRef = useRef<HTMLUListElement>(null);
  const current = services.find((s) => s.slug === active)!;
  const ct = accentTokens(current.accent);

  useScrollSpy(listRef, (k) => setActive(k as ServiceSlug));

  return (
    <section id="services" className="band bg-secondary">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">{S.title[lang]}</h2>
          <p className="max-w-prose text-base leading-loose text-muted-foreground lg:text-lg">{S.intro[lang]}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <BlueprintPanel
            className="lg:order-2"
            caption={
              <>
                <div>
                  <p className="text-xl font-extrabold leading-snug text-white">{current.name[lang]}</p>
                  <p className="mt-2 leading-relaxed text-white/70">{current.summary[lang]}</p>
                </div>
                <Link
                  to={servicePath(current.slug, lang)}
                  className="btn shrink-0 !min-h-[44px] !px-5 !text-sm hover:opacity-90"
                  style={{ background: ct.solid, color: ct.onAccent }}
                >
                  {S.more[lang]}
                  <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
                </Link>
              </>
            }
          >
            <BuildingSection active={active} label={`${S.drawing[lang]} ${current.name[lang]}`} />
          </BlueprintPanel>

          <div className="lg:order-1">
            <p className="mb-4 text-sm text-muted-foreground">{S.hint[lang]}</p>
            <ul ref={listRef} className="space-y-4">
              {services.map((s, i) => {
                const Icon = serviceIcons[s.slug];
                const on = s.slug === active;
                const t = accentTokens(s.accent);
                return (
                  <li key={s.slug} data-key={s.slug}>
                    <Link
                      to={servicePath(s.slug, lang)}
                      onMouseEnter={() => setActive(s.slug)}
                      onFocus={() => setActive(s.slug)}
                      className={`group relative block overflow-hidden rounded-md border bg-card p-5 transition-[border-color,box-shadow] duration-300 sm:p-6 ${on ? 'shadow-lg' : 'border-border hover:border-foreground/25'}`}
                      style={on ? { borderColor: s.accent, boxShadow: `0 0 0 1px ${s.accent}, var(--shadow-lg)` } : undefined}
                    >
                      <span className="absolute inset-y-0 start-0 w-1.5" style={{ background: s.accent }} aria-hidden="true" />
                      <span className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded" style={{ background: t.solid, color: t.onAccent }}>
                          <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="ltr-isolate text-xs font-extrabold text-muted-foreground" style={{ fontFamily: 'var(--font-latin)' }}>
                            {num(i + 1)}
                          </span>
                          <h3 className="text-lg font-extrabold leading-snug sm:text-xl">{s.name[lang]}</h3>
                        </span>
                      </span>
                      <span className="mt-3 block leading-relaxed text-muted-foreground">{s.summary[lang]}</span>
                      <span className="mt-4 grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-2">
                        {s.bullets.map((b) => (
                          <span key={b.en} className="flex gap-2 leading-snug text-foreground/85">
                            <Check size={15} className="mt-[3px] shrink-0 text-[hsl(var(--accent))]" aria-hidden="true" />
                            {b[lang]}
                          </span>
                        ))}
                      </span>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                        {S.more[lang]}
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
