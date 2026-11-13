/**
 * Bingkai cover. Semua digambar dengan currentColor (= warna primary tema) sehingga cocok di tema apa pun.
 * Menambah bingkai: tambahkan satu entri di `coverFrames`.
 *
 *  line     garis bingkai: single | double | triple | thick | dashed | dotted | rounded | oval | offset
 *           | arch | polaroid | none, atau bentuk SVG (`svgLines`): mihrab | dome | chamfer | ticket | wavy
 *  corner   ornamen sudut: id `cornerArt` di bawah, atau tipe OrnamentCorner (floral|geometric|tumpal|vine)
 *  corners  sudut yang dipakai (default keempatnya) → bisa asimetris, mis. ['tl', 'br']
 *  top / bottom   ornamen tengah atas / bawah (id `edgeArt`)
 *  edge     pita berulang di tepi atas & bawah: scallop | tumpal | dots | bunting | wave | zigzag | lights
 */

const flower = (x, y, r = 1) =>
  `<g transform="translate(${x} ${y}) scale(${r})">${[0, 72, 144, 216, 288].map((a) => `<ellipse rx="3.4" ry="6.5" cy="-6.5" transform="rotate(${a})"/>`).join('')}<circle r="2" fill="currentColor"/></g>`;
const leaf = (x, y, a, s = 1, fill = false) =>
  `<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0c5-8 14-8 18 0-4 8-13 8-18 0z"${fill ? ' fill="currentColor" fill-opacity=".25"' : ''}/>`;
const balloon = (x, y, s, o = 0.3) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="9" ry="11" fill="currentColor" fill-opacity="${o}"/><path d="M-2 11h4l-2 3z" fill="currentColor"/><path d="M0 14c3 6-3 10 0 18"/></g>`;
const sparkle = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-10l2.2 7.8L10 0l-7.8 2.2L0 10l-2.2-7.8L-10 0l7.8-2.2z" fill="currentColor"/>`;

const flowerFill = (x, y, r = 1) =>
  `<g transform="translate(${x} ${y}) scale(${r})">${[0, 72, 144, 216, 288].map((a) => `<ellipse rx="3.6" ry="5.6" cy="-5.6" transform="rotate(${a})" fill="currentColor" fill-opacity=".22"/>`).join('')}<circle r="1.8" fill="currentColor"/></g>`;
const flake = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})">${[0, 60, 120].map((a) => `<path transform="rotate(${a})" d="M0-10V10M-3-7l3 3 3-3M-3 7l3-3 3 3"/>`).join('')}</g>`;
const lantern = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-12 6c0-3 5-4 12-4s12 1 12 4v18c0 3-5 4-12 4s-12-1-12-4z" fill="currentColor" fill-opacity=".2"/><path d="M-6 2h12M-12 6c0-3 5-4 12-4s12 1 12 4v18c0 3-5 4-12 4s-12-1-12-4zM-4 3v26M4 3v26M0 28v6"/></g>`;
const bfly = (x, y, s, a = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s}) translate(-12 -12)"><path d="M11.2 11C9 5 4 2 2 4s0 8 4.5 9C3 14 3 19 5.5 20s4.5-3 5.7-7.5zM12.8 11C15 5 20 2 22 4s0 8-4.5 9c3.5 1 3.5 6 1 7s-4.5-3-5.7-7.5z" fill="currentColor" fill-opacity=".25"/><path d="M12 7v12M11 6l-2-3M13 6l2-3"/></g>`;
const rose = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle r="9.5" fill="currentColor" fill-opacity=".14"/><path d="M0 0c2-2 5 0 3 3s-7 1-6-4 7-7 11-2 1 11-5 11-11-5-9-11"/></g>`;
const note = (x, y, s, a = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><ellipse rx="5" ry="3.6" transform="rotate(-20)" fill="currentColor"/><path d="M4.5-1V-20l9 3"/></g>`;
const ketupat = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0l10 10-10 10-10-10z" fill="currentColor" fill-opacity=".2"/><path d="M0 0l10 10-10 10-10-10zM-5 5l10 10M5 5L-5 15M0 20v8"/></g>`;
/** Titik di busur seperempat lingkaran (sudut kiri-atas) dengan jari-jari r. */
const arcPts = (r, n) => Array.from({ length: n }, (_, i) => {
  const a = (i / (n - 1)) * (Math.PI / 2);
  return [+(r * Math.cos(a)).toFixed(1), +(r * Math.sin(a)).toFixed(1)];
});
const wavyLine = (y, len, amp = 4, w = 12) => {
  let d = `M0 ${y}`;
  for (let x = 0, k = 0; x < len; x += w, k++) d += `q${w / 2} ${k % 2 ? amp : -amp} ${w} 0`;
  return `<path d="${d}"/>`;
};


