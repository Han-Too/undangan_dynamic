/** Bentuk partikel (viewBox 24×24, diisi currentColor). Tambah bentuk baru cukup di sini. */
const rotated = (n, el) =>
  Array.from({ length: n }, (_, i) => `<g transform="rotate(${(360 / n) * i} 12 12)">${el}</g>`).join('');

export const shapes = {
  petal: '<path d="M12 2C6 8 6 16 12 22c6-6 6-14 0-20z"/>',
  flower: `${rotated(5, '<ellipse cx="12" cy="6.2" rx="3" ry="4.6"/>')}<circle cx="12" cy="12" r="2.1" fill-opacity=".6"/>`,
  heart: '<path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/>',
  star8: '<path d="M23 12l-5.9 2.1 2.7 5.7-5.7-2.7L12 23l-2.1-5.9-5.7 2.7 2.7-5.7L1 12l5.9-2.1-2.7-5.7 5.7 2.7L12 1l2.1 5.9 5.7-2.7-2.7 5.7z"/>',
  crescent: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
  sparkle: '<path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/>',
  diamond: '<path d="M12 1l7 11-7 11-7-11z"/>',
  dot: '<circle cx="12" cy="12" r="6"/>',
  balloon: '<ellipse cx="12" cy="9" rx="6.5" ry="8"/><path d="M10.4 16.6h3.2L12 18.8z"/><rect x="11.6" y="18.6" width=".8" height="5.2" rx=".4"/>',
  confetti: '<rect x="9" y="2" width="6" height="20" rx="1.5" transform="rotate(28 12 12)"/>',
  leaf: '<path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z"/>',
  mortarboard: '<path d="M12 4L1 9l11 5 11-5z"/><path d="M5.5 11.6v4.4c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-4.4L12 14.6z"/>',
};
