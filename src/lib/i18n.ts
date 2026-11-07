import type { Lang } from '@/lib/lang-context';

export type L10n = Record<Lang, string>;

export const nav: { id: string; label: L10n }[] = [
  { id: 'home', label: { ku: 'سەرەتا', en: 'Home', ar: 'الرئيسية' } },
  { id: 'about', label: { ku: 'دەربارەی ئێمە', en: 'About', ar: 'من نحن' } },
  { id: 'services', label: { ku: 'خزمەتگوزاریەکان', en: 'Services', ar: 'خدماتنا' } },
  { id: 'proposals', label: { ku: 'پێشنیارەکان', en: 'Proposals', ar: 'العروض' } },
  { id: 'clients', label: { ku: 'کڕیارەکان', en: 'Clients', ar: 'عملاؤنا' } },
  { id: 'contact', label: { ku: 'پەیوەندی', en: 'Contact', ar: 'اتصل بنا' } },
];

export const ui = {
  quote: { ku: 'داوای نرخ بکە', en: 'Request a quote', ar: 'اطلب عرض سعر' } as L10n,
  services: { ku: 'خزمەتگوزاریەکان', en: 'Our services', ar: 'خدماتنا' } as L10n,
  tagline: {
    ku: 'چارەسەری ئەندازیاری تەواو بۆ پرۆژەکانت',
    en: 'Turnkey engineering for buildings that have to work from day one',
    ar: 'حلول هندسية متكاملة لمشاريعك',
  } as L10n,
  heroNote: {
    ku: 'بیناسازی، ساردکەرەوە، کارەبا، ئامێری پزیشکی و سیستەمی زیرەک — لە یەک تیمدا.',
    en: 'Construction, HVAC, electrical, medical rooms and smart systems, delivered by one team in Erbil.',
    ar: 'البناء والتكييف والكهرباء والأنظمة الطبية والذكية، بفريق واحد في أربيل.',
  } as L10n,
  theme: { ku: 'گۆڕینی دیمەن', en: 'Switch theme', ar: 'تبديل المظهر' } as L10n,
  menu: { ku: 'مینیو', en: 'Menu', ar: 'القائمة' } as L10n,
  stats: [
    { value: '10+', label: { ku: 'بواری پسپۆڕ', en: 'Specialist sectors', ar: 'قطاعات متخصصة' } },
    { value: '100+', label: { ku: 'پرۆژەی تەواوکراو', en: 'Projects completed', ar: 'مشروع منجز' } },
    { value: '15+', label: { ku: 'ساڵی ئەزموون', en: 'Years of experience', ar: 'سنة خبرة' } },
  ] as { value: string; label: L10n }[],
};

