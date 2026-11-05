<script setup>
import { useBuilderUi } from '../../composables/useBuilderUi';
import { useInvitation } from '../../composables/useInvitation';
import { GALLERY_COUNTS } from '../../data/defaults';
import Icon from '../Icon.vue';
import FieldText from './ui/FieldText.vue';
import PanelHeader from './ui/PanelHeader.vue';
import ToggleSwitch from './ui/ToggleSwitch.vue';

const { state } = useInvitation();
const { openPanel } = useBuilderUi();
const g = state.content.gallery;

const modes = [
  { id: 'grid', label: 'Grid', desc: 'Semua foto tampil sekaligus' },
  { id: 'carousel', label: 'Carousel', desc: 'Satu per satu, bisa digeser' },
];
</script>

<template>
  <div class="panel">
    <PanelHeader title="Galeri" desc="Atur jumlah foto, cara tampil, serta judul galeri. Klik foto di undangan untuk melihatnya lebih besar." />

    <div class="field">
      <span class="field__label">Jumlah foto</span>
      <div class="seg" role="radiogroup" aria-label="Jumlah foto">
        <button
          v-for="n in GALLERY_COUNTS"
          :key="n"
          type="button"
          role="radio"
          :aria-checked="state.gallery.count === n"
          :class="{ 'is-on': state.gallery.count === n }"
          @click="state.gallery.count = n"
        >
          {{ n }} foto
        </button>
      </div>
    </div>

    <div class="field">
      <span class="field__label">Tampilan</span>
      <div class="modes" role="radiogroup" aria-label="Tampilan galeri">
        <button
          v-for="m in modes"
          :key="m.id"
          type="button"
          role="radio"
          class="mode"
          :aria-checked="state.gallery.mode === m.id"
          :class="{ 'is-on': state.gallery.mode === m.id }"
          @click="state.gallery.mode = m.id"
        >
          <span class="mode__art" :data-m="m.id"><i /><i /><i /><i /></span>
          <strong>{{ m.label }}</strong>
          <small>{{ m.desc }}</small>
        </button>
      </div>
    </div>

    <ToggleSwitch v-if="state.gallery.mode === 'carousel'" v-model="state.gallery.autoplay" label="Geser otomatis (tiap 3,5 detik)" />

    <FieldText v-model="g.title" label="Judul" />
    <FieldText v-model="g.caption" label="Caption" multiline :rows="3" />
    <button type="button" class="btn btn--block" @click="openPanel('photos')">
      <Icon name="image" :size="15" /> Kelola foto galeri
    </button>
  </div>
</template>

<style scoped>
.seg { display: grid; grid-template-columns: repeat(3, 1fr); padding: 3px; gap: 3px; background: var(--ui-sunken); border-radius: 10px; }
.seg button { padding: 8px 4px; font-size: 12.5px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: 8px; }
.seg button.is-on { color: var(--ui-ink); background: var(--ui-surface); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); }

.modes { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.mode {
  display: grid;
  gap: 3px;
  padding: 10px;
  text-align: left;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 12px;
}
.mode.is-on { border-color: var(--ui-ink); box-shadow: 0 0 0 1px var(--ui-ink); }
.mode strong { font-size: 13px; }
.mode small { font-size: 11.5px; color: var(--ui-muted); }
.mode__art { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; height: 54px; margin-bottom: 6px; }
.mode__art i { background: var(--ui-sunken); border-radius: 4px; }
.mode__art[data-m='carousel'] { grid-template-columns: 14px 1fr 14px; grid-template-rows: 1fr 8px; }
.mode__art[data-m='carousel'] i:nth-child(1) { grid-row: 1; opacity: 0.5; }
.mode__art[data-m='carousel'] i:nth-child(2) { grid-row: 1; background: var(--ui-faint); }
.mode__art[data-m='carousel'] i:nth-child(3) { grid-row: 1; opacity: 0.5; }
.mode__art[data-m='carousel'] i:nth-child(4) { grid-column: 2; border-radius: 4px; background: var(--ui-border); }
</style>
