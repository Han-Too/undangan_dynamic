<script setup>
import { computed } from 'vue';
import { getPhotoBorder, getPhotoDecor, getPhotoShape, photoShapes } from '../../data/photoFrames';
import { shapes as particleShapes } from './fx/shapes';

/**
 * Bingkai foto: bentuk × border × hiasan (lihat data/photoFrames.js).
 * Border dibuat dari maks. 3 lapis yang memakai bentuk/mask yang sama, sehingga cincin tetap
 * mengikuti bentuk apa pun (love, bintang, perangko, ...).
 */
const props = defineProps({
  shape: { type: String, default: 'rect' },
  border: { type: String, default: 'ring' },
  decor: { type: String, default: 'none' },
  /** gerak foto: none | float | sway | pulse | tilt */
  motion: { type: String, default: 'none' },
  /** Override rasio (mis. '4 / 5'); default dari bentuk. */
  ratio: { type: String, default: '' },
});

const s = computed(() => getPhotoShape(props.shape) ?? photoShapes.find((x) => x.id === 'rect'));
const b = computed(() => getPhotoBorder(props.border) ?? { layers: [] });
const d = computed(() => getPhotoDecor(props.decor) ?? { items: [] });

const layerStyle = (i) => {
  const l = b.value.layers?.[i];
  return l ? { padding: `${l.pad}px`, background: l.bg } : null;
};

const rootStyle = computed(() => ({
  '--pf-ratio': props.ratio || String(s.value.ratio ?? 4 / 5),
  '--pf-w': `${s.value.width ?? 72}%`,
  '--pf-radius': s.value.radius ?? '0',
  '--pf-mask': s.value.mask ?? 'none',
  '--pf-glow': b.value.glow ?? 'transparent',
}));

const decorItems = computed(() =>
  (d.value.items ?? []).map(([shape, x, y, size, rot = 0], i) => ({
    key: i,
    svg: particleShapes[shape] ?? '',
    style: {
      left: `${x}%`,
      top: `${y}%`,
      width: `${Math.round(size * 1.3)}px`,
      height: `${Math.round(size * 1.3)}px`,
      '--r': `${rot}deg`,
      '--d': `${-i * 0.9}s`,
      color: i % 3 === 1 ? 'var(--c-secondary)' : 'var(--c-primary)',
    },
  })),
);
</script>

<template>
  <div
    class="pf"
    :class="{ 'pf--masked': !!s.mask, 'pf--shadow': b.shadow, 'pf--glow': !!b.glow }"
    :data-shape="s.id"
    :data-motion="motion"
    :style="rootStyle"
  >
    <span v-if="d.special" class="pf__special" :data-special="d.special" aria-hidden="true"><i /><i /><i /><i /></span>
    <div v-if="b.offset" class="pf__offset" aria-hidden="true" />
    <div class="pf__body">
      <div class="pf__l pf__l--outer" :style="layerStyle(0)">
        <div class="pf__l" :style="layerStyle(1)">
          <div class="pf__l" :style="layerStyle(2)">
            <div class="pf__img"><slot /></div>
          </div>
        </div>
      </div>
    </div>
    <span v-if="decorItems.length" class="pf__decor" aria-hidden="true">
      <svg v-for="it in decorItems" :key="it.key" class="pf__deco" :style="it.style" viewBox="0 0 24 24" fill="currentColor" v-html="it.svg" />
    </span>
  </div>
</template>