export const about = {
  title: { ku: 'کێین و چی دەکەین؟', en: 'One team, from first drawing to handover', ar: 'فريق واحد من التصميم إلى التسليم' } as L10n,
  body: {
    ku: 'تیمی خزمەتگوزاری کوردستان (KST) کۆمپانیایەکی ئەندازیاری و بیناسازی پسپۆڕە کە لە هەولێر، هەرێمی کوردستان دامەزراوە. ئێمە چارەسەری تەواو بۆ پرۆژەی بیناسازی، ئەندازیاری و دامەزراندن دەدەین.',
    en: 'Kurdistan Service Team (KST) is a specialised engineering and construction company based in Erbil, Kurdistan Region. We deliver complete turnkey solutions across specialist sectors, from civil works to smart IT systems.',
    ar: 'تيم خدمة كردستان (KST) شركة هندسية وإنشائية متخصصة مقرها أربيل، إقليم كردستان. نقدم حلولاً متكاملة في قطاعات متخصصة، من الأعمال المدنية إلى أنظمة تكنولوجيا المعلومات الذكية.',
  } as L10n,
  pricing: {
    ku: 'نرخەکانمان لەسەر پێکهاتە و تایبەتمەندییەکانی پرۆژەکەت دادەنرێت.',
    en: 'Pricing is set by your project scope and specifications.',
    ar: 'يتم تحديد الأسعار بناءً على نطاق مشروعك ومواصفاته.',
  } as L10n,
  pillars: [
    {
      title: { ku: 'ئامانجمان', en: 'Mission', ar: 'مهمتنا' },
      text: { ku: 'دابینکردنی چارەسەری ئەندازیاری تەواو', en: 'Deliver complete engineering solutions', ar: 'تقديم حلول هندسية متكاملة' },
    },
    {
      title: { ku: 'بینینمان', en: 'Vision', ar: 'رؤيتنا' },
      text: { ku: 'بوونە کۆمپانیای پێشەنگ لە هەرێم', en: 'The leading engineering company in the region', ar: 'أن نكون الشركة الهندسية الرائدة في المنطقة' },
    },
    {
      title: { ku: 'تەواوکاری', en: 'Turnkey', ar: 'تسليم مفتاح' },
      text: { ku: 'لە ٠ تا ١٠٠٪ بەرپرسیارێتی تەواو', en: 'Full responsibility from 0 to 100%', ar: 'مسؤولية كاملة من 0 إلى 100%' },
    },
  ] as { title: L10n; text: L10n }[],
  heading: { ku: 'دەربارەی ئێمە', en: 'About us', ar: 'من نحن' } as L10n,
  whyTitle: { ku: 'بۆچی کڕیاران KST هەڵدەبژێرن', en: 'Why clients choose KST', ar: 'لماذا يختار العملاء KST' } as L10n,
};

export const servicesSection = {
  title: { ku: 'بواری خزمەتگوزاریەکانمان', en: 'What we build, install and maintain', ar: 'ما نبنيه ونركّبه ونصونه' } as L10n,
  intro: {
    ku: 'هەموو بوارەکان لەژێر یەک بەڕێوەبردندان، بۆ ئەوەی پرۆژەکەت بێ دووبارەکاری و بێ جیاوازی لە نێوان پیمانکارەکان تەواو بێت.',
    en: 'Every trade sits under one management, so your project is not split between contractors who never talk to each other.',
    ar: 'جميع التخصصات تحت إدارة واحدة، فلا يتوزع مشروعك بين مقاولين لا يتواصلون.',
  } as L10n,
  more: { ku: 'داوای نرخ بۆ ئەم بوارە', en: 'Quote for this service', ar: 'اطلب عرضاً لهذه الخدمة' } as L10n,
  hint: {
    ku: 'خزمەتگوزارییەک هەڵبژێرە بۆ ئەوەی ببینیت لە کوێی بیناکەدا کار دەکەین.',
    en: 'Pick a service to see where it sits in a building we deliver.',
    ar: 'اختر خدمة لترى موقعها في المبنى الذي ننفذه.',
  } as L10n,
  drawing: {
    ku: 'وێنەی بڕگەی بینایەک کە هەموو بوارەکانی KST نیشان دەدات. ئێستا دیارکراو:',
    en: 'Section drawing of a building showing every KST trade. Highlighted:',
    ar: 'مقطع لمبنى يوضح جميع تخصصات KST. المحدد الآن:',
  } as L10n,
  prefill: { ku: 'داوای نرخم هەیە بۆ:', en: 'I would like a quote for:', ar: 'أرغب في عرض سعر لـ:' } as L10n,
};

export type ServiceKey =
  | 'construction' | 'hvac' | 'ventilation' | 'electrical' | 'cleanroom'
  | 'medical' | 'it' | 'pm';

