import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { safeStorage } from '@/lib/safe-storage';

const COOKIE_CONSENT_KEY = 'c2_analytics_consent';
const COOKIE_CONSENT_EXPIRES_DAYS = 365;
const BANNER_RESET_KEY = 'airo-banner-reset';

interface CookieConsent {
  analytics: boolean;
  timestamp: number;
}

declare global {
  interface Window {
    _signalsDataLayer?: unknown[];
    _trfd?: unknown[];
    _allowCT?: boolean;
    revokeAnalyticsConsent?: () => void;
    __SCC_INIT__?: boolean;
  }
}

// Loads the SCC C2 script unconditionally and registers a consent-gated click
// listener. SCC loads without waiting for consent — C2 manages its own
// collection behavior; the banner gates what gets collected via _allowCT, not
// whether the script loads. `ap` is pushed onto `_trfd` once so it appears on
// all events for this page without repeating it per event.
function initTracking(): void {
  if (typeof window === 'undefined' || window.__SCC_INIT__) return;
  window.__SCC_INIT__ = true;
  window._signalsDataLayer = window._signalsDataLayer || [];

  const appId: string | undefined = import.meta.env.SITE_ID;
  window._trfd = window._trfd || [];
  window._trfd.push({ ap: 'airo-app-builder', ...(appId ? { websiteId: appId } : {}) });

  const h = location.hostname;
  const url = h === 'localhost' || h.includes('dev-airoapp')
    ? 'https://img1.dev-wsimg.com/signals/js/clients/scc-c2/scc-c2.js'
    : h.includes('test-airoapp')
      ? 'https://img1.test-wsimg.com/signals/js/clients/scc-c2/scc-c2.min.js'
      : 'https://img1.wsimg.com/signals/js/clients/scc-c2/scc-c2.min.js';
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.head.appendChild(script);

  const track = (eid: string, type: string, label: string, props?: Record<string, unknown>) => {
    window._signalsDataLayer!.push({
      schema: 'add_event', version: 'v1',
      data: { eid, type, event_label: label, custom_properties: { ...props } }
    });
  };

  const getSection = (el: HTMLElement): string => {
    if (el.closest('header')) return 'header';
    if (el.closest('footer')) return 'footer';
    if (el.closest('nav')) return 'nav';
    if (el.closest('main')) return 'main';
    return 'page';
  };

  document.addEventListener('click', (e) => {
    if (!window._allowCT) return;
    const el = (e.target as HTMLElement)?.closest('a, button, [role="button"]') as HTMLElement;
    if (!el) return;
    const text = el.textContent?.trim()?.substring(0, 100) || '';
    const href = (el as HTMLAnchorElement).href || '';
    const type = el.tagName.toLowerCase() === 'a' ? 'link' : 'button';

    let isExternal: boolean | undefined;
    if (href) {
      try {
        isExternal = new URL(href, location.origin).origin !== location.origin;
      } catch {
        // Malformed URL, treat as internal
      }
    }

    track('airo.website.click', 'click', text || type, {
      element_type: type,
      element_text: text,
      element_id: el.id || undefined,
      section: getSection(el),
      page_title: document.title,
      href: href || undefined,
      is_external: href ? isExternal : undefined,
    });
  }, true);
}

type BannerLang = 'ku' | 'en' | 'ar';
const bannerText: Record<'title' | 'body' | 'accept' | 'decline' | 'label', Record<BannerLang, string>> = {
  title: { ku: 'کووکیز', en: 'Cookies', ar: 'ملفات تعريف الارتباط' },
  body: {
    ku: 'ئەم ماڵپەڕە کووکیز و ئامرازی هاوشێوە بەکاردێنێت بۆ کارکردنی بنەڕەتی ماڵپەڕەکە و بۆ تێگەیشتن لەوەی سەردانکەران چۆن بەکاری دێنن. بە کرتەکردن لە «ڕازیم» ڕەزامەندی دەدەیت بە بەکارهێنانیان بۆ ڕیکلام، شیکاری و پشتگیری.',
    en: 'We use cookies and similar tools to run essential site features and to understand how visitors use the site. By clicking Accept, you agree to their use for advertising, analytics and support.',
    ar: 'يستخدم هذا الموقع ملفات تعريف الارتباط وأدوات مشابهة لتشغيل الخدمات الأساسية ولفهم كيفية استخدام الزوار للموقع. بالنقر على «موافق» فإنك توافق على استخدامها للإعلان والتحليلات والدعم.',
  },
  accept: { ku: 'ڕازیم', en: 'Accept', ar: 'موافق' },
  decline: { ku: 'ڕەتکردنەوە', en: 'Decline', ar: 'رفض' },
  label: { ku: 'ڕەزامەندی کووکیز', en: 'Cookie consent', ar: 'الموافقة على ملفات تعريف الارتباط' },
};

