import type { L10n } from '@/lib/i18n';

/*
  The eight KST fields: one source of truth.
  The home page cards, the eight service pages, the menu, the footer, the contact form,
  the search-engine data and the AI assistant all read from this file, so a change here
  shows up everywhere at once. Order matters: cooling first (owner's request).

  Each text has Kurdish Sorani (ku), English (en) and Arabic (ar).
  Clients are not listed here: every page filters src/content/data/portfolio.json by `sectors`,
  so adding or removing a client happens in one place only.
*/

const l = (ku: string, en: string, ar: string): L10n => ({ ku, en, ar });

export type ServiceSlug =
  | 'hvac'
  | 'construction'
  | 'electrical-solar'
  | 'operating-rooms'
  | 'medical-equipment'
  | 'it-systems'
  | 'management-setup'
  | 'cleaning-staffing';

export type AudienceIcon =
  | 'hospital' | 'clinic' | 'beauty' | 'hotel' | 'restaurant' | 'office' | 'factory' | 'home'
  | 'shop' | 'farm' | 'surgery' | 'ivf' | 'lab' | 'pharma' | 'dental' | 'mall' | 'government'
  | 'brand' | 'startup' | 'family';

export interface SubItem {
  /** drawing layer this item lights up (items in one group can share a layer) */
  layer: string;
  title?: L10n;
  text: L10n;
  /** optional link to another field page */
  link?: ServiceSlug;
}

export interface ServiceGroup {
  id: string;
  title: L10n;
  intro?: L10n;
  items: SubItem[];
}

export interface Step {
  title: L10n;
  text: L10n;
}

export interface Faq {
  q: L10n;
  a: L10n;
}

export interface Service {
  slug: ServiceSlug;
  accent: string;
  /** second colour (solar green on the electrical page) */
  accent2?: string;
  name: L10n;
  summary: L10n;
  bullets: L10n[];
  tagline: L10n;
  intro: L10n;
  groups: ServiceGroup[];
  steps: Step[];
  audience: { icon: AudienceIcon; label: L10n }[];
  faqs: Faq[];
  related: ServiceSlug[];
  /** portfolio sectors that belong to this field */
  sectors: string[];
  /** words visitors use for this field (any language), for the assistant */
  keywords: string[];
}

/* ------------------------------------------------------------------ audience labels */
const A = {
  hospital: l('نەخۆشخانە', 'Hospitals', 'المستشفيات'),
  hospitalClinic: l('نەخۆشخانە و کلینیک', 'Hospitals and clinics', 'المستشفيات والعيادات'),
  clinic: l('کلینیک', 'Clinics', 'العيادات'),
  beauty: l('سەنتەری جوانکاری', 'Beauty centres', 'مراكز التجميل'),
  hotel: l('هۆتێل', 'Hotels', 'الفنادق'),
  hotelRestaurant: l('هۆتێل و ڕێستورانت', 'Hotels and restaurants', 'الفنادق والمطاعم'),
  restaurantCafe: l('ڕێستورانت و کافێ', 'Restaurants and cafés', 'المطاعم والمقاهي'),
  restaurant: l('ڕێستورانت', 'Restaurants', 'المطاعم'),
  shopRestaurant: l('دوکان و ڕێستورانت', 'Shops and restaurants', 'المحلات والمطاعم'),
  commercial: l('بینای بازرگانی و ئۆفیس', 'Commercial and office buildings', 'المباني التجارية والمكاتب'),
  officeCompany: l('ئۆفیس و کۆمپانیا', 'Offices and companies', 'المكاتب والشركات'),
  factory: l('کارگە', 'Factories', 'المصانع'),
  factoryFarm: l('کارگە و کێڵگە', 'Factories and farms', 'المصانع والمزارع'),
  homeVilla: l('ماڵ و ڤێلا', 'Homes and villas', 'المنازل والفلل'),
  homeOwners: l('خاوەن خانوو و ڤێلا', 'Home and villa owners', 'أصحاب المنازل والفلل'),
  retail: l('فرۆشیار و دوکان', 'Retailers and shops', 'تجار التجزئة والمحلات'),
  brands: l('خاوەن کۆمپانیا و براند', 'Company and brand owners', 'أصحاب الشركات والعلامات التجارية'),
  surgery: l('سەنتەری نەشتەرگەری', 'Surgical centres', 'مراكز الجراحة'),
  ivf: l('سەنتەری IVF', 'IVF centres', 'مراكز أطفال الأنابيب (IVF)'),
  lab: l('تاقیگە', 'Laboratories', 'المختبرات'),
  pharma: l('کارگەی دەرمان', 'Pharmaceutical plants', 'مصانع الأدوية'),
  dental: l('کلینیکی دەندان', 'Dental clinics', 'عيادات الأسنان'),
  mallShop: l('مۆڵ و دوکان', 'Malls and shops', 'المولات والمحلات'),
  mall: l('مۆڵ', 'Malls', 'المولات'),
  government: l('دامەزراوە حکومییەکان', 'Government offices', 'الدوائر الحكومية'),
  startup: l('کۆمپانیای نوێ', 'New companies', 'الشركات الجديدة'),
  family: l('کۆمپانیای خێزانی کە گەورە دەبێت', 'Growing family businesses', 'الشركات العائلية النامية'),
};

/* ------------------------------------------------------------------ 1. HVAC */
const hvacPage: Service = {
  slug: 'hvac',
  accent: '#2BB3E6',
  name: l('سیستەمی ساردکەرەوە و هەوا', 'HVAC & Ventilation Systems', 'أنظمة التكييف والتهوية'),
  summary: l(
    'سیستەمی ساردکردنەوە، گەرمکردنەوە و هەوای تازە دیزاین و دادەمەزرێنین کە کارەبای کەمتر بەکاربهێنێت و هەوایەکی پاکتر بدات؛ لە ماڵەوە تا نەخۆشخانە و هۆڵی نەشتەرگەری.',
    'We design and install cooling, heating and fresh-air systems that use less power and give cleaner air, from homes to hospitals and operating rooms.',
    'نصمم ونركّب أنظمة التبريد والتدفئة والهواء النقي التي تستهلك كهرباء أقل وتمنح هواءً أنقى، من المنازل إلى المستشفيات وغرف العمليات.'
  ),
  bullets: [
    l('VRF / VRV، چیلەر و دەکت', 'VRF / VRV, chillers and ducted', 'VRF / VRV والتشيلر والدكت'),
    l('ئایر فرێش و ڤێنتیلەیشن', 'Fresh air and ventilation', 'الهواء النقي والتهوية'),
    l('ساردکەرەوەی بازرگانی', 'Commercial refrigeration', 'التبريد التجاري'),
    l('چاککردنەوە و گرێبەستی ساڵانە', 'Maintenance and annual contracts', 'الصيانة والعقود السنوية'),
  ],
  tagline: l(
    'تەنیا ئامێری سارد دانانێین، سەرمایەکەت دەپارێزین.',
    'We do not only install air conditioning. We protect your investment.',
    'لا نكتفي بتركيب أجهزة التكييف، بل نحمي استثمارك.'
  ),
  intro: l(
    'سیستەمێک دیزاین دەکەین کە کارەبای کەمتر بەکاربهێنێت، ساڵانێکی زیاتر کار بکات و هەوایەکی پاکتر بدات. ئەم بەشە دوو لقی هەیە: HVAC و ئایر فرێش.',
    'We design systems that use less electricity, last more years and deliver cleaner air. This field has two branches: HVAC, and fresh air and ventilation.',
    'نصمم أنظمة تستهلك كهرباء أقل وتعمل لسنوات أطول وتمنح هواءً أنقى. لهذا المجال فرعان: التكييف (HVAC) والهواء النقي والتهوية.'
  ),
  groups: [
    {
      id: 'hvac',
      title: l('بەشی یەکەم: HVAC — ساردکردنەوە و گەرمکردنەوە', 'Part one: HVAC — cooling and heating', 'القسم الأول: HVAC — التبريد والتدفئة'),
      items: [
        {
          layer: 'vrf',
          title: l('سیستەمی VRF / VRV', 'VRF / VRV systems', 'أنظمة VRF / VRV'),
          text: l(
            'گونجاو بۆ هۆتێل، نەخۆشخانە و بینای ئۆفیس. هەر ژوورێک پلەی گەرمای خۆی هەیە و بەکارهێنانی کارەبا کەمتر دەبێت.',
            'Suited to hotels, hospitals and office buildings. Every room sets its own temperature and the building uses less power.',
            'مناسبة للفنادق والمستشفيات والمباني المكتبية. لكل غرفة درجة حرارتها الخاصة ويقل استهلاك الكهرباء.'
          ),
        },
        {
          layer: 'chiller',
          title: l('چیلەر و سیستەمی ناوەندی', 'Chillers and central plant', 'المبرّدات (التشيلر) والأنظمة المركزية'),
          text: l('بۆ پرۆژە گەورەکانی وەک مۆڵ، نەخۆشخانە و کارگە.', 'For large projects such as malls, hospitals and factories.', 'للمشاريع الكبيرة مثل المولات والمستشفيات والمصانع.'),
        },
        {
          layer: 'ducted',
          title: l('سیستەمی دەکت (Ducted)', 'Ducted systems', 'أنظمة الدكت (Ducted)'),
          text: l('ساردکردنەوەی شاراوە لەناو سەقفدا، بەبێ ئامێری دیار لە ژوورەکاندا.', 'Cooling hidden in the ceiling, with no visible units in the rooms.', 'تبريد مخفي داخل السقف دون أجهزة ظاهرة في الغرف.'),
        },
        {
          layer: 'split',
          title: l('سپلیت و پاکێج یونت', 'Split and package units', 'وحدات السبليت والباكج'),
          text: l('چارەسەری خێرا و ئابووری بۆ ماڵ، دوکان و ئۆفیسی بچووک.', 'A quick, economical choice for homes, shops and small offices.', 'حل سريع واقتصادي للمنازل والمحلات والمكاتب الصغيرة.'),
        },
        {
          layer: 'heating',
          title: l('گەرمکردنەوەی ناوەندی', 'Central heating', 'التدفئة المركزية'),
          text: l('بۆیلەر، ڕادیەیتەر و گەرمکردنەوەی ژێر زەوی.', 'Boilers, radiators and underfloor heating.', 'الغلايات والمشعات (الرادياتير) والتدفئة الأرضية.'),
        },
        {
          layer: 'cold',
          title: l('ساردکەرەوەی بازرگانی', 'Commercial refrigeration', 'التبريد التجاري'),
          text: l('ساردکەرەوە و فریزەری چێشتخانە، ڕێستورانت و کۆگا.', 'Cold rooms, fridges and freezers for kitchens, restaurants and stores.', 'ثلاجات وغرف تبريد وفريزرات للمطابخ والمطاعم والمستودعات.'),
        },
        {
          layer: 'amc',
          title: l('چاککردنەوە و گرێبەستی ساڵانە (AMC)', 'Maintenance and annual contracts (AMC)', 'الصيانة والعقود السنوية (AMC)'),
          text: l(
            'پشکنینی وەرزی، پاککردنەوەی فلتەر، پڕکردنەوەی گاز و چاککردنەوەی فریاکەوتن.',
            'Seasonal checks, filter cleaning, refrigerant top-ups and emergency repairs.',
            'فحص موسمي وتنظيف الفلاتر وتعبئة الغاز وإصلاح الأعطال الطارئة.'
          ),
        },
      ],
    },
    {
      id: 'fresh-air',
      title: l('بەشی دووەم: ئایر فرێش و ڤێنتیلەیشن', 'Part two: fresh air and ventilation', 'القسم الثاني: الهواء النقي والتهوية'),
      intro: l(
        'هەوای تازە و پاک بۆ ناوەوەی بینا، بەتایبەتی بۆ نەخۆشخانە، هۆڵی نەشتەرگەری، ڕێستورانت و ئۆفیسی قەرەباڵغ.',
        'Fresh, clean air inside the building, especially for hospitals, operating rooms, restaurants and busy offices.',
        'هواء نقي ومتجدد داخل المبنى، خاصة للمستشفيات وغرف العمليات والمطاعم والمكاتب المزدحمة.'
      ),
      items: [
        {
          layer: 'ahu',
          title: l('یەکەکانی هەوای تازە (FAHU / AHU)', 'Fresh-air units (FAHU / AHU)', 'وحدات الهواء النقي (FAHU / AHU)'),
          text: l(
            'هەوای دەرەوە دەهێنن، فلتەری دەکەن و پێش گەیشتن بە ژوورەکان سارد یان گەرمی دەکەن.',
            'They draw in outside air, filter it, and cool or heat it before it reaches the rooms.',
            'تسحب الهواء الخارجي وتفلتره وتبرده أو تدفئه قبل وصوله إلى الغرف.'
          ),
        },
        {
          layer: 'erv',
          title: l('بەدەستهێنانەوەی وزە (ERV / HRV)', 'Energy recovery (ERV / HRV)', 'استرداد الطاقة (ERV / HRV)'),
          text: l(
            'گەرما و ساردیی هەوای دەرچوو دووبارە بەکاردەهێنرێتەوە، بۆ کەمکردنەوەی پسوولەی کارەبا.',
            'The heat or cool of outgoing air is reused to cut the electricity bill.',
            'يُعاد استخدام حرارة الهواء الخارج أو برودته لخفض فاتورة الكهرباء.'
          ),
        },
        {
          layer: 'exhaust',
          title: l('هەواکێشان (Exhaust)', 'Exhaust', 'الشفط (Exhaust)'),
          text: l('چێشتخانە، پارکینگی ژێرزەوی، تەوالێت و ژووری ئامێر.', 'Kitchens, underground car parks, toilets and plant rooms.', 'المطابخ ومواقف السيارات تحت الأرض ودورات المياه وغرف المعدات.'),
        },
        {
          layer: 'hepa',
          title: l('فلتەرکردنی پێشکەوتوو', 'Advanced filtration', 'ترشيح متقدم'),
          text: l('فلتەری HEPA و کۆنترۆڵی پلەی گەرما و شێ.', 'HEPA filters with temperature and humidity control.', 'فلاتر HEPA مع التحكم في الحرارة والرطوبة.'),
        },
      ],
    },
  ],
  // The 8-step HVAC process comes from the proposal (src/lib/process.ts); see hvacSteps below
  steps: [],
  audience: [
    { icon: 'hospital', label: A.hospitalClinic },
    { icon: 'beauty', label: A.beauty },
    { icon: 'hotel', label: A.hotel },
    { icon: 'restaurant', label: A.restaurantCafe },
    { icon: 'office', label: A.commercial },
    { icon: 'factory', label: A.factory },
    { icon: 'home', label: A.homeVilla },
  ],
  faqs: [
    {
      q: l('نرخ چۆن دیاری دەکرێت؟', 'How is the price set?', 'كيف يُحدَّد السعر؟'),
      a: l(
        'دوای سەردانی شوێن و هەڵسەنگاندنی بارستایی کار، نرخ و ماوەی جێبەجێکردن دیاری دەکرێت.',
        'After a site visit and a load assessment, we confirm the price and the schedule.',
        'بعد زيارة الموقع وتقدير الأحمال، نحدد السعر ومدة التنفيذ.'
      ),
    },
    {
      q: l('براندێکی دیاریکراو پێشنیار دەکەن؟', 'Do you push a particular brand?', 'هل توصون بعلامة تجارية معينة؟'),
      a: l(
        'نەخێر؛ ئەو ئامێرە پێشنیار دەکەین کە بۆ پرۆژە و بودجەکەت گونجاوترە.',
        'No. We recommend the equipment that best suits your project and budget.',
        'لا؛ نوصي بالمعدات الأنسب لمشروعك وميزانيتك.'
      ),
    },
    {
      q: l('دوای دامەزراندن پشتگیری هەیە؟', 'Is there support after installation?', 'هل يوجد دعم بعد التركيب؟'),
      a: l(
        'بەڵێ؛ تا چوار ساڵ دوای تەواوبوونی گەرەنتیی سەرەکی، پشتگیریی تەکنیکی بەردەوام دەبێت.',
        'Yes. Technical support continues for up to four years after the original warranty ends.',
        'نعم؛ يستمر الدعم الفني حتى أربع سنوات بعد انتهاء الضمان الأصلي.'
      ),
    },
  ],
  related: ['operating-rooms', 'electrical-solar'],
  sectors: ['HVAC', 'Refrigeration', 'Ventilation'],
  keywords: [
    'سپلیت', 'مەکینەی سارد', 'ساردکەرەوە', 'فریزەر', 'هەوای تازە', 'هەواکێش', 'ئایر فرێش', 'ڤێنتیلەیشن', 'گەرمکردنەوە', 'بۆیلەر',
    'تکییف', 'مكيف', 'تكييف', 'سبلت', 'تبريد', 'تهوية', 'شفاط', 'تدفئة',
    'ac', 'hvac', 'vrf', 'vrv', 'chiller', 'ventilation', 'fresh air', 'air conditioning', 'cooling', 'heating', 'cold room', 'freezer',
  ],
};

