import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLang, type Lang } from '@/lib/lang-context';
import { useTheme } from '@/lib/theme-context';
import { nav, ui } from '@/lib/i18n';

const langs: { id: Lang; short: string; full: string }[] = [
  { id: 'ku', short: 'کو', full: 'کوردی' },
  { id: 'en', short: 'EN', full: 'English' },
  { id: 'ar', short: 'ع', full: 'العربية' },
];

function goTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  else window.location.href = `/#${id}`; // e.g. from the 404 page
}

export default function Header() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
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
  }, []);

  const go = (id: string) => {
    setOpen(false);
    goTo(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur transition-shadow ${
        scrolled ? 'border-border shadow-md' : 'border-transparent'
      }`}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); go('home'); }}
          aria-label="Kurdistan Service Team"
          className="flex shrink-0 items-center rounded-md bg-white px-2 py-1 ring-1 ring-black/5"
        >
          <img src="/assets/kst-logo-sm.png" alt="Kurdistan Service Team" width={145} height={120} className="h-11 w-auto" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
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
                className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-[hsl(var(--accent))] transition-transform origin-center ${
                  active === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div role="group" aria-label="Language" className="flex rounded-md border border-border bg-card p-0.5">
            {langs.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                aria-pressed={lang === l.id}
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
        <div className="border-t border-border bg-background lg:hidden">
          <div className="wrap space-y-1 py-4">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`block w-full rounded-md px-3 py-3 text-start text-base font-semibold ${
                  active === item.id ? 'bg-primary/10 text-primary' : 'text-foreground/80'
                }`}
              >
                {item.label[lang]}
              </button>
            ))}
            <div className="flex items-center gap-2 pt-3">
              <div role="group" aria-label="Language" className="flex flex-1 rounded-md border border-border bg-card p-0.5">
                {langs.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLang(l.id)}
                    aria-pressed={lang === l.id}
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
