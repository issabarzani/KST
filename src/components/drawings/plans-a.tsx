import { arrow, check, circle, dash, fan, fill, flow, head, ink, LayeredDrawing, mix, rect, rrect, txt, type LayerMap } from '@/components/drawings/kit';

export interface PlanProps {
  active: string;
  order: string[];
  accent: string;
  accent2?: string;
  label: string;
}

const hatch = (x1: number, x2: number, y: number, step = 16) =>
  Array.from({ length: Math.floor((x2 - x1) / step) + 1 }, (_, i) => `M${x1 + i * step + 6} ${y + 2}l-7 9`).join('');

/* ================================================================== 1. HVAC
   A section through a building: roof plant, offices (ducted), clinic and rooms (VRF, HEPA, heating),
   kitchen and shop (cold room, exhaust, split), basement plant room and car park.
   The building air warms-to-cools as the visitor scrolls through the list. */
const HVAC: LayerMap = {
  vrf: [
    ink(rect(318, 52, 40, 36) + rect(364, 52, 40, 36)),
    ink(fan(338, 70, 11) + fan(384, 70, 11)),
    ink('M384 88V100H398V182H190'),
    ink(rect(190, 180, 34, 8) + rect(316, 180, 34, 8) + 'M196 184h22M322 184h22'),
    flow('M207 192v14M333 192v14'),
    txt(361, 44, 'VRF', 9),
  ],
  chiller: [
    ink(rect(58, 50, 80, 38)),
    ink(fan(77, 62, 7) + fan(97, 62, 7) + fan(117, 62, 7)),
    ink('M64 78H132M64 83H132'),
    ink('M66 88V392H75'),
    ink('M74 88V380H97'),
    ink(circle(80, 392, 5) + circle(102, 380, 5)),
    flow('M66 100V380M74 380V100'),
    txt(98, 44, 'CHILLER', 9),
  ],
  ducted: [
    ink(rect(92, 100, 44, 15) + 'M100 107h28'),
    ink(rect(136, 103, 214, 9)),
    ink(rect(166, 118, 22, 4) + rect(230, 118, 22, 4) + rect(294, 118, 22, 4)),
    flow('M177 124v16M241 124v16M305 124v16'),
  ],
  split: [
    ink(rrect(330, 262, 52, 14, 3) + 'M336 271h40'),
    ink('M382 268H418'),
    ink(rect(418, 260, 42, 34) + fan(439, 277, 11)),
    ink('M418 294L410 302M460 294l8 8'),
    flow('M345 280q5 9 0 18M365 280q5 9 0 18'),
  ],
  heating: [
    ink(rect(84, 344, 28, 40) + 'M98 376q-7-8 0-16q7 8 0 16'),
    ink('M112 352H126V238H106'),
    ink(rect(62, 230, 44, 14) + 'M68 230v14M74 230v14M80 230v14M86 230v14M92 230v14M98 230v14'),
    ink('M126 246H178h8v-5h8v5h8v-5h8v5h8v-5h8v5h8v-5h8v5h8v-5h8v5h8v-5h8v5h8v-5h8v5H282'),
  ],
  cold: [
    ink(rect(150, 276, 72, 52)),
    ink('M204 284V326M199 304h3'),
    ink('M177 290V316M164 303H190M168 294L186 312M186 294L168 312'),
    txt(186, 271, '−18°', 8),
  ],
  amc: [
    ink(rect(442, 112, 52, 46) + 'M442 126H494M454 106v12M482 106v12'),
    ink(check(450, 136) + check(468, 136) + check(450, 148)),
    ink(check(142, 60) + check(408, 60) + check(464, 252)),
    ink('M462 186l14 14M459 189a7 7 0 1 1 9-9l-4 4 4 4 4-4a7 7 0 1 1-9 9'),
  ],
  ahu: [
    ink(rect(150, 50, 104, 38)),
    ink('M157 56V82M163 56V82M169 56V82'),
    ink(fan(224, 69, 11)),
    ink(arrow(164, 22, 164, 46)),
    ink(rect(240, 96, 10, 154)),
    flow('M250 108h26M250 196h26'),
    ink(head(276, 108, 'right', 4) + head(276, 196, 'right', 4)),
    txt(202, 44, 'AHU', 9),
  ],
  erv: [
    ink(rect(254, 54, 30, 32) + circle(269, 70, 11) + 'M269 59V81M258 70H280'),
    ink(arrow(276, 52, 276, 26)),
    ink('M284 76H296V96'),
    txt(298, 44, 'ERV', 9),
  ],
  exhaust: [
    ink('M66 262H122L110 276H78Z'),
    ink('M86 262V256M102 262V256'),
    ink(arrow(94, 252, 94, 232)),
    ink('M200 394h56l-7-13h-36l-8 13' + circle(214, 396, 4) + circle(244, 396, 4)),
    ink(fan(372, 356, 10)),
    ink('M382 356H426V318'),
    flow('M392 356H424V322'),
    ink(head(426, 316, 'up', 5)),
  ],
  hepa: [
    ink('M180 56l4 5l-4 5l4 5l-4 5l4 5l-4 5'),
    ink(rect(76, 180, 56, 9) + 'M80 180l4 9l4-9l4 9l4-9l4 9l4-9l4 9l4-9l4 9l4-9l4 9l4-9'),
    flow('M86 194v24M104 194v24M122 194v24'),
    txt(104, 226, 'HEPA', 8),
  ],
};

