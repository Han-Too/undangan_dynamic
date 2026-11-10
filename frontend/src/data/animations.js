/**
 * Pilihan animasi undangan. Semua bisa dimatikan sekaligus lewat `state.animation.enabled`.
 * '' / 'theme' pada state = ikuti bawaan tema (`theme.motion`, lihat themes.js).
 * Implementasi visualnya ada di styles/invitation.css (atribut data-reveal / data-open / data-text).
 */

/** Animasi muncul tiap section saat di-scroll. */
export const revealAnims = [
  { id: 'fadeUp', name: 'Naik halus' },
  { id: 'fade', name: 'Memudar' },
  { id: 'zoomIn', name: 'Membesar' },
  { id: 'zoomOut', name: 'Mengecil' },
  { id: 'slideLeft', name: 'Dari kanan' },
  { id: 'slideRight', name: 'Dari kiri' },
  { id: 'alternate', name: 'Kiri-kanan' },
  { id: 'drop', name: 'Jatuh' },
  { id: 'bounce', name: 'Memantul' },
  { id: 'flip', name: 'Flip 3D' },
  { id: 'rotate', name: 'Berputar' },
  { id: 'blur', name: 'Fokus blur' },
  { id: 'stagger', name: 'Berurutan' },
  { id: 'none', name: 'Tanpa animasi' },
];

/** Transisi saat tombol "Buka Undangan" diklik. */
export const openingAnims = [
  { id: 'iris', name: 'Lingkaran' },
  { id: 'fade', name: 'Memudar' },
  { id: 'slideUp', name: 'Geser ke atas' },
  { id: 'slideDown', name: 'Geser ke bawah' },
  { id: 'curtain', name: 'Tirai terbuka' },
  { id: 'book', name: 'Buka buku' },
  { id: 'zoom', name: 'Zoom tembus' },
  { id: 'blinds', name: 'Kerai' },
  { id: 'wipe', name: 'Sapuan diagonal' },
  { id: 'none', name: 'Langsung' },
];

/** Animasi masuk teks cover. */
export const coverTextAnims = [
  { id: 'rise', name: 'Naik berurutan' },
  { id: 'fade', name: 'Memudar' },
  { id: 'zoom', name: 'Membesar' },
  { id: 'blur', name: 'Fokus blur' },
  { id: 'tracking', name: 'Huruf merapat' },
  { id: 'drop', name: 'Jatuh' },
  { id: 'none', name: 'Tanpa animasi' },
];

/** Partikel latar. `shapes` dari components/invitation/fx/shapes.js. */
export const particlePresets = [
  { id: 'theme', name: 'Ikuti tema' },
  { id: 'none', name: 'Tanpa partikel' },
  { id: 'petals', name: 'Kelopak', shapes: ['petal', 'flower'], motion: 'fall', size: [10, 22] },
  { id: 'hearts', name: 'Hati', shapes: ['heart'], motion: 'rise', size: [10, 22] },
  { id: 'sparkle', name: 'Kilau', shapes: ['sparkle', 'dot'], motion: 'twinkle', size: [6, 16] },
  { id: 'stars', name: 'Bintang', shapes: ['star5', 'sparkle'], motion: 'twinkle', size: [8, 18] },
  { id: 'snow', name: 'Salju', shapes: ['snow', 'dot'], motion: 'fall', size: [8, 18] },
  { id: 'confetti', name: 'Konfeti', shapes: ['confetti', 'dot', 'star5'], motion: 'fall', size: [8, 16] },
  { id: 'balloons', name: 'Balon', shapes: ['balloon'], motion: 'rise', size: [18, 34] },
  { id: 'leaves', name: 'Daun', shapes: ['leaf'], motion: 'fall', size: [10, 20] },
  { id: 'butterflies', name: 'Kupu-kupu', shapes: ['butterfly'], motion: 'float', size: [14, 26] },
  { id: 'bubbles', name: 'Gelembung', shapes: ['bubble'], motion: 'rise', size: [10, 26] },
  { id: 'notes', name: 'Not musik', shapes: ['note'], motion: 'rise', size: [10, 20] },
  { id: 'lanterns', name: 'Lentera', shapes: ['lantern'], motion: 'rise', size: [14, 24] },
  { id: 'islamic', name: 'Bulan bintang', shapes: ['crescent', 'star8', 'sparkle'], motion: 'twinkle', size: [10, 20] },
  { id: 'ketupat', name: 'Ketupat', shapes: ['ketupat', 'star8'], motion: 'fall', size: [12, 22] },
];

export const particleMotions = [
  { id: '', name: 'Ikuti pilihan' },
  { id: 'fall', name: 'Jatuh' },
  { id: 'rise', name: 'Naik' },
  { id: 'twinkle', name: 'Berkelip' },
  { id: 'float', name: 'Melayang' },
];

export const densities = [
  { id: 'low', name: 'Sedikit', factor: 0.5 },
  { id: 'normal', name: 'Normal', factor: 1 },
  { id: 'high', name: 'Banyak', factor: 1.8 },
];

/** Gerak foto profil. */
export const photoMotions = [
  { id: 'none', name: 'Diam' },
  { id: 'float', name: 'Melayang' },
  { id: 'sway', name: 'Berayun' },
  { id: 'pulse', name: 'Berdenyut' },
  { id: 'tilt', name: 'Miring 3D' },
];

/** Bawaan animasi untuk tema yang tidak menentukan `motion`. */
export const DEFAULT_MOTION = { reveal: 'fadeUp', opening: 'iris', coverText: 'rise', photo: 'none' };

export const getParticlePreset = (id) => particlePresets.find((p) => p.id === id && p.shapes) ?? null;
export const getDensity = (id) => densities.find((d) => d.id === id) ?? densities[1];
