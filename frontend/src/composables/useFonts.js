import { fontUrl, fonts } from '../data/fonts';

const loaded = new Set();

/** Muat font dari Google Fonts sekali saja (inject <link>). */
export function loadFont(name) {
  if (!name || loaded.has(name) || typeof document === 'undefined') return;
  loaded.add(name);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontUrl(name);
  document.head.appendChild(link);
}

export const loadAllFonts = () => fonts.forEach((f) => loadFont(f.name));
