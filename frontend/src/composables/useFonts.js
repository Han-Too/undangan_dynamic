import { fontUrl, fonts, fontsUrl } from '../data/fonts';

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

/** Muat beberapa font dalam satu request (font yang sudah dimuat dilewati). */
export function loadFonts(names) {
  const todo = [...new Set(names)].filter((n) => n && !loaded.has(n));
  if (!todo.length || typeof document === 'undefined') return;
  todo.forEach((n) => loaded.add(n));
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontsUrl(todo);
  document.head.appendChild(link);
}

export const loadAllFonts = () => loadFonts(fonts.map((f) => f.name));