export const services: { key: ServiceKey; name: L10n; desc: L10n; scope: L10n[] }[] = [
  {
    key: 'construction',
    name: { ku: 'بیناسازی گشتی و کارە شارستانییەکان', en: 'General construction & civil works', ar: 'البناء العام والأعمال المدنية' },
    desc: {
      ku: 'پرۆژەی بیناسازی تەواو لە دیزاین تا تەواوبوون: بیناکانی بازرگانی، نەخۆشخانە، هۆتێل و کۆمپلێکسی نیشتەجێبوون.',
      en: 'Complete construction from design to handover: commercial buildings, hospitals, hotels and residential complexes.',
      ar: 'مشاريع بناء متكاملة من التصميم حتى التسليم: مبانٍ تجارية ومستشفيات وفنادق ومجمعات سكنية.',
    },
    scope: [
      { ku: 'کاری بیناسازی و تەواوکاری', en: 'Building and finishing works', ar: 'أعمال البناء والتشطيب' },
      { ku: 'ناوەوەی بینا و دیکۆریشن', en: 'Interior fit-out and decoration', ar: 'التجهيز الداخلي والديكور' },
      { ku: 'کلینیک، چێشتخانە، دوکان و ئۆفیس', en: 'Clinics, restaurants, shops and offices', ar: 'العيادات والمطاعم والمحلات والمكاتب' },
      { ku: 'نۆژەنکردنەوەی بینای ئێستا', en: 'Renovating existing buildings', ar: 'تجديد المباني القائمة' },
    ],
  },
  {
    key: 'hvac',
    name: { ku: 'سیستەمی ساردکەرەوە و HVAC', en: 'Refrigeration & HVAC', ar: 'أنظمة التبريد والتكييف' },
    desc: { ku: 'دامەزراندن و چاککردنەوەی سیستەمی ساردکەرەوە', en: 'Installation and servicing of cooling systems', ar: 'تركيب وصيانة أنظمة التبريد' },
    scope: [
      { ku: 'سیستەمی سپلیت، VRF/VRV و دەکت', en: 'Split, VRF/VRV and ducted systems', ar: 'أنظمة سبليت وVRF/VRV والمجاري' },
      { ku: 'ساردکەرەوە و ژووری سارد', en: 'Refrigeration and cold rooms', ar: 'التبريد والغرف الباردة' },
      { ku: 'هەژمارکردنی بارستایی و هەڵبژاردنی ئامێر', en: 'Load calculation and equipment selection', ar: 'حساب الأحمال واختيار المعدات' },
      { ku: 'چاککردنەوە و چاودێری بەردەوام', en: 'Repair and regular servicing', ar: 'الإصلاح والصيانة الدورية' },
    ],
  },
  {
    key: 'ventilation',
    name: { ku: 'سیستەمی ئایر فرێش و ڤێنتیلەیشن', en: 'Fresh air & ventilation', ar: 'أنظمة الهواء النقي والتهوية' },
    desc: { ku: 'چارەسەری هەوای پاک بۆ بیناکان', en: 'Clean-air solutions for buildings', ar: 'حلول الهواء النقي للمباني' },
    scope: [
      { ku: 'سیستەمی ئایر فرێش و هەواکێشان', en: 'Fresh-air and exhaust systems', ar: 'أنظمة الهواء النقي والشفط' },
      { ku: 'یەکەی مامەڵەکردنی هەوا (AHU)', en: 'Air handling units (AHU)', ar: 'وحدات مناولة الهواء (AHU)' },
      { ku: 'هەواکێشانی چێشتخانە', en: 'Kitchen extraction', ar: 'شفط المطابخ' },
      { ku: 'هاوسەنگکردن و تاقیکردنەوەی هەوا', en: 'Air balancing and testing', ar: 'موازنة الهواء واختباره' },
    ],
  },
  {
    key: 'electrical',
    name: { ku: 'ئەندازیاری کارەبا و وزە', en: 'Electrical systems & power', ar: 'الأنظمة الكهربائية والطاقة' },
    desc: { ku: 'سیستەمی کارەبای پڕۆفیشنەل بۆ هەموو جۆرە بیناکان', en: 'Professional electrical systems for every building type', ar: 'أنظمة كهربائية احترافية لجميع أنواع المباني' },
    scope: [
      { ku: 'تابلۆی دابەشکردن و کابل', en: 'Distribution panels and wiring', ar: 'لوحات التوزيع والتمديدات' },
      { ku: 'مۆلیدە و کارەبای یەدەگ', en: 'Generators and backup power', ar: 'المولدات والطاقة الاحتياطية' },
      { ku: 'ڕووناکی و ئەرسکردن', en: 'Lighting and earthing', ar: 'الإنارة والتأريض' },
      { ku: 'پشکنین و تاقیکردنەوەی سەلامەتی', en: 'Safety inspection and testing', ar: 'فحص واختبار السلامة' },
    ],
  },
  {
    key: 'cleanroom',
    name: { ku: 'هۆڵەکانی نەشتەرگەری و کلینرووم', en: 'Modular operating rooms & cleanrooms', ar: 'غرف العمليات المعيارية والغرف النظيفة' },
    desc: { ku: 'دامەزراندنی هۆڵی نەشتەرگەری بەپێی ستانداردی نێودەوڵەتی', en: 'Operating rooms built to international standards', ar: 'غرف عمليات وفق المعايير الدولية' },
    scope: [
      { ku: 'دامەزراندنی هۆڵی نەشتەرگەری', en: 'Operating theatre fit-out', ar: 'تجهيز غرف العمليات' },
      { ku: 'فلتەری HEPA و هاوسەنگی پەستان', en: 'HEPA filters and room pressure balance', ar: 'فلاتر HEPA وموازنة ضغط الغرف' },
      { ku: 'خزمەتگوزاری و پشکنینی خولی', en: 'Periodic servicing and checks', ar: 'الخدمة والفحص الدوري' },
    ],
  },
  {
    key: 'medical',
    name: { ku: 'چاککردنەوەی ئامێری پزیشکی', en: 'Medical equipment maintenance', ar: 'صيانة المعدات الطبية' },
    desc: { ku: 'خزمەتگوزاری و چاککردنەوەی ئامێری پزیشکی', en: 'Servicing and repair of medical equipment', ar: 'خدمة وإصلاح المعدات الطبية' },
    scope: [
      { ku: 'چاککردنی بۆرد، تا ٧٠٪ هەرزانتر لە نرخی پارچەی کارگە', en: 'Board-level repair, up to 70% below factory module price', ar: 'إصلاح اللوحات بتكلفة أقل حتى 70% من سعر القطعة الأصلية' },
      { ku: 'دابینکردنی سەربەخۆی ئامێر', en: 'Independent equipment sourcing', ar: 'توريد مستقل للمعدات' },
      { ku: 'گەرەنتی درێژکراو: ٤ ساڵی زیاتر', en: 'Extended guarantee: 4 extra years', ar: 'ضمان ممتد: 4 سنوات إضافية' },
      { ku: 'چاودێری پێشوەختە', en: 'Preventive maintenance', ar: 'الصيانة الوقائية' },
    ],
  },
  {
    key: 'it',
    name: { ku: 'چارەسەری تەکنەلۆژی و ئایتی', en: 'IT solutions & smart systems', ar: 'حلول تكنولوجيا المعلومات والأنظمة الذكية' },
    desc: { ku: 'سیستەمی زیرەک و چارەسەری تەکنەلۆژی', en: 'Smart-building systems and IT infrastructure', ar: 'أنظمة ذكية وبنية تحتية لتقنية المعلومات' },
    scope: [
      { ku: 'تۆڕ و Wi-Fi', en: 'Networks and Wi-Fi', ar: 'الشبكات والواي فاي' },
      { ku: 'کامێرای چاودێری (CCTV)', en: 'CCTV cameras', ar: 'كاميرات المراقبة' },
      { ku: 'سیستەمی زیرەکی بینا', en: 'Smart building systems', ar: 'أنظمة المباني الذكية' },
      { ku: 'ژووری سێرڤەر و ئایتی', en: 'Server and IT rooms', ar: 'غرف الخوادم وتقنية المعلومات' },
    ],
  },
  {
    key: 'pm',
    name: { ku: 'سەرپەرشتیاریکردنی پرۆژە', en: 'Project management & supervision', ar: 'إدارة المشاريع والإشراف' },
    desc: { ku: 'بەڕێوەبردن و سەرپەرشتیاری پرۆژە', en: 'Management and on-site supervision', ar: 'إدارة المشاريع والإشراف الميداني' },
    scope: [
      { ku: 'سەرپەرشتی مەیدانی', en: 'On-site supervision', ar: 'الإشراف الميداني' },
      { ku: 'پلان و خشتەی کات', en: 'Planning and scheduling', ar: 'التخطيط والجدولة' },
      { ku: 'پشکنینی کوالیتی لە هەر قۆناغێک', en: 'Quality checks at every stage', ar: 'فحص الجودة في كل مرحلة' },
      { ku: 'یەک گرێبەست بۆ هەموو بوارەکان', en: 'One contract for every trade', ar: 'عقد واحد لجميع التخصصات' },
    ],
  },
];

