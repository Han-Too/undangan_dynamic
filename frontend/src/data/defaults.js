import { DEFAULT_THEME, themes } from './themes';
import { clone, deepMerge } from '../utils/object';

export const createPhoto = () => ({ src: '', fit: 'cover', x: 50, y: 50, zoom: 1 });

/** Isi yang tidak bergantung pada tema. Teks khas tema ada di `themes[id].copy`. */
const baseContent = () => ({
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
    sections: { opening: true, profile: true, event: true, countdown: true, gallery: true, location: true, rsvp: true, gift: true, closing: true },
    content: deepMerge(baseContent(), clone(themes[DEFAULT_THEME].copy)),
    photos: { cover: createPhoto(), profile: createPhoto(), gallery: [createPhoto(), createPhoto(), createPhoto(), createPhoto()] },
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
