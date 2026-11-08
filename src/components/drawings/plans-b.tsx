import { arrow, check, circle, dash, fill, flow, ink, LayeredDrawing, rect, rrect, txt, type LayerMap } from '@/components/drawings/kit';
import type { PlanProps } from '@/components/drawings/plans-a';

const frame = <path d={rect(10, 8, 500, 414)} strokeDasharray="2 8" />;

/* ================================================================== 5. Medical equipment
   An equipment schedule sheet: each device drawn in its cell, then the service work underneath. */
const cell = (x: number, y: number, w: number, h: number) => rect(x, y, w, h);
const MEDICAL: LayerMap = {
  or: [
    ink('M30 118H120M44 118V140M106 118V140M36 140H114' + rect(40, 108, 70, 10)),
    ink('M75 30V48M58 62a17 10 0 0 1 34 0ZM75 48V52'),
    ink(rect(128, 66, 36, 70) + rect(134, 74, 24, 16) + 'M138 102h16M138 112h16M146 136v6'),
    txt(96, 160, 'OR', 9),
  ],
  icu: [
    ink(rect(190, 34, 76, 54) + 'M228 88V100M214 100h28'),
    flow('M196 62h12l5-12l6 22l5-16l4 6h32'),
    ink(rect(276, 46, 34, 54) + circle(293, 62, 8) + 'M282 82h22M282 90h22'),
    ink(rect(276, 108, 34, 30) + 'M282 118h22M293 108V98'),
    txt(250, 160, 'ICU', 9),
  ],
  lab: [ink(rect(352, 62, 60, 60) + rect(360, 70, 44, 20) + 'M364 100h10M364 108h10'), ink('M440 128h48M464 128v-14M454 114h20M466 114V66l10-8l8 8l-10 10M458 76h18'), txt(426, 160, 'LAB', 9)],
  steril: [ink(rect(30, 190, 110, 82) + circle(74, 231, 26) + circle(74, 231, 18)), ink('M116 202v18M110 210h12'), txt(85, 290, 'AUTOCLAVE', 8)],
  dental: [ink('M190 262h80M206 262v-30h50l18-30M256 232v30M206 232h-14v-12'), ink('M262 198a16 10 0 0 1 32 0ZM278 188v-8'), txt(250, 290, 'DENTAL', 8)],
  select: [ink('M430 190V266M398 266h64M430 196H384M430 196H476'), ink('M384 196l-12 26h24ZM476 196l-12 26h24Z'), ink(circle(372, 238, 2) + circle(464, 232, 6) + 'M464 226v-3M464 238v3M458 232h-3M470 232h3'), txt(430, 290, 'BUDGET · PARTS', 7)],
  install: [ink(rect(24, 326, 56, 38) + 'M40 326v-8h24v8M24 340h56'), ink(check(36, 384)), txt(52, 406, 'INSTALL', 7)],
  train: [ink(rect(96, 320, 54, 34) + 'M123 354v10M110 364h26'), ink(circle(160, 352, 6) + 'M150 380q10-16 20 0'), txt(128, 406, 'TRAINING', 7)],
  pm: [ink(rect(184, 324, 50, 46) + 'M184 338h50M196 318v10M222 318v10'), ink(check(192, 350) + check(212, 350)), txt(209, 406, 'PM', 7)],
  emergency: [ink('M266 366v-30a14 14 0 0 1 28 0v30ZM260 366h40M280 316v-6M262 322l-4-4M298 322l4-4'), ink('M282 338l-6 12h8l-6 12'), txt(280, 406, 'SOS', 7)],
  calib: [ink('M318 368a26 26 0 0 1 52 0M344 368l14-16M322 358l6 2M366 358l-6 2M344 342v6'), ink(circle(344, 368, 3)), txt(344, 406, 'CAL', 7)],
  parts: [ink(rect(388, 342, 40, 30) + 'M388 352h40M408 342v10'), ink(circle(412, 330, 9) + circle(412, 330, 3)), txt(408, 406, 'PARTS', 7)],
  amc: [ink(rect(448, 318, 46, 58) + 'M456 332h30M456 342h30M456 352h18'), ink(circle(480, 366, 8) + check(475, 365, 0.6)), txt(471, 406, 'AMC', 7)],
};

export function MedicalPlan({ active, order, accent, label }: PlanProps) {
  return (
    <LayeredDrawing
      layers={MEDICAL}
      order={order}
      active={active}
      accent={accent}
      label={label}
      base={
        <>
          {frame}
          <path d={cell(18, 20, 160, 150) + cell(178, 20, 162, 150) + cell(340, 20, 162, 150) + cell(18, 170, 160, 130) + cell(178, 170, 162, 130) + cell(340, 170, 162, 130)} />
          <path d="M18 308H502" strokeDasharray="2 6" />
        </>
      }
    />
  );
}

