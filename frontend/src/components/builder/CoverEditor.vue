<script setup>
import { computed, reactive } from 'vue';
import { useBuilderUi } from '../../composables/useBuilderUi';
import { useInvitation } from '../../composables/useInvitation';
import { coverBackgrounds, coverLayouts } from '../../data/coverBackgrounds';
import { coverFrames } from '../../data/coverFrames';
import Icon from '../Icon.vue';
import CoverFrame from '../invitation/CoverFrame.vue';
import AccordionGroup from './ui/AccordionGroup.vue';
import PanelHeader from './ui/PanelHeader.vue';

/**
 * Desain cover: layout, bingkai, dan background. Pilihan "Ikuti tema" disimpan sebagai string kosong
 * sehingga cover ikut berubah saat tema diganti.
 */
const { state, theme, cssVars, effective, coverDesign } = useInvitation();
const { openPanel } = useBuilderUi();
const open = reactive({ layout: true, frame: true, background: true });

const colors = computed(() => ({
  primary: effective('primary'),
  secondary: effective('secondary'),
  bg: effective('background'),
  text: effective('text'),
}));
const bgOf = (b) => (b.css ? b.css(colors.value) : `var(--pattern-img) 0 0 / 40px, ${colors.value.bg}`);

/** '' = ikuti tema. Pilihan eksplisit tetap dipakai walau tema diganti. */
const choose = (key, id) => (state.coverStyle[key] = id === 'theme' ? '' : id);
const isActive = (key, id) => (id === 'theme' ? !state.coverStyle[key] : coverDesign.value[key] === id);
const resetAll = () => Object.assign(state.coverStyle, { layout: '', frame: '', background: '' });
const customized = computed(() => Object.values(state.coverStyle).some(Boolean));
</script>

<template>
  <div class="panel" :style="cssVars">
    <PanelHeader title="Desain Cover" desc="Pilih layout, bingkai, dan background halaman pembuka. Warnanya otomatis mengikuti tema." />

    <div class="row">
      <button type="button" class="btn btn--sm" @click="openPanel('general', 'cover')"><Icon name="pencil" :size="14" /> Edit teks cover</button>
      <button type="button" class="btn btn--sm" @click="openPanel('photos')"><Icon name="image" :size="14" /> Foto cover</button>
      <button v-if="customized" type="button" class="btn btn--sm btn--ghost" @click="resetAll"><Icon name="reset" :size="14" /> Ikuti tema</button>
    </div>

    <AccordionGroup v-model="open.layout" title="Layout">
      <div class="opts opts--layout" role="radiogroup" aria-label="Layout cover">
        <button
          v-for="l in coverLayouts"
          :key="l.id"
          type="button"
          role="radio"
          class="opt"
          :class="{ 'is-active': isActive('layout', l.id) }"
          :aria-checked="isActive('layout', l.id)"
          :title="l.desc"
          @click="choose('layout', l.id)"
        >
          <span class="lay" :data-l="l.id" :style="{ background: colors.bg }">
            <i class="lay__hero" /><i class="lay__box"><b /><b /><b /></i>
          </span>
          <small>{{ l.name }}<em v-if="l.id === theme.cover.layout"> · tema</em></small>
        </button>
      </div>
    </AccordionGroup>

    <AccordionGroup v-model="open.frame" title="Bingkai">
      <div class="opts" role="radiogroup" aria-label="Bingkai cover">
        <button
          v-for="f in coverFrames"
          :key="f.id"
          type="button"
          role="radio"
          class="opt"
          :class="{ 'is-active': isActive('frame', f.id) }"
          :aria-checked="isActive('frame', f.id)"
          @click="choose('frame', f.id)"
        >
          <span class="mini" :style="{ background: colors.bg }">
            <CoverFrame :frame="f.id" :theme-corner="theme.ornaments.corner" />
          </span>
          <small>{{ f.name }}</small>
        </button>
      </div>
    </AccordionGroup>

    <AccordionGroup v-model="open.background" title="Background">
      <div class="opts" role="radiogroup" aria-label="Background cover">
        <button
          v-for="b in coverBackgrounds"
          :key="b.id"
          type="button"
          role="radio"
          class="opt"
          :class="{ 'is-active': isActive('background', b.id) }"
          :aria-checked="isActive('background', b.id)"
          @click="choose('background', b.id)"
        >
          <span class="mini" :style="{ background: bgOf(b) }" />
          <small>{{ b.name }}</small>
        </button>
      </div>
    </AccordionGroup>
  </div>
