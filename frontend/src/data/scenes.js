import { shapes } from '../components/invitation/fx/shapes.js';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SCENE: ilustrasi SVG berlapis di latar undangan & cover (ranting, lampion, bukit, atap adat, dll.)
 *  Setiap lapisan bergerak sendiri (berayun, melayang, berputar) dan bergeser halus saat digulir.
 *
 *  Warna diambil dari CSS variable, jadi satu ilustrasi cocok untuk tema apa pun:
 *    currentColor / --sc-a  = primary (aksen emas, garis)
 *    --sc-b                 = secondary (bunga, lampion, bidang tegas)
 *    --sc-leaf              = daun (secondary dicampur hijau)
 *    --sc-ink               = siluet (warna teks, transparan)
 *
 *  Lapisan: { art, at, w, anim, op, depth }  (ilustrasi otomatis dicerminkan sesuai pojoknya)
 *    at     posisi: tl | tr | bl | br | top | bottom | left | right | center
 *    w      lebar dalam % lebar undangan
 *    anim   sway | swing | bob | drift | spin | pulse | fly | none
 *    depth  kekuatan geser saat digulir (0 = diam)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const B = 'var(--sc-b)';
const LEAF = 'var(--sc-leaf)';
const INK = 'var(--sc-ink)';

/** Tempel bentuk partikel (viewBox 24) di titik x,y dengan skala s. */
const put = (name, x, y, s = 1, fill = B, extra = '') =>
  `<g transform="translate(${x - 12 * s} ${y - 12 * s}) scale(${s})" fill="${fill}" ${extra}>${shapes[name]}</g>`;
const range = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');

/* ── Ranting berbunga (pojok kanan atas) ──────────────────────── */
const BRANCH = {
  main: 'M240 18C200 22 170 40 150 62s-50 34-80 42c-20 6-36 22-48 46',
  twigs: ['M168 46c-8-26-28-36-50-38', 'M120 84c-4 26 4 46 20 66', 'M86 100c-10-18-26-26-46-28', 'M200 24c4 18 0 34-10 46'],
  spots: [[196, 24, 1.5], [150, 60, 1.7], [124, 16, 1.3], [104, 10, 1], [124, 106, 1.4], [138, 144, 1.2], [58, 76, 1.3], [40, 72, 1], [88, 98, 1.5], [34, 132, 1.2], [192, 66, 1.1], [168, 44, 1]],
};
const branch = (bloom, { leaves = false, ink = INK, color = B } = {}) => ({
  vb: '0 0 240 200',
  svg: `<g fill="none" stroke="${ink}" stroke-linecap="round"><path d="${BRANCH.main}" stroke-width="6"/>${BRANCH.twigs.map((d) => `<path d="${d}" stroke-width="2.6"/>`).join('')}</g>
    ${leaves ? BRANCH.spots.map(([x, y, s], i) => put('leaf', x + 6, y + 4, s * 0.8, LEAF, `transform-origin="${x}px ${y}px"`)).join('') : ''}
    ${BRANCH.spots.map(([x, y, s], i) => `<g class="sc-bloom" style="--d:${-i * 0.7}s">${bloom === 'leaf' ? put(i % 2 ? 'goldLeaf' : 'leaf', x, y, s * 0.9, 'currentColor') : put(bloom, x, y, s, color)}${bloom !== 'leaf' ? `<circle cx="${x}" cy="${y}" r="${1.6 * s}" fill="currentColor"/>` : ''}</g>`).join('')}
    ${bloom !== 'leaf' ? [[178, 34], [110, 30], [70, 92], [140, 128], [50, 110]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="${color}" fill-opacity=".8"/>`).join('') : ''}`,
});

/* ── Buket bunga (pojok kiri atas) ─────────────────────────────── */
const bouquet = (big = 'peony', small = 'flower') => ({
  vb: '0 0 220 220',
  svg: `${[[150, 34, -10, 2.6], [176, 70, 20, 2], [60, 156, 100, 2.6], [96, 182, 70, 2], [124, 112, 45, 2.2], [26, 196, 95, 1.6], [196, 18, -20, 1.6]]
    .map(([x, y, a, s]) => `<g transform="rotate(${a} ${x} ${y})">${put('leaf', x, y, s, LEAF, 'fill-opacity=".75"')}</g>`)
    .join('')}
    ${[[40, 44, 3.4, B], [104, 26, 2.3, 'currentColor'], [26, 108, 2.5, 'currentColor'], [88, 86, 1.9, B]].map(([x, y, s, c], i) => `<g class="sc-bloom" style="--d:${-i}s">${put(big, x, y, s, c, 'fill-opacity=".9"')}</g>`).join('')}
    ${[[150, 70, 1], [140, 20, 0.9], [62, 132, 1], [20, 160, 0.8], [118, 60, 0.8], [180, 44, 0.7], [44, 186, 0.7]].map(([x, y, s]) => put(small, x, y, s, B, 'fill-opacity=".75"')).join('')}
    ${range(9, (i) => `<circle cx="${30 + ((i * 47) % 160)}" cy="${20 + ((i * 71) % 170)}" r="2.4" fill="currentColor" fill-opacity=".7"/>`)}`,
});

/* ── Bukit tinta + matahari + pagoda (pita bawah) ─────────────── */
const hills = ({ sun = true, pagoda = false, ink = INK } = {}) => ({
  vb: '0 0 400 170',
  svg: `${sun ? `<circle cx="300" cy="56" r="26" fill="${B}" fill-opacity=".85" class="sc-pulse-in"/>` : ''}
    <path d="M0 120c40-30 70-50 110-25 30 17 50-15 90-25s70 30 110 20 60 10 90 2v78H0z" fill="${ink}" fill-opacity=".22"/>
    ${pagoda ? `<g fill="${ink}" fill-opacity=".5" transform="translate(236 46)">${range(4, (i) => `<path d="M${-14 + i * 2} ${i * 16 + 10}q14 -8 ${28 - i * 4} 0h-4v8h${-20 + i * 4}v-8z"/>`)}<rect x="-1" y="0" width="2" height="12"/></g>` : ''}
    <path d="M0 140c50-30 90-20 130-8s80-32 130-20 90 18 140 6v52H0z" fill="${ink}" fill-opacity=".36"/>
    <path d="M0 160c60-20 120-10 180-4s140-16 220-6v20H0z" fill="${ink}" fill-opacity=".55"/>`,
});

const fuji = {
  vb: '0 0 400 170',
  svg: `<circle cx="96" cy="58" r="24" fill="${B}" fill-opacity=".85" class="sc-pulse-in"/>
    <path d="M50 170L172 52q28-14 56 0l122 118z" fill="${INK}" fill-opacity=".3"/>
    <path d="M172 52q28-14 56 0l20 22-16-6-16 10-16-12-16 12-16-10-16 6z" fill="#fff" fill-opacity=".92"/>
    <path d="M0 158c70-22 140-12 200-6s130-14 200-4v22H0z" fill="${INK}" fill-opacity=".5"/>`,
};

/* ── Lampion menggantung (kanan atas) ─────────────────────────── */
const lantern = (x, len, s, d, body = 'round') => {
  const shape =
    body === 'round'
      ? `<ellipse cx="0" cy="26" rx="22" ry="25" fill="${B}"/><path d="M-12 4c-8 14-8 30 0 44M12 4c8 14 8 30 0 44M0 1v50" stroke="currentColor" stroke-opacity=".55" fill="none" stroke-width="1.4"/>`
      : `<path d="M0 0l-6 8h12zM-14 10h28l-4 34h-20z" fill="currentColor" fill-opacity=".28" stroke="currentColor" stroke-width="1.6"/><ellipse cx="0" cy="28" rx="8" ry="11" fill="#ffd27a" fill-opacity=".75"/><path d="M-14 10l4 34M14 10l-4 34" stroke="currentColor" stroke-width="1.2"/>`;
  return `<g class="sc-swing" style="--d:${d}s"><path d="M${x} 0V${len}" stroke="currentColor" stroke-width="1.4"/><g transform="translate(${x} ${len}) scale(${s})">
    <rect x="-9" y="-3" width="18" height="6" rx="2" fill="currentColor"/>${shape}<rect x="-9" y="49" width="18" height="6" rx="2" fill="currentColor"/>
    <path d="M-4 55v16M0 55v20M4 55v16" stroke="${B}" stroke-width="1.6"/></g></g>`;
};
const lanterns = (body = 'round') => ({
  vb: '0 0 200 280',
  svg: lantern(40, 70, 0.9, -0.5, body) + lantern(112, 130, 1.1, -2.2, body) + lantern(172, 40, 0.8, -1.4, body),
});

/* ── Medali 囍 ─────────────────────────────────────────────────── */
const xi = {
  vb: '0 0 120 120',
  svg: `<circle cx="60" cy="60" r="56" fill="${B}"/><circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 4"/>
    <text x="60" y="62" text-anchor="middle" dominant-baseline="central" font-size="62" font-family="'Noto Serif SC','Songti SC',serif" fill="currentColor">囍</text>`,
};

/* ── Awan bergulung (pita lebar, berulang untuk animasi drift) ── */
const cloudPuff = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="currentColor"><path d="M0 30c-12 0-14-14-4-17 0-12 15-15 20-5 6-8 20-4 18 6 10 0 12 16 2 16z" fill-opacity=".35"/><path d="M8 24c0-5 7-5 7 0M22 24c0-5 7-5 7 0" fill="none" stroke="currentColor" stroke-width="1.4" stroke-opacity=".6"/></g>`;
const clouds = {
  vb: '0 0 800 110',
  svg: range(2, (k) => [[20, 50, 1.6], [130, 18, 1.1], [220, 60, 1.9], [320, 22, 1.3]].map(([x, y, s]) => cloudPuff(x + k * 400, y, s)).join('')),
};

