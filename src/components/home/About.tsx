import { useLang } from '@/lib/lang-context';
import { about } from '@/lib/i18n';
import { hvac } from '@/lib/proposals';

export default function About() {
  const { lang } = useLang();
  return (
    <section id="about" className="band bg-background">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-[2.6rem]">{about.title[lang]}</h2>
          <div className="mt-6 h-1 w-16 bg-[hsl(var(--accent))]" aria-hidden="true" />
          <dl className="mt-10 space-y-6">
            {about.pillars.map((p) => (
              <div key={p.title.en} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
                <dt className="text-base font-extrabold text-primary">{p.title[lang]}</dt>
                <dd className="text-[1.02rem] leading-relaxed text-foreground/80">{p.text[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:pt-2">
          <p className="max-w-prose text-lg leading-loose text-foreground/85 sm:text-xl sm:leading-loose">{about.body[lang]}</p>
          <p className="mt-8 max-w-prose border-s-4 border-[hsl(var(--accent))] bg-card py-4 pe-4 ps-5 text-[0.95rem] font-semibold text-foreground shadow-sm">
            {about.pricing[lang]}
          </p>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xl font-extrabold sm:text-2xl">{about.whyTitle[lang]}</h3>
          <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {hvac.why.map((w) => (
              <div key={w.title.en} className="bg-card p-5">
                <dt className="font-extrabold leading-snug text-primary">{w.title[lang]}</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-foreground/80">{w.text[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