/* ================================================================== 6. IT
   A floor plan at night: cameras with their fields of view, the network, systems and controls. */
const fov = (x: number, y: number, a: number, len = 90, spread = 28) => {
  const r = (deg: number) => (deg * Math.PI) / 180;
  const p1 = [x + len * Math.cos(r(a - spread)), y + len * Math.sin(r(a - spread))];
  const p2 = [x + len * Math.cos(r(a + spread)), y + len * Math.sin(r(a + spread))];
  return `M${x} ${y}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z`;
};
const cam = (x: number, y: number) => rect(x - 7, y - 4, 14, 8) + `M${x + 7} ${y}h4`;
const ap = (x: number, y: number) => circle(x, y, 4) + `M${x - 12} ${y - 8}a14 14 0 0 1 24 0M${x - 18} ${y - 14}a22 22 0 0 1 36 0`;

const IT: LayerMap = {
  ipcam: [ink(cam(32, 40) + cam(388, 40) + cam(32, 318)), fill(fov(32, 40, 40) + fov(388, 40, 140) + fov(32, 318, -40), 0.14)],
  aicam: [ink(cam(210, 300)), fill(fov(210, 300, 90, 30, 34), 0.18), ink(rect(186, 344, 20, 22) + 'M190 344v-4h12v4' + rect(218, 350, 38, 14)), txt(237, 360, 'ABC 123', 6)],
  mobile: [ink(rrect(432, 40, 46, 82, 6) + rect(438, 50, 34, 60) + 'M438 70h34M438 90h34M455 50v60'), dash('M432 80H400')],
  nvr: [ink(rect(300, 228, 40, 14) + 'M306 235h12'), txt(320, 222, 'NVR', 7), dash('M39 40H300V228M39 318H300V242M381 40H320V228')],
  cabling: [ink('M20 180H400M200 30V330'), ink('M330 330V384H512'), txt(470, 378, 'FIBER', 7), flow('M500 384H332V332M200 182V328')],
  wifi: [ink(ap(110, 110) + ap(300, 110) + ap(110, 250))],
  devices: [ink(rect(346, 214, 44, 8) + rect(346, 226, 44, 8) + rect(346, 238, 44, 8) + 'M352 218h4M360 218h4M352 230h4M360 230h4'), ink('M368 250l-8 4v6c0 6 8 9 8 9s8-3 8-9v-6Z')],
  server: [ink(rect(352, 272, 32, 52) + 'M356 282h24M356 292h24M356 302h24M356 312h24'), txt(368, 266, 'RACK', 6)],
  erp: [ink(rect(424, 150, 64, 44) + 'M456 194v8M444 202h24'), ink(rect(430, 156, 24, 14) + rect(458, 156, 24, 14) + rect(430, 174, 24, 14) + rect(458, 174, 24, 14)), txt(456, 216, 'ERP', 7)],
  pos: [ink(rect(60, 204, 30, 22) + 'M66 226l-6 10h42l-6-10M66 210h18'), ink('M96 196v-10h10v20'), txt(80, 248, 'POS', 7)],
  his: [ink(rect(250, 60, 30, 22) + 'M258 71h14M265 64v14'), ink('M240 140h50M240 124h50v16'), txt(265, 160, 'HIS', 7)],
  pms: [ink(rect(60, 50, 50, 26) + 'M60 60h50M68 50v-6h14v6'), ink(rect(124, 54, 16, 22) + 'M128 68h8'), txt(92, 92, 'PMS', 7)],
  access: [ink('M194 330h12'), ink(rect(222, 306, 12, 18) + 'M225 312q3-4 6 0M224 316q4-5 8 0M225 320q3-3 6 0')],
  attendance: [ink(rect(160, 292, 22, 30) + circle(171, 303, 6) + 'M171 299v4l3 2')],
  intercom: [ink(rect(250, 292, 14, 22) + circle(257, 300, 3) + 'M270 296q6 6 0 12M276 292q10 10 0 20'), ink(rect(330, 150, 12, 16) + 'M346 152q5 6 0 12')],
  bms: [ink(rect(420, 236, 76, 52)), ink('M432 252l8 8M440 252l-8 8M436 248v16M462 248a6 6 0 0 1 6 10v4h-6v-4a6 6 0 0 1 0-10ZM484 248l-4 8h6l-4 8'), txt(458, 304, 'BMS', 7), dash('M420 262H400')],
};