export const clientsSection = {
  title: { ku: 'پرۆژەکانمان لە سەرتاسەری هەرێمی کوردستان', en: 'Projects we have delivered across Kurdistan Region', ar: 'مشاريع أنجزناها في إقليم كردستان' } as L10n,
  label: { ku: 'کڕیارەکانمان', en: 'Our clients', ar: 'عملاؤنا' } as L10n,
  all: { ku: 'هەموو', en: 'All', ar: 'الكل' } as L10n,
  search: { ku: 'گەڕان بە ناوی کڕیار', en: 'Search by client name', ar: 'ابحث باسم العميل' } as L10n,
  showMore: { ku: 'پیشاندانی زیاتر', en: 'Show more', ar: 'عرض المزيد' } as L10n,
  empty: { ku: 'هیچ کڕیارێک نەدۆزرایەوە.', en: 'No clients match. Clear the search or choose another filter.', ar: 'لا يوجد عملاء مطابقون. امسح البحث أو اختر تصنيفاً آخر.' } as L10n,
  count: { ku: 'کڕیار', en: 'clients', ar: 'عميل' } as L10n,
  intro: {
    ku: 'نەخۆشخانە، سەنتەری جوانکاری، هۆتێل، چێشتخانە و دامەزراوەی حکومی. بە سکڕۆڵکردن ببینە هەر پرۆژەیەک لە کوێیە و چ کارێکمان بۆ کردووە.',
    en: 'Hospitals, beauty centres, hotels, restaurants and government offices. Scroll to see where each project is and what we did there.',
    ar: 'مستشفيات ومراكز تجميل وفنادق ومطاعم ودوائر حكومية. مرّر لترى موقع كل مشروع وما أنجزناه فيه.',
  } as L10n,
  works: { ku: 'بوار', en: 'trades', ar: 'تخصصات' } as L10n,
  mapLabel: { ku: 'نەخشەی پرۆژەکان لە هەولێر و پیرمام. ئێستا دیارکراو:', en: 'Map of projects in Erbil and Pirmam. Highlighted:', ar: 'خريطة المشاريع في أربيل وبيرمام. المحدد الآن:' } as L10n,
};

