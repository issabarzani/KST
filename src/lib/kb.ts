import { home, portfolio } from 'virtual:content';
import type { Lang } from '@/lib/lang-context';
import { about, sectorLabels, type L10n } from '@/lib/i18n';
import { whatsappNumbers } from '@/lib/contact';
import { hvac, healthcare } from '@/lib/proposals';
import { processSteps } from '@/lib/process';
import { services, type Service } from '@/lib/services';

/*
  Knowledge base for the KST assistant.
  Everything here is built from the same data that renders the website (src/lib/services.ts for the
  eight fields), so when you edit a service, a client or a phone number, the assistant learns it too.
  It is used in two ways:
    1. The AI model gets factSheet() as its only source of facts (src/lib/chat-core.ts).
    2. The chat widget answers from localAnswer() directly when the AI is unavailable.
  Links are written as [label](/services/slug); the chat widget turns them into links in the visitor's language.
*/

const l = (ku: string, en: string, ar: string): L10n => ({ ku, en, ar });
const lines = (arr: L10n[], lang: Lang) => arr.map((x) => `• ${x[lang]}`).join('\n');

export interface KbEntry {
  id: string;
  /** words (any language, lower case) that make this entry relevant */
  keys: string[];
  title: L10n;
  text: L10n;
}

const addr: L10n = { ku: home.contact.addressKu, en: home.contact.addressEn, ar: home.contact.addressAr };
const perLang = (fn: (lang: Lang) => string): L10n => ({ ku: fn('ku'), en: fn('en'), ar: fn('ar') });

export const link = (s: Service, lang: Lang) => `[${s.name[lang]}](/services/${s.slug})`;

/** A short follow-up question, as the owner asked: type of place, city, size. */
export const askBack = l(
  'شوێنەکەت چ جۆرێکە، لە کام شارە و نزیکەی چەند گەورەیە؟',
  'What kind of place is it, which city is it in, and roughly how big is it?',
  'ما نوع المكان، وفي أي مدينة، وما حجمه تقريباً؟'
);

const yesIntro = l('بەڵێ، ئەمە لە کارەکانی ئێمەیە.', 'Yes, this is part of our work.', 'نعم، هذا من صميم عملنا.');
const oneTeam = l(
  'بەڵێ، هەموو ئەم کارانە دەکەین و هەموویان لەژێر یەک تیمدان:',
  'Yes, we do all of this, and it is all handled by one team:',
  'نعم، ننفذ كل ذلك، وكله تحت إدارة فريق واحد:'
);
const readMore = l('زیاتر:', 'More:', 'المزيد:');

const serviceEntries: KbEntry[] = services.map((s) => ({
  id: `service-${s.slug}`,
  keys: [...s.keywords, s.name.en.toLowerCase()],
  title: s.name,
  text: perLang((g) => `${yesIntro[g]} ${s.summary[g]}\n${lines(s.bullets, g)}\n${readMore[g]} ${link(s, g)}\n${askBack[g]}`),
}));

