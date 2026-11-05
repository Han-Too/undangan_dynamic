/**
 * Bingkai cover. Semua digambar dengan currentColor (= warna primary tema) sehingga cocok di tema apa pun.
 * Menambah bingkai: tambahkan satu entri di `coverFrames`.
 *
 *  line     garis bingkai: single | double | arch | mihrab | polaroid | dashed | none
 *  corner   ornamen sudut: id `cornerArt` di bawah, atau tipe OrnamentCorner (floral|geometric|tumpal|vine)
 *  corners  sudut yang dipakai (default keempatnya) → bisa asimetris, mis. ['tl', 'br']
 *  top / bottom   ornamen tengah atas / bawah (id `edgeArt`)
 *  edge     pita berulang di tepi atas & bawah: scallop | tumpal | dots
 */

const flower = (x, y, r = 1) =>
  `<g transform="translate(${x} ${y}) scale(${r})">${[0, 72, 144, 216, 288].map((a) => `<ellipse rx="3.4" ry="6.5" cy="-6.5" transform="rotate(${a})"/>`).join('')}<circle r="2" fill="currentColor"/></g>`;
const leaf = (x, y, a, s = 1, fill = false) =>
  `<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0c5-8 14-8 18 0-4 8-13 8-18 0z"${fill ? ' fill="currentColor" fill-opacity=".25"' : ''}/>`;
const balloon = (x, y, s, o = 0.3) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="9" ry="11" fill="currentColor" fill-opacity="${o}"/><path d="M-2 11h4l-2 3z" fill="currentColor"/><path d="M0 14c3 6-3 10 0 18"/></g>`;
const sparkle = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-10l2.2 7.8L10 0l-7.8 2.2L0 10l-2.2-7.8L-10 0l7.8-2.2z" fill="currentColor"/>`;

/** Ornamen sudut kustom (viewBox 120×120, digambar di kiri-atas). */
export const cornerArt = {
  deco: `<path d="M6 114V6h108"/><path d="M16 114V16h98" stroke-opacity=".5"/><path d="M6 40h14v-14h14V12h14V6M40 6v8h-8v8h-8v8h-8v10" stroke-width="1.4"/><path d="M26 26l8 8M26 26v12M26 26h12" stroke-opacity=".7"/>`,
  bouquet: `<path d="M4 110C10 64 40 26 96 6"/>${leaf(8, 92, -95, 1.1, true)}${leaf(14, 62, -75, 1.1, true)}${leaf(34, 36, -50, 1, true)}${leaf(62, 16, -25, 0.9, true)}${leaf(26, 80, -40, 0.8)}${flower(48, 52, 1.5)}${flower(22, 24, 1)}${flower(84, 14, 0.8)}${flower(14, 44, 0.7)}`,
  leaves: `<path d="M4 116C6 70 30 30 80 6"/>${[[6, 98, -100], [10, 76, -85], [18, 56, -70], [30, 38, -55], [46, 24, -40], [64, 12, -25]].map(([x, y, a]) => `${leaf(x, y, a, 1, true)}${leaf(x, y, a + 120, 0.8)}`).join('')}`,
  balloons: `${balloon(30, 30, 1.6, 0.35)}${balloon(62, 22, 1.2, 0.22)}${balloon(18, 66, 1.1, 0.22)}${sparkle(84, 50, 0.5)}${sparkle(48, 70, 0.4)}`,
  stars: `${sparkle(24, 24, 1.3)}${sparkle(58, 16, 0.7)}${sparkle(16, 58, 0.7)}${sparkle(46, 46, 0.45)}<circle cx="80" cy="30" r="2" fill="currentColor"/><circle cx="30" cy="82" r="2" fill="currentColor"/>`,
  bracket: `<path d="M8 60V8h52" stroke-width="2.4"/><path d="M18 40V18h22" stroke-opacity=".5"/>`,
  diamond: `<path d="M8 8l14 0 0 14-14 0z" transform="rotate(45 15 15)" fill="currentColor" fill-opacity=".3"/><circle cx="15" cy="15" r="2" fill="currentColor"/>`,
  ribbon: `<path d="M0 34L34 0h22L0 56z" fill="currentColor" fill-opacity=".22"/><path d="M0 34L34 0M0 56L56 0"/><path d="M0 66L66 0" stroke-opacity=".5"/>`,
};

