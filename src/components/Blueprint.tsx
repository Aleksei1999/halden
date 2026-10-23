'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

type Pt = [number, number];

type Part = {
  id: string;
  // контур объекта и видимые рёбра в пикселях кадра 1920×1080
  outline: Pt[];
  edges?: Pt[][];
  // размерные линии: от, до, вынос перпендикулярно и подпись
  dims: { from: Pt; to: Pt; offset: number; text: string }[];
  // откуда тянется выноска к подписи
  anchor: Pt;
  anchorMobile?: Pt;
  label: { at: Pt; align: 'start' | 'end' };
  // на телефоне виден только центр кадра, подписи ставим ближе к середине; null — не показываем
  labelMobile: { at: Pt; align: 'start' | 'end' } | null;
  title: string;
  lines: string[];
};

// кадр 094.webp: плита, арматурный каркас и пилястра висят над башней
const PARTS: Part[] = [
  {
    id: 'slab',
    outline: [
      [850, 400],
      [1130, 440],
      [1140, 470],
      [1040, 547],
      [782, 495],
      [782, 465],
    ],
    edges: [
      [
        [782, 482],
        [1140, 467],
      ],
    ],
    dims: [
      { from: [782, 495], to: [1040, 547], offset: 38, text: '24.0 m' },
      { from: [1040, 547], to: [1140, 470], offset: 38, text: '18.0 m' },
    ],
    anchor: [782, 480],
    label: { at: [300, 520], align: 'start' },
    labelMobile: { at: [790, 640], align: 'start' },
    title: 'Floor plate, level 19',
    lines: ['24.0 × 18.0 m, 350 mm thick', 'Post-tensioned concrete C40/50'],
  },
  {
    id: 'cage',
    outline: [
      [922, 122],
      [978, 116],
      [984, 262],
      [926, 266],
    ],
    dims: [{ from: [926, 266], to: [922, 122], offset: 88, text: '7.2 m' }],
    anchor: [922, 170],
    anchorMobile: [940, 265],
    label: { at: [300, 150], align: 'start' },
    labelMobile: { at: [722, 326], align: 'start' },
    title: 'Column cage',
    lines: ['12 bars, Ø32 mm', 'B500B reinforcing steel'],
  },
  {
    id: 'pilaster',
    outline: [
      [1070, 218],
      [1115, 210],
      [1133, 368],
      [1088, 386],
    ],
    dims: [{ from: [1115, 210], to: [1133, 368], offset: -30, text: '9.6 m' }],
    anchor: [1133, 300],
    label: { at: [1500, 300], align: 'start' },
    labelMobile: null,
    title: 'Pilaster',
    lines: ['9.6 m, cut from one block', 'Oolitic limestone, hand-dressed'],
  },
];

const STROKE = 'rgb(226 238 255)';
const path = (pts: Pt[], close = false) =>
  `M${pts.map((p) => p.join(' ')).join(' L')}${close ? ' Z' : ''}`;

function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return narrow;
}

