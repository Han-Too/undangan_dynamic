<script setup>
/** Bingkai dekoratif foto. Bentuk (arch/oval/octagon/rect) ditentukan konfigurasi tema. */
defineProps({
  shape: { type: String, default: 'rect' },
  ratio: { type: String, default: '4 / 5' },
});
</script>

<template>
  <div class="inv-frame" :data-shape="shape" :style="{ aspectRatio: ratio }">
    <div class="inv-frame__inner"><slot /></div>
  </div>
</template>
