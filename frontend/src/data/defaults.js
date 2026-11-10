import { DEFAULT_THEME, themes } from './themes';
import { clone, deepMerge } from '../utils/object';

export const createPhoto = () => ({ src: '', fit: 'cover', x: 50, y: 50, zoom: 1 });

/** Jumlah slot foto galeri yang disiapkan; user memilih menampilkan 4, 6, atau 8. */
export const MAX_GALLERY = 8;
export const GALLERY_COUNTS = [4, 6, 8];

/** Isi yang tidak bergantung pada tema. Teks khas tema ada di `themes[id].copy`. */
export const baseContent = () => ({
  cover: { label: '', names: '', date: '2026-12-12T10:00', guestText: 'Kepada Yth. Bapak/Ibu/Saudara/i', buttonText: 'Buka Undangan' },
  opening: { title: '', text: '' },
  profile: { title: '', people: [] },
  events: [],
  countdown: { title: 'Menuju Hari Bahagia' },
  gallery: { title: '', caption: '' },
  rsvp: { title: '', text: '' },
  gift: { title: '', text: '', bank: 'BCA', accountNumber: '1234567890', accountName: 'Raka Pratama' },
  closing: { quote: '', source: '', message: '', signature: '' },
});

/**
 * Satu-satunya sumber kebenaran (source of truth) undangan.
 * String kosong pada typography/colors berarti "ikuti tema".
 */
export function createDefaultInvitation() {
  return {
    version: 1,
    theme: DEFAULT_THEME,
    typography: { heading: '', body: '' },
    colors: { primary: '', secondary: '', background: '', text: '' },
    /** Desain cover. String kosong = ikuti bawaan tema (lihat `theme.cover`). */
    coverStyle: { layout: '', frame: '', background: '' },
    /** Bingkai foto profil (lihat data/photoFrames.js). String kosong = ikuti tema (`theme.photo`). */
    profileStyle: { shape: '', border: '', decor: '' },
    /**
     * Animasi (lihat data/animations.js). `enabled` = saklar utama; string kosong = ikuti tema (`theme.motion`).
     * particles: id preset | '' · motion: arah partikel | '' · density: low | normal | high
     */
    animation: {
      enabled: true,
      reveal: '',
      opening: '',
      coverText: '',
      photo: '',
      particles: '',
      motion: '',
      density: 'normal',
      burst: true,
      ornaments: true,
    },
    /** Tampilan galeri: jumlah foto, 'grid' | 'carousel', geser otomatis. */
    gallery: { count: 4, mode: 'grid', autoplay: true },
    sections: { opening: true, profile: true, event: true, countdown: true, gallery: true, location: true, rsvp: true, gift: true, closing: true },
    content: deepMerge(baseContent(), clone(themes[DEFAULT_THEME].copy)),
    photos: { cover: createPhoto(), profile: createPhoto(), gallery: Array.from({ length: MAX_GALLERY }, createPhoto) },
    music: { enabled: true, custom: false, name: '', volume: 0.6 },
    location: {
      name: 'Gedung Graha Anggun',
      address: 'Jl. Melati Raya No. 12, Jakarta Selatan',
      latitude: -6.2088,
      longitude: 106.8456,
      mapsUrl: 'https://www.google.com/maps?q=-6.2088,106.8456',
    },
  };
}
