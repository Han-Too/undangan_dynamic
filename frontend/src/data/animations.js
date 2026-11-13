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
  { id: 'clipUp', name: 'Sapuan bawah' },
  { id: 'curtainOpen', name: 'Tirai tengah' },
  { id: 'circleIn', name: 'Lingkaran' },
  { id: 'swing', name: 'Ayun 3D' },
  { id: 'unfold', name: 'Terbentang' },
  { id: 'tilt3d', name: 'Miring 3D' },
  { id: 'glide', name: 'Melayang naik' },
  { id: 'elastic', name: 'Elastis' },
  { id: 'skew', name: 'Condong' },
  { id: 'spiral', name: 'Pusaran' },
  { id: 'none', name: 'Tanpa animasi' },
];

/** Transisi saat tombol "Buka Undangan" diklik. */
export const openingAnims = [
  { id: 'iris', name: 'Lingkaran' },
  { id: 'fade', name: 'Memudar' },
  { id: 'slideUp', name: 'Geser ke atas' },
  { id: 'slideDown', name: 'Geser ke bawah' },
  { id: 'curtain', name: 'Tirai terbuka' },
  { id: 'doors', name: 'Pintu terbuka' },
  { id: 'shoji', name: 'Pintu geser' },
  { id: 'envelope', name: 'Amplop' },
  { id: 'halves', name: 'Belah atas-bawah' },
  { id: 'heart', name: 'Lubang hati' },
  { id: 'diamondHole', name: 'Lubang berlian' },
  { id: 'starHole', name: 'Lubang bintang' },
  { id: 'dissolve', name: 'Larut titik' },
  { id: 'hinge', name: 'Engsel jatuh' },
  { id: 'spiral', name: 'Pusaran' },
  { id: 'blindsH', name: 'Kerai mendatar' },
  { id: 'curtainUp', name: 'Tirai naik' },
  { id: 'flipCard', name: 'Kartu terbalik' },
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
  { id: 'letters', name: 'Per huruf' },
  { id: 'typewriter', name: 'Mesin ketik' },
  { id: 'wave', name: 'Gelombang' },
  { id: 'glowIn', name: 'Cahaya huruf' },
  { id: 'shine', name: 'Kilau emas' },
  { id: 'mask', name: 'Topeng terkuak' },
  { id: 'flipUp', name: 'Balik 3D' },
  { id: 'slideAlt', name: 'Kiri-kanan' },
  { id: 'elastic', name: 'Elastis' },
  { id: 'none', name: 'Tanpa animasi' },
];

/** Animasi teks cover yang memecah nama menjadi huruf (dirender Vue, aman untuk diedit). */
export const CHAR_TEXT_ANIMS = ['letters', 'typewriter', 'wave', 'glowIn'];

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
  { id: 'sakura', name: 'Sakura', shapes: ['sakura', 'petal'], motion: 'fall', size: [10, 18] },
  { id: 'peony', name: 'Peony', shapes: ['peony', 'plum'], motion: 'fall', size: [12, 22] },
  { id: 'jasmine', name: 'Melati', shapes: ['jasmine'], motion: 'fall', size: [8, 15] },
  { id: 'roses', name: 'Mawar', shapes: ['rose', 'petal'], motion: 'fall', size: [12, 22] },
  { id: 'frangipani', name: 'Kamboja', shapes: ['frangipani'], motion: 'fall', size: [12, 20] },
  { id: 'goldLeaf', name: 'Daun emas', shapes: ['goldLeaf', 'leaf'], motion: 'drift', size: [10, 18] },
  { id: 'goldDust', name: 'Debu emas', shapes: ['sparkle', 'dot', 'dot'], motion: 'twinkle', size: [3, 9], count: 34 },
  { id: 'bokeh', name: 'Bokeh', shapes: ['bokeh'], motion: 'float', size: [24, 60], count: 12 },
  { id: 'fireflies', name: 'Kunang-kunang', shapes: ['firefly'], motion: 'float', size: [8, 16], count: 22 },
  { id: 'feathers', name: 'Bulu', shapes: ['feather'], motion: 'swirl', size: [14, 24] },
  { id: 'koi', name: 'Ikan koi', shapes: ['koi'], motion: 'float', size: [16, 26] },
  { id: 'cherries', name: 'Ceri', shapes: ['cherry', 'heart'], motion: 'fall', size: [12, 20] },
  { id: 'lavender', name: 'Lavender', shapes: ['lavender'], motion: 'drift', size: [14, 22] },
  { id: 'planes', name: 'Pesawat kertas', shapes: ['plane'], motion: 'swirl', size: [14, 22] },
  { id: 'mixFloral', name: 'Taman campur', shapes: ['sakura', 'flower', 'petal', 'butterfly'], motion: 'swirl', size: [10, 20] },
  { id: 'disco', name: 'Disko', shapes: ['disco', 'sparkle', 'star5'], motion: 'twinkle', size: [8, 18] },
];

export const particleMotions = [
  { id: '', name: 'Ikuti pilihan' },
  { id: 'fall', name: 'Jatuh' },
  { id: 'rise', name: 'Naik' },
  { id: 'twinkle', name: 'Berkelip' },
  { id: 'float', name: 'Melayang' },
  { id: 'drift', name: 'Tertiup angin' },
  { id: 'swirl', name: 'Berpusar' },
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
