const locale = 'id-ID';

export function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** 12 Desember 2026 */
export function formatDateLong(value) {
  const d = parseDate(value);
  return d ? d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) : '';
}

/** Sabtu */
export function formatWeekday(value) {
  const d = parseDate(value);
  return d ? d.toLocaleDateString(locale, { weekday: 'long' }) : '';
}

/** 12.12.2026 */
export function formatDateDots(value) {
  const d = parseDate(value);
  if (!d) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

export const pad2 = (n) => String(n).padStart(2, '0');