/* ── Bentuk dua warna (currentColor = primary, --c-secondary = isi bunga/aksen) ── */
const SEC = 'var(--c-secondary)';
const peonyF = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" stroke="none">${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse rx="6" ry="8" cy="-7" transform="rotate(${a})" fill="${SEC}" fill-opacity=".45"/>`).join('')}${[0, 72, 144, 216, 288].map((a) => `<ellipse rx="4" ry="5.5" cy="-4" transform="rotate(${a + 36})" fill="${SEC}" fill-opacity=".85"/>`).join('')}<circle r="2.6" fill="currentColor"/></g>`;
const plumF = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" stroke="none">${[0, 72, 144, 216, 288].map((a) => `<circle cy="-4.2" r="3.4" transform="rotate(${a})" fill="${SEC}"/>`).join('')}<circle r="1.6" fill="currentColor"/></g>`;
const pearl = (x, y, r = 3) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="currentColor" fill-opacity=".22"/><circle cx="${(x - r * 0.3).toFixed(1)}" cy="${(y - r * 0.3).toFixed(1)}" r="${(r * 0.3).toFixed(2)}" fill="#fff" fill-opacity=".8" stroke="none"/>`;
const heartP = (x, y, s, fill, op = 1) => `<path transform="translate(${x} ${y}) scale(${s}) translate(-12 -12)" d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" fill="${fill}" fill-opacity="${op}" stroke="none"/>`;
/** Cerminkan seni sudut terhadap diagonal agar simetris di kedua sisi. */
const diag = (svg) => `${svg}<g transform="matrix(0 1 1 0 0 0)">${svg}</g>`;
const dove = (x, y, s, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><path d="M-14 4c4-8 12-10 18-6l8-6-2 7c4 1 6 4 4 7-6 4-18 5-28-2z" fill="currentColor" fill-opacity=".2"/><path d="M-14 4c4-8 12-10 18-6l8-6-2 7c4 1 6 4 4 7-6 4-18 5-28-2zM-2 -2c-2-8-10-12-16-10 2 6 8 10 16 10z"/><circle cx="9" cy="-3" r=".9" fill="currentColor"/></g>`;
const lanternF = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cy="12" rx="10" ry="11" fill="${SEC}" stroke="none"/><path d="M-5 2c-4 6-4 14 0 20M5 2c4 6 4 14 0 20M0 1v22" stroke-opacity=".6"/><path d="M-5 0h10M-5 24h10M0 24v8" stroke-width="1.6"/></g>`;
const polar = (r, deg) => [(r * Math.cos((deg * Math.PI) / 180)).toFixed(1), (r * Math.sin((deg * Math.PI) / 180)).toFixed(1)];

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
  swirl: `<path d="M8 112C8 60 30 22 70 10c18-5 32 2 30 14-2 10-16 10-18 2-1-6 6-8 9-4"/><path d="M8 80c10-6 22-4 24 6 2 8-8 12-12 6"/><path d="M40 30c-4-10 2-20 12-20M24 52c-10 0-14-10-8-16" stroke-opacity=".6"/><circle cx="102" cy="8" r="2.5" fill="currentColor"/><circle cx="8" cy="114" r="2.5" fill="currentColor"/>`,
  lace: `<path d="M0 64A64 64 0 0 0 64 0"/><path d="M0 50A50 50 0 0 0 50 0" stroke-opacity=".6"/><path d="M0 30A30 30 0 0 0 30 0" stroke-opacity=".4"/>${arcPts(72, 9).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join('')}${arcPts(57, 7).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="currentColor"/>`).join('')}${flowerFill(14, 14, 1)}`,
  bamboo: `<path d="M16 120V0M32 120V30" stroke-width="3.4" stroke-opacity=".45"/><path d="M12 34h8M12 72h8M12 106h8M28 56h8M28 94h8" stroke-width="1.6"/>${leaf(16, 34, -25, 2.4, true)}${leaf(16, 34, -65, 2, true)}${leaf(32, 56, -10, 2.2, true)}${leaf(16, 72, -40, 1.8, true)}${leaf(32, 94, -20, 1.8, true)}`,
  moon: `<path transform="translate(8 6) scale(2.6)" d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" fill="currentColor" fill-opacity=".2"/><path transform="translate(8 6) scale(2.6)" d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" stroke-width=".5"/>${sparkle(84, 22, 0.6)}${sparkle(72, 62, 0.4)}${sparkle(26, 86, 0.5)}<circle cx="100" cy="50" r="1.6" fill="currentColor"/><circle cx="54" cy="96" r="1.6" fill="currentColor"/>`,
  lanterns: `<path d="M26 0v26M62 0v12M94 0v34" stroke-opacity=".7"/>${lantern(26, 26, 1.1)}${lantern(62, 12, 0.8)}${lantern(94, 34, 0.9)}`,
  snow: `${flake(22, 22, 1.4)}${flake(62, 16, 0.8)}${flake(18, 62, 0.8)}${flake(52, 52, 0.55)}${flake(92, 34, 0.5)}${flake(34, 94, 0.5)}<circle cx="80" cy="64" r="2" fill="currentColor"/>`,
  butterfly: `<path d="M10 110C20 80 30 70 50 64s30-18 36-40" stroke-dasharray="3 5" stroke-opacity=".6"/>${bfly(30, 30, 1.8, -20)}${bfly(86, 18, 1, 15)}${bfly(16, 82, 0.9, -35)}`,
  confetti: `${[[16, 18, 20], [44, 10, -30], [24, 46, 60], [70, 24, 15], [10, 76, -20], [52, 50, 40], [92, 12, -50]].map(([x, y, a], i) => (i % 3 === 2 ? `<circle cx="${x}" cy="${y}" r="4" fill="currentColor" fill-opacity=".5"/>` : `<rect x="${x - 3}" y="${y - 8}" width="6" height="16" rx="1.5" transform="rotate(${a} ${x} ${y})" fill="currentColor" fill-opacity="${i % 2 ? '.35' : '.7'}" stroke="none"/>`)).join('')}${sparkle(40, 80, 0.5)}`,
  geo: `<path d="M4 4h70L4 74z" fill="currentColor" fill-opacity=".12"/><path d="M4 4h70L4 74z"/><path d="M4 4l34 34M22 4v18H4" stroke-opacity=".6"/><path d="M90 4L60 34M4 90l30-30" stroke-opacity=".5"/><circle cx="38" cy="38" r="3" fill="currentColor"/><path d="M100 4h16M4 100v16" stroke-width="2"/>`,
  roses: `<path d="M4 116C8 72 32 30 80 8"/>${leaf(14, 80, -80, 1.2, true)}${leaf(32, 46, -50, 1.1, true)}${leaf(58, 22, -30, 1, true)}${rose(40, 40, 2)}${rose(16, 60, 1.2)}${rose(72, 16, 1.1)}`,
  baroque: `<path d="M6 114V60c0-14 10-20 18-14 6 5 2 14-4 12"/><path d="M114 6H60c-14 0-20 10-14 18 5 6 14 2 12-4"/><path d="M12 12c22 0 34 12 34 34-12 0-34-8-34-34z" fill="currentColor" fill-opacity=".14"/><path d="M12 12c22 0 34 12 34 34-12 0-34-8-34-34zM24 24l22 22" stroke-opacity=".8"/><path d="M50 50c6 2 10 6 12 12M6 34c8 0 14 4 16 10M34 6c0 8 4 14 10 16" stroke-opacity=".5"/><circle cx="12" cy="12" r="3" fill="currentColor"/>`,
  sakura: `<path d="M0 34C30 38 64 26 108 4M40 32c4-10 14-16 24-16M70 22c10 6 14 14 14 24" stroke-width="1.6"/>${flowerFill(30, 36, 1.6)}${flowerFill(66, 18, 1.2)}${flowerFill(84, 46, 1)}${flowerFill(104, 6, 0.8)}${flowerFill(10, 56, 0.8)}`,
  tropical: `${leaf(2, 2, 8, 4.8, true)}${leaf(2, 2, 45, 5.4, true)}${leaf(2, 2, 82, 4.8, true)}${leaf(6, 40, 40, 2.2)}${leaf(40, 6, 50, 2.2)}<path d="M2 2l84 12M2 2l68 68M2 2l12 84" stroke-opacity=".5"/>${flower(96, 60, 1)}${sparkle(60, 100, 0.4)}`,
  notes: `${wavyLine(14, 110, 3, 20)}${wavyLine(22, 96, 3, 20)}${wavyLine(30, 82, 3, 20)}${note(26, 64, 1.4, -10)}${note(66, 50, 1, 12)}${note(16, 104, 0.9, -20)}`,
  ketupat: `<path d="M24 0v18M58 0v34M90 0v12" stroke-opacity=".7"/>${ketupat(24, 18, 1.3)}${ketupat(58, 34, 1)}${ketupat(90, 12, 0.8)}${sparkle(30, 90, 0.4)}`,
  peony: `<path d="M4 116C10 70 40 30 104 6" stroke-width="1.6"/><path d="M40 52c8-6 12-16 10-26M70 26c10 2 18 8 22 18"/>${leaf(20, 86, -90, 1.2, true)}${leaf(52, 40, -40, 1.1, true)}${leaf(86, 16, -20, 1, true)}${peonyF(36, 46, 2)}${peonyF(78, 20, 1.3)}${peonyF(14, 84, 1.1)}${plumF(56, 64, 0.9)}`,
  plum: `<path d="M0 30C26 34 50 26 72 10M36 30c8 8 10 20 6 32M58 20c10-2 22 2 30 10M14 32c-4 12-2 26 6 38" stroke-width="2.2" stroke-linecap="round"/>${[[18, 30, 1.4], [44, 26, 1.6], [70, 12, 1.2], [42, 60, 1.2], [86, 28, 1], [20, 66, 1]].map(([x, y, sc]) => plumF(x, y, sc)).join('')}${[[60, 20], [30, 44], [92, 34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="${SEC}" stroke="none"/>`).join('')}`,
  lattice: `<path d="M4 116V4h112" stroke-width="1.6"/><path d="M14 106V14h92" stroke-opacity=".6"/><path d="M14 44h16V30h14V14M44 30h14v14H44zM30 44v14H14M58 14v16" stroke-width="1.3"/><rect x="34" y="34" width="6" height="6" fill="currentColor"/><path d="M74 14v8h8M14 74h8v8" stroke-opacity=".6"/>`,
  ruyi: `<path d="M6 70c-4-22 10-34 26-28 4-16 28-18 34 0 16-6 28 10 18 24" fill="${SEC}" fill-opacity=".18"/><path d="M6 70c-4-22 10-34 26-28 4-16 28-18 34 0 16-6 28 10 18 24"/><path d="M26 54c-2-6 6-8 8-2M50 44c0-6 8-6 8 0M70 54c2-6 10-4 8 2" stroke-opacity=".7"/><path d="M6 6h40M6 6v40" stroke-width="1.6"/><path d="M6 6c10 0 14 8 10 14-4 4-10 0-8-4"/>`,
  filigree: diag(`<path d="M6 114V58c0-18 14-28 28-22 10 4 8 18-2 18-6 0-8-8-2-10"/><path d="M6 80c10 0 16-6 16-14" stroke-opacity=".6"/><circle cx="6" cy="114" r="2.4" fill="currentColor"/><circle cx="20" cy="36" r="1.6" fill="currentColor"/>`) + `<path d="M8 8c14 0 22 6 22 22-16 0-22-8-22-22z" fill="${SEC}" fill-opacity=".25"/><path d="M8 8l18 18"/><circle cx="8" cy="8" r="3" fill="currentColor"/>`,
  decoFan: `${[30, 52, 74].map((r, i) => `<path d="M0 ${r}A${r} ${r} 0 0 0 ${r} 0"${i === 0 ? ` fill="${SEC}" fill-opacity=".25"` : ''}/>`).join('')}${[15, 30, 45, 60, 75].map((a) => `<path d="M0 0L${polar(86, a).join(' ')}" stroke-opacity=".7"/>`).join('')}<path d="M96 4h20M4 96v20" stroke-width="2"/><path d="M90 10h26M10 90v26" stroke-opacity=".5"/>`,
  jasmine: `<path d="M0 6h120" stroke-width="1.6"/>${[[12, 70], [30, 96], [48, 60], [66, 84], [84, 46], [102, 64]].map(([x, len]) => `<path d="M${x} 6V${len}" stroke-opacity=".6"/>${Array.from({ length: Math.floor(len / 12) }, (_, j) => `<ellipse cx="${x}" cy="${14 + j * 12}" rx="3" ry="4" fill="#fffdf4"/>`).join('')}<g transform="translate(${x} ${len + 5})">${[0, 60, 120, 180, 240, 300].map((a) => `<path transform="rotate(${a})" d="M0 0c-1.6-3-1.6-7 0-10 1.6 3 1.6 7 0 10z" fill="#fffdf4"/>`).join('')}<circle r="1.4" fill="currentColor"/></g>`).join('')}`,
  goldLeaf: `<path d="M4 116C12 70 40 32 96 6" stroke-width="1.4"/>${[[10, 96, -100], [16, 74, -80], [26, 54, -65], [40, 38, -50], [58, 24, -35], [78, 12, -20]].map(([x, y, a], i) => `${leaf(x, y, a, 1.3, true)}${leaf(x, y, a + (i % 2 ? 110 : 130), 1, true)}`).join('')}${sparkle(60, 60, 0.5)}${sparkle(24, 30, 0.4)}`,
  eucalyptus: `<path d="M4 116C14 72 44 34 100 8" stroke-width="1.4"/>${[[12, 96], [18, 78], [28, 60], [42, 44], [58, 30], [76, 18], [94, 10]].map(([x, y], i) => `<circle cx="${x + (i % 2 ? 10 : -6)}" cy="${y + (i % 2 ? -4 : 6)}" r="${7 - i * 0.5}" fill="${SEC}" fill-opacity=".28"/>`).join('')}`,
  orchid: `<path d="M4 116C10 80 30 46 70 20" stroke-width="1.4"/>${[[30, 70, 1.4], [54, 38, 1.1], [16, 98, 0.9]].map(([x, y, sc]) => `<g transform="translate(${x} ${y}) scale(${sc})">${[0, 120, 240].map((a) => `<ellipse rx="4" ry="11" cy="-10" transform="rotate(${a})" fill="${SEC}" fill-opacity=".35"/>`).join('')}${[60, 300].map((a) => `<ellipse rx="6" ry="9" cy="-8" transform="rotate(${a})" fill="${SEC}" fill-opacity=".6" stroke="none"/>`).join('')}<path d="M-4 2c0 6 8 6 8 0z" fill="currentColor"/></g>`).join('')}${leaf(20, 110, -60, 2, true)}`,
  pearls: `${Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    return pearl(8 + t * 104, 8 + Math.sin(Math.PI * t) * 26, 3.4 - Math.abs(0.5 - t) * 2);
  }).join('')}${Array.from({ length: 8 }, (_, i) => {
    const t = i / 7;
    return pearl(8 + Math.sin(Math.PI * t) * 20, 22 + t * 84, 3 - Math.abs(0.5 - t) * 1.6);
  }).join('')}<path d="M60 34v10"/><path d="M60 44l4 6-4 6-4-6z" fill="currentColor"/>`,
  feather: `<path d="M4 116C30 90 60 60 92 20" stroke-width="1.4"/>${Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    const x = (4 + t * 80).toFixed(1);
    const y = (116 - t * 90).toFixed(1);
    return `<path d="M${x} ${y}l${(-10 + t * 4).toFixed(1)} ${(-12 + t * 2).toFixed(1)}M${x} ${y}l${(12 - t * 2).toFixed(1)} ${(8 - t * 2).toFixed(1)}" stroke-opacity=".5"/>`;
  }).join('')}<g transform="translate(92 22) rotate(40)"><ellipse rx="12" ry="17" fill="#6f9a5c" fill-opacity=".45"/><ellipse rx="7" ry="10" fill="${SEC}"/><ellipse rx="3" ry="4.5" fill="currentColor"/></g>`,
  washi: `<path d="M-6 52L52-6l20 20-58 58z" fill="${SEC}" fill-opacity=".45" stroke="none"/><path d="M-6 52L52-6M14 72L72 14" stroke-dasharray="3 3" stroke-opacity=".7"/><path d="M8 50l40-40M18 60l40-40" stroke="#fff" stroke-opacity=".55" stroke-width="2.5"/>`,
  photoCorner: `<path d="M6 6h52L6 58z" fill="currentColor" fill-opacity=".75" stroke="none"/><path d="M14 14h30L14 44z" fill="#fff" fill-opacity=".25" stroke="none"/><path d="M6 66v48M66 6h48" stroke-opacity=".5"/>`,
  hearts: `${heartP(26, 26, 1.8, SEC, 0.85)}${heartP(60, 18, 1, 'currentColor', 0.6)}${heartP(18, 62, 1.1, 'currentColor', 0.6)}${heartP(50, 50, 0.7, SEC, 0.7)}${heartP(86, 30, 0.6, SEC, 0.5)}${heartP(30, 90, 0.6, SEC, 0.5)}${sparkle(76, 64, 0.4)}`,
  kerawang: `<path d="M4 116V4h112" stroke-width="1.6"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${14 + i * 16} 14l6 6 6-6M14 ${14 + i * 16}l6 6-6 6"/>`).join('')}<path d="M24 24l14 14M38 24v14H24" stroke-width="1.4"/><path d="M30 30l6 6-6 6-6-6z" fill="${SEC}" stroke="none"/>`,
  halftone: Array.from({ length: 64 }, (_, k) => {
    const i = k % 8;
    const j = Math.floor(k / 8);
    const r = 3.6 - (i + j) * 0.36;
    return r > 0.4 ? `<circle cx="${8 + i * 13}" cy="${8 + j * 13}" r="${r.toFixed(2)}" fill="currentColor" stroke="none"/>` : '';
  }).join(''),
  waves: `${[0, 1, 2, 3].map((k) => `<g transform="translate(0 ${10 + k * 12})" stroke-opacity="${1 - k * 0.2}">${wavyLine(0, 110 - k * 24, 4, 14)}</g>`).join('')}<circle cx="16" cy="76" r="3" fill="currentColor"/><circle cx="30" cy="92" r="2" fill="currentColor"/>`,
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
  lotus: `<path d="M100 44C88 34 88 18 100 6c12 12 12 28 0 38z" fill="currentColor" fill-opacity=".2"/><path d="M100 44C88 34 88 18 100 6c12 12 12 28 0 38zM100 44C84 40 74 28 76 16c12 2 22 14 24 28zM100 44c16-4 26-16 24-28-12 2-22 14-24 28z"/><path d="M100 44c-20 2-34-6-40-16 14-2 30 4 40 16zm0 0c20 2 34-6 40-16-14-2-30 4-40 16z" stroke-opacity=".7"/><path d="M24 44h34M142 44h34"/>`,
  crescent: `<path transform="translate(82 2) scale(1.7)" d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" fill="currentColor" fill-opacity=".25"/>${sparkle(70, 16, 0.4)}${sparkle(134, 12, 0.5)}<path d="M30 30h32M138 30h32"/><circle cx="26" cy="30" r="2" fill="currentColor"/><circle cx="174" cy="30" r="2" fill="currentColor"/>`,
  cloud: `<path d="M56 42c0-10 8-16 18-13 2-11 16-15 24-8 7-9 22-6 24 5 11-2 20 7 18 16z" fill="currentColor" fill-opacity=".14"/><path d="M56 42c0-10 8-16 18-13 2-11 16-15 24-8 7-9 22-6 24 5 11-2 20 7 18 16z"/><path d="M68 42c0-6 5-9 10-8 1-7 10-9 15-5 4-5 13-4 15 3 7-1 12 4 11 10" stroke-opacity=".55"/><path d="M14 42h36M150 42h36"/>`,
  diamonds: `${[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => `<path d="M${100 + i * 18} ${i === 0 ? 8 : 14}l${i === 0 ? 9 : 6} ${i === 0 ? 12 : 8}-${i === 0 ? 9 : 6} ${i === 0 ? 12 : 8}-${i === 0 ? 9 : 6}-${i === 0 ? 12 : 8}z"${i === 0 ? ' fill="currentColor" fill-opacity=".3"' : Math.abs(i) % 2 ? '' : ' stroke-opacity=".6"'}/>`).join('')}`,
  laurel: `<path d="M98 42C80 42 62 34 50 18M102 42c18 0 36-8 48-24"/>${[[86, 40, 200], [74, 36, 215], [63, 29, 230], [54, 20, 245]].map(([x, y, a]) => `${leaf(x, y, a, 0.8, true)}${leaf(x, y, a - 60, 0.7)}`).join('')}${[[114, 40, -20], [126, 36, -35], [137, 29, -50], [146, 20, -65]].map(([x, y, a]) => `${leaf(x, y, a, 0.8, true)}${leaf(x, y, a + 60, 0.7)}`).join('')}<circle cx="100" cy="42" r="2.5" fill="currentColor"/>`,
  banner: `<path d="M52 12h96v22H52z" fill="currentColor" fill-opacity=".14"/><path d="M52 12h96v22H52zM52 17H30l8 7-8 7h22M148 17h22l-8 7 8 7h-22"/><path d="M62 23h76" stroke-opacity=".5" stroke-dasharray="2 3"/>`,
  dome: `<path d="M78 46V32c0-10 12-14 22-24 10 10 22 14 22 24v14z" fill="currentColor" fill-opacity=".14"/><path d="M78 46V32c0-10 12-14 22-24 10 10 22 14 22 24v14zM100 8V2M60 46V20M140 46V20M56 20h8l-4-8zM136 20h8l-4-8zM90 46V36a10 10 0 0 1 20 0v10"/><path d="M20 46h160"/>`,
  rings: `<circle cx="91" cy="28" r="13"/><circle cx="109" cy="28" r="13"/><path d="M109 6l4 5-4 5-4-5z" fill="currentColor"/><path d="M30 28h40M130 28h40"/><circle cx="26" cy="28" r="2" fill="currentColor"/><circle cx="174" cy="28" r="2" fill="currentColor"/>`,
  cake: `<path d="M74 44V28h52v16z" fill="currentColor" fill-opacity=".16"/><path d="M68 44h64M74 44V28h52v16M74 34c4 4 9 4 13 0s9-4 13 0 9 4 13 0 9-4 13 0"/><path d="M88 28v-9M100 28v-9M112 28v-9"/>${[88, 100, 112].map((x) => `<path d="M${x} 18c-2.4-2.6-2.4-5 0-9 2.4 4 2.4 6.4 0 9z" fill="currentColor"/>`).join('')}<path d="M30 44h30M140 44h30"/>`,
  cap: `<path d="M100 8L68 21l32 13 32-13z" fill="currentColor" fill-opacity=".2"/><path d="M100 8L68 21l32 13 32-13zM84 28v9c0 5 32 5 32 0v-9M128 22v13"/><circle cx="128" cy="37" r="2.4" fill="currentColor"/><path d="M24 30h36M140 30h36"/>`,
  butterfly: `${bfly(100, 24, 1.5)}<path d="M28 30c20-10 34 6 50-4M172 30c-20-10-34 6-50-4" stroke-dasharray="3 4"/>`,
  xi: `<path d="M20 24h46M134 24h46"/><path d="M66 24c-6-6-14-4-14 2s8 6 8 0M134 24c6-6 14-4 14 2s-8 6-8 0" stroke-opacity=".8"/><circle cx="100" cy="24" r="20" fill="${SEC}" stroke="none"/><circle cx="100" cy="24" r="17" stroke-dasharray="2 3"/><text x="100" y="25" text-anchor="middle" dominant-baseline="central" font-size="22" font-family="serif" fill="currentColor" stroke="none">囍</text>`,
  peony: `${leaf(74, 26, 180, 1.2, true)}${leaf(126, 26, 0, 1.2, true)}${leaf(70, 32, 160, 0.8)}${leaf(130, 20, -20, 0.8)}${peonyF(100, 26, 1.7)}<path d="M18 26h40M142 26h40"/>`,
  doves: `${dove(76, 26, 1.1)}${dove(124, 26, 1.1, true)}${heartP(100, 14, 0.6, SEC)}<path d="M20 40h44M136 40h44" stroke-opacity=".7"/>`,
  pagoda: `<path d="M44 40q56-10 112 0l-10-10q-46-8-92 0z" fill="${SEC}" fill-opacity=".8" stroke="none"/><path d="M44 40q56-10 112 0M54 30q46-8 92 0"/><path d="M66 26q34-8 68 0l-8-8q-26-6-52 0z" fill="${SEC}" fill-opacity=".6" stroke="none"/><path d="M100 4v14M96 8h8"/><path d="M14 44h30M156 44h30"/>`,
  gonjong: `<path d="M50 44l6-16q-2-10-8-20 14 8 22 16 16-4 30-4t30 4q8-8 22-16-6 10-8 20l6 16z" fill="${SEC}" fill-opacity=".7" stroke="none"/><path d="M50 44l6-16q-2-10-8-20 14 8 22 16 16-4 30-4t30 4q8-8 22-16-6 10-8 20l6 16"/><path d="M14 44h28M158 44h28"/>`,
  sunburst: `<path d="M64 46a36 36 0 0 1 72 0" fill="${SEC}" fill-opacity=".25"/>${Array.from({ length: 11 }, (_, i) => {
    const a = 180 + 18 * i;
    const [x1, y1] = polar(40, a);
    const [x2, y2] = polar(52, a);
    return `<path d="M${(100 + +x1).toFixed(1)} ${(46 + +y1).toFixed(1)}L${(100 + +x2).toFixed(1)} ${(46 + +y2).toFixed(1)}"/>`;
  }).join('')}<path d="M10 46h44M146 46h44"/>`,
  pearls: `${Array.from({ length: 15 }, (_, i) => {
    const t = i / 14;
    return pearl(30 + t * 140, 6 + Math.sin(Math.PI * t) * 24, 3.2);
  }).join('')}<path d="M100 32v6"/><path d="M100 38l5 6-5 4-5-4z" fill="${SEC}" stroke="none"/>`,
  filigree: `<path d="M100 24c-8-12-24-14-30-4-4 8 4 14 10 10 4-3 2-8-2-8M100 24c8-12 24-14 30-4 4 8-4 14-10 10-4-3-2-8 2-8M70 24H16M130 24h54"/><path d="M60 24c-6 6-14 6-18 0M140 24c6 6 14 6 18 0" stroke-opacity=".6"/><path d="M100 14l7 10-7 10-7-10z" fill="${SEC}" stroke="none"/><circle cx="16" cy="24" r="2" fill="currentColor"/><circle cx="184" cy="24" r="2" fill="currentColor"/>`,
  lanterns2: `<path d="M0 2h200" stroke-opacity=".6"/><path d="M58 2v10M142 2v10"/>${lanternF(58, 12, 1)}${lanternF(142, 12, 1)}`,
  swirl: `<path d="M100 24c-10-14-30-14-34 0-3 10 10 14 14 6M100 24c10-14 30-14 34 0 3 10-10 14-14 6M66 24H20M134 24h46"/><path d="M100 16l6 8-6 8-6-8z" fill="currentColor"/>`,
};

