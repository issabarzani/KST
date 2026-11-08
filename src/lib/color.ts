/*
  Accessible versions of each field's colour, so text and icons drawn in that colour stay readable
  (WCAG AA, 4.5:1) on light cards, on dark cards and on the always-dark hero.
*/

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const toHex = (rgb: number[]) => `#${rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('')}`;

function luminance(c: string) {
  const [r, g, b] = hex(c).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

const mixHex = (a: string, b: string, t: number) => {
  const pa = hex(a);
  const pb = hex(b);
  return toHex(pa.map((v, i) => v + (pb[i] - v) * t));
};

/** Moves a colour towards `to` until it reaches the contrast target against `bg`. */
function readable(color: string, bg: string, to: string, target = 4.5) {
  for (let t = 0; t <= 1.0001; t += 0.05) {
    const c = mixHex(color, to, t);
    if (contrast(c, bg) >= target) return c;
  }
  return to;
}

export const NIGHT = '#0a1626';
// The darkest surfaces field-coloured text sits on (page sections, cards), light and dark theme
const LIGHT_SURFACE = '#e3e8ee';
const DARK_SURFACE = '#172636';

/**
 * Field colour for text/icons on light surfaces, on dark surfaces and on the always-dark hero,
 * plus a solid version for filled badges/buttons and the text colour that goes on it.
 */
export function accentTokens(accent: string) {
  const onNightBest = contrast(NIGHT, accent) >= contrast('#ffffff', accent);
  let solid = accent;
  let onAccent = onNightBest ? NIGHT : '#ffffff';
  if (Math.max(contrast(NIGHT, accent), contrast('#ffffff', accent)) < 4.5) {
    // e.g. the IT purple: deepen it slightly so white text on it stays readable
    solid = readable(accent, '#ffffff', '#000000');
    onAccent = '#ffffff';
  }
  return {
    inkLight: readable(accent, LIGHT_SURFACE, '#000000'),
    inkDark: readable(accent, DARK_SURFACE, '#ffffff'),
    onNight: readable(accent, NIGHT, '#ffffff'),
    solid,
    onAccent,
  };
}