/* ------------------------------------------------------------------ 2. Construction */
const constructionPage: Service = {
  slug: 'construction',
  accent: '#E8A33D',
  name: l('بیناسازی گشتی و نوژەنکردنەوە', 'General Construction & Renovation', 'البناء العام والترميم'),
  summary: l(
    'لە بناغەوە تا ڕادەستکردنی کلیل، یان نوژەنکردنەوەی شوێنێکی کۆن تا وەک نوێ دەربکەوێت؛ بە یەک تیم و یەک خشتەی کات.',
    'From the foundations to handing over the keys, or renovating an old space until it looks new, with one team and one schedule.',
    'من الأساسات حتى تسليم المفتاح، أو ترميم مكان قديم حتى يبدو جديداً؛ بفريق واحد وجدول زمني واحد.'
  ),
  bullets: [
    l('بیناسازی نوێ', 'New construction', 'البناء الجديد'),
    l('نوژەنکردنەوە و فیت ئاوت', 'Renovation and fit-out', 'الترميم والتجهيز (Fit-out)'),
    l('تەواوکاری ناوەوە و دیکۆر', 'Interior finishing and decor', 'التشطيبات الداخلية والديكور'),
    l('سەرپەرشتیاری پرۆژە', 'Project supervision', 'الإشراف على المشاريع'),
  ],
  tagline: l('لە بناغەوە تا ڕادەستکردنی کلیل.', 'From the foundations to handing over the keys.', 'من الأساسات حتى تسليم المفتاح.'),
  intro: l(
    'بیناسازیی نوێ، یان نوژەنکردنەوەی شوێنێکی کۆن تا وەک نوێ دەربکەوێت. هەموو کارەکان بە یەک تیم و یەک خشتەی کات بەڕێوە دەچن.',
    'New buildings, or renovating an old space until it looks new. All the work runs with one team and one schedule.',
    'مبانٍ جديدة، أو ترميم مكان قديم حتى يبدو جديداً. تُدار جميع الأعمال بفريق واحد وجدول زمني واحد.'
  ),
  groups: [
    {
      id: 'new',
      title: l('بیناسازی نوێ', 'New construction', 'البناء الجديد'),
      items: [
        { layer: 'f1', text: l('بیناکانی بازرگانی، ئۆفیس و مۆڵ', 'Commercial buildings, offices and malls', 'المباني التجارية والمكاتب والمولات') },
        { layer: 'f2', text: l('نەخۆشخانە، کلینیک و سەنتەری پزیشکی', 'Hospitals, clinics and medical centres', 'المستشفيات والعيادات والمراكز الطبية') },
        { layer: 'f3', text: l('هۆتێل و ڕێستورانت', 'Hotels and restaurants', 'الفنادق والمطاعم') },
        { layer: 'f4', text: l('خانووی نیشتەجێبوون، ڤێلا و کۆمپلێکس', 'Houses, villas and residential complexes', 'المنازل والفلل والمجمعات السكنية') },
        {
          layer: 'frame',
          text: l(
            'کاری ستراکچەر: کۆنکرێت، ستیل ستراکچەر و هەیکەلی پێشوەختە دروستکراو',
            'Structural work: concrete, steel structures and prefabricated frames',
            'الأعمال الإنشائية: الخرسانة والهياكل الفولاذية والهياكل مسبقة الصنع'
          ),
        },
      ],
    },
    {
      id: 'renovation',
      title: l('نوژەنکردنەوە و فیت ئاوت', 'Renovation and fit-out', 'الترميم والتجهيز (Fit-out)'),
      items: [
        { layer: 'renovation', text: l('نوژەنکردنەوەی ئۆفیس، دوکان، ڕێستورانت و کافێ', 'Renovating offices, shops, restaurants and cafés', 'ترميم المكاتب والمحلات والمطاعم والمقاهي') },
        {
          layer: 'renovation',
          text: l(
            'گۆڕینی بەکارهێنانی شوێن، بۆ نموونە خانوو بۆ کلینیک یان ئۆفیس',
            'Changing how a space is used, for example a house into a clinic or office',
            'تغيير استخدام المكان، مثل تحويل منزل إلى عيادة أو مكتب'
          ),
        },
        {
          layer: 'fitout',
          text: l(
            'ئامادەکردنی شوێن بۆ براندێکی نوێ (Fit-out) بەپێی ڕێنماییەکانی براند',
            'Fitting out a space for a new brand, to the brand guidelines',
            'تجهيز المكان لعلامة تجارية جديدة (Fit-out) وفق إرشادات العلامة'
          ),
        },
      ],
    },
    {
      id: 'interior',
      title: l('تەواوکاری ناوەوە و دیکۆر', 'Interior finishing and decor', 'التشطيبات الداخلية والديكور'),
      items: [
        { layer: 'finishes', text: l('گەچ، بۆیە، سیرامیک، مەڕمەڕ و پارکێت', 'Plaster, paint, ceramic tiles, marble and parquet', 'الجص والدهان والسيراميك والرخام والباركيه') },
        { layer: 'ceiling', text: l('سەقفی جیپسۆم بۆرد و دیواری جیاکەرەوە', 'Gypsum board ceilings and partition walls', 'أسقف الجبس بورد والجدران الفاصلة') },
        { layer: 'decor', text: l('دیکۆری ناوەوە، ڕووناکیی دیکۆری و فەرنیشینگ', 'Interior decor, decorative lighting and furnishing', 'الديكور الداخلي والإنارة الديكورية والتأثيث') },
        { layer: 'openings', text: l('دەرگا، پەنجەرە و ئەلەمنیۆم', 'Doors, windows and aluminium', 'الأبواب والنوافذ والألمنيوم') },
      ],
    },
    {
      id: 'facade',
      title: l('ڕووکاری دەرەوە', 'Exterior facade', 'الواجهات الخارجية'),
      items: [
        {
          layer: 'facade',
          text: l(
            'کلادینگ، شووشەی ڕووکار (Curtain Wall) و بەردی ڕووکار',
            'Cladding, curtain-wall glazing and stone facades',
            'الكلادينج وواجهات الزجاج (Curtain Wall) والحجر'
          ),
        },
        { layer: 'insulation', text: l('عازلکردنی گەرما و ئاو بۆ سەربان و دیوار', 'Thermal and waterproof insulation for roofs and walls', 'العزل الحراري والمائي للأسطح والجدران') },
      ],
    },
    {
      id: 'supervision',
      title: l('سەرپەرشتیاری پرۆژە', 'Project supervision', 'الإشراف على المشاريع'),
      items: [
        {
          layer: 'supervision',
          text: l(
            'ئەگەر پیمانکاری ترت هەیە، دەتوانین وەک سەرپەرشتیار بە ناوی تۆوە کوالیتی، کات و بودجە چاودێری بکەین.',
            'If you already have other contractors, we can act as your supervisor and watch quality, time and budget on your behalf.',
            'إذا كان لديك مقاولون آخرون، يمكننا الإشراف نيابةً عنك على الجودة والوقت والميزانية.'
          ),
        },
      ],
    },
  ],
  steps: [
    {
      title: l('سەردانی شوێن و وەرگرتنی پێویستییەکان', 'Site visit and your requirements', 'زيارة الموقع وجمع المتطلبات'),
      text: l('شوێنەکە دەبینین، پێوانە دەکەین و گوێ لە پێویستییەکانت دەگرین.', 'We see the site, take measurements and listen to what you need.', 'نعاين الموقع ونأخذ القياسات ونستمع إلى احتياجاتك.'),
    },
    {
      title: l('دیزاین و نەخشە', 'Design and drawings', 'التصميم والمخططات'),
      text: l(
        'نەخشە و دیزاینی ناوەوە و دەرەوە ئامادە دەکەین، تا پێش دەستپێکردن ببینیت چی دروست دەبێت.',
        'We prepare the plans and the interior and exterior design, so you see what will be built before work starts.',
        'نجهز المخططات والتصميم الداخلي والخارجي لترى ما سيُبنى قبل البدء.'
      ),
    },
    {
      title: l('بودجە و خشتەی کات', 'Budget and schedule', 'الميزانية والجدول الزمني'),
      text: l('بودجەیەکی ڕوون و خشتەیەکی کات بۆ هەر قۆناغێک دادەنێین.', 'You get a clear budget and a schedule for each stage.', 'نضع ميزانية واضحة وجدولاً زمنياً لكل مرحلة.'),
    },
    {
      title: l('جێبەجێکردن بە سەرپەرشتیی ئەندازیار', 'Construction under engineer supervision', 'التنفيذ بإشراف مهندس'),
      text: l('تیمەکانمان کار دەکەن و ئەندازیار هەموو قۆناغێک دەپشکنێت.', 'Our crews build while an engineer checks every stage.', 'تعمل فرقنا ويفحص المهندس كل مرحلة.'),
    },
    {
      title: l('پشکنینی کۆتایی و ڕادەستکردن', 'Final inspection and handover', 'الفحص النهائي والتسليم'),
      text: l('پێکەوە کارەکە دەپشکنین و کلیلەکەت ڕادەست دەکەین.', 'We inspect the finished work with you and hand over the keys.', 'نفحص العمل المنجز معك ونسلّمك المفتاح.'),
    },
  ],
  audience: [
    { icon: 'brand', label: A.brands },
    { icon: 'hospital', label: A.hospitalClinic },
    { icon: 'hotel', label: A.hotelRestaurant },
    { icon: 'home', label: A.homeOwners },
    { icon: 'shop', label: A.retail },
  ],
  faqs: [
    {
      q: l('دەتوانن تەنیا بەشێک لە کارەکە بکەن؟', 'Can you take on only part of the work?', 'هل يمكنكم تنفيذ جزء من العمل فقط؟'),
      a: l(
        'بەڵێ؛ دەتوانین تەنیا نوژەنکردنەوە، تەواوکاری یان سەرپەرشتی بگرینە ئەستۆ.',
        'Yes. We can take on just the renovation, the finishing or the supervision.',
        'نعم؛ يمكننا تولي الترميم أو التشطيب أو الإشراف فقط.'
      ),
    },
    {
      q: l('ساردکەرەوە، کارەبا و ئایتیش لەگەڵ بیناسازی دەکەن؟', 'Do you also do HVAC, electrical and IT with the construction?', 'هل تنفذون التكييف والكهرباء وتقنية المعلومات مع البناء؟'),
      a: l(
        'بەڵێ؛ هەموو بوارەکان لەژێر یەک بەڕێوەبردندان، بۆیە پێویست بە چەند پیمانکاری جیاواز ناکات.',
        'Yes. Every trade is under one management, so you do not need several different contractors.',
        'نعم؛ جميع التخصصات تحت إدارة واحدة، فلا حاجة لعدة مقاولين.'
      ),
    },
  ],
  related: ['hvac', 'electrical-solar', 'it-systems'],
  sectors: ['Construction', 'Decoration', 'Turnkey'],
  keywords: [
    'بیناسازی', 'بینا', 'نوژەنکردنەوە', 'نۆژەنکردنەوە', 'دیکۆر', 'تەواوکاری', 'کاشی', 'گەچ', 'جیپسۆم', 'سیرامیک', 'بۆیە',
    'بناء', 'ترميم', 'ديكور', 'تشطيب', 'مقاولات',
    'construction', 'renovation', 'fit-out', 'fit out', 'decor', 'building', 'finishing', 'gypsum',
  ],
};

