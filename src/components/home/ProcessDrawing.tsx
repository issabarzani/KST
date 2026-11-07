/*
  Top-view floor plan that builds up one layer per project step:
  0 brief, 1 survey, 2 proposed equipment, 3 delivered equipment, 4 pipes and ducts,
  5 airflow and tests, 6 handover, 7 ongoing service.
  Layers before the current step stay drawn in white, the current one is gold, later ones are hidden.
*/

const GOLD = 'hsl(40 62% 56%)';
const DONE = 'rgba(255,255,255,0.62)';

const rect = (x: number, y: number, w: number, h: number) => `M${x} ${y}h${w}v${h}h${-w}Z`;
const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

type Stroke = { d: string; dashed?: boolean };
const p = (d: string, dashed = false): Stroke => ({ d, dashed });

const equipment = [
  rect(150, 88, 60, 12), // indoor unit, room A
  rect(320, 88, 60, 12), // indoor unit, room B
  rect(232, 208, 56, 12), // indoor unit, hall
  rect(446, 98, 40, 40) + circle(466, 118, 12), // outdoor unit 1
  rect(446, 158, 40, 40) + circle(466, 178, 12), // outdoor unit 2
];

const LAYERS: Stroke[][] = [
  // 0 brief: site boundary, north arrow, notes
  [
    p(rect(30, 30, 470, 340), true),
    p('M480 70V44M474 52l6-8 6 8'),
    p(rect(44, 316, 24, 32) + 'M50 326h12M50 333h12M50 340h8M50 312h12v6H50Z'),
  ],
  // 1 survey: walls, dimensions, sun load
  [
    p(rect(90, 80, 340, 220)),
    p('M250 80v58M250 160v40M90 200h70M190 200h170M390 200h40'),
    p('M90 62h340M90 56v12M430 56v12M72 80v220M66 80h12M66 300h12'),
    p(circle(56, 52, 9) + 'M56 36v-4M56 72v-4M40 52h-4M76 52h-4M44 40l-3-3M68 64l3 3M84 70l14 14M98 84h-7M98 84v-7'),
  ],
  // 2 proposed equipment (dashed)
  equipment.map((d) => p(d, true)),
  // 3 delivered equipment (solid) and crates on site
  [...equipment.map((d) => p(d)), p(rect(150, 318, 28, 24) + 'M150 318l28 24M178 318l-28 24'), p(rect(186, 318, 28, 24) + 'M186 318l28 24M214 318l-28 24')],
  // 4 refrigerant pipes and supply duct
  [
    p('M446 118H408V94H380'),
    p('M446 178H416V214H288'),
    p('M408 104V146H180V100'),
    p('M110 248H404M110 260H404'),
    p(rect(150, 264, 14, 8) + rect(243, 264, 14, 8) + rect(336, 264, 14, 8)),
  ],
  // 5 airflow, gauge, checks
  [
    p('M165 104v20l-4-5M165 124l4-5M195 104v20l-4-5M195 124l4-5M335 104v20l-4-5M335 124l4-5M365 104v20l-4-5M365 124l4-5'),
    p('M157 274v14l-4-5M157 288l4-5M250 274v14l-4-5M250 288l4-5M343 274v14l-4-5M343 288l4-5'),
    p(circle(300, 336, 16) + 'M300 336l9-8M290 346h20'),
    p('M118 178l6 6 12-12M278 178l6 6 12-12'),
  ],
  // 6 handover: outline confirmed, document with check, key
  [
    p(rect(86, 76, 348, 228)),
    p(rect(352, 312, 30, 38) + 'M358 322h18M358 329h18M359 340l5 5 9-9'),
    p(circle(58, 150, 8) + 'M66 150h18M78 150v6M84 150v8'),
  ],
  // 7 ongoing service: maintenance cycle and wrench
  [
    p('M452 330a20 20 0 1 1 6 14M452 330l-2 8M452 330l8 1'),
    p('M466 322l8 8M462 326a5 5 0 1 1 7 -7l-3 3 3 3 3-3a5 5 0 1 1 -7 7'),
  ],
];

export default function ProcessDrawing({ active, label }: { active: number; label: string }) {
  return (
    <svg viewBox="0 0 520 390" role="img" aria-label={label} className="block h-auto w-full" fill="none" strokeLinecap="round" strokeLinejoin="round" direction="ltr">
      {LAYERS.map((layer, i) => {
        const state = i < active ? 'done' : i === active ? 'on' : 'off';
        return (
          <g
            key={i}
            className="bp-layer"
            data-state={state}
            stroke={state === 'on' ? GOLD : DONE}
            strokeWidth={state === 'on' ? 2.2 : 1.4}
          >
            {layer.map((s, j) =>
              s.dashed ? (
                <path key={j} d={s.d} strokeDasharray="4 5" />
              ) : (
                <path key={j} d={s.d} pathLength={1} className="ink" />
              )
            )}
          </g>
        );
      })}
    </svg>
  );
}
