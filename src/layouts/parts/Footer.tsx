import { Mail, MapPin, Phone } from 'lucide-react';
import { home } from 'virtual:content';
import { useLang } from '@/lib/lang-context';
import { footer, nav, services, contactSection } from '@/lib/i18n';

const phones = [home.contact.phone1, home.contact.phone2, home.contact.phone3, home.contact.phone4];
const tel = (p: string) => `tel:${p.replace(/\s/g, '')}`;

export default function Footer() {
  const { lang } = useLang();
  const address = lang === 'ku' ? home.contact.addressKu : lang === 'ar' ? home.contact.addressAr : home.contact.addressEn;

  return (
    <footer className="bg-[hsl(var(--night))] text-white/80">
      <div className="h-1 bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--gold))] to-[hsl(209_62%_40%)]" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.4fr]">
        <div>
          <span className="inline-flex rounded-md bg-white px-2 py-1">
            <img src="/assets/kst-logo-sm.png" alt="Kurdistan Service Team" width={145} height={120} className="h-12 w-auto" />
          </span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{footer.blurb[lang]}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">{footer.links[lang]}</h3>
          <ul className="space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-white/70 transition-colors hover:text-[hsl(var(--gold))]">{n.label[lang]}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">{nav[2].label[lang]}</h3>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.key}>
                <a href="#services" className="text-white/70 transition-colors hover:text-[hsl(var(--gold))]">{s.name[lang]}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">{contactSection.label[lang]}</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><MapPin size={17} className="mt-1 shrink-0 text-[hsl(var(--gold))]" /><span>{address}</span></li>
            <li className="flex gap-3">
              <Phone size={17} className="mt-1 shrink-0 text-[hsl(var(--gold))]" />
              <span className="space-y-1">
                {phones.map((p) => (
                  <a key={p} href={tel(p)} className="ltr-isolate block text-white/80 hover:text-white">{p}</a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail size={17} className="mt-1 shrink-0 text-[hsl(var(--gold))]" />
              <a href={`mailto:${home.contact.email}`} className="ltr-isolate break-all text-white/80 hover:text-white">{home.contact.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Kurdistan Service Team. {footer.rights[lang]}</p>
          <p className="ltr-isolate">kurdistanserviceteam.com</p>
        </div>
      </div>
    </footer>
  );
}
