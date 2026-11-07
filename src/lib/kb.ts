import { home, portfolio } from 'virtual:content';
import type { Lang } from '@/lib/lang-context';
import { about, services, type L10n } from '@/lib/i18n';
import { hvac, healthcare } from '@/lib/proposals';

/*
  Knowledge base for the KST assistant.
  Everything here is built from the same data that renders the website, so when you edit
  a service, a proposal, a client or a phone number, the assistant learns it automatically.
  It is used in two ways:
    1. src/server/api/chat/POST.ts sends it to the AI model as the only source of facts.
    2. The chat widget uses it directly (no AI needed) when the AI endpoint is unavailable.
*/

const phones = [home.contact.phone1, home.contact.phone2, home.contact.phone3, home.contact.phone4];
const lines = (arr: L10n[], lang: Lang) => arr.map((x) => `• ${x[lang]}`).join('\n');
const l = (ku: string, en: string, ar: string): L10n => ({ ku, en, ar });

export interface KbEntry {
  id: string;
  /** words (any language, lower case) that make this entry relevant */
  keys: string[];
  title: L10n;
  text: L10n;
}

const addr: L10n = { ku: home.contact.addressKu, en: home.contact.addressEn, ar: home.contact.addressAr };

function perLang(fn: (lang: Lang) => string): L10n {
  return { ku: fn('ku'), en: fn('en'), ar: fn('ar') };
}