/** Ornamen tengah atas/bawah (viewBox 200×48). Bagian bawah otomatis dicerminkan. */
export const edgeArt = {
  fan: `<path d="M100 44V6"/>${[-60, -40, -20, 20, 40, 60].map((a) => `<path transform="rotate(${a} 100 44)" d="M100 44V10"/>`).join('')}<path d="M62 44a38 38 0 0 1 76 0"/><path d="M78 44a22 22 0 0 1 44 0" fill="currentColor" fill-opacity=".2"/>`,
  gunungan: `<path d="M100 4c14 10 22 24 22 40H78c0-16 8-30 22-40z" fill="currentColor" fill-opacity=".15"/><path d="M100 4c14 10 22 24 22 40H78c0-16 8-30 22-40zM100 12v32M100 26c-6-2-9-6-10-10M100 26c6-2 9-6 10-10M100 36c-8-2-12-6-14-10M100 36c8-2 12-6 14-10"/><path d="M40 40h30M130 40h30"/>`,
  star: `<path transform="translate(88 6)" d="M23 12l-5.9 2.1 2.7 5.7-5.7-2.7L12 23l-2.1-5.9-5.7 2.7 2.7-5.7L1 12l5.9-2.1-2.7-5.7 5.7 2.7L12 1l2.1 5.9 5.7-2.7-2.7 5.7z"/><path d="M40 18h40M120 18h40" /><circle cx="36" cy="18" r="2" fill="currentColor"/><circle cx="164" cy="18" r="2" fill="currentColor"/>`,
  bow: `<path d="M100 22c-14-14-34-14-30 0s16 6 30 0zM100 22c14-14 34-14 30 0s-16 6-30 0z" fill="currentColor" fill-opacity=".25"/><path d="M100 22l-12 22M100 22l12 22"/><circle cx="100" cy="22" r="4" fill="currentColor"/>`,
  crown: `<path d="M74 40h52l6-24-14 10-18-20-18 20-14-10z" fill="currentColor" fill-opacity=".18"/><path d="M74 40h52l6-24-14 10-18-20-18 20-14-10z"/><circle cx="100" cy="6" r="2.5" fill="currentColor"/>`,
  floral: `${flower(100, 22, 1.4)}${leaf(84, 24, 180, 1)}${leaf(116, 24, 0, 1)}${leaf(78, 30, 160, 0.7)}${leaf(122, 18, -20, 0.7)}<path d="M30 24h40M130 24h40"/>`,
  heart: `<path transform="translate(88 8)" d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" fill="currentColor" fill-opacity=".3"/><path d="M40 20c20 0 30 10 44 4M160 20c-20 0-30 10-44 4"/>`,
};

export const coverFrames = [
  { id: 'theme', name: 'Ikuti tema' },
  { id: 'none', name: 'Tanpa bingkai', line: 'none' },
  { id: 'single', name: 'Garis tipis', line: 'single' },
  { id: 'double', name: 'Garis ganda', line: 'double', corner: 'diamond' },
  { id: 'dashed', name: 'Putus-putus', line: 'dashed', top: 'heart' },
  { id: 'deco', name: 'Art Deco', line: 'single', corner: 'deco', top: 'fan', bottom: 'fan' },
  { id: 'bouquet', name: 'Buket bunga', corner: 'bouquet', corners: ['tl', 'br'] },
  { id: 'floral4', name: 'Bunga sudut', line: 'single', corner: 'floral' },
  { id: 'floralTop', name: 'Mahkota bunga', line: 'double', top: 'floral', bottom: 'floral' },
  { id: 'leaves', name: 'Daun rambat', corner: 'leaves', corners: ['tl', 'tr', 'bl', 'br'] },
  { id: 'arch', name: 'Jendela lengkung', line: 'arch', top: 'star' },
  { id: 'mihrab', name: 'Mihrab', line: 'mihrab', corner: 'geometric', top: 'star' },
  { id: 'tumpal', name: 'Tumpal batik', corner: 'tumpal', edge: 'tumpal' },
  { id: 'gunungan', name: 'Gunungan', line: 'double', top: 'gunungan', bottom: 'gunungan' },
  { id: 'vine', name: 'Hati merambat', corner: 'vine' },
  { id: 'balloons', name: 'Balon', corner: 'balloons', corners: ['tl', 'tr'], top: 'bow' },
  { id: 'stars', name: 'Bintang kilau', corner: 'stars', line: 'single' },
  { id: 'royal', name: 'Royal', line: 'double', corner: 'geometric', top: 'crown' },
  { id: 'polaroid', name: 'Polaroid', line: 'polaroid' },
  { id: 'bracket', name: 'Siku modern', corner: 'bracket' },
  { id: 'ribbon', name: 'Pita sudut', corner: 'ribbon', corners: ['tl', 'br'] },
  { id: 'scallop', name: 'Renda', edge: 'scallop', line: 'single' },
  { id: 'dots', name: 'Manik-manik', edge: 'dots', corner: 'diamond', line: 'single' },
];

export const getFrame = (id) => coverFrames.find((f) => f.id === id) ?? coverFrames[0];
