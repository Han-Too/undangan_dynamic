<script setup>
import { reactive, ref, watch } from 'vue';
import InvPhoto from '../invitation/InvPhoto.vue';
import BaseModal from './ui/BaseModal.vue';
import FieldRange from './ui/FieldRange.vue';

/**
 * Dialog pratinjau + atur foto sebelum diterapkan: fit, zoom, dan posisi (geser dengan drag).
 * Pengaturan bersifat non-destruktif (object-fit/position/scale), foto asli tidak dipotong.
 */
const props = defineProps({
  open: Boolean,
  title: { type: String, default: 'Atur foto' },
  photo: { type: Object, default: null },
  ratio: { type: Number, default: 0.8 }, // lebar / tinggi slot
});
const emit = defineEmits(['apply', 'close', 'replace']);

const draft = reactive({ src: '', fit: 'cover', x: 50, y: 50, zoom: 1 });
const frame = ref(null);
let drag = null;

watch(
  () => [props.open, props.photo],
  () => {
    if (props.open && props.photo) Object.assign(draft, props.photo);
  },
  { immediate: true },
);

const clamp = (v) => Math.min(100, Math.max(0, v));

function onDown(e) {
  drag = { px: e.clientX, py: e.clientY, x: draft.x, y: draft.y };
  e.currentTarget.setPointerCapture(e.pointerId);
}
function onMove(e) {
  if (!drag || !frame.value) return;
  const { width, height } = frame.value.getBoundingClientRect();
  // menggeser gambar ke kanan berarti titik fokus bergeser ke kiri
  draft.x = clamp(drag.x - ((e.clientX - drag.px) / width) * 100);
  draft.y = clamp(drag.y - ((e.clientY - drag.py) / height) * 100);
}
const onUp = () => (drag = null);

const recenter = () => Object.assign(draft, { x: 50, y: 50, zoom: 1 });
</script>

<template>
  <BaseModal :open="open" :title="title" width="460px" @close="emit('close')">
    <div class="crop">
      <div
        ref="frame"
        class="crop__frame"
        :style="{ aspectRatio: ratio, '--ar': ratio }"
        @pointerdown="onDown"
        @pointermove="onMove"
        @pointerup="onUp"
        @pointercancel="onUp"
      >
        <InvPhoto :photo="draft" label="Foto" />
        <span class="crop__grid" aria-hidden="true" />
      </div>
      <p class="crop__hint">Geser foto untuk mengatur posisi · kotak ini sama dengan tampilan di undangan</p>

      <div class="crop__controls">
        <div class="seg" role="radiogroup" aria-label="Mode foto">
          <button type="button" role="radio" :aria-checked="draft.fit === 'cover'" :class="{ 'is-on': draft.fit === 'cover' }" @click="draft.fit = 'cover'">Penuh (cover)</button>
          <button type="button" role="radio" :aria-checked="draft.fit === 'contain'" :class="{ 'is-on': draft.fit === 'contain' }" @click="draft.fit = 'contain'">Utuh (contain)</button>
        </div>
        <FieldRange v-model="draft.zoom" label="Zoom" :min="1" :max="3" :step="0.05" suffix="×" />
        <div class="row">
          <FieldRange v-model="draft.x" label="Posisi X" suffix="%" />
          <FieldRange v-model="draft.y" label="Posisi Y" suffix="%" />
        </div>
      </div>

      <div class="crop__actions">
        <button type="button" class="btn btn--ghost" @click="recenter">Reset posisi</button>
        <button type="button" class="btn" @click="emit('replace')">Pilih foto lain</button>
        <span class="spacer" />
        <button type="button" class="btn" @click="emit('close')">Batal</button>
        <button type="button" class="btn btn--primary" @click="emit('apply', { ...draft })">Terapkan</button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.crop { display: grid; gap: 14px; }
.crop__frame {
  position: relative;
  width: min(100%, 300px, calc(44dvh * var(--ar)));
  margin: 0 auto;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 0 1px var(--ui-border-strong);
  touch-action: none;
  cursor: grab;
  user-select: none;
}
.crop__frame:active { cursor: grabbing; }
.crop__frame :deep(.inv-photo) { background: #e9e5dc; }
.crop__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(to right, transparent 33%, rgba(255, 255, 255, 0.45) 33%, rgba(255, 255, 255, 0.45) calc(33% + 1px), transparent calc(33% + 1px), transparent 66%, rgba(255, 255, 255, 0.45) 66%, rgba(255, 255, 255, 0.45) calc(66% + 1px), transparent calc(66% + 1px)),
    linear-gradient(to bottom, transparent 33%, rgba(255, 255, 255, 0.45) 33%, rgba(255, 255, 255, 0.45) calc(33% + 1px), transparent calc(33% + 1px), transparent 66%, rgba(255, 255, 255, 0.45) 66%, rgba(255, 255, 255, 0.45) calc(66% + 1px), transparent calc(66% + 1px));
}
.crop__hint { margin: 0; text-align: center; font-size: 12px; color: var(--ui-muted); }
.crop__controls { display: grid; gap: 12px; }
.seg { display: grid; grid-template-columns: 1fr 1fr; padding: 3px; background: var(--ui-sunken); border-radius: 10px; }
.seg button { padding: 7px; font-size: 12.5px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: 8px; }
.seg button.is-on { color: var(--ui-ink); background: var(--ui-surface); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15); }
.crop__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.spacer { flex: 1; }
</style>