export function HvacPlan({ active, order, accent, label }: PlanProps) {
  const t = order.length > 1 ? Math.max(0, order.indexOf(active)) / (order.length - 1) : 1;
  const air = mix('#F08A3C', accent, t);
  return (
    <LayeredDrawing
      layers={HVAC}
      order={order}
      active={active}
      accent={accent}
      label={label}
      base={
        <>
          {/* building air, warm at the start of the list and cool at the end */}
          <path d={rect(51, 96, 358, 304)} fill={air} fillOpacity={0.14} stroke="none" style={{ transition: 'fill 0.8s ease' }} />
          <path d="M50 90V406M410 90V406" />
          <path d={rect(50, 90, 360, 6) + rect(50, 170, 360, 6) + rect(50, 250, 360, 6) + rect(50, 330, 360, 6) + rect(50, 400, 360, 6)} />
          <path d="M8 330H50M410 330H512" />
          <path d={hatch(10, 40, 332) + hatch(420, 506, 332)} />
          <path d="M230 256V330M170 176V250M290 176V250M120 336V400" />
          <path d="M50 120H410" strokeDasharray="3 6" />
          <path d="M200 394h56l-7-13h-36l-8 13" />
        </>
      }
    />
  );
}

/* ================================================================== 2. Construction
   A building that rises floor by floor, then gets its frame, interiors, openings, facade and supervision. */
const floor = (top: number) => [ink(`M116 ${top + 70}V${top}M250 ${top + 70}V${top}M384 ${top + 70}V${top}`), ink(rect(110, top - 6, 280, 6))];