export function ItPlan({ active, order, accent, label }: PlanProps) {
  return (
    <LayeredDrawing
      layers={IT}
      order={order}
      active={active}
      accent={accent}
      label={label}
      base={
        <>
          <path d={rect(20, 30, 380, 300)} />
          <path d="M20 180H140M170 180H400M200 30V150M200 210V330M300 180V330M300 30V90M300 120V180" />
          <path d="M190 330h30" stroke="rgba(255,255,255,0.4)" />
          <path d={rect(412, 30, 98, 300)} strokeDasharray="2 6" />
        </>
      }
    />
  );
}

/* ================================================================== 7. Management
   An organisation chart that builds box by box and turns into procedures, numbers and systems. */
const box = (cx: number, y: number, w = 64, h = 26) => rect(cx - w / 2, y, w, h);
const MANAGEMENT: LayerMap = {
  org: [
    ink(box(260, 20, 80, 30)),
    ink('M260 50V64M120 64H400M120 64V76M260 64V76M400 64V76'),
    ink(box(120, 76) + box(260, 76) + box(400, 76)),
    ink('M120 102V112M80 112H160M80 112V120M160 112V120M260 102V120M400 102V112M360 112H440M360 112V120M440 112V120'),
    ink(box(80, 120, 52, 22) + box(160, 120, 52, 22) + box(260, 120, 52, 22) + box(360, 120, 52, 22) + box(440, 120, 52, 22)),
  ],
  jd: [ink('M64 128h32M64 134h20M144 128h32M144 134h20M244 128h32M244 134h20M344 128h32M344 134h20M424 128h32M424 134h20'), ink('M240 30h40M240 38h28M100 84h40M240 84h40M380 84h40')],
  authority: [ink('M20 24V146'), ink('M14 35h12M14 89h12M14 131h12'), txt(30, 38, 'L1', 8, 'start'), txt(30, 92, 'L2', 8, 'start'), txt(30, 116, 'L3', 8, 'start'), ink('M300 46q6-8 10 0t10 0')],
  sop: [
    ink(rrect(30, 196, 60, 26, 13)),
    ink(arrow(90, 209, 118, 209, 4)),
    ink(rect(118, 196, 70, 26)),
    ink(arrow(188, 209, 214, 209, 4)),
    ink('M244 190L274 209L244 228L214 209Z'),
    ink(arrow(274, 209, 302, 209, 4) + arrow(244, 228, 244, 254, 4)),
    ink(rect(302, 196, 70, 26) + rect(214, 254, 60, 24)),
    txt(60, 213, 'START', 7),
    txt(153, 213, 'SOP', 8),
    txt(244, 212, '?', 9),
  ],
  finance: [ink(rect(394, 182, 40, 50) + rect(400, 188, 28, 10) + 'M402 206h4M412 206h4M422 206h4M402 216h4M412 216h4M422 216h4'), txt(414, 244, 'FIN', 7)],
  purchasing: [ink('M446 190h8l8 28h30l6-20h-40M466 226a4 4 0 1 0 0.1 0M488 226a4 4 0 1 0 0.1 0'), txt(472, 244, 'PUR', 7)],
  hr: [ink(rect(320, 236, 52, 34) + circle(336, 250, 6) + 'M328 264q8-10 16 0M350 246h16M350 254h12'), txt(346, 282, 'HR', 7)],
  kpi: [ink('M30 376a40 40 0 0 1 80 0'), ink('M70 376l22-24'), ink('M36 370l6 2M104 370l-6 2M70 336v6'), txt(70, 398, 'KPI', 8)],
  reports: [ink(rect(140, 320, 64, 72)), ink('M152 380V362M164 380V352M176 380V344M188 380V336'), txt(172, 410, 'REPORT', 7)],
  appraisal: [ink('M240 352l5 10h11l-9 7 3 11-10-6-10 6 3-11-9-7h11ZM280 352l5 10h11l-9 7 3 11-10-6-10 6 3-11-9-7h11Z'), txt(262, 404, 'REVIEW', 7)],
  erp: [ink(circle(380, 360, 26) + circle(380, 360, 10)), ink('M380 334V300M406 360H450'), flow('M380 330V304M410 360H446'), txt(380, 404, 'ERP', 8)],
  training: [ink(rect(450, 320, 54, 34) + 'M477 354v10M464 364h26M458 330h30M458 340h20')],
  support: [ink('M462 392a15 15 0 0 1 30 0M458 392h8v10h-8ZM488 392h8v10h-8Z')],
};

