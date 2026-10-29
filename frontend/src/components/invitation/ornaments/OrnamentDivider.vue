<script setup>
import { computed } from 'vue';

/** Pembatas dekoratif; jenis dipilih tema (`ornaments.divider`). Warna mengikuti currentColor. */
const props = defineProps({ type: { type: String, default: 'floral' } });

const star = 'M23 12l-5.9 2.1 2.7 5.7-5.7-2.7L12 23l-2.1-5.9-5.7 2.7 2.7-5.7L1 12l5.9-2.1-2.7-5.7 5.7 2.7L12 1l2.1 5.9 5.7-2.7-2.7 5.7z';
const heart = 'M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z';

const art = computed(() => {
  switch (props.type) {
    case 'star':
      return `<path transform="translate(108 0)" d="${star}"/><circle cx="96" cy="12" r="1.6" fill="currentColor"/><circle cx="144" cy="12" r="1.6" fill="currentColor"/>`;
    case 'wayang':
      return `<path d="M120 1c8 6 10 15 0 22-10-7-8-16 0-22z"/><path d="M120 6v13M120 14c-4-1-6-3-7-6M120 14c4-1 6-3 7-6"/><path d="M104 12l3-3 3 3-3 3zM130 12l3-3 3 3-3 3z" fill="currentColor"/>`;
    case 'heart':
      return `<path transform="translate(108 0)" d="${heart}"/><path transform="translate(92 6) scale(.5)" d="${heart}" fill="currentColor"/><path transform="translate(144 6) scale(.5)" d="${heart}" fill="currentColor"/>`;
    default: // floral
      return `<g transform="translate(120 12)">${[0, 72, 144, 216, 288].map((a) => `<ellipse rx="3" ry="6" cy="-6" transform="rotate(${a})"/>`).join('')}<circle r="1.8" fill="currentColor"/></g><circle cx="98" cy="12" r="1.5" fill="currentColor"/><circle cx="142" cy="12" r="1.5" fill="currentColor"/>`;
  }
});
</script>

<template>
  <svg class="divider" viewBox="0 0 240 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
    <path d="M0 12h86M154 12h86" stroke-linecap="round" />
    <g v-html="art" />
  </svg>
</template>

<style>
.divider {
  display: block;
  width: min(220px, 70%);
  height: auto;
  margin-inline: auto;
  color: var(--c-primary);
}
</style>
