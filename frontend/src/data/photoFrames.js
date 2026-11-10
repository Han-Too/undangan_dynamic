/**
 * Bingkai foto profil: bentuk × border × hiasan. Ketiganya bebas dikombinasikan dan
 * warnanya selalu dari CSS variable tema, jadi serasi di tema apa pun.
 * 'theme' = ikuti bawaan tema (`theme.photo`, lihat themes.js).
 *
 *  photoShapes   radius  → bentuk lewat border-radius (paling tajam)
 *                mask    → path SVG 100×100 yang direntangkan ke kotak foto
 *                ratio   lebar / tinggi · width  lebar maksimum (% kolom)
 *  photoBorders  layers  maks. 3 lapis cincin dari luar ke dalam { pad px, bg CSS }
 *                shadow / glow / offset → efek tambahan
 *  photoDecors   items   [bentuk partikel (fx/shapes.js), x%, y%, ukuran px, rotasi]
 *                special → hiasan CSS khusus (orbit, blob, siku)
 */

const svgMask = (d) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='${d}'/></svg>`)}")`;

const f = (n) => +n.toFixed(2);

/** Lingkaran bergerigi (bentuk bunga). */
function scallop(n = 14, R = 41) {
  const pt = (i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return `${f(50 + R * Math.cos(a))} ${f(50 + R * Math.sin(a))}`;
  };
  const r = f(R * Math.sin(Math.PI / n) * 1.04);
  let d = `M${pt(0)}`;
  for (let i = 1; i <= n; i++) d += `A${r} ${r} 0 0 1 ${pt(i % n)}`;
  return `${d}Z`;
}

/** Persegi dengan tepi bergerigi seperti perangko. */
function stamp(n = 8, m = 3) {
  const L = (100 - 2 * m) / n;
  const r = f(L * 0.3);
  const corners = [[m, m], [100 - m, m], [100 - m, 100 - m], [m, 100 - m]];
  let d = `M${m} ${m}`;
  corners.forEach(([x0, y0], k) => {
    const [x1, y1] = corners[(k + 1) % 4];
    const dx = (x1 - x0) / n;
    const dy = (y1 - y0) / n;
    for (let i = 0; i < n; i++) {
      const sx = x0 + dx * i;
      const sy = y0 + dy * i;
      // Takik setengah lingkaran (r = 0.3 L) di tengah tiap segmen, melengkung ke dalam.
      d += `L${f(sx + dx * 0.2)} ${f(sy + dy * 0.2)}A${r} ${r} 0 0 0 ${f(sx + dx * 0.8)} ${f(sy + dy * 0.8)}`;
    }
    d += `L${x1} ${y1}`;
  });
  return `${d}Z`;
}

/** Bintang n sudut. */
function star(n = 5, outer = 50, inner = 30) {
  const pts = Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 ? inner : outer;
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
    return `${f(50 + r * Math.cos(a))} ${f(52 + r * Math.sin(a))}`;
  });
  return `M${pts.join('L')}Z`;
}

