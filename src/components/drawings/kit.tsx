import type { ReactNode } from 'react';

/*
  Shared parts for the engineering drawings.

  A field drawing is a set of named layers. While a visitor scrolls the list of sub-services,
  the layer of the item crossing the middle of the screen is drawn in the field's colour,
  layers already passed stay drawn in white, and later layers are hidden (see `.bp-layer` in globals.css).
*/

export const rect = (x: number, y: number, w: number, h: number) => `M${x} ${y}h${w}v${h}h${-w}Z`;
export const rrect = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}Z`;
export const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;
/** small tick mark, e.g. a passed check */
export const check = (x: number, y: number, s = 1) => `M${x} ${y}l${4 * s} ${4 * s}l${8 * s} ${-9 * s}`;
/** arrow head pointing in a direction from its tip */
export const head = (x: number, y: number, dir: 'up' | 'down' | 'left' | 'right', s = 5) =>
  ({
    up: `M${x - s} ${y + s}L${x} ${y}L${x + s} ${y + s}`,
    down: `M${x - s} ${y - s}L${x} ${y}L${x + s} ${y - s}`,
    left: `M${x + s} ${y - s}L${x} ${y}L${x + s} ${y + s}`,
    right: `M${x - s} ${y - s}L${x} ${y}L${x - s} ${y + s}`,
  })[dir];
/** a straight arrow with head */
export const arrow = (x1: number, y1: number, x2: number, y2: number, s = 5) => {
  const dir = Math.abs(x2 - x1) > Math.abs(y2 - y1) ? (x2 > x1 ? 'right' : 'left') : y2 > y1 ? 'down' : 'up';
  return `M${x1} ${y1}L${x2} ${y2}` + head(x2, y2, dir, s);
};
export const fan = (cx: number, cy: number, r: number) =>
  circle(cx, cy, r) + `M${cx} ${cy - r * 0.8}Q${cx + r * 0.5} ${cy - r * 0.2} ${cx} ${cy}Q${cx - r * 0.5} ${cy + r * 0.2} ${cx} ${cy + r * 0.8}M${cx - r * 0.8} ${cy}Q${cx - r * 0.2} ${cy - r * 0.5} ${cx} ${cy}Q${cx + r * 0.2} ${cy + r * 0.5} ${cx + r * 0.8} ${cy}`;

export type Mark =
  | { k: 'ink'; d: string }
  | { k: 'dash'; d: string }
  | { k: 'flow'; d: string }
  | { k: 'fill'; d: string; o?: number }
  | { k: 'text'; x: number; y: number; s: string; size?: number; anchor?: 'start' | 'middle' | 'end' };

export const ink = (d: string): Mark => ({ k: 'ink', d });
export const dash = (d: string): Mark => ({ k: 'dash', d });
export const flow = (d: string): Mark => ({ k: 'flow', d });
export const fill = (d: string, o = 0.16): Mark => ({ k: 'fill', d, o });
export const txt = (x: number, y: number, s: string, size = 10, anchor: 'start' | 'middle' | 'end' = 'middle'): Mark => ({ k: 'text', x, y, s, size, anchor });

export type LayerMap = Record<string, Mark[]>;

export const DONE = 'rgba(255,255,255,0.62)';
export const BASE = 'rgba(255,255,255,0.22)';

export function MarkEl({ m, color }: { m: Mark; color: string }) {
  switch (m.k) {
    case 'ink':
      return <path d={m.d} pathLength={1} className="ink" />;
    case 'dash':
      return <path d={m.d} strokeDasharray="4 5" />;
    case 'flow':
      return <path d={m.d} className="flow" />;
    case 'fill':
      return <path d={m.d} fill={color} fillOpacity={m.o} stroke="none" className="bp-fill" />;
    case 'text':
      return (
        <text x={m.x} y={m.y} fontSize={m.size} textAnchor={m.anchor} fill={color} stroke="none" fontFamily="Manrope, sans-serif" fontWeight={700} letterSpacing="0.04em">
          {m.s}
        </text>
      );
  }
}

/**
 * A layered drawing. `order` is the order layers first appear on the page; `active` is the current layer.
 * `colors` can give some layers their own highlight colour (solar green on the electrical page).
 */
export function LayeredDrawing({
  layers,
  order,
  active,
  accent,
  colors,
  base,
  label,
  defs,
  viewBox = '0 0 520 430',
}: {
  layers: LayerMap;
  order: string[];
  active: string;
  accent: string;
  colors?: Record<string, string>;
  base?: ReactNode;
  label: string;
  defs?: ReactNode;
  viewBox?: string;
}) {
  const ai = Math.max(0, order.indexOf(active));
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="block h-auto w-full" fill="none" strokeLinecap="round" strokeLinejoin="round" direction="ltr">
      {defs && <defs>{defs}</defs>}
      {base && (
        <g stroke={BASE} strokeWidth={1.2}>
          {base}
        </g>
      )}
      {order.map((id, i) => {
        const state = i < ai ? 'done' : i === ai ? 'on' : 'off';
        const color = state === 'on' ? (colors?.[id] ?? accent) : DONE;
        return (
          <g key={id} className="bp-layer" data-state={state} data-layer={id} stroke={color} strokeWidth={state === 'on' ? 2.2 : 1.4}>
            {(layers[id] ?? []).map((m, j) => (
              <MarkEl key={j} m={m} color={color} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Mix two #rrggbb colours, t = 0 gives a, t = 1 gives b. */
export function mix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `#${pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
}
