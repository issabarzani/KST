import { useRef, useState } from 'react';
import { useLang } from '@/lib/lang-context';
import { processSection as P, processSteps } from '@/lib/process';
import { useScrollSpy } from '@/lib/use-scroll-spy';
import BlueprintPanel from '@/components/home/BlueprintPanel';
import ProcessDrawing from '@/components/home/ProcessDrawing';
import { stagger } from '@/lib/reveal';

const num = (n: number) => String(n).padStart(2, '0');

export default function Process() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  useScrollSpy(listRef, (k) => setActive(Number(k)));
  const current = processSteps[active];

  return (
    <section id="process" className="band bg-background">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 className="reveal text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">{P.title[lang]}</h2>
          <p className="reveal max-w-prose text-base leading-loose text-muted-foreground lg:text-lg" style={stagger(1)}>{P.intro[lang]}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <BlueprintPanel
            caption={
              <div className="flex items-baseline gap-4">
                <span className="ltr-isolate text-3xl font-extrabold text-[hsl(var(--gold))]" style={{ fontFamily: 'var(--font-latin)' }}>
                  {num(active + 1)}
                  <span className="text-base text-white/60">/{num(processSteps.length)}</span>
                </span>
                <div>
                  <p className="text-xl font-extrabold leading-snug text-white">{current.title[lang]}</p>
                  <p className="mt-1 leading-relaxed text-white/70">{current.text[lang]}</p>
                </div>
              </div>
            }
          >
            <ProcessDrawing active={active} label={`${P.drawing[lang]} ${current.title[lang]}`} />
          </BlueprintPanel>

          <ol ref={listRef} className="relative">
            <span className="absolute bottom-6 start-[1.2rem] top-6 w-px bg-border" aria-hidden="true" />
            {processSteps.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <li key={s.title.en} data-key={String(i)} className="reveal side relative flex gap-5 py-6 sm:py-8">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    aria-label={`${P.step[lang]} ${i + 1}: ${s.title[lang]}`}
                    className={`ltr-isolate relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold transition-colors duration-300 ${
                      on
                        ? 'border-[hsl(var(--gold))] bg-[hsl(var(--night))] text-[hsl(var(--gold))]'
                        : done
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background text-muted-foreground'
                    }`}
                    style={{ fontFamily: 'var(--font-latin)' }}
                  >
                    {num(i + 1)}
                  </button>
                  <div className="pt-1">
                    <h3 className="text-lg font-extrabold leading-snug sm:text-xl">{s.title[lang]}</h3>
                    <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">{s.text[lang]}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
