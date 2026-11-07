import type { L10n } from '@/lib/i18n';
import type { Lang } from '@/lib/lang-context';

/*
  Schematic map of where KST has worked: Erbil (citadel and its ring roads) and Pirmam on the hill to the north-east.
  It is a diagram, not a survey map. The city of the client in focus gets the gold pin.
*/

export type Place = 'Erbil' | 'Pirmam';

const GOLD = 'hsl(40 62% 56%)';
const LINE = 'rgba(255,255,255,0.22)';
const NIGHT = 'hsl(212 58% 9%)';

const E = { x: 196, y: 262 };
const P = { x: 428, y: 104 };

const names: Record<Place, L10n> = {
  Erbil: { ku: 'هەولێر', en: 'Erbil', ar: 'أربيل' },
  Pirmam: { ku: 'پیرمام', en: 'Pirmam', ar: 'بيرمام' },
};

const pin = (x: number, y: number) => `M${x} ${y}c-5-9-11-13-11-19a11 11 0 1 1 22 0c0 6-6 10-11 19Z`;

export default function RegionMap({
  active,
  counts,
  lang,
  label,
}: {
  active: Place | null;
  counts: Record<Place, number>;
  lang: Lang;
  label: string;
}) {
  const marker = (place: Place, at: { x: number; y: number }, labelAt: { x: number; y: number; anchor: 'start' | 'end' | 'middle' }) => {
    const on = active === place;
    return (
      <g>
        {on && <circle cx={at.x} cy={at.y} r={10} fill="none" stroke={GOLD} strokeWidth={2} className="pin-pulse" />}
        <path d={pin(at.x, at.y)} fill={on ? GOLD : 'rgba(255,255,255,0.55)'} stroke={NIGHT} strokeWidth={1.5} className="transition-[fill] duration-300" />
        <circle cx={at.x} cy={at.y - 20} r={4} fill={NIGHT} />
        <text
          x={labelAt.x}
          y={labelAt.y}
          textAnchor={labelAt.anchor}
          fontSize={21}
          fontWeight={700}
          fill={on ? GOLD : 'rgba(255,255,255,0.75)'}
          stroke={NIGHT}
          strokeWidth={5}
          paintOrder="stroke"
          style={{ fontFamily: lang === 'en' ? 'var(--font-latin)' : 'var(--font-heading)' }}
        >
          {`${names[place][lang]} (${counts[place]})`}
        </text>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 520 420" role="img" aria-label={label} className="block h-auto w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Erbil: ring roads around the citadel and the main radial roads */}
      <g stroke={LINE} strokeWidth={1.3}>
        {[44, 78, 116, 152].map((r) => (
          <circle key={r} cx={E.x} cy={E.y} r={r} />
        ))}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4 + Math.PI / 8;
          return <path key={i} d={`M${E.x + Math.cos(a) * 18} ${E.y + Math.sin(a) * 14}L${E.x + Math.cos(a) * 160} ${E.y + Math.sin(a) * 160}`} />;
        })}
      </g>
      <g stroke="rgba(255,255,255,0.45)" strokeWidth={1.4}>
        <ellipse cx={E.x} cy={E.y} rx={17} ry={13} />
        <path d={`M${E.x - 10} ${E.y + 6}l12-14M${E.x - 3} ${E.y + 10}l13-15M${E.x + 5} ${E.y + 11}l8-9`} />
      </g>

      {/* Pirmam: contour lines of the hill */}
      <g stroke={LINE} strokeWidth={1.3}>
        <path d="M372 112c6-34 46-52 82-40s46 46 22 66-70 22-92 8-14-20-12-34Z" />
        <path d="M392 110c4-20 30-32 52-24s28 28 14 40-42 14-56 4-12-10-10-20Z" />
        <path d="M410 106c2-10 16-16 28-12s14 16 6 22-22 6-30 0-6-4-4-10Z" />
      </g>

      {/* Road from Erbil up to Pirmam */}
      <path d="M318 186c20-6 26-18 22-30s10-18 22-14 14-14 26-16 20 2 30-10" stroke="rgba(255,255,255,0.4)" strokeWidth={2} strokeDasharray="6 6" />

      {/* North arrow */}
      <g stroke="rgba(255,255,255,0.5)" strokeWidth={1.4}>
        <path d="M40 66V36M33 46l7-10 7 10" />
      </g>
      <text x={40} y={84} textAnchor="middle" fontSize={12} fill="rgba(255,255,255,0.5)" style={{ fontFamily: 'var(--font-latin)' }}>N</text>

      {marker('Erbil', E, { x: E.x, y: E.y + 40, anchor: 'middle' })}
      {marker('Pirmam', P, { x: P.x, y: P.y + 32, anchor: 'middle' })}
    </svg>
  );
}