const CONSTRUCTION: LayerMap = {
  f1: [ink(rect(104, 380, 24, 12) + rect(238, 380, 24, 12) + rect(372, 380, 24, 12)), ...floor(310), fill(rect(110, 304, 280, 76), 0.08)],
  f2: [...floor(240), fill(rect(110, 234, 280, 70), 0.08)],
  f3: [...floor(170), fill(rect(110, 164, 280, 70), 0.08)],
  f4: [...floor(100), ink('M110 94V86M390 94V86'), fill(rect(110, 94, 280, 70), 0.08)],
  frame: [
    ink('M130 64H370M140 94V64M200 94V64M260 94V64M320 94V64M360 94V64'),
    ink('M140 94L200 64M140 64L200 94M200 94L260 64M200 64L260 94M260 94L320 64M260 64L320 94'),
    txt(345, 58, 'STEEL', 8),
  ],
  renovation: [dash('M176 312V378'), ink('M196 312V378M196 344h-6'), ink(circle(150, 340, 12) + 'M144 340h12M150 334v12')],
  fitout: [ink(rect(262, 330, 110, 48) + 'M290 330V378M318 330V378M346 330V378'), ink(rect(262, 314, 110, 12)), txt(317, 323, 'BRAND', 8)],
  finishes: [
    ink('M116 296H384'),
    ink(Array.from({ length: 16 }, (_, i) => `M${124 + i * 16} 296v8`).join('')),
    ink('M130 250l10 10M130 262l10 10M130 274l10 10M140 250l10 10M140 262l10 10'),
    ink(rect(206, 262, 22, 8) + 'M228 266h8v10h-12v8'),
  ],
  ceiling: [dash('M116 182H384'), ink('M140 170V182M200 170V182M260 170V182M320 170V182M370 170V182'), ink('M200 182V234M300 182V206M300 222V234')],
  decor: [
    ink('M160 182v10M152 200a8 8 0 0 1 16 0ZM350 182v10M342 200a8 8 0 0 1 16 0Z'),
    ink('M214 228h58v-12h-58Zm4-12v-6h50v6'),
    ink('M322 228v-14M316 214q6-12 12 0'),
    ink(rect(220, 190, 34, 18)),
  ],
  openings: [
    ink(rect(140, 254, 34, 30) + 'M157 254v30M140 269h34' + rect(300, 254, 34, 30) + 'M317 254v30M300 269h34'),
    ink(rect(126, 196, 18, 38) + 'M140 216h-3'),
    ink(rect(264, 196, 18, 38) + 'M268 216h-3'),
  ],
  facade: [
    ink('M116 108H384M116 128H384M116 148H384M146 100V164M176 100V164M206 100V164M236 100V164M266 100V164M296 100V164M326 100V164M356 100V164'),
    ink('M96 100V380M96 100H110M96 120H110M96 140H110M96 160H110M96 180H110M96 200H110M96 220H110M96 240H110M96 260H110M96 280H110M96 300H110M96 320H110M96 340H110M96 360H110M96 380H110'),
  ],
  insulation: [ink('M110 89q5-5 10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0'), ink('M392 100l6 8l-6 8l6 8l-6 8l6 8l-6 8l6 8l-6 8l6 8l-6 8l6 8l-6 8l6 8l-6 8l6 8')],
  supervision: [
    ink('M434 392V30M448 392V30M434 372l14-20-14-20 14-20-14-20 14-20-14-20 14-20-14-20 14-20-14-20 14-20-14-20 14-20-14-20 14-20-14-20 14-18'),
    ink('M380 30H512M380 38H512M441 12L380 30M441 12L512 30M441 12V30'),
    ink('M470 38V60M462 60h16v10h-16Z'),
    ink('M66 100V380M60 100H72M60 170H72M60 240H72M60 310H72M60 380H72'),
    ink(rect(462, 290, 40, 52) + check(470, 306) + check(470, 320) + 'M488 308h8M488 322h8M472 334h22'),
  ],
};

export function ConstructionPlan({ active, order, accent, label }: PlanProps) {
  return (
    <LayeredDrawing
      layers={CONSTRUCTION}
      order={order}
      active={active}
      accent={accent}
      label={label}
      base={
        <>
          <path d="M8 380H512" />
          <path d={hatch(10, 500, 382)} />
          {/* the building's outline as a faint set-out, before anything is built */}
          <path d={rect(110, 94, 280, 286)} strokeDasharray="2 7" />
        </>
      }
    />
  );
}

/* ================================================================== 3. Electrical & solar
   A single-line diagram: grid, generator and solar feed an ATS, the MDB and boards, down to the loads. */