export const photoShapes = [
  { id: 'theme', name: 'Ikuti tema' },
  { id: 'arch', name: 'Lengkung', radius: '999px 999px 18px 18px', ratio: 4 / 5 },
  { id: 'oval', name: 'Oval', radius: '50%', ratio: 4 / 5, width: 66 },
  { id: 'circle', name: 'Bundar', radius: '50%', ratio: 1, width: 66 },
  { id: 'square', name: 'Kotak', radius: '3px', ratio: 1, width: 66 },
  { id: 'rounded', name: 'Kotak tumpul', radius: '22%', ratio: 1, width: 66 },
  { id: 'rect', name: 'Portrait', radius: 'calc(var(--radius) * .8)', ratio: 4 / 5 },
  { id: 'heart', name: 'Love', mask: svgMask('M50 95C22 76 2 58 2 33 2 15 15 4 29 4c9 0 16 4 21 12C55 8 62 4 71 4c14 0 27 11 27 29 0 25-20 43-48 62z'), ratio: 1.06, width: 74 },
  { id: 'scallop', name: 'Bunga', mask: svgMask(scallop()), ratio: 1, width: 70 },
  { id: 'star', name: 'Bintang', mask: svgMask(star()), ratio: 1, width: 76 },
  { id: 'hexagon', name: 'Heksagon', mask: svgMask('M25 2h50l24 48-24 48H25L1 50z'), ratio: 1.08, width: 70 },
  { id: 'octagon', name: 'Oktagon', mask: svgMask('M30 0H70L100 30V70L70 100H30L0 70V30Z') },
  { id: 'diamond', name: 'Belah ketupat', mask: svgMask('M50 0L100 50 50 100 0 50z'), ratio: 1, width: 76 },
  { id: 'dome', name: 'Kubah', mask: svgMask('M2 100V44Q2 24 26 14Q44 7 50 0Q56 7 74 14Q98 24 98 44V100Z'), ratio: 4 / 5 },
  { id: 'leaf', name: 'Daun', radius: '0 50%', ratio: 1, width: 66 },
  { id: 'blob', name: 'Organik', mask: svgMask('M53 2c21 1 39 13 44 33 6 22-4 44-22 56-17 10-40 11-56-1C4 79-2 58 3 39 8 17 31 1 53 2z'), ratio: 1, width: 70 },
  { id: 'stamp', name: 'Perangko', mask: svgMask(stamp()), ratio: 4 / 5 },
  { id: 'ticket', name: 'Tiket', mask: svgMask('M9 0H91A9 9 0 0 0 100 9V41A9 9 0 0 0 100 59V91A9 9 0 0 0 91 100H9A9 9 0 0 0 0 91V59A9 9 0 0 0 0 41V9A9 9 0 0 0 9 0Z'), ratio: 4 / 5 },
];

const GOLD = 'linear-gradient(135deg, var(--c-primary), color-mix(in srgb, var(--c-primary) 45%, var(--c-bg)), var(--c-primary))';
const P = 'var(--c-primary)';
const BG = 'var(--c-bg)';

export const photoBorders = [
  { id: 'theme', name: 'Ikuti tema' },
  { id: 'none', name: 'Tanpa border', layers: [] },
  { id: 'thin', name: 'Garis tipis', layers: [{ pad: 2, bg: P }] },
  { id: 'ring', name: 'Gradasi emas', layers: [{ pad: 4, bg: GOLD }], shadow: true },
  { id: 'thick', name: 'Tebal', layers: [{ pad: 9, bg: GOLD }], shadow: true },
  { id: 'double', name: 'Ganda', layers: [{ pad: 2, bg: P }, { pad: 5, bg: BG }] },
  { id: 'tiered', name: 'Bertingkat', layers: [{ pad: 5, bg: GOLD }, { pad: 4, bg: BG }, { pad: 2, bg: P }], shadow: true },
  { id: 'duo', name: 'Dua warna', layers: [{ pad: 5, bg: 'linear-gradient(135deg, var(--c-primary), var(--c-secondary))' }], shadow: true },
  { id: 'rainbow', name: 'Pelangi', layers: [{ pad: 5, bg: 'conic-gradient(from 30deg, #ff8fa3, #ffc76e, #9be27d, #6fc8ff, #b99bff, #ff8fa3)' }, { pad: 3, bg: '#fff' }] },
  { id: 'dashed', name: 'Putus-putus', layers: [{ pad: 3, bg: `repeating-conic-gradient(${P} 0 5deg, transparent 5deg 11deg)` }, { pad: 4, bg: BG }] },
  { id: 'white', name: 'Foto cetak', layers: [{ pad: 10, bg: '#fff' }], shadow: true },
  { id: 'mat', name: 'Passe-partout', layers: [{ pad: 2, bg: P }, { pad: 10, bg: 'var(--c-surface)' }, { pad: 1, bg: P }], shadow: true },
  { id: 'glow', name: 'Bercahaya', layers: [{ pad: 3, bg: P }], glow: 'var(--c-primary)' },
  { id: 'neon', name: 'Neon', layers: [{ pad: 2, bg: 'var(--c-secondary)' }, { pad: 4, bg: BG }, { pad: 1, bg: 'var(--c-secondary)' }], glow: 'var(--c-secondary)' },
  { id: 'offset', name: 'Bayangan geser', layers: [{ pad: 2, bg: P }], offset: true },
  { id: 'shadow', name: 'Bayangan saja', layers: [], shadow: true },
];

