import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { circle, fan, head, rect, rrect } from '@/components/drawings/kit';

/*
  The animated drawing at the top of each service page (one per field).
  Everything is plain SVG + CSS: lines draw themselves on load, then air, power or data keeps moving.
  With "reduce motion" switched on, each drawing simply shows its finished state.
*/

const W = 'rgba(255,255,255,0.78)';
const FAINT = 'rgba(255,255,255,0.22)';

const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Art({ label, children, defs }: { label: string; children: ReactNode; defs?: ReactNode }) {
  return (
    <svg viewBox="0 0 480 400" role="img" aria-label={label} className="block h-auto w-full" fill="none" strokeLinecap="round" strokeLinejoin="round" direction="ltr">
      {defs && <defs>{defs}</defs>}
      {children}
    </svg>
  );
}

function Draw({ d: path, delay = 0, stroke = W, width = 1.6, className = '' }: { d: string; delay?: number; stroke?: string; width?: number; className?: string }) {
  return <path d={path} pathLength={1} className={`draw ${className}`} style={d(delay)} stroke={stroke} strokeWidth={width} />;
}

/** Counts up slowly forever (an energy meter); shows a fixed value when motion is reduced. */
function useCounter(step: number, every: number, start = 0) {
  const [v, setV] = useState(start);
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setV((x) => (x + step > 999 ? 0 : x + step)), every);
    return () => window.clearInterval(id);
  }, [step, every]);
  return v;
}

/* ------------------------------------------------------------------ 1. HVAC: a duct draws, air runs through it, hot turns to cold as you scroll */
export function HvacHero({ accent, label }: { accent: string; label: string }) {
  const hot = '#F08A3C';
  const air = 'M120 150H430M300 150V230M380 150V230M200 150V230';
  return (
    <Art label={label}>
      <Draw d={rect(30, 110, 90, 80)} delay={0.1} />
      <g className="spin" style={{ transformOrigin: '75px 150px' }}>
        <path d={fan(75, 150, 22)} stroke={W} strokeWidth={1.6} className="draw" pathLength={1} style={d(0.3)} />
      </g>
      <Draw d="M38 118v64M46 118v64" delay={0.3} stroke={FAINT} />
      <Draw d={'M120 134H446V166H396V230M364 230V166H316V230M284 230V166H216V230M184 230V166H120'} delay={0.5} />
      <Draw d={rect(176, 230, 48, 8) + rect(276, 230, 48, 8) + rect(356, 230, 48, 8)} delay={1.1} />
      {/* air: warm colour fades into the cool one as the page scrolls (--p on the hero) */}
      <g style={{ opacity: 'calc(1 - var(--p, 0))' }}>
        <path d={air} className="flow" stroke={hot} strokeWidth={2.4} />
      </g>
      <g style={{ opacity: 'var(--p, 0)' }}>
        <path d={air} className="flow" stroke={accent} strokeWidth={2.4} />
      </g>
      {[200, 300, 380].map((x, i) => (
        <g key={x} stroke={accent} strokeWidth={1.8}>
          {[-12, 0, 12].map((dx) => (
            <path key={dx} d={`M${x + dx} 248v18` + head(x + dx, 266, 'down', 4)} className="drop" style={d(i * 0.3 + (dx + 12) / 40)} />
          ))}
        </g>
      ))}
      {/* room outline and thermometer */}
      <Draw d="M20 300H460" delay={1.3} stroke={FAINT} />
      <Draw d={rrect(444, 200, 18, 80, 9) + circle(453, 290, 14)} delay={1.2} />
      <g style={{ transformOrigin: '453px 290px', transform: 'scaleY(calc(1 - var(--p, 0) * 0.55))', transition: 'transform 0.2s linear' }}>
        <path d="M453 288V212" stroke={hot} strokeWidth={6} style={{ opacity: 'calc(1 - var(--p, 0))' }} />
        <path d="M453 288V212" stroke={accent} strokeWidth={6} style={{ opacity: 'var(--p, 0)' }} />
      </g>
      <text x={453} y={334} fill={hot} fontSize={16} fontWeight={800} fontFamily="Manrope, sans-serif" textAnchor="middle" style={{ opacity: 'calc(1 - var(--p, 0))' }}>
        34°C
      </text>
      <text x={453} y={334} fill={accent} fontSize={16} fontWeight={800} fontFamily="Manrope, sans-serif" textAnchor="middle" style={{ opacity: 'var(--p, 0)' }}>
        22°C
      </text>
      <text x={30} y={98} fill={FAINT} fontSize={10} fontWeight={700} fontFamily="Manrope, sans-serif" letterSpacing="0.08em">
        AHU · SUPPLY AIR
      </text>
      <Draw d="M60 340h120M60 352h80M250 340h120" delay={1.6} stroke={FAINT} />
    </Art>
  );
}

