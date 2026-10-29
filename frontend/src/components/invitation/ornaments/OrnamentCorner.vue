<script setup>
import { computed } from 'vue';

/** Ornamen sudut. Digambar di kiri-atas; keempat sudut dibuat lewat transform CSS. */
const props = defineProps({ type: { type: String, default: 'floral' } });

const flower = (x, y, r = 1) =>
  `<g transform="translate(${x} ${y}) scale(${r})">${[0, 72, 144, 216, 288].map((a) => `<ellipse rx="3.4" ry="6.5" cy="-6.5" transform="rotate(${a})"/>`).join('')}<circle r="2" fill="currentColor"/></g>`;
const leaf = (x, y, a, s = 1) => `<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0c5-8 14-8 18 0-4 8-13 8-18 0z"/>`;
const heart = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/>`;
const star = 'M23 12l-5.9 2.1 2.7 5.7-5.7-2.7L12 23l-2.1-5.9-5.7 2.7 2.7-5.7L1 12l5.9-2.1-2.7-5.7 5.7 2.7L12 1l2.1 5.9 5.7-2.7-2.7 5.7z';

const art = computed(() => {
  switch (props.type) {
    case 'geometric':
      return `<path d="M6 114V34Q6 6 34 6h80"/><path d="M16 114V40Q16 16 40 16h74" stroke-opacity=".55"/><path transform="translate(2 2) scale(1.3)" d="${star}" fill="currentColor" fill-opacity=".18"/><circle cx="34" cy="34" r="3" fill="currentColor"/><circle cx="6" cy="114" r="2.5" fill="currentColor"/><circle cx="114" cy="6" r="2.5" fill="currentColor"/>`;
    case 'tumpal':
      return `<path d="M6 6h108M6 6v108" stroke-width="1.6"/>${Array.from({ length: 7 }, (_, i) => `<path d="M${12 + i * 14} 6l7 14 7-14z" fill="currentColor" fill-opacity=".8" stroke="none"/><path d="M6 ${12 + i * 14}l14 7-14 7z" fill="currentColor" fill-opacity=".8" stroke="none"/>`).join('')}<path d="M26 26l10 10-10 10-10-10z" fill="currentColor" fill-opacity=".25"/>`;
    case 'vine':
      return `<path d="M6 114C6 62 34 22 84 8"/>${heart(6, 30, 1.4)}${heart(42, 8, 1)}${heart(2, 70, .8)}${leaf(14, 92, -100, .8)}${leaf(22, 56, -70, .8)}${leaf(52, 30, -40, .8)}${flower(66, 28, .6)}`;
    default: // floral
      return `<path d="M6 114C10 70 34 28 84 8"/>${leaf(10, 96, -95)}${leaf(14, 66, -75)}${leaf(34, 40, -50)}${leaf(60, 20, -25, .8)}${flower(50, 56, 1.1)}${flower(26, 22, .7)}${flower(90, 12, .55)}`;
  }
});
</script>

<template>
  <svg class="corner" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true" v-html="art" />
</template>

<style>
.corner {
  position: absolute;
  width: clamp(86px, 30%, 130px);
  height: auto;
  color: var(--c-primary);
  pointer-events: none;
}
.corner--tl { top: 0; left: 0; }
.corner--tr { top: 0; right: 0; transform: scaleX(-1); }
.corner--bl { bottom: 0; left: 0; transform: scaleY(-1); }
.corner--br { bottom: 0; right: 0; transform: scale(-1, -1); }
</style>