/* ── Wisteria menjuntai (pita atas) ───────────────────────────── */
const wisteria = {
  vb: '0 0 400 170',
  svg: `<path d="M0 8c60 10 120-6 200 4s140-6 200 2" fill="none" stroke="${LEAF}" stroke-width="4"/>${range(10, (i) => {
    const x = 18 + i * 40;
    const len = 60 + ((i * 37) % 90);
    return `<g class="sc-swing" style="--d:${-i * 0.6}s">${range(Math.round(len / 9), (j) => {
      const r = 7 - j * (5 / (len / 9));
      return `<ellipse cx="${x + (j % 2 ? 3 : -3)}" cy="${12 + j * 9}" rx="${Math.max(r, 2)}" ry="${Math.max(r * 0.8, 1.6)}" fill="${B}" fill-opacity="${0.9 - j * 0.05}"/>`;
    })}${put('leaf', x + 10, 14, 0.7, LEAF)}</g>`;
  })}`,
};

/* ── Roncean melati (pita atas) ───────────────────────────────── */
const jasmine = {
  vb: '0 0 400 190',
  svg: `<path d="M0 10q100 50 200 0t200 0" fill="none" stroke="${LEAF}" stroke-width="2.5"/>
    ${range(17, (i) => {
      const t = i / 16;
      const x = t * 400;
      const y = 10 + 25 * Math.sin(Math.PI * ((t * 2) % 1));
      return put('jasmine', x, y, 0.55, '#fffdf4', 'stroke="currentColor" stroke-width=".8"');
    })}
    ${range(9, (i) => {
      const x = 22 + i * 45;
      const len = 70 + ((i * 53) % 80);
      return `<g class="sc-swing" style="--d:${-i * 0.5}s"><path d="M${x} 6V${len}" stroke="${LEAF}" stroke-width="1.2"/>${range(Math.floor(len / 12), (j) => `<ellipse cx="${x}" cy="${14 + j * 12}" rx="3.2" ry="4.4" fill="#fffdf4" stroke="currentColor" stroke-width=".8"/>`)}${put('jasmine', x, len + 6, 0.8, '#fffdf4', 'stroke="currentColor" stroke-width=".8"')}</g>`;
    })}`,
};

/* ── Padang bunga (pita bawah) ────────────────────────────────── */
const meadow = (flower = 'flower') => ({
  vb: '0 0 400 120',
  svg: `<g class="sc-sway-b">${range(46, (i) => {
    const x = i * 9 + ((i * 7) % 5);
    const h = 30 + ((i * 29) % 34);
    return `<path d="M${x} 120q${(i % 2 ? 6 : -6)} ${-h / 2} ${i % 2 ? 2 : -2} ${-h}q2 ${h / 2} 4 ${h}z" fill="${LEAF}" fill-opacity="${0.45 + (i % 3) * 0.15}"/>`;
  })}${range(14, (i) => {
    const x = 14 + i * 28;
    const y = 50 + ((i * 23) % 36);
    return `<path d="M${x} 120Q${x - 4} ${(120 + y) / 2} ${x} ${y}" stroke="${LEAF}" stroke-width="1.4" fill="none"/>${put(i % 3 ? flower : 'plum', x, y, 0.7 + (i % 3) * 0.15, i % 2 ? B : 'currentColor')}`;
  })}</g>`,
});

