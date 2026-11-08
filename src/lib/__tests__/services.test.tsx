import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { services, layerOrder, serviceSlugs, getService } from '@/lib/services';
import { plans } from '@/components/drawings';
import { localize, langFromPath, stripLang } from '@/lib/lang-context';

describe('the eight KST fields', () => {
  it('are eight, cooling first, with unique slugs', () => {
    expect(serviceSlugs).toEqual([
      'hvac',
      'construction',
      'electrical-solar',
      'operating-rooms',
      'medical-equipment',
      'it-systems',
      'management-setup',
      'cleaning-staffing',
    ]);
  });

  it('have every text in Kurdish, English and Arabic', () => {
    const check = (x: { ku: string; en: string; ar: string }) => {
      expect(x.ku.trim()).not.toBe('');
      expect(x.en.trim()).not.toBe('');
      expect(x.ar.trim()).not.toBe('');
    };
    for (const s of services) {
      [s.name, s.summary, s.tagline, s.intro, ...s.bullets].forEach(check);
      s.groups.forEach((g) => {
        check(g.title);
        g.items.forEach((it) => {
          check(it.text);
          if (it.title) check(it.title);
        });
      });
      s.faqs.forEach((f) => {
        check(f.q);
        check(f.a);
      });
      s.audience.forEach((a) => check(a.label));
      expect(s.bullets).toHaveLength(4);
    }
  });

  it('link only to existing fields', () => {
    for (const s of services) {
      for (const r of s.related) expect(getService(r)).toBeTruthy();
      expect(s.related.length).toBeGreaterThanOrEqual(2);
      expect(s.related.length).toBeLessThanOrEqual(3);
    }
  });

  it('never mention plumbing', () => {
    const all = JSON.stringify(services).toLowerCase();
    expect(all).not.toMatch(/plumbing|پلەمبینگ|سباكة/);
  });

  it('have a drawn layer for every sub-service', () => {
    for (const s of services) {
      const order = layerOrder(s);
      const html = renderToStaticMarkup(createElement(plans[s.slug], { active: order[0], order, accent: s.accent, accent2: s.accent2, label: 'x' }));
      for (const id of order) {
        const m = new RegExp(`data-layer="${id}"[^>]*>(.*?)</g>`).exec(html);
        expect(m?.[1], `${s.slug} layer ${id}`).toBeTruthy();
      }
    }
  });
});

describe('language addresses', () => {
  it('map between Kurdish, English and Arabic', () => {
    expect(localize('/services/hvac', 'en')).toBe('/en/services/hvac');
    expect(localize('/en/services/hvac', 'ar')).toBe('/ar/services/hvac');
    expect(localize('/ar/services/hvac', 'ku')).toBe('/services/hvac');
    expect(localize('/', 'en')).toBe('/en');
    expect(localize('/en', 'ku')).toBe('/');
    expect(langFromPath('/en')).toBe('en');
    expect(langFromPath('/ar/services/it-systems')).toBe('ar');
    expect(langFromPath('/english')).toBe('ku');
    expect(stripLang('/en')).toBe('/');
  });
});
