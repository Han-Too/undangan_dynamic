import { patterns } from './patterns.js';

/**
 * Background cover. Tiap entri menerima warna efektif tema { primary, secondary, bg, text }
 * dan mengembalikan nilai CSS `background`, sehingga selalu serasi dengan tema & warna pilihan user.
 * 'theme' = latar bawaan tema (pola + partikel dari BackgroundFx).
 */

/** Hex + alpha → #rrggbbaa (dipakai di dalam SVG pola). */
const alpha = (hex, a) =>
  /^#[0-9a-f]{6}$/i.test(hex) ? hex + Math.round(a * 255).toString(16).padStart(2, '0') : hex;
const mix = (a, b, pct) => `color-mix(in srgb, ${a} ${pct}%, ${b})`;
const svgUrl = (svg) => `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

const noise = (freq, opacity) =>
  svgUrl(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${opacity} 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  );

/** Urat marmer berwarna primary. */
const marble = (hex) => {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex) ?? [0, 'b0', '8d', '57'];
  const [r, g, b] = m.slice(1).map((h) => (parseInt(h, 16) / 255).toFixed(3));
  return svgUrl(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='m'><feTurbulence type='turbulence' baseFrequency='.006 .018' numOctaves='5' seed='7'/><feColorMatrix values='0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  -2.4 0 0 0 1.25'/></filter><rect width='100%' height='100%' filter='url(#m)' opacity='.35'/></svg>`,
  );
};

const pattern = (id, size, op) => (c) => `${patterns[id](alpha(c.primary, op))} 0 0 / ${size}px, ${c.bg}`;