/* ------------------------------------------------------------------ 3. Electrical & clean energy */
const electricalPage: Service = {
  slug: 'electrical-solar',
  accent: '#F5C518',
  accent2: '#3DBB6E',
  name: l('ئەندازیاری کارەبا و وزەی پاک', 'Electrical Engineering & Clean Energy', 'الهندسة الكهربائية والطاقة النظيفة'),
  summary: l(
    'سیستەمی کارەبای سەلامەت بۆ هەموو جۆرە بینایەک، لەگەڵ سۆلار پانێڵ بۆ ئەوەی کەمتر پشت بە مۆلیدە ببەستیت و پسوولەکەت کەم بێتەوە.',
    'Safe electrical systems for every type of building, with solar panels so you rely less on the generator and pay a smaller bill.',
    'أنظمة كهربائية آمنة لجميع أنواع المباني، مع ألواح شمسية لتعتمد أقل على المولّدة وتنخفض فاتورتك.'
  ),
  bullets: [
    l('تۆڕ و تابلۆی کارەبا', 'Wiring and distribution boards', 'التمديدات واللوحات الكهربائية'),
    l('ATS و UPS', 'ATS and UPS', 'ATS و UPS'),
    l('سۆلار On-grid / Off-grid / Hybrid', 'On-grid / off-grid / hybrid solar', 'طاقة شمسية On-grid / Off-grid / Hybrid'),
    l('ڕووناکی و سیستەمی زەوی', 'Lighting and earthing', 'الإنارة والتأريض'),
  ],
  tagline: l(
    'کەمتر پشت بە مۆلیدە ببەستە، پسوولەی کارەبات کەم بکەرەوە.',
    'Rely less on the generator and lower your electricity bill.',
    'اعتمد أقل على المولّدة وخفّض فاتورة الكهرباء.'
  ),
  intro: l(
    'سیستەمێکی کارەبای سەلامەت و ڕێکخراو بۆ هەموو جۆرە بینایەک، لەگەڵ وزەی خۆر بۆ ئەوەی کەمتر پشت بە مۆلیدە و کارەبای نیشتمانی ببەستیت.',
    'A safe, well-organised electrical system for every type of building, with solar power so you depend less on the generator and the national grid.',
    'نظام كهربائي آمن ومنظّم لجميع أنواع المباني، مع الطاقة الشمسية لتعتمد أقل على المولّدة والكهرباء الوطنية.'
  ),
  groups: [
    {
      id: 'building',
      title: l('کارەبای بینا', 'Building electrical', 'كهرباء المبنى'),
      items: [
        { layer: 'design', text: l('دیزاین و حیسابکردنی بارستایی کارەبا (Load Calculation)', 'Design and electrical load calculation', 'التصميم وحساب الأحمال الكهربائية (Load Calculation)') },
        { layer: 'cabling', text: l('کێبڵکاری و دابەشکردنی کارەبا بۆ هەموو نهۆمەکان', 'Cabling and power distribution to every floor', 'تمديد الكابلات وتوزيع الكهرباء على جميع الطوابق') },
        { layer: 'panels', text: l('تابلۆی سەرەکی و لاوەکی (MDB / SMDB / DB)', 'Main and sub distribution boards (MDB / SMDB / DB)', 'اللوحات الرئيسية والفرعية (MDB / SMDB / DB)') },
        {
          layer: 'ats',
          text: l(
            'ATS بۆ گۆڕینی خۆکار لە نێوان کارەبای نیشتمانی، مۆلیدە و سۆلار',
            'ATS for automatic changeover between the grid, the generator and solar',
            'ATS للتحويل التلقائي بين الكهرباء الوطنية والمولّدة والطاقة الشمسية'
          ),
        },
        { layer: 'lighting', text: l('ڕووناکیی ناوەوە، دەرەوە و ڕووناکیی فریاکەوتن', 'Indoor, outdoor and emergency lighting', 'الإنارة الداخلية والخارجية وإنارة الطوارئ') },
        { layer: 'earthing', text: l('سیستەمی زەوی (Earthing) و پاراستن لە هەورەتریشقە', 'Earthing and lightning protection', 'نظام التأريض والحماية من الصواعق') },
        {
          layer: 'ups',
          text: l(
            'UPS و ستابیلایزەر بۆ نەخۆشخانە، ئامێری پزیشکی و ژووری سێرڤەر',
            'UPS and stabilisers for hospitals, medical equipment and server rooms',
            'UPS ومنظمات الجهد للمستشفيات والأجهزة الطبية وغرف الخوادم'
          ),
        },
      ],
    },
    {
      id: 'solar',
      title: l('وزەی پاک (سۆلار پانێڵ)', 'Clean energy (solar panels)', 'الطاقة النظيفة (الألواح الشمسية)'),
      items: [
        { layer: 'ongrid', title: l('On-grid', 'On-grid', 'On-grid'), text: l('بەستراو بە تۆڕی کارەباوە، بۆ کەمکردنەوەی پسوولە', 'Connected to the grid, to lower your bill', 'متصل بشبكة الكهرباء لخفض الفاتورة') },
        { layer: 'offgrid', title: l('Off-grid', 'Off-grid', 'Off-grid'), text: l('سەربەخۆ بە باتری، بۆ شوێنی دوور یان بێ کارەبا', 'Independent, with batteries, for remote places or sites with no power', 'مستقل بالبطاريات، للأماكن البعيدة أو التي لا تصلها الكهرباء') },
        {
          layer: 'hybrid',
          title: l('Hybrid', 'Hybrid', 'Hybrid'),
          text: l('تێکەڵەیەک لە هەردووکیان، گونجاو بۆ ئەو شوێنانەی کارەبایان دەبڕێت', 'A mix of both, suited to places where the power keeps cutting out', 'مزيج من الاثنين، مناسب للأماكن التي تنقطع فيها الكهرباء'),
        },
        { layer: 'battery', text: l('باتری لیتیۆم و پاشەکەوتکردنی وزە', 'Lithium batteries and energy storage', 'بطاريات الليثيوم وتخزين الطاقة') },
        { layer: 'uses', text: l('سۆلار بۆ ماڵ، ئۆفیس، کارگە، کێڵگە و پەمپی ئاو', 'Solar for homes, offices, factories, farms and water pumps', 'الطاقة الشمسية للمنازل والمكاتب والمصانع والمزارع ومضخات المياه') },
        { layer: 'monitor', text: l('چاودێریی بەرهەمهێنان لە مۆبایلەوە', 'Production monitoring from your phone', 'مراقبة الإنتاج من الهاتف') },
        { layer: 'care', text: l('شوشتن، پشکنین و چاککردنەوەی پانێڵ', 'Panel washing, inspection and repair', 'غسل الألواح وفحصها وإصلاحها') },
      ],
    },
  ],
  steps: [
    {
      title: l('سەردانی شوێن و حیسابکردنی بارستایی', 'Site visit and load calculation', 'زيارة الموقع وحساب الأحمال'),
      text: l('بڕی بەکارهێنانی کارەبا و پێداویستییەکانی بیناکە دیاری دەکەین.', 'We measure how much power the building uses and what it needs.', 'نحدد استهلاك الكهرباء واحتياجات المبنى.'),
    },
    {
      title: l('دیزاین و نەخشەی Single-line', 'Design and single-line diagram', 'التصميم والمخطط أحادي الخط'),
      text: l(
        'تابلۆ، کێبڵ، ATS و قەبارەی سیستەمی سۆلار لەسەر نەخشە دادەنێین.',
        'Boards, cables, the ATS and the solar system size are set out on the drawing.',
        'نضع اللوحات والكابلات وATS وحجم نظام الطاقة الشمسية على المخطط.'
      ),
    },
    {
      title: l('دابینکردنی کەرەستە', 'Supply of materials', 'توريد المواد'),
      text: l('کەرەستە بەپێی دیزاین و بودجەکەت دابین دەکەین.', 'Materials are supplied to the design and your budget.', 'نورّد المواد حسب التصميم وميزانيتك.'),
    },
    {
      title: l('دامەزراندن', 'Installation', 'التركيب'),
      text: l('کێبڵکاری، تابلۆ، ڕووناکی و پانێڵەکان لەلایەن تیمەکەمانەوە دادەمەزرێن.', 'Our team installs the cabling, boards, lighting and panels.', 'يركّب فريقنا الكابلات واللوحات والإنارة والألواح.'),
    },
    {
      title: l('تاقیکردنەوە و پشکنینی سەلامەتی', 'Testing and safety checks', 'الاختبار وفحص السلامة'),
      text: l('سیستەمی زەوی، ATS و هەموو بازنەکان پێش ڕادەستکردن تاقی دەکرێنەوە.', 'Earthing, the ATS and every circuit are tested before handover.', 'نختبر التأريض وATS وجميع الدوائر قبل التسليم.'),
    },
    {
      title: l('چاودێری و چاککردنەوە', 'Monitoring and maintenance', 'المراقبة والصيانة'),
      text: l(
        'بەرهەمی سۆلار لە مۆبایلەوە دەبینیت، و ئێمە پانێڵەکان دەشۆین و دەپشکنین.',
        'You follow solar output on your phone, and we wash and check the panels.',
        'تتابع إنتاج الطاقة الشمسية من هاتفك، ونغسل الألواح ونفحصها.'
      ),
    },
  ],
  audience: [
    { icon: 'home', label: A.homeVilla },
    { icon: 'shop', label: A.shopRestaurant },
    { icon: 'hotel', label: A.hotel },
    { icon: 'hospital', label: A.hospital },
    { icon: 'farm', label: A.factoryFarm },
  ],
  faqs: [
    {
      q: l('کام سیستەمی سۆلار بۆ من گونجاوە؟', 'Which solar system suits me?', 'أي نظام شمسي يناسبني؟'),
      a: l(
        'دوای بینینی شوێنەکە و بڕی بەکارهێنانی کارەبات، On-grid، Off-grid یان Hybrid پێشنیار دەکەین.',
        'After seeing your site and how much power you use, we recommend on-grid, off-grid or hybrid.',
        'بعد معاينة الموقع ومعرفة استهلاكك للكهرباء، نوصي بنظام On-grid أو Off-grid أو Hybrid.'
      ),
    },
    {
      q: l('سۆلار لەگەڵ مۆلیدە و کارەبای نیشتمانی کار دەکات؟', 'Does solar work with the generator and the national grid?', 'هل تعمل الطاقة الشمسية مع المولّدة والكهرباء الوطنية؟'),
      a: l('بەڵێ؛ بە ATS گۆڕین لە نێوانیاندا خۆکار دەبێت.', 'Yes. With an ATS, switching between them is automatic.', 'نعم؛ مع ATS يصبح التحويل بينها تلقائياً.'),
    },
  ],
  related: ['hvac', 'it-systems'],
  sectors: ['Electrical'],
  keywords: [
    'کارەبا', 'تابلۆ', 'مۆلیدە', 'سۆلار', 'پانێڵ', 'باتری', 'ڕووناکی', 'وزە', 'ئینڤێرتەر', 'کێبڵ',
    'كهرباء', 'طاقة شمسية', 'مولدة', 'ألواح', 'الواح', 'بطارية', 'انارة', 'إنارة',
    'electrical', 'electric', 'solar', 'generator', 'ups', 'ats', 'panel', 'battery', 'inverter', 'lighting', 'earthing',
  ],
};

