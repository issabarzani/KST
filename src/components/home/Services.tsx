import { useRef, useState } from 'react';
import { ArrowRight, Building2, Check, ClipboardList, Cpu, ShieldPlus, Stethoscope, Thermometer, Wind, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLang } from '@/lib/lang-context';
import { servicesSection as S, services, type ServiceKey } from '@/lib/i18n';
import { useScrollSpy } from '@/lib/use-scroll-spy';
import BuildingSection from '@/components/home/BuildingSection';
import BlueprintPanel from '@/components/home/BlueprintPanel';

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

  // The building stays pinned while the list scrolls; the service crossing the middle of the screen is drawn in gold
  useScrollSpy(listRef, (k) => setActive(k as ServiceKey));

  const quoteFor = (key: ServiceKey) => {
    const svc = services.find((s) => s.key === key)!;
    window.dispatchEvent(new CustomEvent('kst:prefill', { detail: { service: svc.key, message: `${S.prefill[lang]} ${svc.name[lang]}.` } }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const requestQuote = () => quoteFor(current.key);

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
                  <p className="mt-2 leading-relaxed text-white/70">{current.desc[lang]}</p>
                </div>
                <button onClick={requestQuote} className="btn btn-gold shrink-0 !min-h-[44px] !px-5 !text-sm">
                  {S.more[lang]}
                  <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
                </button>
              </>
            }
          >
            <BuildingSection active={active} label={`${S.drawing[lang]} ${current.name[lang]}`} />
          </BlueprintPanel>

          <div className="lg:order-1">
            <p className="mb-4 text-sm text-muted-foreground">{S.hint[lang]}</p>
            <ul ref={listRef} className="divide-y divide-border overflow-hidden rounded-md border border-border bg-card">
              {services.map((s) => {
                const Icon = icons[s.key];
                const on = s.key === active;
                return (
                  <li key={s.key} data-key={s.key} className={`relative transition-colors duration-300 ${on ? 'bg-primary/[0.07]' : ''}`}>
                    <span
                      className={`absolute inset-y-0 start-0 w-1 transition-colors ${on ? 'bg-[hsl(var(--accent))]' : 'bg-transparent'}`}
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      onClick={() => setActive(s.key)}
                      onFocus={() => setActive(s.key)}
                      aria-pressed={on}
                      className={`flex w-full items-start gap-4 px-5 pb-3 pt-5 text-start sm:px-6 ${on ? '' : 'hover:bg-muted/60'}`}
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
                    <ul className="grid gap-x-4 gap-y-1.5 pb-5 pe-5 ps-[4.75rem] text-sm sm:grid-cols-2 sm:pe-6 sm:ps-[5.25rem]">
                      {s.scope.map((x) => (
                        <li key={x.en} className="flex gap-2 leading-snug text-foreground/80">
                          <Check size={14} className="mt-[3px] shrink-0 text-[hsl(var(--accent))]" aria-hidden="true" />
                          {x[lang]}
                        </li>
                      ))}
                    </ul>
                    <div className="-mt-2 pb-5 ps-[4.75rem] sm:ps-[5.25rem] lg:hidden">
                      <button onClick={() => quoteFor(s.key)} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
                        {S.more[lang]}
                        <ArrowRight size={15} className="rtl:-scale-x-100" aria-hidden="true" />
                      </button>
                    </div>
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
