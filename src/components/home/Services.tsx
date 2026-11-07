import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Building2, ClipboardList, Cpu, ShieldPlus, Stethoscope, Thermometer, Wind, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLang } from '@/lib/lang-context';
import { servicesSection as S, services, type ServiceKey } from '@/lib/i18n';
import BuildingSection from '@/components/home/BuildingSection';

const icons: Record<ServiceKey, LucideIcon> = {
  construction: Building2,
  hvac: Thermometer,
  ventilation: Wind,
  electrical: Zap,
  cleanroom: ShieldPlus,
  medical: Stethoscope,
  it: Cpu,
  pm: ClipboardList,
};

export default function Services() {
  const { lang } = useLang();
  const [active, setActive] = useState<ServiceKey>('construction');
  const listRef = useRef<HTMLUListElement>(null);
  const current = services.find((s) => s.key === active)!;

  // On phones and tablets the drawing stays pinned while the list scrolls:
  // the row crossing the middle of the screen becomes the highlighted trade.
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof IntersectionObserver === 'undefined') return;
    const mq = window.matchMedia('(min-width: 1024px)');
    let io: IntersectionObserver | null = null;
    const setup = () => {
      io?.disconnect();
      io = null;
      if (mq.matches) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.key as ServiceKey);
        },
        { rootMargin: '-62% 0px -30% 0px' }
      );
      list.querySelectorAll('[data-key]').forEach((el) => io!.observe(el));
    };
    setup();
    mq.addEventListener?.('change', setup);
    return () => {
      io?.disconnect();
      mq.removeEventListener?.('change', setup);
    };
  }, []);

  const requestQuote = () => {
    window.dispatchEvent(
      new CustomEvent('kst:prefill', { detail: { service: current.key, message: `${S.prefill[lang]} ${current.name[lang]}.` } })
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="band bg-secondary">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">{S.title[lang]}</h2>
          <p className="max-w-prose text-base leading-loose text-muted-foreground lg:text-lg">{S.intro[lang]}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* The building: pinned while the list scrolls */}
          <div className="sticky top-[76px] z-10 self-start lg:top-24 lg:order-2">
            <figure className="overflow-hidden rounded-md bg-[hsl(var(--night))] text-white shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <div
                className="relative px-3 pb-1 pt-4 sm:px-6 sm:pt-6"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              >
                <div className="mx-auto w-full max-w-[calc(34vh*1.21)] lg:max-w-none">
                  <BuildingSection active={active} label={`${S.drawing[lang]} ${current.name[lang]}`} />
                </div>
              </div>
              {/* drawing title block */}
              <figcaption className="hidden border-t border-white/15 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-6 lg:p-7" aria-live="polite">
                <div>
                  <p className="text-xl font-extrabold leading-snug text-white">{current.name[lang]}</p>
                  <p className="mt-2 leading-relaxed text-white/70">{current.desc[lang]}</p>
                </div>
                <button onClick={requestQuote} className="btn btn-gold shrink-0 !min-h-[44px] !px-5 !text-sm">
                  {S.more[lang]}
                  <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
                </button>
              </figcaption>
            </figure>
          </div>

          <div className="lg:order-1">
            <p className="mb-4 text-sm text-muted-foreground">{S.hint[lang]}</p>
            <ul ref={listRef} className="divide-y divide-border overflow-hidden rounded-md border border-border bg-card">
              {services.map((s) => {
                const Icon = icons[s.key];
                const on = s.key === active;
                return (
                  <li key={s.key} data-key={s.key} className={`relative ${on ? 'bg-primary/[0.07]' : ''}`}>
                    <span
                      className={`absolute inset-y-0 start-0 w-1 transition-colors ${on ? 'bg-[hsl(var(--accent))]' : 'bg-transparent'}`}
                      aria-hidden="true"
                    />

                    <button
                      type="button"
                      onClick={() => setActive(s.key)}
                      onFocus={() => setActive(s.key)}
                      aria-pressed={on}
                      className={`flex w-full items-start gap-4 px-5 py-4 text-start transition-colors duration-200 sm:px-6 ${
                        on ? '' : 'hover:bg-muted/60'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded transition-colors ${
                          on ? 'bg-[hsl(var(--night))] text-[hsl(var(--gold))]' : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-extrabold leading-snug">{s.name[lang]}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{s.desc[lang]}</span>
                      </span>
                    </button>
                    {on && (
                      <div className="-mt-1 pb-4 ps-[4.75rem] sm:ps-[5.25rem] lg:hidden">
                        <button onClick={requestQuote} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
                          {S.more[lang]}
                          <ArrowRight size={15} className="rtl:-scale-x-100" aria-hidden="true" />
                        </button>
                      </div>
                    )}
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
