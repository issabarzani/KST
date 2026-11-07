import type { L10n } from '@/lib/i18n';
import { hvac } from '@/lib/proposals';

const l = (ku: string, en: string, ar: string): L10n => ({ ku, en, ar });

export const processSection = {
  title: l('چۆن پرۆژەیەک تەواو دەکەین', 'How we deliver a project', 'كيف ننفذ المشروع'),
  intro: l(
    'هەشت هەنگاو، یەک تیم. بە سکڕۆڵکردن ببینە پرۆژەکە چۆن لەسەر نەخشە دروست دەبێت.',
    'Eight steps, one team. Scroll to watch the project take shape on the drawing.',
    'ثماني خطوات وفريق واحد. مرّر الصفحة لترى المشروع يتشكّل على المخطط.'
  ),
  drawing: l('نەخشەی نهۆمێک کە هەنگاو بە هەنگاو دروست دەبێت. هەنگاوی ئێستا:', 'Floor plan that builds up step by step. Current step:', 'مخطط طابق يُبنى خطوة بخطوة. الخطوة الحالية:'),
  step: l('هەنگاو', 'Step', 'الخطوة'),
};

/** The 8 steps from the KST HVAC proposal, each with what happens in it */
export const processSteps: { title: L10n; text: L10n }[] = [
  l(
    'سەردانت دەکەین، گوێ لە پێداویستییەکانی بیناکەت دەگرین و ئامانج و بودجە دیاری دەکەین.',
    'We visit you, listen to what the building needs, and agree the goals and the budget.',
    'نزورك ونستمع لاحتياجات المبنى ونتفق على الأهداف والميزانية.'
  ),
  l(
    'پشکنینی شوێن، پێوانەکردن و هەژمارکردنی بارستایی، بۆ ئەوەی سیستەمەکە بە قەبارەی دروست بێت.',
    'Site survey, measurements and load calculations, so every system is sized correctly.',
    'معاينة الموقع والقياسات وحساب الأحمال ليكون كل نظام بالحجم الصحيح.'
  ),
  l(
    'ئامێر بە سەربەخۆیی هەڵدەبژێرین و لەسەر متمانە، بەکارهێنانی وزە و پارچەی یەدەگ بەراوردی دەکەین.',
    'Independent equipment choice, compared on reliability, energy use and spare parts.',
    'اختيار مستقل للمعدات، مقارنةً بالموثوقية واستهلاك الطاقة وتوفر قطع الغيار.'
  ),
  l(
    'لە دابینکەری متمانەپێکراو دەیکڕین و هەموو کەرەستەیەک لە کاتی گەیشتندا دەپشکنین.',
    'We buy from trusted suppliers and inspect every item when it arrives.',
    'نشتري من موردين موثوقين ونفحص كل قطعة عند وصولها.'
  ),
  l(
    'تیمەکانمان بە سەرپەرشتی دایدەمەزرێنن، بوار بە بوار، لەژێر یەک بەڕێوەبەردا.',
    'Our teams install under supervision, trade by trade, under one manager.',
    'تركّب فرقنا تحت الإشراف، تخصصاً بعد تخصص، بإدارة واحدة.'
  ),
  l(
    'تاقیکردنەوەی گوشار، هاوسەنگکردنی هەوا و پشکنینی کارایی پێش ڕادەستکردن.',
    'Pressure tests, air balancing and performance checks before anything is handed over.',
    'اختبارات الضغط وموازنة الهواء وفحوص الأداء قبل التسليم.'
  ),
  l(
    'پەسەندکردنی کۆتایی کوالیتی و ڕاگەیاندنی سیستەمە تەواوکراوەکە بە تۆ.',
    'Final quality approval and a walkthrough of the finished systems with you.',
    'الاعتماد النهائي للجودة وجولة معك على الأنظمة المنجزة.'
  ),
  l(
    'چاودێری بەردەوام، و پشتگیری تا چوار ساڵ دوای تەواوبوونی گەرەنتی سەرەکی.',
    'Regular servicing, and support for up to four years after the original warranty ends.',
    'صيانة دورية، ودعم لمدة تصل إلى أربع سنوات بعد انتهاء الضمان الأصلي.'
  ),
].map((text, i) => ({ title: hvac.steps[i], text }));