/* ── Pohon (kiri) ─────────────────────────────────────────────── */
const tree = {
  vb: '0 0 200 400',
  svg: `<path d="M18 400c10-90 6-170 30-250M40 220c30-20 50-40 60-80M36 280c-10-30-20-40-30-50M46 160c20-20 50-30 80-30" stroke="${INK}" stroke-width="9" stroke-linecap="round" fill="none"/>
    ${[[60, 70, 48], [120, 60, 40], [30, 120, 38], [150, 120, 34], [96, 130, 42], [20, 200, 30], [110, 190, 30], [170, 180, 22]]
      .map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${LEAF}" fill-opacity="${0.28 + (i % 3) * 0.12}"/>`)
      .join('')}${range(10, (i) => put('flower', 24 + ((i * 41) % 160), 40 + ((i * 59) % 170), 0.7, B, 'fill-opacity=".85"'))}`,
};

/* ── Bambu (kiri) ─────────────────────────────────────────────── */
const bamboo = {
  vb: '0 0 120 400',
  svg: [[28, 9], [62, 7], [92, 8]]
    .map(([x, w], k) => `<rect x="${x - w / 2}" y="${k * 30}" width="${w}" height="${400 - k * 30}" rx="${w / 2}" fill="${LEAF}" fill-opacity=".7"/>${range(6, (i) => `<rect x="${x - w / 2 - 1}" y="${k * 30 + 40 + i * 62}" width="${w + 2}" height="3" rx="1.5" fill="${INK}"/>${i % 2 ? '' : range(3, (j) => `<g transform="rotate(${-50 + j * 30 + (k % 2 ? 180 : 0)} ${x} ${k * 30 + 40 + i * 62})"><path d="M${x} ${k * 30 + 40 + i * 62}c10-4 30-4 40 0-10 4-30 4-40 0z" fill="${LEAF}"/></g>`)}`)}`)
    .join(''),
};

/* ── Ombak berlapis (pita bawah, berulang) ────────────────────── */
const waveRow = (y, amp, op) => `<path d="M0 ${y}${range(20, () => `q20 ${-amp} 40 0`)}V110H0z" fill="${B}" fill-opacity="${op}"/>`;
const waves = { vb: '0 0 800 110', svg: waveRow(40, 18, 0.22) + waveRow(62, 14, 0.36) + waveRow(84, 12, 0.55) };

/* ── Gunungan wayang (kiri/kanan bawah) ───────────────────────── */
const gunungan = {
  vb: '0 0 160 260',
  svg: `<path d="M80 2c20 40 50 78 70 128 10 30 8 70-10 100H20C2 200 0 160 10 130 30 80 60 42 80 2z" fill="${B}" fill-opacity=".88" stroke="currentColor" stroke-width="2.5"/>
    <path d="M80 26c16 34 40 66 56 106 8 24 6 56-8 80H32c-14-24-16-56-8-80 16-40 40-72 56-106z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
    <path d="M80 220V48" stroke="currentColor" stroke-width="3"/>
    ${range(6, (i) => `<path d="M80 ${70 + i * 22}c${-18 - i * 3} -4 ${-30 - i * 3} -16 ${-32 - i * 2} -30M80 ${70 + i * 22}c${18 + i * 3} -4 ${30 + i * 3} -16 ${32 + i * 2} -30" stroke="currentColor" stroke-width="1.6" fill="none"/>`)}
    <rect x="54" y="190" width="52" height="40" fill="${INK}" stroke="currentColor" stroke-width="1.6"/><path d="M80 194v32M60 200h40" stroke="currentColor"/>`,
};

/* ── Atap pendopo joglo (pita atas) ───────────────────────────── */
const joglo = {
  vb: '0 0 400 130',
  svg: `<path d="M0 0h400v30l-60 30H60L0 30z" fill="${INK}" fill-opacity=".7"/><path d="M60 60h280l-30 16H90z" fill="${INK}" fill-opacity=".5"/>
    <path d="M0 30l60 30h280l60-30" stroke="currentColor" stroke-width="2" fill="none"/>
    ${range(5, (i) => `<rect x="${78 + i * 58}" y="76" width="8" height="54" fill="${INK}" fill-opacity=".55"/><g class="sc-swing" style="--d:${-i * 0.4}s"><path d="M${82 + i * 58 + 29} 60v30" stroke="currentColor"/>${i < 4 ? put('jasmine', 82 + i * 58 + 29, 96, 0.7, '#fffdf4', 'stroke="currentColor" stroke-width=".8"') : ''}</g>`)}
    ${range(20, (i) => `<path d="M${i * 20} 0l10 10 10-10" fill="currentColor" fill-opacity=".5"/>`)}`,
};

/* ── Rumah gadang (pita bawah) ────────────────────────────────── */
const gadang = (cx, w, h, op) => {
  const l = cx - w / 2;
  const r = cx + w / 2;
  const top = 150 - h;
  return `<g fill="${INK}" fill-opacity="${op}"><path d="M${l} ${top + h * 0.45}Q${l + w * 0.12} ${top + h * 0.3} ${l + w * 0.08} ${top}Q${l + w * 0.2} ${top + h * 0.32} ${l + w * 0.36} ${top + h * 0.3}Q${cx} ${top + h * 0.1} ${r - w * 0.36} ${top + h * 0.3}Q${r - w * 0.2} ${top + h * 0.32} ${r - w * 0.08} ${top}Q${r - w * 0.12} ${top + h * 0.3} ${r} ${top + h * 0.45}z"/>
    <rect x="${l + w * 0.1}" y="${top + h * 0.45}" width="${w * 0.8}" height="${h * 0.55}"/></g>
    <g stroke="currentColor" stroke-width="1.2" fill="none" opacity=".7">${range(5, (i) => `<rect x="${l + w * 0.14 + i * w * 0.145}" y="${top + h * 0.55}" width="${w * 0.1}" height="${h * 0.22}"/>`)}<path d="M${l + w * 0.1} ${top + h * 0.82}H${r - w * 0.1}"/></g>`;
};
const gonjong = { vb: '0 0 400 150', svg: gadang(70, 120, 80, 0.3) + gadang(330, 120, 80, 0.3) + gadang(200, 220, 130, 0.55) };

/* ── Tongkonan / rumah bolon (pita bawah) ─────────────────────── */
const boatHouse = (cx, w, h, op) => {
  const l = cx - w / 2;
  const top = 160 - h;
  return `<g fill="${INK}" fill-opacity="${op}"><path d="M${l - w * 0.1} ${top}Q${cx} ${top + h * 0.5} ${l + w * 1.1} ${top}L${l + w * 0.92} ${top + h * 0.42}Q${cx} ${top + h * 0.72} ${l + w * 0.08} ${top + h * 0.42}z"/>
    <rect x="${l + w * 0.14}" y="${top + h * 0.5}" width="${w * 0.72}" height="${h * 0.26}"/>${range(4, (i) => `<rect x="${l + w * 0.18 + i * w * 0.2}" y="${top + h * 0.76}" width="${w * 0.05}" height="${h * 0.24}"/>`)}</g>
    <g fill="none" stroke="currentColor" stroke-width="1.2" opacity=".8">${range(3, (i) => `<circle cx="${l + w * 0.3 + i * w * 0.2}" cy="${top + h * 0.63}" r="${h * 0.07}"/>`)}</g>`;
};
const tongkonan = { vb: '0 0 400 160', svg: boatHouse(80, 110, 90, 0.3) + boatHouse(300, 150, 120, 0.5) };

/* ── Candi bentar Bali (separuh, kiri bawah) ──────────────────── */
const candi = {
  vb: '0 0 140 260',
  svg: `${[[0, 204, 140, 56], [10, 170, 130, 34], [20, 140, 120, 30], [30, 112, 110, 28], [40, 88, 100, 24], [50, 66, 90, 22], [60, 46, 80, 20], [70, 28, 70, 18], [82, 10, 58, 18]]
    .map(([x, y, w, h], i) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${B}" fill-opacity="${0.55 + (i % 2) * 0.12}"/>
      <path d="M${x} ${y}h${w}" stroke="currentColor" stroke-width="2"/>
      ${range(Math.max(1, Math.floor(w / 26)), (j) => `<path d="M${x + 8 + j * 26} ${y + h - 4}l6 -${Math.min(10, h - 8)} 6 ${Math.min(10, h - 8)}" stroke="currentColor" stroke-opacity=".7" fill="none"/>`)}`)
    .join('')}
    <path d="M140 204V10" stroke="currentColor" stroke-width="2"/>
    <rect x="40" y="214" width="60" height="30" rx="3" fill="${INK}" fill-opacity=".35"/><path d="M50 214v30M70 214v30M90 214v30" stroke="currentColor" stroke-opacity=".5"/>
    ${range(6, (i) => put('frangipani', 14 + i * 22, 252 - (i % 2) * 8, 0.9, '#fffaf0', 'stroke="currentColor" stroke-width=".6"'))}`,
};

/* ── Atap istana Asia Timur (pita atas) ───────────────────────── */
const eaves = {
  vb: '0 0 400 110',
  svg: `<path d="M0 6q20 40 200 50Q380 46 400 6V0H0z" fill="${INK}" fill-opacity=".75"/>
    ${range(26, (i) => `<path d="M${8 + i * 15} 0v${18 + 22 * Math.sin((Math.PI * i) / 25)}" stroke="currentColor" stroke-opacity=".35"/>`)}
    <path d="M24 30q40 26 176 32 136-6 176-32" stroke="currentColor" stroke-width="2" fill="none"/>
    ${range(13, (i) => `<rect x="${40 + i * 25}" y="${48 + 12 * Math.sin((Math.PI * i) / 12)}" width="18" height="10" rx="2" fill="${i % 2 ? B : LEAF}"/>`)}
    ${lantern(70, 70, 0.55, -0.6)}${lantern(330, 70, 0.55, -1.8)}`,
};

/* ── Siluet masjid (pita bawah) ───────────────────────────────── */
const mosque = {
  vb: '0 0 400 150',
  svg: `<g fill="${INK}" fill-opacity=".45"><path d="M150 150V90h100v60z"/><path d="M152 92c0-40 48-50 48-70 0 20 48 30 48 70z"/><path d="M110 150v-40h40v40zM250 150v-40h40v40z"/><path d="M112 112c0-16 18-20 18-30 0 10 18 14 18 30zM252 112c0-16 18-20 18-30 0 10 18 14 18 30z"/>
    <rect x="70" y="40" width="12" height="110"/><rect x="318" y="40" width="12" height="110"/><path d="M70 40l6-20 6 20zM318 40l6-20 6 20z"/><path d="M0 150v-14h400v14z"/></g>
    <path d="M206 10a8 8 0 1 1-6-9 6 6 0 0 0 6 9z" fill="currentColor"/>`,
};

/* ── Bulan sabit + bintang ────────────────────────────────────── */
const moon = {
  vb: '0 0 140 140',
  svg: `<circle cx="70" cy="70" r="62" fill="currentColor" fill-opacity=".1" class="sc-pulse-in"/><path d="M96 92A40 40 0 1 1 64 30a31 31 0 0 0 32 62z" fill="currentColor"/>
    ${[[24, 26, 0.5], [112, 34, 0.4], [118, 110, 0.55], [30, 112, 0.35]].map(([x, y, s], i) => `<g class="sc-twinkle" style="--d:${-i * 0.9}s">${put('sparkle', x, y, s, 'currentColor')}</g>`).join('')}`,
};

/* ── Kipas art deco (pita atas) ───────────────────────────────── */
const deco = {
  vb: '0 0 400 120',
  svg: `<g fill="none" stroke="currentColor" stroke-width="1.4">${[40, 64, 88, 112].map((r) => `<path d="M${200 - r} 0a${r} ${r} 0 0 0 ${r * 2} 0"/>`).join('')}
    ${range(13, (i) => {
      const a = (Math.PI * i) / 12;
      return `<path d="M${200 + 40 * Math.cos(a)} ${40 * Math.sin(a)}L${200 + 112 * Math.cos(a)} ${112 * Math.sin(a)}"/>`;
    })}
    <path d="M0 14h70l14 14h20M400 14h-70l-14 14h-20M0 26h60l10 10M400 26h-60l-10 10"/></g><path d="M200 0l-14 14 14 14 14-14z" fill="currentColor"/>`,
};

/* ── Coretan doodle (pojok) ───────────────────────────────────── */
const doodles = {
  vb: '0 0 200 200',
  svg: `<g fill="none" stroke="${B}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M40 60c-14-18-38-2-22 18l22 20 22-20c16-20-8-36-22-18z"/>
    <path d="M140 30l6 14 15 2-11 10 3 15-13-8-13 8 3-15-11-10 15-2z"/>
    <path d="M110 130c0-10 16-10 16 0s-24 14-24-4 30-22 34 0"/>
    <path d="M30 160q10-10 20 0t20 0 20 0"/><path d="M160 120l8 8M168 120l-8 8"/></g>
    ${put('heart', 160, 170, 1.1, 'currentColor')}${put('sparkle', 80, 30, 0.8, 'currentColor')}`,
};

/* ── Pesawat kertas di jalur putus-putus ──────────────────────── */
const plane = {
  vb: '0 0 400 200',
  svg: `<path class="sc-march" d="M10 190C80 120 120 170 180 120S280 40 350 52" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 8"/>
    <g class="sc-bob-in">${put('plane', 368, 44, 1.6, B)}</g>`,
};

/* ── Balon (kanan) ────────────────────────────────────────────── */
const balloons = {
  vb: '0 0 200 300',
  svg: [[60, 70, B], [110, 46, 'currentColor'], [150, 90, LEAF], [90, 120, 'currentColor'], [40, 140, B]]
    .map(([x, y, c], i) => `<g class="sc-bob-in" style="--d:${-i * 0.8}s"><path d="M${x} ${y + 26}Q${x + (100 - x) / 2} ${y + 120} 100 300" stroke="${INK}" fill="none"/><ellipse cx="${x}" cy="${y}" rx="22" ry="27" fill="${c}"/><ellipse cx="${x - 8}" cy="${y - 10}" rx="5" ry="8" fill="#fff" fill-opacity=".4"/><path d="M${x - 4} ${y + 27}h8l-4 5z" fill="${c}"/></g>`)
    .join(''),
};

/* ── Bendera pesta (pita atas) ────────────────────────────────── */
const bunting = {
  vb: '0 0 400 90',
  svg: `<path d="M0 8Q200 70 400 8" fill="none" stroke="${INK}" stroke-width="1.6"/>${range(13, (i) => {
    const t = (i + 0.5) / 13;
    const x = 400 * t;
    const y = (1 - t) * (1 - t) * 8 + 2 * (1 - t) * t * 70 + t * t * 8;
    return `<g class="sc-swing" style="--d:${-i * 0.3}s"><path d="M${x - 12} ${y}h24l-12 24z" fill="${['var(--sc-b)', 'currentColor', 'var(--sc-leaf)'][i % 3]}"/></g>`;
  })}`,
};

/* ── Bukit salju + pinus (pita bawah) ─────────────────────────── */
const snowPines = {
  vb: '0 0 400 150',
  svg: `${[[40, 70, 1], [90, 60, 1.3], [300, 64, 1.2], [350, 76, 0.9], [200, 80, 0.8]]
    .map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${LEAF}">${range(3, (i) => `<path d="M0 ${i * 16}l${-14 - i * 6} ${24}h${28 + i * 12}z"/>`)}<rect x="-3" y="70" width="6" height="12" fill="${INK}"/><path d="M0 0l-5 9h10z" fill="#fff"/></g>`)
    .join('')}
    <path d="M0 130c80-30 160-20 220-6s120-10 180-4v30H0z" fill="#fff" stroke="currentColor" stroke-opacity=".3"/>`,
};

/* ── Pedang pora (pita atas): pedang bersilang membentuk gapura ─ */
const sword = (x1, y1, x2, y2) =>
  `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="${x1}" cy="${y1}" r="6" fill="${B}"/><path d="M${x1 + (x2 - x1) * 0.06 - 9} ${y1 + (y2 - y1) * 0.06 + 6}l18 -12" stroke="${B}" stroke-width="4" stroke-linecap="round"/>`;
const swords = {
  vb: '0 0 400 200',
  svg: `${sword(30, 196, 236, 22)}${sword(370, 196, 164, 22)}${sword(70, 196, 220, 72)}${sword(330, 196, 180, 72)}
    <g class="sc-pulse-in">${put('star5', 200, 30, 1.6, B)}</g>`,
};

/* ── Kolam koi (pojok kanan bawah) ────────────────────────────── */
const koiPond = {
  vb: '0 0 300 300',
  svg: `${[60, 95, 130].map((r) => `<circle cx="150" cy="150" r="${r}" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.2"/>`).join('')}
    ${[[90, 210], [220, 90], [210, 220]].map(([x, y]) => `<path d="M${x} ${y}m-20 0a20 20 0 1 0 40 0h-20z" fill="${LEAF}" fill-opacity=".7"/>`).join('')}
    <g class="sc-orbit">${put('koi', 150, 60, 1.6, B)}${put('koi', 150, 240, 1.4, 'currentColor', 'transform-origin="150 240"')}</g>`,
};

/* ── Bingkai film (kiri/kanan) ────────────────────────────────── */
const film = {
  vb: '0 0 46 400',
  svg: `<rect width="46" height="400" fill="${INK}" fill-opacity=".85"/>${range(25, (i) => `<rect x="4" y="${4 + i * 16}" width="7" height="9" rx="1.5" fill="#fff" fill-opacity=".7"/><rect x="35" y="${4 + i * 16}" width="7" height="9" rx="1.5" fill="#fff" fill-opacity=".7"/>`)}${range(5, (i) => `<rect x="14" y="${10 + i * 78}" width="18" height="66" fill="currentColor" fill-opacity=".25"/>`)}`,
};

/* ── Burung layang-layang ─────────────────────────────────────── */
const birds = {
  vb: '0 0 300 120',
  svg: [[40, 70, 1], [120, 40, 1.3], [200, 80, 0.8]]
    .map(([x, y, s], i) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-flap" style="--d:${-i * 0.3}s"><path d="M-20 0c8-8 16-8 20 2 4-10 12-10 20-2-8-3-14 0-20 8-6-8-12-11-20-8z" fill="${INK}"/></g></g>`)
    .join(''),
};

