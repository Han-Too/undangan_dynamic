<script setup>
import { computed } from 'vue';
import { cornerArt, edgeArt, getFrame } from '../../data/coverFrames';
import OrnamentCorner from './ornaments/OrnamentCorner.vue';

/** Bingkai cover (lihat data/coverFrames.js). `theme` = tipe ornamen sudut bawaan tema. */
const props = defineProps({
  frame: { type: String, default: 'theme' },
  themeCorner: { type: String, default: 'floral' },
});

const ORNAMENT_TYPES = ['floral', 'geometric', 'tumpal', 'vine'];
const f = computed(() => (props.frame === 'theme' ? { corner: props.themeCorner } : getFrame(props.frame)));
const corners = computed(() => (f.value.corner ? f.value.corners ?? ['tl', 'tr', 'bl', 'br'] : []));
const isOrnament = computed(() => ORNAMENT_TYPES.includes(f.value.corner));
</script>

<template>
  <div class="cframe" :data-line="f.line || 'none'" :data-edge="f.edge || 'none'" aria-hidden="true">
    <!-- Mihrab (lengkung runcing) digambar SVG agar bentuknya tetap tajam di rasio layar apa pun -->
    <svg v-if="f.line === 'mihrab'" class="cframe__svgline" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="currentColor">
      <path d="M8 98V32Q8 14 50 3Q92 14 92 32V98Z" vector-effect="non-scaling-stroke" />
      <path d="M12 96V33Q12 17 50 7Q88 17 88 33V96Z" vector-effect="non-scaling-stroke" stroke-opacity=".45" />
    </svg>
    <div v-else-if="f.line && f.line !== 'none'" class="cframe__line" />
    <div v-if="f.edge" class="cframe__edge cframe__edge--top" />
    <div v-if="f.edge" class="cframe__edge cframe__edge--bottom" />

    <template v-if="isOrnament">
      <OrnamentCorner v-for="pos in corners" :key="pos" :type="f.corner" :class="`corner--${pos}`" />
    </template>
    <template v-else>
      <svg
        v-for="pos in corners"
        :key="pos"
        class="corner"
        :class="`corner--${pos}`"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
        v-html="cornerArt[f.corner]"
      />
    </template>

    <svg v-if="f.top" class="cframe__mid cframe__mid--top" viewBox="0 0 200 48" fill="none" stroke="currentColor" stroke-width="1.2" v-html="edgeArt[f.top]" />
    <svg v-if="f.bottom" class="cframe__mid cframe__mid--bottom" viewBox="0 0 200 48" fill="none" stroke="currentColor" stroke-width="1.2" v-html="edgeArt[f.bottom]" />
  </div>
</template>
