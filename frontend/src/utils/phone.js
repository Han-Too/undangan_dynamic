/**
 * Normalisasi nomor WhatsApp ke format internasional tanpa "+" (format wa.me).
 *   0812-3456-789 · +62 812 3456 789 · 62812... · 812... · (0812) 345 678  ->  628123456789
 *   +1 415 555 0100                                                         ->  14155550100
 * Mengembalikan '' bila tidak ada angka sama sekali.
 */
export function normalizePhone(raw) {
  const text = String(raw ?? '').trim();
  const digits = text.replace(/\D/g, '');
  if (!digits) return '';
  if (text.startsWith('+')) return digits;
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('62')) return digits;
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  if (digits.startsWith('8')) return `62${digits}`;
  return digits;
}

/** Nomor dianggap valid bila 10–15 digit setelah dinormalisasi; nomor Indonesia wajib 62 8xx. */
export function isValidPhone(raw) {
  const n = normalizePhone(raw);
  if (n.length < 10 || n.length > 15) return false;
  return n.startsWith('62') ? /^628\d{7,11}$/.test(n) : true;
}

/** 6281234567890 -> +62 812-3456-7890 (untuk tampilan saja). */
export function formatPhone(raw) {
  const n = normalizePhone(raw);
  if (!n) return '';
  if (!n.startsWith('62')) return `+${n}`;
  const local = n.slice(2);
  const parts = [local.slice(0, 3), local.slice(3, 7), local.slice(7)].filter(Boolean);
  return `+62 ${parts.join('-')}`;
}