/* ── Bola disko, piringan hitam, perangko, jejak kucing ───────── */
const disco = {
  vb: '0 0 120 220',
  svg: `<path d="M60 0v80" stroke="currentColor"/><g class="sc-spin-in">${put('disco', 60, 120, 3.4, 'currentColor')}</g>${range(8, (i) => `<path class="sc-twinkle" style="--d:${-i * 0.4}s" transform="rotate(${i * 45} 60 120)" d="M60 166v20" stroke="${B}" stroke-width="2" stroke-linecap="round"/>`)}`,
};
const vinyl = {
  vb: '0 0 160 160',
  svg: `<g class="sc-spin-in"><circle cx="80" cy="80" r="76" fill="${INK}"/>${[64, 54, 44].map((r) => `<circle cx="80" cy="80" r="${r}" fill="none" stroke="#fff" stroke-opacity=".12"/>`).join('')}<circle cx="80" cy="80" r="24" fill="${B}"/><circle cx="80" cy="80" r="4" fill="#fff"/><path d="M50 40a50 50 0 0 1 20-10" stroke="#fff" stroke-opacity=".3" stroke-width="3" fill="none"/></g>`,
};
const stamps = {
  vb: '0 0 200 200',
  svg: `<g transform="rotate(-12 70 80)"><rect x="30" y="40" width="80" height="96" fill="#fffdf6" stroke="${B}" stroke-width="6" stroke-dasharray="2 4"/><rect x="40" y="50" width="60" height="76" fill="${B}" fill-opacity=".25"/>${put('heart', 70, 88, 1.6, B)}</g>
    <g transform="rotate(10 150 140)"><rect x="118" y="104" width="64" height="76" fill="#fffdf6" stroke="currentColor" stroke-width="5" stroke-dasharray="2 4"/>${put('flower', 150, 142, 1.4, 'currentColor')}</g>
    <g fill="none" stroke="${INK}" stroke-width="1.6"><circle cx="128" cy="62" r="26"/><path d="M90 52q10-6 20 0t20 0 20 0 20 0M90 64q10-6 20 0t20 0 20 0 20 0"/></g>`,
};
const paws = {
  vb: '0 0 200 200',
  svg: [[30, 170, -20], [70, 130, -30], [100, 90, -25], [140, 60, -35], [170, 24, -30]]
    .map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})" fill="${B}" fill-opacity=".6"><ellipse cx="${x}" cy="${y}" rx="9" ry="7"/><circle cx="${x - 9}" cy="${y - 10}" r="3.4"/><circle cx="${x - 3}" cy="${y - 14}" r="3.4"/><circle cx="${x + 3}" cy="${y - 14}" r="3.4"/><circle cx="${x + 9}" cy="${y - 10}" r="3.4"/></g>`)
    .join(''),
};