export const kb: KbEntry[] = [
  {
    id: 'about',
    keys: ['about', 'who', 'company', 'kst', 'دەربارە', 'کێین', 'کۆمپانیا', 'تیم', 'من نحن', 'شركة', 'من انتم', 'نبذة'],
    title: l('دەربارەی KST', 'About KST', 'عن KST'),
    text: perLang((g) => `${about.body[g]}\n\n${about.pricing[g]}`),
  },
  {
    id: 'services',
    keys: ['service', 'services', 'offer', 'what do you do', 'خزمەتگوزاری', 'خزمەت', 'چی دەکەن', 'خدمات', 'خدمة', 'تقدمون'],
    title: l('بوارەکانی کارمان', 'Our eight fields', 'مجالات عملنا الثمانية'),
    text: perLang((g) => `${services.map((s) => `• ${link(s, g)}`).join('\n')}\n${askBack[g]}`),
  },
  ...serviceEntries,
  {
    id: 'process',
    keys: ['process', 'steps', 'how do you work', 'workflow', 'quality', 'ڕێکار', 'هەنگاو', 'چۆن کار', 'کوالیتی', 'خطوات', 'جودة', 'كيف تعملون'],
    title: l('چۆن کار دەکەین', 'How we work', 'كيف نعمل'),
    text: perLang((g) => `${processSteps.map((x, i) => `${i + 1}. ${x.title[g]}`).join('\n')}\n\n${lines(hvac.quality, g)}`),
  },
  {
    id: 'warranty',
    keys: ['warranty', 'guarantee', 'extended', 'گەرەنتی', 'ضمان', 'كفالة'],
    title: l('گەرەنتی درێژکراو', 'Extended guarantee', 'الضمان الممتد'),
    text: perLang((g) => {
      const rows = healthcare.warrantyRows.map((y) => `${y} → ${y + healthcare.warrantyExtra}`).join(', ');
      return `${healthcare.divisions.find((d) => d.title.en.startsWith('Extended'))?.text[g] ?? ''}\n(${g === 'en' ? 'factory years → total years' : g === 'ar' ? 'سنوات المصنع ← الإجمالي' : 'ساڵی کارگە ← کۆی گشتی'}: ${rows})`;
    }),
  },
  {
    id: 'plans',
    keys: ['plan', 'plans', 'maintenance contract', 'monthly', 'outsourcing', 'پلان', 'گرێبەست', 'خطة', 'عقد صيانة'],
    title: l('شێوازەکانی هاوکاری', 'Ways to work with us', 'أنماط التعاون'),
    text: perLang((g) => healthcare.plans.map((p) => `${p.id}. ${p.title[g]} — ${p.sub[g]}`).join('\n')),
  },
  {
    id: 'clients',
    keys: ['client', 'clients', 'projects', 'portfolio', 'worked with', 'references', 'کڕیار', 'پرۆژەکان', 'عملاء', 'مشاريع', 'أعمال'],
    title: l('کڕیار و پرۆژەکان', 'Clients and projects', 'العملاء والمشاريع'),
    text: perLang((g) => {
      const name = (p: (typeof portfolio)[number]) => (g === 'ku' ? p.nameKu : g === 'ar' ? p.nameAr : p.nameEn);
      const loc = (p: (typeof portfolio)[number]) => (g === 'ku' ? p.location : g === 'ar' ? p.locationAr : p.locationEn);
      return portfolio.map((p) => `• ${name(p)} (${loc(p)}): ${p.sectors.map((x) => sectorLabels[x]?.[g] ?? x).join(g === 'en' ? ', ' : '، ')}`).join('\n');
    }),
  },
  {
    id: 'contact',
    keys: ['contact', 'phone', 'call', 'email', 'whatsapp', 'number', 'پەیوەندی', 'ژمارە', 'تەلەفۆن', 'ئیمەیڵ', 'واتسئەپ', 'وەتسئەپ', 'اتصال', 'اتصل', 'هاتف', 'رقم', 'تواصل', 'واتساب'],
    title: l('پەیوەندی', 'Contact', 'التواصل'),
    text: perLang(
      (g) =>
        `${l('واتسئەپ', 'WhatsApp', 'واتساب')[g]}: ${whatsappNumbers.join(' / ')}\n${addr[g]}\n${l(
          'ئیمەیڵمان نییە؛ لە واتسئەپ یان فۆرمی پەیوەندییەوە نامە بنێرە.',
          'We do not use email; message us on WhatsApp or through the contact form.',
          'لا نستخدم البريد الإلكتروني؛ راسلنا على واتساب أو عبر نموذج التواصل.'
        )[g]}`
    ),
  },
  {
    id: 'location',
    keys: ['where', 'location', 'address', 'office', 'erbil', 'map', 'کوێ', 'ناونیشان', 'هەولێر', 'ئۆفیس', 'اين', 'أين', 'عنوان', 'موقع', 'أربيل', 'اربيل'],
    title: l('ناونیشان', 'Location', 'الموقع'),
    text: addr,
  },
  {
    id: 'pricing',
    keys: ['price', 'pricing', 'cost', 'quote', 'quotation', 'how much', 'budget', 'نرخ', 'تێچوو', 'چەندە', 'سعر', 'أسعار', 'اسعار', 'تكلفة', 'عرض سعر', 'كم'],
    title: l('نرخ', 'Pricing', 'الأسعار'),
    text: perLang((g) =>
      l(
        'نرخ و ماوەی جێبەجێکردن دوای سەردانی شوێن و بینینی پێکهاتەی پرۆژەکە دیاری دەکرێن. فۆرمەکە پڕ بکەرەوە یان لە واتسئەپ نامەمان بۆ بنێرە.',
        'Price and schedule are set after a site visit, based on the scope of your project. Send the form or message us on WhatsApp.',
        'يُحدَّد السعر ومدة التنفيذ بعد زيارة الموقع وحسب نطاق المشروع. أرسل النموذج أو راسلنا على واتساب.'
      )[g]
    ),
  },
];

export const suggestions: { id: string; label: L10n }[] = [
  { id: 'services', label: l('چی خزمەتگوزاری هەیە؟', 'What services do you offer?', 'ما هي خدماتكم؟') },
  { id: 'or', label: l('هۆڵی نەشتەرگەری دروست دەکەن؟', 'Do you build operating rooms?', 'هل تنفذون غرف العمليات؟') },
  { id: 'solar', label: l('سۆلار بۆ ماڵەکەم دادەنێن؟', 'Can you install solar at home?', 'هل تركّبون طاقة شمسية للمنزل؟') },
  { id: 'pricing', label: l('نرخ چۆن دیاری دەکرێت؟', 'How is pricing decided?', 'كيف تُحدد الأسعار؟') },
];

