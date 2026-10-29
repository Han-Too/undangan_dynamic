<script setup>
import { ref } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { useRsvp } from '../../composables/useRsvp';
import { useToast } from '../../composables/useToast';
import Icon from '../Icon.vue';
import ConfirmModal from './ui/ConfirmModal.vue';
import FieldText from './ui/FieldText.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state } = useInvitation();
const { entries, stats, clear, reload } = useRsvp();
const { push } = useToast();
const r = state.content.rsvp;
const confirming = ref(false);

async function wipe() {
  confirming.value = false;
  try {
    await clear();
    push('Data RSVP dihapus', 'success');
  } catch (e) {
    push(e.message, 'error');
  }
}

async function refresh() {
  try {
    await reload();
  } catch (e) {
    push(e.message, 'error');
  }
}
</script>

<template>
  <div class="panel">
    <PanelHeader title="RSVP" desc="Teks formulir dan ringkasan konfirmasi yang masuk dari tamu (tersimpan di database)." />
    <FieldText v-model="r.title" label="Judul" />
    <FieldText v-model="r.text" label="Deskripsi" multiline :rows="3" />

    <section class="stack">
      <div class="stats">
        <div><b>{{ stats.attending }}</b><span>Hadir</span></div>
        <div><b>{{ stats.guests }}</b><span>Total tamu</span></div>
        <div><b>{{ stats.declined }}</b><span>Tidak hadir</span></div>
      </div>

      <button type="button" class="btn btn--sm" @click="refresh"><Icon name="reset" :size="14" /> Muat ulang</button>

      <ul v-if="entries.length" class="list">
        <li v-for="e in entries.slice(0, 20)" :key="e.id">
          <div class="list__top">
            <strong>{{ e.name }}</strong>
            <span class="chip" :class="{ 'chip--ok': e.attendance === 'hadir' }">
              {{ e.attendance === 'hadir' ? `Hadir · ${e.guests}` : 'Tidak hadir' }}
            </span>
          </div>
          <p v-if="e.message">{{ e.message }}</p>
        </li>
      </ul>
      <p v-else class="note">Belum ada RSVP. Konfirmasi dari tamu (atau uji isi formulir di preview) akan muncul di sini.</p>

      <button v-if="entries.length" type="button" class="btn btn--danger btn--sm" @click="confirming = true">
        <Icon name="trash" :size="14" /> Hapus semua data RSVP
      </button>
    </section>

    <ConfirmModal
      :open="confirming"
      title="Hapus data RSVP?"
      message="Semua konfirmasi kehadiran & ucapan untuk undangan ini akan dihapus permanen dari database."
      confirm-text="Hapus"
      danger
      @confirm="wipe"
      @cancel="confirming = false"
    />
  </div>
</template>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.stats div { display: grid; padding: 12px; text-align: center; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius-sm); }
.stats b { font-size: 22px; letter-spacing: -0.02em; }
.stats span { font-size: 11.5px; color: var(--ui-muted); }
.list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.list li { padding: 10px 12px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius-sm); }
.list__top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.list p { margin: 4px 0 0; font-size: 12.5px; color: var(--ui-muted); overflow-wrap: anywhere; }
</style>