/* ------------------------------------------------------------------ 2. Construction: the building rises floor by floor, from line drawing to solid */
export function ConstructionHero({ accent, label }: { accent: string; label: string }) {
  const floors = [300, 240, 180, 120];
  return (
    <Art label={label}>
      <Draw d="M10 360H470" stroke={FAINT} />
      <path d={Array.from({ length: 28 }, (_, i) => `M${16 + i * 16} 362l-7 9`).join('')} stroke={FAINT} strokeWidth={1.2} />
      {floors.map((y, i) => (
        <g key={y}>
          <path d={rect(110, y, 240, 60)} fill={accent} fillOpacity={0.14} className="fade-in" style={d(0.6 + i * 0.55 + 0.4)} stroke="none" />
          <Draw d={`M110 ${y + 60}V${y}H350V${y + 60}`} delay={0.6 + i * 0.55} stroke={i === floors.length - 1 ? accent : W} width={1.8} />
          <Draw d={`M190 ${y + 60}V${y}M270 ${y + 60}V${y}`} delay={0.8 + i * 0.55} stroke={FAINT} />
          {[130, 210, 290].map((x) => (
            <path key={x} d={rect(x, y + 16, 40, 28)} stroke={W} strokeWidth={1.2} className="pop" style={d(1 + i * 0.55)} />
          ))}
        </g>
      ))}
      <Draw d={rect(100, 360, 30, 12) + rect(330, 360, 30, 12)} delay={0.3} />
      {/* crane */}
      <Draw d="M404 360V40M416 360V40M380 40H470M410 26L380 40M410 26L470 40" delay={0.4} stroke={FAINT} />
      <g className="sweep" style={{ transformOrigin: '440px 40px' }}>
        <path d="M440 40V96M430 96h20v12h-20Z" stroke={accent} strokeWidth={1.6} />
      </g>
      {/* dimension line */}
      <Draw d="M70 120V360M64 120H76M64 360H76M64 180H76M64 240H76M64 300H76" delay={0.2} stroke={FAINT} />
    </Art>
  );
}

/* ------------------------------------------------------------------ 3. Electrical: sun over the panels, power runs down the single-line diagram */
export function ElectricalHero({ accent, accent2, label }: { accent: string; accent2: string; label: string }) {
  const kwh = useCounter(0.1, 140, 12.4);
  return (
    <Art label={label}>
      {/* the sun travels across the sky above the panels */}
      <g className="sun-arc" style={{ transformOrigin: '330px 190px' }}>
        <g stroke={accent} strokeWidth={1.8}>
          <path d={circle(330, 40, 14)} />
          <path d="M330 18v-6M330 62v6M308 40h-6M352 40h6M314 24l-4-4M346 56l4 4M346 24l4-4M314 56l-4 4" />
        </g>
      </g>
      <Draw d="M260 130L284 90H420L396 130Z" stroke={accent2} width={1.8} delay={0.2} />
      <Draw d="M272 110H408M306 90L282 130M352 90L328 130M384 90L360 130" stroke={accent2} delay={0.4} />
      <Draw d={rect(310, 160, 50, 34)} delay={0.6} />
      <text x={335} y={182} fill={W} fontSize={10} fontWeight={800} textAnchor="middle" fontFamily="Manrope, sans-serif">INV</text>
      {/* grid and generator */}
      <Draw d="M40 70L56 140M72 70L56 140M44 92H68M48 108H64" delay={0.3} />
      <Draw d={rect(110, 100, 56, 40) + circle(138, 120, 11)} delay={0.4} />
      <Draw d={rect(180, 210, 64, 34)} delay={0.8} />
      <text x={212} y={232} fill={W} fontSize={11} fontWeight={800} textAnchor="middle" fontFamily="Manrope, sans-serif">ATS</text>
      <Draw d={rect(180, 280, 64, 34)} delay={1} />
      <text x={212} y={302} fill={W} fontSize={11} fontWeight={800} textAnchor="middle" fontFamily="Manrope, sans-serif">MDB</text>
      <Draw d="M56 140V196H196V210M138 140V196M335 194V227H244M212 244V280M212 314V336M100 336H340M100 336V350M212 336V350M340 336V350" delay={0.9} stroke={FAINT} />
      {/* power flowing */}
      <path d="M56 142V196H194M138 142V194M335 196V227H246M212 246V278M212 316V334H102M212 334H338" className="flow" stroke={accent} strokeWidth={2.2} />
      <path d="M335 132V158" className="flow" stroke={accent2} strokeWidth={2.2} />
      {/* lamps light up */}
      {[100, 212, 340].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={364} r={18} fill={accent} className="glow" style={d(i * 0.4)} opacity={0.35} />
          <path d={circle(x, 364, 10) + `M${x - 6} ${358}l12 12M${x + 6} ${358}l-12 12`} stroke={W} strokeWidth={1.5} />
        </g>
      ))}
      {/* energy meter */}
      <path d={rrect(388, 214, 76, 40, 6)} stroke={accent2} strokeWidth={1.5} />
      <text x={426} y={240} fill={accent2} fontSize={15} fontWeight={800} textAnchor="middle" fontFamily="Manrope, sans-serif" className="ltr-isolate">
        {kwh.toFixed(1)}
      </text>
      <text x={426} y={270} fill={FAINT} fontSize={9} fontWeight={700} textAnchor="middle" fontFamily="Manrope, sans-serif" letterSpacing="0.08em">
        kWh
      </text>
      <path d="M360 194V234H388" stroke={FAINT} strokeWidth={1.2} />
    </Art>
  );
}