/* ── Bulu merak (kiri bawah) ──────────────────────────────────── */
const peacock = {
  vb: '0 0 240 240',
  svg: range(8, (i) => {
    const a = (-Math.PI / 2) * (i / 7);
    const x = 200 * Math.cos(a);
    const y = 240 + 200 * Math.sin(a);
    const deg = (a * 180) / Math.PI;
    return `<g class="sc-bloom" style="--d:${-i * 0.4}s"><path d="M0 240L${x} ${y}" stroke="currentColor" stroke-width="1.6"/><g transform="translate(${x} ${y}) rotate(${deg + 90})"><ellipse rx="16" ry="24" fill="${LEAF}" fill-opacity=".8"/><ellipse rx="10" ry="15" fill="${B}"/><ellipse rx="5" ry="7" cy="2" fill="${INK}"/><ellipse rx="2" ry="3" cy="1" fill="currentColor"/></g></g>`;
  }),
};

/* ── Teratai di air (pita bawah) & torii ──────────────────────── */
const lotus = {
  vb: '0 0 300 110',
  svg: `${[30, 50, 70].map((y, i) => `<path d="M0 ${y + 30}q37 -8 75 0t75 0 75 0 75 0" stroke="currentColor" stroke-opacity="${0.4 - i * 0.1}" fill="none"/>`).join('')}
    ${[[60, 84, 1], [230, 90, 0.8]].map(([x, y, s]) => `<ellipse cx="${x + 34 * s}" cy="${y + 8}" rx="${26 * s}" ry="${7 * s}" fill="${LEAF}"/><g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bloom">${range(5, (i) => `<path transform="rotate(${-60 + i * 30})" d="M0 0c-8-12-8-28 0-38 8 10 8 26 0 38z" fill="${B}" fill-opacity="${0.6 + (i % 2) * 0.3}"/>`)}</g></g>`).join('')}`,
};
const torii = {
  vb: '0 0 200 170',
  svg: `<g fill="${B}"><path d="M0 14q100 -20 200 0v14q-100 -16 -200 0z"/><rect x="20" y="44" width="160" height="10"/><rect x="40" y="24" width="14" height="146"/><rect x="146" y="24" width="14" height="146"/><rect x="94" y="28" width="12" height="18"/></g>`,
};