export const sectorLabels: Record<string, L10n> = {
  Construction: { ku: 'بیناسازی', en: 'Construction', ar: 'البناء' },
  Medical: { ku: 'پزیشکی', en: 'Medical', ar: 'طبي' },
  Turnkey: { ku: 'تەواوکاری', en: 'Turnkey', ar: 'تسليم مفتاح' },
  Electrical: { ku: 'کارەبا', en: 'Electrical', ar: 'كهرباء' },
  IT: { ku: 'ئایتی', en: 'IT', ar: 'تقنية المعلومات' },
  HVAC: { ku: 'ئێچ ڤاک (HVAC)', en: 'HVAC', ar: 'التكييف (HVAC)' },
  Refrigeration: { ku: 'ساردکەرەوە', en: 'Refrigeration', ar: 'التبريد' },
  CCTV: { ku: 'کامێرای چاودێری', en: 'CCTV cameras', ar: 'كاميرات المراقبة' },
  Decoration: { ku: 'دیکۆریشن', en: 'Decoration', ar: 'الديكور' },
  Ventilation: { ku: 'ئایر فرێش', en: 'Ventilation', ar: 'تهوية' },
  Cleanroom: { ku: 'هۆڵی نەشتەرگەری', en: 'Operating rooms', ar: 'غرف العمليات' },
  Maintenance: { ku: 'چاککردنەوە', en: 'Medical maintenance', ar: 'صيانة طبية' },
  Supervision: { ku: 'سەرپەرشتی', en: 'Supervision', ar: 'إشراف' },
};

