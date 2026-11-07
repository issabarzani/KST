import type { ServiceKey } from '@/lib/i18n';

/*
  A cut-through drawing of one building, with every trade KST delivers drawn in its place.
  The active trade is drawn in gold; the structure stays visible so the building always reads.
  Coordinates: ground at y=390, floors at 292 / 192 / 92, outer walls at x=70 and x=390.
*/

const GOLD = 'hsl(40 62% 56%)';
const STRUCT = 'rgba(255,255,255,0.55)';
const DIM = 'rgba(255,255,255,0.24)';

export default function BuildingSection({ active, label }: { active: ServiceKey; label: string }) {
  const g = (k: ServiceKey) => ({
    'data-k': k,
    stroke: active === k ? GOLD : k === 'construction' ? STRUCT : DIM,
    strokeWidth: active === k ? 2.2 : 1.3,
    className: 'transition-[stroke,stroke-width] duration-300 motion-reduce:transition-none',
  });

  return (
    <svg viewBox="0 0 520 430" role="img" aria-label={label} className="block h-auto w-full" fill="none" strokeLinecap="round" strokeLinejoin="round" direction="ltr">
      {/* site: ground and soil hatch, always faint */}
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1.2">
        <path d="M8 390 H512" />
        {Array.from({ length: 30 }, (_, i) => (
          <path key={i} d={`M${14 + i * 17} 392 l-8 10`} />
        ))}
      </g>

      {/* construction: footings, walls, slabs, column, parapet */}
      <g {...g('construction')}>
        <rect x="58" y="390" width="40" height="16" />
        <rect x="210" y="390" width="40" height="16" />
        <rect x="362" y="390" width="40" height="16" />
        <path d="M70 390 V80 M390 390 V80 M230 390 V92" />
        <rect x="70" y="86" width="320" height="6" />
        <rect x="70" y="186" width="320" height="6" />
        <rect x="70" y="286" width="320" height="6" />
        <path d="M70 80 H78 M382 80 H390" />
      </g>

      {/* project management: tower crane and dimension lines */}
      <g {...g('pm')}>
        <path d="M434 390 V30 M448 390 V30" />
        <path d="M434 370 L448 350 L434 330 L448 310 L434 290 L448 270 L434 250 L448 230 L434 210 L448 190 L434 170 L448 150 L434 130 L448 110 L434 90 L448 70 L434 50 L448 30" />
        <path d="M352 30 H512 M352 38 H512" />
        <path d="M441 12 L352 30 M441 12 L512 30 M441 12 V30" />
        <rect x="490" y="38" width="20" height="14" />
        <path d="M398 38 V62 M392 62 h12 v6 a6 6 0 0 1 -12 0" />
        <path d="M34 92 V286 M28 98 L40 86 M28 198 L40 186 M28 298 L40 286 M24 92 H44 M24 192 H44 M24 292 H44" />
      </g>

      {/* refrigeration & HVAC: rooftop chiller, refrigerant riser, indoor units */}
      <g {...g('hvac')}>
        <rect x="258" y="54" width="68" height="32" rx="2" />
        <circle cx="276" cy="70" r="10" />
        <circle cx="308" cy="70" r="10" />
        <path d="M326 70 H374 V302" />
        <rect x="316" y="96" width="46" height="11" />
        <rect x="316" y="296" width="46" height="11" />
        <path d="M374 101 H362 M374 301 H362" />
      </g>

      {/* fresh air & ventilation: roof air handler, duct drop, ceiling ducts, diffusers */}
      <g {...g('ventilation')}>
        <rect x="104" y="52" width="78" height="34" rx="2" />
        <path d="M116 58 V80 M126 58 V80 M136 58 V80 M146 58 V80" />
        <path d="M160 64 h14 M160 72 h14" />
        <rect x="96" y="92" width="10" height="106" />
        <rect x="106" y="98" width="190" height="8" />
        <rect x="106" y="198" width="114" height="8" />
        <path d="M140 106 l6 6 l6 -6 M200 106 l6 6 l6 -6 M260 106 l6 6 l6 -6 M150 206 l6 6 l6 -6 M196 206 l6 6 l6 -6" />
      </g>

      {/* electrical & power: generator, cable, riser, panels, light points */}
      <g {...g('electrical')}>
        <rect x="14" y="358" width="40" height="32" rx="2" />
        <path d="M37 364 l-7 10 h7 l-5 10" />
        <path d="M54 378 H84 V112" />
        <rect x="78" y="334" width="13" height="20" />
        <rect x="78" y="234" width="13" height="20" />
        <rect x="78" y="134" width="13" height="20" />
        <path d="M300 92 v10 M292 110 a8 8 0 0 1 16 0 Z" />
        <path d="M180 216 v6 M172 230 a8 8 0 0 1 16 0 Z" />
        <path d="M190 292 v24 M182 324 a8 8 0 0 1 16 0 Z" />
      </g>

      {/* modular operating room: laminar-flow ceiling, surgical light, table */}
      <g {...g('cleanroom')}>
        <rect x="240" y="198" width="124" height="84" strokeDasharray="4 4" />
        <rect x="262" y="198" width="80" height="8" />
        <path d="M276 210 v10 M290 210 v10 M304 210 v10 M318 210 v10 M332 210 v10" />
        <path d="M302 206 v20 M288 234 q14 -16 28 0 Z" />
        <rect x="272" y="256" width="62" height="7" />
        <path d="M303 263 V280 M290 280 H316" />
      </g>

      {/* medical equipment: patient bed and monitor */}
      <g {...g('medical')}>
        <rect x="246" y="352" width="80" height="10" rx="2" />
        <path d="M246 340 V384 M254 362 V384 M318 362 V384" />
        <rect x="340" y="326" width="30" height="22" rx="2" />
        <path d="M344 338 h5 l3 -6 l3 11 l3 -5 h9" />
        <path d="M355 348 V384 M347 384 H363" />
      </g>

      {/* IT & smart systems: server rack, data riser, cable trays, wireless point */}
      <g {...g('it')}>
        <rect x="110" y="318" width="38" height="70" rx="1" />
        <path d="M110 332 H148 M110 346 H148 M110 360 H148 M110 374 H148" />
        <path d="M116 325 h4 M116 339 h4 M116 353 h4 M116 367 h4" />
        <path d="M212 318 V186" />
        <rect x="198" y="154" width="28" height="32" rx="1" />
        <path d="M198 164 H226 M198 174 H226 M204 159 h4" />
        <path d="M104 304 H224 M104 222 H220" strokeDasharray="2 5" />
        <path d="M390 128 h6 M396 122 l20 4 v9 l-20 -4 Z M416 130 h4" />
      </g>
    </svg>
  );
}