export const kb: KbEntry[] = [
  {
    id: 'about',
    keys: ['about', 'who', 'company', 'kst', 'دەربارە', 'کێین', 'کۆمپانیا', 'تیم', 'من نحن', 'شركة', 'من انتم', 'نبذة'],
    title: l('دەربارەی KST', 'About KST', 'عن KST'),
    text: perLang((g) => `${about.body[g]}\n\n${about.pricing[g]}`),
  },
  {
    id: 'services',
    keys: ['service', 'services', 'offer', 'خزمەتگوزاری', 'خزمەت', 'کار', 'خدمات', 'خدمة', 'تقدمون'],
    title: l('خزمەتگوزاریەکان', 'Our services', 'خدماتنا'),
    text: perLang((g) => services.map((s) => `• ${s.name[g]}: ${s.desc[g]}`).join('\n')),
  },
  ...services.map<KbEntry>((s) => ({
    id: `service-${s.key}`,
    keys: {
      construction: ['construction', 'building', 'civil', 'hotel', 'بیناسازی', 'بینا', 'بناء', 'إنشاء', 'انشاء'],
      hvac: ['hvac', 'cooling', 'air conditioning', 'ac', 'refrigeration', 'chiller', 'vrf', 'ساردکەرەوە', 'سارد', 'تکییف', 'تكييف', 'تبريد'],
      ventilation: ['ventilation', 'fresh air', 'ئایر فرێش', 'ڤێنتیلەیشن', 'تهوية', 'هواء'],
      electrical: ['electrical', 'electric', 'power', 'generator', 'کارەبا', 'وزە', 'كهرباء', 'طاقة'],
      cleanroom: ['cleanroom', 'operating room', 'theatre', 'theater', 'هۆڵی نەشتەرگەری', 'کلینرووم', 'غرف العمليات', 'غرفة عمليات'],
      medical: ['medical', 'equipment', 'device', 'repair', 'پزیشکی', 'ئامێر', 'طبي', 'أجهزة', 'معدات'],
      it: ['it', 'smart', 'network', 'technology', 'تەکنەلۆژی', 'ئایتی', 'زیرەک', 'تكنولوجيا', 'ذكي', 'شبكات'],
      pm: ['project management', 'supervision', 'manage', 'سەرپەرشتی', 'بەڕێوەبردن', 'إدارة', 'اشراف', 'إشراف'],
    }[s.key],
    title: s.name,
    text: s.desc,
  })),
  {
    id: 'hvac-proposal',
    keys: ['hvac proposal', 'hvac', 'consultancy', 'consultation', 'installation', 'commissioning', 'supply', 'پێشنیاری hvac', 'ڕاوێژ', 'دامەزراندن', 'استشارة', 'تركيب', 'عرض'],
    title: l('پێشنیاری HVAC', 'HVAC proposal', 'عرض التكييف'),
    text: perLang((g) =>
      `${hvac.pitch[g]}\n${hvac.summary[g]}\n\n${hvac.scope.map((s) => `${s.title[g]}: ${s.items.map((i) => i[g]).join(', ')}`).join('\n')}\n\n${hvac.commitment[g]}`
    ),
  },
  {
    id: 'process',
    keys: ['process', 'steps', 'how do you work', 'workflow', 'quality', 'safety', 'ڕێکار', 'هەنگاو', 'چۆن', 'کوالیتی', 'سەلامەتی', 'خطوات', 'جودة', 'سلامة', 'كيف'],
    title: l('چۆن کار دەکەین', 'How we work', 'كيف نعمل'),
    text: perLang((g) => `${hvac.steps.map((x, i) => `${i + 1}. ${x[g]}`).join('\n')}\n\n${lines(hvac.quality, g)}\n${hvac.safety[g]}`),
  },
  {
    id: 'healthcare',
    keys: ['healthcare', 'hospital', 'clinic', 'partnership', 'medical hvac', 'hepa', 'board repair', 'نەخۆشخانە', 'کلینیک', 'هاوبەشی', 'مستشفى', 'عيادة', 'شراكة'],
    title: l('هاوبەشی تەکنیکی بۆ نەخۆشخانە', 'Healthcare technical partnership', 'الشراكة الفنية للرعاية الصحية'),
    text: perLang((g) =>
      `${healthcare.pitch[g]}\n${healthcare.summary[g]}\n\n${healthcare.divisions.map((d) => `• ${d.title[g]}: ${d.text[g]}`).join('\n')}`
    ),
  },
  {
    id: 'warranty',
    keys: ['warranty', 'guarantee', 'extended', 'years', 'گەرەنتی', 'ضمان', 'كفالة', 'سنوات', 'ساڵ'],
    title: l('گەرەنتی درێژکراو', 'Extended guarantee', 'الضمان الممتد'),
    text: perLang((g) => {
      const rows = healthcare.warrantyRows.map((y) => `${y} → ${y + healthcare.warrantyExtra}`).join(', ');
      return `${healthcare.divisions.find((d) => d.title.en.startsWith('Extended'))?.text[g] ?? ''}\n(${g === 'en' ? 'factory years → total years' : g === 'ar' ? 'سنوات المصنع ← الإجمالي' : 'ساڵی کارگە ← کۆی گشتی'}: ${rows})`;
    }),
  },
  {
    id: 'plans',
    keys: ['plan', 'plans', 'maintenance', 'contract', 'monthly', 'priority', 'outsourcing', 'پلان', 'شێواز', 'چاودێری', 'گرێبەست', 'خطة', 'خطط', 'صيانة', 'عقد'],
    title: l('شێوازەکانی هاوکاری', 'Ways to work with us', 'أنماط التعاون'),
    text: perLang(
      (g) =>
        healthcare.plans
          .map((p) => `${p.id}. ${p.title[g]}${p.recommended ? ' ★' : ''} — ${p.sub[g]}\n${lines(p.items, g)}`)
          .join('\n\n')
    ),
  },
  {
    id: 'clients',
    keys: ['client', 'clients', 'projects', 'portfolio', 'worked with', 'references', 'کڕیار', 'پرۆژە', 'کارەکان', 'عملاء', 'مشاريع', 'اعمال', 'أعمال'],
    title: l('کڕیار و پرۆژەکان', 'Clients and projects', 'العملاء والمشاريع'),
    text: perLang((g) => {
      const name = (p: (typeof portfolio)[number]) => (g === 'ku' ? p.nameKu : g === 'ar' ? p.nameAr : p.nameEn);
      const loc = (p: (typeof portfolio)[number]) => (g === 'ku' ? p.location : g === 'ar' ? p.locationAr : p.locationEn);
      return portfolio.map((p) => `• ${name(p)} (${loc(p)}): ${p.sectors.join(', ')}`).join('\n');
    }),
  },
  {
    id: 'contact',
    keys: ['contact', 'phone', 'call', 'email', 'mail', 'whatsapp', 'number', 'پەیوەندی', 'ژمارە', 'تەلەفۆن', 'ئیمەیڵ', 'اتصال', 'اتصل', 'هاتف', 'رقم', 'بريد', 'تواصل'],
    title: l('پەیوەندی', 'Contact', 'التواصل'),
    text: perLang((g) => `${addr[g]}\n${phones.join('\n')}\n${home.contact.email}`),
  },
  {
    id: 'location',
    keys: ['where', 'location', 'address', 'office', 'erbil', 'map', 'کوێ', 'ناونیشان', 'هەولێر', 'ئۆفیس', 'اين', 'أين', 'عنوان', 'موقع', 'أربيل', 'اربيل'],
    title: l('ناونیشان', 'Location', 'الموقع'),
    text: addr,
  },
  {
    id: 'pricing',
    keys: ['price', 'pricing', 'cost', 'quote', 'quotation', 'how much', 'budget', 'نرخ', 'بڕ', 'تێچوو', 'سعر', 'أسعار', 'اسعار', 'تكلفة', 'عرض سعر', 'كم'],
    title: l('نرخ', 'Pricing', 'الأسعار'),
    text: perLang((g) => about.pricing[g]),
  },
];