export const contactSection = {
  label: { ku: 'پەیوەندی', en: 'Contact', ar: 'اتصل بنا' } as L10n,
  title: { ku: 'پەیوەندیمان پێوە بکە', en: 'Tell us about your project', ar: 'حدّثنا عن مشروعك' } as L10n,
  lead: {
    ku: 'پرۆژەکەت وەسف بکە و تیمەکەمان بە نرخ و کاتی جێبەجێکردنەوە پەیوەندیت پێوە دەکات.',
    en: 'Describe what you need and our team will reply with a price and a schedule.',
    ar: 'صف ما تحتاجه وسيرد فريقنا بالسعر والجدول الزمني.',
  } as L10n,
  pricingBadge: {
    ku: 'نرخ لەسەر پێکهاتەی پرۆژەکەت دادەنرێت',
    en: 'Pricing is based on project scope and specifications',
    ar: 'الأسعار بناءً على نطاق المشروع',
  } as L10n,
  address: { ku: 'ناونیشان', en: 'Address', ar: 'العنوان' } as L10n,
  phone: { ku: 'تەلەفۆن', en: 'Phone', ar: 'الهاتف' } as L10n,
  whatsapp: { ku: 'واتسئەپ', en: 'WhatsApp', ar: 'واتساب' } as L10n,
  whatsappLead: {
    ku: 'ڕاستەوخۆ لە واتسئەپ نامەمان بۆ بنێرە، یان فۆرمەکە پڕ بکەرەوە.',
    en: 'Message us directly on WhatsApp, or fill in the form.',
    ar: 'راسلنا مباشرة على واتساب، أو املأ النموذج.',
  } as L10n,
  whatsappChat: { ku: 'نامە بنێرە', en: 'Chat now', ar: 'راسلنا الآن' } as L10n,
  whatsappHello: {
    ku: 'سڵاو KST، دەمەوێت دەربارەی پرۆژەیەک قسە بکەین.',
    en: 'Hello KST, I would like to talk about a project.',
    ar: 'مرحباً KST، أود التحدث عن مشروع.',
  } as L10n,
  email: { ku: 'ئیمەیل', en: 'Email', ar: 'البريد الإلكتروني' } as L10n,
  name: { ku: 'ناو', en: 'Full name', ar: 'الاسم' } as L10n,
  company: { ku: 'کۆمپانیا', en: 'Company', ar: 'الشركة' } as L10n,
  service: { ku: 'خزمەتگوزاری پێویست', en: 'Service needed', ar: 'الخدمة المطلوبة' } as L10n,
  servicePlaceholder: { ku: 'یەکێک هەڵبژێرە', en: 'Choose a service', ar: 'اختر خدمة' } as L10n,
  message: { ku: 'پەیام', en: 'Project details', ar: 'تفاصيل المشروع' } as L10n,
  messagePlaceholder: { ku: 'پرۆژەکەت وەسف بکە...', en: 'Location, size, timeline, anything we should know', ar: 'الموقع والحجم والمدة وأي تفاصيل مهمة' } as L10n,
  required: { ku: 'پێویستە', en: 'required', ar: 'مطلوب' } as L10n,
  send: { ku: 'داواکاری بنێرە', en: 'Send request', ar: 'إرسال الطلب' } as L10n,
  sending: { ku: 'دەنێردرێت...', en: 'Sending…', ar: 'جارٍ الإرسال…' } as L10n,
  successTitle: { ku: 'سوپاس! داواکارییەکەت وەرگیرا', en: 'Request received', ar: 'تم استلام طلبك' } as L10n,
  successText: {
    ku: 'بەزوویی پەیوەندیت پێوە دەکەین.',
    en: 'Thank you. We will contact you shortly.',
    ar: 'شكراً لك. سنتواصل معك قريباً.',
  } as L10n,
  another: { ku: 'داواکاری نوێ', en: 'Send another request', ar: 'طلب جديد' } as L10n,
  error: {
    ku: 'داواکارییەکە نەنێردرا. دووبارە هەوڵ بدەرەوە یان لە واتسئەپ نامەمان بۆ بنێرە.',
    en: 'Your request was not sent. Try again, or message us on WhatsApp.',
    ar: 'لم يتم إرسال طلبك. حاول مرة أخرى أو راسلنا على واتساب.',
  } as L10n,
  mapTitle: { ku: 'شوێنی کۆمپانیا لەسەر نەخشە', en: 'Our location on the map', ar: 'موقعنا على الخريطة' } as L10n,
  orReach: { ku: 'یان ڕاستەوخۆ لە واتسئەپ:', en: 'Or on WhatsApp:', ar: 'أو على واتساب:' } as L10n,
  invalid: {
    name: { ku: 'تکایە ناوت بنووسە.', en: 'Please enter your name.', ar: 'يرجى إدخال اسمك.' },
    phone: { ku: 'ژمارەیەکی دروست بنووسە (لانیکەم ٧ ژمارە).', en: 'Enter a valid phone number (at least 7 digits).', ar: 'أدخل رقم هاتف صحيحاً (7 أرقام على الأقل).' },
    email: { ku: 'ئیمەیڵەکە دروست نییە.', en: 'This email address does not look right.', ar: 'عنوان البريد الإلكتروني غير صحيح.' },
    service: { ku: 'خزمەتگوزارییەک هەڵبژێرە.', en: 'Choose the service you need.', ar: 'اختر الخدمة المطلوبة.' },
    message: { ku: 'کەمێک زیاتر دەربارەی پرۆژەکەت بنووسە (لانیکەم ١٠ پیت).', en: 'Tell us a little more (at least 10 characters).', ar: 'اكتب تفاصيل أكثر قليلاً (10 أحرف على الأقل).' },
  } as Record<'name' | 'phone' | 'email' | 'service' | 'message', L10n>,
  privacy: {
    ku: 'زانیارییەکانت تەنیا بۆ وەڵامدانەوەی داواکارییەکەت بەکاردێن.',
    en: 'Your details are used only to reply to your request.',
    ar: 'تُستخدم بياناتك فقط للرد على طلبك.',
  } as L10n,
};

export const footer = {
  blurb: {
    ku: 'پارتنەری متمانەپێکراوی تۆ بۆ چارەسەرە ئەندازیارییە تەواوەکان لە هەرێمی کوردستان.',
    en: 'Your trusted partner for turnkey engineering solutions in Kurdistan Region.',
    ar: 'شريكك الموثوق لحلول الهندسة المتكاملة في إقليم كردستان.',
  } as L10n,
  links: { ku: 'بەستەرەکان', en: 'Navigate', ar: 'روابط' } as L10n,
  talk: { ku: 'پرۆژەیەکت هەیە؟', en: 'Have a project?', ar: 'لديك مشروع؟' } as L10n,
  talkLink: { ku: 'لە واتسئەپ یان فۆرمەکەوە پەیوەندیمان پێوە بکە', en: 'Reach us on WhatsApp or through the form', ar: 'تواصل معنا عبر واتساب أو النموذج' } as L10n,
  rights: {
    ku: 'هەموو مافەکان پارێزراون.',
    en: 'All rights reserved.',
    ar: 'جميع الحقوق محفوظة.',
  } as L10n,
};
