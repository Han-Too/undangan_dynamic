import { computed, ref } from 'vue';
import { api, token } from '../services/api';

/** Sesi login dashboard (singleton). Token disimpan di LocalStorage, data user diambil dari /auth/me. */
const user = ref(null);
let pending = null;

async function fetchUser() {
  if (!token.get()) return null;
  pending ??= api
    .get('/auth/me')
    .then((u) => (user.value = u))
    .catch(() => (user.value = null))
    .finally(() => (pending = null));
  return pending;
}

async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  token.set(res.token);
  user.value = res.user;
  return res.user;
}

async function logout() {
  try {
    await api.post('/auth/logout');
  } catch {
    /* token mungkin sudah tidak berlaku */
  }
  token.set('');
  user.value = null;
}

function clear() {
  token.set('');
  user.value = null;
}

export function useAuth() {
  return {
    user,
    isAdmin: computed(() => user.value?.role === 'admin'),
    fetchUser,
    login,
    logout,
    clear,
  };
}