/* ------------------------------------------------------------------ 4. Operating rooms & cleanrooms */
const orPage: Service = {
  slug: 'operating-rooms',
  accent: '#19A79A',
  name: l('هۆڵەکانی نەشتەرگەری و کلینرووم', 'Operating Rooms & Cleanrooms', 'غرف العمليات والغرف النظيفة'),
  summary: l(
    'هۆڵی نەشتەرگەری و ژووری پاک بەپێی ستانداردی نێودەوڵەتی؛ بیناسازی، هەوا، کارەبا و گازی پزیشکی لە یەک پرۆژەدا.',
    'Operating rooms and cleanrooms to international standards: construction, air, power and medical gas in one project.',
    'غرف عمليات وغرف نظيفة وفق المعايير الدولية؛ البناء والهواء والكهرباء والغازات الطبية في مشروع واحد.'
  ),
  bullets: [
    l('هۆڵی نەشتەرگەریی مۆدیولار', 'Modular operating rooms', 'غرف عمليات معيارية'),
    l('سیستەمی گازی پزیشکی (MGPS)', 'Medical gas systems (MGPS)', 'أنظمة الغازات الطبية (MGPS)'),
    l('ICU، IVF و تاقیگە', 'ICU, IVF and laboratories', 'العناية المركزة وIVF والمختبرات'),
    l('پشکنین بەپێی ISO 14644', 'Testing to ISO 14644', 'الفحص وفق ISO 14644'),
  ],
  tagline: l('ژینگەیەکی پاک بەپێی ستانداردی نێودەوڵەتی.', 'A clean environment built to international standards.', 'بيئة نظيفة وفق المعايير الدولية.'),
  intro: l(
    'ژینگەیەکی پاک و کۆنترۆڵکراو، لە دیزاینەوە تا پشکنینی کۆتایی. ئەم بەشە بیناسازی، هەوا، کارەبا و گازی پزیشکی پێکەوە دەبەستێتەوە.',
    'A clean, controlled environment, from design to the final tests. This field brings construction, air, electrical and medical gas together.',
    'بيئة نظيفة ومضبوطة من التصميم حتى الفحص النهائي. يجمع هذا المجال البناء والهواء والكهرباء والغازات الطبية معاً.'
  ),
  groups: [
    {
      id: 'or',
      title: l('هۆڵی نەشتەرگەری', 'Operating room', 'غرفة العمليات'),
      items: [
        { layer: 'walls', text: l('دیوار و سەقفی مۆدیولار بە گۆشەی خڕ بۆ پاککردنەوەی ئاسان', 'Modular walls and ceiling with rounded corners for easy cleaning', 'جدران وسقف معيارية بزوايا دائرية لسهولة التنظيف') },
        { layer: 'doors', text: l('دەرگای هەرمێتیک و خۆکار', 'Hermetic automatic doors', 'أبواب محكمة الإغلاق (هيرمتيك) وأوتوماتيكية') },
        { layer: 'floor', text: l('زەویی ڤینیلی پزیشکی و ئەنتی ستاتیک', 'Medical-grade, anti-static vinyl flooring', 'أرضيات فينيل طبية مضادة للكهرباء الساكنة') },
        { layer: 'lights', text: l('ڕووناکیی نەشتەرگەری و پێندانتی سەقف', 'Surgical lights and ceiling pendants', 'إنارة جراحية وأعمدة سقفية (Pendants)') },
        { layer: 'panel', text: l('تابلۆی کۆنترۆڵی هۆڵ: پلەی گەرما، شێ، فشار و کات', 'Room control panel: temperature, humidity, pressure and time', 'لوحة تحكم الغرفة: الحرارة والرطوبة والضغط والوقت') },
        {
          layer: 'air',
          text: l(
            'سیستەمی هەوای هۆڵ: فشاری پۆزەتیڤ و هەوای Laminar لەسەر مێزەکە، لەلایەن تیمی ساردکەرەوە و هەوای خۆمانەوە.',
            'The room air system: positive pressure and laminar airflow over the table, by our own HVAC team.',
            'نظام هواء الغرفة: ضغط إيجابي وتدفق هواء صفائحي فوق الطاولة، من فريق التكييف لدينا.'
          ),
          link: 'hvac',
        },
      ],
    },
    {
      id: 'mgps',
      title: l('سیستەمی گازی پزیشکی (MGPS)', 'Medical gas pipeline system (MGPS)', 'نظام الغازات الطبية (MGPS)'),
      items: [
        { layer: 'gas', text: l('ئۆکسجین، ڤاکیوم و هەوای پزیشکی', 'Oxygen, vacuum and medical air', 'الأكسجين والشفط (Vacuum) والهواء الطبي') },
        { layer: 'gaspipe', text: l('بۆڕی مسی پزیشکی، خاڵی دەرچوون و ئاگادارکەرەوە (Alarm)', 'Medical copper pipework, outlets and alarms', 'أنابيب النحاس الطبية ومخارج الغاز وأجهزة الإنذار') },
      ],
    },
    {
      id: 'rooms',
      title: l('ژوورە تایبەتەکان', 'Specialist rooms', 'الغرف الخاصة'),
      items: [
        { layer: 'icu', text: l('ICU و CCU', 'ICU and CCU', 'العناية المركزة ICU و CCU') },
        { layer: 'isolation', text: l('ژووری جیاکردنەوە (Isolation)', 'Isolation rooms', 'غرف العزل (Isolation)') },
        { layer: 'ivf', text: l('IVF و تاقیگە', 'IVF and laboratories', 'IVF والمختبرات') },
        { layer: 'pharma', text: l('کلینرووم بۆ دەرمانخانە و کارگەی دەرمان', 'Cleanrooms for pharmacies and pharmaceutical plants', 'غرف نظيفة للصيدليات ومصانع الأدوية') },
        { layer: 'cssd', text: l('ژووری پاککردنەوەی ئامێر (CSSD)', 'Sterile services department (CSSD)', 'قسم تعقيم الأدوات (CSSD)') },
      ],
    },
    {
      id: 'validation',
      title: l('پشکنین و پشتڕاستکردنەوە', 'Testing and validation', 'الفحص والتحقق'),
      items: [
        {
          layer: 'particles',
          text: l(
            'ژماردنی تەنۆلکەکانی هەوا (Particle Count) و تاقیکردنەوەی فلتەری HEPA',
            'Airborne particle counts and HEPA filter tests',
            'عدّ الجسيمات في الهواء (Particle Count) واختبار فلاتر HEPA'
          ),
        },
        { layer: 'pressure', text: l('پشکنینی فشار، گۆڕینی هەوا و ئاڕاستەی هەوا', 'Pressure, air-change and airflow-direction checks', 'فحص الضغط وتغيير الهواء واتجاه تدفقه') },
        { layer: 'report', text: l('ڕاپۆرتی پشتڕاستکردنەوە بەپێی ISO 14644', 'Validation report to ISO 14644', 'تقرير التحقق وفق ISO 14644') },
      ],
    },
  ],
  steps: [
    {
      title: l('هەڵسەنگاندنی شوێن و پێویستی پزیشکی', 'Site and clinical needs assessment', 'تقييم الموقع والاحتياجات الطبية'),
      text: l('جۆری نەشتەرگەری، ڕووبەر و ستانداردی پێویست دیاری دەکەین.', 'We define the type of surgery, the space and the standard required.', 'نحدد نوع العمليات والمساحة والمعيار المطلوب.'),
    },
    {
      title: l('دیزاین بەپێی ستاندارد', 'Design to standard', 'التصميم وفق المعايير'),
      text: l(
        'نەخشەی هۆڵ، ناوچەکانی فشار، هەوا، کارەبا و گازی پزیشکی پێکەوە دیزاین دەکرێن.',
        'Room layout, pressure zones, air, power and medical gas are designed together.',
        'نصمم مخطط الغرفة ومناطق الضغط والهواء والكهرباء والغازات الطبية معاً.'
      ),
    },
    {
      title: l('بیناسازی مۆدیولار', 'Modular construction', 'البناء المعياري'),
      text: l('دیوار، سەقف، زەوی و دەرگای هەرمێتیک دادەمەزرێن.', 'Walls, ceiling, floor and hermetic doors are installed.', 'تركيب الجدران والسقف والأرضية والأبواب المحكمة.'),
    },
    {
      title: l('هەوا، کارەبا و گازی پزیشکی', 'Air, power and medical gas', 'الهواء والكهرباء والغازات الطبية'),
      text: l(
        'سیستەمی هەوای HEPA، تابلۆی کۆنترۆڵ و بۆڕی گازی پزیشکی دادەمەزرێن.',
        'The HEPA air system, control panel and medical gas pipework go in.',
        'تركيب نظام هواء HEPA ولوحة التحكم وأنابيب الغازات الطبية.'
      ),
    },
    {
      title: l('پشکنین و پشتڕاستکردنەوە', 'Testing and validation', 'الفحص والتحقق'),
      text: l('ژماردنی تەنۆلکە، پشکنینی فشار و گۆڕینی هەوا بەپێی ISO 14644.', 'Particle counts, pressure and air-change checks to ISO 14644.', 'عدّ الجسيمات وفحص الضغط وتغيير الهواء وفق ISO 14644.'),
    },
    {
      title: l('ڕادەستکردن و پشکنینی خولی', 'Handover and periodic checks', 'التسليم والفحص الدوري'),
      text: l('ڕاپۆرتی پشتڕاستکردنەوە ڕادەست دەکەین و پشکنینی خولی بەردەوام دەبێت.', 'We hand over the validation report, and periodic checks continue.', 'نسلّم تقرير التحقق وتستمر الفحوصات الدورية.'),
    },
  ],
  audience: [
    { icon: 'hospital', label: A.hospital },
    { icon: 'surgery', label: A.surgery },
    { icon: 'beauty', label: A.beauty },
    { icon: 'ivf', label: A.ivf },
    { icon: 'lab', label: A.lab },
    { icon: 'pharma', label: A.pharma },
  ],
  faqs: [
    {
      q: l('هەموو بەشەکانی هۆڵەکە دەکەن؟', 'Do you do every part of the room?', 'هل تنفذون جميع أجزاء الغرفة؟'),
      a: l(
        'بەڵێ؛ بیناسازی، هەوا، کارەبا، گازی پزیشکی و پشکنین لە یەک پرۆژەدا.',
        'Yes. Construction, air, electrical, medical gas and testing in one project.',
        'نعم؛ البناء والهواء والكهرباء والغازات الطبية والفحص في مشروع واحد.'
      ),
    },
    {
      q: l('هۆڵێکی کۆن نوێ دەکەنەوە؟', 'Can you upgrade an existing room?', 'هل تجددون غرفة عمليات قديمة؟'),
      a: l(
        'بەڵێ؛ دوای پشکنینی هۆڵەکە، پلانی نوێکردنەوە بەپێی ستاندارد ئامادە دەکەین.',
        'Yes. After inspecting the room, we prepare an upgrade plan to the standard.',
        'نعم؛ بعد فحص الغرفة نعدّ خطة تحديث وفق المعايير.'
      ),
    },
  ],
  related: ['hvac', 'medical-equipment'],
  sectors: ['Cleanroom'],
  keywords: [
    'هۆڵی نەشتەرگەری', 'نەشتەرگەری', 'عەمەلیات', 'کلینرووم', 'ئۆکسجین', 'گازی پزیشکی', 'icu',
    'غرفة عمليات', 'غرف عمليات', 'غرف نظيفة', 'غازات طبية', 'عمليات',
    'operating room', 'operating theatre', 'cleanroom', 'clean room', 'mgps', 'medical gas', 'isolation', 'ivf', 'cssd',
  ],
};