export const chatText = {
  title: l('یاریدەدەری KST', 'KST Assistant', 'مساعد KST'),
  subtitle: l('پرسیار دەربارەی کارەکانمان بکە', 'Ask about our work', 'اسأل عن أعمالنا'),
  open: l('کردنەوەی چات', 'Open chat', 'افتح المحادثة'),
  close: l('داخستن', 'Close', 'إغلاق'),
  placeholder: l('پرسیارەکەت بنووسە...', 'Type your question...', 'اكتب سؤالك...'),
  send: l('ناردن', 'Send', 'إرسال'),
  hello: l(
    'سڵاو! من یاریدەدەری KST م. دەربارەی هەر ٨ بوارەکەمان پرسیار بکە: ساردکەرەوە، بیناسازی، کارەبا و سۆلار، هۆڵی نەشتەرگەری، ئامێری پزیشکی، ئایتی، بەڕێوەبردن، پاککردنەوە و ستاف.',
    "Hello! I'm the KST assistant. Ask me about any of our eight fields: HVAC, construction, electrical and solar, operating rooms, medical equipment, IT, management setup, cleaning and staffing.",
    'مرحباً! أنا مساعد KST. اسألني عن أي من مجالاتنا الثمانية: التكييف، البناء، الكهرباء والطاقة الشمسية، غرف العمليات، الأجهزة الطبية، تقنية المعلومات، الأنظمة الإدارية، التنظيف والعمالة.'
  ),
  fallback: l(
    'بەڵێ، تیمەکەمان دەتوانێت لەم بارەیەوە یارمەتیت بدات. لە بەشی پەیوەندی لە واتسئەپ نامەمان بۆ بنێرە یان فۆرمەکە پڕ بکەرەوە.',
    'Yes, our team can help you with this. Message us on WhatsApp in the Contact section, or send the form.',
    'نعم، يمكن لفريقنا مساعدتك في ذلك. راسلنا على واتساب في قسم التواصل أو أرسل النموذج.'
  ),
  thinking: l('دەنووسێت...', 'Typing…', 'يكتب…'),
  call: l('واتسئەپ', 'WhatsApp', 'واتساب'),
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

/** Offline answer: the best-matching entries by keyword score; several fields at once get one combined answer. */
export function localAnswer(question: string, lang: Lang): { text: string; matched: string[] } {
  const q = norm(question);
  const words = new Set(q.split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  const scored = kb
    .map((e) => {
      let score = 0;
      for (const k of e.keys) {
        const nk = norm(k);
        if (nk.length <= 3 ? words.has(nk) : q.includes(nk)) score += nk.includes(' ') ? 3 : 2;
      }
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (!scored.length) return { text: chatText.fallback[lang], matched: [] };

  // fields that matched about as strongly as the best one (a passing word does not count)
  const best = scored.find((x) => x.e.id.startsWith('service-'))?.score ?? 0;
  const fields = scored.filter((x) => x.e.id.startsWith('service-') && x.score >= Math.max(2, best * 0.5));
  if (fields.length >= 2) {
    // A project that spans several fields: one team, one link per field
    const picked = fields.slice(0, 4).map((x) => services.find((s) => `service-${s.slug}` === x.e.id)!);
    return {
      text: `${oneTeam[lang]}\n${picked.map((s) => `• ${link(s, lang)}`).join('\n')}\n${askBack[lang]}`,
      matched: picked.map((s) => `service-${s.slug}`),
    };
  }
  const top = scored.slice(0, scored[0].e.id.startsWith('service-') ? 1 : 2);
  return {
    text: top.map(({ e }) => `${e.title[lang]}\n${e.text[lang]}`).join('\n\n'),
    matched: top.map(({ e }) => e.id),
  };
}

/** Plain-text knowledge for the AI model's system prompt (English, with the Kurdish and Arabic names). */
export function factSheet(): string {
  const field = (s: Service, i: number) =>
    [
      `### ${i + 1}. ${s.name.en} | Kurdish: ${s.name.ku} | Arabic: ${s.name.ar}`,
      `Link: /services/${s.slug}`,
      `Summary: ${s.summary.en}`,
      ...s.groups.map((g) => `${g.title.en}: ${g.items.map((it) => (it.title ? `${it.title.en} (${it.text.en})` : it.text.en)).join('; ')}`),
      `Good for: ${s.audience.map((a) => a.label.en).join(', ')}`,
      ...s.faqs.map((f) => `Q: ${f.q.en} A: ${f.a.en}`),
      `Visitor words for this field: ${s.keywords.join(', ')}`,
      s.sectors.length ? `Client work tags for this field: ${s.sectors.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join('\n');

  const pick = (id: string) => kb.find((e) => e.id === id)!.text.en;
  return [
    `## About\n${pick('about')}`,
    `## The eight fields (always in this order)\n${services.map(field).join('\n\n')}`,
    `## HVAC proposal\n${hvac.pitch.en} ${hvac.summary.en}\n${hvac.scope.map((s) => `${s.title.en}: ${s.items.map((i) => i.en).join(', ')}`).join('\n')}\n${hvac.commitment.en}`,
    `## How a project runs\n${pick('process')}`,
    `## Healthcare partnership\n${healthcare.summary.en}\n${healthcare.divisions.map((d) => `${d.title.en}: ${d.text.en}`).join('\n')}`,
    `## Extended guarantee\n${pick('warranty')}`,
    `## Ways to work with us\n${pick('plans')}`,
    `## Clients and projects\n${pick('clients')}`,
    `## Contact (from the website's Contact section)\n${pick('contact')}`,
    `## Pricing\n${pick('pricing')}`,
  ].join('\n\n');
}
