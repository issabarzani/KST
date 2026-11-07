import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { home } from 'virtual:content';
import { useLang } from '@/lib/lang-context';
import { contactSection as c, services } from '@/lib/i18n';
import { CONTACT_FORM_ENDPOINT } from '@/config/forms';

type Field = 'name' | 'company' | 'phone' | 'email' | 'service' | 'message';
type Checked = 'name' | 'phone' | 'email' | 'service' | 'message';

const empty: Record<Field, string> = { name: '', company: '', phone: '', email: '', service: '', message: '' };
const phones = [home.contact.phone1, home.contact.phone2, home.contact.phone3, home.contact.phone4];
const tel = (p: string) => `tel:${p.replace(/\s/g, '')}`;
const ORDER: Checked[] = ['name', 'phone', 'email', 'service', 'message'];

// Kurdish/Arabic digits count as digits too
const toLatinDigits = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));

function validate(d: Record<Field, string>): Partial<Record<Checked, true>> {
  const e: Partial<Record<Checked, true>> = {};
  if (d.name.trim().length < 2) e.name = true;
  if (toLatinDigits(d.phone).replace(/\D/g, '').length < 7) e.phone = true;
  if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = true;
  if (!d.service) e.service = true;
  if (d.message.trim().length < 10) e.message = true;
  return e;
}