/* ------------------------------------------------------------------ 4. Operating room: plan from above, laminar air on the table, pressure zones */
export function OperatingRoomHero({ accent, label }: { accent: string; label: string }) {
  return (
    <Art label={label}>
      <path d={rrect(120, 60, 240, 230, 18)} fill={accent} fillOpacity={0.12} className="glow" stroke="none" />
      <Draw d={rrect(120, 60, 240, 230, 18)} width={1.8} />
      <Draw d={'M120 290V360H360V290M200 290h80'} delay={0.4} stroke={FAINT} />
      <Draw d={rect(370, 60, 96, 110)} delay={0.6} stroke={FAINT} />
      <path d={rect(370, 60, 96, 110)} fill="#E5484D" fillOpacity={0.1} stroke="none" className="fade-in" style={d(1.4)} />
      <Draw d={rrect(222, 130, 36, 90, 5)} delay={0.8} />
      <path d={rect(180, 105, 120, 140)} stroke={accent} strokeWidth={1.4} strokeDasharray="5 6" className="fade-in" style={d(0.9)} />
      {[0, 1, 2].map((i) =>
        [0, 1, 2, 3].map((j) => (
          <path key={`${i}-${j}`} d={`M${200 + i * 40} ${112 + j * 32}v14` + head(200 + i * 40, 126 + j * 32, 'down', 4)} stroke={accent} strokeWidth={1.6} className="drop" style={d((i + j) * 0.25)} />
        ))
      )}
      <text x={150} y={92} fill={accent} fontSize={16} fontWeight={800} fontFamily="Manrope, sans-serif">+ +</text>
      <text x={258} y={340} fill={W} fontSize={14} fontWeight={800} fontFamily="Manrope, sans-serif">+</text>
      <text x={418} y={124} fill="#ff8f92" fontSize={22} fontWeight={800} textAnchor="middle" fontFamily="Manrope, sans-serif">−</text>
      {/* air leaving the clean room through the door, never coming in */}
      <path d="M240 280V320" className="flow" stroke={accent} strokeWidth={2} />
      <path d={head(240, 324, 'down', 5)} stroke={accent} strokeWidth={2} />
      <path d="M352 150H374" className="flow" stroke="#ff8f92" strokeWidth={2} />
      <path d={head(378, 150, 'right', 4)} stroke="#ff8f92" strokeWidth={2} />
      <text x={120} y={384} fill={FAINT} fontSize={10} fontWeight={700} fontFamily="Manrope, sans-serif" letterSpacing="0.08em">OR · LAMINAR AIRFLOW · ISO 14644</text>
    </Art>
  );
}

