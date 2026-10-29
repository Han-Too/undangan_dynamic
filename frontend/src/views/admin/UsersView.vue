<script setup>
import { onMounted, reactive, ref } from 'vue';
import Icon from '../../components/Icon.vue';
import BaseModal from '../../components/builder/ui/BaseModal.vue';
import ConfirmModal from '../../components/builder/ui/ConfirmModal.vue';
import { useAuth } from '../../composables/useAuth';
import { useToast } from '../../composables/useToast';
import { api } from '../../services/api';

/** Manajemen akun (khusus admin): tambah user, ubah role, nonaktifkan, hapus. */
const { user: me } = useAuth();
const { push } = useToast();

const users = ref([]);
const loading = ref(true);
const editing = ref(null); // {} = baru, objek user = edit
const form = reactive({ name: '', email: '', password: '', role: 'user', is_active: true });
const error = ref('');
const busy = ref(false);
const deleting = ref(null);

async function load() {
  loading.value = true;
  try {
    users.value = await api.get('/users');
  } catch (e) {
    push(e.message, 'error');
  } finally {
    loading.value = false;
  }
}
onMounted(load);

function open(u = {}) {
  editing.value = u;
  error.value = '';
  Object.assign(form, { name: u.name ?? '', email: u.email ?? '', password: '', role: u.role ?? 'user', is_active: u.is_active ?? true });
}

async function onSubmit() {
  busy.value = true;
  error.value = '';
  try {
    const body = { ...form, password: form.password || undefined };
    if (editing.value.id) {
      const updated = await api.put(`/users/${editing.value.id}`, body);
      users.value = users.value.map((u) => (u.id === updated.id ? updated : u));
    } else {
      users.value = [...users.value, await api.post('/users', body)];
    }
    push('Pengguna disimpan', 'success');
    editing.value = null;
  } catch (e) {
    error.value = e.message;
  } finally {
    busy.value = false;
  }
}

async function onDelete() {
  const u = deleting.value;
  deleting.value = null;
  try {
    await api.delete(`/users/${u.id}`);
    users.value = users.value.filter((x) => x.id !== u.id);
    push('Pengguna dihapus', 'success');
  } catch (e) {
    push(e.message, 'error');
  }
}
</script>

<template>
  <div>
    <div class="page-head">
      <div>
        <h1>Pengguna</h1>
        <p>Admin mengelola semua undangan. User biasa hanya melihat & mengatur undangan miliknya.</p>
      </div>
      <div class="page-head__actions">
        <button type="button" class="btn btn--primary" @click="open()"><Icon name="plus" :size="16" /> Pengguna baru</button>
      </div>
    </div>

    <div class="card table-wrap">
      <div v-if="loading" class="loading"><span class="spinner" /></div>
      <table v-else class="table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Role</th>
            <th>Undangan</th>
            <th>Status</th>
            <th><span class="sr-only">Aksi</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>
              <strong>{{ u.name }}</strong> <span v-if="u.id === me?.id" class="chip">Anda</span>
              <div class="muted">{{ u.email }}</div>
            </td>
            <td data-label="Role"><span class="chip" :class="{ 'chip--accent': u.role === 'admin' }">{{ u.role === 'admin' ? 'Admin' : 'User' }}</span></td>
            <td data-label="Undangan">{{ u.invitations_count }}</td>
            <td data-label="Status"><span class="chip" :class="u.is_active ? 'chip--ok' : 'chip--danger'">{{ u.is_active ? 'Aktif' : 'Nonaktif' }}</span></td>
            <td>
              <div class="actions">
                <button type="button" class="btn btn--sm" @click="open(u)"><Icon name="pencil" :size="14" /> Edit</button>
                <button v-if="u.id !== me?.id" type="button" class="btn btn--sm btn--danger" aria-label="Hapus pengguna" @click="deleting = u"><Icon name="trash" :size="14" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal :open="!!editing" :title="editing?.id ? 'Edit pengguna' : 'Pengguna baru'" width="440px" @close="editing = null">
      <form class="form-grid" @submit.prevent="onSubmit">
        <label class="field">
          <span class="field__label">Nama</span>
          <input v-model="form.name" class="input" required maxlength="255" />
        </label>
        <label class="field">
          <span class="field__label">Email</span>
          <input v-model.trim="form.email" class="input" type="email" required autocomplete="off" />
        </label>
        <label class="field">
          <span class="field__label">Password</span>
          <input v-model="form.password" class="input" type="password" :required="!editing?.id" minlength="6" autocomplete="new-password" :placeholder="editing?.id ? 'Kosongkan bila tidak diganti' : 'Minimal 6 karakter'" />
        </label>
        <template v-if="editing?.id !== me?.id">
          <label class="field">
            <span class="field__label">Role</span>
            <select v-model="form.role" class="input">
              <option value="user">User — kelola undangan sendiri</option>
              <option value="admin">Admin — kelola semua undangan & pengguna</option>
            </select>
          </label>
          <label class="check"><input v-model="form.is_active" type="checkbox" /> Akun aktif (boleh login)</label>
        </template>
        <p v-if="error" class="form-error" role="alert">{{ error }}</p>
        <div class="form-actions">
          <button type="button" class="btn" @click="editing = null">Batal</button>
          <button type="submit" class="btn btn--primary" :disabled="busy">{{ busy ? 'Menyimpan…' : 'Simpan' }}</button>
        </div>
      </form>
    </BaseModal>

    <ConfirmModal
      :open="!!deleting"
      title="Hapus pengguna?"
      :message="`${deleting?.name} beserta ${deleting?.invitations_count ?? 0} undangan miliknya akan dihapus permanen.`"
      confirm-text="Hapus"
      danger
      @confirm="onDelete"
      @cancel="deleting = null"
    />
  </div>
</template>