const ELECTRICAL: LayerMap = {
  design: [ink(rect(18, 150, 56, 66) + 'M26 166h40M26 178h40M26 190h28'), txt(46, 208, 'Σ kW', 9)],
  cabling: [ink('M230 250V268M135 268H325M135 268V280M325 268V280'), ink('M135 305V320M100 320H170M100 320V330M170 320V330M325 305V320M290 320H380M290 320V330M380 320V330'), flow('M230 252V266M140 268H320')],
  panels: [
    ink(rect(200, 214, 60, 36)),
    txt(230, 237, 'MDB', 10),
    ink(rect(110, 280, 50, 25) + rect(300, 280, 50, 25)),
    txt(135, 297, 'SMDB', 8),
    txt(325, 297, 'SMDB', 8),
    ink(rect(84, 330, 32, 18) + rect(154, 330, 32, 18) + rect(274, 330, 32, 18) + rect(364, 330, 32, 18)),
    txt(100, 342, 'DB', 7),
    txt(170, 342, 'DB', 7),
    txt(290, 342, 'DB', 7),
    txt(380, 342, 'DB', 7),
  ],
  ats: [
    ink('M30 36L50 108M70 36L50 108M38 64H62M34 50H66M50 108V120'),
    txt(50, 28, 'GRID', 8),
    ink(rect(146, 56, 60, 40) + circle(176, 76, 12) + 'M170 76q3-6 6 0t6 0'),
    txt(176, 48, 'GEN', 8),
    ink(rect(200, 150, 60, 34)),
    txt(230, 171, 'ATS', 10),
    ink('M50 120V136H214V150M176 96V150'),
    ink('M230 184V214'),
    flow('M50 124V136H212M176 100V146M230 186V212'),
  ],
  lighting: [
    ink('M100 348V362M170 348V362' + circle(100, 370, 8) + circle(170, 370, 8) + 'M94 364l12 12M106 364l-12 12M164 364l12 12M176 364l-12 12'),
    ink(rect(150, 390, 40, 16)),
    txt(170, 402, 'EXIT', 7),
  ],
  earthing: [ink('M40 260V380M28 380H52M32 388H48M37 396H43'), ink('M40 290H84'), ink('M40 260l-5 10h10l-5 10'), txt(40, 252, 'PE', 8)],
  ups: [ink('M290 348V362' + rect(272, 362, 36, 22)), txt(290, 377, 'UPS', 8), ink('M308 373H324' + rect(324, 356, 26, 40) + 'M330 364h14M330 372h14M330 380h14M330 388h14')],
  ongrid: [
    ink('M330 40L360 90H500L470 40Z'),
    ink('M345 65H485M380 40L410 90M420 40L450 90'),
    ink(rect(410, 120, 46, 30) + 'M418 140l8-10l6 6l8-10'),
    txt(433, 162, 'INV', 8),
    ink('M433 90V120'),
    ink('M410 135H300V167H260'),
    flow('M433 92V118M408 135H302V167H262'),
    ink(circle(372, 135, 9)),
    txt(372, 120, 'kWh', 7),
  ],
  offgrid: [ink(rect(462, 176, 46, 40)), ink('M456 140H485V176'), ink('M44 92l12-8'), flow('M458 140H483V174')],
  hybrid: [ink('M433 150V176H462'), ink('M462 196H444V250'), txt(372, 160, 'HYBRID', 7)],
  battery: [ink('M472 176v-6h8v6M490 176v-6h8v6'), ink('M470 188h30M470 198h30M470 208h30'), txt(485, 228, 'Li-ion', 7)],
  uses: [
    ink('M420 290l18-14l18 14v22h-36ZM432 312v-10h12v10'),
    ink('M468 312v-24l10 6v-6l10 6v-6l10 6v18Z'),
    ink(circle(438, 360, 12) + 'M438 350q-6 8 0 14q6-6 0-14'),
    ink('M470 372h34M480 372v-14h14v14M487 358v-10'),
  ],
  monitor: [ink(rrect(476, 92, 26, 44, 4) + 'M482 124v-6M488 124v-12M494 124v-8'), ink('M480 82a12 12 0 0 1 18 0M484 86a6 6 0 0 1 10 0')],
  care: [ink('M352 18l-4 7a4 4 0 1 0 8 0ZM392 14l-4 7a4 4 0 1 0 8 0ZM432 18l-4 7a4 4 0 1 0 8 0Z'), ink('M286 52l12 12M283 55a7 7 0 1 1 9-9l-3 3 3 3 3-3a7 7 0 1 1-9 9')],
};

export function ElectricalPlan({ active, order, accent, accent2, label }: PlanProps) {
  const green = accent2 ?? accent;
  const colors = Object.fromEntries(['ongrid', 'offgrid', 'hybrid', 'battery', 'uses', 'monitor', 'care'].map((k) => [k, green]));
  return (
    <LayeredDrawing
      layers={ELECTRICAL}
      order={order}
      active={active}
      accent={accent}
      colors={colors}
      label={label}
      base={
        <>
          <path d={rect(10, 8, 500, 414)} strokeDasharray="2 8" />
          <path d="M410 250H512" strokeDasharray="2 6" />
          <path d="M20 250H390" strokeDasharray="2 6" />
          {/* the diagram set out in pencil before it is drawn in */}
          <path d={rect(200, 150, 60, 34) + rect(200, 214, 60, 36) + rect(110, 280, 50, 25) + rect(300, 280, 50, 25) + 'M330 40L360 90H500L470 40Z'} strokeDasharray="2 5" />
        </>
      }
    />
  );
}

/* ================================================================== 4. Operating rooms
   Top view of an operating suite: the theatre in the middle, specialist rooms around it. */