/* ------------------------------------------------------------------ 5. Medical equipment: a heartbeat runs across and becomes a monitor */
export function MedicalHero({ accent, label }: { accent: string; label: string }) {
  const ecg = 'M0 210H90l10-30l14 64l12-80l12 64l8-18H210l10-30l14 64l12-80l12 64l8-18H330';
  return (
    <Art label={label}>
      <path d={ecg} stroke={FAINT} strokeWidth={1.4} />
      <path d={ecg} pathLength={1} className="ecg" stroke={accent} strokeWidth={2.6} />
      <Draw d={rrect(330, 140, 132, 104, 8)} delay={0.4} width={1.8} />
      <Draw d={rect(342, 152, 108, 72)} delay={0.7} stroke={FAINT} />
      <path d="M346 196h22l6-16l8 30l7-24l5 10h52" pathLength={1} className="ecg" stroke={accent} strokeWidth={2} style={d(0.6)} />
      <Draw d="M396 244V268M370 268h52" delay={0.9} />
      <text x={446} y={170} fill={accent} fontSize={14} fontWeight={800} textAnchor="end" fontFamily="Manrope, sans-serif">72</text>
      {/* other devices, drawn in */}
      <Draw d={rect(40, 290, 46, 70) + circle(63, 312, 10) + 'M50 340h26M50 350h26'} delay={1.1} />
      <Draw d={rect(120, 300, 70, 60) + 'M130 312h50M130 324h30' + circle(170, 342, 8)} delay={1.3} />
      <Draw d={'M226 360h70M240 360v-30h40v30M248 330v-12h24v12'} delay={1.5} />
      <Draw d={'M330 360a26 26 0 0 1 52 0M356 360l14-16'} delay={1.7} />
      <text x={40} y={392} fill={FAINT} fontSize={10} fontWeight={700} fontFamily="Manrope, sans-serif" letterSpacing="0.08em">SUPPLY · INSTALL · TRAIN · MAINTAIN</text>
    </Art>
  );
}

/* ------------------------------------------------------------------ 6. IT: network points link up one by one, cameras watch the plan */
export function ItHero({ accent, label }: { accent: string; label: string }) {
  const nodes: [number, number][] = [
    [90, 90], [220, 70], [360, 100], [140, 200], [270, 190], [400, 230], [100, 320], [240, 310], [380, 330],
  ];
  const links: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [6, 7], [7, 8]];
  return (
    <Art label={label}>
      <path d={rect(30, 30, 420, 340) + 'M30 150H200M240 150H450M30 260H450M180 30V150M310 260V370'} stroke={FAINT} strokeWidth={1.2} />
      {links.map(([a, b], i) => (
        <Draw key={i} d={`M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}`} delay={0.3 + i * 0.18} stroke={accent} width={1.6} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i} className="pop" style={d(0.15 + i * 0.12)}>
          <circle cx={x} cy={y} r={9} fill="hsl(212 58% 9%)" stroke={W} strokeWidth={1.6} />
          <circle cx={x} cy={y} r={3} fill={accent} />
        </g>
      ))}
      {/* cameras sweeping their field of view */}
      {(
        [
          [40, 40, 45],
          [440, 40, 135],
          [40, 360, -45],
        ] as [number, number, number][]
      ).map(([x, y, a], i) => (
        <g key={i} className="sweep" style={{ transformOrigin: `${x}px ${y}px`, ...d(i * 1.2) }}>
          <path
            d={`M${x} ${y}L${x + 120 * Math.cos(((a - 22) * Math.PI) / 180)} ${y + 120 * Math.sin(((a - 22) * Math.PI) / 180)}L${x + 120 * Math.cos(((a + 22) * Math.PI) / 180)} ${y + 120 * Math.sin(((a + 22) * Math.PI) / 180)}Z`}
            fill={accent}
            fillOpacity={0.16}
            stroke={accent}
            strokeOpacity={0.5}
            strokeWidth={1}
          />
        </g>
      ))}
      {[[40, 40], [440, 40], [40, 360]].map(([x, y]) => (
        <path key={`${x}${y}`} d={circle(x, y, 6)} fill={accent} stroke="none" />
      ))}
    </Art>
  );
}

