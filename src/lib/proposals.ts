import type { L10n } from '@/lib/i18n';

/*
  KST proposals (HVAC, and Healthcare technical partnership).
  Short versions of the former Zone Service Company documents, rebranded as KST.
  Full original information is kept in docs/PROPOSAL_SOURCE.md.
  Edit wording here. Each text has Kurdish (ku), English (en) and Arabic (ar).
*/

const l = (ku: string, en: string, ar: string): L10n => ({ ku, en, ar });

export type ProposalId = 'hvac' | 'healthcare';

export const proposalsSection = {
  title: l('پێشنیارە تەکنیکییەکانمان', 'Two proposals, ready to adapt to your site', 'عرضان فنيان جاهزان لتكييفهما مع موقعك'),
  intro: l(
    'هەر پێشنیارێک کورتکراوەتەوە تا بزانیت چی وەردەگریت. نرخ و کاتی جێبەجێکردن دوای بینینی شوێنەکە دیاری دەکرێت.',
    'Each proposal is a short outline of what you get. Price and schedule are set after we visit your site.',
    'كل عرض هو ملخص لما ستحصل عليه. يُحدد السعر والجدول الزمني بعد زيارة موقعك.'
  ),
  tabs: {
    hvac: l('ساردکەرەوە و HVAC', 'HVAC', 'التكييف HVAC'),
    healthcare: l('نەخۆشخانە و ناوەندە پزیشکییەکان', 'Healthcare facilities', 'المنشآت الصحية'),
  } as Record<ProposalId, L10n>,
  request: l('داوای ئەم پێشنیارە بکە', 'Request this proposal', 'اطلب هذا العرض'),
  more: l('زیاتر دەربارەی:', 'More about', 'المزيد عن'),
  requestMessage: {
    hvac: l(
      'داوای پێشنیاری ساردکەرەوە و HVAC دەکەم بۆ ئەم پرۆژەیە:',
      'I would like the HVAC proposal for this project:',
      'أرغب في الحصول على عرض التكييف لهذا المشروع:'
    ),
    healthcare: l(
      'داوای پێشنیاری تەکنیکی بۆ ناوەندی تەندروستی دەکەم:',
      'I would like the healthcare technical proposal for this facility:',
      'أرغب في الحصول على العرض الفني لهذه المنشأة الصحية:'
    ),
  } as Record<ProposalId, L10n>,
  scope: l('چی دەگرێتەوە', 'What is included', 'ما يشمله العرض'),
  why: l('بۆچی KST', 'Why KST', 'لماذا KST'),
  process: l('ڕێگای کارکردن', 'How a project runs', 'كيف يسير المشروع'),
  quality: l('دڵنیابوون لە کوالیتی و سەلامەتی', 'Quality and safety', 'الجودة والسلامة'),
  divisions: l('بەشەکانی خزمەتگوزاری', 'Service areas', 'مجالات الخدمة'),
  warranty: l('گەرەنتی درێژکراوە +٤ ساڵ', 'Extended guarantee: +4 years', 'ضمان ممتد: +4 سنوات'),
  warrantyIntro: l(
    'چوار ساڵ دەخەینە سەر گەرەنتی کارگە. ئەمە کۆی ماوەی پارێزراوییە.',
    'We add four years of service cover on top of the manufacturer warranty. This is your total protected period.',
    'نضيف أربع سنوات من التغطية الخدمية فوق ضمان المصنع. هذه هي مدة الحماية الإجمالية.'
  ),
  factory: l('گەرەنتی کارگە', 'Factory warranty', 'ضمان المصنع'),
  extension: l('درێژکردنەوەی KST', 'KST extension', 'تمديد KST'),
  total: l('کۆی پارێزراوی', 'Total cover', 'إجمالي التغطية'),
  years: l('ساڵ', 'years', 'سنوات'),
  year: l('ساڵ', 'year', 'سنة'),
  plans: l('چوار شێوازی هاوکاری', 'Four ways to work with us', 'أربعة أنماط للتعاون'),
  recommended: l('پێشنیارکراو', 'Recommended', 'موصى به'),
  numbers: l('بۆچی متمانەمان پێ بکەیت', 'What this means for you', 'ما يعنيه ذلك لك'),
  note: l(
    'نرخی کۆتایی و ماوەی وەڵامدانەوە دوای گەشتی شوێنەکە دیاری دەکرێن.',
    'Final prices and response times are confirmed after a site walkthrough.',
    'تُحدد الأسعار النهائية وأوقات الاستجابة بعد جولة ميدانية في الموقع.'
  ),
};