export const suggestions: { id: string; label: L10n }[] = [
  { id: 'services', label: l('چی خزمەتگوزاری هەیە؟', 'What services do you offer?', 'ما هي خدماتكم؟') },
  { id: 'warranty', label: l('گەرەنتی درێژکراو چییە؟', 'What is the extended guarantee?', 'ما هو الضمان الممتد؟') },
  { id: 'pricing', label: l('نرخ چۆن دیاری دەکرێت؟', 'How is pricing decided?', 'كيف تُحدد الأسعار؟') },
  { id: 'contact', label: l('چۆن پەیوەندیتان پێوە بکەم؟', 'How do I contact you?', 'كيف أتواصل معكم؟') },
];

export const chatText = {
  title: l('یاریدەدەری KST', 'KST Assistant', 'مساعد KST'),
  subtitle: l('پرسیار دەربارەی کۆمپانیاکەمان بکە', 'Ask about our company', 'اسأل عن شركتنا'),
  open: l('کردنەوەی چات', 'Open chat', 'افتح المحادثة'),
  close: l('داخستن', 'Close', 'إغلاق'),
  placeholder: l('پرسیارەکەت بنووسە...', 'Type your question...', 'اكتب سؤالك...'),
  send: l('ناردن', 'Send', 'إرسال'),
  hello: l(
    'سڵاو! من یاریدەدەری KST م. دەتوانم دەربارەی خزمەتگوزاری، پێشنیار، گەرەنتی و پەیوەندی وەڵامت بدەمەوە.',
    "Hello! I'm the KST assistant. I can answer questions about our services, proposals, guarantees and how to reach us.",
    'مرحباً! أنا مساعد KST. يمكنني الإجابة عن خدماتنا وعروضنا والضمان وطرق التواصل.'
  ),
  fallback: l(
    'ئەمەم لە زانیارییەکانمان نەدۆزییەوە. دەتوانیت داواکاری بنێریت یان پەیوەندیمان پێوە بکەیت و تیمەکەمان وەڵام دەداتەوە.',
    "I could not find that in our information. You can send a request or call us and the team will answer.",
    'لم أجد ذلك في معلوماتنا. يمكنك إرسال طلب أو الاتصال بنا وسيجيبك الفريق.'
  ),
  thinking: l('دەنووسێت...', 'Typing…', 'يكتب…'),
  call: l('پەیوەندی تەلەفۆنی', 'Call us', 'اتصل بنا'),
  quote: l('داوای نرخ بکە', 'Request a quote', 'اطلب عرض سعر'),
  note: l('وەڵامەکان لەسەر زانیاری ماڵپەڕەکەن. نرخ لەسەر پرۆژەکە دادەنرێت.', 'Answers come from the information on this site. Pricing depends on the project.', 'الإجابات مبنية على معلومات الموقع. السعر حسب المشروع.'),
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ً-ٟـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ك/g, 'ک')
    .replace(/ي/g, 'ی')
    .replace(/ه‌/g, 'ە');

/** Offline answer: pick the best-matching entries (top 2) by keyword score. */
export function localAnswer(question: string, lang: Lang): { text: string; matched: string[] } {
  const q = norm(question);
  const words = new Set(q.split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  const scored = kb
    .map((e) => {
      let score = 0;
      for (const k of e.keys) {
        const nk = norm(k);
        if (nk.length <= 2 ? words.has(nk) : q.includes(nk)) score += nk.includes(' ') ? 3 : 2;
      }
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (!scored.length) return { text: chatText.fallback[lang], matched: [] };
  const top = scored.slice(0, scored[0].e.id.startsWith('service-') ? 1 : 2);
  return {
    text: top.map(({ e }) => `${e.title[lang]}\n${e.text[lang]}`).join('\n\n'),
    matched: top.map(({ e }) => e.id),
  };
}

/** Plain-text fact sheet for the AI model's system prompt (all three languages). */
export function factSheet(): string {
  const langs: [Lang, string][] = [['en', 'English'], ['ku', 'Kurdish Sorani'], ['ar', 'Arabic']];
  return kb
    .map((e) => `## ${e.title.en}\n` + langs.map(([g]) => (g === 'en' ? e.text.en : '')).join(''))
    .join('\n\n');
}
