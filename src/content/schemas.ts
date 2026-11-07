import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "badge": z.string(),
        "headlineKu1": z.string(),
        "headlineKu2": z.string(),
        "subheadlineEn": z.string(),
        "subheadlineAr": z.string(),
        "ctaPrimary": z.string(),
        "ctaSecondary": z.string(),
        "stat1Value": z.string(),
        "stat1LabelKu": z.string(),
        "stat1LabelEn": z.string(),
        "stat2Value": z.string(),
        "stat2LabelKu": z.string(),
        "stat2LabelEn": z.string(),
        "stat3Value": z.string(),
        "stat3LabelKu": z.string(),
        "stat3LabelEn": z.string()
      }),
      "about": z.object({
        "sectionLabel": z.string(),
        "headingKu": z.string(),
        "headingEn": z.string(),
        "bodyKu": z.string(),
        "bodyEn": z.string(),
        "pricingNoteKu": z.string(),
        "pricingNoteEn": z.string(),
        "statValue": z.string(),
        "statLabelKu": z.string(),
        "statLabelEn": z.string()
      }),
      "services": z.object({
        "sectionLabel": z.string(),
        "headingKu": z.string(),
        "headingEn": z.string()
      }),
      "portfolio": z.object({
        "headingKu": z.string(),
        "headingEn": z.string()
      }),
      "contact": z.object({
        "sectionLabel": z.string(),
        "headingKu": z.string(),
        "headingEn": z.string(),
        "pricingBadgeKu": z.string(),
        "pricingBadgeEn": z.string(),
        "detailsHeadingKu": z.string(),
        "addressKu": z.string(),
        "addressEn": z.string(),
        "addressAr": z.string(),
        "phone1": z.string(),
        "phone2": z.string(),
        "phone3": z.string(),
        "phone4": z.string(),
        "email": z.string(),
        "coordinates": z.string(),
        "submitBtn": z.string(),
        "successHeadingKu": z.string(),
        "successEn": z.string(),
        "successAr": z.string(),
        "newRequestBtn": z.string()
      })
    })
  },
  data: {
    portfolio: z.array(z.object({
      "id": z.string(),
      "nameKu": z.string(),
      "nameEn": z.string(),
      "nameAr": z.string(),
      "sectors": z.array(z.string()).min(1),
      "location": z.string(),
      "locationEn": z.string(),
      "locationAr": z.string()
    }))
  }
};
export type Schemas = typeof schemas;