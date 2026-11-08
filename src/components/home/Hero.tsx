import { useRef } from 'react';
import { home } from 'virtual:content';
import { useLang } from '@/lib/lang-context';
import { ui } from '@/lib/i18n';
import { useScrollProgress } from '@/lib/use-scroll-progress';
import CountUp from '@/components/CountUp';

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/* Three flowing strands, echoing the ones that cut through the "8" of the KST mark */
function Strands() {
  return (
    <svg
      viewBox="0 0 600 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ translate: '0 calc(var(--p, 0) * -70px)' }}
      className="parallax pointer-events-none absolute inset-y-0 end-0 h-full w-[70%] max-w-[780px] opacity-60 [html[dir=rtl]_&]:-scale-x-100"
      fill="none"
      strokeLinecap="round"
    >
      <path className="draw" pathLength={1} d="M470 20 C 300 190, 250 330, 330 700" stroke="hsl(209 62% 48%)" strokeWidth="2.5" />
      <path className="draw" pathLength={1} d="M540 40 C 360 210, 320 360, 400 700" stroke="hsl(40 62% 56%)" strokeWidth="2.5" />
      <path className="draw" pathLength={1} d="M610 70 C 430 240, 390 380, 470 700" stroke="hsl(209 62% 48%)" strokeWidth="2.5" />
    </svg>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref); // the photo and the strands drift as the page scrolls
  const title =
    lang === 'ku'
      ? `${home.hero.headlineKu1} ${home.hero.headlineKu2}`
      : lang === 'ar'
        ? 'تيم خدمة كردستان'
        : 'Kurdistan Service Team';

  return (
    <section id="home" ref={ref} className="relative overflow-hidden bg-[hsl(var(--night))] pt-[72px] text-white">
      <Strands />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
        aria-hidden="true"
      />

      <div className="wrap relative grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-24">
        <div>
          <p className="rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/85" style={{ animationDelay: '0.05s' }}>
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--gold))]" />
            {home.hero.badge}
          </p>

          <h1
            className="rise text-[2.6rem] font-extrabold leading-[1.35] text-white [html[lang=en]_&]:leading-[1.08] sm:text-6xl lg:text-[4.25rem]"
            style={{ animationDelay: '0.15s' }}
          >
            {title}
          </h1>

          <p className="rise mt-6 max-w-xl text-xl font-semibold text-white/95 sm:text-2xl" style={{ animationDelay: '0.3s' }}>
            {ui.tagline[lang]}
          </p>
          <p className="rise mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg" style={{ animationDelay: '0.4s' }}>
            {ui.heroNote[lang]}
          </p>

          <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '0.5s' }}>
            <button onClick={() => go('contact')} className="btn btn-gold">{ui.quote[lang]}</button>
            <button onClick={() => go('services')} className="btn btn-ghost-light">{ui.services[lang]}</button>
          </div>
        </div>

        <figure
          className="parallax rise relative mx-auto w-full max-w-md lg:max-w-none"
          style={{ animationDelay: '0.35s', translate: '0 calc(var(--p, 0) * 56px)', scale: 'calc(1 - var(--p, 0) * 0.05)' }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-white/15">
            <img
              src="/assets/erbil-skyline.webp"
              alt={lang === 'ku' ? 'هەولێر' : lang === 'ar' ? 'أربيل' : 'Erbil skyline at sunset'}
              width={554}
              height={554}
              className="h-full w-full object-cover [filter:contrast(1.06)_saturate(1.12)]"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          {/* gold registration corners */}
          <span className="absolute -start-2 -top-2 h-8 w-8 border-s-2 border-t-2 border-[hsl(var(--gold))]" aria-hidden="true" />
          <span className="absolute -bottom-2 -end-2 h-8 w-8 border-b-2 border-e-2 border-[hsl(var(--gold))]" aria-hidden="true" />
        </figure>
      </div>

      {/* Stats laid out like a drawing title block */}
      <div className="relative border-t border-white/15 bg-[hsl(var(--night-2))]/80">
        <dl className="wrap grid grid-cols-3 divide-x divide-white/15 rtl:divide-x-reverse">
          {ui.stats.map((s) => (
            <div key={s.value} className="px-3 py-6 text-center sm:px-8 sm:py-8 sm:text-start">
              <dt className="order-2 text-xs text-white/65 sm:text-sm">{s.label[lang]}</dt>
              <dd className="ltr-isolate mt-1 text-3xl font-extrabold text-[hsl(var(--gold))] sm:text-5xl" style={{ fontFamily: 'var(--font-latin)' }}><CountUp value={s.value} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