/* ---------------------------------------------------------------- HVAC */
export const hvac = {
  pitch: l(
    'تەنیا ئامێری سارد دانانێین، سەرمایەکەت دەپارێزین.',
    "We do not only install air conditioning. We protect your investment.",
    'لا نكتفي بتركيب أنظمة التكييف، بل نحمي استثمارك.'
  ),
  summary: l(
    'بەشی HVAC ی KST خزمەت بە پرۆژەی نیشتەجێبوون، بازرگانی، پیشەسازی و دامەزراوەیی دەکات لە سەرتاسەری هەرێمی کوردستان. یارمەتیی خاوەن پرۆژە دەدەین بۆ ئەوەی پێش بیناسازی و لە درێژایی پرۆژەکەدا بڕیاری دروست بدات.',
    'The KST HVAC team serves residential, commercial, industrial and institutional projects across Kurdistan Region. We help owners make the right HVAC decisions before construction and through the whole project.',
    'يخدم قسم التكييف في KST المشاريع السكنية والتجارية والصناعية والمؤسسية في إقليم كردستان. نساعد المالكين على اتخاذ القرارات الصحيحة قبل البناء وطوال مدة المشروع.'
  ),
  scope: [
    {
      title: l('ڕاوێژکاری HVAC', 'HVAC consultancy', 'استشارات التكييف'),
      items: [
        l('هەڵبژاردنی ئامێر', 'Equipment selection', 'اختيار المعدات'),
        l('پلاندانانی بودجە', 'Budget planning', 'تخطيط الميزانية'),
        l('بەراوردکردنی براندەکان', 'Brand comparison', 'مقارنة العلامات التجارية'),
        l('هەڵسەنگاندنی بارستایی کار', 'Load assessment', 'تقدير الأحمال'),
        l('ڕاسپاردە بۆ کەمکردنەوەی بەکارهێنانی وزە', 'Energy-efficiency advice', 'توصيات كفاءة الطاقة'),
        l('ڕاوێژی تەکنیکی', 'Technical consultation', 'استشارة فنية'),
      ],
    },
    {
      title: l('دابینکردنی ئامێر', 'Equipment supply', 'توريد المعدات'),
      items: [
        l('پێداویستییەکانی پرۆژە', 'Project requirements', 'متطلبات المشروع'),
        l('بودجە', 'Budget', 'الميزانية'),
        l('متمانەپێکراوی ئامێر', 'Reliability', 'الموثوقية'),
        l('بەردەستبوونی پارچەی یەدەگ', 'Spare parts availability', 'توفر قطع الغيار'),
        l('تۆڕی پشتگیری ناوخۆیی', 'Local support network', 'شبكة دعم محلية'),
      ],
    },
    {
      title: l('دامەزراندن', 'Installation', 'التركيب'),
      items: [
        l('سیستەمی VRF / VRV', 'VRF / VRV systems', 'أنظمة VRF / VRV'),
        l('سیستەمی دەکت', 'Ducted systems', 'الأنظمة المجرّاة'),
        l('سپلیت و پاکێج یونت', 'Split and package units', 'وحدات سبليت وباكج'),
        l('ڤێنتیلەیشن و ئایر فرێش', 'Ventilation and fresh air', 'التهوية والهواء النقي'),
        l('سیستەمی هەواکێشان', 'Exhaust systems', 'أنظمة الشفط'),
        l('بۆڕی گاز و ئاوەڕۆ', 'Refrigerant piping and drainage', 'أنابيب الغاز والصرف'),
      ],
    },
    {
      title: l('تاقیکردنەوە و دەستپێکردن', 'Testing and commissioning', 'الاختبار والتشغيل'),
      items: [
        l('تاقیکردنەوەی کارایی', 'Performance testing', 'اختبار الأداء'),
        l('تاقیکردنەوەی گوشار', 'Pressure testing', 'اختبار الضغط'),
        l('هاوسەنگکردنی هەوا', 'Air balancing', 'موازنة الهواء'),
        l('پشتڕاستکردنەوەی سیستەم', 'System verification', 'التحقق من النظام'),
        l('ڕادەستکردن بە کڕیار', 'Client handover', 'التسليم للعميل'),
      ],
    },
  ] as { title: L10n; items: L10n[] }[],
  why: [
    {
      title: l('ڕاسپاردە لەسەر ئەزموونی کاری', 'Advice from field experience', 'توصيات من الخبرة الميدانية'),
      text: l('بەپێی ئەزموونی ڕاستەقینە ڕێنمایی دەکەین، نەک ڕیکلامی کۆمپانیا.', 'We recommend what works on site, not what the brochure claims.', 'نوصي بما ينجح في الموقع، لا بما تدّعيه الكتيبات.'),
    },
    {
      title: l('هەڵبژاردنی سەربەخۆی ئامێر', 'Independent equipment choice', 'اختيار مستقل للمعدات'),
      text: l('ئەوەی بۆ تۆ باشترە پێشنیار دەکەین، نەک براندێکی دیاریکراو.', 'We pick what is best for you, not one manufacturer.', 'نختار الأفضل لك، لا علامة تجارية بعينها.'),
    },
    {
      title: l('بەرپرسیارێتی درێژخایەن', 'Long-term accountability', 'مسؤولية طويلة الأمد'),
      text: l('لەپشت ڕاسپاردە و کاری دامەزراندنەکانمانەوە وەستاوین.', 'We stand behind our recommendations and our installation work.', 'نقف خلف توصياتنا وأعمال التركيب.'),
    },
    {
      title: l('پشتگیری درێژکراو', 'Extended support', 'دعم ممتد'),
      text: l('تا چوار ساڵ دوای تەواوبوونی گەرەنتی سەرەکی، پشتگیری تەکنیکی بەردەوام دەبێت.', 'Technical support continues for up to four years after the original warranty ends.', 'يستمر الدعم الفني حتى أربع سنوات بعد انتهاء الضمان الأصلي.'),
    },
    {
      title: l('کەمکردنەوەی مەترسی', 'Less risk', 'مخاطر أقل'),
      text: l('دەتپارێزین لە ئامێری زۆر گەورە، بەکارهێنانی زۆری کارەبا، خراپبوونی بەردەوام و تێچووی زۆری چاککردنەوە.', 'You avoid oversized systems, high power bills, repeated breakdowns and heavy maintenance costs.', 'تتجنب الأنظمة المبالغ في حجمها وفواتير الكهرباء المرتفعة والأعطال المتكررة وتكاليف الصيانة الثقيلة.'),
    },
  ] as { title: L10n; text: L10n }[],
  steps: [
    l('ڕاوێژ لەگەڵ کڕیار', 'Client consultation', 'استشارة العميل'),
    l('هەڵسەنگاندنی تەکنیکی', 'Technical evaluation', 'التقييم الفني'),
    l('پێشنیاری ئامێر', 'Equipment recommendation', 'توصية المعدات'),
    l('کڕین و دابینکردن', 'Procurement', 'الشراء'),
    l('دامەزراندن', 'Installation', 'التركيب'),
    l('تاقیکردنەوە و دەستپێکردن', 'Testing and commissioning', 'الاختبار والتشغيل'),
    l('ڕادەستکردن', 'Handover', 'التسليم'),
    l('پشتگیری بەردەوام', 'Ongoing support', 'الدعم المستمر'),
  ] as L10n[],
  quality: [
    l('پشکنینی کەرەستە', 'Material inspection', 'فحص المواد'),
    l('سەرپەرشتی دامەزراندن', 'Installation supervision', 'الإشراف على التركيب'),
    l('پشتڕاستکردنەوەی کارایی', 'Performance verification', 'التحقق من الأداء'),
    l('تاقیکردنەوە و دەستپێکردن', 'Testing and commissioning', 'الاختبار والتشغيل'),
    l('پەسەندکردنی کۆتایی کوالیتی', 'Final quality approval', 'الاعتماد النهائي للجودة'),
  ] as L10n[],
  safety: l(
    'پێوەرەکانی سەلامەتی کار و پابەندبوون بە مەرجەکانی پرۆژە.',
    'Safe working practices and compliance with project requirements.',
    'ممارسات عمل آمنة والالتزام بمتطلبات المشروع.'
  ),
  commitment: l(
    'ئەگەر لە ئامێرێک کە ئێمە پێشنیارمان کردووە و دابینمان کردووە کێشەی کارایی دروست بوو، تیمەکەمان بە ناوی تۆوە پشکنین، ڕێکارەکانی گەرەنتی، پێداچوونەوەی تەکنیکی و چاککردنەوە ڕێکدەخات.',
    'If a problem comes up with equipment we recommended and supplied, our team coordinates the inspections, warranty process, technical review and fix on your behalf.',
    'إذا ظهرت مشكلة في معدات أوصينا بها وقمنا بتوريدها، ينسّق فريقنا الفحوصات وإجراءات الضمان والمراجعة الفنية والإصلاح نيابةً عنك.'
  ),
};

