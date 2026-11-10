<script setup>
import { computed, reactive } from 'vue';
import { useBuilderUi } from '../../composables/useBuilderUi';
import { useInvitation } from '../../composables/useInvitation';
import { photoBorders, photoDecors, photoShapes } from '../../data/photoFrames';
import Icon from '../Icon.vue';
import InvPhoto from '../invitation/InvPhoto.vue';
import PhotoFrame from '../invitation/PhotoFrame.vue';
import AccordionGroup from './ui/AccordionGroup.vue';
import PanelHeader from './ui/PanelHeader.vue';

/**
 * Bingkai foto profil: bentuk, border, dan hiasan. Tiap pilihan dipratinjau langsung dengan foto
 * dan warna tema. "Ikuti tema" disimpan sebagai string kosong.
 */
const { state, theme, cssVars, photoStyle } = useInvitation();
const { openPanel } = useBuilderUi();
const open = reactive({ shape: true, border: true, decor: false });

const groups = [
  { key: 'shape', title: 'Bentuk', list: photoShapes },
  { key: 'border', title: 'Border', list: photoBorders },
  { key: 'decor', title: 'Hiasan', list: photoDecors },
];

const choose = (key, id) => (state.profileStyle[key] = id === 'theme' ? '' : id);
const isActive = (key, id) => (id === 'theme' ? !state.profileStyle[key] : photoStyle.value[key] === id);
/** Gaya untuk thumbnail: pilihan ini, sisanya mengikuti gaya aktif. */
const styleFor = (key, id) => ({ ...photoStyle.value, [key]: id === 'theme' ? theme.value.photo[key] : id });
const customized = computed(() => Object.values(state.profileStyle).some(Boolean));
const resetAll = () => Object.assign(state.profileStyle, { shape: '', border: '', decor: '' });

/** Kombinasi siap pakai. */
const presets = [
  { name: 'Love manis', shape: 'heart', border: 'duo', decor: 'hearts' },
  { name: 'Bundar emas', shape: 'circle', border: 'tiered', decor: 'sparkle' },
  { name: 'Polaroid', shape: 'square', border: 'white', decor: 'none' },
  { name: 'Galeri', shape: 'rect', border: 'mat', decor: 'corners' },
  { name: 'Bunga', shape: 'scallop', border: 'double', decor: 'flowers' },
  { name: 'Modern', shape: 'rounded', border: 'offset', decor: 'blob' },
  { name: 'Neon', shape: 'hexagon', border: 'neon', decor: 'stars' },
  { name: 'Islami', shape: 'dome', border: 'ring', decor: 'islamic' },
];
const applyPreset = (p) => Object.assign(state.profileStyle, { shape: p.shape, border: p.border, decor: p.decor });
</script>

<template>
  <div class="panel" :style="cssVars">
    <PanelHeader title="Bingkai Foto Profil" desc="Ganti bentuk foto (kotak, love, bundar, …), pilih border, lalu tambahkan hiasan. Warna mengikuti tema." />

    <div class="hero">
      <PhotoFrame v-bind="photoStyle">
        <InvPhoto :photo="state.photos.profile" label="Foto Profil" />
      </PhotoFrame>
    </div>

    <div class="row">
      <button type="button" class="btn btn--sm" @click="openPanel('photos')"><Icon name="image" :size="14" /> Ganti foto</button>
      <button v-if="customized" type="button" class="btn btn--sm btn--ghost" @click="resetAll"><Icon name="reset" :size="14" /> Ikuti tema</button>
    </div>

    <div class="field">
      <span class="field__label">Kombinasi cepat</span>
      <div class="presets">
        <button v-for="p in presets" :key="p.name" type="button" class="preset" @click="applyPreset(p)">
          <span class="tile"><PhotoFrame :shape="p.shape" :border="p.border" :decor="p.decor"><InvPhoto :photo="state.photos.profile" label="" /></PhotoFrame></span>
          <small>{{ p.name }}</small>
        </button>
      </div>
    </div>

    <AccordionGroup v-for="g in groups" :key="g.key" v-model="open[g.key]" :title="g.title">
      <div class="opts" role="radiogroup" :aria-label="`${g.title} foto`">
        <button
          v-for="o in g.list"
          :key="o.id"
          type="button"
          role="radio"
          class="opt"
          :class="{ 'is-active': isActive(g.key, o.id) }"
          :aria-checked="isActive(g.key, o.id)"
          @click="choose(g.key, o.id)"
        >
          <span class="tile">
            <PhotoFrame v-bind="styleFor(g.key, o.id)"><InvPhoto :photo="state.photos.profile" label="" /></PhotoFrame>
          </span>
          <small>{{ o.name }}<em v-if="o.id !== 'theme' && o.id === theme.photo[g.key]"> · tema</em></small>
        </button>
      </div>
    </AccordionGroup>
  </div>
</template>

<style scoped>
.row { display: flex; flex-wrap: wrap; gap: 6px; }
.hero {
  display: grid;
  place-items: center;
  padding: 26px 16px;
  background: var(--c-bg);
  border-radius: var(--ui-radius);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
}
.hero :deep(.pf) { width: 150px; }

.presets { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.preset, .opt {
  display: grid;
  gap: 5px;
  padding: 5px;
  text-align: center;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 11px;
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
}
.preset:hover, .opt:hover { transform: translateY(-1px); box-shadow: var(--ui-shadow); }
.opt.is-active { border-color: var(--ui-ink); box-shadow: 0 0 0 1px var(--ui-ink); }
.preset small, .opt small { font-size: 11px; line-height: 1.25; color: var(--ui-muted); }
.opt small em { font-style: normal; color: var(--ui-faint); }

.opts { display: grid; grid-template-columns: repeat(auto-fill, minmax(78px, 1fr)); gap: 10px; }
/* Thumbnail: foto dirender ukuran asli lalu diperkecil agar tebal border tetap proporsional. */
.tile {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--c-bg);
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}
.tile :deep(.pf) { width: 150px; zoom: 0.36; }
.tile :deep(.inv-photo__ph) { font-size: 0; }
.tile :deep(.inv-photo__ph .icon) { width: 40px; height: 40px; }
</style>