export default function Contact() {
  const { lang } = useLang();
  const [data, setData] = useState(empty);
  const [trap, setTrap] = useState(''); // honeypot, left empty by people
  const [errors, setErrors] = useState<Partial<Record<Checked, true>>>({});
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // "Request this proposal" buttons and the assistant fill in the service and an opening line
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { service, message } = (e as CustomEvent<{ service: string; message: string }>).detail;
      setDone(false);
      setData((d) => ({ ...d, service, message: d.message || message + ' ' }));
    };
    window.addEventListener('kst:prefill', onPrefill);
    return () => window.removeEventListener('kst:prefill', onPrefill);
  }, []);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...data, [e.target.name]: e.target.value };
    setData(next);
    if (tried) setErrors(validate(next)); // after the first attempt, errors clear as people type
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    const found = validate(data);
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (trap) {
      // a bot filled the hidden field: pretend it worked, send nothing
      setDone(true);
      return;
    }

    setSending(true);
    setFailed(false);
    const svc = services.find((s) => s.key === data.service);
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `KST website request: ${svc ? svc.name.en : data.service} (${data.name.trim()})`,
          name: data.name.trim(),
          company: data.company.trim(),
          phone: toLatinDigits(data.phone.trim()),
          ...(data.email.trim() ? { email: data.email.trim() } : {}),
          service: svc ? `${svc.name.en} / ${svc.name.ku}` : data.service,
          message: data.message.trim(),
          language: lang === 'ku' ? 'Kurdish' : lang === 'ar' ? 'Arabic' : 'English',
          _gotcha: '',
        }),
      });
      if (!res.ok) throw new Error(`send failed ${res.status}`);
      setDone(true);
      setData(empty);
      setTried(false);
      setErrors({});
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const address = lang === 'ku' ? home.contact.addressKu : lang === 'ar' ? home.contact.addressAr : home.contact.addressEn;

  const label = (field: Field, text: string, req = false) => (
    <label htmlFor={`f-${field}`} className="mb-1.5 block text-sm font-bold">
      {text}
      {req && (
        <span className="ms-1 text-[hsl(var(--accent))]" aria-hidden="true">*</span>
      )}
      {req && <span className="sr-only"> ({c.required[lang]})</span>}
    </label>
  );
  const err = (field: Checked) =>
    errors[field] ? (
      <p id={`e-${field}`} className="mt-1.5 text-sm font-semibold text-destructive">
        {c.invalid[field][lang]}
      </p>
    ) : null;
  const a11y = (field: Checked) => ({
    id: `f-${field}`,
    name: field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `e-${field}` : undefined,
  });
  const fieldCls = (field: Checked) => `field ${errors[field] ? '!border-destructive focus:!ring-destructive/25' : ''}`;

  return (
    <section id="contact" className="band bg-secondary">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">{c.title[lang]}</h2>
          <p className="mt-5 text-lg leading-loose text-muted-foreground">{c.lead[lang]}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-9">
            {done ? (
              <div ref={doneRef} tabIndex={-1} role="status" className="py-10 text-center outline-none">
                <CheckCircle2 size={52} className="mx-auto text-success" />
                <h3 className="mt-5 text-xl font-extrabold">{c.successTitle[lang]}</h3>
                <p className="mt-2 text-muted-foreground">{c.successText[lang]}</p>
                <button onClick={() => setDone(false)} className="btn mt-7 border border-border hover:bg-muted">
                  {c.another[lang]}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate className="relative space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    {label('name', c.name[lang], true)}
                    <input className={fieldCls('name')} {...a11y('name')} autoComplete="name" value={data.name} onChange={onChange} />
                    {err('name')}
                  </div>
                  <div>
                    {label('company', c.company[lang])}
                    <input className="field" id="f-company" name="company" autoComplete="organization" value={data.company} onChange={onChange} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    {label('phone', c.phone[lang], true)}
                    <input
                      className={fieldCls('phone')}
                      {...a11y('phone')}
                      dir="ltr"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+964 750 000 0000"
                      value={data.phone}
                      onChange={onChange}
                      style={{ textAlign: 'start' }}
                    />
                    {err('phone')}
                  </div>
                  <div>
                    {label('email', c.email[lang])}
                    <input
                      className={fieldCls('email')}
                      {...a11y('email')}
                      dir="ltr"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={data.email}
                      onChange={onChange}
                      style={{ textAlign: 'start' }}
                    />
                    {err('email')}
                  </div>
                </div>
                <div>
                  {label('service', c.service[lang], true)}
                  <select className={fieldCls('service')} {...a11y('service')} value={data.service} onChange={onChange}>
                    <option value="" disabled>
                      {c.servicePlaceholder[lang]}
                    </option>
                    {services.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.name[lang]}
                      </option>
                    ))}
                  </select>
                  {err('service')}
                </div>
                <div>
                  {label('message', c.message[lang], true)}
                  <textarea
                    className={`${fieldCls('message')} resize-y`}
                    {...a11y('message')}
                    rows={5}
                    maxLength={3000}
                    placeholder={c.messagePlaceholder[lang]}
                    value={data.message}
                    onChange={onChange}
                  />
                  {err('message')}
                </div>

                {/* Honeypot: hidden from people and screen readers, bots fill it in */}
                <div aria-hidden="true" className="pointer-events-none absolute start-0 top-0 h-0 w-0 overflow-hidden opacity-0">
                  <label>
                    Leave empty
                    <input tabIndex={-1} autoComplete="off" name="_gotcha" value={trap} onChange={(e) => setTrap(e.target.value)} />
                  </label>
                </div>

                {failed && (
                  <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    <p className="font-semibold">{c.error[lang]}</p>
                    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>{c.orReach[lang]}</span>
                      <a href={tel(phones[0])} className="ltr-isolate font-bold underline underline-offset-2">{phones[0]}</a>
                      <a href={`mailto:${home.contact.email}`} className="ltr-isolate font-bold underline underline-offset-2">{home.contact.email}</a>
                    </p>
                  </div>
                )}

                <button type="submit" disabled={sending} aria-busy={sending} className="btn btn-blue w-full disabled:opacity-70">
                  {sending && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
                  {sending ? c.sending[lang] : c.send[lang]}
                </button>
                <div className="space-y-1 text-center text-xs text-muted-foreground">
                  <p>{c.pricingBadge[lang]}</p>
                  <p>{c.privacy[lang]}</p>
                </div>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-primary/10 text-primary"><MapPin size={20} aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-bold">{c.address[lang]}</p>
                  <p className="mt-1 text-muted-foreground">{address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-primary/10 text-primary"><Phone size={20} aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-bold">{c.phone[lang]}</p>
                  <div className="mt-1 grid gap-x-6 sm:grid-cols-2">
                    {phones.map((p) => (
                      <a key={p} href={tel(p)} className="ltr-isolate py-1 text-muted-foreground hover:text-primary">{p}</a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-primary/10 text-primary"><Mail size={20} aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-bold">{c.email[lang]}</p>
                  <a href={`mailto:${home.contact.email}`} className="ltr-isolate mt-1 break-all text-muted-foreground hover:text-primary">{home.contact.email}</a>
                </div>
              </li>
            </ul>

            <div className="overflow-hidden rounded-md border border-border">
              <iframe
                title={c.mapTitle[lang]}
                src="https://maps.google.com/maps?q=Grand+Swiss+Mall,+Pirmam,+Erbil,+Iraq&output=embed&z=16"
                className="block h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