const OR: LayerMap = {
  walls: [ink(rrect(150, 60, 220, 220, 16)), ink('M150 104h6M150 148h6M150 192h6M150 236h6M364 104h6M364 148h6M364 192h6M364 236h6M194 60v6M238 60v6M282 60v6M326 60v6')],
  doors: [ink('M236 280h48'), ink(rect(222, 283, 76, 5)), ink(arrow(250, 298, 222, 298, 4) + arrow(270, 298, 298, 298, 4))],
  floor: [dash('M194 70V270M238 70V126M238 218V270M282 70V126M282 218V270M326 70V270M160 104H360M160 236H360')],
  lights: [ink(circle(260, 172, 28) + circle(260, 172, 12)), ink('M260 144V116M232 172H214'), ink(rect(174, 82, 22, 22) + rect(324, 82, 22, 22) + 'M196 93h12M324 93h-12')],
  panel: [ink(rect(154, 210, 14, 52) + 'M157 220h8M157 228h8M157 236h5'), ink(circle(161, 250, 3))],
  air: [dash(rect(204, 116, 112, 112)), ink([0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => circle(222 + i * 38, 134 + j * 38, 5) + `M${219 + i * 38} ${131 + j * 38}l6 6M${225 + i * 38} ${131 + j * 38}l-6 6`)).join('')), ink(rect(160, 262, 26, 8) + rect(334, 262, 26, 8))],
  gas: [txt(185, 116, 'O₂ · VAC', 7), txt(335, 116, 'AIR', 7), ink(circle(180, 98, 2) + circle(190, 98, 2) + circle(335, 98, 2))],
  gaspipe: [ink('M40 32H185V82M40 40H177V82M40 48H335V82'), ink(rect(70, 14, 30, 12) + 'M85 17v6'), txt(120, 24, 'MGPS', 8), flow('M42 32H183M42 48H333')],
  icu: [ink(rect(390, 60, 110, 110)), ink(rect(420, 96, 50, 26) + 'M420 104h-8'), ink(rect(474, 74, 18, 14) + 'M476 81h4l2-4l3 8l2-4h3'), txt(445, 158, 'ICU', 9)],
  isolation: [ink(rect(390, 180, 110, 100)), ink('M390 212H430V280M430 240h-6'), ink(rect(450, 222, 36, 22)), txt(470, 268, 'ISO', 9)],
  ivf: [ink(rect(20, 60, 120, 110)), ink(rect(32, 120, 96, 14) + 'M60 120v-14l8-8l6 6l-8 8M54 106h12'), txt(80, 158, 'IVF · LAB', 8)],
  pharma: [ink(rect(20, 180, 120, 100)), ink(rect(116, 214, 24, 24) + 'M116 214l24 24M140 214l-24 24'), txt(70, 268, 'GMP', 9)],
  cssd: [ink(rect(20, 310, 180, 100)), ink(rect(34, 324, 60, 56) + circle(64, 352, 18)), ink('M110 330H186M110 350H186M110 370H186'), txt(110, 398, 'CSSD', 9, 'start')],
  particles: [ink([[186, 92], [334, 92], [260, 172], [186, 248], [334, 248]].map(([x, y]) => circle(x, y, 7) + `M${x - 11} ${y}h22M${x} ${y - 11}v22`).join('')), ink(rect(230, 330, 60, 40) + 'M238 342h30M238 352h18'), txt(260, 388, '0.5 µm', 8)],
  pressure: [fill(rrect(150, 60, 220, 220, 16), 0.12), txt(260, 268, '+ +', 13), fill(rect(390, 180, 110, 100), 0.08), txt(470, 204, '−', 16), txt(410, 248, '−', 12), ink(arrow(260, 300, 260, 318, 4))],
  report: [ink(rect(410, 310, 70, 92) + 'M422 326h46M422 338h46M422 350h30'), ink(check(426, 368, 1.4)), txt(445, 396, 'ISO 14644', 7)],
};

export function OperatingRoomPlan({ active, order, accent, label }: PlanProps) {
  return (
    <LayeredDrawing
      layers={OR}
      order={order}
      active={active}
      accent={accent}
      label={label}
      base={
        <>
          <path d={rect(10, 8, 500, 414)} strokeDasharray="2 8" />
          <path d="M210 300H500M210 300V410" strokeDasharray="2 6" />
          {/* the operating table, always shown so the room reads */}
          <path d={rrect(240, 134, 40, 76, 4) + 'M248 146h24'} />
        </>
      }
    />
  );
}