/** Garis bingkai berbentuk (viewBox 100×100, direntangkan). Lapis kedua = garis dalam yang lebih pudar. */
const wavyRect = (m, amp, n) => {
  const seg = (100 - 2 * m) / n;
  let d = `M${m} ${m}`;
  const run = (dx, dy, nx, ny) => {
    for (let i = 0; i < n; i++) d += `q${(dx * seg) / 2 + nx * (i % 2 ? amp : -amp)} ${(dy * seg) / 2 + ny * (i % 2 ? amp : -amp)} ${dx * seg} ${dy * seg}`;
  };
  run(1, 0, 0, 1);
  run(0, 1, -1, 0);
  run(-1, 0, 0, -1);
  run(0, -1, 1, 0);
  return `${d}Z`;
};
/** Lengkung atas bergerigi renda (dibentuk dari busur-busur kecil). */
function scallopArch(m, off) {
  const n = 14;
  const cx = 50;
  const cy = 34 + off;
  const rx = 50 - m;
  const ry = 30 - off;
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const a = Math.PI - (Math.PI * i) / n;
    return [cx + rx * Math.cos(a), cy - ry * Math.sin(a)];
  });
  let d = `M${m} ${100 - m}V${cy}`;
  for (let i = 1; i < pts.length; i++) {
    const [x, y] = pts[i];
    const [px, py] = pts[i - 1];
    const r = Math.hypot(x - px, y - py) * 0.62;
    d += `A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d}V${100 - m}Z`;
}
export const svgLines = {
  mihrab: ['M8 98V32Q8 14 50 3Q92 14 92 32V98Z', 'M12 96V33Q12 17 50 7Q88 17 88 33V96Z'],
  dome: ['M6 98V40C6 26 30 22 40 14 46 9 48 5 50 2 52 5 54 9 60 14 70 22 94 26 94 40V98Z', 'M10 96V41C10 29 32 25 42 17 47 12 49 9 50 7 51 9 53 12 58 17 68 25 90 29 90 41V96Z'],
  chamfer: ['M14 2H86L98 12V88L86 98H14L2 88V12Z', 'M16 5H84L95 14V86L84 95H16L5 86V14Z'],
  ticket: ['M10 2H90A8 6 0 0 0 98 8V92A8 6 0 0 0 90 98H10A8 6 0 0 0 2 92V8A8 6 0 0 0 10 2Z', 'M12 5H88A8 6 0 0 0 95 10V90A8 6 0 0 0 88 95H12A8 6 0 0 0 5 90V10A8 6 0 0 0 12 5Z'],
  wavy: [wavyRect(2, 1.4, 14), wavyRect(5, 1, 14)],
  pointed: ['M8 98V44C8 28 30 26 40 16C46 10 50 2 50 2C50 2 54 10 60 16C70 26 92 28 92 44V98Z', 'M12 96V45C12 31 32 29 42 19C47 14 50 8 50 8C50 8 53 14 58 19C68 29 88 31 88 45V96Z'],
  keyhole: ['M12 98V54C12 42 6 34 6 26A44 24 0 0 1 94 26C94 34 88 42 88 54V98Z', 'M16 95V55C16 44 10 36 10 27A40 21 0 0 1 90 27C90 36 84 44 84 55V95Z'],
  octagon: ['M28 2H72L98 16V84L72 98H28L2 84V16Z', 'M30 5H70L95 18V82L70 95H30L5 82V18Z'],
  decoStep: ['M12 2H88V6H94V10H98V90H94V94H88V98H12V94H6V90H2V10H6V6H12Z', 'M14 5H86V9H91V13H95V87H91V91H86V95H14V91H9V87H5V13H9V9H14Z'],
  scallopArch: [scallopArch(8, 0), scallopArch(12, 3)],
  gothic: ['M8 98V38C8 18 30 6 50 2C70 6 92 18 92 38V98Z', 'M12 96V39C12 21 32 10 50 6C68 10 88 21 88 39V96Z'],
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
  { id: 'swirl', name: 'Ukiran klasik', line: 'single', corner: 'swirl' },
  { id: 'baroque', name: 'Barok', line: 'double', corner: 'baroque', top: 'crown' },
  { id: 'lace', name: 'Renda doily', corner: 'lace', line: 'rounded' },
  { id: 'roses', name: 'Mawar', corner: 'roses', corners: ['tl', 'br'], top: 'rings' },
  { id: 'rings', name: 'Cincin kawin', line: 'rounded', corner: 'vine', corners: ['tl', 'br'], top: 'rings' },
  { id: 'sakura', name: 'Sakura', corner: 'sakura', corners: ['tr', 'bl'], line: 'single' },
  { id: 'tropical', name: 'Tropis', corner: 'tropical', corners: ['tl', 'br'] },
  { id: 'bamboo', name: 'Bambu', corner: 'bamboo', corners: ['tl', 'br'], line: 'single' },
  { id: 'lotus', name: 'Teratai', line: 'double', top: 'lotus', bottom: 'lotus' },
  { id: 'laurel', name: 'Mahkota daun', line: 'triple', top: 'laurel', bottom: 'laurel' },
  { id: 'cloud', name: 'Mega mendung', line: 'double', top: 'cloud', bottom: 'cloud' },
  { id: 'dome', name: 'Kubah', line: 'dome', top: 'crescent' },
  { id: 'moon', name: 'Bulan bintang', line: 'arch', corner: 'moon', corners: ['tr'] },
  { id: 'lanterns', name: 'Lentera', line: 'dome', corner: 'lanterns', corners: ['tl', 'tr'] },
  { id: 'ketupat', name: 'Ketupat lebaran', line: 'single', corner: 'ketupat', corners: ['tl', 'tr'], bottom: 'crescent' },
  { id: 'bunting', name: 'Bendera pesta', edge: 'bunting', corner: 'confetti', corners: ['bl', 'br'] },
  { id: 'confetti', name: 'Konfeti', corner: 'confetti', line: 'dotted' },
  { id: 'cake', name: 'Kue ulang tahun', line: 'rounded', top: 'cake', corner: 'balloons', corners: ['bl', 'br'] },
  { id: 'lights', name: 'Lampu tumblr', edge: 'lights', line: 'rounded' },
  { id: 'butterfly', name: 'Kupu-kupu', corner: 'butterfly', corners: ['tl', 'br'], top: 'butterfly' },
  { id: 'snow', name: 'Salju', corner: 'snow', line: 'rounded' },
  { id: 'notes', name: 'Melodi', corner: 'notes', corners: ['tl', 'br'], line: 'rounded' },
  { id: 'cap', name: 'Toga wisuda', line: 'double', top: 'cap', bottom: 'laurel' },
  { id: 'banner', name: 'Pita judul', line: 'single', top: 'banner', corner: 'diamond' },
  { id: 'geo', name: 'Geometris', corner: 'geo', corners: ['tl', 'br'], line: 'thick' },
  { id: 'halftone', name: 'Halftone', corner: 'halftone', corners: ['tl', 'br'] },
  { id: 'waves', name: 'Ombak', corner: 'waves', corners: ['tl', 'br'], line: 'single' },
  { id: 'waveEdge', name: 'Renda ombak', edge: 'wave', line: 'rounded', top: 'swirl' },
  { id: 'zigzag', name: 'Zigzag', edge: 'zigzag', line: 'single' },
  { id: 'diamonds', name: 'Berlian', line: 'double', top: 'diamonds', bottom: 'diamonds' },
  { id: 'swirlTop', name: 'Sulur tengah', line: 'oval', top: 'swirl', bottom: 'swirl' },
  { id: 'oval', name: 'Cermin oval', line: 'oval', top: 'floral' },
  { id: 'rounded', name: 'Sudut bulat', line: 'rounded', corner: 'diamond' },
  { id: 'triple', name: 'Garis tripel', line: 'triple' },
  { id: 'thick', name: 'Garis tebal', line: 'thick', corner: 'bracket' },
  { id: 'dotted', name: 'Titik-titik', line: 'dotted', top: 'star', bottom: 'star' },
  { id: 'offset', name: 'Bingkai geser', line: 'offset' },
  { id: 'chamfer', name: 'Sudut potong', line: 'chamfer', corner: 'diamond' },
  { id: 'ticket', name: 'Tiket', line: 'ticket', top: 'star' },
  { id: 'wavy', name: 'Bergelombang', line: 'wavy' },
  { id: 'peony', name: 'Peony', corner: 'peony', corners: ['tr', 'bl'], line: 'single', top: 'peony' },
  { id: 'plum', name: 'Ranting plum', corner: 'plum', corners: ['tl', 'br'], line: 'double' },
  { id: 'chineseWindow', name: 'Jendela kisi', corner: 'lattice', line: 'double', top: 'xi' },
  { id: 'xiMedal', name: 'Medali 囍', line: 'chamfer', top: 'xi', corner: 'ruyi', corners: ['bl', 'br'] },
  { id: 'ruyi', name: 'Awan ruyi', corner: 'ruyi', line: 'rounded', top: 'cloud' },
  { id: 'pagoda', name: 'Atap pagoda', line: 'single', top: 'pagoda', corner: 'lattice', corners: ['bl', 'br'] },
  { id: 'lanternPair', name: 'Sepasang lampion', top: 'lanterns2', line: 'octagon', corner: 'plum', corners: ['bl', 'br'] },
  { id: 'filigree', name: 'Filigri emas', corner: 'filigree', line: 'double', top: 'filigree', bottom: 'filigree' },
  { id: 'luxe', name: 'Bingkai mewah', line: 'decoStep', corner: 'filigree', top: 'crown', bottom: 'swirl' },
  { id: 'decoFan', name: 'Kipas deco', corner: 'decoFan', line: 'decoStep', top: 'sunburst' },
  { id: 'gatsby', name: 'Gatsby', line: 'decoStep', corner: 'deco', top: 'fan', bottom: 'fan' },
  { id: 'sunburst', name: 'Mentari', line: 'triple', top: 'sunburst', bottom: 'sunburst' },
  { id: 'jasmine', name: 'Untaian melati', corner: 'jasmine', corners: ['tl', 'tr'], line: 'arch' },
  { id: 'pointed', name: 'Lengkung runcing', line: 'pointed', top: 'crescent', corner: 'geometric', corners: ['bl', 'br'] },
  { id: 'keyhole', name: 'Lubang kunci', line: 'keyhole', top: 'star' },
  { id: 'octagon', name: 'Oktagon', line: 'octagon', corner: 'diamond' },
  { id: 'scallopArch', name: 'Lengkung renda', line: 'scallopArch', top: 'pearls' },
  { id: 'gothic', name: 'Jendela katedral', line: 'gothic', top: 'crown' },
  { id: 'pearls', name: 'Untaian mutiara', corner: 'pearls', line: 'rounded', top: 'pearls' },
  { id: 'goldLeaf', name: 'Daun emas', corner: 'goldLeaf', corners: ['tl', 'br'], line: 'single' },
  { id: 'eucalyptus', name: 'Eukaliptus', corner: 'eucalyptus', corners: ['tr', 'bl'], line: 'oval' },
  { id: 'orchid', name: 'Anggrek', corner: 'orchid', corners: ['tl', 'br'], line: 'single' },
  { id: 'peacock', name: 'Bulu merak', corner: 'feather', corners: ['bl', 'br'], top: 'peony' },
  { id: 'doves', name: 'Merpati', line: 'double', top: 'doves', bottom: 'laurel' },
  { id: 'heartsCluster', name: 'Taburan hati', corner: 'hearts', corners: ['tl', 'br'], top: 'heart' },
  { id: 'washi', name: 'Selotip washi', corner: 'washi', corners: ['tl', 'br'], line: 'single' },
  { id: 'album', name: 'Sudut album', corner: 'photoCorner', line: 'single' },
  { id: 'kerawang', name: 'Kerawang', corner: 'kerawang', line: 'double', edge: 'tumpal' },
  { id: 'gonjong', name: 'Atap gonjong', line: 'double', top: 'gonjong', corner: 'tumpal' },
  { id: 'moonGate', name: 'Gerbang bulan', line: 'oval', corner: 'lattice', corners: ['bl', 'br'], top: 'xi' },
];

export const getFrame = (id) => coverFrames.find((f) => f.id === id) ?? coverFrames[0];
