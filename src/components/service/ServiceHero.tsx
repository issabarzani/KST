import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang, homePath, sectionPath } from '@/lib/lang-context';
import { servicePageText as T, services, type Service } from '@/lib/services';
import { accentTokens } from '@/lib/color';
import { heroes } from '@/components/drawings';
import { serviceIcons } from '@/components/service/icons';

export const dwg = (n: number) => `KST-${String(n).padStart(2, '0')}`;

/** Address of the contact form with this field already chosen. */
export const quoteHref = (slug: string, lang: Parameters<typeof homePath>[0]) => sectionPath('contact', lang, `?service=${slug}`);

export default function ServiceHero({ svc }: { svc: Service }) {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const n = services.indexOf(svc) + 1;
  const tokens = accentTokens(svc.accent);
  const Icon = serviceIcons[svc.slug];
  const Art = heroes[svc.slug];
  const Sep = lang === 'en' ? ChevronRight : ChevronLeft;

  // Scroll progress through the hero (0 at the top, 1 once it has scrolled away), used by the drawings
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = el.offsetHeight || 1;
      el.style.setProperty('--p', String(Math.min(1, Math.max(0, window.scrollY / (h * 0.8)))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[hsl(var(--night))] pt-[72px] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -end-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-20 blur-3xl" style={{ background: svc.accent }} aria-hidden="true" />

      <div className="wrap relative pb-14 pt-6 sm:pt-8 lg:pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-white/65">
            <li>
              <Link to={homePath(lang)} className="hover:text-white">{T.home[lang]}</Link>
            </li>
            <li aria-hidden="true"><Sep size={14} /></li>
            <li>
              <Link to={sectionPath('services', lang)} className="hover:text-white">{T.services[lang]}</Link>
            </li>
            <li aria-hidden="true"><Sep size={14} /></li>
            <li aria-current="page" className="font-semibold text-white/90">{svc.name[lang]}</li>
          </ol>
        </nav>

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="rise inline-flex items-center gap-3 text-sm font-bold" style={{ color: tokens.onNight, animationDelay: '0.05s' }}>
              <span className="flex h-9 w-9 items-center justify-center rounded" style={{ background: tokens.solid, color: tokens.onAccent }}>
                <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span>
                {T.field[lang]} <span className="ltr-isolate">{n} / {services.length}</span>
              </span>
            </p>
            <h1 className="rise mt-5 text-[2.1rem] font-extrabold leading-[1.35] text-white [html[lang=en]_&]:leading-[1.08] sm:text-5xl lg:text-[3.3rem]" style={{ animationDelay: '0.12s' }}>
              {svc.name[lang]}
            </h1>
            <p className="rise mt-5 max-w-xl text-xl font-semibold leading-relaxed text-white/90 sm:text-2xl" style={{ animationDelay: '0.22s' }}>
              {svc.tagline[lang]}
            </p>
            <ul className="rise mt-7 flex flex-wrap gap-2" style={{ animationDelay: '0.32s' }}>
              {svc.bullets.map((b) => (
                <li key={b.en} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: svc.accent }} aria-hidden="true" />
                  {b[lang]}
                </li>
              ))}
            </ul>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '0.42s' }}>
              <Link to={quoteHref(svc.slug, lang)} className="btn hover:opacity-90" style={{ background: tokens.solid, color: tokens.onAccent }}>
                {T.quote[lang]}
              </Link>
              <a href="#what" className="btn btn-ghost-light">
                {T.whatWeDo[lang]}
              </a>
            </div>
          </div>

          <figure className="rise relative mx-auto w-full max-w-[34rem] lg:max-w-none" style={{ animationDelay: '0.3s' }}>
            <div className="relative overflow-hidden rounded-md border border-white/15 bg-[hsl(var(--night-2))]/70 p-3 sm:p-5">
              <Art accent={svc.accent} accent2={svc.accent2 ?? svc.accent} label={`${T.drawingLabel[lang]} ${svc.name[lang]}`} />
              <figcaption className="mt-2 flex items-center justify-between border-t border-white/10 pt-3 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/45" style={{ fontFamily: 'var(--font-latin)' }}>
                <span className="ltr-isolate shrink-0">DWG {dwg(n)}</span>
                <span className="ltr-isolate ms-4 hidden truncate sm:inline">{svc.name.en}</span>
              </figcaption>
            </div>
            <span className="absolute -start-2 -top-2 h-8 w-8 border-s-2 border-t-2" style={{ borderColor: svc.accent }} aria-hidden="true" />
            <span className="absolute -bottom-2 -end-2 h-8 w-8 border-b-2 border-e-2" style={{ borderColor: svc.accent }} aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>
  );
}
