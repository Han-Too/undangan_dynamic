/**
 * Klien HTTP ke backend Laravel. Base URL relatif (`/api`): saat development diteruskan oleh
 * proxy Vite ke Laravel, saat produksi frontend dilayani dari domain yang sama dengan backend.
 */
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') + '/api';
const TOKEN_KEY = 'undangan-online:token';

let onUnauthorized = () => {};

export const token = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY) || '';
    } catch {
      return '';
    }
  },
  set: (value) => {
    try {
      value ? localStorage.setItem(TOKEN_KEY, value) : localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* diabaikan */
    }
  },
};

/** Dipanggil saat token ditolak server (401), mis. untuk redirect ke halaman login. */
export const setUnauthorizedHandler = (fn) => (onUnauthorized = fn);

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request(method, path, body) {
  const headers = { Accept: 'application/json' };
  const auth = token.get();
  if (auth) headers.Authorization = `Bearer ${auth}`;

  let payload;
  if (body instanceof FormData) payload = body;
  else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(BASE + path, { method, headers, body: payload });
  } catch {
    throw new ApiError('Tidak dapat terhubung ke server. Pastikan backend berjalan.', 0);
  }

  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (res.ok) return data;

  if (res.status === 401 && auth) {
    token.set('');
    onUnauthorized();
  }
  const errors = data?.errors ?? {};
  const first = Object.values(errors)[0]?.[0];
  const fallback = { 401: 'Sesi berakhir, silakan login lagi.', 403: 'Anda tidak punya akses.', 404: 'Data tidak ditemukan.', 413: 'File terlalu besar untuk server.' }[res.status];
  throw new ApiError(first || data?.message || fallback || `Terjadi kesalahan (${res.status}).`, res.status, errors);
}

const upload = (path, file, name = 'file') => {
  const form = new FormData();
  form.append('file', file, file.name || name);
  return request('POST', path, form);
};

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  delete: (path) => request('DELETE', path),
  upload,
};
