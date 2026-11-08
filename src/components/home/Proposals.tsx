import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { useLang, servicePath } from '@/lib/lang-context';
import { getService } from '@/lib/services';
import { proposalsSection as P, hvac, healthcare, type ProposalId } from '@/lib/proposals';

const SERVICE_FOR: Record<ProposalId, string> = { hvac: 'hvac', healthcare: 'medical-equipment' };
// "More" links from each proposal to the full field pages
const MORE_FOR: Record<ProposalId, string[]> = { hvac: ['hvac'], healthcare: ['medical-equipment', 'operating-rooms'] };

function requestProposal(id: ProposalId, message: string) {
  window.dispatchEvent(new CustomEvent('kst:prefill', { detail: { service: SERVICE_FOR[id], message } }));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}

const card = 'rounded-md border border-white/15 bg-white/[0.04] p-6';

function Hvac() {
  const { lang } = useLang();
  return (
    <div className="grid gap-12">
      <div className="grid gap-5 sm:grid-cols-2">
        {hvac.scope.map((g) => (
          <section key={g.title.en} className={card}>
            <h3 className="text-lg font-extrabold text-white">{g.title[lang]}</h3>
            <ul className="mt-4 space-y-2 text-[0.95rem] text-white/75">
              {g.items.map((i) => (
                <li key={i.en} className="flex gap-2.5">
                  <Check size={16} className="mt-1.5 shrink-0 text-[hsl(var(--gold))]" />
                  {i[lang]}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-white">{P.why[lang]}</h3>
        <dl className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {hvac.why.map((w) => (
            <div key={w.title.en} className="border-s-2 border-[hsl(var(--gold))] ps-4">
              <dt className="font-bold text-white">{w.title[lang]}</dt>
              <dd className="mt-1 text-[0.95rem] leading-relaxed text-white/70">{w.text[lang]}</dd>
            </div>
          ))}
        </dl>
      </div>


      <div className="grid gap-5 md:grid-cols-2">
        <section className={card}>
          <h3 className="flex items-center gap-2 text-lg font-extrabold text-white"><ShieldCheck size={20} className="text-[hsl(var(--gold))]" />{P.quality[lang]}</h3>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-white/75">
            {hvac.quality.map((q) => (
              <li key={q.en} className="flex gap-2.5"><Check size={16} className="mt-1.5 shrink-0 text-[hsl(var(--gold))]" />{q[lang]}</li>
            ))}
          </ul>
          <p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/65">{hvac.safety[lang]}</p>
        </section>
        <section className="rounded-md bg-[hsl(var(--gold))] p-6 text-[hsl(var(--night))]">
          <h3 className="text-lg font-extrabold">{hvac.pitch[lang]}</h3>
          <p className="mt-3 leading-relaxed">{hvac.commitment[lang]}</p>
        </section>
      </div>
    </div>
  );
}

function Healthcare() {
  const { lang } = useLang();
  return (
    <div className="grid gap-12">
      <div>
        <h3 className="text-xl font-extrabold text-white">{P.divisions[lang]}</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {healthcare.divisions.map((d) => (
            <section key={d.title.en} className={card}>
              <h4 className="font-extrabold text-white">{d.title[lang]}</h4>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">{d.text[lang]}</p>
            </section>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-white">{P.warranty[lang]}</h3>
        <p className="mt-2 max-w-2xl text-white/70">{P.warrantyIntro[lang]}</p>
        <div className="mt-6 overflow-x-auto rounded-md border border-white/15">
          <table className="w-full min-w-[420px] table-fixed text-start text-sm">
            <thead className="bg-white/[0.07] text-white">
              <tr>
                <th className="p-4 text-start font-bold">{P.factory[lang]}</th>
                <th className="p-4 text-start font-bold">{P.extension[lang]}</th>
                <th className="p-4 text-start font-bold text-[hsl(var(--gold))]">{P.total[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {healthcare.warrantyRows.map((y) => (
                <tr key={y} className="border-t border-white/10 text-white/80">
                  <td className="p-4 text-start"><span className="ltr-isolate">{y} {y === 1 ? P.year[lang] : P.years[lang]}</span></td>
                  <td className="p-4 text-start"><span className="ltr-isolate">+{healthcare.warrantyExtra} {P.years[lang]}</span></td>
                  <td className="p-4 text-start text-base font-extrabold text-[hsl(var(--gold))]"><span className="ltr-isolate">{y + healthcare.warrantyExtra} {P.years[lang]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-white">{P.plans[lang]}</h3>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {healthcare.plans.map((p) => (
            <section
              key={p.id}
              className={`rounded-md p-6 ${p.recommended ? 'bg-[hsl(var(--gold))] text-[hsl(var(--night))]' : 'border border-white/15 bg-white/[0.04] text-white'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-lg font-extrabold">{p.title[lang]}</h4>
                {p.recommended && <span className="shrink-0 rounded-full bg-[hsl(var(--night))] px-3 py-1 text-xs font-bold text-[hsl(var(--gold))]">{P.recommended[lang]}</span>}
              </div>
              <p className={`mt-1 text-sm ${p.recommended ? 'text-[hsl(var(--night))]/75' : 'text-white/65'}`}>{p.sub[lang]}</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                {p.items.map((i) => (
                  <li key={i.en} className="flex gap-2.5">
                    <Check size={16} className={`mt-1.5 shrink-0 ${p.recommended ? '' : 'text-[hsl(var(--gold))]'}`} />
                    <span className={p.recommended ? '' : 'text-white/80'}>{i[lang]}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-white">{P.numbers[lang]}</h3>
        <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {healthcare.numbers.map((n) => (
            <div key={n.value} className="bg-[hsl(var(--night-2))] p-6">
              <dd className="ltr-isolate text-4xl font-extrabold text-[hsl(var(--gold))]" style={{ fontFamily: 'var(--font-latin)' }}>{n.value}</dd>
              <dt className="mt-2 font-bold text-white">{n.title[lang]}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-white/65">{n.text[lang]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default function Proposals() {
  const { lang } = useLang();
  const [tab, setTab] = useState<ProposalId>('hvac');
  const data = tab === 'hvac' ? hvac : healthcare;
  const tabs: ProposalId[] = ['hvac', 'healthcare'];

  return (
    <section id="proposals" className="band bg-[hsl(var(--night))] text-white">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.6rem]">{P.title[lang]}</h2>
          <p className="max-w-prose leading-loose text-white/70 lg:text-lg">{P.intro[lang]}</p>
        </div>

        <div role="tablist" aria-label={P.title[lang]} className="mt-10 flex flex-wrap gap-2">
          {tabs.map((id) => (
            <button
              key={id}
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              onClick={() => setTab(id)}
              className={`min-h-[46px] rounded-full border px-5 text-sm font-bold transition-colors ${
                tab === id ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))] text-[hsl(var(--night))]' : 'border-white/25 text-white/80 hover:border-white/60 hover:text-white'
              }`}
            >
              {P.tabs[id][lang]}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-10 grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-2xl font-extrabold leading-snug text-white sm:text-[1.75rem]">{data.pitch[lang]}</p>
            <p className="mt-5 leading-loose text-white/75">{data.summary[lang]}</p>
            {tab === 'healthcare' && <p className="mt-4 leading-loose text-white/75">{healthcare.approach[lang]}</p>}
            <button onClick={() => requestProposal(tab, P.requestMessage[tab][lang])} className="btn btn-gold mt-8">{P.request[lang]}</button>
            <p className="mt-3 text-sm text-white/55">{P.note[lang]}</p>
            <ul className="mt-6 space-y-2">
              {MORE_FOR[tab].map((slug) => (
                <li key={slug}>
                  <Link to={servicePath(slug, lang)} className="inline-flex items-center gap-2 font-bold text-[hsl(var(--gold))] underline-offset-4 hover:underline">
                    {P.more[lang]} {getService(slug)!.name[lang]}
                    <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            {tab === 'hvac' && (
              <img src="/assets/proposals/hvac-rooftop.webp" alt="" width={900} height={506} loading="lazy" decoding="async" className="mt-8 aspect-[16/10] w-full rounded-sm object-cover opacity-90 ring-1 ring-white/15" />
            )}
          </div>
          <div>{tab === 'hvac' ? <Hvac /> : <Healthcare />}</div>
        </div>
      </div>
    </section>
  );
}