/* ------------------------------------------------------------------ 5. Medical equipment */
const medicalPage: Service = {
  slug: 'medical-equipment',
  accent: '#E5484D',
  name: l('دابینکردن و چاککردنەوەی ئامێری پزیشکی', 'Medical Equipment Supply & Maintenance', 'توريد وصيانة الأجهزة الطبية'),
  summary: l(
    'ئامێرەکەت دابین دەکەین، دایدەمەزرێنین، ستافەکەت ڕادەهێنین و دواتر بە کارکردوویی دەیهێڵینەوە.',
    'We supply your equipment, install it, train your staff and then keep it running.',
    'نورّد جهازك ونركّبه وندرّب طاقمك ثم نحافظ على عمله.'
  ),
  bullets: [
    l('ئامێری نەشتەرگەری و ICU', 'Surgical and ICU equipment', 'أجهزة الجراحة والعناية المركزة'),
    l('ئامێری تاقیگە و پاککردنەوە', 'Laboratory and sterilisation equipment', 'أجهزة المختبر والتعقيم'),
    l('کالیبرەیشن و چاککردنەوە', 'Calibration and repair', 'المعايرة والإصلاح'),
    l('گرێبەستی چاککردنەوەی ساڵانە', 'Annual maintenance contracts', 'عقود الصيانة السنوية'),
  ],
  tagline: l('ئامێرەکانت هەمیشە ئامادەی کار.', 'Your equipment, always ready to work.', 'أجهزتك جاهزة للعمل دائماً.'),
  intro: l(
    'ئامێرەکەت دابین دەکەین، دایدەمەزرێنین، ستافەکەت ڕادەهێنین و دواتر بە کارکردوویی دەیهێڵینەوە.',
    'We supply your equipment, install it, train your staff and then keep it running.',
    'نورّد جهازك ونركّبه وندرّب طاقمك ثم نحافظ على عمله.'
  ),
  groups: [
    {
      id: 'supply',
      title: l('دابینکردن', 'Supply', 'التوريد'),
      items: [
        {
          layer: 'or',
          text: l(
            'ئامێری هۆڵی نەشتەرگەری: مێز، ڕووناکی، ئامێری بێهۆشکردن و ئیلێکترۆسێرجەری',
            'Operating room equipment: tables, lights, anaesthesia machines and electrosurgery',
            'أجهزة غرف العمليات: الطاولات والإنارة وأجهزة التخدير والكي الكهربائي'
          ),
        },
        { layer: 'icu', text: l('ئامێری ICU: مۆنیتەر، ڤێنتیلەیتەر و پەمپی ئینفیوژن', 'ICU equipment: monitors, ventilators and infusion pumps', 'أجهزة العناية المركزة: أجهزة المراقبة وأجهزة التنفس ومضخات التسريب') },
        { layer: 'lab', text: l('ئامێری تاقیگە', 'Laboratory equipment', 'أجهزة المختبرات') },
        { layer: 'steril', text: l('ئامێری پاککردنەوە: ئۆتۆکلەیڤ و ستەرلایزەر', 'Sterilisation equipment: autoclaves and sterilisers', 'أجهزة التعقيم: الأوتوكلاف وأجهزة التعقيم') },
        { layer: 'dental', text: l('ئامێری دەندان و سەنتەری جوانکاری', 'Dental and beauty-centre equipment', 'أجهزة طب الأسنان ومراكز التجميل') },
        {
          layer: 'select',
          text: l(
            'هەڵبژاردنی ئامێر بەپێی بودجە و بەردەستبوونی پارچەی یەدەگ لە ناوخۆ',
            'Equipment chosen for your budget and local spare-part availability',
            'اختيار الأجهزة حسب الميزانية وتوفر قطع الغيار محلياً'
          ),
        },
      ],
    },
    {
      id: 'install',
      title: l('دامەزراندن و ڕاهێنان', 'Installation and training', 'التركيب والتدريب'),
      items: [
        { layer: 'install', text: l('دامەزراندن و تاقیکردنەوەی سەرەتایی', 'Installation and initial testing', 'التركيب والاختبار الأولي') },
        { layer: 'train', text: l('ڕاهێنانی دکتۆر و ستافی پزیشکی لەسەر بەکارهێنان', 'Training doctors and medical staff to use it', 'تدريب الأطباء والطاقم الطبي على الاستخدام') },
      ],
    },
    {
      id: 'maintenance',
      title: l('چاککردنەوە', 'Maintenance', 'الصيانة'),
      items: [
        { layer: 'pm', text: l('چاککردنەوەی پێشوەختە (Preventive Maintenance) بەپێی خشتە', 'Scheduled preventive maintenance', 'صيانة وقائية (Preventive Maintenance) وفق جدول') },
        { layer: 'emergency', text: l('چاککردنەوەی فریاکەوتن', 'Emergency repairs', 'إصلاح الأعطال الطارئة') },
        { layer: 'calib', text: l('کالیبرەیشن و پشکنینی کارایی و سەلامەتی', 'Calibration, performance and safety testing', 'المعايرة وفحص الأداء والسلامة') },
        { layer: 'parts', text: l('دابینکردنی پارچەی یەدەگ', 'Spare parts supply', 'توفير قطع الغيار') },
        { layer: 'amc', text: l('گرێبەستی چاککردنەوەی ساڵانە بۆ نەخۆشخانە و کلینیک', 'Annual maintenance contracts for hospitals and clinics', 'عقود صيانة سنوية للمستشفيات والعيادات') },
      ],
    },
  ],
  steps: [
    {
      title: l('ناسینی پێداویستی', 'Understanding your needs', 'تحديد الاحتياجات'),
      text: l('جۆری بەش، ژمارەی نەخۆش و ئەو ئامێرانەی هەتە دەناسین.', 'We look at the department, the patient load and the equipment you already have.', 'نتعرف على القسم وعدد المرضى والأجهزة الموجودة لديك.'),
    },
    {
      title: l('هەڵبژاردنی ئامێر', 'Choosing the equipment', 'اختيار الأجهزة'),
      text: l('ئامێر بەپێی بودجە و بەردەستبوونی پارچەی یەدەگ لە ناوخۆ پێشنیار دەکەین.', 'We recommend equipment by budget and local spare-part availability.', 'نوصي بالأجهزة حسب الميزانية وتوفر قطع الغيار محلياً.'),
    },
    {
      title: l('دابینکردن', 'Supply', 'التوريد'),
      text: l('ئامێرەکە دەگەیەنینە شوێنەکەت.', 'We deliver the equipment to your site.', 'نوصل الأجهزة إلى موقعك.'),
    },
    {
      title: l('دامەزراندن و تاقیکردنەوە', 'Installation and testing', 'التركيب والاختبار'),
      text: l('دامەزراندن و تاقیکردنەوەی سەرەتایی پێش بەکارهێنان.', 'Installed and tested before first use.', 'التركيب والاختبار الأولي قبل الاستخدام.'),
    },
    {
      title: l('ڕاهێنانی ستاف', 'Staff training', 'تدريب الطاقم'),
      text: l('دکتۆر و ستافەکەت لەسەر بەکارهێنانی ئامێرەکە ڕادەهێنین.', 'Your doctors and staff learn to use the equipment.', 'ندرّب الأطباء والطاقم على استخدام الجهاز.'),
    },
    {
      title: l('چاککردنەوەی بەردەوام', 'Ongoing maintenance', 'الصيانة المستمرة'),
      text: l('چاککردنەوەی پێشوەختە بەپێی خشتە، کالیبرەیشن و چاککردنەوەی فریاکەوتن.', 'Scheduled preventive maintenance, calibration and emergency repair.', 'صيانة وقائية مجدولة ومعايرة وإصلاح الأعطال الطارئة.'),
    },
  ],
  audience: [
    { icon: 'hospital', label: A.hospital },
    { icon: 'clinic', label: A.clinic },
    { icon: 'beauty', label: A.beauty },
    { icon: 'dental', label: A.dental },
    { icon: 'lab', label: A.lab },
  ],
  faqs: [
    {
      q: l('ئامێرێک کە لە شوێنی تر کڕاوە چاک دەکەنەوە؟', 'Do you repair equipment bought elsewhere?', 'هل تصلحون أجهزة اشتُريت من مكان آخر؟'),
      a: l('بەڵێ؛ پەیوەندیمان پێوە بکە و جۆر و مۆدێلی ئامێرەکە بنێرە.', 'Yes. Contact us and send the make and model of the device.', 'نعم؛ تواصل معنا وأرسل نوع الجهاز وطرازه.'),
    },
    {
      q: l('ڕاهێنان بۆ ستافەکەمان هەیە؟', 'Is training included for our staff?', 'هل يوجد تدريب لطاقمنا؟'),
      a: l(
        'بەڵێ؛ دوای دامەزراندن ستافەکەت لەسەر بەکارهێنانی ئامێرەکە ڕادەهێنین.',
        'Yes. After installation we train your staff to use the equipment.',
        'نعم؛ بعد التركيب ندرّب طاقمك على استخدام الجهاز.'
      ),
    },
  ],
  related: ['operating-rooms', 'cleaning-staffing'],
  sectors: ['Medical', 'Maintenance'],
  keywords: [
    'ئامێری پزیشکی', 'ئامێر', 'مۆنیتەر', 'ڤێنتیلەیتەر', 'ئۆتۆکلەیڤ', 'چاککردنەوەی ئامێر', 'کالیبرەیشن', 'ستەرلایزەر',
    'أجهزة طبية', 'اجهزة طبية', 'صيانة أجهزة', 'صيانة اجهزة', 'معدات طبية', 'معايرة', 'تعقيم',
    'medical equipment', 'medical device', 'calibration', 'monitor', 'ventilator', 'autoclave', 'steriliser', 'sterilizer',
  ],
};

