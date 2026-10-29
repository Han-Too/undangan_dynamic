<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Icon from '../../components/Icon.vue';
import ConfirmModal from '../../components/builder/ui/ConfirmModal.vue';
import { useAuth } from '../../composables/useAuth';
import { useToast } from '../../composables/useToast';
import { api } from '../../services/api';
import { copyText } from '../../utils/clipboard';
import { invitationUrl } from '../../utils/links';
import InvitationFormModal from './InvitationFormModal.vue';

const { isAdmin } = useAuth();
const { push } = useToast();
const router = useRouter();

const items = ref([]);
const loading = ref(true);
const query = ref('');
const formOpen = ref(false);
const editingItem = ref(null);
const deleting = ref(null);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return items.value;
  return items.value.filter((i) => [i.title, i.slug, i.user?.name].some((v) => v?.toLowerCase().includes(q)));
});

const totals = computed(() => ({
  invitations: items.value.length,
  guests: items.value.reduce((s, i) => s + i.guests_count, 0),
  rsvps: items.value.reduce((s, i) => s + i.rsvps_count, 0),
  attending: items.value.reduce((s, i) => s + i.attending_count, 0),
}));

async function load() {
  loading.value = true;
  try {
    items.value = await api.get('/invitations');
  } catch (e) {
    push(e.message, 'error');
  } finally {
    loading.value = false;
  }
}
onMounted(load);

function openCreate() {
  editingItem.value = null;
  formOpen.value = true;
}
function openEdit(item) {
  editingItem.value = item;
  formOpen.value = true;
}

function onSaved(saved) {
  const isNew = !editingItem.value;
  formOpen.value = false;
  if (isNew) {
    push('Undangan dibuat. Silakan atur desainnya.', 'success');
    router.push(`/admin/invitations/${saved.id}/edit`);
    return;
  }
  push('Pengaturan disimpan', 'success');
  load();
}

async function confirmDelete() {
  const item = deleting.value;
  deleting.value = null;
  try {
    await api.delete(`/invitations/${item.id}`);
    items.value = items.value.filter((i) => i.id !== item.id);
    push('Undangan dihapus', 'success');
  } catch (e) {
    push(e.message, 'error');
  }
}

async function copyLink(item) {
  const ok = await copyText(invitationUrl(item.slug));
  push(ok ? 'Link umum disalin' : 'Gagal menyalin link', ok ? 'success' : 'error');
}

const fmtDate = (v) => new Date(v).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
</script>

<template>
  <div>
    <div class="page-head">
      <div>
        <h1>Undangan</h1>
        <p>{{ isAdmin ? 'Semua undangan dari seluruh pengguna.' : 'Undangan milik Anda.' }}</p>
      </div>
      <div class="page-head__actions">
        <button type="button" class="btn btn--primary" @click="openCreate"><Icon name="plus" :size="16" /> Undangan baru</button>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat"><b>{{ totals.invitations }}</b><span>Undangan</span></div>
      <div class="stat"><b>{{ totals.guests }}</b><span>Tamu terdaftar</span></div>
      <div class="stat"><b>{{ totals.rsvps }}</b><span>RSVP masuk</span></div>
      <div class="stat"><b>{{ totals.attending }}</b><span>Konfirmasi hadir</span></div>
    </div>

    <div class="card table-wrap">
      <div v-if="items.length" class="toolbar">
        <label class="search">
          <Icon name="search" :size="15" />
          <input v-model="query" class="input" type="search" placeholder="Cari undangan…" aria-label="Cari undangan" />
        </label>
      </div>

      <div v-if="loading" class="loading"><span class="spinner" /></div>

      <div v-else-if="!items.length" class="empty">
        <Icon name="mail" :size="34" />
        <strong>Belum ada undangan</strong>
        <span>Buat undangan pertama Anda, atur desainnya, lalu tambahkan tamu untuk mendapat link pribadi.</span>
        <button type="button" class="btn btn--primary" @click="openCreate"><Icon name="plus" :size="16" /> Undangan baru</button>
      </div>

      <table v-else class="table">
        <thead>
          <tr>
            <th>Undangan</th>
            <th v-if="isAdmin">Pemilik</th>
            <th>Tamu</th>
            <th>RSVP</th>
            <th>Status</th>
            <th><span class="sr-only">Aksi</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filtered" :key="item.id">
            <td>
              <strong>{{ item.title }}</strong>
              <div class="cell-link">
                <span>/{{ item.slug }}</span>
                <button type="button" class="btn btn--ghost btn--sm" title="Salin link umum" aria-label="Salin link umum" @click="copyLink(item)"><Icon name="copy" :size="13" /></button>
              </div>
            </td>
            <td v-if="isAdmin" data-label="Pemilik"><span class="muted">{{ item.user?.name }}</span></td>
            <td data-label="Tamu">{{ item.guests_count }}</td>
            <td data-label="RSVP">{{ item.rsvps_count }} <span class="muted">({{ item.attending_count }} hadir)</span></td>
            <td data-label="Status">
              <span class="chip" :class="item.is_published ? 'chip--ok' : 'chip--warn'">{{ item.is_published ? 'Terbit' : 'Draft' }}</span>
              <div class="muted">Diubah {{ fmtDate(item.updated_at) }}</div>
            </td>
            <td>
              <div class="actions">
                <RouterLink :to="`/admin/invitations/${item.id}/edit`" class="btn btn--sm btn--primary"><Icon name="pencil" :size="14" /> Desain</RouterLink>
                <RouterLink :to="`/admin/invitations/${item.id}/guests`" class="btn btn--sm"><Icon name="users" :size="14" /> Tamu &amp; Link</RouterLink>
                <a :href="`/${item.slug}`" target="_blank" rel="noopener" class="btn btn--sm" title="Lihat undangan" aria-label="Lihat undangan"><Icon name="external" :size="14" /></a>
                <button type="button" class="btn btn--sm" title="Pengaturan" aria-label="Pengaturan" @click="openEdit(item)"><Icon name="settings" :size="14" /></button>
                <button type="button" class="btn btn--sm btn--danger" title="Hapus" aria-label="Hapus" @click="deleting = item"><Icon name="trash" :size="14" /></button>
              </div>
            </td>
          </tr>
          <tr v-if="!filtered.length">
            <td :colspan="isAdmin ? 6 : 5" class="muted">Tidak ada undangan yang cocok dengan “{{ query }}”.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <InvitationFormModal :open="formOpen" :invitation="editingItem" @close="formOpen = false" @saved="onSaved" />
    <ConfirmModal
      :open="!!deleting"
      title="Hapus undangan?"
      :message="`“${deleting?.title}” beserta semua tamu, RSVP, foto, dan musiknya akan dihapus permanen.`"
      confirm-text="Hapus"
      danger
      @confirm="confirmDelete"
      @cancel="deleting = null"
    />
  </div>
</template>