// чертёж поверх стоп-кадра: viewBox в пикселях кадра + slice = то же вписывание, что у canvas (cover)
export function Blueprint({
  progress,
  range,
}: {
  progress: MotionValue<number>;
  // отрезок прокрутки, на котором кадр стоит
  range: [number, number];
}) {
  const narrow = useNarrow();
  const [a, b] = range;
  const span = b - a;
  const fade = useTransform(progress, [a, a + span * 0.08, b - span * 0.12, b], [0, 1, 1, 0]);
  const grid = useTransform(progress, [a, a + span * 0.2], [0, 1]);
  const parts = narrow ? PARTS.filter((p) => p.labelMobile) : PARTS;

  return (
    <motion.div style={{ opacity: fade }} className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[#0b1626]/45" />
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <pattern id="bp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke={STROKE} strokeWidth="0.6" />
          </pattern>
        </defs>
        <g opacity="0.12">
          <motion.rect width="1920" height="1080" fill="url(#bp-grid)" style={{ opacity: grid }} />
        </g>
        {parts.map((p, i) => (
          <PartDrawing
            key={p.id}
            part={p}
            narrow={narrow}
            progress={progress}
            // детали прорисовываются по очереди
            start={a + span * (0.1 + i * 0.12)}
            len={span * 0.3}
          />
        ))}
      </svg>
    </motion.div>
  );
}

function PartDrawing({
  part,
  narrow,
  progress,
  start,
  len,
}: {
  part: Part;
  narrow: boolean;
  progress: MotionValue<number>;
  start: number;
  len: number;
}) {
  const outline = useTransform(progress, [start, start + len * 0.45], [0, 1]);
  const dims = useTransform(progress, [start + len * 0.3, start + len * 0.7], [0, 1]);
  const text = useTransform(progress, [start + len * 0.6, start + len], [0, 1]);
  const label = (narrow ? part.labelMobile : part.label)!;
  const anchor = (narrow && part.anchorMobile) || part.anchor;
  const [lx, ly] = label.at;
  // выноска: наклонная от объекта, дальше полка, над ней заголовок, под ней строки
  const shelf = (label.align === 'start' ? 1 : -1) * (narrow ? 250 : 280);
  // выноска приходит к ближнему к объекту концу полки и не режет текст
  const near = anchor[0] > lx ? Math.max(lx, lx + shelf) : Math.min(lx, lx + shelf);
  const far = near === lx ? lx + shelf : lx;
  const leader: Pt[] = [anchor, [near, ly], [far, ly]];

  return (
    <g fill="none" stroke={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <motion.path d={path(part.outline, true)} strokeWidth="2" style={{ pathLength: outline }} />
      {part.edges?.map((e, i) => (
        <motion.path
          key={i}
          d={path(e)}
          strokeWidth="1.2"
          strokeDasharray="6 5"
          style={{ opacity: outline }}
        />
      ))}
      <motion.g style={{ opacity: dims }}>
        {part.dims.map((d) => (
          <Dimension key={d.text} {...d} />
        ))}
        <path d={path(leader)} strokeWidth="1" />
        <circle cx={anchor[0]} cy={anchor[1]} r="3.5" fill={STROKE} stroke="none" />
      </motion.g>
      <motion.g style={{ opacity: text }} stroke="none" fill={STROKE} textAnchor={label.align}>
        <text
          x={lx + (label.align === 'start' ? 8 : -8)}
          y={ly - 12}
          fontSize={narrow ? 19 : 17}
          letterSpacing="0.14em"
          fontWeight={600}
          className="uppercase"
        >
          {part.title}
        </text>
        {part.lines.map((l, i) => (
          <text
            key={l}
            x={lx + (label.align === 'start' ? 8 : -8)}
            y={ly + 16 + i * (narrow ? 23 : 21)}
            fontSize={narrow ? 17 : 16}
            fillOpacity={0.82}
          >
            {l}
          </text>
        ))}
      </motion.g>
    </g>
  );
}

// размерная линия как на чертеже: выносные линии, засечки под 45° и число посередине
function Dimension({ from, to, offset, text }: { from: Pt; to: Pt; offset: number; text: string }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // нормаль влево от направления from→to, знак offset выбирает сторону
  const nx = -uy * offset;
  const ny = ux * offset;
  const a: Pt = [from[0] + nx, from[1] + ny];
  const b: Pt = [to[0] + nx, to[1] + ny];
  const tick = (p: Pt) => {
    const t = 7;
    return `M${p[0] - (ux + -uy) * t} ${p[1] - (uy + ux) * t} L${p[0] + (ux + -uy) * t} ${p[1] + (uy + ux) * t}`;
  };
  const sign = Math.sign(offset);
  const ext = (p: Pt): string =>
    `M${p[0] + -uy * 6 * sign} ${p[1] + ux * 6 * sign} L${p[0] + nx + -uy * 8 * sign} ${p[1] + ny + ux * 8 * sign}`;
  let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angle > 90) angle -= 180;
  if (angle < -90) angle += 180;
  const mx = (a[0] + b[0]) / 2 + -uy * 14 * sign;
  const my = (a[1] + b[1]) / 2 + ux * 14 * sign;
  return (
    <g>
      <path d={ext(from)} strokeWidth="0.9" strokeDasharray="3 4" />
      <path d={ext(to)} strokeWidth="0.9" strokeDasharray="3 4" />
      <path d={path([a, b])} strokeWidth="1.2" />
      <path d={tick(a)} strokeWidth="1.6" />
      <path d={tick(b)} strokeWidth="1.6" />
      <text
        x={mx}
        y={my}
        transform={`rotate(${angle} ${mx} ${my})`}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fill={STROKE}
        stroke="none"
        className="tabular-nums"
      >
        {text}
      </text>
    </g>
  );
}