</template>

<style scoped>
.row { display: flex; flex-wrap: wrap; gap: 6px; }
.opts { display: grid; grid-template-columns: repeat(auto-fill, minmax(78px, 1fr)); gap: 10px; }
.opt {
  display: grid;
  gap: 5px;
  padding: 5px;
  text-align: center;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 11px;
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
}
.opt:hover { transform: translateY(-1px); box-shadow: var(--ui-shadow); }
.opt.is-active { border-color: var(--ui-ink); box-shadow: 0 0 0 1px var(--ui-ink); }
.opt small { font-size: 11px; line-height: 1.25; color: var(--ui-muted); }
.opt small em { font-style: normal; color: var(--ui-faint); }

.mini {
  position: relative;
  display: block;
  aspect-ratio: 9 / 14;
  overflow: hidden;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}
/* Skala ornamen bingkai untuk thumbnail */
.mini :deep(.corner) { width: 40%; }
.mini :deep(.cframe__line) { inset: 5px; }
.mini :deep(.cframe[data-line='double'] .cframe__line) { outline-offset: -4px; }
.mini :deep(.cframe[data-line='arch'] .cframe__line) { inset: 8px 7px; outline-offset: -4px; }
.mini :deep(.cframe[data-line='polaroid'] .cframe__line) { inset: 4px; border-width: 4px 4px 14px; }
.mini :deep(.cframe__svgline) { inset: 6px 5px 5px; width: calc(100% - 10px); height: calc(100% - 11px); }
.mini :deep(.cframe__mid) { width: 60%; }
.mini :deep(.cframe__mid--top) { top: 5px; }
.mini :deep(.cframe__mid--bottom) { bottom: 5px; }
.mini :deep(.cframe__edge) { height: 6px; background-size: 10px 6px !important; }

/* Skema layout */
.lay {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 9 / 14;
  padding: 8px;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}
.lay__hero { display: none; }
.lay__box { display: grid; justify-items: center; gap: 4px; width: 100%; padding: 6px 4px; }
.lay__box b { display: block; height: 4px; width: 60%; border-radius: 2px; background: var(--c-primary); opacity: 0.55; }
.lay__box b:nth-child(2) { height: 8px; width: 80%; background: var(--c-heading); opacity: 0.8; }
.lay__box b:nth-child(3) { width: 40%; height: 6px; border-radius: 4px; background: var(--c-secondary); opacity: 0.9; }
.lay[data-l='bottom'] { place-items: end center; }
.lay[data-l='card'] .lay__box { background: var(--c-surface); border: 1px solid var(--c-primary); border-radius: 5px; padding: 9px 4px; }
.lay[data-l='arch'] .lay__box { background: var(--c-surface); border: 1px solid var(--c-primary); border-radius: 99px 99px 5px 5px; padding: 18px 4px 8px; }
.lay[data-l='editorial'] { place-items: end start; }
.lay[data-l='editorial'] .lay__box { justify-items: start; }
.lay[data-l='editorial'] .lay__box b:nth-child(2) { height: 13px; width: 90%; }
.lay[data-l='split'] { grid-template-rows: 1fr auto; padding: 8px 8px 6px; }
.lay[data-l='split'] .lay__hero {
  display: block;
  width: 80%;
  height: 100%;
  border-radius: 99px 99px 0 0;
  background: color-mix(in srgb, var(--c-primary) 35%, transparent);
}
</style>