/* ------------------------------------------------------------------ 6. IT */
const itPage: Service = {
  slug: 'it-systems',
  accent: '#7C5CFF',
  name: l('چارەسەری تەکنەلۆژی و ئایتی', 'Technology & IT Solutions', 'حلول التكنولوجيا وتقنية المعلومات'),
  summary: l(
    'کامێرا، ئینتەرنێت و سیستەمی بەڕێوەبردن و چاودێری، بۆ ئەوەی شوێنەکەت پارێزراو بێت و لە هەر شوێنێکەوە بەڕێوەی ببەیت.',
    'Cameras, internet, and management and monitoring systems, so your place is protected and you can run it from anywhere.',
    'كاميرات وإنترنت وأنظمة إدارة ومراقبة، ليبقى مكانك محمياً وتديره من أي مكان.'
  ),
  bullets: [
    l('کامێرای IP و زیرەک', 'IP and smart cameras', 'كاميرات IP وذكية'),
    l('تۆڕ، فایبەر و WiFi', 'Networks, fibre and Wi-Fi', 'الشبكات والألياف وWiFi'),
    l('ERP و POS', 'ERP and POS', 'ERP و POS'),
    l('کۆنترۆڵی هاتوچۆ و بینای زیرەک', 'Access control and smart buildings', 'التحكم بالدخول والمباني الذكية'),
  ],
  tagline: l('شوێنەکەت پارێزراو، لە هەر شوێنێکەوە بەڕێوەی ببە.', 'Your place protected, and run from anywhere.', 'مكانك محمي، وأدِره من أي مكان.'),
  intro: l(
    'کامێرا، ئینتەرنێت و سیستەمی بەڕێوەبردن و چاودێری بۆ هەموو جۆرە دامەزراوەیەک، لە دوکانێکی بچووکەوە تا نەخۆشخانە و هۆتێل.',
    'Cameras, internet, and management and monitoring systems for every kind of organisation, from a small shop to a hospital or hotel.',
    'كاميرات وإنترنت وأنظمة إدارة ومراقبة لجميع أنواع المؤسسات، من محل صغير إلى مستشفى أو فندق.'
  ),
  groups: [
    {
      id: 'cctv',
      title: l('کامێرای چاودێری', 'Security cameras', 'كاميرات المراقبة'),
      items: [
        { layer: 'ipcam', text: l('کامێرای IP بە کوالیتیی بەرز بۆ ناوەوە و دەرەوە', 'High-quality IP cameras for indoors and outdoors', 'كاميرات IP عالية الجودة للداخل والخارج') },
        {
          layer: 'aicam',
          text: l(
            'کامێرای زیرەک (AI): ناسینەوەی ڕوخسار، خوێندنەوەی ژمارەی ئۆتۆمبێل و ئاگادارکردنەوەی جووڵە',
            'Smart (AI) cameras: face recognition, number-plate reading and motion alerts',
            'كاميرات ذكية (AI): التعرف على الوجوه وقراءة لوحات السيارات وتنبيهات الحركة'
          ),
        },
        { layer: 'mobile', text: l('بینینی ڕاستەوخۆ لە مۆبایلەوە', 'Live view on your phone', 'المشاهدة المباشرة من الهاتف') },
        { layer: 'nvr', text: l('تۆمارکردن و پاشەکەوتکردنی درێژخایەن (NVR)', 'Long-term recording and storage (NVR)', 'التسجيل والتخزين طويل الأمد (NVR)') },
      ],
    },
    {
      id: 'network',
      title: l('ئینتەرنێت و تۆڕ', 'Internet and networks', 'الإنترنت والشبكات'),
      items: [
        { layer: 'cabling', text: l('کێبڵکاریی ڕێکخراو (Structured Cabling) و فایبەر', 'Structured cabling and fibre', 'التمديدات المنظمة (Structured Cabling) والألياف الضوئية') },
        { layer: 'wifi', text: l('WiFi بۆ هۆتێل، نەخۆشخانە و ئۆفیس بە داپۆشینی تەواو', 'Full-coverage Wi-Fi for hotels, hospitals and offices', 'شبكة WiFi بتغطية كاملة للفنادق والمستشفيات والمكاتب') },
        { layer: 'devices', text: l('ڕاوتەر، سویچ و فایەروۆڵ', 'Routers, switches and firewalls', 'الراوترات والسويتشات والجدران النارية') },
        { layer: 'server', text: l('ژووری سێرڤەر و ڕەکی تۆڕ', 'Server rooms and network racks', 'غرف الخوادم وخزائن الشبكة') },
      ],
    },
    {
      id: 'systems',
      title: l('سیستەمەکانی بەڕێوەبردن', 'Management systems', 'أنظمة الإدارة'),
      items: [
        { layer: 'erp', text: l('ERP بۆ بەڕێوەبردنی کۆمپانیا (وەک Odoo)', 'ERP for running the company (such as Odoo)', 'ERP لإدارة الشركة (مثل Odoo)') },
        { layer: 'pos', text: l('POS بۆ ڕێستورانت، کافێ و دوکان', 'POS for restaurants, cafés and shops', 'نقاط البيع POS للمطاعم والمقاهي والمحلات') },
        { layer: 'his', text: l('سیستەمی بەڕێوەبردنی نەخۆشخانە و کلینیک', 'Hospital and clinic management systems', 'أنظمة إدارة المستشفيات والعيادات') },
        { layer: 'pms', text: l('سیستەمی بەڕێوەبردنی هۆتێل', 'Hotel management systems', 'أنظمة إدارة الفنادق') },
      ],
    },
    {
      id: 'control',
      title: l('چاودێری و کۆنترۆڵ', 'Monitoring and control', 'المراقبة والتحكم'),
      items: [
        { layer: 'access', text: l('کۆنترۆڵی هاتوچۆ: پەنجەمۆر، کارت و ناسینەوەی ڕوخسار', 'Access control: fingerprint, card and face recognition', 'التحكم بالدخول: البصمة والبطاقة والتعرف على الوجه') },
        { layer: 'attendance', text: l('تۆماری ئامادەبوونی کارمەندان', 'Staff attendance records', 'تسجيل حضور الموظفين') },
        { layer: 'intercom', text: l('ئینتەرکۆم و سیستەمی دەنگ', 'Intercom and sound systems', 'الإنتركم وأنظمة الصوت') },
        {
          layer: 'bms',
          text: l(
            'سیستەمی بینای زیرەک (BMS) بۆ کۆنترۆڵی ساردکەرەوە، ڕووناکی و کارەبا لە یەک شاشەدا',
            'Smart building systems (BMS) to control cooling, lighting and power from one screen',
            'أنظمة المباني الذكية (BMS) للتحكم في التكييف والإنارة والكهرباء من شاشة واحدة'
          ),
        },
      ],
    },
  ],
  steps: [
    {
      title: l('سەردانی شوێن', 'Site survey', 'معاينة الموقع'),
      text: l('شوێنی کامێرا، خاڵی تۆڕ و پێداویستییەکانی کارەکەت دیاری دەکەین.', 'We map camera positions, network points and what your business needs.', 'نحدد مواقع الكاميرات ونقاط الشبكة واحتياجات عملك.'),
    },
    {
      title: l('دیزاینی سیستەم', 'System design', 'تصميم النظام'),
      text: l('نەخشەی تۆڕ، داپۆشینی WiFi و مەیدانی بینینی کامێراکان ئامادە دەکەین.', 'The network map, Wi-Fi coverage and camera fields of view are planned.', 'نعدّ مخطط الشبكة وتغطية WiFi ومجال رؤية الكاميرات.'),
    },
    {
      title: l('دابینکردن و دامەزراندن', 'Supply and installation', 'التوريد والتركيب'),
      text: l('کێبڵ، ئامێر و سیستەمەکان دادەمەزرێنین.', 'Cabling, devices and software are installed.', 'نركّب الكابلات والأجهزة والأنظمة.'),
    },
    {
      title: l('ڕێکخستن و بەستنەوە', 'Setup and integration', 'الإعداد والربط'),
      text: l('سیستەمەکان پێکەوە دەبەسترێن و بینین لە مۆبایلەوە ڕێک دەخرێت.', 'Systems are linked together and mobile access is set up.', 'نربط الأنظمة معاً ونجهّز الوصول من الهاتف.'),
    },
    {
      title: l('ڕاهێنان و ڕادەستکردن', 'Training and handover', 'التدريب والتسليم'),
      text: l('ستافەکەت فێری بەکارهێنانی سیستەمەکان دەکەین.', 'Your staff learn to use every system.', 'ندرّب طاقمك على استخدام الأنظمة.'),
    },
    {
      title: l('پشتگیری', 'Support', 'الدعم'),
      text: l('لە کاتی کێشە یان فراوانکردندا لەگەڵتانین.', 'We are there for faults and for expansion.', 'نحن معك عند الأعطال أو التوسعة.'),
    },
  ],
  audience: [
    { icon: 'hotel', label: A.hotel },
    { icon: 'hospital', label: A.hospital },
    { icon: 'restaurant', label: A.restaurantCafe },
    { icon: 'office', label: A.officeCompany },
    { icon: 'mall', label: A.mallShop },
    { icon: 'government', label: A.government },
  ],
  faqs: [
    {
      q: l('دەتوانم کامێراکان لە مۆبایلەوە ببینم؟', 'Can I watch the cameras on my phone?', 'هل يمكنني مشاهدة الكاميرات من هاتفي؟'),
      a: l('بەڵێ؛ بینینی ڕاستەوخۆ و تۆمارکراو لە مۆبایلەوە ڕێک دەخەین.', 'Yes. We set up live and recorded viewing on your phone.', 'نعم؛ نجهّز المشاهدة المباشرة والمسجلة من الهاتف.'),
    },
    {
      q: l('سیستەمەکانی ئێستام دەتوانرێت پێکەوە ببەسترێن؟', 'Can my existing systems be connected together?', 'هل يمكن ربط أنظمتي الحالية معاً؟'),
      a: l(
        'لە زۆربەی حاڵەتەکاندا بەڵێ؛ دوای پشکنینی سیستەمەکانت پلانێکی بەستنەوە ئامادە دەکەین.',
        'In most cases, yes. After checking your systems we prepare a plan to connect them.',
        'في معظم الحالات نعم؛ بعد فحص أنظمتك نعدّ خطة للربط.'
      ),
    },
  ],
  related: ['electrical-solar', 'management-setup'],
  sectors: ['IT', 'CCTV'],
  keywords: [
    'کامێرا', 'ئینتەرنێت', 'wifi', 'وایفای', 'تۆڕ', 'پەنجەمۆر', 'سیستەم', 'ئایتی', 'سێرڤەر', 'فایبەر',
    'كاميرات', 'كاميرا', 'شبكات', 'شبكة', 'انترنت', 'إنترنت', 'بصمة', 'سيرفر',
    'cctv', 'camera', 'network', 'erp', 'pos', 'it systems', 'it solutions', 'it services', 'internet', 'wifi', 'fingerprint', 'access control', 'bms', 'server',
  ],
};