export const coverBackgrounds = [
  { id: 'theme', name: 'Ikuti tema' },
  { id: 'plain', name: 'Polos', css: (c) => c.bg },
  { id: 'soft', name: 'Gradasi lembut', css: (c) => `linear-gradient(180deg, ${c.bg} 0%, ${mix(c.primary, c.bg, 18)} 100%)` },
  { id: 'diagonal', name: 'Gradasi diagonal', css: (c) => `linear-gradient(135deg, ${mix(c.primary, c.bg, 26)} 0%, ${c.bg} 50%, ${mix(c.secondary, c.bg, 22)} 100%)` },
  { id: 'glow', name: 'Cahaya tengah', css: (c) => `radial-gradient(circle at 50% 45%, ${mix(c.primary, c.bg, 30)} 0%, ${c.bg} 62%)` },
  { id: 'dusk', name: 'Senja', css: (c) => `linear-gradient(180deg, ${mix(c.secondary, c.bg, 38)} 0%, ${mix(c.primary, c.bg, 22)} 45%, ${c.bg} 100%)` },
  {
    id: 'aurora',
    name: 'Aurora',
    css: (c) =>
      `radial-gradient(60% 45% at 15% 15%, ${mix(c.primary, 'transparent', 38)} 0%, transparent 70%), radial-gradient(55% 40% at 90% 30%, ${mix(c.secondary, 'transparent', 32)} 0%, transparent 70%), radial-gradient(70% 50% at 50% 100%, ${mix(c.primary, 'transparent', 30)} 0%, transparent 70%), ${c.bg}`,
  },
  {
    id: 'bokeh',
    name: 'Bokeh',
    css: (c) =>
      [[18, 20, 60], [80, 14, 40], [70, 70, 80], [12, 82, 50], [45, 50, 30], [92, 88, 36]]
        .map(([x, y, s], i) => `radial-gradient(${s}px ${s}px at ${x}% ${y}%, ${mix(i % 2 ? c.secondary : c.primary, 'transparent', 35)} 0%, transparent 100%)`)
        .join(', ') + `, ${c.bg}`,
  },
  { id: 'vignette', name: 'Vignette', css: (c) => `radial-gradient(ellipse at 50% 42%, ${c.bg} 30%, ${mix(c.text, c.bg, 30)} 100%)` },
  { id: 'paper', name: 'Kertas', css: (c) => `${noise(0.85, 0.09)}, linear-gradient(180deg, ${c.bg}, ${mix(c.primary, c.bg, 8)})` },
  { id: 'marble', name: 'Marmer', css: (c) => `${marble(c.primary)} center / cover, ${c.bg}` },
  { id: 'stripes', name: 'Garis diagonal', css: (c) => `repeating-linear-gradient(45deg, ${mix(c.primary, 'transparent', 10)} 0 2px, transparent 2px 18px), ${c.bg}` },
  {
    id: 'split',
    name: 'Dua warna',
    css: (c) => `linear-gradient(180deg, ${mix(c.secondary, c.bg, 85)} 0 38%, ${c.bg} 38% 100%)`,
  },
  { id: 'dots', name: 'Polkadot', css: pattern('dots', 34, 0.28) },
  { id: 'grid', name: 'Belah ketupat', css: pattern('grid', 44, 0.22) },
  { id: 'floral', name: 'Bunga', css: pattern('floral', 110, 0.22) },
  { id: 'leaves', name: 'Daun', css: pattern('leaves', 110, 0.22) },
  { id: 'hearts', name: 'Hati', css: pattern('hearts', 80, 0.22) },
  { id: 'confetti', name: 'Konfeti', css: pattern('confetti', 100, 0.3) },
  { id: 'kawung', name: 'Batik kawung', css: pattern('kawung', 60, 0.2) },
  { id: 'megamendung', name: 'Mega mendung', css: pattern('megamendung', 140, 0.22) },
  { id: 'islamic', name: 'Bintang islami', css: pattern('islamicStar', 76, 0.2) },
  { id: 'songket', name: 'Songket', css: pattern('songket', 40, 0.22) },
  { id: 'chevron', name: 'Chevron', css: pattern('chevron', 40, 0.22) },
  { id: 'lattice', name: 'Kisi Tionghoa', css: pattern('lattice', 56, 0.2) },
  { id: 'ruyi', name: 'Awan ruyi', css: pattern('ruyi', 120, 0.22) },
  { id: 'porcelain', name: 'Porselen', css: pattern('porcelain', 80, 0.22) },
  { id: 'parang', name: 'Batik parang', css: pattern('parang', 44, 0.2) },
  { id: 'seigaiha', name: 'Ombak Jepang', css: pattern('seigaiha', 44, 0.22) },
  { id: 'damask', name: 'Damask', css: pattern('damask', 70, 0.2) },
  { id: 'notebook', name: 'Buku catatan', css: (c) => `linear-gradient(90deg, transparent 34px, ${mix('#e0645a', 'transparent', 45)} 34px 35.5px, transparent 35.5px), ${patterns.notebook(alpha(c.primary, 0.35))} 0 0 / 40px 24px, ${c.bg}` },
  {
    id: 'night',
    name: 'Malam berbintang',
    css: (c) =>
      [[12, 14], [78, 8], [55, 26], [88, 40], [24, 48], [66, 62], [8, 76], [40, 86], [92, 80]]
        .map(([x, y], i) => `radial-gradient(${1.2 + (i % 3) * 0.6}px ${1.2 + (i % 3) * 0.6}px at ${x}% ${y}%, ${mix(c.primary, '#fff', 60)} 0 100%, transparent 100%)`)
        .join(', ') + `, radial-gradient(ellipse at 50% 0%, ${mix(c.secondary, c.bg, 40)} 0%, ${c.bg} 70%)`,
  },
  {
    id: 'satin',
    name: 'Sutra',
    css: (c) =>
      `linear-gradient(115deg, transparent 20%, ${mix(c.primary, 'transparent', 14)} 32%, transparent 44%, ${mix('#fff', 'transparent', 6)} 60%, transparent 72%), linear-gradient(160deg, ${mix(c.text, c.bg, 10)}, ${c.bg} 50%, ${mix(c.secondary, c.bg, 24)})`,
  },
  {
    id: 'watercolor',
    name: 'Cat air',
    css: (c) =>
      `${noise(0.55, 0.06)}, radial-gradient(45% 35% at 12% 10%, ${mix(c.primary, 'transparent', 30)} 0%, transparent 70%), radial-gradient(40% 30% at 92% 92%, ${mix(c.secondary, 'transparent', 26)} 0%, transparent 70%), radial-gradient(30% 25% at 88% 12%, ${mix(c.secondary, 'transparent', 16)} 0%, transparent 70%), ${c.bg}`,
  },
];

export const getBackground = (id) => coverBackgrounds.find((b) => b.id === id) ?? coverBackgrounds[0];

/** Layout isi cover. */
export const coverLayouts = [
  { id: 'center', name: 'Tengah', desc: 'Klasik, semua di tengah' },
  { id: 'bottom', name: 'Bawah', desc: 'Foto dominan, teks di bawah' },
  { id: 'card', name: 'Kartu', desc: 'Teks di dalam kartu' },
  { id: 'arch', name: 'Lengkung', desc: 'Teks dalam jendela lengkung' },
  { id: 'editorial', name: 'Editorial', desc: 'Rata kiri, nama besar' },
  { id: 'split', name: 'Foto atas', desc: 'Foto di atas, teks di bawah' },
];