/* ── Lisplang gigi balang Betawi (pita atas) ──────────────────── */
const gigiBalang = {
  vb: '0 0 400 46',
  svg: `<rect width="400" height="10" fill="${B}"/>${range(20, (i) => `<path d="M${i * 20} 10h20l-4 22q-6 10-12 0z" fill="currentColor" fill-opacity=".8"/><circle cx="${i * 20 + 10}" cy="38" r="3" fill="${B}"/>`)}`,
};

export const sceneArt = {
  plum: branch('plum'),
  sakura: branch('sakura'),
  peonyBranch: branch('peony'),
  jasmineBranch: branch('jasmine', { leaves: true }),
  roseBranch: branch('rose', { leaves: true }),
  brass: branch('leaf', { ink: 'currentColor' }),
  frangipaniBranch: branch('frangipani', { leaves: true }),
  bouquet: bouquet('peony', 'flower'),
  roses: bouquet('rose', 'flower'),
  orchids: bouquet('frangipani', 'jasmine'),
  wildflowers: bouquet('flower', 'plum'),
  sakuraBouquet: bouquet('sakura', 'plum'),
  inkHills: hills({ sun: true, pagoda: true }),
  hills: hills({ sun: false }),
  sunHills: hills({ sun: true }),
  fuji,
  lanterns: lanterns('round'),
  lampu: lanterns('moroccan'),
  xi,
  clouds,
  wisteria,
  jasmine,
  meadow: meadow('flower'),
  meadowSakura: meadow('sakura'),
  tree,
  bamboo,
  waves,
  gunungan,
  joglo,
  gonjong,
  tongkonan,
  candi,
  eaves,
  mosque,
  moon,
  deco,
  doodles,
  plane,
  balloons,
  bunting,
  snowPines,
  swords,
  koiPond,
  film,
  birds,
  disco,
  vinyl,
  stamps,
  paws,
  peacock,
  lotus,
  torii,
  gigiBalang,
};

