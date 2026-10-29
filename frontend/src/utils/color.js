const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function normalizeHex(value) {
  if (typeof value !== 'string' || !HEX.test(value.trim())) return null;
  let hex = value.trim().replace('#', '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  return `#${hex.toLowerCase()}`;
}

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Warna teks (terang/gelap) yang terbaca di atas warna latar `hex`. */
export function readableOn(hex) {
  const h = normalizeHex(hex);
  if (!h) return '#ffffff';
  return luminance(h) > 0.42 ? '#1d1a17' : '#ffffff';
}
