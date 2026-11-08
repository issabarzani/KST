import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { useLang, homePath, sectionPath, servicePath, stripLang, type Lang } from '@/lib/lang-context';
import { useTheme } from '@/lib/theme-context';
import { nav, servicesSection, ui } from '@/lib/i18n';
import { services } from '@/lib/services';
import { accentTokens } from '@/lib/color';
import { serviceIcons } from '@/components/service/icons';

const langs: { id: Lang; short: string; full: string }[] = [
  { id: 'ku', short: 'کو', full: 'کوردی' },
  { id: 'en', short: 'EN', full: 'English' },
  { id: 'ar', short: 'ع', full: 'العربية' },
];

export default function Header() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = stripLang(location.pathname) === '/';
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false); // desktop services menu
  const [mobileServices, setMobileServices] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Which home section is on screen (on a service page, "Services" is the current item)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (!onHome) return setActive('services');
      const y = window.scrollY + 120;
      let current = 'home';
      for (const item of nav) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= y) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  // Close menus when the page changes
  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [location.pathname]);

  // Close the services menu on Escape or a click outside it
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    const onClick = (e: MouseEvent) => !menuRef.current?.contains(e.target as Node) && setMenu(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [menu]);

  const go = (id: string) => {
    setOpen(false);
    setMenu(false);
    const el = onHome ? document.getElementById(id) : null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(window.history.state, '', `#${id}`);
    } else navigate(sectionPath(id, lang));
  };

  const serviceLinks = (onPick?: () => void, compact = false) => (
    <ul className={compact ? 'space-y-1' : 'grid gap-1 sm:grid-cols-2'}>
      {services.map((s) => {
        const Icon = serviceIcons[s.slug];
        const t = accentTokens(s.accent);
        const here = stripLang(location.pathname) === `/services/${s.slug}`;
        return (
          <li key={s.slug}>
            <Link
              to={servicePath(s.slug, lang)}
              onClick={onPick}
              aria-current={here ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.92rem] font-semibold leading-snug transition-colors hover:bg-muted ${here ? 'bg-muted' : ''}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded" style={{ background: t.solid, color: t.onAccent }}>
                <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
              </span>
              {s.name[lang]}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur transition-shadow ${
        scrolled || !onHome ? 'border-border shadow-md' : 'border-transparent'
      }`}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link
          to={homePath(lang)}
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              go('home');
            }
          }}
          aria-label="Kurdistan Service Team"
          className="flex shrink-0 items-center rounded-md bg-white px-2 py-1 ring-1 ring-black/5"
        >
          <img src="/assets/kst-logo-sm.png" alt="Kurdistan Service Team" width={145} height={120} className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) =>
            item.id === 'services' ? (
              <div key={item.id} ref={menuRef} className="relative">
                <button
                  onClick={() => setMenu(!menu)}
                  aria-expanded={menu}
                  aria-controls="services-menu"
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative flex items-center gap-1 px-3.5 py-2 text-[0.92rem] font-semibold transition-colors ${
                    active === item.id ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.label[lang]}
                  <ChevronDown size={15} className={`transition-transform ${menu ? 'rotate-180' : ''}`} aria-hidden="true" />
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full bg-[hsl(var(--accent))] transition-transform ${
                      active === item.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
                {menu && (
                  <div
                    id="services-menu"
                    className="absolute start-1/2 top-full mt-3 w-[min(46rem,calc(100vw-4rem))] -translate-x-1/2 rounded-lg border border-border bg-card p-3 shadow-2xl rtl:translate-x-1/2"
                  >
                    {serviceLinks(() => setMenu(false))}
                    <button
                      onClick={() => go('services')}
                      className="mt-2 flex w-full items-center justify-between gap-2 rounded-md border-t border-border px-3 pb-1 pt-3 text-sm font-bold text-primary"
                    >
                      {servicesSection.menuAll[lang]}
                      <ArrowRight size={15} className="rtl:-scale-x-100" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative px-3.5 py-2 text-[0.92rem] font-semibold transition-colors ${
                  active === item.id ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.label[lang]}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full bg-[hsl(var(--accent))] transition-transform ${
                    active === item.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div role="group" aria-label="Language" className="flex rounded-md border border-border bg-card p-0.5">
            {langs.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                aria-pressed={lang === l.id}
                lang={l.id === 'ku' ? 'ckb' : l.id}
                title={l.full}
                className={`min-w-[2.5rem] rounded px-2.5 py-1.5 text-xs font-bold transition-colors ${
                  lang === l.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            aria-label={ui.theme[lang]}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button onClick={() => go('contact')} className="btn btn-blue !min-h-[42px] !px-5 !text-sm">
            {ui.quote[lang]}
          </button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={ui.menu[lang]}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <div className="wrap space-y-1 py-4">
            {nav.map((item) =>
              item.id === 'services' ? (
                <div key={item.id}>
                  <button
                    onClick={() => setMobileServices(!mobileServices)}
                    aria-expanded={mobileServices}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-start text-base font-semibold ${
                      active === item.id ? 'bg-primary/10 text-primary' : 'text-foreground/80'
                    }`}
                  >
                    {item.label[lang]}
                    <ChevronDown size={18} className={`transition-transform ${mobileServices ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {mobileServices && <div className="ps-2 pt-1">{serviceLinks(() => setOpen(false), true)}</div>}
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`block w-full rounded-md px-3 py-3 text-start text-base font-semibold ${
                    active === item.id ? 'bg-primary/10 text-primary' : 'text-foreground/80'
                  }`}
                >
                  {item.label[lang]}
                </button>
              )
            )}
            <div className="flex items-center gap-2 pt-3">
              <div role="group" aria-label="Language" className="flex flex-1 rounded-md border border-border bg-card p-0.5">
                {langs.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLang(l.id)}
                    aria-pressed={lang === l.id}
                    lang={l.id === 'ku' ? 'ckb' : l.id}
                    className={`flex-1 rounded px-2 py-2 text-sm font-bold ${
                      lang === l.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {l.full}
                  </button>
                ))}
              </div>
              <button
                onClick={toggleTheme}
                aria-label={ui.theme[lang]}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted-foreground"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
            <button onClick={() => go('contact')} className="btn btn-blue mt-2 w-full">
              {ui.quote[lang]}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
