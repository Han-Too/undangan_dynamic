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
  star5: '<path d="M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6 5.6 21.1 7 14l-5.3-5 7.2-.9z"/>',
  snow: `${rotated(6, '<rect x="11.2" y="1" width="1.6" height="11" rx=".8"/><path d="M12 4.2l-2.6-2 .9-1L12 2.6l1.7-1.4.9 1z"/>')}<circle cx="12" cy="12" r="2"/>`,
  butterfly: '<path d="M11.2 11C9 5 4 2 2 4s0 8 4.5 9C3 14 3 19 5.5 20s4.5-3 5.7-7.5zM12.8 11C15 5 20 2 22 4s0 8-4.5 9c3.5 1 3.5 6 1 7s-4.5-3-5.7-7.5z"/><rect x="11.3" y="7" width="1.4" height="12" rx=".7"/>',
  bubble: '<path fill-rule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"/><ellipse cx="8.6" cy="8.4" rx="2" ry="1.2" transform="rotate(-40 8.6 8.4)"/>',
  note: '<path d="M9 3.5L20 1v14.2a3.4 3.4 0 1 1-2-3.1V5.3l-7 1.6v10.4a3.4 3.4 0 1 1-2-3.1z"/>',
  ketupat: '<path d="M12 2l9 9-9 9-9-9z" fill-opacity=".85"/><path d="M12 20v3M7.5 6.5l9 9M16.5 6.5l-9 9" stroke="#fff" stroke-opacity=".55" stroke-width="1.2" fill="none"/>',
  lantern: '<rect x="10" y="1" width="4" height="2.2" rx=".6"/><path d="M6 6c0-1.6 2.7-2.6 6-2.6s6 1 6 2.6v9c0 1.6-2.7 2.6-6 2.6S6 16.6 6 15z"/><rect x="10" y="18.2" width="4" height="2" rx=".6"/><rect x="11.4" y="20.2" width="1.2" height="3.4" rx=".6"/>',
  cloud: '<path d="M7 19a5 5 0 0 1-.6-10A6.5 6.5 0 0 1 19 9.5a4.8 4.8 0 0 1-.5 9.5z"/>',
  ring: '<path fill-rule="evenodd" d="M12 6.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5zm0 2.2a5.55 5.55 0 1 0 0 11.1 5.55 5.55 0 0 0 0-11.1z"/><path d="M9.2 1h5.6l2 3.2-4.8 3.4-4.8-3.4z"/>',
  candle: '<path d="M12 1c2 2.6 2.4 4.3 0 6-2.4-1.7-2-3.4 0-6z"/><rect x="9" y="8.5" width="6" height="14" rx="1.2"/>',
  gift: '<rect x="3" y="9" width="18" height="4" rx="1"/><rect x="5" y="13.5" width="14" height="9" rx="1"/><path d="M12 9c-1.6-4-6-5-6-2.4C6 8.4 9 9 12 9zm0 0c1.6-4 6-5 6-2.4C18 8.4 15 9 12 9z"/>',
  /** Sakura: lima kelopak bertakik */
  sakura: `${rotated(5, '<path d="M12 12c-2.6-2.2-3.4-5.4-2-8.6l1.1 1.3.9-1.9.9 1.9 1.1-1.3c1.4 3.2.6 6.4-2 8.6z"/>')}<circle cx="12" cy="12" r="1.4" fill-opacity=".5"/>`,
  /** Peony: kelopak berlapis */
  peony: `${rotated(6, '<ellipse cx="12" cy="5.6" rx="4" ry="4.8" fill-opacity=".55"/>')}${rotated(5, '<ellipse cx="12" cy="8.2" rx="2.8" ry="3.4"/>')}<circle cx="12" cy="12" r="2.4" fill-opacity=".7"/>`,
  /** Melati: kelopak ramping berbentuk bintang */
  jasmine: `${rotated(6, '<path d="M12 12c-1.3-2.6-1.3-6.4 0-9.6 1.3 3.2 1.3 7 0 9.6z"/>')}<circle cx="12" cy="12" r="1.6" fill-opacity=".45"/>`,
  /** Plum (meihua): lima kelopak bundar */
  plum: `${rotated(5, '<circle cx="12" cy="6.4" r="4"/>')}<circle cx="12" cy="12" r="2.2" fill-opacity=".5"/>`,
  goldLeaf: '<path d="M3 21c1-9 7-16 18-18-1 10-8 17-18 18z"/><path d="M4.5 19.5L17 7" stroke="#fff" stroke-opacity=".45" stroke-width="1" fill="none"/>',
  plane: '<path d="M22 2L2 10.5l7 2.5zM22 2l-9.5 19.5L9 13zM9 13v6l3-3.5" fill-opacity=".9"/>',
  feather: '<path d="M20 2C11 3 5 9 4.5 17.5L3 22l1.2-.2 1.4-3.6C14 17.6 20.5 11 20 2z"/><path d="M5.6 18.2L16 7.5" stroke="#fff" stroke-opacity=".5" stroke-width="1" fill="none"/>',
  rose: '<circle cx="12" cy="11" r="8" fill-opacity=".35"/><path d="M12 5.5c3.4 0 5.5 2.4 5.5 5.2S15 16.5 12 16.5 6.5 14 6.5 11c0-2 1.5-3.4 3.4-3.4 2.4 0 3.6 1.6 3.6 3.2 0 1.4-1 2.4-2.3 2.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 19c-2 1.6-4.5 1.8-6 1 1.2-2 3.4-2.6 6-1zm0 0c2-1.6 4.5-1.8 6-1-1.2 2-3.4 2.6-6 1z" fill-opacity=".7"/>',
  cherry: '<circle cx="7" cy="17" r="4.6"/><circle cx="16.5" cy="18" r="4.2"/><path d="M7 12.5C8 7 11 4 16 2.5M16.5 14c-.4-4-1-7.6-.5-11.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M16 2.5c2.5-.6 4.6.4 5.5 2-2.5.8-4.6.2-5.5-2z"/>',
  lavender: '<rect x="11.4" y="8" width="1.2" height="15" rx=".6"/>' + [2, 5, 8, 11, 14].map((y, i) => `<ellipse cx="${i % 2 ? 13.6 : 10.4}" cy="${y}" rx="2.2" ry="1.6"/>`).join(''),
  koi: '<path d="M3 12c3-5 9-6.5 14-3.5l4-3-1 6.5 1 6.5-4-3C12 18.5 6 17 3 12z"/><circle cx="6.8" cy="11" r="1" fill="#fff" fill-opacity=".8"/><path d="M10 9.2c1.4 1 1.4 4.6 0 5.6M13 9.6c1 .8 1 4 0 4.8" stroke="#fff" stroke-opacity=".45" stroke-width="1.2" fill="none"/>',
  frangipani: `${rotated(5, '<path d="M12 12C9 10 8.6 5 11 2.5c2.6 1.8 3.5 6.6 1 9.5z"/>')}<circle cx="12" cy="12" r="2" fill-opacity=".45"/>`,
  firefly: '<circle cx="12" cy="12" r="10" fill-opacity=".14"/><circle cx="12" cy="12" r="5.5" fill-opacity=".3"/><circle cx="12" cy="12" r="2.6"/>',
  disco: '<circle cx="12" cy="12" r="10"/><path d="M2.5 9h19M2.5 15h19M12 2c-3 3-3 17 0 20M12 2c3 3 3 17 0 20M6 4.5c-1.8 4-1.8 11 0 15M18 4.5c1.8 4 1.8 11 0 15" stroke="#fff" stroke-opacity=".4" stroke-width=".9" fill="none"/>',
};
