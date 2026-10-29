const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

export const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));

/** Gabungkan `source` ke `base` secara rekursif. Array digantikan utuh, bukan digabung. */
export function deepMerge(base, source) {
  if (!isPlainObject(base) || !isPlainObject(source)) return source === undefined ? base : source;
  const out = { ...base };
  for (const key of Object.keys(source)) {
    out[key] = isPlainObject(base[key]) && isPlainObject(source[key])
      ? deepMerge(base[key], source[key])
      : source[key];
  }
  return out;
}

export const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

export function setPath(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();
  const target = keys.reduce((o, k) => (o[k] ??= {}), obj);
  target[last] = value;
}

/**
 * Timpa `target` dengan isi `source` tanpa mengganti identitas objek/array bersarang,
 * agar referensi reaktif yang dipegang komponen tetap valid (dipakai saat reset).
 */
export function assignInPlace(target, source) {
  for (const key of Object.keys(source)) {
    const s = source[key];
    const t = target[key];
    if (isPlainObject(s) && isPlainObject(t)) assignInPlace(t, s);
    else if (Array.isArray(s) && Array.isArray(t)) t.splice(0, t.length, ...clone(s));
    else target[key] = s;
  }
}

/** Ratakan objek menjadi daftar [path, value]; array dan string dianggap leaf. */
export function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k;
    return isPlainObject(v) ? flatten(v, path) : [[path, v]];
  });
}

export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const uid = (prefix = 'id') => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
