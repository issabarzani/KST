import { useLang } from '@/lib/lang-context';

const text = { ku: 'بازدان بۆ ناوەڕۆک', en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' };

/* First stop for keyboard users: jumps past the header straight to the page */
export default function SkipLink() {
  const { lang } = useLang();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-[hsl(var(--gold))] focus:px-4 focus:py-3 focus:font-bold focus:text-[hsl(var(--night))]"
    >
      {text[lang]}
    </a>
  );
}
