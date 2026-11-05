/**
 * Daftar font yang bisa dipilih user. Untuk menambah font: tambahkan satu entri di sini.
 *  - axes   : bagian `family=` pada URL Google Fonts setelah nama (kosong = default font)
 *  - kind   : menentukan fallback font stack
 *  - scale  : kompensasi ukuran visual (font script tampak lebih kecil dari serif/sans)
 *  - group  : pengelompokan di menu Font (lihat `fontGroups`)
 */
const SERIF4 = 'ital,wght@0,400;0,500;0,600;1,400';
const SANS = 'ital,wght@0,300;0,400;0,500;0,600;1,400';

export const fonts = [
  // Serif — elegan & klasik
  { name: 'Playfair Display', kind: 'serif', group: 'serif', axes: SERIF4, scale: 0.94 },
  { name: 'Cormorant Garamond', kind: 'serif', group: 'serif', axes: SERIF4, scale: 1.12 },
  { name: 'Lora', kind: 'serif', group: 'serif', axes: SERIF4, scale: 0.96 },
  { name: 'EB Garamond', kind: 'serif', group: 'serif', axes: SERIF4, scale: 1.06 },
  { name: 'Libre Baskerville', kind: 'serif', group: 'serif', axes: 'ital,wght@0,400;0,700;1,400', scale: 0.86 },
  { name: 'Bodoni Moda', kind: 'serif', group: 'serif', axes: SERIF4, scale: 0.96 },
  { name: 'Crimson Pro', kind: 'serif', group: 'serif', axes: SERIF4, scale: 1.04 },
  { name: 'Prata', kind: 'serif', group: 'serif', axes: '', scale: 0.9 },
  // Display — judul berkarakter
  { name: 'Cinzel', kind: 'serif', group: 'display', axes: 'wght@400;500;600', scale: 0.84 },
  { name: 'Cinzel Decorative', kind: 'serif', group: 'display', axes: 'wght@400;700', scale: 0.8 },
  { name: 'Marcellus', kind: 'serif', group: 'display', axes: '', scale: 0.94 },
  { name: 'DM Serif Display', kind: 'serif', group: 'display', axes: 'ital@0;1', scale: 0.96 },
  { name: 'Abril Fatface', kind: 'serif', group: 'display', axes: '', scale: 0.9 },
  { name: 'Yeseva One', kind: 'serif', group: 'display', axes: '', scale: 0.92 },
  { name: 'Italiana', kind: 'serif', group: 'display', axes: '', scale: 1.04 },
  { name: 'Gilda Display', kind: 'serif', group: 'display', axes: '', scale: 1 },
  { name: 'Bebas Neue', kind: 'sans', group: 'display', axes: '', scale: 1.1 },
  { name: 'Oswald', kind: 'sans', group: 'display', axes: 'wght@300;400;500;600', scale: 0.98 },
  // Sans — modern & bersih
  { name: 'Poppins', kind: 'sans', group: 'sans', axes: SANS, scale: 1 },
  { name: 'Montserrat', kind: 'sans', group: 'sans', axes: SANS, scale: 1 },
  { name: 'Inter', kind: 'sans', group: 'sans', axes: 'wght@300;400;500;600', scale: 1 },
  { name: 'Raleway', kind: 'sans', group: 'sans', axes: SANS, scale: 0.98 },
  { name: 'Josefin Sans', kind: 'sans', group: 'sans', axes: SANS, scale: 1.02 },
  { name: 'Quicksand', kind: 'sans', group: 'sans', axes: 'wght@300;400;500;600', scale: 1 },
  { name: 'Nunito', kind: 'sans', group: 'sans', axes: SANS, scale: 1 },
  { name: 'Jost', kind: 'sans', group: 'sans', axes: SANS, scale: 1 },
  { name: 'Outfit', kind: 'sans', group: 'sans', axes: 'wght@300;400;500;600', scale: 1 },
  { name: 'Lato', kind: 'sans', group: 'sans', axes: 'ital,wght@0,300;0,400;0,700;1,400', scale: 1 },
  { name: 'Fredoka', kind: 'sans', group: 'sans', axes: 'wght@400;500;600', scale: 0.98 },
  // Script — kaligrafi & romantis
  { name: 'Great Vibes', kind: 'script', group: 'script', axes: '', scale: 1.3 },
  { name: 'Dancing Script', kind: 'script', group: 'script', axes: 'wght@400;500;600', scale: 1.12 },
  { name: 'Pinyon Script', kind: 'script', group: 'script', axes: '', scale: 1.15 },
  { name: 'Parisienne', kind: 'script', group: 'script', axes: '', scale: 1.15 },
  { name: 'Alex Brush', kind: 'script', group: 'script', axes: '', scale: 1.28 },
  { name: 'Allura', kind: 'script', group: 'script', axes: '', scale: 1.32 },
  { name: 'Sacramento', kind: 'script', group: 'script', axes: '', scale: 1.42 },
  { name: 'Tangerine', kind: 'script', group: 'script', axes: 'wght@400;700', scale: 1.6 },
  { name: 'Italianno', kind: 'script', group: 'script', axes: '', scale: 1.45 },
  { name: 'Mrs Saint Delafield', kind: 'script', group: 'script', axes: '', scale: 1.45 },
  { name: 'Pacifico', kind: 'script', group: 'script', axes: '', scale: 0.95 },
  { name: 'Satisfy', kind: 'script', group: 'script', axes: '', scale: 1.1 },
  { name: 'Kaushan Script', kind: 'script', group: 'script', axes: '', scale: 1 },
  // Tulisan tangan — santai & personal
  { name: 'Caveat', kind: 'script', group: 'hand', axes: 'wght@400;500;600', scale: 1.18 },
  { name: 'Amatic SC', kind: 'sans', group: 'hand', axes: 'wght@400;700', scale: 1.25 },
  { name: 'Patrick Hand', kind: 'sans', group: 'hand', axes: '', scale: 1.05 },
  { name: 'Shadows Into Light', kind: 'script', group: 'hand', axes: '', scale: 1.1 },
];

/** Grup font di menu Font. `body: false` = terlalu dekoratif untuk teks panjang. */
export const fontGroups = [
  { id: 'serif', name: 'Serif', body: true },
  { id: 'display', name: 'Display', body: false },
  { id: 'sans', name: 'Sans', body: true },
  { id: 'script', name: 'Script', body: false },
  { id: 'hand', name: 'Tulisan tangan', body: false },
];

const FALLBACK = {
  sans: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  script: '"Brush Script MT", cursive',
};

export const getFont = (name) => fonts.find((f) => f.name === name) || fonts.find((f) => f.name === 'Poppins');

export const fontStack = (name) => `'${getFont(name).name}', ${FALLBACK[getFont(name).kind]}`;

const familyParam = (f) => f.name.replace(/ /g, '+') + (f.axes ? `:${f.axes}` : '');

export const fontUrl = (name) => `https://fonts.googleapis.com/css2?family=${familyParam(getFont(name))}&display=swap`;

/** Satu URL untuk banyak font sekaligus (dipakai panel Font agar cukup satu request). */
export const fontsUrl = (names) =>
  `https://fonts.googleapis.com/css2?${names.map((n) => `family=${familyParam(getFont(n))}`).join('&')}&display=swap`;
