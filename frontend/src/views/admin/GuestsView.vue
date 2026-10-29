<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Icon from '../../components/Icon.vue';
import BaseModal from '../../components/builder/ui/BaseModal.vue';
import ConfirmModal from '../../components/builder/ui/ConfirmModal.vue';
import { useToast } from '../../composables/useToast';
import { api } from '../../services/api';
import { copyText } from '../../utils/clipboard';
import { DEFAULT_SHARE_TEMPLATE, fillTemplate, invitationUrl, whatsappUrl } from '../../utils/links';

const route = useRoute();
const { push } = useToast();
const id = computed(() => route.params.id);

const invitation = ref(null);
const guests = ref([]);
const loading = ref(true);
const query = ref('');

// ── tambah tamu ─────────────────────────────────────────────
const addMode = ref('single'); // 'single' | 'bulk'
const single = reactive({ name: '', phone: '' });
const bulk = ref('');
const adding = ref(false);

// ── template pesan (disimpan per browser, per undangan) ─────
const templateKey = computed(() => `undangan-online:share-template:${id.value}`);
const template = ref(DEFAULT_SHARE_TEMPLATE);
const templateOpen = ref(false);
watch(template, (v) => {
  try {
    localStorage.setItem(templateKey.value, v);
  } catch {
    /* diabaikan */
  }
});

// ── edit / hapus ────────────────────────────────────────────
const editing = ref(null);
const editForm = reactive({ name: '', phone: '', slug: '' });
const deleting = ref(null);

const linkOf = (g) => invitationUrl(invitation.value.slug, g.slug);
const messageOf = (g) => fillTemplate(template.value, { name: g.name, link: linkOf(g) });

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return guests.value;
  return guests.value.filter((g) => g.name.toLowerCase().includes(q) || g.slug.includes(q) || g.phone?.includes(q));
});

const stats = computed(() => {
  const list = guests.value;
  const rsvp = list.filter((g) => g.rsvp);
  return {
    total: list.length,
    opened: list.filter((g) => g.open_count > 0).length,
    attending: rsvp.filter((g) => g.rsvp.attendance === 'hadir').length,
    declined: rsvp.filter((g) => g.rsvp.attendance === 'tidak').length,
    people: rsvp.reduce((s, g) => s + (g.rsvp.attendance === 'hadir' ? g.rsvp.guests : 0), 0),
  };
});

async function load() {
  loading.value = true;
  try {
    const [inv, list] = await Promise.all([api.get(`/invitations/${id.value}`), api.get(`/invitations/${id.value}/guests`)]);
    invitation.value = inv;
    guests.value = list;
    document.title = `Tamu ${inv.title} · Undangan Studio`;
    try {
      template.value = localStorage.getItem(templateKey.value) || DEFAULT_SHARE_TEMPLATE;
    } catch {
      template.value = DEFAULT_SHARE_TEMPLATE;
    }
  } catch (e) {
    push(e.message, 'error');
  } finally {
    loading.value = false;
  }
}
onMounted(load);

const bulkCount = computed(() => bulk.value.split('\n').filter((l) => l.trim()).length);

async function onAdd() {
  adding.value = true;
  try {
    const body = addMode.value === 'bulk' ? { names: bulk.value } : { name: single.name, phone: single.phone || null };
    const created = await api.post(`/invitations/${id.value}/guests`, body);
    guests.value = [...created.reverse(), ...guests.value];
    single.name = '';
    single.phone = '';
    bulk.value = '';
    push(created.length > 1 ? `${created.length} tamu ditambahkan` : `Link untuk ${created[0].name} siap dibagikan`, 'success');
  } catch (e) {
    push(e.message, 'error');
  } finally {
    adding.value = false;
  }
}

async function copy(text, label) {
  const ok = await copyText(text);
  push(ok ? `${label} disalin` : 'Gagal menyalin', ok ? 'success' : 'error');
}

const copyAll = () =>
  copy(filtered.value.map((g) => `${g.name}: ${linkOf(g)}`).join('\n'), `${filtered.value.length} link`);

function openEdit(g) {
  editing.value = g;
  Object.assign(editForm, { name: g.name, phone: g.phone ?? '', slug: g.slug });
}

async function onEdit() {
  try {
    const updated = await api.put(`/invitations/${id.value}/guests/${editing.value.id}`, {
      name: editForm.name,
      phone: editForm.phone || null,
      slug: editForm.slug || null,
    });
    guests.value = guests.value.map((g) => (g.id === updated.id ? updated : g));
    editing.value = null;
    push('Tamu diperbarui', 'success');
  } catch (e) {
    push(e.message, 'error');
  }
}

async function onDelete() {
  const g = deleting.value;
  deleting.value = null;
  try {
    await api.delete(`/invitations/${id.value}/guests/${g.id}`);
    guests.value = guests.value.filter((x) => x.id !== g.id);
    push('Tamu dihapus', 'success');
  } catch (e) {
    push(e.message, 'error');
  }
}

