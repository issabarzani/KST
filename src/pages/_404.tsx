import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from '../router';
import { useLang } from '@/lib/lang-context';

const t = {
  title: { ku: 'ئەم پەڕەیە نەدۆزرایەوە', en: 'This page does not exist', ar: 'هذه الصفحة غير موجودة' },
  text: {
    ku: 'لەوانەیە بەستەرەکە کۆن بێت یان بە هەڵە نووسرابێت. لە پەڕەی سەرەتاوە هەموو خزمەتگوزاری و زانیاری پەیوەندیمان دەدۆزیتەوە.',
    en: 'The link may be old or mistyped. Every service and our contact details are on the home page.',
    ar: 'ربما يكون الرابط قديماً أو مكتوباً بشكل خاطئ. ستجد جميع خدماتنا ومعلومات التواصل في الصفحة الرئيسية.',
  },
  home: { ku: 'بڕۆ بۆ پەڕەی سەرەتا', en: 'Go to the home page', ar: 'الذهاب إلى الصفحة الرئيسية' },
  contact: { ku: 'پەیوەندیمان پێوە بکە', en: 'Contact us', ar: 'اتصل بنا' },
};

export default function NotFoundPage() {
  const { lang } = useLang();
  return (
    <main className="relative flex min-h-[80vh] items-center overflow-hidden bg-[hsl(var(--night))] pt-[72px] text-white">
      <Helmet>
        <title>404 | Kurdistan Service Team</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
        aria-hidden="true"
      />
      <div className="wrap relative py-24">
        <p className="ltr-isolate text-7xl font-extrabold text-[hsl(var(--gold))] sm:text-8xl" style={{ fontFamily: 'var(--font-latin)' }}>
          404
        </p>
        <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">{t.title[lang]}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{t.text[lang]}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-gold">{t.home[lang]}</Link>
          <a href="/#contact" className="btn btn-ghost-light">{t.contact[lang]}</a>
        </div>
      </div>
    </main>
  );
}