/* ------------------------------------------------------------------ 7. Management: the org chart builds box by box, then turns into a process flow */
export function ManagementHero({ accent, label }: { accent: string; label: string }) {
  const level2 = [100, 240, 380];
  const level3 = [60, 140, 200, 280, 340, 420];
  return (
    <Art label={label}>
      <g className="pop" style={d(0.1)}>
        <path d={rect(190, 30, 100, 34)} fill={accent} fillOpacity={0.18} stroke={accent} strokeWidth={1.8} />
      </g>
      <Draw d="M240 64V80M100 80H380M100 80V92M240 80V92M380 80V92" delay={0.4} stroke={FAINT} />
      {level2.map((x, i) => (
        <g key={x} className="pop" style={d(0.6 + i * 0.15)}>
          <path d={rect(x - 40, 92, 80, 30)} stroke={W} strokeWidth={1.6} />
        </g>
      ))}
      <Draw d="M100 122V134M60 134H140M60 134V146M140 134V146M240 122V134M200 134H280M200 134V146M280 134V146M380 122V134M340 134H420M340 134V146M420 134V146" delay={1.1} stroke={FAINT} />
      {level3.map((x, i) => (
        <g key={x} className="pop" style={d(1.3 + i * 0.1)}>
          <path d={rect(x - 28, 146, 56, 24)} stroke={W} strokeWidth={1.3} />
        </g>
      ))}
      {/* ... which becomes the way work flows */}
      <Draw d="M240 190V226" delay={2.1} stroke={accent} />
      {[60, 170, 280, 390].map((x, i) => (
        <g key={x} className="pop" style={d(2.3 + i * 0.25)}>
          <path d={i === 2 ? `M${x} 232L${x + 36} 256L${x} 280L${x - 36} 256Z` : rrect(x - 40, 238, 80, 36, i === 0 ? 18 : 3)} stroke={i === 3 ? accent : W} strokeWidth={1.6} />
        </g>
      ))}
      <Draw d="M100 256H130M210 256H244M316 256H350" delay={2.6} stroke={accent} />
      <path d={head(130, 256, 'right', 4) + head(244, 256, 'right', 4) + head(350, 256, 'right', 4)} stroke={accent} strokeWidth={1.6} className="fade-in" style={d(3)} />
      {/* KPI bars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${120 + i * 56} 370V${350 - i * 12}`} stroke={i === 4 ? accent : W} strokeWidth={10} strokeLinecap="butt" className="pop" style={d(3.2 + i * 0.12)} />
      ))}
      <Draw d="M100 370H400" delay={3.1} stroke={FAINT} />
    </Art>
  );
}

/* ------------------------------------------------------------------ 8. Cleaning & staffing: a dusty surface is wiped clean, then the team appears */
export function CleaningHero({ accent, label }: { accent: string; label: string }) {
  const specks = Array.from({ length: 46 }, (_, i) => [40 + ((i * 97) % 400), 50 + ((i * 53) % 150)] as [number, number]);
  return (
    <Art
      label={label}
      defs={
        <mask id="kst-wipe-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="480" height="400">
          <rect x="30" y="30" width="420" height="190" fill="white" className="wipe-mask" />
        </mask>
      }
    >
      <path d={rrect(30, 30, 420, 190, 8)} stroke={W} strokeWidth={1.6} />
      {/* clean surface underneath */}
      {[[110, 90], [250, 130], [380, 80], [320, 180]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 10}V${y + 10}M${x - 10} ${y}H${x + 10}M${x - 5} ${y - 5}l10 10M${x + 5} ${y - 5}l-10 10`} stroke={accent} strokeWidth={1.6} className="glow" style={d(1 + i * 0.4)} />
      ))}
      {/* dust, wiped away by the squeegee */}
      <g mask="url(#kst-wipe-mask)">
        <path d={rrect(31, 31, 418, 188, 8)} fill="#9aa4ae" fillOpacity={0.28} stroke="none" />
        {specks.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.6} fill="rgba(255,255,255,0.45)" />
        ))}
      </g>
      <g className="wipe-bar">
        <path d="M30 24V226" stroke={accent} strokeWidth={4} />
        <path d="M30 125h-18" stroke={W} strokeWidth={3} />
      </g>
      {/* the team */}
      {['CLEANING', 'SECURITY', 'CHEF', 'HOTEL'].map((role, i) => {
        const x = 30 + i * 108;
        return (
          <g key={role} className="pop" style={d(2.6 + i * 0.25)}>
            <path d={rrect(x, 250, 96, 110, 8)} stroke={i === 0 ? accent : W} strokeWidth={1.5} />
            <path d={circle(x + 48, 284, 13) + `M${x + 24} ${334}q24-34 48 0`} stroke={W} strokeWidth={1.5} />
            <text x={x + 48} y={352} fill={i === 0 ? accent : W} fontSize={8} fontWeight={800} textAnchor="middle" fontFamily="Manrope, sans-serif" letterSpacing="0.06em">
              {role}
            </text>
          </g>
        );
      })}
    </Art>
  );
}