const rsvpLabel = (r) => (r.attendance === 'hadir' ? `Hadir · ${r.guests} org` : 'Tidak hadir');
const fmtDate = (v) => (v ? new Date(v).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '');
</script>

<template>
  <div v-if="loading" class="loading"><span class="spinner" /></div>

  <div v-else-if="invitation">
    <RouterLink to="/admin" class="crumb"><Icon name="arrowLeft" :size="14" /> Semua undangan</RouterLink>
    <div class="page-head">
      <div>
        <h1>Tamu · {{ invitation.title }}</h1>
        <p>Setiap tamu mendapat link pribadi dengan namanya tampil di cover undangan.</p>
      </div>
      <div class="page-head__actions">
        <RouterLink :to="`/admin/invitations/${invitation.id}/edit`" class="btn"><Icon name="pencil" :size="15" /> Edit desain</RouterLink>
        <a :href="`/${invitation.slug}`" target="_blank" rel="noopener" class="btn"><Icon name="external" :size="15" /> Lihat</a>
      </div>
    </div>

    <p v-if="!invitation.is_published" class="note note--accent" style="margin-bottom: 16px">
      Undangan ini masih <b>Draft</b>, link belum bisa dibuka tamu. Terbitkan lewat tombol Pengaturan di halaman daftar undangan.
    </p>

    <div class="stats-row">
      <div class="stat"><b>{{ stats.total }}</b><span>Tamu</span></div>
      <div class="stat"><b>{{ stats.opened }}</b><span>Sudah membuka</span></div>
      <div class="stat"><b>{{ stats.attending }}</b><span>Hadir ({{ stats.people }} orang)</span></div>
      <div class="stat"><b>{{ stats.declined }}</b><span>Tidak hadir</span></div>
    </div>

    <div class="grid">
      <section class="card card--pad add">
        <div class="add__head">
          <h2 class="card__title">Tambah tamu</h2>
          <div class="seg-tabs" role="group" aria-label="Mode tambah tamu">
            <button type="button" :class="{ 'is-on': addMode === 'single' }" @click="addMode = 'single'">Satu</button>
            <button type="button" :class="{ 'is-on': addMode === 'bulk' }" @click="addMode = 'bulk'">Banyak</button>
          </div>
        </div>

        <form class="form-grid" @submit.prevent="onAdd">
          <template v-if="addMode === 'single'">
            <label class="field">
              <span class="field__label">Nama tamu</span>
              <input v-model="single.name" class="input" required maxlength="150" placeholder="mis. Adit & Istri" />
            </label>
            <label class="field">
              <span class="field__label">No. WhatsApp <small class="field__hint">(opsional)</small></span>
              <input v-model="single.phone" class="input" inputmode="tel" maxlength="30" placeholder="08123456789" />
            </label>
          </template>
          <label v-else class="field">
            <span class="field__label">Satu tamu per baris</span>
            <textarea v-model="bulk" class="input" rows="7" required placeholder="Adit & Istri | 08123456789&#10;Joko & Istri&#10;Keluarga Bpk. Slamet" />
            <small class="field__hint">Format: <code>Nama</code> atau <code>Nama | No. WhatsApp</code>. {{ bulkCount }} tamu.</small>
          </label>
          <button type="submit" class="btn btn--primary" :disabled="adding">
            <Icon name="plus" :size="15" /> {{ adding ? 'Menambahkan…' : addMode === 'bulk' ? `Tambah ${bulkCount || ''} tamu` : 'Tambah & buat link' }}
          </button>
        </form>

        <hr class="divider-line" />
        <div class="general">
          <span class="field__label">Link umum (tanpa nama tamu)</span>
          <div class="cell-link">
            <span>{{ invitationUrl(invitation.slug) }}</span>
            <button type="button" class="btn btn--ghost btn--sm" aria-label="Salin link umum" @click="copy(invitationUrl(invitation.slug), 'Link umum')"><Icon name="copy" :size="13" /></button>
          </div>
        </div>
        <button type="button" class="btn btn--sm" @click="templateOpen = true"><Icon name="mail" :size="14" /> Atur template pesan WhatsApp</button>
      </section>

      <section class="card table-wrap">
        <div class="toolbar">
          <label class="search">
            <Icon name="search" :size="15" />
            <input v-model="query" class="input" type="search" placeholder="Cari tamu…" aria-label="Cari tamu" />
          </label>
          <button v-if="filtered.length" type="button" class="btn btn--sm" @click="copyAll"><Icon name="copy" :size="14" /> Salin semua link</button>
        </div>

        <div v-if="!guests.length" class="empty">
          <Icon name="users" :size="34" />
          <strong>Belum ada tamu</strong>
          <span>Tambahkan nama tamu di samping. Contoh: “Adit &amp; Istri” akan mendapat link<br /><code>{{ invitationUrl(invitation.slug, 'adit-dan-istri') }}</code></span>
        </div>

        <table v-else class="table guests">
          <thead>
            <tr>
              <th>Tamu</th>
              <th class="col-status">Status</th>
              <th class="col-actions"><span class="sr-only">Aksi</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in filtered" :key="g.id">
              <td>
                <strong>{{ g.name }}</strong>
                <span v-if="g.phone" class="muted"> · {{ g.phone }}</span>
                <div class="cell-link"><span>{{ linkOf(g) }}</span></div>
              </td>
              <td data-label="Status">
                <div class="status">
                  <span v-if="g.rsvp" class="chip" :class="g.rsvp.attendance === 'hadir' ? 'chip--ok' : 'chip--danger'">{{ rsvpLabel(g.rsvp) }}</span>
                  <span v-else-if="g.open_count" class="chip chip--accent" :title="`Pertama dibuka ${fmtDate(g.opened_at)}`">Dibuka {{ g.open_count }}×</span>
                  <span v-else class="chip">Belum dibuka</span>
                </div>
                <div v-if="g.rsvp?.message" class="muted wish">“{{ g.rsvp.message }}”</div>
              </td>
              <td>
                <div class="actions">
                  <button type="button" class="btn btn--sm btn--primary" @click="copy(linkOf(g), `Link ${g.name}`)"><Icon name="copy" :size="14" /> Salin link</button>
                  <a :href="whatsappUrl(g.phone, messageOf(g))" target="_blank" rel="noopener" class="btn btn--sm" title="Kirim lewat WhatsApp"><Icon name="send" :size="14" /> WA</a>
                  <button type="button" class="btn btn--sm" title="Salin pesan undangan" aria-label="Salin pesan undangan" @click="copy(messageOf(g), 'Pesan')"><Icon name="file" :size="14" /></button>
                  <a :href="linkOf(g)" target="_blank" rel="noopener" class="btn btn--sm" title="Buka link" aria-label="Buka link"><Icon name="external" :size="14" /></a>
                  <button type="button" class="btn btn--sm" title="Edit" aria-label="Edit tamu" @click="openEdit(g)"><Icon name="pencil" :size="14" /></button>
                  <button type="button" class="btn btn--sm btn--danger" title="Hapus" aria-label="Hapus tamu" @click="deleting = g"><Icon name="trash" :size="14" /></button>
                </div>
              </td>
            </tr>
            <tr v-if="!filtered.length">
              <td colspan="3" class="muted">Tidak ada tamu yang cocok dengan “{{ query }}”.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

    <BaseModal :open="templateOpen" title="Template pesan WhatsApp" width="520px" @close="templateOpen = false">
      <div class="form-grid">
        <p class="note">Gunakan <code>{nama}</code> untuk nama tamu dan <code>{link}</code> untuk link pribadinya. Template disimpan di browser ini.</p>
        <textarea v-model="template" class="input" rows="12" />
        <div class="form-actions">
          <button type="button" class="btn" @click="template = DEFAULT_SHARE_TEMPLATE">Kembalikan default</button>
          <button type="button" class="btn btn--primary" @click="templateOpen = false">Selesai</button>
        </div>
      </div>
    </BaseModal>

    <BaseModal :open="!!editing" title="Edit tamu" width="440px" @close="editing = null">
      <form class="form-grid" @submit.prevent="onEdit">
        <label class="field">
          <span class="field__label">Nama tamu</span>
          <input v-model="editForm.name" class="input" required maxlength="150" />
        </label>
        <label class="field">
          <span class="field__label">No. WhatsApp</span>
          <input v-model="editForm.phone" class="input" inputmode="tel" maxlength="30" />
        </label>
        <label class="field">
          <span class="field__label">Akhiran link</span>
          <input v-model="editForm.slug" class="input" maxlength="160" />
          <small class="field__hint">Mengubah ini membuat link lama tamu tidak berlaku.</small>
        </label>
        <div class="form-actions">
          <button type="button" class="btn" @click="editing = null">Batal</button>
          <button type="submit" class="btn btn--primary">Simpan</button>
        </div>
      </form>
    </BaseModal>

    <ConfirmModal
      :open="!!deleting"
      title="Hapus tamu?"
      :message="`Link pribadi ${deleting?.name} tidak akan berlaku lagi. RSVP-nya tetap tersimpan.`"
      confirm-text="Hapus"
      danger
      @confirm="onDelete"
      @cancel="deleting = null"
    />
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 16px; align-items: start; }
.add { display: grid; gap: 14px; position: sticky; top: calc(var(--header-h) + 16px); }
.add__head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.add__head .card__title { margin: 0; }
.general { display: grid; gap: 4px; }
.general .cell-link { max-width: none; }
.status { display: flex; flex-wrap: wrap; gap: 6px; }
.wish { margin-top: 4px; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
code { font-size: 12px; overflow-wrap: anywhere; }
.guests { table-layout: fixed; }
.guests .col-status { width: 170px; }
.guests .col-actions { width: 236px; }
.guests .cell-link { max-width: none; }
.guests .actions { gap: 4px; }
.guests .chip { white-space: nowrap; }
@media (max-width: 960px) {
  .grid { grid-template-columns: 1fr; }
  .add { position: static; }
}
</style>
