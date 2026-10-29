import { ref } from 'vue';

/** "Adit Pratama Putra" -> "AP" */
export const initialsOf = (name) =>
  (name ?? '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '?';

export const fmtDate = (v, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => (v ? new Date(v).toLocaleDateString('id-ID', opts) : '');

export const fmtDateTime = (v) =>
  v ? new Date(v).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';

/** Judul halaman tambahan untuk breadcrumb di header (mis. nama undangan di halaman Tamu). */
export const pageCrumb = ref('');
