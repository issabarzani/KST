import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { safeStorage } from '@/lib/safe-storage';

export type Lang = 'ku' | 'en' | 'ar';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'ku', setLang: () => {} });

const KEY = 'kst-lang';
const HTML: Record<Lang, [string, 'rtl' | 'ltr']> = { ku: ['ckb', 'rtl'], en: ['en', 'ltr'], ar: ['ar', 'rtl'] };
const isLang = (v: unknown): v is Lang => v === 'ku' || v === 'en' || v === 'ar';

function apply(l: Lang) {
  document.documentElement.lang = HTML[l][0];
  document.documentElement.dir = HTML[l][1];
}

/*
  Kurdish is the default. A visitor's choice is remembered on their device, and a link can
  open the site in a language: kurdistanserviceteam.com/?lang=en (or ar, ku).
*/
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ku');

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    apply(l);
    safeStorage.setItem(KEY, l);
  }, []);

  useEffect(() => {
    let initial: Lang = 'ku';
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('lang');
      const saved = safeStorage.getItem(KEY);
      if (isLang(fromUrl)) initial = fromUrl;
      else if (isLang(saved)) initial = saved;
    } catch {
      /* keep Kurdish */
    }
    setLangState(initial);
    apply(initial);
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
