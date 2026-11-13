/**
 * Pola background tileable. Tiap pola menerima warna dan mengembalikan nilai CSS `url(...)`.
 * Untuk menambah pola baru: tambahkan fungsi di sini, lalu rujuk id-nya dari `pattern.id` pada tema.
 */
const toUrl = (svg) => `url("data:image/svg+xml;utf8,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}")`;

const svg = (w, h, color, body, extra = '') =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' fill='none' stroke='${color}' stroke-width='1' ${extra}>${body}</svg>`;

export const patterns = {
  /** Bunga kecil + daun */
  floral: (c) =>
    toUrl(
      svg(
        120,
        120,
        c,
        `<g transform='translate(60 60)'>
          ${[0, 72, 144, 216, 288].map((a) => `<ellipse rx='5' ry='11' cy='-12' transform='rotate(${a})'/>`).join('')}
          <circle r='3'/>
        </g>
        <path d='M10 12c8-2 14 2 16 10-8 2-14-2-16-10zM94 98c8-2 14 2 16 10-8 2-14-2-16-10z'/>
        <circle cx='108' cy='14' r='2'/><circle cx='12' cy='106' r='2'/>`,
      ),
    ),

  /** Bintang 8 sudut ala geometri Islam */
  islamicStar: (c) =>
    toUrl(
      svg(
        80,
        80,
        c,
        `<rect x='22' y='22' width='36' height='36'/>
         <rect x='22' y='22' width='36' height='36' transform='rotate(45 40 40)'/>
         <circle cx='40' cy='40' r='9'/>
         <path d='M0 0l9 9M80 0l-9 9M0 80l9-9M80 80l-9-9'/>
         <circle cx='0' cy='0' r='6'/><circle cx='80' cy='0' r='6'/><circle cx='0' cy='80' r='6'/><circle cx='80' cy='80' r='6'/>`,
      ),
    ),

  /** Kawung: empat elips bersilang, motif batik klasik */
  kawung: (c) =>
    toUrl(
      svg(
        64,
        64,
        c,
        `<g transform='translate(32 32)'>
          ${[0, 90, 180, 270].map((a) => `<ellipse rx='7' ry='13' cy='-14' transform='rotate(${a})'/>`).join('')}
          <circle r='2.4' fill='${c}'/>
        </g>
        <circle cx='0' cy='0' r='2' fill='${c}'/><circle cx='64' cy='0' r='2' fill='${c}'/>
        <circle cx='0' cy='64' r='2' fill='${c}'/><circle cx='64' cy='64' r='2' fill='${c}'/>`,
      ),
    ),

  /** Hati kecil */
  hearts: (c) =>
    toUrl(
      svg(
        90,
        90,
        c,
        `<path transform='translate(33 30) scale(1.1)' d='M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z'/>
         <path transform='translate(-6 -8) scale(.5)' d='M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z'/>
         <path transform='translate(78 72) scale(.5)' d='M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z'/>`,
      ),
    ),

  /** Konfeti acak: pita kecil, bulatan, dan garis lengkung (ulang tahun) */
  confetti: (c) =>
    toUrl(
      svg(
        100,
        100,
        c,
        `<rect x='14' y='12' width='4' height='12' rx='1' transform='rotate(30 16 18)'/>
         <rect x='70' y='60' width='4' height='12' rx='1' transform='rotate(-25 72 66)'/>
         <circle cx='58' cy='20' r='3'/><circle cx='22' cy='74' r='3.5'/><circle cx='88' cy='36' r='2' fill='${c}'/>
         <circle cx='44' cy='52' r='2' fill='${c}'/>
         <path d='M76 8q4 4 0 8t0 8'/><path d='M36 86q4-4 8 0t8 0'/>`,
      ),
    ),

  /** Polkadot halus */
  dots: (c) =>
    toUrl(
      svg(40, 40, c, `<circle cx='10' cy='10' r='2.2' fill='${c}'/><circle cx='30' cy='30' r='2.2' fill='${c}'/>`),
    ),

  /** Ranting daun (syukuran, natural) */
  leaves: (c) =>
    toUrl(
      svg(
        110,
        110,
        c,
        `<path d='M20 90C40 70 60 60 90 20'/>
         ${[[34, 76, -40], [50, 62, -50], [66, 46, -55], [80, 32, -60]]
           .map(([x, y, r]) => `<path transform='translate(${x} ${y}) rotate(${r})' d='M0 0c4-8 12-10 18-8-2 7-10 11-18 8z'/>
             <path transform='translate(${x} ${y}) rotate(${r + 110})' d='M0 0c4-8 12-10 18-8-2 7-10 11-18 8z'/>`)
           .join('')}
         <circle cx='96' cy='96' r='2'/><circle cx='12' cy='14' r='2'/>`,
      ),
    ),

  /** Kisi belah ketupat minimalis (acara formal / umum) */
  grid: (c) =>
    toUrl(svg(48, 48, c, `<path d='M24 0L48 24 24 48 0 24z'/><circle cx='24' cy='24' r='1.6' fill='${c}'/>`)),

  /** Panah chevron ke atas: simbol pertumbuhan (ucapan sukses) */
  chevron: (c) => toUrl(svg(40, 40, c, `<path d='M10 24l10-8 10 8'/><path d='M14 30l6-5 6 5' stroke-opacity='.5'/>`)),

  /** Mega mendung: awan berlapis khas Cirebon / Jawa Barat (Sunda) */
  megamendung: (c) => {
    const cloud = 'M-30 8c-9 0-9-13 0-13 0-11 15-13 19-4 4-9 19-9 21 2 11-2 13 15 0 15z';
    const layered = (x, y, s) =>
      `<g transform='translate(${x} ${y}) scale(${s})'>${[1, 0.68, 0.38].map((k) => `<path transform='scale(${k})' d='${cloud}'/>`).join('')}</g>`;
    return toUrl(svg(120, 80, c, `${layered(32, 22, 0.9)}${layered(92, 62, 0.9)}${layered(-28, 62, 0.9)}${layered(152, 22, 0.9)}`));
  },

  /** Patra: sulur ukiran Bali */
  patra: (c) =>
    toUrl(
      svg(
        80,
        80,
        c,
        `<path d='M8 72c0-26 26-30 30-12 2 10-12 14-16 6-3-6 4-10 8-6'/>
         <path transform='rotate(180 40 40)' d='M8 72c0-26 26-30 30-12 2 10-12 14-16 6-3-6 4-10 8-6'/>
         <path d='M44 44c6-2 10 2 8 8M36 36c-6 2-10-2-8-8' stroke-opacity='.6'/>
         <circle cx='70' cy='70' r='2' fill='${c}'/><circle cx='10' cy='10' r='2' fill='${c}'/>`,
      ),
    ),

  /** Songket Minang: belah ketupat berisi dan bintik emas */
  songket: (c) =>
    toUrl(
      svg(
        40,
        40,
        c,
        `<path d='M20 2L38 20 20 38 2 20z'/>
         <path d='M20 11l9 9-9 9-9-9z' fill='${c}' fill-opacity='.35'/>
         <circle cx='0' cy='0' r='2' fill='${c}'/><circle cx='40' cy='0' r='2' fill='${c}'/>
         <circle cx='0' cy='40' r='2' fill='${c}'/><circle cx='40' cy='40' r='2' fill='${c}'/>`,
      ),
    ),

  /** Gorga Batak: sulur spiral berpasangan */
  gorga: (c) => {
    const curl = 'M28 30h-8a8 8 0 1 1 8-8 4 4 0 1 1-4 4';
    return toUrl(
      svg(
        60,
        60,
        c,
        `<path d='${curl}'/><path transform='rotate(180 30 30)' d='${curl}'/>
         <path d='M30 26l4 4-4 4-4-4z' fill='${c}'/>
         <path d='M0 0l6 6M60 0l-6 6M0 60l6-6M60 60l-6-6'/>`,
      ),
    );
  },

  /** Lipa' sabbe Bugis: kotak-kotak sarung sutra */
  sabbe: (c) =>
    toUrl(
      svg(
        48,
        48,
        c,
        `<path d='M0 10h48M0 14h48M10 0v48M14 0v48'/>
         <path d='M0 34h48M34 0v48' stroke-opacity='.5'/>
         <rect x='10' y='10' width='4' height='4' fill='${c}' fill-opacity='.5' stroke='none'/>`,
      ),
    ),

  /** Langit malam: bintang kecil & titik */
  stars: (c) =>
    toUrl(
      svg(
        90,
        90,
        c,
        `<path d='M20 12l2 6 6 2-6 2-2 6-2-6-6-2 6-2z' fill='${c}' stroke='none'/>
         <path d='M66 54l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4z' fill='${c}' stroke='none'/>
         <circle cx='70' cy='16' r='1.4' fill='${c}' stroke='none'/><circle cx='30' cy='70' r='1.2' fill='${c}' stroke='none'/>
         <circle cx='48' cy='38' r='.9' fill='${c}' stroke='none'/><circle cx='84' cy='80' r='.9' fill='${c}' stroke='none'/>`,
      ),
    ),

  /** Ombak berlapis */
  waves: (c) => toUrl(svg(60, 30, c, `<path d='M0 10q7.5-8 15 0t15 0 15 0 15 0'/><path d='M0 25q7.5-8 15 0t15 0 15 0 15 0' stroke-opacity='.5'/>`)),

  /** Kepingan salju */
  snow: (c) =>
    toUrl(
      svg(
        80,
        80,
        c,
        `<g transform='translate(22 22)'>${[0, 60, 120].map((a) => `<path transform='rotate(${a})' d='M0-9V9M-3-6l3 3 3-3M-3 6l3-3 3 3'/>`).join('')}</g>
         <g transform='translate(62 60) scale(.6)'>${[0, 60, 120].map((a) => `<path transform='rotate(${a})' d='M0-9V9'/>`).join('')}</g>
         <circle cx='62' cy='18' r='1.5' fill='${c}' stroke='none'/><circle cx='18' cy='64' r='1.5' fill='${c}' stroke='none'/>`,
      ),
    ),

  /** Kotak-kotak gingham (piknik) */
  gingham: (c) =>
    toUrl(
      svg(28, 28, c, `<rect width='14' height='28' fill='${c}' fill-opacity='.5' stroke='none'/><rect width='28' height='14' fill='${c}' fill-opacity='.5' stroke='none'/>`),
    ),

  /** Terrazzo: serpihan acak */
  terrazzo: (c) =>
    toUrl(
      svg(
        100,
        100,
        c,
        `<path d='M12 14l8-3 3 7-7 3z' fill='${c}' stroke='none'/><path d='M62 20l10 2-3 8-8-3z' fill='${c}' fill-opacity='.6' stroke='none'/>
         <path d='M34 58l6-6 5 6-6 5z' fill='${c}' fill-opacity='.8' stroke='none'/><path d='M80 66l9 1-1 8-9-2z' fill='${c}' stroke='none'/>
         <circle cx='18' cy='84' r='3' fill='${c}' fill-opacity='.6' stroke='none'/><circle cx='52' cy='88' r='1.6' fill='${c}' stroke='none'/>
         <circle cx='88' cy='36' r='1.8' fill='${c}' stroke='none'/><circle cx='44' cy='30' r='1.2' fill='${c}' stroke='none'/>`,
      ),
    ),

  /** Ketupat & bintang (Lebaran) */
  ketupat: (c) =>
    toUrl(
      svg(
        70,
        70,
        c,
        `<path d='M20 8l10 10-10 10-10-10z' fill='${c}' fill-opacity='.35'/><path d='M15 13l10 10M25 13L15 23'/>
         <path d='M54 44l2 5 5 2-5 2-2 5-2-5-5-2 5-2z' fill='${c}' stroke='none'/>`,
      ),
    ),

  /** Lingkaran bertumpuk ala art deco */
  deco: (c) =>
    toUrl(svg(40, 20, c, `<path d='M0 20a20 20 0 0 1 40 0M6 20a14 14 0 0 1 28 0M12 20a8 8 0 0 1 16 0'/>`)),

  /** Pita tumpal (segitiga berderet) untuk batas section bergaya Jawa */
  tumpalBand: (c) =>
    toUrl(
      svg(
        28,
        14,
        c,
        `<path d='M0 0h28' stroke-width='2'/><path d='M3 2l11 11 11-11z' fill='${c}' fill-opacity='.85' stroke='none'/>`,
      ),
    ),

  /** Kisi jendela Tionghoa (pola siku berulang) */
  lattice: (c) =>
    toUrl(svg(48, 48, c, `<path d='M0 8h16v16H8v16h32V24h-8V8h16M24 0v8M24 40v8M0 40h8M40 40h8'/><rect x='16' y='16' width='16' height='16'/>`, "stroke-width='1.4'")),

  /** Awan ruyi bergulung */
  ruyi: (c) =>
    toUrl(
      svg(
        90,
        60,
        c,
        `<path d='M14 40c-6 0-8-8-2-10 0-7 9-9 12-3 4-5 12-2 11 4 6 0 7 9 1 9z'/><path d='M20 36c0-3 4-3 4 0M30 36c0-3 4-3 4 0'/>
         <path d='M59 20c-6 0-8-8-2-10 0-7 9-9 12-3 4-5 12-2 11 4 6 0 7 9 1 9z'/>`,
      ),
    ),

  /** Porselen biru-putih: bunga dalam medali */
  porcelain: (c) =>
    toUrl(
      svg(
        70,
        70,
        c,
        `<circle cx='35' cy='35' r='22'/><circle cx='35' cy='35' r='18' stroke-dasharray='2 3'/>
         <g transform='translate(35 35)'>${[0, 60, 120, 180, 240, 300].map((a) => `<path transform='rotate(${a})' d='M0 0c-4-5-4-10 0-13 4 3 4 8 0 13z'/>`).join('')}<circle r='2.5' fill='${c}'/></g>
         <path d='M0 0q8 4 0 8M70 0q-8 4 0 8M0 70q8-4 0-8M70 70q-8-4 0-8'/>`,
      ),
    ),

  /** Parang (batik Jawa diagonal) */
  parang: (c) =>
    toUrl(
      svg(
        40,
        40,
        c,
        `<path d='M-10 30L30-10M10 50L50 10'/><path d='M4 16c4-4 10-4 12 0s-2 8-6 6M24 36c4-4 10-4 12 0s-2 8-6 6' fill='${c}' fill-opacity='.25'/>`,
        "stroke-width='1.6'",
      ),
    ),

  /** Kerawang Gayo: sulur bertingkat */
  kerawang: (c) =>
    toUrl(
      svg(
        60,
        40,
        c,
        `<path d='M0 20h60M0 6h60M0 34h60' stroke-opacity='.5'/>
         <path d='M10 20c0-8 10-8 10 0s10 8 10 0 10-8 10 0 10 8 10 0' stroke-width='1.6'/>
         <path d='M5 6l5-4 5 4 5-4 5 4 5-4 5 4 5-4 5 4 5-4 5 4 5-4 5 4M5 34l5 4 5-4 5 4 5-4 5 4 5-4 5 4 5-4 5 4 5-4 5 4 5-4'/>`,
      ),
    ),

  /** Ukiran Toraja (pa'barre allo): matahari berjari */
  toraja: (c) =>
    toUrl(
      svg(
        56,
        56,
        c,
        `<circle cx='28' cy='28' r='10' fill='${c}' fill-opacity='.3'/><circle cx='28' cy='28' r='4'/>
         <g transform='translate(28 28)'>${Array.from({ length: 12 }, (_, i) => `<path transform='rotate(${i * 30})' d='M0-13l3-7-3-3-3 3z'/>`).join('')}</g>
         <path d='M0 0l8 8M56 0l-8 8M0 56l8-8M56 56l-8-8'/>`,
      ),
    ),

  /** Kain poleng Bali (kotak catur) */
  poleng: (c) => toUrl(svg(28, 28, c, `<rect width='14' height='14' fill='${c}' fill-opacity='.55' stroke='none'/><rect x='14' y='14' width='14' height='14' fill='${c}' fill-opacity='.55' stroke='none'/>`)),

  /** Damask klasik */
  damask: (c) =>
    toUrl(
      svg(
        60,
        80,
        c,
        `<path d='M30 8c-10 8-12 20-4 30-8-2-14 4-10 10 4 5 10 2 10-2 0 10 2 18 4 26 2-8 4-16 4-26 0 4 6 7 10 2 4-6-2-12-10-10 8-10 6-22-4-30z' fill='${c}' fill-opacity='.18'/>
         <circle cx='0' cy='0' r='4'/><circle cx='60' cy='0' r='4'/><circle cx='0' cy='80' r='4'/><circle cx='60' cy='80' r='4'/>`,
      ),
    ),

  /** Buku catatan bergaris + margin merah */
  notebook: (c) => toUrl(svg(40, 24, c, `<path d='M0 23.5h40' stroke-opacity='.7'/>`)),

  /** Seigaiha (ombak Jepang) */
  seigaiha: (c) =>
    toUrl(svg(40, 20, c, `${[16, 11, 6].map((r) => `<path d='M${20 - r} 20a${r} ${r} 0 0 1 ${r * 2} 0M${-r} 10a${r} ${r} 0 0 1 ${r * 2} 0M${40 - r} 10a${r} ${r} 0 0 1 ${r * 2} 0'/>`).join('')}`)),

  /** Ubin Maroko */
  moroccan: (c) =>
    toUrl(svg(40, 40, c, `<path d='M20 0c4 6 10 8 20 10-10 2-16 4-20 10-4-6-10-8-20-10 10-2 16-4 20-10zM20 20c4 6 10 8 20 10-10 2-16 4-20 10-4-6-10-8-20-10 10-2 16-4 20-10z'/>`)),

  /** Kipas art deco bertumpuk */
  fan: (c) =>
    toUrl(
      svg(
        48,
        32,
        c,
        `<path d='M0 32a24 24 0 0 1 48 0'/><path d='M24 32V8M24 32L8 14M24 32l16-18M24 32L2 24M24 32l22-8'/><path d='M12 32a12 12 0 0 1 24 0' fill='${c}' fill-opacity='.18'/>`,
      ),
    ),

  /** Garis tipis horizontal (minimalis) */
  lines: (c) => toUrl(svg(10, 22, c, `<path d='M0 21.5h10'/>`)),

  /** Songket bertabur bunga emas (Melayu) */
  tenun: (c) =>
    toUrl(
      svg(
        44,
        44,
        c,
        `<path d='M22 6l6 16-6 16-6-16z' fill='${c}' fill-opacity='.22'/><path d='M22 14l3 8-3 8-3-8z'/><path d='M0 22h10M34 22h10M0 0l6 6M44 0l-6 6M0 44l6-6M44 44l-6-6'/>`,
      ),
    ),
};