/* ------------------------------------------------------------------ 7. Management setup */
const managementPage: Service = {
  slug: 'management-setup',
  accent: '#C9A227',
  name: l('دامەزراندنی سیستەمی بەڕێوەبردن و هەیکەلی ئیداری', 'Management Setup & Administrative Structure', 'تأسيس الأنظمة الإدارية والهيكل التنظيمي'),
  summary: l(
    'هەیکەلی ئیداری، ڕێکار و سیستەمی کار بۆ کۆمپانیاکەت دادەمەزرێنین، تا کارەکان ڕێکخراو و پێوانەکراو بن.',
    "We set up your company's administrative structure, procedures and working systems, so the work is organised and measurable.",
    'نؤسس الهيكل الإداري والإجراءات وأنظمة العمل لشركتك، لتكون الأعمال منظمة وقابلة للقياس.'
  ),
  bullets: [
    l('هەیکەلی ڕێکخستن و ئەرکەکان', 'Org structure and roles', 'الهيكل التنظيمي والمهام'),
    l('SOP و ڕێکاری کار', 'SOPs and procedures', 'الإجراءات وتعليمات العمل (SOP)'),
    l('سیستەمی دارایی و HR', 'Finance and HR systems', 'الأنظمة المالية والموارد البشرية'),
    l('KPI و ERP', 'KPIs and ERP', 'مؤشرات الأداء KPI و ERP'),
  ],
  tagline: l('کۆمپانیاکەت لەسەر بنەمایەکی ڕێکخراو بنیات دەنێین.', 'We build your company on an organised foundation.', 'نبني شركتك على أساس منظّم.'),
  intro: l(
    'هەیکەلی ئیداری، ڕێکار و سیستەمی کار دادەمەزرێنین، تا کارەکان بەبێ پشت بەستن بە یەک کەس بەڕێوە بچن. گونجاوە بۆ کۆمپانیای نوێ و ئەوانەی گەشە دەکەن، نەخۆشخانە، هۆتێل و ڕێستورانت.',
    'We set up the administrative structure, procedures and working systems, so the work runs without depending on one person. Suited to new and growing companies, hospitals, hotels and restaurants.',
    'نؤسس الهيكل الإداري والإجراءات وأنظمة العمل، لتسير الأعمال دون الاعتماد على شخص واحد. مناسب للشركات الجديدة والنامية والمستشفيات والفنادق والمطاعم.'
  ),
  groups: [
    {
      id: 'structure',
      title: l('هەیکەلی ڕێکخستن', 'Organisational structure', 'الهيكل التنظيمي'),
      items: [
        { layer: 'org', text: l('دیزاینی هەیکەلی ڕێکخستن (Org Chart) و بەشەکان', 'Designing the org chart and departments', 'تصميم الهيكل التنظيمي (Org Chart) والأقسام') },
        {
          layer: 'jd',
          text: l(
            'نووسینی ئەرک و بەرپرسیارێتیی هەر پۆستێک (Job Description)',
            'Writing the duties and responsibilities of each role (job descriptions)',
            'كتابة مهام ومسؤوليات كل وظيفة (الوصف الوظيفي)'
          ),
        },
        { layer: 'authority', text: l('دیاریکردنی دەسەڵات و ڕێگای بڕیاردان', 'Defining authority and how decisions are made', 'تحديد الصلاحيات وطريقة اتخاذ القرار') },
      ],
    },
    {
      id: 'procedures',
      title: l('ڕێکار و سیستەم', 'Procedures and systems', 'الإجراءات والأنظمة'),
      items: [
        { layer: 'sop', text: l('ڕێنمایی و ڕێکاری کار (SOP) بۆ هەر بەشێک', 'Working procedures (SOPs) for each department', 'تعليمات وإجراءات العمل (SOP) لكل قسم') },
        { layer: 'finance', text: l('سیستەمی دارایی و ژمێریاری', 'Finance and accounting systems', 'الأنظمة المالية والمحاسبية') },
        { layer: 'purchasing', text: l('سیستەمی کڕین و کۆگا', 'Purchasing and inventory systems', 'أنظمة المشتريات والمخازن') },
        { layer: 'hr', text: l('سیستەمی HR: دامەزراندن، مووچە، ئامادەبوون و مۆڵەت', 'HR systems: hiring, payroll, attendance and leave', 'أنظمة الموارد البشرية: التوظيف والرواتب والحضور والإجازات') },
      ],
    },
    {
      id: 'measure',
      title: l('پێوانە و چاودێری', 'Measurement and monitoring', 'القياس والمتابعة'),
      items: [
        { layer: 'kpi', text: l('پێوەری کارایی (KPI) بۆ بەشەکان و کارمەندان', 'Performance indicators (KPIs) for departments and staff', 'مؤشرات الأداء (KPI) للأقسام والموظفين') },
        { layer: 'reports', text: l('ڕاپۆرتی مانگانە بۆ بەڕێوەبەرایەتی', 'Monthly reports for management', 'تقارير شهرية للإدارة') },
        { layer: 'appraisal', text: l('هەڵسەنگاندنی کارمەندان', 'Staff appraisals', 'تقييم الموظفين') },
      ],
    },
    {
      id: 'digital',
      title: l('دیجیتاڵکردن و ڕاهێنان', 'Digitalisation and training', 'الرقمنة والتدريب'),
      items: [
        {
          layer: 'erp',
          text: l(
            'دامەزراندنی سیستەمی ERP (وەک Odoo) و ڕێکخستنی بەپێی کارەکەت',
            'Setting up an ERP system (such as Odoo) configured to your business',
            'تأسيس نظام ERP (مثل Odoo) وإعداده حسب عملك'
          ),
        },
        { layer: 'training', text: l('ڕاهێنانی بەڕێوەبەر و کارمەندان', 'Training managers and staff', 'تدريب المدراء والموظفين') },
        { layer: 'support', text: l('پشتگیری دوای دامەزراندن', 'Support after setup', 'الدعم بعد التأسيس') },
      ],
    },
  ],
  steps: [
    {
      title: l('هەڵسەنگاندنی بارودۆخی ئێستا', 'Assessing where you are now', 'تقييم الوضع الحالي'),
      text: l('چۆنیەتی کارکردنی ئێستای کۆمپانیاکەت و خاڵە لاوازەکان دەناسین.', 'We learn how your company works today and where it struggles.', 'نتعرف على طريقة عمل شركتك الحالية ونقاط الضعف.'),
    },
    {
      title: l('دیزاینی هەیکەل و ئەرکەکان', 'Designing the structure and roles', 'تصميم الهيكل والمهام'),
      text: l('Org Chart، ئەرکی هەر پۆستێک و دەسەڵاتەکان دیاری دەکەین.', 'The org chart, role duties and authority are defined.', 'نحدد الهيكل التنظيمي ومهام كل وظيفة والصلاحيات.'),
    },
    {
      title: l('نووسینی ڕێکار و سیستەم', 'Writing procedures and systems', 'كتابة الإجراءات والأنظمة'),
      text: l('SOP، سیستەمی دارایی، کڕین و HR دادەنرێن.', 'SOPs and the finance, purchasing and HR systems are written.', 'نضع الإجراءات والأنظمة المالية والمشتريات والموارد البشرية.'),
    },
    {
      title: l('دیجیتاڵکردن', 'Digitalisation', 'الرقمنة'),
      text: l('ERP (وەک Odoo) دادەمەزرێنین و بەپێی کارەکەت ڕێکی دەخەین.', 'We set up an ERP such as Odoo and configure it to your work.', 'نؤسس نظام ERP مثل Odoo ونعدّه حسب عملك.'),
    },
    {
      title: l('ڕاهێنان', 'Training', 'التدريب'),
      text: l('بەڕێوەبەر و کارمەندان لەسەر سیستەمە نوێیەکە ڕادەهێنین.', 'Managers and staff are trained on the new system.', 'ندرّب المدراء والموظفين على النظام الجديد.'),
    },
    {
      title: l('پێوانە و پشتگیری', 'Measuring and support', 'القياس والدعم'),
      text: l(
        'بە KPI و ڕاپۆرتی مانگانە ئەنجامەکان دەپێوین و پشتگیری بەردەوام دەبێت.',
        'Results are tracked with KPIs and monthly reports, and support continues.',
        'نقيس النتائج بمؤشرات الأداء والتقارير الشهرية ويستمر الدعم.'
      ),
    },
  ],
  audience: [
    { icon: 'startup', label: A.startup },
    { icon: 'family', label: A.family },
    { icon: 'hospital', label: A.hospitalClinic },
    { icon: 'hotel', label: A.hotelRestaurant },
  ],
  faqs: [
    {
      q: l('بۆ کۆمپانیای بچووکیش گونجاوە؟', 'Does it suit a small company too?', 'هل يناسب الشركات الصغيرة أيضاً؟'),
      a: l('بەڵێ؛ قەبارەی سیستەمەکە بەپێی قەبارەی کۆمپانیاکەت دیاری دەکرێت.', 'Yes. The system is sized to your company.', 'نعم؛ يُحدَّد حجم النظام حسب حجم شركتك.'),
    },
    {
      q: l('سیستەمی Odoo دادەمەزرێنن؟', 'Do you set up Odoo?', 'هل تؤسسون نظام Odoo؟'),
      a: l(
        'بەڵێ؛ دایدەمەزرێنین، بەپێی کارەکەت ڕێکی دەخەین و ستافەکەت ڕادەهێنین.',
        'Yes. We install it, configure it to your work and train your staff.',
        'نعم؛ نؤسسه ونعدّه حسب عملك وندرّب طاقمك.'
      ),
    },
  ],
  related: ['it-systems', 'cleaning-staffing'],
  sectors: [],
  keywords: [
    'هەیکەلی ئیداری', 'ڕێکخستنی کۆمپانیا', 'بەڕێوەبردن', 'ژمێریاری', 'دارایی', 'مووچە', 'odoo', 'kpi', 'hr', 'sop',
    'هيكل إداري', 'هيكل اداري', 'تنظيم الشركة', 'إدارة', 'ادارة', 'محاسبة', 'موارد بشرية',
    'management', 'org chart', 'organisation', 'organization', 'accounting', 'payroll', 'procedures',
  ],
};

/* ------------------------------------------------------------------ 8. Cleaning & staffing */
const cleaningPage: Service = {
  slug: 'cleaning-staffing',
  accent: '#34C3B5',
  name: l('خزمەتگوزاری پاککردنەوە و دابینکردنی ستافی بیانی', 'Cleaning Services & Foreign Staffing', 'خدمات التنظيف وتوفير العمالة الأجنبية'),
  summary: l(
    'تیمی پاککردنەوەی ڕاهێنراو بۆ هەموو جۆرە شوێنێک، و دابینکردنی ستافی بیانی لەگەڵ ڕێکخستنی کارە ئیدارییەکانیان.',
    'Trained cleaning teams for every kind of place, and foreign staff with their paperwork handled for you.',
    'فرق تنظيف مدرّبة لجميع أنواع الأماكن، وتوفير عمالة أجنبية مع تنظيم إجراءاتها الإدارية.'
  ),
  bullets: [
    l('پاککردنەوەی ڕۆژانە و قووڵ', 'Daily and deep cleaning', 'التنظيف اليومي والعميق'),
    l('پاککردنەوەی نەخۆشخانە', 'Hospital cleaning', 'تنظيف المستشفيات'),
    l('ستافی بیانی بۆ چەند بوارێک', 'Foreign staff for several roles', 'عمالة أجنبية لعدة مجالات'),
    l('ڕێکخستنی ڤیزا و ئیقامە', 'Visa and residency arrangements', 'تنظيم التأشيرة والإقامة'),
  ],
  tagline: l('شوێنێکی پاک و ستافێکی ئامادە، بەبێ سەرئێشە.', 'A clean place and ready staff, without the headache.', 'مكان نظيف وطاقم جاهز، دون عناء.'),
  intro: l(
    'تیمێکی ڕاهێنراو بۆ پاکیی شوێنەکەت، و ستافی بیانی کە کارە ئیدارییەکانیان لەسەر ئێمەیە.',
    'A trained team to keep your place clean, and foreign staff whose paperwork we handle.',
    'فريق مدرّب لنظافة مكانك، وعمالة أجنبية نتولى إجراءاتها الإدارية.'
  ),
  groups: [
    {
      id: 'cleaning',
      title: l('پاککردنەوە', 'Cleaning', 'التنظيف'),
      items: [
        { layer: 'daily', text: l('پاککردنەوەی ڕۆژانە و هەفتانە بۆ ئۆفیس، هۆتێل، مۆڵ و بانک', 'Daily and weekly cleaning for offices, hotels, malls and banks', 'تنظيف يومي وأسبوعي للمكاتب والفنادق والمولات والبنوك') },
        {
          layer: 'hospital',
          text: l(
            'پاککردنەوەی نەخۆشخانە و کلینیک بەپێی پرۆتۆکۆلی پاککردنەوەی میکرۆب',
            'Hospital and clinic cleaning to infection-control protocols',
            'تنظيف المستشفيات والعيادات وفق بروتوكولات مكافحة العدوى'
          ),
        },
        { layer: 'deep', text: l('پاککردنەوەی قووڵ دوای بیناسازی و نوژەنکردنەوە', 'Deep cleaning after construction and renovation', 'تنظيف عميق بعد البناء والترميم') },
        { layer: 'glass', text: l('پاککردنەوەی شووشەی بینای بەرز', 'High-rise window cleaning', 'تنظيف زجاج المباني المرتفعة') },
        { layer: 'carpet', text: l('شوشتنی فەرش، قەنەفە و پەردە', 'Carpet, sofa and curtain washing', 'غسيل السجاد والكنب والستائر') },
        { layer: 'kitchen', text: l('پاککردنەوەی چێشتخانەی ڕێستورانت و هەواکێشەکان', 'Restaurant kitchen and extractor cleaning', 'تنظيف مطابخ المطاعم والشفاطات') },
      ],
    },
    {
      id: 'staffing',
      title: l('دابینکردنی ستافی بیانی', 'Foreign staffing', 'توفير العمالة الأجنبية'),
      items: [
        { layer: 'cleaners', text: l('کرێکاری پاککردنەوە و خزمەتکار', 'Cleaners and service workers', 'عمال النظافة وعمال الخدمة') },
        { layer: 'security', text: l('ئاسایش و پاسەوان', 'Security and guards', 'الأمن والحراسة') },
        { layer: 'chefs', text: l('چێشتلێنەر و ستافی ڕێستورانت', 'Cooks and restaurant staff', 'الطهاة وطاقم المطاعم') },
        { layer: 'tech', text: l('کرێکاری تەکنیکی و یارمەتیدەر', 'Technical workers and assistants', 'العمال الفنيون والمساعدون') },
        { layer: 'housekeeping', text: l('ستافی هۆتێل (هاوسکیپینگ)', 'Hotel staff (housekeeping)', 'طاقم الفنادق (التدبير الفندقي)') },
      ],
    },
    {
      id: 'admin',
      title: l('ئەوەی ئێمە بەڕێوەی دەبەین', 'What we take care of', 'ما نتولاه نحن'),
      items: [
        { layer: 'hiring', text: l('هەڵبژاردن و چاوپێکەوتنی کارمەند', 'Selecting and interviewing staff', 'اختيار الموظفين ومقابلتهم') },
        { layer: 'visa', text: l('ڕێکخستنی ڤیزا، ئیقامە و مۆڵەتی کار', 'Visas, residency and work permits', 'تنظيم التأشيرات والإقامات وتصاريح العمل') },
        { layer: 'housing', text: l('نیشتەجێبوون و گواستنەوە', 'Housing and transport', 'السكن والنقل') },
        { layer: 'payroll', text: l('مووچە و بیمە', 'Salaries and insurance', 'الرواتب والتأمين') },
        {
          layer: 'replace',
          text: l(
            'گۆڕینی کارمەند ئەگەر لە ماوەی تاقیکردنەوەدا گونجاو نەبوو',
            'Replacing a worker who is not a good fit during the trial period',
            'استبدال العامل إذا لم يكن مناسباً خلال فترة التجربة'
          ),
        },
      ],
    },
  ],
  steps: [
    {
      title: l('ناسینی پێویستی', 'Understanding your needs', 'تحديد الاحتياجات'),
      text: l('جۆری شوێن، قەبارە و ژمارەی ستافی پێویست دیاری دەکەین.', 'We look at the type of place, its size and how many staff you need.', 'نحدد نوع المكان وحجمه وعدد العمال المطلوب.'),
    },
    {
      title: l('پلانی پاککردنەوە یان پرۆفایلی ستاف', 'Cleaning plan or staff profile', 'خطة التنظيف أو مواصفات العمالة'),
      text: l('خشتەی پاککردنەوە، یان پرۆفایلی ئەو ستافەی پێویستتە، ئامادە دەکەین.', 'We prepare a cleaning schedule, or the profile of the staff you need.', 'نعدّ جدول التنظيف أو مواصفات العمالة المطلوبة.'),
    },
    {
      title: l('هەڵبژاردن و چاوپێکەوتن', 'Selection and interviews', 'الاختيار والمقابلات'),
      text: l('کارمەندەکان هەڵدەبژێرین و چاوپێکەوتنیان لەگەڵ دەکەین.', 'We select and interview the workers.', 'نختار العمال ونقابلهم.'),
    },
    {
      title: l('ڤیزا، ئیقامە و نیشتەجێبوون', 'Visa, residency and housing', 'التأشيرة والإقامة والسكن'),
      text: l('هەموو کارە ئیدارییەکان لەسەر ئێمەیە.', 'All the paperwork is on us.', 'جميع الإجراءات الإدارية علينا.'),
    },
    {
      title: l('دەستپێکردن و سەرپەرشتی', 'Start and supervision', 'البدء والإشراف'),
      text: l('تیمەکە دەست بە کار دەکات و ئێمە کوالیتی چاودێری دەکەین.', 'The team starts work and we follow the quality.', 'يبدأ الفريق العمل ونتابع الجودة.'),
    },
    {
      title: l('گۆڕین لە کاتی پێویستدا', 'Replacement if needed', 'الاستبدال عند الحاجة'),
      text: l('ئەگەر کارمەندێک لە ماوەی تاقیکردنەوەدا گونجاو نەبوو، دەیگۆڕین.', 'If a worker is not a good fit during the trial period, we replace them.', 'إذا لم يكن العامل مناسباً خلال فترة التجربة، نستبدله.'),
    },
  ],
  audience: [
    { icon: 'hotel', label: A.hotel },
    { icon: 'hospital', label: A.hospital },
    { icon: 'restaurant', label: A.restaurant },
    { icon: 'mall', label: A.mall },
    { icon: 'office', label: A.officeCompany },
  ],
  faqs: [
    {
      q: l('پاککردنەوەی بەردەوام بە گرێبەست دەکەن؟', 'Do you offer ongoing cleaning on contract?', 'هل تقدمون تنظيفاً مستمراً بعقد؟'),
      a: l(
        'بەڵێ؛ پاککردنەوەی ڕۆژانە یان هەفتانە بەپێی پێویستیی شوێنەکەت ڕێک دەخەین.',
        'Yes. We arrange daily or weekly cleaning to suit your place.',
        'نعم؛ ننظم تنظيفاً يومياً أو أسبوعياً حسب حاجة مكانك.'
      ),
    },
    {
      q: l('کارە ئیدارییەکانی ستافی بیانی کێ دەیکات؟', 'Who handles the paperwork for foreign staff?', 'من يتولى الإجراءات الإدارية للعمالة الأجنبية؟'),
      a: l('ئێمە؛ لە هەڵبژاردنەوە تا ڤیزا، ئیقامە و نیشتەجێبوون.', 'We do, from selection to visas, residency and housing.', 'نحن؛ من الاختيار حتى التأشيرة والإقامة والسكن.'),
    },
  ],
  related: ['management-setup', 'construction'],
  sectors: [],
  keywords: [
    'پاککردنەوە', 'خاوێنکردنەوە', 'کرێکار', 'خزمەتکار', 'ستافی بیانی', 'ئاسایش', 'پاسەوان', 'ڤیزا', 'ئیقامە',
    'تنظيف', 'عمالة أجنبية', 'عمالة اجنبية', 'عمال', 'خادمة', 'حراسة', 'إقامة', 'اقامة',
    'cleaning', 'staffing', 'manpower', 'cleaners', 'housekeeping', 'security guards', 'workers', 'visa',
  ],
};