export function ManagementPlan({ active, order, accent, label }: PlanProps) {
  return (
    <LayeredDrawing
      layers={MANAGEMENT}
      order={order}
      active={active}
      accent={accent}
      label={label}
      base={
        <>
          {frame}
          <path d="M18 166H502M18 300H502" strokeDasharray="2 6" />
        </>
      }
    />
  );
}

/* ================================================================== 8. Cleaning & staffing
   Places being cleaned on top, the staff roles below, and the paperwork KST takes care of. */
const person = (cx: number, y: number) => circle(cx, y + 10, 8) + `M${cx - 14} ${y + 38}q14-22 28 0`;
const card = (x: number) => rrect(x, 250, 86, 66, 6);
const spark = (x: number, y: number, s = 6) => `M${x} ${y - s}V${y + s}M${x - s} ${y}H${x + s}`;

const CLEANING: LayerMap = {
  daily: [ink('M24 120h80M34 120v26M94 120v26' + rect(48, 98, 30, 22)), ink(spark(98, 92) + spark(112, 106, 4))],
  hospital: [ink('M128 126h76M136 126v18M196 126v18M128 116h18v10' + rect(150, 114, 50, 12)), ink(circle(184, 84, 10) + 'M178 84h12M184 78v12'), ink('M214 92l8-4M214 100h9M214 108l8 4')],
  deep: [ink('M244 140l14-24l14 24ZM270 140l10-16l12 16'), dash('M244 104a3 3 0 1 0 0.1 0M262 96a3 3 0 1 0 0.1 0M282 106a3 3 0 1 0 0.1 0M296 92a3 3 0 1 0 0.1 0'), ink(spark(300, 124, 5))],
  glass: [ink(rect(326, 20, 60, 128) + 'M326 52H386M326 84H386M326 116H386M356 20V148'), ink('M396 14V60M396 60H344V72H396Z'), ink('M352 72v-6')],
  carpet: [ink(rect(410, 116, 90, 26) + 'M410 116l10-14h70l10 14'), ink('M430 96l-3 6a3 3 0 1 0 6 0ZM452 90l-3 6a3 3 0 1 0 6 0ZM474 96l-3 6a3 3 0 1 0 6 0Z')],
  kitchen: [ink('M24 194h70l-12 18H36Z'), ink('M50 194v-24M68 194v-24'), ink('M34 222h56v18H34Z' + 'M44 240v-6M80 240v-6'), ink(spark(104, 214, 5))],
  cleaners: [ink(card(14) + person(57, 258)), txt(57, 308, 'CLEANING', 7)],
  security: [ink(card(110) + person(153, 258) + 'M146 270l7-4l7 4'), txt(153, 308, 'SECURITY', 7)],
  chefs: [ink(card(206) + person(249, 262) + 'M240 262q-6-12 9-11q15-1 9 11Z'), txt(249, 308, 'CHEF', 7)],
  tech: [ink(card(302) + person(345, 258) + 'M356 276l8 8'), txt(345, 308, 'TECHNICAL', 7)],
  housekeeping: [ink(card(398) + person(441, 258) + 'M430 290h22'), txt(441, 308, 'HOTEL', 7)],
  hiring: [ink(circle(44, 360, 16) + 'M56 372l14 14'), ink(circle(44, 356, 5) + 'M36 368q8-8 16 0')],
  visa: [ink(rrect(110, 336, 40, 54, 4) + circle(130, 356, 8) + 'M118 376h24M118 382h16'), ink(circle(152, 386, 11) + check(147, 386, 0.6))],
  housing: [ink('M200 360l20-16l20 16v30h-40ZM212 390v-14h16v14'), ink(rect(250, 364, 40, 22) + circle(258, 390, 4) + circle(282, 390, 4))],
  payroll: [ink(rect(312, 352, 56, 30) + circle(340, 367, 8)), ink('M384 348l-10 5v8c0 8 10 12 10 12s10-4 10-12v-8Z')],
  replace: [ink(person(428, 340) + person(484, 340)), ink('M444 346h24M462 340l6 6-6 6M468 372h-24M450 366l-6 6 6 6')],
};

export function CleaningPlan({ active, order, accent, label }: PlanProps) {
  return (
    <LayeredDrawing
      layers={CLEANING}
      order={order}
      active={active}
      accent={accent}
      label={label}
      base={
        <>
          {frame}
          <path d="M18 160H318M18 244H502M18 326H502" strokeDasharray="2 6" />
          {/* dust before cleaning, wiped away as the list goes on */}
          <path d="M60 150h2M140 152h2M220 148h2M300 152h2M440 150h2M480 154h2" strokeWidth={3} />
        </>
      }
    />
  );
}
