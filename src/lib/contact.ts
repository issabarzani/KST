import { home } from 'virtual:content';

/*
  The company's WhatsApp numbers. They come from src/content/pages/home.json (contact.phone1, phone2);
  empty fields are skipped. They are shown only in the Contact section, next to the form.
*/
export const whatsappNumbers: string[] = [home.contact.phone1, home.contact.phone2, home.contact.phone3, home.contact.phone4].filter(
  (p): p is string => typeof p === 'string' && p.trim().length > 0
);

/** wa.me link that opens a WhatsApp chat with an optional first message */
export const waLink = (phone: string, text?: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