// Bulatkan desimal hasil perhitungan agar markup SVG tetap ringkas.
for (const art of Object.values(sceneArt)) art.svg = art.svg.replace(/(\d+\.\d{1,2})\d+/g, '$1').replace(/\s{2,}/g, ' ');

/** Singkatan lapisan: L('plum', 'tr', 52, 'sway') */
const L = (art, at, w, anim = 'none', o = {}) => ({ art, at, w, anim, depth: 1, op: 1, ...o });

/** Kumpulan scene siap pakai. Tema merujuk lewat `scene: 'id'`. */
export const scenes = {
  none: [],
  xiPlum: [L('xi', 'top', 20, 'pulse', { depth: 0.4 }), L('plum', 'tr', 56, 'sway'), L('plum', 'bl', 44, 'sway', { op: 0.8 }), L('clouds', 'bottom', 100, 'drift', { op: 0.5 })],
  jadeGarden: [L('inkHills', 'bottom', 100, 'none', { depth: 0.6 }), L('plum', 'tr', 54, 'sway'), L('clouds', 'top', 100, 'drift', { op: 0.45 }), L('koiPond', 'br', 46, 'none', { op: 0.7 })],
  lanternNight: [L('lanterns', 'tr', 46, 'none'), L('lanterns', 'tl', 34, 'none', { op: 0.85 }), L('clouds', 'bottom', 100, 'drift', { op: 0.4 }), L('plum', 'bl', 40, 'sway', { op: 0.7 })],
  peonyChinese: [L('peonyBranch', 'tr', 56, 'sway'), L('bouquet', 'bl', 46, 'sway'), L('xi', 'top', 16, 'pulse', { op: 0.9 })],
  palace: [L('eaves', 'top', 100, 'none', { depth: 0.3 }), L('plum', 'br', 44, 'sway'), L('clouds', 'bottom', 100, 'drift', { op: 0.4 })],
  shanShui: [L('sunHills', 'bottom', 100, 'none', { depth: 0.7 }), L('clouds', 'top', 100, 'drift', { op: 0.5 }), L('birds', 'top', 46, 'fly', { op: 0.7 })],
  koi: [L('koiPond', 'br', 60, 'none'), L('koiPond', 'tl', 40, 'none', { op: 0.6 }), L('waves', 'bottom', 100, 'drift', { op: 0.6 }), L('plum', 'tr', 40, 'sway', { op: 0.7 })],
  porcelain: [L('peonyBranch', 'tr', 52, 'sway'), L('clouds', 'bottom', 100, 'drift', { op: 0.5 }), L('clouds', 'top', 100, 'drift', { op: 0.3 })],
  sakuraFuji: [L('fuji', 'bottom', 100, 'none', { depth: 0.6 }), L('sakura', 'tr', 58, 'sway'), L('sakura', 'tl', 40, 'sway', { op: 0.8 })],
  zen: [L('bamboo', 'left', 26, 'sway'), L('lotus', 'bottom', 100, 'none'), L('torii', 'tr', 30, 'none', { op: 0.5 }), L('moon', 'tl', 20, 'pulse', { op: 0.5, depth: 0.3 })],
  hanaRinpa: [L('sakuraBouquet', 'tl', 52, 'sway'), L('waves', 'bottom', 100, 'drift', { op: 0.6 }), L('clouds', 'top', 100, 'drift', { op: 0.4 })],
  korean: [L('eaves', 'top', 100, 'none', { depth: 0.3 }), L('peonyBranch', 'bl', 44, 'sway'), L('hills', 'bottom', 100, 'none', { op: 0.6 })],
  peacock: [L('peacock', 'bl', 56, 'sway'), L('sakura', 'tr', 56, 'sway'), L('clouds', 'top', 100, 'drift', { op: 0.35 })],
  garden: [L('bouquet', 'tl', 50, 'sway'), L('bouquet', 'br', 50, 'sway'), L('birds', 'top', 44, 'fly', { op: 0.6 }), L('meadow', 'bottom', 100, 'none', { op: 0.8 })],
  roseGarden: [L('roses', 'tl', 54, 'sway'), L('roses', 'br', 50, 'sway'), L('roseBranch', 'tr', 40, 'sway', { op: 0.7 })],
  enchanted: [L('tree', 'left', 34, 'sway'), L('tree', 'right', 34, 'sway'), L('meadow', 'bottom', 100, 'none'), L('birds', 'top', 40, 'fly', { op: 0.6 })],
  wisteria: [L('wisteria', 'top', 100, 'none', { depth: 0.4 }), L('wildflowers', 'bl', 44, 'sway'), L('meadow', 'bottom', 100, 'none', { op: 0.7 })],
  meadow: [L('meadow', 'bottom', 100, 'none'), L('wildflowers', 'tr', 44, 'sway'), L('birds', 'top', 40, 'fly', { op: 0.5 }), L('sunHills', 'bottom', 100, 'none', { op: 0.35, depth: 0.5 })],
  sakuraDream: [L('sakura', 'tr', 60, 'sway'), L('sakura', 'tl', 46, 'sway'), L('meadowSakura', 'bottom', 100, 'none', { op: 0.8 })],
  moonGarden: [L('moon', 'tr', 26, 'pulse', { depth: 0.3 }), L('bouquet', 'bl', 50, 'sway'), L('roseBranch', 'tl', 40, 'sway', { op: 0.7 })],
  minimalFloral: [L('roseBranch', 'tr', 44, 'sway', { op: 0.8 }), L('roseBranch', 'bl', 36, 'sway', { op: 0.6 })],
  bohemian: [L('wildflowers', 'tl', 48, 'sway'), L('sunHills', 'bottom', 100, 'none', { op: 0.6 }), L('meadow', 'bottom', 100, 'none', { op: 0.8 })],
  noir: [L('brass', 'tr', 54, 'sway'), L('brass', 'bl', 44, 'sway', { op: 0.8 })],
  deco: [L('deco', 'top', 100, 'none', { depth: 0.3 }), L('deco', 'bottom', 100, 'none', { depth: 0.3 })],
  rustic: [L('wildflowers', 'tl', 46, 'sway'), L('brass', 'br', 40, 'sway', { op: 0.7 }), L('meadow', 'bottom', 100, 'none', { op: 0.6 })],
  snow: [L('snowPines', 'bottom', 100, 'none'), L('moon', 'tr', 22, 'pulse', { op: 0.6, depth: 0.3 })],
  islamic: [L('lampu', 'tr', 42, 'none'), L('lampu', 'tl', 32, 'none', { op: 0.8 }), L('mosque', 'bottom', 100, 'none', { op: 0.7 })],
  islamicJasmine: [L('jasmine', 'top', 100, 'none', { depth: 0.3 }), L('moon', 'tr', 22, 'pulse', { op: 0.8, depth: 0.3 }), L('jasmineBranch', 'bl', 44, 'sway')],
  islamicNight: [L('moon', 'tr', 30, 'pulse', { depth: 0.3 }), L('lampu', 'tl', 34, 'none'), L('mosque', 'bottom', 100, 'none', { op: 0.6 })],
  islamicRose: [L('roses', 'tl', 48, 'sway'), L('lampu', 'tr', 34, 'none', { op: 0.8 }), L('mosque', 'bottom', 100, 'none', { op: 0.5 })],
  khitan: [L('lampu', 'tr', 40, 'none'), L('moon', 'tl', 22, 'pulse', { op: 0.8 }), L('mosque', 'bottom', 100, 'none', { op: 0.6 })],
  jawa: [L('gunungan', 'bl', 30, 'sway'), L('gunungan', 'br', 30, 'sway'), L('jasmine', 'top', 100, 'none', { depth: 0.3, op: 0.9 })],
  pendopo: [L('joglo', 'top', 100, 'none', { depth: 0.3 }), L('gunungan', 'bl', 26, 'sway', { op: 0.8 }), L('gunungan', 'br', 26, 'sway', { op: 0.8 })],
  sunda: [L('bamboo', 'left', 22, 'sway', { op: 0.8 }), L('jasmine', 'top', 100, 'none', { op: 0.8 }), L('hills', 'bottom', 100, 'none', { op: 0.6 })],
  minang: [L('gonjong', 'bottom', 100, 'none', { depth: 0.6 }), L('jasmine', 'top', 100, 'none', { op: 0.85, depth: 0.3 }), L('birds', 'top', 36, 'fly', { op: 0.4 })],
  aceh: [L('mosque', 'bottom', 100, 'none', { op: 0.6 }), L('jasmineBranch', 'tr', 46, 'sway'), L('moon', 'tl', 20, 'pulse', { op: 0.6 })],
  gayo: [L('hills', 'bottom', 100, 'none', { depth: 0.6 }), L('jasmineBranch', 'tr', 46, 'sway'), L('clouds', 'top', 100, 'drift', { op: 0.35 })],
  batak: [L('tongkonan', 'bottom', 100, 'none', { depth: 0.6 }), L('clouds', 'top', 100, 'drift', { op: 0.35 })],
  toraja: [L('tongkonan', 'bottom', 100, 'none', { depth: 0.6 }), L('sunHills', 'bottom', 100, 'none', { op: 0.35, depth: 0.4 }), L('birds', 'top', 40, 'fly', { op: 0.5 })],
  bali: [L('candi', 'bl', 34, 'none'), L('candi', 'br', 34, 'none'), L('frangipaniBranch', 'tr', 44, 'sway')],
  betawi: [L('gigiBalang', 'top', 100, 'none', { depth: 0.3 }), L('roseBranch', 'bl', 40, 'sway', { op: 0.8 }), L('roseBranch', 'tr', 36, 'sway', { op: 0.6 })],
  melayu: [L('jasmine', 'top', 100, 'none', { depth: 0.3 }), L('waves', 'bottom', 100, 'drift', { op: 0.45 }), L('jasmineBranch', 'bl', 40, 'sway')],
  pedangPora: [L('swords', 'top', 100, 'none', { depth: 0.3 }), L('roseBranch', 'bl', 40, 'sway', { op: 0.7 })],
  doodle: [L('doodles', 'tr', 44, 'bob'), L('doodles', 'bl', 40, 'bob'), L('plane', 'bottom', 90, 'none', { op: 0.8 })],
  notebook: [L('plane', 'top', 80, 'none'), L('doodles', 'br', 40, 'bob'), L('stamps', 'tl', 34, 'bob', { op: 0.8 })],
  postal: [L('stamps', 'tr', 42, 'bob'), L('plane', 'bottom', 90, 'none', { op: 0.7 }), L('doodles', 'bl', 34, 'bob', { op: 0.7 })],
  photo: [L('film', 'left', 10, 'none', { op: 0.7 }), L('film', 'right', 10, 'none', { op: 0.7 })],
  retro: [L('disco', 'tr', 26, 'none'), L('disco', 'tl', 18, 'none', { op: 0.7 }), L('bunting', 'top', 100, 'none', { op: 0.8 })],
  music: [L('vinyl', 'tr', 36, 'none'), L('doodles', 'bl', 36, 'bob', { op: 0.7 })],
  kitty: [L('paws', 'br', 46, 'bob'), L('paws', 'tl', 34, 'bob', { op: 0.7 }), L('doodles', 'tr', 30, 'bob', { op: 0.7 })],
  picnic: [L('meadow', 'bottom', 100, 'none'), L('wildflowers', 'tr', 40, 'sway'), L('bunting', 'top', 100, 'none', { op: 0.7 })],
  river: [L('waves', 'bottom', 100, 'drift', { op: 0.7 }), L('clouds', 'top', 100, 'drift', { op: 0.5 }), L('birds', 'top', 40, 'fly', { op: 0.6 })],
  storybook: [L('tree', 'left', 30, 'sway'), L('sunHills', 'bottom', 100, 'none', { depth: 0.6 }), L('clouds', 'top', 100, 'drift', { op: 0.5 }), L('birds', 'top', 40, 'fly', { op: 0.6 })],
  party: [L('balloons', 'tr', 36, 'none'), L('balloons', 'tl', 28, 'none', { op: 0.85 }), L('bunting', 'top', 100, 'none')],
  minimal: [],
};

export const sceneList = Object.keys(scenes);
export const getScene = (id) => scenes[id] ?? scenes.none;