export const services: Service[] = [
  hvacPage,
  constructionPage,
  electricalPage,
  orPage,
  medicalPage,
  itPage,
  managementPage,
  cleaningPage,
];

export const serviceSlugs = services.map((s) => s.slug);
export const getService = (slug: string): Service | undefined => services.find((s) => s.slug === slug);
export const isServiceSlug = (v: unknown): v is ServiceSlug => typeof v === 'string' && serviceSlugs.includes(v as ServiceSlug);

/** Number of every sub-service on a page (shown in the page's title block). */
export const itemCount = (s: Service) => s.groups.reduce((n, g) => n + g.items.length, 0);

/** Drawing layers in the order they first appear on the page. */
export const layerOrder = (s: Service) => Array.from(new Set(s.groups.flatMap((g) => g.items.map((i) => i.layer))));

/* ------------------------------------------------------------------ shared page labels */
export const servicePageText = {
  home: l('سەرەتا', 'Home', 'الرئيسية'),
  services: l('خزمەتگوزاریەکان', 'Services', 'الخدمات'),
  field: l('بوار', 'Field', 'المجال'),
  quote: l('داوای نرخ بۆ ئەم بوارە', 'Request a quote for this field', 'اطلب عرض سعر لهذا المجال'),
  learnMore: l('زیاتر بزانە', 'Learn more', 'اعرف المزيد'),
  whatWeDo: l('خزمەتگوزارییەکانی ئەم بوارە', 'What this field covers', 'ما يشمله هذا المجال'),
  whatWeDoHint: l(
    'بە سکڕۆڵکردن، هێڵکارییەکە بەش بە بەش دروست دەبێت.',
    'Scroll and the drawing builds up, one part at a time.',
    'مرّر لترى المخطط يكتمل جزءاً بعد جزء.'
  ),
  drawingLabel: l('هێڵکاریی ئەندازیاری بۆ', 'Engineering drawing for', 'مخطط هندسي لـ'),
  showing: l('ئێستا دیارکراو:', 'Highlighted:', 'المحدد الآن:'),
  process: l('ڕێگای کارکردن', 'How we work', 'كيف نعمل'),
  processIntro: l(
    'هەر پرۆژەیەک بەم هەنگاوانەدا دەڕوات، تا بزانیت لە هەر قۆناغێکدا چی ڕوودەدات.',
    'Every project follows these steps, so you know what happens at each stage.',
    'يمر كل مشروع بهذه الخطوات، لتعرف ما يحدث في كل مرحلة.'
  ),
  step: l('هەنگاوی', 'Step', 'الخطوة'),
  audience: l('کێ سوودی لێ وەردەگرێت', 'Who it is for', 'لمن هذه الخدمة'),
  clients: l('کڕیارەکانمان لەم بوارەدا', 'Our clients in this field', 'عملاؤنا في هذا المجال'),
  clientsIntro: l(
    'ئەو شوێنانەی کارمان لەم بوارەدا بۆیان کردووە.',
    'Places where we have delivered work in this field.',
    'أماكن أنجزنا فيها أعمالاً في هذا المجال.'
  ),
  allProjects: l('هەموو پرۆژەکان', 'All projects', 'جميع المشاريع'),
  faq: l('پرسیارە باوەکان', 'Frequently asked questions', 'الأسئلة الشائعة'),
  related: l('بوارە پەیوەندیدارەکان', 'Related fields', 'مجالات ذات صلة'),
  ctaTitle: l('پرۆژەکەت باس بکە', 'Tell us about your project', 'حدّثنا عن مشروعك'),
  ctaText: l(
    'فۆرمەکە پڕ بکەرەوە، خزمەتگوزارییەکە پێشوەختە هەڵبژێردراوە. تیمەکەمان بۆ سەردانی شوێن و نرخ پەیوەندیت پێوە دەکات.',
    'Fill in the form; this field is already selected. Our team will contact you about a site visit and a price.',
    'املأ النموذج، وهذه الخدمة محددة مسبقاً. سيتواصل فريقنا معك لزيارة الموقع وتحديد السعر.'
  ),
  ctaButton: l('پرۆژەکەت باس بکە', 'Tell us about your project', 'حدّثنا عن مشروعك'),
  titleBlock: {
    field: l('بوار', 'Field', 'المجال'),
    items: l('خزمەتگوزاری', 'Services', 'خدمة'),
    clients: l('کڕیار', 'Clients', 'عميل'),
    area: l('ناوچە', 'Area', 'المنطقة'),
    areaValue: l('هەرێمی کوردستان', 'Kurdistan Region', 'إقليم كردستان'),
  },
  orBlock: {
    title: l('پەیوەندی بە هۆڵی نەشتەرگەرییەوە', 'Air for operating rooms', 'الارتباط بغرف العمليات'),
    text: l(
      'لە هۆڵی نەشتەرگەری و کلینروومدا، سیستەمی هەوا بنەمای پاکییە. ئێمە ئەمانە دابین دەکەین:',
      'In operating rooms and cleanrooms, the air system is the basis of cleanliness. We provide:',
      'في غرف العمليات والغرف النظيفة، نظام الهواء هو أساس النظافة. نوفّر:'
    ),
    items: [
      l(
        'فشاری پۆزەتیڤ بۆ هۆڵی نەشتەرگەری، فشاری نێگەتیڤ بۆ ژووری جیاکردنەوەی نەخۆشیی گوازراوە',
        'Positive pressure for operating rooms, negative pressure for infectious isolation rooms',
        'ضغط إيجابي لغرف العمليات وضغط سلبي لغرف عزل الأمراض المعدية'
      ),
      l('ژمارەی گۆڕینی هەوا لە کاتژمێرێکدا (ACH) بەپێی ستاندارد', 'Air changes per hour (ACH) to standard', 'عدد مرات تغيير الهواء في الساعة (ACH) وفق المعايير'),
      l('سەقفی هەوای یەکڕێڕەو (Laminar Airflow) لەسەر مێزی نەشتەرگەری', 'A laminar airflow ceiling over the operating table', 'سقف تدفق هواء صفائحي (Laminar Airflow) فوق طاولة العمليات'),
      l('کۆنترۆڵی پلەی گەرما و شێ بەپێی پێویستیی پزیشکی', 'Temperature and humidity control to medical requirements', 'التحكم في الحرارة والرطوبة وفق المتطلبات الطبية'),
    ],
  },
  proposal: {
    title: l('پێشنیاری HVAC ی KST', 'The KST HVAC proposal', 'عرض التكييف من KST'),
  },
  solar: {
    title: l('کام سیستەمی سۆلار؟', 'Which solar system?', 'أي نظام شمسي؟'),
    intro: l(
      'سێ جۆری سیستەم هەیە. دوای بینینی شوێنەکەت و بڕی بەکارهێنانی کارەبات، گونجاوترینیان پێشنیار دەکەین.',
      'There are three types. After seeing your site and how much power you use, we recommend the one that fits.',
      'هناك ثلاثة أنواع. بعد معاينة موقعك ومعرفة استهلاكك للكهرباء، نوصي بالأنسب.'
    ),
    rows: {
      grid: l('بەستراو بە تۆڕی کارەبا', 'Connected to the grid', 'متصل بالشبكة'),
      battery: l('باتری', 'Batteries', 'بطاريات'),
      outage: l('لە کاتی بڕانی کارەبادا', 'During a power cut', 'أثناء انقطاع الكهرباء'),
      best: l('گونجاو بۆ', 'Best for', 'الأنسب لـ'),
    },
    yes: l('بەڵێ', 'Yes', 'نعم'),
    no: l('نەخێر', 'No', 'لا'),
    types: [
      {
        id: 'On-grid',
        grid: true,
        battery: false,
        outage: l('دەوەستێت', 'Switches off', 'يتوقف'),
        best: l('کەمکردنەوەی پسوولەی کارەبا', 'Lowering the electricity bill', 'خفض فاتورة الكهرباء'),
      },
      {
        id: 'Off-grid',
        grid: false,
        battery: true,
        outage: l('بەردەوام دەبێت', 'Keeps running', 'يستمر بالعمل'),
        best: l('شوێنی دوور یان بێ کارەبا', 'Remote sites or places with no power', 'الأماكن البعيدة أو التي بلا كهرباء'),
      },
      {
        id: 'Hybrid',
        grid: true,
        battery: true,
        outage: l('بەردەوام دەبێت', 'Keeps running', 'يستمر بالعمل'),
        best: l('ئەو شوێنانەی کارەبایان دەبڕێت', 'Places where the power keeps cutting out', 'الأماكن التي تنقطع فيها الكهرباء'),
      },
    ],
  },
};
