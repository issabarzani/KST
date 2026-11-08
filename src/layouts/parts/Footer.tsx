import { Link } from 'react-router';
import { ArrowRight, MapPin } from 'lucide-react';
import { home } from 'virtual:content';
import { useLang, sectionPath, servicePath } from '@/lib/lang-context';
import { footer, nav, contactSection } from '@/lib/i18n';
import { services } from '@/lib/services';

export default function Footer() {
  const { lang } = useLang();
  const address = lang === 'ku' ? home.contact.addressKu : lang === 'ar' ? home.contact.addressAr : home.contact.addressEn;

  return (
    <footer className="bg-[hsl(var(--night))] text-white/80">
      <div className="h-1 bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--gold))] to-[hsl(209_62%_40%)]" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1.6fr_1.2fr]">
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
                <Link to={sectionPath(n.id, lang)} className="text-white/70 transition-colors hover:text-[hsl(var(--gold))]">
                  {n.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">{nav[2].label[lang]}</h3>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug} className="flex items-start gap-2.5">
                <span className="mt-[0.45rem] h-2 w-2 shrink-0 rounded-full" style={{ background: s.accent }} aria-hidden="true" />
                <Link to={servicePath(s.slug, lang)} className="leading-snug text-white/70 transition-colors hover:text-[hsl(var(--gold))]">
                  {s.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">{contactSection.label[lang]}</h3>
          <ul className="space-y-5 text-sm">
            <li className="flex gap-3">
              <MapPin size={17} className="mt-1 shrink-0 text-[hsl(var(--gold))]" aria-hidden="true" />
              <span>{address}</span>
            </li>
            <li>
              <p className="font-bold text-white">{footer.talk[lang]}</p>
              <Link to={sectionPath('contact', lang)} className="mt-2 inline-flex items-center gap-2 text-[hsl(var(--gold))] hover:text-white">
                {footer.talkLink[lang]}
                <ArrowRight size={15} className="rtl:-scale-x-100" aria-hidden="true" />
              </Link>
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