export const photoDecors = [
  { id: 'theme', name: 'Ikuti tema' },
  { id: 'none', name: 'Tanpa hiasan', items: [] },
  { id: 'sparkle', name: 'Kilau', items: [['sparkle', 6, 8, 22], ['sparkle', 94, 20, 14], ['sparkle', 88, 92, 20], ['dot', 2, 68, 7], ['sparkle', 14, 96, 11]] },
  { id: 'hearts', name: 'Hati', items: [['heart', 4, 14, 22, -18], ['heart', 96, 8, 14, 16], ['heart', 94, 84, 20, 12], ['heart', 8, 90, 12, -10], ['heart', 100, 50, 9, 20]] },
  { id: 'flowers', name: 'Bunga', items: [['flower', 4, 6, 30], ['flower', 16, 0, 16], ['leaf', 0, 22, 18, 200], ['flower', 96, 94, 30], ['flower', 84, 100, 16], ['leaf', 100, 78, 18, 20]] },
  { id: 'leaves', name: 'Daun', items: [['leaf', 0, 10, 24, 190], ['leaf', 8, 0, 18, 240], ['leaf', 100, 88, 24, 10], ['leaf', 92, 100, 18, 60], ['dot', 96, 6, 6], ['dot', 4, 94, 6]] },
  { id: 'stars', name: 'Bintang', items: [['star5', 4, 10, 20], ['star5', 96, 16, 14], ['star8', 92, 90, 20], ['star5', 6, 88, 12], ['dot', 50, -4, 6]] },
  { id: 'butterfly', name: 'Kupu-kupu', items: [['butterfly', 2, 18, 26, -20], ['butterfly', 96, 76, 20, 18], ['dot', 90, 10, 5], ['dot', 10, 92, 5]] },
  { id: 'confetti', name: 'Konfeti', items: [['confetti', 2, 10, 16, 20], ['confetti', 96, 6, 14, -30], ['dot', 98, 40, 8], ['confetti', 92, 94, 16, 60], ['dot', 4, 70, 8], ['confetti', 10, 98, 12, -50]] },
  { id: 'balloons', name: 'Balon', items: [['balloon', 0, 12, 34, -10], ['balloon', 10, 2, 24, 6], ['balloon', 98, 70, 30, 10]] },
  { id: 'music', name: 'Not musik', items: [['note', 2, 14, 22, -12], ['note', 96, 24, 16, 10], ['note', 92, 88, 20, 8]] },
  { id: 'islamic', name: 'Bulan bintang', items: [['crescent', 4, 8, 24, -20], ['star8', 18, 0, 12], ['star8', 96, 92, 18], ['dot', 98, 70, 6]] },
  { id: 'orbit', name: 'Cincin orbit', special: 'orbit', items: [['dot', 50, -6, 10], ['sparkle', 104, 60, 12]] },
  { id: 'blob', name: 'Noda warna', special: 'blob', items: [] },
  { id: 'corners', name: 'Siku sudut', special: 'corners', items: [] },
];

const byId = (list) => (id) => list.find((x) => x.id === id && id !== 'theme') ?? null;
export const getPhotoShape = byId(photoShapes);
export const getPhotoBorder = byId(photoBorders);
export const getPhotoDecor = byId(photoDecors);
