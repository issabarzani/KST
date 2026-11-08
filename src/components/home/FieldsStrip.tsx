import { Link } from 'react-router';
import { useLang, servicePath } from '@/lib/lang-context';
import { fieldsStrip } from '@/lib/i18n';
import { services } from '@/lib/services';
import { serviceIcons } from '@/components/service/icons';

/*
  A slow, endless strip of the eight fields under the hero; every name opens its page.
  It pauses while the pointer is on it or a link has keyboard focus, and stands still with reduced motion.
*/
export default function FieldsStrip() {
  const { lang } = useLang();
  const items = (copy: number) =>
    services.map((s) => {
      const Icon = serviceIcons[s.slug];
      return (
        <li key={`${copy}-${s.slug}`} className="flex shrink-0 items-center" aria-hidden={copy ? true : undefined}>
          <Link
            to={servicePath(s.slug, lang)}
            tabIndex={copy ? -1 : undefined}
            className="flex items-center gap-3 rounded-full px-4 py-2 text-[0.95rem] font-semibold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <Icon size={18} strokeWidth={1.8} style={{ color: s.accent }} aria-hidden="true" />
            <span className="whitespace-nowrap">{s.name[lang]}</span>
          </Link>
          <span className="mx-3 h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden="true" />
        </li>
      );
    });

  return (
    <nav aria-label={fieldsStrip.label[lang]} className="marquee-wrap relative overflow-hidden border-y border-white/10 bg-[hsl(var(--night-2))] py-3">
      <div className="pointer-events-none absolute inset-y-0 start-0 z-[1] w-16 bg-gradient-to-r from-[hsl(var(--night-2))] to-transparent rtl:bg-gradient-to-l" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-[1] w-16 bg-gradient-to-l from-[hsl(var(--night-2))] to-transparent rtl:bg-gradient-to-r" aria-hidden="true" />
      <ul className="marquee flex w-max">
        {items(0)}
        {items(1)}
      </ul>
    </nav>
  );
}
