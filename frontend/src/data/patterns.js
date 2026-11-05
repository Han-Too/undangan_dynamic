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
};
