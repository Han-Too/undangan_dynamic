<script setup>
import { computed, ref } from 'vue';
import { createPhoto } from '../../data/defaults';
import { useInvitation } from '../../composables/useInvitation';
import { useToast } from '../../composables/useToast';
import { api } from '../../services/api';
import { compressImage } from '../../utils/image';
import Icon from '../Icon.vue';
import InvPhoto from '../invitation/InvPhoto.vue';
import PhotoCropModal from './PhotoCropModal.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state, meta } = useInvitation();
const { push } = useToast();

// `ratio` = lebar / tinggi, sama dengan kotak tampil di undangan.
const slots = [
  { key: 'cover', label: 'Foto cover', hint: 'Latar halaman pembuka (vertikal)', ratio: 9 / 16 },
  { key: 'profile', label: 'Foto profil / pasangan', hint: 'Dalam bingkai tema', ratio: 4 / 5 },
  ...[0, 1, 2, 3].map((i) => ({ key: `gallery.${i}`, label: `Galeri ${i + 1}`, hint: '', ratio: i % 3 === 0 ? 3 / 4 : 1 })),
];

const photoOf = (key) => key.split('.').reduce((o, k) => o[k], state.photos);
const slotByKey = (key) => slots.find((s) => s.key === key);

const fileInput = ref(null);
const pendingKey = ref(null); // slot yang sedang menerima file
const editing = ref(null); // { key, photo } untuk dialog
const busy = ref(false);

const editingSlot = computed(() => (editing.value ? slotByKey(editing.value.key) : null));

function pick(key) {
  pendingKey.value = key;
  fileInput.value.value = '';
  fileInput.value.click();
}

async function onFile(e) {
  const file = e.target.files?.[0];
  if (!file || !pendingKey.value) return;
  busy.value = true;
  try {
    const compressed = await compressImage(file);
    const { url: src } = await api.upload(`/invitations/${meta.value.id}/photos`, compressed);
    editing.value = { key: pendingKey.value, photo: { ...createPhoto(), src } };
  } catch (err) {
    push(err.message, 'error');
  } finally {
    busy.value = false;
  }
}

function adjust(key) {
  editing.value = { key, photo: { ...photoOf(key) } };
}

function apply(draft) {
  Object.assign(photoOf(editing.value.key), draft);
  editing.value = null;
  push('Foto diterapkan', 'success');
}

function remove(key) {
  Object.assign(photoOf(key), createPhoto());
}
</script>

<template>
  <div class="panel">
    <PanelHeader title="Foto" desc="Unggah foto, atur posisinya, lalu terapkan. Foto otomatis dikompres lalu diunggah ke server; klik Save agar tersimpan di undangan." />
    <input ref="fileInput" type="file" accept="image/*" class="sr-only" tabindex="-1" @change="onFile" />

    <div class="slots">
      <article v-for="s in slots" :key="s.key" class="slot" :class="{ 'slot--wide': s.key === 'cover' || s.key === 'profile' }">
        <button type="button" class="slot__thumb" :style="{ aspectRatio: s.ratio }" :aria-label="`${photoOf(s.key).src ? 'Atur' : 'Unggah'} ${s.label}`" @click="photoOf(s.key).src ? adjust(s.key) : pick(s.key)">
          <InvPhoto :photo="photoOf(s.key)" :label="s.label" />
          <span v-if="!photoOf(s.key).src" class="slot__plus"><Icon name="upload" :size="18" /></span>
        </button>
        <div class="slot__body">
          <strong>{{ s.label }}</strong>
          <small v-if="s.hint">{{ s.hint }}</small>
          <div class="slot__actions">
            <button type="button" class="btn btn--sm" :disabled="busy" @click="pick(s.key)">
              <Icon name="upload" :size="14" /> {{ busy && pendingKey === s.key ? 'Mengunggah…' : photoOf(s.key).src ? 'Ganti' : 'Unggah' }}
            </button>
            <template v-if="photoOf(s.key).src">
              <button type="button" class="btn btn--sm" @click="adjust(s.key)"><Icon name="crop" :size="14" /> Atur</button>
              <button type="button" class="btn btn--sm btn--danger" :aria-label="`Hapus ${s.label}`" @click="remove(s.key)"><Icon name="trash" :size="14" /></button>
            </template>
          </div>
        </div>
      </article>
    </div>

    <PhotoCropModal
      :open="!!editing"
      :title="editingSlot?.label"
      :photo="editing?.photo"
      :ratio="editingSlot?.ratio"
      @apply="apply"
      @close="editing = null"
      @replace="pick(editing.key)"
    />
  </div>
</template>

<style scoped>
.slots { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.slot {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  padding: 10px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.slot--wide { grid-column: 1 / -1; grid-template-columns: 110px 1fr; grid-template-rows: auto; align-items: start; }
.slot__thumb {
  position: relative;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--ui-border);
  border-radius: 9px;
  background: var(--ui-sunken);
}
.slot__thumb:hover .slot__plus { opacity: 1; }
.slot__plus {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--ui-ink);
  background: rgba(255, 255, 255, 0.55);
  opacity: 0;
  transition: opacity 0.15s;
}
.slot__body { display: grid; gap: 2px; align-content: start; min-width: 0; }
.slot__body small { color: var(--ui-muted); font-size: 12px; }
.slot__actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
/* thumbnail galeri/placeholder memakai CSS var tema undangan → beri fallback netral */
.slot__thumb :deep(.inv-photo__ph) { color: var(--ui-faint); background: var(--ui-sunken); font-size: 9px; text-align: center; padding: 4px; }
</style>
