import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { safeStorage } from '@/lib/safe-storage';

export type Lang = 'ku' | 'en' | 'ar';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'ku', setLang: () => {} });

const KEY = 'kst-lang';
export const HTML_LANG: Record<Lang, [string, 'rtl' | 'ltr']> = { ku: ['ckb', 'rtl'], en: ['en', 'ltr'], ar: ['ar', 'rtl'] };
export const LANGS: Lang[] = ['ku', 'en', 'ar'];
const isLang = (v: unknown): v is Lang => v === 'ku' || v === 'en' || v === 'ar';

/*
  Every page has its own address per language, so search engines and shared links open the right one:
    Kurdish (default)  /            /services/hvac
    English            /en          /en/services/hvac
    Arabic             /ar          /ar/services/hvac
*/
const PREFIX = /^\/(en|ar)(?=\/|$)/;

export const langFromPath = (pathname: string): Lang => (PREFIX.exec(pathname)?.[1] as Lang | undefined) ?? 'ku';

/** The same page without its language part: /en/services/hvac -> /services/hvac */
export const stripLang = (pathname: string): string => pathname.replace(PREFIX, '') || '/';

/** The same page in another language: localize('/services/hvac', 'ar') -> /ar/services/hvac */
export function localize(pathname: string, lang: Lang): string {
  const base = stripLang(pathname);
  if (lang === 'ku') return base;
  return base === '/' ? `/${lang}` : `/${lang}${base}`;
}

export const homePath = (lang: Lang) => localize('/', lang);
export const servicePath = (slug: string, lang: Lang) => localize(`/services/${slug}`, lang);
/** Link to a home page section, e.g. sectionPath('contact', 'en') -> /en#contact */
export const sectionPath = (id: string, lang: Lang, search = '') => `${homePath(lang)}${search}#${id}`;

function apply(l: Lang) {
  document.documentElement.lang = HTML_LANG[l][0];
  document.documentElement.dir = HTML_LANG[l][1];
}

export function LangProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(location.pathname);

  useEffect(() => apply(lang), [lang]);

  const setLang = useCallback(
    (l: Lang) => {
      safeStorage.setItem(KEY, l);
      if (l === lang) return;
      // keep the visitor where they are on the page
      navigate(localize(location.pathname, l) + location.search + location.hash, { preventScrollReset: true });
    },
    [lang, location.pathname, location.search, location.hash, navigate]
  );

  // Old links (?lang=en) and a visitor's saved choice when they type the bare domain
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const fromUrl = params.get('lang');
      if (isLang(fromUrl)) {
        params.delete('lang');
        const rest = params.toString();
        navigate(localize(location.pathname, fromUrl) + (rest ? `?${rest}` : '') + location.hash, { replace: true });
        return;
      }
      const saved = safeStorage.getItem(KEY);
      const cameFromSite = document.referrer && new URL(document.referrer).origin === window.location.origin;
      if (location.pathname === '/' && isLang(saved) && saved !== 'ku' && !cameFromSite) {
        navigate(localize('/', saved) + location.search + location.hash, { replace: true });
      }
    } catch {
      /* stay on the page as it is */
    }
    // run once, on arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
