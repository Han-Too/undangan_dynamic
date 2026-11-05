<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue';
import Icon from '../Icon.vue';

/** Tampilan foto penuh. Ditempatkan di dalam .inv-root (absolute) agar tetap di dalam bingkai HP. */
const props = defineProps({ photos: { type: Array, required: true } });
const index = defineModel({ type: Number, default: null });
const photo = computed(() => props.photos[index.value]);

const go = (d) => (index.value = (index.value + d + props.photos.length) % props.photos.length);
const close = () => (index.value = null);

function onKey(e) {
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowRight') go(1);
  else if (e.key === 'ArrowLeft') go(-1);
}
onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));

let startX = null;
const onDown = (e) => (startX = e.clientX);
function onUp(e) {
  if (startX === null) return;
  const dx = e.clientX - startX;
  startX = null;
  if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
}
</script>

<template>
  <div class="lbox" role="dialog" aria-modal="true" aria-label="Foto galeri" @click.self="close" @pointerdown="onDown" @pointerup="onUp">
    <Transition name="lbox-img" mode="out-in">
      <img :key="index" class="lbox__img" :src="photo.src" :alt="`Foto ${index + 1}`" draggable="false" />
    </Transition>
    <span class="lbox__count">{{ index + 1 }} / {{ photos.length }}</span>
    <button type="button" class="lbox__btn lbox__close" aria-label="Tutup" @click="close"><Icon name="x" :size="18" /></button>
    <template v-if="photos.length > 1">
      <button type="button" class="lbox__btn lbox__nav lbox__nav--prev" aria-label="Sebelumnya" @click="go(-1)"><Icon name="chevron" :size="20" /></button>
      <button type="button" class="lbox__btn lbox__nav lbox__nav--next" aria-label="Berikutnya" @click="go(1)"><Icon name="chevron" :size="20" /></button>
    </template>
  </div>
</template>

<style>
.lbox {
  position: absolute;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 56px 14px;
  background: rgba(10, 8, 6, 0.92);
  touch-action: pan-y;
  animation: lbox-in 0.25s ease;
}
.lbox__img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px; box-shadow: 0 20px 60px -20px #000; user-select: none; }
.lbox__count { position: absolute; top: 18px; left: 50%; translate: -50% 0; font-size: 12px; letter-spacing: 0.12em; color: rgba(255, 255, 255, 0.75); }
.lbox__btn {
  position: absolute;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  border: 0;
  border-radius: 50%;
  backdrop-filter: blur(6px);
}
.lbox__btn:hover { background: rgba(255, 255, 255, 0.24); }
.lbox__close { top: 10px; right: 10px; }
.lbox__nav { top: 50%; translate: 0 -50%; }
.lbox__nav--prev { left: 8px; }
.lbox__nav--prev .icon, .lbox__nav--prev svg { transform: rotate(90deg); }
.lbox__nav--next { right: 8px; }
.lbox__nav--next .icon, .lbox__nav--next svg { transform: rotate(-90deg); }
.lbox-img-enter-active, .lbox-img-leave-active { transition: opacity 0.2s ease, transform 0.25s ease; }
.lbox-img-enter-from { opacity: 0; transform: scale(0.96); }
.lbox-img-leave-to { opacity: 0; }
@keyframes lbox-in { from { opacity: 0; } }
</style>
