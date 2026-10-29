/**
 * Daftar font yang bisa dipilih user. Untuk menambah font: tambahkan satu entri di sini.
 *  - axes   : bagian `family=` pada URL Google Fonts setelah nama (kosong = default font)
 *  - kind   : menentukan fallback font stack
 *  - scale  : kompensasi ukuran visual (font script tampak lebih kecil dari serif/sans)
 */
export const fonts = [
  { name: 'Poppins', kind: 'sans', axes: 'ital,wght@0,300;0,400;0,500;0,600;1,400', scale: 1 },
  { name: 'Montserrat', kind: 'sans', axes: 'ital,wght@0,300;0,400;0,500;0,600;1,400', scale: 1 },
  { name: 'Inter', kind: 'sans', axes: 'wght@300;400;500;600', scale: 1 },
  { name: 'Playfair Display', kind: 'serif', axes: 'ital,wght@0,400;0,500;0,600;1,400', scale: 0.94 },
  { name: 'Cormorant Garamond', kind: 'serif', axes: 'ital,wght@0,400;0,500;0,600;1,400', scale: 1.12 },
  { name: 'Lora', kind: 'serif', axes: 'ital,wght@0,400;0,500;0,600;1,400', scale: 0.96 },
  { name: 'Cinzel', kind: 'serif', axes: 'wght@400;500;600', scale: 0.84 },
  { name: 'Great Vibes', kind: 'script', axes: '', scale: 1.3 },
  { name: 'Dancing Script', kind: 'script', axes: 'wght@400;500;600', scale: 1.12 },
];

const FALLBACK = {
  sans: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  script: '"Brush Script MT", cursive',
};

export const getFont = (name) => fonts.find((f) => f.name === name) || fonts[0];

export const fontStack = (name) => `'${getFont(name).name}', ${FALLBACK[getFont(name).kind]}`;

export const fontUrl = (name) => {
  const f = getFont(name);
  const family = f.name.replace(/ /g, '+') + (f.axes ? `:${f.axes}` : '');
  return `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
};