/* The banner sits outside the language provider, so it follows the <html lang> attribute */
function useHtmlLang(): BannerLang {
  const read = (): BannerLang => {
    const l = typeof document !== 'undefined' ? document.documentElement.lang : 'ckb';
    return l === 'en' ? 'en' : l === 'ar' ? 'ar' : 'ku';
  };
  const [lang, setLang] = useState<BannerLang>(read);
  useEffect(() => {
    const mo = new MutationObserver(() => setLang(read()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => mo.disconnect();
  }, []);
  return lang;
}

/**
 * Cookie banner component for C2 analytics consent
 *
 * Displays a consent banner for C2 analytics tracking. Manages user consent
 * preferences in localStorage and gates click event collection via window._allowCT.
 * The SCC script is always loaded; consent only controls what gets collected.
 */
export default function CookieBanner() {
  const lang = useHtmlLang();
  const boxRef = useRef<HTMLDivElement>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isEmbedded: boolean = typeof window !== 'undefined' && window.parent !== window;
  const [hideForBuilderPreview, setHideForBuilderPreview] = useState<boolean>(
    () => {
      if (!isEmbedded) return false;
      try {
        return sessionStorage.getItem(BANNER_RESET_KEY) !== 'true';
      } catch (e) {
        console.warn('CookieBanner: sessionStorage unavailable, banner state will not persist across remounts:', e instanceof Error ? e.message : String(e));
        return true;
      }
    }
  );

  useEffect(function checkConsent() {
    if (typeof window === 'undefined') return;

    initTracking();

    const consentData = safeStorage.getItem(COOKIE_CONSENT_KEY);

    if (!consentData) {
      setShowBanner(true);
      setIsLoaded(true);
      return;
    }

    try {
      const consent: CookieConsent = JSON.parse(consentData);
      const daysSinceConsent = (Date.now() - consent.timestamp) / (1000 * 60 * 60 * 24);

      if (daysSinceConsent > COOKIE_CONSENT_EXPIRES_DAYS) {
        safeStorage.removeItem(COOKIE_CONSENT_KEY);
        setShowBanner(true);
      } else {
        window._allowCT = consent.analytics;
      }
    } catch {
      safeStorage.removeItem(COOKIE_CONSENT_KEY);
      setShowBanner(true);
    }

    setIsLoaded(true);
  }, []);

  function saveConsent(analytics: boolean) {
    safeStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ analytics, timestamp: Date.now() }));
    window._allowCT = analytics;
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: { consented: analytics } }));
    setShowBanner(false);
  }

  function revokeConsent() {
    if (typeof window === 'undefined') return;
    safeStorage.removeItem(COOKIE_CONSENT_KEY);
    window._allowCT = false;
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: { consented: false } }));
    setShowBanner(true);
  }

  useEffect(function exposeRevokeFunction() {
    if (typeof window === 'undefined') return;
    window.revokeAnalyticsConsent = revokeConsent;
    return () => { delete window.revokeAnalyticsConsent; };
  }, []);

  useEffect(function listenForBuilderBuildComplete() {
    if (typeof window === 'undefined' || window.parent === window) return;

    function handleMessage(event: MessageEvent): void {
      if (event.source !== window.parent) return;
      if (event.data?.type === 'INITIAL_BUILD_COMPLETE') {
        saveConsent(true);
        setHideForBuilderPreview(true);
        try {
          sessionStorage.removeItem(BANNER_RESET_KEY);
        } catch (e) {
          console.warn('CookieBanner: sessionStorage unavailable, could not clear reset flag:', e instanceof Error ? e.message : String(e));
        }
      }
      if (event.data?.type === 'RESET_INITIAL_BUILD_HIDE') {
        setHideForBuilderPreview(false);
        try {
          sessionStorage.setItem(BANNER_RESET_KEY, 'true');
        } catch (e) {
          console.warn('CookieBanner: sessionStorage unavailable, reset flag will not persist:', e instanceof Error ? e.message : String(e));
        }
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const visible = !hideForBuilderPreview && isLoaded && showBanner;

  // Publish the banner height so floating buttons (the chat) can sit above it
  useEffect(() => {
    const root = document.documentElement;
    const el = boxRef.current;
    if (!visible || !el) {
      root.style.setProperty('--banner-h', '0px');
      return;
    }
    const update = () => root.style.setProperty('--banner-h', `${el.offsetHeight}px`);
    update();
    let ro: ResizeObserver | null = null;
    try {
      ro = new ResizeObserver(update);
      ro.observe(el);
    } catch {
      window.addEventListener('resize', update); // older browsers: re-measure on resize
    }
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
      root.style.setProperty('--banner-h', '0px');
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={boxRef}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card text-card-foreground shadow-lg"
      role="alertdialog"
      aria-live="polite"
      aria-label={bannerText.label[lang]}
      aria-describedby="cookie-banner-description"
      data-airo-non-editable
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="mb-1 text-sm font-bold">{bannerText.title[lang]}</p>
            <p id="cookie-banner-description" className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {bannerText.body[lang]}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button size="sm" variant="secondary" onClick={() => saveConsent(false)} className="whitespace-nowrap">{bannerText.decline[lang]}</Button>
            <Button size="sm" onClick={() => saveConsent(true)} className="whitespace-nowrap">{bannerText.accept[lang]}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