/* ---------------------------------------------------------- Healthcare */
export const healthcare = {
  pitch: l(
    'هیچ هەڵەیەک قبوڵ ناکرێت: هەوای پاک و وەڵامدانەوەی خێرا لە کاتی نائاسایی.',
    'No tolerance for failure: clean air and fast response in an emergency.',
    'لا مجال للخطأ: هواء نقي واستجابة سريعة في حالات الطوارئ.'
  ),
  summary: l(
    'لە نەخۆشخانە و ناوەندی پزیشکی، وەستانی ئامێر ڕاستەوخۆ کاریگەری لەسەر نەخۆش هەیە. ئێمە هاوبەشی تەکنیکی بەردەوام دەبین: ساردکەرەوە، کارەبا، ئامێری پزیشکی و کڕینی ئامێر لەژێر بەرپرسیارێتی یەک تیمدا.',
    'In a hospital or clinic, a stopped machine affects patients directly. We work as a continuing technical partner: HVAC, electrical, medical device repair and equipment purchasing under one accountable team.',
    'في المستشفى أو العيادة، يؤثر توقف الجهاز مباشرة على المرضى. نعمل كشريك فني مستمر: التكييف والكهرباء وإصلاح الأجهزة الطبية وشراء المعدات تحت مسؤولية فريق واحد.'
  ),
  approach: l(
    'پێش ئەوەی کێشە ببێتە زیان، دەیدۆزینەوە: تۆمارکردنی کارکردنی ئامێر و تاقیکردنەوەی تەکنیکی بۆ دیاریکردنی داڕزان، تکان و گۆڕانی هاوسەنگی هەوا.',
    'We find faults before they turn into damage, using performance records and technical tests to spot wear, small leaks and air-balance shifts early.',
    'نكتشف الأعطال قبل أن تتحول إلى ضرر، عبر سجلات الأداء والاختبارات الفنية لرصد التآكل والتسربات الصغيرة واختلال توازن الهواء مبكراً.'
  ),
  divisions: [
    {
      title: l('ساردکەرەوەی پزیشکی و هەوای پاک', 'Medical HVAC and clean air', 'تكييف طبي وهواء نقي'),
      text: l(
        'چیلەر، VRF و AHU لەگەڵ هاوسەنگی گوشار، پشکنینی فلتەری HEPA و سیستەمی پاککردنەوەی هەوا بۆ هۆڵی نەشتەرگەری، ICU و بەشەکان.',
        'Chillers, VRF and AHUs with pressure balancing, HEPA filter checks and air-cleaning loops for operating theatres, ICUs and wards.',
        'مبردات ونظام VRF ووحدات معالجة الهواء مع موازنة الضغط وفحص فلاتر HEPA وأنظمة تنقية الهواء لغرف العمليات والعناية المركزة والأجنحة.'
      ),
    },
    {
      title: l('کارەبای پێویست و وزەی ژیان', 'Critical electrical and life-safety power', 'كهرباء حرجة وطاقة السلامة'),
      text: l(
        'پشکنینی بەردەوامی تابلۆی سەرەکی و لاوەکی، وێنەی گەرمی، پاراستن لە تێپەڕینی کارەبا و پشکنینی گۆڕینی خۆکاری بۆ جەنەرەیتەر.',
        'Regular checks of main and sub panels with thermal imaging, surge protection and automatic generator changeover tests.',
        'فحص دوري للوحات الرئيسية والفرعية بالتصوير الحراري، وحماية من الصدمات الكهربائية، واختبارات التحويل الآلي للمولد.'
      ),
    },
    {
      title: l('چاککردنەوەی بۆردی ئامێری پزیشکی', 'Medical device board repair', 'إصلاح لوحات الأجهزة الطبية'),
      text: l(
        'چاککردنەوەی پارچە و بۆرد بە جیاتی گۆڕینی تەواوی مۆدیوڵ. تێچوو تا ٧٠٪ کەمتر دەبێت بەراورد بە نرخی گۆڕینی مۆدیوڵی کارگە.',
        'We repair boards and components instead of swapping whole modules, at up to 70% less than the manufacturer module price.',
        'نصلح اللوحات والمكونات بدلاً من استبدال الوحدة كاملة، بتكلفة أقل حتى 70% من سعر وحدة المصنع.'
      ),
    },
    {
      title: l('کڕینی ئامێر بە شێوازێکی بێلایەن', 'Independent equipment purchasing', 'شراء معدات بشكل مستقل'),
      text: l(
        'هەڵسەنگاندنی گونجاوی توانا، هەڵبژاردنی ئامێر لەسەر بنەمای بەرگەگرتن، و دابینکردن لە تۆڕی کارگە بۆ نرخی باشتر.',
        'We size equipment to your building, choose by proven durability and source through factory supply networks for better prices.',
        'نحدد حجم المعدات بما يناسب مبناك، ونختار حسب المتانة المثبتة، ونورّد عبر شبكات المصانع لأسعار أفضل.'
      ),
    },
    {
      title: l('گەرەنتی درێژکراو +٤ ساڵ', 'Extended guarantee, +4 years', 'ضمان ممتد +4 سنوات'),
      text: l(
        'چوار ساڵ دەخەینە سەر گەرەنتی کارگە، بۆ پشکنین، هاتنی خێرا بۆ شوێن و چاککردنەوە.',
        'Four extra years on top of the factory warranty, covering diagnostics, emergency site visits and repair.',
        'أربع سنوات إضافية فوق ضمان المصنع، تشمل التشخيص والزيارات الطارئة والإصلاح.'
      ),
    },
    {
      title: l('پاڵپشتی لە بەرامبەر دابینکەر', 'Supplier advocacy', 'الدفاع عن حقوقك أمام المورد'),
      text: l(
        'پێش واژووکردن گرێبەستی دابینکەر دەخوێنینەوە، و ئەگەر داواکارییەکی گەرەنتی ڕەت بکرێتەوە، ئێمە لەگەڵ دابینکەر ڕێکدەکەوین.',
        'We read supplier contracts before you sign, and if a valid warranty claim is refused, we handle it with the supplier.',
        'نراجع عقود الموردين قبل التوقيع، وإذا رُفضت مطالبة ضمان صحيحة، نتولى معالجتها مع المورد.'
      ),
    },
  ] as { title: L10n; text: L10n }[],
  warrantyRows: [1, 2, 3, 5, 7],
  warrantyExtra: 4,
  plans: [
    {
      id: 'A',
      title: l('پاراستنی پێشوەختە', 'Predictive Preservation', 'الصيانة الاستباقية'),
      sub: l('چاودێری خشتەکراو بۆ ئەو ئامێرانەی ئێستا هەن', 'Scheduled maintenance for existing equipment', 'صيانة مجدولة للمعدات القائمة'),
      items: [
        l('پشکنینی مانگانە بۆ ساردکەرەوە، فلتەر و کارەبای سەرەکی', 'Monthly checks of HVAC, filtration pressure and core power', 'فحص شهري للتكييف وضغط الفلاتر والكهرباء الأساسية'),
        l('ڕاپۆرتی دیجیتاڵی دوای هەر سەردانێک', 'A digital report after every visit', 'تقرير رقمي بعد كل زيارة'),
        l('کرێی کاری ئاسایی داپۆشراوە، پارچە بە نرخی ڕاستەقینە بێ قازانج', 'Regular labour covered, parts at exact cost with 0% markup', 'أجور العمل العادية مشمولة، والقطع بسعر التكلفة دون أي هامش ربح'),
      ],
    },
    {
      id: 'B',
      title: l('هاوبەشی ئەولەویەتدار', 'Priority Partnership', 'شراكة الأولوية'),
      sub: l('هەموو شتەکانی A لەگەڵ وەڵامدانەوەی خێراتر', 'Everything in A with faster response', 'كل ما في A مع استجابة أسرع'),
      recommended: true,
      items: [
        l('وەڵامدانەوەی دەستبەجێ بۆ کێشە هەستیارەکان لە ماوەی ٣ کاتژمێر، بە گرێبەست', 'Urgent faults answered within 3 hours, written into the contract', 'الاستجابة للأعطال الحرجة خلال 3 ساعات، بموجب العقد'),
        l('کارە قورسەکان تەنیا لە شەودا، بۆ ئەوەی نەخۆش و بەشەکان تێک نەچن', 'Heavy work only at night so patients and wards are not disturbed', 'الأعمال الثقيلة ليلاً فقط حتى لا يتأثر المرضى والأقسام'),
        l('شیکاری گەرمی، پشکنینی ئەلترا سۆنیک و پێشبینی چارەکانە بۆ بارودۆخی ئامێرەکان', 'Thermal analysis, ultrasonic checks and quarterly equipment trend reports', 'تحليل حراري وفحص بالموجات فوق الصوتية وتقارير ربع سنوية لحالة المعدات'),
      ],
    },
    {
      id: 'C',
      title: l('بەڕێوەبردنی تەواوی تەکنیکی', 'Full technical outsourcing', 'إدارة فنية كاملة'),
      sub: l('KST بەشی تەکنیکیی ناوەندەکەت وەردەگرێت', 'KST runs your technical department', 'تتولى KST القسم الفني في منشأتك'),
      items: [
        l('بەرپرسیارێتی تەواو بۆ ساردکەرەوە، کارەبای قورس و ئامێری تایبەت', 'Full ownership of HVAC, heavy electrical and specialist equipment', 'مسؤولية كاملة عن التكييف والكهرباء الثقيلة والمعدات المتخصصة'),
        l('نرخی مانگانە یان ساڵانەی جێگیر، بێ فاتورەی نائاسایی', 'A fixed monthly or yearly fee with no surprise emergency invoices', 'رسوم شهرية أو سنوية ثابتة دون فواتير طارئة مفاجئة'),
        l('پێویستت بە دامەزراندنی تەکنیکار و ڕاهێنانیان نامێنێت', 'No need to hire or train your own technicians', 'لا حاجة لتعيين فنيين أو تدريبهم'),
      ],
    },
    {
      id: 'D',
      title: l('کڕین، دامەزراندن و پاراستن', 'Buy, install and protect', 'الشراء والتركيب والحماية'),
      sub: l('لە ڕاوێژەوە تا گەرەنتی درێژکراو', 'From consulting to the extended guarantee', 'من الاستشارة إلى الضمان الممتد'),
      items: [
        l('پێداچوونەوەی ئەندازیاری و هەڵسەنگاندنی سەربەخۆی براندەکان', 'Engineering review and independent brand comparison', 'مراجعة هندسية ومقارنة مستقلة للعلامات التجارية'),
        l('دابینکردن لە تۆڕی کارگە بۆ کەمکردنەوەی تێچووی کڕین', 'Supply through factory networks to lower purchase cost', 'التوريد عبر شبكات المصانع لخفض تكلفة الشراء'),
        l('دامەزراندن بە تیمی خۆمان، چالاککردنی گەرەنتی +٤ ساڵ و پێداچوونەوەی گرێبەست', 'Installation by our own crews, +4 year guarantee activation and contract review', 'تركيب بفرقنا، وتفعيل ضمان +4 سنوات ومراجعة العقود'),
      ],
    },
  ] as { id: string; title: L10n; sub: L10n; items: L10n[]; recommended?: boolean }[],
  numbers: [
    {
      value: '9+',
      title: l('ساڵ داتای کاری', 'Years of field data', 'سنوات من البيانات الميدانية'),
      text: l('دەزانین کام بەستەر و ڕێلە و سیلەکان دوای ساڵانی بەکارهێنان تێک دەچن، و چێکلیستەکانمان لەسەر ئەوە دروست کراون.', 'We know which connections, relays and seals fail after years of heavy use, and build our checklists around them.', 'نعرف أي الوصلات والمرحّلات والأختام تتعطل بعد سنوات من الاستخدام الكثيف، ونبني قوائم الفحص حولها.'),
    },
    {
      value: '+4',
      title: l('ساڵ خزمەتگوزاری زیادە', 'Extra service years', 'سنوات خدمة إضافية'),
      text: l('لەسەر گەرەنتی کارگە زیاد دەکرێت.', 'Added on top of the manufacturer warranty.', 'تُضاف فوق ضمان المصنع.'),
    },
    {
      value: '2x',
      title: l('کەمکردنەوەی تێچوو دوو جار', 'Savings twice', 'توفير مضاعف'),
      text: l('جارێک لە کڕینی ئامێر، جارێک لە تێچووی خراپبوون.', 'Once on equipment purchase, again on breakdown costs.', 'مرة عند شراء المعدات ومرة في تكاليف الأعطال.'),
    },
    {
      value: '0',
      title: l('پیمانکاری لاوەکی', 'Subcontractors', 'مقاولو الباطن'),
      text: l('هەمان تیمی ڕاهێنراو هەمیشە کار لەسەر ئامێرەکانت دەکات.', 'The same trained team works on your equipment every time.', 'الفريق المدرَّب نفسه يعمل على معداتك في كل مرة.'),
    },
  ] as { value: string; title: L10n; text: L10n }[],
};
